import { v4 as uuid } from 'uuid'

 async function sendWebHook(dest, body) {
    const headers = new Headers()
    console.log('sending webhook to ' + dest)
    headers.append("Content-Type", "application/json")

    const options = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
    }

    const result = await fetch(dest, options)
    const outcome = await result.json();
    return outcome
}
async function validateChallenge(token, ip, secret) {

    // Validate the token by calling the `/siteverify` API.
    let formData = new FormData();

    // `secret_key` here is set using Wrangler secrets
    formData.append('secret', secret);
    formData.append('response', token);
    formData.append('remoteip', ip);

    console.log(formData)

    const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
    const result = await fetch(url, {
        body: formData,
        method: 'POST',
    });

    const outcome = await result.json();
    return outcome
}

export async function onRequest(context) {
    const body = JSON.parse(await context.request.text())
    const challenge = await validateChallenge(body.token, context.request.headers.get('CF-Connecting-IP'), context.env.TURNSTILE_SECRET)
    console.log(`challenge response ${challenge.success}`)

    sendWebHook(context.env.WEB_HOOK_DESTINATION, body)

    //TODO update the condition to validate incoming
    if (challenge.success) {
        try {
            //await context.env.WEDDING.put(body.firstName+'_'+body.lastName+'_'+body.uuid, JSON.stringify(body));
            console.log(body)
            let query = `UPDATE guests 
             SET brunch = '${body.brunch}',
                 firstName = '${body.firstName}',
                 lastName = '${body.lastName}',
                 lastUpdated = '${Date.now()}', 
                 children = '${body.children}', 
                 rsvp = '${body.rsvp}',
                 foodRestriction = '${body.foodRestriction}', 
                 accompany = '${body.accompany}',
                 accompanyFirstName = '${body.accompanyFirstName}', 
                 accompanyLastName = '${body.accompanyLastName}' 
             WHERE guestId = '${body.inviteId}';`
            let update = `INSERT INTO updates (uuid, createdAt, firstName, lastName, email, rsvp, brunch, children, foodRestriction, accompany, accompanyFirstName, accompanyLastName, guestId)
             VALUES ('${uuid()}',
                 '${Date.now()}',
                 '${body.firstName}',
                 '${body.lastName}',
                 '${body.email}',
                 '${body.rsvp}',
                 '${body.brunch}', 
                 '${body.children}', 
                 '${body.foodRestriction}',
                 '${body.accompany}',
                 '${body.accompanyFirstName}', 
                 '${body.accompanyLastName}',
                 '${body.inviteId}');`
            console.log(query)
            console.log(update)
            const guestQuery = context.env.DB.prepare(query);
            await guestQuery.all();
            const updateQuery = context.env.DB.prepare(update);
            await updateQuery.all();
            console.log(sendWebHook(context.env.WEB_HOOK_DESTINATION, body))
        } catch (err) {
            return new Response(err, { status: 500 });
        }
        return new Response('ok', {status : 200 })
    }
    return new Response('challenge incorrect', { status: 403 });
}
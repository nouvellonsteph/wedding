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
    if (challenge.success) {
        try {
            await context.env.WEDDING.put(body.firstName+'_'+body.lastName+'_'+body.uuid, JSON.stringify(body));
        } catch (err) {
            return new Response(err, { status: 500 });
        }
        return new Response('ok', {status : 200 })
    }
    return new Response('challenge incorrect', { status: 403 });
}
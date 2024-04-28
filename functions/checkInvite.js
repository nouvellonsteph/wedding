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
    const newRequest = new Request(context.request)
    const url = new URL(newRequest.url)
    const body = await newRequest.json()
    let challenge = await validateChallenge(body.token, context.request.headers.get('CF-Connecting-IP'), context.env.TURNSTILE_SECRET)
    console.log(`challenge response ${challenge.success}`)
    
    const inviteId = url.searchParams.get('inviteId')
    console.log(inviteId)

    if (!challenge.success) {
        return new Response('{error: challenge failed}', {status : 403 })
    }

    if (inviteId) {
        const stmt = context.env.DB.prepare('SELECT * FROM guests where guestId="'+ inviteId + '"');
        const { results } = await stmt.all();
        console.log(results)
        if (results[0]) {
            return new Response(JSON.stringify(results[0]), { status: 200 })
        } else {
            return new Response('invalid invite', {status: 403 })
        }
    } else {
        return new Response('invalid invite', {status: 403 })
    }
}
export async function onRequest(context) {
    //console.log(`challenge response ${challenge.success}`)
    
    const stmt = context.env.DB.prepare('SELECT * FROM guests');
    const { results } = await stmt.all();
    console.log(results)
    if (results[0]) {
        return new Response(JSON.stringify(results), { status: 200 })
    } else {
        return new Response('no data', {status: 403 })
    }
}
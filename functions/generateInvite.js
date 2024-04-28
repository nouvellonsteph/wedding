
export async function onRequest(context) {
    const url = new URL(context.request.url)
    let inviteId = url.searchParams.get('inviteId')
	let lang = url.searchParams.get('lang')
    let inviteLink = 'https://wedding.aliceandstephane.site/?lang='+lang+'%26inviteId='+inviteId
    let inviteLinkHtml = 'https://wedding.aliceandstephane.site/?lang='+lang+'&inviteId='+inviteId
    console.log('https://resize.justalittlebyte.ovh/?lang='+lang+'&inviteId='+inviteId)
    let image =  await fetch ('https://resize.justalittlebyte.ovh/?lang='+lang+'&inviteId='+inviteId)
   
    if (image === null) {
        return new Response('Object Not Found', { status: 404 });
      }

      const translations = {
        en: {
            title: "Your invitation to Alice & Stephane wedding",
            description: "Alice and Stephane wedding",
            invitateId: "Your invite ID (to use when RSVPing): ",
            link: "Link to the RSVP website"
        },
        fr: {
            title: "Votre invitation au mariage d'Alice et Stéphane",
            description: "Mariage d'Alice et Stéphane",
            invitateId: "Votre numéro d'invitation (à utiliser pour confirmer votre présence): ",
            link: "Lien pour confirmer votre présence"
        },
      };

    const getTranslations = translations[lang] || translations.en


    if (image === null) {
        return new Response('Object Not Found', { status: 404 });
    }

    let html = `<!DOCTYPE html>
        <html>
        <style>
        h1 {text-align: center;}
        p {
        text-align: center;
        font-family: poppins, sans-serif;
        }
        div {
        text-align: center;
        }
        body, html {
        height: 100%;
        margin: 0;
        }

        .bg {
        /* The image used */
        background-image: url("https://resize.justalittlebyte.ovh/?lang=${lang}&inviteId=${inviteId}");

        /* Full height */
        height: 100%; 

        /* Center and scale the image nicely */
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
        }
        </style>
        <head>
        <title>${getTranslations.title}</title>
        <meta charset="UTF-8">
        <meta property="og:title" content="${getTranslations.title}"/>
        <meta property="og:type" content="website" />
        <meta property="og:description" content="${getTranslations.description}"/>
        <meta property="og:url" content="${inviteLinkHtml}"/>
        <meta property="og:image" content="https://resize.justalittlebyte.ovh/cdn-cgi/image/quality=10,height=1200,width=630/https://resize.justalittlebyte.ovh/?lang=${lang}&inviteId=${inviteId}"/>
        </head>

        <body>
        <p><a href="${inviteLinkHtml}">${getTranslations.link}</a></p>
        <p>${getTranslations.invitateId} ${inviteId}</p>
        <div class="bg"></div>

        </body>
        </html>
        `
    
    return new Response(html, { status: 200, headers: { 
        'content-type': 'text/html'
    }})
}
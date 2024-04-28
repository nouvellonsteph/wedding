export default {
	async fetch(request, env, ctx) {
    	const url = new URL(request.url)
		let inviteId = url.searchParams.get('inviteId')
		let lang = url.searchParams.get('lang')
		let inviteLink = 'https://wedding.aliceandstephane.site/?lang='+lang+'%26inviteId='+inviteId
		console.log('invite link: ' + inviteLink)
		console.log('image link: ' + 'https://pub-c0a8e22f08fc41d5a1bcde8df0afa794.r2.dev/wedding_'+ lang + '_without_qr.png')
		console.log('qrcode link: ' + 'https://api.qrserver.com/v1/create-qr-code/?size=151x151&data='+inviteLink)
		
		let image =  await fetch('https://pub-c0a8e22f08fc41d5a1bcde8df0afa794.r2.dev/wedding_'+ lang + '_without_qr.png', { cf: {
			image: {
			compression: "fast",
			draw: [
				{
				url: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data='+inviteLink, // draw this image
				bottom: 125, // 5 pixels from the bottom edge
				left: 163, // 5 pixels from the right edge
				fit: 'contain', // make it fit within 100x50 area
				opacity: 1, // 20% transparent
				},
			],
			},
		}});
		
		return new Response(image.body, { status: 200, headers: { 
			'content-type': 'image/png',
			'test': 'test'
		}})
		},
};

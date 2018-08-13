var axios = require('axios');
var DH = require('diffie-hellman');

let randBase = 384;
let dh1 = DH.createDiffieHellman(randBase);

const encryptReq = axios.create({
	baseURL: 'http://localhost:7777',
	headers: {
		// 'X-Header-Not-About-encrypt': getClientPubKey()
	}
});




function sendPost() {
	encryptReq.post('/', {
	  publicKey: getClientPubKey(),
	})
	.then(function ({data}) {
		console.log('[CRYPT] pubk2 hex: ', data.toString('hex'));
		console.log('[CRYPT] sharedKey1: ', dh1.computeSecret(data).toString('hex'));
	})
	.catch(function (error) {
	  console.log(error);
	});
}
sendPost()

function getClientPubKey() {
	dh1.generateKeys();
	const pubk1 = dh1.getPublicKey();

		console.log('[CRYPT] pubk1 : ', pubk1);
		console.log('[CRYPT] pubk1 hex: ', pubk1.toString('hex'));
	return pubk1;
}
// getClientPubKey()

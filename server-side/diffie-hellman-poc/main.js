var DH = require('diffie-hellman');
var aes = require('crypto-js/aes');
var encUtf8 = require('crypto-js/enc-utf8');
var randBase = 'm800-super-security';
var dh1 = DH.createDiffieHellman(randBase);
var sharedKey;

const encryptReq = axios.create({
  baseURL: 'http://localhost:7777',
  headers: {
    'x-header-not-about-encrypt': getClientPubKey(),
  }
});

$('#send').click(sendReq);


function getClientPubKey() {
  dh1.generateKeys();
  const pubk1 = dh1.getPublicKey();
  const pubk1String = pubk1.toString('hex');

  return pubk1String;
}

function sendReq() {
	let encryptedPayload = '';
	if (sharedKey) {
		const payload = {abc: 'xyz'};
		const payloadStr = JSON.stringify(payload);
		encryptedPayload = aes.encrypt(payloadStr, sharedKey).toString();
  }

  encryptReq.post('/', {
  	payload: encryptedPayload,
  })
    .then(function({ data }) {
    	const { d, y } = data;
    	if (y) {
	    	const pubk2 = hexadecimalToUint8Array(y);
	      sharedKey = dh1.computeSecret(pubk2).toString('hex');

	      console.log('[CRYPT] generated sharedKey1! : ', sharedKey);
      }

      const decryptedText = aes.decrypt(d, sharedKey).toString(encUtf8);
      const decryptedJson = JSON.parse(decryptedText);

      const result = `
      	sharedKey1 hex: ${sharedKey}<br/>
      	decrypted string: ${decryptedText}<br/>
      	decrypted json response: ${decryptedJson.response}
      `;

      $('#console').html(result);
    })
    .catch(function(error) {
      console.log(error);
    });
}


function hexadecimalToUint8Array(str) {
  if (!str) {
    return new Uint8Array();
  }

  var bytes = [];
  for (var i = 0, len = str.length; i < len; i += 2) {
    bytes.push(parseInt(str.substr(i, 2), 16));
  }

  return new Uint8Array(bytes);
}

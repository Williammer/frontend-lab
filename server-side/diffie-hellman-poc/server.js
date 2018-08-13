var http = require('http'),
  express = require('express'),
  bodyParser = require('body-parser'),
  DH = require('diffie-hellman'),
	aes = require('crypto-js/aes');
	encUtf8 = require('crypto-js/enc-utf8');
  // crypto = require('crypto'),
  cors = require('cors'),
  app = express();

var PORT = 7777;
var jsonParser = bodyParser.json();
var sharedKey;

app.use(cors());

app.post('/', jsonParser, function(req, res) {
  const { headers, body } = req;
  const servedData = {response: 'hello world'};
	const servedDataStr = JSON.stringify(servedData);

  let response = {};

  const pubk1String = headers['x-header-not-about-encrypt'];
  if (pubk1String && !sharedKey) {
    const pubk1 = Buffer.from(pubk1String, 'hex');

    const randBase = 'm800-super-security';
    const dh2 = DH.createDiffieHellman(randBase);

    dh2.generateKeys();
    const pubk2 = dh2.getPublicKey();
    response.y = pubk2.toString('hex');

    sharedKey = dh2.computeSecret(pubk1).toString('hex');
    console.log('[CRYPT] generated sharedKey2! : ', sharedKey);
  }

  if (body.payload) {
  	const dec = decryptPayload(body.payload);
	  console.log('[Server-decrypted] decrypted payload: ', dec);
  	return;
  }

  // const cipher = crypto.createCipher('aes-256-cbc', sharedKey);
  // let encryptedData = cipher.update(raw).toString();
  // encryptedData += cipher.final();
  // console.log('[Server-encrypted] encryptedData+= cipher.final(): ', encryptedData);

	let	encryptedData = aes.encrypt(servedDataStr, sharedKey).toString();

  console.log('[Server-encrypted] encryptedData: ', encryptedData);

  response.d = encryptedData;

  res.send(response);
});


function decryptPayload(payload) {
  const decrypted = JSON.parse(aes.decrypt(payload, sharedKey).toString(encUtf8));

  return decrypted;
}

function localTest() {
  const randBase = 'm800-security';
  const dh1 = DH.createDiffieHellman(randBase);

  dh1.generateKeys();
  const pubk1 = dh1.getPublicKey();

  const dh2 = DH.createDiffieHellman(randBase);

  dh2.generateKeys();
  const pubk2 = dh2.getPublicKey();

  const sharedKey1 = dh1.computeSecret(pubk2);
  const sharedKey = dh2.computeSecret(pubk1);

  console.log('[Server]----sharedKey1: ', sharedKey1.toString('hex'))
  console.log('[Server]----sharedKey: ', sharedKey.toString('hex'))

}
// localTest()




http.createServer(app).listen(PORT, function() {
  console.log('Express Server listening on port ' + PORT);
});

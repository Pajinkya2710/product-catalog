const crypto = require('crypto');

// Encryption key and algorithm
const algorithm = 'aes-256-cbc';
const secretKey = 'your-32-character-secret-key'; // Ensure this is 32 characters long
const ivLength = 16; // AES block size

// Encrypt function
function encrypt(text) {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(secretKey), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Decrypt function
function decrypt(text) {
  const textParts = text.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = Buffer.from(textParts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKey), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Middleware to encrypt response
function encryptResponse(req, res, next) {
  const originalSend = res.send;
  res.send = function (body) {
    const encryptedBody = encrypt(body);
    originalSend.call(this, encryptedBody);
  };
  next();
}

// Middleware to decrypt request
function decryptRequest(req, res, next) {
  if (req.body) {
    req.body = JSON.parse(decrypt(req.body));
  }
  next();
}

module.exports = {
  encrypt,
  decrypt,
  encryptResponse,
  decryptRequest,
};

const crypto = require('crypto');

// Ensure you have a secure key and IV
const algorithm = 'aes-256-ctr';
const key = crypto.randomBytes(32);  // Your encryption key (32 bytes for aes-256-ctr)
const iv = crypto.randomBytes(16);   // Initialization vector (16 bytes for aes-256-ctr)

function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text) {
  const parts = text.split(':');
  const iv = Buffer.from(parts.shift(), 'hex');
  const encryptedText = Buffer.from(parts.join(':'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
  return decrypted.toString('utf8');
}

exports.encryptionMiddleware = (req, res, next) => {
  if (req.body) {
    // Encrypt sensitive fields if necessary
    if (req.body.sensitiveData) {
      req.body.sensitiveData = encrypt(req.body.sensitiveData);
    }
  }

  // Call next middleware
  next();

  // Decrypt response data if necessary
  if (res.data && res.data.sensitiveData) {
    res.data.sensitiveData = decrypt(res.data.sensitiveData);
  }
};

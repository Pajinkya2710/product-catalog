const crypto = require('crypto');
require('dotenv').config();

const algorithm = 'aes-256-cbc';
const ivLength = 16;
const secretKey = Buffer.from('a1b2c3d4e5f6g7h8a1b2c3d4e5f6g7h8', 'hex');

function encrypt(text) {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

function decrypt(text) {
  const textParts = text.split(':');
  if (textParts.length !== 2) {
    throw new Error('Invalid encrypted data format');
  }
  const iv = Buffer.from(textParts[0], 'hex');
  const encryptedText = Buffer.from(textParts[1], 'hex');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

function encryptResponse(req, res, next) {
  const originalSend = res.send;
  res.send = function (body) {
    if (typeof body === 'object' && !(body instanceof Buffer)) {
      const encryptedBody = encrypt(JSON.stringify(body));
      console.log('Response Body Before Encryption:', body);
      console.log('Encrypted Response Body:', encryptedBody);
      originalSend.call(this, encryptedBody);
    } else {
      originalSend.call(this, body);
    }
  };
  next();
}

function decryptRequest(req, res, next) {
  if (req.body && typeof req.body === 'string') {
    console.log('Request Body Before Decryption:', req.body);
    try {
      req.body = JSON.parse(decrypt(req.body));
      console.log('Decrypted Request Body:', req.body);
    } catch (error) {
      console.error('Decryption Error:', error);
      return res.status(400).send('Invalid encrypted data');
    }
  }
  next();
}

module.exports = {
  encryptResponse,
  decryptRequest,
};

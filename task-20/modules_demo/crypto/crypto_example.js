const crypto = require("crypto");

const hash = crypto.createHash('sha256').update('qw12er').digest('hex');
console.log('Хеш: ', hash);
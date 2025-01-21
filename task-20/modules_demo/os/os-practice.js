const os = require("os");

console.log('Операционная система: ', os.platform());
console.log('Объем памяти: ', os.totalmem());
console.log('Свободная память: ', os.freemem());
console.log('Время работы системы в секундах: ', os.uptime());
const path = require('path');

const filePath = '../../modules_demo/text-files/file.txt';
console.log('Файл до оптимизации: ', filePath);

const filePathNormalize = path.normalize(filePath);
console.log('Файл после оптимизации: ', filePathNormalize);

console.log('Расширение файла: ', path.extname(filePathNormalize));
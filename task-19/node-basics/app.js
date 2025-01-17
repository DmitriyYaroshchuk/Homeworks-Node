const fs = require('fs');
console.log('Привет из Node.js :)');

fs.readFile('data.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка при считывание файла: ', err);
        return;
    } else {
        console.log('Содержимое файла data.txt: ', data);
    }
});

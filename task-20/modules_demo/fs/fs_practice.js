const fs = require('fs');

fs.readFile('../txt-files/readme.txt', 'utf8', (err, data) => {
    if (err) {
        console.log('Произошла ошибка при чтение файла');
        return;
    } else {
        console.log('Содержание файла readme.txt: ', data);
    }
});


fs.writeFile('../txt-files/output.txt', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia', (err) => {
    if (err) {
        console.log('Ошибка при записи файла output.txt');
        return;
    } else {
        console.log('Файл output.txt успешно записан');
    }
});


if (fs.existsSync('../txt-files/result.txt')) {
    console.log('Файл Result.txt существует');
} else {
    console.log('Файл Result.txt не найден');
}

fs.mkdir('../testFolder', (err => {
    if (err) {
        console.log('Ошибка при создание папки: ', err);
        return;
    }
    console.log('Папка testFolder успешно создана');
}));


if (fs.existsSync('../testFolder')) {
    console.log('Папка testFolder существует');
} else {
    console.log('Папка testFolder не найдена');
}
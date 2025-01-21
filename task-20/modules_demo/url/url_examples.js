const url = require("url");

const myUrl = new URL('https://jsonplaceholder.typicode.com/users?name=Dima');
console.log('Протокол: ', myUrl.protocol);
console.log('Hostname: ', myUrl.hostname);
console.log('Путь: ', myUrl.pathname);
console.log('Параметры: ', myUrl.searchParams.get('name'));
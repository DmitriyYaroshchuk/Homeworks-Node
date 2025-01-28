const express = require('express');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`Метод: ${req.method}, URL: ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello from Node.js App');
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Пользователь с id: ${userId}`);
});

app.get('/about', (req, res) => {
    const { name, age } = req.query;
    res.send(`Получено данные: имя - ${name}, возраст - ${age}`);
});

app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    res.send(`Получено данные: Имя - ${name}, Почта - ${email}`);
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(3000, (req, res) => {
    console.log('Server running on port 3000');
});
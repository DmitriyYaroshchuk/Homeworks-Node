require('dotenv').config();
const express = require('express');

const authRoutes = require('./routes/authRoutes')
const postsRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const connectDB = require("./config/db");

const tokenRefresh = require('./middlewares/tokenRefresh');

const app = express();

// Middleware для парсингу JSON
app.use(express.json());

// Маршрут для аутентификации
app.use('/api/auth', authRoutes);

// Защищенные маршруты для постов
app.use('/api/posts', tokenRefresh, postsRoutes);

// Маршрут для комментариев
app.use('/api/comments', commentRoutes);

// Подключаем БД
connectDB();

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT);
});


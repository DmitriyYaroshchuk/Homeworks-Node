const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {getPosts, getPostById, createPost, updatePost, deletePost} = require("../controllers/postController");


// Все маршруты ниже защищены - доступ только для авторизированных пользователей
router.use(authMiddleware);

// Получаем все посты пользователя
router.get('/', getPosts);

// Получаем конкретный пост по id
router.get('/:id', getPostById);

// Создание нового поста
router.post('/', createPost);

// Редактирование поста по id
router.put('/:id', updatePost);

// Удаление поста по id
router.delete('/:id', deletePost);

module.exports = router;
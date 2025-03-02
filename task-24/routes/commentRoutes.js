const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {addComment, getCommentByPost, updateComment, deleteComment} = require("../controllers/commentController");

// Добавления комментария(нужно быть авторизованным)
router.post('/', authMiddleware, addComment);

// Получения комментариев к конкретному посту(postId передается как параметр)
router.get('/:postId', getCommentByPost);

// Редактируем комментарий (только пользователь)
router.put('/:commentId', authMiddleware, updateComment );

// Удаляем комментарий
router.delete('/:commentId', authMiddleware, deleteComment);

module.exports = router;
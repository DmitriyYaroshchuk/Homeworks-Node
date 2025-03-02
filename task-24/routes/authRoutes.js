const express = require('express');
const {register, login} = require("../controllers/authController");
const router = express.Router();

// Регистрация пользователя - /api/auth/register
router.post('/register', register);

// Авторизация пользователя - /api/auth/login
router.post('/login', login);


module.exports = router;
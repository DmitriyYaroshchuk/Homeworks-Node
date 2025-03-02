require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    try {
        const { username, email, password} = req.body;
        if (!username || !email || !password || !password.length) {
            return res.status(400).json({ message: 'Invalid username or email or password' });
        }

        // Проверяем существует ли такой пользователь уже
        const existingUser = await User.findOne({ $or : [ {email}, {username} ] });

        if (existingUser) {
            return res.status(400).json({ message: 'Such user already exists' });
        }

        // Регистрируем нового пользователя
        const newUser = await new User({ username, email, password });
        await newUser.save();

        // Генерируем jwt token
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_KEY, { expiresIn: '1h'});

        return res.status(201).json({ token, user: { id: newUser._id, username, email } });

    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong, server error' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({ message: 'Please enter your email and password'});
        }

        // Проверяем существует ли пользователь
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Such user does not exist or login details are invalid' });
        }

        // Проверяем соответствует ли пароль
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid login details' });
        }

        // Генерируем jwt token
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token, user : { id: user._id, username: user.username, email: user.email } });


    } catch (error) {
        return res.status(500).json({ message: 'Something went wrong, server error' })
    }
}

module.exports = { register, login }
require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Проверяем что токен передается в заголовках "Authorization" в формате "Bearer <token>"
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Token is required in headers' });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || !/^Bearer$/i.test(parts[0])) {
        return res.status(401).json({ message: 'Format token is not correct' });
    }

    const token = parts[1];

    // Используем для проверки и декодирования JWT-токена, чтобы убедиться, что он корректен, не просрочен и не был изменён
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is not correct' });
        }
        req.userId = decoded.id;
        next();
    });
}
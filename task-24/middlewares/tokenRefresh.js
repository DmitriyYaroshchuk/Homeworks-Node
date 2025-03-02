require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send('No token provided');
    }

    const parts = authHeader.split(' ');
    if(parts.length !==2 || !/^Bearer$/i.test(parts[0])) {
        return res.status(401).json({ message: 'Format token is not correct' });
    }

    const token = parts[1];

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token is not correct' });
        }

        // Определяем время, оставшееся до истечения (в секундах)
        const currentTime = Math.floor(Date.now() / 1000) // Секунды
        console.log('currentTime: ', currentTime);
        console.log('Время истечения токена: ', decoded.exp)
        const timeLeft = decoded.exp - currentTime;
        console.log('Оставшиеся время: ', timeLeft);

        
        // Если осталось меньше 5 минут генерируем новый токен
        if (timeLeft < 5 * 60) {
            const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_KEY, { expiresIn: '1h' });
            // Отправляем новый токен в заголовки
            res.setHeader('x-access-token', newToken);
        }

        res.userId = decoded.id;
        next();
    });
}
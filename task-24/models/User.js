const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Описываем какие данные о пользователе должны храниться в базе данных
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

// Хєшируем пароль перед тем как сохранить в базу данных
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Метод для сравнения хэшированного пароля в БД и пароля, который ввел пользователь(хэшированного)
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', userSchema);
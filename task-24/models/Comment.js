const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    post : { type: mongoose.Types.ObjectId, ref: 'Post', required: true },
    owner : { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    comment : { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
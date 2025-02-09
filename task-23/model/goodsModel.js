const mongoose = require("mongoose");

const goodsModel = new mongoose.Schema({
    name: { type: String, required: true },
    price: {type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
});
module.exports = mongoose.model('Goods', goodsModel);
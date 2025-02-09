const Goods = require('../model/goodsModel');

const getGoods = async (req, res) => {
    try {
        const goods = await Goods.find();
        res.status(200).json(goods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getGoodsById = async (req, res) => {
    try {
        const goodsById = await Goods.findById(req.params.id);
        if(!goodsById) return res.status(404).json({ message: 'Good not found' });
        res.status(200).json(goodsById);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createGoods = async (req, res) => {
    try {
        const { name, price, category, stock } = req.body;
        const newGoods = await new Goods({ name, price, category, stock });
        await newGoods.save();
        res.status(201).json(newGoods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateGoods = async (req, res) => {
    try {
        const updatedGoods = await Goods.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedGoods) return res.status(404).json({ message: 'Good not found' });
        res.status(200).json(updatedGoods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteGoods = async (req, res) => {
    try {
        const goods = await Goods.findByIdAndDelete(req.params.id);
        if (!goods) return res.status(404).json({ message: 'Good not found' });
        res.status(200).json({ message: 'Goods was deleted successfully'})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getGoods, getGoodsById, createGoods, updateGoods, deleteGoods };
const express = require('express');
const {getGoods, getGoodsById, createGoods, updateGoods, deleteGoods} = require("../controllers/goodsControllers");
const router = express.Router();

router.get('/', getGoods);
router.get('/:id', getGoodsById);
router.post('/', createGoods);
router.put('/:id', updateGoods);
router.delete('/:id', deleteGoods);

module.exports = router;
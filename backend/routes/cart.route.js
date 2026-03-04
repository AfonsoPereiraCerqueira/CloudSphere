import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart,
  getCartItemInfo,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post('/', getCart);
router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.post("/getPlanInfo", getCartItemInfo);

export default router;
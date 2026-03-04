import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
      cartId: {
            type: String,
            required: true,
      },
      planId: {
            type: String,
            required: true,
      },
      quantity: {
            type: Number,
            required: true,
      },
}, { timestamps: true });

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;

import Cart from "../models/cart.model.js";
import CartItem from "../models/cartItems.model.js";
import Plan from "../models/plan.model.js";

// Add to cart

export const addToCart = async (req, res) => {
      const { planId, quantity, userId } = req.body;
            
      try {
            const cart = await Cart.findOne({ userId });
            if (!cart) {
                  return res.status(401).json({ success: false, message: "Cart not found" });
            }

            const plan = await Plan.findById(planId);
            if (!plan) {
                  return res.status(401).json({ success: false, message: "Plan not found" });
            }
      
            const cartItem = await CartItem.findOne({ cartId: cart._id });
            if (cartItem) {
                  // Apenas 1 item por carrinho
                  throw new Error("Item already in cart");
            } else {
                  const newCartItem = new CartItem({
                        cartId: cart._id,
                        planId,
                        quantity,
                  });
                  await newCartItem.save();
            }
            
            res.status(201).json({ success: true, message: "Added to cart" });
      } catch (error) {
            console.log(error);
            res.status(401).json({ success: false, message: error.message });
      }
};

// Remove from cart

export const removeFromCart = async (req, res) => {
      const { planId, userId } = req.body;
      
      try {
            const cart = await Cart.findOne({ userId });
            if (!cart) {
                  return res.status(400).json({ success: false, message: "Cart not found" });
            }
      
            const cartItem = await CartItem.findOneAndDelete({ cartId: cart._id, planId });
            if (!cartItem) {
                  return res.status(400).json({ success: false, message: "Item not found in cart" });
            }
      
            res.status(200).json({ success: true, message: "Removed from cart" });
      } catch (error) {
            console.log(error);
            res.status(400).json({ success: false, message: error.message });
      }
};

// Get cart

export const getCart = async (req, res) => {
      const { userId } = req.body;
      
      try {
            const cart = await Cart.findOne({ userId });
            if (!cart) {
                  return res.status(401).json({ success: false, message: "Cart not found " + userId });
            }
      
            const cartItems = await CartItem.findOne({ cartId: cart._id });
            if (!cartItems) {
                  return res.status(401).json({ success: false, message: "Cart is empty" });
            }

            res.status(200).json({ success: true, message: "Cart Found: " + userId + " || Cart Items: " + cartItems, cartItem: {
                  ...cartItems._doc,
            } });
      } catch (error) {
            console.log(error);
            res.status(401).json({ success: false, message: error.message });
      }
};

export const getCartItemInfo = async (req, res) => {
      const { planId, userId } = req.body;

      try {

            const cart = await Cart.findOne({ userId });
            if (!cart) {
                  return res.status(401).json({ success: false, message: "Cart not Found"});
            }

            const plan = await Plan.findById(planId);
            if (!cart) {
                  return res.status(401).json({ success: false, message: "Plan not found"});
            }

            res.status(200).json({ success: true, message: "Plan found", plan: {
                  ...plan._doc,
            }})
            
      } catch (error) {
            console.log(error);
            res.status(401).json({ success: false, message: error.message })
      }
}
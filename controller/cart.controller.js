import Cart from "../model/cart.model.js";
import User from '../model/user.model.js';

export const removeItem = (request, response, next) => {
  Cart.updateOne({ userId: request.params.userId }, {
    $pull: { cartItems: { productId: request.params.productId } }
  }).then(result => {
    if (result.modifiedCount)
      return response.status(200).json({ message: "Item removed" });
    return response.status(401).json({ error: "Id not found" });
  }).catch(err => {
    return response.status(500).json({ message: "Internal server error" });
  });
}

export const fetchCart = (request, response, next) => {
  const userId = request.params.userId;
  Cart.findOne({ userId })
    .populate('userId')
    .populate({ path: 'cartItems.productId', model: 'product' })
    .exec()
    .then(result => {
      if (!result) {
        return response.status(404).json({ message: 'Cart not found' });
      }
      return response.status(200).json({ cart: result });
    })
    .catch(err => {
      console.error(err);
      return response.status(500).json({ error: 'Internal server error', err });
    });
};



export const addToCart = async (request, response, next) => {
  console.log(request)
  try {
    const { userId, productId, quantity } = request.body;
    if (!userId || !productId || !quantity) {
      return response.status(400).json({ error: "Invalid request. Missing userId or productId." });
    }

    let cart = await Cart.findOne({ userId });
    console.log(cart);
    if (cart) {
      // let status = cart.cartItems.some((item) => item.productId.toString() === productId.toString());
      const status = cart.cartItems.some(item => item.productId && item.quantity && item.productId && item.quantity.toString() === productId.quantity);
      if (status) {
        return response.status(200).json({ message: "Product is already added in cart" });
      }

      cart.cartItems.push({ productId: productId, quantity: quantity });

      await cart.save();

      return response.status(200).json({ message: "Product added in cart" });
    } else {
      let result = await Cart.create({ userId, cartItems: [{ productId }, { quantity }] });
      return response.status(200).json({ message: "Item added in cart", cart: result });
    }
  } catch (err) {
    console.error(err);
    return response.status(500).json({ error: "Internal server error" });
  }
}
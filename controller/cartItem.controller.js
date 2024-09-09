// import Cart from '../model/cart.model.js';
// import CartItem from '../model/cartItem.model.js';
// import Product from '../model/product.model.js';
// import User from '../model/user.model.js';

// export const removeItemFromCart = async (req, res, next) => {
//   const { userId, productId } = req.params;
//   try {
//     const cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const result = await CartItem.deleteOne({ cart: cart._id, product: productId });
//     return res.status(200).json({ message: "Product removed successfully", result });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const removeAllItems = async (req, res, next) => {
//   const { userId } = req.params;
//   try {
//     const cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const result = await CartItem.deleteMany({ cart: cart._id });
//     return res.status(200).json({ message: "All items removed successfully", result });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const removeProductFromCart = async (req, res, next) => {
//   const { productId } = req.body;
//   try {
//     const result = await CartItem.deleteOne({ product: productId });
//     return res.status(200).json({ message: "Product removed successfully", result });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Internal server error", error: err });
//   }
// };

// export const addToCart = async (req, res, next) => {
//   const { userId, productId, quantity } = req.body;
//   const session = await mongoose.startSession();
//   session.startTransaction();

//   try {
//     const cart = await Cart.findOne({ userId }).session(session);

//     if (cart) {
//       const isExists = await CartItem.findOne({ cart: cart._id, product: productId }).session(session);
//       if (isExists) {
//         await session.abortTransaction();
//         session.endSession();
//         return res.status(200).json({ message: "Product is already added in cart" });
//       }

//       const cartItem = new CartItem({ cart: cart._id, product: productId, quantity });
//       await cartItem.save({ session });

//       await session.commitTransaction();
//       session.endSession();
//       return res.status(201).json({ message: 'Product successfully added into cart' });
//     } else {
//       const newCart = new Cart({ userId });
//       await newCart.save({ session });

//       const cartItem = new CartItem({ cart: newCart._id, product: productId, quantity });
//       await cartItem.save({ session });

//       await session.commitTransaction();
//       session.endSession();
//       return res.status(201).json({ message: "Item Successfully added into cart" });
//     }
//   } catch (err) {
//     await session.abortTransaction();
//     session.endSession();
//     console.log(err);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

// export const getCartId = async (req, res, next) => {
//   const { userId } = req.body;
//   try {
//     const cart = await Cart.findOne({ userId });
//     return res.status(200).json({ message: "User cart", cart });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const viewProductByCartID = async (req, res, next) => {
//   const { cartId } = req.params;
//   try {
//     const cartItems = await CartItem.find({ cart: cartId }).populate('product');
//     return res.status(200).json({ message: "User cart items", cartItems });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const viewAllCarts = async (req, res, next) => {
//   const { userId } = req.body;
//   try {
//     const user = await User.findById(userId).populate('carts');
//     return res.status(200).json({ message: "User carts", carts: user.carts });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const fetchCartItems = async (req, res, next) => {
//   const { userId } = req.params;
//   try {
//     const cart = await Cart.findOne({ userId }).populate({
//       path: 'items',
//       populate: {
//         path: 'product'
//       }
//     });
//     return res.status(200).json({ data: cart.items });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const viewAllCartProducts = async (req, res, next) => {
//   try {
//     const cartItems = await CartItem.find().populate('cart');
//     return res.status(200).json({ message: "User cart items", cartItems });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const updateQty = async (req, res, next) => {
//   const { productId, quantity, userId } = req.body;
//   try {
//     const cart = await Cart.findOne({ userId });
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }
//     const updatedItems = await CartItem.updateOne(
//       { cart: cart._id, product: productId },
//       { $set: { quantity } }
//     );
//     return res.status(200).json({ message: "Quantity updated successfully", updatedItems });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Something went wrong" });
//   }
// };

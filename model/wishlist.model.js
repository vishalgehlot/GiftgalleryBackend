import mongoose from "mongoose";
import User from "./user.model.js";
import Product from "./product.model.js";

const WishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product',
    required: true,
  }
}, { timestamps: true });

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

export default Wishlist;

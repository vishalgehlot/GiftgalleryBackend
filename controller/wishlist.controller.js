import User from "../model/user.model.js";
import Wishlist from "../model/wishlist.model.js";
import Product from "../model/product.model.js";

export const addProductIntoWishlist = async (req, res, next) => {
  let { userId, productId } = req.body;
  try {
    let isExists = await Wishlist.findOne({ userId, productId });
    if (isExists)
      return res.status(200).json({ message: "Product is already added in wishlist" });

    const result = await Wishlist.create({ userId, productId });
    return res.status(200).json({ message: "Product successfully added into wishlist", result });
  } catch (err) {
    return res.status(401).json({ message: "Something went wrong", error: err.message });
  }
};

export const removeItemFromList = async (req, res, next) => {
  let { userId, productId } = req.body;
  try {
    await Wishlist.findOneAndDelete({ userId, productId });
    return res.status(200).json({ message: "Product removed from wishlist" });
  } catch (err) {
    return res.status(401).json({ message: "Something went wrong", error: err.message });
  }
};

export const viewAllFavouriteProducts = async (req, res, next) => {
  console.log("Wishlist called...");
  let userId = req.body.userId;
  try {
    const result = await User.findById(userId).populate({
      path: 'wishlist',
      options: { strictPopulate: false },
      populate: {
        path: 'productId',
        model: 'product'
      }
    });
    console.log(result);
    return res.status(200).json({ message: "User wishlist products", result });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: "Internal server error", error: err.message });
  }
};

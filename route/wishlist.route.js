import { addProductIntoWishlist, removeItemFromList, viewAllFavouriteProducts } from "../controller/wishlist.controller.js";
import express from 'express'

const router = express.Router();

router.post("/addWishlist", addProductIntoWishlist);
router.delete("/removeItemFromlist", removeItemFromList)
router.post("/viewAllfavoriteproduct", viewAllFavouriteProducts)


export default router;
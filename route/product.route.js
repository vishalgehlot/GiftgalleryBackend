import express from 'express';
import multer from 'multer';
import { addExcelSheet, viewAllProducts, viewAllByCategory, viewProductsByCategory, removeProduct, addProductInBulk, updateRating, addoneproduct, displayAllProducts, brandlist, getproductbybrand, getproductbyprice } from '../controller/product.controller.js';

const upload = multer({ dest: './public/images/' });
const router = express.Router();

router.post("/uploadExcelSheet", upload.single('excelFile'), addExcelSheet)
router.post("/addSingleProduct", addoneproduct)
router.post("/addProductInBulk", addProductInBulk)
router.get("/viewAll", viewAllByCategory)
router.get("/viewAllProducts", viewAllProducts)
router.delete("/removeProduct", removeProduct)
router.post("/viewProductByCategory/:categoryName", viewProductsByCategory)
router.post("/updateRating", updateRating)
router.get("/displayAllProducts", displayAllProducts)
router.post("/getproductbybrand", getproductbybrand)
router.post("/getproductbyprice", getproductbyprice)
router.get("/brand", brandlist)
export default router;
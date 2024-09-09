import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from "mongoose";
import { fileURLToPath } from 'url';
import adminRouter from './route/admin.route.js';
import userRouter from './route/user.route.js';
import categoryRouter from './route/category.route.js';
import productRouter from './route/product.route.js';
import CartRouter from './route/cart.route.js';
import orderRouter from './route/order.route.js';
import deliveryBoyRouter from './route/deliveryBoy.route.js';
import deliveryDataRouter from './route/deliveryData.route.js';
import reviewRouter from './route/review.route.js';
import ContactRouter from './route/contactus.route.js';
import wishlistRouter from './route/wishlist.route.js';
import paymentRouter from './route/payment.route.js';

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use('/admin', adminRouter);
app.use('/user', userRouter);
app.use('/cart', CartRouter);
app.use('/category', categoryRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/deliveryBoy', deliveryBoyRouter);
app.use('/deliverydata', deliveryDataRouter);
app.use('/review', reviewRouter);
app.use('/contact', ContactRouter);
app.use('/wishlist', wishlistRouter);
app.use('/payment', paymentRouter);

//mongodb+srv://gehlotvishal354:mg0XwRTB34R9N1uc@cluster0.w1desbg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect("mongodb://localhost:27017/giftgallery").then(() => {
  console.log("MongoDB DataBase Connected...");
  const port = 3001;
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

export default app;

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderDate: String,
  firstName: String,
  lastName: String,
  contact: String,
  address: String,
  pinCode: String,
  city: String,
  status: String,
  orderItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  }
}, {
  timestamps: true
});

const Order = mongoose.model('order', orderSchema);

export default Order;

// import mongoose from 'mongoose';
// const Schema = mongoose.Schema;

// const orderItemSchema = new Schema({
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
//   quantity: Number
// });

// const orderSchema = new Schema({
//   orderId: String,
//   orderDate: String,
//   firstName: String,
//   lastName: String,
//   contact: String,
//   address: String,
//   city: String,
//   pinCode: String,
//   status: String,
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
//   orderItems: [orderItemSchema]
// });

// const Order = mongoose.model('order', orderSchema);
// export default Order;


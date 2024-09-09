import Cart from '../model/cart.model.js';
import Order from '../model/order.model.js';
import mongoose from 'mongoose';

export const placedOrder = async (req, res, next) => {
  try {
    const date = new Date();
    const currentDate = date.toISOString().split("T")[0];

    const { userId, orderId, firstName, lastName, contact, address, city, pinCode, status } = req.body;
    const cartResult = await Cart.findOne({ userId }).populate('cartItems.productId');
    if (!cartResult) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const orderItems = cartResult.cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity || 1
    }));

    const order = new Order({
      orderId,
      orderDate: currentDate,
      firstName,
      lastName,
      contact,
      address,
      pinCode,
      city,
      status,
      userId,
      orderItems
    });

    await order.save();

    await Cart.deleteMany({ _id: cartResult._id });

    return res.status(200).json({ message: "Order placed successfully...", order });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const buyNow = async (req, res, next) => {
  try {
    const date = new Date();
    const currentDate = date.toISOString().split("T")[0];
    const { userId, firstName, lastName, contact, address, productId, city, pinCode, status } = req.body;

    const order = new Order({
      orderId,
      orderDate: currentDate,
      firstName,
      lastName,
      contact,
      address,
      pinCode,
      city,
      status,
      userId
    });
    await order.save();

    const orderItem = new OrderItem({
      productId,
      quantity: 1,
      orderId: order._id
    });
    await orderItem.save();

    return res.status(200).json({ message: "Order placed successfully..." });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const viewAllOrderList = async (req, res, next) => {
  try {
    const orders = await Order.find().populate({
      path: 'orderItems.product',
      select: 'name price'
    });
    return res.status(200).json({ message: "Your orders", result: orders });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};


export const viewParticularUserOrder = (request, response, next) => {
  const userId = request.params.userId;
  console.log(userId);

  Order.find({ userId: new mongoose.Types.ObjectId(userId) })
    .populate('userId')
    .populate({
      path: 'orderItems.productId',
      model: 'product',
      select: 'name price'
    })
    .exec()
    .then(results => {
      console.log(results);
      if (results.length === 0) {
        return response.status(404).json({ message: 'Orders not found' });
      }
      return response.status(200).json({ message: "Your orders", orders: results });
    })
    .catch(err => {
      console.error("Error retrieving orders:", err);
      return response.status(500).json({ error: 'Internal server error', err });
    });
};

export const updateStatus = async (req, res) => {
  const { id: orderId, status: newStatus } = req.body;
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = newStatus;
    await order.save();

    return res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};


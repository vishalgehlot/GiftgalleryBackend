import DeliveryData from '../model/deliveryData.model.js';
import Order from '../model/order.model.js';
import User from '../model/user.model.js';
import DeliveryBoy from '../model/deliveryBoy.model.js';

export const orderDeliver = async (req, res, next) => {
  const { deliveryBoyId, orderId, userId } = req.body;
  try {
    const orderExists = await Order.findById(orderId);
    console.log(orderExists);
    const userExists = await User.findById(userId);
    console.log(userExists);
    const deliveryBoyExists = await DeliveryBoy.findById(deliveryBoyId);
    console.log(deliveryBoyExists);
    if (!orderExists || !userExists || !deliveryBoyExists) {
      return res.status(400).json({ message: "Invalid order, user, or delivery boy ID" });
    }
    const deliveryData = new DeliveryData({
      deliveryBoyId,
      orderId,
      userId
    });
    let result = await deliveryData.save();

    result = await DeliveryData.find(result._id)
      .populate('deliveryBoyId', 'name email contact')
      .populate('orderId', 'orderDate status firstName lastName contact address pincode city')
      .populate('userId', 'name email contact');

    console.log("Order delivered..");
    return res.status(200).json({ message: "Order delivered successfully...", result });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(400).json({ message: "Duplicate order delivery attempt" });
    }
    return res.status(500).json({ message: "Internal server error..." });
  }
};

export const orderDetail = async (req, res, next) => {
  try {
    const result = await DeliveryData.find()
      .populate({
        path: 'orderId',
        model: 'order',
        populate: [
          {
            path: 'userId',
            model: 'user'
          },
          {
            path: 'orderItems.productId',
            model: 'product'
          }
        ]
      })
      .populate({
        path: 'deliveryBoyId',
        model: 'DeliveryBoy'
      });

    return res.status(200).json({ message: "Order details...", result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error..." });
  }
};


const ORDER = require("../models/order");
const USER = require("../models/user");

// Placing order using COD or Bank Transfer
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;

    // fallback to COD if nothing passed
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: paymentMethod || "COD",
      payment: false,
      date: Date.now(),
    };

    await ORDER.create(orderData);

    // clear user cart
    await USER.findByIdAndUpdate(userId, { cartData: {} });

    res.status(200).json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// all orders for admin panel
const allOrders = async (req, res) => {
  try {
    const orders = await ORDER.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//User Order Data for Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await ORDER.find({ userId });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// update order status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await ORDER.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  placeOrder,
  allOrders,
  userOrders,
  updateStatus,
};

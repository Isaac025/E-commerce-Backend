// Placing order using COD method
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      amount,
    };
  } catch (error) {}
};

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {};

// all orders for admin panel
const allOrders = async (req, res) => {};

//User Order Data for Frontend
const userOrders = async (req, res) => {};

// update order status
const updateStatus = async (req, res) => {};

module.exports = {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
};

const USER = require("../models/user");

// add cart item
const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await USER.findById(userId);
    let cartData = await userData.cartData;

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size];
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await USER.findByIdAndUpdate(userId, { cartData });
    res.status(201).json({ success: true, message: "Added to Cart" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await USER.findById(userId);
    let cartData = await userData.cartData;

    cartData[itemId][size] = quantity;

    await USER.findByIdAndUpdate(userId, { cartData });
    res.status(200).json({ success: true, message: "Cart Updated" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await USER.findById(userId);
    let cartData = await userData.cartData;

    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addToCart, updateCart, getUserCart };

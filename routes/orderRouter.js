const express = require("express");
const adminAuth = require("../middleware/adminAuth");
const authUser = require("../middleware/auth");

const router = express.Router();
const {
  placeOrder,
  placeOrderStripe,
  allOrders,
  updateStatus,
  userOrders,
} = require("../controllers/orderController");

//Admin features
router.post("/list", adminAuth, allOrders);
router.post("/status", adminAuth, updateStatus);

router.post("/place", authUser, placeOrder);

//user feature
router.post("/userorders", authUser, userOrders);

module.exports = router;

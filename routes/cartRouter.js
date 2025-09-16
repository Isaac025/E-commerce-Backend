const express = require("express");
const router = express.Router();

const {
  addToCart,
  getUserCart,
  updateCart,
} = require("../controllers/cartController");
const authUser = require("../middleware/auth");

router.post("/add", authUser, addToCart);
router.post("/update", authUser, updateCart);
router.post("/get", authUser, getUserCart);

module.exports = router;

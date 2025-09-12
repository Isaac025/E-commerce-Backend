const router = require("express").Router();
const {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
} = require("../controllers/productController");
const adminAuth = require("../middleware/adminAuth");
const upload = require("../middleware/multer");

router.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
router.get("/list", listProduct);
router.delete("/:id", adminAuth, removeProduct);
router.get("/:id", singleProduct);

module.exports = router;

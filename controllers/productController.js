const cloudinary = require("cloudinary").v2;
const PRODUCT = require("../models/product");

//func to add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item != undefined
    );

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imageUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = await PRODUCT.create(productData);

    res.status(201).json({ success: true, message: "Product Added", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//func to list product
const listProduct = async (req, res) => {
  try {
    const products = await PRODUCT.find({}).sort({ createdAt: -1 });
    const totalProducts = await PRODUCT.countDocuments();
    res.status(200).json({ success: true, totalProducts, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//func to remove product
const removeProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await PRODUCT.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//func to single product info
const singleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await PRODUCT.findById(id);
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addProduct, listProduct, removeProduct, singleProduct };

const express = require("express");
const { isSeller, isAuthenticated, isAdmin } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const Product = require("../model/product");
const Order = require("../model/order");
const Shop = require("../model/shop");
// const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/ErrorHandler");
const upload = require("../middleware/upload");
const path = require("path");
const fs = require("fs");
// create product
router.post(
  "/create-product",
  upload.array("images", 5),
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log(req.body.images[0].name);
      const data = req.body;
      const shopId = req.body.shopId;
      console.log(shopId);
      const shop = await Shop.findById(shopId);
      // console.log(shop);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        let images = [];

        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }

        // Ensure uploads directory exists
        const imagesLinks = [];

        const productData = req.body;
        productData.images = imagesLinks;
        productData.shop = shop;
        console.log("Product Data");
        console.log(productData);
        const product = await Product.create(productData);
        let product_id = product._id.toString();
        console.log("Product ID: ", product_id);
        const uploadDir = path.join(
          __dirname,
          "../../frontend/public/uploads",
          shopId,
          product_id
        );
        console.log("Upload Dir: ", uploadDir);
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        let path_to_save = "uploads/";
        for (let i = 0; i < images.length; i++) {
          // add image in upload folder
          console.log("Images: ");
          var buff = Buffer.from(images[i].split(";base64,").pop(), "base64");
          fs.writeFileSync(path.join(uploadDir, `${product_id}.png`), buff);
          imagesLinks.push({
            path:
              path_to_save +
              shopId +
              "/" +
              product_id +
              "/" +
              product_id +
              ".png",
          });
        }
        console.log("Images Links: ");
        console.log(imagesLinks);
        product.images = imagesLinks;
        await product.save();
        res.status(200).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      console.log({ error });
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products of a shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete product of a shop
router.delete(
  "/delete-shop-product/:id",
  isSeller,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const product = await Product.findByIdAndRemove(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }

      res.status(200).json({
        success: true,
        message: "Product Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  async (req, res, next) => {
    try {
      console.log("Hello from get all products");
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        products,
      });
    } catch (error) {
      console.log("Errors in products", error);
      return next(new ErrorHandler(error, 400));
    }
  }
);

// review for a product
router.put(
  "/create-new-review",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let avg = 0;

      product.reviews.forEach((rev) => {
        avg += rev.rating;
      });

      product.ratings = avg / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        { $set: { "cart.$[elem].isReviewed": true } },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(200).json({
        success: true,
        message: "Reviwed succesfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all products --- for admin
router.get(
  "/admin-all-products",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);
module.exports = router;

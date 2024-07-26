const express = require("express");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Shop = require("../model/shop");
const Event = require("../model/event");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSeller, isAdmin, isAuthenticated } = require("../middleware/auth");
const router = express.Router();
const cloudinary = require("cloudinary");
const upload = require("../middleware/upload");
const path = require("path");
const fs = require("fs");
// create event
router.post(
  "/create-event",
  upload.array("images", 5),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      console.log("Shop ID: ", shopId);
      console.log("Images: ", req.body.start_Date, req.body.Finish_Date);
      console.log("Image Complete");
      const shop = await Shop.findById(shopId);
      if (!shop) {
        return next(new ErrorHandler("Shop Id is invalid!", 400));
      } else {
        let images = [];

        if (typeof req.body.images === "string") {
          images.push(req.body.images);
        } else {
          images = req.body.images;
        }

        const imagesLinks = [];

        const eventData = req.body;
        eventData.images = imagesLinks;
        eventData.shop = shop;
        const event_d = await Event.create(eventData);
        let event_id = event_d._id.toString();
        console.log("Event ID: ", event_id);
        const uploadDir = path.join(
          __dirname,
          "../../frontend/public/uploads_events",
          shopId,
          event_id
        );
        console.log("Upload Dir: ", uploadDir);
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
        }
        let path_to_save = "uploads_events/";
        for (let i = 0; i < images.length; i++) {
          // add image in upload folder
          console.log("Images: ");
          var buff = Buffer.from(images[i].split(";base64,").pop(), "base64");
          fs.writeFileSync(path.join(uploadDir, `${event_id}.png`), buff);
          imagesLinks.push({
            path:
              path_to_save + shopId + "/" + event_id + "/" + event_id + ".png",
          });
        }

        console.log("Images Links: ");
        event_d.images = imagesLinks;
        await event_d.save();

        res.status(201).json({
          success: true,
          event_d,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all events
router.get("/get-all-events", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

// get all events of a shop
router.get(
  "/get-all-events/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// delete event of a shop
router.delete(
  "/delete-shop-event/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const event = await Event.findById(req.params.id);

      if (!product) {
        return next(new ErrorHandler("Product is not found with this id", 404));
      }

      await event.remove();
      console.log("Deleted", req.params.id);
      res.status(201).json({
        success: true,
        message: "Event Deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// all events --- for admin
router.get(
  "/admin-all-events",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const events = await Event.find().sort({
        createdAt: -1,
      });
      res.status(201).json({
        success: true,
        events,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;

// models/BofferItem.js
const mongoose = require("mongoose");

const BrowserOfferSchema = new mongoose.Schema(
  {
    requestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ItemRequest",
      required: [true, "Request ID is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    ItemCondition: {
      type: String,
      required: [true, "Condition is required"],
      enum: ["New", "Like New", "Good", "Fair", "Poor"],
    },
    AvailableByDate: {
      type: Date,
      required: [true, "Available From date is required"],
    },
    AvailableDate: {
      type: Date,
      required: [true, "Available Until date is required"],
      validate: {
        validator: function (val) {
          return val > this.AvailableByDate;
        },
        message: "Available Until must be after Available From",
      },
    },
    flexibleDate: {
      type: Boolean,
      default: false,
    },
    pickupLocations: {
      type: [String],
      required: [true, "At least one pickup location is required"],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "Select at least one pickup location",
      },
    },
    flexibleLocation: {
      type: Boolean,
      default: false,
    },
    depositAgree: {
      type: Boolean,
      default: false,
      required: [true, "Need to agree this one"],
    },
    personalMessage: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

const BrowserOffer =
  mongoose.models.BrowserOffer ||
  mongoose.model("BrowserOffer", BrowserOfferSchema);

module.exports = { BrowserOffer };

// models/ItemRequest.js
const mongoose = require("mongoose");

const IItemRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title must be at most 100 characters"],
      trim: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["Electronics", "Books", "Clothing", "Tools", "Stationery", "Other"],
        message: "Category must be one of the predefined types",
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description must be at most 1000 characters"],
      trim: true,
    },
    purpose: {
      type: String,
      required: [true, "Purpose is required"],
      trim: true,
    },
    neededByDate: {
      type: Date,
      required: [true, "Needed By Date is required"],
      validate: {
        validator: function (value) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          return value >= today;
        },
        message: "Needed By Date cannot be in the past",
      },
    },
    flexibleDate: {
      type: Boolean,
      default: false,
    },
    urgencyLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: [true, "Urgency level is required"],
    },
    durationNeeded: {
      type: String,
      required: [true, "Duration needed is required"],
      trim: true,
    },
    pickupLocation: {
      type: String,
      required: [true, "Pickup location is required"],
      trim: true,
    },
    flexibleLocation: {
      type: Boolean,
      default: false,
    },
    specialInstructions: {
      type: String,
      maxlength: [500, "Special instructions must be at most 500 characters"],
    },
    tags: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.every((tag) => typeof tag === "string" && tag.length <= 20);
        },
        message: "Each tag must be a string up to 20 characters",
      },
    },
  },
  { timestamps: true }
);

const ItemRequest = mongoose.models.ItemRequest || mongoose.model("ItemRequest", IItemRequestSchema);

module.exports = { ItemRequest };
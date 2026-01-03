// models/Item.js
const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Item title is required"],
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
    condition: {
      type: String,
      required: [true, "Condition is required"],
      enum: {
        values: ["New", "Like New", "Good", "Fair", "Poor"],
        message: "Condition must be one of: New, Like New, Good, Fair, or Poor",
      },
    },
    photos: {
      type: [String],
      validate: {
        validator: function (arr) {
          return arr.every((url) => typeof url === "string");
        },
        message: "Photos must be an array of strings (URLs or filenames)",
      },
    },
    availableFrom: {
      type: Date,
      required: [true, "Available From date is required"],
      validate: [
        {
          validator: function (val) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return val >= today;
          },
          message: "Available From cannot be in the past",
        },
        {
          validator: function (val) {
            return !this.availableUntil || val < this.availableUntil;
          },
          message: "Available From must be before Available Until",
        },
      ],
    },
    availableUntil: {
      type: Date,
      required: [true, "Available Until date is required"],
      validate: [
        {
          validator: function (val) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return val >= today;
          },
          message: "Available Until cannot be in the past",
        },
        {
          validator: function (val) {
            return !this.availableFrom || val > this.availableFrom;
          },
          message: "Available Until must be after Available From",
        },
      ],
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
    requireDeposit: {
      type: Boolean,
      default: false,
    },
    specialConditions: {
      type: String,
      maxlength: [500, "Special conditions must be at most 500 characters"],
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

const Item = mongoose.models.Item || mongoose.model("Item", ItemSchema);

module.exports = { Item };

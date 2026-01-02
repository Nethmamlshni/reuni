// models/BreqItem.js
const mongoose = require("mongoose");

const BrowserRequestSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: [true, "Item reference is required"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    purpose: { type: String, required: true, trim: true },
    neededByDate: { type: Date, required: true },
    untillDate: { type: Date, required: true },
    flexibleDate: { type: Boolean, default: false },
    location: { type: String, required: true, trim: true },
    flexibleLocation: { type: Boolean, default: false },
    personalMessage: { type: String, trim: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      index: true,
    },
  },
  { timestamps: true }
);

const BreqItemModel =
  mongoose.models.BreqItem || mongoose.model("BreqItem", BrowserRequestSchema);

module.exports = { BreqItemModel };

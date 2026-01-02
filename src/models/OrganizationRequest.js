import mongoose from "mongoose";

const OrganizationRequestSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      required: true,
      trim: true,
    },

    organizationType: {
      type: String,
      required: true,
    },

    contactPersonName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },


    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item", 
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    purpose: {
      type: String,
      required: true,
      trim: true,
    },

    expectedImpact: {
      type: String,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    usageLocation: {
      type: String,
      required: true,
      trim: true,
    },

    urgencyLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    additionalNotes: {
      type: String,
      trim: true,
    },

    agreementConfirmed: {
      type: Boolean,
      required: true,
      default: false,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    adminComment: {
      type: String,
      trim: true,
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },

    approvedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, 
  }
);

export default mongoose.models.OrganizationRequest ||
  mongoose.model("OrganizationRequest", OrganizationRequestSchema);

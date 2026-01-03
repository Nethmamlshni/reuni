// models/EmailVerificationCode.js
const mongoose = require("mongoose");

const EmailVerificationCodeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 1200 }, // expires in 20 minutes
});

const EmailCode = mongoose.models.EmailCode || mongoose.model("EmailCode", EmailVerificationCodeSchema);

module.exports = { EmailCode };

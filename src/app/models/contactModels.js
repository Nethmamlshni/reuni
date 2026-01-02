// models/ContactForm.js
const mongoose = require("mongoose");

const ContactFormSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"] },
  subject: { type: String, required: [true, "Subject is required"] },
  message: { type: String, required: [true, "Message is required"] },
  createdAt: { type: Date, default: Date.now },
});

const ContactModel = mongoose.models.Contact || mongoose.model("Contact", ContactFormSchema);

module.exports = { ContactModel };

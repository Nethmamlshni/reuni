// app/api/contact/route.js
const { connectDB } = require('../../../lib/mongodb');
const { ContactModel } = require('../../../models/contactModels');
const nodemailer = require('nodemailer');

async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ message: "All fields are required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Save to MongoDB
    const contact = new ContactModel({ name, email, subject, message });
    await contact.save();

    // Send email to admin
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
      },
    });

    await transporter.sendMail({
      from: `"ShareMate Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f8fb; padding: 20px;">
          <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; box-shadow: 0 0 15px rgba(0, 123, 255, 0.15);">
            <div style="background-color: #2e80ff; padding: 20px; text-align: center;">
              <h2 style="color: #fff; margin: 0;">📩 New Contact Message</h2>
            </div>
            <div style="padding: 30px;">
              <p><strong>👤 Name:</strong> ${name}</p>
              <p><strong>📧 Email:</strong> ${email}</p>
              <p><strong>📌 Subject:</strong> ${subject}</p>
              <p style="margin-top: 20px;"><strong>📝 Message:</strong><br>${message}</p>
              <p style="font-size: 13px; color: #999; margin-top: 40px;">
                This message was sent from the ShareMate contact form.
              </p>
            </div>
            <div style="background-color: #eef3f9; padding: 15px; text-align: center; font-size: 12px; color: #666;">
              Made with 💙 by <strong>ShareMate</strong> | Uva Wellassa University
            </div>
          </div>
        </div>
      `,
    });

    return new Response(JSON.stringify({ message: "Message sent successfully" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error("Contact form error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

async function GET(req) {
  try {
    await connectDB();

    const messages = await ContactModel.find().sort({ createdAt: -1 }).lean();

    return new Response(JSON.stringify({ messages }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error("Error fetching contact messages:", err);
    return new Response(JSON.stringify({ message: "Failed to fetch messages" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

module.exports = { POST, GET };

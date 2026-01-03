// app/api/emailCode/route.js
const { connectDB } = require('../../../lib/mongodb');
const { EmailCode } = require('../../models/emailModels');
const { sendEmail } = require('../../../lib/sendEmail');
const crypto = require('crypto');

async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const email = body.email;

    if (!email) {
      return new Response(JSON.stringify({ message: "Email is required" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Generate a 6-digit random code
    const code = crypto.randomInt(100000, 999999).toString();

    // Remove any existing codes for this email
    await EmailCode.deleteMany({ email });

    // Save new code
    await EmailCode.create({ email, code });

    // Send the email
    await sendEmail(email, "Your verification code", `Your code is: ${code}`);

    return new Response(JSON.stringify({ message: "Verification code sent to email" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error("POST /send-code error:", err);
    return new Response(JSON.stringify({ message: "Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

module.exports = { POST };

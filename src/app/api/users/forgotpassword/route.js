import crypto from "crypto";
import { connectDB } from "../../../../lib/mongodb";
import { User } from "../../../models/userModels";
import { sendpasswordEmail } from "../../../../lib/resetemail";

// ---------------------------------------------
// --- POST: Forgot Password -------------------
// ---------------------------------------------
export async function POST(req) {
  await connectDB();

  const { email } = await req.json();

  if (!email) {
    return new Response(
      JSON.stringify({ error: "Email is required" }),
      { status: 400 }
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return new Response(
      JSON.stringify({ error: "User not found" }),
      { status: 404 }
    );
  }

  // Generate reset token
  const token = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = token;
  user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
  await user.save();

  // Create reset URL
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/Login/reset-password?token=${token}`;

  // Send reset email
  await sendpasswordEmail(
    user.email,
    "🔐 Password Reset Instructions",
    `
      <p>Click the link below to reset your password.</p>
      <p>This link will expire in 1 hour.</p>
      <a href="${resetUrl}">Reset Password</a>
    `
  );

  return new Response(
    JSON.stringify({
      success: true,
      message: "Password reset email sent",
      token: token,
    }),
    { status: 200 }
  );
}

import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/userModels";
import bcrypt from "bcryptjs";

// ---------------------------------------------
// --- POST: Reset Password --------------------
// ---------------------------------------------
export async function POST(req) {
  await connectDB();

  const { token, password } = await req.json();

  if (!token || !password) {
    return new Response(
      JSON.stringify({ error: "Token and password required" }),
      { status: 400 }
    );
  }

  // Find user with valid token
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    return new Response(
      JSON.stringify({ error: "Invalid or expired token" }),
      { status: 400 }
    );
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update user password and remove token
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();

  return new Response(
    JSON.stringify({ success: true, message: "Password has been reset" }),
    { status: 200 }
  );
}

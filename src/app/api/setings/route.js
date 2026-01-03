// app/api/setings/route.js
const { NextResponse } = require("next/server");
const { connectDB } = require("../../../lib/mongodb");
const { User } = require("../../../models/userModels");
const { verifyToken } = require("../../../lib/jwt");

async function PUT(req) {
  await connectDB();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const { notifications, privacyPublic } = await req.json();

  try {
    const user = await User.findByIdAndUpdate(
      payload.id,
      {
        notificationPreferences: notifications,
        isPublic: privacyPublic,
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Settings updated successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

module.exports = { PUT };

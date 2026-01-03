// app/api/upload/route.js
const { NextResponse } = require("next/server");
const cloudinary = require("../../../lib/cloudinary");

async function POST(req) {
  try {
    const { base64Image } = await req.json();

    if (!base64Image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const uploadResult = await cloudinary.uploader.upload(base64Image, {
      folder: "profile_photos",
    });

    return NextResponse.json({ url: uploadResult.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}

module.exports = { POST };

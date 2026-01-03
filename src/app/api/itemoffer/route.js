// /app/api/itemoffer/route.js
import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import { Item } from "../../models/itemofferModels";
import cloudinary from "../../../lib/cloudinary";

// ---------------------------------------------
// GET: Fetch all item offers
// ---------------------------------------------
export async function GET() {
  await connectDB();
  const items = await Item.find().sort({ createdAt: -1 });
  return NextResponse.json(items, { status: 200 });
}

// ---------------------------------------------
// POST: Create a new item offer
// ---------------------------------------------
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      title,
      userId,
      description,
      category,
      condition,
      photos,
      availableFrom,
      availableUntil,
      pickupLocations,
      requireDeposit,
      specialConditions,
      tags,
    } = body;

    // Validation
    if (!title || !userId || !description || !category || !condition || !photos || !availableFrom || !availableUntil || !pickupLocations) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!Array.isArray(photos) || photos.length === 0) {
      return NextResponse.json({ error: "At least one photo is required" }, { status: 400 });
    }

    // Upload photos to Cloudinary
    const uploadedPhotos = [];
    for (const photo of photos) {
      const uploadResult = await cloudinary.uploader.upload(photo, { folder: "item-offers" });
      uploadedPhotos.push(uploadResult.secure_url);
    }

    const newItem = await Item.create({
      title,
      userId,
      description,
      category,
      condition,
      photos: uploadedPhotos,
      availableFrom,
      availableUntil,
      pickupLocations,
      requireDeposit: requireDeposit || false,
      specialConditions: specialConditions || "",
      tags: Array.isArray(tags) ? tags : [],
    });

    return NextResponse.json({ message: "Item created successfully", item: newItem }, { status: 201 });
  } catch (err) {
    console.error("Error creating item:", err);
    return NextResponse.json({ error: "Failed to create item", details: err.message }, { status: 500 });
  }
}

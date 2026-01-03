// /app/api/browse/all/route.js
import { connectDB } from "../../../lib/mongodb";
import { ItemRequest } from "../models/itemreqModels";
import { Item } from "../models/itemofferModels";
import "../models/userModels"; // Ensure User model is registered for populate
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    // Fetch itemRequests and itemOffers with user details
    const [itemRequests, itemOffers] = await Promise.all([
      ItemRequest.find().sort({ createdAt: -1 }).populate("userId"),
      Item.find().sort({ createdAt: -1 }).populate("userId"),
    ]);

    return NextResponse.json({
      itemRequests,
      itemOffers,
    });
  } catch (error) {
    console.error("[BROWSE API ERROR]", error);
    const message = error && error.message ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

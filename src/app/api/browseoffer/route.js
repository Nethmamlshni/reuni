import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import { BrowserOffer } from "../../../../models/browseofferModels";
import mongoose from "mongoose";

// ----------------------------------------------
// ---------- POST: Create a new browser offer ----------
// ----------------------------------------------
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      requestId,
      userId,
      ItemCondition,
      AvailableByDate,
      AvailableDate,
      flexibleDate,
      pickupLocations,
      flexibleLocation,
      depositAgree,
      personalMessage,
    } = body;

    // Basic validation
    if (
      !requestId ||
      !userId ||
      !ItemCondition ||
      !AvailableByDate ||
      !AvailableDate ||
      !pickupLocations ||
      !Array.isArray(pickupLocations) ||
      pickupLocations.length === 0
    ) {
      return NextResponse.json(
        { message: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return NextResponse.json({ message: "Invalid Request ID" }, { status: 400 });
    }

    // Create new BrowserOffer
    const newOffer = await BrowserOffer.create({
      requestId,
      userId,
      ItemCondition,
      AvailableByDate,
      AvailableDate,
      flexibleDate: flexibleDate || false,
      pickupLocations,
      flexibleLocation: flexibleLocation || false,
      personalMessage: personalMessage || "",
      depositAgree: depositAgree || false,
    });

    return NextResponse.json(newOffer, { status: 201 });
  } catch (error) {
    console.error("Error creating offer:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

// ----------------------------------------------
// ---------- GET: Fetch all browser offers ----------
// ----------------------------------------------
export async function GET() {
  try {
    await connectDB();
    const allOffers = await BrowserOffer.find();
    return NextResponse.json(allOffers, { status: 200 });
  } catch (error) {
    console.error("Error fetching offers:", error);
    return NextResponse.json({ message: error.message || "Internal Server Error" }, { status: 500 });
  }
}

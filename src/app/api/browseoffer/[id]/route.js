import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import { BrowserOffer } from "../../../models/browseofferModel";

// ----------------------------------------------
// ---------- GET: Fetch by offerId, userId, or requestId --------------
// ----------------------------------------------
export async function GET(_, context) {
  try {
    await connectDB();
    const id = context.params.id; // no await here
    console.log("Fetching browse offer with id:", id);

    // Try direct offer id
    const offer = await BrowserOffer.findById(id).populate("userId");
    if (offer) return NextResponse.json(offer, { status: 200 });

    // Try offers by userId
    const userOffers = await BrowserOffer.find({ userId: id }).sort({ createdAt: -1 });
    if (userOffers.length > 0) return NextResponse.json(userOffers, { status: 200 });

    // Try offers by requestId
    const requestOffers = await BrowserOffer.find({ requestId: id })
      .sort({ createdAt: -1 })
      .populate("userId");
    if (requestOffers.length > 0) return NextResponse.json(requestOffers, { status: 200 });

    return NextResponse.json({ message: "No matching browse offer found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}


// ----------------------------------------------
// ---------- PUT: Update an offer --------------
// ----------------------------------------------
export async function PUT(request, context) {
  try {
    await connectDB();
    const data = await request.json();
    const updatedItem = await BrowserOffer.findByIdAndUpdate(
      context.params.id,
      data,
      { new: true, runValidators: true }
    );
    if (!updatedItem)
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// ----------------------------------------------
// ---------- PATCH: Accept/Reject offer status --------------
// ----------------------------------------------
export async function PATCH(request, context) {
  try {
    await connectDB();
    const { action } = await request.json();
    if (!action || !["accept", "reject"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    const status = action === "accept" ? "accepted" : "rejected";

    const updated = await BrowserOffer.findByIdAndUpdate(
      context.params.id,
      { status },
      { new: true }
    );

    if (!updated)
      return NextResponse.json({ message: "Offer not found" }, { status: 404 });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// ----------------------------------------------
// ---------- DELETE: Delete an offer --------------
// ----------------------------------------------
export async function DELETE(_, context) {
  try {
    await connectDB();
    const deleted = await BrowserOffer.findByIdAndDelete(context.params.id);
    if (!deleted)
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

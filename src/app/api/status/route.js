// app/api/stats/route.js
const { NextResponse } = require("next/server");
const { connectDB } = require("@/lib/mongodb");
const { User } = require("@/models/userModels");
const { Item } = require("@/models/itemofferModels");
const { ItemRequest } = require("@/models/itemreqModels");

async function GET() {
  try {
    await connectDB();

    // Count students with UWU emails
    const totalStudents = await User.countDocuments({
      email: { $regex: /@std\.uwu\.ac\.lk$/i },
    });

    // Count item offers
    const totalItemOffers = await Item.countDocuments();

    // Count item requests
    const totalItemRequests = await ItemRequest.countDocuments();

    return NextResponse.json({
      totalStudents,
      totalItemOffers,
      totalItemRequests,
    });
  } catch (error) {
    console.error("[STATS ERROR]", error);
    return NextResponse.json(
      { error: error.message || "Failed to retrieve statistics" },
      { status: 500 }
    );
  }
}

module.exports = { GET };

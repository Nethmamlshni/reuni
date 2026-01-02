// app/api/userItems/[id]/route.js
const { NextResponse } = require("next/server");
const { connectDB } = require("@/lib/mongodb");
const { ItemRequest } = require("@/models/itemreqModels");
const { Item } = require("@/models/itemofferModels");

async function GET(request, { params }) {
  try {
    await connectDB();
    const userId = params.id;

    const itemRequests = await ItemRequest.find({ userId });
    const itemOffers = await Item.find({ userId });

    return NextResponse.json({
      itemRequests,
      itemOffers,
    });
  } catch (error) {
    console.error("Error fetching user items:", error);
    return NextResponse.json(
      { error: "Failed to fetch user items", details: error.message },
      { status: 500 }
    );
  }
}

module.exports = { GET };

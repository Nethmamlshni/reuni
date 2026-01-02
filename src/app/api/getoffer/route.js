// app/api/browsereq/count/route.js
const { connectDB } = require('@/lib/mongodb');
const { BreqItemModel } = require('@/models/browsereqModels');
const mongoose = require('mongoose');

async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get("itemId");

  if (!itemId || typeof itemId !== "string") {
    return new Response(JSON.stringify({ error: "Item ID is required" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return new Response(JSON.stringify({ error: "Invalid item ID format" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const count = await BreqItemModel.countDocuments({ item: itemId });
    return new Response(JSON.stringify({ itemId, requestCount: count }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Failed to count browser requests:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

module.exports = { GET };

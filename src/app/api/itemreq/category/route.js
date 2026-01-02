// app/api/item-requests/category/route.js
const { connectDB } = require('../../../../lib/mongodb');
const { ItemRequest } = require('../../../models/itemreqModels');

async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");

  if (!category) {
    return new Response(
      JSON.stringify({ error: "Category parameter is required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const requests = await ItemRequest.find({ category });
    return new Response(JSON.stringify(requests), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

module.exports = { GET };

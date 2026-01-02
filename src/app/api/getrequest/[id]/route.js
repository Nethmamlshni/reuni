// app/api/browseoffer/count/route.js
const { connectDB } = require('../../../../lib/mongodb');
const { BrowserOffer } = require('../../../models/browseofferModel');
const mongoose = require('mongoose');

async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const requestId = searchParams.get("requestId");

  if (!requestId) {
    return new Response(JSON.stringify({ error: "Request ID is required" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    return new Response(JSON.stringify({ error: "Invalid Request ID format" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const count = await BrowserOffer.countDocuments({ requestId });
    return new Response(JSON.stringify({ requestId, offerCount: count }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Failed to count offers:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

module.exports = { GET };

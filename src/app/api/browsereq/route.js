// app/api/browsereq/route.js
const { connectDB } = require('../../../lib/mongodb');
const { BreqItemModel } = require('../../models/browsereqModels');

// --------------------------------------------
// ---------- POST: Create a request ----------
// --------------------------------------------
async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const {
      item,
      userId,
      purpose,
      neededByDate,
      untillDate,
      flexibleDate,
      location,
      flexibleLocation,
      personalMessage,
    } = body;

    // Validation
    if (!item || !userId || !purpose || !neededByDate || !untillDate || !location) {
      return new Response(JSON.stringify({ message: "Missing required fields" }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const newRequest = await BreqItemModel.create({
      item,
      userId,
      purpose,
      neededByDate,
      untillDate,
      flexibleDate: flexibleDate || false,
      location,
      flexibleLocation: flexibleLocation || false,
      personalMessage: personalMessage || '',
    });

    return new Response(JSON.stringify(newRequest), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error creating request:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// ---------------------------------------------
// ---------- GET: Fetch all browse requests ----------
// ---------------------------------------------
async function GET() {
  try {
    await connectDB();
    const requests = await BreqItemModel.find();
    return new Response(JSON.stringify(requests), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error fetching browse requests:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

module.exports = { POST, GET };

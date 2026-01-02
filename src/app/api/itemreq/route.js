// app/api/item-requests/route.js
const { connectDB } = require("@/lib/mongodb");
const { ItemRequest } = require("@/models/itemreqModels");

// ---------------------------------------------
// --- GET: Fetch all item requests ------------
// ---------------------------------------------
async function GET() {
  await connectDB();
  const requests = await ItemRequest.find().sort({ createdAt: -1 });
  return new Response(JSON.stringify(requests), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

// ---------------------------------------------
// --- POST: Create a new item request ---------
// ---------------------------------------------
async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      userId,
      category,
      description,
      purpose,
      neededByDate,
      flexibleDate,
      urgencyLevel,
      durationNeeded,
      pickupLocation,
      flexibleLocation,
      specialInstructions,
      tags,
    } = body;

    // ✅ Basic field validation
    if (
      !title ||
      !userId ||
      !category ||
      !description ||
      !purpose ||
      !neededByDate ||
      !urgencyLevel ||
      !durationNeeded ||
      !pickupLocation
    ) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Validate tags if provided
    if (
      tags &&
      (!Array.isArray(tags) ||
        !tags.every((tag) => typeof tag === "string" && tag.length <= 20))
    ) {
      return new Response(
        JSON.stringify({
          error: "Tags must be strings with max length of 20 characters",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // ✅ Create and save the request
    const newRequest = new ItemRequest({
      title,
      userId,
      category,
      description,
      purpose,
      neededByDate,
      flexibleDate: flexibleDate || false,
      urgencyLevel,
      durationNeeded,
      pickupLocation,
      flexibleLocation: flexibleLocation || false,
      specialInstructions: specialInstructions || "",
      tags: tags || [],
    });

    await newRequest.save();

    return new Response(
      JSON.stringify({ message: "Item request created", request: newRequest }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error creating request:", err);
    return new Response(
      JSON.stringify({ error: "Failed to create item request", details: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

module.exports = { GET, POST };

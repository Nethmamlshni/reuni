//app/api/offer&req/route.js
const { connectDB } = require("../../../lib/mongodb");
const { BreqItemModel } = require("../../models/browsereqModels");
const { BrowserOffer } = require("../../models/browseofferModel");
const { Item } = require("../../models/itemofferModels");
const { ItemRequest } = require("../../models/itemreqModels");
const mongoose = require("mongoose");


async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing userId" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Fetch all documents related to this user
    const browserRequests = await BreqItemModel.find({ userId: userObjectId });
    const browserOffers = await BrowserOffer.find({ userId: userObjectId });
    const itemRequests = await ItemRequest.find({ userId: userObjectId });
    const itemOffers = await Item.find({ userId: userObjectId });

    const result = {
      userId,
      browserRequestIds: browserRequests.map((doc) => doc._id),
      browserOfferIds: browserOffers.map((doc) => doc._id),
      itemRequestIds: itemRequests.map((doc) => doc._id),
      itemOfferIds: itemOffers.map((doc) => doc._id),
    };

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching user items:", err);
    return new Response(JSON.stringify({ error: "Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

module.exports = { GET };
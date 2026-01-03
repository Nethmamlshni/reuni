// app/api/search/route.js
const { connectDB } = require("../../../lib/mongodb");
const { Item } = require("../../models/itemofferModels");
const { ItemRequest } = require("../../models/itemreqModels");
const { BreqItemModel } = require("../../models/browsereqModels");
const { BrowserOffer } = require("../../models/browseofferModel");

async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const type = searchParams.get("type");

  if (!query || !type) {
    return new Response(JSON.stringify({ error: "Missing query or type" }), {
      status: 400,
    });
  }

  await connectDB();

  try {
    let results = [];

    switch (type) {
      case "item-request":
        results = await ItemRequest.find({
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { tags: { $regex: query, $options: "i" } },
          ],
        });
        break;

      case "item-offer":
        results = await Item.find({
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { tags: { $regex: query, $options: "i" } },
          ],
        });
        break;

      case "browse-request":
        results = await BreqItemModel.find({
          $or: [
            { purpose: { $regex: query, $options: "i" } },
            { location: { $regex: query, $options: "i" } },
            { specialRequests: { $regex: query, $options: "i" } },
          ],
        });
        break;

      case "browse-offer":
        results = await BrowserOffer.find({
          $or: [
            { specialConditions: { $regex: query, $options: "i" } },
            { personalMessage: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
          ],
        });
        break;

      default:
        return new Response(JSON.stringify({ error: "Invalid type" }), {
          status: 400,
        });
    }

    return new Response(
      JSON.stringify({ type, count: results.length, results }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("[API ERROR]", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

module.exports = { GET };

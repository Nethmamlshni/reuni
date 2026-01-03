// app/api/stats/category/route.js
const { NextResponse } = require("next/server");
const { connectDB } = require("../../../lib/mongodb");
const { BreqItemModel } = require("../../../models/browsereqModels");
const { BrowserOffer } = require("../../../models/browseofferModels");
const { Item } = require("../../../models/itemofferModels");
const { ItemRequest } = require("../../../models/itemreqModels");

async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const categoryFilter = searchParams.get("category"); // e.g., Electronics

    // === BROWSER REQUEST COUNTS ===
    const populatedBrowserRequests = await BreqItemModel.find().populate("item", "category");
    const requestCounts = {};
    for (const r of populatedBrowserRequests) {
      const category = r.item?.category;
      if (category && (!categoryFilter || category === categoryFilter)) {
        requestCounts[category] = (requestCounts[category] || 0) + 1;
      }
    }

    // === BROWSER OFFER COUNTS ===
    const populatedBrowserOffers = await BrowserOffer.find().populate("requestId", "category");
    const offerCounts = {};
    for (const offer of populatedBrowserOffers) {
      const category = offer.requestId?.category;
      if (category && (!categoryFilter || category === categoryFilter)) {
        offerCounts[category] = (offerCounts[category] || 0) + 1;
      }
    }

    // === ITEM OFFER COUNTS ===
    const itemOffers = await Item.find({}, "category");
    const itemOfferCounts = {};
    for (const item of itemOffers) {
      const category = item.category;
      if (category && (!categoryFilter || category === categoryFilter)) {
        itemOfferCounts[category] = (itemOfferCounts[category] || 0) + 1;
      }
    }

    // === ITEM REQUEST COUNTS ===
    const itemRequests = await ItemRequest.find({}, "category");
    const itemRequestCounts = {};
    for (const itemReq of itemRequests) {
      const category = itemReq.category;
      if (category && (!categoryFilter || category === categoryFilter)) {
        itemRequestCounts[category] = (itemRequestCounts[category] || 0) + 1;
      }
    }

    // === Combine total counts for final sum ===
    const combinedCounts = {};
    [requestCounts, offerCounts, itemOfferCounts, itemRequestCounts].forEach((dataset) => {
      for (const [category, count] of Object.entries(dataset)) {
        combinedCounts[category] = (combinedCounts[category] || 0) + count;
      }
    });

    const totalCounts = Object.values(combinedCounts).reduce((acc, val) => acc + val, 0);

    // === Filter response output ===
    const result = {
      totalCounts: categoryFilter ? combinedCounts[categoryFilter] || 0 : totalCounts,
      requestCounts: categoryFilter
        ? { [categoryFilter]: requestCounts[categoryFilter] || 0 }
        : requestCounts,
      offerCounts: categoryFilter
        ? { [categoryFilter]: offerCounts[categoryFilter] || 0 }
        : offerCounts,
      itemOfferCounts: categoryFilter
        ? { [categoryFilter]: itemOfferCounts[categoryFilter] || 0 }
        : itemOfferCounts,
      itemRequestCounts: categoryFilter
        ? { [categoryFilter]: itemRequestCounts[categoryFilter] || 0 }
        : itemRequestCounts,
    };

    return NextResponse.json(result, { status: 200 });

  } catch (err) {
    console.error("Category stats error:", err);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

module.exports = { GET };

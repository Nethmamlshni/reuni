// /app/api/admin/overview/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/userModels";
import { ItemRequest } from "@/models/itemreqModels";
import { BrowserOffer } from "@/models/browseofferModels";
import { Item } from "@/models/itemofferModels";
import { BreqItemModel } from "@/models/browsereqModels";

export const GET = async () => {
  try {
    await connectDB();

    const users = await User.find().select("-password");

    const itemRequests = await ItemRequest.find()
      .populate("userId", "firstname lastname email")
      .lean();

    const browseOffers = await BrowserOffer.find()
      .populate("userId", "firstname lastname email")
      .populate("requestId")
      .lean();

    const itemOffers = await Item.find()
      .populate("userId", "firstname lastname email")
      .lean();

    const browseRequests = await BreqItemModel.find()
      .populate("userId", "firstname lastname email")
      .populate("item")
      .lean();

    return NextResponse.json({
      users,
      itemRequests,
      browseOffers,
      itemOffers,
      browseRequests,
    });
  } catch (error) {
    console.error("Admin data fetch error:", error);
    return NextResponse.json({ error: "Failed to load admin data" }, { status: 500 });
  }
};


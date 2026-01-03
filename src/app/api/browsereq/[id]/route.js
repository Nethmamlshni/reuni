import { NextResponse } from "next/server";
import { connectDB } from "../../../../lib/mongodb";
import { BreqItemModel } from "../../../models/browsereqModels";

// ----------------------------------------------
// ---------- GET: Get a request by ID, userId, or itemId ----------
// ----------------------------------------------
export async function GET(_, context) {
  try {
    await connectDB();
    const { id } = await context.params; // no await needed
    if (!id) {
      return NextResponse.json({ message: "Missing id param" }, { status: 400 });
    }

    // Try find by request _id
    const reqDoc = await BreqItemModel.findById(id).populate("userId");
    if (reqDoc) {
      return NextResponse.json(reqDoc, { status: 200 });
    }

    // Try find by userId
    const userReqs = await BreqItemModel.find({ userId: id }).sort({ createdAt: -1 });
    if (userReqs.length > 0) {
      return NextResponse.json(userReqs, { status: 200 });
    }

    // Try find by itemId
    const itemReqs = await BreqItemModel.find({ item: id }).sort({ createdAt: -1 }).populate("userId");
    if (itemReqs.length > 0) {
      return NextResponse.json(itemReqs, { status: 200 });
    }

    return NextResponse.json({ message: "No matching request found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// -----------------------------------------------
// ---------- PUT: Update request by ID ----------
// -----------------------------------------------
export async function PUT(request, context) {
  try {
    await connectDB();
    const { id } = await context.params;
    if (!id) {
      return NextResponse.json({ message: "Missing id param" }, { status: 400 });
    }

    const data = await request.json();

    const updated = await BreqItemModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return NextResponse.json({ message: "Request not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// --------------------------------------------------
// ---------- PATCH: Accept/Reject by ID ----------
// --------------------------------------------------
export async function PATCH(request, context) {
  try {
    await connectDB();
    const { id } = context.params;
    if (!id) {
      return NextResponse.json({ message: "Missing id param" }, { status: 400 });
    }

    const body = await request.json();
    const action = body.action;
    if (!action || !["accept", "reject"].includes(action)) {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    const status = action === "accept" ? "accepted" : "rejected";
    const updated = await BreqItemModel.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      return NextResponse.json({ message: "Request not found" }, { status: 404 });
    }

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

// --------------------------------------------------
// ---------- DELETE: Delete request by ID ----------
// --------------------------------------------------
export async function DELETE(_, context) {
  try {
    await connectDB();
    const { id } = context.params;
    if (!id) {
      return NextResponse.json({ message: "Missing id param" }, { status: 400 });
    }

    const deleted = await BreqItemModel.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ message: "Request not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

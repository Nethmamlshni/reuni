import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import OrganizationRequest from "@/models/OrganizationRequest";

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const { id } = params;
    const body = await req.json();

    const { status, adminComment, adminId } = body;

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json(
        { message: "Invalid status" },
        { status: 400 }
      );
    }

    const updatedRequest = await OrganizationRequest.findByIdAndUpdate(
      id,
      {
        status,
        adminComment,
        approvedBy: adminId,
        approvedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedRequest) {
      return NextResponse.json(
        { message: "Request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: `Request ${status} successfully`,
        data: updatedRequest,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Organization request PATCH error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

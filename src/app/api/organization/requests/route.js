import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import OrganizationRequest from "@/models/OrganizationRequest";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      organizationName,
      organizationType,
      contactPersonName,
      email,
      phoneNumber,
      itemId,
      quantity,
      purpose,
      expectedImpact,
      startDate,
      endDate,
      usageLocation,
      urgencyLevel,
      additionalNotes,
      agreementConfirmed,
    } = body;

    if (
      !organizationName ||
      !organizationType ||
      !contactPersonName ||
      !email ||
      !phoneNumber ||
      !itemId ||
      !quantity ||
      !purpose ||
      !startDate ||
      !endDate ||
      !usageLocation ||
      agreementConfirmed !== true
    ) {
      return NextResponse.json(
        { message: "Missing or invalid required fields" },
        { status: 400 }
      );
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return NextResponse.json(
        { message: "End date must be after start date" },
        { status: 400 }
      );
    }

    const request = await OrganizationRequest.create({
      organizationName,
      organizationType,
      contactPersonName,
      email,
      phoneNumber,
      itemId,
      quantity,
      purpose,
      expectedImpact,
      startDate,
      endDate,
      usageLocation,
      urgencyLevel,
      additionalNotes,
      agreementConfirmed,
    });

    return NextResponse.json(
      {
        message: "Organization request submitted successfully",
        data: request,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Organization request POST error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

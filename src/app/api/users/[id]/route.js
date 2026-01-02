import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import { User } from "../../../models/userModels";
import bcrypt from "bcryptjs";
import { verifyToken } from "../../../lib/jwt";
import cloudinary from "../../../lib/cloudinary";

// ---------------------------------------------
// --- GET: Fetch User by Token ----------------  
// ---------------------------------------------
export async function GET(request) {
  await connectDB();

  const token = request.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  const user = await User.findById(payload.id).select("-password");
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  let profilePicUrl = null;
  if (user.profilePicture) {
    profilePicUrl = cloudinary.url(user.profilePicture, {
      width: 200,
      height: 200,
      crop: "fill",
      fetch_format: "auto",
      quality: "auto",
    });
  }

  return NextResponse.json({
    user: {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      role: user.role,
      degreeProgram: user.degreeProgram,
      yearOfStudy: user.yearOfStudy,
      profilePicture: profilePicUrl,
      phoneNumber: user.phoneNumber,
      address: user.address,
      Bio: user.Bio,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  });
}

// ---------------------------------------------
// --- PUT: Update User by ID ------------------
// ---------------------------------------------
export async function PUT(request, context) {
  try {
    await connectDB();

   const { id: userId } = await context.params;
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      degreeProgram,
      yearOfStudy,
      profilePicture,
      phoneNumber,
      address,
      Bio,
    } = await request.json();

    const updateData = {};
    if (firstname) updateData.firstname = firstname;
    if (lastname) updateData.lastname = lastname;
    if (username) updateData.username = username;
    if (phoneNumber) updateData.phoneNumber = phoneNumber;
    if (address) updateData.address = address;
    if (Bio) updateData.Bio = Bio;
    if (degreeProgram) updateData.degreeProgram = degreeProgram;
    if (yearOfStudy) updateData.yearOfStudy = yearOfStudy;
    if (email) updateData.email = email;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    // Upload profile picture if base64
    if (profilePicture && profilePicture.startsWith("data:image")) {
      const uploadResult = await cloudinary.uploader.upload(profilePicture, {
        folder: "profile-photos",
      });
      updateData.profilePicture = uploadResult.secure_url;
    } else if (profilePicture && typeof profilePicture === "string") {
      updateData.profilePicture = profilePicture;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User updated successfully",
      user: {
        id: updatedUser._id,
        firstname: updatedUser.firstname,
        lastname: updatedUser.lastname,
        username: updatedUser.username,
        profilePicture: updatedUser.profilePicture || null,
        phoneNumber: updatedUser.phoneNumber,
        address: updatedUser.address,
        Bio: updatedUser.Bio,
        degreeProgram: updatedUser.degreeProgram,
        yearOfStudy: updatedUser.yearOfStudy,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// ---------------------------------------------
// --- DELETE: Delete User by ID ---------------
// ---------------------------------------------
export async function DELETE(request, context) {
  try {
    await connectDB();

    const { id: userId } = context.params;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

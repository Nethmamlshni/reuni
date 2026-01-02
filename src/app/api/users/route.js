import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import { EmailCode } from "../../models/emailModels";
import { User } from "../../models/userModels";
import bcrypt from "bcryptjs";

// ---------------------------------------------
// --- POST: Register a new user ----------------
// ---------------------------------------------
export async function POST(request) {
  await connectDB();

  const {
    firstname,
    lastname,
    username,
    email,
    password,
    degreeProgram,
    yearOfStudy,
    code,
    role = "user",
    phoneNumber,
    address,
    Bio,
    profilePicture,
    profilePictureId,
  } = await request.json();

  // ✅ Check required fields
  if (
    !firstname ||
    !lastname ||
    !username ||
    !email ||
    !password ||
    !degreeProgram ||
    !yearOfStudy ||
    !code
  ) {
    return NextResponse.json({ message: "All fields are required" }, { status: 400 });
  }

  const emailNormalized = email.trim().toLowerCase();

  // ✅ Check UWU email format
  const emailRegex = /^[a-zA-Z]{3,4}\d{5}@std\.uwu\.ac\.lk$/;
  if (!emailRegex.test(emailNormalized)) {
    return NextResponse.json(
      {
        message:
          "Invalid email format. Only UWU student emails (e.g., abc12345@std.uwu.ac.lk) are allowed",
      },
      { status: 400 }
    );
  }

  // ✅ Validate degree program
  const validDegreePrograms = ["ICT", "Computer Science", "Engineering", "Other"];
  if (!validDegreePrograms.includes(degreeProgram)) {
    return NextResponse.json(
      {
        message: "Degree Program must be ICT, Computer Science, Engineering, or Other",
      },
      { status: 400 }
    );
  }

  // ✅ Check if email verification code is valid
  const codeRecord = await EmailCode.findOne({ email: emailNormalized, code });
  if (!codeRecord) {
    return NextResponse.json({ message: "Invalid or expired verification code" }, { status: 400 });
  }

  // ✅ Check if user already exists
  const existingUser = await User.findOne({ email: emailNormalized });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 400 });
  }

  // ✅ Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ Create user
  const newUser = await User.create({
    firstname,
    lastname,
    username,
    email: emailNormalized,
    password: hashedPassword,
    degreeProgram,
    yearOfStudy,
    role,
    phoneNumber,
    address,
    Bio,
    profilePicture,
    profilePictureId,
  });

  // ✅ Delete used code
  await EmailCode.deleteOne({ email: emailNormalized });

  return NextResponse.json(
    {
      message: "User registered successfully",
      user: {
        id: newUser._id,
        firstname,
        lastname,
        username,
        email: emailNormalized,
        degreeProgram,
        yearOfStudy,
        role,
        phoneNumber,
        address,
        Bio,
        profilePicture,
        profilePictureId,
      },
    },
    { status: 201 }
  );
}

// ---------------------------------------------
// --- GET: Fetch all users ---------------------
// ---------------------------------------------
export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json({ users });
}

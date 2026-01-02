import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "First name is required"],
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name must be at most 50 characters"],
      trim: true,
    },
    lastname: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name must be at most 50 characters"],
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [20, "Username must be at most 20 characters"],
      trim: true,
    },
    phoneNumber: {
      type: String,
      match: [
        /^\+94\d{9}$/,
        "Phone number must be in the format +94XXXXXXXXX (e.g., +94712345678)",
      ],
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    address: {
      type: String,
      minlength: [10, "Address must be at least 10 characters"],
      maxlength: [100, "Address must be at most 100 characters"],
      trim: true,
    },
    profilePicture: {
      type: String,
      match: [
        /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/,
        "Profile picture must be a valid URL ending with .png, .jpg, .jpeg, .gif, or .webp",
      ],
    },
    profilePictureId: {
      type: String, // Cloudinary public_id
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[a-zA-Z]{3,4}\d{5}@std\.uwu\.ac\.lk$/,
        "Only UWU student emails (e.g., abc12345@std.uwu.ac.lk) are allowed",
      ],
    },
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters"],
    },
    degreeProgram: {
      type: String,
      enum: ["ICT", "Computer Science", "Engineering", "Other"],
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    Bio: {
      type: String,
      maxlength: [500, "Bio must be at most 500 characters"],
      trim: true,
    },
    yearOfStudy: {
      type: Number,
      min: [1, "Year of Study must be at least 1"],
      max: [5, "Year of Study must be at most 5"],
    },
  },
  { timestamps: true }
);

export const User = mongoose.models.User || mongoose.model("User", UserSchema);

import { NextResponse } from "next/server"; // <-- IMPORT THIS

export async function GET(request) {
  console.log("hello");
  return NextResponse.json({ message: "Hello from Next.js!" });
}

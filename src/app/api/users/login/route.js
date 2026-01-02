import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import { User } from '../../../models/userModels';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../lib/jwt';

// ---------------------------------------------
// --- POST: User Login -------------------------
// ---------------------------------------------
export async function POST(request) {
  await connectDB();

  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: 'Email and password required' },
      { status: 400 }
    );
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { message: 'User not found' },
      { status: 404 }
    );
  }

  const isMatch = await bcrypt.compare(password, user.password || '');
  if (!isMatch) {
    return NextResponse.json(
      { message: 'Invalid password' },
      { status: 401 }
    );
  }

  const token = generateToken({
    id: user._id.toString(),
    email: user.email,
  });

  const response = NextResponse.json({
    message: 'Login successful',
    user: {
      id: user._id,
      name: user.firstname,
      email: user.email,
      role: user.role,
      token: token,
    },
  });

  // Set httpOnly cookie (expires in 7 days)
  response.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    sameSite: 'strict',
  });

  return response;
}

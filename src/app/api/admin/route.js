// /app/api/users-items/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import { Item } from '../../models/itemofferModels';
import { ItemRequest } from '../../models/itemreqModels';

export async function GET() {
  try {
    await connectDB();

    // Fetch all item requests with user info
    const requests = await ItemRequest.find()
      .populate('userId')
      .sort({ createdAt: -1 });

    // Fetch all offered items with user info
    const offers = await Item.find()
      .populate('userId')
      .sort({ createdAt: -1 });

    return NextResponse.json({ requests, offers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

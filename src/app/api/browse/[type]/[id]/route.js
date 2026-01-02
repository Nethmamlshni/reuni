// /app/api/update/[type]/[id]/route.js
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

import { Item } from '@/models/itemofferModels';
import { ItemRequest } from '@/models/itemreqModels';
import { BrowserOffer } from '@/models/browseofferModels';
import { BreqItemModel } from '@/models/browsereqModels';

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGODB_URI);
  }
}

export async function PUT(req, { params }) {
  const { type, id } = params;

  await connectDB();

  const data = await req.json();

  // Map type to Mongoose Model
  let Model;

  switch (type) {
    case 'itemoffer':
      Model = Item;
      break;
    case 'itemreq':
      Model = ItemRequest;
      break;
    case 'browseoffer':
      Model = BrowserOffer;
      break;
    case 'browsereq':
      Model = BreqItemModel;
      break;
    default:
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const updatedDoc = await Model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoc) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 });
    }

    return NextResponse.json(updatedDoc, { status: 200 });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update document' }, { status: 500 });
  }
}


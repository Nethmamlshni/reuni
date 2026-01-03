// app/api/itemoffer/[id]/route.js
const { connectDB } = require('../../../../lib/mongodb');
const { Item } = require('../../../models/itemofferModels');
const cloudinary = require('../../../../lib/cloudinary');

// ---------------------------------------------
// --- GET: Fetch item offer by ID -------------
// ---------------------------------------------
async function GET(_, { params }) {
  try {
    await connectDB();

    const id = params.id;

    // Try to find by item _id first
    const item = await Item.findById(id).populate('userId');
    if (item) {
      return new Response(JSON.stringify(item), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // If not found, try to find all items for userId
    const userItems = await Item.find({ userId: id }).sort({ createdAt: -1 });
    if (userItems.length > 0) {
      return new Response(JSON.stringify(userItems), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'No matching record found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// ---------------------------------------------
// --- PUT: Update item offer by ID ------------
// ---------------------------------------------
async function PUT(req, { params }) {
  try {
    await connectDB();
    const id = params.id;
    const body = await req.json();

    const updatedFields = { ...body };

    // Handle new photos if provided
    if (body.photos && Array.isArray(body.photos)) {
      const uploadedPhotos = [];

      for (const photo of body.photos) {
        if (photo.startsWith('data:image/')) {
          const uploadResult = await cloudinary.uploader.upload(photo, {
            folder: 'item-offers',
          });
          uploadedPhotos.push(uploadResult.secure_url);
        } else {
          uploadedPhotos.push(photo); // already uploaded or URL
        }
      }

      updatedFields.photos = uploadedPhotos;
    }

    const updatedItem = await Item.findByIdAndUpdate(id, updatedFields, { new: true });

    if (updatedItem) {
      return new Response(JSON.stringify(updatedItem), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ message: 'Item not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('PUT Error:', error);
    return new Response(JSON.stringify({ message: 'Failed to update item', error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// ---------------------------------------------
// --- DELETE: Delete item offer by ID ---------
// ---------------------------------------------
async function DELETE(_, { params }) {
  try {
    await connectDB();
    const deleted = await Item.findByIdAndDelete(params.id);
    if (!deleted) {
      return new Response(JSON.stringify({ message: 'Item not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ message: 'Deleted successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

module.exports = { GET, PUT, DELETE };


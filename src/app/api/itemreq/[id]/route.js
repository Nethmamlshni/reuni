// app/api/itemreq/[id]/route.js
const { connectDB } = require('@/lib/mongodb');
const { ItemRequest } = require('@/models/itemreqModels');

async function GET(_, { params }) {
  try {
    await connectDB();
    const id = params.id;

    // Try fetching single request by ID
    const request = await ItemRequest.findById(id).populate('userId');
    if (request) {
      return new Response(JSON.stringify(request), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // If not found, try fetching all requests by this userId
    const userRequests = await ItemRequest.find({ userId: id }).sort({ createdAt: -1 });
    if (userRequests.length > 0) {
      return new Response(JSON.stringify(userRequests), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ message: 'No matching request found' }), {
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

async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();

    // Normalize tags if comma-separated string
    if (typeof body.tags === 'string') {
      body.tags = body.tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => t.length > 0);
    }

    const updated = await ItemRequest.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return new Response(JSON.stringify({ message: 'Request not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('PUT /api/itemreq/[id] error:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to update request', error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

async function DELETE(_, { params }) {
  try {
    await connectDB();
    const deleted = await ItemRequest.findByIdAndDelete(params.id);
    if (!deleted) {
      return new Response(JSON.stringify({ message: 'Request not found' }), {
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

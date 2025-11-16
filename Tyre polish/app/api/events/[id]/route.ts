import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single event
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const event = await prisma.event.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}

// PUT update event
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { title, description, date, time, location, category, capacity, image } = body;

    if (!title || !description || !date || !time || !location || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Normalize date (accepts YYYY-MM-DD from input[type=date])
    let eventDate: Date;
    if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      eventDate = new Date(`${date}T00:00:00.000Z`);
    } else {
      eventDate = new Date(date);
    }
    if (isNaN(eventDate.getTime())) {
      return NextResponse.json({ error: 'Invalid date format' }, { status: 400 });
    }

    const capNumber = typeof capacity === 'number'
      ? capacity
      : typeof capacity === 'string' && capacity.trim() !== ''
        ? Number.parseInt(capacity, 10)
        : null;

    const event = await prisma.event.update({
      where: {
        id: parseInt(params.id),
      },
      data: {
        title,
        description,
        date: eventDate,
        time,
        location,
        category,
        capacity: Number.isFinite(capNumber as number) ? (capNumber as number) : null,
        image: image && String(image).trim() !== '' ? image : null,
      },
    });

    return NextResponse.json(event);
  } catch (error: any) {
    console.error('Error updating event:', error?.message || error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

// DELETE event
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.event.delete({
      where: {
        id: parseInt(params.id),
      },
    });

    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}

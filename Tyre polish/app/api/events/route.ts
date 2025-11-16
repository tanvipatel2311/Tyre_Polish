import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all events
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        date: 'asc',
      },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST create new event
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, date, time, location, category, capacity, image } = body;

    if (!title || !description || !date || !time || !location || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Normalize date coming from <input type="date"> (YYYY-MM-DD)
    let eventDate: Date;
    if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      // Store as midnight UTC for consistency
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

    const event = await prisma.event.create({
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

    return NextResponse.json(event, { status: 201 });
  } catch (error: any) {
    console.error('Error creating event:', error?.message || error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

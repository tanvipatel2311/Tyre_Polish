import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Basic validations
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    if (typeof file.size === 'number' && file.size > MAX_SIZE) {
      return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
    }

    // Allow common image mime types only
    const allowed = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (file.type && !allowed.includes(file.type)) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = uniqueSuffix + '-' + file.name.replace(/\s/g, '-');
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    const filepath = path.join(uploadsDir, filename);

    // Ensure uploads directory exists
    await mkdir(uploadsDir, { recursive: true });

    // Save file
    await writeFile(filepath, buffer);

    // Return URL
    const url = `/uploads/${filename}`;
    return NextResponse.json({ url, secure_url: url });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

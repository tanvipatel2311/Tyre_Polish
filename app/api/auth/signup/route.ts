import { NextResponse } from 'next/server';
import mysql from '@/lib/mysql';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Email, password, and name are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists using raw MySQL query
    const [existingUsers] = await mysql.execute(
      'SELECT id FROM user WHERE email = ?',
      [email]
    );

    if (Array.isArray(existingUsers) && existingUsers.length > 0) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user using raw MySQL query
    const [result] = await mysql.execute(
      'INSERT INTO user (email, password, name, createdAt, updatedAt) VALUES (?, ?, ?, NOW(), NOW())',
      [email, hashedPassword, name]
    ) as any;

    // Fetch the created user
    const [users] = await mysql.execute(
      'SELECT id, email, name, createdAt FROM user WHERE id = ?',
      [result.insertId]
    );

    const user = Array.isArray(users) && users.length > 0 ? users[0] : null;

    return NextResponse.json(
      { message: 'User created successfully', user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating user:', error?.message || error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}


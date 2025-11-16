import { NextResponse } from 'next/server';
import mysql from '@/lib/mysql';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Find user by email using raw MySQL query
    const [users] = await mysql.execute(
      'SELECT id, email, password, name, createdAt FROM user WHERE email = ?',
      [email]
    );

    if (!Array.isArray(users) || users.length === 0) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = users[0] as any;

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Return user data (excluding password)
    const userData = {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };

    return NextResponse.json(
      { message: 'Login successful', user: userData },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error during login:', error?.message || error);
    return NextResponse.json(
      { error: 'Failed to login' },
      { status: 500 }
    );
  }
}


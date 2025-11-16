# Event Management System

A fully functional event management system built with Next.js 14, TypeScript, Tailwind CSS, and MySQL.

## 🚀 Features

### User Features
- 🏠 **Home Page** - Beautiful landing page with navigation
- 📅 **Events Page** - Browse all events with category filtering
- 🔍 **Category Filter** - Filter events by type (conference, workshop, seminar, concert, sports, festival, networking)
- 📱 **Responsive Design** - Works on all devices

### Admin Features
- ➕ **Create Events** - Add new events with full details
- ✏️ **Edit Events** - Update existing event information
- 🗑️ **Delete Events** - Remove events with confirmation
- 📊 **Event Management Table** - View all events in a clean table layout
- 🖼️ **Image Support** - Add event images via URL

### Event Details
Each event includes:
- Title
- Description
- Date & Time
- Location
- Category
- Capacity (optional)
- Image (optional)

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **MySQL Server** - [Download here](https://dev.mysql.com/downloads/mysql/)

## 🛠️ Installation & Setup

### Step 1: MySQL Database Setup

1. Start your MySQL server
2. Open MySQL command line or MySQL Workbench
3. Create a new database:

```sql
CREATE DATABASE event_management;
```

### Step 2: Configure Environment Variables

1. The `.env` file is already created in the project root
2. Update it with your MySQL credentials:

```env
DATABASE_URL="mysql://YOUR_USERNAME:YOUR_PASSWORD@localhost:3306/event_management"
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
```

**Replace:**
- `YOUR_USERNAME` with your MySQL username (typically `root`)
- `YOUR_PASSWORD` with your MySQL password

**Example:**
```env
DATABASE_URL="mysql://root:mypassword@localhost:3306/event_management"
```

### Step 3: Create Database Tables

Run the following command to create all necessary tables:

```bash
npm run db:push
```

This will create the `Admin` and `Event` tables in your database.

### Step 4: (Optional) Add Sample Data

To populate your database with sample events:

```bash
npm run db:seed
```

This will create 6 sample events across different categories.

### Step 5: Start the Development Server

```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

## 📱 Using the Application

### Navigation

1. **Home** (`/`) - Landing page with overview
2. **Events** (`/events`) - Browse all events
3. **Admin** (`/admin`) - Manage events (CRUD operations)

### Admin Panel Usage

1. Navigate to `/admin`
2. Click "+ Add New Event" to create an event
3. Fill in the form:
   - **Required fields:** Title, Category, Date, Time, Location, Description
   - **Optional fields:** Capacity, Image URL
4. Click "Create Event" to save
5. Use "Edit" button to modify existing events
6. Use "Delete" button to remove events (with confirmation)

### Events Page

1. Navigate to `/events`
2. View all events in a card layout
3. Use category buttons to filter events
4. Each card shows event details and timing

## 🗂️ Project Structure

```
event-management/
├── app/
│   ├── admin/
│   │   └── page.tsx          # Admin panel page
│   ├── api/
│   │   └── events/
│   │       ├── route.ts       # GET all, POST create
│   │       └── [id]/
│   │           └── route.ts   # GET, PUT, DELETE single event
│   ├── events/
│   │   └── page.tsx          # Events listing page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── lib/
│   └── prisma.ts             # Prisma client instance
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.js               # Sample data seeder
├── .env                      # Environment variables
├── package.json
└── tailwind.config.ts
```

## 🔌 API Endpoints

### Events API

- **GET** `/api/events` - Get all events
- **POST** `/api/events` - Create a new event
- **GET** `/api/events/[id]` - Get single event by ID
- **PUT** `/api/events/[id]` - Update event by ID
- **DELETE** `/api/events/[id]` - Delete event by ID

## 🗄️ Database Schema

### Event Table
```prisma
model Event {
  id          Int      @id @default(autoincrement())
  title       String
  description String   @db.Text
  date        DateTime
  time        String
  location    String
  image       String?
  category    String
  capacity    Int?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Admin Table
```prisma
model Admin {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  password  String
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Database
npm run db:push      # Push schema to database
npm run db:seed      # Seed sample data
npm run db:studio    # Open Prisma Studio (database GUI)

# Code Quality
npm run lint         # Run ESLint
```

## 🎨 Technologies Used

- **Frontend:**
  - Next.js 14 (App Router)
  - React 18
  - TypeScript
  - Tailwind CSS

- **Backend:**
  - Next.js API Routes
  - Prisma ORM
  - MySQL

- **Tools:**
  - ESLint
  - PostCSS
  - Autoprefixer

## 🐛 Troubleshooting

### MySQL Connection Issues

If you get database connection errors:

1. **Check MySQL is running:**
   - Windows: Open Services and check MySQL service
   - Verify it's running on port 3306

2. **Verify credentials:**
   - Check username and password in `.env`
   - Try connecting with MySQL Workbench using same credentials

3. **Check database exists:**
   ```sql
   SHOW DATABASES;
   ```

4. **Firewall/Port issues:**
   - Ensure port 3306 is not blocked
   - Check MySQL is configured to accept connections

### Prisma Issues

If you encounter Prisma-related errors:

```bash
# Regenerate Prisma Client
npx prisma generate

# Reset database (WARNING: deletes all data)
npx prisma db push --force-reset

# View database in GUI
npm run db:studio
```

### Next.js Build Errors

If you get build errors:

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install
```

## 🚀 Production Deployment

For production:

1. **Update environment variables:**
   ```env
   DATABASE_URL="your-production-database-url"
   NEXTAUTH_SECRET="generate-a-secure-random-string"
   NEXTAUTH_URL="https://your-domain.com"
   ```

2. **Build the application:**
   ```bash
   npm run build
   ```

3. **Start production server:**
   ```bash
   npm start
   ```

## 📝 Notes

- The application runs on port 3000 by default
- MySQL must be running before starting the app
- Sample event images use Unsplash URLs
- Admin authentication is not implemented (can be added with NextAuth)

## 🎉 You're All Set!

Your Event Management System is now ready to use. Visit:
- **Home:** http://localhost:3000
- **Events:** http://localhost:3000/events
- **Admin:** http://localhost:3000/admin

Enjoy managing your events! 🎊

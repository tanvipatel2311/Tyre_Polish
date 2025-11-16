# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1️⃣ Create MySQL Database
Open MySQL and run:
```sql
CREATE DATABASE event_management;
```

### 2️⃣ Configure Database Connection
Edit `.env` file - update these two values:
```
DATABASE_URL="mysql://root:YOUR_PASSWORD@localhost:3306/event_management"
```
Replace `YOUR_PASSWORD` with your MySQL password.

### 3️⃣ Setup Database Tables
Run this command:
```bash
npm run db:push
```

### 4️⃣ (Optional) Add Sample Events
```bash
npm run db:seed
```

### 5️⃣ Start the Application
```bash
npm run dev
```

### ✅ Done!
Open your browser and visit:
- **http://localhost:3000** - Home page
- **http://localhost:3000/events** - View events
- **http://localhost:3000/admin** - Manage events

---

## 📖 Need More Help?
See `SETUP.md` for detailed instructions and troubleshooting.

## 🎯 What You Can Do

### Admin Panel (`/admin`)
- ➕ Create new events
- ✏️ Edit existing events  
- 🗑️ Delete events
- 📊 View all events in table format

### Events Page (`/events`)
- 📅 Browse all events
- 🔍 Filter by category
- 📱 Responsive design

### Event Information Includes:
- Title & Description
- Date & Time
- Location
- Category
- Capacity (optional)
- Image (optional)

---

**Enjoy your Event Management System!** 🎉

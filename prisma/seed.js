const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create sample events
  const events = [
    {
      title: 'Tech Conference 2025',
      description: 'Join us for the biggest tech conference of the year featuring industry leaders, innovative workshops, and networking opportunities.',
      date: new Date('2025-03-15'),
      time: '09:00',
      location: 'Convention Center, New York',
      category: 'conference',
      capacity: 500,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    },
    {
      title: 'Web Development Workshop',
      description: 'Learn modern web development techniques with Next.js, React, and TypeScript. Hands-on coding session included.',
      date: new Date('2025-02-20'),
      time: '14:00',
      location: 'Tech Hub, San Francisco',
      category: 'workshop',
      capacity: 50,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800',
    },
    {
      title: 'Summer Music Festival',
      description: 'Experience three days of amazing music performances from top artists. Food, drinks, and entertainment included.',
      date: new Date('2025-06-10'),
      time: '16:00',
      location: 'Central Park, Chicago',
      category: 'festival',
      capacity: 10000,
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
    },
    {
      title: 'Business Networking Evening',
      description: 'Connect with professionals from various industries. Great opportunity for collaboration and partnerships.',
      date: new Date('2025-02-28'),
      time: '18:30',
      location: 'Grand Hotel, Boston',
      category: 'networking',
      capacity: 100,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
    },
    {
      title: 'AI & Machine Learning Seminar',
      description: 'Explore the latest advancements in artificial intelligence and machine learning with expert speakers.',
      date: new Date('2025-04-05'),
      time: '10:00',
      location: 'Innovation Center, Seattle',
      category: 'seminar',
      capacity: 200,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    },
    {
      title: 'City Marathon 2025',
      description: 'Annual city marathon event. Register now for 5K, 10K, or full marathon distances. All skill levels welcome!',
      date: new Date('2025-05-12'),
      time: '07:00',
      location: 'Downtown, Los Angeles',
      category: 'sports',
      capacity: 5000,
      image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800',
    },
  ];

  for (const event of events) {
    await prisma.event.create({
      data: event,
    });
    console.log(`✓ Created event: ${event.title}`);
  }

  console.log('✅ Database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

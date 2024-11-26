// // seed.js
// import mongoose from 'mongoose';
// import Activity from './models/activity.model.js';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';


// dotenv.config();


// const activities = [
//   {
//     name: 'basketball',
//     type: 'team',
//     image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc',
//     chatMessages: [],
//     locations: [
//       {
//         name: 'UCLA Wooden Center',
//         description: 'Main indoor basketball courts at UCLA',
//         imageUrl: 'https://recreation.ucla.edu/sites/default/files/styles/slider_image/public/2021-09/WoodenpanoramicJPG.jpg'
//       }
//     ]
//   },
//   {
//     name: 'running',
//     type: 'individual',
//     image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5',
//     chatMessages: [],
//     locations: [
//       {
//         name: 'Drake Stadium',
//         description: 'Track and field facility at UCLA',
//         imageUrl: 'https://recreation.ucla.edu/sites/default/files/styles/slider_image/public/2021-09/Drake%20Stadium%20NEW.jpg'
//       }
//     ]
//   },
//   {
//     name: 'tennis',
//     type: 'both',
//     image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0',
//     chatMessages: [],
//     locations: []
//   },
//   {
//     name: 'football',
//     type: 'team',
//     image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390',
//     chatMessages: [],
//     locations: []
//   },
//   {
//     name: 'volleyball',
//     type: 'team',
//     image: 'https://images.unsplash.com/photo-1592656094267-764a45160876',
//     chatMessages: [],
//     locations: []
//   },
//   {
//     name: 'badminton',
//     type: 'both',
//     image: 'https://images.unsplash.com/photo-1613918431703-aa2b56f13e49',
//     chatMessages: [],
//     locations: []
//   },
//   {
//     name: 'swimming',
//     type: 'both',
//     image: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64',
//     chatMessages: [],
//     locations: []
//   },
//   {
//     name: 'yoga',
//     type: 'individual',
//     image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
//     chatMessages: [],
//     locations: []
//   },
//   {
//     name: 'gym',
//     type: 'individual',
//     image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
//     chatMessages: [],
//     locations: []
//   }
// ];


// async function seedDatabase() {
//   try {
//     // Connect to MongoDB
//     await connectDB();

//     // Clear existing activities
//     console.log('Clearing existing activities...');
//     await Activity.deleteMany({});

//     // Insert new activities
//     console.log('Inserting new activities...');
//     const result = await Activity.insertMany(activities);
//     console.log(`Successfully seeded ${result.length} activities`);

//     // Disconnect from MongoDB
//     await mongoose.disconnect();
//     console.log('Database seeded successfully!');
//     process.exit(0);
//   } catch (error) {
//     console.error('Error seeding database:', error);
//     process.exit(1);
//   }
// }

// // Run the seed function
// seedDatabase();
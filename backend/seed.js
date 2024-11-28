// // seed.js
// import mongoose from 'mongoose';
// import Activity from './models/activity.model.js';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';


// dotenv.config();


// const activities = [
//   {
//     name: 'Basketball',
//     type: 'Team',
//     image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc',
//     chatMessages: [],
//     locations: [
//         {
//             name: 'John Wooden Center',
//             description: 'Main indoor basketball courts at UCLA',
//             imageUrl: 'https://recreation.ucla.edu/sites/default/files/styles/slider_image/public/2021-09/WoodenpanoramicJPG.jpg'
//         },
//         {
//         name: 'Hitch Courts',
//         description: 'Main outdoor basketball courts at UCLA',
//         imageUrl: 'https://recreation.ucla.edu/sites/default/files/styles/header_image/public/2023-06/DSC02070.jpg?itok=tWkpB5Wt'
//         }
//     ]
//   },
//   {
//     name: 'Running',
//     type: 'Individual',
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
//     name: 'Tennis',
//     type: 'Both',
//     image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0',
//     chatMessages: [],
//     locations: [
//         {
//             name: 'Sunset Tennis Courts',
//             description: 'Tennis Courts on the Hill',
//             imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipOQVwEqmr7UQmTR0bmuq1MpX4ZaMNJdTMTgl8PP=s1360-w1360-h1020'
//         },
//         {
//             name: 'Los Angeles Tennis Center',
//             description: 'Historic Tennis Facility',
//             imageUrl: 'https://lh3.googleusercontent.com/p/AF1QipPtSntpMsDSGMzKQCaWCcu3SeyQV5Ofcy5ELni6=s1360-w1360-h1020'
//         }
//     ]
//   },
//   {
//     name: 'Volleyball',
//     type: 'Team',
//     image: 'https://images.unsplash.com/photo-1592656094267-764a45160876',
//     chatMessages: [],
//     locations: []
//   },
//   {
//     name: 'Badminton',
//     type: 'Both',
//     image: 'https://images.unsplash.com/photo-1613918431703-aa2b56f13e49',
//     chatMessages: [],
//     locations: [
//       {
//         name: 'John Wooden Center',
//         description: 'Badminton at Pardee Gymnasium',
//         imageUrl: 'https://uclaclubsports.com/images/2015/10/13/IMG_793646.JPG'
//       }
//     ]
//   },
//   {
//     name: 'Swimming',
//     type: 'Both',
//     image: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64',
//     chatMessages: [],
//     locations: [
//       {
//         name: 'Student Activities Center',
//         description: 'Pool in the Student Activities Center',
//         imageUrl: 'https://recreation.ucla.edu/sites/default/files/styles/resize_3_2/public/2022-03/facilities_sacpool_600x400_0.jpg?itok=nZo6ZN42'
//       },
//       {
//         name: 'Sunset Canyon Recreation Center',
//         description: 'Pool at Sunset Canyon Recreation Center',
//         imageUrl: 'https://recreation.ucla.edu/sites/default/files/styles/resize_3_2/public/2022-03/facilities_familypool_600x400_0.jpg?itok=nREDZAbe'
//       }
//     ]
//   },
//   {
//     name: 'Yoga',
//     type: 'Individual',
//     image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
//     chatMessages: [],
//     locations: [
//       {
//         name: 'Bruin Fitness Center',
//         description: 'Yoga at Bruin Fitness Center',
//         imageUrl: 'https://www.jfak.net/wp-content/uploads/2020/02/Bruin_5.jpg'
//       }
//     ]
//   },
//   {
//     name: 'Gym',
//     type: 'Individual',
//     image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
//     chatMessages: [],
//     locations: [
//       {
//         name: 'Bruin Fitness Center',
//         description: 'Work out at Bfit',
//         imageUrl: 'https://conferences.ucla.edu/wp-content/uploads/2019/01/Summer_Amenities_BFIT.jpg'
//       },
//       {
//         name: 'John Wooden Center',
//         description: 'Work out at John Wooden Center',
//         imageUrl: 'https://bruinlife.com/wp-content/uploads/2023/06/DSC_4051-1024x682.jpg'
//       }
//     ]
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
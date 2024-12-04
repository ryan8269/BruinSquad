// seed.js
import mongoose from 'mongoose';
import Activity from './models/activity.model.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';


dotenv.config();


const activities = [
  {
    name: 'basketball',
    type: 'Team',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc',
    chatMessages: [],
    locations: [
        {
            name: 'John Wooden Center',
            description: 'Main indoor basketball courts at UCLA',
            image: 'https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fuclabruins.com%2Fimages%2F2016%2F6%2F7%2FWoodenCenter_WVB_110923_0025.jpg&height=300&type=webp'
        },
        {
            name: 'Hitch Courts',
            description: 'Main outdoor basketball courts at UCLA',
            image: 'https://recreation.ucla.edu/sites/default/files/styles/header_image/public/2023-06/DSC02070.jpg?itok=tWkpB5Wt'
        }
    ],
    events: [
        {
            title: 'Pull up tonight',
            description: 'Gotta cook up Skylar',
            location: 'John Wooden Center',
            time: '12-04-2024 9:00 pm',
            upvotes: 0
        }
    ]
  },
  {
    name: 'running',
    type: 'Individual',
    image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5',
    chatMessages: [],
    locations: [
      {
        name: 'Drake Stadium',
        description: 'Track and field facility at UCLA',
        image: 'https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fuclabruins.com%2Fimages%2F2016%2F6%2F15%2F140129_ATH_057.jpg&height=300&type=webp'
      },
      {
        name: 'UCLA Running Routes',
        description: 'Running routes around UCLA',
        image: 'https://cdn.pacer.cc/route/screenshot/9q5cb_127.png'
      }
    ],
    events: []
  },
  {
    name: 'football',
    type: 'Team',
    image: 'https://plus.unsplash.com/premium_photo-1667598736219-606b0ff0d5bb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW1lcmljYW4lMjBmb290YmFsfGVufDB8fDB8fHww',
    chatMessages: [],
    locations: [
      {
          name: 'Intramural Fields',
          description: 'Main outdoor field at UCLA',
          image: 'https://uclaclubsports.com/images/2022/3/24/IMG_1989.JPG'
      },
      {
        name: 'Holmby Park',
        description: 'Spacious park near UCLA',
        image: 'https://www.christophechoo.com/wp-content/uploads/2018/06/34123062_10156369402418609_4942764964008951808_o.jpg'
      }
    ],
    events: []
  },
  {
    name: 'tennis',
    type: 'Both',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0',
    chatMessages: [],
    locations: [
        {
            name: 'Sunset Tennis Courts',
            description: 'Tennis Courts on the Hill',
            image: 'https://pbs.twimg.com/media/C6qakWnVsAA2r3o.jpg:large'
        },
        {
            name: 'Los Angeles Tennis Center',
            description: 'Historic Tennis Facility',
            image: 'https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fuclabruins.com%2Fimages%2F2019%2F1%2F10%2FIMG_0883.jpeg&height=300&type=webp'
        }
    ],
    events: []
  },
  {
    name: 'volleyball',
    type: 'Team',
    image: 'https://images.unsplash.com/photo-1592656094267-764a45160876',
    chatMessages: [],
    locations: [
      {
        name: 'John Wooden Center',
        description: 'Volleyball at Pardee Gymnasium',
        image: 'https://uclaclubsports.com/images/2015/10/13/IMG_793646.JPG'
      },
      {
        name: 'Sunset Canyon Recreation Center',
        description: 'Beach Volleyball at Sunset Rec',
        image: 'https://s3.amazonaws.com/cms.ipressroom.com/173/files/20234/20230507_UCLAMag_1092_resize.jpg'
      },
      {
        name: "Mapes Beach",
        description: 'Beach volleyball at Mapes Beach',
        image: 'https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fuclabruins.com%2Fimages%2F2021%2F4%2F3%2FSparks_Newberry_04032021_UCLAvsLSU_RT6850.jpg&height=300&type=webp'
      }
    ],
    events: []
  },
  {
    name: 'badminton',
    type: 'Both',
    image: 'https://images.unsplash.com/photo-1613918431703-aa2b56f13e49',
    chatMessages: [],
    locations: [
      {
        name: 'John Wooden Center',
        description: 'Badminton at Pardee Gymnasium',
        image: 'https://uclaclubsports.com/images/2015/10/13/IMG_793646.JPG'
      },
      {
        name: 'Holmby Park',
        description: 'Spacious park near UCLA',
        image: 'https://www.christophechoo.com/wp-content/uploads/2018/06/34123062_10156369402418609_4942764964008951808_o.jpg'
      },
      {
        name: 'Manhattan Beach Badminton Club',
        description: 'Badminton at Manhattan Beach',
        image: 'https://www.dailybreeze.com/wp-content/uploads/2022/06/TDB-L-HISTORY-COL-0614-01.jpg?w=978'
      }
    ],
    events: []
  },
  {
    name: 'swimming',
    type: 'Both',
    image: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64',
    chatMessages: [],
    locations: [
      {
        name: 'Student Activities Center',
        description: 'Pool in the Student Activities Center',
        image: 'https://www.poondesign.com/wp-content/uploads/2014/01/UCLA-Pool-Med.jpg'
      },
      {
        name: 'Sunset Canyon Recreation Center',
        description: 'Pool at Sunset Canyon Recreation Center',
        image: 'https://s3-media0.fl.yelpcdn.com/bphoto/7AFnncNMrqOqZFFJi3H5gA/348s.jpg'
      },
      {
        name: 'Westwood Pool',
        description: 'Pool located in Westwood',
        image: 'https://www.laparks.org/sites/default/files/images/reccenter/node/503/edit/westwoodpool2_0.jpg'
      }
    ],
    events: []
  },
  {
    name: 'yoga',
    type: 'Individual',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
    chatMessages: [],
    locations: [
      {
        name: 'Bruin Fitness Center',
        description: 'Yoga at Bruin Fitness Center',
        image: 'https://www.jfak.net/wp-content/uploads/2020/02/Bruin_5.jpg'
      },
      {
        name: 'Holmby Park',
        description: 'Quiet little park near UCLA',
        image: 'https://www.christophechoo.com/wp-content/uploads/2018/06/34123062_10156369402418609_4942764964008951808_o.jpg'
      },
      {
        name: 'Westwood Park',
        description: 'Spacious park near UCLA',
        image: 'https://www.laparks.org/sites/default/files/images/reccenter/node/176/edit/aidansplacewestwood-29.jpg'
      }
    ],
    events: []
  },
  {
    name: 'gym',
    type: 'Individual',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
    chatMessages: [],
    locations: [
      {
        name: 'Bruin Fitness Center',
        description: 'Free for students living on the hill',
        image: 'https://conferences.ucla.edu/wp-content/uploads/2019/01/Summer_Amenities_BFIT.jpg'
      },
      {
        name: 'John Wooden Center',
        description: 'Free for all students', 
        image: 'https://bruinlife.com/wp-content/uploads/2023/06/DSC_4051-1024x682.jpg'
      },
      {
        name: 'LA Fitness',
        description: 'Requires a membership',
        image: 'https://www.lafitness.com/pages/Images/ClubExterior/45.jpg'
      }
    ],
    events: []
  }
];


async function seedDatabase() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Clear existing activities
    console.log('Clearing existing activities...');
    await Activity.deleteMany({});

    // Insert new activities
    console.log('Inserting new activities...');
    const result = await Activity.insertMany(activities);
    console.log(`Successfully seeded ${result.length} activities`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
// // seed.js
// import mongoose from 'mongoose';
// import Activity from './models/activity.model.js';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';


// dotenv.config();


// const activities = [
// {
//     name: 'basketball',
//     type: 'Team',
//     image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc',
//     chatMessages: [],
//     locations: [
//         {
//             name: 'John Wooden Center',
//             description: 'The John Wooden Center is UCLA’s premier indoor basketball facility, offering state-of-the-art courts with high-quality flooring, excellent lighting, and ample space for both competitive and recreational play. This center serves as a central hub for students and faculty alike, providing a vibrant and energetic environment. Players can also take advantage of locker rooms, fitness equipment, and other amenities located within the center.',
//             image: 'https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fuclabruins.com%2Fimages%2F2016%2F6%2F7%2FWoodenCenter_WVB_110923_0025.jpg&height=300&type=webp'
//         },
//         {
//             name: 'Hitch Courts',
//             description: 'Located in the scenic outdoor area of the UCLA campus, the Hitch Courts provide a casual and laid-back environment for basketball enthusiasts. Surrounded by lush greenery, these courts are ideal for students who prefer playing under the open sky. They are popular among students looking for a quick game between classes or during their free time, and the atmosphere is welcoming for players of all skill levels.',
//             image: 'https://recreation.ucla.edu/sites/default/files/styles/header_image/public/2023-06/DSC02070.jpg?itok=tWkpB5Wt'
//         },
//         {
//             name: 'Mo Ostin Basketball Center',
//             description: 'The Mo Ostin Basketball Center, located on UCLA’s south campus, is a cutting-edge facility designed with both functionality and aesthetics in mind. This venue is a favorite for serious basketball players, offering professional-grade courts, top-tier equipment, and a sleek modern design. It also hosts events and practices, making it a key location for the basketball community at UCLA. The center is named after Mo Ostin, a prominent music industry executive and UCLA philanthropist.',
//             image: 'https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fuclabruins.com%2Fimages%2F2021%2F9%2F23%2F171024_ATH_0044.jpg&height=1100&type=webp'
//         }
//     ],
//     events: []
// },    
// {
//     name: 'running',
//     type: 'Individual',
//     image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5',
//     chatMessages: [],
//     locations: [
//         {
//             name: 'Drake Stadium',
//             description: 'Drake Stadium is UCLA’s premier outdoor track and field facility, featuring a high-quality synthetic track and a spacious field at its center. The stadium is an ideal spot for runners of all levels, whether you’re training for a competition, jogging for fitness, or simply enjoying the breathtaking views of the campus. Its bleachers and serene surroundings make it a favorite among both athletes and spectators.',
//             image: 'https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fuclabruins.com%2Fimages%2F2016%2F6%2F15%2F140129_ATH_057.jpg&height=300&type=webp'
//         },
//         {
//             name: 'UCLA Running Routes',
//             description: 'The UCLA Running Routes are a series of picturesque paths that wind through the campus, offering runners a mix of urban and natural scenery. These routes are perfect for long-distance runs, sprints, or even casual walks. Highlights include views of iconic campus landmarks, tree-lined paths, and varied terrain that provides a challenge for more experienced runners.',
//             image: 'https://cdn.pacer.cc/route/screenshot/9q5cb_127.png'
//         },
//         {
//             name: 'Bruin Fitness Center',
//             description: 'BFIT offers an indoor running experience perfect for those looking to avoid the outdoor elements on chilly or rainy days. The facility is equipped with modern treadmills, climate control, and a clean, quiet environment. It’s a great choice for anyone focused on staying consistent with their running routine in a comfortable, distraction-free space.',
//             image: 'http://westwoodenabler.com/wp-content/uploads/2015/10/DSC_7382-678x381.jpg'
//         }
//     ],    
//     events: []
// },
// {
//     name: 'football',
//     type: 'Team',
//     image: 'https://plus.unsplash.com/premium_photo-1667598736219-606b0ff0d5bb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YW1lcmljYW4lMjBmb290YmFsfGVufDB8fDB8fHww',
//     chatMessages: [],
//     locations: [
//         {
//             name: 'Intramural Fields',
//             description: 'The Intramural Fields are a sprawling outdoor space at UCLA, perfect for football games, practices, and casual pick-up matches. These well-maintained fields are equipped with ample room for multiple games to run simultaneously, and their grassy surface provides a safe and enjoyable playing experience. The fields are a central hub for student-athletes and recreational players alike, fostering a vibrant sports community.',
//             image: 'https://uclaclubsports.com/images/2022/3/24/IMG_1989.JPG'
//         },
//         {
//             name: 'Holmby Park',
//             description: 'Holmby Park is a serene and spacious park located near UCLA, offering an excellent venue for football enthusiasts seeking a relaxed and scenic setting. The park’s expansive grassy areas are ideal for casual games, practices, or even just tossing the football around with friends. Surrounded by lush greenery and peaceful walking paths, Holmby Park is a favorite for those looking to combine exercise with a tranquil outdoor atmosphere.',
//             image: 'https://www.christophechoo.com/wp-content/uploads/2018/06/34123062_10156369402418609_4942764964008951808_o.jpg'
//         },
//         {
//             name: 'UCLA Drake Stadium',
//             description: 'UCLA Drake Stadium is a premier athletic facility that offers a professional-grade setting for organized football games and practices. With its expansive field, stadium seating, and state-of-the-art amenities, it is an ideal location for competitive play. The stadium is also a central landmark on campus, hosting a variety of athletic events and fostering a spirited environment for sports enthusiasts.',
//             image: 'https://c7.alamy.com/comp/2R8EGD7/a-general-overall-aerial-view-of-drake-stadium-on-the-campus-of-ucla-saturday-may-27-2023-in-los-angeles-kirby-lee-via-ap-2R8EGD7.jpg'
//         }
//     ],    
//     events: []
// },
// {
//     name: 'tennis',
//     type: 'Both',
//     image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0',
//     chatMessages: [],
//     locations: [
//         {
//             name: 'Sunset Tennis Courts',
//             description: 'Located on “The Hill,” the Sunset Tennis Courts are a top choice for students seeking a convenient and scenic place to play tennis. These courts are well-maintained and provide a vibrant atmosphere for both casual matches and serious practice sessions. Surrounded by trees and open skies, they offer an enjoyable outdoor experience with easy access for those living on campus.',
//             image: 'https://pbs.twimg.com/media/C6qakWnVsAA2r3o.jpg:large'
//         },
//         {
//             name: 'Los Angeles Tennis Center',
//             description: 'The Los Angeles Tennis Center is a historic and iconic facility that has hosted numerous professional and collegiate tournaments over the years. With its professional-grade courts, ample seating, and excellent lighting, it provides an unmatched environment for tennis enthusiasts. It’s a hub for serious players, but recreational players can also enjoy its world-class amenities.',
//             image: 'https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fuclabruins.com%2Fimages%2F2019%2F1%2F10%2FIMG_0883.jpeg&height=300&type=webp'
//         },
//         {
//             name: 'Sycamore Tennis Courts',
//             description: 'Situated near Olympic and Centennial, the Sycamore Tennis Courts are a hidden gem for tennis enthusiasts. These courts are perfect for players looking for a quieter and more exclusive location to play. They are known for their pristine condition and easy reservation system, making them a favorite among those living nearby or seeking a hassle-free tennis experience.',
//             image: 'http://uclafwc.bol.ucla.edu/section/tennis/tennis2.jpg'
//         }
//     ],    
//     events: []
// },
// {
//     name: 'volleyball',
//     type: 'Team',
//     image: 'https://images.unsplash.com/photo-1592656094267-764a45160876',
//     chatMessages: [],
//     locations: [
//         {
//             name: 'John Wooden Center',
//             description: 'The John Wooden Center offers a fantastic indoor venue for volleyball at its Pardee Gymnasium. This facility features high-quality courts, excellent lighting, and a vibrant atmosphere for players of all skill levels. Whether you’re participating in a competitive league or just enjoying a casual game with friends, the John Wooden Center provides everything you need for an enjoyable experience, including nearby locker rooms and fitness amenities.',
//             image: 'https://uclaclubsports.com/images/2015/10/13/IMG_793646.JPG'
//         },
//         {
//             name: 'Sunset Canyon Recreation Center',
//             description: 'The Sunset Canyon Recreation Center is home to beautiful beach volleyball courts that offer a unique and relaxed playing experience. These sandy courts are surrounded by palm trees and open skies, making them a favorite for those who love the outdoors. Perfect for both recreational and competitive games, this venue captures the Southern California vibe while providing top-notch facilities.',
//             image: 'https://s3.amazonaws.com/cms.ipressroom.com/173/files/20234/20230507_UCLAMag_1092_resize.jpg'
//         },
//         {
//             name: 'Mapes Beach',
//             description: 'Mapes Beach is an exceptional location for volleyball enthusiasts, offering well-maintained beach courts designed for both casual play and competitive matches. Set against a scenic backdrop, this venue provides a dynamic and energetic environment for players and spectators alike. It’s a go-to spot for beach volleyball on campus, with its pristine sand and inviting atmosphere.',
//             image: 'https://images.sidearmdev.com/resize?url=https%3A%2F%2Fdxbhsrqyrr690.cloudfront.net%2Fsidearm.nextgen.sites%2Fuclabruins.com%2Fimages%2F2021%2F4%2F3%2FSparks_Newberry_04032021_UCLAvsLSU_RT6850.jpg&height=300&type=webp'
//         }
//     ],    
//     events: []
// },
// {
//     name: 'badminton',
//     type: 'Both',
//     image: 'https://images.unsplash.com/photo-1613918431703-aa2b56f13e49',
//     chatMessages: [],
//     locations: [
//         {
//             name: 'John Wooden Center',
//             description: 'The John Wooden Center hosts badminton at its Pardee Gymnasium, offering an excellent indoor venue for both recreational and competitive players. The gym features high ceilings, polished wooden floors, and professional lighting, making it one of the best places to enjoy a game of badminton. The facility is well-equipped, providing a comfortable environment for players looking to sharpen their skills or simply have fun with friends.',
//             image: 'https://uclaclubsports.com/images/2015/10/13/IMG_793646.JPG'
//         },
//         {
//             name: 'Holmby Park',
//             description: 'Holmby Park is a spacious and peaceful park located near UCLA, perfect for those who prefer to play badminton outdoors. With ample grassy areas for setting up portable nets, it offers a relaxing atmosphere for a casual game or practice session. The park is surrounded by beautiful trees and walking paths, making it a great spot for enjoying nature while engaging in a friendly match.',
//             image: 'https://www.christophechoo.com/wp-content/uploads/2018/06/34123062_10156369402418609_4942764964008951808_o.jpg'
//         },
//         {
//             name: 'Manhattan Beach Badminton Club',
//             description: 'The Manhattan Beach Badminton Club is a renowned facility offering an exceptional setting for badminton enthusiasts. Located near the beach, it is one of the most prestigious badminton venues in Southern California. The club features high-quality indoor courts, a welcoming community, and a professional environment, making it ideal for serious players and those looking to improve their game. The proximity to the beach adds to the club’s charm, providing a unique atmosphere for players.',
//             image: 'https://www.dailybreeze.com/wp-content/uploads/2022/06/TDB-L-HISTORY-COL-0614-01.jpg?w=978'
//         }
//     ],    
//     events: []
// },
// {
//     name: 'swimming',
//     type: 'Both',
//     image: 'https://images.unsplash.com/photo-1560089000-7433a4ebbd64',
//     chatMessages: [],
//     locations: [
//         {
//             name: 'Student Activities Center',
//             description: 'The Student Activities Center (SAC) houses a well-maintained pool, perfect for both recreational swimmers and those looking to train. The pool is spacious and features clean, clear water with easy access for students. Whether you’re aiming for a vigorous workout or just a relaxing swim, the SAC provides a convenient and enjoyable swimming experience right on campus.',
//             image: 'https://www.poondesign.com/wp-content/uploads/2014/01/UCLA-Pool-Med.jpg'
//         },
//         {
//             name: 'Sunset Canyon Recreation Center',
//             description: 'The pool at the Sunset Canyon Recreation Center offers a relaxing spot for swimmers. Located in a picturesque setting with plenty of sun, the pool is perfect for those looking to swim laps or unwind after a long day. It provides ample space for both casual and serious swimmers, and the surrounding environment enhances the peaceful, laid-back atmosphere of the venue.',
//             image: 'https://s3-media0.fl.yelpcdn.com/bphoto/7AFnncNMrqOqZFFJi3H5gA/348s.jpg'
//         },
//         {
//             name: 'Westwood Pool',
//             description: 'The Westwood Pool is a public swimming pool conveniently located in the heart of Westwood. It’s an ideal spot for those who live in the area or are looking to swim in an outdoor facility with a community atmosphere. The pool is spacious and often less crowded, making it perfect for leisurely swims or aquatic workouts. It’s a well-maintained, relaxing option for those who enjoy an outdoor swimming experience.',
//             image: 'https://www.laparks.org/sites/default/files/images/reccenter/node/503/edit/westwoodpool2_0.jpg'
//         }
//     ],    
//     events: []
// },
// {
//     name: 'yoga',
//     type: 'Individual',
//     image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
//     chatMessages: [],
//     locations: [
//         {
//             name: 'Bruin Fitness Center',
//             description: 'The Bruin Fitness Center offers a peaceful and well-equipped space for yoga enthusiasts. Located on campus, it provides a serene environment with ample room for group classes or individual practice. The center is equipped with high-quality mats and accessories, making it a convenient and ideal spot for students to unwind, stretch, and deepen their practice in a professional setting.',
//             image: 'https://www.jfak.net/wp-content/uploads/2020/02/Bruin_5.jpg'
//         },
//         {
//             name: 'Holmby Park',
//             description: 'Holmby Park is a quiet, tranquil park located near UCLA, providing a natural environment for yoga enthusiasts. With its peaceful surroundings and ample green space, it’s perfect for outdoor yoga sessions, offering a refreshing alternative to indoor studios. The park’s serenity allows for a grounding practice, making it a favorite location for those who prefer to practice yoga outdoors amidst nature.',
//             image: 'https://www.christophechoo.com/wp-content/uploads/2018/06/34123062_10156369402418609_4942764964008951808_o.jpg'
//         },
//         {
//             name: 'Westwood Park',
//             description: 'Westwood Park offers a spacious and open area for yoga practitioners to enjoy their practice outdoors. The park is known for its peaceful atmosphere, providing an ideal location for those seeking a relaxed and grounding yoga experience. Whether you’re practicing by yourself or in a group, the park’s open space and beautiful surroundings create a perfect spot for yoga, stretching, and meditation.',
//             image: 'https://www.laparks.org/sites/default/files/images/reccenter/node/176/edit/aidansplacewestwood-29.jpg'
//         }
//     ],    
//     events: []
// },
// {
//     name: 'gym',
//     type: 'Individual',
//     image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
//     chatMessages: [],
//     locations: [
//         {
//             name: 'Bruin Fitness Center',
//             description: 'The Bruin Fitness Center is a state-of-the-art gym offering a range of fitness equipment and workout areas for students. Free for those living on the hill, it features spacious workout rooms, cardio machines, free weights, and more. Whether you’re focused on strength training, cardio, or flexibility, the Bruin Fitness Center provides everything you need to stay in shape in a modern, convenient setting.',
//             image: 'https://conferences.ucla.edu/wp-content/uploads/2019/01/Summer_Amenities_BFIT.jpg'
//         },
//         {
//             name: 'John Wooden Center',
//             description: 'The John Wooden Center is a premier fitness facility that offers a wide variety of equipment and amenities for all your fitness needs. Free for all UCLA students, it features multiple workout zones, including strength training areas, cardio equipment, and space for group fitness classes. The center’s well-maintained facilities and central location make it a popular choice for those seeking a comprehensive fitness experience.',
//             image: 'https://bruinlife.com/wp-content/uploads/2023/06/DSC_4051-1024x682.jpg'
//         },
//         {
//             name: 'LA Fitness',
//             description: 'LA Fitness is a well-known gym chain that offers a variety of fitness services, including state-of-the-art equipment, group fitness classes, and personal training. While it requires a membership, it’s a great option for those seeking a more expansive gym experience outside of the UCLA campus. With locations nearby, it provides a comprehensive workout environment with facilities that include swimming pools, basketball courts, and more.',
//             image: 'https://www.lafitness.com/pages/Images/ClubExterior/45.jpg'
//         }
//     ],    
//     events: []
// }
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
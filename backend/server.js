import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import activityRoutes from './routes/activity.route.js';
import userRoutes from './routes/user.route.js';
import User from './models/user.model.js';
import { Webhook } from 'svix';
import bodyParser from 'body-parser';
import { createServer } from "http";
import { Server } from "socket.io";
import Activity from './models/activity.model.js';
import cors from 'cors';
import { server1 } from 'svix/dist/openapi/servers.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
// Middleware for regular routes
app.use(express.json());
app.use("/api/activity", activityRoutes); 
app.use("/api/users", userRoutes);

// Webhook endpoint
app.post(
  "/api/webhook",
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    try {
      // console.log('Webhook received');
      
      // // Debug incoming data
      // console.log('Headers:', req.headers);
      // console.log('Raw body:', req.body);
      
      const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
      if (!WEBHOOK_SECRET) {
        console.error('Missing webhook secret');
        return res.status(400).json({ error: 'Missing webhook secret' });
      }

      // Debug webhook secret (careful with logging in production)
      // console.log('Secret length:', WEBHOOK_SECRET.length);
      
      // Get headers
      const svix_id = req.headers['svix-id'];
      const svix_timestamp = req.headers['svix-timestamp'];
      const svix_signature = req.headers['svix-signature'];

      // Debug headers
      // console.log('Svix Headers:', {
      //   'svix-id': svix_id,
      //   'svix-timestamp': svix_timestamp,
      //   'svix-signature': svix_signature?.slice(0, 10) + '...' // Only log part of signature
      // });

      if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error('Missing required headers');
        return res.status(400).json({ error: 'Missing required headers' });
      }

      // Convert body to string and debug
      let payload;
      if (Buffer.isBuffer(req.body)) {
        payload = req.body.toString('utf8');
      } else if (typeof req.body === 'string') {
        payload = req.body;
      } else {
        payload = JSON.stringify(req.body);
      }
      
      // console.log('Parsed payload:', payload.slice(0, 100) + '...'); // Log first 100 chars

      try {
        // Create webhook instance with more detailed error handling
        const wh = new Webhook(WEBHOOK_SECRET);
        // console.log('Webhook instance created');

        // Verify the webhook
        const evt = wh.verify(payload, {
          'svix-id': svix_id,
          'svix-timestamp': svix_timestamp,
          'svix-signature': svix_signature,
        });
        
        // console.log('Webhook verified successfully');
        // console.log('Event type:', evt?.type);

        // Parse the payload
        const eventData = JSON.parse(payload).data;
        const existingUser = await User.findById(eventData.id);
        if (existingUser) {
          return res.status(200).json({ message: 'User already exists' });
        }
        console.log('Creating new user with data:', {
          id: eventData.id,
          email: eventData.email_addresses?.[0]?.email_address,
      });
      
      console.log('Existing users:', await User.find({})); // This will show all users in your DB
        // Create new user
        const newUser = new User({
          name: `${eventData.first_name || ''} ${eventData.last_name || ''}`.trim(),
          _id: eventData.id,
          email: eventData.email_addresses?.[0]?.email_address || '',
          profileImage: eventData.profile_image_url || '',
          isMatched: false,
          wantsMatch: true,
        });

        await newUser.save();
        console.log('User created:', newUser);

        return res.status(201).json({
          success: true,
          message: 'User created successfully'
        });

      } catch (verifyError) {
        console.error('Verification error details:', {
          name: verifyError.name,
          message: verifyError.message,
          stack: verifyError.stack
        });
        return res.status(400).json({ 
          error: 'Webhook verification failed',
          details: verifyError.message 
        });
      }

    } catch (error) {
      console.error('Server error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      return res.status(500).json({ error: error.message });
    }
  }
);

//user routes
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }
    res.status(500).json({ error: error.message });
  }
});
//debugging
app.get('/api/activities', async (req, res) => {
  try {
    const activities = await Activity.find({});
    res.json({ activities });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// server.js - Updated chat routes
app.get('/api/chat/:sport', async (req, res) => {
  try {
    const activity = await Activity.findOne({ name: req.params.sport });
    
    if (!activity) {
      console.log(`No activity found for sport: ${req.params.sport}`);
      return res.status(404).json({ error: 'Sport not found' });
    }
    
    res.json({ chatMessages: activity.chatMessages });
  } catch (error) {
    console.error('GET /api/chat/:sport error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/chat', async (req, res) => {
  try {
    const { sport, message, userId, username } = req.body;
    
    const activity = await Activity.findOne({ name: sport });
    
    if (!activity) {
      console.log(`No activity found for sport: ${sport}`);
      return res.status(404).json({ error: 'Sport not found' });
    }

    const newMessage = {
      userId,
      username,
      message,
      timestamp: new Date()
    };

    activity.chatMessages.push(newMessage);
    await activity.save();
    
    res.json({ success: true, message: newMessage });
  } catch (error) {
    console.error('POST /api/chat error:', error);
    res.status(500).json({ error: error.message });
  }
});


app.get("/", (req, res) => {
  res.send("Hello from Sigma Sigma Sigma");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
});


const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Track active users per room
const activeUsers = {};

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join_room", ({ room, userName, userId }) => {
        socket.join(room);
        
        // Add user to active users for this room
        if (!activeUsers[room]) {
            activeUsers[room] = [];
        }
        activeUsers[room].push(userName);
        
        // Broadcast updated active users list
        io.to(room).emit("active_users", activeUsers);
        
        console.log(`User ${userName} joined room ${room}`);
    });

    socket.on("leave_room", (room) => {
        socket.leave(room);
        
        // Remove user from active users
        if (activeUsers[room]) {
            activeUsers[room] = activeUsers[room].filter(user => user.socketId !== socket.id);
            io.to(room).emit("active_users", activeUsers);
        }
        
        console.log(`User left room ${room}`);
    });

    socket.on("chat_message", (data) => {
        // Send to all in room except sender
        socket.to(data.room).emit("chat_message", data);
    });

    socket.on("disconnect", () => {
        // Remove user from all active rooms
        Object.keys(activeUsers).forEach(room => {
            activeUsers[room] = activeUsers[room].filter(user => user.socketId !== socket.id);
            io.to(room).emit("active_users", activeUsers);
        });
        
        console.log(`User disconnected: ${socket.id}`);
    });
});

httpServer.listen(3001, () => {
    console.log(`Websocket server running on port 3001`);
});

export default app;
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import activityRoutes from './routes/activity.route.js';
import User from './models/user.model.js';
import { Webhook } from 'svix';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();

// Middleware for regular routes
app.use(express.json());
app.use("/api/activity", activityRoutes);

// Webhook endpoint
app.post(
  "/api/webhook",
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    try {
      console.log('Webhook received');
      
      // Debug incoming data
      console.log('Headers:', req.headers);
      console.log('Raw body:', req.body);
      
      const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
      if (!WEBHOOK_SECRET) {
        console.error('Missing webhook secret');
        return res.status(400).json({ error: 'Missing webhook secret' });
      }

      // Debug webhook secret (careful with logging in production)
      console.log('Secret length:', WEBHOOK_SECRET.length);
      
      // Get headers
      const svix_id = req.headers['svix-id'];
      const svix_timestamp = req.headers['svix-timestamp'];
      const svix_signature = req.headers['svix-signature'];

      // Debug headers
      console.log('Svix Headers:', {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature?.slice(0, 10) + '...' // Only log part of signature
      });

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
      
      console.log('Parsed payload:', payload.slice(0, 100) + '...'); // Log first 100 chars

      try {
        // Create webhook instance with more detailed error handling
        const wh = new Webhook(WEBHOOK_SECRET);
        console.log('Webhook instance created');

        // Verify the webhook
        const evt = wh.verify(payload, {
          'svix-id': svix_id,
          'svix-timestamp': svix_timestamp,
          'svix-signature': svix_signature,
        });
        
        console.log('Webhook verified successfully');
        console.log('Event type:', evt?.type);

        // Parse the payload
        const eventData = JSON.parse(payload).data;
        
        // Create new user
        const newUser = new User({
          name: `${eventData.first_name || ''} ${eventData.last_name || ''}`.trim(),
          clerkId: eventData.id,
          generalInfo: {
            age: 0,
            major: "",
            gender: eventData.gender || "Other",
            sexualOrientation: "Other",
            race: ""
          },
          isMatched: false,
          wantsMatch: true,
          email: eventData.email_addresses?.[0]?.email_address || '',
          profileImage: eventData.profile_image_url || '',
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

app.get("/", (req, res) => {
  res.send("Hello from Sigma Sigma Sigma");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
});

export default app;
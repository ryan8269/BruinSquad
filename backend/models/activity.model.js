// Option 1: Single File (models/activity.model.js)
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Message Schema
// Modified chatMessageSchema
const chatMessageSchema = new Schema({
    userId: {
        type: String, // Changed from ObjectId to String for Clerk IDs
        required: true
    },
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Location Schema
const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
});

// Event Schema
const eventSchema = new Schema({
    location: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        required: true
    }
});

// Activity Schema
const activitySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    chatMessages: [chatMessageSchema],
    locations: [locationSchema],
    events: [eventSchema]
}, {
    timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
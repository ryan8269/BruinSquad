import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
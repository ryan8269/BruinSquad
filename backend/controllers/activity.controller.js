import Activity from "../models/activity.model.js";

export const getActivity = async (req, res) => {
    try {
        const name = req.query;
        const activities = await Activity.find(name);
        res.status(200).json({ success: true, data: activities });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const createActivity = async (req,res) => {
    const activity = req.body;
    if (!activity.name || !activity.type || !activity.image) {
        return res.status(400).send("Missing required fields");
    }
    const newActivity = new Activity(activity)
    try {
        await newActivity.save();
        res.status(201).json({success: true, data: newActivity});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, error: error.message});
    }
}

export const updateActivity = async (req, res) => {
    const { name } = req.query; 
    const { eventId, eventData } = req.body; 
    try {
        const activity = await Activity.findOne({ name });  // Find the activity by name
        if (!activity) {
            return res.status(404).json({ success: false, error: 'Activity not found' });
        }
        const eventIndex = activity.events.findIndex(event => event._id.toString() === eventId);
        if (eventIndex === -1) {
            activity.events.unshift(eventData);
        } else {
            activity.events[eventIndex].upvotes += 1;
        }
        const updatedActivity = await activity.save();
        res.status(200).json({ success: true, data: updatedActivity });
    } catch (error) {
        console.error('Error updating activity:', error);
        res.status(500).json({ success: false, error: error.message });
    }
  };
  
export const deleteActivity = async (req, res) => {
    const { name } = req.query; 
    try {
        const deletedActivity = await Activity.findOneAndDelete({ name });
        if (!deletedActivity) {
            return res.status(404).json({ success: false, error: 'Activity not found' });
        }
    res.status(200).json({ success: true, data: deletedActivity });
    } catch (error) {
        console.error('Error deleting activity:', error);
        res.status(500).json({ success: false, error: error.message });
    }
}
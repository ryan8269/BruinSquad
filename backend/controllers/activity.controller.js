import Activity from "../models/activity.model.js";

export const getActivities = async (req, res) => {
    try {
        const activities = await Activity.find({});
        res.status(200).json({ success: true, data: activities });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
}

export const createActivity = async (req,res) => {
    const activity = req.body;
    if (!activity.name || !activity.type || !activity.image) {
        return res.status(400).send("Missing required fields")
    }
    const newActivity = new Activity(activity)
    try {
        await newActivity.save()
        res.status(201).json({success: true, data: newActivity})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: error.message})
    }
}

export const updateActivity = async (req, res) => {
    const {id} = req.params //brackets it will look to see what variable has the same name
    const activity = req.body //the actual acitivity name, type, image
    //activity.name
    try {
        const updated = await Activity.findByIdAndUpdate(id, activity, {new: true})
        if (!updated) {
            return res.status(404).json({success: false, error: "Activity not found"})
        }
        res.status(200).json({success: true, data: updated})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: error.message})
    }
}

export const deleteActivity = async (req, res) => {
    const {id} = req.params
    try {
        const deleted = await Activity.findByIdAndDelete(id)
        if (!deleted) {
            return res.status(404).json({success: false, error: "Activity not found"})
        }
        res.status(200).json({success: true, data: deleted})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: error.message})
    }
}
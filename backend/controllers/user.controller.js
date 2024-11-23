//Need a get
//need update
//need delete

import User from "../models/user.model.js";

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const userData = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        res.status(200).json({ success: true, data: deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

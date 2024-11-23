import express from "express";

import { getUser, updateUser, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

// User Routes
router.get("/:id", getUser); // Get a user by ID
router.put("/:id", updateUser); // Update a user by ID
router.delete("/:id", deleteUser); // Delete a user by ID

export default router;

import express from "express";

import {getActivities, createActivity, updateActivity, deleteActivity} from "../controllers/activity.controller.js";

const router = express.Router();

router.get("/", getActivities);
router.post("/", createActivity);
router.put("/:id", updateActivity);
router.delete("/:id", deleteActivity);

export default router
import express from "express";

import {getActivity, createActivity, updateActivity, deleteActivity} from "../controllers/activity.controller.js";

const router = express.Router();

router.get("/", getActivity);
router.post("/", createActivity);
router.put("/", updateActivity);
router.delete("/", deleteActivity);

export default router
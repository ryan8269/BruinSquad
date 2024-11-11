import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import activityRoutes from './routes/activity.route.js'
dotenv.config()

const app = express();

app.use(express.json())  // Add this line to parse JSON request bodies

app.use("/api/activity", activityRoutes)

app.listen(3000, () => {
    connectDB()
    console.log("sigma sigma on the wall")
})


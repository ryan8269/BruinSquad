import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Add to your user schema
    _id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Sports as boolean flags
    sports: {
      basketball: {
        type: Boolean,
        default: false,
      },
      running: {
        type: Boolean,
        default: false,
      },
      tennis: {
        type: Boolean,
        default: false,
      },
      football: {
        type: Boolean,
        default: false,
      },
      volleyball: {
        type: Boolean,
        default: false,
      },
      badminton: {
        type: Boolean,
        default: false,
      },
      swimming: {
        type: Boolean,
        default: false,
      },
      yoga: {
        type: Boolean,
        default: false,
      },
      gym: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
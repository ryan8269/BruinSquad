import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Add to your user schema
    clerkId: {
      type: String,
      required: true,
      unique: true,
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
    isMatched: {
      type: Boolean,
      default: false, // starts as unmatched
    },
    wantsMatch: {
      type: Boolean,
      default: true, // assuming they want to be matched when they sign up
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
      none: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Add some methods if needed
userSchema.methods.toggleSport = function (sport) {
  if (this.sports[sport] !== undefined) {
    this.sports[sport] = !this.sports[sport];
    // If any sport is selected, set none to false
    if (this.sports[sport]) {
      this.sports.none = false;
    }
  }
  return this.save();
};

const User = mongoose.model("User", userSchema);

export default User;

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
    // General Information
    generalInfo: {
      age: {
        type: Number,
        required: true,
      },
      major: {
        type: String,
        required: false,
      },
      gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Non-binary", "Other"],
      },
      sexualOrientation: {
        type: String,
        required: true,
        enum: ["Straight", "Gay", "Lesbian", "Bisexual", "Other"],
      },
      race: {
        type: String,
        required: false,
      },
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
    // Entertainment preferences
    entertainment: {
      movies: {
        romance: {
          type: Boolean,
          default: false,
        },
        sciFi: {
          type: Boolean,
          default: false,
        },
        comedy: {
          type: Boolean,
          default: false,
        },
        horror: {
          type: Boolean,
          default: false,
        },
        action: {
          type: Boolean,
          default: false,
        },
        none: {
          type: Boolean,
          default: true,
        },
      },
    },
    // Music preferences
    music: {
      hipHop: {
        type: Boolean,
        default: false,
      },
      rock: {
        type: Boolean,
        default: false,
      },
      pop: {
        type: Boolean,
        default: false,
      },
      metal: {
        type: Boolean,
        default: false,
      },
      country: {
        type: Boolean,
        default: false,
      },
      kpop: {
        type: Boolean,
        default: false,
      },
      none: {
        type: Boolean,
        default: true,
      },
    },
    // Food preferences
    food: {
      italian: {
        type: Boolean,
        default: false,
      },
      japanese: {
        type: Boolean,
        default: false,
      },
      chinese: {
        type: Boolean,
        default: false,
      },
      korean: {
        type: Boolean,
        default: false,
      },
      american: {
        type: Boolean,
        default: false,
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

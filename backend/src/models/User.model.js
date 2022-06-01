import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    desc: String,
    age: { type: Number, required: true },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dluamiku6/image/upload/v1654051103/profiles/default_khx6yt.png",
    },
    wishlist: [],
    isAdmin: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("User", UserSchema);

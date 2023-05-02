import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const groupset2Schema = new Schema(
  {
    name: {
      type: String,
      maxLength: 160,
      required: true,
    },
    stocks: {
      type: Number,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    brand: {
      type: ObjectId,
      ref: "Brand",
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    size: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    photo: {
      url: {
        type: String,
      },
    },
    img: {
      url: {
        type: [String],
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Groupset2", groupset2Schema);

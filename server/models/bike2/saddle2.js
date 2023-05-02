import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const saddle2Schema = new Schema(
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

export default mongoose.model("Saddle2", saddle2Schema);
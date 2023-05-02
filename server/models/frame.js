import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const frameSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: 160,
      required: true,
    },
    description:{
      type: String,
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
    type: {
      type: String,
    },
    seatbinder: {
      type: String,
    },
    seatpost: {
      type: String,
    },
    stem: {
      type: String,
    },
    fork: {
      type: String,
    },
    stemlength: {
      type: String,
    },
    seatpostlength: {
      type: String,
    },
    stack: {
      type: String,
    },
    reach: {
      type: String,
    },
    bbheight: {
      type: String,
    },
    bbdrop: {
      type: String,
    },
    trail: {
      type: String,
    },
    wheelbase: {
      type: String,
    },
    seattubelength:{
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

export default mongoose.model("Frame", frameSchema);

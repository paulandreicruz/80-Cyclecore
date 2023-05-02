import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const saddleSchema = new Schema(
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
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    size: {
      type: String,
    },
    body: {
      type: String,
    },
    weightdesc: {
      type: String,
    },
    concave: {
      type: String,
    },
    weight: {
      type: String,
    },
    note: {
      type: String,
    },
    technology: {
      type: String,
    },
    compatible: {
      type: String,
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

export default mongoose.model("Saddle", saddleSchema);

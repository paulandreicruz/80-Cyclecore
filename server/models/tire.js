import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const tireSchema = new Schema(
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
    type: {
      type: String,
    },
    bead: {
      type: String,
    },
    casing: {
      type: String,
    },
    compound: {
      type: String,
    },
    flat: {
      type: String,
    },
    weight: {
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

export default mongoose.model("Tire", tireSchema);

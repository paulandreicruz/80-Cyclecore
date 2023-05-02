import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const customizeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 160,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    title: {
      type: String,
    },
    description: {
      type: {},
      required: true,
    },
    price: {
      type: Number,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    brand: {
      type: ObjectId,
      ref: "Brand",
    },
    size: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    photo: {
      url: {
        type: String,
      },
    },
    shipping: {
      required: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customize", customizeSchema);

import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const handlebarSchema = new Schema(
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
    type: {
      type: String,
    },
    material: {
      type: String,
    },
    compatible: {
      type: String,
    },
    widthhood: {
      type: String,
    },
    widthdrops: {
      type: String,
    },
    reaches: {
      type: String,
    },
    drops: {
      type: String,
    },
    clampdiameter: {
      type: String,
    },
    faceplate: {
      type: String,
    },
    controls: {
      type: String,
    },
    weigth:{
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

export default mongoose.model("Handlebar", handlebarSchema);

import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const groupsetSchema = new Schema(
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
    photo: {
      url: {
        type: String,
      },
    },
    weigth: {
      type: String,
    },
    chain: {
      type: String,
    },
    armlength: {
      type: String,
    },
    connectors: {
      type: String,
    },
    charging: {
      type: String,
    },
    sensor : {
      type: String,
    },
    cassette: {
      type: String,
    },
    brakes: {
      type: String,
    },
    functionality: {
      type: String,
    },
    type: {
      type: String,
    },
    img: {
      url: {
        type: [String],
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Groupset", groupsetSchema);

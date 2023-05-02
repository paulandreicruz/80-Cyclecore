import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const wheelsetSchema = new Schema(
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
    diamter: {
      type: String,
    },
    type: {
      type: String,
    },
    compatibilty: {
      type: String,
    },
    width: {
      type: String,
    },
    valve: {
      type: String,
    },
    material: {
      type: String,
    },
    weight: {
      type: String,
    },
    brake: {
      type: String,
    },
    holes: {
      type: String,
    },
    tube: {
      type: String,
    },
    dual: {
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

export default mongoose.model("Wheelset", wheelsetSchema);

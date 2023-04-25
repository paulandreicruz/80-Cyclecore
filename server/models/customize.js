import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const frameSchema = new Schema(
  {
    frame: {
      type: ObjectId,
      ref: "Frame",
      required: true,
    },
    tire: {
      type: ObjectId,
      ref: "Tire",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Frame", frameSchema);

import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
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
    description: {
      type: {},
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: ObjectId,
      ref: "SubCategory",
      required: true,
    },
    brand: {
      type: ObjectId,
      ref: "Brand",
      required: true,
    },
    stocks: {
      type: Number,
    },
    newStocksThisMonth: {
      type: Number,
      default: 0,
    },
    newlyAddedStocks: [
      {
        month: Number,
        year: Number,
        value: Number,
        day: Number,
      },
    ],
    newlyAddedStocksToday: {
      type: Number,
      default: 0,
    },
    monthAdded: {
      type: Number,
      default: new Date().getMonth(),
    },

    size: {
      type: String,
    },
    quantity: {
      type: Number,
    },

    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      url: {
        type: String,
      },
    },
    image: {
      type: String,
    },
    shipping: {
      required: false,
      type: Boolean,
    },
    customframename: {
      type: String,
    },
    customframeprice: {
      type: String,
    },
    customhandlebarname: {
      type: String,
    },
    customhandlebarprice: {
      type: String,
    },
    customgroupsetname: {
      type: String,
    },
    customgroupsetprice: {
      type: String,
    },
    customwheelsetname: {
      type: String,
    },
    customwheelsetprice: {
      type: String,
    },
    customtirename: {
      type: String,
    },
    customtireprice: {
      type: String,
    },
    customtsaddlename: {
      type: String,
    },
    customsaddleprice: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);

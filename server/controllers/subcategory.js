import SubCategory from "../models/subcategory.js";
import slugify from "slugify";

export const create = async (req, res) => {
  try {
    // console.log(req.body);
    const { name } = req.body;
    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }
    // if (!subcategory.trim()){
    //     return res.json({ error: "Name is required"});
    // }
    const existingSubCategory = await SubCategory.findOne({ name });
    if (existingSubCategory) {
      return res.json({ error: "Already exist" });
    }

    const subcategory = await new SubCategory({
      name,
      slug: slugify(name),
    }).save();
    res.json(subcategory);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export const update = async (req, res) => {
  try {
    const { name } = req.body;
    const { subcategoryId } = req.params;
    const subcategory = await SubCategory.findByIdAndUpdate(
      subcategoryId,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );
    res.json(subcategory);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const remove = async (req, res) => {
  try {
    const removed = await SubCategory.findByIdAndDelete(
      req.params.subcategoryId
    );
    res.json(removed);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const all = await SubCategory.find({});
    res.json(all);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const read = async (req, res) => {
  try {
    const subcategory = await SubCategory.findOne({ slug: req.params.slug });
    return res.json(subcategory);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

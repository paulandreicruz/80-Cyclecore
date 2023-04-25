import Brand from '../models/brand.js'
import slugify from 'slugify';




export const create = async (req, res) => {
    try{
        // console.log(req.body);
        const { name } = req.body;
        if (!name.trim()) {
            return res.json({ error: "Name is required"});
        }
        // if (!subcategory.trim()){
        //     return res.json({ error: "Name is required"});
        // }
        const existingBrand = await Brand.findOne({ name });
        if (existingBrand) {
            return res.json({ error: "Already exist" });
        }

        const brand = await new Brand({name, slug: slugify(name)}).save();
        res.json(brand);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};  


export const update = async (req, res) => {
    try {
        const { name } = req.body;
        const { brandId } = req.params;
        const brand = await Brand.findByIdAndUpdate(
            brandId, {
            name, 
            slug: slugify(name),
        },
        { new: true}
        );
        res.json(brand);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};


export const remove = async (req, res) => {
    try {
        const removed = await Brand.findByIdAndDelete(req.params.brandId);
        res.json(removed);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};


export const list = async (req, res) => {
    try {
        const all = await Brand.find({});
        res.json(all)
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};


export const read = async (req, res) => {
    try {
        const brand = await Brand.findOne({ slug: req.params.slug });
        return res.json(brand);
    } catch (err) {
        console.log(err);
        return res.status(400).json(err.message);
    }
};
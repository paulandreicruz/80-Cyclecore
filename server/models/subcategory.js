import mongoose from 'mongoose';


// const subCategorySchema = new mongoose.Schema({
//   subname: {
//     type: String,
//     required: true,
//     trim: true,
//     unique: true
//     },
//   slug: {
//     type: String,
//     unique: true,
//     lowercase: true,
//   },

// });


const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxLength: 32,
        unique: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true
    },
    // subcategory: subCategorySchema
});

export default mongoose.model('SubCategory', subcategorySchema);
    import mongoose from 'mongoose';
    // const { ObjectId } = mongoose.Schema;



    //CATEGORY SCHEMA


    const categorySchema = new mongoose.Schema({
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
        // brand: {
        //     type: ObjectId,
        //     ref: "Subcategory"
        // }
    });

    export default mongoose.model('Category', categorySchema);
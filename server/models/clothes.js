import mongoose from "mongoose";

const ClothesSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String, 
    colors: [{ type: String }] ,
    price: Number,
    photos: [{type: String}], 
    description: String, 
    material: String,
    size: String,
    type: String, 
    season: String,
    sex:String,
    serialNumber: String, 
    savedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
})

const Product = mongoose.model("Product", ClothesSchema)

export default Product;

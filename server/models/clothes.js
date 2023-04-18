import mongoose from "mongoose";

const ClothesSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String, 
    colors: [{ type: String }] ,
    price: Number,
    photos: [String], 
    description: String, 
    material: String,
    sizes: String,
    type: String, 
    season: String,
    serialNumber: Number, 
})

const Product = mongoose.model("Product", ClothesSchema)

export default Product;

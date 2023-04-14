import mongoose from "mongoose";

const ClothesSchema = new mongoose.Schema({
    title: String, 
    colors: String, 
    price: Number,
    photos: [String], 
    description: String, 
    Material: String,
    Sizes: String,
    Type: String, 
    Season: String,
    Serial: Number, 
    Composition: String, 
})
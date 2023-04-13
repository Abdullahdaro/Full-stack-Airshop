import mongoose from "mongoose";

const ClothesSchema = new mongoose.Schema({
    title: String, 
    color: String, 
    photos: [String], 
    description: String, 
    perks: [String],
    
})
import mongoose from "mongoose";

const ShopesSchema = new mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: String, 
    phoneNumer: Number,
    photos: [{type: String}], 
    description: String, 
    address: String,
    city: String,
    country: String,
    email: String,
    website: String,
    instagram: String,
    facebook: String,
    twitter: String,
    youtube: String,
    products: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],

})

const Shops = mongoose.model("Shops", ShopesSchema)

export default Shops;

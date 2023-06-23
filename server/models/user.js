import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String,},
    id: { type: String },
    googleId: { type: String },
    avatar: { type: String },
    saved: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post Message",
        }
    ],
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shops'
      },
});

const UserModel = mongoose.model("User", userSchema)

export default UserModel;



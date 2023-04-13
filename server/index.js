import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import UserModel from './models/user.js'
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';

dotenv.config();


const app = express();

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

app.use(express.json());
app.use(cookieParser('test'))
app.use(cors({
  credentials: true,
  origin: 'http://127.0.0.1:5173'
}))

console.log()
mongoose.connect(process.env.REACT_APP_CONNECTION_URL)

app.get('/test', (req, res) => {
  res.json('test ok');
});

app.post('/register', async (req,res) => {
  const {name, email, password} = req.body;
  try {
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const user = await UserModel.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    })
    res.json(user)
  } catch (error) {
    res.status(422).json({ message: "Something went wrong" });
  }
  
});

app.post('/login', async (req,res) => {
  const {email,password} = req.body;
  const userDoc = await UserModel.findOne({email});
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign({
        email:userDoc.email,
        id:userDoc._id,
      }, jwtSecret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json(userDoc);
      })
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});

app.get('/profile', (req, res) => {
  console.log(req.cookies)
  const {token} = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err; 
      const {name,email,_id} = await UserModel.findById(userData.id);
      res.json({name,email,_id});
    }); 
  } else {
    res.json(null)
  }
})

app.post('/logout', (req,res) => {
  res.cookie('token', '' ).json(true);
})

app.listen(4000);

// zrLgmAk6Mb2Zy579
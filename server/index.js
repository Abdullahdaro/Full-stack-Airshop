import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { MongoClient, ServerApiVersion } from 'mongodb';
import Product from './models/clothes.js';
import Shops from './models/shops.js';
import UserModel from './models/user.js';

import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

import passport from './passport.js';
import session from 'express-session';

dotenv.config();

const app = express();


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(session({
  secret: jwtSecret,
  resave: false,
  saveUninitialized: false
}));

app.use(
  cors({
    credentials: true,
    origin:  'http://localhost:5173', 
    allowedHeaders: 'Content-Type, Authorization',
    methods: 'GET, POST, OPTIONS',
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

try {
  await mongoose.connect(process.env.REACT_APP_CONNECTION_URL, {
    useNewUrlParser: true,
  });
  console.log(`Server running on port: ${process.env.PORT || 5000}`);
} catch (error) {
  console.log(error.message);
}

app.get('/test', (req, res) => {
  res.json('test ok');
});

//profile 
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
              res.cookie('token', token, {
                sameSite: 'none',
                secure: true
              }).json(userDoc);
            })
          } else {
            res.status(422).json('pass not ok');
          }
        } else {
          res.json('not found');
        }
      });

// google login route
      app.get(
        '/googlelogin',
        passport.authenticate('google', { scope: ['profile', 'email'] })
      );
      
      // Google OAuth callback route
      app.get(
        '/auth/google/callback',
        passport.authenticate('google', {
          failureRedirect: '/login',
          session: false
        }),
        (req, res) => {
          const payload = {
            id: req.user.id,
            email: req.user.email,
            name: req.user.name, 
          };

          jwt.sign(payload, jwtSecret, {}, (err, token) => {
            const jwtToken = `Bearer ${token}`;

            res.cookie('token', token, { httpOnly: true });
            res.redirect(`http://localhost:5173`)
          });}

      );

// having a token in the cookie, we can get the user data
      app.get('/profile', (req, res) => {
        try {
        const { token } = req.cookies;
        if (token) {
          jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            
            const user = await UserModel.findOne({ email: userData.email }); 
            if (user) {
              const { name, email, _id } = user;
              res.json({ name, email, _id });
            } else {
              res.json(null);
            } 
          });
        } else {
          res.json(null);
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
      });
      
// logout
      app.post('/logout', (req,res) => {
        res.cookie('token', '' ).json(true);
      })

// upload photoes
      const photoMiddleware = multer({dest: 'uploads'});
      app.post('/upload', photoMiddleware.array('photos', 100), (req, res) => {
        const uploadedFiles = []; 
        for (let i= 0; i< req.files.length; i++) {
          const {path, originalname} = req.files[i];
          const parts = originalname.split('.');
          const ext = parts[parts.length - 1 ] 
          const newPath = path + '.' + ext
          fs.renameSync(path, newPath);
          uploadedFiles.push(newPath.replace('uploads\\',''))
        };
        res.json(uploadedFiles);
      }) 

// create a store 
      app.post('/shops', (req, res) => {
        const {token} = req.cookies;
        const { addedPhotos, title, address, description, city, country, number, website, instagram, facebook, twitter, youtube, language } = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err;
          const { email } = userData;
          // cjek if the user already has a shop
          const owner = await UserModel.findOne({ email: email });
          if (owner.shop) {
            res.status(422).json({ message: "You already have a shop" });
          }  
          // Find the owner based on the ID
          const shopDoc = await Shops.create({ owner: owner._id, photos:addedPhotos, title, address, description, city, country, number, email, website, instagram, facebook, twitter, youtube, language });
            res.json(shopDoc)
          })
      })

      app.get('/shops', (req,res) => {
        const {token} = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err;
          const { id } = userData;
          const owner = await UserModel.findOne({ id: id });
          const shopDoc = await Shops.find({ owner: owner._id });
          res.json(shopDoc)
        })
      })  

      app.get('/shops/:id', (req,res) => {
        const {token} = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err;
          const { email } = userData;
          const owner = await UserModel.findOne({ email: email });
          const shopDoc = await Shops.findOne({ owner: owner._id, _id: req.params.id });
          res.json(shopDoc)
        })
      })

// products
      app.post('/products', async (req, res) => {
        const { token } = req.cookies;
        const {
          addedPhotos,
          title,
          serialNumber,
          price,
          colors,
          description,
          material,
          age,
          sex,
          type,
          season,
          size,
        } = req.body;

        try {
          const userData = jwt.verify(token, jwtSecret);
          const { email } = userData;

          // Find the owner based on the email
          const owner = await UserModel.findOne({ email: email });

          // Find the shop associated with the owner
          const shop = await Shops.findOne({ owner: owner._id });

          // Create the product
          const productDoc = await Product.create({
            owner: shop._id,
            photos: addedPhotos,
            title,
            serialNumber,
            price,
            colors,
            description,
            material,
            age,
            sex,
            type,
            season,
            size,
          });

          // Add the product ID to the shop's products array
          shop.products.push(productDoc._id);
          await shop.save();

          res.json(productDoc);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Server error' });
        }
      });

      app.get('/products', (req,res) => {
        const {token} = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) {
            // Handle the error condition, such as invalid token or verification failure
            console.error(err);
            return res.status(401).json({ error: 'Unauthorized' });
          }
          const { email } = userData;

          // Find the owner based on the ID
          const owner = await UserModel.findOne({ email: email });

          if (owner) {
            // Retrieve all the products made by the owner
            const products = await Product.find({ owner: owner._id });

            res.json(products);
          } else {
            res.json(null);
          } 
        });
      });

      app.get('/products/:id', async (req,res) => {
        const {id} = req.params;
        res.json(await Product.findById(id))
      })

      app.put('/products', async (req,res) => {
        const {token} = req.cookies;
        const {
          id, addedPhotos, title,  serialNumber,   price, colors,  description,  material, age, sex, type , season , size } = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err;
          const productDoc = await Product.findById(id);
          if (userData.id === productDoc.owner.toString()) {
            productDoc.set({ id, addedPhotos, title,  serialNumber,   price, colors,  description,  material, age, sex, type , season , size });
            await productDoc.save();
            res.json('ok');
          }
        });
      });

// homepage products 
      app.get('/homeproducts', async (req,res) => {
        try {
          res.json( await Product.find().maxTimeMS(20000))
        } catch (err) {
          console.log(err)
        }
      })

      app.get('/product/:id', async(req,res) => {
        const {id} = req.params;
        res.json(await Product.findById(id))
      })

      app.get('/owners/:id', async(req,res) => {
        const {id} = req.params;
        res.json(await Shops.findById(id))
      })

      app.get('/owner/:id', async (req, res) => {
        const { id } = req.params;
      
        try {
          const owner = await UserModel.findById(id);
          const shop = await Shops.findOne({ owner: owner._id });
          const ownerProducts = await Product.find({ shop: owner._id }).populate('owner');
      
          res.json({ owner, ownerProducts });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });


app.listen(4000);

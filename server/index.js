import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import UserModel from './models/user.js'
import Product from './models/clothes.js'
import jwt from "jsonwebtoken";
import cookieParser from 'cookie-parser';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';

dotenv.config();

const app = express();

const bcryptSalt = bcrypt.genSaltSync(10)
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cookieParser())
app.use('/uploads', express.static(path.join(__dirname+ '/uploads')));
app.use(cors({
  credentials: true,
  origin: 'http://127.0.0.1:5173'
}))

mongoose.connect(process.env.REACT_APP_CONNECTION_URL)

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

      app.get('/profile', (req, res) => {
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


      // upload products
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
        }
        console.log(uploadedFiles);
        res.json(uploadedFiles);
      }) 

      app.post('/products', (req, res) => {
        const {token} = req.cookies;
        const {
          addedPhotos, 
          title, 
          serialNumber, 
          price, 
          colors, 
          description, 
          material
          , age
          , sex
          , type
          , season
          , size
        } = req.body; 
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err; 
          const productDoc = await Product.create({
            owner: userData.id,
            photos:addedPhotos, 
            title, 
            serialNumber, 
            price, colors, 
            description, 
            material, age, sex, type
            , season
            , size
            });
            res.json(productDoc)
          })
      })

      app.get('/products', (req,res) => {
        const {token} = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) {
            // Handle the error condition, such as invalid token or verification failure
            console.error(err);
            return res.status(401).json({ error: 'Unauthorized' });
          }
          const { id } = userData // Provide an empty object as default value
          res.json(await Product.find({ owner: id }));
        });
      });

      app.get('/products/:id', async (req,res) => {
        const {id} = req.params;
        res.json(await Product.findById(id))
      })

      app.put('/products', async (req,res) => {
        const {token} = req.cookies;
        const {
          id,
            addedPhotos, title, 
            serialNumber, 
            price, colors, 
            description, 
            material, age, sex, type
                  , season
                  , size
        } = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err;
          const productDoc = await Product.findById(id);
          if (userData.id === productDoc.owner.toString()) {
            productDoc.set({
            id,
            photos:addedPhotos, title, 
            serialNumber, 
            price, colors, 
            description, 
            material, age, sex, type
                  , season
                  , size
            });
            await productDoc.save();
            res.json('ok');
          }
        });
      });


// homepage products 
      app.get('/homeproducts', async (req,res) => {
        res.json( await Product.find() )
      })

      app.get('/product/:id', async(req,res) => {
        const {id} = req.params;
        res.json(await Product.findById(id))
      })


// filters 
      app.get('/products/:sex', async (req, res) => {
        const {sex} = req.params;
        const products = await Product.find({sex});
        res.json(products);
      });


app.listen(4000);

// zrLgmAk6Mb2Zy579
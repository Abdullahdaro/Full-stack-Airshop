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
    methods: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
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
  res.status(500).json({ error: 'Internal Server Error' });
}

app.get('/test', (req, res) => {
  res.json('test ok');
});

class APIfeatures  {
  constructor(query, queryString){
    this.query = query;
    this.queryString = queryString;
  }
}


//profile 
      app.post('/register', async (req,res) => {
        const {name, email, password, avatar} = req.body;
        try {
          const oldUser = await UserModel.findOne({ email });
          if (oldUser) return res.status(400).json({ message: "User already exists" });
          const user = await UserModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
            avatar,
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
        const { addedPhotos, title, address, description, langauge, city, email, country, number, website, instagram, facebook, twitter, youtube, language } = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          try{
          const { id } = userData;
          // cjek if the user already has a shop
          const owner = await UserModel.findOne({ email: userData.email });

          if (owner.shop) {
            res.status(422).json({ message: "You already have a shop" });
          }  
          // Find the owner based on the ID
          const shopDoc = await Shops.create({ owner: owner._id, photos:addedPhotos, title, email, address, description, langauge, city, country, number, email, website, instagram, facebook, twitter, youtube, language });
            res.json(shopDoc)
          } catch (error) {
            res.status(422).json({ message: "Something went wrong" });
          }})
      })

      app.get('/shops', (req,res) => {
        const {token} = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err;
          const { email } = userData;
          const owner = await UserModel.findOne({ email: email });
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

      app.get('/shop/:id', async (req, res) => {
        try {
        const { id } = req.params;
        const shop = await Shops.findById(id);
        res.json(shop);
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
      });



      app.put('/shops', async (req,res) => {
        const {token} = req.cookies;
        const {id, addedPhotos, title, address, description, langauge, city, email, country, number, website, instagram, facebook, twitter, youtube, language } = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err;
          const shopDoc = await Shops.findById(id);
          console.log(shopDoc)
          if (userData.id === shopDoc.owner.toString()) {
            shopDoc.set({ id, addedPhotos, title, address, description, langauge, city, email, country, number, website, instagram, facebook, twitter, youtube, language });
            await shopDoc.save();
            res.json('ok');
          }
        });
      });


// generate a serial number
      const products = [];

      function generateSerialNumber() {
        return `S${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`;
      }

      app.get('/get-serial-number', async (req,res) => {
        const serialNumber = generateSerialNumber();
        const newProduct = {
          id: products.lenght + 1,
          serialNumber,
        }
        products.push(newProduct);
        res.json(newProduct);
      })



// products
      app.post('/products', async (req, res) => {
        const { token } = req.cookies;
        const {
          addedPhotos,
          title,
          serialNumber,
          price,
          selectedCurrency,
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
            selectedCurrency,
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

      app.get('/products', async (req,res) => {
        const {token} = req.cookies;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
         try {

          // Find the owner based on the ID
          const owner = await UserModel.findOne({ email: userData.email });

          if (owner) {
            // find the shop associated with the owner
            const shop = await Shops.findOne({ owner: owner._id });

            // Retrieve all the products made by the shop
            const products = await Product.find({ owner: shop._id });

            res.json(products);
          } else {
            res.json(null);
          } 
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
        })
      });

      app.get('/product/:id', async (req,res) => {
        const {id} = req.params;
        res.json(await Product.findById(id))
      })

      app.put('/products', async (req,res) => {
        const {token} = req.cookies;
        const {
          id, addedPhotos, title,  serialNumber,   price, selectedCurrency, colors,  description,  material, age, sex, type , season , size } = req.body;
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err;
          const productDoc = await Product.findById(id);
          const shopDoc = await Shops.findOne(productDoc.owner);
          if (shopDoc.id === productDoc.owner.toString()) {
            productDoc.set({ id, addedPhotos, title,  serialNumber,   price, selectedCurrency, colors,  description,  material, age, sex, type , season , size });
            await productDoc.save();
            res.json('ok');
          }
        });
      });

      app.delete('/products/:id', async (req, res) => {
        const { id } = req.params;
      
        try {
          const product = await Product.findByIdAndDelete(id);
      
          if (!product) {
            return res.status(404).json({ message: 'Product not found' });
          }

          await UserModel.updateMany(
            { saved: id },
            { $pull: { saved: id } }
          );
      
          res.json({ message: 'Product deleted successfully' });
        } catch (error) {
          console.error('Error deleting product:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
      });

// homepage products 
      app.get('/homeproducts', async (req,res) => {
        try {
          res.json( await Product.find().maxTimeMS(20000))
        } catch (err) {
          res.status(500).json({message: err.message})
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

//  save unsave posts 
        app.patch('/products/:id', async (req, res ) => {
          const {id} = req.params;
          const {token} = req.cookies;
          jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { email } = userData;
            const user = await UserModel.findOne({ email: email });

          try {
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with this id: ${id}`) 
            if (!mongoose.Types.ObjectId.isValid(user._id)) return res.status(404).send (`No user with this id: ${user._id}`)
            const product = await Product.findById(req.params.id)
            const oldUser = await UserModel.findById(user._id)
            if (!product) {
              return res.status(404).json({message: "Product not found"})
            }
            if (oldUser.saved.includes(product.id.toString())) {
                oldUser.saved = oldUser.saved.filter((p) => p.toString() !== product.id.toString())
                product.savedBy = product.savedBy.filter((p) => p.toString() !== user._id.toString())
                await oldUser.save();
                await product.save();

                return res.status(200).json({
                  success: true,
                  message: "Post Unsaved"
                });
            } else {
              oldUser.saved.push(product.id)
              product.savedBy.push(user._id)

              await oldUser.save();
              await product.save();

              return res.status(200).json({
                success: true, 
                message:"Post Saved"
              });
            }} catch (err) {
              return res.status(500).json({message: err.message})
            }
          })
        });

        app.get('/savedproducts', async (req, res) => {
          const {token} = req.cookies;

          jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { email } = userData;
            const user = await UserModel.findOne({ email: email });

          try {
            const olduser = await UserModel.findById(user._id)

            if(!olduser) {
              return res.status(404).json({message: "User not found"})
            }

            const savedProduct = await Product.find({ _id: {$in: olduser.saved}})

/*             const features = new APIfeatures ( Product.find({email: {$in:olduser.saved}}))
            const saveProducts = await features.query.sort([]) */

            res.json (savedProduct)
          } catch (err) {
            return res.status(500).json({message: err.message})
          }
        })
        });


app.listen(4000);

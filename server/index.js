// external dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// internal imports
const Product = require('./Models/Products');
const Order = require('./Models/Orders');

const app = express();
const router = express.Router();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// Mount the router

const MONGO_URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.PASSWORD}@cluster0.epeuytn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

// Database connection
main()
.then(()=>{
    console.log('connected to Database');
})
.catch(err=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URI);
}



// root route
app.get('/',(req,res)=>{
    res.send('root')
});

app.post('/addProduct',async(req,res)=>{
    try{
        const products = req.body;
        console.log(products);
        // const newProduct = await Product.create(product);//single item insertion
        const allProducts = await Product.insertOne(products);
        // await allProducts.save();
        res.status(201).json({insertedCount:allProducts.length});
    }catch(err){
        console.log(err);
    }
});

app.get('/products',async(req,res)=>{
    try{
        const products = await Product.find({});

        res.send(products);
    }catch(err){
        console.log(err);
    }
});

app.get('/product/:key',async(req,res)=>{
    const product = await Product.find({key: req.params.key});
    res.send(product[0]);
});

app.post('/productsByKeys',async(req,res)=>{
    try{
        const productKeys = req.body
        const selectedProducts = await Product.find({key:{$in:productKeys}})
         res.json(selectedProducts); 
        // console.log(selectedProducts);
    }catch(err){
        console.log(err);
    }
});

app.post('/addOrder',async(req,res)=>{
    try{
        const order = req.body;
        const insertedOrder = await new Order(order).save();
        res.status(201).json({insertedCount:insertedOrder.length});
    }catch(err){
        console.log(err);
    }
});

app.listen(process.env.PORT,()=>{
    console.log(`App is listening on port ${process.env.PORT}`);
});

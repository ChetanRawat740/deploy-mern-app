const express = require('express');
const app=express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter.js');
const ProductRouter = require('./Routes/ProductRouter.js');
require('dotenv').config();
require('./Models/db.js'); 

const PORT= process.env.PORT || 8080;
app.get('/ping',(req,res)=>{
    res.send('pong');
});

app.use(bodyParser.json());
app.use(cors({
    origin:"*"
    ));
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
});

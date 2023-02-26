const express=require("express");
// const { message } = require("statuses");
const mongoose=require("mongoose");
const userModel=require('./models/userModel');
// const planModel=require('./models/planModel');
const { stringify } = require("querystring");
const cookieParser=require('cookie-parser');
const emailValidator = require("email-validator");
// const { message } = require('statuses');
const app=express();
//middleware function used in post front-> json
app.use(express.json());//global middleware
app.use(cookieParser());
app.listen(3000);

// let users={};

// app.get('/users',);

// app.post('/users',);


// update -patch

// app.patch('/users',);
// // to delete data
// app.delete('/users',);



//params and queires
// let users=[
//     {   
//         id:1,
//         name:"Rutvij",
//         age:21
//     },
//     {
//         id:2,
//         name:"Rajesh",
//         age:50
//     },
//     {
//         id:3,
//         name:"Raut",
//         age:200
//     }
// ]

//mini-app
const userRouter=require('./Routers/userRouter');
const authRouter=require("./Routers/authRouter");
const planRouter=require("./Routers/planRouter");
const reviewRouter=require("./Routers/reviewRouter");





app.use('/user',userRouter);
app.use('/auth',authRouter);
app.use('/plans',planRouter);
app.use('/review',reviewRouter);










//queires

// app.get('/user',);

//params
// app.get('/users/:id',);






//imidiate invoke function (function(params){code})();  invokes imeediately
// (async function createUser(){
//     let user={
//         name:'Rajesh',
//         email:'abcd@gmail.com',
//         password:'12345678',
//         confirmPassword:'12345678' 
//     };
    
//     let data= await userModel.create(user);
//     console.log(data);
// })();     

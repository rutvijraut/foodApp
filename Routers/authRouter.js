const express=require("express");

const authRouter=express.Router();
const userModel=require('../models/userModel');
const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');
const JWT_KEY=require('../secrets');


authRouter
.route('/signup')
.get(middleware,getSignup)
.post(postSignup)

authRouter
.route('/login')
.post(loginuser)


function middleware(req,res,next){
    console.log('middleware here');
    next();
}

//create

function getSignup(req,res){

    res.sendFile( `${process.cwd()}/public/index.html` );
}

//read
async function postSignup(req,res){
    let dataObj=req.body;
    let user=await userModel.create(dataObj);
    // console.log('backend',user);
    res.json({
        message:"user signed up",
        data:user
    });
}



async function loginuser(req,res){
    
    try{
    let data=req.body;
    if(data.email){
    let user=await userModel.findOne({email:data.email});
    console.log(user);
    if(user){
        // bcrypt compare function
          if(user.password==data.password)
          {   
            // res.setHeader('Set-Cookie','isLoggedIn=true');
            // console.log(user.role);
            let uid=user['_id'];
            let token=jwt.sign({payload:uid,role:user.role},'123456');
            res.cookie('login',token,{httpOnly:true});
            return res.json({
                message:"user logged in",
                userDetails:data
            })
          }
          else{
            return res.json({
                message:"Wrong credentials"
            })
          }
    }
    else{
        return res.json({
            message:"user not found"
        })
    }
  }
  else{
    return res.json({
        message:"Empty field found"
    })
  }
}
catch(err){
    return res.status(500).json({
        message:err.message
    })
}
}
module.exports=authRouter;
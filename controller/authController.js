const express = require("express");

// const authRouter=express.Router();
const userModel = require('../models/userModel');
// const cookieParser=require('cookie-parser');
const jwt = require('jsonwebtoken');
const JWT_KEY = require('C:/Users/imrut/OneDrive/Desktop/backend/secrets');
const { message } = require("statuses");

//sign up
module.exports.signup = async function signup(req, res) {
    try {
        let dataObj = req.body;
        if (dataObj.password != dataObj.confirmPassword) {
            res.json({
                message: "Credentials don't match"
            })
        }
        let user = await userModel.create(dataObj);
        // console.log('backend',user);
        if (user) {
            res.json({
                message: "user signed up",
                data: user
            });

        }
        else {
            res.json({
                message: "user not found"
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message
        });
    }
}

//user login

module.exports.login = async function login(req, res) {

    try {
        let data = req.body;
        if (data.email) {
            let user = await userModel.findOne({ email: data.email });
            // console.log(user);
            if (user) {
                // bcrypt compare function
                if (user.password == data.password) {
                    // res.setHeader('Set-Cookie','isLoggedIn=true');
                    let uid = user['_id'];
                    let token = jwt.sign({ payload: uid, role: user.role }, '123456');

                    res.cookie('login', token, { httpOnly: true });
                    return res.json({
                        message: "user logged in",
                        userDetails: data
                    })
                }
                else {
                    return res.json({
                        message: "Wrong credentials"
                    })
                }
            }
            else {
                return res.json({
                    message: "user not found"
                })
            }
        }
        else {
            return res.json({
                message: "Empty field found"
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

//isAuthorised- to check the useres role [admin,user,resowner,deliveryboy]

module.exports.isAuthorised = function isAuthorised(roles) {
    return function (req, res, next) {
        if (roles.includes(req.role) == true) {
            next();
        }
        else {
            res.status(401).json({
                message: "user/operation not allowed "
            });
        }
    }
}

module.exports.protectRoute = async function protectRoute(req, res, next) {
    try {
        let token;
        if (req.cookies.login) {
            token = req.cookies.login;
            let payload = jwt.verify(req.cookies.login, '123456');
            // console.log(payload.role);
            if (payload) {
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                // res.json({
                //     message:"user verified"
                // });
                next();
            }
            else {
                res.json({
                    message: "user not verified jwt"
                });
            }
        }
        else {
            //browser
            const client=req.get('User-Agent');
            if(client.includes("Mozilla")==true)
            {
               return  res.redirect('/login');
            }
            
            //postman
            return res.json({
                message: "please log in/operation not allowed"
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message
        });
    }
}


//forget password

module.exports.forgetpassword = async function forgetpassword(req, res) {
    let { email } = req.body;
    try {
        const user = await userModel.findOne({ email: email });
        if (user) {
            //cretate resettoken is used to create new token self-defined
            const resetToken = user.createResetToken();
            //http://abc.com/resetpassword/resetToken
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            //nodemailer se send email karte
        }
        else {
            res.json({
                message: "user not found/please signup"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

//resetPaswword

module.exports.resetpassword=async function resetpassword(req, res) {
    try {
        const token = req.params.token;
        let { password, confirmPassword } = req.body;
        const user = await userModel.findOne({ resetToken: token });
        if (user) {
            //resetpasswordhandeler will update user in db self-defined
            user.resetPasswordHandeler(password, confirmPassword);
            await user.save();
            res.json({
                message: "Password changed succesfully now login with new password"
            })
        }
        else {
            res.json({
                message: "User not found"
            });
        }
    }
    catch (err) {
        res.json({
            message: err.message
        });
    }

}


module.exports.logout=function logout(req,res){
    res.cookie('login','',{maxAge:1});
    res.json({
        message:"user logged out"
    });
}

//protectroute
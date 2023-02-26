const express=require("express");
// const app=express();
const userRouter=express.Router();
// const protectRoute=require('./authhelper');
const {getUser,getAllUser,updateUser,deleteUser}=require('../controller/userController');
const { append } = require("vary");
const{signup,login,isAuthorised,protectRoute,forgetpassword,resetpassword,logout}=require('../controller/authController')
// userRouter
// .route('/')
// .get(protectRoute,getUsers)
// .post(postUser)//path specific middleware
// .patch(patchUser)
// .delete(deleteUser)


//user option
userRouter
.route('/:id')
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)


userRouter
.route('/forgetpassword')
.post(forgetpassword)


userRouter
.route('/resetpassword/:token')
.post(resetpassword)

userRouter
.route('/logout')
.get(logout)


//profile page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)

//admin work
userRouter.use(isAuthorised(['admin']));
userRouter
.route('/')
.get(getAllUser)


// userRouter
// .route('/getCookies')
// .get(getCookies)

// userRouter
// .route('/setCookies')
// .get(setCookies)

module.exports=userRouter;

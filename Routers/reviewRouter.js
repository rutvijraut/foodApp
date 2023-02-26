const express=require("express");
// const { protectRoute } = require("../controller/authController");

const reviewRouter=express.Router();
const{protectRoute}=require('../controller/authController');
const{getAllReviews,getPlanReviews,createReview,updateReview,deleteReview,top3reviews}=require('../controller/reviewController');


reviewRouter
.route('/all')
.get(getAllReviews);


reviewRouter
.route('/top3reviews')
.get(top3reviews);


reviewRouter
.route('/:id')
.get(getPlanReviews);

reviewRouter.use(protectRoute)
reviewRouter
.route('/make/:plan')
.post(createReview)
.patch(updateReview)
.delete(deleteReview);


module.exports=reviewRouter;

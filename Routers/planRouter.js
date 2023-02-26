const express=require("express");
// const { protectRoute } = require("../controller/authController");

const planRouter=express.Router();
const{protectRoute,isAuthorised}=require('../controller/authController');
const{getAllPlans,getPlan,createPlan,updatePlan,deletePlan,top3plans}=require('../controller/planController');
//top-3 plan


//all plans
planRouter
.route('/allPlans')
.get(getAllPlans)

//own plan->logged in neccesary
planRouter.use(protectRoute);
planRouter
.route('/plan/:id')
.get(getPlan)

//admin restaurant owner can onlu CUD plan
planRouter.use(isAuthorised(['admin','restaurantOwner']));
planRouter
.route('/makeplan')
.post(createPlan)


planRouter
.route('/pd/:id')
.patch(updatePlan)
.delete(deletePlan)

planRouter
.route('/top3')
.get(top3plans)


module.exports=planRouter;



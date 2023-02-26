const reviewModel = require('../models/reviewModel');
const planModel = require('../models/planModel');
const { now } = require('lodash');



module.exports.getAllReviews = async function getAllReviews(req, res) {
    try {
        let reviews = await reviewModel.find();
        if (reviews) {
            res.json({
                message: 'all reviews here',
                data: reviews
            });
        }
        else {
            res.json({
                message: "no reviews found"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports.getPlanReviews = async function getPlanReviews(req, res) {
    try {
        let id = req.params.id;
        let reviews = await reviewModel.find({plan:id});
        if (reviews) {
            res.json({
                message: 'reviews here',
                data: reviews
            });
        }
        else {
            res.json({
                message: "reviews not found here"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports.createReview = async function createReview(req, res) {
    try {
        let id=req.params.plan;
        let reviewData = req.body;
        let plan = await planModel.findById(id);
        // console.log(plan);
        // console.log(plan.ratingsAverage);
        let noofreviews=plan.numberofreviews;
        let review=await reviewModel.create(reviewData);
        plan.ratingsAverage=((noofreviews*plan.ratingsAverage)+(review.ratings))/(noofreviews+1);
         console.log(plan.ratingsAverage);
         plan.numberofreviews=plan.numberofreviews+1;
        await plan.save();
        res.json({
            message: "review Created",
            data: review
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }

};



module.exports.deleteReview = async function deleteReview(req, res) {
    try {
        // let plan_id=req.params.plan;
        // console.log(review_id);
        let review_id = req.body.id;
        // console.log(review_id);
        let review = await reviewModel.findByIdAndDelete(review_id);
        if (review) {
            res.json({
                message: "Review Deleted",
                data: review
            });
        }

        else {
            res.json({
                message: "review not found here"
            });
        }

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }

};

module.exports.updateReview = async function updateReview(req, res) {
    try{
        let plan_id=req.params.plan;
        // let plan=await planModel.findById(id);
        let review_id=req.body.id;
        let review=await reviewModel.findById(review_id);
        let datatobeupd=req.body; 
        if(review){
            const keys=[];
            // console.log(Object.keys(datatobeupd));
            for(let key in datatobeupd)
            {   
                if(key=='id')
                {
                    continue;
                }
                keys.push(key);
            }
            // console.log(keys);
    
            for(let i=0;i<keys.length;i++)
            {
                review[keys[i]]=datatobeupd[keys[i]];
            }
            //doc.save property
            const updreview=await review.save();
            res.json({
                message:"review updated sucessfully",
                data:updreview
            });
        }
        else{
            res.json({
                message:"review not found"
            });
        }
    }
    catch(err)
    {
        res.json({
            message:err.message
        });
    }
};

//top-3plans sort by average ratings
module.exports.top3reviews=async function top3reviews(req,res){
    try {
        const ratwise3reviews=await reviewModel.find()
        .sort({'ratings':-1}).limit(3);
        if(ratwise3reviews)
        {
        res.json({
            message:"top reviews here",
            data:ratwise3reviews
        });
        }
        else{
            res.json({
                message:"No reviews here"
            });
        }
    } 
    catch (err) {
        res.json({
            message:err.message
        });
    }
};

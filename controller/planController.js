const planModel = require('../models/planModel');

module.exports.getAllPlans = async function getAllPlans(req, res) {
    try {
        let plans = await planModel.find();
        if (plans) {
            res.json({
                message: 'all plans here',
                data: plans
            });
        }
        else {
            res.json({
                message: "no plans found"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports.getPlan = async function getPlan(req, res) {
    try {
        let id = req.params.id;
        let plan = await planModel.findById(id);
        if (plan) {
            res.json({
                message: 'plans here',
                data: plan
            });
        }
        else {
            res.json({
                message: "plan not found"
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
};

module.exports.createPlan = async function createPlan(req, res) {
    try {
        let planData = req.body;
        let plan = await planModel.create(planData);
        res.json({
            message: "Plan Created",
            data: plan
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }

};



module.exports.deletePlan = async function deletePlan(req, res) {
    try {
        let planid = req.params.id;
        let plan = await planModel.findByIdAndDelete(planid);
        if (plan) {
            res.json({
                message: "Plan Deleted",
                data: plan
            });
        }

        else {
            res.json({
                message: "plan not found"
            });
        }

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }

};

module.exports.updatePlan = async function updatePlan(req, res) {
    try{
        let id=req.params.id;
        let plan=await planModel.findById(id);
        let datatobeupd=req.body; 
        if(plan){
            const keys=[];
            // console.log(Object.keys(datatobeupd));
            for(let key in datatobeupd)
            {
                keys.push(key);
            }
            // console.log(keys);
    
            for(let i=0;i<keys.length;i++)
            {
                plan[keys[i]]=datatobeupd[keys[i]];
            }
            //doc.save property
            const updatedPlan=await plan.save();
            res.json({
                message:"plan updated sucessfully",
                data:updatedPlan
            });
        }
        else{
            res.json({
                message:"plan not found"
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
module.exports.top3plans=async function top3plans(req,res){
    try {
        const ratwise3plans=await planModel.find()
        .sort({'ratingsAverage':-1}).limit(3);
        if(ratwise3plans)
        {
        res.json({
            message:"top plans here",
            data:ratwise3plans
        });
        }
        else{
            res.json({
                message:"No plans here"
            });
        }
    } 
    catch (err) {
        res.json({
            message:err.message
        });
    }
};

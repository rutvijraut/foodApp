const userModel=require('../models/userModel');

module.exports.getUser=async function getUser(req,res){
    // let aUser=await userModel.findOne({name:'Rajesh'});// one user named Rajesh find more such in documaentation
    let id=req.id;
    
    // console.log(id);
    let user=await userModel.findById(id);
    if(user){
        res.json(user);
     }
    else
    {
    res.json({message:'user not found'});
    }
}

// module.exports.postUser=function postUser(req,res){
//     console.log(req.body);
//     users=req.body;
//     res.json({
//         message:"data recived sucessfully",
//         user:req.body
//     });
// }
//update
module.exports.updateUser=async function updateUser(req,res){
    // console.log('req.body=',req.body);
    //update data in users object
    try{
    let id=req.params.id;
    let user=await userModel.findById(id);
    let datatobeupd=req.body; 
    if(user){
        const keys=[];
        // console.log(Object.keys(datatobeupd));
        for(let key in datatobeupd)
        {
            keys.push(key);
        }
        // console.log(keys);

        for(let i=0;i<keys.length;i++)
        {
            user[keys[i]]=datatobeupd[keys[i]];
        }

        const updatedData=await user.save();
        res.json({
            message:"data updated sucessfully",
            data:user
        });
    }
    // let user=await userModel.findOneAndUpdate(,datatobeupd);
    // for(key in datatobeupd){
    //     users[key]=datatobeupd[key];
    // }
    else{
        res.json({
            message:"user not found"
        });
    }
}
catch(err)
{
    res.json({
        message:err.message
    });
}
}
//delete
module.exports.deleteUser=async function deleteUser(req,res){
    // users={};
    // console.log("deletewa ke andhar");

    try{
    let id=req.params.id;
    let user=await userModel.findByIdAndDelete(id);
    // console.log(user);
    if(!user)
    {
        res.json({
            message:"user not found"
        });
    }
    res.json({
        message:"data deleted",
        data:user
    });
}
    catch(err)
    {
        res.json({
             message:err.message
        });
    }
}
//admin
module.exports.getAllUser=async function getAllUser(req,res){
    // console.log(req.params.username);
    // console.log(req.params);
    try{
    let users=await userModel.find();
    // let paramId=req.params.id;
    // let obj={};
    // for(let i=0;i<users.length;i++){
    //     if(users[i]['id']==paramId)
    //     {
    //         obj=users[i];
    //     }
    // }
    // // console.log(req.params);
    // res.json({
    //         message:'req recieved',
    //         data:obj
    // });
    if(users)
    {
    res.json({message:'all user retrived',data:users});
    }
    else
    {
    res.json({message:'Users not found '});
    }
}
    catch(err)
    {
        res.json({
            message:err.message
        })
    }
}







// function getCookies(req,res){
//     let cookies=req.cookies.isLoggedIn;
//     console.log(cookies);
//     res.send('cookies recived');
// }




// function setCookies(req,res){
//     res.setHeader('Set-Cookie','isLoggedIn=true');
//     res.cookie('isLoggedIn',true,{maxAge:100*60*60*24,secure:true,httpOnly:true});
//     // res.cookie('isLoggedIn',true,{maxAge:100*60*60*24,secure:true,httpOnly:true});
//     res.send('Cookies has been set'); 
// }

// let flagloggedIn=false;
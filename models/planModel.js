//mongosse to through conect mongodb
const mongoose=require("mongoose");
const db_link='mongodb+srv://imrutvij:GqbHD6K80IsErPI2@cluster0.7mnql.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then (function(db){
    // console.log(db);
    console.log('plans db connected');

})
.catch(function (err) {
    console.log(err);
})



const planSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        maxlength:[20,'Plan name exceeds 20 characters']    // [value,'error message']->custom error message
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:[true,'price unmentioned']
    },
    ratingsAverage:{
        type:Number     
    },
    discount:{
        type:Number,
        validate:[function (){
            return this.discount<100
        },'discount exceeds price']
    },
    numberofreviews:{
        type:Number,
        default:0 
    }
      
});
// async function createPlan(){
//     let planObj={
//         name:'SuperFood1',
//         duration:30,
//         price:1000,
//         ratingsAverage:5,
//         discount:20  
//     }

//     let data =await planModel.create(planObj);
//     // const doc=new planModel(planObj);
//     // console.log(data);
//     // await doc.save();
//     //console.log(doc);
    

// };

const planModel=mongoose.model('planModel',planSchema);
// createPlan();
module.exports=planModel;
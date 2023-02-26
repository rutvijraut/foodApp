const mongoose=require("mongoose");
const db_link='mongodb+srv://imrutvij:GqbHD6K80IsErPI2@cluster0.7mnql.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then (function(db){
    // console.log(db);
    console.log('review db connected');

})
.catch(function (err) {
    console.log(err);
});


const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        required:[true,'review is mandatory'],
        maxlength:[200,'Plan name exceeds 20 characters']    // [value,'error message']->custom error message
    },
    
    ratings:{
        type:Number,
        min:1,
        max:10,
        required:[true,'rating mandatory']

    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true,'review must belong to a user']

    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:'planModel',
        required:[true,'review must belong to a plan']

    }
      
});

reviewSchema.pre('/^find/',function (next) {
   this.populate({
       path:"user",
       select:"name profileImage"
    }).populate("plan");
    next();
});
const reviewModel=mongoose.model('reviewModel',reviewSchema);
module.exports=reviewModel;
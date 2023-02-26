//mongodb
const emailValidator = require("email-validator");
const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const crypto=require("crypto");
const db_link='mongodb+srv://imrutvij:GqbHD6K80IsErPI2@cluster0.7mnql.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then (function(db){
    // console.log(db);
    console.log('user db connected');

})
.catch(function (err) {
    console.log(err);
})

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        reuired:true,
        unique:true,
        validate:function(){
            return emailValidator.validate(this.email);
        }  //validator libarary

    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:false,
        minLength:8,
        validate: function(){
            return this.confirmPassword==this.password
        }
    },
    role:{
        type:String,
        enum:['admin','user','restaurantowner','deliveryboy'],
        default:'user'
    },
    
    profileImage:{
        type:String,   //photo string me mulder se
        default:'img/users/default.png'
    },

    resetToken:String
    
})

// userSchema.pre('save',function(){
//     console.log("presave here in db",this);
// })

// userSchema.post('save',function(doc){
//     console.log("postsave here in db",doc);
// })
//pre hook kuch bhi karlo post sse pehle hi chalata hai

// userSchema.pre('save',function(){
//     this.confirmPassword=undefined;
// });

// userSchema.pre('save',async function(){
//     let salt=await bcrypt.genSalt();
//     let hashedString= await bcrypt.hash(this.password,salt);
//     this.password=hashedString;
//     console.log(hashedString);
// })

// userschema ke self defined methods resetpasswordhandeler and createResetToken
userSchema.methods.createResetToken=function(){
    //crypto npm package
    //creating uniquie token by cyrpto
    const resetToken=crypto.randomBytes(32).toString("hex");
    this.resetToken=resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandeler=function(password,confirmPassword){
    //crypto npm package
    //creating uniquie token by cyrpto
    this.password=password;
    this.confirmPassword=confirmPassword;
    this.resetToken=undefined;
}

//remove
// self  


// model
const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;
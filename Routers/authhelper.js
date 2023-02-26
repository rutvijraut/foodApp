
const jwt=require('jsonwebtoken');
const { is } = require('type-is');
const JWT_KEY=require('secrets.js');

// function protectRoute(req,res,next) {
//     console.log('dghjsad');
//     if(req.cookies.login)
//     {   
//         // console.log(req.cookies);
//         let isVerified=jwt.verify(req.cookies.login,'123456');
//         if(isVerified)
//         {
//             console.log(isVerified);
//         next();
//         }
//         else{
//             res.json({
//                 message:"user not verified jwt"
//             })
//         }
//     }
//     else
//     {
//         return res.json({
//             message:"please log in/operation not allowed........"
//         });
//     }
// }

module.exports=protectRoute;
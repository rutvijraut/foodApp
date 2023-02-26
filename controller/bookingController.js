// This is your test secret API key.
const stripe = require('stripe')('sk_test_51KKLfFSBj0nJwTPGd8eSUzoSDECT6BGeHbvwkAt7mtf2mfoMOg85uvS7KGRm5rufJOivApwgbvunkXZ8gk399vKO00pP3km58D');
const planModel = require('../models/planModel');
const userModel= require('../models/userModel');

module.exports.createSession=async function createSession(req,res){
    try {
        let userId=req.id;
        let planId=req.params.id;

        const user=await userModel.findById(userId);
        const plan=await planModel.findById(planId);
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            customer_email:user.email,
            client_reference_id:plan.id,
            line_items: [
              {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                
                name:plan.name,
                description:plan.description,
                amount: plan.price*100,
                currency:'inr',
                quantity: 1
              },
            ],
            // mode: 'payment',
            success_url: `${req.protocol}://${req.get("host")}/success.html`,
            cancel_url: `${req.protocol}://${req.get("host")}/cancel.html`

          })
          res.staus(200).json({
              status:"success",
              session
          })
        


    } catch (err) {
        res.status(200).json({
            err:err.message
        })
    }
}  
    

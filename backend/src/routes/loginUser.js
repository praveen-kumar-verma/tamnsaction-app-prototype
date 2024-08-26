const {Router} = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { User } = require("../models/userSchema");

const router = Router();

router.get("/",authMiddleware,async (req,res)=>{
    try {
        const userDetail = await User.findById({_id: req.userId},{password:0,__v:0})
        res.json({
            msg: "User detail fetch successfully",
            userDetail
        })
        
    } catch (error) {
        if(error instanceof zod.ZodError){
            res.status(400).json({
                errors: error.errors 
            })
        } else if (error.name === 'MongoServerError' && error.code === 11000) {
            // Duplicate key error (username or email already exists)
            const field = Object.keys(error.keyValue)[0];
            res.status(400).json({ error: `The ${field} is already in use.` });
          }
         else{
            console.log(error)
            res.status(400).json({
                msg: "something hell out"
    
            })
         } 
        
    }
})
module.exports = router
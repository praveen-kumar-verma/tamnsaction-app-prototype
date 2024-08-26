const {Router} = require("express");
const userSchema = require("../validators/signupUser");
// const userSchemaModel = require("models/User")
const zod = require("zod");
const { User } = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware")
const bcrypt = require('bcryptjs');
const { Account } = require("../models/bankSchema");
require("dotenv").config()
const router = Router();

router.post("/signup",async(req,res)=>{
    const {userName, firstName, lastName, password} = req.body;
    try {
        userSchema.userSchema.parse({userName,firstName, lastName, password})

        const user = new User({userName, password, firstName, lastName})
        console.log("reach")
        await user.save()

        const userId = user._id;

        await Account.create( {
            userId:userId,
            balance: 1+Math.random()*10000
        } )


        var token = jwt.sign({
            userId
        },process.env.JWT_SECRET)


        res.status(200).json({
            msg: "successfull registered",
            token: token
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

router.post("/signin",async(req,res)=>{
    const {userName, password} = req.body;

    try {
        userSchema.loginUserSchema.parse({userName, password});

        const user = await User.findOne({userName})
        if(!user){
            return res.status(400).json({
                msg: "user does not exist !" 
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch){
            return res.status(400).json({
                msg: "Invalid credentials!" 
            })
        }

        const userId = user._id;
        var token = jwt.sign({
            userId
        },process.env.JWT_SECRET)

        res.status(200).json({
            msg: "login Successfull",
            token:token
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


router.put("/update", authMiddleware, async (req, res) => {            
    try {
        userSchema.updateUserSchema.parse(req.body); // Adjust this based on your actual schema
        await User.updateOne({ _id: req.userId }, req.body);
        res.json({
            message: "Updated successfully"
        });
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
});


router.get("/bulk",authMiddleware, async(req,res)=>{
    try {

        const filterOptions = req.query.filter || "" ;

        const usersDetails = await User.find({
            $or: [
                { 'firstName': { $regex: filterOptions,$options: "i" } },
                { 'lastName': { $regex: filterOptions,$options: "i" } }
              ]
        })

        res.status(200).json({
            msg: "filter details",
            usersDetails
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
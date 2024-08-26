const {Router} = require("express");
const { Account } = require("../models/bankSchema");
const authMiddleware = require("../middlewares/authMiddleware");
const { transferSchema } = require("../validators/transferValidator");
const zod = require("zod");
const { default: mongoose } = require("mongoose");
const router = Router();
const ObjectId = mongoose.Types.ObjectId;


router.get("/balance",authMiddleware,async(req,res)=>{
    try {
        const account = await Account.findOne({userId:req.userId})
        res.status(200).json({
            msg: "account data fetched successfully",
            balance: account.balance
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


router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    
    const { to, amount } = req.body;

    try {
        // Validate the request body
        transferSchema.parse({ to, amount });
        if (!ObjectId.isValid(to)) {
            await session.abortTransaction();
            return res.status(400).json({ msg: "Invalid Account ID format" });
        }

        const account = await Account.findOne({ userId: req.userId }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ msg: "Insufficient balance" });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ msg: "Invalid Account" });
        }

        // Update the balances atomically

        await Promise.all([
            Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session),
            Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session)
        ]);

        await session.commitTransaction();
        
        return res.json({ msg: "Transfer Successful" });
        
    } catch (error) {
        await session.abortTransaction();
        
        if (error instanceof zod.ZodError) {
            return res.status(400).json({ errors: error.errors });
        } else if (error.name === 'MongoServerError' && error.code === 11000) {
            const field = Object.keys(error.keyValue)[0];
            return res.status(400).json({ error: `The ${field} is already in use.` });
        } else {
            console.error(error);
            return res.status(500).json({ msg: "Something went wrong" });
        }
        
    } finally {
        session.endSession();
    }
});

module.exports = router

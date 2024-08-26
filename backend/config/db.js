const mongoose = require("mongoose")

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("successfull")
        
    } catch (error) {
        console.log("something messed up")
        
    }
}

module.exports = connectDB
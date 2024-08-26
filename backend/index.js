require('dotenv').config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors")
const app = express();

connectDB()

app.use (cors())
app.use(express.json())
const mainRouter = require('./src/routes/index');

app.use("/api/v1", mainRouter);


app.listen(3000, ()=>{
    console.log("running")
})

const {Router} = require("express");
const router = Router();
const userRouter = require("./user")
const accountRouter = require("./account")
const loginUserRouter = require("./loginUser")





router.use("/user",userRouter)
router.use("/account", accountRouter)
router.use("/loginUser", loginUserRouter)


module.exports = router
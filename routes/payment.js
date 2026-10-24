const router = require("express").Router();

router.get("/",(req,res)=>{
console.log("Payment routes")
res.send("This is payment route")
})

module.exports = router;
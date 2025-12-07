const express=require("express")
const router=express.Router()
const profile=require("../controllers/profile.controller")

router.post("/update",profile.update)
router.get("/info/:id",profile.info)

module.exports=router

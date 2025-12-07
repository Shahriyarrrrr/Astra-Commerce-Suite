const express=require("express")
const router=express.Router()
const dev=require("../controllers/developer.controller")

router.post("/demo",dev.demo)
router.get("/logs",dev.logs)

module.exports=router

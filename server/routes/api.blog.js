const express=require("express")
const router=express.Router()
const blog=require("../controllers/blog.controller")

router.get("/list",blog.list)
router.get("/view/:id",blog.view)
router.post("/add",blog.add)

module.exports=router

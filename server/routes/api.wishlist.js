const express=require("express")
const router=express.Router()
const wish=require("../controllers/wishlist.controller")

router.get("/",wish.list)
router.post("/add",wish.add)
router.post("/remove",wish.remove)

module.exports=router

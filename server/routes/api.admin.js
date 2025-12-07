const express=require("express")
const router=express.Router()
const admin=require("../controllers/admin.controller")

router.get("/metrics",admin.metrics)

router.get("/products",admin.products)
router.get("/product/:id",admin.getProduct)
router.post("/product",admin.addProduct)
router.put("/product/:id",admin.updateProduct)
router.delete("/product/:id",admin.deleteProduct)

router.get("/orders",admin.orders)
router.get("/activity",admin.activity)

module.exports=router

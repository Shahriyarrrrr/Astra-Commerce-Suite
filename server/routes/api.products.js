const express = require("express")
const router = express.Router()
const products = require("../controllers/products.controller")

router.get("/", products.getProducts)
router.get("/item/:id", products.getProductById)

module.exports = router

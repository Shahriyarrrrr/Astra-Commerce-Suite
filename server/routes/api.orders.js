const express = require("express")
const router = express.Router()
const orders = require("../controllers/orders.controller")

router.post("/create", orders.create)
router.get("/list", orders.list)
router.get("/view/:id", orders.view)

module.exports = router

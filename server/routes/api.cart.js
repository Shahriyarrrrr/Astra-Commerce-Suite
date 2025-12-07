const express = require("express")
const router = express.Router()
const cartCtrl = require("../controllers/cart.controller")

router.get("/", cartCtrl.getCart)
router.post("/sync", cartCtrl.syncCart)
router.post("/promo", cartCtrl.applyPromo)
router.post("/add", cartCtrl.addItem)
router.post("/update", cartCtrl.updateItem)
router.post("/remove", cartCtrl.removeItem)

module.exports = router

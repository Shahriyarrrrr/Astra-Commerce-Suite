const express = require("express")
const router = express.Router()
const reg = require("../controllers/register.controller")

router.post("/", reg.register)
router.get("/list", reg.list)

module.exports = router

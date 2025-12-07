const express = require("express")
const router = express.Router()
const uploads = require("../controllers/uploads.controller")

router.post("/image", uploads.upload)

module.exports = router

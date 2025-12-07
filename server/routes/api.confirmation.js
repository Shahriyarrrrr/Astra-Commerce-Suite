const express = require("express")
const router = express.Router()
const confirmation = require("../controllers/confirmation.controller")

router.get("/:id", confirmation.get)

module.exports = router

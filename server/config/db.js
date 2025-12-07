const mongoose = require("mongoose")
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/astra"
let connected = false
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { connected = true })
  .catch(() => { connected = false })
module.exports = { mongoose, connected }

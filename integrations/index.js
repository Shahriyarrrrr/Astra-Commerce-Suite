const stripe = require("./stripe_sample_server")
const paypal = require("./paypal_sample_server")
const mock = require("./mock_payment_router")

module.exports = {stripe,paypal,mock}

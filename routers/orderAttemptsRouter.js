const EXPRESS = require("express")
const OrderAttemptsController = require("../controllers/orderAttemptsController")


const ORDER_ATTEMPTS_ROUTER = EXPRESS.Router()

ORDER_ATTEMPTS_ROUTER.get("/", OrderAttemptsController.getOrderAttempts)


module.exports = ORDER_ATTEMPTS_ROUTER
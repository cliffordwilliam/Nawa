const EXPRESS = require("express")
const OrderController = require("../controllers/orderController")


const ORDER_ROUTER = EXPRESS.Router()

ORDER_ROUTER.get("/", OrderController.getOrder)


module.exports = ORDER_ROUTER
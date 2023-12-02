const EXPRESS = require("express")
const UserOrdersController = require("../controllers/userOrdersController")


const USER_ORDERS_ROUTER = EXPRESS.Router()

USER_ORDERS_ROUTER.get("/", UserOrdersController.getUserOrders)


module.exports = USER_ORDERS_ROUTER
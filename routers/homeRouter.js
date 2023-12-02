const EXPRESS = require("express")

const HomeController = require("../controllers/homeController")
const Middleware = require("../middleware/middleware")
const AUTH_ROUTER = require("./authRouter")
const USER_ROUTER = require("./userRouter")
const COMMENT_ROUTER = require("./commentRouter")
const ORDER_ROUTER = require("./orderRouter")
const USER_ORDERS_ROUTER = require("./userOrdersRouter")
const ORDER_ATTEMPTS_ROUTER = require("./orderAttemptsRouter")


const HOME_ROUTER = EXPRESS.Router()

// free
HOME_ROUTER.get("/", HomeController.getHome)
HOME_ROUTER.use("/auth", AUTH_ROUTER)
// token
HOME_ROUTER.use(Middleware.tokenGuard)
HOME_ROUTER.use("/user", USER_ROUTER)
HOME_ROUTER.use("/comment", COMMENT_ROUTER)
HOME_ROUTER.use("/orderAttempts", ORDER_ATTEMPTS_ROUTER)
HOME_ROUTER.use("/userOrders", USER_ORDERS_ROUTER)
HOME_ROUTER.use("/order", ORDER_ROUTER)


module.exports = HOME_ROUTER
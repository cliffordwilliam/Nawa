const EXPRESS = require("express")
const AuthController = require("../controllers/authController")


const AUTH_ROUTER = EXPRESS.Router()

AUTH_ROUTER.get("/", AuthController.getAuth)
AUTH_ROUTER.post("/register", AuthController.register)
AUTH_ROUTER.post("/login", AuthController.login)


module.exports = AUTH_ROUTER
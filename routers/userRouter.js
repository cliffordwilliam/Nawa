const EXPRESS = require("express")
const UserController = require("../controllers/userController")


const USER_ROUTER = EXPRESS.Router()

USER_ROUTER.get("/", UserController.getUser)


module.exports = USER_ROUTER
if (process.env.NODE_ENV !== "production") require('dotenv').config() // production? read production. Not the local env file.
const EXPRESS = require("express")
const HOME_ROUTER = require("./routers/homeRouter")
const Middleware = require("./middleware/middleware")


const APP = EXPRESS()

APP.use(EXPRESS.urlencoded({extended:true}))
APP.use(EXPRESS.json())
APP.use(HOME_ROUTER)
APP.use(Middleware.errorHandler)


module.exports = APP
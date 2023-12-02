const Util = require("../util/util")
const Helper = require("../helper/helper")
const {User,Order,UserOrders,OrderAttempts,Comment} = require("../models")


class HomeController {
    static async getHome(req,res,next){
        try {
            res.status(200).json({
                msg: "Success getHome"
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = HomeController
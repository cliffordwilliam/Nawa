const Util = require("../util/util")
const Helper = require("../helper/helper")
const {User,Order,UserOrders,OrderAttempts,Comment} = require("../models")


class UserOrdersController {
    static async getUserOrders(req,res,next){
        try {
            res.status(200).json({
                msg: "Success getUserOrders"
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = UserOrdersController
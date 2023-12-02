const Util = require("../util/util")
const Helper = require("../helper/helper")
const {User,Order,UserOrders,OrderAttempts,Comment} = require("../models")


class OrderAttemptsController {
    static async getOrderAttempts(req,res,next){
        try {
            res.status(200).json({
                msg: "Success getOrderAttempts"
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = OrderAttemptsController
const Util = require("../util/util")
const Helper = require("../helper/helper")
const {User,Order,UserOrders,OrderAttempts,Comment} = require("../models")


class OrderController {
    static async getOrder(req,res,next){
        try {
            res.status(200).json({
                msg: "Success getOrder"
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = OrderController
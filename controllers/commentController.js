const Util = require("../util/util")
const Helper = require("../helper/helper")
const {User,Order,UserOrders,OrderAttempts,Comment} = require("../models")


class CommentController {
    static async getComment(req,res,next){
        try {
            res.status(200).json({
                msg: "Success getComment"
            })
        } catch (error) {
            next(error)
        }
    }
}


module.exports = CommentController
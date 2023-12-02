const Util = require("../util/util")
const Helper = require("../helper/helper")
const {User,Order,UserOrders,OrderAttempts,Comment} = require("../models")


class UserController {
    static async getUser(req,res,next){
        try {
            if (req.query.username && !isNaN(+req.query.username)) throw {name:"CustomError",msg:"username query must be a string",status:400}
            if (req.query.reputation_score && isNaN(+req.query.reputation_score)) throw {name:"CustomError",msg:"reputation_score query must be a number",status:400}
            if (req.query.page && isNaN(+req.query.page)) throw {name:"CustomError",msg:"page query must be a number",status:400}
            // todo: do not fix other people's issue
            // so just throw when numbers are float or under 0

            const USERS_ARRAY = await User.findAll()
            res.status(200).json({
                msg: "Success getUser",
                users: USERS_ARRAY
            })
        } catch (error) {
            next(error)
        }
    }
    static async postUser(req,res,next){
        try {
            res.status(201).json({
                msg: "Success postUser"
            })
        } catch (error) {
            
        }
    }
}


module.exports = UserController
const Util = require("../util/util")
const Helper = require("../helper/helper")
const {User,Order,UserOrders,OrderAttempts,Comment} = require("../models")


/**
 * Error handler + guards
 */
class Middleware {
    /**
     * Res status code + message based on err.name.
     */
    static async errorHandler(err,req,res,next){
        // console.log(err)
        try {
            switch (err.name) {
                case "SequelizeValidationError":
                case "SequelizeUniqueConstraintError":
                    return res.status(400).json({msg:err.errors[0].message})
                case "CustomError":
                    return res.status(err.status).json({msg:err.msg})
                case "JsonWebTokenError":
                    return res.status(401).json({msg:err.message})
                default:
                    return res.status(500).json({msg:"Internal Server Error"})
            }
        } catch (error) {
        }
    }
    /**
     * No token? Throw.
     * Token wrong? Throw. (AKA token's user data does not exist in database)
     * Got correct token? Store token's user data in req.loggedInUser
     */
    static async tokenGuard(req,res,next){
        try {
            // got token? (header authorization?)
            if (!req.headers.authorization) throw ({name:"CustomError",msg:"unauthorized",status:401})
            // grab token
            const TOKEN = req.headers.authorization.split(" ")[1]
            // token -> payload (token's user data)
            const PAYLOAD = await Helper.tokenVerifier(TOKEN)
            // user exist?
            const USER = await Helper.findOne(User, {username:PAYLOAD.username}, true)
            // add user data to req
            req.loggedInUser = {id:USER.id, username:USER.username, role:USER.role, reputation_score:USER.reputation_score}
            next()
        } catch (error) {
            next(error)
        }
    }
    /**
     * Check the role of the loggedInUser with the given givenRole.
     * 
     * @param {number} givenRole - The given value to check against the loggedInUser.
     * @returns {Promise<string>} - Resolves nothing. Calls the next func.
     */
    static roleGuard = async (givenRole)=>{
        try {
            return async (req,res,next)=>{
                try {
                    if (req.loggedInUser.role !== givenRole) throw ({name:"CustomError",msg:"Forbidden",status:403})
                    next()
                } catch (error) {
                    next(error)
                }
            }
        } catch (error) {
            next(error)
        }
    }
}


module.exports = Middleware
const Util = require("../util/util")
const Helper = require("../helper/helper")
const {User,Order,UserOrders,OrderAttempts,Comment} = require("../models")


class AuthController {
    static async getAuth(req,res,next){
        try {
            res.status(200).json({
                msg: "Success getAuth"
            })
        } catch (error) {
            next(error)
        }
    }
    static async register(req,res,next){
        try {
            // body check
            if (!req.body.username) throw ({name:"CustomError",msg:`username required`,status:400})
            if (!req.body.password) throw ({name:"CustomError",msg:`password required`,status:400})
            if (!req.body.role) throw ({name:"CustomError",msg:`role required`,status:400})
            // create user
            const USER = await User.create({username:req.body.username,password:req.body.password,role:req.body.role,reputation_score:req.body.reputation_score})
            // status 201
            res.status(201).json({msg:"Success register",user:{username:USER.username,role:USER.role,reputation_score:USER.reputation_score}})
        } catch (error) {
            next(error)
        }
    }
    static async login(req,res,next){
        try {
            // body check
            if (!req.body.username) throw ({name:"CustomError",msg:`username required`,status:400})
            if (!req.body.password) throw ({name:"CustomError",msg:`password required`,status:400})
            // user exist?
            const USER = await Helper.findOne(User,{username:req.body.username},true)
            // password same?
            if (!await Helper.passwordComparer(req.body.password,USER.password)) throw ({name:"CustomError",msg:`wrong password`,status:401})
            // make payload (token's user data)
            const PAYLOAD = {id:USER.id,username:USER.username,role:USER.role,reputation_score:USER.reputation_score}
            // payload (token's user data) -> token
            const TOKEN = await Helper.tokenGenerator(PAYLOAD)
            // status 200
            res.status(200).json({msg:"Success login", token:TOKEN})
        } catch (error) {
            next(error)
        }
    }
}


module.exports = AuthController
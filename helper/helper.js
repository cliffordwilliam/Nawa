const BCRYPT = require('bcrypt')
const JWT = require('jsonwebtoken')


/**
 * A cool helper class!
 */
class Helper {
    /**
     * What it says on the tin, uses bcrypt.
     * 
     * @param {string} value - The value to be hashed.
     * @returns {Promise<string>} - Resolves the hashed value.
     * @throws {error} - Hashing error.
     */
    static async passwordHasher(value) {
        try {
            const salt = 10
            return await BCRYPT.hash(value, salt)
        } catch (error) {
            throw error
        }
    }
    /**
     * Find an obj by its id from the given sequelize model.
     * 
     * @param {number} value - The id.
     * @param {import('sequelize').Model} model - The sequelize model.
     * @returns {Promise<{id:number, OBJ:object}>} - Resolves the given id and the found object.
     * @throws {error} - Custom error if findByPk returns falsy.
     */
    static async findById(id, model) {
        try {
            const OBJ = await model.findByPk(id)
            if (!OBJ) {
                throw({name:"CustomError",msg: `Obj with id:${id} is not found.`,status:404})
            }
            return {id, OBJ}
        } catch (error) {
            throw error
        }
    }
    /**
     * Compare the user given normal password with the hashed password in the database.
     * 
     * @param {string} receivedPassword - Given un-hashed password.
     * @param {string} databasePassword - Database hashed password.
     * @returns {Promise<boolean>} - Resolves boolean, true if password is the same.
     * @throws {error} - Password is not the same error.
     */
    static async passwordComparer(receivedPassword, databasePassword) {
        try {
            return await BCRYPT.compare(receivedPassword, databasePassword)
        } catch (error) {
            throw error
        }
    }
    /**
     * Turns payload + jwt secret key into a token.
     * 
     * @param {object} payload - Given payload that contains the to be logged in user data.
     * @returns {Promise<string>} - Resolves token. A long string.
     * @throws {error} -  JWT.sign function error.
     */
    static async tokenGenerator(payload){
        try {
            return await JWT.sign(payload,process.env.SECRET_KEY)
        } catch (error) {
            throw error
        }
    }
    /**
     * Turns token into a payload. Payload that contains logged in user data.
     * If token is wrong, then the payload should have non-existent user data. When compared with databse users, it should not find anything.
     * 
     * @param {string} token - Given payload that contains the to be logged in user data.
     * @returns {Promise<string>} - Resolves payload. An object with logged user data.
     * @throws {error} -  JWT.verify function error.
     */
    static async tokenVerifier(token){
        try {
            return await JWT.verify(token,process.env.SECRET_KEY)
        } catch (error) {
            throw error
        }
    }
    /**
     * Find an obj by the given value from the given sequelize model.
     * 
     * @param {object} where - The criteria
     * @param {import('sequelize').Model} model - The sequelize model.
     * @returns {Promise<{OBJ:object}>} - Resolves the found object. 
     */
    static async findOne(model, where, isCheckingPayload=false){
        try {
            const OBJ = await model.findOne({where})
            if (!OBJ) {
                if (isCheckingPayload) { // check TOKEN -> Payload -> Payload got the right mail?
                    throw ({name:"CustomError",msg:`unauthorized`,status:401})
                }
                throw ({name:"CustomError",msg:`Obj with this ${where} is not found.`,status:404})
            }
            return OBJ
        } catch (error) {
            throw error
        }
    }
}


module.exports = Helper
// BEFORE TESTING:
// update the config json for testing first
// create the test db - npx sequelize db:create --env test
// create the test models - npx sequelize db:migrate --env test


const REQUEST = require("supertest")
const APP = require("../app")
const {sequelize} = require('../models')
const Helper = require("../helper/helper")

// const PATH = require("path")
// const FS = require("fs")
// const FILE_PATH = PATH.resolve(__dirname, "./test.webp")
// const IMAGE_BUFFER = FS.readFileSync(FILE_PATH)

let takerToken
let giverToken
let adminToken

beforeAll(async ()=>{
    // seed user: 1 Admin + 1 Giver + 1 Taker
    const users = [
        {
            username: 'Taker',
            password: await Helper.passwordHasher("Password"),
            role: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            username: 'Giver',
            password: await Helper.passwordHasher("Password"),
            role: 1,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            username: 'Admin',
            password: await Helper.passwordHasher("Password"),
            role: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ]
    await sequelize.queryInterface.bulkInsert('Users',users,{})
    // create payload -> tokens (user data): 1 Admin + 1 Giver + 1 Taker
    const TAKER_PAYLOAD = {id:1,username:users[0].username,role:users[0].role}
    const GIVER_PAYLOAD = {id:2,username:users[1].username,role:users[1].role}
    const ADMIN_PAYLOAD = {id:3,username:users[2].username,role:users[2].role}
    takerToken = await Helper.tokenGenerator(TAKER_PAYLOAD)
    giverToken = await Helper.tokenGenerator(GIVER_PAYLOAD)
    adminToken = await Helper.tokenGenerator(ADMIN_PAYLOAD)
})

afterAll(async ()=>{
    // empty all tables
    await sequelize.queryInterface.bulkDelete('Users', null,{truncate:true,cascade:true,restartIdentity:true})
    await sequelize.queryInterface.bulkDelete('Orders', null,{truncate:true,cascade:true,restartIdentity:true})
    await sequelize.queryInterface.bulkDelete('UserOrders', null,{truncate:true,cascade:true,restartIdentity:true})
    await sequelize.queryInterface.bulkDelete('Comments', null,{truncate:true,cascade:true,restartIdentity:true})
    await sequelize.queryInterface.bulkDelete('OrderAttempts', null,{truncate:true,cascade:true,restartIdentity:true})
})

describe("Post - base/auth/register", ()=>{
    describe("Response 201", ()=>{
        it("return msg and user", async ()=>{
            const BODY = {username:"New Taker",password:"Password",role:1}
            const RESPONSE = await REQUEST(APP).post("/auth/register").send(BODY)
            expect(RESPONSE.status).toBe(201)
            expect(RESPONSE.body).toBeInstanceOf(Object)
            expect(RESPONSE.body).toHaveProperty("msg", "Success register")
            expect(RESPONSE.body).toHaveProperty("user")
        })
    })
    describe("Response 400 - posting the same username again", ()=>{
        it("return msg", async ()=>{
            const BODY = {username:"Taker",password:"Password",role:1}
            const RESPONSE = await REQUEST(APP).post("/auth/register").send(BODY)
            expect(RESPONSE.status).toBe(400)
            expect(RESPONSE.body).toBeInstanceOf(Object)
            expect(RESPONSE.body).toHaveProperty("msg", "username must be unique")
        })
    })
    describe("Response 400 - username is empty", ()=>{
        it("return msg", async ()=>{
            const BODY = {username:undefined,password:"Password",role:1}
            const RESPONSE = await REQUEST(APP).post("/auth/register").send(BODY)
            expect(RESPONSE.status).toBe(400)
            expect(RESPONSE.body).toBeInstanceOf(Object)
            expect(RESPONSE.body).toHaveProperty("msg", "username required")
        })
    })
    describe("Response 400 - password is empty", ()=>{
        it("return msg", async ()=>{
            const BODY = {username:"Taker",password:undefined,role:1}
            const RESPONSE = await REQUEST(APP).post("/auth/register").send(BODY)
            expect(RESPONSE.status).toBe(400)
            expect(RESPONSE.body).toBeInstanceOf(Object)
            expect(RESPONSE.body).toHaveProperty("msg", "password required")
        })
    })
    describe("Response 400 - role is empty", ()=>{
        it("return msg", async ()=>{
            const BODY = {username:"Taker",password:"Password",role:undefined}
            const RESPONSE = await REQUEST(APP).post("/auth/register").send(BODY)
            expect(RESPONSE.status).toBe(400)
            expect(RESPONSE.body).toBeInstanceOf(Object)
            expect(RESPONSE.body).toHaveProperty("msg", "role required")
        })
    })
})

describe("Post - base/auth/login", ()=>{
    describe("Response 200", ()=>{
        it("return msg and user", async ()=>{
            const BODY = {username:"Taker",password:"Password"}
            const RESPONSE = await REQUEST(APP).post("/auth/login").send(BODY)
            expect(RESPONSE.status).toBe(200)
            expect(RESPONSE.body).toBeInstanceOf(Object)
            expect(RESPONSE.body).toHaveProperty("msg", "Success login")
            expect(RESPONSE.body).toHaveProperty("token")
        })
    })
    describe("Response 400 - username is empty", ()=>{
        it("return msg", async ()=>{
            const BODY = {username:undefined,password:"Password"}
            const RESPONSE = await REQUEST(APP).post("/auth/login").send(BODY)
            expect(RESPONSE.status).toBe(400)
            expect(RESPONSE.body).toBeInstanceOf(Object)
            expect(RESPONSE.body).toHaveProperty("msg", "username required")
        })
    })
    describe("Response 400 - password is empty", ()=>{
        it("return msg", async ()=>{
            const BODY = {username:"Taker",password:undefined}
            const RESPONSE = await REQUEST(APP).post("/auth/login").send(BODY)
            expect(RESPONSE.status).toBe(400)
            expect(RESPONSE.body).toBeInstanceOf(Object)
            expect(RESPONSE.body).toHaveProperty("msg", "password required")
        })
    })
    describe("Response 401 - username is not in database", ()=>{
        it("return msg", async ()=>{
            const BODY = {username:"Wrong",password:"Password"}
            const RESPONSE = await REQUEST(APP).post("/auth/login").send(BODY)
            expect(RESPONSE.status).toBe(401)
            expect(RESPONSE.body).toBeInstanceOf(Object)
            expect(RESPONSE.body).toHaveProperty("msg", "unauthorized")
        })
    })
    describe("Response 401 - password is wrong", ()=>{
        it("return msg", async ()=>{
            const BODY = {username:"Taker",password:"Wrong"}
            const RESPONSE = await REQUEST(APP).post("/auth/login").send(BODY)
            expect(RESPONSE.status).toBe(401)
            expect(RESPONSE.body).toBeInstanceOf(Object)
            expect(RESPONSE.body).toHaveProperty("msg", "wrong password")
        })
    })
})

describe("Get - base/user", ()=>{
    describe("Response 200", ()=>{
        it("return msg and users", async ()=>{
            const RESPONSE = await REQUEST(APP).get("/user").set('Authorization',`Bearer ${takerToken}`)
            expect(RESPONSE.status).toBe(200)
            expect(RESPONSE.body).toBeInstanceOf(Object)
            expect(RESPONSE.body).toHaveProperty("msg", "Success getUser")
            expect(RESPONSE.body).toHaveProperty("users")
        })
    })
    describe("Response 400 - name query is not a string", ()=>{
        it("return msg", async ()=>{
            const RESPONSE = await REQUEST(APP).get("/user?username=1").set('Authorization',`Bearer ${takerToken}`)
            expect(RESPONSE.status).toBe(400)
            expect(RESPONSE.body).toBeInstanceOf(Object)
            expect(RESPONSE.body).toHaveProperty("msg", "username query must be a string")
        })
    })
})
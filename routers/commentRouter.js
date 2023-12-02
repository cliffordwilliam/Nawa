const EXPRESS = require("express")
const CommentController = require("../controllers/commentController")


const COMMENT_ROUTER = EXPRESS.Router()

COMMENT_ROUTER.get("/", CommentController.getComment)


module.exports = COMMENT_ROUTER
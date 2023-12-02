const APP = require("../app")


const PORT = process.env.PORT || 3000
APP.listen(PORT, ()=>{`listening to ${PORT}`})
require("dotenv").config()
const app = require("./src/app")
const ConnectToDB = require("./src/config/database")

/**Calling Database function */
ConnectToDB()

app.listen(3000, ()=>{
    console.log("Server is running on port: 3000")
})
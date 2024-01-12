import express from "express"
import cors from "cors"
import connection from "connection.js"
const app = express()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
module.exports=app
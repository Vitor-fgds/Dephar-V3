const express = require("express")
const mongoose = require("mongoose")
const app = express()
require("express-async-errors");
const connectBD = require("./db/connects.js")
const principiosRouter = require("./routes/principiosativos.js")
const authRouter = require("./routes/auth.js")
const notFoundMiddleware = require("./middleware/not-found.js")
const errorHandlerMiddleware = require("./middleware/error-handler.js")
require("dotenv").config()
require("express-async-errors")
const path = require("path");
const { dir } = require("console")

//middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

//routes
app.get("/dephar", (req,res) => {
    res.sendFile(path.join(__dirname, "public", "html", "dephar_homepage.html"))
})
app.get("/dephar/sobre", (req,res) => {
    res.sendFile(path.join(__dirname, "public", "html", "dephar_sobre.html"))
})
app.get("/dephar/principio", (req,res) => {
    res.sendFile(path.join(__dirname, "public", "html", "principio.html"))
})

app.get("/dephar/login", (req,res) => {
    res.sendFile(path.join(__dirname, "public", "html", "login.html"))
})

app.get("/dephar/register", (req,res) => {
    res.sendFile(path.join(__dirname, "public", "html", "register.html"))
})

app.get("/dephar/criarPrincipio", (req,res) => {
    res.sendFile(path.join(__dirname, "public", "html", "criarPrincipio.html"))
})

app.use("/api/v1/dephar", principiosRouter)
app.use("/api/v1/auth", authRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectBD(process.env.MONGO_URI);
        app.listen(port, () => {console.log(`O servidor está ouvindo na porta ${port}...`)})

    } catch (error) {
        console.log("Connection Failed!");
        process.exit(1);
    }
}

start()


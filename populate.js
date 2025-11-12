require("dotenv").config()
const connectBD = require("./db/connects.js")
const principioAtivo = require("./models/principiosativos.js")
const jsonPrincipios = require("./principiosativos.json")

const start = async () => {
    try {
        await connectBD(process.env.MONGO_URI);
        await principioAtivo.deleteMany();
        await principioAtivo.create(jsonPrincipios);
        console.log("Success!")
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

start()
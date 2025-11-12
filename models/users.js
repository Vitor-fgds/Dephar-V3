const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Por favor, insira um e-mail!"],
        match: [
             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Por favor, digite um email válido!"
        ],
        unique: true,
    },

    password: {
        type: String,
        required: [true, "Por favor, insira uma senha!"],
    },

    userType: {
        type: String,
        required: true,
        enum: ["Moderador", "Usuário"],
        default: "Usuário"

    }
})

UserSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function(){
    return jwt.sign(
        {userId: this._id, userType: this.userType},
        process.env.JWT_SECRET,
        {expiresIn: "30d"},
    )
}

UserSchema.methods.comparePassword = async function(reqPassword){
    const isMatch = await bcrypt.compare(reqPassword, this.password);
    return isMatch;
}

module.exports = mongoose.model("User", UserSchema);
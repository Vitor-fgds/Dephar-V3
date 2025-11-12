const mongoose = require("mongoose")

const principioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        maxLength: 50
    },

    descricao: {
        type: String,
        required: true,
        maxLength: 120
    },

    formula: {
        type: String,
        required: true,
        maxLength: 30
    },

    pesoMolar: {
        type: Number,
        required: true
    },

    classeTerapeutica: {
        type: String,
        required: true,
        /*
        enum: {
            values: ["Antibióticos", "Analgésicos", "Antivirais", "Antifúngicos", "Antiparasitórios", "Anti-inflamatórios", " Antipiréticos",  " Antihistamínicos", "Expectorantes"],
            message: "Classe Terapeutica não registrada!"
        }
        */
    },

    indicacoesTerapeuticas: {
        type: [String],
        required: true
    },

    contraIndicacoes: {
        type: [String],
        required: true
    },

    efeitosColaterais: {
        type: [String], // Novo campo para armazenar os efeitos colaterais
        required: true
    },

    classeFarmacologica: {
        type: String,
        required: true
    }
}, {timestamps: true})

const principioModel = mongoose.model("PrincipioAtivo", principioSchema)
module.exports = principioModel

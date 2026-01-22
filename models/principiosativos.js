const mongoose = require("mongoose")

const principioSchema = new mongoose.Schema({

    nomeFarmaco: {
        type: String,
        required: true,
        maxLength: 100
    },

    nomeQuimico: {
        type: String,
        required: true,
        maxLength: 150
    },

    formulaMolecular: {
        type: String,
        required: true,
        maxLength: 50
    },

    formulaEstrutural: {
        type: String, 
        required: false
    },

    pesoMolar: {
        type: Number,
        required: false
    },

    classe: {
        type: String,
        required: true,
        maxLength: 100
    },

    indicacoesTerapeuticas: {
        type: [String],
        required: true
    },

    contraindicacoes: {
        type: [String],
        required: true
    },

    toxicidade: {
        type: String,
        required: false,
        maxLength: 500
    },

    formasFarmaceuticas: {
        type: [String],
        required: true
    },

    farmacodinamica: {
        type: String,
        required: true,
        maxLength: 1000
    },

    farmacocinetica: {
        absorcao: String,
        distribuicao: String,
        metabolismo: String,
        excrecao: String,
        textoCompleto: String
    },

    farmacogenetica: {
        type: String,
        required: false,
        maxLength: 1000
    },

    interacoesMedicamentosas: {
        type: [String],
        required: false
    },

    interacoesAlimentos: {
        type: [String],
        required: false
    },

    armazenamento: {
        type: String,
        required: true,
        maxLength: 300
    },

    incompatibilidades: {
        type: [String],
        required: false
    },

    origem: {
        type: String,
        required: false
    },

    producao: {
        type: String,
        required: false,
        maxLength: 500
    },

    descarte: {
        type: String,
        required: true,
        maxLength: 300
    },

    validadeAnos: {
        type: Number,
        required: true
    },

    bulas: [{
        titulo: String,
        url: String,
        dataAdicao: Date
    }],

}, {timestamps: true})
    
const principioModel = mongoose.model("PrincipioAtivo", principioSchema)
module.exports = principioModel

const principioAtivo = require("../models/principiosativos.js")
const getPrincipio = async (req,res) => {
    try{
    const {nome} = req.query;
    const queryObject = {}

    if(nome){
        queryObject.nome = {$regex: nome, $options: "i" }
    }
    const result = principioAtivo.find(queryObject);
    const principio = await result;
    res.status(200).json({principio})}
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const getPrincipioById = async (req,res) => {
    try{
    const {id} = req.params;
    const principio = await principioAtivo.findById(id)
    if(!principio){
        return res.status(404).json({message: "O id digitado não pertence a nenhum príncipio ativo!"})
    }
    res.status(200).json({principio})}
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const deletePrincipio = async (req,res) => {
    try{
    const {id} = req.params;
    const principio = await principioAtivo.findByIdAndDelete(id)
    if(!principio){
       return res.status(404).json({message: "O id digitado não pertence a nenhum príncipio ativo!"})
    }
    res.status(200).json({message: "Item excluído!"})}
    catch(error){
        res.status(500).json({message: error.message})
    }
}

const updatePrincipio = async (req,res) => {
    try{
    const {id} = req.params;
    const principio = await principioAtivo.findByIdAndUpdate(id, req.body, {
        new:true,
        runValidators:true,
    })
    if(!principio){
        return res.status(404).json({message: "O id digitado não pertence a nenhum príncipio ativo!"})
    }
    res.status(200).json({principio})}
    catch(error){
        res.status(500).json({message: error.message})
    }
}



const createPrincipio = async (req,res) => {
    try{
    const principio = await principioAtivo.create(req.body);
    res.status(201).json({principio})}
    catch(error){
        res.status(500).json({message: error.message})
    }
}


module.exports = { getPrincipioById, deletePrincipio, updatePrincipio, createPrincipio, getPrincipio}
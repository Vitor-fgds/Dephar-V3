// ===== VERIFICAÇÃO DE AUTENTICAÇÃO =====
// Esta função verifica se o usuário tem permissão para acessar a página
const verificarAutenticacao = () => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    
    // Se não for Moderador autenticado, redireciona
    if (!token || userType !== "Moderador") {
        alert("Acesso negado! Apenas moderadores podem acessar esta página.");
        window.location.href = "/dephar";
        return;
    }
};

// Executa a verificação assim que a página carrega
verificarAutenticacao();

// Função para ir para home
function goHome() {
    window.location.href = "/dephar";
}

// Função para cancelar formulário
function cancelForm() {
    const confirmacao = confirm("Deseja realmente cancelar? Todos os dados serão perdidos.");
    if (confirmacao) {
        window.location.href = "/dephar";
    }
}

// Função para remover item do array
function removeArrayItem(button) {
    const arrayItem = button.parentElement;
    const arrayItems = arrayItem.parentElement;
    
    // Verifica se o campo é obrigatório
    const isRequired = arrayItem.querySelector('input').hasAttribute('required');
    
    // Só remove se houver mais de um item OU se não for obrigatório
    if (arrayItems.children.length > 1 || !isRequired) {
        arrayItem.remove();
    } else {
        alert("Deve haver pelo menos um item!");
    }
}

// Função para adicionar indicação
function addIndicacao(value = "") {
    const container = document.getElementById("indicacoesItems");
    const newItem = document.createElement("div");
    newItem.classList.add("array-item");
    newItem.innerHTML = `
        <input 
            type="text" 
            class="form-input indicacao-input" 
            placeholder="Digite uma indicação terapêutica"
            value ="${value}"
            required
        >
        <button type="button" class="btn-remove" onclick="removeArrayItem(this)">Remover</button>
    `;
    container.appendChild(newItem);
}

// Função para adicionar contraindicação
function addContraindicacao(value = "") {
    const container = document.getElementById("contraindicacoesItems");
    const newItem = document.createElement("div");
    newItem.classList.add("array-item");
    newItem.innerHTML = `
        <input 
            type="text" 
            class="form-input contraindicacao-input" 
            placeholder="Digite uma contraindicação"
            value ="${value}"
            required
        >
        <button type="button" class="btn-remove" onclick="removeArrayItem(this)">Remover</button>
    `;
    container.appendChild(newItem);
}

// Função para adicionar forma farmacêutica
function addFormaFarmaceutica(value = "") {
    const container = document.getElementById("formasItems");
    const newItem = document.createElement("div");
    newItem.classList.add("array-item");
    newItem.innerHTML = `
        <input 
            type="text" 
            class="form-input forma-input" 
            placeholder="Ex: Comprimido 500mg"
            value ="${value}"
            required
        >
        <button type="button" class="btn-remove" onclick="removeArrayItem(this)">Remover</button>
    `;
    container.appendChild(newItem);
}

// Função para adicionar interação medicamentosa
function addInteracaoMedicamentosa(value = "") {
    const container = document.getElementById("interacoesMedItems");
    const newItem = document.createElement("div");
    newItem.classList.add("array-item");
    newItem.innerHTML = `
        <input 
            type="text" 
            class="form-input interacao-med-input" 
            placeholder="Ex: Evitar uso com varfarina"
            value ="${value}"
        >
        <button type="button" class="btn-remove" onclick="removeArrayItem(this)">Remover</button>
    `;
    container.appendChild(newItem);
}

// Função para adicionar interação com alimentos
function addInteracaoAlimento(value = "") {
    const container = document.getElementById("interacoesAlimItems");
    const newItem = document.createElement("div");
    newItem.classList.add("array-item");
    newItem.innerHTML = `
        <input 
            type="text" 
            class="form-input interacao-alim-input" 
            placeholder="Ex: Tomar com alimentos"
            value ="${value}"
        >
        <button type="button" class="btn-remove" onclick="removeArrayItem(this)">Remover</button>
    `;
    container.appendChild(newItem);
}

// Função para adicionar incompatibilidade
function addIncompatibilidade(value = "") {
    const container = document.getElementById("incompatibilidadesItems");
    const newItem = document.createElement("div");
    newItem.classList.add("array-item");
    newItem.innerHTML = `
        <input 
            type="text" 
            class="form-input incompatibilidade-input" 
            placeholder="Ex: Incompatível com soluções alcalinas"
            value ="${value}"
        >
        <button type="button" class="btn-remove" onclick="removeArrayItem(this)">Remover</button>
    `;
    container.appendChild(newItem);
}

// Função para adicionar bula
function addBula(titulo = "", url =  "") {
    const container = document.getElementById("bulasItems");
    const newItem = document.createElement("div");
    newItem.classList.add("array-item");
    newItem.innerHTML = `
        <input 
            type="text" 
            class="form-input bula-titulo-input" 
            placeholder="Título da bula"
            style="flex: 1; margin-right: 0.5rem;"
            value="${titulo}"
        >
        <input 
            type="url" 
            class="form-input bula-url-input" 
            placeholder="URL da bula"
            value="${url}"
            style="flex: 2; margin-right: 0.5rem;"
        >
        <button type="button" class="btn-remove" onclick="removeArrayItem(this)">Remover</button>
    `;
    container.appendChild(newItem);
}

// Animação de entrada dos elementos
document.addEventListener("DOMContentLoaded", () => {
    const formContainer = document.querySelector(".form-container");
    const accessDeniedContainer = document.querySelector(".access-denied-container");
    
    // Anima o container que está visível
    if (formContainer && formContainer.offsetParent !== null) {
        formContainer.style.opacity = "0";
        formContainer.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            formContainer.style.transition = "all 0.5s ease";
            formContainer.style.opacity = "1";
            formContainer.style.transform = "translateY(0)";
        }, 100);
    }
    
    if (accessDeniedContainer && accessDeniedContainer.offsetParent !== null) {
        accessDeniedContainer.style.opacity = "0";
        accessDeniedContainer.style.transform = "translateY(20px)";
        
        setTimeout(() => {
            accessDeniedContainer.style.transition = "all 0.5s ease";
            accessDeniedContainer.style.opacity = "1";
            accessDeniedContainer.style.transform = "translateY(0)";
        }, 100);
    }
});


// ===== SELEÇÃO DE ELEMENTOS PARA BACKEND =====
// Selecionar o formulário
const principioForm = document.getElementById("principioForm");

// Selecionar inputs simples - NOVOS CAMPOS
const nomeFarmacoInput = document.getElementById("nomeFarmaco");
const nomeQuimicoInput = document.getElementById("nomeQuimico");
const formulaMolecularInput = document.getElementById("formulaMolecular");
const formulaEstrutturalInput = document.getElementById("formulaEstrutural");
const pesoMolarInput = document.getElementById("pesoMolar");
const classeInput = document.getElementById("classe");
const toxicidadeInput = document.getElementById("toxicidade");
const farmacodinamicaInput = document.getElementById("farmacodinamica");
const farmacocineticaInput = document.getElementById("farmacocinetica");
const farmacogeneticaInput = document.getElementById("farmacogenetica");
const armazenamentoInput = document.getElementById("armazenamento");
const origemInput = document.getElementById("origem");
const producaoInput = document.getElementById("producao");
const descarteInput = document.getElementById("descarte");
const validadeAnosInput = document.getElementById("validadeAnos");

// Função auxiliar para coletar valores de arrays
const getArrayInputs = (className) => {
    const inputs = document.querySelectorAll(`.${className}`);
    return Array.from(inputs).map(input => input.value.trim()).filter(value => value !== "");
};

// Função para coletar dados das bulas
const getBulasValues = () => {
    const tituloInputs = document.querySelectorAll('.bula-titulo-input');
    const urlInputs = document.querySelectorAll('.bula-url-input');
    const bulas = [];
    
    tituloInputs.forEach((tituloInput, index) => {
        const titulo = tituloInput.value.trim();
        const url = urlInputs[index].value.trim();
        
        if (titulo && url) {
            bulas.push({
                titulo: titulo,
                url: url,
                dataAdicao: new Date()
            });
        }
    });
    
    return bulas;
};

// Função para processar farmacocinética
const getFarmacocineticaData = () => {
    const textoCompleto = farmacocineticaInput.value.trim();
    
    if (!textoCompleto) {
        return null;
    }
    
    return {
        textoCompleto: textoCompleto
    };
};

const params = new URLSearchParams(window.location.search)
const id = params.get("id")

const carregarDadosIniciais = async () => {
    try{
        const pesquisa = await axios.get(`/api/v1/dephar/?id=${id}`)
        console.log(pesquisa.data)
        const principio = pesquisa.data.principio[0]
        nomeFarmacoInput.value = principio.nomeFarmaco
        nomeQuimicoInput.value = principio.nomeQuimico
        formulaMolecularInput.value = principio.formulaMolecular
        formulaEstrutturalInput.value = principio.formulaEstrutural
        pesoMolarInput.value = principio.pesoMolar
        classeInput.value = principio.classe
        toxicidadeInput.value = principio.toxicidade
        farmacodinamicaInput.value = principio.farmacodinamica
        farmacocineticaInput.value = principio.farmacocinetica?.textoCompleto || "";
        farmacogeneticaInput.value = principio.farmacogenetica
        armazenamentoInput.value = principio.armazenamento
        origemInput.value = principio.origem
        producaoInput.value = principio.producao
        descarteInput.value = principio.descarte
        validadeAnosInput.value = principio.validadeAnos
        principio.indicacoesTerapeuticas?.forEach(valor => addIndicacao(valor))
        principio.contraindicacoes?.forEach(valor => addContraindicacao(valor))
        principio.formasFarmaceuticas?.forEach(valor => addFormaFarmaceutica(valor))
        principio.interacoesMedicamentosas?.forEach(valor => addInteracaoMedicamentosa(valor))
        principio.interacoesAlimentos?.forEach(valor => addInteracaoAlimento(valor))
        principio.incompatibilidades?.forEach(valor => addIncompatibilidade(valor))
        principio.bulas?.forEach(bula => addBula(bula.titulo, bula.url))
    }
    catch(error){
        console.error("Erro ao buscar informações do princípio ativo:", error);
                alert("Erro ao carregar informações do princípio ativo!");
                window.location.href = "/dephar";

    }
}

carregarDadosIniciais();

principioForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    // ✅ CORRETO - Coleta os valores AQUI, dentro do submit
    const indicacoesTerapeuticas = getArrayInputs("indicacao-input");
    const contraIndicacoes = getArrayInputs("contraindicacao-input");
    const formasFarmaceuticas = getArrayInputs("forma-input");
    const interacoesMedicamentosas = getArrayInputs("interacao-med-input");
    const interacoesAlimentos = getArrayInputs("interacao-alim-input");
    const incompatibilidades = getArrayInputs("incompatibilidade-input");
    const bulas = getBulasValues();
    
    // Validações
    if (indicacoesTerapeuticas.length === 0) {
        alert("Adicione pelo menos uma indicação terapêutica!");
        return;
    }
    
    if (contraIndicacoes.length === 0) {
        alert("Adicione pelo menos uma contraindicação!");
        return;
    }
    
    if (formasFarmaceuticas.length === 0) {
        alert("Adicione pelo menos uma forma farmacêutica!");
        return;
    }

    const token = localStorage.getItem("token");

    try {
        const response = await axios.patch(`/api/v1/dephar/${id}`, {
            nomeFarmaco: nomeFarmacoInput.value.trim(),
            nomeQuimico: nomeQuimicoInput.value.trim(),
            formulaMolecular: formulaMolecularInput.value.trim(),
            formulaEstrutural: formulaEstrutturalInput.value.trim() || undefined,
            pesoMolar: pesoMolarInput.value ? parseFloat(pesoMolarInput.value) : undefined,
            classe: classeInput.value.trim(),
            
            indicacoesTerapeuticas: indicacoesTerapeuticas,
            contraindicacoes: contraIndicacoes,
            toxicidade: toxicidadeInput.value.trim() || undefined,
            
            formasFarmaceuticas: formasFarmaceuticas,
            
            farmacodinamica: farmacodinamicaInput.value.trim(),
            farmacocinetica: getFarmacocineticaData(),
            farmacogenetica: farmacogeneticaInput.value.trim() || undefined,
            
            interacoesMedicamentosas: interacoesMedicamentosas.length > 0 ? interacoesMedicamentosas : undefined,
            interacoesAlimentos: interacoesAlimentos.length > 0 ? interacoesAlimentos : undefined,
            
            armazenamento: armazenamentoInput.value.trim(),
            incompatibilidades: incompatibilidades.length > 0 ? incompatibilidades : undefined,
            
            origem: origemInput.value.trim() || undefined,
            producao: producaoInput.value.trim() || undefined,
            
            descarte: descarteInput.value.trim(),
            validadeAnos: parseInt(validadeAnosInput.value),
            
            bulas: bulas.length > 0 ? bulas : undefined
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        
        // Adicione feedback de sucesso
        alert("Princípio ativo atualizado com sucesso!");
        window.location.href = "/dephar";

        
    } catch(error) {
        console.error("Erro completo:", error);
        
        // Mostre mais detalhes do erro
        if (error.response) {
            console.error("Dados do erro:", error.response.data);
            console.error("Status:", error.response.status);
            alert(`Erro ao atualizar: ${error.response.data.message || 'Erro desconhecido'}`);
        } else {
            alert("Erro ao conectar com o servidor!");
        }
}
});
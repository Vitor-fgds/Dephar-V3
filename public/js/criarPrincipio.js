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
const goHome = () => {
    window.location.href = "/dephar";
};

// Função para cancelar formulário
const cancelForm = () => {
    const confirmacao = confirm("Deseja realmente cancelar? Todos os dados serão perdidos.");
    if (confirmacao) {
        window.location.href = "/dephar";
    }
};

// Função para remover item do array
const removeArrayItem = (button) => {
    const arrayItem = button.parentElement;
    const arrayItems = arrayItem.parentElement;
    
    // Só remove se houver mais de um item
    if (arrayItems.children.length > 1) {
        arrayItem.remove();
    } else {
        alert("Deve haver pelo menos um item!");
    }
};

// Função para adicionar indicação
const addIndicacao = () => {
    const container = document.getElementById("indicacoesItems");
    const newItem = document.createElement("div");
    newItem.classList.add("array-item");
    newItem.innerHTML = `
        <input 
            type="text" 
            class="form-input indicacao-input" 
            placeholder="Digite uma indicação terapêutica"
            required
        >
        <button type="button" class="btn-remove" onclick="removeArrayItem(this)">Remover</button>
    `;
    container.appendChild(newItem);
};

// Função para adicionar contraindicação
const addContraindicacao = () => {
    const container = document.getElementById("contraindicacoesItems");
    const newItem = document.createElement("div");
    newItem.classList.add("array-item");
    newItem.innerHTML = `
        <input 
            type="text" 
            class="form-input contraindicacao-input" 
            placeholder="Digite uma contraindicação"
            required
        >
        <button type="button" class="btn-remove" onclick="removeArrayItem(this)">Remover</button>
    `;
    container.appendChild(newItem);
};

// Função para adicionar efeito colateral
const addEfeito = () => {
    const container = document.getElementById("efeitosItems");
    const newItem = document.createElement("div");
    newItem.classList.add("array-item");
    newItem.innerHTML = `
        <input 
            type="text" 
            class="form-input efeito-input" 
            placeholder="Digite um efeito colateral"
            required
        >
        <button type="button" class="btn-remove" onclick="removeArrayItem(this)">Remover</button>
    `;
    container.appendChild(newItem);
};

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

// Selecionar inputs simples
const nomeInput = document.getElementById("nome");
const descricaoInput = document.getElementById("descricao");
const formulaInput = document.getElementById("formula");
const pesoMolarInput = document.getElementById("pesoMolar");
const classeTerapeuticaInput = document.getElementById("classeTerapeutica");
const classeFarmacologicaInput = document.getElementById("classeFarmacologica");
const armazenamentoInput = document.getElementById("armazenamento");
const descarteInput = document.getElementById("descarte");
const validadeAnosInput = document.getElementById("validadeAnos");

// Função auxiliar para coletar valores de arrays
const getArrayInputs = (className) => {
    const inputs = document.querySelectorAll(`.${className}`);
    return Array.from(inputs).map(input => input.value.trim()).filter(value => value !== "");
};

principioForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    
    // ✅ CORRETO - Coleta os valores AQUI, dentro do submit
    const indicacoesTerapeuticas = getArrayInputs("indicacao-input");
    const contraIndicacoes = getArrayInputs("contraindicacao-input");
    const efeitosColaterais = getArrayInputs("efeito-input");
    
    // Validações
    if (indicacoesTerapeuticas.length === 0) {
        alert("Adicione pelo menos uma indicação terapêutica!");
        return;
    }
    
    if (contraIndicacoes.length === 0) {
        alert("Adicione pelo menos uma contraindicação!");
        return;
    }
    
    if (efeitosColaterais.length === 0) {
        alert("Adicione pelo menos um efeito colateral!");
        return;
    }

    const token = localStorage.getItem("token");

    try {
        const response = await axios.post("/api/v1/dephar/", {
            nome: nomeInput.value.trim(),
            descricao: descricaoInput.value.trim(),
            formula: formulaInput.value.trim(),
            pesoMolar: parseFloat(pesoMolarInput.value),
            validadeAnos: parseInt(validadeAnosInput.value),
            classeTerapeutica: classeTerapeuticaInput.value.trim(),
            classeFarmacologica: classeFarmacologicaInput.value.trim(),
            indicacoesTerapeuticas: indicacoesTerapeuticas,
            contraIndicacoes: contraIndicacoes,
            efeitosColaterais: efeitosColaterais,
            armazenamento: armazenamentoInput.value.trim(),
            descarte: descarteInput.value.trim()
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        
        // Adicione feedback de sucesso
        alert("Princípio ativo cadastrado com sucesso!");
        window.location.href = "/dephar";
        
    } catch(error) {
        console.error("Erro completo:", error);
        
        // Mostre mais detalhes do erro
        if (error.response) {
            console.error("Dados do erro:", error.response.data);
            console.error("Status:", error.response.status);
            alert(`Erro ao cadastrar: ${error.response.data.message || 'Erro desconhecido'}`);
        } else {
            alert("Erro ao conectar com o servidor!");
        }
    }
});
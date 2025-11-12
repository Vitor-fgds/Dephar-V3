const nomePrincipio = document.querySelector("#principleName");
const formulaMolecular = document.querySelector("#formula");
const pesoMolar = document.querySelector("#pesoMolar");
const classeTerapeutica = document.querySelector("#classeTerapeutica");
const classeFarmacologica = document.querySelector("#classeFarmacologica");
const descricao = document.querySelector("#descricao");
const indicacoesTerapeuticas = document.querySelector("#indicacoesTerapeuticas");
const contraIndicacoes = document.querySelector("#contraIndicacoes");
const efeitosColaterais = document.querySelector("#efeitosColaterais");
const validade = document.querySelector("#validade");
const descarte = document.querySelector("#descarte");
const armazenamento = document.querySelector("#armazenamento");
const loading = document.querySelector(".loading");
const contentSection = document.querySelector("#contentSection");
const deleteButton = document.querySelector("#deleteButton");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");

// Toggle menu mobile
if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
        mobileMenuBtn.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Fecha o menu ao clicar em um link
    const navLinks = navMenu.querySelectorAll("a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenuBtn.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // Fecha o menu ao clicar fora
    document.addEventListener("click", (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove("active");
            navMenu.classList.remove("active");
        }
    });
}

const hideLoading = () => {
    if (loading) loading.style.display = "none";
    if (contentSection) contentSection.style.display = "block";
};

const goBack = () => {
    window.location.href = "/dephar";
}

const goHome = () => {
    window.location.href = "/dephar";
}

// Verificar se usuário é moderador
const verificarModerador = () => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    
    if (token && userType === "Moderador") {
        deleteButton.style.display = "inline-flex";
    }
};

// Função para deletar princípio ativo
const deletarPrincipio = async (id) => {
    const confirmacao = confirm("Tem certeza que deseja excluir este princípio ativo? Esta ação não pode ser desfeita.");
    
    if (!confirmacao) return;
    
    try {
        const token = localStorage.getItem("token");
        
        await axios.delete(`/api/v1/dephar/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        alert("Princípio ativo excluído com sucesso!");
        window.location.href = "/dephar";
        
    } catch (error) {
        console.error("Erro ao excluir princípio ativo:", error);
        
        if (error.response) {
            alert(`Erro ao excluir: ${error.response.data.message || 'Erro desconhecido'}`);
        } else {
            alert("Erro ao conectar com o servidor!");
        }
    }
};

window.addEventListener("DOMContentLoaded", async () => {
    verificarModerador();
    
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    
    if (id) {
        try {
            const pesquisa = await axios.get(`/api/v1/dephar/${id}`);
            const principio = pesquisa.data.principio;
            
            nomePrincipio.innerText = principio.nome;
            formulaMolecular.innerText = principio.formula;
            pesoMolar.innerText = principio.pesoMolar;
            classeTerapeutica.innerText = principio.classeTerapeutica;
            indicacoesTerapeuticas.innerText = principio.indicacoesTerapeuticas.join(", ");
            contraIndicacoes.innerText = principio.contraIndicacoes.join(", ");
            efeitosColaterais.innerText = principio.efeitosColaterais.join(", ");
            classeFarmacologica.innerText = principio.classeFarmacologica;
            descricao.innerText = principio.descricao;
            validade.innerText = principio.validade;
            armazenamento.innerText = principio.armazenamento;
            descarte.innerText = principio.descarte;
            
            // Adicionar evento de click no botão delete
            deleteButton.addEventListener("click", () => deletarPrincipio(id));
            
            hideLoading();
        } catch (error) {
            console.error("Erro ao buscar informações do princípio ativo:", error);
            alert("Erro ao carregar informações do princípio ativo!");
            window.location.href = "/dephar";
        }
    } else {
        alert("ID do princípio ativo não fornecido!");
        window.location.href = "/dephar";
    }
});
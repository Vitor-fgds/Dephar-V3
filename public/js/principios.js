// Elementos da UI
const nomeFarmaco = document.querySelector("#nomeFarmaco");
const nomeQuimico = document.querySelector("#nomeQuimico");
const formulaMolecular = document.querySelector("#formulaMolecular");
const pesoMolar = document.querySelector("#pesoMolar");
const classe = document.querySelector("#classe");
const validadeAnos = document.querySelector("#validadeAnos");

const containerFormulaEstrutural = document.querySelector("#containerFormulaEstrutural");
const formulaEstruturalImg = document.querySelector("#formulaEstruturalImg");

const farmacodinamica = document.querySelector("#farmacodinamica");
const farmacocinetica = document.querySelector("#farmacocinetica");
const farmacogenetica = document.querySelector("#farmacogenetica");

const indicacoesTerapeuticas = document.querySelector("#indicacoesTerapeuticas");
const formasFarmaceuticas = document.querySelector("#formasFarmaceuticas");
const contraindicacoes = document.querySelector("#contraindicacoes");
const toxicidade = document.querySelector("#toxicidade");

const interacoesMedicamentosas = document.querySelector("#interacoesMedicamentosas");
const interacoesAlimentos = document.querySelector("#interacoesAlimentos");

const armazenamento = document.querySelector("#armazenamento");
const incompatibilidades = document.querySelector("#incompatibilidades");
const descarte = document.querySelector("#descarte");
const origem = document.querySelector("#origem");
const producao = document.querySelector("#producao");

const sectionBulas = document.querySelector("#sectionBulas");
const bulasContainer = document.querySelector("#bulasContainer");

const loading = document.querySelector(".loading");
const contentSection = document.querySelector("#contentSection");
const deleteButton = document.querySelector("#deleteButton");
const editButton = document.querySelector("#editButton");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");

// Toggle menu mobile
if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener("click", () => {
        mobileMenuBtn.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

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

const goBack = () => window.location.href = "/dephar";
const goHome = () => window.location.href = "/dephar";

// Helper para formatar array em lista HTML
const formatArrayToList = (arr) => {
    if (!arr || arr.length === 0) return "Não informado";
    return `<ul class="detail-list">${arr.map(item => `<li>${item}</li>`).join('')}</ul>`;
};

// Helper para esconder card se o dado for vazio
const toggleCard = (elementId, data) => {
    const card = document.getElementById(elementId);
    if (card) {
        if (!data || (Array.isArray(data) && data.length === 0)) {
            card.style.display = "none";
        } else {
            card.style.display = "block";
        }
    }
};

const verificarModerador = () => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    if (token && userType === "Moderador") {
        deleteButton.style.display = "inline-flex";
        editButton.style.display = "inline-flex";
    }
};

const deletarPrincipio = async (id) => {
    const confirmacao = confirm("Tem certeza que deseja excluir este princípio ativo?");
    if (!confirmacao) return;
    
    try {
        const token = localStorage.getItem("token");
        await axios.delete(`/api/v1/dephar/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert("Princípio ativo excluído com sucesso!");
        window.location.href = "/dephar";
    } catch (error) {
        console.error("Erro ao excluir:", error);
        alert("Erro ao excluir o princípio ativo.");
    }
};

const irParaEdicao = (id) => {
    window.location.href = `/dephar/principio/editarPrincipio?id=${id}`;
};

window.addEventListener("DOMContentLoaded", async () => {
    verificarModerador();
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    
    if (id) {
        try {
            const response = await axios.get(`/api/v1/dephar/${id}`);
            const p = response.data.principio; // p = principio
            
            // Cabeçalho e Técnico
            nomeFarmaco.innerText = p.nomeFarmaco;
            nomeQuimico.innerText = p.nomeQuimico || '';
            formulaMolecular.innerText = p.formulaMolecular;
            pesoMolar.innerText = p.pesoMolar ? `${p.pesoMolar} g/mol` : 'N/A';
            classe.innerText = p.classe;
            validadeAnos.innerText = p.validadeAnos ? `${p.validadeAnos} anos` : 'N/A';

            // Fórmula Estrutural (Imagem)
            if (p.formulaEstrutural) {
                containerFormulaEstrutural.style.display = "block";
                // Verifica se é uma URL de imagem ou apenas texto
                if(p.formulaEstrutural.startsWith('http')) {
                    formulaEstruturalImg.src = p.formulaEstrutural;
                } else {
                    // Se for SMILES ou texto, teria que tratar diferente, aqui assumo URL
                    formulaEstruturalImg.alt = p.formulaEstrutural;
                    formulaEstruturalImg.src = "assets/placeholder-structure.png"; // Fallback
                }
            }

            // Farmacologia
            farmacodinamica.innerText = p.farmacodinamica;
            
            // Farmacocinética (Objeto)
            if (p.farmacocinetica) {
                let htmlCinetica = "";
                if (p.farmacocinetica.textoCompleto) {
                    htmlCinetica += `<p>${p.farmacocinetica.textoCompleto}</p>`;
                }
                // Se tiver campos individuais (futuro)
                if (p.farmacocinetica.absorcao) htmlCinetica += `<p><strong>Absorção:</strong> ${p.farmacocinetica.absorcao}</p>`;
                
                farmacocinetica.innerHTML = htmlCinetica || "Não informado";
            } else {
                toggleCard('cardFarmacocinetica', null);
            }

            farmacogenetica.innerText = p.farmacogenetica || "";
            toggleCard('cardFarmacogenetica', p.farmacogenetica);

            // Arrays
            indicacoesTerapeuticas.innerHTML = formatArrayToList(p.indicacoesTerapeuticas);
            formasFarmaceuticas.innerHTML = formatArrayToList(p.formasFarmaceuticas);
            contraindicacoes.innerHTML = formatArrayToList(p.contraindicacoes);
            
            toxicidade.innerText = p.toxicidade || "";
            toggleCard('cardToxicidade', p.toxicidade);

            interacoesMedicamentosas.innerHTML = formatArrayToList(p.interacoesMedicamentosas);
            toggleCard('cardInteracoesMed', p.interacoesMedicamentosas);

            interacoesAlimentos.innerHTML = formatArrayToList(p.interacoesAlimentos);
            toggleCard('cardInteracoesAlim', p.interacoesAlimentos);

            incompatibilidades.innerHTML = formatArrayToList(p.incompatibilidades);
            toggleCard('cardIncompatibilidades', p.incompatibilidades);

            // Logística
            armazenamento.innerText = p.armazenamento;
            descarte.innerText = p.descarte;
            
            // Origem e Produção
            if (p.origem) origem.innerHTML = `<strong>Origem:</strong> ${p.origem}`;
            if (p.producao) producao.innerHTML = `<strong>Produção:</strong> ${p.producao}`;
            if (!p.origem && !p.producao) toggleCard('cardOrigemProducao', null);

            // Bulas
            if (p.bulas && p.bulas.length > 0) {
                sectionBulas.style.display = "block";
                bulasContainer.innerHTML = p.bulas.map(bula => `
                    <a href="${bula.url}" target="_blank" class="bula-link">
                        📄 ${bula.titulo}
                    </a>
                `).join('');
            }

            // Evento Delete
            deleteButton.addEventListener("click", () => deletarPrincipio(id));

            // Evento Editar
            editButton.addEventListener("click", () => irParaEdicao(id));
            
            hideLoading();
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao carregar informações.");
            goBack();
        }
    } else {
        alert("ID não fornecido!");
        goBack();
    }
});
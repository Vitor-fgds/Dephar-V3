const nomePrincipio = document.querySelector("#principleName");
const formulaMolecular = document.querySelector("#formula");
const pesoMolar = document.querySelector("#pesoMolar");
const classeTerapeutica = document.querySelector("#classeTerapeutica");
const classeFarmacologica = document.querySelector("#classeFarmacologica");
const descricao = document.querySelector("#descricao");
const indicacoesTerapeuticas = document.querySelector("#indicacoesTerapeuticas");
const contraIndicacoes = document.querySelector("#contraIndicacoes");
const efeitosColaterais = document.querySelector("#efeitosColaterais");
const loading = document.querySelector(".loading");
const contentSection = document.querySelector("#contentSection");

const hideLoading = () => {
    if (loading) loading.style.display = "none";
    if (contentSection) contentSection.style.display = "block";
};


const goBack = () => {
    window.location.href = "/dephar";
}

const goHome =() => {
    window.location.href = "/dephar";
}

window.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if(id){
        try {
            const pesquisa = await axios.get(`/api/v1/dephar/${id}`);
            const principio = pesquisa.data.principio;
            nomePrincipio.innerText = principio.nome;
            formulaMolecular.innerText = principio.formula;
            pesoMolar.innerText = principio.pesoMolar;
            classeTerapeutica.innerText = principio.classeTerapeutica;
            indicacoesTerapeuticas.innerText = principio.indicacoesTerapeuticas.join(", ");
            contraIndicacoes.innerText = principio.contraIndicacoes.join(", ")
            efeitosColaterais.innerText = principio.efeitosColaterais.join(", ")
            classeFarmacologica.innerText = principio.classeFarmacologica;
            descricao.innerText = principio.descricao;
            hideLoading();
        } catch (error) {
            console.error("Erro ao buscar informações do princípio ativo:", error);
        }
    }
})
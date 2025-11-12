const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector(".search-button");
const containerPrincipio = document.querySelector(".results-grid");
const resultados = document.querySelector(".results-section");
const authButton = document.getElementById("authButton");

// Função para ir para home
const goHome = () => {
    window.location.href = "/dephar";
};

// Função para verificar se usuário está logado
const verificarLogin = () => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    
    if (token && userType) {
        // Usuário está logado - mostrar botão de Logout
        authButton.textContent = "Sair";
        authButton.classList.add("logged-in");
        authButton.href = "#"; // Remove o link de navegação
        
        // Adicionar evento de logout
        authButton.addEventListener("click", (event) => {
            event.preventDefault();
            fazerLogout();
        });
    } else {
        // Usuário não está logado - mostrar botão de Login
        authButton.textContent = "Entrar";
        authButton.classList.remove("logged-in");
        authButton.href = "/dephar/login";
    }
};

// Função para fazer logout
const fazerLogout = () => {
    // Limpar dados do localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    
    // Opcional: Mostrar mensagem de confirmação
    const confirmacao = confirm("Deseja realmente sair?");
    
    if (confirmacao) {
        // Atualizar o botão
        authButton.textContent = "Entrar";
        authButton.classList.remove("logged-in");
        authButton.href = "/dephar/login";
        
        // Opcional: Redirecionar para a página de login
        // window.location.href = "/dephar/login";
        
        // Ou apenas recarregar a página
        window.location.reload();
    } else {
        // Se cancelou, restaurar o token (caso tenha sido removido)
        // Nota: Na implementação acima, só remove se confirmar, então não precisa restaurar
    }
};

// Função para buscar princípios
const pesquisaPrincipios = async (event) => {
    event.preventDefault();
    const name = searchInput.value.trim();
    
    try {
        const pesquisa = await axios.get(`/api/v1/dephar/?nome=${name}`);
        const principios = pesquisa.data.principio;
        containerPrincipio.innerHTML = "";
        
        if (principios.length === 0) {
            principioNaoEncontrado();
            return;
        }
        
        principios.forEach((principio) => {
            buscaPrincipios(principio);
        });
    } catch (error) {
        erroBusca(error);
    }
    
    searchInput.value = "";
};

// Função quando princípio não é encontrado
const principioNaoEncontrado = () => {
    containerPrincipio.innerHTML = "";
    const erro = document.createElement("div");
    erro.classList.add("error-message");
    const mensagemErro = document.createElement("h3");
    mensagemErro.classList.add("error-message");
    mensagemErro.textContent = "Nenhum princípio ativo foi encontrado...";
    erro.appendChild(mensagemErro);
    containerPrincipio.appendChild(erro);
    return;
};

// Função para renderizar princípios
const buscaPrincipios = (principio) => {
    const divPrincipio = document.createElement("div");
    divPrincipio.classList.add("principle-card");
    
    const nomePrincipio = document.createElement("h3");
    nomePrincipio.innerText = principio.nome;
    nomePrincipio.classList.add("principle-name");
    
    const descricaoPrincipio = document.createElement("p");
    descricaoPrincipio.classList.add("principle-description");
    descricaoPrincipio.innerText = principio.descricao;
    
    divPrincipio.appendChild(nomePrincipio);
    divPrincipio.appendChild(descricaoPrincipio);

    divPrincipio.addEventListener("click", () => {
        window.open(`/dephar/principio?id=${principio._id}`, "_blank");
    });

    containerPrincipio.appendChild(divPrincipio);
};

// Função para erro na busca
const erroBusca = (error) => {
    containerPrincipio.innerHTML = "";
    console.error("Erro na busca!", error);
    
    const erro = document.createElement("div");
    erro.classList.add("error-message");
    
    const mensagemErro = document.createElement("h3");
    mensagemErro.classList.add("error-message");
    mensagemErro.textContent = "Ocorreu erro na busca!";
    
    erro.appendChild(mensagemErro);
    containerPrincipio.appendChild(erro);
};

// Função inicial para carregar todos os princípios
const start = async () => {
    try {
        const pesquisaInicial = await axios.get("/api/v1/dephar");
        const principios = pesquisaInicial.data.principio;

        if (principios.length === 0) {
            principioNaoEncontrado();
            return;
        }

        principios.forEach((principio) => {
            buscaPrincipios(principio);
        });
    } catch (error) {
        erroBusca(error);
    }
};

// Inicializar página
verificarLogin(); // Verificar status de login ao carregar
start(); // Carregar princípios

// Event Listeners
searchButton.addEventListener("click", pesquisaPrincipios);

searchInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        pesquisaPrincipios(event);
    }
});

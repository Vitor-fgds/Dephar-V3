const searchInput = document.querySelector("#searchInput");
const searchButton = document.querySelector(".search-button");
const containerPrincipio = document.querySelector(".results-grid");
const resultados = document.querySelector(".results-section");
const authButton = document.getElementById("authButton");
const btnCriarPrincipio = document.getElementById("btnCriarPrincipio");
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
        authButton.href = "#";
        
        // Adicionar evento de logout
        authButton.addEventListener("click", (event) => {
            event.preventDefault();
            fazerLogout();
        });

        // Se for moderador, mostrar botão de criar princípio
        if (userType === "Moderador") {
            btnCriarPrincipio.style.display = "inline-flex";
        }
    } else {
        // Usuário não está logado - mostrar botão de Login
        authButton.textContent = "Entrar";
        authButton.classList.remove("logged-in");
        authButton.href = "/dephar/login";
        btnCriarPrincipio.style.display = "none";
    }
};

// Função para fazer logout
const fazerLogout = () => {
    const confirmacao = confirm("Deseja realmente sair?");
    
    if (confirmacao) {
        // Limpar dados do localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        
        // Atualizar o botão
        authButton.textContent = "Entrar";
        authButton.classList.remove("logged-in");
        authButton.href = "/dephar/login";
        
        // Esconder botão de criar princípio
        btnCriarPrincipio.style.display = "none";
        
        // Recarregar a página
        window.location.reload();
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
        window.location.href = `/dephar/principio?id=${principio._id}`;
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
verificarLogin();
start();

// Event Listeners
searchButton.addEventListener("click", pesquisaPrincipios);

searchInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
        pesquisaPrincipios(event);
    }
});
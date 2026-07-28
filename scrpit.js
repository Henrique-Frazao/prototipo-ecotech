// ===============================
// ECO TECH
// ===============================

// Troca de telas
function mostrar(id) {

    const telas = document.querySelectorAll(".tela");

    telas.forEach(tela => {
        tela.classList.remove("ativa");
    });

    document.getElementById(id).classList.add("ativa");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

// ===============================
// DADOS DO USUÁRIO
// ===============================

const usuario = {

    nome: "Pedro Henrique",

    pontos: 350,

    reciclado: 45,

    nivel: "Verde"

};

// ===============================
// SAUDAÇÃO
// ===============================

function atualizarSaudacao() {

    const hora = new Date().getHours();

    let saudacao;

    if (hora < 12){

        saudacao = "Bom dia";

    }else if(hora < 18){

        saudacao = "Boa tarde";

    }else{

        saudacao = "Boa noite";

    }

    const titulo = document.querySelector(".banner h2");

    titulo.innerHTML = saudacao + ", " + usuario.nome + "!";

}

// ===============================
// ECO PONTOS
// ===============================

function ganharPontos(valor){

    usuario.pontos += valor;

    atualizarPerfil();

    alert("🎉 Você ganhou " + valor + " EcoPontos!");

}

function atualizarPerfil(){

    const eco = document.querySelector(".eco-card h3");

    if(eco){

        eco.innerHTML = usuario.pontos + " EcoPontos";

    }

}

// ===============================
// DICAS
// ===============================

const dicas = [

"Separe corretamente o lixo reciclável.",

"Utilize garrafas reutilizáveis.",

"Economize água durante o banho.",

"Prefira bicicleta ao carro.",

"Evite plástico descartável.",

"Apague as luzes ao sair.",

"Plante uma árvore.",

"Doe roupas que não utiliza.",

"Use ecobags.",

"Faça compostagem."

];

// ===============================

function dicaAleatoria(){

    let numero = Math.floor(Math.random()*dicas.length);

    alert("💡 Dica Sustentável\n\n" + dicas[numero]);

}

// ===============================
// GUIA
// ===============================

const materiais = document.querySelectorAll("#guia .card");

materiais.forEach(card=>{

    card.addEventListener("click",()=>{

        alert(

            "♻ " +

            card.querySelector("h4").innerHTML +

            "\n\nClique em OK para continuar."

        );

    });

});

// ===============================
// MAPA
// ===============================

const locais = document.querySelectorAll("#mapa .item button");

locais.forEach(botao=>{

    botao.onclick = ()=>{

        alert("📍 Local aberto com sucesso!");

    }

});

// ===============================
// HOME
// ===============================

const cards = document.querySelectorAll("#home .card");

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="scale(1.03)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="scale(1)";

    });

});

// ===============================
// ANIMAÇÃO DOS CARDS
// ===============================

window.addEventListener("load",()=>{

    atualizarPerfil();

    atualizarSaudacao();

    const cards = document.querySelectorAll(".card");

    cards.forEach((card,i)=>{

        card.style.opacity="0";

        card.style.transform="translateY(20px)";

        setTimeout(()=>{

            card.style.transition=".4s";

            card.style.opacity="1";

            card.style.transform="translateY(0px)";

        },i*120);

    });

});

// ===============================
// NOTIFICAÇÃO
// ===============================

setTimeout(()=>{

    alert(

        "🌱 Bem-vindo ao EcoTech!\n\nAjude o planeta reciclando."

    );

},1000);

// ===============================
// BOTÃO DE DICAS
// ===============================

const botaoDicas = document.querySelectorAll("#dicas .item");

botaoDicas.forEach(item=>{

    item.onclick=()=>{

        ganharPontos(5);

    }

});

// ===============================
// TECLADO
// ===============================

document.addEventListener("keydown",(e)=>{

    if(e.key=="1") mostrar("home");

    if(e.key=="2") mostrar("mapa");

    if(e.key=="3") mostrar("guia");

    if(e.key=="4") mostrar("perfil");

});

// ===============================

console.log("EcoTech iniciado com sucesso!");
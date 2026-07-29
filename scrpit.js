// ===============================
// ECO TECH
// ===============================


// ===============================
// TROCA DE TELAS
// ===============================

function mostrar(id){


    const telas = document.querySelectorAll(".tela");


    telas.forEach(tela=>{

        tela.classList.remove("ativa");

    });



    const pagina = document.getElementById(id);


    if(pagina){

        pagina.classList.add("ativa");

    }


    window.scrollTo({

        top:0,

        behavior:"smooth"

    });


}





// ===============================
// USUÁRIO LOCALSTORAGE
// ===============================


let usuario = JSON.parse(
    localStorage.getItem("ecoUsuario")
) || {


    nome:"Pedro Henrique",

    pontos:350,

    reciclado:45,

    nivel:"Verde"


};





function salvarUsuario(){


    localStorage.setItem(

        "ecoUsuario",

        JSON.stringify(usuario)

    );


}





// ===============================
// SAUDAÇÃO
// ===============================


function atualizarSaudacao(){



    const hora =
    new Date().getHours();



    let saudacao;



    if(hora < 12){


        saudacao="Bom dia";


    }

    else if(hora <18){


        saudacao="Boa tarde";


    }

    else{


        saudacao="Boa noite";


    }





    const titulo =
    document.querySelector(
        ".banner h2"
    );



    if(titulo){


        titulo.innerHTML =

        saudacao + ", " + usuario.nome + "!";


    }


}







// ===============================
// PERFIL
// ===============================


function atualizarPerfil(){



    const nome =
    document.getElementById(
        "nomePerfil"
    );



    if(nome){

        nome.innerHTML =
        usuario.nome;

    }





    const pontos =
    document.querySelector(
        ".eco-card h3"
    );



    if(pontos){


        pontos.innerHTML =

        usuario.pontos +

        " EcoPontos";


    }



}







// ===============================
// GANHAR PONTOS
// ===============================


function ganharPontos(valor){



    usuario.pontos += valor;



    salvarUsuario();



    atualizarPerfil();



    alert(

        "🎉 Você ganhou "

        + valor +

        " EcoPontos!"

    );


}







// ===============================
// DICAS
// ===============================


const dicas=[


"Separe corretamente o lixo reciclável.",

"Economize água durante o banho.",

"Evite plástico descartável.",

"Use garrafas reutilizáveis.",

"Faça compostagem.",

"Utilize ecobags."


];






function dicaAleatoria(){



    let numero =
    Math.floor(
        Math.random()*dicas.length
    );



    alert(

        "💡 Dica Sustentável\n\n"

        +

        dicas[numero]

    );


}







// ===============================
// CLIQUE NAS DICAS
// ===============================


function ativarDicas(){


    const itens =
    document.querySelectorAll(
        "#dicas .item"
    );



    itens.forEach(item=>{


        item.onclick=()=>{


            ganharPontos(5);


        }


    });


}






// ===============================
// MAPA
// ===============================


function ativarMapa(){


    const botoes =
    document.querySelectorAll(
        "#mapa button"
    );



    botoes.forEach(botao=>{


        botao.onclick=()=>{


            alert(
                "📍 Local aberto!"
            );


        }


    });


}






// ===============================
// ANIMAÇÃO
// ===============================


function animarCards(){



    const cards =
    document.querySelectorAll(
        ".card"
    );



    cards.forEach((card,i)=>{


        card.style.opacity="0";



        setTimeout(()=>{


            card.style.transition=".4s";


            card.style.opacity="1";



        },i*100);



    });



}






// ===============================
// INICIAR APP
// ===============================


window.addEventListener(
"load",
()=>{


    atualizarSaudacao();


    atualizarPerfil();


    ativarDicas();


    ativarMapa();


    animarCards();



    salvarUsuario();


});






console.log(
"EcoTech iniciado com sucesso!"
);
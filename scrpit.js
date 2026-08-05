// Estado global da aplicação
let estadoApp = {
  usuario: 'Pedro Henrique',
  pontos: 350,
  kgReciclados: 45,
  descartesRealizados: 15,
  historico: [
    { id: 1, material: 'Papel', peso: 2.0, pontos: 20, data: '02/08/2026 14:30' },
    { id: 2, material: 'Plástico', peso: 1.5, pontos: 15, data: '01/08/2026 10:15' }
  ]
};

// FUNÇÃO DE NAVEGAÇÃO
function navegarPara(idTela) {
  const telas = document.querySelectorAll('.tela');
  telas.forEach(tela => {
    if (tela.id === idTela) {
      tela.classList.add('ativa');
      tela.scrollTop = 0;
    } else {
      tela.classList.remove('ativa');
    }
  });
}

// Inicialização e Eventos Globais
document.addEventListener('DOMContentLoaded', () => {
  carregarDados();

  // OUVINTE GLOBAL DE CLIQUES
  document.body.addEventListener('click', (event) => {
    // 1. Navegação via atributo data-ir (Menu inferior, cards e botões voltar)
    const elNavegacao = event.target.closest('[data-ir]');
    if (elNavegacao) {
      const idAlvo = elNavegacao.getAttribute('data-ir');
      navegarPara(idAlvo);
      return;
    }

    // 2. Abrir Detalhes do Guia
    const elGuia = event.target.closest('.btn-detalhe-guia');
    if (elGuia) {
      document.getElementById('subGuiaTitulo').textContent = elGuia.dataset.nome;
      document.getElementById('subGuiaNome').textContent = `Reciclagem de ${elGuia.dataset.nome}`;
      document.getElementById('subGuiaIcone').textContent = elGuia.dataset.icone;
      document.getElementById('subGuiaDescricao').textContent = elGuia.dataset.desc;
      navegarPara('sub-guia');
      return;
    }

    // 3. Abrir Detalhes do Mapa
    const elMapa = event.target.closest('.btn-detalhe-mapa');
    if (elMapa) {
      document.getElementById('subMapaNome').textContent = elMapa.dataset.nome;
      document.getElementById('subMapaEndereco').textContent = elMapa.dataset.endereco;
      document.getElementById('subMapaHorario').textContent = elMapa.dataset.horario;
      document.getElementById('subMapaInfo').textContent = elMapa.dataset.info;
      navegarPara('sub-mapa');
      return;
    }

    // 4. Botões de alerta/mensagem
    const elMsg = event.target.closest('.btn-msg');
    if (elMsg) {
      alert(elMsg.dataset.msg);
      return;
    }

    // 5. Botão Resetar
    if (event.target.id === 'btnResetar') {
      if (confirm('Deseja realmente apagar seus pontos e histórico?')) {
        localStorage.removeItem('ecotech_dados');
        estadoApp = {
          usuario: 'Pedro Henrique',
          pontos: 0,
          kgReciclados: 0,
          descartesRealizados: 0,
          historico: []
        };
        salvarDados();
        alert('Dados resetados com sucesso!');
        navegarPara('perfil');
      }
    }
  });

  // Formulário de Registrar Descarte
  const formDescarte = document.getElementById('formDescarte');
  if (formDescarte) {
    formDescarte.addEventListener('submit', (e) => {
      e.preventDefault();
      const material = document.getElementById('tipoMaterial').value;
      const peso = parseFloat(document.getElementById('pesoMaterial').value);

      if (peso > 0) {
        const pontosGanhos = Math.round(peso * 10);
        const agora = new Date();
        const dataStr = `${agora.getDate().toString().padStart(2, '0')}/${(agora.getMonth() + 1).toString().padStart(2, '0')}/${agora.getFullYear()} ${agora.getHours().toString().padStart(2, '0')}:${agora.getMinutes().toString().padStart(2, '0')}`;

        estadoApp.kgReciclados += peso;
        estadoApp.pontos += pontosGanhos;
        estadoApp.descartesRealizados += 1;
        estadoApp.historico.push({
          id: Date.now(),
          material: material,
          peso: peso,
          pontos: pontosGanhos,
          data: dataStr
        });

        salvarDados();
        formDescarte.reset();
        alert(`🎉 Descarte de ${peso}kg de ${material} registrado com sucesso!\n+${pontosGanhos} EcoPontos!`);
      }
    });
  }

  // Formulário de Editar Nome do Perfil
  const formPerfil = document.getElementById('formEditarPerfil');
  if (formPerfil) {
    formPerfil.addEventListener('submit', (e) => {
      e.preventDefault();
      const novoNome = document.getElementById('inputNomePerfil').value.trim();
      if (novoNome) {
        estadoApp.usuario = novoNome;
        salvarDados();
        document.getElementById('inputNomePerfil').value = '';
        alert('✅ Nome atualizado com sucesso!');
      }
    });
  }
});

// Funções de Persistência e UI
function carregarDados() {
  const dadosSalvos = localStorage.getItem('ecotech_dados');
  if (dadosSalvos) {
    estadoApp = JSON.parse(dadosSalvos);
  }
  atualizarUI();
}

function salvarDados() {
  localStorage.setItem('ecotech_dados', JSON.stringify(estadoApp));
  atualizarUI();
}

function atualizarUI() {
  const elNomePerfil = document.getElementById('nomePerfil');
  const elNomeHome = document.getElementById('nomeUsuarioHome');
  if (elNomePerfil) elNomePerfil.textContent = estadoApp.usuario;
  if (elNomeHome) elNomeHome.textContent = estadoApp.usuario;

  document.querySelectorAll('.valEcoPontos, .eco-card h3').forEach(el => {
    el.textContent = `${estadoApp.pontos} EcoPontos`;
  });

  const elStatKg = document.getElementById('statKgReciclados');
  if (elStatKg) elStatKg.textContent = `${estadoApp.kgReciclados.toFixed(1)} kg`;

  const listaPerfil = document.querySelectorAll('#perfil .lista .item');
  if (listaPerfil.length >= 2) {
    listaPerfil[0].textContent = `🌳 ${estadoApp.kgReciclados.toFixed(1)} kg reciclados`;
    listaPerfil[1].textContent = `🏆 ${estadoApp.descartesRealizados} descartes realizados`;
  }

  renderizarHistorico();
}

function renderizarHistorico() {
  const container = document.getElementById('historicoDescartes');
  if (!container) return;

  if (!estadoApp.historico || estadoApp.historico.length === 0) {
    container.innerHTML = `<div class="item-vazio">Nenhum descarte registrado ainda.</div>`;
    return;
  }

  const icones = { Papel: '📄', Plástico: '🧴', Vidro: '🍾', Metal: '🥫' };

  container.innerHTML = estadoApp.historico.slice().reverse().map(item => `
    <div class="item">
      <div>
        <h4>${icones[item.material] || '♻️'} ${item.material} (${item.peso} kg)</h4>
        <p>${item.data}</p>
      </div>
      <span class="badge-pontos">+${item.pontos} pts</span>
    </div>
  `).join('');
}
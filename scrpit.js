// ===================================================
// EcoTech - Lógica de Negócios e Estado do App
// ===================================================

const CHAVE_USUARIO = 'ecotech_usuario';
const CHAVE_PONTOS = 'ecotech_pontos';
const CHAVE_HISTORICO = 'ecotech_historico';

// --- AUTENTICAÇÃO E SESSÃO ---

function realizarLogin(evento) {
  evento.preventDefault();
  const nomeInput = document.getElementById('usuarioInput');
  const nome = nomeInput && nomeInput.value.trim() !== '' ? nomeInput.value.trim() : 'Pedro Henrique';

  localStorage.setItem(CHAVE_USUARIO, nome);
  if (!localStorage.getItem(CHAVE_PONTOS)) {
    localStorage.setItem(CHAVE_PONTOS, '350');
  }

  window.location.href = 'index.html';
}

function realizarCadastro(evento) {
  evento.preventDefault();
  const campoNome = document.getElementById('cadNome');
  const nomeCadastrado = campoNome && campoNome.value.trim() !== '' ? campoNome.value.trim() : 'Novo Usuário';

  localStorage.setItem(CHAVE_USUARIO, nomeCadastrado);
  localStorage.setItem(CHAVE_PONTOS, '350');

  alert(`🎉 Conta criada com sucesso!\n\nBem-vindo(a), ${nomeCadastrado}!\nVocê ganhou 350 EcoPontos de boas-vindas.`);
  window.location.href = 'index.html';
}

function carregarUsuario() {
  const nomeSalvo = localStorage.getItem(CHAVE_USUARIO) || 'Pedro Henrique';
  
  const elHome = document.getElementById('nomeUsuarioHome');
  if (elHome) elHome.textContent = nomeSalvo;

  const elPerfil = document.getElementById('nomeUsuarioPerfil');
  if (elPerfil) elPerfil.textContent = nomeSalvo;
}

// --- PONTUAÇÃO E GAMIFICAÇÃO ---

function obterPontos() {
  const pontos = localStorage.getItem(CHAVE_PONTOS);
  return pontos ? parseInt(pontos, 10) : 350;
}

function atualizarExibicaoPontos() {
  const elemento = document.getElementById('ecoPontos');
  if (elemento) {
    elemento.textContent = obterPontos();
  }
}

function registrarDescarte(localNome = 'Ponto de Coleta') {
  let pontos = obterPontos();
  pontos += 50;
  localStorage.setItem(CHAVE_PONTOS, pontos.toString());

  salvarHistorico(`Descarte em: ${localNome}`, 50);

  alert(`🌱 Ação Sustentável Registrada!\n\nLocal: ${localNome}\nVocê ganhou +50 EcoPontos!\nTotal acumulado: ${pontos} pts.`);
  
  if (!window.location.pathname.includes('perfil.html')) {
    window.location.href = 'perfil.html';
  } else {
    atualizarExibicaoPontos();
    renderizarHistorico();
  }
}

function salvarHistorico(descricao, valorPontos) {
  const historico = JSON.parse(localStorage.getItem(CHAVE_HISTORICO) || '[]');
  const dataHoje = new Date().toLocaleDateString('pt-BR');

  historico.unshift({
    descricao: descricao,
    pontos: `+${valorPontos} pts`,
    data: dataHoje
  });

  if (historico.length > 5) historico.pop();
  localStorage.setItem(CHAVE_HISTORICO, JSON.stringify(historico));
}

function renderizarHistorico() {
  const container = document.getElementById('listaHistorico');
  if (!container) return;

  const historico = JSON.parse(localStorage.getItem(CHAVE_HISTORICO) || '[]');
  
  if (historico.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 text-center py-2">Nenhum descarte registrado ainda.</p>`;
    return;
  }

  container.innerHTML = historico.map(item => `
    <div class="flex justify-between items-center bg-white p-2.5 rounded-xl border border-slate-100 text-xs">
      <div>
        <p class="font-bold text-slate-700">${item.descricao}</p>
        <span class="text-[10px] text-slate-400">${item.data}</span>
      </div>
      <span class="font-extrabold text-brand bg-brand-light px-2 py-0.5 rounded-lg text-[11px]">${item.pontos}</span>
    </div>
  `).join('');
}

// --- BUSCA EM TEMPO REAL ---

function configurarBuscaDePontos() {
  const inputBusca = document.getElementById('inputBuscaPontos');
  if (!inputBusca) return;

  inputBusca.addEventListener('input', (evento) => {
    const termo = evento.target.value.toLowerCase().trim();
    const cartoes = document.querySelectorAll('.card-ponto');

    cartoes.forEach((cartao) => {
      const texto = cartao.textContent.toLowerCase();
      cartao.style.display = texto.includes(termo) ? 'block' : 'none';
    });
  });
}

// Inicialização Automática
document.addEventListener('DOMContentLoaded', () => {
  carregarUsuario();
  atualizarExibicaoPontos();
  renderizarHistorico();
  configurarBuscaDePontos();
});
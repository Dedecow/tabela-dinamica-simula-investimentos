const investimentosColetados = [];

const tbName = document.getElementById('tb-name');
const tbEmail = document.getElementById('tb-email');
const tbRenda = document.getElementById('tb-renda');
const tbodyInvestimentos =document.getElementById('investimentos-body')

const form = document.getElementById('form-dados');
form.addEventListener('submit', lidarComEnvioDeFormulario);

const inputNome = document.getElementById('input-nome');
const inputEmail = document.getElementById('input-email');
const inputRenda = document.getElementById('input-renda');

const adicionarInvestimentoBtn = document.getElementById('adicionar-investimento-btn');
const carregarPadroesBtn = document.getElementById('carregar-padroes-btn');
const limparInvestimentosBtn = document.getElementById('limpar-investimentos-btn'); 

const investimentoModal = document.getElementById('investimento-modal');
const cancelarInvestimentoBtn = document.getElementById('cancelar-investimento');
const investimentoForm = document.getElementById('investimento-form');

const inputInvestimentoNome = document.getElementById('investimento-nome');
const inputInvestimentoRendimento = document.getElementById('investimento-rendimento');
const radioRiscoSim = document.getElementById('risco-sim');
const radioRiscoNao = document.getElementById('risco-nao');

const formErrors = document.getElementById('form-errors'); 

// Listeners da seção investimentos

adicionarInvestimentoBtn.addEventListener('click', () => { 
    investimentoModal.style.display = 'block';
    if (formErrors) formErrors.textContent = ''; 
});

carregarPadroesBtn.addEventListener('click', () => {
    if (confirm('Isso substituirá seus investimentos atuais pelos padrões. Deseja continuar?')) {
        carregarInvestimentosDoJson();
    }
});

if (limparInvestimentosBtn) {
    limparInvestimentosBtn.addEventListener('click', limparInvestimentos);
}
cancelarInvestimentoBtn.addEventListener('click', () => {
    investimentoModal.style.display = 'none';
    investimentoForm.reset();
    if (formErrors) formErrors.textContent = '';
});

// Listener para o envio do formulário de investimento
investimentoForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const nome = document.getElementById('investimento-nome').value.trim();
    const rendimentoStr = document.getElementById('investimento-rendimento').value;
    const riscoSelecionado = document.querySelector('input[name="risco"]:checked');
    const risco = riscoSelecionado ? riscoSelecionado.value : '';
    
    if (!validarDadosInvestimento(nome, rendimentoStr, risco)) {
        if (formErrors) {
            formErrors.textContent = 'Verifique os dados: nome obrigatório, rendimento no formato exemplo 0.05 para 5% e selecione o risco.';
        } 
        return;
    }
    
    adicionarInvestimento(nome, rendimentoStr, risco); 
    renderizarTabelaInvestimentos();
    
    investimentoForm.reset();
    investimentoModal.style.display = 'none';
    if (formErrors) formErrors.textContent = '';
});

function salvarDadosUsuario(nome, email, renda) {
    let nomeDigitado = '';
    let emailDigitado = '';
    let rendaDigitada = '';

    nomeDigitado = nome || 'Anônimo';
    emailDigitado = email || 'email@email.com';
    rendaDigitada = renda || '0';

    if (tbName) tbName.textContent = nomeDigitado;
    if (tbEmail) tbEmail.textContent = emailDigitado;
    if (tbRenda) tbRenda.textContent = rendaDigitada;

    console.log('Dados do usuário registrados:', {
        nome: nomeDigitado,
        email: emailDigitado,
        renda: rendaDigitada
    });
}

function lidarComEnvioDeFormulario(event) {
    event.preventDefault(); 

    const nome = document.getElementById('input-nome').value.trim();
    const email = document.getElementById('input-email').value.trim();
    const renda = document.getElementById('input-renda').value.trim();

    salvarDadosUsuario(nome, email, renda);
}

class Investimento {
    constructor(nomeImput, rendimentoImput, riscoImput) {
        this.nome = nomeImput.trim();
        this.rendimento = typeof rendimentoImput === 'string' ? parseFloat(rendimentoImput.replace(',','.')):rendimentoImput; //quando eu recebo do storage ele é number e não string
        this.risco = this.normalizarRisco(riscoImput);
    }

    normalizarRisco(riscoImput){
        return riscoImput.trim().toLowerCase() === "sim" ? "sim" : 'nao'; 
    }

    criarLinhaTabela() {
        return `
            <td>${this.nome}</td>
            <td>${(this.rendimento * 100).toFixed(2)}%</td>
            <td class="${this.risco === 'sim' ? 'risco' : 'sem-risco'}">
                ${this.risco === 'sim' ? ' COM RISCO' : ' SEM RISCO'}
            </td>
        `;
    }
}

// ###################### FUNÇÔES DE INVESTIMENTO ##################

/*function preencherInvestimentoForm() {
    const modal = document.getElementById('investimento-modal');
    const form = document.getElementById('investimento-form');
    const mensagemErro = document.getElementById('form-errors');
    
    //Configura o CSS dinamicamente
    modal.style.display = 'block';
    mensagemErro.textContent = ''; 
    
    form.onsubmit = function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('investimento-nome').value.trim();
        const rendimentoStr = document.getElementById('investimento-rendimento').value;
        const risco = document.querySelector('input[name="risco"]:checked')?.value;
        
        if (!validarDadosInvestimento(nome, rendimentoStr, risco)) {
            mensagemErro.textContent = 'Verifique os dados: nome obrigatório, rendimento no formato exemplo 0,05 para 5% e selecione o risco.';
            return;
        }
        
        adicionarInvestimento(nome, rendimentoStr, risco);
        renderizarTabelaInvestimentos();
        
        form.reset();
        modal.style.display = 'none';
    };
    
    document.getElementById('cancelar-investimento').onclick = function() {
        form.reset();
        modal.style.display = 'none';
    };
}
*/

function validarDadosInvestimento(nomeInput, rendimentoStrInput, riscoInput) {
    if (!nomeInput || nomeInput.trim() === '') {
        return false;
    }
    const rendimentoNumerico = parseFloat(rendimentoStrInput.replace(',', '.'));
    if (isNaN(rendimentoNumerico) || rendimentoNumerico <= 0 || rendimentoNumerico > 1) {
        return false;
    }
    const riscoLower = riscoInput.trim().toLowerCase();
    if (riscoLower !== "sim" && riscoLower !== "nao") {
        return false;
    }
    return true;
}

function adicionarInvestimento(nome, rendimentoStr, riscoStr) {

    const investimento = new Investimento(nome, rendimentoStr, riscoStr);
    investimentosColetados.push(investimento);
    console.log(`Investimento "${investimento.nome}" adicionado com sucesso!`);
    salvarInvestimentosNoLocalStorage();
}

function salvarInvestimentosNoLocalStorage() {
    const investimentosParaSalvar = investimentosColetados.map(inv => ({
        nome: inv.nome,
        rendimento: inv.rendimento,
        risco: inv.risco
    }));
    const investimentosJSON = JSON.stringify(investimentosParaSalvar);
    localStorage.setItem('meusInvestimentos', investimentosJSON);
    console.log('Investimentos salvos no localStorage com sucesso!');
}

function preencherArrayComDadosLocalStorage(dados) {    
    dados.forEach(dado => {
        investimentosColetados.push(
            new Investimento(dado.nome, dado.rendimento, dado.risco)
        );
    });
    console.log('Dados carregados com sucesso!');
}

function verificarArrayPreenchida() {
    if (investimentosColetados.length > 0) {
        console.log('Array já contém dados - não carregará do localStorage.');
        return true;
    }
    return false;
}

function verificarDadosLocalStorageValidos(dados) {
    if (!Array.isArray(dados)) {
        console.log('Dados no localStorage não estão no formato esperado.');
        return false;
    }

    for (const item of dados) {
        if (!item.nome || typeof item.nome !== 'string') {
            console.log('Item inválido: nome ausente ou não é string.');
            return false;
        }
        if (isNaN(item.rendimento) || typeof item.rendimento !== 'number') {
            console.log(`Rendimento inválido para ${item.nome}.`);
            return false;
        }
        if (item.risco !== "sim" && item.risco !== "nao") {
            console.log(`Risco inválido para ${item.nome}.`);
            return false;
        }
    }
    return true;
}

function carregarInvestimentosDoLocalStorage() {
    if (verificarArrayPreenchida()) return;

    const investimentosJSON = localStorage.getItem('meusInvestimentos');
    if (!investimentosJSON) {
        console.log('Nenhum dado no localStorage.');
        return;
    }

    const dadosCarregados = JSON.parse(investimentosJSON);
        
    if (!verificarDadosLocalStorageValidos(dadosCarregados)) {
        console.log('Dados inválidos no localStorage.');
        return;
    }

    preencherArrayComDadosLocalStorage(dadosCarregados);
    renderizarTabelaInvestimentos();
}

function adicionarInvestimentoNaDOM(investimento, corpoDaTabela) {
    const linhaHTML = `<tr>${investimento.criarLinhaTabela()}</tr>`;
    corpoDaTabela.innerHTML += linhaHTML;
}


function renderizarTabelaInvestimentos() {
    const tabelaCorpo = document.getElementById('investimentos-body');
    tabelaCorpo.innerHTML = ''; 

    investimentosColetados.forEach(function(investimento) {
        adicionarInvestimentoNaDOM(investimento, tabelaCorpo);
    });

    console.log('Tabela de investimentos atualizada no DOM!');
}

/*
function carregarInvestimentosPadrao() {
    
    const investimentosPadrao = [
        new Investimento("Poupança", 0.0500, "nao"),
        new Investimento("Petr4", 0.2707, "sim"),
        new Investimento("LCI Bradesco", 0.1211, "nao"),
        new Investimento("CDB Itau", 0.1133, "nao"),
        new Investimento("ITUB4", 0.5519, "sim")
    ];
    
    investimentosColetados.push(...investimentosPadrao);
    
    salvarInvestimentosNoLocalStorage();
    
    renderizarTabelaInvestimentos();
    
    console.log('Investimentos padrão carregados:', investimentosPadrao);
}
*/
async function carregarInvestimentosDoJson() {
    try {
        const response = await fetch('./data/investimentos.json');
        if (!response.ok) throw new Error('Falha ao carregar dados');
        const dados = await response.json();
        
        investimentosColetados.length = 0;
        preencherArrayComDadosLocalStorage(dados);
        renderizarTabelaInvestimentos();
    } catch (error) {
        console.error('Erro ao carregar investimentos:', error);
    }
}

function limparInvestimentos() {
    if (confirm('Tem certeza que deseja remover TODOS os seus investimentos? Esta ação não pode ser desfeita.')) {
        investimentosColetados.length = 0;
        localStorage.removeItem('meusInvestimentos');
        renderizarTabelaInvestimentos();
        console.log('Todos os investimentos foram removidos.');
    }
}

function tentarCarregarDadosPersistidos() {
    carregarInvestimentosDoLocalStorage();
}
/*
function garantirInvestimentosIniciais() {
    if (investimentosColetados.length === 0) {
        carregarInvestimentosPadrao();
    }
}
*/
async function garantirInvestimentosIniciais() {
    if (investimentosColetados.length === 0) {
        await carregarInvestimentosDoJson();
    }
}

function inicializarApp() {
    tentarCarregarDadosPersistidos();
    garantirInvestimentosIniciais();
    renderizarTabelaInvestimentos();
}
inicializarApp()
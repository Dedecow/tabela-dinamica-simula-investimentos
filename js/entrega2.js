const investimentosColetados = [];

let nomeDigitado = '';
let emailDigitado = '';
let rendaDigitada = '';

const tbName = document.getElementById('tb-name');
const tbEmail = document.getElementById('tb-email');
const tbRenda = document.getElementById('tb-renda');
const tbodyInvestimentos =document.getElementById('investimentos-body')

const form = document.getElementById('form-dados');
form.addEventListener('submit', lidarComEnvioDeFormulario);




function salvarDadosUsuario(nome, email, renda) {
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

function preencherInvestimentoForm() {
    console.log('Iniciando adição de investimento via formulário');
    
    const modal = document.getElementById('investimento-modal');
    const form = document.getElementById('investimento-form');
    
    // Configura o CSS dinamicamente
    modal.style.display = 'block';
    
    form.onsubmit = function(e) {
        e.preventDefault();
        
        const nomeInput = document.getElementById('investimento-nome').value;
        const rendimentoInput = document.getElementById('investimento-rendimento').value;
        const riscoInput = document.querySelector('input[name="risco"]:checked')?.value;
        
        if (validarDadosInvestimento(nomeInput, rendimentoInput, riscoInput)) {
            adicionarInvestimento(nomeInput, rendimentoInput, riscoInput);
            renderizarTabelaInvestimentos();
            
            form.reset();
            modal.style.display = 'none';
            
            console.log('\n--- Investimento adicionado com sucesso ---');
        } else {
            console.log('Dados inválidos. Investimento não adicionado.');
        }
    };
    
    document.getElementById('cancelar-investimento').onclick = function() {
        form.reset();
        modal.style.display = 'none';
        console.log('Adição de investimento cancelada');
    };
}

function validarDadosInvestimento(nomeInput, rendimentoStrInput, riscoInput) {
    if (!nomeInput || nomeInput.trim() === '') {
        alert('O nome do investimento não pode estar vazio.');
        return false;
    }
    const rendimentoNumerico = parseFloat(rendimentoStrInput.replace(',', '.'));
    if (isNaN(rendimentoNumerico) || rendimentoNumerico <= 0) {
        alert('O rendimento esperado precisa ser um número positivo (Ex: 0.05 para 5%).');
        return false;
    }
    const riscoLower = riscoInput.trim().toLowerCase();
    if (riscoLower !== "sim" && riscoLower !== "nao") {
        alert('A resposta para o risco precisa ser "sim" ou "nao".');
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
    investimentosColetados.length = 0;
    
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

function carregarInvestimentosPadrao() {
    const parametroPoupanca = new Investimento("Poupança", 0.0500, "nao");
    const parametroPetro = new Investimento("Petr4", 0.2707, "sim");
    const parametroLCIBradesco = new Investimento("LCI Bradesco", 0,1211, "nao");
    const parametroLCDBITAU = new Investimento("CDB Itau", 0,1133, "nao");
    const parametroITAU = new Investimento("ITUB4", 0,5519, "nao");

    investimentosColetados.push(parametroPoupanca, parametroPetro);
}

function inicializarApp() {

    carregarInvestimentosDoLocalStorage();

    if (investimentosColetados.length === 0) {
        carregarInvestimentosPadrao();
    }

    renderizarTabelaInvestimentos();
    preencherInvestimentosPrompt();
}


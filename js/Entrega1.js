const investimentosColetados = [];

let nomeDigitado = '';
let emailDigitado = '';
let rendaDigitada = '';

const tbName = document.getElementById('tb-name');
const tbEmail = document.getElementById('tb-email');
const tbRenda = document.getElementById('tb-renda');


function salvarNomeTabela() {
    nomeDigitado = prompt('Digite seu nome.') || 'Anônimo';
    if (tbName) {
        tbName.textContent = nomeDigitado;
    }
    console.log(`Nome registrado para simulação de investimentos foi ${nomeDigitado}`);
}

function salvarEmailTabela() {
    emailDigitado = prompt('Digite seu email.') || 'email@email.com';
    if (tbEmail) {
        tbEmail.textContent = emailDigitado;
    }
    console.log(`Email registrado para simulação de investimentos foi ${emailDigitado}`);
}

function salvarRendaTabela() {
    rendaDigitada = prompt('Digite sua renda.');
    if (tbRenda) {
        tbRenda.textContent = rendaDigitada;
    }
    console.log(`Renda registrada para simulação de investimentos foi ${rendaDigitada}`);
}

function dadosDigitados() {
    const mensagem = `
    DADOS PARA SIMULAÇÃO:
    -------------------------------
    NOME: ${nomeDigitado}
    EMAIL: ${emailDigitado}
    RENDA: ${rendaDigitada}
    `;
    alert(mensagem);
    console.log('Dados globais:', { nomeDigitado, emailDigitado, rendaDigitada });
}


function ValidarDadosInvestimento(nomeInput, rendimentoStrInput, riscoInput) {
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
        alert('A resposta para o risco precisa ser "sim" ou "não".');
        return false;
    }
    return true;
}


function adicionarInvestimento(nome, rendimentoStr, riscoStr) {
    const investimento = new Investimento(nome.trim(), parseFloat(rendimentoStr.replace(',', '.')), riscoStr.trim());
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

function carregarInvestimentosDoLocalStorage() {
    const investimentosJSON = localStorage.getItem('meusInvestimentos');
    const dadosCarregados = JSON.parse(investimentosJSON);
    if(investimentosColetados.length != 0){
        // Decidir o que fazer quando a array ainda estiver com os dados que estamos tentando retornar a ela, posso carregar direto no DOM?
        limpaArray_PreencheComDadosLocalStorage(dadosCarregados);
        console.log('Investimentos carregados do localStorage com sucesso!');
    }
}

function limpaArray_PreencheComDadosLocalStorage(dadoStorage) {
    // Limpa a array global antes de preencher com os dados novos/carregados
    investimentosColetados.length = 0;

    //pegando cada item e devolvendo ao formato da classe investimento
    dadoStorage.forEach(function(dadoStorage) {
        const objetoInvestimento = new Investimento(dadoStorage.nome, dadoStorage.rendimento, dadoStorage.risco);
        investimentosColetados.push(objetoInvestimento);
    });
    console.log('Array global de investimentos preenchida com sucesso!');
}

function preencherInvestimentosPrompt() {
    console.log('Quantos investimentos vamos adicionar?');
    const numInvestimentosStr = prompt('Quantos investimentos vamos adicionar?');
    const numInvestimentos = parseInt(numInvestimentosStr) || 1;

    for (let i = 0; i < numInvestimentos; i++) {
        console.log(`--- Coletando dados para o ${i + 1}º investimento ---`);

        const nomeInput = prompt(`Digite o nome do ${i + 1}º investimento:`);
        const rendimentoStrInput = prompt(`Digite o rendimento esperado (ex: 0.05 para 5%):`);
        const riscoInput = prompt(`No ${i + 1}º investimento você pode tirar menos dinheiro do que colocou? Digite "sim" ou "não":`);

        if (ValidarDadosInvestimento(nomeInput, rendimentoStrInput, riscoInput)) {
            adicionarInvestimento(nomeInput, rendimentoStrInput, riscoInput);
        } else {
            console.log(`Dados inválidos para o ${i + 1}º investimento. Não foi adicionado.`);
        }
    }

    console.log('\n--- Preenchimento de investimentos concluído ---');
}

class Investimento {
    constructor(nome, rendimento, risco) {
        this.nome = nome;
        this.rendimento = parseFloat(rendimento);
        this.risco = (risco.trim().toLowerCase() === "sim" ? "sim" : "nao");
    }

    exibirInfo() {
        const perderDinheiro = this.risco === "sim" ? "mas você pode" : "sem risco de";
        return `${this.nome} retorna ${this.rendimento * 100}% do capital investido, ${perderDinheiro} perder dinheiro se você investir.`;
    }
}

carregarInvestimentosDoLocalStorage();

const parametroPoupanca = new Investimento("Poupança", 0.0500, "nao");
const parametroPetro = new Investimento("Petr4", 0.2707, "sim");

console.log(parametroPoupanca.exibirInfo());
console.log(parametroPetro.exibirInfo());

salvarNomeTabela();
salvarEmailTabela();
salvarRendaTabela();
dadosDigitados();
preencherInvestimentosPrompt();
const investimentosColetados = [];

let nomeDigitado = '';
let emailDigitado = '';
let rendaDigitada = '';

const tbName = document.getElementById('tb-name');
const tbEmail = document.getElementById('tb-email');
const tbRenda = document.getElementById('tb-renda');


function SalvarNomeTabela() {
    nomeDigitado = prompt('Digite seu nome.') || 'Anônimo';
    if (tbName) {
        tbName.textContent = nomeDigitado;
    }
    console.log(`Nome registrado para simulação de investimentos foi ${nomeDigitado}`);
}

function SalvarEmailTabela() {
    emailDigitado = prompt('Digite seu email.') || 'email@email.com';
    if (tbEmail) {
        tbEmail.textContent = emailDigitado;
    }
    console.log(`Email registrado para simulação de investimentos foi ${emailDigitado}`);
}

function SalvarRendaTabela() {
    rendaDigitada = prompt('Digite sua renda.');
    if (tbRenda) {
        tbRenda.textContent = rendaDigitada;
    }
    console.log(`Renda registrada para simulação de investimentos foi ${rendaDigitada}`);
}

function DadosDigitados() {
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
    const investimento = {
        nome: nome.trim(),
        rendimento: parseFloat(rendimentoStr.replace(',', '.')),
        risco: riscoStr.trim().toLowerCase() !== "nao"
    };
    investimentosColetados.push(investimento);
    console.log(`Investimento "${investimento.nome}" adicionado com sucesso!`);
}

function PreencherInvestimentosPrompt() {
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
        this.risco = risco.toLowerCase();
    }

    exibirInfo() {
        const perderDinheiro = this.risco === "sim" ? "mas você pode" : "sem risco de";
        return `${this.nome} retorna ${this.rendimento * 100}% do capital investido, ${perderDinheiro} perder dinheiro
let nomeDigitado = '';
let emailDigitado = '';
let rendaDigitada = '';

const tbName = document.getElementById('tb-name');
const tbEmail = document.getElementById('tb-email');
const tbRenda = document.getElementById('tb-renda');


function SalvarNomeTabela() {
    nomeDigitado = prompt('Digite seu nome.')||'Anônimo';
    tbName.textContent = nomeDigitado;
    console.log(
        `Nome registrado para simulação de investimentos foi ${nomeDigitado}`
    );
}


function SalvarEmailTabela() {
    emailDigitado = prompt('Digite seu email.')||'email@email.com';
    tbEmail.textContent = emailDigitado;
    console.log(
        `Email registrado para simulação de investimentos foi ${emailDigitado}`
    );
}

function SalvarRendaTabela(){
    rendaDigitada=prompt('Digite sua renda.')||'';
    tbRenda.textContent = rendaDigitada;
    console.log(
        `Renda registrada para simulação de investimentos foi ${rendaDigitada}`
    )
}

function DadosDigitados() {
    const mensagem =`
    DADOS PARA SIMULAÇÂO:
    -------------------------------
    NOME: ${nomeDigitado}
    EMAIL: ${emailDigitado}
    RENDA: ${rendaDigitada}
    `;
    alert (mensagem);
    console.log('Dados globais:', {nomeDigitado, emailDigitado, rendaDigitada})
}

function ValidarDadosInvestimento(nomeInput, rendimentoStrInput, riscoInput) {
    if (!nomeInput || nomeInput.trim() === '') {
        alert('O nome do investimento não pode estar vazio.');
        return false;
    }
    if (!rendimentoStrInput || rendimentoStrInput.trim() === '') {
        alert('O rendimento esperado não pode estar vazio.');
        return false;
    }
    if (parseFloat(rendimentoStrInput) <= 0) {
        alert('O rendimento esperado precisa ser um número positivo. Ex: 0,05 = rendimento de 5%.');
        return false;
    }
    if (!riscoInput || riscoInput.trim() === '') {
        alert('A resposta precisa ser "sim" ou "não" quanto ao risco.');
        return false;
    }
    return true;
}

function PreencherInvestimentosPrompt() {
    const investimentosColetados = [];

    const numInvestimentosStr = prompt('Quantos investimentos vamos adicionar?');
    const numInvestimentos = parseInt(numInvestimentosStr) || 1;

    for (let i = 0; i < numInvestimentos; i++) {
        console.log(`--- Coletando dados para o ${i + 1}º investimento ---`);

        const nomeInput = prompt(`Digite o nome do ${i + 1}º investimento:`);
        const rendimentoStrInput = prompt(`Digite o rendimento esperado (ex: 0.05 para 5%):`);
        const riscoInput = prompt(`No ${i + 1}º investimento você pode tirar menos dinheiro do que colocou? Digite "sim" ou "não":`);

        if (ValidarDadosInvestimento(nomeInput, rendimentoStrInput, riscoInput)) {
            investimentosColetados.push({ nome: nomeInput, rendimento: rendimentoStrInput, risco: riscoInput });
            console.log(`Investimento "${nomeInput}" adicionado com sucesso!`);
        } else {
            console.log(`Dados inválidos para o ${i + 1}º investimento. Não foi adicionado.`);
        }
    }

    console.log('\n--- Preenchimento de investimentos concluído ---');

    return investimentosColetados;
}
class Investimento {
    constructor(nome, rendimento, risco){
        this.nome = nome;
        this.rendimento = parseFloat(rendimento);
        this.risco = risco.toLowerCase();
    }
    //metodo da classe
    exibirInfo(){
        const perderDinheiro = this.risco === "sim"? "mas você pode" : "sem risco de";
        return `{${this.nome} retorna ${this.rendimento * 100} do capital investido, ${perderDinheiro} perder dinheiro se você investir. `
    }
} 
const parametroPoupanca = new Investimento("Poupança", 0.0500, "nao");
const parametroPetro = new Investimento("Petr4", 0.2707, "sim")



//Chamada das funções referentes à informações do usuário.
SalvarNomeTabela();
SalvarEmailTabela();
SalvarRendaTabela();
DadosDigitados()

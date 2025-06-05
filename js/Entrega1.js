let nomeDigitado = '';
let emailDigitado = '';
let rendaDigitada = '';

const tbName = document.getElementById('tb-name');

function salvarNomeTabela() {
    nomeDigitado = prompt('Digite seu nome.')||'Anônimo';
    tbName.textContent = nomeDigitado;
    console.log(
        `Nome registrado para simulação de investimentos foi ${nomeDigitado}`
    );
}
salvarNomeTabela();

const tbEmail = document.getElementById('tb-email');

function salvarEmailTabela() {
    emailDigitado = prompt('Digite seu email.')||'email@email.com';
    tbEmail.textContent = emailDigitado;
    console.log(
        `Email registrado para simulação de investimentos foi ${emailDigitado}`
    );
}
salvarEmailTabela();

const tbRenda = document.getElementById('tb-renda');

function salvarRendaTabela(){
    rendaDigitada=prompt('Digite sua renda.')||'';
    tbRenda.textContent = rendaDigitada;
    console.log(
        `Renda registrada para simulação de investimentos foi ${rendaDigitada}`
    )
}
salvarRendaTabela();

function dadosDigitados() {
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
dadosDigitados()

function preencherInvestimentosPrompt() {
    const investimentosColetados = [];

    const numInvestimentosStr = prompt('Quantos investimentos vamos adicionar?');
    const numInvestimentos = parseInt(numInvestimentosStr) || 1;


    for (let i = 0; i < numInvestimentos; i++) {
        console.log(`\n--- Coletando dados para o ${ i + 1}º investimento ---`);

        const nomeInput = prompt(`Digite o nome do ${i + 1}º investimento:`);
        const rendimentoStrInput = prompt(`Digite o rendimento esperado (ex: 0.05 para 5%, ou 20.60/29.35 para razão):`);
        const riscoInput = prompt(`O ${i + 1}º investimento tem risco? Digite "sim" ou "não":`);

        const investimentoValidado = validarDadosInvestimento(nomeInput, rendimentoStrInput, riscoInput);

        if (investimentoValidado) {
            investimentosColetados.push(investimentoValidado); // Adiciona à array LOCAL
            console.log(`Investimento "${investimentoValidado.nome}" adicionado com sucesso!`);
        } else {
            console.warn(`Dados inválidos para o ${i + 1}º investimento. Não foi adicionado.`);
        }
    }
    console.log('\n--- Preenchimento de investimentos concluído ---');

    return investimentosColetados;
}

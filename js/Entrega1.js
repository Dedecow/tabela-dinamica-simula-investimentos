let nomeDigitado = '';
let emailDigitado = '';
let rendaDigitada = '';

const tbName = document.getElementById('tb-name');
const tbEmail = document.getElementById('tb-email');
const tbRenda = document.getElementById('tb-renda');


function salvarNomeTabela() {
    nomeDigitado = prompt('Digite seu nome.')||'Anônimo';
    tbName.textContent = nomeDigitado;
    console.log(
        `Nome registrado para simulação de investimentos foi ${nomeDigitado}`
    );
}


function salvarEmailTabela() {
    emailDigitado = prompt('Digite seu email.')||'email@email.com';
    tbEmail.textContent = emailDigitado;
    console.log(
        `Email registrado para simulação de investimentos foi ${emailDigitado}`
    );
}

function salvarRendaTabela(){
    rendaDigitada=prompt('Digite sua renda.')||'';
    tbRenda.textContent = rendaDigitada;
    console.log(
        `Renda registrada para simulação de investimentos foi ${rendaDigitada}`
    )
}

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

function validarDadosInvestimento(nomeInput, rendimentoStrInput, riscoInput){
    if (!nomeInput || nomeInput.trim() ===''){
        alert('O nome do investimento não pode estaz vazio. ')
        return false
    } 
    if(!rendimentoStrInput || rendimentoStrInput.trim() === ''){
        alert('O rendimento esperado não pode estaz vazio. ')
        return false
    }
    if((parseFloat(rendimentoStrInput)) <= 0){
        alert('O rendimento esperado precisa ser um número positivo. Ex: 0,05 = rendimento de 5% ')
        return false
    }
    if (!riscoInput || riscoInput.trim() ===''){
        alert('A resposta precisa ser sim, caso você tenha a chance de retirar menos do que depositou ou não, caso contrário. Não pode estaz vazio. ')
        return false
    }
    return true;
}

function preencherInvestimentosPrompt() {
    const investimentosColetados = [];

    const numInvestimentosStr = prompt('Quantos investimentos vamos adicionar?');
    const numInvestimentos = parseInt(numInvestimentosStr) || 1;


    for (let i = 0; i < numInvestimentos; i++) {
        console.log(`--- Coletando dados para o ${ i + 1}º investimento ---`);

        const nomeInput = prompt(`Digite o nome do ${i + 1}º investimento:`);
        const rendimentoStrInput = prompt(`Digite o rendimento esperado (ex: 0.05 para 5%, ou 20.60/29.35 para razão):`);
        const riscoInput = prompt(`O ${i + 1}º investimento tem risco? Digite "sim" ou "não":`);

        const investimentoValidado = validarDadosInvestimento(nomeInput, rendimentoStrInput, riscoInput);

        if (investimentoValidado) {
            investimentosColetados.push(investimentoValidado); 
            console.log(`Investimento "${investimentoValidado.nome}" adicionado com sucesso!`);
        } else {
            console.log(`Dados inválidos para o ${i + 1}º investimento. Não foi adicionado.`);
        }
    }
    console.log('\n--- Preenchimento de investimentos concluído ---');

    return investimentosColetados;
}

//Chamada das funções referentes à informações do usuário.
salvarNomeTabela();
salvarEmailTabela();
salvarRendaTabela();
dadosDigitados()

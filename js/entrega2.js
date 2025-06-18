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


function preencherInvestimentosPrompt() {
    const investimentosColetados = [];

    const numInvestimentosStr = prompt('Quantos investimentos vamos adicionar?');
    const numInvestimentos = parseInt(numInvestimentosStr) || 1;

    for (let i = 0; i < numInvestimentos; i++) {
        console.log(`--- Coletando dados para o ${i + 1}º investimento ---`);

        const nomeInput = prompt(`Digite o nome do ${i + 1}º investimento:`);
        const rendimentoStrInput = prompt(`Digite o rendimento esperado (ex: 0.05 para 5%):`);
        const riscoInput = prompt(`O ${i + 1}º investimento tem risco? Digite "sim" ou "não":`);

        const dadosSaoValidos = validarDadosInvestimento(nomeInput, rendimentoStrInput, riscoInput);

        if (dadosSaoValidos) {
            const investimento = {
                nome: nomeInput.trim(),
                rendimento: parseFloat(rendimentoStrInput.replace(',', '.')),
                risco: riscoInput.trim().toLowerCase() === "sim"
            };
            
            investimentosColetados.push(investimento);
            console.log(`Investimento "${investimento.nome}" adicionado com sucesso!`);
        } else {
            console.log(`Dados inválidos para o ${i + 1}º investimento. Não foi adicionado.`);
        }
    }

    console.log('\n--- Preenchimento de investimentos concluído ---');
    return investimentosColetados;
}

function validarDadosInvestimento(nomeInput, rendimentoStrInput, riscoInput) {
    if (!nomeInput || nomeInput.trim() === '') {
        alert('O nome do investimento não pode estar vazio.');
        return false;
    }

    if (!/^\d*[,.]?\d+$/.test(rendimentoStrInput)) {
        alert('Formato de rendimento inválido. Use números (ex: 0.05 ou 0,05).');
        return false;
    }   

    const riscoLower = riscoInput.trim().toLowerCase();
    if (riscoLower !== 'sim' && riscoLower !== 's' && riscoLower !== 'n' && riscoLower !== 'não' && riscoLower !== 'nao') {
        alert('O risco deve ser "sim" ou "não".');
        return false;
    }

    return true;
}


//chamadas de função
salvarNomeTabela();
salvarEmailTabela();
salvarRendaTabela();
dadosDigitados()

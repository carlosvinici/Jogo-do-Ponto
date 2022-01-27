/* Definindo template */
const main = document.getElementById('root');

function Template() {

    /* Gerando Botão de Start */
    const button = document.createElement('button');
    main.appendChild(button);
    button.setAttribute('onclick', 'StartGame()');
    button.setAttribute('id', 'btn-StartGame')
    button.innerHTML = 'Começar';

    /* Gerando <div> para armazenar os inputs radio */
    const divForInputsRadio = document.createElement('div');
    main.appendChild(divForInputsRadio);
    divForInputsRadio.setAttribute('id', 'InputsRadio');
}


/* Gerando template do jogo  */
let c = 1; /* Count para gerar os <inputs> dentro do while */
const limite = 6; limite /* representa o numero de colunas sendo limite a ultima coluna */
let proxLimite = limite;  /* para o script entender que não pode gerar linhas apos o limite, essa variavel vai calcular ao decorrer da execução os pontos de limite */

function StartGame() {
    while ( c < 37 ){

        /* Gerando o input do tipo radio */
        const button = document.createElement('input');
        button.setAttribute('type', 'radio')
        button.setAttribute('onclick', `ChoiceValidation(${c})`)
        button.setAttribute('id', c)
        button.classList.add('buttonPonto')
        document.getElementById('InputsRadio').appendChild(button);


        /* Gerando Linha para ligar os pontos <imput> */

        /* A DIREITA */
        if( c != proxLimite ){
            const rowRight = document.createElement('span');
            rowRight.classList.add('defaultRowRigth');
            rowRight.setAttribute('id', `row${c}`)
            document.getElementById('InputsRadio').appendChild(rowRight);
        }
        /* A BAIXO */
        else {
            
            /* cria uma div para servir como container das nossas linhas */
            const containerRowDown = document.createElement('div');
            containerRowDown.setAttribute('id', `cointainerRow${proxLimite}`)
            document.getElementById('InputsRadio').appendChild(containerRowDown);
            containerRowDown.classList.add('containerRowsDown');

            /* Cria nossas linhas, em seguida declara suas classes e declara ela como filha de nosso container criado acima */
            if (proxLimite != 36){
                for (let index = 1; index < 7; index++) {
                    const rowDown = document.createElement('span');
                    rowDown.classList.add('defaultRowDown');
                    rowDown.setAttribute('id', `rowDown${c}${index}`);
                    document.getElementById(`cointainerRow${proxLimite}`).appendChild(rowDown);
                }
            }
            proxLimite = proxLimite + limite; /* Calcula o proximo limite */
            
        }
        
        c++;
    }
}


/* Validando Escolha */
let firstChoise = 0;   
let countClick = 0; /* vai alternar entre 1 e 2, ela é o limite de escolha que o jogador pode fazer ao chegar em 2 a comparação é feita entre firstChoise e P  */
let countClickMudaCor = 1; /* Essa variavel vai trabalha em conjuto com o array para determinar qual jogador jogou, assim diferenciando a cor da linha */
const orderClicksPlayerOne = [1, 2, 5, 6, 9, 10, 13, 14, 17, 18, 21, 22, 25, 26, 29, 30, 33, 34];  /* ordem de clique do primeiro jogador */

function ChoiceValidation(p) {
    countClick++

    function removerChecked() {
        let falseChoise = document.getElementById(`${p}`);
        falseChoise.checked = false;
    }


    if (countClick == 1){
        console.log('é valido');
        firstChoise = p;
    }
    else if (p == firstChoise + 1){
        console.log('é valido');
        countClick = 0;
    }
    else if (p == firstChoise - 1){
        console.log('é valido');
        countClick = 0;              
    }
    else if (p == firstChoise + 6){
        console.log('é valido');
        countClick = 0;     
    
    }
    else if (p == firstChoise - 6) {
        console.log('é valido');
        countClick = 0;
    }
    else{
        console.log('não é valido')
        removerChecked(p);
        alert('Selecão inválida!')
    }

    /* Analisa o countClick para determinar a diferença para os jogadores */
    const clickPlayerOne = orderClicksPlayerOne.find( click => click == countClickMudaCor ); /* Procura no array se o a vez do clique é do player one */
    console.log(clickPlayerOne);
    
    if( countClickMudaCor == clickPlayerOne){
        console.log('tem no array')
        const oneChoise = document.getElementById(`${firstChoise}`).classList.add('correctGreen');
        const twoChoise = document.getElementById(`${p}`).classList.add('correctGreen');
    }
    else{
        console.log('não tem no array')
        const oneChoise = document.getElementById(`${firstChoise}`).classList.add('correctOrange');
        const twoChoise = document.getElementById(`${p}`).classList.add('correctOrange'); 
    }
    countClickMudaCor++;

    
    
    

}

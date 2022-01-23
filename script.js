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


/* Gerando Inputs do tipo radio  */
let c = 1; /* Count para gerar os <inputs> dentro do while */
function StartGame() {
    while ( c < 37 ){
        const button = document.createElement('input');
        button.setAttribute('type', 'radio')
        button.setAttribute('onclick', `ChoiceValidation(${c})`)
        button.setAttribute('id', c)
        button.classList.add('buttonPonto')
        document.getElementById('InputsRadio').appendChild(button);
        c++;
    }
}


/* Validando Escolha */
let firstChoise = 1;   
let lastChoise;
let countClick = 0;
const orderClicksPlayerOne = [1, 2, 5, 6, 9, 10, 13, 14, 17, 18, 21, 22, 25, 26, 29, 30, 33, 34];  /* ordem de clique do primeiro jogador */


function removerChecked() {
    var falseChoise = document.getElementById(`${p}`);
    falseChoise.checked = false;
}


function ChoiceValidation(p) {
    countClick++

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
        
        const lineDown = document.createElement('span');
        document.getElementById(`${p}`).appendChild(lineDown)
        lineDown.setAttribute('class', 'classlineDown');   
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
    const clickPlayerOne = orderClicksPlayerOne.find( click => click == countClick ); /* Procura no array se o a vez do clique é do player one */
    console.log(clickPlayerOne);
    
    if( countClick == clickPlayerOne){
        console.log('tem no array')
        const oneChoise = document.getElementById(`${firstChoise}`).classList.add('correctGreen');
        const twoChoise = document.getElementById(`${p}`).classList.add('correctGreen');
    }
    else{
        console.log('não tem no array')
        const oneChoise = document.getElementById(`${firstChoise}`).classList.add('correctOrange');
        const twoChoise = document.getElementById(`${p}`).classList.add('correctOrange'); 
    }

    
    
    

}
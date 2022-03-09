/* Definindo template */
const main = document.getElementById('root');

function Template(scoreGrid = false) {

    if (scoreGrid == false) {
        /* Gerando Botão de Start */
        const button = document.createElement('button');
        main.appendChild(button);
        button.setAttribute('onclick', 'StartGame()');
        button.setAttribute('id', 'btn-StartGame')
        button.innerHTML = 'Começar';
        
        /* Gerando <div> para armazenar os inputs radio */
        const formContainer = document.createElement('form');
        main.appendChild(formContainer);
        formContainer.setAttribute('id', 'InputsRadio');
    }
    else {
        const players = document.createElement('div');
        main.appendChild(players);
        players.setAttribute('class', 'gridScore')
        players.innerHTML = '<h1>PlayerOne: 0 </h1><h1>PlayerTwo: 0 </h1>';
    }

}

const limite = 6;  /* representa o numero de colunas, sendo limite a ultima coluna */
let proxLimite = limite;  /* essa variavel vai armazenar os pontos de limite de cada linha*/
let countId = 4; /* Calcula o id das linhas tranversais para que o id seja a soma dos pontos em suas extremidades */
let c = 1; 
function StartGame() {
    document.getElementById('btn-StartGame').style.visibility = 'hidden';
    Template(true);

    
    while ( c <= 36 ){

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
                let declaraId = () => {
                    let id = countId * 2;
                    countId++;
                    return id;
                };

                for (let index = 1; index <= 6; index++) {
                    const rowDown = document.createElement('span');
                    rowDown.classList.add('defaultRowDown');
                    rowDown.setAttribute('id', `rowDown${declaraId()}`);
                    document.getElementById(`cointainerRow${proxLimite}`).appendChild(rowDown);
                };
            };
            proxLimite = proxLimite + limite; /* Calcula o proximo limite */
            
        };
        
        c++;
    };

    const containerSquares = document.createElement('div');
    containerSquares.setAttribute('id', 'containerSquares');
    main.appendChild(containerSquares);

    let c2 = 1;
    while (c2 <= 25){
        const square = document.createElement('div');
        square.setAttribute('id', `square${c2}`);
        square.classList.add('squares');
        containerSquares.appendChild(square);
        square.innerHTML += 'olá' + c2;
        c2++
    }

    
};



function resetChecked(countClick, invalidatedChoice = false){
    if(countClick == invalidatedChoice){
        document.getElementById('InputsRadio').reset() 
    }
    else if (invalidatedChoice != false){
        document.getElementById(invalidatedChoice).checked = false; 
    }
};

let firstChoice = 0;   
let countClick = 0; /* vai alternar entre 1 e 2, ela é o limite de escolha que o jogador pode fazer ao chegar em 2 a comparação é feita entre firstChoise e P  */
let countClickMudaCor = 1; /* Essa variavel vai trabalha em conjuto com o array para determinar qual jogador jogou, assim diferenciando a cor da linha */
const orderClicksPlayerOne = [1, 2, 5, 6, 9, 10, 13, 14, 17, 18, 21, 22, 25, 26, 29, 30, 33, 34];  /* ordem de clique do primeiro jogador */

function ChoiceValidation(p) {
    countClick++

    /* condição para guardar o ultimo ponto escolhido*/
    let maiorNumeroId = 0;
    p > firstChoice 
    ? maiorNumeroId = p - 1
    : maiorNumeroId = firstChoice - 1;

    /* Analisa o countClickMudaCor para determinar qual cor aplicar */
    const clickPlayerOne = orderClicksPlayerOne.find( click => click == countClickMudaCor ); /* Procura no array se o a vez do clique é do player one */
    let cor = '';
    countClickMudaCor == clickPlayerOne
    ? cor = '#0b771a'/* verde */ 
    : cor = '#d3660c'/* laranja */;
    countClickMudaCor++;
    

    /* valida o ponto clicado e aplica a cor */
    const rows = document.getElementById(`row${maiorNumeroId}`);
    const rowsDown = document.getElementById(`rowDown${p + firstChoice}`);
    try {
        if (countClick == 1){
            firstChoice = p;
            return;
        }
        else if (p == firstChoice + 1 && rows.value != '1'){
            rows.setAttribute('value', '1');
            rows.style.backgroundColor = cor;
        }
        else if (p == firstChoice - 1){
            rows.style.backgroundColor = cor;    
        }
        else if (p == firstChoice + limite){
            rowsDown.style.backgroundColor = cor; 
        }
        else if (p == firstChoice - limite) {
            rowsDown.style.backgroundColor = cor;
        }
        else{
            resetChecked(countClick, p); 
            alert('❌Selecão inválida!❌');
            countClick--;    
            return
        } 
    } catch (error) {
        resetChecked(countClick, p); 
        alert('❌Selecão inválida!❌');
        countClick--;    
        return
    }

    countClick = 0;   
    resetChecked(countClick); 
}

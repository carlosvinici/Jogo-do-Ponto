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
    }
    else {
        document.getElementById('btn-StartGame').style.visibility = 'hidden';
        const players = document.createElement('div');
        main.appendChild(players);
        players.setAttribute('class', 'gridScore')
        players.innerHTML = '<h1>PlayerOne: 0 </h1><h1>PlayerTwo: 0 </h1>';
    }

}

let keySquares={};
const limite = 6;  /* representa o numero de colunas, sendo limite a ultima coluna */
let proxLimite = limite;  /* essa variavel vai armazenar os pontos de limite de cada linha*/
let countId = 4; /* Calcula o id das linhas tranversais para que o id seja a soma dos pontos em suas extremidades */
function StartGame() {
    Template(true)
    localStorage.clear();
    
    

    const containerSquares = document.createElement('div');
    containerSquares.setAttribute('id', 'containerSquares');
    main.appendChild(containerSquares);
    
    let countSquare = 1;let squareKey = 0;let IdAssistant = 5;let formulaIdA = 10;let formulaIdB = 8;let formulaIdC = 0; let formulaD = 7;
    while (countSquare <= 25){
        const square = document.createElement('div');
        square.setAttribute('id', `square${countSquare}`);
        square.classList.add('squares');
        containerSquares.appendChild(square);

        keySquares[`${countSquare}`] = {
            key: [(countSquare + formulaIdC)*100, formulaIdA + 2 * squareKey, (formulaD + squareKey)*100, formulaIdB + 2 * squareKey],
            hits: 0 
        };

        if (IdAssistant == countSquare) {
            formulaIdA = formulaIdA + 2;
            formulaIdB = formulaIdB + 2;
            formulaIdC++;
            formulaD++;
            IdAssistant = IdAssistant + 5;
        }
        countSquare++
        squareKey++
    }
    /* Gerando <div> para armazenar os inputs radio */
    const formContainer = document.createElement('form');
    main.appendChild(formContainer);
    formContainer.setAttribute('id', 'InputsRadio');

    let countInput = 1; 
    while ( countInput <= 36 ){

        /* Gerando o input do tipo radio */
        const button = document.createElement('input');
        button.setAttribute('type', 'radio')
        button.setAttribute('onclick', `ChoiceValidation(${countInput})`)
        button.setAttribute('id', countInput)
        button.classList.add('buttonPonto')
        document.getElementById('InputsRadio').appendChild(button);


        /* Gerando Linha para ligar os pontos <imput> */

        /* A DIREITA */
        if( countInput != proxLimite ){
            const rowRight = document.createElement('span');
            rowRight.classList.add('defaultRowRigth');
            rowRight.setAttribute('id', `row${countInput*100}`)
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
                    let idRowDown  = declaraId();
                    const rowDown = document.createElement('span');
                    rowDown.classList.add('defaultRowDown');
                    rowDown.setAttribute('id', `rowDown${idRowDown}`);
                    document.getElementById(`cointainerRow${proxLimite}`).appendChild(rowDown);
                };
            };
            proxLimite = proxLimite + limite; /* Calcula o proximo limite */
            
        };
        
        countInput++;
    };
};


let countPlayerChoice = 0; 
function WhoPlays() {
    countPlayerChoice++; 
    let player = '';
    countPlayerChoice % 2 == 0
    ? player = 'two' 
    : player = 'one';

    return player;
}

function ApplyingColor(player) {
    var color = player == 'one' ? '#0b771a' : '#d3660c';
    return color;
}

function ResetChecked(countClick, invalidatedChoice = false){
    if(countClick == invalidatedChoice){
        document.getElementById('InputsRadio').reset() 
    }
    else if (invalidatedChoice != false){
        document.getElementById(invalidatedChoice).checked = false; 
    }
};


function CheckingSquare(id, color) {
	for (let index = 1; index <= 25; index++){
      if(keySquares[index].key.includes(id)){
        keySquares[index].hits++;
        if( keySquares[index].hits == 4){
          document.getElementById(`square${index}`).style.background = color;
        }
      }
    }
        
}


let storingKey = [];
function StoringKey(key) {
    storingKey.push(key);
    localStorage.setItem('moved', `${storingKey}`)
}

function ValidatingRepeatedMovement(id) {
    let validMoved;
    const validatingMovement = storingKey.find( moved => moved == id );
    validatingMovement == undefined ?  validMoved = true : validMoved = false;
    return validMoved;
}


let firstChoice = 0;   
let countClick = 0; /* vai alternar entre 1 e 2, ela é o limite de escolha que o jogador pode fazer ao chegar em 2 a comparação é feita entre firstChoise e P  */
function ChoiceValidation(clickedPoint) {
    countClick++
    if (countClick == 1){
        firstChoice = clickedPoint;
        return;
    }
    
    let rowId = clickedPoint > firstChoice ? (clickedPoint - 1)*100 : (firstChoice - 1)*100;
    let rowDownId = clickedPoint + firstChoice;
    const rows = document.getElementById(`row${ rowId }`);
    const rowsDown = document.getElementById(`rowDown${ rowDownId }`);

    if (clickedPoint == firstChoice){
        ResetChecked(countClick, clickedPoint); 
        countClick=0;
        firstChoice=0;    
        return
    }
    else {
        try {
            if (clickedPoint == firstChoice + 1 & ValidatingRepeatedMovement(rowId)){
                let colors = ApplyingColor(WhoPlays())
                rows.style.backgroundColor = colors;
                CheckingSquare(rowId, colors)
                StoringKey(rowId);
            }
            else if (clickedPoint == firstChoice - 1 & ValidatingRepeatedMovement(rowId)){
                let colors = ApplyingColor(WhoPlays())
                rows.style.backgroundColor = colors;
                CheckingSquare(rowId, colors)
                StoringKey(rowId);
            }
            else if (clickedPoint == firstChoice + limite & ValidatingRepeatedMovement(rowDownId)){
                let colors = ApplyingColor(WhoPlays());
                rowsDown.style.backgroundColor = colors; 
                CheckingSquare(rowDownId, colors)
                StoringKey(rowDownId);
            } 
            else if (clickedPoint == firstChoice - limite & ValidatingRepeatedMovement(rowDownId)) {
                let colors = ApplyingColor(WhoPlays());
                rowsDown.style.backgroundColor = colors; 
                CheckingSquare(rowDownId, colors)
                StoringKey(rowDownId);
            }
            else{
                ResetChecked(countClick, clickedPoint); 
                alert('❌Selecão inválida!❌');
                countClick--;    
                return
            } 
        } catch (error) {
            ResetChecked(countClick, clickedPoint); 
            alert('❌ ' + error );
            countClick--;    
            return
        }
    } 

    countClick = 0;   
    ResetChecked(countClick); 
}


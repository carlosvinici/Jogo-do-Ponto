
const main = document.getElementById('root');
let dataPlayer = {
    'one' : { score: 0, name: 'player One', color: '#0b771a'},
    'two' : { score: 0, name: 'player Two', color: '#d3660c'}
};
let keySquares={};

/* Criando layout  */
function Template(scoreGrid = false) {
    if (!scoreGrid) {
        /* Gerando Botão de Start */
        const button = document.createElement('button');
        main.appendChild(button);
        button.setAttribute('onclick', 'StartGame()');
        button.setAttribute('id', 'btn-StartGame');
        button.setAttribute('class', 'buttonsTemplate')
        button.innerHTML = 'Começar';

        /* Gerando Formulario */
        const formPlayers = document.createElement('form');
        main.appendChild(formPlayers);
        formPlayers.setAttribute('class', 'formPlayers')
        formPlayers.setAttribute('id', 'inputFormPlayers')
        
        /* Gerando inputs Name*/
        const formPlay1 = document.createElement('label');
        formPlayers.appendChild(formPlay1);
        formPlay1.innerHTML = 'Nome do primeiro jogador';
        const inputPlay1 = document.createElement('input')
        formPlayers.appendChild(inputPlay1)
        inputPlay1.setAttribute('type', 'text');
        inputPlay1.setAttribute('id', 'inputName1')
        inputPlay1.setAttribute('class', 'inputName');

        const formPlay2 = document.createElement('label');
        formPlayers.appendChild(formPlay2);
        formPlay2.innerHTML = 'Nome do segundo jogador';
        const inputPlay2 = document.createElement('input')
        formPlayers.appendChild(inputPlay2);
        inputPlay2.setAttribute('type', 'text');
        inputPlay2.setAttribute('id', 'inputName2');
        inputPlay2.setAttribute('class', 'inputName');
        
        /* Gerando Inputs Cor*/
        const formColor1 = document.createElement('label');
        formPlayers.appendChild(formColor1);
        formColor1.innerHTML = 'Cor 1';
        const inputColor1 = document.createElement('input');
        formPlayers.appendChild(inputColor1);
        inputColor1.setAttribute('type', 'color');
        inputColor1.setAttribute('value', '#0b771a')
        inputColor1.setAttribute('id', 'inputColor1');
        inputColor1.setAttribute('class', 'Inputcolor');
        
        
        const formColor2 = document.createElement('label');
        formPlayers.appendChild(formColor2);
        formColor2.innerHTML = 'Cor 2';
        const inputColor2 = document.createElement('input')
        formPlayers.appendChild(inputColor2);
        inputColor2.setAttribute('type', 'color');
        inputColor2.setAttribute('value', '#d3660c')
        inputColor2.setAttribute('id', 'inputColor2');
        inputColor2.setAttribute('class', 'Inputcolor');

        const inputForm = document.createElement('input');
        inputForm.setAttribute('type', 'submit')
        inputForm.setAttribute('value', 'Salvar')
        inputForm.setAttribute('onclick', 'InputForm(event)')
        inputForm.setAttribute('class', 'buttonsTemplate');
        formPlayers.appendChild(inputForm);


        main.innerHTML += `<p id="footer">Desenvolvido por <a href="https://carlosvinici.github.io/Portifolio/" target="_blank"> Carlos Vinícius </a></p>`;

    }
    else {
        document.getElementById('btn-StartGame').style.visibility = 'hidden';
        document.getElementById('inputFormPlayers').style.display = 'none';
        document.getElementById('footer').style.display = 'none';

        const gridScore = document.createElement('div');
        main.appendChild(gridScore);
        gridScore.setAttribute('class', 'gridScore')

        gridScore.innerHTML = `<h1>${dataPlayer['one'].name}: <span id="scoreOne"></span> </h1><h1>${dataPlayer['two'].name}: <span id="scoreTwo"></span></h1>`;
        RenderScore()
    }
}
function RenderScore() {
    document.getElementById('scoreOne').innerHTML = dataPlayer['one'].score;
    document.getElementById('scoreTwo').innerHTML = dataPlayer['two'].score;
}
function InputForm(event) {
    event.preventDefault();
    const namePlay1 = document.getElementById('inputName1').value;
    const namePlay2 = document.getElementById('inputName2').value;
    const colorPlay1 = document.getElementById('inputColor1').value;
    const colorPlay2 = document.getElementById('inputColor2').value;
    
    
    dataPlayer['one'].name = namePlay1 == '' ?  alert('Não há dados a serem enviados!'): namePlay1 ;
    dataPlayer['two'].name = namePlay2 == '' ?  alert('Não há dados a serem enviados!'): namePlay2 ;

    dataPlayer['one'].color = colorPlay1;
    dataPlayer['two'].color = colorPlay2;

}


const limite = 6;  /* representa o numero de colunas, sendo limite a ultima coluna */
let proxLimite = limite;  /* essa variavel vai armazenar os pontos de limite de cada linha*/
let countId = 4; /* Calcula o id das linhas tranversais para que o id seja a soma dos pontos em suas extremidades */
function StartGame() {
    Template(scoreGrid = true)
    localStorage.clear();

    /* Gerando quadrados */
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

    /* Gerando os inputs radio */
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
    var color = player == 'one' ? dataPlayer['one'].color : dataPlayer['two'].color;
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


function CheckingSquare(id, color, whoPlayer) {
	for (let index = 1; index <= 25; index++){
      if(keySquares[index].key.includes(id)){
        keySquares[index].hits++;

        if( keySquares[index].hits == 4){
          document.getElementById(`square${index}`).style.background = color;
          dataPlayer[whoPlayer].score++;
          RenderScore();
        }
      }
      
    }
    if (dataPlayer['one'].score + dataPlayer['two'].score == 25){
        if(dataPlayer['one'].score > dataPlayer['two']){
            alert(`Jogo Concluido!! O ${dataPlayer['one'].name} Ganhou!!!`)
        }else{
            alert(`Jogo Concluido!! O ${dataPlayer['two'].name} Ganhou!!!`)
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
    }
    else{
    
        let rowId = clickedPoint > firstChoice ? (clickedPoint - 1)*100 : (firstChoice - 1)*100;
        let rowDownId = clickedPoint + firstChoice;
        const rows = document.getElementById(`row${ rowId }`);
        const rowsDown = document.getElementById(`rowDown${ rowDownId }`);
    
        if (clickedPoint == firstChoice){
            ResetChecked(countClick, clickedPoint); 
            countClick=0;
            firstChoice=0;    
            return;
        }
        else {
            try {
                if (clickedPoint == firstChoice + 1 & ValidatingRepeatedMovement(rowId)){
                    let whoPlayer = WhoPlays();
                    let colors = ApplyingColor(whoPlayer);
                    rows.style.backgroundColor = colors;
                    CheckingSquare(rowId, colors, whoPlayer)
                    StoringKey(rowId);
                }
                else if (clickedPoint == firstChoice - 1 & ValidatingRepeatedMovement(rowId)){
                    let whoPlayer = WhoPlays();
                    let colors = ApplyingColor(whoPlayer);
                    rows.style.backgroundColor = colors;
                    CheckingSquare(rowId, colors, whoPlayer)
                    StoringKey(rowId);
                }
                else if (clickedPoint == firstChoice + limite & ValidatingRepeatedMovement(rowDownId)){
                    let whoPlayer = WhoPlays();
                    let colors = ApplyingColor(whoPlayer);
                    rowsDown.style.backgroundColor = colors; 
                    CheckingSquare(rowDownId, colors, whoPlayer)
                    StoringKey(rowDownId);
                } 
                else if (clickedPoint == firstChoice - limite & ValidatingRepeatedMovement(rowDownId)) {
                    let whoPlayer = WhoPlays();
                    let colors = ApplyingColor(whoPlayer);
                    rowsDown.style.backgroundColor = colors; 
                    CheckingSquare(rowDownId, colors, whoPlayer)
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
                alert('❌ ' + error + ' ❌');
                countClick--;    
                return
            }
        } 
    
        countClick = 0;   
        ResetChecked(countClick); 
    }
}


const main = document.getElementById('gameContainer');
const modals = document.getElementById('modals');

let dataPlayer = {
    'one' : { score: 0, name: 'player One', color: '#0b771a'},
    'two' : { score: 0, name: 'player Two', color: '#d3660c'}
};
let keySquares={}; /* Esse obejto vai receber as chaves dos quadrados quando StartGame for chamada, você pode chamar ela no console para visualiza-la */

/* Criando layout  */
function Layout(scoreGrid = false) {
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
        inputPlay1.setAttribute('placeholder', 'Player One');


        const formPlay2 = document.createElement('label');
        formPlayers.appendChild(formPlay2);
        formPlay2.innerHTML = 'Nome do segundo jogador';
        const inputPlay2 = document.createElement('input')
        formPlayers.appendChild(inputPlay2);
        inputPlay2.setAttribute('type', 'text');
        inputPlay2.setAttribute('id', 'inputName2');
        inputPlay2.setAttribute('class', 'inputName');
        inputPlay2.setAttribute('placeholder', 'Player Two');
        
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

    /* modal */
    modals.setAttribute('class', 'modal');
    
    const modalsContent = document.createElement('div');
    modals.appendChild(modalsContent);
    modalsContent.setAttribute('class', 'modal-content');

    const modalsContentSpan = document.createElement('span');
    modalsContent.appendChild(modalsContentSpan);
    modalsContentSpan.setAttribute('class', 'close');
    modalsContentSpan.setAttribute('onclick', 'CloseModal()')
    modalsContentSpan.innerHTML = '❌';
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
    
    dataPlayer['one'].color = colorPlay1;
    dataPlayer['two'].color = colorPlay2;   
    
    if (namePlay1 != '' || namePlay2 != '') {

        dataPlayer['one'].name = namePlay1 == '' ?  dataPlayer['one'].name : namePlay1;
        dataPlayer['two'].name = namePlay2 == '' ?  dataPlayer['two'].name : namePlay2;


    }else{
        alert('Sem dados para salvar')
    }

    


}

const limite = 6;  /* representa o numero de colunas, sendo limite a ultima coluna */
let proxLimite = limite;  /* essa variavel vai armazenar os pontos de limite de cada linha*/
let countId = 4; /* Calcula o id das linhas tranversais para que o id seja a soma dos pontos em suas extremidades */
function StartGame() {
    Layout(scoreGrid = true)
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

    
    const buttonExit = document.createElement('button');
    main.appendChild(buttonExit);
    buttonExit.setAttribute('id', 'btn-ExitGame');
    buttonExit.setAttribute('onclick', 'ExitGame()');
    buttonExit.setAttribute('class', 'buttonsTemplate')
    buttonExit.innerHTML = 'Sair';
};
function ExitGame() {
    document.location.reload(true);
}






function WinPlayerModal() {
    modals.style.display = "block";
}
function CloseModal() {
    modals.style.display = "none";
}
window.onclick = function(event) {
    if (event.target == modals) {
        modals.style.display = "none";
    }
  }


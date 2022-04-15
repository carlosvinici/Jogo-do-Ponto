
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

function ResetChecked(countClick, invalidatedChoice = false){
    if(countClick == invalidatedChoice){
        document.getElementById('InputsRadio').reset() 
    }
    else if (invalidatedChoice != false){
        document.getElementById(invalidatedChoice).checked = false; 
    }
};


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


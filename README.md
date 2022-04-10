# Jogo-do-Ponto

## Descrição 
<p align="center">O jogo do ponto é um jogo de criança, eu costumava jogar com meus colegas na época do fundamental, então porque não traze-lo para o meu git!.</p>

# Template do jogo
![image](https://user-images.githubusercontent.com/71861430/162077411-6efc9049-8869-4abe-9cdf-69b9d46568b0.png)
![image](https://user-images.githubusercontent.com/71861430/162077263-8a3deff6-b46d-4099-8550-44a031615476.png)

# Sobre 
A proposta do jogo é simples, no 1 contra 1, cada jogador vai ter que unir dois pontos, os pontos só podem ser ligados na horizontal ou na vertical.
Ao unir os quatro lados e fechar um quadrado você ganha um ponto. O objetivo do jogo é fechar os quadrados e quem fechar mais quadrados ganha. São 25 quadrados
e você pode unir os pontos que você quiser, assim você monta sua estratégia para não deixar o seu adversário fechar mais quadrados que você. 



# Tecnologias
As seguintes ferramentas foram usadas na construção do projeto:

- [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [CSS3](https://pt.wikipedia.org/wiki/CSS3#:~:text=CSS3%20%C3%A9%20a%20terceira%20mais,web%20(p%C3%A1gina%20de%20internet).)




# Status
<h4 align="center"> 
	 O projeto está pronto.
	Link para Visualizão
https://carlosvinici.github.io/Jogo-do-Ponto/
	
</h4>


# Sobre o código 
- Layout <br>
O objetivo desse projeto foi desenvolver minha lógica de programação e praticar meus estudos em javascript então tirei o foco do html, resolvi
criar todo o layout da aplicação e suas funcionalidades usando o javascript puro.
- Algoritmo <br>
Tudo se inicia no <br>

![image](https://user-images.githubusercontent.com/71861430/162596257-fbfb2061-9969-4a22-81fe-11ae0ac1405e.png) <br> 

Aqui a function StartGmae() é chamada <br>

![image](https://user-images.githubusercontent.com/71861430/162596299-c61ea71c-a55a-4152-b055-ff533c36883e.png) <br>

Ela contém dois loops onde os mesmos renderizam os inputs-radio, as linhas e os quadrados. Em todos os elementos é atribuido um id 
onde os mais importantes são os id's das linhas e dos quadrados que seram usados por outras functions durante a execução. O segundo loop renderiza 
os quadrados e além disso, a cada execução ele cria a chave do quadrado que é composta pelos id's das linhas que o fecham, a chave é armazenada no objeto 
keySquares <br>

![image](https://user-images.githubusercontent.com/71861430/162596777-565c3376-9573-405a-9945-62cba8655d36.png) <br>

Observe que eu declarei o objeto vazio mas por que? Eu pensei em deixar o jogador escolher a quantidade de pontos pois quanto mais pontos tiver mais a partida vai 
demorar. Então somente quando a function StartGame() é chamada o keySquares ganha sua estrutura, ficando assim: <br>

![image](https://user-images.githubusercontent.com/71861430/162597135-81f1106c-467d-44bc-9245-f401de401ce9.png) <br>


Ao clicar em qualquer input a function ChoiceValidation(clickedPoint) é chamada passando como parâmentro o id do ponto clicado. 
Essa function é responsável por fazer a validação dos pontos que os jogadores querem ligar, caso seja o primeiro ponto selecionado a function vai encerrar 
e esperar pela seleção do segundo ponto, quando o jogador escolher o segundo ponto e ele for válido ou seja um ponto vizinho ao primeiro selecionado. O algoritmo vai definir através da primeira e segunda escolha o id da linha que liga os pontos selecionados. <br>

![image](https://user-images.githubusercontent.com/71861430/162597592-0fac9f6d-dc92-4c81-8828-5aae5767f091.png) <br>


identificar o jogador: <br>

![image](https://user-images.githubusercontent.com/71861430/162597347-d3672e9c-acb0-4482-9cd9-50dc5bebcb5b.png) <br>

em seguida recuperar sua cor escolhida ou a cor padrão: <br>

![image](https://user-images.githubusercontent.com/71861430/162597389-0a8ff536-043d-43d4-b8de-53d6e3590c4f.png)
Obs: DataPlayer é o objeto que contém as informações basicas dos jogadores nome e cor.





### Features

- [x] Tela inicial
- [x] Formulário (nicknames e cores)
- [x] Tela do game
- [x] Validações de escolhas
- [x] Funcionalidades de cor e pontos



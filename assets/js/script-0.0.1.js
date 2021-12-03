const version = "0.0.1 Beta"

document.querySelector('#root').innerHTML = `
      <div class="header">
        <img src="./assets/img/logo_stagon.png" alt="Logo da stagon" width="50">
        <h1>Stagon Crypto</h1>
        <strong>v${version}</strong>
      </div>
      <div class="container">
        <label for="field">Digite o texto: </label>
        <input type ="text" id="field" autocomplete="off" placeholder="seu texto vai aqui" wrap="hard">
        <button id="generate">Gerar</button>
      </div>
      <div class="container">
        <label for="field">Veja a saída ou coloque o código para validar</label>
        <input type="text" id="field_exit" autocomplete="off" placeholder="Aqui onde irá sair seu texto criptografado!">
        <div><button id="validate">Validar</button>
        </div>
      </div>`
function CountingVogais(term) {
  const vogais = ['A', 'E', 'I', 'O', 'U']
  let numVogais = 0;
  const arrayTerm = term.split('');
  for (letra in arrayTerm) {
    if (vogais.includes(arrayTerm[letra].toUpperCase())) {
      numVogais++
    }
  }

  return numVogais;
}

const arrayCaracters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "/", "*", "-", "+", ".", "!", "@", "#", "$", "%", "&", "=", "?", ";", ">", "<", 'z', 'y', 'x', 'w', 'v', 'u', 't', 's', 'r', 'q', 'p', 'o', 'n', 'm', 'l', 'k', 'j', 'i', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a', " "]
const arrayCaractersInvert = ['5', 'n', 'P', 'N', 'U', '%', '9', 'D', 'k', 't', 'c', '1', 'T', 'O', 'Q', 'G', 'S', 'A', '>', 'x', '.', 'g', 'f', 'K', ';', '7', 'Y', '6', 'X', 'y', 'W', '$', '?', 'r', 'B', 'I', 'v', 'b', 'q', 'w', '@', '-', 'M', '#', 'z', '0', 'm', 'Z', 'j', 'l', 'F', 'u', 'L', 'V', 'p', '4', 'i', 'd', 'h', '!', 'a', '=', '2', 's', '8', 'H', 'J', '*', 'o', '+', '/', 'C', 'e', 'E', 'R', '3', '<', '&', " "]
const arrayCaractersInvert3 = ['A', 'v', '-', '#', 's', 'h', 'b', 'S', '6', 'U', 'i', 'n', '&', 'j', 'm', 'd', '/', 'F', 'y', 'k', 'x', '1', 'P', 'H', 'D', 'c', 'N', 'Q', 'g', '4', 'M', 'X', 'B', 'Z', '%', 'o', '=', '3', '8', 'u', 'e', 'Y', 'l', 'q', '.', '!', '+', 'J', '<', 'f', 'r', 'O', 'z', 't', 'V', 'K', '>', 'a', '?', 'W', 'E', '$', 'T', 'G', 'p', '9', 'R', 'I', '2', '*', '@', ';', '0', 'C', '7', 'w', '5', 'L', " "]
const arrayCaractersInvert5 = ['b', 'M', '2', 'Z', 'i', 'W', '#', 'I', 'P', '*', '@', 'N', '-', '0', '>', 'G', '%', '+', 'p', 'O', '<', 'w', 'C', 'J', 'm', 'X', '3', '&', 'U', 'd', 'S', 's', 'Q', 'c', 'x', 'A', 'B', 'E', 'Y', '7', 'o', '8', 'n', 'f', 'a', 't', '5', 'F', '!', 'j', 'z', 'L', '6', 'T', '.', ';', 'V', '=', 'l', '$', 'D', 'u', 'r', 'h', '1', 'g', '9', 'e', 'R', 'y', 'q', 'K', '/', 'H', '4', 'v', '?', 'k', " "]
document.querySelector('button#generate').addEventListener('click', () => {
  const term = document.querySelector('#field').value
  const lengthOfTerm = term.length
  const countVogais = CountingVogais(term)
  let termFinal = ''
  term.split('').forEach((caracter, index) => {
    let positionCaracter = arrayCaracters.indexOf(caracter)

    let positionCrip = 78 - positionCaracter

    if (index % 2 == 0) {
      termFinal += arrayCaracters[Math.ceil(positionCrip)]
    } else if (index % 3 == 0) {
      termFinal += arrayCaractersInvert3[Math.ceil(positionCrip)]
    } else if (index % 5 == 0) {
      termFinal += arrayCaractersInvert5[Math.ceil(positionCrip)]
    } else {
      termFinal += arrayCaractersInvert[Math.ceil(positionCrip)]
    }
  })
  document.querySelector('#field_exit').value = termFinal
})
document.querySelector('button#validate').addEventListener('click', () => {

  const arrayTermFinal = document.querySelector('#field_exit').value.split('')
  let termFinal2 = ''
  arrayTermFinal.forEach((caracter, index) => {
    let positionCrip = 0
    if (index % 2 == 0) {
      positionCrip = arrayCaracters.indexOf(caracter)
    } else if (index % 3 == 0) {
      positionCrip = arrayCaractersInvert3.indexOf(caracter)
    } else if (index % 5 == 0) {
      positionCrip = arrayCaractersInvert5.indexOf(caracter)
    } else {
      positionCrip = arrayCaractersInvert.indexOf(caracter)
    }
    let positionCaracter = 78 - positionCrip
    termFinal2 += arrayCaracters[Math.ceil(positionCaracter)]

  })
  document.querySelector('#field').value = termFinal2
})
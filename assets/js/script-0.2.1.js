// Versão 0.2.0 Beta
/**
 * O código foi refatorado, de modo que agora nessa versão foram adicionadas funções para que as funcionalidades possam ser usadas sem necessidade de duplicação de código
 * Também foi modificada a função getArray que agora é getIndexVetorSelected onde na regra de cálculo foram adicionada uma nova fórmula, porque na anterior o zero e o 1 do código não tinha efeito no cálculo final
 * Foi implementado um parte que impede que o sistema gere códigos com " " espaço como primeiro caracter
 * Foi implementado uma condição que se caso a busca pelo caracter retornar undefined o undefined não será adicionado os termos, eliminando o risco de códigos saírem errados por conta disto
 */
// Versão 0.2.1 Beta
/**
 * O script que prevenia o erro com caracteres não suportados estava gerando erros na hora de descriptografar, este erro foi corrigido
*/
const version = "0.2.1 Beta"

document.querySelector('#root').innerHTML = `
<div class="header">
<img src="./assets/img/logo_stagon.png" alt="Logo da stagon" width="50">
<h1>Stagon Crypto</h1>
<strong>v${version}</strong>
</div>
<div class="container">
    <label for="code">Digite o código de autenticação:</label>
    <input type="number" id="code" max="9999" min="0" autocomplete="off" placeholder="xxxx">
    <div class="count_characters">
      <span class="characters_now">0</span>/4
    </div>
    <label for="field">Digite o texto:</label>
    <textarea cols="12" id="field" maxlength="5000" autocomplete="off" placeholder="Seu texto vai aqui" wrap="hard"></textarea>
    <div class="count_characters">
      <span class="characters_now">0</span>/5000
    </div>
    <button id="generate">Encriptografar</button>
  </div>
  <div class="container">
    <label for="field">Veja a saída ou coloque o código para descriptografar</label>
    <input type="text" id="field_exit" autocomplete="off" placeholder="Aqui onde irá sair seu texto criptografado!">
    <div><button id="validate">Descriptografar</button>
      <button id="copy">Copiar</button>
    </div>
    <p id="exit"></p>
  </div>`

function getIndexVetorSelected(c, selectedVetor, sizeTerm) {
  const code = c
    .reduce(function (total, num) {
      if (num != 0) {
        return total * num * sizeTerm * c.length;
      } else if (total != 0) {
        return total * sizeTerm * c.length;
      } else {
        return sizeTerm * c.length;
      }
    })
    .toString()
    .split("");

  let selectVetor = selectedVetor;
  if (selectVetor < code.length - 1) {
    selectVetor++;
  } else {
    selectVetor = 0;
  }
  return parseInt(code[selectVetor]);
}

function getCharacters(selectVetor) {
  const characters = [
    ["A", "Â", "Ã", "Á", "À", "a", "â", "ã", "á", "à", "B", "b", "C", "Ç", "c", "ç", "D", "d", "E", "Ê", "É", "e", "ê", "é", "F", "f", "G", "g", "H", "h", "I", "Í", "i", "í", "J", "j", "K", "k", "L", "l", "M", "m", "N", "Ñ", "n", "ñ", "O", "Ô", "Õ", "Ó", "o", "ô", "õ", "ó", "P", "p", "Q", "q", "R", "r", "S", "s", "T", "t", "U", "Ú", "Ù", "u", "ú", "ù", "V", "v", "W", "w", "X", "x", "Y", "y", "Z", "z", " ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "'", '"', "!", "@", "#", "$", "%", "&", "*", "(", ")", "_", "-", "+", "=", "`", "´", "{", "[", "ª", "]", "}", "°", "^", "~", ":", ";", "/", "?", "<", ",", ">", ".", "|", "\\"],
    ["W", "M", "P", ":", "2", "é", "ú", "]", "Ú", "q", "_", "Q", "Ã", "3", "E", "h", "j", "Õ", "I", "0", ",", "4", "F", "n", "r", "b", "ª", "v", "º", "H", ";", "c", ")", "f", "S", "ô", "5", "d", "â", "Ô", "ç", "Z", "(", "À", "-", "#", "'", "Á", ">", "p", "<", "Y", "&", "|", "}", "8", "õ", "@", "?", "`", "Ñ", "à", "m", "Ç", "k", ".", "B", "[", "á", "ã", "T", "$", "C", "z", "%", "=", "Í", "N", "+", "w", "É", "s", "ù", "o", "A", "~", "Ù", "K", "V", "u", "\\", "l", "{", "ó", "i", "L", '"', "y", "ñ", "g", "Ê", "^", "6", "ê", "*", " ", "´", "U", "t", "Â", "X", "e", "x", "R", "1", "J", "D", "Ó", "í", "O", "a", "!", "9", "G", "7", "/"],
    ["i", "f", "5", "I", ")", "x", "F", "^", "A", "E", "w", "_", "Á", "À", "C", "a", "0", "o", "*", "+", "Ã", "N", "}", "l", "2", "ª", "[", "b", "Y", "ó", "Õ", "]", "v", "{", ">", "ê", "Â", "Ù", "X", "S", "ç", "Ñ", "3", "$", "é", "d", "â", "-", "e", "6", "9", "#", "ô", "P", "q", "V", "í", "s", "ù", "(", "7", "u", "/", "D", "M", "H", "K", "W", "?", "h", "ú", "=", "É", "\\", ".", "<", "m", "Ó", "c", "~", ";", "'", "!", "R", "Ê", "B", "Ô", "j", "ñ", "t", "Í", "õ", "k", "|", "O", "U", "%", "8", "Ç", "´", " ", "Q", "Ú", "º", "&", ":", "á", "z", "Z", "p", "L", "4", "y", "r", "`", "ã", "T", "@", "n", '"', "J", "G", "g", "1", "à", ","],
    ["I", "8", "3", "ª", "Í", "í", "O", "[", "#", "o", "À", "@", ",", "^", "5", "%", "ê", "ú", "D", "é", "Q", "6", "ç", ":", "x", "G", "ù", '"', "(", "º", "q", "2", ">", "W", "g", "n", "N", "h", "P", "á", "ñ", "=", "ã", "i", "s", "Ù", "Ã", "v", "{", "k", "d", "B", "Ê", ";", "T", "l", "X", "/", "!", "Ó", ".", "U", "c", "e", "j", "t", "M", "Ú", "Y", "Ô", "}", "m", "?", "$", "õ", "à", "É", "9", "_", "â", "ó", "w", "<", "Ñ", "~", "b", "\\", "+", "H", "p", "y", "a", "R", "4", "f", "0", "`", "S", "r", "|", "F", "A", "K", "]", "J", ")", "Á", "&", "L", "´", "C", "Õ", " ", "Ç", "1", "Z", "z", "V", "Â", "u", "'", "E", "*", "7", "-", "ô"],
    ["*", "X", "[", "C", "|", "m", "}", "P", "À", "i", "s", "B", "$", "u", "E", "`", "v", "c", "H", "_", "R", "Z", "í", "3", "k", "W", "A", "Ô", ":", "M", "J", "t", "f", "#", "Ó", "ê", "y", "Õ", "D", "Ñ", "^", "0", "K", "à", ">", "N", "&", "I", "(", "8", " ", "j", "b", "õ", "5", "~", "Á", "a", "+", '"', "Q", "/", ")", "â", "ô", "6", "=", ",", "ç", "G", "?", "l", "9", "d", "É", "ú", ".", "O", "Ê", "Ù", "4", "ù", "<", "x", "e", "L", "á", "Ú", "U", "º", "ª", "'", "ó", "ã", "7", "h", "n", "g", "Í", ";", "@", "T", "´", "S", "q", "V", "ñ", "Ã", "w", "Ç", "z", "-", "p", "1", "Â", "é", "Y", "o", "F", "\\", "%", "r", "2", "!", "]", "{"],
    ["}", ")", "6", "j", "ç", "d", "y", "á", "í", "k", "P", "u", "1", "3", "n", "t", "#", "&", "ê", "!", "W", "ù", "Â", "f", "a", "Ó", "l", "A", "|", "À", "V", "Ù", "R", "0", "[", "%", "+", "É", "Ã", "ó", "õ", "ª", "~", ",", "Ú", "E", "G", "z", "?", "{", "`", "Í", "e", "º", "b", " ", "c", "M", "i", "p", "D", "ñ", "H", "9", "]", "N", ">", ":", "à", "Ê", "x", "=", "J", "O", "â", "$", "s", "Ô", "/", "g", "Y", "<", "Ç", "Õ", "4", "X", "q", "U", ";", "´", "7", "K", "ô", "é", "m", "Z", "L", "r", "C", "-", "v", "B", "@", "5", "_", "I", "*", "8", "S", "Ñ", "h", "Q", "^", "Á", "T", "ã", "2", "\\", "w", "ú", ".", "F", "(", "o", '"', "'"],
    ["M", "h", "4", "8", "_", "ª", "A", "l", "U", "#", "N", "Á", "$", "'", "-", "+", "m", "ù", "À", "2", "1", "V", "w", "`", "3", "g", "º", "Ñ", "y", "F", "ã", "n", "[", "%", "Ê", "=", "R", "5", "à", "p", "e", "/", "<", "O", "Q", "q", "ô", "ê", "I", "T", "E", ")", "s", "Ù", "6", "K", "{", "í", "|", ".", "õ", "r", '"', "ú", "t", "Õ", "Ç", "ó", "ç", "Ã", "u", "z", "!", "Â", "b", "G", "X", "@", "f", "H", "Y", "&", "É", " ", "Ô", "j", "S", "c", "a", "*", "(", "D", "7", "é", "v", ">", ",", "L", "J", "Z", "W", "~", ":", "d", "\\", "0", "}", "C", "â", "Ú", "Í", "P", "Ó", "´", "^", "i", ";", "á", "k", "9", "o", "?", "ñ", "]", "x", "B"],
    ["h", "Ç", "|", "Ù", "D", "c", "P", "É", "7", "l", "d", "#", "4", "?", "*", "2", "f", "i", ")", "j", "A", "]", "U", "@", "E", "ñ", "ú", "º", "V", "H", "w", "p", "ç", "!", "5", "é", ":", "+", "%", "m", "q", "í", "Ú", "b", "t", "R", "T", "y", " ", "C", "â", "3", "F", "M", "8", "$", "J", "O", "Ñ", "\\", "á", "Â", ">", "9", "`", "u", "Í", "~", "Õ", "Y", "Á", "&", "1", "(", "/", "G", "´", "N", "B", "6", "a", "'", "g", "Ó", "0", "ê", ";", "K", ".", "ã", "<", "À", "I", "s", "z", "n", "Q", "L", "x", "v", "-", "^", "e", "o", "W", ",", "ô", "Z", "Ô", "õ", "Ê", '"', "[", "X", "=", "Ã", "ù", "à", "S", "{", "r", "k", "_", "ª", "ó", "}"],
    ["_", "`", "?", "\\", "b", "ñ", "t", "[", "%", "(", '"', ")", "H", "'", "k", "3", "J", "+", "1", "F", "8", "ê", "Ê", "/", "7", "T", "U", "i", "*", ".", "^", "N", "Z", "&", "5", "$", "q", "á", "ã", "I", "X", "õ", "ô", "S", "#", "4", "j", "Á", " ", ":", "Ù", ",", "c", "M", "À", "u", "ç", "K", "Í", "Ç", "s", "}", "D", "0", "9", "f", "Q", "à", "@", ">", "-", "V", "a", "Ñ", "g", "Ú", "~", "ª", "P", "d", "L", "6", "G", "B", "l", "2", "r", "É", "R", "v", "y", "ú", "<", "|", ";", "E", "z", "w", "h", "é", "C", "A", "]", "O", "m", "ù", "ó", "=", "Â", "º", "!", "{", "Õ", "Ã", "e", "â", "Y", "W", "n", "Ô", "x", "´", "p", "í", "o", "Ó"],
    ["Ó", '"', "i", "B", "k", "G", "=", "Ê", "{", "<", "ç", "4", "á", ",", "r", "`", "j", "l", "C", "2", "M", "#", "Ù", "Ú", "Ç", "E", "!", "ù", "º", "Ñ", "]", "@", "'", ";", "à", "í", "/", "9", "Ô", "ª", "J", "e", "Ã", "s", "8", "L", "´", "X", "[", "R", "T", "c", "é", "v", "+", "n", "o", "Â", "w", "%", " ", ":", "u", "~", "À", "m", ".", "g", "(", "*", "U", "ã", "0", "1", "5", "W", "6", "S", "z", "Õ", "&", "ó", "V", "Z", "}", "t", "h", "D", "Í", "a", "ê", ">", "_", "ô", "K", "â", "P", "?", "I", "O", "7", "ú", "d", "q", "x", "f", "\\", "b", "Q", "N", "ñ", "p", "F", "A", "-", ")", "H", "|", "Y", "^", "y", "Á", "$", "É", "3", "õ"]
  ];

  if (selectVetor == 0) {
    return characters[0];
  } else if (selectVetor == 1) {
    return characters[1];
  } else if (selectVetor == 2) {
    return characters[2];
  } else if (selectVetor == 3) {
    return characters[3];
  } else if (selectVetor == 4) {
    return characters[4];
  } else if (selectVetor == 5) {
    return characters[5];
  } else if (selectVetor == 6) {
    return characters[6];
  } else if (selectVetor == 7) {
    return characters[7];
  } else if (selectVetor == 8) {
    return characters[8];
  } else if (selectVetor == 9) {
    return characters[9];
  }
}

function getLengthVetorCharacters() {
  return getCharacters(0).length;
}

function encrypt(term, c) {
  const charactersOfTerm = term.split("");
  const code = c.split("");
  let termEncrypted = "";
  let selectVetor = 0;
  charactersOfTerm.forEach((caracter, index) => {
    selectVetor = getIndexVetorSelected(
      code,
      selectVetor,
      charactersOfTerm.length
    );
    let positionCaracter = getCharacters(0).indexOf(caracter) >= 0 ? getCharacters(0).indexOf(caracter) : getCharacters(0).indexOf(" ");
    let positionCharacterCrypt = getLengthVetorCharacters() - positionCaracter - 1;
    console.log(selectVetor)
    if (getCharacters(selectVetor)[positionCharacterCrypt] === " " && (index === 0 || index === charactersOfTerm.length - 1)) {
      return false;
    } else {
      termEncrypted += getCharacters(selectVetor)[positionCharacterCrypt]
    }
  });

  return termEncrypted;
}

function decrypt(termEncrypted, c) {
  const charactersOfTermEncrypted = termEncrypted.split("");
  const code = c.split("");
  let selectVetor = 0;
  let termDecrypted = "";
  charactersOfTermEncrypted.forEach((caracter, index) => {
    selectVetor = getIndexVetorSelected(
      code,
      selectVetor,
      charactersOfTermEncrypted.length
    );
    let positionCharacterCrypt = getCharacters(selectVetor).indexOf(caracter);
    let positionCaracter =
      getLengthVetorCharacters() - positionCharacterCrypt - 1;
    termDecrypted += getCharacters(0)[positionCaracter];
  });
  return termDecrypted;
}
document.querySelector("button#generate").addEventListener("click", () => {
  if (document.querySelector("#code").value == "" || document.querySelector("#code").value.length < 4) {
    document.querySelector("#code").focus();
    alert("Por favor, insira o código de autenticação completo!");
  } else {
    const term = document.querySelector("#field").value;
    const code = document.querySelector("#code").value;
    if (!!encrypt(term, code)) {
      document.querySelector("#field_exit").value = encrypt(term, code);
    } else {
      alert(
        "Opa! Ocorreu um erro ao criptografar seu texto 😥\nNossa equipe já está trabalhando para resolver, mas por enquanto você pode tentar com outro código 😉"
      );
      document.querySelector("#code").focus();
    }
  }
  document.querySelector("#exit").innerHTML = "";
});

document.querySelector("button#validate").addEventListener("click", () => {
  if (document.querySelector("#code").value == "" || document.querySelector("#code").value.length < 4) {
    document.querySelector("#code").focus();
    alert("Por favor, insira o código de autenticação completo!");
  } else {
    const termEncrypted = document.querySelector("#field_exit").value;
    const code = document.querySelector("#code").value;
    document.querySelector(
      "#exit"
    ).innerHTML = `<p>Texto descriptografado: </p><mark>${decrypt(
      termEncrypted,
      code
    )}</mark>`;
  }
});

document.querySelector("button#copy").addEventListener("click", () => {
  document.querySelector("#field_exit").select();
  document.execCommand("copy");
  alert("Pronto! Texto copiado 🤩");
});

document.querySelector("#field").addEventListener("input", function () {
  document.querySelectorAll(".characters_now")[1].innerHTML = this.value.length;
});

document.querySelector("#code").addEventListener("input", function () {
  if (this.value.length > this.getAttribute("placeholder").length) {
    this.value = this.value.slice(0, this.getAttribute("placeholder").length);
  }
  document.querySelectorAll(".characters_now")[0].innerHTML = this.value.length;
});

document
  .querySelector("#field_exit")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.querySelector("button#validate").click();
    }
  });

document.querySelector("#field_exit").addEventListener("focus", function () {
  this.select();
});

document.querySelector("#code").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    if (document.querySelector("#field").value !== "") {
      document.querySelector("button#generate").click();
    } else if (document.querySelector("#field_exit").value !== "") {
      document.querySelector("button#validate").click();
    } else {
      if (this.value != "") {
        document.querySelector("#field").focus();
      } else {
        document.querySelector("button#generate").click();
      }
    }
  }
});

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
  if (this.value.length > this.getAttribute("maxlength")) {
    this.value = this.value.slice(0, this.getAttribute("max"));
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

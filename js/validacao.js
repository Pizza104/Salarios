(() => {
  "use strict";
  const form = document.querySelector("#formExemplo");
  const result = document.querySelector("#validationResult");
  const output = document.querySelector("#txtresultado");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    form.classList.add("was-validated");
    if (!form.checkValidity()) {
      form.querySelector(":invalid")?.focus();
      result.classList.add("d-none");
      return;
    }

    const name = document.querySelector("#txtnome").value.trim();
    const age = document.querySelector("#txtidade").value;
    const email = document.querySelector("#txtemail").value.trim();
    const objective = document.querySelector("#txtobjetivo").value;
    output.textContent = `${name}, seu formulário foi validado. Objetivo: ${objective}. E-mail informado: ${email}. Idade: ${age}. Nenhum dado foi enviado a um servidor.`;
    result.classList.remove("d-none");
    result.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      form.classList.remove("was-validated");
      result.classList.add("d-none");
    }, 0);
  });

  const year = document.querySelector("#ano-atual");
  if (year) year.textContent = new Date().getFullYear();
})();

(() => {
  "use strict";

  const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const salaryForm = document.querySelector("#salaryForm");
  const salarySummary = document.querySelector("#salary-summary");
  const salaryRows = document.querySelector("#salary-breakdown");
  const simpleForm = document.querySelector("#simpleCalcForm");
  const simpleResult = document.querySelector("#simple-result");

  function addBreakdownRow(label, amountCents, isDeduction = false) {
    const row = document.createElement("tr");
    const component = document.createElement("th");
    component.scope = "row";
    component.textContent = label;
    const amount = document.createElement("td");
    amount.className = `text-end ${isDeduction ? "text-danger" : ""}`;
    amount.textContent = `${isDeduction ? "− " : ""}${money.format(amountCents / 100)}`;
    row.append(component, amount);
    salaryRows.appendChild(row);
  }

  salaryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    salaryForm.classList.add("was-validated");
    if (!salaryForm.checkValidity()) {
      salaryForm.querySelector(":invalid")?.focus();
      salarySummary.classList.add("d-none");
      return;
    }

    const name = document.querySelector("#nome").value.trim();
    const age = Number(document.querySelector("#idade").value);
    const grossCents = Math.round(Number(document.querySelector("#salario").value) * 100);
    const dependents = Number(document.querySelector("#dependentes").value);
    if (
      !name ||
      !Number.isSafeInteger(grossCents) ||
      grossCents < 1 ||
      !Number.isInteger(age) ||
      !Number.isInteger(dependents)
    )
      return;

    const inssCents = Math.round(grossCents * 0.08);
    const transportCents = Math.round(grossCents * 0.05);
    const ageBonusCents = age > 50 ? 30000 : 20000;
    const dependentBonusCents = dependents * 5000;
    const netCents = grossCents - inssCents - transportCents + ageBonusCents + dependentBonusCents;

    document.querySelector("#salary-person-name").textContent = name;
    document.querySelector("#salary-result-value").textContent = money.format(netCents / 100);
    salaryRows.replaceChildren();
    addBreakdownRow("Salário bruto", grossCents);
    addBreakdownRow("Desconto demonstrativo (8%)", inssCents, true);
    addBreakdownRow("Transporte demonstrativo (5%)", transportCents, true);
    addBreakdownRow(`Bônus de idade (${age > 50 ? "acima de 50" : "até 50 anos"})`, ageBonusCents);
    addBreakdownRow(`Adicional demonstrativo (${dependents} dependentes)`, dependentBonusCents);
    addBreakdownRow("Salário líquido demonstrativo", netCents);
    document.querySelector("#salary-model-note").textContent =
      "Modelo fixo para a aula: 8% + 5% de descontos, bônus de idade e R$ 50 por dependente. Não representa legislação ou folha salarial real.";
    salarySummary.classList.remove("d-none");
    salarySummary.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  salaryForm.addEventListener("reset", () => {
    window.setTimeout(() => {
      salaryForm.classList.remove("was-validated");
      salarySummary.classList.add("d-none");
    }, 0);
  });

  simpleForm.addEventListener("submit", (event) => {
    event.preventDefault();
    simpleForm.classList.add("was-validated");
    if (!simpleForm.checkValidity()) {
      simpleForm.querySelector(":invalid")?.focus();
      simpleResult.classList.add("d-none");
      return;
    }

    const baseCents = Math.round(Number(document.querySelector("#txtvalor").value) * 100);
    const discountCents = Math.round(Number(document.querySelector("#txtdesconto").value || 0) * 100);
    const fineCents = Math.round(Number(document.querySelector("#txtmulta").value || 0) * 100);
    const totalCents = baseCents - discountCents + fineCents;
    if (
      ![baseCents, discountCents, fineCents, totalCents].every(Number.isSafeInteger) ||
      baseCents < 1 ||
      discountCents < 0 ||
      fineCents < 0
    )
      return;

    document.querySelector("#txtresultado").textContent = `Total calculado: ${money.format(totalCents / 100)}`;
    const message =
      totalCents < 0
        ? "O desconto ultrapassa o valor inicial, mesmo com a multa."
        : totalCents === 0
          ? "O valor final ficou zerado."
          : "Cálculo demonstrativo concluído.";
    document.querySelector("#txtmsg").textContent = message;
    simpleResult.classList.remove("d-none");
  });

  simpleForm.addEventListener("reset", () => {
    window.setTimeout(() => {
      simpleForm.classList.remove("was-validated");
      simpleResult.classList.add("d-none");
    }, 0);
  });

  const year = document.querySelector("#ano-atual");
  if (year) year.textContent = new Date().getFullYear();
})();

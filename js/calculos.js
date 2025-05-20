$("#calcular").click(function () { }); $(document).ready(function () {
    // Função para o botão Calcular
    $("#calcular").click(function () {
        const valor = parseFloat($("#txtvalor").val()) || 0;
        const desconto = parseFloat($("#txtdesconto").val()) || 0;
        const multa = parseFloat($("#txtmulta").val()) || 0;

        const resultado = valor - desconto + multa;
        const mensagem = resultado > 0 ? "Valor positivo" : "Valor negativo ou zero";

        // Exibe os resultados nos elementos de alerta
        $("#txtresultado").html("Resultado: R$ " + resultado.toFixed(2));
        $("#txtmsg").html("Mensagem: " + mensagem);
    });

    // Cálculo do salário (mantido do código original, mas modificado para exibir nos alertas)
    $("#salaryForm").submit(function (e) {
        e.preventDefault();

        const nome = $("#nome").val();
        const idade = parseInt($("#idade").val());
        const salarioBruto = parseFloat($("#salario").val());
        const dependentes = parseInt($("#dependentes").val());

        const bonusIdade = idade > 50 ? 300 : 200;
        const inss = salarioBruto * 0.08;
        const valeTransporte = salarioBruto * 0.05;
        const valorDependentes = dependentes * 50;
        const salarioLiquido = salarioBruto - inss - valeTransporte + bonusIdade + valorDependentes;

        // Exibe o resultado no alerta de sucesso (originalmente era um alert())
        $("#txtfatorial").html(`
            Nome: ${nome}<br>
            Dependentes: ${dependentes}<br>
            Salário Bruto: R$ ${salarioBruto.toFixed(2)}<br>
            INSS: R$ ${inss.toFixed(2)}<br>
            Vale Transporte: R$ ${valeTransporte.toFixed(2)}<br>
            Salário Líquido: R$ ${salarioLiquido.toFixed(2)}
        `);
    });
});
$(function () {
  let cssAlternado = false;
  let classeAlternada = false;

  $("#esconder").on("click", function () {
    $("#teste1").stop(true, true).fadeOut(180);
  });

  $("#mostrar").on("click", function () {
    $("#teste1").stop(true, true).fadeIn(180);
  });

  $("#alterarCSS").on("click", function () {
    cssAlternado = !cssAlternado;
    $("#teste2")
      .toggleClass("demo-highlight", cssAlternado)
      .find("i")
      .toggleClass("bi-lightning-charge-fill", cssAlternado);
    $(this).text(cssAlternado ? "Restaurar estilo" : "Alternar destaque");
  });

  $("#alterarClass").on("click", function () {
    classeAlternada = !classeAlternada;
    const alertClass = classeAlternada ? "alert-primary" : "alert-success";
    const buttonClass = classeAlternada ? "btn-primary" : "btn-success";
    $("#teste3").toggleClass("alert-success alert-primary");
    $("#teste3 strong").text(classeAlternada ? "primary" : "success");
    $(this)
      .toggleClass("btn-success btn-primary")
      .text(classeAlternada ? "Voltar à cor verde" : "Alternar cor do alerta");
    $("#teste3").attr("data-variant", alertClass);
    $(this).attr("data-variant", buttonClass);
  });

  $("#alternar1").on("click", function () {
    $("#link")
      .attr({ href: "https://www.cps.sp.gov.br/", title: "Centro Paula Souza" })
      .text("Centro Paula Souza (CPS)");
    $(this).prop("disabled", true);
    $("#alternar2").prop("disabled", false);
  });

  $("#alternar2").on("click", function () {
    $("#link").attr({ href: "https://fatecid.com.br/", title: "Fatec Indaiatuba" }).text("Fatec Indaiatuba");
    $(this).prop("disabled", true);
    $("#alternar1").prop("disabled", false);
  });
});

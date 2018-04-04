var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      $("#conditions").html("<b>Пример 1.13</b> Другим примером нормы в $\V_3$ может служить \\[{\\left\\| {\\bar x} \\right\\|_\\infty } = \\max \\left( {\\left| {{x_1}} \\right|,\\left| {{x_2}} \\right|,\\left| {{x_3}} \\right|} \\right)\\]");
      var algorithm = ""    
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 1.13");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
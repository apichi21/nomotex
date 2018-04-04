var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      $("#conditions").html("<b>Пример 1.12</b> Однако, в $\V_3$ можно определить норму вектора по-другому:\\({\\left\\| {\\bar x} \\right\\|_1} = \\left| {{x_1}} \\right| + \\left| {{x_2}} \\right| + \\left| {{x_3}} \\right|\\),(докажите, что для этого определения тоже выполняются все три аксиомы нормы).");
      var algorithm = ""    
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 1.12");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
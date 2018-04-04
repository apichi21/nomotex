var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      $("#conditions").html("<b>Пример 1.14</b> Все эти определения обобщаются еще одним примером нормы \\({\\left\\| {\\bar x} \\right\\|_p} = {\\left( {{{\\left| {{x_1}} \\right|}^p} + {{\\left| {{x_2}} \\right|}^p} + {{\\left| {{x_3}} \\right|}^p}} \\right)^{1/p}}\\), где \\(p \\ge 1\\); Норма \\({\\left\\| {\\bar x} \\right\|_\\infty }\\) получается из этого соотношения предельным переходом при \\(p \\to \\infty \\). Естественно, все эти определения можно перенести на пространства \\({\\mathbb{R}^n}\\) и $C([a,b])$");
      var algorithm = ""    
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 1.14");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
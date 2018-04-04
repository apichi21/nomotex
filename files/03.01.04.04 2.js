var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      $("#conditions").html("<b>Пример 1.8.</b> Рассмотрим линейное пространство многочленов  степени не выше \\(k\\)(см. <b>пример 1.3</b>).<br> Каждый из векторов этого пространства имеет вид \\({P_k}\\left( x \\right) = {a_0}{x^k} + {a_1}{x^{k - 1}} + ... + {a_{k - 1}}x + {a_k}\\), то есть является линейной комбинацией векторов системы \\({x^k},{x^{k - 1}},...,x,1\\).<br> Эта система линейно независима, так как ни один её вектор нельзя представить как линейную комбинацию остальных.<br> Следовательно, она является базисом данного пространства и \\(\\dim P = k + 1\\).");
    var algorithm = ""
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 1.8");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
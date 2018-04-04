var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    $("#conditions").html("<b>Пример 1.3.</b> Является ли множество многочленов степени, не превосходящей $k$, линейным пространством?");
    var algorithm = "<b>Решение.</b> Дано множество $P$={$\\bar p:\\bar p=\P_m(x),0 \\leq m \\leq k$}. Сумма двух любых векторов этого множества $\\bar p_1\\in{P},\\bar p_2\\in{P}$- есть новый многочлен, степень которого не выше $k$.Таким образом, $\\bar p_1+\\bar p_2$ - вектор, принадлежащий нашему множеству $P$.<br>Произведение вектора на число $\\alpha\\bar p$- новый многочлен, степень которого равна либо $m$, либо 0, если $\\alpha=0$, итак, \\(\\alpha \\bar p \\in{P}\\).<br><b>Ответ</b>: Множество многочленов степени, не превосходящей $k$, является линейным пространством."
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 1.3");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
var conditions = "<h3>Пример 5.1.</h3> Рассмотрим множество свободных геометрических векторов, принадлежащих плоскости $V=\\left\\{ \\bar{x}:\\bar{x}\\in \\pi \\right\\}$ и линейный оператор поворота этой плоскости на угол $\\varphi $ относительно некоторой точки О. Выясним, в чём заключается действие сопряжённого оператора.";
      $("#conditions").html(conditions);
      var algorithm = "<h3>Решение</h3> Выберем ортонормированный базис $\\left\\{ {{{\\bar{e}}}_{1}},{{{\\bar{e}}}_{2}} \\right\\}$. Матрица данного оператора  $$A=\\left( \\begin{matrix} \\cos \\varphi & -\\sin \\varphi \\\\ \\sin \\varphi & \\cos\\varphi \\\\ \\end{matrix} \\right)$$(см. пример 3.7). <br>Сопряжённый оператор имеет в этом базисе матрицу $$A*={{A}^{T}}=\\left( \\begin{matrix} \\cos \\varphi & \\sin \\varphi \\\\ -\\sin \\varphi & \\cos\\varphi \\\\ \\end{matrix} \\right).$$ Откуда следует, что образы исходных базисных векторов: $\\begin{matrix} {{{\\tilde{A}}}^{*}}{{{\\bar{e}}}_{1}}={{{\\bar{e}}}_{1}}^{\\prime \\prime }=\\left( \\cos \\varphi ,-\\sin \\varphi \\right), {{{\\tilde{A}}}^{*}}{{{\\bar{e}}}_{2}}={{{\\bar{e}}}_{2}}^{\\prime \\prime }=\\left( \\sin\\varphi ,\\cos\\varphi \\right) \\end{matrix}.$ Из рис. видим, что сопряжённым относительно данного является оператор поворота плоскости на угол $\\left( -\\varphi \\right)$.";
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 5.1");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
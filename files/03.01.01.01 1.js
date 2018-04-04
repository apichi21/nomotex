var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    $("#conditions").html("<b>Пример 1.1.</b>  Убедиться в том, что множество геометрических векторов $\V_3$ является линейным пространством");
    var algorithm = "<b>Решение.</b> Действительно,если $\\bar x\\in{\V_3},\\bar y\\in{\V_3}$,то сумма векторов \\(\\bar x + \\bar y = {\\bar z_1}\\)\\(\\) есть новый вектор этого же пространства. И произведение $\\lambda\\bar x=\\bar z_2$- тоже новый вектор пространства  $\V_3$.<br>Аксиомы линейного пространства в пространстве $\V_3$ есть свойства линейных операций с векторами.<br>Аналогично можно показать,что пространства всех попарно коллинеарных векторов $\V_1$ и всех векторов $\V_2$ ,компланарных одной плоскости являются линейными."
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 1.1");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
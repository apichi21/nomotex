var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    $("#conditions").html("<b>Пример 1.2.</b> Является ли множество функций $y=f(x)$, непрерывных на некотором отрезке $x\\in{[a,b]}$, линейным пространством?");
    var algorithm = "<b>Решение.</b> Если две функции непрерывны на отрезке $x\\in{[a,b]}$, то их сумма есть функция, непрерывная на этом отрезке, и произведение непрерывной функции на число есть непрерывная функция.<br>Аксиомы линейного пространства в этом случае есть свойства линейных операций с непрерывными на отрезке $x\\in{[a,b]}$ функциями.<br><b>Ответ</b>: Множество функций с операциями сложения функций и умножения функции на число является линейным пространством и обозначается $C[a,b]$."
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 1.2");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
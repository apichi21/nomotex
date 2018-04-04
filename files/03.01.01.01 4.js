var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    $("#conditions").html("<b>Пример 1.4.</b> Выяснить, является ли линейным пространством множество матриц одного и того же размера?");
    var algorithm = "<b>Решение.</b> Суммой двух матриц одного размера является матрица того же самого размера.<br> Произведение матрицы на число есть матрица того же размера.<br>Свойства линейных операций с матрицами совпадают с аксиомами линейного пространства.<br><b>Ответ:</b> данное множество является линейным пространством."
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 1.4");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
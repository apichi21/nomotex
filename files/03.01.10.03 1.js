var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      $("#conditions").html("<b>Пример 3.5</b> Матрицей тождественного оператора в любом базисе является единичная матрица.<br>Действительно, из определения \\(\\tilde I\\bar x = \\bar x\\) следует, что в любом базисе выполняется матричное равенство \\(IX = X\\), из которого следует, что матрица данного оператора \\(I = E\\).");
      var algorithm = ""    
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 3.5");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
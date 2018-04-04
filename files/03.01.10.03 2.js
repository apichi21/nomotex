var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      $("#conditions").html("<b>Пример 3.6</b> Матрицей нулевого оператора в любом базисе является нулевая матрица. ");
      var algorithm = ""    
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 3.6");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      $("#conditions").html("<b>Пример 2.3</b>Линейное пространство арифметических векторов \\[{\\mathbb{R}^n} = \\left\\{ {\\bar x:\\bar x = \\left( {{x_1},{x_2},...,{x_n}} \\right);\\;{x_i} \\in R;i = 1,n} \\right\\}\\] является  евклидовым пространством, если скалярное произведение любых двух его векторов определено следующим образом\\(\\left( {\\bar x,\\bar y} \\right) = {x_1}{y_1} + {x_2}{y_2} + ... + {x_n}{y_n}\\) ");
      var algorithm = ""    
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 2.3");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
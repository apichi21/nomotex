var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      $("#conditions").html("<b>Пример 1.11</b> В пространстве $\V_3$ геометрических векторов можно определить норму вектора \\[\\bar x = {x_1}\\bar i + {x_2}\\bar j + {x_3}\\bar k\\] как длину: \\(\\left\\| x \\right\\| = \\sqrt {{x_1}^2 + {x_2}^2 + {x_3}^2} \\).Легко убедиться, что для определенной таким образом нормы все три свойства определения выполняются. Эту норму принято называть <b>евклидовой</b>.");
      var algorithm = ""    
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 1.11");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
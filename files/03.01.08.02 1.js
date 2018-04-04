var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      $("#conditions").html("<b>Пример 2.1</b>. Пространство геометрических векторов $\V_3$  с определённым в нём обычным образом скалярным произведением $(\\bar x,\\bar y)=|x||y|\\cos{(\\bar x,\\bar y)}$  является евклидовым. В данном примере аксиомы скалярного произведения совпадают со свойствами скалярного произведения геометрических векторов.");
      var algorithm = ""    
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 2.1");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
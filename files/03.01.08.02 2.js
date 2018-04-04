var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      $("#conditions").html("<b>Пример 2.2</b>.Линейное пространство $C[a,b]$(множество непрерывных на отрезке $x\\in{[a,b]}$ функций) становится евклидовым, если определить скалярное произведение его векторов следующим образом: $(\\bar f,\\bar g)=\\int_{a}^{b} f(x)g(x) dx$<br>Аксиомы евклидова пространства совпадают  в данном случае со свойствами определённого интеграла.");
      var algorithm = ""    
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 2.2");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
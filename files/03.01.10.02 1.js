var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      $("#conditions").html("<b>Пример 3.2</b> Рассмотрим ЛП-во \\(C\\left[ {a,b} \\right]\\). Зададим в нём оператор дифференцирования функций \\(\\tilde A\\): \\(\\frac{{df\\left( x \\right)}}{{dx}}\\). Убедимся в линейности этого оператора, для чего рассмотрим действие оператора на сумму двух векторов и на произведение вектора и числа.\\(\\tilde A\\left( {{{\\bar f}_1} + {{\\bar f}_2}} \\right) = \\left[ {\\frac{{d\\left( {{f_1}\\left( x \\right) + {f_2}\\left( x \\right)} \\right)}}{{dx}} = \\frac{{d{f_1}\\left( x \\right)}}{{dx}} + \\frac{{d{f_2}\\left( x \\right)}}{{dx}}} \\right] = \\tilde A{\\bar f_1} + \\tilde A{\\bar f_2}\\)\\(\\tilde A\\left( {\\lambda \\bar f} \\right) = \\left[ {\\frac{{d\\left( {\\lambda f\\left( x \\right)} \\right)}}{{dx}} = \\lambda \\frac{{df\\left( x \\right)}}{{dx}}} \\right] = \\lambda \\left( {\\tilde A\\bar f} \\right)\\)<br>Оба требования выполнены (см. определение). Заданный оператор является линейным.");
      var algorithm = ""    
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 3.2");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
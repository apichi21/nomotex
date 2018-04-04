var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      var conditions = "<h3>Пример 3.9</h3> <br>Найти собственные векторы линейного оператора, имеющего в некотором базисе матрицу $$A = \\left( {\\begin{array}{*{20}{c}}0&2&0\\\\2&0&0\\\\1&{ - 1}&1\\end{array}} \\right).$$";
          $("#conditions").html(conditions);
var algorithm = "<h3>Решение</h3> Составим характеристическое уравнение и решим его.   $$\\left| {A - \\lambda E} \\right| = 0,$$ $$\\left| {\\begin{array}{*{20}{c}}{ - \\lambda }&2&0\\\\2&{ - \\lambda }&0\\\\1&{ - 1}&{1 - \\lambda }\\end{array}} \\right| = 0 \\Rightarrow {\\lambda _1} = 1,\\;{\\lambda _2} = 2,\\;{\\lambda _3} =  - 2.$$ <br>Так как все собственные значения различны, найдём собственные векторы, им соответствующие, используя присоединённую матрицу $\\widetilde {\\left( {A - \\lambda E} \\right)}$. Составим первый столбец этой матрицы и по очереди подставим в него найденные собственные значения. Если для какого–нибудь  значения  получим нуль–вектор, то составим другой столбец и подставим это число в него.  $$\\widetilde {\\left( {A - \\lambda E} \\right)} = \\left( {\\begin{array}{*{20}{c}}{{\\lambda ^2} - \\lambda }& * & * \\\\{ - 2 + 2\\lambda }& * & * \\\\{ - 2 + \\lambda }& * & * \\end{array}} \\right).$$ $${\\lambda _1} = 1 \\Rightarrow \\left( \\begin{array}{l}0\\\\0\\\\ - 1\\end{array} \\right),\\;{\\lambda _2} = 2 \\Rightarrow \\left( \\begin{array}{l}1\\\\1\\\\0\\end{array} \\right),{\\lambda _3} =  - 2 \\Rightarrow \\left( \\begin{array}{l}6\\\\ - 6\\\\ - 4\\end{array} \\right).$$ Каждая матрица – столбец соответствует собственному вектору.<br>Ответ: ${\\bar x_1} = \\left( {0,0,1} \\right),\\;{\\bar x_2} = \\left( {1,1,0} \\right),\\;{\\bar x_3} = \\left( {3, - 3, - 2} \\right).$";
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 3.9");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      $("#conditions").html("<b> Пример 8.4.</b> Приведём к каноническому виду уравнение поверхности $z = 2xy$ и построим её в системе $OXYZ$. ");
      var algorithm = " <b> Решение</b>. Квадратичную форму $f\\left( {x,y,z} \\right) = xy$ приведём к каноническому виду ортогональным преобразованием. Матрица этой квадратичной формы <br>$A = \\left( {\\begin{array}{*{20}{c}}0&1&0\\\\1&0&0\\\\0&0&0\\end{array}} \\right)$   <br>Характеристическое уравнение  $\\left| {A - \\lambda E} \\right| = 0$ имеет корни ${\\lambda _1} =  - 1,{\\lambda _2} = 1,{\\lambda _3} = 0$. Полученные собственные значения соответствуют уравнению параболоида гиперболического.  Найдём собственные векторы матрицы $A$. Так как все собственные значения различны, воспользуемся присоединённой матрицей  $\\widetilde {\\left( {A - \\lambda E} \\right)} = \\left( {\\begin{array}{*{20}{c}}{{\\lambda ^2}}&&0\\\\\\lambda &&0\\\\0&&{{\\lambda ^2} - 1}\\end{array}} \\right)$ <br>Подставляя  ${\\lambda _1} =  - 1,{\\lambda _2} = 1$ в первый столбец матрицы, получим ${\\bar x_1} = \\left( {1, - 1,0} \\right),\;{\\bar x_2} = \\left( {1,1,0} \\right)$, при  ${\\lambda _3} = 0$ третий столбец даёт вектор ${\\bar x_3} = \\left( {0,0,1} \\right)$. Эти векторы попарно ортогональны. <br>Пронормировав их, получим ортонормированный базис из собственных векторов матрицы $A$: $\\bar i' = \\frac{1}{{\\sqrt 2 }}\\left( {1, - 1,0} \\right),\\;\\bar j' = \\frac{1}{{\\sqrt 2 }}\\left( {1,1,0} \\right),\\;\\bar k' = \\left( {0,0, 1} \\right)$. Матрица ортогонального преобразования имеет вид: $U = \\frac{1}{{\\sqrt 2 }}\\left( {\\begin{array}{*{20}{c}}1&1&0\\\\{ - 1}&1&0\\\\0&0&{\\sqrt 2 }\\end{array}} \\right)$ <br>Старые переменные  выразим через новые, используя формулу их связи с матрицей преобразования: $\\left( \\begin{array}{l}x\\\\y\\\\z\\end{array} \\right) = U\\left( \\begin{array}{l}{x'}\\\\{y'}\\\\{z'}\\end{array} \\right) \\Rightarrow \\left\\{ \\begin{array}{l}x = \\frac{1}{{\\sqrt 2 }}\\left( {x' - y'} \\right)\\\\y = \\frac{1}{{\\sqrt 2 }}\\left( {x' + y'} \\right)\\\\z = z'\\end{array} \\right.$  <br>Подставив  эти выражения в исходное уравнение, получим каноническое уравнение поверхности в новой системе координат $OX'Y'Z'$.  $z' = 2\\frac{1}{{\\sqrt 2 }}\\left( {x' - y'} \\right) \\cdot \\frac{1}{{\\sqrt 2 }}\\left( {x' + y'} \\right) \\Rightarrow$                          $z' = {x'^2} - {y'^2}$ - уравнение  параболоида гиперболического. Совмещаем новую систему координат со старой системой. Новые базисные векторы определяют направления осей $OX',\\;OY',\\;OZ'$ соответственно. В новой системе строим поверхность  методом параллельных сечений.";
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 8.4");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
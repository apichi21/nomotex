var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      $("#conditions").html("<b>Пример 3.1</b> В стандартном базисе \\({R^3}\\) заданы векторы \\({\\bar f_1} = \\left( {1, - 2,2} \\right),\\;{\\bar f_2} = \\left( {3,1, - 1} \\right),\\;{\\bar f_3} = \\left( {2, - 1,3} \\right)\\). Применяя метод Грама – Шмидта, построим ортонормированный базис этого пространства.");
      var algorithm = "Решение. 1) Построим систему взаимно ортогональных векторов.<br>Возьмём \\({\\bar g_1} = {\\bar f_1} = \\left( {1, - 2,2} \\right)\\).<br>Далее \\({\\bar g_2} = \\left[ {k = 2} \\right] = {\\bar f_2} + \\lambda _1^{\\left( 2 \\right)}{\\bar g_1},\\;\\lambda _1^{\\left( 2 \\right)} = \\left[ \\begin{array}{l}k = 2\\\\i = 1\\end{array} \\right] =  - \\frac{{\\left( {{{\\bar f}_2},{{\\bar g}_1}} \\right)}}{{\\left( {{{\\bar g}_1},{{\\bar g}_1}} \\right)}} = \\frac{1}{9}\\\\<br> При \\<br> вычислениях \\<br> можно  \\<br> каждому  \\<br>вектору \\<br>поставить \\<br>в \\<br>соответствие \\<br> матрицу – столбец:<br><br>\\\\{\\bar g_2} \\Leftrightarrow {G_2} = {F_2} + \\frac{1}{9}{G_1} = \\left( \\begin{array}{l} 3\\\\ 1\\\\ -1\\end{array} \\right) + \\left( \\begin{array}{l}1\\\\ -2\\\\ 2\\end{array} \\right) = \\frac{7}{9}\\left( \\begin{array}{l}4\\\\ 1\\\\ -1\\end{array} \\right) \\Leftrightarrow {\\bar g'_2} = \\left( {4,1, - 1} \\right)\\);     \\(\\left( {{{\\bar g}_{1,}}{{\\bar g'}_2}} \\right) = 0;\\;{\\left\\| {{{\\bar g'}_2}} \\right\|^2} = 18\\).<br>\\(\\begin{array}{l}{{\\bar g}_3} = \\left[ {k = 3} \\right] = {{\\bar f}_3} + \\lambda _1^{\\left( 3 \\right)}{{\\bar g}_1} + \\lambda _2^{\\left( 3 \\right)}{{\\bar g}_2},\\;\\lambda _1^{\\left( 3 \\right)} = \\left[ \\begin{array}{l}k = 3\\\\i = 1\\end{array} \\right] =  - \\frac{{\\left( {{{\\bar f}_3},{{\\bar g}_1}} \\right)}}{{\\left( {{{\\bar g}_1},{{\\bar g}_1}} \\right)}} =  - \\frac{{10}}{9}\\\\\\lambda _2^{\\left( 3 \\right)} = \\left[ \\begin{array}{l}k = 3\\\\i = 2\\end{array} \\right] =  - \\frac{{\\left( {{{\\bar f}_3},{{\\bar g}_2}} \\right)}}{{\\left( {{{\\bar g}_2},{{\\bar g}_2}} \\right)}} =  - \\frac{2}{9}\\end{array}\\)\\({\\bar g_3} \\Leftrightarrow {G_3} = {F_3} - \\frac{{10}}{9}{G_1} - \\frac{2}{9}{G_2} = \\left( \\begin{array}{l}0\\\\1\\\\1\\end{array} \\right) \\Leftrightarrow {\\bar g_3} = \\left( {0,1,1} \\right)\\);  \\(\\left( {{{\\bar g}_{3,}}{{\\bar g}_1}} \\right) = 0,\\;\\left( {{{\\bar g}_{3,}}{{\\bar g'}_2}} \\right) = 0\\).<br>\\(\\left\\{ {{{\\bar g}_1},{{\\bar g'}_2},{{\\bar g}_3}} \\right\\}\\) - ортогональный базис пространства.<br>2) Пронормируем эти векторы.<br>Так как эти векторы заданы в стандартном базисе, их нормы: \\(\\begin{array}{l}\\left\\| {{{\\bar g}_1}} \\right\\| = \\sqrt {\\left( {{{\\bar g}_1},{{\\bar g}_1}} \\right)}  = 3,\\\\\\left\\| {{{\\bar g}_2}} \\right\\| = \\sqrt {\\left( {{{\\bar g}_2},{{\\bar g}_2}} \\right)}  = 3\\sqrt 2 ,\\\\\\left\\| {{{\\bar g}_3}} \\right\\| = \\sqrt {\\left( {{{\\bar g}_3},{{\\bar g}_3}} \\right)}  = \\sqrt 2 \\end{array}\\)<br> Учитывая, что \\(\\left\\{ {{{\\bar e}_i}:{{\\bar e}_i} = \\frac{{{{\\bar g}_i}}}{{\\left\\| {{{\\bar g}_i}} \\right\\|}},{\\kern 1pt} i = 1,3} \\right\\}\\),<br> получаем ответ: \\({\\bar e_1} = \\left( {\\frac{1}{3}, - \\frac{2}{3},\\frac{2}{3}} \\right),\\;{\\bar e_2} = \\left( {\\frac{4}{{3\\sqrt 2 }},\\frac{1}{{3\\sqrt 2 }}, - \\frac{1}{{3\\sqrt 2 }}} \\right),\\;{\\bar e_3} = \\left( {0,\\frac{1}{{\\sqrt 2 }},\\frac{1}{{\\sqrt 2 }}} \\right)\\) -ортонормированный базис.";
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 3.1");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      $("#conditions").html("<b>Пример 8.1.</b> Приведём квадратичную форму $f(\\vec{x}) = x_1^2 - 4{x_1}{x_2} + 4{x_1}{x_3} + x_2^2 + 4{x_2}{x_3} + x_3^2$  к каноническому виду ортогональным преобразованием.");
      var algorithm = "<b> Решение</b>. Составим матрицу квадратичной формы $A = \\left( \\begin{array}{l}\\;\\;1\\; - 2\\;\\;\\;2\\\\- 2\\;\\;\\;\\,1\\,\\,\\,\\;\\,2\\\\\\;\\;2\\;\\;\\;\\;2\\;\\;\\;1\\end{array} \\right)$. Характеристическое уравнение $\\det \\left( {A - \\lambda E} \\right) = 0 \\Rightarrow \\left( {\\lambda  + 3} \\right){\\left( {\\lambda  - 3} \\right)^2} = 0$  имеет корни ${\\lambda _1} =  - 3,\\;{\\lambda _2} = {\\lambda _3} = 3$. В <b> примере 5.2 </b> эта матрица была приведена к диагональному виду  $A'=U^{T} \\cdot A \\cdot U = \\begin{pmatrix} -3 & 0 & 0 \\\\ 0 & 3 & 0 \\\\ 0 & 0 & 3 \\end{pmatrix}$ ортогональным линейным преобразованием с матрицей \\[U = \\left( \\begin{array}{l}\\;\\;1/\\sqrt 3 \\;\\;\\;\\;1/\\sqrt {2\\;\\;} \\,\\; - 1/\\sqrt {6\\;\\;} \\\\\\;\\;1/\\sqrt 3 \\;\\;\\;\\;\\;\\;\\;0\\;\\;\\;\\;\\;\\;\\;\\;2/\\sqrt {6\\;\\;} \\\\ - 1/\\sqrt 3 \\;\\;\\;1/\\sqrt {2\\;\\;} \\;\\;\\;\\;1/\\sqrt {6\\;\\;} \\end{array} \\right) = \\frac{1}{{\\sqrt 6 }}\\left( \\begin{array}{l}\\;\\;\\sqrt 2 \\;\\;\\sqrt 3 \\,\\; - 1\\\\\\;\\;\\sqrt 2 \\;\\;\\;\\;0\\;\\;\\;2\\\\ - \\sqrt 2 \\;\\;\\sqrt 3 \\;\\;\\;1\\end{array} \\right)\\] Базис  ${\\bar e_1} = \\frac{1}{{\\sqrt 3 }}\\left( {1,1, - 1} \\right),$ ${\\bar e_2} = \\frac{1}{{\\sqrt 2 }}\\left( {1,0,1} \\right),$ ${\\bar e_3} = \\frac{1}{{\\sqrt 6 }}\\left( { - 1,2,1} \\right)$ является для квадратичной формы каноническим, форма в этом базисе имеет вид $f( \\vec {x} ) = f( {x'}_1,{x'}_2,{x'}_3) =  - 3{x'}_1^2 + 3{x'}_2^2 + 3{x'}_3^2$. При переходе из одного базиса  в другой координаты вектора $\\bar x$ связаны между собой формулой $X = UX'$ (см. (1.5). Отсюда следует, что $ \\begin{eqnarray} x_1 &=& \\frac{1}{{\\sqrt 6 }}\\left( {\\sqrt 2 {x'}_1 + \\sqrt 3 {{x'}_2} - {{x'}_3}} \\right) \\\\ {x_2} &=& \\frac{1}{{\\sqrt 6 }}\\left( {\\sqrt 2 {{x'}_1} + 2{{x'}_3}} \\right) \\\\ {x_3} &=& \\frac{1}{{\\sqrt 6 }}\\left( { - \\sqrt 2 {{x'}_1} + \\sqrt 3 {{x'}_2} + {{x'}_3}} \\right)\\end{eqnarray} .$ - линейное ортогональное преобразование координат, приводящее данную квадратичную форму к каноническому виду $f( \\vec {x} ) = f( {x'}_1,{x'}_2,{x'}_3) =  - 3{x'}_1^2 + 3{x'}_2^2 + 3{x'}_3^2$.";
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 8.1");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
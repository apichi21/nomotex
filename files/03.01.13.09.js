var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      var conditions = "<h3>Пример 4.1.</h3> Пусть в некотором базисе матрица линейного оператора имеет вид $$A=\\left( \\begin{matrix} 1 & 0 & 3  \\\\ 2 & 1 & 2  \\\\ 3 & 0 & 1  \\\\ \\end{matrix} \\right).$$  Существует ли базис, в котором матрица этого оператора имеет диагональный вид? В случае положительного ответа найти этот базис и указать матрицу перехода.<br>";
          $("#conditions").html(conditions);
var algorithm = "<h3>Решение</h3> 1) Решаем характеристическое уравнение: $\\det \\left( A-\\lambda E \\right)=0$ $$\\left| \\begin{matrix} 1-\\lambda  & 0 & 3  \\\\ 2 & 1-\\lambda  & 2  \\\\ 3 & 0 & 1-\\lambda   \\\\ \\end{matrix} \\right|=0.$$   <br>Получаем $\\left( \\lambda -1 \\right)\\left( \\lambda -4 \\right)\\left( \\lambda +2 \\right)=0$<br>Характеристическое уравнение  имеет три различных действительных корня ${{\\lambda }_{1}}=1,{{\\lambda }_{2}}=4,{{\\lambda }_{3}}=-2$. Из теоремы$\\left( Th.\\,4.5 \\right)$ следует, что соответствующие им собственные векторы, образуют базис, в котором матрица оператора имеет диагональный вид.<br>2) Найдём собственные векторы, Используя присоединённую матрицу, так как все собственные векторы – простые корни характеристического уравнения.   $$\\widetilde{\\left( A-\\lambda E \\right)}=\\left( \\begin{matrix} {{\\left( 1-\\lambda  \\right)}^{2}} & * & *  \\\\ 2\\lambda +4 & * & *  \\\\ 3\\lambda -3 & * & *  \\\\ \\end{matrix} \\right).$$ $${{\\lambda }_{1}}=1\\Rightarrow \\left( \\begin{matrix} 0 \\\\ 6 \\\\ 0 \\end{matrix} \\right), {{\\lambda }_{2}}=4\\Rightarrow \\left( \\begin{matrix} 9 \\\\ 12 \\\\ 9  \\end{matrix} \\right), {{\\lambda }_{3}}=-2\\Rightarrow \\left( \\begin{matrix} 9 \\\\ 0 \\\\ -9 \\end{matrix} \\right)$$  Собственные векторы, соответствующие  полученным матрицам – столбцам:  ${{\\bar{x}}_{1}}=\\left( 0,1,0 \\right)$, ${{\\bar{x}}_{2}}=\\left( 1,0,-1 \\right)$ и ${{\\bar{x}}_{3}}=\\left( 3,4,3 \\right).$ <br>В базисе из найденных  собственных векторов матрица оператора должна иметь диагональный вид $${A}'=\\left( \\begin{matrix} {{\\lambda }_{1}} & 0 & 0  \\\\ 0 & {{\\lambda }_{2}} & 0  \\\\ 0 & 0 & {{\\lambda }_{3}}  \\\\ \\end{matrix} \\right)=\\left( \\begin{matrix} 1 & 0 & 0  \\\\ 0 & -2 & 0  \\\\ 0 & 0 & 4  \\\\ \\end{matrix} \\right).$$<br>Можно убедиться в этом. Матрица перехода составляется из координат векторов нового базиса, выписанных в соответствующие столбцы: $$U=\\left( \\begin{matrix} 0 & 1 & 3  \\\\ 1 & 0 & 4  \\\\ 0 & -1 & 3  \\\\ \\end{matrix} \\right).$$ <br>Если выполнить необходимые вычисления, то произведение ${{U}^{-1}}AU$ окажется равно матрице ${A}'$(см.(3.3)).  Здесь $${{U}^{-1}}=-\\frac{1}{6}\\left( \\begin{matrix} 4 & -6 & 4  \\\\ -3 & 0 & 3  \\\\ -1 & 0 & -1  \\\\ \\end{matrix} \\right)$$ и  $${{U}^{-1}}AU=\\left( \\begin{matrix} 1 & 0 & 0  \\\\ 0 & -2 & 0  \\\\ 0 & 0 & 4  \\\\ \\end{matrix} \\right)={A}'.$$ ";
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 4.1");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
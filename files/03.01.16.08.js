var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      var conditions = "<h3>Пример 7.1.</h3> Исследуем знакоопределённость квадратичной формы $f\\left( {{x}_{1}},{{x}_{2}} \\right)=\\alpha x_{1}^{2}+\\alpha x_{2}^{2}+4{{x}_{1}}{{x}_{2}}$ в зависимости от значения $\\alpha$.";
      $("#conditions").html(conditions);
      var algorithm = "<h3>Решение</h3> Составим матрицу квадратичной формы, учитывая, что по определению ${{a}_{12}}={{a}_{21}}=2$, и вычислим её главные миноры.<br>$$A=\\left( \\begin{matrix} \\alpha & 2 \\\\ 2 & \\alpha \\\\ \\end{matrix} \\right)\\Rightarrow \\ {{\\Delta }_{1}}=\\alpha ,\\ {{\\Delta }_{2}}={{\\alpha }^{2}}-4.$$ Из теоремы $\\left( Th.7.3 \\right)$следует, что $f\\left( {{x}_{1}},{{x}_{2}} \\right)>0$, если $$\\left\\{ \\begin{align*} & {{\\Delta }_{1}}>0 \\\\ & {{\\Delta }_{2}}>0 \\\\ \\end{align*} \\right.$$ $$ \\Rightarrow \\left\\{ \\begin{align*} & \\alpha >0 \\\\ & {{\\alpha }^{2}}-4>0 \\\\ \\end{align*} \\right.\\Rightarrow \\alpha \\in \\left( 2,\\infty \\right)$$ и $f\\left( {{x}_{1}},{{x}_{2}} \\right)<0$, если $$\\left\\{ \\begin{align*} & {{\\Delta }_{1}}<0 \\\\ & {{\\Delta }_{2}}>0 \\\\ \\end{align*} \\right.$$ $$ \\Rightarrow \\left\\{ \\begin{align*} & \\alpha <0 \\\\ & {{\\alpha }^{2}}-4>0 \\\\ \\end{align*} \\right.\\Rightarrow \\alpha \\in \\left( -\\infty ,-2 \\right).$$<br>Ответ: квадратичная форма положительно определенная при $\\alpha \\in \\left( 2,\\infty \\right)$, отрицательно определённая при $\\alpha \\in \\left( -\\infty ,-2 \\right)$ и знаконеопределенная для $\\alpha \\in \\left[ -2,2 \\right]$. ";
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 7.1");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
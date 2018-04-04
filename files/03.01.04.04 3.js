var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
      $("#conditions").html("<b>Пример 1.9.</b>Рассмотрим действительное арифметическое пространство\\[{\\mathbb{R}^n}\\] Выберем в нём систему векторов \\({\\bar e_1} = \\left( {1,0,0,...,0} \\right),\\;{\\bar e_2} = \\left( {0,1,0,...,0} \\right),{\\bar e_3} = \\left( {0,0,1,...,0} \\right),...,{\\bar e_n} = \\left( {0,0,0,...,1} \\right)\\). Эта система линейно независима, так как определитель, составленный из элементов векторов \\(\\det E = 1 \\ne 0\\). И очевидно, что каждый вектор пространства  \\(\\bar x = {x_1}{\\bar e_1} + {x_2}{\\bar e_2} + ... + {x_n}{\\bar e_n}\\) есть их линейная комбинация. Выбранная система векторов является базисом (по определению) и  \\[\\dim {\\mathbb{R}^n} = n\\]");
      var algorithm = "<b>Замечание.</b> Выбранный таким образом базис, называется <b>стандартным</b>."    
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 1.9");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
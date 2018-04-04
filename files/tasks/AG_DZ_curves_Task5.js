var dimention="3d";
function initPoints() {
    points = [];
}
var values = [[],[],[]];
var showAlgorithm = false;
var setOfValues = -1;
var mustBeHandedOver = false;
var showSolution = false;
var precision1 = 3;
function initDescr() {
    switch (testType) {
      case "1":
        showAlgorithm = true;
        seminarStyle = true;
        setOfValues = 0;
        mustBeHandedOver = false;
        showSolution = true;
        break;
      case "2":
        showAlgorithm = true;
        seminarStyle = false;
        setOfValues = 1;
        mustBeHandedOver = true;
        showSolution = false;
        break;
      case "3":
        showAlgorithm = false;
        seminarStyle = false;
        setOfValues = 1;
        mustBeHandedOver = true;
        showSolution = false;
        break;
      case "4":
        showAlgorithm = false;
        seminarStyle = false;
        setOfValues = 2;
        mustBeHandedOver = true;
        showSolution = false;
        break;
    }
    $("#containerYellow").css({"min-width": "520px"});

    $("Title").html("Кривые и поверхности второго порядка. Задачи.");

    var conditions = "Приведите к каноническому виду уравнение поверхности, заданное в виде \
      \\begin{equation} a_{11} x^2 + a_{22} y^2 + a_{33} z^2 + 2 a_{12} xy + 2 a_{13} xz+\\\\ + 2 a_{23} yz + 2 b_1 x + 2 b_2 y + 2 b_3 z + c = 0, \\end{equation} \
      где $a_{ij}$, $b_i$, $c$ &mdash; некоторые действительные числа, $i,j = \\overline{1,3}$.<br>Назовите все кривые, полученные в результате сечения поверхности координатыми плоскостями в канонической системе координат.";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
        var algorithm = "<p class='toggleable'>Алгоритм решения не всегда соответствует условию задачи.</p>";
        algorithm += "<p class='toggleable'>Разберём случай, когда $a_{11}=1$, $a_{22}=1$, $a_{33}=0$, $a_{12}=0$, $a_{13}=0$, $a_{23}=0$, $b_1 = 1$, $b_2 = -2$, $b_3 = -1$, $c=-5$, то есть уравнение $(1)$ принимает вид: \
        \\begin{equation*} x^2 + 2 x + 2 y^2 - 4 y  - 2 z - 5 = 0.\\end{equation*}</p>";
        algorithm += "<p class='toggleable'>Для приведения поверхности к каноническому виду необходимо выделить полные квадраты. Для этого группируем члены, содержащие $x$, $y$, $z$: \
        \\begin{equation*}  (x^2 + 2 x + 1 - 1) + (y^2 - 4 y +4 - 4) - 2 z - 5 =0;\\end{equation*} \
        \\begin{equation*} (x+1)^2 + (y-2)^2 - 1 - 4 -5 - 2 z = 0; \\end{equation*}\
        \\begin{equation} (x+1)^2 + (y-2)^2  = 2(z+5). \\end{equation}</p>";
        algorithm += "<p class='toggleable'>Сделаем замену координат: \
        \\begin{equation*} \\begin{cases} x'= x + 1, \\\\ y' = y - 2, \\\\ z' = z + 5.  \\end{cases} \\end{equation*} </p>";
        algorithm += "<p class='toggleable'>Тогда уравнение $(2)$ примет вид: \
        \\begin{equation} \\frac{x'^2}{a^2} + \\frac{y'^2}{b^2}  = 2 z' \\end{equation} \
        &mdash; каноническое уравнение эллиптического параболоида, где $a=1$, $b=1$. $O' = (-1, 2, -5)$  &mdash; начало канонической системы координат $O'x'y'z'$. </p>";
        algorithm += "<p class='toggleable'>Следовательно, уравнение $(2)$ является уравнением эллипического параболоида с вершиной $O'= (-1, 2, -5)$. </p>";
        algorithm += "<p class='toggleable'>При сечении поверхности, заданной уравнением $(3)$ координатными плоскостями: <br> \
        $a)$ $x'=0$, имеем \
        \\begin{equation*} y'^2  = 2 b^2 z'  \\end{equation*} \
        &mdash; каноническое уравнение параболы.  <br>  \
        $б)$ $y'=0$, имеем \
        \\begin{equation*} x'^2  = 2 a^2 z'  \\end{equation*} \
        &mdash; каноническое уравнение параболы.<br>  \
        $в)$ $z'=0$, имеем \
        \\begin{equation*} \\frac{x'^2}{a^2} + \\frac{y'^2}{b^2} = 0  \\end{equation*} \
        &mdash; каноническое уравнение точки (вырожденного эллипса, пары мнимых пересекающихся прямых).</p>";

        $("#algorithm").html('<h3>Алгоритм решения:</h3>'+algorithm);

        var paragraphs=$("#algorithm .toggleable");
        if (seminarStyle) paragraphs.css("visibility","hidden");
        function addParagraph() {
            for (var i = 0; i < paragraphs.length; i++) {
                if (paragraphs[i].style.visibility=="hidden") {
                    paragraphs[i].style.visibility="visible";
                    break;
                }
            }
        }
        $("#algorithm").click(addParagraph);
    }

    values[0].push([36, -4, 9, 0, 0, 0, -36, 0, 0, 0]);
    values[0].push([1, -9, 0, 0, 0, -4, 0, 0, 0, 0]);
    values[1].push([9, -1, 4, 0, 0, 0, -1, 0, 0, 0]);
    values[1].push([1, -9, 0, 0, 0, -9, 0, 0, 0, 0]);
    values[1].push([4, -36, -9, 0, 0, 0, -36, 0, 0, 0]);
    values[1].push([4, -9, -36, 0, 0, 0, -36, 0, 0, 0]);
    values[1].push([4, -1, 0, 0, 0, 4, 0, 0, 0, 0]);
    values[1].push([9, -4, -1, 0, 0, 0, 0, 0, 0, 0]);
    values[1].push([4, -1, 1, 0, 0, 0, -4, 0, 0, 0]);
    values[1].push([36, 9, -4, 0, 0, 0, -36, 0, 0, 0]);
    values[1].push([25, 1, 4, 0, 0, 0, -1, 0, 0, 0]);
    values[1].push([9, 4, -4, 0, 0, 0, -36, 0, 0, 0]);
    values[1].push([9, -1, 0, 0, 0, 4, 0, 0, 0, 0]);
    values[1].push([4, 0, -1, 0, 4, 0, 0, 0, 0, 0]);
    values[1].push([144, 9, 4, 0, 0, 0, -144, 0, 0, 0]);
    values[1].push([25, 25, 16, 0, 0, 0, -100, 0, 0, 0]);
    values[2].push([1, -4, 0, 0, 0, -4, 0, 0, 0, 0]);
    values[2].push([4, 100, 25, 0, 0, 0, -400, 0, 0, 0]);
    values[2].push([4, -1, 9, 0, 0, 0, -1, 0, 0, 0]);
    values[2].push([4, 1, -1, 0, 0, 0, 4, 0, 0, 0]);
    values[2].push([1, -25, -4, 0, 0, 0, 0, 0, 0, 0]);
    values[2].push([36, -4, 9, 0, 0, 0, -144, 0, 0, 0]);
    values[2].push([1, -6, 0, 0, 0, -9, 0, 0, 0, 0]);
    values[2].push([9, 0, -1, 0, 4, 0, 0, 0, 0, 0]);
    values[2].push([1, -4, 0, 0, 0, -4, 0, 0, 0, 0]);
    values[2].push([25, -4, 0, 0, 0, 16, 0, 0, 0, 0]);
    values[2].push([9, 4, -1, 0, 0, 0, -1, 0, 0, 0]);
    values[2].push([1, -16, 0, 0, 0, -4, 0, 0, 0, 0]);
    values[2].push([16, -1, 0, 0, 0, 4, 0, 0, 0, 0]);
    values[2].push([9, -25, 0, 0, 0, 0, -225, 0, 0, 0]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '<p><span id="curve"></span></p>';
    $("#variants").html(variants);

    var answer = '<p>Тип поверхности: <select id="ans">\
    <option value="0">...</option>\
    <option value="ell">эллипсоид</option>\
    <option value="ellI">мнимый эллипсоид</option>\
    <option value="point">мнимый конус (точка)</option>\
    <option value="hyp1">однополостный гиперболоид</option>\
    <option value="hyp2">двуполостный гиперболоид</option>\
    <option value="cone">конус</option>\
    <option value="parell">эллиптический параболоид</option>\
    <option value="parhyp">гиперболический параболоид</option>\
    <option value="cylell">эллиптический цилиндр</option>\
    <option value="cylellI">мнимый эллиптический цилиндр</option>\
    <option value="crosplanesI">пара мнимых пересекающихся плоскостей</option>\
    <option value="cylhyp">гиперболический цилиндр</option>\
    <option value="crosplanes">пара пересекающихся плоскостей</option>\
    <option value="cylpar">параболический цилиндр</option>\
    <option value="paralplanes">пара параллельных плоскостей</option>\
    <option value="paralplanesI">пара мнимых параллельных плоскостей</option>\
    <option value="plane">пара совпадающих плоскостей</option>\
    </select></p>';

    equationsArray = [];
    separatorsArray = [];
    equationsArray.push({text: "...", params: []});
    equationsPointer = {};

    equationsArray.push({text: "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=1$", params: ["$a$","$b$","$c$"]});equationsPointer["ell"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=-1$", params: ["$a$","$b$","$c$"]});equationsPointer["ellI"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=0$", params: ["$a$","$b$","$c$"]});equationsPointer["point"] = equationsArray.length-1;
    separatorsArray.push(equationsArray.length-1);
    equationsArray.push({text: "$-\\frac{x^2}{a^2}+\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=1$", params: ["$a$","$b$","$c$"]});equationsPointer["hyp1x"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=1$", params: ["$a$","$b$","$c$"]});equationsPointer["hyp1y"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}-\\frac{z^2}{c^2}=1$", params: ["$a$","$b$","$c$"]});equationsPointer["hyp1z"] = equationsArray.length-1;
    equationsArray.push({text: "$-\\frac{x^2}{a^2}+\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=-1$", params: ["$a$","$b$","$c$"]});equationsPointer["hyp2x"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=-1$", params: ["$a$","$b$","$c$"]});equationsPointer["hyp2y"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}-\\frac{z^2}{c^2}=-1$", params: ["$a$","$b$","$c$"]});equationsPointer["hyp2z"] = equationsArray.length-1;
    equationsArray.push({text: "$-\\frac{x^2}{a^2}+\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=0$", params: ["$a$","$b$","$c$"]});equationsPointer["conx"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=0$", params: ["$a$","$b$","$c$"]});equationsPointer["cony"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}-\\frac{z^2}{c^2}=0$", params: ["$a$","$b$","$c$"]});equationsPointer["conz"] = equationsArray.length-1;
    separatorsArray.push(equationsArray.length-1);
    equationsArray.push({text: "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=z$", params: ["$a$","$b$"]});equationsPointer["parellz"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=-z$", params: ["$a$","$b$"]});equationsPointer["parellzneg"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}+\\frac{z^2}{c^2}=y$", params: ["$a$","$c$"]});equationsPointer["parelly"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}+\\frac{z^2}{c^2}=-y$", params: ["$a$","$c$"]});equationsPointer["parellyneg"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=x$", params: ["$b$","$c$"]});equationsPointer["parellx"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=-x$", params: ["$b$","$c$"]});equationsPointer["parellxneg"] = equationsArray.length-1;
    separatorsArray.push(equationsArray.length-1);
    equationsArray.push({text: "$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=z$",  params: ["$a$","$b$"]});equationsPointer["parhypz"] = equationsArray.length-1;
    equationsArray.push({text: "$-\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=z$", params: ["$a$","$b$"]});equationsPointer["parhypzneg"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}-\\frac{z^2}{c^2}=y$",  params: ["$a$","$c$"]});equationsPointer["parhypy"] = equationsArray.length-1;
    equationsArray.push({text: "$-\\frac{x^2}{a^2}+\\frac{z^2}{c^2}=y$", params: ["$a$","$c$"]});equationsPointer["parhypyneg"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{y^2}{b^2}-\\frac{z^2}{c^2}=x$",  params: ["$b$","$c$"]});equationsPointer["parhypx"] = equationsArray.length-1;
    equationsArray.push({text: "$-\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=x$", params: ["$b$","$c$"]});equationsPointer["parhypxneg"] = equationsArray.length-1;
    separatorsArray.push(equationsArray.length-1);
    equationsArray.push({text: "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$", params: ["$a$","$b$"]});equationsPointer["cylellz"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}+\\frac{z^2}{c^2}=1$", params: ["$a$","$c$"]});equationsPointer["cylelly"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=1$", params: ["$b$","$c$"]});equationsPointer["cylellx"] = equationsArray.length-1;
    separatorsArray.push(equationsArray.length-1);
    equationsArray.push({text: "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=-1$", params: ["$a$","$b$"]});equationsPointer["cylellIz"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}+\\frac{z^2}{c^2}=-1$", params: ["$a$","$c$"]});equationsPointer["cylellIy"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=-1$", params: ["$b$","$c$"]});equationsPointer["cylellIx"] = equationsArray.length-1;
    separatorsArray.push(equationsArray.length-1);
    equationsArray.push({text: "$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$",  params: ["$a$","$b$"]});equationsPointer["cylhypz"] = equationsArray.length-1;
    equationsArray.push({text: "$-\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$", params: ["$a$","$b$"]});equationsPointer["cylhypzneg"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}-\\frac{z^2}{c^2}=1$",  params: ["$a$","$c$"]});equationsPointer["cylhypy"] = equationsArray.length-1;
    equationsArray.push({text: "$-\\frac{x^2}{a^2}+\\frac{z^2}{c^2}=1$", params: ["$a$","$c$"]});equationsPointer["cylhypyneg"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{y^2}{b^2}-\\frac{z^2}{c^2}=1$",  params: ["$b$","$c$"]});equationsPointer["cylhypx"] = equationsArray.length-1;
    equationsArray.push({text: "$-\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=1$", params: ["$b$","$c$"]});equationsPointer["cylhypxneg"] = equationsArray.length-1;
    separatorsArray.push(equationsArray.length-1);
    equationsArray.push({text: "$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=0$",  params: ["$a$","$b$"]});equationsPointer["crossplanesz"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}-\\frac{z^2}{c^2}=0$",  params: ["$a$","$c$"]});equationsPointer["crossplanesy"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{y^2}{b^2}-\\frac{z^2}{c^2}=0$",  params: ["$b$","$c$"]});equationsPointer["crossplanesx"] = equationsArray.length-1;
    separatorsArray.push(equationsArray.length-1);
    equationsArray.push({text: "$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=0$",  params: ["$a$","$b$"]});equationsPointer["crossplanesIz"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{x^2}{a^2}+\\frac{z^2}{c^2}=0$",  params: ["$a$","$c$"]});equationsPointer["crossplanesIy"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=0$",  params: ["$b$","$c$"]});equationsPointer["crossplanesIx"] = equationsArray.length-1;
    separatorsArray.push(equationsArray.length-1);
    equationsArray.push({text: "$x^2=2py$", params: ["$p$"]});equationsPointer["cylparx2y"] = equationsArray.length-1;
    equationsArray.push({text: "$x^2=2pz$", params: ["$p$"]});equationsPointer["cylparx2z"] = equationsArray.length-1;
    equationsArray.push({text: "$y^2=2px$", params: ["$p$"]});equationsPointer["cylpary2x"] = equationsArray.length-1;
    equationsArray.push({text: "$y^2=2pz$", params: ["$p$"]});equationsPointer["cylpary2z"] = equationsArray.length-1;
    equationsArray.push({text: "$z^2=2px$", params: ["$p$"]});equationsPointer["cylparz2x"] = equationsArray.length-1;
    equationsArray.push({text: "$z^2=2py$", params: ["$p$"]});equationsPointer["cylparz2y"] = equationsArray.length-1;
    separatorsArray.push(equationsArray.length-1);
    equationsArray.push({text: "$x^2=a^2$", params: ["$a$"]});equationsPointer["paralplanesx"] = equationsArray.length-1;
    equationsArray.push({text: "$y^2=b^2$", params: ["$b$"]});equationsPointer["paralplanesy"] = equationsArray.length-1;
    equationsArray.push({text: "$z^2=c^2$", params: ["$c$"]});equationsPointer["paralplanesz"] = equationsArray.length-1;
    equationsArray.push({text: "$x^2=-a^2$", params: ["$a$"]});equationsPointer["paralplanesIx"] = equationsArray.length-1;
    equationsArray.push({text: "$y^2=-b^2$", params: ["$b$"]});equationsPointer["paralplanesIy"] = equationsArray.length-1;
    equationsArray.push({text: "$z^2=-c^2$", params: ["$c$"]});equationsPointer["paralplanesIz"] = equationsArray.length-1;
    equationsArray.push({text: "$x^2=0$", params: []});equationsPointer["planex"] = equationsArray.length-1;
    equationsArray.push({text: "$y^2=0$", params: []});equationsPointer["planey"] = equationsArray.length-1;
    equationsArray.push({text: "$z^2=0$", params: []});equationsPointer["planez"] = equationsArray.length-1;
    answer += '<p>Уравнение: <span id="anscurve"></span>';
    if (!showSolution) {
        answer += ' <input type="button" value="Выбрать уравнение" onclick="showEquations();">';
    }
    answer += '</p>';

    answer += '<div id="equations" style="border:1px solid #bbb; background: #ffffff; display: none;">';
    var sepNum = 0;
    for (var i = 0; i < equationsArray.length; i++) {
        answer += '<label class="whitelabel" onclick="chooseEquations('+i+');">'+equationsArray[i].text+'</label>';
        if (separatorsArray[sepNum] == i) {
            answer += '<br>';
            sepNum++;
        }
    }
    answer += '</div>';

    var curveNames = [];
    curveNames.push({text: "...", value: "0"});
    curveNames.push({text: "эллипс", value: "ell"});
    curveNames.push({text: "мнимый эллипс", value: "ellI"});
    curveNames.push({text: "точка", value: "point"});
    curveNames.push({text: "гипербола", value: "hypX"});
    curveNames.push({text: "парабола", value: "par"});
    curveNames.push({text: "пара пересекающихся прямых", value: "crosslines"});
    curveNames.push({text: "пара параллельных прямых", value: "parallines"});
    curveNames.push({text: "пара мнимых параллельных прямых", value: "parallinesI"});
    curveNames.push({text: "пара совпадающих прямых", value: "doubleline"});
    curveNames.push({text: "одна прямая", value: "line"});

    answer += '<p>Кривая в сечении $x=0$: <select id="ansX0">';
    for (var i = 0; i < curveNames.length; i++) {
        answer += '<option value="'+curveNames[i].value+'">'+curveNames[i].text+'</option>';
    }
    answer += '</select></p>';
    answer += '<p>Кривая в сечении $y=0$: <select id="ansY0">';
    for (var i = 0; i < curveNames.length; i++) {
        answer += '<option value="'+curveNames[i].value+'">'+curveNames[i].text+'</option>';
    }
    answer += '</select></p>';
    answer += '<p>Кривая в сечении $z=0$: <select id="ansZ0">';
    for (var i = 0; i < curveNames.length; i++) {
        answer += '<option value="'+curveNames[i].value+'">'+curveNames[i].text+'</option>';
    }
    answer += '</select></p>';

    answer += '<div id="answerInputs">';
    answer += '<p style="display: none;"><span>$ans_1$</span> = <input type="text" id="ans1" size=4></p>';
    answer += '<p style="display: none;"><span>$ans_2$</span> = <input type="text" id="ans2" size=4></p>';
    answer += '<p style="display: none;"><span>$ans_3$</span> = <input type="text" id="ans3" size=4></p>';
    answer += '<p style="display: none;"><span>$ans_4$</span> = <input type="text" id="ans4" size=4></p>';
    answer += '<p style="display: none;"><span>$ans_5$</span> = <input type="text" id="ans5" size=4></p>';
    answer += '<p style="display: none;"><span>$ans_6$</span> = <input type="text" id="ans6" size=4></p>';
    answer += '</div>';
    if (mustBeHandedOver) {answer+='<p><input type="submit" id="ansButton" value="Сдать работу" onclick="handOver();" style="width: 100%"></p>';}
    $("#answer").html('<h3>Ответ:</h3>'+answer);

    changeVariant(setOfValues+",0");
    chooseEquations(0);
    if (0) {
        showSolution = true;
        $("#conditions").prepend("<textarea rows='10' cols='45' id='filetext'></textarea>");
        for (var i = 0; i < values[setOfValues].length; i++) {
            if (i!=0) {
                $("#filetext").append(";");
            }
            changeVariant(setOfValues+","+i);
            initData();
            var ansText = generateAnsText();
            $("#filetext").append(ansText);
        }
    }

    scaleFactor = 0.1;
    axisLen = 20;
    axisDashStep = 1;
}
var equationsArray = [];
var separatorsArray = [];
var equationsPointer = {};

function showEquations() {
    if ($("#equations").css("display") == "block") {
        $("#equations").css({display:"none"});
    } else {
        $("#equations").css({display:"block"});
    }
}
var chosenEquation = 0;
function chooseEquations(eqv) {
    chosenEquation = eqv;
    $("#equations").css({display:"none"});
    $("#anscurve").html(equationsArray[eqv].text);
    for (var i = 0; i < equationsArray[eqv].params.length; i++) {
        $("#answerInputs p").eq(i).css({display:"block"}).children("span").html(equationsArray[eqv].params[i]);
    }
    for (var i = equationsArray[eqv].params.length; i < 6; i++) {
        $("#answerInputs p").eq(i).css({display:"none"});
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function generateAnsText()
{
    var ansArr = [];
    ansArr.push($("#ans").val());
    ansArr.push(chosenEquation);
    ansArr.push($("#ansX0").val());
    ansArr.push($("#ansY0").val());
    ansArr.push($("#ansZ0").val());
    for (var j = 1; j <= equationsArray[chosenEquation].params.length; j++) {
        ansArr.push(parseFloat($("#ans"+j).val()).toFixed(precision1));
    }
    return ansArr.join(',');
}
function handOver() {
    if (!example_id) {alert("Ошибка! Не получен идентификатор задачи.");return;}
    var ansText = generateAnsText();
    var reallyHandOver = confirm("Вы уверены, что хотите сдать работу?\nБудет отправлено: \nВариант "+(chosenVariant+1)+", Ответ "+ansText);
    if (reallyHandOver) {
        var getRequest = new XMLHttpRequest();
        var requestText = "/api/test_add?example_id="+example_id+"&answer="+ansText+"&variant="+(chosenVariant+1);
        getRequest.open("GET", requestText, true);
        getRequest.onload = function (){
            alert("Отправлено.");
        }
        getRequest.send();
    }
}
var chosenVariant = 0;
function changeVariant(newVar) {
    var newVarSplit = newVar.split(',');
    chosenVariant = parseInt(newVarSplit[1],10);
    var cval = values[parseInt(newVarSplit[0],10)][chosenVariant];
    var i = 0;
    $("#curve").html( "$" +linCombText([cval[i],cval[i+7],cval[i+8],cval[i+1],cval[i+9],cval[i+2],cval[i+3],cval[i+4],cval[i+5],cval[i+6]],["x^2","xy","xz","y^2","yz","z^2","x","y","z",""]) + "=0$" );
    for (var i = 0; i <= 9; i++) {
        coefs[i] = cval[i];
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    initBuffers();
}
function linCombText(coef,name) {
    let text = "";
    for (var i = 0; i < coef.length; i++) {
        let c = coef[i];
        let n = name[i];
        if (n.length == 0) {
            if (c != 0){
                if (c > 0) {
                    if (text.length > 0) text += "+";
                    text += c;
                } else {
                    text += c;
                }
            }
        } else {
            if (c == 1) {
                if (text.length > 0) text += "+";
                text += n;
            } else if (c == -1){
                text += "-"+n;
            } else if (c != 0){
                if (c > 0) {
                    if (text.length > 0) text += "+";
                    text += c+n;
                } else {
                    text += c+n;
                }
            }
        }
    }
    if (text.length == 0) text += "0";
    return text;
}

function toFloat(x, n) {
    if (n == undefined) {
        n = 10;
    }
    return parseFloat(x.toFixed(n));
}
var coefs = [];
function initData() {
    primitives.push({class:"text", text: "x", arr0:[0,0,axisLen]});
    primitives.push({class:"text", text: "y", arr0:[axisLen,0,0]});
    primitives.push({class:"text", text: "z", arr0:[0,axisLen,0]});

    if (showSolution) {
        var Ax2 = coefs[0];
        var Ay2 = coefs[1];
        var Az2 = coefs[2];
        var Ax = coefs[3];
        var Ay = coefs[4];
        var Az = coefs[5];
        var Ac = coefs[6];

        var Axy = coefs[7] / 2.0;
        var Axz = coefs[8] / 2.0;
        var Ayz = coefs[9] / 2.0;

        var tgphiXY;
        var sinphiXY;
        var cosphiXY;

        var tgphiXZ;
        var sinphiXZ;
        var cosphiXZ;

        var tgphiYZ;
        var sinphiYZ;
        var cosphiYZ;

        if (Axy != 0) {
            var eqvb = (Ax2-Ay2) / Axy;
            tgphiXY = (-eqvb+Math.sqrt(eqvb*eqvb+4.0)) / 2.0;

            sinphiXY = tgphiXY/Math.sqrt(1.0+tgphiXY*tgphiXY);
            cosphiXY = 1.0/Math.sqrt(1.0+tgphiXY*tgphiXY);
        } else {
            tgphiXY = 0.0;
            sinphiXY = 0.0;
            cosphiXY = 1.0;
        }

        var Ax2_1 = Ax2*cosphiXY*cosphiXY+2*Axy*cosphiXY*sinphiXY+Ay2*sinphiXY*sinphiXY;
        var Ay2_1 = Ax2*sinphiXY*sinphiXY-2*Axy*cosphiXY*sinphiXY+Ay2*cosphiXY*cosphiXY;
        var Az2_1 = Az2;
        var Ax_1 = Ax*cosphiXY+Ay*sinphiXY;
        var Ay_1 = -Ax*sinphiXY+Ay*cosphiXY;
        var Az_1 = Az;

        // if (Axz != 0) {
        //     var eqvb = (Ax2-Az2) / Axz;
        //     tgphiXZ = (-eqvb+Math.sqrt(eqvb*eqvb+4.0)) / 2.0;

        //     sinphiXZ = tgphiXZ/Math.sqrt(1.0+tgphiXZ*tgphiXZ);
        //     cosphiXZ = 1.0/Math.sqrt(1.0+tgphiXZ*tgphiXZ);
        // } else {
            tgphiXZ = 0.0;
            sinphiXZ = 0.0;
            cosphiXZ = 1.0;
        // }


        // if (Ayz != 0) {
        //     var eqvb = (Ay2-Az2) / Ayz;
        //     tgphiYZ = (-eqvb+Math.sqrt(eqvb*eqvb+4.0)) / 2.0;

        //     sinphiYZ = tgphiYZ/Math.sqrt(1.0+tgphiYZ*tgphiYZ);
        //     cosphiYZ = 1.0/Math.sqrt(1.0+tgphiYZ*tgphiYZ);
        // } else {
            tgphiYZ = 0.0;
            sinphiYZ = 0.0;
            cosphiYZ = 1.0;
        // }

        var x0;
        var y0;
        var z0;
        var Ac_1 = Ac;
        if (Ax2_1 != 0) {
            x0 = -Ax_1/2.0/Ax2_1;
            Ac_1 -= Ax_1*Ax_1/4.0/Ax2_1;
        } else {
            x0 = 0;
        }
        if (Ay2_1 != 0) {
            y0 = -Ay_1/2.0/Ay2_1;
            Ac_1 -= Ay_1*Ay_1/4.0/Ay2_1;
        } else {
            y0 = 0;
        }
        if (Az2_1 != 0) {
            z0 = -Az_1/2.0/Az2_1;
            Ac_1 -= Az_1*Az_1/4.0/Az2_1;
        } else {
            z0 = 0;
        }
        // console.log("x0' = ", toFloat(x0));
        // console.log("y0' = ", toFloat(y0));


        // console.log(" ");
        // console.log(Ax2, Ay2, Az2, Ax, Ay, Az, Ac);
        // console.log(toFloat(Ax2_1), toFloat(Ay2_1), toFloat(Az2_1), toFloat(Ac_1));

        // console.log("x0 = ", toFloat(x0));
        // console.log("y0 = ", toFloat(y0));
        // console.log("z0 = ", toFloat(z0));

        var asqr = Ac_1!=0 ? -Ac_1/Ax2_1 : 1.0/Ax2_1;
        var bsqr = Ac_1!=0 ? -Ac_1/Ay2_1 : 1.0/Ay2_1;
        var csqr = Ac_1!=0 ? -Ac_1/Az2_1 : 1.0/Az2_1;
        // console.log("Az_1 = ", toFloat(Az_1));
        // console.log("a^2' = ", toFloat(asqr));
        // console.log("b^2' = ", toFloat(bsqr));
        var lineVertices = [];
        var slices1 = 32*2;
        var slices = 16*2;

        var vertices = [];
        var normals = [];

        if (Ax2_1 == 0 && Ay2_1 == 0) {
        } else if (Ax2_1 == 0 && Az2_1 == 0) {
        } else if (Ay2_1 == 0 && Az2_1 == 0) {
            if (Az_1 != 0) {
                var az = Ac_1!=0 ? Az_1/Ac_1 : -Az_1;
                z0 = Ac_1!=0 ? -1.0/az : 0;

                $("#ans [value='cylpar']").prop("selected", true);
                $("#ansX0 [value='line']").prop("selected", true);
                $("#ansY0 [value='par']").prop("selected", true);
                $("#ansZ0 [value='doubleline']").prop("selected", true);

                var a = az*asqr;

                slices1 = 32;
                slices = 2;
                chooseEquations(equationsPointer["cylparx2z"]);
                $("#ans1").val(toFloat(a/2.0, precision1));
                cylpar([0,2,1], a, vertices, normals);
            }

        } else if (Ax2_1 == 0) {
            if (Ax_1 != 0) {
                var ax = Ac_1!=0 ? Ax_1/Ac_1 : -Ax_1;
                x0 = Ac_1!=0 ? -1.0/ax : 0;

                bsqr *= ax;
                csqr *= ax;
                var a = [1,
                         Math.sqrt(Math.abs(bsqr)),
                         Math.sqrt(Math.abs(csqr))];

                slices1 = 32*2;
                slices = 16*2;

                if (bsqr > 0 && csqr > 0) {
                    $("#ans [value='parell']").prop("selected", true);
                    $("#ansX0 [value='point']").prop("selected", true);
                    $("#ansY0 [value='par']").prop("selected", true);
                    $("#ansZ0 [value='par']").prop("selected", true);
                    chooseEquations(equationsPointer["parellx"]);
                    $("#ans1").val(toFloat(a[1], precision1));
                    $("#ans2").val(toFloat(a[2], precision1));

                    parellpos([1,2,0], a, vertices, normals);
                } else if (bsqr < 0 && csqr < 0) {
                    $("#ans [value='parell']").prop("selected", true);
                    $("#ansX0 [value='point']").prop("selected", true);
                    $("#ansY0 [value='par']").prop("selected", true);
                    $("#ansZ0 [value='par']").prop("selected", true);
                    chooseEquations(equationsPointer["parellxneg"]);
                    $("#ans1").val(toFloat(a[1], precision1));
                    $("#ans2").val(toFloat(a[2], precision1));
                    parellneg([1,2,0], a, vertices, normals);
                } else if (bsqr > 0 && csqr < 0) {
                    $("#ans [value='parhyp']").prop("selected", true);
                    $("#ansX0 [value='crosslines']").prop("selected", true);
                    $("#ansY0 [value='par']").prop("selected", true);
                    $("#ansZ0 [value='par']").prop("selected", true);
                    chooseEquations(equationsPointer["parhypx"]);
                    $("#ans1").val(toFloat(a[1], precision1));
                    $("#ans2").val(toFloat(a[2], precision1));
                    parhyp([1,2,0], a, vertices, normals);
                } else if (bsqr < 0 && csqr > 0) {
                    $("#ans [value='parhyp']").prop("selected", true);
                    $("#ansX0 [value='crosslines']").prop("selected", true);
                    $("#ansY0 [value='par']").prop("selected", true);
                    $("#ansZ0 [value='par']").prop("selected", true);
                    chooseEquations(equationsPointer["parhypxneg"]);
                    $("#ans1").val(toFloat(a[1], precision1));
                    $("#ans2").val(toFloat(a[2], precision1));
                    parhyp([2,1,0], a, vertices, normals);
                }
            } else {
                //цилиндр
                $("#ans [value='cylhyp']").prop("selected", true);

                var a = [0,
                         Math.sqrt(Math.abs(bsqr)),
                         Math.sqrt(Math.abs(csqr))];

                slices1 = 32;
                slices = 2;

                if (bsqr > 0 && csqr < 0) {
                    chooseEquations(equationsPointer["cylhypx"]);
                    $("#ansX0 [value='hypX']").prop("selected", true);
                    $("#ansY0 [value='parallinesI']").prop("selected", true);
                    $("#ansZ0 [value='parallines']").prop("selected", true);
                    $("#ans1").val(toFloat(a[1], precision1));
                    $("#ans2").val(toFloat(a[2], precision1));
                    cylhyp([1,2,0], a, vertices, normals);
                } else if (bsqr < 0 && csqr > 0) {
                    chooseEquations(equationsPointer["cylhypxneg"]);
                    $("#ansX0 [value='hypX']").prop("selected", true);
                    $("#ansY0 [value='parallines']").prop("selected", true);
                    $("#ansZ0 [value='parallinesI']").prop("selected", true);
                    $("#ans1").val(toFloat(a[1], precision1));
                    $("#ans2").val(toFloat(a[2], precision1));
                    cylhyp([2,1,0], a, vertices, normals);
                }
            }
        } else if (Ay2_1 == 0) {
            if (Ay_1 != 0) {
                var ay = Ac_1!=0 ? Ay_1/Ac_1 : -Ay_1;
                y0 = Ac_1!=0 ? -1.0/ay : 0;

                asqr *= ay;
                csqr *= ay;
                var a = [Math.sqrt(Math.abs(asqr)),
                         1,
                         Math.sqrt(Math.abs(csqr))];

                slices1 = 32*2;
                slices = 16*2;

                if (asqr > 0 && csqr > 0) {
                    $("#ans [value='parell']").prop("selected", true);
                    $("#ansX0 [value='par']").prop("selected", true);
                    $("#ansY0 [value='point']").prop("selected", true);
                    $("#ansZ0 [value='par']").prop("selected", true);
                    chooseEquations(equationsPointer["parelly"]);
                    $("#ans1").val(toFloat(a[0], precision1));
                    $("#ans2").val(toFloat(a[2], precision1));
                    parellpos([0,2,1], a, vertices, normals);

                } else if (asqr < 0 && csqr < 0) {
                    $("#ans [value='parell']").prop("selected", true);
                    $("#ansX0 [value='par']").prop("selected", true);
                    $("#ansY0 [value='point']").prop("selected", true);
                    $("#ansZ0 [value='par']").prop("selected", true);
                    chooseEquations(equationsPointer["parellyneg"]);
                    $("#ans1").val(toFloat(a[0], precision1));
                    $("#ans2").val(toFloat(a[2], precision1));
                    parellneg([0,2,1], a, vertices, normals);

                } else if (asqr > 0 && csqr < 0) {
                    $("#ans [value='parhyp']").prop("selected", true);
                    $("#ansX0 [value='par']").prop("selected", true);
                    $("#ansY0 [value='crosslines']").prop("selected", true);
                    $("#ansZ0 [value='par']").prop("selected", true);
                    chooseEquations(equationsPointer["parhypy"]);
                    $("#ans1").val(toFloat(a[0], precision1));
                    $("#ans2").val(toFloat(a[2], precision1));
                    parhyp([0,2,1], a, vertices, normals);

                } else if (asqr < 0 && csqr > 0) {
                    $("#ans [value='parhyp']").prop("selected", true);
                    $("#ansX0 [value='par']").prop("selected", true);
                    $("#ansY0 [value='crosslines']").prop("selected", true);
                    $("#ansZ0 [value='par']").prop("selected", true);
                    chooseEquations(equationsPointer["parhypyneg"]);
                    $("#ans1").val(toFloat(a[0], precision1));
                    $("#ans2").val(toFloat(a[2], precision1));
                    parhyp([2,0,1], a, vertices, normals);
                }
            } else {
                //цилиндр
                $("#ans [value='cylhyp']").prop("selected", true);

                var a = [Math.sqrt(Math.abs(asqr)),
                         0,
                         Math.sqrt(Math.abs(csqr))];

                slices1 = 32;
                slices = 2;

                if (asqr > 0 && csqr < 0) {
                    chooseEquations(equationsPointer["cylhypy"]);
                    $("#ansX0 [value='parallinesI']").prop("selected", true);
                    $("#ansY0 [value='hypX']").prop("selected", true);
                    $("#ansZ0 [value='parallines']").prop("selected", true);
                    $("#ans1").val(toFloat(a[0], precision1));
                    $("#ans2").val(toFloat(a[2], precision1));
                    cylhyp([0,2,1], a, vertices, normals);
                } else if (asqr < 0 && csqr > 0) {
                    chooseEquations(equationsPointer["cylhypyneg"]);
                    $("#ansX0 [value='parallines']").prop("selected", true);
                    $("#ansY0 [value='hypX']").prop("selected", true);
                    $("#ansZ0 [value='parallinesI']").prop("selected", true);
                    $("#ans1").val(toFloat(a[0], precision1));
                    $("#ans2").val(toFloat(a[2], precision1));
                    cylhyp([2,0,1], a, vertices, normals);
                }
            }
        } else if (Az2_1 == 0) {
            if (Az_1 != 0) {
                var az = Ac_1!=0 ? Az_1/Ac_1 : -Az_1;
                z0 = Ac_1!=0 ? -1.0/az : 0;
                asqr *= az;
                bsqr *= az;
                var a = [Math.sqrt(Math.abs(asqr)),
                         Math.sqrt(Math.abs(bsqr)),
                         1];

                slices1 = 32*2;
                slices = 16*2;

                if (asqr > 0 && bsqr > 0) {
                    $("#ans [value='parell']").prop("selected", true);
                    $("#ansX0 [value='par']").prop("selected", true);
                    $("#ansY0 [value='par']").prop("selected", true);
                    $("#ansZ0 [value='point']").prop("selected", true);

                    chooseEquations(equationsPointer["parellz"]);
                    $("#ans1").val(toFloat(a[0], precision1));
                    $("#ans2").val(toFloat(a[1], precision1));
                    parellpos([0,1,2], a, vertices, normals);
                } else if (asqr < 0 && bsqr < 0) {
                    $("#ans [value='parell']").prop("selected", true);
                    $("#ansX0 [value='par']").prop("selected", true);
                    $("#ansY0 [value='par']").prop("selected", true);
                    $("#ansZ0 [value='point']").prop("selected", true);

                    chooseEquations(equationsPointer["parellzneg"]);
                    $("#ans1").val(toFloat(a[0], precision1));
                    $("#ans2").val(toFloat(a[1], precision1));
                    parellneg([0,1,2], a, vertices, normals);
                } else if (asqr > 0 && bsqr < 0) {
                    $("#ans [value='parhyp']").prop("selected", true);
                    $("#ansX0 [value='par']").prop("selected", true);
                    $("#ansY0 [value='par']").prop("selected", true);
                    $("#ansZ0 [value='crosslines']").prop("selected", true);

                    chooseEquations(equationsPointer["parhypz"]);
                    $("#ans1").val(toFloat(a[0], precision1));
                    $("#ans2").val(toFloat(a[1], precision1));

                    parhyp([0,1,2], a, vertices, normals);
                } else if (asqr < 0 && bsqr > 0) {
                    $("#ans [value='parhyp']").prop("selected", true);
                    $("#ansX0 [value='par']").prop("selected", true);
                    $("#ansY0 [value='par']").prop("selected", true);
                    $("#ansZ0 [value='crosslines']").prop("selected", true);

                    chooseEquations(equationsPointer["parhypzneg"]);
                    $("#ans1").val(toFloat(a[0], precision1));
                    $("#ans2").val(toFloat(a[1], precision1));
                    parhyp([1,0,2], a, vertices, normals);
                }
            } else {
                $("#ans [value='cylhyp']").prop("selected", true);
                //цилиндр
                var a = [Math.sqrt(Math.abs(asqr)),
                         Math.sqrt(Math.abs(bsqr)),
                         0];
                slices1 = 32;
                slices = 2;

                if (asqr > 0 && bsqr < 0) {
                    chooseEquations(equationsPointer["cylhypz"]);

                    $("#ansX0 [value='parallinesI']").prop("selected", true);
                    $("#ansY0 [value='parallines']").prop("selected", true);
                    $("#ansZ0 [value='hypX']").prop("selected", true);

                    $("#ans1").val(toFloat(a[0], precision1));
                    $("#ans2").val(toFloat(a[1], precision1));

                    cylhyp([0,1,2], a, vertices, normals);

                } else if (asqr < 0 && bsqr > 0) {
                    chooseEquations(equationsPointer["cylhypzneg"]);

                    $("#ansX0 [value='parallines']").prop("selected", true);
                    $("#ansY0 [value='parallinesI']").prop("selected", true);
                    $("#ansZ0 [value='hypX']").prop("selected", true);

                    $("#ans1").val(toFloat(a[0], precision1));
                    $("#ans2").val(toFloat(a[1], precision1));

                    cylhyp([1,0,2], a, vertices, normals);
                }
            }
        } else if (asqr > 0 && bsqr > 0 && csqr > 0) {
            // console.log("эллипс");
            $("#ans [value='ell']").prop("selected", true);
            $("#ansX0 [value='ell']").prop("selected", true);
            $("#ansY0 [value='ell']").prop("selected", true);
            $("#ansZ0 [value='ell']").prop("selected", true);
            var a = [Math.sqrt(Math.abs(asqr)),
                     Math.sqrt(Math.abs(bsqr)),
                     Math.sqrt(Math.abs(csqr))];

            chooseEquations(equationsPointer["ell"]);
            $("#ans1").val(toFloat(a[0], precision1));
            $("#ans2").val(toFloat(a[1], precision1));
            $("#ans3").val(toFloat(a[2], precision1));
            // для эллипса:

            slices1 = 32*2;
            slices = 16*2;

            ell([0,1,2], a, vertices, normals);
        } else if (asqr < 0 && bsqr < 0 && csqr < 0) {
            // console.log("эллипс");
            $("#ans [value='ellI']").prop("selected", true);
            $("#ansX0 [value='ellI']").prop("selected", true);
            $("#ansY0 [value='ellI']").prop("selected", true);
            $("#ansZ0 [value='ellI']").prop("selected", true);

            chooseEquations(equationsPointer["ellI"]);
            $("#ans1").val(toFloat(a[0], precision1));
            $("#ans2").val(toFloat(a[1], precision1));
            $("#ans3").val(toFloat(a[2], precision1));
            // для эллипса:
            // var a = [Math.sqrt(Math.abs(asqr)),
            //          Math.sqrt(Math.abs(bsqr)),
            //          Math.sqrt(Math.abs(csqr))];

            // slices1 = 32*2;
            // slices = 16*2;

            // ell([0,1,2], a, vertices, normals);
        } else if (asqr < 0 && bsqr > 0 && csqr > 0) {
            // console.log("гипербола");
            // для гиперболы:
            var a = [Math.sqrt(Math.abs(asqr)),
                     Math.sqrt(Math.abs(bsqr)),
                     Math.sqrt(Math.abs(csqr))];

            slices1 = 32*2;
            slices = 16*2;

            if (Ac_1 != 0) {
                $("#ans [value='hyp1']").prop("selected", true);
                $("#ansX0 [value='ell']").prop("selected", true);
                $("#ansY0 [value='hypX']").prop("selected", true);
                $("#ansZ0 [value='hypX']").prop("selected", true);

                chooseEquations(equationsPointer["hyp1x"]);
                $("#ans1").val(toFloat(a[0], precision1));
                $("#ans2").val(toFloat(a[1], precision1));
                $("#ans3").val(toFloat(a[2], precision1));
                hyp1([1,2,0], a, vertices, normals);
            } else {
                $("#ans [value='cone']").prop("selected", true);
                $("#ansX0 [value='point']").prop("selected", true);
                $("#ansY0 [value='crosslines']").prop("selected", true);
                $("#ansZ0 [value='crosslines']").prop("selected", true);

                chooseEquations(equationsPointer["conx"]);
                $("#ans1").val(toFloat(a[0], precision1));
                $("#ans2").val(toFloat(a[1], precision1));
                $("#ans3").val(toFloat(a[2], precision1));

                cone([1,2,0], a, vertices, normals);
            }

        } else if (asqr > 0 && bsqr < 0 && csqr < 0) {
            // console.log("гипербола");
            // для гиперболы:
            var a = [Math.sqrt(Math.abs(asqr)),
                     Math.sqrt(Math.abs(bsqr)),
                     Math.sqrt(Math.abs(csqr))];

            slices1 = 32*2;
            slices = 16*2;

            if (Ac_1 != 0) {
                $("#ans [value='hyp2']").prop("selected", true);
                $("#ansX0 [value='ellI']").prop("selected", true);
                $("#ansY0 [value='hypX']").prop("selected", true);
                $("#ansZ0 [value='hypX']").prop("selected", true);


                chooseEquations(equationsPointer["hyp2x"]);
                $("#ans1").val(toFloat(a[0], precision1));
                $("#ans2").val(toFloat(a[1], precision1));
                $("#ans3").val(toFloat(a[2], precision1));

                hyp2([1,2,0], a, vertices, normals);
            } else {
                $("#ans [value='cone']").prop("selected", true);
                $("#ansX0 [value='point']").prop("selected", true);
                $("#ansY0 [value='crosslines']").prop("selected", true);
                $("#ansZ0 [value='crosslines']").prop("selected", true);

                chooseEquations(equationsPointer["conx"]);
                $("#ans1").val(toFloat(a[0], precision1));
                $("#ans2").val(toFloat(a[1], precision1));
                $("#ans3").val(toFloat(a[2], precision1));
                cone([1,2,0], a, vertices, normals);
            }
        } else if (asqr > 0 && bsqr < 0 && csqr > 0) {
            // console.log("гипербола");
            // для гиперболы:
            var a = [Math.sqrt(Math.abs(asqr)),
                     Math.sqrt(Math.abs(bsqr)),
                     Math.sqrt(Math.abs(csqr))];

            slices1 = 32*2;
            slices = 16*2;

            if (Ac_1 != 0) {
                $("#ans [value='hyp1']").prop("selected", true);
                $("#ansX0 [value='hypX']").prop("selected", true);
                $("#ansY0 [value='ell']").prop("selected", true);
                $("#ansZ0 [value='hypX']").prop("selected", true);

                chooseEquations(equationsPointer["hyp1y"]);
                $("#ans1").val(toFloat(a[0], precision1));
                $("#ans2").val(toFloat(a[1], precision1));
                $("#ans3").val(toFloat(a[2], precision1));
                hyp1([0,2,1], a, vertices, normals);
            } else {
                $("#ans [value='cone']").prop("selected", true);
                $("#ansX0 [value='crosslines']").prop("selected", true);
                $("#ansY0 [value='point']").prop("selected", true);
                $("#ansZ0 [value='crosslines']").prop("selected", true);

                chooseEquations(equationsPointer["cony"]);
                $("#ans1").val(toFloat(a[0], precision1));
                $("#ans2").val(toFloat(a[1], precision1));
                $("#ans3").val(toFloat(a[2], precision1));
                cone([0,2,1], a, vertices, normals);
            }
        } else if (asqr < 0 && bsqr > 0 && csqr < 0) {
            // console.log("гипербола");
            // для гиперболы:
            var a = [Math.sqrt(Math.abs(asqr)),
                     Math.sqrt(Math.abs(bsqr)),
                     Math.sqrt(Math.abs(csqr))];

            slices1 = 32*2;
            slices = 16*2;

            if (Ac_1 != 0) {
                $("#ans [value='hyp2']").prop("selected", true);
                $("#ansX0 [value='hypX']").prop("selected", true);
                $("#ansY0 [value='ellI']").prop("selected", true);
                $("#ansZ0 [value='hypX']").prop("selected", true);

                chooseEquations(equationsPointer["hyp2y"]);
                $("#ans1").val(toFloat(a[0], precision1));
                $("#ans2").val(toFloat(a[1], precision1));
                $("#ans3").val(toFloat(a[2], precision1));
                hyp2([0,2,1], a, vertices, normals);
            } else {
                $("#ans [value='cone']").prop("selected", true);
                $("#ansX0 [value='crosslines']").prop("selected", true);
                $("#ansY0 [value='point']").prop("selected", true);
                $("#ansZ0 [value='crosslines']").prop("selected", true);

                chooseEquations(equationsPointer["cony"]);
                $("#ans1").val(toFloat(a[0], precision1));
                $("#ans2").val(toFloat(a[1], precision1));
                $("#ans3").val(toFloat(a[2], precision1));
                cone([0,2,1], a, vertices, normals);
            }
        } else if (asqr > 0 && bsqr > 0 && csqr < 0) {
            // console.log("гиперболоид");

            var a = [Math.sqrt(Math.abs(asqr)),
                     Math.sqrt(Math.abs(bsqr)),
                     Math.sqrt(Math.abs(csqr))];

            slices1 = 32*2;
            slices = 16*2;

            if (Ac_1 != 0) {
                $("#ans [value='hyp1']").prop("selected", true);
                $("#ansX0 [value='hypX']").prop("selected", true);
                $("#ansY0 [value='hypX']").prop("selected", true);
                $("#ansZ0 [value='ell']").prop("selected", true);

                chooseEquations(equationsPointer["hyp1z"]);
                $("#ans1").val(toFloat(a[0], precision1));
                $("#ans2").val(toFloat(a[1], precision1));
                $("#ans3").val(toFloat(a[2], precision1));
                hyp1([0,1,2], a, vertices, normals);
            } else {
                $("#ans [value='cone']").prop("selected", true);
                $("#ansX0 [value='crosslines']").prop("selected", true);
                $("#ansY0 [value='crosslines']").prop("selected", true);
                $("#ansZ0 [value='point']").prop("selected", true);

                chooseEquations(equationsPointer["conz"]);
                $("#ans1").val(toFloat(a[0], precision1));
                $("#ans2").val(toFloat(a[1], precision1));
                $("#ans3").val(toFloat(a[2], precision1));
                cone([0,1,2], a, vertices, normals);
            }
        } else if (asqr < 0 && bsqr < 0 && csqr > 0) {
            // console.log("гипербола");
            // для гиперболы:
            var a = [Math.sqrt(Math.abs(asqr)),
                     Math.sqrt(Math.abs(bsqr)),
                     Math.sqrt(Math.abs(csqr))];

            slices1 = 32*2;
            slices = 16*2;

            if (Ac_1 != 0) {
                $("#ans [value='hyp2']").prop("selected", true);
                $("#ansX0 [value='hypX']").prop("selected", true);
                $("#ansY0 [value='hypX']").prop("selected", true);
                $("#ansZ0 [value='ellI']").prop("selected", true);

                chooseEquations(equationsPointer["hyp2z"]);
                $("#ans1").val(toFloat(a[0], precision1));
                $("#ans2").val(toFloat(a[1], precision1));
                $("#ans3").val(toFloat(a[2], precision1));
                hyp2([0,1,2], a, vertices, normals);
            } else {
                $("#ans [value='cone']").prop("selected", true);
                $("#ansX0 [value='crosslines']").prop("selected", true);
                $("#ansY0 [value='crosslines']").prop("selected", true);
                $("#ansZ0 [value='point']").prop("selected", true);

                chooseEquations(equationsPointer["conz"]);
                $("#ans1").val(toFloat(a[0], precision1));
                $("#ans2").val(toFloat(a[1], precision1));
                $("#ans3").val(toFloat(a[2], precision1));
                cone([0,1,2], a, vertices, normals);
            }
        } else {
            console.log("asqr = ", toFloat(asqr));
            console.log("bsqr = ", toFloat(bsqr));
            console.log("csqr = ", toFloat(csqr));
            console.log("x0 = ", toFloat(x0));
            console.log("y0 = ", toFloat(y0));
            console.log("z0 = ", toFloat(z0));

            $("#ans [value='0']").prop("selected", true);
        }

        var colorp = [0.0, 0.8, 0.0, 1.0];
        var colorl = [0.0, 0.0, 0.0, 1.0];
        var indices = [];
        for (var k = 0; k < vertices.length; k++) {
            indices[k] = [];
            for (var i=0; i < slices1; i++) {
                for (var j=0; j < slices; j++) {
                    var aa = [i*(slices+1)+j, i*(slices+1)+j+1, (i+1)*(slices+1)+j+1, (i+1)*(slices+1)+j];
                    indices[k].push(aa[0],aa[1],aa[2],aa[0],aa[2],aa[3]);
                }
            }
            if (!normals[k]) {
                normals[k] = [];
                for (var i = 0; i <= slices1; i++) {
                    for (var j = 0; j <= slices; j++) {
                        normals[k].push( 0.0, 0.0, 1.0 );
                    }
                }
            }
            meshes.push({
                vertices:vertices[k],
                normals:normals[k],
                indices:indices[k],
                color:colorp,
                reinit:true
            });
            for (var i=0; i < slices1; i++) {
                for (var j=0; j < slices; j++) {
                    var aa = [i*(slices+1)+j, i*(slices+1)+j+1, (i+1)*(slices+1)+j+1, (i+1)*(slices+1)+j];
                    if (i%16==0) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                    }
                    if (j%16==15) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], rad:1, color:colorl});
                    }
                    if (j==0) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
                    }
                    if (i==slices1-1) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
                    }

                    if (j==slices-1) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], rad:1, color:colorl});
                    }
                }
            }
        }

        function changeVariables(p0, n0, p, n) {
            var px1 = p0[0]+x0;
            var py1 = p0[1]+y0;
            var pz1 = p0[2]+z0;

            var px2 = px1;
            var py2 = py1*cosphiYZ-pz1*sinphiYZ;
            var pz2 = py1*sinphiYZ+pz1*cosphiYZ;

            var px3 = px2*cosphiXZ-pz2*sinphiXZ;
            var py3 = py2;
            var pz3 = px2*sinphiXZ+pz2*cosphiXZ;

            p[0] = px3*cosphiXY-py3*sinphiXY;
            p[1] = px3*sinphiXY+py3*cosphiXY;
            p[2] = pz3;

            var nx1 = n0[0];
            var ny1 = n0[1]*cosphiYZ-n0[2]*sinphiYZ;
            var nz1 = n0[1]*sinphiYZ+n0[2]*cosphiYZ;

            var nx2 = nx1*cosphiXZ-nz1*sinphiXZ;
            var ny2 = ny1;
            var nz2 = nx1*sinphiXZ+nz1*cosphiXZ;

            n[0] = nx2*cosphiXY-ny2*sinphiXY;
            n[1] = nx2*sinphiXY+ny2*cosphiXY;
            n[2] = nz2;
        }
        function ell(coords, a, vertices, normals) {
            vertices[0] = [];
            normals[0] = [];
            for (var i = 0; i <= slices1; i++) {
                var psi = i*2.0*Math.PI/slices1;
                for (var j = 0; j <= slices; j++) {
                    var phi = j*Math.PI/slices;

                    var p0 = [];
                    var n0 = [];

                    p0[coords[0]] = a[coords[0]]*Math.sin(phi)*Math.cos(psi);
                    p0[coords[1]] = a[coords[1]]*Math.sin(phi)*Math.sin(psi);
                    p0[coords[2]] = a[coords[2]]*Math.cos(phi);

                    n0[coords[0]] = 2*p0[coords[0]]/a[coords[0]]/a[coords[0]];
                    n0[coords[1]] = 2*p0[coords[1]]/a[coords[1]]/a[coords[1]];
                    n0[coords[2]] = 2*p0[coords[2]]/a[coords[2]]/a[coords[2]];

                    var p = [];
                    var n = [];
                    changeVariables(p0, n0, p, n);
                    vertices[0].push( p[1], p[2], p[0] );
                    normals[0].push( n[1], n[2], n[0] );
                }
            }
        }
        function hyp1(coords, a, vertices, normals) {
            vertices[0] = [];
            normals[0] = [];
            for (var i = 0; i <= slices1; i++) {
                var psi = i*2.0*Math.PI/slices1;
                for (var j = 0; j <= slices; j++) {
                    var phi = (j/slices-0.5)*2*2;

                    var p0 = [];
                    var n0 = [];

                    p0[coords[0]] = a[coords[0]]*Math.cosh(phi)*Math.sin(psi);
                    p0[coords[1]] = a[coords[1]]*Math.cosh(phi)*Math.cos(psi);
                    p0[coords[2]] = a[coords[2]]*Math.sinh(phi);

                    n0[coords[0]] = 2*p0[coords[0]]/a[coords[0]]/a[coords[0]];
                    n0[coords[1]] = 2*p0[coords[1]]/a[coords[1]]/a[coords[1]];
                    n0[coords[2]] = -2*p0[coords[2]]/a[coords[2]]/a[coords[2]];

                    var p = [];
                    var n = [];
                    changeVariables(p0, n0, p, n);
                    vertices[0].push( p[1], p[2], p[0] );
                    normals[0].push( n[1], n[2], n[0] );
                }
            }
        }
        function hyp2(coords, a, vertices, normals) {
            vertices[0] = [];
            normals[0] = [];
            vertices[1] = [];
            normals[1] = [];
            for (var i = 0; i <= slices1; i++) {
                var psi = i*2.0*Math.PI/slices1;
                for (var j = 0; j <= slices; j++) {
                    var phi = (j/slices)*1.5;

                    var p01 = [];
                    var n01 = [];
                    var p02 = [];
                    var n02 = [];

                    p01[coords[0]] = a[coords[0]]*Math.sinh(phi)*Math.sin(psi);
                    p01[coords[1]] = a[coords[1]]*Math.sinh(phi)*Math.cos(psi);
                    p01[coords[2]] = a[coords[2]]*Math.cosh(phi);

                    n01[coords[0]] =  2*p01[coords[0]]/a[coords[0]]/a[coords[0]];
                    n01[coords[1]] =  2*p01[coords[1]]/a[coords[1]]/a[coords[1]];
                    n01[coords[2]] = -2*p01[coords[2]]/a[coords[2]]/a[coords[2]];

                    p02[coords[0]] =  p01[coords[0]];
                    p02[coords[1]] =  p01[coords[1]];
                    p02[coords[2]] = -p01[coords[2]];

                    n02[coords[0]] =  n01[coords[0]];
                    n02[coords[1]] =  n01[coords[1]];
                    n02[coords[2]] = -n01[coords[2]];

                    var p = [];
                    var n = [];
                    changeVariables(p01, n01, p, n);
                    vertices[0].push( p[1], p[2], p[0] );
                    normals[0].push( n[1], n[2], n[0] );
                    changeVariables(p02, n02, p, n);
                    vertices[1].push( p[1], p[2], p[0] );
                    normals[1].push( n[1], n[2], n[0] );
                }
            }
        }
        function cone(coords, a, vertices, normals) {
            vertices[0] = [];
            normals[0] = [];
            for (var i = 0; i <= slices1; i++) {
                var psi = i*2.0*Math.PI/slices1;
                for (var j = 0; j <= slices; j++) {
                    var phi = (j/slices-0.5)*2*10;

                    var p0 = [];
                    var n0 = [];

                    p0[coords[0]] = a[coords[0]]*phi*Math.sin(psi);
                    p0[coords[1]] = a[coords[1]]*phi*Math.cos(psi);
                    p0[coords[2]] = a[coords[2]]*phi;

                    n0[coords[0]] = 2*p0[coords[0]]/a[coords[0]]/a[coords[0]];
                    n0[coords[1]] = 2*p0[coords[1]]/a[coords[1]]/a[coords[1]];
                    n0[coords[2]] = -2*p0[coords[2]]/a[coords[2]]/a[coords[2]];

                    var p = [];
                    var n = [];
                    changeVariables(p0, n0, p, n);
                    vertices[0].push( p[1], p[2], p[0] );
                    normals[0].push( n[1], n[2], n[0] );
                }
            }
        }
        function cylhyp(coords, a, vertices, normals) {
            vertices[0] = [];
            normals[0] = [];
            vertices[1] = [];
            normals[1] = [];
            for (var i = 0; i <= slices1; i++) {
                var psi = (i/slices1-0.5)*2*3;
                for (var j = 0; j <= slices; j++) {
                    var phi = j/slices;

                    var p01 = [];
                    var n01 = [];
                    var p02 = [];
                    var n02 = [];

                    p01[coords[0]] = a[coords[0]]*Math.cosh(psi);
                    p01[coords[1]] = a[coords[1]]*Math.sinh(psi);
                    p01[coords[2]] = (phi-0.5)*20;

                    n01[coords[0]] = -2*p01[coords[0]]/a[coords[0]]/a[coords[0]];
                    n01[coords[1]] = 2*p01[coords[1]]/a[coords[1]]/a[coords[1]];
                    n01[coords[2]] = 0;

                    p02[coords[0]] = -p01[coords[0]];
                    p02[coords[1]] = p01[coords[1]];
                    p02[coords[2]] = p01[coords[2]];

                    n02[coords[0]] = -n01[coords[0]];
                    n02[coords[1]] = n01[coords[1]];
                    n02[coords[2]] = n01[coords[2]];

                    var p = [];
                    var n = [];
                    changeVariables(p01, n01, p, n);
                    vertices[0].push( p[1], p[2], p[0] );
                    normals[0].push( n[1], n[2], n[0] );

                    var p = [];
                    var n = [];
                    changeVariables(p02, n02, p, n);
                    vertices[1].push( p[1], p[2], p[0] );
                    normals[1].push( n[1], n[2], n[0] );
                }
            }
        }
        function cylpar(coords, a, vertices, normals) {
            vertices[0] = [];
            normals[0] = [];
            for (var i = 0; i <= slices1; i++) {
                var psi = (i/slices1-0.5)*2*Math.sqrt(10*Math.abs(a));
                for (var j = 0; j <= slices; j++) {
                    var phi = j/slices;

                    var p0 = [];
                    var n0 = [];

                    p0[coords[0]] = psi;
                    p0[coords[1]] = psi*psi/a;
                    p0[coords[2]] = (phi-0.5)*20;

                    n0[coords[0]] = 2*p0[coords[0]]/a;
                    n0[coords[1]] = -1;
                    n0[coords[2]] = 0;

                    var p = [];
                    var n = [];
                    changeVariables(p0, n0, p, n);
                    vertices[0].push( p[1], p[2], p[0] );
                    normals[0].push( n[1], n[2], n[0] );
                }
            }
        }

        function parhyp(coords, a, vertices, normals) {
            vertices[0] = [];
            normals[0] = [];
            for (var i = 0; i <= slices1; i++) {
                var psi = i/slices1*2.0*Math.PI;
                for (var j = 0; j <= slices; j++) {
                    var phi = j/slices*Math.sqrt(10*(a[coords[0]]+a[coords[1]])*Math.abs(a[coords[2]]));

                    var p0 = [];
                    var n0 = [];

                    p0[coords[0]] = a[coords[0]]*phi*Math.sin(psi);
                    p0[coords[1]] = a[coords[1]]*phi*Math.cos(psi);
                    p0[coords[2]] = -phi*phi/a[coords[2]]*(1-2*Math.pow(Math.sin(psi),2));

                    n0[coords[0]] = 2*p0[coords[0]]/a[coords[0]]/a[coords[0]];
                    n0[coords[1]] = -2*p0[coords[1]]/a[coords[1]]/a[coords[1]];
                    n0[coords[2]] = -1*a[coords[2]];

                    var p = [];
                    var n = [];
                    changeVariables(p0, n0, p, n);
                    vertices[0].push( p[1], p[2], p[0] );
                    normals[0].push( n[1], n[2], n[0] );
                }
            }
        }

        function parellpos(coords, a, vertices, normals) {
            vertices[0] = [];
            normals[0] = [];
            for (var i = 0; i <= slices1; i++) {
                var psi = i/slices1*2.0*Math.PI;
                for (var j = 0; j <= slices; j++) {
                    var phi = j/slices*Math.sqrt(10*(a[coords[0]]+a[coords[1]])*Math.abs(a[coords[2]]));

                    var p0 = [];
                    var n0 = [];

                    p0[coords[0]] = a[coords[0]]*phi*Math.sin(psi);
                    p0[coords[1]] = a[coords[1]]*phi*Math.cos(psi);
                    p0[coords[2]] = phi*phi/a[coords[2]];

                    n0[coords[0]] = 2*p0[coords[0]]/a[coords[0]]/a[coords[0]];
                    n0[coords[1]] = 2*p0[coords[1]]/a[coords[1]]/a[coords[1]];
                    n0[coords[2]] = -1*a[coords[2]];

                    var p = [];
                    var n = [];
                    changeVariables(p0, n0, p, n);
                    vertices[0].push( p[1], p[2], p[0] );
                    normals[0].push( n[1], n[2], n[0] );
                }
            }
        }

        function parellneg(coords, a, vertices, normals) {
            vertices[0] = [];
            normals[0] = [];
            for (var i = 0; i <= slices1; i++) {
                var psi = i/slices1*2.0*Math.PI;
                for (var j = 0; j <= slices; j++) {
                    var phi = j/slices*Math.sqrt(10*(a[coords[0]]+a[coords[1]])*Math.abs(a[coords[2]]));

                    var p0 = [];
                    var n0 = [];

                    p0[coords[0]] = a[coords[0]]*phi*Math.sin(psi);
                    p0[coords[1]] = a[coords[1]]*phi*Math.cos(psi);
                    p0[coords[2]] = -phi*phi/a[coords[2]];

                    n0[coords[0]] = 2*p0[coords[0]]/a[coords[0]]/a[coords[0]];
                    n0[coords[1]] = 2*p0[coords[1]]/a[coords[1]]/a[coords[1]];
                    n0[coords[2]] = 1*a[coords[2]];

                    var p = [];
                    var n = [];
                    changeVariables(p0, n0, p, n);
                    vertices[0].push( p[1], p[2], p[0] );
                    normals[0].push( n[1], n[2], n[0] );
                }
            }
        }
    } // if (showSolution)
}
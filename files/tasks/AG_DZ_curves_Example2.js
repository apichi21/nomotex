var dimention="2d";
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

    var conditions = "$а)$ Определить тип кривой по заданному уравнению вида \\begin{equation} Ax^2+2Вxy+Cy^2+2Dx+2Ey+F=0, \\end{equation} где $A, B, C, D, E, F$ - некоторые действительные числа, а также определить тип кривой для частного случая из пункта $б)$.<br> \
      $б)$ Привести кривую к каноническому виду и записать название кривой для случая, когда $A=2$, $B=0$, $C=-1$, $D=4$, $E=2$, $F=8$, т.е. уравнение $(1)$ принимает вид: \\begin{equation*} 2 x^2 - y^2 + 8 x+ 4 y + 8 = 0\\end{equation*}\
      $в)$ Найти координаты фокусов, определить эксцентриситет для эллипса и гиперболы; составить уравнения асимптот для гиперболы; для параболы найти значение параметра, составить уравнение директрисы (в исходной декартовой системе координат $Oxy$) для частного случая из пункта $б)$.<br> Ответ дать с точностью до 3-го знака после запятой.";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
      var algorithm = "<p class='toggleable'>$a)$ Для определения типа кривой с уравнением $(1)$ вычислим определитель $I$, составленный из коэффициентов уравнения $(1)$: \
      \\begin{equation*} I = \\begin{vmatrix} A & B \\\\ B & C \\end{vmatrix} = AC - B^2 \\end{equation*}</p>";
      algorithm += "<ul class='toggleable'> Если <li> $I>0$, то кривая эллиптического типа (эллипс, мнимый эллипс, точка (вырожденный эллипс, пара мнимых пересекающихся прямых); </li> \
      <li> $I<0$, то кривая гиперболического типа (гипербола (сопряженная гипербола), пара пересекающихся прямых); </li> \
      <li> $I=0$, то кривая параболического типа (парабола, пара парллельных прямых, пара мнимых параллельных прямых, пара совпавших прямых). </li>  </ul>";
      algorithm += "<p class='toggleable'>В нашем случае \
      \\begin{equation*} I = \\begin{vmatrix} 2 & 0 \\\\ 0 & -1 \\end{vmatrix} = -2. \\end{equation*}\
      Следовательно, кривая гиперболического типа.</p>";
      algorithm += "<p class='toggleable'>$б)$ Для приведения кривой к каноническому виду необходимо выделить полные квадраты, для этого группируем члены, содержащие $x$ и $y$: \
      \\begin{equation*} 2(x^2 + 4x + 4 -4) - (y^2 - 4y + 4-4)+8=0; \\end{equation*}\
      \\begin{equation*} 2(x+2)^2 - (y-2)^2 -8+4+8=0; \\end{equation*}\
      \\begin{equation*} 2(x+2)^2 - (y-2)^2 = -4; \\end{equation*}\
      \\begin{equation} \\frac{(y-2)^2}{4}-\\frac{(x+2)^2}{2}  = 1. \\end{equation} </p>";
      algorithm += "<p class='toggleable'>Сделаем замену координат: \
      \\begin{equation*} \\begin{cases} x'=y-2 \\\\ y'=x+2 \\end{cases} \\end{equation*}</p>";
      algorithm += "<p class='toggleable'>Тогда уравнение $(2)$ примет вид: \
      \\begin{equation*}  \\frac{x'^2}{a^2}- \\frac{y'^2}{b^2}=1  \\end{equation*} \
      &mdash; каноническое уравнение гиперболы, где $a=2$, $b=\\sqrt{2}$ $(a \\ge b)$. <br> \
      $O'=(-2; 2)$ &mdash; начало канонической системы координат $O'x'y'$.</p>";
      algorithm += "<p class='toggleable'>Следовательно, уравнение $(2)$ является уравнением сопряженной гиперболы с центром симметрии $O'=(-2; 2)$. </p>";
      algorithm += "<p class='toggleable'>$в)$ Для нахождения координат фокусов вычислим $$c^2 = a^2 + b^2 = 4+2=6.$$</p>";
      algorithm += "<p class='toggleable'>Известно, что координаты фокусов в канонической системе координат $O'x'y'$ \
      \\begin{equation*} F'_1 = (-c,0), F'_2 = (c,0).\\end{equation*} \
      Следовательно,\
      \\begin{equation*} F'_1 = (-\\sqrt{6},0), F'_2 = (\\sqrt{6},0). \\end{equation*}    </p>";
      algorithm += "<p class='toggleable'>Уравнения асимптот в системе координат $O'x'y'$ будут иметь вид: \
      \\begin{equation*} y'=\\pm \\frac{b}{a}x' \\end{equation*} \\begin{equation*} y'=\\pm \\frac{1}{\\sqrt 2}x' \\end{equation*}    </p>";
      algorithm += "<p class='toggleable'>В системе координат $Oxy$ уравнения асимптот имеют вид: \
      \\begin{equation*} (x+2)=\\pm \\frac{1}{\\sqrt 2}(y-2) \\end{equation*} или \\begin{equation*} (y-2)=\\pm \\sqrt 2 (x+2) \\end{equation*}     </p>";
      algorithm += "<p class='toggleable'>Эксцентриситет вычислим по формуле $\\varepsilon = \\frac{c}{a}$: \
      \\begin{equation*} \\varepsilon = \\frac{\\sqrt{6}}{2} \\end{equation*}</p>";
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

    values[0].push([2, 0, -1, 8, 4, 8]);
    values[0].push([9, 0, -4, -90, -40, -235]);
    values[0].push([2, 0, -3, -12, 18, 15]);

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

    var answer = '<p>Тип кривой: <select id="ans">\
    <option value="0">...</option>\
    <option value="ell">эллипс</option>\
    <option value="ellI">мнимый эллипс</option>\
    <option value="point">точка</option>\
    <option value="hypX">гипербола</option>\
    <option value="hypY">сопряженная гипербола</option>\
    <option value="cross">пара пересекающихся прямых</option>\
    <option value="par">парабола</option>\
    <option value="parallel">пара параллельных прямых</option>\
    <option value="parallelI">пара мнимых параллельных прямых</option>\
    <option value="line">пара совпадающих прямых</option>\
    </select></p>';

    equationsArray = [];
    separatorsArray = [];
    equationsArray.push({text: "...", params: [], points: [], lines: 0});
    equationsPointer = {};

    equationsArray.push({text: "$\\frac{(x-x_0)^2}{a^2}+\\frac{(y-y_0)^2}{b^2}=1$", params: ["$x_0$","$y_0$","$a$","$b$","$\\varepsilon$"], points: ["$F_1$","$F_2$"], lines: 0});equationsPointer["ell"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{(x-x_0)^2}{a^2}+\\frac{(y-y_0)^2}{b^2}=-1$", params: ["$x_0$","$y_0$","$a$","$b$"], points: [], lines: 0});equationsPointer["ellI"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{(x-x_0)^2}{a^2}+\\frac{(y-y_0)^2}{b^2}=0$", params: ["$x_0$","$y_0$","$\\frac{b}{a}$"], points: [], lines: 0});equationsPointer["point"] = equationsArray.length-1;
    separatorsArray.push(equationsArray.length-1);
    equationsArray.push({text: "$\\frac{(x-x_0)^2}{a^2}-\\frac{(y-y_0)^2}{b^2}=1$", params: ["$x_0$","$y_0$","$a$","$b$","$\\varepsilon$"], points: ["$F_1$","$F_2$"], lines: 1});equationsPointer["hypX"] = equationsArray.length-1;
    equationsArray.push({text: "$-\\frac{(x-x_0)^2}{a^2}+\\frac{(y-y_0)^2}{b^2}=1$", params: ["$x_0$","$y_0$","$a$","$b$","$\\varepsilon$"], points: ["$F_1$","$F_2$"], lines: 1});equationsPointer["hypY"] = equationsArray.length-1;
    equationsArray.push({text: "$\\frac{(x-x_0)^2}{a^2}-\\frac{(y-y_0)^2}{b^2}=0$", params: ["$x_0$","$y_0$","$\\frac{b}{a}$"], points: [], lines: 0});equationsPointer["cross"] = equationsArray.length-1;
    separatorsArray.push(equationsArray.length-1);
    equationsArray.push({text: "$(y-y_0)^2=2p(x-x_0)$", params: ["$x_0$","$y_0$","$p$"], points: ["$F$"], lines: 2});equationsPointer["parx"] = equationsArray.length-1;
    equationsArray.push({text: "$(x-x_0)^2=2p(y-y_0)$", params: ["$x_0$","$y_0$","$p$"], points: ["$F$"], lines: 3});equationsPointer["pary"] = equationsArray.length-1;
    separatorsArray.push(equationsArray.length-1);
    equationsArray.push({text: "$(x-x_0)^2=a^2$", params: ["$x_0$","$a$"], points: [], lines: 0});equationsPointer["parallelx"] = equationsArray.length-1;
    equationsArray.push({text: "$(y-y_0)^2=b^2$", params: ["$y_0$","$b$"], points: [], lines: 0});equationsPointer["parallely"] = equationsArray.length-1;
    separatorsArray.push(equationsArray.length-1);
    equationsArray.push({text: "$(x-x_0)^2=-a^2$", params: ["$x_0$","$a$"], points: [], lines: 0});equationsPointer["parallelIx"] = equationsArray.length-1;
    equationsArray.push({text: "$(y-y_0)^2=-b^2$", params: ["$y_0$","$b$"], points: [], lines: 0});equationsPointer["parallelIy"] = equationsArray.length-1;
    separatorsArray.push(equationsArray.length-1);
    equationsArray.push({text: "$(x-x_0)^2=0$", params: ["$x_0$"], points: [], lines: 0});equationsPointer["lineX"] = equationsArray.length-1;
    equationsArray.push({text: "$(y-y_0)^2=0$", params: ["$y_0$"], points: [], lines: 0});equationsPointer["lineY"] = equationsArray.length-1;

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

    answer += '<div id="answerInputs">';
    answer += '<p><span class="name">$ans_1$</span> = <input type="text" id="ans1" size=5></p>';
    answer += '<p><span class="name">$ans_2$</span> = <input type="text" id="ans2" size=5></p>';
    answer += '<p><span class="name">$ans_3$</span> = <input type="text" id="ans3" size=5></p>';
    answer += '<p><span class="name">$ans_4$</span> = <input type="text" id="ans4" size=5></p>';
    answer += '<p><span class="name">$ans_5$</span> = <input type="text" id="ans5" size=5></p>';
    answer += '<p><span class="name">$ans_6$</span> = <input type="text" id="ans6" size=5></p>';
    answer += '</div>';
    answer += '<div id="answerPoints">';
    answer += '<p><span class="name">$P_1$</span>: $x$ = <input type="text" id="pans1x" size=5> $y$ = <input type="text" id="pans1y" size=5></p>';
    answer += '<p><span class="name">$P_2$</span>: $x$ = <input type="text" id="pans2x" size=5> $y$ = <input type="text" id="pans2y" size=5></p>';
    answer += '</div>';
    answer += '<div id="answerLinesXY">';
    answer += '<p><span class="name">Aсимптоты $y-y_0=\\pm k(x-x_0)$</span>:<br>$k$ = <input type="text" id="lans1" size=5></p>';
    answer += '</div>';
    answer += '<div id="answerLinesX">';
    answer += '<p><span class="name">Директриса: $x=$ </span><input type="text" id="lans2" size=5></p>';
    answer += '</div>';
    answer += '<div id="answerLinesY">';
    answer += '<p><span class="name">Директриса: $y=$ </span><input type="text" id="lans3" size=5></p>';
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

    for (var i = 0; i < equationsArray[eqv].points.length; i++) {
        $("#answerPoints p").eq(i).css({display:"block"}).children(".name").html(equationsArray[eqv].points[i]);
    }
    for (var i = equationsArray[eqv].points.length; i < 6; i++) {
        $("#answerPoints p").eq(i).css({display:"none"});
    }

    for (var i = 0; i < equationsArray[eqv].params.length; i++) {
        $("#answerInputs p").eq(i).css({display:"block"}).children(".name").html(equationsArray[eqv].params[i]);
    }
    for (var i = equationsArray[eqv].params.length; i < 6; i++) {
        $("#answerInputs p").eq(i).css({display:"none"});
    }

    if (equationsArray[eqv].lines == 0) {
        $("#answerLinesXY p").css({display:"none"});
        $("#answerLinesX p").css({display:"none"});
        $("#answerLinesY p").css({display:"none"});
    } else if (equationsArray[eqv].lines == 1) {
        $("#answerLinesXY p").css({display:"block"});
        $("#answerLinesX p").css({display:"none"});
        $("#answerLinesY p").css({display:"none"});
    } else if (equationsArray[eqv].lines == 2) {
        $("#answerLinesXY p").css({display:"none"});
        $("#answerLinesX p").css({display:"block"});
        $("#answerLinesY p").css({display:"none"});
    } else if (equationsArray[eqv].lines == 3) {
        $("#answerLinesXY p").css({display:"none"});
        $("#answerLinesX p").css({display:"none"});
        $("#answerLinesY p").css({display:"block"});
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function generateAnsText()
{
    var ansArr = [];
    ansArr.push($("#ans").val());
    ansArr.push(chosenEquation);
    for (var j = 1; j <= equationsArray[chosenEquation].params.length; j++) {
        ansArr.push(parseFloat($("#ans"+j).val()).toFixed(precision1));
    }
    for (var j = 1; j <= equationsArray[chosenEquation].points.length; j++) {
        ansArr.push(parseFloat($("#pans"+j+"x").val()).toFixed(precision1));
        ansArr.push(parseFloat($("#pans"+j+"y").val()).toFixed(precision1));
    }
    if (equationsArray[chosenEquation].lines != 0) {
        ansArr.push(parseFloat($("#lans"+equationsArray[chosenEquation].lines).val()).toFixed(precision1));
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
    $("#curve").html( "$" +linCombText([cval[i],cval[i+1],cval[i+2],cval[i+3],cval[i+4],cval[i+5]],["x^2","xy","y^2","x","y",""]) + "=0$" );
    for (var i = 0; i <= 5; i++) {
        coefs[i] = cval[i]
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
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});
    if (showSolution) {
        var A = coefs[0];
        var B = coefs[1] / 2.0;
        var C = coefs[2];
        var D = coefs[3];
        var E = coefs[4];
        var F = coefs[5];

        var I = A*C-B*B;

        var tgphi;
        var sinphi;
        var cosphi;

        if (B != 0) {
            var eqvb = (A-C) / B;
            tgphi = (-eqvb+Math.sqrt(eqvb*eqvb+4.0)) / 2.0;

            sinphi = tgphi/Math.sqrt(1.0+tgphi*tgphi);
            cosphi = 1.0/Math.sqrt(1.0+tgphi*tgphi);
        } else {
            tgphi = 0.0;
            sinphi = 0.0;
            cosphi = 1.0;
        }

        var A1 = A*cosphi*cosphi+2*B*cosphi*sinphi+C*sinphi*sinphi;
        var C1 = A*sinphi*sinphi-2*B*cosphi*sinphi+C*cosphi*cosphi;
        var D1 = D*cosphi+E*sinphi;
        var E1 = -D*sinphi+E*cosphi;

        var x0;
        var y0;
        var F1 = F;

        if (A1 != 0) {
            x0 = -D1/2.0/A1;
            F1 -= D1*D1/4.0/A1;
        } else {
            x0 = 0;
        }
        if (C1 != 0) {
            y0 = -E1/2.0/C1;
            F1 -= E1*E1/4.0/C1;
        } else {
            y0 = 0;
        }

        var asqr = F1 != 0 ? -F1/A1 : 1/A1;
        var bsqr = F1 != 0 ? -F1/C1 : 1/C1;
        var lineVertices = [];

        if (A1 == 0 && C1 != 0 && D1 != 0) {
            $("#ans [value='par']").prop("selected", true);
            var F1 = F-E1*E1/4.0/C1;

            var p = -D1/2.0/C1;
            var x0 = -F1/D1;

            var slices1 = 40;
            lineVertices[0] = [];
            var maxLen0 = 10;
            var maxLen = maxLen0;
            if (maxLen*maxLen/2/Math.abs(p) > maxLen) {
                maxLen = Math.sqrt(maxLen*2*Math.abs(p));
            }
            for (var i = 0; i <= slices1; i++) {
                var psi = (i/slices1*2-1)*maxLen;

                var px2 = psi*psi/2/p;
                var py2 = psi;
                var px1 = px2+x0;
                var py1 = py2+y0;
                var px = px1*cosphi-py1*sinphi;
                var py = px1*sinphi+py1*cosphi;
                lineVertices[0].push( [px, py, 0] );
            }

            var F1x2 = p/2;
            var F1y2 = 0;
            var F21x2 = -p/2;
            var F21y2 = -maxLen0;
            var F22x2 = -p/2;
            var F22y2 = maxLen0;
            var F1x1 = F1x2+x0;
            var F1y1 = F1y2+y0;
            var F21x1 = F21x2+x0;
            var F21y1 = F21y2+y0;
            var F22x1 = F22x2+x0;
            var F22y1 = F22y2+y0;
            var F1x = F1x1*cosphi-F1y1*sinphi;
            var F1y = F1x1*sinphi+F1y1*cosphi;
            var F21x = F21x1*cosphi-F21y1*sinphi;
            var F21y = F21x1*sinphi+F21y1*cosphi;
            var F22x = F22x1*cosphi-F22y1*sinphi;
            var F22y = F22x1*sinphi+F22y1*cosphi;

            chooseEquations(equationsPointer["parx"]);
            $("#pans1x").val(parseFloat(F1x.toFixed(precision1)));
            $("#pans1y").val(parseFloat(F1y.toFixed(precision1)));
            $("#ans1").val(parseFloat(x0.toFixed(precision1)));
            $("#ans2").val(parseFloat(y0.toFixed(precision1)));
            $("#ans3").val(parseFloat(p.toFixed(precision1)));
            $("#lans2").val(parseFloat((x0-p/2).toFixed(precision1)));

            primitives.push({class:"point", text: katex.renderToString("F"), arr0:[F1x, F1y, 0], rad:3, color:[0.0, 0.0, 1.0, 1.0]});
            primitives.push({class:"line", text: katex.renderToString('d'), ratio: 0.7, arr0:[F21x,F21y,0], arr1:[F22x,F22y,0], rad:2, color:[0.0, 1.0, 0.0, 1.0]});
        } else if (A1 != 0 && C1 == 0 && E1 != 0) {
            $("#ans [value='par']").prop("selected", true);
            var F1 = F-D1*D1/4.0/A1;
            var p = -E1/2.0/A1;
            var y0 = -F1/E1;

            var slices1 = 40;
            lineVertices[0] = [];
            var maxLen0 = 10;
            var maxLen = maxLen0;
            if (maxLen*maxLen/2/Math.abs(p) > maxLen) {
                maxLen = Math.sqrt(maxLen*2*Math.abs(p));
            }
            for (var i = 0; i <= slices1; i++) {
                var psi = (i/slices1*2-1)*maxLen;

                var px2 = psi;
                var py2 = psi*psi/2/p;
                var px1 = px2+x0;
                var py1 = py2+y0;
                var px = px1*cosphi-py1*sinphi;
                var py = px1*sinphi+py1*cosphi;
                lineVertices[0].push( [px, py, 0] );
            }

            var F1x2 = 0;
            var F1y2 = p/2;
            var F21x2 = -maxLen0;
            var F21y2 = -p/2;
            var F22x2 = maxLen0;
            var F22y2 = -p/2;
            var F1x1 = F1x2+x0;
            var F1y1 = F1y2+y0;
            var F21x1 = F21x2+x0;
            var F21y1 = F21y2+y0;
            var F22x1 = F22x2+x0;
            var F22y1 = F22y2+y0;
            var F1x = F1x1*cosphi-F1y1*sinphi;
            var F1y = F1x1*sinphi+F1y1*cosphi;
            var F21x = F21x1*cosphi-F21y1*sinphi;
            var F21y = F21x1*sinphi+F21y1*cosphi;
            var F22x = F22x1*cosphi-F22y1*sinphi;
            var F22y = F22x1*sinphi+F22y1*cosphi;

            chooseEquations(equationsPointer["pary"]);
            $("#pans1x").val(parseFloat(F1x.toFixed(precision1)));
            $("#pans1y").val(parseFloat(F1y.toFixed(precision1)));
            $("#ans1").val(parseFloat(x0.toFixed(precision1)));
            $("#ans2").val(parseFloat(y0.toFixed(precision1)));
            $("#ans3").val(parseFloat(p.toFixed(precision1)));
            $("#lans3").val(parseFloat((y0-p/2).toFixed(precision1)));

            primitives.push({class:"point", text: katex.renderToString("F"), arr0:[F1x, F1y, 0], rad:3, color:[0.0, 0.0, 1.0, 1.0]});
            primitives.push({class:"line", text: katex.renderToString('d'), ratio: 0.7, arr0:[F21x,F21y,0], arr1:[F22x,F22y,0], rad:2, color:[0.0, 1.0, 0.0, 1.0]});
        } else if (F1 == 0) {
             if (A1 == 0) {
                $("#ans [value='line']").prop("selected", true);

                var P1x2 = -1;
                var P1y2 = 0;
                var P2x2 = 1;
                var P2y2 = 0;

                var P1x1 = P1x2;
                var P1y1 = P1y2+y0;
                var P2x1 = P2x2;
                var P2y1 = P2y2+y0;

                var P1x = P1x1*cosphi-P1y1*sinphi;
                var P1y = P1x1*sinphi+P1y1*cosphi;
                var P2x = P2x1*cosphi-P2y1*sinphi;
                var P2y = P2x1*sinphi+P2y1*cosphi;

                chooseEquations(equationsPointer["lineY"]);
                $("#ans1").val(parseFloat(y0.toFixed(precision1)));
                var p1 = [];
                var p2 = [];
                createLine([P1x,P1y,0], [P2x,P2y,0], p1, p2,20);
                primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:2, color:[0.0, 0.0, 1.0, 1.0]});
            } else if (C1 == 0) {
                $("#ans [value='line']").prop("selected", true);

                var P1x2 = 0;
                var P1y2 = -1;
                var P2x2 = 0;
                var P2y2 = 1;

                var P1x1 = P1x2+x0;
                var P1y1 = P1y2;
                var P2x1 = P2x2+x0;
                var P2y1 = P2y2;

                var P1x = P1x1*cosphi-P1y1*sinphi;
                var P1y = P1x1*sinphi+P1y1*cosphi;
                var P2x = P2x1*cosphi-P2y1*sinphi;
                var P2y = P2x1*sinphi+P2y1*cosphi;

                chooseEquations(equationsPointer["lineX"]);
                $("#ans1").val(parseFloat(x0.toFixed(precision1)));
                var p1 = [];
                var p2 = [];
                createLine([P1x,P1y,0], [P2x,P2y,0], p1, p2,20);
                primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:2, color:[0.0, 0.0, 1.0, 1.0]});
            } else if (asqr > 0 && bsqr > 0) {
                $("#ans [value='point']").prop("selected", true);

                var a = Math.sqrt(asqr);
                var b = Math.sqrt(bsqr);
                var Px2 = 0;
                var Py2 = 0;
                var Px1 = Px2+x0;
                var Py1 = Py2+y0;
                var Px = P1x1*cosphi-P1y1*sinphi;
                var Py = P1x1*sinphi+P1y1*cosphi;

                chooseEquations(equationsPointer["point"]);
                $("#ans1").val(parseFloat(x0.toFixed(precision1)));
                $("#ans2").val(parseFloat(y0.toFixed(precision1)));
                $("#ans3").val(parseFloat((b/a).toFixed(precision1)));
                primitives.push({class:"point", text: "", arr0:[x0, y0, 0], rad:4, color:[0.0, 0.0, 1.0, 1.0]});
            } else if ((asqr > 0 && bsqr < 0) || (asqr < 0 && bsqr > 0)) {
                $("#ans [value='cross']").prop("selected", true);

                var a = Math.sqrt(Math.abs(asqr));
                var b = Math.sqrt(Math.abs(bsqr));
                var P1x2 = a;
                var P1y2 = b;
                var P2x2 = a;
                var P2y2 = -b;
                var P1x1 = P1x2+x0;
                var P1y1 = P1y2+y0;
                var P2x1 = P2x2+x0;
                var P2y1 = P2y2+y0;
                var P1x = P1x1*cosphi-P1y1*sinphi;
                var P1y = P1x1*sinphi+P1y1*cosphi;
                var P2x = P2x1*cosphi-P2y1*sinphi;
                var P2y = P2x1*sinphi+P2y1*cosphi;

                chooseEquations(equationsPointer["cross"]);
                $("#ans1").val(parseFloat(x0.toFixed(precision1)));
                $("#ans2").val(parseFloat(y0.toFixed(precision1)));
                $("#ans3").val(parseFloat((b/a).toFixed(precision1)));
                var p1 = [];
                var p2 = [];
                createLine([x0,y0,0], [P1x,P1y,0], p1, p2,20);
                primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:2, color:[0.0, 0.0, 1.0, 1.0]});
                var p1 = [];
                var p2 = [];
                createLine([x0,y0,0], [P2x,P2y,0], p1, p2,20);
                primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:2, color:[0.0, 0.0, 1.0, 1.0]});
            }
        } else if (A1 == 0) {
            if (bsqr > 0) {
                $("#ans [value='parallel']").prop("selected", true);

                var b = Math.sqrt(bsqr);
                var P1x2 = -1;
                var P1y2 = b;
                var P2x2 = 1;
                var P2y2 = b;
                var P3x2 = -1;
                var P3y2 = -b;
                var P4x2 = 1;
                var P4y2 = -b;

                var P1x1 = P1x2;
                var P1y1 = P1y2+y0;
                var P2x1 = P2x2;
                var P2y1 = P2y2+y0;
                var P3x1 = P3x2;
                var P3y1 = P3y2+y0;
                var P4x1 = P4x2;
                var P4y1 = P4y2+y0;

                var P1x = P1x1*cosphi-P1y1*sinphi;
                var P1y = P1x1*sinphi+P1y1*cosphi;
                var P2x = P2x1*cosphi-P2y1*sinphi;
                var P2y = P2x1*sinphi+P2y1*cosphi;
                var P3x = P3x1*cosphi-P3y1*sinphi;
                var P3y = P3x1*sinphi+P3y1*cosphi;
                var P4x = P4x1*cosphi-P4y1*sinphi;
                var P4y = P4x1*sinphi+P4y1*cosphi;

                chooseEquations(equationsPointer["parallely"]);
                $("#ans1").val(parseFloat(y0.toFixed(precision1)));
                $("#ans2").val(parseFloat(b.toFixed(precision1)));
                var p1 = [];
                var p2 = [];
                createLine([P1x,P1y,0], [P2x,P2y,0], p1, p2,20);
                primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:2, color:[0.0, 0.0, 1.0, 1.0]});
                var p1 = [];
                var p2 = [];
                createLine([P3x,P3y,0], [P4x,P4y,0], p1, p2,20);
                primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:2, color:[0.0, 0.0, 1.0, 1.0]});
            } else {
                $("#ans [value='parallelI']").prop("selected", true);
                chooseEquations(equationsPointer["parallelIy"]);
                var b = Math.sqrt(-bsqr);
                $("#ans1").val(parseFloat(y0.toFixed(precision1)));
                $("#ans2").val(parseFloat(b.toFixed(precision1)));
            }
        } else if (C1 == 0) {
            if (asqr > 0) {
                $("#ans [value='parallel']").prop("selected", true);

                var a = Math.sqrt(asqr);
                var P1x2 = a;
                var P1y2 = -1;
                var P2x2 = a;
                var P2y2 = 1;
                var P3x2 = -a;
                var P3y2 = -1;
                var P4x2 = -a;
                var P4y2 = 1;

                var P1x1 = P1x2+x0;
                var P1y1 = P1y2;
                var P2x1 = P2x2+x0;
                var P2y1 = P2y2;
                var P3x1 = P3x2+x0;
                var P3y1 = P3y2;
                var P4x1 = P4x2+x0;
                var P4y1 = P4y2;

                var P1x = P1x1*cosphi-P1y1*sinphi;
                var P1y = P1x1*sinphi+P1y1*cosphi;
                var P2x = P2x1*cosphi-P2y1*sinphi;
                var P2y = P2x1*sinphi+P2y1*cosphi;
                var P3x = P3x1*cosphi-P3y1*sinphi;
                var P3y = P3x1*sinphi+P3y1*cosphi;
                var P4x = P4x1*cosphi-P4y1*sinphi;
                var P4y = P4x1*sinphi+P4y1*cosphi;

                chooseEquations(equationsPointer["parallelx"]);
                $("#ans1").val(parseFloat(x0.toFixed(precision1)));
                $("#ans2").val(parseFloat(a.toFixed(precision1)));
                var p1 = [];
                var p2 = [];
                createLine([P1x,P1y,0], [P2x,P2y,0], p1, p2,20);
                primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:2, color:[0.0, 0.0, 1.0, 1.0]});
                var p1 = [];
                var p2 = [];
                createLine([P3x,P3y,0], [P4x,P4y,0], p1, p2,20);
                primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:2, color:[0.0, 0.0, 1.0, 1.0]});
            } else {
                $("#ans [value='parallelI']").prop("selected", true);
                chooseEquations(equationsPointer["parallelIx"]);
                var a = Math.sqrt(-asqr);
                $("#ans1").val(parseFloat(x0.toFixed(precision1)));
                $("#ans2").val(parseFloat(a.toFixed(precision1)));

            }
        } else if (asqr > 0 && bsqr > 0) {
            $("#ans [value='ell']").prop("selected", true);
            var a = Math.sqrt(asqr);
            var b = Math.sqrt(bsqr);

            var csqr = asqr>=bsqr?asqr-bsqr:bsqr-asqr;
            var c = Math.sqrt(csqr);

            var F1x2 = a>=b?-c:0;
            var F1y2 = a>=b?0:-c;;
            var F2x2 = a>=b?c:0;
            var F2y2 = a>=b?0:c;;
            var F1x1 = F1x2+x0;
            var F1y1 = F1y2+y0;
            var F2x1 = F2x2+x0;
            var F2y1 = F2y2+y0;
            var F1x = F1x1*cosphi-F1y1*sinphi;
            var F1y = F1x1*sinphi+F1y1*cosphi;
            var F2x = F2x1*cosphi-F2y1*sinphi;
            var F2y = F2x1*sinphi+F2y1*cosphi;

            var epsilon = a>=b?c/a:c/b;

            chooseEquations(equationsPointer["ell"]);
            $("#pans1x").val(parseFloat(F1x.toFixed(precision1)));
            $("#pans1y").val(parseFloat(F1y.toFixed(precision1)));
            $("#pans2x").val(parseFloat(F2x.toFixed(precision1)));
            $("#pans2y").val(parseFloat(F2y.toFixed(precision1)));
            $("#ans1").val(parseFloat(x0.toFixed(precision1)));
            $("#ans2").val(parseFloat(y0.toFixed(precision1)));
            $("#ans3").val(parseFloat(a.toFixed(precision1)));
            $("#ans4").val(parseFloat(b.toFixed(precision1)));
            $("#ans5").val(parseFloat(epsilon.toFixed(precision1)));
            primitives.push({class:"point", text: katex.renderToString("F_1"), arr0:[F1x, F1y, 0], rad:3, color:[0.0, 0.0, 1.0, 1.0]});
            primitives.push({class:"point", text: katex.renderToString("F_2"), arr0:[F2x, F2y, 0], rad:3, color:[0.0, 0.0, 1.0, 1.0]});
            primitives.push({class:"point", text: katex.renderToString("F_1"), arr0:[F1x, F1y, 0], rad:3, color:[0.0, 0.0, 1.0, 1.0]});
            primitives.push({class:"point", text: katex.renderToString("F_2"), arr0:[F2x, F2y, 0], rad:3, color:[0.0, 0.0, 1.0, 1.0]});

            var slices1 = 32*2;
            var angle = 2*Math.PI;
            lineVertices[0] = [];
            for (var i = 0; i <= slices1; i++) {
                var psi = i*angle/slices1;
                var px2 = a*Math.cos(psi);
                var py2 = b*Math.sin(psi);
                var px1 = px2+x0;
                var py1 = py2+y0;
                var px = px1*cosphi-py1*sinphi;
                var py = px1*sinphi+py1*cosphi;
                lineVertices[0].push( [px, py, 0] );
            }
        } else if (asqr < 0 && bsqr < 0) {
            $("#ans [value='ellI']").prop("selected", true);
            var a = Math.sqrt(-asqr);
            var b = Math.sqrt(-bsqr);

            chooseEquations(equationsPointer["ellI"]);
            $("#ans1").val(parseFloat(x0.toFixed(precision1)));
            $("#ans2").val(parseFloat(y0.toFixed(precision1)));
            $("#ans3").val(parseFloat(a.toFixed(precision1)));
            $("#ans4").val(parseFloat(b.toFixed(precision1)));
        } else if (asqr > 0 && bsqr < 0) {
            $("#ans [value='hypX']").prop("selected", true);
            bsqr *= -1;
            var a = Math.sqrt(asqr);
            var b = Math.sqrt(bsqr);

            var csqr = asqr+bsqr;

            var c = Math.sqrt(csqr);
            var arrXLen = c*1.5;
            var arrYLen = b*1.5;
            primitives.push({class:"arrow", text: "x'", ratio: 1, arr0:[x0-arrXLen, y0, 0], arr1:[x0+arrXLen, y0, 0], rad:1.2, color:[0.5, 0.0, 0.0, 1.0]});
            primitives.push({class:"arrow", text: "y'", ratio: 1, arr0:[x0, y0-arrYLen, 0], arr1:[x0, y0+arrYLen, 0], rad:1.2, color:[0.5, 0.0, 0.0, 1.0]});
            primitives.push({class:"point", text: "O'", arr0:[x0, y0, 0], rad:2, color:[0.5, 0.0, 0.0, 1.0]});
            var F1x2 = -c;
            var F1y2 = 0;
            var F2x2 = c;
            var F2y2 = 0;
            var F1x1 = F1x2+x0;
            var F1y1 = F1y2+y0;
            var F2x1 = F2x2+x0;
            var F2y1 = F2y2+y0;
            var F1x = F1x1*cosphi-F1y1*sinphi;
            var F1y = F1x1*sinphi+F1y1*cosphi;
            var F2x = F2x1*cosphi-F2y1*sinphi;
            var F2y = F2x1*sinphi+F2y1*cosphi;

            var epsilon = c/a;
            chooseEquations(equationsPointer["hypX"]);
            $("#pans1x").val(parseFloat(F1x.toFixed(precision1)));
            $("#pans1y").val(parseFloat(F1y.toFixed(precision1)));
            $("#pans2x").val(parseFloat(F2x.toFixed(precision1)));
            $("#pans2y").val(parseFloat(F2y.toFixed(precision1)));
            $("#ans1").val(parseFloat(x0.toFixed(precision1)));
            $("#ans2").val(parseFloat(y0.toFixed(precision1)));
            $("#ans3").val(parseFloat(a.toFixed(precision1)));
            $("#ans4").val(parseFloat(b.toFixed(precision1)));
            $("#ans5").val(parseFloat(epsilon.toFixed(precision1)));

            $("#lans1").val(parseFloat((b/a).toFixed(precision1)));
            primitives.push({class:"point", text: katex.renderToString("F_1"), arr0:[F1x, F1y, 0], rad:3, color:[0.0, 0.0, 1.0, 1.0]});
            primitives.push({class:"point", text: katex.renderToString("F_2"), arr0:[F2x, F2y, 0], rad:3, color:[0.0, 0.0, 1.0, 1.0]});

            var slices1 = 32*2;
            var angle = 2*Math.PI;

            lineVertices[0] = [];
            for (var i = 0; i <= slices1; i++) {
                var psi = (i/slices1*2-1)*2.5;
                var px2 = a*Math.cosh(psi);
                var py2 = b*Math.sinh(psi);
                var px1 = px2+x0;
                var py1 = py2+y0;
                var px = px1*cosphi-py1*sinphi;
                var py = px1*sinphi+py1*cosphi;
                lineVertices[0].push( [px, py, 0] );
            }
            lineVertices[1] = [];
            for (var i = 0; i <= slices1; i++) {
                var psi = (i/slices1*2-1)*2.5;
                var px2 = -a*Math.cosh(psi);
                var py2 = b*Math.sinh(psi);
                var px1 = px2+x0;
                var py1 = py2+y0;
                var px = px1*cosphi-py1*sinphi;
                var py = px1*sinphi+py1*cosphi;
                lineVertices[1].push( [px, py, 0] );
            }

            var P1x2 = a;
            var P1y2 = b;
            var P2x2 = a;
            var P2y2 = -b;
            var P1x1 = P1x2+x0;
            var P1y1 = P1y2+y0;
            var P2x1 = P2x2+x0;
            var P2y1 = P2y2+y0;
            var P1x = P1x1*cosphi-P1y1*sinphi;
            var P1y = P1x1*sinphi+P1y1*cosphi;
            var P2x = P2x1*cosphi-P2y1*sinphi;
            var P2y = P2x1*sinphi+P2y1*cosphi;

            var p1 = [];
            var p2 = [];
            createLine([x0,y0,0], [P1x,P1y,0], p1, p2,30);
            primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:1.5, color:[0.0, 1.0, 0.0, 1.0]});
            var p1 = [];
            var p2 = [];
            createLine([x0,y0,0], [P2x,P2y,0], p1, p2,30);
            primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:1.5, color:[0.0, 1.0, 0.0, 1.0]});
        } else if (asqr < 0 && bsqr > 0) {
            $("#ans [value='hypY']").prop("selected", true);
            asqr *= -1;
            var a = Math.sqrt(asqr);
            var b = Math.sqrt(bsqr);

            var csqr = asqr+bsqr;

            var c = Math.sqrt(csqr);
            var arrXLen = a*1.5;
            var arrYLen = c*1.5;
            primitives.push({class:"arrow", text: "y'", ratio: 1, arr0:[x0-arrXLen, y0, 0], arr1:[x0+arrXLen, y0, 0], rad:1.2, color:[0.5, 0.0, 0.0, 1.0]});
            primitives.push({class:"arrow", text: "x'", ratio: 1, arr0:[x0, y0-arrYLen, 0], arr1:[x0, y0+arrYLen, 0], rad:1.2, color:[0.5, 0.0, 0.0, 1.0]});
            primitives.push({class:"point", text: "O'", arr0:[x0, y0, 0], rad:2, color:[0.5, 0.0, 0.0, 1.0]});
            var F1x2 = 0;
            var F1y2 = -c;
            var F2x2 = 0;
            var F2y2 = c;
            var F1x1 = F1x2+x0;
            var F1y1 = F1y2+y0;
            var F2x1 = F2x2+x0;
            var F2y1 = F2y2+y0;
            var F1x = F1x1*cosphi-F1y1*sinphi;
            var F1y = F1x1*sinphi+F1y1*cosphi;
            var F2x = F2x1*cosphi-F2y1*sinphi;
            var F2y = F2x1*sinphi+F2y1*cosphi;

            var epsilon = c/b;

            chooseEquations(equationsPointer["hypY"]);
            $("#pans1x").val(parseFloat(F1x.toFixed(precision1)));
            $("#pans1y").val(parseFloat(F1y.toFixed(precision1)));
            $("#pans2x").val(parseFloat(F2x.toFixed(precision1)));
            $("#pans2y").val(parseFloat(F2y.toFixed(precision1)));
            $("#ans1").val(parseFloat(x0.toFixed(precision1)));
            $("#ans2").val(parseFloat(y0.toFixed(precision1)));
            $("#ans3").val(parseFloat(a.toFixed(precision1)));
            $("#ans4").val(parseFloat(b.toFixed(precision1)));
            $("#ans5").val(parseFloat(epsilon.toFixed(precision1)));
            $("#lans1").val(parseFloat((b/a).toFixed(precision1)));
            primitives.push({class:"point", text: katex.renderToString("F_1"), arr0:[F1x, F1y, 0], rad:3, color:[0.0, 0.0, 1.0, 1.0]});
            primitives.push({class:"point", text: katex.renderToString("F_2"), arr0:[F2x, F2y, 0], rad:3, color:[0.0, 0.0, 1.0, 1.0]});

            var slices1 = 32*2;
            var angle = 2*Math.PI;

            lineVertices[0] = [];
            for (var i = 0; i <= slices1; i++) {
                var psi = (i/slices1*2-1)*2.5;
                var px2 = a*Math.sinh(psi);
                var py2 = b*Math.cosh(psi);
                var px1 = px2+x0;
                var py1 = py2+y0;
                var px = px1*cosphi-py1*sinphi;
                var py = px1*sinphi+py1*cosphi;
                lineVertices[0].push( [px, py, 0] );
            }
            lineVertices[1] = [];
            for (var i = 0; i <= slices1; i++) {
                var psi = (i/slices1*2-1)*2.5;
                var px2 = a*Math.sinh(psi);
                var py2 = -b*Math.cosh(psi);
                var px1 = px2+x0;
                var py1 = py2+y0;
                var px = px1*cosphi-py1*sinphi;
                var py = px1*sinphi+py1*cosphi;
                lineVertices[1].push( [px, py, 0] );
            }

            var P1x2 = a;
            var P1y2 = b;
            var P2x2 = a;
            var P2y2 = -b;
            var P1x1 = P1x2+x0;
            var P1y1 = P1y2+y0;
            var P2x1 = P2x2+x0;
            var P2y1 = P2y2+y0;
            var P1x = P1x1*cosphi-P1y1*sinphi;
            var P1y = P1x1*sinphi+P1y1*cosphi;
            var P2x = P2x1*cosphi-P2y1*sinphi;
            var P2y = P2x1*sinphi+P2y1*cosphi;

            var p1 = [];
            var p2 = [];
            createLine([x0,y0,0], [P1x,P1y,0], p1, p2,30);
            primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:1.5, color:[0.0, 1.0, 0.0, 1.0]});
            var p1 = [];
            var p2 = [];
            createLine([x0,y0,0], [P2x,P2y,0], p1, p2,30);
            primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:1.5, color:[0.0, 1.0, 0.0, 1.0]});
        } else {
            console.log("asqr = ", toFloat(asqr));
            console.log("bsqr = ", toFloat(bsqr));
            console.log("csqr = ", toFloat(csqr));
            console.log("x0 = ", toFloat(x0));
            console.log("y0 = ", toFloat(y0));
            console.log("z0 = ", toFloat(z0));

            chooseEquations(0);
            $("#ans [value='0']").prop("selected", true);
        }

        for (var j = 0; j < lineVertices.length; j++) {
            for (var i = 0; i < lineVertices[j].length-1; i++) {
                primitives.push({class:"line", text: "", arr0:lineVertices[j][i], arr1:lineVertices[j][i+1], rad:2, color:[0.0, 0.0, 1.0, 1.0]});
            }
        }
    }
}
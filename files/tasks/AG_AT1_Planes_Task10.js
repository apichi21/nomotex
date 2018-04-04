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

    $("Title").html("Прямые и плоскости. Задачи.");
    var conditions = "Найдите расстояние между прямыми: \
    \\begin{equation} l_1 : \\frac{x-x_1}{m_1} = \\frac{y-y_1}{n_1} = \\frac{z-z_1}{p_1} \\end{equation} и \
    \\begin{equation} l_2 : \\begin{cases} x = m_2 t + x_2 \\\\ y = n_2 t + y_2 \\\\ z = p_2 t + z_2\\end{cases}  \\end{equation}";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
      var algorithm = "<p>Решение задачи зависит от взаимного расположения прямых. Возможны следующие варианты:</p>";
    algorithm += "<p>$а)$ <b> Прямые параллельны</b>, тогда  \
    \\begin{equation}  \\frac{m_1}{m_2} = \\frac{n_1}{n_2} = \\frac{p_1}{p_2} \\end{equation} </p>";
    algorithm += "<p>Если условие $(3)$ выполнено, то для нахождения кратчайшего расстояния составим уравнение плоскости $\\pi_1$, проходящей через точку $P_1(x_1; y_1; z_1)$ принадлежащую прямой $l_1$ и перпендикулярную заданным прямым, т.е. перпендикулярную направляющим векторам $\\vec{s_1}$ и $\\vec{s_2}$ прямых $l_1$ и $l_2$: \
    \\begin{equation} \\vec{s_1} = \\{m_1; n_1; p_1\\} \\end{equation} </p>";
    algorithm += "<p>\\begin{equation*} \\vec{s_2} = \\{m_2; n_2; p_2\\} \\end{equation*} </p>";
    algorithm += "<p>Тогда уравнение плоскости $\\pi_1$ можно записать в виде:\
    \\begin{equation} m_1(x-x_1)+n_1(y-y_1)+p_1(z-z_1)=0 \\end{equation}</p>";
    algorithm += "<p>Приводя подобные слагаемые в формуле $(5)$, получим общее уравнение плоскости $\\pi_1$: \
    \\begin{equation} A_1 x + B_1 y + C_1 z + D_1 = 0,  \\end{equation} \
    где $A_1 = m_1, B_1 = n_1, C_1 = p_1, D_1 = -m_1 x_1 - n_1 y_1 - p_1 z_1.$</p>";
    algorithm += "<p>Для нахождения точки $P_3$ пересечения прямой $l_2$ и плоскости $\\pi_1$ подставим уравнение прямой $l_2$ $(2)$ в общее уравнение плоскости $(6)$: \
    \\begin{equation} A_1(m_2 t + x_2) + B_1 (n_2 t + y_2) + C_1 (p_2 t + z_2) + D_1 = 0 \\end{equation}</p>";
    algorithm += "<p>Решая уравнение $(7)$, находим значение параметра $t$: \
    \\begin{equation*} t = - \\frac{A_1x_2 + B_1y_2 + C_1z_2 + D_1}{A_1m_2 + B_1n_2 + C_1p_2} \\end{equation*}</p>";
    algorithm += "<p>Подставляя найденное значение параметра $t$ в параметрическое уравнение прямой $l_2$ $(2)$, находим координаты точки $P_3(x_3; y_3; z_3)$.</p>";
    algorithm += "<p>Найдем координаты вектора $\\vec{P_1 P_3}$: \
    \\begin{equation} \\vec{P_1 P_3} = \\{x_3 - x_1; y_3 - y_1; z_3 - z_1\\} \\end{equation}</p>";
    algorithm += "<p>Модуль вектора $\\vec{P_1 P_3}$, в силу построения плоскости $\\pi_1$, равен расстоянию между прямыми $l_1$ и $l_2$: \
    \\begin{equation*} d = |\\vec{P_1 P_3}| = \\sqrt{(x_3 - x_1)^2 + (y_3 - y_1)^2 + (z_3 - z_1)^2}. \\end{equation*} </p>";
    algorithm += "<p>$в)$ <b> Прямые скрещиваются</b>, тогда \
    \\begin{equation} \\begin{split} \\begin{vmatrix} \\ x_2 - x_1 && \\ y_2 - y_1 && \\ z_2 - z_1 \\\\ m_1 && n_1 && p_1 \\\\ m_2 && n_2 && p_2 \\end{vmatrix} \\ne 0 \\end{split} \\end{equation}</p>";
    algorithm += "<p>Cоставим уравнение плоскости $\\pi_2$, проходящей через прямую $l_1$ параллельно прямой $l_2$, записав условие компланарности трех векторов\
    \\begin{equation*} \\vec{P_1 P} = \\{x - x_1; y - y_1; z - z_1\\} , \\vec{s_1} = \\{m_1; n_1; p_1\\} , \\vec{s_2} = \\{m_2; n_2; p_2\\}, \\end{equation*} \
    где точка $P(x; y; z)$ &mdash; произвольная точка плоскости $\\pi_2$, вектора $\\vec{s_1}$ и $\\vec{s_2}$ &mdash; направляющие вектора прямых $l_1$ и $l_2$:\
     \\begin{equation} \\begin{split} \\begin{vmatrix} \\ x - x_1 && \\ y - y_1 && \\ z - z_1 \\\\ m_1 && n_1 && p_1 \\\\ m_2 && n_2 && p_2 \\end{vmatrix} = 0 \\end{split} \\end{equation}</p>";
    algorithm += "<p>Вычисляя определитель, получим общее уравнение плоскости $\\pi_2$: \
    \\begin{equation} A x + B y + C z + D = 0,  \\end{equation} \
    где $A = n_1 p_2 - n_2 p_1$, $B =-( p_2 m_1 - m_2 p_1)$, $C = m_1 n_2 - m_2 n_1$, $D = -(n_1 p_2 - n_2 p_1) x_1 -( p_2 m_1 - m_2 p_1 ) y_1 + (m_1 n_2 - m_2 n_1) z_1.$</p>";
      algorithm += "<p>Тогда расстояние между прямыми $l_1$ и $l_2$ является расстоянием от точки $P_2(x_2; y_2; z_2)$ прямой $l_2$ до плоскости $\\pi_2$ и может быть вычислено:\
    \\begin{equation} d = \\rho(P_2 , \\pi_2 ) = \\frac{|A x_2 + B y_2 + C z_2 + D|}{\\sqrt{A^2 + B^2 + C^2}} \\end{equation}</p>";
        $("#algorithm").html('<h3>Алгоритм решения:</h3>'+algorithm);
        var paragraphs=$("#algorithm p");
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

    values[0].push([-2,3,-2,3,2,-2,-4,1,2,-2,-2,1]);
    values[0].push([2,3,2,-3,1,0,-4,-2,2,0,-1,-2]);
    values[1].push([-3,-2,-1,-2,1,0,3,0,-2,0,1,1]);
    values[1].push([-1,-2,2,0,0,1,1,-3,1,0,-4,-2]);
    values[1].push([-4,2,1,-1,-4,0,0,0,-1,-2,0,0]);
    values[1].push([-1,-4,-2,-4,0,2,1,3,-4,-1,0,0]);
    values[1].push([1,-2,-1,-1,0,-4,3,1,-3,2,0,2]);
    values[1].push([-4,-1,-2,-2,-1,0,1,0,1,2,0,0]);
    values[1].push([-2,1,-1,-3,0,0,3,-4,2,-1,2,0]);
    values[1].push([-2,1,0,0,-2,-3,2,-3,-4,0,0,-2]);
    values[1].push([3,-2,3,0,0,-1,-3,1,-2,3,0,3]);
    values[1].push([0,-4,0,-2,0,-4,-1,3,3,0,-1,-2]);
    values[1].push([-3,-2,2,0,0,-1,1,0,2,-3,-4,-1]);
    values[1].push([-2,-2,2,0,0,3,2,1,2,0,1,1]);
    values[1].push([-3,-4,2,3,3,0,2,1,-2,1,-1,0]);
    values[1].push([1,1,-2,-3,0,1,1,-2,0,3,0,-3]);
    values[2].push([-3,-2,-2,0,1,3,-1,-2,3,0,2,3]);
    values[2].push([1,0,3,-4,1,0,-2,1,0,-1,2,0]);
    values[2].push([2,0,-1,2,-4,0,2,3,1,-2,1,0]);
    values[2].push([2,2,-2,0,0,-2,-3,-1,1,0,-3,0]);
    values[2].push([-4,-4,-3,3,0,3,-4,1,1,-4,0,-1]);
    values[2].push([0,-4,-4,-2,0,3,-3,3,1,3,0,3]);
    values[2].push([-4,-2,2,-2,0,1,0,3,-4,3,0,-4]);
    values[2].push([-2,1,3,0,-2,-2,2,-4,-1,0,2,3]);
    values[2].push([-4,-3,3,2,1,0,3,2,-2,-4,-1,0]);
    values[2].push([3,2,1,-2,0,1,-4,-4,2,0,0,3]);
    values[2].push([-3,1,-3,2,3,0,3,1,3,1,-4,0]);
    values[2].push([-3,-3,-4,0,2,-3,3,1,3,0,-1,-1]);
    values[2].push([-2,0,-4,2,-2,0,1,1,0,-1,-3,0]);
    values[2].push([-1,-2,0,1,0,-2,3,0,-1,3,0,-2]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '<p>$l_1$: <span id="l1"></span></p>';
    variants += '<p>$l_2$: <span id="l2"></span></p>';
    $("#variants").html(variants);

    var answer = '';
    answer += '$d$ = <input type="text" id="ans1" size=3>';

    if (mustBeHandedOver) {answer+='<p><input type="submit" id="ansButton" value="Сдать работу" onclick="handOver();" style="width: 100%"></p>';}
    $("#answer").html('<h3>Ответ:</h3>'+answer);

    changeVariant(setOfValues+",0");

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
    if (0) {
        showSolution = true;

        function getRandomArbitrary(min, max) {
          return Math.random() * (max - min) + min;
        }
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
        }
        var ccc = 0;
        var maxit = 10000;
        var mySet = new Set();
        var count1 = 0;
        precision1 = 10;
        while (ccc < maxit) {
            for (var i = 0; i < 12; i++) {
                values[0][0][i] = getRandomInt(-4,4);
            }
            changeVariant(0+","+0);
            initData();
            var ansText = generateAnsText();
            var intAns = true;
            ansText.split(",").forEach(function(value) { intAns = intAns && (value == Math.floor(value)) && (Math.abs(value) <= 15); });
            if (intAns) {
                mySet.add(values[0][0]+";"+ansText);
                count1++;
            }
            ccc++;
        }

        $("#conditions").prepend("<table><tr><td><textarea rows='50' cols='50' id='filetext1'></textarea></td><td><textarea rows='50' cols='50' id='filetext2'></textarea></td></tr></table>");
        $("#filetext1").append("Найдено уникальных комбинаций: "+mySet.size+"\n");
        mySet.forEach(function(value) {
                                        var temp = value.split(";");
                                        $("#filetext1").append(temp[0]+"\n");
                                        $("#filetext2").append("-> "+temp[1]+"\n");
                                    });
    }
}
function generateAnsText()
{
    var ansArr = [];
    for (var j = 1; j <= 1; j++) {
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
var chosenVariant = 0;
function changeVariant(newVar) {
    var newVarSplit = newVar.split(',');
    chosenVariant = parseInt(newVarSplit[1],10);
    var cval = values[parseInt(newVarSplit[0],10)][chosenVariant];
    var i = 0;
    $("#l1").html( "$\\frac{"+linCombText([1,-cval[i]],["x",""])+"}{"+cval[i+3]
        +"}=\\frac{"+linCombText([1,-cval[i+1]],["y",""])+"}{"+cval[i+4]
        +"}=\\frac{"+linCombText([1,-cval[i+2]],["z",""])+"}{"+cval[i+5]+"}$" );
    var i = 6;
    $("#l2").html( "$\\begin{cases}"
        +"x="+linCombText([cval[i],cval[i+3]],["t",""]) + "\\\\"
        +"y="+linCombText([cval[i+1],cval[i+4]],["t",""]) + "\\\\"
        +"z="+linCombText([cval[i+2],cval[i+5]],["t",""]) + "\\end{cases} $" );
    for (var i = 0; i < 3; i++) {
        p1[i] = cval[i];
        vecS1[i] = cval[i+3];
        p2[i] = cval[i+6];
        vecS2[i] = cval[i+9];
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    initBuffers();
}
function NOD(A)
{
    var n = A.length, x = Math.abs(A[0]);
    for (var i = 1; i < n; i++)
     { var y = Math.abs(A[i]);
       while (x && y){ x > y ? x %= y : y %= x; }
       x += y;
     }
    return x;
}
function unifyAswer(a) {
    var nod = NOD(a);
    for (var i = 0; i < a.length; i++) {
        a[i] /= nod;
    }
    if (a[0] < 0) {
        for (var i = 0; i < a.length; i++) {
            a[i] *= -1;
        }
    } else if (a[0] == 0) {
        if (a[1] < 0) {
            for (var i = 1; i < a.length; i++) {
                a[i] *= -1;
            }
        } else if (a[1] == 0) {
            if (a[2] < 0) {
                for (var i = 2; i < a.length; i++) {
                    a[i] *= -1;
                }
            }
        }
    }
}
function pointsFromABCD(abcd, p1, p2, p3) {
    vec3.set([0,0,0], p1);
    var vecM0M1 = [];
    if (Math.abs(abcd[0])>=Math.abs(abcd[1]) && Math.abs(abcd[0])>=Math.abs(abcd[2])) {
        p1[0] = -abcd[3]/abcd[0];
        vec3.set([p1[0]-(abcd[1]+abcd[2])/abcd[0], p1[1]+1, p1[2]+1],p2);
    } else if (Math.abs(abcd[1])>=Math.abs(abcd[0]) && Math.abs(abcd[1])>=Math.abs(abcd[2])) {
        p1[1] = -abcd[3]/abcd[1];
        vec3.set([p1[0]+1, p1[1]-(abcd[0]+abcd[2])/abcd[1], p1[2]+1],p2);
    } else {
        p1[2] = -abcd[3]/abcd[2];
        vec3.set([p1[0]+1, p1[1]+1, p1[2]-(abcd[0]+abcd[1])/abcd[2]],p2);
    }
    vec3.subtract(p2,p1,vecM0M1);
    vec3.cross(abcd,vecM0M1,p3);
    vec3.add(p3,p1);
}
var p1 = [];
var vecS1 = [];
var p2 = [];
var vecS2 = [];
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    var p12 = [];
    vec3.add(p1, vecS1, p12);
    var leftPoint = [];
    var rightPoint = [];
    createLine(p1,p12,leftPoint,rightPoint,11);
    primitives.push({class:"line", text: katex.renderToString("l_1"), ratio: 0.7, arr0:leftPoint, arr1:rightPoint, rad:2, color:[1.0, 0.5, 0.0, 1.0]});

    var p22 = [];
    vec3.add(p2, vecS2, p22);
    var leftPoint = [];
    var rightPoint = [];
    createLine(p2,p22,leftPoint,rightPoint,11);
    primitives.push({class:"line", text: katex.renderToString("l_2"), ratio: 0.3, arr0:leftPoint, arr1:rightPoint, rad:2, color:[0.5, 0.0, 1.0, 1.0]});

    var pointRad = 4;
    var lineRad = 2;

    var p11 = p1;
    var p21 = p2;
    primitives.push({class:"arrow", text: katex.renderToString("\\vec s_1"), arr0:p11, arr1:p12, rad:3, color:[0.0, 0.2, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec s_2"), arr0:p21, arr1:p22, rad:3, color:[1.0, 0.2, 0.0, 1.0]});

    primitives.push({class:"point", text: katex.renderToString("P_1"), arr0:p11, rad:pointRad, color:[0.0, 0.2, 1.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("P_2"), arr0:p21, rad:pointRad, color:[1.0, 0.2, 0.0, 1.0]});

    if (showSolution) {
        var v1 = vecS1;
        var v2 = vecS2;
        var norm0 = [];
        vec3.cross(v1,v2,norm0);
        var norm = [];
        vec3.normalize(norm0, norm);
        var a = [];
        var d = [];
        vec3.subtract(p21,p11,a);
        vec3.scale(norm,vec3.dot(norm,a),d);

        var pd1 = [];
        var pd2 = [];

        var det = -v1[1]*v2[2]+v1[2]*v2[1];
        var det1, coord = [1,2];
        det1 = -v1[0]*v2[2]+v1[2]*v2[0];
        if (Math.abs(det)<Math.abs(det1)) {det = det1; coord = [0,2];}
        det1 = -v1[0]*v2[1]+v1[1]*v2[0];
        if (Math.abs(det)<Math.abs(det1)) {det = det1; coord = [0,1];}

        var d1 = p21[coord[0]]-d[coord[0]]-p11[coord[0]];
        var d2 = p21[coord[1]]-d[coord[1]]-p11[coord[1]];

        var t = (-d1*v2[coord[1]]+d2*v2[coord[0]])/det;
        var s = (d2*v1[coord[0]]-d1*v1[coord[1]])/det;

        vec3.scale(v1,t,pd1);
        vec3.add(pd1,p11);

        vec3.scale(v2,s,pd2);

        vec3.add(pd2,p21);

        var bonusp1 = [];
        vec3.add(p11,v2,bonusp1);
        var bonusp2 = [];
        vec3.add(p11,norm0,bonusp2);
        primitives.push({class:"dashline", text: katex.renderToString("d"), arr0:pd1, arr1:pd2, rad:lineRad, color:[0.6, 1.0, 0.0, 1.0]});
        primitives.push({class:"arrow", text: "", arr0:p11, arr1:p21, rad:3, color:[0.0, 1.0, 0.0, 1.0]});

        $("#ans1").val(parseFloat(vec3.length(d).toFixed(precision1)));
        primitives.push({class:"arrow", text: katex.renderToString("\\vec s_2'"), arr0:p11, arr1:bonusp1, rad:3, color:[1.0, 0.2, 0.0, 1.0]});
        primitives.push({class:"arrow", text: katex.renderToString("\\vec n"), arr0:p11, arr1:bonusp2, rad:2, color:[1.0, 0.0, 1.0, 1.0]});

        var planepoint1ans = [];
        var planepoint2ans = [];
        var planepoint3ans = [];
        var planepoint4ans = [];
        createPlane(p11,p12,bonusp1,planepoint1ans,planepoint2ans,planepoint3ans,planepoint4ans,10);
        primitives.push({class:"plane", text: katex.renderToString("\\pi_1"), arr0:planepoint1ans, arr1:planepoint2ans, arr2:planepoint3ans, arr3:planepoint4ans, color:[0.0, 0.0, 1.0, 0.2]});
    }
}
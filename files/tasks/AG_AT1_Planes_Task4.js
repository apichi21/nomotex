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
    var conditions = "Напишите уравнение плоскости, проходящей через точку $M(x_m, y_m, z_m)$ параллельно прямым: \
      \\begin{equation} l_1 : \\frac{x-x_1}{m_1} = \\frac{y-y_1}{n_1} = \\frac{z-z_1}{p_1} \\end{equation} и \
      \\begin{equation} l_2 : \\begin{cases} A_2 x + B_2 y + C_2 z + D_2 = 0 &\\text{ } (\\pi_1) \\\\ A_3 x + B_3 y + C_3 z + D_3 = 0 &\\text{ } (\\pi_2)\\end{cases} \\end{equation}";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
      var algorithm = "<p>Приведем общие уравнения прямой $l_2$ $(2)$ к каноническому виду. Найдем направляющий вектор $\\vec{s_2}$ прямой $l_2$ как векторное произведение векторов нормали к плоскостям $\\pi_1$ и $\\pi_2$: \
      \\begin{equation} \\begin{split} \\vec{s_2} = \\vec{n_2} \\times \\vec{n_3} = \\begin{vmatrix} \\vec{i} && \\vec{j} && \\vec{k} \\\\ A_2 && B_2 && C_2 \\\\ A_3 && B_3 && C_3 \\end{vmatrix} = \\\\ = (B_2 C_3 - B_3 C_2)\\vec{i} - (A_2 C_3 - A_3 C_2)\\vec{j} + (A_2 B_3 - A_3 B_2)\\vec{k} \\end{split} \\end{equation} </p>";
      algorithm += "<p>Введем обозначения: \
      \\begin{equation}  \\begin{cases} m_2 = B_2 C_3 - B_3 C_2 \\\\ n_2 = - (A_2 C_3 - A_3 C_2) \\\\ p_2 = A_2 B_3 - A_3 B_2 \\end{cases} \\end{equation} </p>";
      algorithm += "<p>Тогда выражение $(3)$ с учетом $(4)$ можно записать в виде: \
      \\begin{equation} \\vec{s_2} = m_2\\vec{i}+n_2\\vec{j}+p_2\\vec{k}\\end{equation} </p>";
      algorithm += "<p>Далее найдем точку, принадлежащую прямой $l_2$, положив $x$, $y$ или $z$ равным нулю. Положим, например, $y=0$. Тогда координаты точки, принадлежащей прямой $l_2$, можно найти из следующей системы: \
      \\begin{equation}  \\begin{cases} A_2 x + C_2 z + D_2 = 0 \\\\ A_3 x + C_3 z + D_3 = 0 \\\\ y = 0   \\end{cases} \\end{equation} \
      Решая СЛАУ $(6)$, находим координаты точки $P_2(x_2; y_2; z_2)$. </p>";
      algorithm += "<p>Тогда можем составить канонические уравнения прямой $l_2$: \
      \\begin{equation} \\frac{x-x_2}{m_2} = \\frac{y-y_2}{n_2} = \\frac{z-z_2}{p_2} \\end{equation} </p>";
      algorithm += "<p>Так как плоскость параллельна прямым $l_1$ и $l_2$, её нормальный вектор $\\vec{n}$ перпендикулярен направляющим векторам $\\vec{s_1}=\\{m_1,n_1,p_1\\}$ и $\\vec{s_2}=\\{m_2,n_2,p_2\\}$ прямых $l_1$ и $l_2$ и может быть найден по формуле: \
      \\begin{equation} \\begin{split} \\vec{n} = \\begin{vmatrix} \\vec{i} && \\vec{j} && \\vec{k} \\\\ m_1 && n_1 && p_1 \\\\ m_2 && n_2 && p_2 \\end{vmatrix} =\\\\= (n_1 p_2 - p_1 n_2) \\vec{i} - (m_1 p_2 - p_1 m_2)\\vec{j} + (m_1 n_2 - n_1 m_2)\\vec{k} \\end{split} \\end{equation}</p>";
      algorithm += "<p>Введем обозначения: \
      \\begin{equation} \\begin{cases} A = n_1 p_2 - p_1 n_2 \\\\ B = - (m_1 p_2 - m_2 p_1) \\\\ C = m_1 n_2 - n_1 m_2 \\end{cases} \\end{equation} </p>";
      algorithm += "<p>Тогда выражение $(8)$ с учетом $(9)$ можно записать в виде: \
      \\begin{equation} \\vec{n} = A\\vec{i}+B\\vec{j}+C\\vec{k} = \\{A;B;C\\} \\end{equation} </p>";
      algorithm += "<p>Составим уравнение искомой плоскости в координатной форме::\
      \\begin{equation} A(x-x_M)+B(y-y_M)+C(z-z_M)=0 \\end{equation}</p>";
      algorithm += "<p>Преобразовав уравнение $(11)$, получим общее уравнение искомой плоскости: \
      \\begin{equation} Ax+By+Cz+D=0, \\end{equation} \
      где $D = -A x_M - B y_M - C z_M$.</p>";
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
    values[0].push([-3,6,-10,-3,-5,-1,-1,-2,-4,2,4,0,2,19,7,0,4,4]);
    values[0].push([1,-3,0,-3,-2,-1,1,1,2,2,2,1,-2,-6,2,-7,4,16]);
    values[1].push([-6,-6,3,4,-5,-5,1,4,-1,2,1,0,4,4,5,6,5,-9]);
    values[1].push([5,-8,2,0,1,1,-3,-2,2,2,3,3,-8,15,-6,-6,5,28]);
    values[1].push([-8,0,-9,-1,0,-3,0,-1,1,2,0,-2,1,-28,0,2,5,24]);
    values[1].push([-9,4,-1,-2,-4,2,2,4,3,2,-4,-6,7,-1,6,1,-5,16]);
    values[1].push([-1,7,5,0,2,-2,-5,-3,-4,2,4,-7,7,-21,3,6,2,13]);
    values[1].push([-5,5,5,1,-2,-2,0,-4,0,2,2,6,2,-26,4,2,3,-7]);
    values[1].push([-3,1,8,-2,1,-5,0,-5,1,2,0,-7,-7,-1,0,2,1,12]);
    values[1].push([1,-2,1,4,-4,-1,-2,2,2,2,2,-1,-5,7,7,-5,-1,-2]);
    values[1].push([-3,-9,1,-2,-4,-4,4,2,-5,2,-4,0,1,13,4,1,2,14]);
    values[1].push([3,-4,6,3,3,-5,0,3,-3,2,2,5,-8,0,-2,1,-7,-24]);
    values[1].push([-4,2,-1,3,4,-3,-2,-2,0,2,-2,-7,-4,0,3,7,4,3]);
    values[1].push([0,5,-9,1,1,-4,1,0,-1,2,5,2,2,-4,0,4,-3,27]);
    values[1].push([-3,3,9,3,1,2,1,-1,2,2,-7,-1,-8,-19,-1,2,-4,-8]);
    values[1].push([-1,5,5,-1,-5,1,-4,2,-2,2,7,-2,3,8,3,-8,-6,22]);
    values[2].push([-7,2,-10,-5,2,4,-2,-2,2,2,3,3,-4,-25,3,3,0,4]);
    values[2].push([-9,-1,-7,-3,2,-5,1,0,2,2,-4,4,-1,3,-7,1,-7,19]);
    values[2].push([-6,-3,-1,2,0,-2,-2,0,0,2,1,-3,5,-7,3,4,6,10]);
    values[2].push([0,2,-7,1,4,-3,-4,4,-4,2,-4,-2,1,-10,5,3,-3,-26]);
    values[2].push([2,-3,-7,-3,1,-2,2,-2,-3,2,-1,2,-6,16,-2,5,4,-7]);
    values[2].push([4,-2,-9,3,2,-4,3,3,2,2,-2,0,-6,-22,1,-7,6,-16]);
    values[2].push([1,6,-4,-3,4,-3,0,1,0,2,1,-2,1,-7,5,7,2,-23]);
    values[2].push([3,0,-4,-2,2,-5,0,-4,-1,2,-1,4,-1,-7,-2,7,2,-4]);
    values[2].push([5,3,-1,0,3,1,-2,-5,-2,2,-5,-6,2,-4,0,-8,4,20]);
    values[2].push([5,0,-2,-1,-2,-4,-1,-5,-1,2,0,-6,3,-3,0,3,6,1]);
    values[2].push([-4,5,4,-1,4,-4,4,2,3,2,-6,-7,2,-3,6,0,-1,-21]);
    values[2].push([3,-4,-5,1,-1,3,4,1,-5,2,0,-1,-6,-6,-6,7,-2,7]);
    values[2].push([-6,9,-3,4,4,-3,-2,0,2,2,0,-8,2,-7,0,6,-5,0]);
    values[2].push([6,-3,-5,-1,-3,0,2,1,0,2,5,6,2,-9,6,-8,-7,20]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '$M$: (<span id="M"></span>)<br>';
    variants += '<p>$l_1$: <span id="l1"></span></p>';
    variants += '<p>$l_2$: <span id="l2"></span></p>';
    $("#variants").html(variants);

    var answer = '';

    answer += '<table style="text-align: center">';
    answer += '<tr>';
    answer += '<td>$A$</td>';
    answer += '<td>$B$</td>';
    answer += '<td>$C$</td>';
    answer += '<td>$D$</td>';
    answer += '</tr>';
    answer += '<tr>';
    answer += '<td><input type="text" id="ans1" size=3></td>';
    answer += '<td><input type="text" id="ans2" size=3></td>';
    answer += '<td><input type="text" id="ans3" size=3></td>';
    answer += '<td><input type="text" id="ans4" size=3></td>';
    answer += '</tr>';
    answer += '</table>';

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
            for (var i = 0; i < 3; i++) {
                values[0][0][i] = getRandomInt(-10,10);
            }
            for (var i = 3; i < 9; i++) {
                values[0][0][i] = getRandomInt(-5,5);
            }
            values[0][0][10] = getRandomInt(-8,8);
            values[0][0][11] = getRandomInt(-8,8);
            values[0][0][12] = getRandomInt(-8,8);
            values[0][0][13] = getRandomInt(-30,30);
            values[0][0][14] = getRandomInt(-8,8);
            values[0][0][15] = getRandomInt(-8,8);
            values[0][0][16] = getRandomInt(-8,8);
            values[0][0][17] = getRandomInt(-30,30);
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
    for (var j = 1; j <= 4; j++) {
        ansArr.push(parseFloat($("#ans"+j).val()));
    }
    unifyAswer(ansArr);
    for (var j = 0; j < 4; j++) {
        ansArr[j] = ansArr[j].toFixed(precision1);
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
    $("#M").html([cval[i],cval[i+1],cval[i+2]].join(';'));
    var i = 3;
    $("#l1").html( "$\\frac{"+linCombText([1,-cval[i]],["x",""])+"}{"+cval[i+3]
        +"}=\\frac{"+linCombText([1,-cval[i+1]],["y",""])+"}{"+cval[i+4]
        +"}=\\frac{"+linCombText([1,-cval[i+2]],["z",""])+"}{"+cval[i+5]+"}$" );
    var i = 9;
    $("#l2").html( "$\\begin{cases}"
        +linCombText([cval[i],cval[i+1],cval[i+2],cval[i+3]],["x","y","z",""]) + "=0 \\\\"
        +linCombText([cval[i+4],cval[i+5],cval[i+6],cval[i+7]],["x","y","z",""]) + "=0 \\end{cases} $" );
    for (var i = 0; i < 3; i++) {
        m1[i] = cval[i];
    }
    for (var i = 0; i < 3; i++) {
        p1[i] = cval[i+3];
        vecS1[i] = cval[i+3+3];
    }
    for (var i = 0; i < 4; i++) {
        abcd1[i] = cval[i+6+3];
        abcd2[i] = cval[i+6+4+3];
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
var abcd1 = [];
var abcd2 = [];
var m1 = [];
var p0 = [];
var p1 = [];
var vecS1 = [];
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    primitives.push({class:"point", text: katex.renderToString("M"), arr0:m1, rad:5, color:[0.0, 0.7, 0.0, 1.0]});

    var pointM10 = [];
    var pointM11 = [];
    var pointM12 = [];
    pointsFromABCD(abcd1, pointM10,pointM11,pointM12);
    var pointM20 = [];
    var pointM21 = [];
    var pointM22 = [];
    pointsFromABCD(abcd2, pointM20,pointM21,pointM22);

    var n1 = abcd1;
    var n2 = abcd2;
    var v0 = [];
    vec3.cross(n1,n2,v0);
    unifyAswer(v0);
    // var p0 = [];
    if (vec3.length(v0) == 0) {p0 = [0.0,0.0,0.0];}
    else {
        var det = n1[1]*n2[2]-n1[2]*n2[1];
        var det1, coord = [0,1,2];

        det1 = n1[0]*n2[2]-n1[2]*n2[0];
        if (Math.abs(det)<Math.abs(det1)) {det = det1; coord = [1,0,2];}

        det1 = n1[0]*n2[1]-n1[1]*n2[0];
        if (Math.abs(det)<Math.abs(det1)) {det = det1; coord = [2,0,1];}

        var d1 = vec3.dot(n1,pointM10);
        var d2 = vec3.dot(n2,pointM20);
        p0[coord[0]] = 0;
        p0[coord[1]] = (d1*n2[coord[2]]-d2*n1[coord[2]])/det;
        p0[coord[2]] = (d2*n1[coord[1]]-d1*n2[coord[1]])/det;
    }

    // vec3.normalize(v0);

    var p2 = [];
    vec3.add(p1, vecS1, p2);
    var leftPoint = [];
    var rightPoint = [];
    createLine(p1,p2,leftPoint,rightPoint,11);
    primitives.push({class:"line", text: katex.renderToString("l_1"), arr0:leftPoint, arr1:rightPoint, rad:2, color:[1.0, 0.5, 0.0, 1.0]});

    var v = [];
    vec3.add(v0,p0,v);
    var leftPoint = [];
    var rightPoint = [];
    createLine(p0,v,leftPoint,rightPoint,11);
    primitives.push({class:"line", text: katex.renderToString("l_2"), arr0:leftPoint, arr1:rightPoint, rad:2, color:[0.5, 0.0, 1.0, 1.0]});

    if (showSolution) {
        var m2 = [];
        vec3.add(m1, vecS1, m2);
        var m3 = [];
        vec3.add(m1, v0, m3);

        var vecNans = [];
        vec3.cross(vecS1,v0,vecNans);
        vecNans[3] = -(vecNans[0]*m1[0]+vecNans[1]*m1[1]+vecNans[2]*m1[2]);
        unifyAswer(vecNans);
        $("#ans1").val(parseFloat(vecNans[0].toFixed(precision1)));
        $("#ans2").val(parseFloat(vecNans[1].toFixed(precision1)));
        $("#ans3").val(parseFloat(vecNans[2].toFixed(precision1)));
        $("#ans4").val(parseFloat(vecNans[3].toFixed(precision1)));

        var planepoint1ans = [];
        var planepoint2ans = [];
        var planepoint3ans = [];
        var planepoint4ans = [];
        createPlane(m1,m2,m3,planepoint1ans,planepoint2ans,planepoint3ans,planepoint4ans,11);
        primitives.push({class:"plane", text: "", arr0:planepoint1ans, arr1:planepoint2ans, arr2:planepoint3ans, arr3:planepoint4ans, color:[0.0, 0.0, 1.0, 0.45]});

    }

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pointM10,pointM11,pointM12,planepoint1,planepoint2,planepoint3,planepoint4,15);
    primitives.push({class:"plane", text: katex.renderToString("\\pi_1"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 1.0, 0.0, 0.25]});

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pointM20,pointM21,pointM22,planepoint1,planepoint2,planepoint3,planepoint4,15);
    primitives.push({class:"plane", text: katex.renderToString("\\pi_2"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[1.0, 1.0, 0.0, 0.25]});
}
var dimention="3d";
function initPoints() {
    points = [];
}
var values = [[],[],[]];
var showAlgorithm = false;
var setOfValues = -1;
var mustBeHandedOver = false;
var showSolution = false;
var precision1 = 0;
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
    var conditions = "Напишите уравнение плоскости, проходящей через точку $M_1(x_1; y_1; z_1)$ и прямую \
      \\begin{equation} l : \\begin{cases} A_1 x + B_1 y + C_1 z + D_1 = 0 \\\\ A_2 x + B_2 y + C_2 z + D_2 = 0 \\end{cases} \\end{equation}";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
      var algorithm = "<p>Составим уравнение пучка плоскостей (множества плоскостей, проходящий через прямую) $l$: \
      \\begin{equation} A_1 x + B_1 y + C_1 z + D_1 + \\lambda (A_2 x + B_2 y + C_2 z + D_2) = 0, \\end{equation} \
      где $\\lambda$ - действительный параметр. </p>";
      algorithm += "<p>При различных значениях параметра $\\lambda$ получаем различные уравнения плоскостей, проходящих через заданную прямую.</p>";
      algorithm += "<p>Поскольку плоскость проходит через точку $M_1(x_1; y_1; z_1)$, подставим координаты точки в уравнение пучка плоскостей $(1)$: \
       \\begin{equation} A_1 x_1 + B_1 y_1 + C_1 z_1 + D_1 + \\lambda (A_2 x_1 + B_2 y_1 + C_2 z_1 + D_2) = 0. \\end{equation}</p>";
      algorithm += "<p>В уравнении $(3)$ известны из условия $A_1, B_1, C_1, D_1, A_2, B_2, C_2, D_2, x_1, y_1, z_1$, cледовательно, можно вычислить значение параметра $\\lambda$: \
      \\begin{equation} \\lambda = \\frac{-(A_1 x_1 + B_1 y_1 + C_1 z_1+ D_1)}{A_2 x_1 + B_2 y_1 + C_2 z_1 + D_2} \\end{equation}</p>";
      algorithm += "<p> <b> Замечание. </b> Если знаменатель в формуле $(4)$ обращался бы в ноль, то это означает, что искомая плоскость совпадала бы с плоскостью, заданной уравнением $A_2 x + B_2 y + C_2 z + D_2 = 0$ из уравнения прямой $l$.</p>";
      algorithm += "<p>Подставляя найденное значение по формуле $(4)$ параметра $\\lambda$ в уравнение $(1)$, раскрывая скобки и приводя общие слагаемые, получаем общее уравнение искомой плоскости: \
      \\begin{equation} Ax+By+Cz+D=0, \\end{equation} \
      где \\begin{equation} \\begin{cases} A = A_1 + \\lambda A_2 \\\\ B = B_1 + \\lambda B_2 \\\\ C = C_1 + \\lambda C_2 \\\\ D= D_1 + \\lambda D_2 \\end{cases} \\end{equation}</p>";

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
    values[0].push([3,-2,7, 3,-1,2,-7, 1,3,-2,3]);
    values[0].push([-3,1,5,0,1,2,4,-1,-2,3,-1]);
    values[1].push([9,0,6,3,-3,-3,13,-6,4,5,-20]);
    values[1].push([0,-8,-6,0,2,-3,3,1,-2,4,-2]);
    values[1].push([9,-3,2,1,-2,2,3,3,2,-2,5]);
    values[1].push([7,-10,-8,0,-1,0,-4,-5,-2,1,17]);
    values[1].push([-1,7,3,-3,1,-1,2,-1,3,0,5]);
    values[1].push([6,0,-5,0,-3,1,-4,-2,-1,-1,1]);
    values[1].push([8,2,-7,-3,0,-2,3,2,2,0,1]);
    values[1].push([-4,-8,3,-4,-3,4,20,-2,0,2,4]);
    values[1].push([2,-8,4,2,-3,-1,6,1,-2,-3,9]);
    values[1].push([1,3,6,3,-5,2,10,1,-5,3,21]);
    values[1].push([-3,-2,-8,-4,1,4,-6,-4,0,2,-10]);
    values[1].push([-7,-10,4,2,-4,4,-18,0,2,-1,12]);
    values[1].push([-2,2,-4,0,2,3,2,-2,4,1,4]);
    values[1].push([-5,-2,3,-3,-1,-3,-10,-1,-2,0,-10]);
    values[2].push([0,-8,-4,-5,-1,-5,10,0,-2,-1,-1]);
    values[2].push([-8,1,-5,0,-2,-4,-2,-2,-3,-5,-14]);
    values[2].push([-3,4,7,4,-4,-2,1,-1,1,2,-1]);
    values[2].push([3,7,5,0,0,-2,2,4,0,0,2]);
    values[2].push([4,4,1,0,1,2,-2,-3,-1,1,11]);
    values[2].push([-3,5,5,0,-2,3,1,2,-3,4,5]);
    values[2].push([1,2,2,1,2,-5,-10,-2,-1,3,7]);
    values[2].push([-4,3,9,-1,2,-2,-4,1,0,0,8]);
    values[2].push([0,4,3,0,0,-2,12,-4,2,-5,12]);
    values[2].push([6,-1,9,2,3,0,6,-4,-3,2,-7]);
    values[2].push([5,-9,7,0,-5,-2,3,0,-3,1,0]);
    values[2].push([0,-7,7,3,2,-1,-17,2,-2,-3,-12]);
    values[2].push([2,-1,-7,-5,-1,3,-20,1,1,1,-4]);
    values[2].push([-1,-6,9,0,0,2,1,-5,-2,0,2]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '<p>$M_1$: (<span id="M1"></span>)</p>';
    variants += '<p>$l$: <span id="l"></span></p>';
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
            values[0][0][3] = getRandomInt(-5,5);
            values[0][0][4] = getRandomInt(-5,5);
            values[0][0][5] = getRandomInt(-5,5);
            values[0][0][6] = getRandomInt(-30,30);
            values[0][0][7] = getRandomInt(-5,5);
            values[0][0][8] = getRandomInt(-5,5);
            values[0][0][9] = getRandomInt(-5,5);
            values[0][0][10] = getRandomInt(-30,30);
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
    $("#M1").html([cval[i],cval[i+1],cval[i+2]].join(';'));

    var i = 3;
    $("#l").html( "$\\begin{cases}"
        +linCombText([cval[i],cval[i+1],cval[i+2],cval[i+3]],["x","y","z",""])
        +"=0 \\\\"
        +linCombText([cval[i+4],cval[i+1+4],cval[i+2+4],cval[i+3+4]],["x","y","z",""])
        +"=0 \\end{cases} $" );
    for (var i = 0; i < 3; i++) {
        m1[i] = cval[i];
    }
    for (var i = 0; i < 4; i++) {
        vecN10[i] = cval[i+3];
        vecN20[i] = cval[i+3+4];
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
var m1 = [];
var vecN10 = [];
var vecN20 = [];
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5.1, color:[1.0, 0.0, 1.0, 1.0]});
    }

    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    primitives.push({class:"point", text: katex.renderToString("M_1"), arr0:m1, rad:5, color:[0.0, 0.7, 0.0, 1.0]});

    primitives.push({class:"arrow", text: katex.renderToString("\\vec n_1"), arr0:[0,0,0], arr1:vecN10, rad:2, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec n_2"), arr0:[0,0,0], arr1:vecN20, rad:2, color:[1.0, 0.0, 0.0, 1.0]});

    var vecS = [];
    vec3.cross(vecN10, vecN20, vecS);

    var pointM10 = [];
    var pointM11 = [];
    var pointM12 = [];
    pointsFromABCD(vecN10, pointM10,pointM11,pointM12);
    var pointM20 = [];
    var pointM21 = [];
    var pointM22 = [];
    pointsFromABCD(vecN20, pointM20,pointM21,pointM22);

    var p0 = [];
    var n1 = vecN10;
    var n2 = vecN20;
    if (vec3.length(vecS) == 0) {p0 = [0.0,0.0,0.0];}
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

    var vecS1 = [];
    vec3.add(vecS,p0,vecS1);

    var p1 = [];
    var p2 = [];
    createLine(p0,vecS1, p1,p2,11);
    primitives.push({class:"line", text: katex.renderToString("l"), arr0:p1, arr1:p2, rad:2, color:[0.5, 0.0, 1.0, 1.0]});

    if (showSolution) {

        var vecM1M2 = [];
        vec3.subtract(m1,p0,vecM1M2);

        var vecNans = [];
        vec3.cross(vecM1M2,vecS,vecNans);
        vecNans[3] = -(vecNans[0]*p0[0]+vecNans[1]*p0[1]+vecNans[2]*p0[2]);
        unifyAswer(vecNans);
        $("#ans1").val( parseFloat(vecNans[0].toFixed(precision1)) );
        $("#ans2").val( parseFloat(vecNans[1].toFixed(precision1)) );
        $("#ans3").val( parseFloat(vecNans[2].toFixed(precision1)) );
        $("#ans4").val( parseFloat(vecNans[3].toFixed(precision1)) );

        var planepoint1ans = [];
        var planepoint2ans = [];
        var planepoint3ans = [];
        var planepoint4ans = [];
        createPlane(p0,vecS1,m1,planepoint1ans,planepoint2ans,planepoint3ans,planepoint4ans,11);
        primitives.push({class:"plane", text: "", arr0:planepoint1ans, arr1:planepoint2ans, arr2:planepoint3ans, arr3:planepoint4ans, color:[0.5, 1.0, 0.5, 0.5]});
    }

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pointM10,pointM11,pointM12,planepoint1,planepoint2,planepoint3,planepoint4,11);
    primitives.push({class:"plane", text: katex.renderToString("\\pi_1"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 0.0, 1.0, 0.25]});

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pointM20,pointM21,pointM22,planepoint1,planepoint2,planepoint3,planepoint4,11);
    primitives.push({class:"plane", text: katex.renderToString("\\pi_2"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[1.0, 0.0, 0.0, 0.25]});
}
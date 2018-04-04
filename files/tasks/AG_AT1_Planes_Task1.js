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
    var conditions = "Напишите уравнение плоскости $\\pi$, проходящей через точки $M_1 (x_1, y_1, z_1)$ и $M_2 (x_2, y_2, z_2)$ параллельно прямой: \
      \\begin{equation}  \\begin{cases} A_1 x + B_1 y + C_1 z + D_1 = 0 &\\text{ }  \\\\ A_2 x + B_2 y + C_2 z + D_2 = 0 &\\text{ } \\end{cases} \\end{equation}";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
      var algorithm = "<p>Сначала найдем направляющий вектор $\\vec{s}$ прямой $l$: \
      \\begin{equation} \\begin{split} \\vec{s} = \\vec{n_1} \\times \\vec{n_2} \\end{split} \\end{equation} </p>";
      algorithm += "<p> где $\\vec{n_1}=\\{A_1; B_1; C_1\\}$, $\\vec{n_2}=\\{A_2; B_2; C_2\\}$ - векторы нормали к плоскостям $\\pi_1$ и $\\pi_2$, заданным уравнениями $A_1 x + B_1 y + C_1 z + D_1 = 0$, $A_2 x + B_2 y + C_2 z + D_2 = 0. $</p>";
      algorithm += "<p> Вычислим векторное произведение по формуле $(2)$ в ортонормированном базисе: \
      \\begin{equation} \\begin{split} \\vec{s} = \\vec{n_1} \\times \\vec{n_2} = \\begin{vmatrix} \\vec{i} && \\vec{j} && \\vec{k} \\\\  A_1 && B_1 && C_1 \\\\  A_2 && B_2 && C_2 \\end{vmatrix} = \\\\ =(B_1 C_2 - C_1 B_2) \\vec{i} - (A_3 C_2 - A_2 C_1) \\vec{j} + (A_1 B_2 - A_2 B_1)\\vec{k} \\end{split} \\end{equation} </p>";
      algorithm += "<p>Обозначим:  \
      \\begin{equation} \\begin{cases} \\alpha = B_1 C_2-C_1 B_2\\\\ \\beta = A_3 C_2-A_2 C_1\\\\ \\gamma = A_1 B_2-A_2 B_1\\\\ \\end{cases} \\end{equation} </p>";
      algorithm += "<p>Тогда формулу $(2)$ можно записать в виде:: \
      \\begin{equation}   \\vec{s}= \\alpha  \\vec{i} + \\beta \\vec{j} + \\gamma \\vec{k} = \\{\\alpha,\\beta,\\gamma\\}    \\end{equation} \ </p>";
      algorithm += "<p>Найдём координаты вектора $\\vec{M_1 M_2}$: \
      \\begin{equation} \\vec{M_1 M_2} = {(x_2 - x_1;y_2 - y_1;z_2 - z_1)}  \\end{equation} </p>";
      algorithm += "<p>Далее найдем вектор нормали к плоскости $\\pi$ по формуле: \
      \\begin{equation} \\begin{split} \\vec{n}=\\vec{M_1 M_2} \\times \\vec{s} =\\begin{vmatrix} \\vec{i} && \\vec{j} && \\vec{k}\\\\ x_2 - x_1 && y_2 - y_1 && z_2-z_1\\\\ \\alpha && \\beta && \\gamma \\end{vmatrix} = \\\\ = (\\gamma (y_2 - y_1) - \\beta (z_2 - z_1))\\vec{i} - (\\gamma(x_2 - x_1)-\\alpha(z_2 - z_1))\\vec{j}+  \\\\ +(\\beta(x_2 - x_1)-\\alpha(y_2 - y_1)) \\vec{k}=  A \\vec{i} + B \\vec{j} + C \\vec{k} \\end{split} \\end{equation}</p>";
      algorithm += "<p>Пусть переменная точка $M(x,y,z)$ принадлежит плоскости $\\pi$. Тогда вектор $\\vec{M_1 M}={(x-x_1;y-y_1;z-z_1)}$ принадлежит плоскости $\\pi$. Запишем уравнение плоскости $\\pi$ в координатной форме:\
      \\begin{equation}  A(x - x_1) + B(y - y_1) + C(z - z_1) = 0 \\end{equation}</p>";
      algorithm += "<p>Преобразовав уравнение $(8)$, получим общее уравнение плоскости $\\pi$: \
      \\begin{equation}  \\begin{split} A x + B y + C z + D = 0  \\end{split} \\end{equation}</p>";
      algorithm += "<p>где $D = -A x_1 - B y_1 - C z_1$ </p>";

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
    values[0].push([2,-9,7,1,3,9,-1,1,-1,-12,-5,-1,1,-17]);
    values[0].push([3,0,5,1,6,-5,-2,-4,3,11,-7,1,-3,-2]);
    values[1].push([7,3,3,8,4,7,7,-8,-1,29,-4,4,0,-23]);
    values[1].push([7,-9,-5,4,2,-8,2,-2,4,-25,1,-2,5,12]);
    values[1].push([-8,5,0,-9,2,-3,0,0,-8,18,-1,-1,7,14]);
    values[1].push([1,3,-4,2,7,-9,-3,5,2,-7,6,-6,-5,-30]);
    values[1].push([-6,-9,1,1,6,6,1,-2,-4,22,-3,-2,-7,-22]);
    values[1].push([-2,-3,1,-9,4,0,1,0,-4,-24,4,0,1,22]);
    values[1].push([-8,2,8,1,-1,-1,1,-4,-3,-22,-2,-3,-1,18]);
    values[1].push([1,1,-10,-8,-6,3,7,-6,-4,26,4,-4,-5,4]);
    values[1].push([-1,0,-2,-6,5,-2,1,0,1,-30,3,5,-7,22]);
    values[1].push([0,-7,-5,-9,-8,-8,0,5,-6,-14,2,1,-2,26]);
    values[1].push([-6,4,-7,8,4,2,0,-6,3,-2,0,5,1,26]);
    values[1].push([-7,1,5,7,-6,5,2,2,-2,5,-2,-6,0,-17]);
    values[1].push([-6,-2,1,-10,2,2,-2,4,0,16,3,0,3,11]);
    values[1].push([4,-3,-4,6,-1,0,-6,-3,1,1,4,4,-4,20]);
    values[2].push([-1,0,2,-4,-4,3,2,-1,-1,28,5,-2,-7,0]);
    values[2].push([3,-9,-10,-8,0,6,-2,-5,-4,-5,-1,-7,-4,26]);
    values[2].push([-4,3,8,-6,-4,-10,2,6,6,13,-1,1,4,-6]);
    values[2].push([-3,6,6,-4,9,7,-1,1,2,14,-7,-7,-4,-20]);
    values[2].push([1,-1,-8,3,-3,-2,3,2,-2,18,-3,-2,4,9]);
    values[2].push([-1,1,1,9,3,7,-3,1,2,-1,3,0,-1,21]);
    values[2].push([1,-4,-3,-2,6,7,-2,-2,-2,-18,5,5,-4,11]);
    values[2].push([1,1,4,-5,4,4,3,-5,-2,-22,-4,0,2,3]);
    values[2].push([-1,-2,8,0,3,-2,6,1,-4,22,0,-3,3,-10]);
    values[2].push([-4,2,3,2,-1,-4,-8,2,-3,12,4,-4,6,-14]);
    values[2].push([1,-2,2,-1,4,-8,2,-2,-3,-6,-4,4,-5,0]);
    values[2].push([4,-9,6,5,-4,6,0,7,7,15,0,-4,-7,16]);
    values[2].push([-1,4,2,2,-5,5,0,0,-2,-27,7,0,4,-19]);
    values[2].push([0,9,3,7,2,0,-2,1,0,-17,-4,2,4,-20]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '$M_1$: (<span id="M1"></span>)<br>';
    variants += '$M_2$: (<span id="M2"></span>)<br>';
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
            for (var i = 0; i < 6; i++) {
                values[0][0][i] = getRandomInt(-10,10);
            }

            values[0][0][6] = getRandomInt(-8,8);
            values[0][0][7] = getRandomInt(-8,8);
            values[0][0][8] = getRandomInt(-8,8);
            values[0][0][9] = getRandomInt(-30,30);
            values[0][0][10] = getRandomInt(-8,8);
            values[0][0][11] = getRandomInt(-8,8);
            values[0][0][12] = getRandomInt(-8,8);
            values[0][0][13] = getRandomInt(-30,30);

            changeVariant(0+","+0);
            initData();
            var ansText = generateAnsText();
            var intAns = true;
            ansText.split(",").forEach(function(value) { intAns = intAns && (value == Math.floor(value)) && (Math.abs(value) <= 20); });
            // ansText.split(",").forEach(function(value) { intAns = intAns && (value == Math.floor(value)) && (Math.abs(value) <= 20); });
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
    $("#M2").html([cval[i],cval[i+1],cval[i+2]].join(';'));

    var i = 6;
    $("#l").html( "$\\begin{cases}"
        +linCombText([cval[i],cval[i+1],cval[i+2],cval[i+3]],["x","y","z",""])
        +"=0 \\\\"
        +linCombText([cval[i+4],cval[i+1+4],cval[i+2+4],cval[i+3+4]],["x","y","z",""])
        +"=0 \\end{cases} $" );
    for (var i = 0; i < 3; i++) {
        m1[i] = cval[i];
    }
    for (var i = 0; i < 3; i++) {
        m2[i] = cval[i+3];
    }
    for (var i = 0; i < 4; i++) {
        vecN10[i] = cval[i+6];
        vecN20[i] = cval[i+6+4];
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
var m2 = [];
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
    primitives.push({class:"point", text: katex.renderToString("M_2"), arr0:m2, rad:5, color:[0.0, 0.7, 0.0, 1.0]});

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

    // vec3.normalize(v);

    var vecS1 = [];
    vec3.add(vecS,p0,vecS1);

    var p1 = [];
    var p2 = [];
    createLine(p0,vecS1, p1,p2,11);
    primitives.push({class:"line", text: katex.renderToString("l"), arr0:p1, arr1:p2, rad:2, color:[0.5, 0.0, 1.0, 1.0]});

    if (showSolution) {
        primitives.push({class:"arrow", text: katex.renderToString("\\vec s"), arr0:[0,0,0], arr1:vecS, rad:2, color:[1.0, 0.0, 1.0, 1.0]});

        var m3 = [];
        vec3.add(m1, vecS, m3);

        var vecM1M2 = [];
        vec3.subtract(m2,m1,vecM1M2);

        var vecNans = [];
        vec3.cross(vecM1M2,vecS,vecNans);
        vecNans[3] = -(vecNans[0]*m1[0]+vecNans[1]*m1[1]+vecNans[2]*m1[2]);
        unifyAswer(vecNans);
        $("#ans1").val( parseFloat(vecNans[0].toFixed(precision1)) );
        $("#ans2").val( parseFloat(vecNans[1].toFixed(precision1)) );
        $("#ans3").val( parseFloat(vecNans[2].toFixed(precision1)) );
        $("#ans4").val( parseFloat(vecNans[3].toFixed(precision1)) );

        var planepoint1ans = [];
        var planepoint2ans = [];
        var planepoint3ans = [];
        var planepoint4ans = [];
        createPlane(m1,m2,m3,planepoint1ans,planepoint2ans,planepoint3ans,planepoint4ans,11);
        primitives.push({class:"plane", text: "", arr0:planepoint1ans, arr1:planepoint2ans, arr2:planepoint3ans, arr3:planepoint4ans, color:[0.0, 0.0, 1.0, 0.3]});
    }

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pointM10,pointM11,pointM12,planepoint1,planepoint2,planepoint3,planepoint4,30);
    primitives.push({class:"plane", text: katex.renderToString("\\pi_1"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 1.0, 0.0, 0.25]});

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pointM20,pointM21,pointM22,planepoint1,planepoint2,planepoint3,planepoint4,30);
    primitives.push({class:"plane", text: katex.renderToString("\\pi_2"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[1.0, 1.0, 0.0, 0.25]});

}
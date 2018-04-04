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
    var conditions = "Составьте уравнение плоскости $\\pi_1$, проходящей через прямую\
      \\begin{equation} l:\\begin{cases} A_1x+B_1y+C_1z+D_1=0\\\\ A_2x+B_2y+C_2z+D_2=0 \\end{cases}  \\end{equation}\
      перпендикулярно плоскости\
      \\begin{equation}\\pi: A_3x+B_3y+C_3z+D_3=0 \\end{equation}";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
      var algorithm = "<p>Составим уравнение пучка плоскостей, проходящих через прямую $l$:\
      \\begin{equation}A_1x+B_1y+C_1z+D_1+\\lambda(A_2x+B_2y+C_2z+D_2)=0 \\end{equation}\
      где $\\lambda$ - некоторое действительное число</p>";
      algorithm += "<p>Приводя подобные слагаемые в формуле $(3)$, получаем уравнение плоскости $\\pi_1$ с неизвестным параметром $\\lambda$:\
      \\begin{equation}\\pi_1: A_4x+B_4y+C_4z+D_4=0 \\end{equation} \
      где $$A_4=A_1+\\lambda A_2$$ $$B_4=B_1+\\lambda B_2$$ $$C_4=C_1+\\lambda C_2$$ $$D_4=D_1+\\lambda D_2$$ </p>";
      algorithm += "<p>Для нахождения параметра $\\lambda$ запишем условия перпендикулярности плоскости $\\pi_1$ с вектором нормали $\\vec n_1=\\{A_4;B_4;C_4\\}$ и плоскости $\\pi$ с вектором нормали $\\vec n=\\{A_3;B_3;C_3\\}$:\
      \\begin{equation}(\\vec n,\\vec n_1)=0,\\end{equation} \
      \\begin{equation*} A_3A_4+B_3B_4+C_3C_4=0, \\end{equation*} \
      \\begin{equation} A_3(A_1+\\lambda A_2)+B_3(B_4=B_1+\\lambda B_2)+C_3(C_1+\\lambda C_2)=0 \\end{equation} </p>";
      algorithm += "<p>Решая уравнение $(6)$ находим:\
      \\begin{equation} \\lambda=\\frac{-A_3A_1-B_3B_1-C_3C_1}{A_2A_3+B_2B_3+C_2C_3}\\end{equation} \</p>";
      algorithm += "<p>Подставляя значения параметра $\\lambda$ из формулы $(7)$ в формулу $(4)$, получаем искомое уравнение плоскости $\\pi_1$</p>";
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
    values[0].push([2,1,2,5, 2,-2,-1,2, 1,4,-3,101]);
    values[0].push([1,1,4,2,1,3,-4,-2,-2,1,4,-3]);
    values[1].push([0,4,2,2,-4,0,2,-1,2,4,4,-6]);
    values[1].push([-4,-2,-1,-5,0,-2,-3,1,-3,0,3,-8]);
    values[1].push([-4,3,-4,-4,4,4,2,2,0,0,-4,6]);
    values[1].push([-3,-2,-3,-5,1,1,1,-3,1,4,-3,-4]);
    values[1].push([0,-4,-5,-1,-2,2,3,1,-2,1,1,-7]);
    values[1].push([4,0,1,2,1,3,3,-1,-1,-5,4,-6]);
    values[1].push([-2,2,-2,-3,0,2,-2,-5,3,-4,-4,-1]);
    values[1].push([0,0,2,-2,2,0,1,3,-5,-4,-5,-8]);
    values[1].push([1,-1,-5,0,-4,-2,3,0,4,-2,3,-9]);
    values[1].push([-2,3,0,-3,3,4,-1,-1,-2,2,-3,5]);
    values[1].push([1,0,4,-4,2,0,2,-3,-3,3,0,1]);
    values[1].push([3,-2,0,1,-2,0,0,-4,2,4,-3,8]);
    values[1].push([-2,4,-4,2,4,-4,4,-5,-4,-2,-3,0]);
    values[1].push([-1,-2,-3,-4,2,2,-3,-1,0,-3,1,8]);
    values[2].push([-1,-1,2,2,-1,-4,-4,2,1,-5,-2,9]);
    values[2].push([1,-1,-1,-4,-3,2,-1,0,3,-1,-2,0]);
    values[2].push([-3,2,-4,1,0,0,1,2,-4,3,0,1]);
    values[2].push([-5,-5,0,-2,-4,3,-5,0,1,3,1,-4]);
    values[2].push([-5,1,2,-1,0,-4,2,-1,-2,-5,-5,4]);
    values[2].push([2,-1,3,-1,-5,-5,0,1,0,1,-3,-9]);
    values[2].push([0,-3,0,3,-1,-4,0,2,0,1,0,1]);
    values[2].push([1,0,4,-1,0,3,-3,4,4,4,2,9]);
    values[2].push([-5,-3,-1,-5,1,2,-1,3,2,-2,-2,9]);
    values[2].push([-5,0,-3,0,-5,2,-2,-2,2,3,-3,3]);
    values[2].push([0,2,0,1,1,1,1,2,-3,-4,-2,4]);
    values[2].push([2,-5,-1,2,0,2,-4,-2,2,0,0,-4]);
    values[2].push([3,0,3,2,-3,2,-2,3,-1,-4,2,-5]);
    values[2].push([0,0,2,-4,4,-1,-5,3,-1,-4,-3,-5]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '<p>$l$: <span id="l"></span></p>';
    variants += '<p>$\\pi_1$: <span id="pi1"></span></p>';
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
            for (var i = 0; i < 11; i++) {
                values[0][0][i] = getRandomInt(-5,5);
            }
            values[0][0][11] = getRandomInt(-10,10);
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

    scaleFactor = 0.2;
    axisLen = 20;
    axisDashStep = 4;
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
    $("#l").html( "$\\begin{cases}"
        +linCombText([cval[i],cval[i+1],cval[i+2],cval[i+3]],["x","y","z",""]) + "=0 \\\\"
        +linCombText([cval[i+4],cval[i+5],cval[i+6],cval[i+7]],["x","y","z",""]) + "=0 \\end{cases} $" );
    var i = 8;
    $("#pi1").html( "$" +linCombText([cval[i],cval[i+1],cval[i+2],cval[i+3]],["x","y","z",""]) + "=0$" );
    for (var i = 0; i < 4; i++) {
        abcd1[i] = cval[i];
        abcd2[i] = cval[i+4];
        abcd[i] = cval[i+8];
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
var abcd = [];
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "x", arr0:[axisLen,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,axisLen,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,axisLen]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    var pointM10 = [];
    var pointM11 = [];
    var pointM12 = [];
    pointsFromABCD(abcd1, pointM10,pointM11,pointM12);
    var pointM20 = [];
    var pointM21 = [];
    var pointM22 = [];
    pointsFromABCD(abcd2, pointM20,pointM21,pointM22);

    var pointM0 = [];
    var pointM1 = [];
    var pointM2 = [];
    pointsFromABCD(abcd, pointM0,pointM1,pointM2);

    var n1 = abcd1;
    var n2 = abcd2;
    var v0 = [];
    vec3.cross(n1,n2,v0);
    unifyAswer(v0);
    var p0 = [];
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

    var v = [];
    vec3.add(v0,p0,v);
    var p1 = [];
    vec3.add(p0,abcd,p1);

    var leftPoint = [];
    var rightPoint = [];
    createLine(p0,v,leftPoint,rightPoint,25);
    primitives.push({class:"line", text: katex.renderToString("l"), arr0:leftPoint, arr1:rightPoint, rad:2, color:[0.5, 0.0, 1.0, 1.0]});

    if (showSolution) {
        var vecNans = [];
        vec3.cross(abcd,v0,vecNans);
        vecNans[3] = -(vecNans[0]*p0[0]+vecNans[1]*p0[1]+vecNans[2]*p0[2]);
        unifyAswer(vecNans);
        $("#ans1").val(parseFloat(vecNans[0].toFixed(precision1)));
        $("#ans2").val(parseFloat(vecNans[1].toFixed(precision1)));
        $("#ans3").val(parseFloat(vecNans[2].toFixed(precision1)));
        $("#ans4").val(parseFloat(vecNans[3].toFixed(precision1)));

        var planepoint1ans = [];
        var planepoint2ans = [];
        var planepoint3ans = [];
        var planepoint4ans = [];
        createPlane(p0,p1,v,planepoint1ans,planepoint2ans,planepoint3ans,planepoint4ans,25);
        primitives.push({class:"plane", text: "", arr0:planepoint1ans, arr1:planepoint2ans, arr2:planepoint3ans, arr3:planepoint4ans, color:[0.0, 0.0, 1.0, 0.45]});
    }

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pointM0,pointM1,pointM2,planepoint1,planepoint2,planepoint3,planepoint4,25);
    primitives.push({class:"plane", text: katex.renderToString("\\pi_1"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 1.0, 0.0, 0.25]});

    // var planepoint1 = [];
    // var planepoint2 = [];
    // var planepoint3 = [];
    // var planepoint4 = [];
    // createPlane(pointM10,pointM11,pointM12,planepoint1,planepoint2,planepoint3,planepoint4,25);
    // primitives.push({class:"plane", text: katex.renderToString("\\pi_1"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 1.0, 0.0, 0.25]});

    // var planepoint1 = [];
    // var planepoint2 = [];
    // var planepoint3 = [];
    // var planepoint4 = [];
    // createPlane(pointM20,pointM21,pointM22,planepoint1,planepoint2,planepoint3,planepoint4,25);
    // primitives.push({class:"plane", text: katex.renderToString("\\pi_2"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[1.0, 1.0, 0.0, 0.25]});
}
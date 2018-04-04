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
    var conditions = "Убедитесь в том, что прямая\
      \\begin{equation}l:\\frac{x-x_1}{m}=\\frac{y-y_1}{n}=\\frac{z-z_1}{p}\\end{equation}\
      параллельна плоскости\
      \\begin{equation}\\pi:Ax+By+Cz+D=0,\\end{equation}\
      и вычислите расстояние от прямой до плоскости $\\pi$.<br> Ответ дать с точностью до 3-го знака после запятой.";
    // var conditions = "Убедитесь в том, что прямая $l:\\frac{x-x_0}{p_1}=\\frac{y-y_0}{p_2}=\\frac{z-z_0}{p_3}$ параллельна плоскости $\\pi:Ax+By+Cz+D=0$ и вычислите расстояние от прямой до плоскости.";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
      var algorithm = "<p>Прямая $l$, заданная каноническими уравнениями $(1)$,\
      параллельна плоскости $\\pi$,\
      заданной общим уравнением $(2)$,\
      если направляющий вектор $\\vec s=\\{m;n;p\\}$ ортогонален вектору нормали $\\vec n=\\{A;B;C\\}$\
      к плоскости $\\pi$, то есть:\
     \\begin{equation}(\\vec n,\\vec s)=0,\\end{equation}\
     \\begin{equation*}Am+Bn+Cp=0\\end{equation*}</p>";
      algorithm += "<p>Расстояние от прямой $l$ до плоскости $\\pi$ является расстоянием\
      от точки $P(x_1;y_1;z_1)$ прямой $l$ до плоскости $\\pi$ и может быть вычислено по формуле:\
      \\begin{equation}d=\\rho(P,\\pi)=\\frac{|Ax_1+By_1+Cz_1+D|}{\\sqrt{A^2+B^2+C^2}}\\end{equation}</p>";
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

    values[0].push([2,-1,-3, -1,2,4, 2,3,-1,14]);
    values[0].push([-3,-3,2,-4,0,-2,2,3,-4,2]);
    values[1].push([0,-2,3,2,0,1,1,-1,-2,-2]);
    values[1].push([-2,-1,0,2,1,-2,2,2,3,-5]);
    values[1].push([-1,-1,2,2,-3,0,-3,-2,2,1]);
    values[1].push([-2,-1,-4,0,0,-3,-2,-2,0,7]);
    values[1].push([2,0,-2,1,0,3,3,-3,-1,4]);
    values[1].push([2,-2,1,3,3,3,2,-2,0,6]);
    values[1].push([2,2,-1,-4,2,2,0,-1,1,1]);
    values[1].push([2,-4,-3,0,2,-4,-4,-2,-1,3]);
    values[1].push([1,3,-3,3,-2,1,-1,0,3,-7]);
    values[1].push([1,-3,-1,3,-1,-3,-4,0,-4,-7]);
    values[1].push([0,-1,-4,-1,1,1,-1,0,-1,2]);
    values[1].push([2,-3,-3,0,-3,-3,-4,1,-1,3]);
    values[1].push([-2,-1,-4,-2,-4,0,2,-1,0,-4]);
    values[1].push([2,-1,2,1,3,3,-3,-1,2,-4]);
    values[2].push([-2,3,-4,-2,1,1,0,2,-2,7]);
    values[2].push([3,-2,-1,0,-2,1,2,0,0,4]);
    values[2].push([-2,-3,-1,3,2,1,1,0,-3,-8]);
    values[2].push([-4,2,2,3,-1,2,1,1,-1,1]);
    values[2].push([-3,0,-3,2,-4,2,3,2,1,2]);
    values[2].push([-2,2,3,-3,-1,0,-1,3,3,6]);
    values[2].push([3,3,2,-1,1,-2,3,3,0,0]);
    values[2].push([1,2,-1,-4,1,-4,1,-4,-2,-6]);
    values[2].push([2,1,1,1,-3,-2,1,-1,2,1]);
    values[2].push([-3,-1,1,1,-1,-1,-2,-3,1,5]);
    values[2].push([-2,1,-2,-1,-4,1,-1,0,-1,6]);
    values[2].push([-2,-1,2,1,-2,-1,2,2,-2,-2]);
    values[2].push([-4,-1,2,-4,-1,-2,-1,2,1,2]);
    values[2].push([1,-3,1,3,0,-4,-4,3,-3,3]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '<p>$l$: <span id="l"></span></p>';
    variants += '<p>$\\pi$: <span id="pi"></span></p>';
    $("#variants").html(variants);

    var answer = '';
    answer += '$h$ = <input type="text" id="ans1" size=3>';

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
            for (var i = 0; i < 9; i++) {
                values[0][0][i] = getRandomInt(-4,4);
            }
            values[0][0][9] = getRandomInt(-8,8);


            var n1 = [values[0][0][3], values[0][0][4], values[0][0][5]];
            var n2 = [values[0][0][6], values[0][0][7], values[0][0][8]];
            vec3.dot(n1,n2);
            if (vec3.dot(n1,n2)!=0) {
                continue;
            }
            changeVariant(0+","+0);
            initData();
            var ansText = generateAnsText();
            var intAns = true;
            ansText.split(",").forEach(function(value) { intAns = intAns && (Math.abs(value) <= 15); });
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
    $("#l").html( "$\\frac{"+linCombText([1,-cval[i]],["x",""])+"}{"+cval[i+3]
        +"}=\\frac{"+linCombText([1,-cval[i+1]],["y",""])+"}{"+cval[i+4]
        +"}=\\frac{"+linCombText([1,-cval[i+2]],["z",""])+"}{"+cval[i+5]+"}$" );
    var i = 6;
    $("#pi").html( "$"+linCombText([cval[i],cval[i+1],cval[i+2],cval[i+3]],["x","y","z",""]) + "=0$" );
    for (var i = 0; i < 3; i++) {
        p1[i] = cval[i];
        vecS1[i] = cval[i+3];
    }
    for (var i = 0; i < 4; i++) {
        abcd[i] = cval[i+6];
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
var abcd = [];
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
    primitives.push({class:"line", text: katex.renderToString("l"), ratio: 0.7, arr0:leftPoint, arr1:rightPoint, rad:2, color:[1.0, 0.5, 0.0, 1.0]});

    var pointRad = 4;
    var lineRad = 2;

    primitives.push({class:"point", text: katex.renderToString("M_0"), arr0:p1, rad:pointRad, color:[0.0, 0.2, 1.0, 1.0]});

    primitives.push({class:"arrow", text: katex.renderToString("\\vec p"), arr0:p1, arr1:p12, rad:3, color:[0.0, 0.2, 1.0, 1.0]});

    var plane1 = [];
    var plane2 = [];
    var plane3 = [];
    pointsFromABCD(abcd, plane1, plane2, plane3);

    if (showSolution) {

        var delta = [];
        var dist = distToPlane(p1, plane1, plane2, plane3, delta);
        $("#ans1").val(parseFloat(dist.toFixed(precision1)));

        var m0 = [];
        vec3.add(delta,p1,m0);

        primitives.push({class:"dashline", text: "h", arr0:p1, arr1:m0, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    }
    var planepoint1ans = [];
    var planepoint2ans = [];
    var planepoint3ans = [];
    var planepoint4ans = [];
    createPlane(plane1, plane2, plane3,planepoint1ans,planepoint2ans,planepoint3ans,planepoint4ans,10);
    primitives.push({class:"plane", text: katex.renderToString("\\pi"), arr0:planepoint1ans, arr1:planepoint2ans, arr2:planepoint3ans, arr3:planepoint4ans, color:[0.0, 0.0, 1.0, 0.2]});
}
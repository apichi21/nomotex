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
    var conditions = "Составьте канонические и параметрические уравнения прямой $l_2$, проходящей через точку $P_2(x_2;y_2;z_2)$ и точку пересечения $P_3(x_3;y_3;z_3)$ прямой\
      \\begin{equation}l_1:\\frac{x-x_1}{m_1}=\\frac{y-y_1}{n_1}=\\frac{z-z_1}{p_1}\\end{equation}\
      с плоскостью\
      \\begin{equation}\\pi:Ax+By+Cz+D=0,\\end{equation}";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
      var algorithm = "<p>Записав параметрические уравнения прямой $l_1$, решим систему уравнений прямой $l_1$ и плоскости $\\pi$ относительно параметра $t$:\
      \\begin{equation} \\begin{cases} x=x_1+m_1t  \\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\, (а) \\\\ y=y_1+n_1t \\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\; (б) \\\\z=z_1+p_1t  \\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\,(в) \\\\Ax+By+Cz+D=0\\;\\;\\;\\;\\;\\;\\;\\;\\;\\;\\; (г)\\end{cases} \\end{equation}\
      \\begin{equation}t=\\frac{-Ax-By-Cz-D}{Am_1+Bn_1+Cp_1}\\end{equation}</p>";
      algorithm += "<p>Подставляя найденные значения $t$ из формулы $(4)$ в параметрические уравнения прямой $l_1$ $а)-в)$ в системе $(3)$,\
      находим координаты точки пересечения $P_3(x_3;y_3,z_3)$ прямой $l_1$ и плоскости $\\pi$,где $$x_3=x_1+m_1t$$ $$y_3=y_1+n_1t$$ $$z_3=z_1+p_1t$$ </p>";
      algorithm += "<p>Тогда канонические уравнения прямой $l_2$ будут иметь вид:\
      \\begin{equation}\\frac{x-x_2}{m_2}=\\frac{y-y_2}{n_2}=\\frac{z-z_2}{p_2},\\end{equation}\
      где $$m_2=x_3-x_2$$ $$n_2=y_3-y_2$$ $$p_2=z_3-z_2$$</p>";
      algorithm += "<p>Запишем параметрические уравнения прямой $l_2$:\
     \\begin{equation} \\begin{cases} x=x_2+m_2t  \\\\ y=y_2+n_2t \\\\z=z_2+p_2t \\end{cases} \\end{equation}</p>";
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

    values[0].push([2,-3,5, -1,0,2, 3,2,-1, 3,-1,2,-11]);
    values[0].push([-10,17,-2,-6,-5,17,10,-7,8,-8,7,-17,11]);
    values[1].push([-10,2,18,-5,11,10,-15,-6,3,-15,-5,19,-2]);
    values[1].push([-12,14,-11,-11,11,9,-12,6,18,3,7,18,14]);
    values[1].push([-12,14,-2,4,5,-9,16,-20,-14,10,1,-15,-5]);
    values[1].push([-12,5,7,-18,4,-13,-4,-10,-20,17,12,8,14]);
    values[1].push([-14,1,11,-1,11,11,10,-11,15,1,6,-6,1]);
    values[1].push([-14,11,-9,6,4,7,-7,1,-6,0,5,-6,-19]);
    values[1].push([-15,-18,-1,-5,-17,-4,0,-3,4,10,-2,17,10]);
    values[1].push([-16,-16,18,0,-2,1,-8,-11,14,1,-4,-7,-1]);
    values[1].push([-2,3,-4,-20,14,-10,0,3,12,-1,-3,-1,-2]);
    values[1].push([-2,3,5,-5,13,-15,9,-8,-19,-8,-14,-10,-8]);
    values[1].push([-4,-6,-14,-11,-2,9,11,-14,-7,9,0,1,-2]);
    values[1].push([-6,-2,-5,-16,10,-16,-2,1,-2,15,0,9,0]);
    values[1].push([-6,11,7,-9,-4,3,-12,0,0,-10,17,0,8]);
    values[1].push([-9,3,9,2,-4,-1,-10,0,-5,5,6,12,-18]);
    values[2].push([-9,9,-12,9,0,-2,-6,18,-8,7,-1,4,-9]);
    values[2].push([0,-11,-8,-15,-18,-9,5,-19,7,-8,12,10,-12]);
    values[2].push([0,-7,3,1,12,-6,2,-6,1,19,-17,-12,-15]);
    values[2].push([1,16,-5,15,10,0,-10,-14,0,-7,12,15,-15]);
    values[2].push([1,4,-12,-8,11,12,1,11,7,-10,10,-6,-2]);
    values[2].push([12,-13,-9,8,-7,-3,14,-14,-7,12,-2,17,7]);
    values[2].push([12,8,-17,-4,-5,5,-5,-1,4,4,11,3,18]);
    values[2].push([13,-2,4,6,-19,-12,-10,0,-11,9,-8,18,10]);
    values[2].push([14,-3,-9,10,2,6,9,5,8,-7,4,-18,-17]);
    values[2].push([14,18,1,-20,9,-11,-16,2,0,16,-8,13,-9]);
    values[2].push([19,-7,1,13,-9,13,18,9,18,12,-7,-19,-14]);
    values[2].push([6,-10,-8,5,9,-9,12,6,-9,0,-9,-12,-9]);
    values[2].push([6,13,-5,-2,-8,16,-7,-2,6,15,5,-3,-15]);
    values[2].push([6,15,10,-4,1,14,-16,-14,18,14,-2,5,-12]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '<p>$P_1$: <span id="p1"></span></p>';
    variants += '<p>$l_1$: <span id="l1"></span></p>';
    variants += '<p>$\\pi$: <span id="pi"></span></p>';
    $("#variants").html(variants);

    var answer = '';
    answer += '<p><table style="text-align: center">';
    answer += '<tr>';
    answer += '<td>$x_0$</td>';
    answer += '<td><input type="text" id="ans1" size=3></td>';
    answer += '<td>$y_0$</td>';
    answer += '<td><input type="text" id="ans2" size=3></td>';
    answer += '<td>$z_0$</td>';
    answer += '<td><input type="text" id="ans3" size=3></td>';
    answer += '</tr>';
    answer += '<tr>';
    answer += '<td>$p_1$</td>';
    answer += '<td><input type="text" id="ans4" size=3></td>';
    answer += '<td>$p_2$</td>';
    answer += '<td><input type="text" id="ans5" size=3></td>';
    answer += '<td>$p_3$</td>';
    answer += '<td><input type="text" id="ans6" size=3></td>';
    answer += '</tr>';
    answer += '</table></p>';

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
        var maxit = 1000;
        var mySet = new Set();
        var count1 = 0;
        precision1 = 10;

        while (ccc < maxit) {
            for (var i = 0; i < values[0][0].length; i++) {
                values[0][0][i] = getRandomInt(-20,20);
            }
            changeVariant(0+","+0);
            initData();
            var ansText = generateAnsText();
            var intAns = true;
            ansText.split(",").forEach(function(value) { intAns = intAns && (value == Math.floor(value)) && (Math.abs(value) <= 20); });
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

    scaleFactor = 0.05;
    axisLen = 30;
    axisDashStep = 5;
}
function generateAnsText()
{
    var ansArr = [];
    for (var j = 1; j <= 6; j++) {
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
    $("#p1").html("$("+[cval[i],cval[i+1],cval[i+2]].join(';')+")$");
    var i = 3;
    $("#l1").html( "$\\frac{"+linCombText([1,-cval[i]],["x",""])+"}{"+cval[i+3]
        +"}=\\frac{"+linCombText([1,-cval[i+1]],["y",""])+"}{"+cval[i+4]
        +"}=\\frac{"+linCombText([1,-cval[i+2]],["z",""])+"}{"+cval[i+5]+"}$" );
    var i = 9;
    $("#pi").html( "$" +linCombText([cval[i],cval[i+1],cval[i+2],cval[i+3]],["x","y","z",""]) + "=0$" );
    for (var i = 0; i < 3; i++) {
        pointP1[i] = cval[i];
        p1[i] = cval[i+3];
        vecS1[i] = cval[i+6];
    }
    for (var i = 0; i < 4; i++) {
        abcd1[i] = cval[i+9];
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
var pointP1 = [];
var p1 = [];
var vecS1 = [];
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

    primitives.push({class:"point", text: katex.renderToString("P_1"), arr0:pointP1, rad:4, color:[0.0, 0.0, 1.0, 1.0]});

    var p2 = [];
    vec3.add(p1, vecS1, p2);
    var leftPoint = [];
    var rightPoint = [];
    createLine(p1,p2,leftPoint,rightPoint,30);
    primitives.push({class:"line", text: katex.renderToString("l_1"), ratio: 0.7, arr0:leftPoint, arr1:rightPoint, rad:2, color:[1.0, 0.5, 0.0, 1.0]});

    if (showSolution) {
        var intersect = [];
        intersectLine(p1, p2, pointM10,pointM11,pointM12, intersect);
        primitives.push({class:"point", text: "", arr0:intersect, rad:3, color:[1.0, 0.0, 0.0, 1.0]});

        var vecS2 = [];
        vec3.subtract(intersect, pointP1, vecS2);

        $("#ans1").val(parseFloat(intersect[0].toFixed(precision1)));
        $("#ans2").val(parseFloat(intersect[1].toFixed(precision1)));
        $("#ans3").val(parseFloat(intersect[2].toFixed(precision1)));
        $("#ans4").val(parseFloat(vecS2[0].toFixed(precision1)));
        $("#ans5").val(parseFloat(vecS2[1].toFixed(precision1)));
        $("#ans6").val(parseFloat(vecS2[2].toFixed(precision1)));

        var leftPoint = [];
        var rightPoint = [];
        createLine(intersect,pointP1,leftPoint,rightPoint,30);
        primitives.push({class:"line", text: katex.renderToString("l_2"), ratio: 0.7, arr0:leftPoint, arr1:rightPoint, rad:2, color:[0.0, 0.5, 1.0, 1.0]});

    }
    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pointM10,pointM11,pointM12,planepoint1,planepoint2,planepoint3,planepoint4,25);
    primitives.push({class:"plane", text: katex.renderToString("\\pi_1"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 1.0, 0.0, 0.25]});
}
var dimention="3d";
function initPoints() {
    points = [];
}
var values = [[],[],[]];
var showAlgorithm = false;
var setOfValues = -1;
var mustBeHandedOver = false;
var showSolution = false;
var precision1 = 2;
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
    var conditions = "Напишите координаты точки $M_2$, симметричной точке $M_1(x_1, y_1, z_1)$ относительно плоскости \
      \\begin{equation*} \\pi :  A x + B y + C z + D = 0. \\end{equation*}";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
      var algorithm = "<p> Точка $M_2$ лежит с точкой $M_1$ на одной прямой $l$, перпендикулярной плоскости $\\pi$. Следовательно, направляющий вектор прямой $l$ коллинеарен нормальному вектору плоскости  $\\pi$: \
      \\begin{equation}  \\vec{s} = \\vec{n} = \\{A; B; C\\} \\end{equation} </p>";
      algorithm += "<p>Запишем канонические уравнения прямой $l$: \
      \\begin{equation} \\frac{x-x_1}{A} = \\frac{y-y_1}{B} = \\frac{z-z_1}{C} \\end{equation} </p>";
      algorithm += "<p>Приравнивая эти выражения к параметру $t$, запишем параметрические уравнения прямой $l$:  \
      \\begin{equation}  \\begin{cases} x = A t + x_1 \\\\ y = B t + y_1 \\\\ z = C t + z_1  \\end{cases} \\end{equation}</p>";
      algorithm += "<p>Найдем точку пересечения прямой $l$ и плоскости $\\pi$, решив систему $(3)$ с присоединенным к ней уравнением плоскости $\\pi$: \
      \\begin{equation} \\begin{cases} x = A t + x_1 \\\\ y = B t + y_1 \\\\ z = C t + z_1 \\\\ A x + B y + C z + D = 0 \\end{cases}  \\end{equation}</p>";
      algorithm += "<p>Из системы $(4)$ следует, что \
      \\begin{equation*} A(A t + x_1) + B(B t + y_1) + C(C t + z_1) + D = 0 \\end{equation*}</p>";
      algorithm += "<p>Раскрывая скобки, получаем: \
      \\begin{equation} (A^2 + B^2 + C^2)t + A x_1 + B y_1 + C z_1 + D = 0, \\end{equation} \
      где $A, B, C, x_1, y_1, z_1$ - известны.</p>";
      algorithm += "<p>Таким образом, $(5)$ - линейное уравнение относительно параметра $t.$</p>";
      algorithm += "<p>Находя значения параметра $t$ из уравнения $(5)$, подставляем это значение в систему $(4)$, и, таким образом, получаем координаты точки $M_0(x_0, y_0, z_0)$ пересечения прямой $l$ и плоскости $\\pi.$</p>";
      algorithm += "<p>Точка $M_0(x_0, y_0, z_0)$ является серединой отрезка $M_1 M_2$, следовательно, \
      \\begin{equation} \\begin{cases} \\frac{x_1+x_2}{2} = x_0 \\\\ \\frac{y_1+y_2}{2} = y_0 \\\\ \\frac{z_1+z_2}{2} = z_0 \\end{cases} \\end{equation} \
      где $x_2, y_2, z_2$ - неизвестные координаты точки $M_2.$</p>";
      algorithm += "<p>Выражая из системы $(6)$ координаты $M_2(x_2, y_2, z_2)$ через известные координаты точек $M_1(x_1, y_1, z_1)$ и $M_0(x_0, y_0, z_0)$, получаем ответ: \
      \\begin{equation*} \\begin{cases} x_2 = 2 x_0-x_1 \\\\ y_2 = 2 y_0-y_1 \\\\ z_2 = 2 z_0-z_1 \\end{cases} \\end{equation*}  </p>";
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

    values[0].push([5,2,-1, 2,-1,3,23]);
    values[0].push([0,5,3,-4,-4,0,28]);
    values[1].push([-9,-9,-2,6,-4,-2,-28]);
    values[1].push([8,4,-2,2,0,2,-8]);
    values[1].push([-1,9,9,4,0,-2,12]);
    values[1].push([-7,-2,-3,3,-1,-2,6]);
    values[1].push([-6,8,7,-2,7,5,-25]);
    values[1].push([-8,1,4,2,2,2,-9]);
    values[1].push([-2,-1,-9,5,-4,5,18]);
    values[1].push([-10,-10,3,0,0,5,-25]);
    values[1].push([-9,-7,-5,-3,3,-6,9]);
    values[1].push([6,7,5,4,6,0,-27]);
    values[1].push([8,-5,-2,4,-4,-4,6]);
    values[1].push([6,-4,5,5,-2,5,18]);
    values[1].push([-2,0,9,-8,4,2,29]);
    values[1].push([9,-5,-5,2,-1,2,-22]);
    values[2].push([3,2,4,6,4,-6,-24]);
    values[2].push([-2,-9,-10,-8,-2,-8,18]);
    values[2].push([-9,-7,7,-2,5,-7,27]);
    values[2].push([-4,6,8,1,3,1,-11]);
    values[2].push([2,7,9,-4,3,-1,22]);
    values[2].push([-10,6,-5,-4,-3,-7,17]);
    values[2].push([9,-3,-10,6,6,3,21]);
    values[2].push([-9,2,1,-8,2,4,-17]);
    values[2].push([-3,6,6,-6,6,6,-18]);
    values[2].push([1,0,6,3,4,-1,16]);
    values[2].push([-6,-1,-9,3,-6,-1,-20]);
    values[2].push([-1,5,-3,6,-4,-2,-22]);
    values[2].push([-8,9,4,-4,-6,-2,2]);
    values[2].push([7,0,-1,5,4,-2,8]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '<p>$M_1$: (<span id="M1"></span>)</p>';
    variants += '<p>$\\pi$: <span id="pi"></span></p>';
    $("#variants").html(variants);

    var answer = '';
    answer += '<table style="text-align: center">';
    answer += '<tr>';
    answer += '<td>$x$</td>';
    answer += '<td>$y$</td>';
    answer += '<td>$z$</td>';
    answer += '</tr>';
    answer += '<tr>';
    answer += '<td><input type="text" id="ans1" size=3></td>';
    answer += '<td><input type="text" id="ans2" size=3></td>';
    answer += '<td><input type="text" id="ans3" size=3></td>';
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
            for (var i = 3; i < 6; i++) {
                values[0][0][i] = getRandomInt(-8,8);
            }
            values[0][0][6] = getRandomInt(-30,30);
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
    for (var j = 1; j <= 3; j++) {
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
    $("#M1").html([cval[0],cval[1],cval[2]].join(';'));
    $("#pi").html( "$"+linCombText([cval[3],cval[4],cval[5],cval[6]],["x","y","z",""])+"=0$" );
    for (var i = 0; i < 3; i++) {
        m1[i] = cval[i];
    }
    for (var i = 0; i < 4; i++) {
        vecN10[i] = cval[i+3];
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    initBuffers();
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
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5.1, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    primitives.push({class:"point", text: katex.renderToString("M_1"), arr0:m1, rad:5, color:[0.7, 0.0, 0.0, 1.0]});

    var vecN0 = vecN10;
    var D=vecN10[3];

    var pointM0 = [];
    var pointM1 = [];
    var pointM2 = [];
    pointsFromABCD(vecN10, pointM0,pointM1,pointM2);

    var delta = [];
    distToPlane(m1, pointM0,pointM1,pointM2, delta);
    var m0 = [];
    vec3.add(delta,m1,m0);
    var m2 = [];
    vec3.add(delta,m0,m2);
    if (showSolution) {

        primitives.push({class:"point", text: katex.renderToString("M_0"), arr0:m0, rad:5, color:[0.0, 0.7, 0.0, 1.0]});

        primitives.push({class:"line", text: "", arr0:m1, arr1:m2, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
        primitives.push({class:"point", text: katex.renderToString("M_2"), arr0:m2, rad:5, color:[0.0, 0.0, 0.7, 1.0]});

        $("#ans1").val(parseFloat(m2[0].toFixed(precision1)));
        $("#ans2").val(parseFloat(m2[1].toFixed(precision1)));
        $("#ans3").val(parseFloat(m2[2].toFixed(precision1)));
    }
    var psize = 5;
    var maxp = Math.max(Math.abs(m0[0]),Math.abs(m0[1]),Math.abs(m0[2]));
    if (maxp>psize-1) {
        psize=maxp+2;
    }

    var planepoint11 = [];
    var planepoint21 = [];
    var planepoint31 = [];
    var planepoint41 = [];
    createPlane(pointM0,pointM1,pointM2,planepoint11,planepoint21,planepoint31,planepoint41,psize);

    var center = [];
    vec3.add(planepoint11,planepoint31,center);
    vec3.scale(center,0.5);
    var vecN1 = [];
    vec3.add(vecN0,center,vecN1);
    primitives.push({class:"point", text: "", arr0:center, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec n"), arr0:center, arr1:vecN1, rad:2, color:[0.0, 0.0, 1.0, 1.0]});

    primitives.push({class:"plane", text: katex.renderToString("\\pi"), arr0:planepoint11, arr1:planepoint21, arr2:planepoint31, arr3:planepoint41, color:[0.5, 0.5, 1.0, 0.35]});
}
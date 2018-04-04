var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
}
var values = [[],[],[]];
var showAlgorithm = false;
var setOfValues = -1;
var mustBeHandedOver = false;
var showSolution = false;
var precision1 = 0;
var precision2 = 3;
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

    $("Title").html("Задача 10");
    var conditions = "Задана пирамида $SABC$ с координатами вeршин в прямоугольной декартовой системе координат следующим образом: \
      $$ A = (x_1, y_1, z_1) $$ \
      $$ B = (x_2, y_2, z_2) $$ \
      $$ C = (x_3, y_3, z_3) $$ \
      $$ S = (x_4, y_4, z_4) $$ \
      а) составить уравнение плоскости треугольника $\\bigtriangleup ABC$, <br> \
      б) найти расстояние от вершины $S$ до плоскости $\\bigtriangleup ABC$. <br> Ответ дать с точностью до 3-го знака после запятой.";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
        var algorithm = "<p>Составим уравнение плоскости  $\\bigtriangleup ABC$, используя уравнение плоскости,\
        проходящей через 3 заданные точки ($A$,$B$ и $C$): \
        $$\\begin{vmatrix} x-x_1 & y-y_1 & z-z_1 \\\\ x_2-x_1 & y_2-y_1 & z_2-z_1 \\\\ x_3-x_1 & y_3-y_1 & z_3-z_1 \\end{vmatrix} = 0 $$</p>";
        algorithm += "<p>Раскрывая определитель по первой строке, получаем \
        $$\\alpha (x-x_1) + \\beta (y-y_1) + \\gamma (z-z_1) = 0, $$ \
        где $\\alpha = \\begin{vmatrix} y_2-y_1 & z_2-z_1 \\\\ y_3-y_1 & z_3-z_1 \\end{vmatrix},$ &nbsp; &nbsp; &nbsp;\
        $\\beta = -\\begin{vmatrix} x_2-x_1 & z_2-z_1 \\\\ x_3-x_1 & z_3-z_1 \\end{vmatrix},$    \
        $\\gamma = \\begin{vmatrix} x_2-x_1 & y_2-y_1 \\\\ x_3-x_1 & y_3-y_1 \\end{vmatrix}.$  <br> </p>";
        algorithm += "<p>Вычисляя определитель, находим \
        $$\\alpha = (y_2-y_1)(z_3-z_1) - (z_2-z_1)(y_3-y_1)$$ \
        $$\\beta = -(x_2-x_1)(z_3-z_1) + (z_2-z_1)(x_3-x_1)$$ \
        $$\\gamma = (x_2-x_1)(y_3-y_1) - (y_2-y_1)(x_3-x_1).$$ </p>";
        algorithm += "<p>б) Для нахождения расстояния $\\rho (S, \\pi)$ от вершины треугольника $S$ до плоскости $\\bigtriangleup ABC$ (плоскости $\\pi$) используем формулу для вычисления расстояния от любой точки до плоскости, заданной общим уравнением \
        $$\\rho (S, \\pi) = |\\frac{Ax_4 + By_4 + Cz_4 + D}{\\sqrt{A^2 + B^2 + C^2}}|, $$ \
        где $\\pi$ задана в виде $$Ax+By+Cz+D=0$$ </p>";
        algorithm += "<p>Приведем уравнение плоскости $\\bigtriangleup ABC$ к общему виду. Для этого раскроем скобки в уравнении плоскости $\\bigtriangleup ABC$: \
        $$\\alpha x + \\beta y + \\gamma z - (\\alpha x_1 + \\beta y_1 + \\gamma z_1) = 0$$ </p>";
        algorithm += "<p>Тогда $A = \\alpha$, $B = \\beta$, $C = \\gamma$, $D = - (\\alpha x_1 + \\beta y_1 + \\gamma z_1).$ </p>";
        algorithm += "<p>Подставляя эти коэффициенты в формулу для $\\rho (S, \\pi)$, получаем искомый результат.</p>";
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

    values[0].push([4,2,5, 0,7,2, 0,2,7, 1,5,0]);
    values[0].push([4,4,10, 4,10,2, 2,8,4, 9,6,4]);
    values[1].push([4,6,5, 6,9,4, 2,10,10, 0,-1,1]);
    values[1].push([3,5,4, 8,7,4, 5,10,4, 4,7,8]);
    values[1].push([10,6,6, -2,8,2, 6,8,9, 7,10,3]);
    values[1].push([1,8,2, 5,2,6, 5,7,4, 4,10,9]);
    values[1].push([6,6,5, 4,9,5, 4,6,11, 6,9,3]);
    values[1].push([7,2,2, 5,7,7, 5,3,1, 2,3,7]);
    values[1].push([8,6,4, 10,5,5, 5,6,8, 8,10,7]);
    values[1].push([7,7,3, 6,5,8, 3,5,8, 8,4,1]);
    values[1].push([3,-2,1, 0,1,2, 1,2,0, 1,-2,4]);
    values[1].push([1,-1,0, 4,3,5, 7,2,1, 2,3,4]);
    values[1].push([1,2,3, 3,2,1, 4,3,1, 2,1,7]);
    values[1].push([1,2,2, 2,3,1, 3,2,1, 4,5,7]);
    values[1].push([2,3,1, 3,4,1, 4,2,0, 5,1,2]);
    values[1].push([2,-1,-2, 3,1,0, 4,0,1, -3,2,-1]);
    values[2].push([3,0,-1, 2,5,1, 5,1,-2, 0,4,1]);
    values[2].push([-1,3,2, 1,3,3, -2,1,4, 4,-1,2]);
    values[2].push([-2,1,5, 2,3,6, -1,2,8, -3,5,-2]);
    values[2].push([4,-2,1, 5,1,3, 6,-1,1, 2,-3,-1]);
    values[2].push([1,4,-3, 0,3,-2, 3,5,1, -1,2,5]);
    values[2].push([6,0,1, 9,3,1, 7,2,3, 5,1,7]);
    values[2].push([-3,-4,5, -1,-5,7, -2,-1,3, 1,2,1]);
    values[2].push([5,-1,2, 6,1,1, 2,3,0, 3,-7,2]);
    values[2].push([1,-4,-3, 4,-5,-1, 3,-6,-4, 2,1,5]);
    values[2].push([0,3,5, 2,6,8, -1,4,3, 1,9,3]);
    values[2].push([-4,5,0, -7,7,1, -8,6,1, 9,7,-1]);
    values[2].push([2,4,7, -1,6,9, 0,5,7, 2,1,3]);
    values[2].push([8,-3,2, 9,-3,4, 10,-1,6, 4,1,3]);
    values[2].push([-5,4,3, -7,6,4, -5,7,5, 9,-2,3]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '$A$: (<span id="A"></span>)<br>';
    variants += '$B$: (<span id="B"></span>)<br>';
    variants += '$C$: (<span id="C"></span>)<br>';
    variants += '$S$: (<span id="S"></span>)<br>';
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
    answer += '$\\rho (S, \\pi)$ = <input type="text" id="ans5" size=7>';
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
    ansArr.push(parseFloat($("#ans5").val()).toFixed(precision2));
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
    vec3.set([cval[0],cval[1],cval[2]], pointM0);
    vec3.set([cval[3],cval[4],cval[5]], pointM1);
    vec3.set([cval[6],cval[7],cval[8]], pointM2);
    vec3.set([cval[9],cval[10],cval[11]], points[0].coord1);
    $("#A").html([cval[0],cval[1],cval[2]].join(';'));
    $("#B").html([cval[3],cval[4],cval[5]].join(';'));
    $("#C").html([cval[6],cval[7],cval[8]].join(';'));
    $("#S").html([cval[9],cval[10],cval[11]].join(';'));
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
var pointM0 = [];
var pointM1 = [];
var pointM2 = [];
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5.1, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    primitives.push({class:"point", text: katex.renderToString("A"), arr0:pointM0, rad:5, color:[0.0, 0.8, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("B"), arr0:pointM1, rad:5, color:[0.0, 0.8, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("C"), arr0:pointM2, rad:5, color:[0.0, 0.8, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("S"), arr0:points[0].coord1, rad:5, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:pointM0, arr1:pointM1, rad:1.5, color:[0.8, 0.8, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:pointM0, arr1:pointM2, rad:1.5, color:[0.8, 0.8, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:pointM1, arr1:pointM2, rad:1.5, color:[0.8, 0.8, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:pointM0, arr1:points[0].coord1, rad:1.5, color:[0.8, 0.8, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:pointM1, arr1:points[0].coord1, rad:1.5, color:[0.8, 0.8, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:pointM2, arr1:points[0].coord1, rad:1.5, color:[0.8, 0.8, 0.0, 1.0]});

    if (showSolution) {
        var delta = [];
        var dist = distToPlane(points[0].coord1, pointM0,pointM1,pointM2, delta);
        vec3.add(delta,points[0].coord1,points[1].coord1);
        primitives.push({class:"line", text: "d", arr0:points[0].coord1, arr1:points[1].coord1, rad:1.5, color:[1.0, 0.0, 0.0, 1.0]});

        var vecAB = [];
        var vecAC = [];
        vec3.subtract(pointM1,pointM0,vecAB);
        vec3.subtract(pointM2,pointM0,vecAC);

        var crossABxAC = [];
        vec3.cross(vecAB,vecAC,crossABxAC);
        crossABxAC[3] = -(crossABxAC[0]*pointM0[0]+crossABxAC[1]*pointM0[1]+crossABxAC[2]*pointM0[2]);
        unifyAswer(crossABxAC);
        $("#ans1").val(crossABxAC[0].toFixed(precision1));
        $("#ans2").val(crossABxAC[1].toFixed(precision1));
        $("#ans3").val(crossABxAC[2].toFixed(precision1));
        $("#ans4").val(crossABxAC[3].toFixed(precision1));
        $("#ans5").val(dist.toFixed(precision2));

        var planepoint1 = [];
        var planepoint2 = [];
        var planepoint3 = [];
        var planepoint4 = [];
        createPlane(pointM0,pointM1,pointM2,planepoint1,planepoint2,planepoint3,planepoint4,15);
        primitives.push({class:"plane", text: katex.renderToString("\\pi"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.5, 0.5, 1.0, 0.4]});
    }
}
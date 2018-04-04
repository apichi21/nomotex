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

    $("Title").html("Задача 14");
    var conditions = "Найти проекцию точки $M_0$ на плоскость $\\pi$, где точка $M_0$ задана своими координатами в прямоугольной декартовой системе координат в виде \
      \\begin{equation} M_0(x_0, y_0, z_0) \\end{equation} \
      а плоскость $\\pi$ задана общим уравнением в этой же системе координат в виде \
       \\begin{equation} \\pi: \\:\\:\\: A x + B y + C z + D = 0 \\end{equation} \
      Ответ дать с точностью до 2-го знака после запятой.";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
      var algorithm = "<p>Вектор нормали $\\vec{n}$ к плоскости $\\pi$ имеет следующие координаты: \
      \\begin{equation} \\vec{n}=\\{A,B,C\\}\\end{equation} </p>";
      algorithm += "<p>Составим параметрическое уравнение прямой $l$, проходящей через точку $M_0$, и в качесте направляющего вектора этой прямой выберем вектор $\\vec{n}$: \
      \\begin{equation} l: \\:\\:\\: \\begin{cases}  x = x_0 + A t \\\\ y = y_0 + B t \\\\ z = z_0 + C t  \\end{cases} \\end{equation}</p>";
      algorithm += "<p>Эта прямая перпендикулярна плоскости $\\pi$. Найдем точку $M$ пересечения прямой $l$ с плоскостью $\\pi$ &mdash; это и есть искомая проекция.</p>";
      algorithm += "<p>Для нахождения этой точки $M$ подставим соотношения $(4)$ в уравнение $(2)$: \
      $$ A (x_0 + A t) + B (y_0 + B t) + C (z_0 + C t) + D = 0 $$</p>";
      algorithm += "<p>Выражаем из этого уравнения параметр $t$: \
      $$t = - \\frac{D + A x_0 + B y_0 + C z_0}{A^2 + B^2 + C^2}$$</p>";
      algorithm += "<p>Для нахождения координат точки $M(x,y,z)$ подставим найденное значение параметра $t$ в соотношение $(4)$. В результате получим искомые значения координат $x,y,z$ точки $M$ &mdash; проекции точки $M_0$ на плоскость $\\pi$. </p>";
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

    values[0].push([3,-1,1, 2,-1,3,4]);
    values[0].push([4,5,10, 1,1,-1,7]);
    values[1].push([6,-2,-2, 2,3,1,10]);
    values[1].push([7,4,8, 3,1,4,-5]);
    values[1].push([9,0,18, 5,-3,-1,8]);
    values[1].push([4,1,11, 1,-2,3,-7]);
    values[1].push([4,3,6, 1,3,4,-11]);
    values[1].push([13,5,3, 4,2,-3,5]);
    values[1].push([7,0,7, 7,-2,4,-8]);
    values[1].push([-4,9,-9, 2,3,-5,12]);
    values[1].push([1,2,-7, 1,-2,3,10]);
    values[1].push([-3,-9,15, 2,5,-6,11]);
    values[1].push([-8,8,-5, 1,-3,7,8]);
    values[1].push([-6,9,-16, 2,-4,9,-10]);
    values[1].push([-1,-3,11, 3,5,-1,-6]);
    values[1].push([1,3,-2, 3,-1,5,-25]);
    values[2].push([-3,2,1, 2,-3,-1,-15]);
    values[2].push([-2,-1,5, 2,2,3,8]);
    values[2].push([4,-3,-1, 1,-4,-2,3]);
    values[2].push([5,1,2, 3,-2,4,37]);
    values[2].push([0,-4,3, 4,3,-1,-37]);
    values[2].push([3,-2,4, 3,-4,2,33]);
    values[2].push([2,0,-3, 5,2,3,-39]);
    values[2].push([-5,-3,2, 1,-5,-4,40]);
    values[2].push([-7,2,0, 6,1,-2,-1]);
    values[2].push([6,4,-2, 7,4,-3,10]);
    values[2].push([8,3,1, 2,6,-4,-2]);
    values[2].push([1,9,-7, 8,-6,2,8]);
    values[2].push([2,-6,8, 2,-1,9,4]);
    values[2].push([-7,-8,4, 9,7,-6,-23]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '$M_0$: (<span id="M0"></span>)<br>';
    variants += '$\\pi$: <span id="pi"></span><br>';
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
    $("#M0").html([cval[0],cval[1],cval[2]].join(';'));
    $("#pi").html( "$"+linCombText([cval[3],cval[4],cval[5],cval[6]],["x","y","z",""])+"=0$" );
    for (var i = 0; i < 3; i++) {
        m0[i] = cval[i];
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
var m0 = [];
var vecN10 = [];
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5.1, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    primitives.push({class:"point", text: katex.renderToString("M_0"), arr0:m0, rad:5, color:[0.7, 0.0, 0.0, 1.0]});

    var vecN0 = vecN10;
    var D=vecN10[3];

    var pointM0 = [];
    var pointM1 = [];
    var pointM2 = [];
    pointsFromABCD(vecN10, pointM0,pointM1,pointM2);

    var delta = [];
    distToPlane(m0, pointM0,pointM1,pointM2, delta);
    vec3.add(delta,m0);
    if (showSolution) {

        primitives.push({class:"arrow", text: "", arr0:m0, arr1:delta, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
        primitives.push({class:"point", text: katex.renderToString("M"), arr0:delta, rad:5, color:[0.0, 0.0, 0.7, 1.0]});

        $("#ans1").val(parseFloat(delta[0].toFixed(precision1)));
        $("#ans2").val(parseFloat(delta[1].toFixed(precision1)));
        $("#ans3").val(parseFloat(delta[2].toFixed(precision1)));
    }
    var psize = 5;
    var maxp = Math.max(Math.abs(delta[0]),Math.abs(delta[1]),Math.abs(delta[2]));
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
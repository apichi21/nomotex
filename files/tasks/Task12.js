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

    $("Title").html("Задача 12");
    var conditions = "Составить уравнения сторон треугольника  $\\bigtriangleup ABC$, заданного координатами вершин \
      $$A = (x_1, y_1, z_1),$$ \
      $$B = (x_2, y_2, z_2),$$ \
      $$C = (x_3, y_3, z_3)$$ \
      в прямоугольной декартовой системе координат.";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
        var algorithm = "<p>Для решения задачи используем уравнение прямой в пространстве, проходящей через 2 заданные точки. </p>";
        algorithm += "<p>Тогда уравнения сторон будут иметь вид: \
        $$AB: \\:\\:\\: \\frac{x - x_1}{x_2 - x_1} = \\frac{y - y_1}{y_2 - y_1} = \\frac{z - z_1}{z_2 - z_1} $$ \
        $$AC: \\:\\:\\:  \\frac{x - x_1}{x_3 - x_1} = \\frac{y - y_1}{y_3 - y_1} = \\frac{z - z_1}{z_3 - z_1} $$ \
        $$BC: \\:\\:\\:  \\frac{x - x_2}{x_3 - x_2} = \\frac{y - y_2}{y_3 - y_2} = \\frac{z - z_2}{z_3 - z_2}. $$ </p>";
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

    values[0].push([0,1,2, 1,0,1, 3,4,1]);
    values[0].push([1,0,2, -1,3,4, 5,6,7]);
    values[1].push([3,2,-1, 4,5,2, 1,2,3]);
    values[1].push([-3,0,1, 5,6,2, 4,1,3]);
    values[1].push([4,5,1, 1,3,4, 5,2,1]);
    values[1].push([-1,2,-3, 3,4,5, 4,0,5]);
    values[1].push([7,1,8, 9,10,1, 2,0,3]);
    values[1].push([3,2,0, 4,5,1, -1,2,-3]);
    values[1].push([-6,7,0, 0,1,4, 2,3,1]);
    values[1].push([2,2,1, 4,3,1, 4,5,7]);
    values[1].push([8,1,9, 2,2,3, 4,5,3]);
    values[1].push([5,7,8, 2,6,1, 3,4,0]);
    values[1].push([0,4,5, 7,1,8, 1,-2,3]);
    values[1].push([4,0,1, 2,3,5, 6,7,8]);
    values[1].push([6,1,3, 3,1,0, 2,1,1]);
    values[1].push([1,-2,4, 0,2,1, 2,1,3]);
    values[2].push([-3,2,1, 1,0,2, 3,-2,-1]);
    values[2].push([2,3,0, -1,2,3, 5,3,1]);
    values[2].push([-1,2,5, 2,0,3, 1,3,-4]);
    values[2].push([4,0,-2, 3,-1,0, 2,5,3]);
    values[2].push([-5,3,2, 2,4,3, 0,-1,-2]);
    values[2].push([0,3,-1, 2,5,-3, 4,1,0]);
    values[2].push([-2,-2,3, 0,1,-3, 2,3,5]);
    values[2].push([3,-1,2, 2,3,-1, 5,1,1]);
    values[2].push([-1,5,2, 2,0,-1, 3,2,0]);
    values[2].push([4,2,3, -1,1,0, 2,-3,1]);
    values[2].push([3,1,-2, 2,-1,0, 4,-3,1]);
    values[2].push([5,-1,0, 3,2,-2, 2,5,-1]);
    values[2].push([-4,3,1, -1,-2,0, 1,-1,2]);
    values[2].push([-5,2,-1, 1,1,3, 0,3,1]);

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
    $("#variants").html(variants);

    var answer = '';
    answer += '<p><table style="text-align: center">';
    answer += '<tr>';
    answer += '<td>$AB$:</td>';
    answer += '<td>$x_0$</td>';
    answer += '<td><input type="text" id="ans11" size=3></td>';
    answer += '<td>$y_0$</td>';
    answer += '<td><input type="text" id="ans13" size=3></td>';
    answer += '<td>$z_0$</td>';
    answer += '<td><input type="text" id="ans15" size=3></td>';
    answer += '</tr>';
    answer += '<tr>';
    answer += '<td></td>';
    answer += '<td>$m$</td>';
    answer += '<td><input type="text" id="ans12" size=3></td>';
    answer += '<td>$n$</td>';
    answer += '<td><input type="text" id="ans14" size=3></td>';
    answer += '<td>$p$</td>';
    answer += '<td><input type="text" id="ans16" size=3></td>';
    answer += '</tr>';
    answer += '</table></p>';

    answer += '<p><table style="text-align: center">';
    answer += '<tr>';
    answer += '<td>$AC$:</td>';
    answer += '<td>$x_0$</td>';
    answer += '<td><input type="text" id="ans21" size=3></td>';
    answer += '<td>$y_0$</td>';
    answer += '<td><input type="text" id="ans23" size=3></td>';
    answer += '<td>$z_0$</td>';
    answer += '<td><input type="text" id="ans25" size=3></td>';
    answer += '</tr>';
    answer += '<tr>';
    answer += '<td></td>';
    answer += '<td>$m$</td>';
    answer += '<td><input type="text" id="ans22" size=3></td>';
    answer += '<td>$n$</td>';
    answer += '<td><input type="text" id="ans24" size=3></td>';
    answer += '<td>$p$</td>';
    answer += '<td><input type="text" id="ans26" size=3></td>';
    answer += '</tr>';
    answer += '</table></p>';

    answer += '<p><table style="text-align: center">';
    answer += '<tr>';
    answer += '<td>$BC$:</td>';
    answer += '<td>$x_0$</td>';
    answer += '<td><input type="text" id="ans31" size=3></td>';
    answer += '<td>$y_0$</td>';
    answer += '<td><input type="text" id="ans33" size=3></td>';
    answer += '<td>$z_0$</td>';
    answer += '<td><input type="text" id="ans35" size=3></td>';
    answer += '</tr>';
    answer += '<tr>';
    answer += '<td></td>';
    answer += '<td>$m$</td>';
    answer += '<td><input type="text" id="ans32" size=3></td>';
    answer += '<td>$n$</td>';
    answer += '<td><input type="text" id="ans34" size=3></td>';
    answer += '<td>$p$</td>';
    answer += '<td><input type="text" id="ans36" size=3></td>';
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
}
function generateAnsText()
{
    var ansArr = [];
    for (var i = 1; i <= 3; i++) {
        for (var j = 1; j <= 6; j++) {
            ansArr.push(parseFloat($("#ans"+i+''+j).val()).toFixed(precision1));
        }
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
var chosenVariant = 0;
function changeVariant(newVar) {
    var newVarSplit = newVar.split(',');
    chosenVariant = parseInt(newVarSplit[1],10);
    var cval = values[parseInt(newVarSplit[0],10)][chosenVariant];
    $("#A").html([cval[0],cval[1],cval[2]].join(';'));
    $("#B").html([cval[3],cval[4],cval[5]].join(';'));
    $("#C").html([cval[6],cval[7],cval[8]].join(';'));
    for (var i = 0; i < 3; i++) {
        pointA[i] = cval[i];
        pointB[i] = cval[i+3];
        pointC[i] = cval[i+6];
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    initBuffers();
}

var pointA = [];
var pointB = [];
var pointC = [];
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5.1, color:[1.0, 0.0, 1.0, 1.0]});
    }

    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    primitives.push({class:"point", text: katex.renderToString("A"), arr0:pointA, rad:5, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("B"), arr0:pointB, rad:5, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("C"), arr0:pointC, rad:5, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:pointA, arr1:pointB, rad:2, color:[0.4, 0.4, 1.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:pointA, arr1:pointC, rad:2, color:[0.4, 0.4, 1.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:pointB, arr1:pointC, rad:2, color:[0.4, 0.4, 1.0, 1.0]});

    if (showSolution) {
        var p1 = [];
        var p2 = [];
        createLine(pointA,pointB,p1,p2);
        primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:1.5, color:[0.0, 1.0, 0.0, 1.0]});
        var p1 = [];
        var p2 = [];
        createLine(pointA,pointC,p1,p2);
        primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:1.5, color:[0.0, 1.0, 0.0, 1.0]});
        var p1 = [];
        var p2 = [];
        createLine(pointB,pointC,p1,p2);
        primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:1.5, color:[0.0, 1.0, 0.0, 1.0]});

        var x0y0z0;
        var x1y1z1;
        var mnp = [];
        x0y0z0 = pointA;
        x1y1z1 = pointB;
        vec3.subtract(x1y1z1,x0y0z0,mnp);
        $("#ans11").val(x0y0z0[0].toFixed(precision1));
        $("#ans12").val(mnp[0].toFixed(precision1));
        $("#ans13").val(x0y0z0[1].toFixed(precision1));
        $("#ans14").val(mnp[1].toFixed(precision1));
        $("#ans15").val(x0y0z0[2].toFixed(precision1));
        $("#ans16").val(mnp[2].toFixed(precision1));

        x0y0z0 = pointA;
        x1y1z1 = pointC;
        vec3.subtract(x1y1z1,x0y0z0,mnp);
        $("#ans21").val(x0y0z0[0].toFixed(precision1));
        $("#ans22").val(mnp[0].toFixed(precision1));
        $("#ans23").val(x0y0z0[1].toFixed(precision1));
        $("#ans24").val(mnp[1].toFixed(precision1));
        $("#ans25").val(x0y0z0[2].toFixed(precision1));
        $("#ans26").val(mnp[2].toFixed(precision1));

        x0y0z0 = pointB;
        x1y1z1 = pointC;
        vec3.subtract(x1y1z1,x0y0z0,mnp);
        $("#ans31").val(x0y0z0[0].toFixed(precision1));
        $("#ans32").val(mnp[0].toFixed(precision1));
        $("#ans33").val(x0y0z0[1].toFixed(precision1));
        $("#ans34").val(mnp[1].toFixed(precision1));
        $("#ans35").val(x0y0z0[2].toFixed(precision1));
        $("#ans36").val(mnp[2].toFixed(precision1));
    }
}
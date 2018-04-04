var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
}
var C;
var values = [[],[],[]];
var showAlgorithm = false;
var setOfValues = -1;
var mustBeHandedOver = false;
var showSolution = false;
var precision = 3;
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

    $("Title").html("Задача 5");
    var conditions = "Найти координаты единичного вектора $\\vec n_0$, перпендикулярного к плоскости $\\triangle ABC$, построенного на векторах $\\overrightarrow{AB}$ и $\\overrightarrow{AC}$, заданных координатами в базисе $\\vec i\\vec j\\vec k$  $$  \\overrightarrow{AB}=\\left(x_1,y_1,z_1\\right),  \\overrightarrow{AC}=\\left(x_2,y_2,z_2\\right). $$ Ответ дать с точностью до 3-го знака после запятой.";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
        var algorithm = "<p>Так как вектор $\\vec n_0$ перпендикулярен к плоскости $\\triangle ABC$, то $\\vec n_0$ ортогонален к векторам $\\overrightarrow{AB}$ и $\\overrightarrow{AC}$</p>";
        algorithm += "<p>Найдем вектор $\\vec n$, коллинеарный вектору $\\vec n_0$,  $$  \\vec{n}=\\pm \\left[ \\overrightarrow{AB},\\overrightarrow{AC} \\right]=\\pm \\left| \\begin{matrix}     {\\vec{i}} & {\\vec{j}} & {\\vec{k}}  \\\\     {{x}_{1}} & {{y}_{1}} & {{z}_{1}}  \\\\     {{x}_{2}} & {{y}_{2}} & {{z}_{2}}  \\\\  \\end{matrix} \\right|.  $$ <br>  \"$+$\" если $\\vec n,\\overrightarrow{AB},\\overrightarrow{AC}$ &mdash; правая тройка векторов, и \"$-$\", если левая тройка.</p>";
        algorithm += "<p>Раскрываем определитель  $$  \\vec n=\\pm\\left(  \\vec i\\left(y_1 z_2 - y_2 z_1 \\right)+  \\vec j\\left(z_1 x_2 - x_1 z_2 \\right)+  \\vec k\\left(x_1 y_2 - x_2 y_1 \\right)  \\right).  $$</p>";
        algorithm += "<p>Далее вычисляем длину $\\left|\\vec{n}\\right|$  $$  \\left|\\vec{n}\\right|=\\sqrt{\\left(y_1 z_2 - y_2 z_1 \\right)^2+  \\left(z_1 x_2 - x_1 z_2 \\right)^2+  \\left(x_1 y_2 - x_2 y_1 \\right)^2}.  $$</p>";
        algorithm += "<p>Единичный вектор $\\vec n_0$ получаем после деления вектора $\\vec n$ на его длину $\\left|\\vec{n}\\right|$:  $$  \\vec n_0 =\\frac{\\vec{n}}{\\left|\\vec{n}\\right|}.  $$</p>";
        algorithm += "<p>В итоге координаты вектора $\\vec n_0$ в базисе $\\vec i\\vec j\\vec k$ имеют вид:  \\begin{align*}  n_1 &= \\pm\\left(y_1 z_2 - y_2 z_1 \\right)\\frac{1}{\\left|\\vec{n}\\right|}\\\\  n_2 &= \\pm\\left(z_1 x_2 - x_1 z_2 \\right)\\frac{1}{\\left|\\vec{n}\\right|}\\\\  n_3 &= \\pm\\left(x_1 y_2 - x_2 y_1 \\right)\\frac{1}{\\left|\\vec{n}\\right|}\\\\  \\end{align*}</p>";
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

    values[0].push([-3, 2, 2, -5, 2, 0]);
    values[0].push([0, -1, 0, -2, -1, -1]);
    values[1].push([-6, -4, 3, 4, 3, -1]);
    values[1].push([3, 3, 3, -3, 4, 0]);
    values[1].push([1, -3, -3, 5, 1, -3]);
    values[1].push([-3, 5, 6, 2, 5, 1]);
    values[1].push([2, 1, -8, 2, 2, -2]);
    values[1].push([6, 2, 1, 1, 1, 0]);
    values[1].push([1, 1, 4, 0, 1, 1]);
    values[1].push([-1, -1, 1, -6, -1, -1]);
    values[1].push([-2, -1, 3, -1, 0, 3]);
    values[1].push([1, -2, 4, 2, 0, 3]);
    values[1].push([-3, -4, -7, -4, -1, -5]);
    values[1].push([-1, 4, 2, -2, 3, 1]);
    values[1].push([-4, 0, 3, -2, 1, 0]);
    values[1].push([1, 1, 1, 1, -1, -1]);
    values[2].push([2, 3, -5, -1, 0, 1]);
    values[2].push([3, 0, 1, 1, 1, 3]);
    values[2].push([-2, -1, -1, 5, 0, 1]);
    values[2].push([-3, 4, 2, 2, 0, -1]);
    values[2].push([2, 3, 1, 1, 2, 3]);
    values[2].push([0, 1, -2, 1, 1, 3]);
    values[2].push([4, 3, 2, 0, 1, 2]);
    values[2].push([5, 3, 1, 1, 0, 1]);
    values[2].push([-3, 2, 1, -1, -2, -8]);
    values[2].push([4, 1, 0, 3, 2, 1]);
    values[2].push([2, 0, -1, 4, 3, -5]);
    values[2].push([1, 5, -1, 1, 1, -5]);
    values[2].push([0, 2, -1, 1, 1, 3]);
    values[2].push([4, 3, -1, -2, 3, 5]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '$\\overrightarrow{AB}$: (<span id="vecAB"></span>)<br>';
    variants += '$\\overrightarrow{AC}$: (<span id="vecAC"></span>)<br>';
    $("#variants").html(variants);

    var answer = '';
    answer += '<table style="text-align: center">';
    answer += '<tr>';
    answer += '<td>$n_1$</td>';
    answer += '<td>$n_2$</td>';
    answer += '<td>$n_3$</td>';
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
        for (var i = 0; i < 14; i++) {
            if (i!=0) {
                $("#filetext").append(";");
            }
            changeVariant(setOfValues+","+i);
            var ansArr = [];
            ansArr.push(parseFloat($("#ans1").val()));
            ansArr.push(parseFloat($("#ans2").val()));
            ansArr.push(parseFloat($("#ans3").val()));
            unifyAswer(ansArr);
            var ansText = ansArr[0].toFixed(precision)+","+ansArr[1].toFixed(precision)+","+ansArr[2].toFixed(precision);
            $("#filetext").append(ansText);
        }
    }
}
function handOver() {
    if (!example_id) {alert("Ошибка! Не получен идентификатор задачи.");return;}
    var ansArr = [];
    ansArr.push(parseFloat($("#ans1").val()));
    ansArr.push(parseFloat($("#ans2").val()));
    ansArr.push(parseFloat($("#ans3").val()));
    unifyAswer(ansArr);
    var ansText = ansArr[0].toFixed(precision)+","+ansArr[1].toFixed(precision)+","+ansArr[2].toFixed(precision);
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
    for (var i = 0; i <= 1; i++) {
        vec3.set([cval[i*3],cval[i*3+1],cval[i*3+2]], points[i+1].coord1);
    }
    $("#vecAB").html([cval[0],cval[1],cval[2]].join(';'));
    $("#vecAC").html([cval[3],cval[4],cval[5]].join(';'));
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    initBuffers();
}
function unifyAswer(a) {
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
var ans = [];
function initData() {
    var arrRad = 2;
    var arrRad1 = 1;
    var lineRad = 1;
    var chosenPointRad = 5;

    primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:points[1].coord1, rad:arrRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:points[2].coord1, rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"text", text: "A", arr0:points[0].coord1});
    primitives.push({class:"text", text: "B", arr0:points[1].coord1});
    primitives.push({class:"text", text: "C", arr0:points[2].coord1});

    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});

    if (showSolution) {
        var norm = [];
        vec3.cross(points[1].coord1,points[2].coord1,norm);
        vec3.normalize(norm);
        primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:norm, rad:arrRad, color:[0.0, 0.0, 1.0, 1.0]});
        primitives.push({class:"text", text: katex.renderToString("\\vec n_0"), arr0:norm});

        unifyAswer(norm);
        $("#ans1").val(norm[0].toFixed(precision));
        $("#ans2").val(norm[1].toFixed(precision));
        $("#ans3").val(norm[2].toFixed(precision));
        var planePoints = [[],[],[],[]];
        createPlane(points[0].coord1,points[1].coord1,points[2].coord1,planePoints[0],planePoints[1],planePoints[2],planePoints[3],8);
        primitives.push({class:"plane", text: "", arr0:planePoints[0], arr1:planePoints[1], arr2:planePoints[2], arr3:planePoints[3], color:[0.0, 0.0, 1.0, 0.15]});
    }

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]});
    }
}
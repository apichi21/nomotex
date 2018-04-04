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

    $("Title").html("Задача 11");
    var conditions = "Составить уравнение плоскости в прямоугольной декартовой системе координат, проходящей через точку  $M_0 = (x_0, y_0, z_0)$ перпендикулярно пересекающимся плоскостям $\\pi_1$ и $\\pi_2$, заданным в той же системе координат следующим образом:  \
      $$\\pi_1: \\:\\:\\: A_1 x + B_1 y + C_1 z + D_1 = 0$$  \
      $$\\pi_2: \\:\\:\\: A_2 x + B_2 y + C_2 z + D_2 = 0$$";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
        var algorithm = "<p>Запишем вектор нормали $\\vec{n_1}$ к плоскости $\\pi_1$: \
      $$\\vec{n_1} = \\{A_1, B_1, C_1\\}$$ и вектор нормали $\\vec{n_2}$ к плоскости $\\pi_2$: \
      $$\\vec{n_2} = \\{A_2, B_2, C_2\\}$$ </p>";
      algorithm += "<p>Вычислим векторное произведение этих векторов $\\vec{n_1}$ и $\\vec{n_2}$ &mdash; вектор $\\vec{n}$: \
      $$\\vec{n} = \[\\vec{n_1},\\vec{n_2}\]=\\begin{vmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ A_1 & B_1 & C_1 \\\\ A_2 & B_2 & C_2\\end{vmatrix} = \\alpha \\vec{i} + \\beta \\vec{j} + \\gamma \\vec{k},$$ \
      где $\\alpha = B_1 C_2 - B_2 C_1$, $\\beta = A_2 C_1 - A_1 C_2$, $\\gamma = A_1 B_2 - A_2 B_1$.</p>";
      algorithm += "<p>Полученный вектор $\\vec{n}$ перпендикулярен векторам $\\vec{n_1}$ и $\\vec{n_2}$, которые принадлежат искомой плоскости $\\pi$, и, следовательно, является нормальным вектором к этой плоскости $\\pi$. </p>";
      algorithm += "<p>Выбирая произвольную точку $M = (x, y, z)$ на этой плоскости  $\\pi$, составим вектор $$\\overrightarrow{M_0 M} = \\{x-x_0, y-y_0, z-z_0\\}.$$</p>";
      algorithm += "<p>Запишем условия ортогональности векторов $\\overrightarrow{M_0 M}$ и $\\vec{n}$: \
      $$(\\vec{n},\\overrightarrow{M_0 M})=0$$</p>";
      algorithm += "<p>Вычисляя это скалярное произведение, находим \
      $$(\\vec{n},\\overrightarrow{M_0 M})=\\alpha (x-x_0) + \\beta (y-y_0) + \\gamma (z-z_0) = 0$$</p>";
      algorithm += "<p>Раскрывая скобки, находим общее уравнение искомой плоскости $\\pi$: \
      $$\\alpha x + \\beta y + \\gamma z - (\\alpha x_0 + \\beta y_0 + \\gamma z_0) = 0.$$ </p>";
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

    values[0].push([1,1,2, 1,-2,3,5, 2,1,-3,4]);
    values[0].push([1,2,3, 2,-3,4,7, 1,4,-7,5]);
    values[1].push([2,4,3, 3,4,-7,8, 1,2,3,-7]);
    values[1].push([2,1,-1, 1,-2,4,8, 1,-3,-4,5]);
    values[1].push([3,2,1, 3,-1,1,8, 2,-3,2,-7]);
    values[1].push([-2,0,1, 2,-7,1,-10, 1,0,3,8]);
    values[1].push([1,0,-1, 1,-2,-1,1, 2,1,-1,-5]);
    values[1].push([5,1,7, 4,-3,1,-1, 1,-1,2,-7]);
    values[1].push([2,4,8, 2,7,5,1, 3,1,-7,5]);
    values[1].push([1,1,0, 3,-2,5,8, 1,-2,4,5]);
    values[1].push([2,7,3, 4,-3,-1,-7, 1,-3,-3,0]);
    values[1].push([3,4,1, 2,-1,3,4, 1,2,1,-7]);
    values[1].push([2,1,0, 1,1,1,-1, 2,-1,2,5]);
    values[1].push([1,5,7, 1,-1,-1,1, 1,-3,4,-7]);
    values[1].push([2,3,1, 2,-3,4,5, 2,3,4,-11]);
    values[1].push([1,-1,2, 2,1,-3,2, 1,-3,6,-1]);
    values[2].push([-1,0,-2, 3,-2,1,-1, 4,1,-2,-3]);
    values[2].push([2,1,-3, 1,3,-1,-3, 0,1,5,1]);
    values[2].push([0,2,3, 1,0,-4,3, 2,-1,-3,-1]);
    values[2].push([2,-4,0, 2,3,0,9, 4,-1,-1,2]);
    values[2].push([-3,1,-1, 0,1,-2,2, 1,-5,1,2]);
    values[2].push([-2,1,3, 1,2,0,-5, 3,5,-1,-1]);
    values[2].push([4,-1,2, 1,2,-5,0, 2,0,1,-3]);
    values[2].push([-5,-2,0, 4,2,0,-7, 1,-1,3,-1]);
    values[2].push([-3,0,-2, 2,-1,-1,3, 1,0,5,2]);
    values[2].push([3,0,2, 7,-1,1,-2, 2,0,1,-1]);
    values[2].push([2,-1,0, 1,-7,1,-5, 1,3,-1,5]);
    values[2].push([1,-1,-1, 2,1,-7,3, 0,1,-4,-1]);
    values[2].push([-1,2,1, 5,1,-1,-2, 1,-2,1,1]);
    values[2].push([1,-1,-2, 1,-3,2,-3, 2,1,-1,2]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '$M_0$: (<span id="M0"></span>)<br>';
    variants += '$\\pi_1$: <span id="pi1"></span><br>';
    variants += '$\\pi_2$: <span id="pi2"></span><br>';
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
    $("#M0").html([cval[0],cval[1],cval[2]].join(';'));
    $("#pi1").html( "$"+linCombText([cval[3],cval[4],cval[5],cval[6]],["x","y","z",""])+"=0$" );
    $("#pi2").html( "$"+linCombText([cval[7],cval[8],cval[9],cval[10]],["x","y","z",""])+"=0$" );
    for (var i = 0; i < 3; i++) {
        m0[i] = cval[i];
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
var m0 = [];
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

    primitives.push({class:"point", text: katex.renderToString("M_0"), arr0:m0, rad:5, color:[0.0, 0.7, 0.0, 1.0]});
    var vecN0 = vecN10;
    var D=vecN10[3];

    var pointM0 = [0,0,0];

    var vecM0M1 = [];
    var pointM1 = [];
    var pointM2 = [];
    if (Math.abs(vecN0[0])>=Math.abs(vecN0[1]) && Math.abs(vecN0[0])>=Math.abs(vecN0[2])) {
        pointM0[0] = -D/vecN0[0];
        vec3.set([pointM0[0]-(vecN0[1]+vecN0[2])/vecN0[0], pointM0[1]+1, pointM0[2]+1],pointM1);
    } else if (Math.abs(vecN0[1])>=Math.abs(vecN0[0]) && Math.abs(vecN0[1])>=Math.abs(vecN0[2])) {
        pointM0[1] = -D/vecN0[1];
        vec3.set([pointM0[0]+1, pointM0[1]-(vecN0[0]+vecN0[2])/vecN0[1], pointM0[2]+1],pointM1);
    } else {
        pointM0[2] = -D/vecN0[2];
        vec3.set([pointM0[0]+1, pointM0[1]+1, pointM0[2]-(vecN0[0]+vecN0[1])/vecN0[2]],pointM1);
    }
    vec3.subtract(pointM1,pointM0,vecM0M1);
    vec3.cross(vecN0,vecM0M1,pointM2);
    vec3.add(pointM2,pointM0);

    var planepoint11 = [];
    var planepoint21 = [];
    var planepoint31 = [];
    var planepoint41 = [];
    createPlane(pointM0,pointM1,pointM2,planepoint11,planepoint21,planepoint31,planepoint41);

    var center = [];
    vec3.add(planepoint11,planepoint31,center);
    vec3.scale(center,0.5);
    var vecN1 = [];
    vec3.add(vecN0,center,vecN1);
    primitives.push({class:"point", text: "", arr0:center, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec n_1"), arr0:center, arr1:vecN1, rad:2, color:[0.0, 0.0, 1.0, 1.0]});

    var vecN0 = vecN20;
    var D=vecN20[3];
    var pointM0 = [0,0,0];

    var vecM0M1 = [];
    var pointM1 = [];
    var pointM2 = [];
    if (Math.abs(vecN0[0])>=Math.abs(vecN0[1]) && Math.abs(vecN0[0])>=Math.abs(vecN0[2])) {
        pointM0[0] = -D/vecN0[0];
        vec3.set([pointM0[0]-(vecN0[1]+vecN0[2])/vecN0[0], pointM0[1]+1, pointM0[2]+1],pointM1);
    } else if (Math.abs(vecN0[1])>=Math.abs(vecN0[0]) && Math.abs(vecN0[1])>=Math.abs(vecN0[2])) {
        pointM0[1] = -D/vecN0[1];
        vec3.set([pointM0[0]+1, pointM0[1]-(vecN0[0]+vecN0[2])/vecN0[1], pointM0[2]+1],pointM1);
    } else {
        pointM0[2] = -D/vecN0[2];
        vec3.set([pointM0[0]+1, pointM0[1]+1, pointM0[2]-(vecN0[0]+vecN0[1])/vecN0[2]],pointM1);
    }
    vec3.subtract(pointM1,pointM0,vecM0M1);
    vec3.cross(vecN0,vecM0M1,pointM2);
    vec3.add(pointM2,pointM0);

    var planepoint12 = [];
    var planepoint22 = [];
    var planepoint32 = [];
    var planepoint42 = [];
    createPlane(pointM0,pointM1,pointM2,planepoint12,planepoint22,planepoint32,planepoint42);

    var center = [];
    vec3.add(planepoint12,planepoint32,center);
    vec3.scale(center,0.5);
    var vecN2 = [];
    vec3.add(vecN0,center,vecN2);
    primitives.push({class:"point", text: "", arr0:center, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec n_2"), arr0:center, arr1:vecN2, rad:2, color:[1.0, 0.0, 0.0, 1.0]});


    if (showSolution) {
        var vecNans = [];
        vec3.cross(vecN10,vecN20,vecNans);
        vecNans[3] = -(vecNans[0]*m0[0]+vecNans[1]*m0[1]+vecNans[2]*m0[2]);
        unifyAswer(vecNans);
        $("#ans1").val(vecNans[0].toFixed(precision1));
        $("#ans2").val(vecNans[1].toFixed(precision1));
        $("#ans3").val(vecNans[2].toFixed(precision1));
        $("#ans4").val(vecNans[3].toFixed(precision1));

        var pointM0 = m0;
        var pointM1 = [];
        var pointM2 = [];
        vec3.add(pointM0,vecN10, pointM1);
        vec3.add(pointM0,vecN20, pointM2);
        var planepoint1ans = [];
        var planepoint2ans = [];
        var planepoint3ans = [];
        var planepoint4ans = [];
        createPlane(pointM0,pointM1,pointM2,planepoint1ans,planepoint2ans,planepoint3ans,planepoint4ans);
        primitives.push({class:"plane", text: "", arr0:planepoint1ans, arr1:planepoint2ans, arr2:planepoint3ans, arr3:planepoint4ans, color:[0.5, 1.0, 0.5, 0.45]});
    }
    primitives.push({class:"plane", text: katex.renderToString("\\pi_2"), arr0:planepoint12, arr1:planepoint22, arr2:planepoint32, arr3:planepoint42, color:[1.0, 0.5, 0.5, 0.35]});
    primitives.push({class:"plane", text: katex.renderToString("\\pi_1"), arr0:planepoint11, arr1:planepoint21, arr2:planepoint31, arr3:planepoint41, color:[0.5, 0.5, 1.0, 0.35]});
}
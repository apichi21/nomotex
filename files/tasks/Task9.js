var dimention="3d";
function initPoints() {
    points = [];
}
var values = [[],[],[]];
var showAlgorithm = false;
var setOfValues = -1;
var mustBeHandedOver = false;
var showSolution = false;
var precision1 = 5;
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

    $("Title").html("Задача 9");

    var conditions = "Найти косинус острого угла между плоскостями  $\\pi_1$ и $\\pi_2$, заданными в прямоугольной декартовой системе координат следующим образом: $$\\pi_1:   A_1 x + B_1 y + C_1 z + D_1 = 0  $$ \
      $$\\pi_2:   A_2 x + B_2 y + C_2 z + D_2 = 0  $$ \
      где $A_i, B_i, C_i, D_i$ - некоторые вещественные числа, $i = 1,2$.<br> Ответ дать с точностью до 5-го знака после запятой.";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
      var algorithm = "<p>Для нахождения угла $\\varphi$ между двумя плоскостями используем формулу \
      $$\\cos\\varphi = \\frac{(\\vec{n_1},\\vec{n_2})}{|\\vec{n_1}||\\vec{n_2}|}$$ \
      где $\\vec{n_1}$ и $\\vec{n_2}$ - векторы нормали к плоскостям $\\pi_1$ и $\\pi_2$.</p>";
      algorithm += "<p>В прямоугольной декартовой системе координат, в которой заданы плоскости $\\pi_1$ и $\\pi_2$, эти векторы заданы следующим образом:\
      $$ \\vec{n_1} = \\{A_1, B_1, C_1\\} $$\
      $$ \\vec{n_2} = \\{A_2, B_2, C_2\\} $$</p>";
      algorithm += "<p>Тогда косинус угла $\\varphi$ равен \
      $$ \\cos\\varphi = \\frac{A_1 A_2 + B_1 B_2 + C_1 C_2}{\\sqrt{A_1^2 + B_1^2 + C_1^2}\\sqrt{A_2^2 + B_2^2 + C_2^2}} $$ </p>";
      algorithm += "<p>Так как по условию задачи требуется найти острый угол $(\\varphi \\in [0, \\frac{\\pi}{2}])$, то $\\cos{\\varphi} > 0$. Если найденное значение $\\cos{\\varphi} < 0$, то это означает, что найден косинус тупого угла между плоскостями.</p>";
      algorithm += "<p>Для нахождения косинуса острого угла используем формулу \
      $$\\cos{(\\pi - \\varphi)} = -\\cos{\\varphi}$$ \
      где $\\cos{(\\pi - \\varphi)}$ &mdash; искомый косинус острого угла между плоскостями $\\pi_1$ и $\\pi_2$.</p>";
      algorithm += "<p> <b> Замечание.</b> <br> \
      У каждой плоскости существует два варианта направления вектора нормали, отличающиеся знаком. Поэтому при вычислении угла между плоскостями $\\pi_1$ и $\\pi_2$ возможны 2 варианта: когда угол между нормалями $\\vec{n_1}$ и $\\vec{n_2}$ является острым $(0 \\le \\varphi \\le \\frac{\\pi}{2})$ и совпадает с углом между плоскостями, и тупым $(\\frac{\\pi}{2} \\le \\varphi \\le \\pi)$, и отличается от угла между плоскостями следующим образом: $(\\pi - \\varphi)$ </p>";
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

    values[0].push([4,0,-2,-1, 3,-3,5,0]);
    values[0].push([2,-4,6,2, 5,2,-6,-5]);
    values[1].push([2,-4,-5,-3, 3,-1,4,-7]);
    values[1].push([2,5,0,4, 3,2,4,-1]);
    values[1].push([4,-2,-3,1, 3,-4,3,0]);
    values[1].push([4,-1,2,5, 3,2,7,-1]);
    values[1].push([2,0,-6,13, 0,3,-2,11]);
    values[1].push([2,-1,1,1, 5,-1,-5,2]);
    values[1].push([3,0,-4,2, 0,4,-3,-7]);
    values[1].push([4,2,-5,3, 1,-3,-2,-2]);
    values[1].push([1,0,-2,5, 1,8,-5,-3]);
    values[1].push([3,-4,1,-1, 1,2,-1,4]);
    values[1].push([2,5,1,0, 1,4,2,-1]);
    values[1].push([7,-1,2,3, 7,1,4,2]);
    values[1].push([1,2,-1,4, 0,1,0,-4]);
    values[1].push([0,3,5,4, 2,-1,1,-1]);
    values[2].push([2,5,0,8, 1,-2,7,-2]);
    values[2].push([1,-2,-1,3, 2,2,1,-5]);
    values[2].push([5,1,3,-3, 0,2,-4,1]);
    values[2].push([6,-2,1,2, 1,0,-7,5]);
    values[2].push([2,3,-1,5, 0,5,1,-1]);
    values[2].push([7,0,-1,8, 1,9,-1,2]);
    values[2].push([5,-2,3,-4, 0,3,4,-2]);
    values[2].push([6,4,-1,-3, 1,-1,0,8]);
    values[2].push([9,3,1,-1, 1,-2,0,9]);
    values[2].push([3,-2,1,-2, 1,-3,0,8]);
    values[2].push([0,3,-5,4, 2,-1,1,3]);
    values[2].push([7,-4,0,-3, 1,3,-5,8]);
    values[2].push([3,-7,1,5, 0,1,-8,-9]);
    values[2].push([8,4,0,-9, 1,0,-9,7]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '$\\pi_1$: <span id="pi1"></span><br>';
    variants += '$\\pi_2$: <span id="pi2"></span><br>';
    $("#variants").html(variants);

    var answer = '$\\cos\\varphi$ = <input type="text" id="ans1" size=7>';
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
    $("#pi1").html( "$"+linCombText([cval[0],cval[1],cval[2],cval[3]],["x","y","z",""])+"=0$" );
    $("#pi2").html( "$"+linCombText([cval[4],cval[5],cval[6],cval[7]],["x","y","z",""])+"=0$" );
    for (var i = 0; i < 4; i++) {
        vecN10[i] = cval[i];
        vecN20[i] = cval[i+4];
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    initBuffers();
}
var vecN10 = [];
var vecN20 = [];
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

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

    var center1 = [];
    vec3.add(planepoint11,planepoint31,center1);
    vec3.scale(center1,0.5);
    var vecN1 = [];
    vec3.add(vecN0,center1,vecN1);
    primitives.push({class:"point", text: "", arr0:center1, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec N_1"), arr0:center1, arr1:vecN1, rad:2, color:[0.0, 0.0, 1.0, 1.0]});

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
    primitives.push({class:"arrow", text: katex.renderToString("\\vec N_2"), arr0:center, arr1:vecN2, rad:2, color:[1.0, 0.0, 0.0, 1.0]});


    if (showSolution) {
        var leftPoint = [];
        var rightPoint = [];
        createLine(center1,vecN1,leftPoint,rightPoint);
        primitives.push({class:"line", text: "", arr0:leftPoint, arr1:rightPoint, rad:1, color:[0.0, 0.0, 0.8, 1.0]});

        var leftPoint = [];
        var rightPoint = [];
        createLine(center,vecN2,leftPoint,rightPoint);
        primitives.push({class:"line", text: "", arr0:leftPoint, arr1:rightPoint, rad:1, color:[0.8, 0.0, 0.0, 1.0]});
        var cosphi = Math.abs(vecN10[0]*vecN20[0]+vecN10[1]*vecN20[1]+vecN10[2]*vecN20[2]) / Math.sqrt(vecN10[0]*vecN10[0]+vecN10[1]*vecN10[1]+vecN10[2]*vecN10[2]) / Math.sqrt(vecN20[0]*vecN20[0]+vecN20[1]*vecN20[1]+vecN20[2]*vecN20[2]);
        var cosphi1 = (vecN10[0]*vecN20[0]+vecN10[1]*vecN20[1]+vecN10[2]*vecN20[2]) / Math.sqrt(vecN10[0]*vecN10[0]+vecN10[1]*vecN10[1]+vecN10[2]*vecN10[2]) / Math.sqrt(vecN20[0]*vecN20[0]+vecN20[1]*vecN20[1]+vecN20[2]*vecN20[2]);
        $("#ans1").val(cosphi.toFixed(precision1));
        if (cosphi==cosphi1) {
            primitives.push({class:"arc", text: katex.renderToString("\\varphi"), arr0:[0,0,0], arr1:vecN1, arr2:vecN2, Rad:2, rad:3, color:[0.0, 1.0, 0.0, 1.0]});
        } else {
            primitives.push({class:"arc", text: katex.renderToString("\\varphi"), arr0:[0,0,0], arr1:vecN1, arr2:[-vecN2[0],-vecN2[1],-vecN2[2]], Rad:2, rad:3, color:[0.0, 1.0, 0.0, 1.0]});
        }
    }
    primitives.push({class:"plane", text: katex.renderToString("\\pi_2"), arr0:planepoint12, arr1:planepoint22, arr2:planepoint32, arr3:planepoint42, color:[1.0, 0.5, 0.5, 0.35]});
    primitives.push({class:"plane", text: katex.renderToString("\\pi_1"), arr0:planepoint11, arr1:planepoint21, arr2:planepoint31, arr3:planepoint41, color:[0.5, 0.5, 1.0, 0.35]});
}
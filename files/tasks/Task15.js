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

    $("Title").html("Задача 15");

    var conditions = "Найти синус угла между прямой $l$ и плоскостью $\\pi$, заданными в некоторой прямоугольной декартовой системе координат в виде: \
      $$ l: \\:\\:\\: \\frac{x - x_0}{l} = \\frac{y - y_0}{m} = \\frac{z-z_0}{n}$$ \
      (каноническое уравнение кривой) и \
      $$ \\pi: \\:\\:\\: Ax + By + Cz + D = 0 $$ \
      (общее уравнение плосткости). <br> \
      Ответ дать с точностью до 5-го знака после запятой.";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
        var algorithm = "<p>Вектор нормали $\\vec{n}$ к плоскости $\\pi$ имеет следующие координаты: \
        $$\\vec{n}=\\{A,B,C\\}$$ </p>";
        algorithm += "<p>Направляющий вектор $\\vec{q}$ прямой $l$ имеет также координаты $$\\vec{s} = \\{l,m,n\\}$$</p>";
        algorithm += "<p>Обозначим через $\\varphi$ &mdash;  угол между прямой $l$ и плоскостью $\\pi$, а через $\\psi$ &mdash;  угол между векторами $\\vec{n}$ и  $\\vec{s}$. </p>";
        algorithm += "<p>Известно, что эти углы связаны соотношением $\\varphi=\\frac{\\pi}{2}\\pm\\psi$, поэтому $$\\begin{split}\\sin\\varphi  = \\frac{\\left|\\left( \\vec s,\\vec n \\right)\\right|}{\\left| \\vec s \\right| \\cdot \\left| \\vec n \\right|}  \
    = \\frac{\\left|Al+Bm+Cn\\right|}{\\sqrt{A^2+B^2+C^2} \\cdot \\sqrt{l^2+m^2+n^2}}\\end{split}$$</p>";
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

    values[0].push([-3,2, 5,0, -1,-6, 0,3,-2,30]);
    values[0].push([5,5, -1,-1, 0,-5, 2,-1,1,9]);
    values[1].push([3,3, 5,0, -1,-4, 0,4,-3,8]);
    values[1].push([0,3, 7,-4, 1,1, 1,2,-1,4]);
    values[1].push([-3,2, 0,5, 4,1, 1,4,2,6]);
    values[1].push([4,2, -7,2, 0,1, 2,2,-1,13]);
    values[1].push([-1,4, 1,0, 0,-2, 3,-3,-5,1]);
    values[1].push([-5,1, -7,-2, 1,2, 1,2,2,0]);
    values[1].push([1,2, 1,1, 5,-2, 12,-3,-4,11]);
    values[1].push([0,3, -1,4, 2,12, 2,-1,1,-11]);
    values[1].push([-1,12, 3,4, 0,3, 4,-3,12,-7]);
    values[1].push([3,3, 0,4, -8,5, 4,12,-3,1]);
    values[1].push([5,-4, -7,12, -2,3, 3,4,-1,-2]);
    values[1].push([-4,5, -2,3, -3,4, 5,-3,4,-1]);
    values[1].push([-2,12, -1,4, 1,3, 2,-2,1,-9]);
    values[1].push([2,-3, 0,5, 3,2, 2,3,-1,1]);
    values[2].push([1,5, -7,-4, -2,3, 1,-2,2,7]);
    values[2].push([-6,4, 8,2, -1,-7, 3,-5,0,8]);
    values[2].push([0,3, -5,-12, 0,4, 1,6,1,3]);
    values[2].push([-7,0, -3,1, -3,2, 3,0,-4,9]);
    values[2].push([-2,-5, 0,2, 4,0, 1,-2,-2,4]);
    values[2].push([-6,2, 2,3, 1,-1, 8,4,1,-3]);
    values[2].push([9,-1, -4,2, 0,8, 1,3,-4,7]);
    values[2].push([3,7, 8,0, -6,4, 0,6,8,5]);
    values[2].push([-1,3, 0,-2, 7,9, 4,0,-3,6]);
    values[2].push([-5,-2, -3,-3, 0,4, 6,-3,0,7]);
    values[2].push([4,6, -1,-1, 2,3, 2,5,-1,11]);
    values[2].push([-7,4, 6,-1, -9,0, 3,-2,6,-1]);
    values[2].push([6,-2, 1,0, 0,1, 2,-6,-3,5]);
    values[2].push([8,3, -5,2, 7,-1, 6,-2,3,-4]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '$l$: <span id="l"></span><br>';
    variants += '$\\pi$: <span id="pi"></span><br>';
    $("#variants").html(variants);

    var answer = '$\\sin\\varphi$ = <input type="text" id="ans1" size=7>';
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
    var ansText = generateAnsText()
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
    // $("#pi1").html( "$"+linCombText([1,2,3,1],["\\vec m","n","\\vec k",""])+"=0$" );
    $("#l").html( "$\\frac{"+linCombText([1,cval[0]],["x",""])+"}{"+cval[1]+"}=\\frac{"+linCombText([1,cval[2]],["y",""])+"}{"+cval[3]+"}=\\frac{"+linCombText([1,cval[4]],["z",""])+"}{"+cval[5]+"}$" );
    $("#pi").html( "$"+linCombText([cval[6],cval[7],cval[8],cval[9]],["x","y","z",""])+"=0$" );
    m0[0] = -cval[0];
    m0[1] = -cval[2];
    m0[2] = -cval[4];
    v[0] = cval[1];
    v[1] = cval[3];
    v[2] = cval[5];
    for (var i = 0; i < 4; i++) {
        vecN10[i] = cval[i+6];
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
var vecN10 = [];
var m0 = [];
var v = [];
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});
    var m1 = [];
    vec3.add(m0,v,m1);
    var leftPoint = [];
    var rightPoint = [];
    createLine(m0,m1,leftPoint,rightPoint,10);
    primitives.push({class:"line", text: katex.renderToString("l"), arr0:leftPoint, arr1:rightPoint, rad:2, color:[0.0, 1.0, 0.0, 1.0]});


    var pointM0 = [];
    var pointM1 = [];
    var pointM2 = [];
    pointsFromABCD(vecN10, pointM0,pointM1,pointM2);

    var planepoint11 = [];
    var planepoint21 = [];
    var planepoint31 = [];
    var planepoint41 = [];
    createPlane(pointM0,pointM1,pointM2,planepoint11,planepoint21,planepoint31,planepoint41,10);

    var center1 = [];
    vec3.add(planepoint11,planepoint31,center1);
    vec3.scale(center1,0.5);
    var vecN1 = [];
    vec3.add(vecN10,center1,vecN1);


    primitives.push({class:"point", text: "", arr0:center1, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec n"), arr0:center1, arr1:vecN1, rad:2, color:[0.0, 0.0, 1.0, 1.0]});

    if (showSolution) {
        var pm1 = [];
        vec3.add(center1,v,pm1);
        primitives.push({class:"arrow", text: katex.renderToString("\\vec s"), arr0:center1, arr1:pm1, rad:2, color:[0.0, 0.7, 0.0, 1.0]});
        var v1 = [];
        var v2 = [];

        vec3.cross(vecN10,v,v1);
        vec3.cross(v1,vecN10,v2);
        vec3.normalize(v2);
        vec3.scale(v2,2.5);
        vec3.add(v2,center1);

        primitives.push({class:"dashline", text: "", arr0:center1, arr1:v2, rad:2, color:[1.0, 0.0, 0.0, 1.0]});

        primitives.push({class:"arc", text: katex.renderToString("\\varphi"), arr0:center1, arr1:v2, arr2:pm1, Rad:2.5, rad:3, color:[0.0, 1.0, 0.0, 1.0]});

        var sinphi = Math.abs(vecN10[0]*v[0]+vecN10[1]*v[1]+vecN10[2]*v[2]) / Math.sqrt(vecN10[0]*vecN10[0]+vecN10[1]*vecN10[1]+vecN10[2]*vecN10[2]) / Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2]);
        $("#ans1").val(sinphi.toFixed(precision1));
    }
    primitives.push({class:"plane", text: katex.renderToString("\\pi"), arr0:planepoint11, arr1:planepoint21, arr2:planepoint31, arr3:planepoint41, color:[0.5, 0.5, 1.0, 0.35]});
}
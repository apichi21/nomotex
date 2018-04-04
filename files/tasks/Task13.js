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

    $("Title").html("Задача 13");
    var conditions = "Привести к каноническому виду общие уравнения прямой $l$, заданной в прямоугольной декартовой системе координат в виде \
      \\begin{equation} l: \\:\\:\\: \\begin{cases} A_1 x + B_1 y + C_1 z + D_1 = 0 \\\\  A_2 x + B_2 y + C_2 z + D_2 = 0 \\end{cases} \\end{equation} Ответ дать с точностью до 2-го знака после запятой.";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
        var algorithm = "<p>Найдем напрявляющий вектор $\\vec{q}$ прямой $l$ как векторное произведение нормальных векторов \
        $\\vec{n_1} = \\{A_1, B_1, C_1\\}$ и $\\vec{n_2} = \\{A_2, B_2, C_2\\}$ к плоскостям, входящим в общее уравнение прямой $l$: \
        $$\\vec{q} = \[\\vec{n_1},\\vec{n_2}\]=\\begin{vmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ A_1 & B_1 & C_1 \\\\ A_2 & B_2 & C_2\\end{vmatrix} = \\alpha \\vec{i} + \\beta \\vec{j} + \\gamma \\vec{k},$$ \
        где $\\alpha = B_1 C_2 - B_2 C_1$, $\\beta = A_2 C_1 - A_1 C_2$, $\\gamma = A_1 B_2 - A_2 B_1$.</p>";
        algorithm += "<p> Найдем координаты точки $M_0 = (x_0, y_0, z_0)$, принадлежащей прямой $l$, решая систему (1), принимая значение $z_0 = 0$ (или $y_0 = 0$ или $x_0 = 0$), тогда имеем \
        $$\\begin{cases} A_1 x_0 + B_1 y_0 +  D_1 = 0 \\\\  A_2 x_0 + B_2 y_0 + D_2 = 0 \\end{cases}$$ \
        где $x_0 = \\frac{\\begin{vmatrix} -D_1 & B_1 \\\\ -D_2 & B_2 \\end{vmatrix}}{\\Delta}$,  &nbsp;&nbsp;\
        $y_0 = \\frac{\\begin{vmatrix} A_1 & -D_1 \\\\ A_2 & -D_2 \\end{vmatrix}}{\\Delta}$, &nbsp;&nbsp;\
        $z_0=0$, &nbsp;&nbsp;\
        $\\Delta = A_1 B_2 - A_2 B_1$.  </p>";
        algorithm += "<p>Составим каноническое уравнение прямой  $l$: \
        $$\\frac{x - x_0}{\\alpha} = \\frac{y - y_0}{\\beta} = \\frac{z - z_0}{\\gamma}.$$</p>";
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
    values[0].push([2,-3,0,1, 0,1,2,-1]);
    values[0].push([3,-5,0,41, 7,0,-5,14]);
    values[1].push([0,1,-4,8, 2,0,-3,-2]);
    values[1].push([2,-5,0,5, 0,3,2,-9]);
    values[1].push([2,-1,0,-3, 0,1,1,-5]);
    values[1].push([1,-2,0,-9, 7,0,-4,-21]);
    values[1].push([5,-2,0,20, 0,6,-5,5]);
    values[1].push([2,1,0,-3, 0,3,-2,11]);
    values[1].push([1,0,-3,1, 0,1,-7,15]);
    values[1].push([1,0,-5,8, 0,1,-4,6]);
    values[1].push([7,0,-2,-21, 0,7,-2,0]);
    values[1].push([2,0,1,9, 3,-2,0,13]);
    values[1].push([4,-3,0,-11, 2,0,-3,-13]);
    values[1].push([1,0,2,-3, 3,4,0,-19]);
    values[1].push([4,-3,0,-11, 0,3,-7,-14]);
    values[1].push([1,0,-2,3, 0,2,1,-6]);
    values[2].push([3,-1,0,-9, 1,0,2,1]);
    values[2].push([0,1,-3,2, 1,2,0,2]);
    values[2].push([2,1,-1,1, 1,-1,2,-4]);
    values[2].push([4,-2,1,1, 3,1,-1,2]);
    values[2].push([2,0,-3,2, 0,1,5,-1]);
    values[2].push([5,1,2,4, 6,-1,4,2]);
    values[2].push([0,5,-4,4, 1,-1,2,2]);
    values[2].push([3,0,2,-3, 1,1,0,1]);
    values[2].push([0,2,-5,4, 1,-3,4,-5]);
    values[2].push([3,0,4,4, 2,-1,0,1]);
    values[2].push([1,-2,0,2, 0,5,3,-3]);
    values[2].push([1,0,2,-4, 0,1,3,-1]);
    values[2].push([3,-2,0,4, 1,0,1,-3]);
    values[2].push([1,4,2,-1, 2,3,2,-3]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '<p>$l$: <span id="l"></span></p>';
    $("#variants").html(variants);

    var answer = '';
    answer += '<p><table style="text-align: center">';
    answer += '<tr>';
    answer += '<td>$x_0$</td>';
    answer += '<td><input type="text" id="ans1" size=3></td>';
    answer += '<td>$y_0$</td>';
    answer += '<td><input type="text" id="ans3" size=3></td>';
    answer += '<td>$z_0$</td>';
    answer += '<td><input type="text" id="ans5" size=3></td>';
    answer += '</tr>';
    answer += '<tr>';
    answer += '<td>$\\alpha$</td>';
    answer += '<td><input type="text" id="ans2" size=3></td>';
    answer += '<td>$\\beta$</td>';
    answer += '<td><input type="text" id="ans4" size=3></td>';
    answer += '<td>$\\gamma$</td>';
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
    $("#l").html( "$\\begin{cases}"+linCombText([cval[0],cval[1],cval[2],cval[3]],["x","y","z",""])+"=0 \\\\"+linCombText([cval[4],cval[5],cval[6],cval[7]],["x","y","z",""])+"=0 \\end{cases} $" );
    for (var i = 0; i < 4; i++) {
        abcd1[i] = cval[i];
        abcd2[i] = cval[i+4];
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
var abcd2 = [];
var p0 = [];
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    var pointM10 = [];
    var pointM11 = [];
    var pointM12 = [];
    pointsFromABCD(abcd1, pointM10,pointM11,pointM12);
    var pointM20 = [];
    var pointM21 = [];
    var pointM22 = [];
    pointsFromABCD(abcd2, pointM20,pointM21,pointM22);

    var n1 = abcd1;
    var n2 = abcd2;
    var v = [];
    vec3.cross(n1,n2,v);
    unifyAswer(v);
    // var p0 = [];
    if (vec3.length(v) == 0) {p0 = [0.0,0.0,0.0];}
    else {
        var det = n1[1]*n2[2]-n1[2]*n2[1];
        var det1, coord = [0,1,2];

        det1 = n1[0]*n2[2]-n1[2]*n2[0];
        if (Math.abs(det)<Math.abs(det1)) {det = det1; coord = [1,0,2];}

        det1 = n1[0]*n2[1]-n1[1]*n2[0];
        if (Math.abs(det)<Math.abs(det1)) {det = det1; coord = [2,0,1];}

        var d1 = vec3.dot(n1,pointM10);
        var d2 = vec3.dot(n2,pointM20);
        p0[coord[0]] = 0;
        p0[coord[1]] = (d1*n2[coord[2]]-d2*n1[coord[2]])/det;
        p0[coord[2]] = (d2*n1[coord[1]]-d1*n2[coord[1]])/det;
    }

    // vec3.normalize(v);

    vec3.add(v,p0);
    var leftPoint = [];
    var rightPoint = [];
    createLine(p0,v,leftPoint,rightPoint,11);
    primitives.push({class:"line", text: katex.renderToString("l"), arr0:leftPoint, arr1:rightPoint, rad:2, color:[0.5, 0.0, 1.0, 1.0]});

    if (showSolution) {
        var x0y0z0;
        var x1y1z1;
        var mnp = [];
        x0y0z0 = p0;
        x1y1z1 = v;
        vec3.subtract(x1y1z1,x0y0z0,mnp);
        $("#ans1").val(x0y0z0[0].toFixed(precision1));
        $("#ans2").val(mnp[0].toFixed(precision1));
        $("#ans3").val(x0y0z0[1].toFixed(precision1));
        $("#ans4").val(mnp[1].toFixed(precision1));
        $("#ans5").val(x0y0z0[2].toFixed(precision1));
        $("#ans6").val(mnp[2].toFixed(precision1));
    }

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pointM10,pointM11,pointM12,planepoint1,planepoint2,planepoint3,planepoint4,10);
    primitives.push({class:"plane", text: katex.renderToString("\\pi_1"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 1.0, 0.0, 0.25]});

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pointM20,pointM21,pointM22,planepoint1,planepoint2,planepoint3,planepoint4,10);
    primitives.push({class:"plane", text: katex.renderToString("\\pi_2"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[1.0, 1.0, 0.0, 0.25]});
}
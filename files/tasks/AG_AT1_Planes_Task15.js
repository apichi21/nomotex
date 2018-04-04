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
    var conditions = "Составьте уравнение плоскости, проходящей через прямые $l_1:\\frac{x-2}{-3}=\\frac{y}{2}=\\frac{z}{-1}$ и $l2:\\begin{cases}2x+y-z-1=0\\\\x+z+2=0\\end{cases}$, проверив, возможно ли это.";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
        var algorithm = "<p>$l_1:\\frac{x-x_{01}}{p_{11}}=\\frac{y-y_{01}}{p_{12}}=\\frac{z-z_{01}}{p_{13}}$<br>$l2: \\begin{cases}A_2x+B_2y+C_2z+D_2=0\\\\A_3x+B_3y+C_3z+D_3=0\\end{cases}$</p>\
      <p>Найдем через векторы нормалей направляющий вектор прямой $l_2$:<br>$\\begin{split}\\vec p_2=[\\vec n_2 \\times \\vec n_3]=\\begin{vmatrix}i& j&k\\\\A_2&B_2&C_2\\\\A_3&B_3&C_3\\end{vmatrix}=\\\\=\\vec i(B_2C_3+B_3C_2)+\\vec j(-A_2C_3+A_3C_2)+\\vec k(A_2B_3+A_3B_2)\\end{split}$<br>$\\vec p_2${$p_{21};p_{22};p_{23}$}</p>\
      <p>Для этого найдем точку $M_2$ пересечения $l_2$ с $XoY$, $z=0$<br>$\\begin{cases}A_2x+B_2y+D_2=0\\\\A_3x+B_3y+D_3=0\\end{cases}$<br>$x=\\frac {-B_2y-D_2}{A_2}$<br>$A_2\\frac {-B_2-D_2}{A_2}+B_3y+D_3=0$<br>$y=\\frac {A_3D_2/A_2-D_3}{B_3-A_3B_2/A_2}=y_{2}$<br>$x=\\frac {-B_2y_{2}-D_2}{A_2}=x_{2}$\
      т.$M_{2}(x_{2};y_{2};0)\\in l_2$;$M_{1}(x_{01};y_{01};z_{01})\\in l_1$ - из уравнения прямой</p>\
      <p>Возьмем радиус-векторы $\\vec {OM_1}$ {$x_{01};y_{01};z_{01}$},$\\vec {OM_2}${$x_{2};y_{2};0$}<br>Их разность $\\vec r=\\vec {OM_2}-\\vec {OM_1}$, $\\vec r${$x_2-x_{01};y_2-y_{01};-z_{01}$}</p>\
      <p>Для того, чтобы определить лежат ли прямые в одной плоскости, проверим являются ли направляющие векторы $\\vec p_1,\\vec p_2,\\vec r$ компаланарными:<br>$\\vec r[\\vec p_1 \\times \\vec p_2]=\\begin{vmatrix}x_2-x_{01}& y_2-y_{01}& -z_{01}\\\\p_{11}& p_{12}&p_{13}\\\\p_{21}& p_{22}&p_{23}\\end{vmatrix}$</p>\
      <p>Если $\\vec r[\\vec p_1 \\times \\vec p_2]=0$, то векторы компланарны, лежат в одной плоскости.</p>\
      <p>$l_1$ в параметрическом виде $\\begin{cases}x=p_{11}t+x_{01}\\\\y=p_{12}t+y_{01}\\\\z=p_{13}t+z_{01}\\\\\\end{cases}$<br>Возьмем $t=1$ и найдем т.$M_3(p_{11}+x_{01};yp_{12}+y_{01};p_{13}+z_{01}) \\in l_1$<br>Полученные точки $M_1, М_2, М_3 \\in \\pi$</p>\
      <p>Напишем уравнение плоскости:<br>$\\begin{vmatrix}x-x_1& y-y_1&z-z_1\\\\x_2-x_1& y_2-y_1&z_2-z_1\\\\x_3-x_1& y_3-y_1&z_3-z_1\\end{vmatrix}=0$</p>\
      <p>$\\begin{split}(x-x_1)\\begin{vmatrix}y_2-y_1&z_2-z_1\\\\ y_3-y_1&z_3-z_1\\end{vmatrix}-\\\\-(y-y_1)\\begin{vmatrix}x_2-x_1&z_2-z_1\\\\x_3-x_1&z_3-z_1\\end{vmatrix}+\\\\+(z-z_1)\\begin{vmatrix}x_2-x_1& y_2-y_1\\\\x_3-x_1& y_3-y_1\\end{vmatrix}=0\\end{split}$</p>\
      <p>$\\begin{split}x((y_2-y_1)(z_3-z_1)-(y_3-y_1)(z_2-z_1))+\\\\+y(-(x_2-x_1)(z_3-z_1)+(x_3-x_1)(z_2-z_1))+\\\\+z((x_2-x_1)(y_3-y_1)-(x_3-x_1)(y_2-y_1))+\\\\+x_1(-(y_2-y_1)(z_3-z_1)+(y_3-y_1)(z_2-z_1))+\\\\+y_1((x_2-x_1)(z_3-z_1)-(x_3-x_1)(z_2-z_1))+\\\\+z_1(-(x_2-x_1)(y_3-y_1)+(x_3-x_1)(y_2-y_1))=0\\end{split}$</p>\
      <p>$A=(y_2-y_1)(z_3-z_1)-(y_3-y_1)(z_2-z_1)$<br>\
      $B=-(x_2-x_1)(z_3-z_1)+(x_3-x_1)(z_2-z_1)$<br>\
      $C=(x_2-x_1)(y_3-y_1)-(x_3-x_1)(y_2-y_1)$<br>\
      $\\begin{split}D=x_1(-(y_2-y_1)(z_3-z_1)+(y_3-y_1)(z_2-z_1))+\\\\+y_1((x_2-x_1)(z_3-z_1)-(x_3-x_1)(z_2-z_1))+\\\\+z_1(-(x_2-x_1)(y_3-y_1)+(x_3-x_1)(y_2-y_1))\\end{split}$<br> Уравнение искомой плоскости в общем виде:<br>$\\pi:Ax+By+Cz+D=0$</p>";
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

    values[0].push([2,0,0, -3,2,-1, 2,1,-1,-1, 1,0,1,2]);
    values[0].push([2,-4,1,-4,4,1,-3,-1,-2,7,-2,2,0,-3]);
    values[1].push([-1,-1,-4,1,4,4,0,0,-4,0,-3,-3,-4,9]);
    values[1].push([-1,-2,2,1,-3,-5,3,-2,2,-4,1,-3,3,-6]);
    values[1].push([-2,0,-4,-2,-2,-4,2,3,-4,-3,-1,-3,2,6]);
    values[1].push([4,-4,-3,0,0,-5,-1,0,3,-8,3,1,-3,4]);
    values[1].push([0,0,4,0,-1,0,1,-2,3,5,-4,-2,0,-10]);
    values[1].push([-1,2,1,0,-2,0,-1,-2,1,9,3,2,0,-8]);
    values[1].push([-3,3,3,-4,2,0,-3,-1,-3,1,0,0,-2,6]);
    values[1].push([-1,-2,-1,1,-4,0,0,0,1,1,-3,-1,-1,-7]);
    values[1].push([1,-1,3,4,4,-2,3,3,2,-1,2,3,2,-1]);
    values[1].push([-2,3,-3,4,-3,-4,-2,-1,0,-7,-2,-2,-3,5]);
    values[1].push([2,0,2,2,3,0,1,0,3,9,-3,0,-1,4]);
    values[1].push([-2,0,-2,-4,-3,2,0,-4,-2,-2,3,-4,-4,-4]);
    values[1].push([-1,3,0,0,4,0,-4,2,-2,8,-3,0,-3,-3]);
    values[1].push([-3,-3,2,2,3,0,3,-4,-1,4,3,-2,3,-3]);
    values[2].push([-1,2,-3,0,2,3,3,-4,2,-1,2,-4,2,-2]);
    values[2].push([-2,-3,-2,-2,-5,0,0,0,3,6,0,-1,-3,0]);
    values[2].push([-2,1,0,4,-4,0,-1,-3,-4,-1,2,2,1,2]);
    values[2].push([-4,-2,3,-4,-2,4,2,-4,-2,-6,0,-1,-1,-2]);
    values[2].push([-5,-4,3,2,-2,1,0,2,0,-4,3,-1,0,7]);
    values[2].push([1,4,-5,-3,-4,3,2,0,-4,2,-1,3,-2,-1]);
    values[2].push([-4,3,4,-5,1,0,3,2,-4,-7,2,-3,-1,-8]);
    values[2].push([-5,-4,-3,-4,-3,-3,-4,2,-2,-2,1,0,0,1]);
    values[2].push([-1,4,2,-2,-4,-2,0,-1,-2,2,1,0,-1,3]);
    values[2].push([-4,0,-1,2,2,0,-3,-2,0,-2,-1,-4,0,6]);
    values[2].push([0,-4,0,2,-2,-2,0,2,-2,8,-4,-3,-2,9]);
    values[2].push([-5,-2,-5,0,-4,-3,2,0,-3,-3,-3,0,0,5]);
    values[2].push([1,0,2,2,1,2,-4,0,-2,-8,0,-4,-1,-6]);
    values[2].push([-2,-4,-5,1,-4,-2,1,0,-1,1,-1,1,2,0]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '<p>$l_1$: <span id="l1"></span></p>';
    variants += '<p>$l_2$: <span id="l2"></span></p>';
    $("#variants").html(variants);

    var answer = '<p>Возможно составить уравнение? <select id="ans" onchange="changeCross(this.value);">\
    <option value="0">...</option>\
    <option value="yes">Да</option>\
    <option value="no">Нет</option>\
    </select></p>';

    answer += '<table id="planecoefs" style="text-align: center; display: none;">';
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
            for (var i = 0; i < 6; i++) {
                values[0][0][i] = getRandomInt(-5,5);
            }
            values[0][0][6] = getRandomInt(-4,4);
            values[0][0][7] = getRandomInt(-4,4);
            values[0][0][8] = getRandomInt(-4,4);
            values[0][0][9] = getRandomInt(-10,10);
            values[0][0][10] = getRandomInt(-4,4);
            values[0][0][11] = getRandomInt(-4,4);
            values[0][0][12] = getRandomInt(-4,4);
            values[0][0][13] = getRandomInt(-10,10);

            var n1 = [values[0][0][6], values[0][0][7], values[0][0][8]];
            var n2 = [values[0][0][10], values[0][0][11], values[0][0][12]];
            var s1 = [values[0][0][3], values[0][0][4], values[0][0][5]];
            var rM1 = [values[0][0][0], values[0][0][1], values[0][0][2]];

            var s2 = [];
            vec3.cross(n1,n2,s2);
            unifyAswer(s2);
            var v1 = [];
            vec3.cross(s1,s2,v1);



            var p0 = [];
            var det = n1[1]*n2[2]-n1[2]*n2[1];
            var det1, coord = [0,1,2];

            det1 = n1[0]*n2[2]-n1[2]*n2[0];
            if (Math.abs(det)<Math.abs(det1)) {det = det1; coord = [1,0,2];}

            det1 = n1[0]*n2[1]-n1[1]*n2[0];
            if (Math.abs(det)<Math.abs(det1)) {det = det1; coord = [2,0,1];}

            var d1 = -values[0][0][9];
            var d2 = -values[0][0][13];
            p0[coord[0]] = 0;
            p0[coord[1]] = (d1*n2[coord[2]]-d2*n1[coord[2]])/det;
            p0[coord[2]] = (d2*n1[coord[1]]-d1*n2[coord[1]])/det;

            var drM1M2 = [];
            vec3.subtract(p0, rM1, drM1M2);
            vec3.dot(drM1M2, v1)


            if (vec3.dot(drM1M2, v1)!=0) continue;

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

    scaleFactor = 0.15;
    axisLen = 10;
    axisDashStep = 2;
}
function changeCross(isCrossing) {
    if (isCrossing == 'yes') {
        $("#planecoefs").css({display:"block"});
    } else {
        $("#planecoefs").css({display:"none"});
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function generateAnsText()
{
    var ansArr = [];
    if ($("#ans").val() == 'yes') {
        for (var j = 1; j <= 4; j++) {
            ansArr.push(parseFloat($("#ans"+j).val()));
        }
        unifyAswer(ansArr);
        for (var j = 0; j < 4; j++) {
            ansArr[j] = ansArr[j].toFixed(precision1);
        }
        ansArr.unshift($("#ans").val());
    } else {
        ansArr.push($("#ans").val());
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
    $("#l1").html( "$\\frac{"+linCombText([1,-cval[i]],["x",""])+"}{"+cval[i+3]
        +"}=\\frac{"+linCombText([1,-cval[i+1]],["y",""])+"}{"+cval[i+4]
        +"}=\\frac{"+linCombText([1,-cval[i+2]],["z",""])+"}{"+cval[i+5]+"}$" );
    var i = 6;
    $("#l2").html( "$\\begin{cases}"
        +linCombText([cval[i],cval[i+1],cval[i+2],cval[i+3]],["x","y","z",""]) + "=0 \\\\"
        +linCombText([cval[i+4],cval[i+5],cval[i+6],cval[i+7]],["x","y","z",""]) + "=0 \\end{cases} $" );
    for (var i = 0; i < 3; i++) {
        p1[i] = cval[i];
        vecS1[i] = cval[i+3];
    }
    for (var i = 0; i < 4; i++) {
        abcd1[i] = cval[i+6];
        abcd2[i] = cval[i+6+4];
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
    var pointM20 = [];
    var pointM21 = [];
    var pointM22 = [];
    pointsFromABCD(abcd2, pointM20,pointM21,pointM22);


    var p2 = [];
    vec3.add(p1, vecS1, p2);
    var leftPoint = [];
    var rightPoint = [];
    createLine(p1,p2,leftPoint,rightPoint,15);
    primitives.push({class:"line", text: katex.renderToString("l_1"), ratio: 0.7, arr0:leftPoint, arr1:rightPoint, rad:2, color:[1.0, 0.5, 0.0, 1.0]});


    var n1 = abcd1;
    var n2 = abcd2;
    var v0 = [];
    vec3.cross(n1,n2,v0);
    unifyAswer(v0);
    var p0 = [];
    if (vec3.length(v0) == 0) {p0 = [0.0,0.0,0.0];}
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

    // vec3.normalize(v0);

    var v = [];
    vec3.add(v0,p0,v);

    var leftPoint = [];
    var rightPoint = [];
    createLine(p0,v,leftPoint,rightPoint,15);
    primitives.push({class:"line", text: katex.renderToString("l_2"), arr0:leftPoint, arr1:rightPoint, rad:2, color:[0.5, 0.0, 1.0, 1.0]});

    if (showSolution) {
        var v1 = [];
        vec3.cross(vecS1,v0,v1);
        var drM1M2 = [];
        vec3.subtract(p0, p1, drM1M2);
        if (vec3.dot(drM1M2, v1)==0) {
            $("#ans [value='yes']").prop("selected", true);
            changeCross('yes');
            var vecNans = [];
            vec3.cross(vecS1,v0,vecNans);
            vecNans[3] = -(vecNans[0]*p1[0]+vecNans[1]*p1[1]+vecNans[2]*p1[2]);
            unifyAswer(vecNans);
            $("#ans1").val(parseFloat(vecNans[0].toFixed(precision1)));
            $("#ans2").val(parseFloat(vecNans[1].toFixed(precision1)));
            $("#ans3").val(parseFloat(vecNans[2].toFixed(precision1)));
            $("#ans4").val(parseFloat(vecNans[3].toFixed(precision1)));

            var planepoint1ans = [];
            var planepoint2ans = [];
            var planepoint3ans = [];
            var planepoint4ans = [];
            createPlane(p1,p2,v,planepoint1ans,planepoint2ans,planepoint3ans,planepoint4ans,15);
            primitives.push({class:"plane", text: "", arr0:planepoint1ans, arr1:planepoint2ans, arr2:planepoint3ans, arr3:planepoint4ans, color:[0.0, 1.0, 0.0, 0.2]});
         } else {
            $("#ans [value='no']").prop("selected", true);
            changeCross('no');
         }
   }

    // var planepoint1 = [];
    // var planepoint2 = [];
    // var planepoint3 = [];
    // var planepoint4 = [];
    // createPlane(pointM0,pointM1,pointM2,planepoint1,planepoint2,planepoint3,planepoint4,25);
    // primitives.push({class:"plane", text: katex.renderToString("\\pi_1"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 1.0, 0.0, 0.25]});

    // var planepoint1 = [];
    // var planepoint2 = [];
    // var planepoint3 = [];
    // var planepoint4 = [];
    // createPlane(pointM10,pointM11,pointM12,planepoint1,planepoint2,planepoint3,planepoint4,25);
    // primitives.push({class:"plane", text: katex.renderToString("\\pi_1"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 1.0, 0.0, 0.25]});

    // var planepoint1 = [];
    // var planepoint2 = [];
    // var planepoint3 = [];
    // var planepoint4 = [];
    // createPlane(pointM20,pointM21,pointM22,planepoint1,planepoint2,planepoint3,planepoint4,25);
    // primitives.push({class:"plane", text: katex.renderToString("\\pi_2"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[1.0, 1.0, 0.0, 0.25]});
}
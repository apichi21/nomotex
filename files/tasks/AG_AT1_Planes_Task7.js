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
    var conditions = "Проверьте, пересекаются ли прямые \
      \\begin{equation*} l_1 : \\frac{x-x_1}{m_1} = \\frac{y-y_1}{n_1} = \\frac{z-z_1}{p_1} \\end{equation*} и \
      \\begin{equation*} l_2 : \\frac{x-x_2}{m_2} = \\frac{y-y_2}{n_2} = \\frac{z-z_2}{p_2} \\end{equation*} \
      и, если пересекаются, то составить уравнение плоскости, проходящей через них.";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
      var algorithm = "<p>Выясним взаимное расположения прямых $l_1$ и $l_2$. Для этого необходимо вычислить следующий определитель по правилу Саррюса (или используя удобное разложение по столбцу или по строке): \
      \\begin{equation}  \\begin{split} \\Delta = \\begin{vmatrix} x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\\\ m_1 & n_1 & p_1 \\\\ m_2 & n_2 & p_2\\end{vmatrix} \
      =\\\\= (x_2 - x_1) n_1 p_2 + (y_2 - y_1) p_1 m_2  + (z_2 - z_1) m_1 n_2 -\\\\- (z_2 - z_1) n_1 m_2 - (x_2 - x_1) p_1 n_2- (y_2 - y_1) m_1 p_2.  \\end{split} \\end{equation} </p>";
      algorithm += "<p>Если \\begin{equation}\\Delta = 0,\\end{equation} то прямые $l_1$ и $l_2$ пересекаются или параллельны. \
      Прямые $l_1$ и $l_2$ параллельны, если выполняется условие: \
      \\begin{equation}  \\frac{m_1}{m_2} = \\frac{n_1}{n_2} = \\frac{p_1}{p_2} \\end{equation}</p>";
      algorithm += "<p>Если условие $(3)$ не выполнено, т.е. хотя бы одно из равенств $(3)$ нарушается\
      \\begin{equation}  \\left[ \\begin{gathered} \\frac{m_1}{m_2} \\ne \\frac{n_1}{n_2} \\\\ \\frac{n_1}{n_2} \\ne \\frac{p_1}{p_2} \\\\ \\frac{m_1}{m_2} \\ne \\frac{p_1}{p_2}, \\end{gathered} \\right. \\end{equation} то прямые пересекаются. </p>";
      algorithm += "<p>Таким образом, если выражения $(2)$ и  $(4)$ удовлетворяются, то прямые $l_1$ и $l_2$ пересекаются. Тогда составим уравнение плоскости, проходящей через них. </p>";
      algorithm += "<p>Для этого вычислим вектор $\\vec{n}$ нормали к плоскости как векторное произведение направляющих векторов прямых $l_1$ и $l_2$ $\\vec{s_1} = \\{m_1; n_1; p_1\\}$ и $\\vec{s_2} = \\{m_2; n_2; p_2\\}$:  \\begin{equation} \\begin{split} \\vec{n} = \\vec{s_1} \\times \\vec{s_2} = \\begin{vmatrix} \\vec{i} && \\vec{j} && \\vec{k} \\\\ m_1 && m_1 && p_1 \\\\ m_2 && m_2 && p_2 \\end{vmatrix} = \\\\ = (n_1 p_2 - p_1 n_2)\\vec{i} - (m_1 p_2 - m_2 p_1)\\vec{j} + (m_1 n_2 - n_1 m_2)\\vec{k} \\end{split} \\end{equation} </p>";
      algorithm += "<p>Введем обозначения: \
      \\begin{equation}  \\begin{cases} A = n_1 p_2 - p_1 n_2 \\\\ B = - (m_1 p_2 - m_2 p_1) \\\\ C = m_1 n_2 - n_1 m_2 \\end{cases} \\end{equation} </p>";
      algorithm += "<p>Тогда выражение $(4)$ с учетом $(5)$ можно записать в виде: \
      \\begin{equation} \\vec{n} = A\\vec{i}+B\\vec{j}+C\\vec{k} = \\{A;B;C\\} \\end{equation} </p>";
      algorithm += "<p>Запишем уравнение искомой плоскости в координатной форме, используя вектор нормали к плоскости $\\vec{n}$ и координаты точки $M_1(x_1; y_1; z_1)$, лежащей на прямой $l_1$:\
      \\begin{equation} A(x-x_1) + B(y-y_1)+C(z-z_1)=0 \\end{equation}</p>";
      algorithm += "<p>Тогда общее уравнение искомой плоскости будет иметь вид:\
      \\begin{equation} Ax+By+Cz+D=0, \\end{equation} \
      где $D = -A x_1 - B y_1 - C z_1$.</p>";
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
 values[0].push([-1,0,2, -1,2,3, 0,-1,0, 2,3,1]);
 values[0].push([0,0,3,2,3,-3,-3,-4,3,2,-1,-3]);//Не пересекаются
 values[1].push([-2,2,3,-2,0,0,-3,2,-1,-2,0,4]);
 values[1].push([0,0,3,2,1,0,-4,-4,-5,2,0,-4]);
 values[1].push([1,4,0,4,-5,-4,-5,4,1,4,-2,-2]);
 values[1].push([4,1,1,-2,1,0,4,1,1,-5,4,3]);
 values[1].push([-5,-4,4,3,2,-1,2,-5,1,-1,0,-5]);//Не пересекаются
 values[1].push([-1,-3,3,1,2,-5,-1,-3,3,-1,-1,-1]);
 values[1].push([-4,-3,0,-3,-2,-2,2,1,4,-4,4,0]);
 values[1].push([4,3,1,-1,-3,-3,-2,3,1,3,-3,-3]);
 values[1].push([-3,1,-4,-4,-1,-4,3,2,2,-4,-3,-4]);
 values[1].push([-1,4,2,-4,4,-4,-4,0,0,0,0,4]);//Не пересекаются
 values[1].push([2,3,1,-5,-5,3,-3,-2,-3,-5,-5,-3]);
 values[1].push([0,-3,-3,3,0,-2,1,-3,-1,1,0,1]);
 values[1].push([2,0,0,-4,-2,1,-4,2,-5,-1,2,-3]);
 values[1].push([4,1,-5,0,1,-3,3,-5,2,-5,4,3]);//Не пересекаются
 values[2].push([4,0,-2,-5,0,4,3,0,4,-2,0,-3]);
 values[2].push([-2,2,-1,4,-2,-2,2,-1,-2,-5,4,1]);
 values[2].push([-3,2,-5,0,2,-1,0,-2,3,-3,-2,-5]);
 values[2].push([0,0,0,3,-1,2,0,-3,-3,1,3,4]);
 values[2].push([4,-4,-1,-3,3,3,4,1,-3,-5,3,3]);//Не пересекаются
 values[2].push([1,-5,1,-2,2,1,-1,-4,3,-2,3,0]);
 values[2].push([4,4,1,-3,-4,-4,1,1,-5,2,4,0]);
 values[2].push([2,4,-2,-3,-3,3,3,-1,3,2,-1,1]);
 values[2].push([-1,2,3,-4,0,3,-4,-2,0,-1,0,-3]);//Не пересекаются
 values[2].push([-3,2,-3,3,-1,4,3,0,0,3,-1,-3]);
 values[2].push([2,2,-4,-1,1,4,-4,1,-1,3,1,0]);
 values[2].push([-5,1,-4,-4,0,-5,2,3,-2,-1,1,-1]);//Не пересекаются
 values[2].push([0,-5,4,3,1,3,-5,2,-1,-1,-5,-1]);
 values[2].push([-2,4,-2,4,4,2,-1,-2,-1,3,-4,2]);

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

    var answer = '<p>Прямые пересекаются? <select id="ans" onchange="changeCross(this.value);">\
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
            for (var i = 0; i < 12; i++) {
                values[0][0][i] = getRandomInt(-5,5);
            }
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
    $("#l2").html( "$\\frac{"+linCombText([1,-cval[i]],["x",""])+"}{"+cval[i+3]
        +"}=\\frac{"+linCombText([1,-cval[i+1]],["y",""])+"}{"+cval[i+4]
        +"}=\\frac{"+linCombText([1,-cval[i+2]],["z",""])+"}{"+cval[i+5]+"}$" );
    for (var i = 0; i < 3; i++) {
        p1[i] = cval[i];
        vecS1[i] = cval[i+3];
        p2[i] = cval[i+6];
        vecS2[i] = cval[i+9];
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
var p1 = [];
var vecS1 = [];
var p2 = [];
var vecS2 = [];
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});


    var p12 = [];
    vec3.add(p1, vecS1, p12);
    var leftPoint = [];
    var rightPoint = [];
    createLine(p1,p12,leftPoint,rightPoint,11);
    primitives.push({class:"line", text: katex.renderToString("l_1"), arr0:leftPoint, arr1:rightPoint, rad:2, color:[1.0, 0.5, 0.0, 1.0]});

    var p22 = [];
    vec3.add(p2, vecS2, p22);
    var leftPoint = [];
    var rightPoint = [];
    createLine(p2,p22,leftPoint,rightPoint,11);
    primitives.push({class:"line", text: katex.renderToString("l_2"), arr0:leftPoint, arr1:rightPoint, rad:2, color:[0.0, 0.5, 1.0, 1.0]});

    var v = [];
    vec3.add(p1,vecS2,v);
    if (showSolution) {
        var x2x1 = p2[0]-p1[0];
        var y2y1 = p2[1]-p1[1];
        var z2z1 = p2[2]-p1[2];
        var vecm1 = vecS1[0];
        var vecn1 = vecS1[1];
        var vecp1 = vecS1[2];
        var vecm2 = vecS2[0];
        var vecn2 = vecS2[1];
        var vecp2 = vecS2[2];
        var det = x2x1*(vecn1*vecp2-vecn2*vecp1) -  y2y1*(vecm1*vecp2-vecm2*vecp1) +  z2z1*(vecm1*vecn2-vecm2*vecn1);

        if (det != 0) {
            $("#ans [value='no']").prop("selected", true);
            changeCross('no');

        } else {
            $("#ans [value='yes']").prop("selected", true);
            changeCross('yes');
            var vecNans = [];
            vec3.cross(vecS1,vecS2,vecNans);
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
            createPlane(p1,p12,v,planepoint1ans,planepoint2ans,planepoint3ans,planepoint4ans,15);
            primitives.push({class:"plane", text: "", arr0:planepoint1ans, arr1:planepoint2ans, arr2:planepoint3ans, arr3:planepoint4ans, color:[0.0, 1.0, 0.0, 0.2]});
        }
    }
}
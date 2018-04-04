var dimention="3d";
function initPoints() {
    points = [];    
    points.push({coord1: vec3.create([0,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
}
var C;
var values = [[],[],[]];
var showAlgorithm = false;
var setOfValues = -1;
var mustBeHandedOver = false;
var showSolution = false;
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

    $("Title").html("Задача 2");
    var conditions = "Разложить вектор $\\vec{a}$ по 3-м линейно независимым векторам $\\vec{p}$, $\\vec{q}$, $\\vec{r}$. Ответ дать с точностью до 2-го знака после запятой<br>";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
        var algorithm = "<p>Разложим вектор $\\vec{a}$ по ортонормированному базису $\\vec{i}$, $\\vec{j}$, $\\vec{k}$ <br> \\begin{equation} \\vec{a}=a_1\\vec{i}+a_2\\vec{j}+a_3\\vec{k} \\end{equation} где $a_1, a_2, a_3$ - координаты вектора $\\vec{a}$ в базисе $\\vec{i}$, $\\vec{j}$, $\\vec{k}$.</p>";
        algorithm += "<p>Будем использовать для вектора $\\vec{a}$ также обозначение <br> \\begin{equation} \\vec{a}=\\{a_1; a_2; a_3\\}  \\end{equation} если указан базис, относительно которого заданы его координаты $a_1, a_2, a_3$.</p>";
        algorithm += "<p>Аналогично разложим векторы $\\vec{p}$, $\\vec{q}$, $\\vec{r}$ по базису $\\vec{i}$, $\\vec{j}$, $\\vec{k}$: <br> \\begin{equation} \\begin{split} \\vec{p}=\\{p_1; p_2; p_3\\} \\\\ \\vec{q}=\\{q_1; q_2; q_3\\}  \\\\ \\vec{r}=\\{r_1; r_2; r_3\\} \\end{split} \\end{equation}</p>";
        algorithm += "<p>Поскольку система $\\vec{p}$, $\\vec{q}$, $\\vec{r}$ - линейно независима и состоит из 3-х векторов, то она образует базис, и по нему также можно разложить вектор $\\vec{a}$ \\begin{equation} \\vec{a}=\\alpha\\vec{p}+\\beta\\vec{q}+\\gamma\\vec{r} \\end{equation}</p>";
        algorithm += "<p>Подставляем (2) и (3) в формулу (4) и приравняем соответствующие координаты справа и слева, тогда получим систему 3-х уравнений с 3-мя неизвестными $\\alpha$, $\\beta$ и $\\gamma$: \\begin{equation} \\begin{split} a_1=\\alpha p_1+\\beta q_1+\\gamma r_1, \\\\ a_2=\\alpha p_2+\\beta q_2+\\gamma r_2 \\\\ a_3=\\alpha p_3+\\beta q_3+\\gamma r_3 \\end{split} \\end{equation}</p>";
        algorithm += "<p>Решим систему уравнений методом Крамера. Для этого составим матрицу 3-го порядка (таблицу) коэффициентов уравнения <br> \\begin{equation} \\begin{pmatrix} p_1 & q_1 & r_1 \\\\ p_2 & q_2 & r_2 \\\\ p_3 & q_3 & r_3 \\end{pmatrix} \\end{equation}</p>";
        algorithm += "<p>Определителем матрицы называют число $\\Delta$, составленное по правилу <br> $$\\Delta=p_1q_2r_3+p_3q_1r_2+p_2q_3r_1-p_3q_2r_1-p_2q_1r_3-p_1q_3r_2$$</p>";
        algorithm += "<p>Определитель $\\Delta$ матрицы обозначают как \\begin{equation} \\Delta=\\begin{vmatrix} p_1 & q_1 & r_1 \\\\ p_2 & q_2 & r_2 \\\\ p_3 & q_3 & r_3 \\end{vmatrix} \\end{equation}</p>";
        algorithm += "<p>Составим ещё 3 матрицы, заменяя по очереди первый, второй или 3-ий столбец в матрице (6) на столбец коэффициентов из левой части уравнения (5) \\begin{equation} \\begin{pmatrix} a_1 \\\\ a_2 \\\\ a_3 \\end{pmatrix}\\end{equation}</p>";
        algorithm += "<p>Тогда получим ещё 3 определителя \\begin{equation} \\begin{split} \\Delta_1=\\begin{vmatrix} a_1 & q_1 & r_1 \\\\ a_2 & q_2 & r_2 \\\\ a_3 & q_3 & r_3 \\end{vmatrix}, \\\\ \\Delta_2=\\begin{vmatrix} p_1 & a_1 & r_1 \\\\ p_2 & a_2 & r_2 \\\\ p_3 & a_3 & r_3 \\end{vmatrix},\\\\  \\Delta_3=\\begin{vmatrix} p_1 & q_1 & a_1 \\\\ p_2 & q_2 & a_2 \\\\ p_3 & q_3 & a_3 \\end{vmatrix}.\\end{split}\\end{equation}</p>";
        algorithm += "<p>Формулы Крамера позволяют найти единственное решение системы 3-х линейных уравнений (5) \\begin{equation} \\alpha=\\frac{\\Delta_1}{\\Delta}, \\beta=\\frac{\\Delta_2}{\\Delta}, \\gamma=\\frac{\\Delta_3}{\\Delta}\\end{equation}</p>";
        algorithm += "<p>В силу того, что по условию векторы $\\vec{p}$, $\\vec{q}$, $\\vec{r}$ - линейно-независимы, определитель $\\Delta$ не обращается в ноль \\begin{equation} \\Delta \\ne 0 \\end{equation}</p>";
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

    values[0].push([6,12,-1, 1,3,0, 2,-1,1, 0,-1,2]);
    values[0].push([-3,12,16, 4,1,1, 2,0,-3, -1,2,1]);
    values[1].push([0,3,-5, 5,1,0, 2,-1,3, 1,0,-1]);
    values[1].push([3,-3,4, 1,0,2, 0,1,1, 2,-1,4]);
    values[1].push([-1,7,-4, -1,2,1, 2,0,3, 1,1,-1]);
    values[1].push([6,-1,7, 1,-2,0, -1,1,3, 1,0,4]);
    values[1].push([2,-1,11, 1,1,0, 0,1,-2, 1,0,3]);
    values[1].push([8,0,5, 2,0,1, 1,1,0, 4,1,2]);
    values[1].push([8,1,12, 1,2,-1, 3,0,2, -1,1,1]);
    values[1].push([-5,9,-13, 0,1,-2, 3,-1,1, 4,1,0]);
    values[1].push([8,9,4, 1,0,1, 0,-2,1, 1,3,0]);
    values[1].push([3,1,3, 2,1,0, 1,0,1, 4,2,1]);
    values[1].push([11,-1,6, 1,-1,2, 3,2,1, -1,1,1]);
    values[1].push([0,-8,9, 0,-2,1, 3,1,-1, 4,0,1]);
    values[1].push([15,-20,1, 0,2,1, 0,1,1, 5,-3,2]);
    values[1].push([15,-20,0, 1,3,0, 2,-1,1, 0,-1,2]);
    values[2].push([0,-7,9, 4,1,1, 2,0,-3, -1,2,1]);
    values[2].push([10,-1,5, 5,1,0, 2,-1,3, 1,0,-1]);
    values[2].push([3,1,3, 1,0,2, 0,1,1, 2,-1,4]);
    values[2].push([7,9,3, -1,2,1, 2,0,3, 1,1,-1]);
    values[2].push([-5,1,-13, 1,-2,0, -1,1,3, 1,0,4]);
    values[2].push([8,1,12, 1,1,0, 0,1,-2, 1,0,3]);
    values[2].push([8,0,5, 2,0,1, 1,1,0, 4,1,2]);
    values[2].push([4,-1,11, 1,2,-1, 3,0,2, -1,1,1]);
    values[2].push([5,-1,7, 0,1,-2, 3,-1,1, 4,1,0]);
    values[2].push([-1,7,-4, 1,0,1, 0,-2,1, 1,3,0]);
    values[2].push([3,-3,4, 2,1,0, 1,0,1, 4,2,1]);
    values[2].push([0,5,-5, 1,-1,2, 3,2,1, -1,1,1]);
    values[2].push([-2,12,-10, 0,-2,1, 3,1,-1, 4,0,-1]);
    values[2].push([6,12,-3, 0,2,1, 1,1,-1, 5,3,0]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '$\\vec a$: (<span id="veca"></span>)<br>';
    variants += '$\\vec p$: (<span id="vecp"></span>)<br>';
    variants += '$\\vec q$: (<span id="vecq"></span>)<br>';
    variants += '$\\vec r$: (<span id="vecr"></span>)<br>';
     $("#variants").html(variants);

    var answer = '';
    answer += '<table style="text-align: center">';
    answer += '<tr>';
    answer += '<td>$\\alpha$</td>';
    answer += '<td>$\\beta$</td>';
    answer += '<td>$\\gamma$</td>';
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
            var ansText = parseFloat($("#ans1").val()).toFixed(2)+","+parseFloat($("#ans2").val()).toFixed(2)+","+parseFloat($("#ans3").val()).toFixed(2);
            $("#filetext").append(ansText); 
        }
    }
}
function handOver() {
    if (!example_id) {alert("Ошибка! Не получен идентификатор задачи.");return;}
    var ansText = parseFloat($("#ans1").val()).toFixed(2)+","+parseFloat($("#ans2").val()).toFixed(2)+","+parseFloat($("#ans3").val()).toFixed(2);
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
    for (var i = 1; i < 4; i++) {
        vec3.set([cval[i*3],cval[i*3+1],cval[i*3+2]], points[i].coord1);
    }
    vec3.set([cval[0],cval[1],cval[2]], points[4].coord1);
    $("#veca").html([cval[0],cval[1],cval[2]].join(';'));
    $("#vecp").html([cval[3],cval[4],cval[5]].join(';'));
    $("#vecq").html([cval[6],cval[7],cval[8]].join(';'));
    $("#vecr").html([cval[9],cval[10],cval[11]].join(';'));
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    initBuffers();
}
var ans = [];
var katveca1 = katex.renderToString("\\vec p");
var katveca2 = katex.renderToString("\\vec q");
var katveca3 = katex.renderToString("\\vec r");
var katveca1al = katex.renderToString("\\alpha\\vec p");
var katveca2al = katex.renderToString("\\beta\\vec q");
var katveca3al = katex.renderToString("\\gamma\\vec r");
var katveca = katex.renderToString("\\vec a");
var ansall = "";
function initData() {
    var arrRad = 2;
    var arrRad1 = 1;
    var lineRad = 1;
    var chosenPointRad = 5;

    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:points[0].coord1});
    
    primitives.push({class:"arrow", text: katveca1, arr0:points[0].coord1, arr1:points[1].coord1, rad:arrRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katveca2, arr0:points[0].coord1, arr1:points[2].coord1, rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katveca3, arr0:points[0].coord1, arr1:points[3].coord1, rad:arrRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katveca, arr0:points[0].coord1, arr1:points[4].coord1, rad:arrRad, color:[0.7, 0.7, 0.0, 1.0]});

    if (showSolution) {
        var v = [[],[],[]];
        for (var i = 0; i < 3; i++) {
            vec3.subtract(points[i+1].coord1,points[0].coord1,v[i]);
        }
        var matrInv = mat3.create([v[0][0],v[0][1],v[0][2],v[1][0],v[1][1],v[1][2],v[2][0],v[2][1],v[2][2]]);
        var matrInv4 = mat3.toMat4(matrInv);
        var det = mat4.determinant(matrInv4);
        var vecsum = [0,0,0,0];
        if (Math.abs(det) < 0.1) {
            $("#err").text("Ошибка. Базис линейно зависимый.");
            vec3.set([0,0,0],ans);
        } else {
            $("#err").text("");
            mat4.inverse(matrInv4);
            vec3.subtract(points[4].coord1,points[0].coord1,vecsum);
            var vecAlpha = [];
            mat4.multiplyVec4(matrInv4,vecsum,vecAlpha);
            vec3.set(vecAlpha,ans);
        }

        $("#ans1").val(ans[0].toFixed(2));
        $("#ans2").val(ans[1].toFixed(2));
        $("#ans3").val(ans[2].toFixed(2));
        
        for (var i = 0; i < 3; i++) {
            vec3.scale(v[i],ans[i]);
            vec3.add(vecsum,v[i]);
        }

        vec3.add(vecsum,points[0].coord1);
        vec3.add(v[0],points[0].coord1);
        vec3.add(v[1],v[0]);
        vec3.add(v[2],v[1]);
          
        primitives.push({class:"arrow", text: katveca1al, arr0:points[0].coord1, arr1:v[0], rad:arrRad1, color:[0.8, 0.0, 0.0, 1.0]});
        primitives.push({class:"arrow", text: katveca2al, arr0:v[0], arr1:v[1], rad:arrRad1, color:[0.0, 0.8, 0.0, 1.0]});
        primitives.push({class:"arrow", text: katveca3al, arr0:v[1], arr1:v[2], rad:arrRad1, color:[0.0, 0.0, 0.8, 1.0]});
    }

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
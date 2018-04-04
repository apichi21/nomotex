var dimention="3d";
function initPoints() {
    points = [];    
    points.push({coord1: vec3.create([0,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
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

    $("Title").html("ЛА Задача 2");
    var conditions = "Рассмотрим векторы $\\vec{e}'_1,\\vec{e}'_2,\\vec{e}'_3$, заданные своими координатами в некотором исходном базисе $\\vec{e}_1,\\vec{e}_2,\\vec{e}_3$ пространства $\\mathbb{R}^3$. Выбирая в качестве нового базиса векторы $\\vec{e}'_1,\\vec{e}'_2,\\vec{e}'_3$, вычислить:<br>а) координаты вектора $\\vec b$ в исходном базисе, зная его координаты в новом базисе;<br>б) координаты вектора $\\vec c$ в новом базисе, зная его координаты в исходном базисе.<br>Ответ дать с точностью до 2-го знака после запятой";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
        var algorithm = "<p>а) Запишем разложение векторов $\\vec{e}'_1,\\vec{e}'_2,\\vec{e}'_3$ по исходному базису $\\vec{e}_1,\\vec{e}_2,\\vec{e}_3$  $$  \\begin{matrix}  \\vec{e}'_1=u_{11}\\vec{e}_1+u_{21}\\vec{e}_2+u_{31}\\vec{e}_3, \\\\  \\vec{e}'_2=u_{12}\\vec{e}_1+u_{22}\\vec{e}_2+u_{32}\\vec{e}_3, \\\\  \\vec{e}'_3=u_{13} \\vec{e}_1+u_{23} \\vec{e}_2+u_{33} \\vec{e}_3, \\\\  \\end{matrix}  $$  где $u_{11}, u_{12},...$ &mdash; коэффициенты разложения.</p>"
        algorithm += "<p>Тогда матрица перехода $U$ от базиса $\\vec{e}_1,\\vec{e}_2,\\vec{e}_3$ к базису $\\vec{e}'_1,\\vec{e}'_2,\\vec{e}'_3$ имеет вид  $$  U = \\left(\\begin{matrix}  u_{11} & u_{12} & u_{13} \\\\  u_{21} & u_{22} & u_{23} \\\\  u_{31} & u_{32} & u_{33} \\\\  \\end{matrix}\\right)  $$</p>";
        algorithm += "<p>Введем следующие обозначения  $$  B=\\left(\\begin{matrix}  b_1 \\\\  b_2 \\\\  b_3 \\\\  \\end{matrix}\\right)  $$  столбец координат вектора $\\vec b$ в исходном базисе, а</p>";
        algorithm += "<p>$$  B'=\\left(\\begin{matrix}  {b}'_1 \\\\  {b}'_2 \\\\  {b}'_3 \\\\  \\end{matrix}\\right)  $$  столбец координат вектора $\\vec b$ в новом базисе.</p>";
        algorithm += "<p>Известно, что   $$  B=UB'  $$</p>";
        algorithm += "<p>C помощью этой формулы находим $B$, если известно $B'$.</p>";
        algorithm += "<p>б) Обозначая столбцы координат вектора $\\vec c$ исходном и новом базисе соответственно  $$  C=\\left(\\begin{matrix}  c_1 \\\\  c_2 \\\\  c_3 \\\\  \\end{matrix}\\right),  C'=\\left(\\begin{matrix}  c'_1 \\\\  c'_2 \\\\  c'_3 \\\\  \\end{matrix}\\right)  $$</p>";
        algorithm += "<p>по той же формуле $$  C=UC'  $$</p>";
        algorithm += "<p>тогда  $$  C'=U^{-1} C  $$</p>";
        algorithm += "<p>Вычислив обратную матрицу $U^{-1}$, с помощью этой формулы находим $C'$, если известно $C$.</p>";

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

    values[0].push([1, 2, -1, 1, 0, 1, 0, 1, 1, 1, 2, -1, 1, 7, 0]);
    values[0].push([2, 1, 0, 0, 1, 3, 1, 2, 1, 1, 0, 2, 3, 5, 0]);
    values[1].push([0, 1, -1, 1, 2, 0, 3, 1, 2, 0, 3, 1, 1, 6, -4]);
    values[1].push([3, 1, 0, 2, 1, 4, 2, 0, 1, 2, 1, 0, -2, -1, 5]);
    values[1].push([1, 1, 3, 3, -2, 0, -1, 1, 1, 1, -1, 3, 1, 2, 4]);
    values[1].push([2, 1, -1, 0, 1, 2, 1, 1, 0, 1, 3, 2, 5, 2, -3]);
    values[1].push([0, 1, -1, 1, 0, 1, 1, 1, 1, 3, 0, -2, 1, 1, 0]);
    values[1].push([2, 0, 1, 1, 1, 0, 0, -1, 2, 1, 1, -2, 2, 3, -2]);
    values[1].push([1, 1, 0, 1, 0, 1, 0, 1, 2, -1, 3, -2, 2, 5, 3]);
    values[1].push([0, 1, -1, 1, 1, 0, 1, 2, 1, 0, 2, -1, 2, 3, -1]);
    values[1].push([1, 1, 0, 1, -1, 1, 0, 1, 1, 1, 2, -1, 1, 4, 0]);
    values[1].push([1, 0, -1, 0, 2, 1, 1, 1, 0, 3, 2, 0, 1, 6, 2]);
    values[1].push([2, 1, 0, 0, 1, 1, 1, -1, 0, 1, 0, 2, -1, 2, 1]);
    values[1].push([1, 1, 1, 1, -1, 0, 0, 1, 1, 1, 2, 0, 3, 4, 5]);
    values[1].push([1, 0, 2, 2, 1, 0, 0, 1, 1, 0, 1, -2, 1, -1, 3]);
    values[1].push([1, 1, 1, 1, 3, 2, 1, -2, -3, 5, 10, -7, 2, 1, -1]);
    values[2].push([2, 4, 2, 5, 3, 3, -8, -9, -5, 1, 0, 5, 8, 9, 7]);
    values[2].push([8, 3, 4, 5, 2, 3, 2, 1, 1, 1, 1, -1, 21, 10, 8]);
    values[2].push([1, 3, 0, 2, 2, 2, 1, -1, 1, 1, 1, 3, 8, 20, 1]);
    values[2].push([2, 3, 1, -3, -1, -4, 1, 5, 3, 3, -4, 1, 2, -4, 6]);
    values[2].push([2, 5, 1, 1, 3, 4, 3, 2, 3, 1, 1, 3, -8, -25, 1]);
    values[2].push([4, -3, 5, 3, -2, 8, 1, -7, -5, 1, 2, -1, -8, -1, -29]);
    values[2].push([3, 2, -4, 4, 1, -2, 5, 2, -3, 2, 0, 1, -7, -4, 5]);
    values[2].push([1, 2, 1, 2, 3, 2, 4, 5, 3, -1, -1, -1, 3, 5, 3]);
    values[2].push([1, 1, 1, 1, 2, 3, 1, 3, 6, 3, 2, -3, 8, 10, 13]);
    values[2].push([0, 1, 1, 1, 0, 1, 1, 1, 0, 5, -2, -1, 0, 2, 0]);
    values[2].push([5, 0, 7, 6, 1, 4, 3, 0, 5, 1, 0, 1, -5, -3, 7]);
    values[2].push([2, 7, 6, 0, 1, 0, 3, 6, 5, 1, 1, 2, 10, 16, 14]);
    values[2].push([1, 1, 2, -2, 3, 0, 1, 1, 0, 1, 1, -5, -7, 8, 0]);
    values[2].push([2, -1, 1, 2, 0, 2, 3, 0, 1, 2, 0, 1, 9, -3, 8]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '$\\vec{e}\'_1$: (<span id="vece1"></span>)<br>';
    variants += '$\\vec{e}\'_2$: (<span id="vece2"></span>)<br>';
    variants += '$\\vec{e}\'_3$: (<span id="vece3"></span>)<br>';
    variants += '$\\vec b$: (<span id="vecb"></span>)<br>';
    variants += '$\\vec c$: (<span id="vecc"></span>)<br>';
     $("#variants").html(variants);

    var answer = '';
    answer += '$\\vec b$: <input type="text" id="ans1" size=3>;<input type="text" id="ans2" size=3>;<input type="text" id="ans3" size=3><br>';
    answer += '$\\vec c$: <input type="text" id="ans4" size=3>;<input type="text" id="ans5" size=3>;<input type="text" id="ans6" size=3><br>';
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
            var ansText = parseFloat($("#ans1").val()).toFixed(2)+","+parseFloat($("#ans2").val()).toFixed(2)+","+parseFloat($("#ans3").val()).toFixed(2)+","+parseFloat($("#ans4").val()).toFixed(2)+","+parseFloat($("#ans5").val()).toFixed(2)+","+parseFloat($("#ans6").val()).toFixed(2);
            $("#filetext").append(ansText); 
        }
    }
}
function handOver() {
    if (!example_id) {alert("Ошибка! Не получен идентификатор задачи.");return;}
    var ansText = parseFloat($("#ans1").val()).toFixed(2)+","+parseFloat($("#ans2").val()).toFixed(2)+","+parseFloat($("#ans3").val()).toFixed(2)+","+parseFloat($("#ans4").val()).toFixed(2)+","+parseFloat($("#ans5").val()).toFixed(2)+","+parseFloat($("#ans6").val()).toFixed(2);
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
    for (var i = 0; i < 5; i++) {
        vec3.set([cval[i*3],cval[i*3+1],cval[i*3+2]], points[i+1].coord1);
    }
    $("#vece1").html([cval[0],cval[1],cval[2]].join(';'));
    $("#vece2").html([cval[3],cval[4],cval[5]].join(';'));
    $("#vece3").html([cval[6],cval[7],cval[8]].join(';'));
    $("#vecb").html([cval[9],cval[10],cval[11]].join(';'));
    $("#vecc").html([cval[12],cval[13],cval[14]].join(';'));
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    initBuffers();
}
function Determinant(A)   // Используется алгоритм Барейса, сложность O(n^3)
{
    var N = A.length, B = [], denom = 1, exchanges = 0;
    for (var i = 0; i < N; ++i)
     { B[i] = [];
       for (var j = 0; j < N; ++j) B[i][j] = A[i][j];
     }
    for (var i = 0; i < N-1; ++i)
     { var maxN = i, maxValue = Math.abs(B[i][i]);
       for (var j = i+1; j < N; ++j)
        { var value = Math.abs(B[j][i]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { var temp = B[i]; B[i] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       var value1 = B[i][i];
       for (var j = i+1; j < N; ++j)
        { var value2 = B[j][i];
          B[j][i] = 0;
          for (var k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[i][k]*value2)/denom;
        }
       denom = value1;
     }
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}
function AdjugateMatrix(A)   // A - двумерный квадратный массив
{                                        
    var N = A.length, adjA = [];
    for (var i = 0; i < N; i++)
     { adjA[i] = [];
       for (var j = 0; j < N; j++)
        { var B = [], sign = ((i+j)%2==0) ? 1 : -1;
          for (var m = 0; m < j; m++)
           { B[m] = [];
             for (var n = 0; n < i; n++)   B[m][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m][n-1] = A[m][n];
           }
          for (var m = j+1; m < N; m++)
           { B[m-1] = [];
             for (var n = 0; n < i; n++)   B[m-1][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m-1][n-1] = A[m][n];
           }
          adjA[i][j] = sign*Determinant(B);   // Функцию Determinant см. выше
        }
     }
    return adjA;
}
function InverseMatrix(A)   // A - двумерный квадратный массив
{   
    var det = Determinant(A);                // Функцию Determinant см. выше
    if (det == 0) return false;
    var N = A.length, A = AdjugateMatrix(A); // Функцию AdjugateMatrix см. выше
    for (var i = 0; i < N; i++)
     { for (var j = 0; j < N; j++) A[i][j] /= det; }
    return A;
}
var ans = [];
var katveca1 = katex.renderToString("\\vec{e}'_1");
var katveca2 = katex.renderToString("\\vec{e}'_2");
var katveca3 = katex.renderToString("\\vec{e}'_3");
var katvecb = katex.renderToString("\\vec b");
var katvecc = katex.renderToString("\\vec c");
function initData() {
    var arrRad = 2;
    var arrRad1 = 1;
    var lineRad = 1;
    var chosenPointRad = 5;

    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    primitives.push({class:"arrow", text: katveca1, arr0:points[0].coord1, arr1:points[1].coord1, rad:arrRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katveca2, arr0:points[0].coord1, arr1:points[2].coord1, rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katveca3, arr0:points[0].coord1, arr1:points[3].coord1, rad:arrRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katvecc, arr0:points[0].coord1, arr1:points[5].coord1, rad:arrRad, color:[0.0, 0.7, 0.7, 1.0]});

    if (showSolution) {
        var U = [[],[],[]];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                U[i][j] = points[j+1].coord1[i];
            }
        }
        var newb = vec3.create();
        for (var i = 0; i < 3; i++) {
            newb[i] = 0;
            for (var j = 0; j < 3; j++) {
                newb[i]+=U[i][j]*points[4].coord1[j];
            }
        }
        U = InverseMatrix(U);
        var newc = vec3.create();
        for (var i = 0; i < 3; i++) {
            newc[i] = 0;
            for (var j = 0; j < 3; j++) {
                newc[i]+=U[i][j]*points[5].coord1[j];
            }
        }
        primitives.push({class:"arrow", text: katvecb, arr0:points[0].coord1, arr1:newb, rad:arrRad, color:[0.7, 0.7, 0.0, 1.0]});

        $("#ans1").val(newb[0].toFixed(2));
        $("#ans2").val(newb[1].toFixed(2));
        $("#ans3").val(newb[2].toFixed(2));

        $("#ans4").val(newc[0].toFixed(2));
        $("#ans5").val(newc[1].toFixed(2));
        $("#ans6").val(newc[2].toFixed(2));
    }

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
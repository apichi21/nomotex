var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
}
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

    $("Title").html("ЛА Задача 1");

    var conditions = "Исследовать на линейную зависимость систему векторов $a_{i}$, $i=1, 2, 3$.";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
        var algorithm = "<p>Пусть векторы $a_{i}$ заданы своими координатами в некотором ортонормированном базисе. Обозначим координатные столбцы этих векторов следующим образом: $a_{i}=(a_{i1},a_{i2},a_{i3},a_{i4})^{T}$, $i=1, 2, 3$.</p>";
        algorithm += "<p>Составим матрицу $A$ из координатных столбцов $a_{i}$:$A = \\begin{pmatrix}a_{11} & a_{21} &  a_{31} \\\\a_{12} & a_{22} &  a_{32} \\\\      a_{13} & a_{23} &  a_{33} \\\\a_{14} & a_{24} &  a_{34} \\end{pmatrix}$</p>";
        algorithm += "<p>По теореме о необходимом и достаточном условии линейной независимости системы векторов <i> <b> (Th2.2) </b> </i> система векторов $a_{i}$, $i=1, 2, 3$ линейно независима тогда и только тогда, когда $\\operatorname{rang}(a_{i})$ этой системы равен 3.</p>";
        algorithm += "<p>По теореме о ранге системы векторов <i> <b> (Th2.1) </b> </i>  $\\operatorname{rang}(a_{i})=\\operatorname{rang}(A) $ - рангу матрицы $A$.</p>";
        algorithm += "<p>Вычислим $\\operatorname{rang}(A)$, используя метод элементарных преобразований (алгоритм Гаусса).</p>";
        algorithm += "<p>Известно, что $\\operatorname{rang}(A)=\\operatorname{rang}(A^{T})$. Будем работать со строками матрицы $A^{T}$, обозначив $I$ - первая строка, $II$ - вторая строка и т.д. Положим, что $a_{11}\\ne 0$, если это не так, меняем строки матрицы $A^{T}$ местами, пока не будет выполнено это условие. <br/>$A^{T} = \\begin{pmatrix}a_{11} & a_{12} &  a_{13} &  a_{14} \\\\     a_{21} & a_{22} &  a_{23} &  a_{24} \\\\     a_{31} & a_{32} &  a_{33} &  a_{34}  \\end{pmatrix}$ $\\begin{array} \\\\ I \\\\ II \\\\ III \\\\ \\end{array}$</p>";
        algorithm += "<p>Все $a_{i1}$ не могут быть равны нулю, так как по условию задачи векторы $a_{i}$ принадлежат четырехмерному пространству.</p>";
        algorithm += "<p>а) Строим новую матрицу $\\tilde{A}$, строки которой $\\tilde{I}$, $\\widetilde{II}$, $\\widetilde{III}$ образуются сложением строк $I$, $II$, $III$ матрицы $A^{T}$ <br> $\\tilde{I}=I$  <br> $\\widetilde{II}=II-(a_{21}/a_{11})*I$  <br>$ \\widetilde{III}=III-(a_{31}/a_{11})*I$</p>";
        algorithm += "<p>В результате получаем матрицу $\\tilde{A}$: <br> $\\tilde{A} = \\begin{pmatrix}a_{11} & a_{12} &  a_{13} &  a_{14} \\\\  0 & \\tilde{a_{22}} &  \\tilde{a_{23}} &  \\tilde{a_{24}} \\\\   0 & \\tilde{a_{32}} &  \\tilde{a_{33}} &  \\tilde{a_{34}} \\\\    \\end{pmatrix}$ $\\begin{array} \\\\ \\tilde{I} \\\\ \\widetilde{II} \\\\ \\widetilde{III} \\\\ \\end{array}$</p>";
        algorithm += "<p>Проверяем выполнение условий $\\tilde{a_{22}}\\ne 0$ и $\\tilde{a_{32}}\\ne 0$. В зависимости от результата действуем по следующему алгоритму: <br>1) $j=2$ <br>2) $\\tilde{a_{2j}}\\ne 0 \\to$ переходим к б) <br>3) $\\tilde{a_{2j}}=0$, $\\tilde{a_{3j}}\\ne 0 \\to$ строки $\\widetilde{II}$ и $\\widetilde{III}$ меняем местами и переходим к б)<br>4) $\\tilde{a_{2j}}=0$, $\\tilde{a_{3j}}=0$ $\\to j=j+1$ <br> 5) Если $j<4 \\to$ повторяем алгоритм по пунктам 2-5<br> Если $j=4 \\to \\operatorname{rang}(A)<3$, алгоритм завершен.</p>";
        algorithm += "<p>б)  Строим новую матрицу $\\tilde{\\tilde{A}}$, строки которой $\\tilde{\\tilde{I}}$, $\\widetilde{\\widetilde{II}}$, $\\widetilde{\\widetilde{III}}$    образуются сложением строк $\\tilde{I}$, $\\widetilde{II}$, $\\widetilde{III}$ матрицы $\\tilde{A}$: <br>$\\tilde{\\tilde{I}}=\\tilde{I}$ <br>$\\widetilde{\\widetilde{II}}=\\widetilde{II}$ <br>$\\widetilde{\\widetilde{III}}=\\widetilde{III}-(\\frac{\\tilde{a_{3j}} \\widetilde{II}}{\\tilde{a_{2j}}})$, $j=2$ или $j=3$ <br> Индекс $j$ найден на этапе а).</p>";
        algorithm += "<p>В результате получим матрицу $\\tilde{\\tilde{A}}$: <br>$j=2$ <br>$\\tilde{\\tilde{A}} = \\begin{pmatrix}a_{11} & a_{12} &  a_{13} &  a_{14} \\\\  0 & \\tilde{a_{22}} &  \\tilde{a_{23}} &  \\tilde{a_{24}} \\\\0 & 0 &  \\tilde{\\tilde{a_{33}}} &  \\tilde{\\tilde{a_{34}}} \\\\\\end{pmatrix}$,$\\tilde{a_{22}}\\ne 0$</p>";
        algorithm += "<p>или <br> $j=3$ <br> $\\tilde{\\tilde{A}} = \\begin{pmatrix}a_{11} & a_{12} &  a_{13} &  a_{14} \\\\ 0 & 0 &  \\tilde{a_{23}} &  \\tilde{a_{24}} \\\\0 & 0 &  0 &  \\tilde{\\tilde{a_{34}}} \\\\\\end{pmatrix}$</p>";
        algorithm += "<p>Проверяем выполнение условий:<br>  $\\tilde{\\tilde{a_{33}}}\\ne 0 \\to \\operatorname{rang}(A)=3$ <br>$\\tilde{\\tilde{a_{33}}}=0$, $\\tilde{\\tilde{a_{34}}}\\ne 0$ $\\to \\operatorname{rang}(A)=3$ <br>$\\tilde{\\tilde{a_{33}}}=0$, $\\tilde{\\tilde{a_{34}}}=0$ $\\to \\operatorname{rang}(A)<3$</p>";
        algorithm += "<p>в) Если $\\operatorname{rang}(A)<3$, то система $a_{i}$ линейно зависима. <br>Если $\\operatorname{rang}(A)=3$, то система $a_{i}$ линейно независима.</p>";
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

    values[0].push([5, 1,5,-3,0,2, 2,3,1,1,4, 3,1,2,-1,0]);
    values[0].push([4, 3,0,-1,2, 4,1,2,3, 2,-1,-4,-1]);
    values[1].push([5, 0,3,1,2,-1, 3,1,-2,0,1, 2,0,4,1,2]);
    values[1].push([5, 2,1,3,-5,0, 3,0,-1,2,1, 1,2,7,-12,1]);
    values[1].push([4, 1,3,-2,2, 2,6,-4,3, 3,9,-6,1]);
    values[1].push([6, 2,3,5,1,0,4, -3,1,0,-2,1,3, 5,2,5,3,-1,1]);
    values[1].push([5, 1,-1,0,1,3, 2,3,1,0,-2, 4,1,3,2,1]);
    values[1].push([5, 4,3,-1,2,0, 3,1,2,0,1, 2,-1,5,-2,2]);
    values[1].push([3, 2,5,1, 3,0,4, 1,-5,2]);
    values[1].push([3, 7,5,2, 3,1,2, 2,0,1]);
    values[1].push([5, 2,1,3,-2,0, 5,2,0,1,3, 1,3,4,2,1]);
    values[1].push([5, 2,5,1,0,4, 1,3,0,2,-1, 3,1,2,4,1]);
    values[1].push([4, 1,5,6,4, 3,1,7,2, 2,-4,1,-2]);
    values[1].push([4, 2,7,-2,1, 3,0,4,2, 1,2,1,-3]);
    values[1].push([5, 3,1,8,0,1, 1,2,3,-1,-2, 2,-1,5,1,3]);
    values[1].push([4, 1,2,-1,-2, 2,3,0,-1, 1,3,-1,0]);
    values[2].push([4, 2,3,4,5, -3,6,-6,-4, -3,3,-6,-5]);
    values[2].push([4, 1,2,3,4, 4,3,2,1, -1,1,3,5]);
    values[2].push([4, 2,-1,3,5, 4,-3,1,3, 3,-2,3,4]);
    values[2].push([4, 1,3,-1,2, 2,-1,3,5, 1,10,-6,1]);
    values[2].push([5, 2,-3,4,11,12, 0,1,0,3,4, 1,0,0,2,5]);
    values[2].push([4, 4,-1,3,-2, 3,-1,4,-2, 8,-2,6,-4]);
    values[2].push([4, 4,5,6,7, 3,4,5,6, 2,3,4,5]);
    values[2].push([4, 2,1,-3,1, 4,2,-6,2, 6,3,-9,3]);
    values[2].push([5, 1,2,3,4,1, 2,3,2,3,1, 3,4,3,4,1]);
    values[2].push([4, 5,2,-3,1, 4,1,-2,3, 1,1,-1,-2]);
    values[2].push([4, 1,2,3,-4, 2,3,-4,1, 3,-4,1,2]);
    values[2].push([4, 5,-3,2,4, 2,-1,3,5, 4,-3,-5,-7]);
    values[2].push([4, 8,7,4,5, 3,2,1,4, 2,3,2,-3]);
    values[2].push([5, 5,2,-1,3,4, 3,1,-2,3,5, 6,3,-2,4,7]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '$\\vec a_1$: (<span id="veca1"></span>)<br>';
    variants += '$\\vec a_2$: (<span id="veca2"></span>)<br>';
    variants += '$\\vec a_3$: (<span id="veca3"></span>)<br>';
    $("#variants").html(variants);

    var answer = 'Система векторов линейно зависима? <select id="ans"><option value="0">...</option><option value="1">Да</option><option value="2">Нет</option></select>';
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
            var ansText = "";
            if ($("#ans").val()=="1") {
                ansText = "yes";
            } else if ($("#ans").val()=="2") {
                ansText = "no";
            }
            $("#filetext").append(ansText); 
        }
    }
}
function handOver() {
    if (!example_id) {alert("Ошибка! Не получен идентификатор задачи.");return;}
    var ansText = "";
    if ($("#ans").val()=="1") {
        ansText = "yes";
    } else if ($("#ans").val()=="2") {
        ansText = "no";
    }
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
var veca = [[],[],[]];
function changeVariant(newVar) {
    var newVarSplit = newVar.split(',');
    chosenVariant = parseInt(newVarSplit[1],10);
    var cval = values[parseInt(newVarSplit[0],10)][chosenVariant];
    var strveca1 = '';
    veca[0] = [];
    for (var i = 0; i < cval[0]; i++) {
        if (i!=0) {strveca1 += "; ";}
        strveca1 += cval[i+1];
        veca[0].push(cval[i+1]);
    }
    var strveca2 = '';
    veca[1] = [];
    for (var i = 0; i < cval[0]; i++) {
        if (i!=0) {strveca2 += "; ";}
        strveca2 += cval[cval[0]+i+1];
        veca[1].push(cval[cval[0]+i+1]);
    }
    var strveca3 = '';
    veca[2] = [];
    for (var i = 0; i < cval[0]; i++) {
        if (i!=0) {strveca3 += "; ";}
        strveca3 += cval[cval[0]*2+i+1];
        veca[2].push(cval[cval[0]*2+i+1]);
    }
    $("#veca1").html(strveca1);
    $("#veca2").html(strveca2);
    $("#veca3").html(strveca3);

    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    initBuffers();
}
var ans;
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
function MatrixRank(A)
{
    var m = A.length, n = A[0].length, k = (m < n ? m : n), r = 1, rank = 0;
    while (r <= k)
     { var B = [];
       for (var i = 0; i < r; i++) B[i] = [];
       for (var a = 0; a < m-r+1; a++)
        { for (var b = 0; b < n-r+1; b++)
           { for (var c = 0; c < r; c++)
              { for (var d = 0; d < r; d++) B[c][d] = A[a+c][b+d]; }
             if (Determinant(B) != 0) rank = r;
           }       // Функцию Determinant см. выше
        }
       r++;
     }
    return rank;
}
function initData() {
    primitives.push({class:"text", text: katex.renderToString("x_1"), arr0:[5,0,0]});
    primitives.push({class:"text", text: katex.renderToString("x_2"), arr0:[0,5,0]});
    primitives.push({class:"text", text: katex.renderToString("x_3"), arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});
    // isShowAxes = false;
    // isShowGrid = false;
    var vec4d = vec3.create([1,1,1]);
    vec3.normalize(vec4d);
    var vec5d = vec3.create([-2,1,1]);
    vec3.normalize(vec5d);
    var vec6d = vec3.create([0,-1,1]);
    vec3.normalize(vec6d);

    if (veca[0].length>3) {
        var arr4d1 = [];
        var arr4d2 = [];
        vec3.scale(vec4d, -5, arr4d1);
        vec3.scale(vec4d, 5, arr4d2);
        var arr5d1 = [];
        var arr5d2 = [];
        vec3.scale(vec5d, -5, arr5d1);
        vec3.scale(vec5d, 5, arr5d2);
        var arr6d1 = [];
        var arr6d2 = [];
        vec3.scale(vec6d, -5, arr6d1);
        vec3.scale(vec6d, 5, arr6d2);

        primitives.push({class:"arrow", text: "", arr0:arr4d1, arr1:arr4d2, rad:1, color:[0.3, 0.3, 0.3, 1.0]});
        primitives.push({class:"text", text: katex.renderToString("x_4"), arr0:arr4d2});
        for (var i = 0; i < 9; i++) {
            var dash = [];
            var dash1 = [];
            var dash2 = [];
            vec3.scale(vec4d, i+1, dash);
            vec3.add(dash, arr4d1);
            vec3.add(dash, arr5d1, dash1);
            vec3.add(dash, arr5d2, dash2);
            primitives.push({class:"dash", text: "", arr0:dash1, arr1:dash2, rad:1, color:[0.3, 0.3, 0.3, 1.0]});
        }
        if (veca[0].length>4) {
            primitives.push({class:"arrow", text: "", arr0:arr5d1, arr1:arr5d2, rad:1, color:[0.3, 0.3, 0.3, 1.0]});
            primitives.push({class:"text", text: katex.renderToString("x_5"), arr0:arr5d2});
            for (var i = 0; i < 9; i++) {
                var dash = [];
                var dash1 = [];
                var dash2 = [];
                vec3.scale(vec5d, i+1, dash);
                vec3.add(dash, arr5d1);
                vec3.add(dash, arr4d1, dash1);
                vec3.add(dash, arr4d2, dash2);
                primitives.push({class:"dash", text: "", arr0:dash1, arr1:dash2, rad:1, color:[0.3, 0.3, 0.3, 1.0]});
            }
            if (veca[0].length>5) {
                primitives.push({class:"arrow", text: "", arr0:arr6d1, arr1:arr6d2, rad:1, color:[0.3, 0.3, 0.3, 1.0]});
                primitives.push({class:"text", text: katex.renderToString("x_6"), arr0:arr6d2});
                for (var i = 0; i < 9; i++) {
                    var dash = [];
                    var dash1 = [];
                    var dash2 = [];
                    vec3.scale(vec6d, i+1, dash);
                    vec3.add(dash, arr6d1);
                    vec3.add(dash, arr5d1, dash1);
                    vec3.add(dash, arr5d2, dash2);
                    primitives.push({class:"dash", text: "", arr0:dash1, arr1:dash2, rad:1, color:[0.3, 0.3, 0.3, 1.0]});
                }
            }
        }
    }
    
    if (showSolution) {
    vec3.set(veca[0],points[1].coord1);
    vec3.set(veca[1],points[2].coord1);
    vec3.set(veca[2],points[3].coord1);
    var tempvec;
    for (var i = 0; i < 3; i++) {
        tempvec = [];
        vec3.scale(vec4d, veca[i][3], tempvec);
        vec3.set(tempvec,points[4+i].coord1);
        if (veca[i].length>4) {
            vec3.scale(vec5d, veca[i][4], tempvec);
            vec3.add(points[4+i].coord1,tempvec);
            if (veca[i].length>5) {
                vec3.scale(vec6d, veca[i][4], tempvec);
                vec3.add(points[4+i].coord1,tempvec);
            }
        }
        vec3.add(points[4+i].coord1, points[1+i].coord1);
    }

    primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:points[2].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:points[3].coord1, rad:2, color:[0.0, 0.0, 1.0, 1.0]});

    primitives.push({class:"arrow", text: katex.renderToString("\\vec a_1"), arr0:points[1].coord1, arr1:points[4].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a_2"), arr0:points[2].coord1, arr1:points[5].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a_3"), arr0:points[3].coord1, arr1:points[6].coord1, rad:2, color:[0.0, 0.0, 1.0, 1.0]});

        var C = MatrixRank(veca);

        var ans = C.toFixed(0)!="3";
        if (ans) {
            $("#ans [value='1']").prop("selected", true);
        } else {
            $("#ans [value='2']").prop("selected", true);
        }
    }

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
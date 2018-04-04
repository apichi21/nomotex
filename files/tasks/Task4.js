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

    $("Title").html("Задача 4");

    var conditions = "Найти $Пр_{\\vec y}\\vec x$ &mdash; проекцию вектора $\\vec x$ на направление, задаваемое вектором $\\vec y$, которые имеют следующий вид $$\\vec x = \\alpha\\vec a+\\beta\\vec b+\\gamma\\vec c,\\vec y = \\delta\\vec a+\\varepsilon\\vec b+\\sigma \\vec c, $$ где $\\alpha, \\beta, \\gamma, \\delta, \\varepsilon, \\sigma$ &mdash; действительные числа, а векторы $\\vec a, \\vec b, \\vec c$ заданы своими координатами в базисе $\\vec i\\vec j\\vec k$. $$ \\vec a = \\{a_{1};a_{2};a_{3}\\}, \\vec b = \\{b_{1};b_{2};b_{3}\\}, \\vec c = \\{c_{1};c_{2};c_{3}\\} $$ Ответ дать с точностью до 2-го знака после запятой<br>";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
        var algorithm = "<p>Используем формулу \\begin{equation} \\label{projection} Пр_{\\vec y}\\vec x=\\frac{(\\vec x,\\vec y)}{|\\vec y|} \\end{equation}</p>";
        algorithm += "<p>Вычисляем, используя формулу скалярного произведения: \\begin{equation} \\begin{split} (\\vec x,\\vec y)=(\\alpha\\vec a+\\beta\\vec b+\\gamma\\vec c,\\delta\\vec a+\\varepsilon\\vec b+\\sigma \\vec c)=\\\\ =\\alpha\\delta|\\vec a|^{2}+\\beta\\varepsilon|\\vec b|^{2}+\\gamma\\sigma|\\vec c|^{2}+(\\alpha\\varepsilon+\\beta\\delta)(\\vec a,\\vec b)\\\\ +(\\alpha\\sigma+\\gamma\\delta)(\\vec a,\\vec c)+(\\beta\\sigma+\\gamma\\varepsilon)(\\vec b,\\vec c) \\end{split}\\label{x_dot_y} \\end{equation}</p>";
        algorithm += "<p>Вычисляем скалярные произведения и длины: \\begin{equation} \\begin{split} (\\vec a,\\vec b)=a_{1}b_{1}+a_{2}b_{2}+a_{3}b_{3}, |\\vec a|^{2}=a_{1}^{2}+a_{2}^{2}+a_{3}^{2}\\\\ (\\vec a,\\vec c)=a_{1}c_{1}+a_{2}c_{2}+a_{3}c_{3}, |\\vec b|^{2}=b_{1}^{2}+b_{2}^{2}+b_{3}^{2}\\\\ (\\vec b,\\vec c)=b_{1}c_{1}+b_{2}c_{2}+b_{3}c_{3}, |\\vec c|^{2}=c_{1}^{2}+c_{2}^{2}+c_{3}^{2} \\end{split}\\label{abc_dot_abc} \\end{equation}</p>";
        algorithm += "<p>Находим \\begin{equation} \\begin{split} |\\vec y|^{2}=(\\vec y,\\vec y)=(\\delta\\vec a+\\varepsilon\\vec b+\\sigma \\vec c,\\delta\\vec a+\\varepsilon\\vec b+\\sigma \\vec c)=\\\\=\\delta^{2}|\\vec a|^{2}+\\varepsilon^{2}|\\vec b|^{2}+\\sigma^{2}|\\vec c|^{2}+\\\\+2\\delta\\varepsilon(\\vec a,\\vec b)+2\\varepsilon\\sigma(\\vec b,\\vec c)+2\\delta\\sigma(\\vec a,\\vec c). \\end{split}\\label{y_dot_y} \\end{equation}</p>";
        algorithm += "<p>Подставляем&nbsp;\\eqref{abc_dot_abc} в&nbsp;\\eqref{x_dot_y} и&nbsp;\\eqref{y_dot_y}, а затем полученные формулы в&nbsp;\\eqref{projection}.</p>";
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

    values[0].push([1,1,0, 0, 0, 1, 3, -6, -1, 1, 4, -5, 3, -4, 12]);
    values[0].push([3,-2,0 , 0, 0, 1, -2, 1, 1, 1, 5, 0, 4, 4, -2]);
    values[1].push([0,1,1, 1, 0, 0, 1, -4, 8, 4, 4, -2, 2, 3, 6]);
    values[1].push([0,0,1, 1, 1, 0, -3, 0, 1, 5, 2, -4, 2, 3, 4]);
    values[1].push([3,0,-1, 0, 1, 0, 1, -1, 2, 2, -2, 1, 4, -1, 3]);
    values[1].push([0,0,1, 1, -1, 0, 0, -2, 4, 2, 0, -1, -2, 0, 2]);
    values[1].push([0,2,3, 1, 0, 0, 4, 2, -2, 1, 0, -2, 0, 4, -2]);
    values[1].push([1,-3,0, 0, 0, 1, 2, 2, 2, 0, 4, 3, -3, 0, -4]);
    values[1].push([2,3,0, 0, 0, 1, 3, 2, -1, -1, 0, 2, 0, 4, -3]);
    values[1].push([1,-1,1, 0, 1, 0, 6, 8, -2, 1, 2, 3, -3, -7, 9]);
    values[1].push([1,0,0, 0, 1, -1, 6, -6, 2, 4, -3, -1, 0,1, 1]);
    values[1].push([0,1,2, 1, 0, 0, 4, 2, -4, 3, 2, 1, 1, 1, 4]);
    values[1].push([1,1,0, 1, 0, -1, 4, -4, 0, 1, -2, -3, 1, 4, 4]);
    values[1].push([1,-2,0, 0, 0, 1, -2, 0, 1, -1, 2, 2, 6, -2, 3]);
    values[1].push([0,1,-2, 1, 0, 0, -1, 4, 8, 4, -1, -3, 2, 0, -2]);
    values[1].push([0,1,-2, 1, 0, 0, 3, -6, -1, 1, 4, -5, 3, -4, 12]);
    values[2].push([1,-2,0, 0, 0, 1, -2, 1, 1, 1, 5, 0, 4, 4, -2]);
    values[2].push([1,1,0, 1, 0, -1, 1, -4, 8, 4, 4, -2, 2, 3, 6]);
    values[2].push([0,1,2, 1, 0, 0, 1, 2, 0, 3, 0, -2, 0, -1, 4]);
    values[2].push([1,0,0, 0, 1, -1, 1, -1, 2, 2, -2, 1, 2, 3, -2]);
    values[2].push([1,-1,1, 0, 1, 0, 0, -2, 4, 2, 0, -1, -2, 0, 2]);
    values[2].push([2,3,0, 0, 0, 1, 4, 2, -2, 1, 0, -2, 0, 4, -2]);
    values[2].push([1,-3,0, 0, 0, 1, 2, 2, 2, 0, 4, 3, -3, 0, -4]);
    values[2].push([2,0,3, 0, 1, 0, 3, 2, -1, -1, 0, 2, 0, 4, -3]);
    values[2].push([0,0,1, 1, -1, 0, 6, 8, -2, 1, 2, 3, -3, -7, 9]);
    values[2].push([3,-1,0, 0, 1, 1, 0, -1, 2, 4, -3, 1, -2, 1, -2]);
    values[2].push([0,1,1, 1, 0, 0, 4, 2, -4, 3, 2, 1, 1, 1, 4]);
    values[2].push([3,-2,0, 0, 0, 1, 4, -4, 0, 1, -2, -3, 1, 4, 4]);
    values[2].push([1,1,0, 0, 0, 1, -2, 0, 1, -1, 2, 2, 6, -2, 3]);
    values[2].push([2,0,1, 0, 1, 0, 1, 2, -1, 0, 4, -3, 2, -5, 0]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '$\\vec x$ = <span id="vecx"></span><br>';
    variants += '$\\vec y$ = <span id="vecy"></span><br>';
    variants += '$\\vec a$: (<span id="veca"></span>)<br>';
    variants += '$\\vec b$: (<span id="vecb"></span>)<br>';
    variants += '$\\vec c$: (<span id="vecc"></span>)<br>';
    $("#variants").html(variants);

    var answer = '$Пр_{\\vec y}\\vec x$ = <input type="text" id="ans" size=4>';
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
            var ansText = parseFloat($("#ans").val()).toFixed(2);
            $("#filetext").append(ansText);
        }
    }
}
function handOver() {
    if (!example_id) {alert("Ошибка! Не получен идентификатор задачи.");return;}
    var ansText = parseFloat($("#ans").val()).toFixed(2);
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
function linCombText(v1,v2,v3) {
    let text = "";
    if (v1 == 1) {
        text += "\\vec a";
    } else if (v1 == -1){
        text += "-\\vec a";
    } else if (v1 != 0){
        text += v1+"\\vec a";
    }
    if (v2 == 1) {
        if (text.length > 0) text += "+";
        text += "\\vec b";
    } else if (v2 == -1){
        text += "-\\vec b";
    } else if (v2 != 0){
        if (v2 > 0) {
            if (text.length > 0) text += "+";
            text += v2+"\\vec b";
        } else {
            text += v2+"\\vec b";
        }
    }
    if (v3 == 1) {
        if (text.length > 0) text += "+";
        text += "\\vec c";
    } else if (v3 == -1){
        text += "-\\vec c";
    } else if (v3 != 0){
        if (v3 > 0) {
            if (text.length > 0) text += "+";
            text += v3+"\\vec c";
        } else {
            text += v3+"\\vec c";
        }
    }
    // return katex.renderToString(text);
    return "$"+text+"$";
}
var chosenVariant = 0;
function changeVariant(newVar) {
    var newVarSplit = newVar.split(',');
    chosenVariant = parseInt(newVarSplit[1],10);
    var cval = values[parseInt(newVarSplit[0],10)][chosenVariant];
    for (var i = 0; i <= 1; i++) {
        vec3.set([cval[i*3]*cval[2*3]+cval[i*3+1]*cval[3*3]+cval[i*3+2]*cval[4*3],
            cval[i*3]*cval[2*3+1]+cval[i*3+1]*cval[3*3+1]+cval[i*3+2]*cval[4*3+1],
            cval[i*3]*cval[2*3+2]+cval[i*3+1]*cval[3*3+2]+cval[i*3+2]*cval[4*3+2]], points[i+1].coord1);
    }
    for (var i = 2; i <= 4; i++) {
        vec3.set([cval[i*3],cval[i*3+1],cval[i*3+2]], points[i+1].coord1);
    }
    $("#vecx").html(linCombText(cval[0],cval[1],cval[2])); //+"=("+points[1].coord1.join(';')+")"
    // MathJax.Hub.Queue(["Typeset",MathJax.Hub,"vecx"]);
    $("#vecy").html(linCombText(cval[3],cval[4],cval[5])); //+"=("+points[2].coord1.join(';')+")"
    // MathJax.Hub.Queue(["Typeset",MathJax.Hub,"vecy"]);
    $("#veca").html([cval[6],cval[7],cval[8]].join(';'));
    $("#vecb").html([cval[9],cval[10],cval[11]].join(';'));
    $("#vecc").html([cval[12],cval[13],cval[14]].join(';'));
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    initBuffers();
}
var ans;
function initData() {
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:points[0].coord1});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[3].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec b"), arr0:points[0].coord1, arr1:points[4].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec c"), arr0:points[0].coord1, arr1:points[5].coord1, rad:2, color:[0.0, 0.0, 1.0, 1.0]});

    if (showSolution) {
        primitives.push({class:"arrow", text: katex.renderToString("\\vec x"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2.1, color:[1.0, 0.0, 1.0, 1.0]});
        primitives.push({class:"arrow", text: katex.renderToString("\\vec y"), arr0:points[0].coord1, arr1:points[2].coord1, rad:2.1, color:[0.0, 1.0, 1.0, 1.0]});
        var arrProj = [];
        var arrtemp1 = [];
        var arrtemp2 = [];
        vec3.subtract(points[1].coord1,points[0].coord1,arrtemp1);
        vec3.subtract(points[2].coord1,points[0].coord1,arrtemp2);
        var dot = vec3.dot(arrtemp1,arrtemp2);
        var len = vec3.length(arrtemp2);
        $("#ans").val((dot/len).toFixed(2));
        vec3.scale(arrtemp2, dot/len/len, arrProj);
        vec3.add(arrProj,points[0].coord1);
        primitives.push({class:"line", text: katex.renderToString("\\text{Пр}_{\\vec y}\\vec x"), arr0:points[0].coord1, arr1:arrProj, rad:3, color:[0.7, 0.7, 0.0, 1.0]});
        // primitives.push({class:"line", text: "Пр(a)="+(dot/len).toPrecision(3), arr0:points[0], arr1:arrProj, rad:3, color:[0.7, 0.7, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:points[1].coord1, arr1:arrProj, rad:0.5, color:[0.0, 0.0, 0.0, 1.0]});

        primitives.push({class:"plane", text: "", arr0:points[0].coord1, arr1:arrProj, arr2:points[1].coord1, arr3:points[1].coord1, color:[0.0, 0.0, 0.0, 0.2]});
    }

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
}
var dimention="2d";
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

    $("Title").html("Задача 3");

    var conditions = "Найти косинус угла между векторами $\\vec{a}$ и $\\vec{b}$, заданными в виде $$ \\vec{a}=\\alpha \\vec{m} + \\beta \\vec{n} $$  $$ \\vec{b}=\\gamma \\vec{m} + \\delta \\vec{n} \\ $$ где $\\alpha, \\beta, \\gamma, \\delta$ &mdash; действительные числа, а $\\vec{m}$ и $\\vec{n}$ &mdash; векторы, о которых известны их длины ${|\\vec m|}$, ${|\\vec n|}$ и угол между ними $(\\widehat{\\vec m,\\vec n})$. Ответ дать с точностью до 5-го знака после запятой.";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
      var algorithm = "<p>Для вычисления косинуса угла $(\\widehat{\\vec a,\\vec b})$ используем формулу \\begin{equation} \\cos (\\widehat{\\vec a,\\vec b}) = \\frac{(\\vec a, \\vec b)}{{|\\vec a|}{|\\vec b|}} \\end{equation}</p>";
        algorithm += "<p>Вычислим вначале $(\\vec a, \\vec b)$, используя свойства скалярного произведения: \\begin{equation} \\begin{split} (\\vec a, \\vec b) = (\\alpha \\vec{m} + \\beta \\vec{n}, \\gamma \\vec{m} + \\delta \\vec{n}) = \\\\ = \\alpha \\gamma (\\vec m, \\vec m) + (\\alpha \\delta + \\beta \\gamma)(\\vec m, \\vec n) + \\beta \\delta (\\vec n, \\vec n) = \\\\ = \\alpha \\gamma {|\\vec m|}^2 + (\\alpha \\delta + \\beta \\gamma)|\\vec m| |\\vec n| \\cos (\\widehat{\\vec m,\\vec n}) + \\beta \\delta {|\\vec n|}^2 \\end{split} \\end{equation}</p>";
        algorithm += "<p>Вычислим теперь длины векторов \\begin{equation} \\begin{split} {|\\vec a|}^2 = (\\vec a, \\vec a) = (\\alpha \\vec{m} + \\beta \\vec{n}, \\alpha \\vec{m} + \\beta \\vec{n}) =\\\\ = \\alpha^2 {|\\vec m|}^2  + 2 \\alpha \\beta |\\vec m| |\\vec n| \\cos (\\vec m, \\vec n) + \\beta^2 |\\vec n|^2 \\end{split} \\end{equation}</p>";
        algorithm += "<p>Аналогично, \\begin{equation} {|\\vec b|}^2 = \\gamma^2 {|\\vec m|}^2  + 2 \\gamma \\delta |\\vec m| |\\vec n| \\cos (\\vec m, \\vec n) + \\delta^2 | \\vec n|^2 \\end{equation}</p>";
        algorithm += "<p>Подставляем (2), (3) и (4) в (1), получаем ответ.</p>";
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

    values[0].push([2 ,2, 1, -2, "", 1, "", 1, "\\frac{\\pi}{3}",Math.PI/3]);
    values[0].push([6, -3, 3, 2, "", 3, "", 5, "\\frac{\\pi}{3}",Math.PI/3]);
    values[1].push([3, 1, 7, -4, "", 1, "", 2, "\\frac{\\pi}{2}",Math.PI/2]);
    values[1].push([1, -1, 2, 4, "", 1, "", 1, "\\frac{2\\pi}{3}",2*Math.PI/3]);
    values[1].push([2, -1, 1, 1, "", 1, "", 5, "\\frac{\\pi}{3}",Math.PI/3]);
    values[1].push([4, 1, 1, -1, "", 3, "\\sqrt{2}", Math.sqrt(2), "\\frac{\\pi}{4}",Math.PI/4]);
    values[1].push([3, 2, 2, -1, "\\sqrt{2}", Math.sqrt(2), "", 4, "\\frac{3\\pi}{4}",3*Math.PI/4]);
    values[1].push([2, -3, 5, 1, "", 2, "", 3, "\\frac{\\pi}{2}",Math.PI/2]);
    values[1].push([4, -1, 1, 2, "\\sqrt{2}", Math.sqrt(2), "", 3, "\\frac{3\\pi}{4}",3*Math.PI/4]);
    values[1].push([1, 1, 5, -1, "\\sqrt{3}", Math.sqrt(3), "", 5, "\\frac{5\\pi}{6}", 5*Math.PI/6]);
    values[1].push([1, 3, 3, -1, "", 3, "", 5, "\\frac{2\\pi}{3}",2*Math.PI/3]);
    values[1].push([6, -1, 1, 1, "", 2, "\\sqrt{2}", Math.sqrt(2), "\\frac{\\pi}{4}",Math.PI/4]);
    values[1].push([3, 4, 1, -1, "", 3, "", 2, "\\frac{\\pi}{2}",Math.PI/2]);
    values[1].push([1, -2, 2, 1, "", 2, "\\sqrt{2}", Math.sqrt(2), "\\frac{3\\pi}{4}", 3*Math.PI/4]);
    values[1].push([1, 4, 2, -1, "", 7, "", 2, "\\frac{\\pi}{3}",Math.PI/3]);
    values[1].push([1, 2, 3, -2, "", 5, "", 2, "\\frac{\\pi}{3}",Math.PI/3]);
    values[2].push([1, -3, 2, 3, "", 4, "\\sqrt{2}", Math.sqrt(2), "\\frac{3\\pi}{4}",3*Math.PI/4]);
    values[2].push([5, 1, 3, -4, "\\sqrt{3}", Math.sqrt(3), "", 2, "\\frac{\\pi}{6}",Math.PI/6]);
    values[2].push([3, -1, 2, 4, "", 2, "\\sqrt{2}", Math.sqrt(2), "\\frac{\\pi}{4}",Math.PI/4]);
    values[2].push([1, -1, 1, 3, "", 3, "", 2, "\\frac{2\\pi}{3}", 2*Math.PI/3]);
    values[2].push([1, 4, 5, -1, "2\\sqrt{3}", 2*Math.sqrt(3), "", 1, "\\frac{5\\pi}{6}", 5*Math.PI/6]);
    values[2].push([3, 2, 1, -2, "\\sqrt{2}", Math.sqrt(2), "", 3, "\\frac{3\\pi}{4}", 3*Math.PI/4]);
    values[2].push([2, -3, 1, 5, "", 2, "\\sqrt{3}", Math.sqrt(3), "\\frac{\\pi}{6}",Math.PI/6]);
    values[2].push([1, -4, 2, 1, "\\sqrt{2}", Math.sqrt(2), "", 1, "\\frac{3\\pi}{4}",3*Math.PI/4]);
    values[2].push([3, 1, 1, -5, "", 3, "\\sqrt{2}", Math.sqrt(2), "\\frac{\\pi}{4}",Math.PI/4]);
    values[2].push([1, 5, 3, -1, "", 1, "", 3, "\\frac{\\pi}{3}",Math.PI/3]);
    values[2].push([1, -7, 1, 1, "", 2, "", 1, "\\frac{2\\pi}{3}", 2*Math.PI/3]);
    values[2].push([3, 5, 2, -1, "", 4, "\\sqrt{3}", Math.sqrt(3), "\\frac{5\\pi}{6}",5*Math.PI/6]);
    values[2].push([4, -3, 1, 2, "", 4, "", 4, "\\frac{\\pi}{3}",Math.PI/3]);
    values[2].push([3, 4, 1, -1, "", 4, "", 5, "\\frac{\\pi}{3}",Math.PI/3]);

    // values.push([]);
    // values[2].push(-1/2);
    // values[2].push(23/2/Math.sqrt(31)/Math.sqrt(271));
    // values[2].push(5/Math.sqrt(13)/Math.sqrt(113));
    // values[2].push(-1/2);
    // values[2].push(-41/2/Math.sqrt(19)/Math.sqrt(31));
    // values[2].push(5/Math.sqrt(34));
    // values[2].push(-6/Math.sqrt(85));
    // values[2].push(13/Math.sqrt(97)/Math.sqrt(109));
    // values[2].push(-31/13/Math.sqrt(10));
    // values[2].push(-8/Math.sqrt(91));
    // values[2].push(-36/Math.sqrt(151)/Math.sqrt(21));
    // values[2].push(16/Math.sqrt(305));
    // values[2].push(11/Math.sqrt(13)/Math.sqrt(145));
    // values[2].push(1/Math.sqrt(2));
    // values[2].push(131/26/Math.sqrt(43));
    // values[2].push(79/Math.sqrt(61)/Math.sqrt(181));
    // values[2].push(13/Math.sqrt(29)/Math.sqrt(17));
    // values[2].push(-22/Math.sqrt(19)/Math.sqrt(109));
    // values[2].push(9/Math.sqrt(130));
    // values[2].push(-3/Math.sqrt(57));
    // values[2].push(-1/2/Math.sqrt(331));
    // values[2].push(-3/5);
    // values[2].push(-16/Math.sqrt(7)/Math.sqrt(109));
    // values[2].push(7/Math.sqrt(130));
    // values[2].push(-25/Math.sqrt(101)/Math.sqrt(29));
    // values[2].push(-7/Math.sqrt(241));
    // values[2].push(Math.sqrt(3)/Math.sqrt(67));
    // values[2].push(Math.sqrt(3/7));
    // values[2].push(1/2/Math.sqrt(91));
    // values[2].push(-3/2/Math.sqrt(21));

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    // for (var i = 0; i < values.length; i++) {
    //     variants += '<option value='+i+'>'+(i+1)+'</option>';
    // }
    variants += '</select><br>';
    variants += '$\\vec a$ = <span id="veca"></span><br>';
    variants += '$\\vec b$ = <span id="vecb"></span><br>';
    variants += '$|\\vec m$| = <span id="lenm"></span><br>';
    variants += '$|\\vec n$| = <span id="lenn"></span><br>';
    variants += '$(\\widehat{\\vec m,\\vec n})$ = <span id="angmn"></span><br>';
    $("#variants").html(variants);

    var answer = '$\\cos(\\widehat{\\vec a,\\vec b})$ = <input type="text" id="ans" size=7>';
    // answer += '<br>Ответ: <span id="realans"></span> <span id="correct"></span><br>';
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
            var ansText = parseFloat($("#ans").val()).toFixed(5);
            $("#filetext").append(ansText); 
        }
    }
}
function handOver() {
    if (!example_id) {alert("Ошибка! Не получен идентификатор задачи.");return;}
    var ansText = parseFloat($("#ans").val()).toFixed(5);
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
function linCombText(v1,v2) {
    let text = "";
    if (v1 == 1) {
        text += "\\vec m";
    } else if (v1 == -1){
        text += "-\\vec m";
    } else if (v1 != 0){
        text += v1+"\\vec m";
    }
    if (v2 == 1) {
        if (text.length > 0) text += "+";
        text += "\\vec n";
    } else if (v2 == -1){
        text += "-\\vec n";
    } else if (v2 != 0){
        if (v2 > 0) {
            if (text.length > 0) text += "+";
            text += v2+"\\vec n";
        } else {
            text += v2+"\\vec n";            
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
    // for (var i = 2; i <= 4; i++) {
    //     vec3.set([cval[i*3],cval[i*3+1],cval[i*3+2]], points[i+1].coord1);
    // }
    $("#veca").html(linCombText(cval[0],cval[1])); //+"=("+points[1].coord1.join(';')+")"
    // MathJax.Hub.Queue(["Typeset",MathJax.Hub,"vecx"]);
    $("#vecb").html(linCombText(cval[2],cval[3])); //+"=("+points[2].coord1.join(';')+")"
    // MathJax.Hub.Queue(["Typeset",MathJax.Hub,"vecy"]);
    if (cval[4] == "") $("#lenm").html(cval[5]);
    else $("#lenm").html("$"+cval[4]+"$");
    if (cval[6] == "") $("#lenn").html(cval[7]);
    else $("#lenn").html("$"+cval[6]+"$");
    if (cval[8] == "") $("#angmn").html(cval[9]);
    else $("#angmn").html("$"+cval[8]+"$");

    // var cval1 = values[2][chosenVariant];
    // $("#realans").html(cval1.toFixed(5));

    var direction1 = vec3.create([1,0,0]);
    var direction2 = vec3.create([Math.cos(cval[9]),Math.sin(cval[9]),0]);
    vec3.scale(direction1, cval[5], points[1].coord1);
    vec3.scale(direction2, cval[7], points[2].coord1);
    for (var i = 0; i <= 1; i++) {
        vec3.set([cval[i*2]*points[1].coord1[0]+cval[i*2+1]*points[2].coord1[0],
            cval[i*2]*points[1].coord1[1]+cval[i*2+1]*points[2].coord1[1],
            cval[i*2]*points[1].coord1[2]+cval[i*2+1]*points[2].coord1[2]], points[i+3].coord1);
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    initBuffers();
}
var ans;
function initData() {
    isShowAxes = false;
    isShowGrid = false;
    primitives.push({class:"arrow", text: katex.renderToString("\\vec m"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec n"), arr0:points[0].coord1, arr1:points[2].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arc", text: "", arr0:points[0].coord1, arr1:points[1].coord1, arr2:points[2].coord1, Rad:0.5, rad:1, color:[0.0, 0.0, 1.0, 1.0]});

    if (showSolution) {
        primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[3].coord1, rad:2.1, color:[1.0, 0.0, 1.0, 1.0]});
        primitives.push({class:"arrow", text: katex.renderToString("\\vec b"), arr0:points[0].coord1, arr1:points[4].coord1, rad:2.1, color:[0.0, 1.0, 1.0, 1.0]});
        primitives.push({class:"arc", text: "", arr0:points[0].coord1, arr1:points[3].coord1, arr2:points[4].coord1, Rad:0.8, rad:1, color:[0.7, 0.7, 0.0, 1.0]});
        var vec_a = [];
        vec3.set(points[3].coord1,vec_a);
        var vec_b = [];
        vec3.set(points[4].coord1,vec_b);
        vec3.normalize(vec_a);
        vec3.normalize(vec_b);
        var cosTheta = vec3.dot(vec_a,vec_b);
        $("#ans").val(cosTheta.toFixed(5));
        // if ($("#ans").val()===$("#realans").html()) {$("#correct").html("<span style='color:green;'>Верно.</span>");}
        // else {$("#correct").html("<span style='color:red;'>Не верно.</span>");}
    }

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
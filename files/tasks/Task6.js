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

    $("Title").html("Задача 6");

    var conditions = "Вычислить площадь треугольника, построенного на векторах $\\vec{a}$ и $\\vec{b}$, заданных в виде <br> $\\vec{a}=\\alpha\\vec{m}+\\beta\\vec{n}$<br> $\\vec{b}=\\gamma\\vec{m}+\\delta\\vec{n}$<br> где $\\alpha,\\beta,\\gamma,\\delta$ - действительные числа,а $\\vec{m},\\vec{n}$ - вектора, для которых заданы их длины $\\mid\\vec{m}\\mid,\\mid\\vec{n}\\mid$ и угол $\\widehat{(\\vec{m},\\vec{n})}$ между ними.  Ответ дать с точностью до 3-го знака после запятой.";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
      var algorithm =  "<p>Используем формулу для площади параллелограмма, построенного на векторах $\\vec{a}$ и $\\vec{b}$<br> $S_{пар}=\\mid[\\vec{a},\\vec{b}]\\mid$</p>";
      algorithm += "<p>Вычислим векторное произведение $[\\vec{a},\\vec{b}]$, используя свойства векторного произведения:<br>$[\\vec{a},\\vec{b}]=[\\alpha\\vec{m}+\\beta\\vec{n},\\gamma\\vec{m}+\\delta\\vec{n}]=\\alpha\\delta[\\vec{m},\\vec{n}]+\\beta\\gamma[\\vec{n},\\vec{m}]=$<br>$=(\\alpha\\delta-\\beta\\gamma)[\\vec{m},\\vec{n}]$</p>";
      algorithm += "<p>Тогда<br>$S_{пар}=\\mid\\alpha\\delta-\\beta\\gamma\\mid\\mid[\\vec{m},\\vec{n}]\\mid=\\mid\\alpha\\delta-\\beta\\gamma\\mid\\mid\\vec{m}\\mid\\mid\\vec{n}\\mid\\mid\\sin{\\widehat{(\\vec{m},\\vec{n})}}\\mid$</p>";
      algorithm += "<p>Площадь треугольника, построенного на векторах $\\vec{a}$ и $\\vec{b}$ вычисляется так:<br>$S_{тр}=\\frac{1}{2}S_{пар}=\\frac{1}{2}\\mid\\alpha\\delta-\\beta\\gamma\\mid\\mid\\vec{m}\\mid\\mid\\vec{n}\\mid\\mid\\sin{\\widehat{(\\vec{m},\\vec{n})}}\\mid$</p>";
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

    values[0].push([1,-2, 3, 2, "", 1, "", 1, "\\frac{\\pi}{4}",Math.PI/4]);
    values[0].push([2,3, 1, 4, "", 2, "", 3, "\\frac{\\pi}{3}",Math.PI/3]);
    values[1].push([6,-3, 3, 2, "", 3, "", 5, "\\frac{\\pi}{6}",Math.PI/6]);
    values[1].push([3,-2, 2, 1, "", 2, "", 3, "\\frac{\\pi}{6}",Math.PI/6]);
    values[1].push([7,1, 1, -3, "", 3, "", 1, "\\frac{3\\pi}{4}",3*Math.PI/4]);
    values[1].push([3,-2, 1, 5, "", 4, "\\frac{1}{2}", 0.5, "\\frac{5\\pi}{6}",5*Math.PI/6]);
    values[1].push([4,-1, 1, 2, "", 5, "", 4, "\\frac{\\pi}{4}",Math.PI/4]);
    values[1].push([1,1, 6, -1, "", 3, "", 4, "\\frac{\\pi}{4}",Math.PI/4]);
    values[1].push([1,3, 7, -2, "\\frac{1}{2}", 0.5, "", 2, "\\frac{\\pi}{3}",Math.PI/3]);
    values[1].push([1,3, 3, -1, "", 3, "", 5, "\\frac{2\\pi}{3}",2*Math.PI/3]);
    values[1].push([4,1, 1, -1, "", 7, "", 2, "\\frac{\\pi}{4}",Math.PI/4]);
    values[1].push([1,-1, 3, 3, "", 2.5, "", 2, "\\frac{\\pi}{2}",Math.PI/2]);
    values[1].push([3,-2, 10, 1, "", 4, "", 1, "\\frac{\\pi}{6}",Math.PI/6]);
    values[1].push([3,-1, 1, 2, "", 3, "", 4, "\\frac{\\pi}{3}",Math.PI/3]);
    values[1].push([2,-1, 3, 2, "", 4, "", 3, "\\frac{3\\pi}{4}",3*Math.PI/4]);
    values[1].push([3,-1, 3, 1, "", 2, "", 1, "\\frac{\\pi}{2}",Math.PI/2]);
    values[2].push([1,-1, 8, -7, "", 1, "", 3, "\\frac{\\pi}{4}",Math.PI/4]);
    values[2].push([2,-1, 1, 2, "", 3, "", 4, "\\frac{\\pi}{6}",Math.PI/6]);
    values[2].push([1,5, -1, -3, "", 1, "", 1, "\\frac{\\pi}{3}",Math.PI/3]);
    values[2].push([1,1, -1, 4, "", 3, "", 1, "\\frac{3\\pi}{4}",3*Math.PI/4]);
    values[2].push([2,-3, 1, 4, "", 1, "\\frac{1}{2}", 0.5, "\\frac{5\\pi}{6}",5*Math.PI/6]);
    values[2].push([4,3, 4, -1, "", 1, "", 4, "\\frac{\\pi}{2}",Math.PI/2]);
    values[2].push([1,1, -2, 1, "", 8, "", 4, "\\frac{\\pi}{6}",Math.PI/6]);
    values[2].push([9,-1, 1, -3, "\\frac{1}{7}", 1/7, "", 2, "\\frac{5\\pi}{6}",5*Math.PI/6]);
    values[2].push([-1,1, -5, 4, "", 1, "\\frac{1}{2}", 0.5, "\\frac{\\pi}{4}",Math.PI/4]);
    values[2].push([4,2, -4, 2, "\\frac{1}{2}", 0.5, "\\frac{1}{2}", 0.5, "\\frac{3\\pi}{4}",3*Math.PI/4]);
    values[2].push([1,-5, 5, 5, "", 1, "\\frac{1}{5}", 0.2, "\\frac{\\pi}{2}",Math.PI/2]);
    values[2].push([7,-3, 3, -7, "\\frac{1}{4}", 0.25, "\\frac{1}{2}", 0.5, "\\frac{\\pi}{6}",Math.PI/6]);
    values[2].push([1,2, 2, 1, "\\frac{1}{3}", 1/3, "", 1, "\\frac{5\\pi}{6}",5*Math.PI/6]);
    values[2].push([3,-4, 1, 1, "", 1, "", 1, "\\frac{\\pi}{2}",Math.PI/2]);

    var variants = '';
    variants += '<h3>Выбор варианта:</h3> <select onchange="changeVariant(this.value);">';
    if (setOfValues != -1) {
        for (var i = 0; i < values[setOfValues].length; i++) {
            variants += '<option value='+setOfValues+','+i+'>'+'Вариант '+(i+1)+'</option>';
        }
    }
    variants += '</select><br>';
    variants += '$\\vec a$ = <span id="veca"></span><br>';
    variants += '$\\vec b$ = <span id="vecb"></span><br>';
    variants += '$|\\vec m$| = <span id="lenm"></span><br>';
    variants += '$|\\vec n$| = <span id="lenn"></span><br>';
    variants += '$(\\widehat{\\vec m,\\vec n})$ = <span id="angmn"></span><br>';
    $("#variants").html(variants);

    var answer = '$S_{тр}$ = <input type="text" id="ans" size=7>';
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
            var ansText = parseFloat($("#ans").val()).toFixed(3);
            $("#filetext").append(ansText);
        }
    }
}
function handOver() {
    if (!example_id) {alert("Ошибка! Не получен идентификатор задачи.");return;}
    var ansText = parseFloat($("#ans").val()).toFixed(3);
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
    $("#veca").html(linCombText(cval[0],cval[1]));
    $("#vecb").html(linCombText(cval[2],cval[3]));
    if (cval[4] == "") $("#lenm").html(cval[5]);
    else $("#lenm").html("$"+cval[4]+"$");
    if (cval[6] == "") $("#lenn").html(cval[7]);
    else $("#lenn").html("$"+cval[6]+"$");
    if (cval[8] == "") $("#angmn").html(cval[9]);
    else $("#angmn").html("$"+cval[8]+"$");

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
        primitives.push({class:"plane", text: "", arr0:points[0].coord1, arr1:points[3].coord1, arr2:points[4].coord1, arr3:points[4].coord1, color:[0.0, 0.0, 0.0, 0.2]});
        primitives.push({class:"line", text: "", arr0:points[3].coord1, arr1:points[4].coord1, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
        var vec_a = [];
        vec3.set(points[3].coord1,vec_a);
        var vec_b = [];
        vec3.set(points[4].coord1,vec_b);
        var norm = [];
        vec3.cross(vec_a,vec_b,norm);
        var area = vec3.length(norm)/2;
        $("#ans").val(area.toFixed(3));
    }

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
}
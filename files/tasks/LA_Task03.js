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

    $("Title").html("ЛА Задача 3");
    var conditions = "Даны векторы $\\vec{a_i}, i=1,2,3,4$, заданные своими координатами:<br> $A_i=(A_{i1},A_{i2},A_{i3},A_{i4})^T$<br> в некотором ортонормированном базисе этого пространства $\\vec{e_i}, i=1,2,3,4$.<br> Применяя процесс ортогонализации Грама-Шмидта, ортонормировать эту систему векторов.<br>Ответ дать с точностью до 2-го знака после запятой";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
        var algorithm = "<p>Обозначим через $f_1,f_2,f_3,f_4$ - искомую ортонормированную систему векторов.</p>"
            algorithm += "<p>Алгоритм построения этих векторов следующий:<br> $f_1=\\frac{a_1}{\\sqrt{(a_1,a_1)}}$<br> $f_2=\\frac{g_2}{\\sqrt{(g_2,g_2)}}$, где $g_2=a_2-(a_2,f_1)f_1$<br> $f_3=\\frac{g_3}{\\sqrt{(g_3,g_3)}}$, где $g_3=a_3-(a_3,f_2)f_2-(a_3,f_1)f_1$<br> $f_4=\\frac{g_4}{\\sqrt{(g_4,g_4)}}$, где $g_4=a_4-(a_4,f_3)f_3-(a_4,f_2)f_2-(a_4,f_1)f_1$</p>";
            algorithm += "<p>Обозначим через $G_i=(G_{i1},G_{i2},G_{i3},G_{i4})^T, i=1,2,3,4$ координатный столбец векторов $g_i$ в базисе $e_i$, и через<br>через $F_i=(F_{i1},F_{i2},F_{i3},F_{i4})^T, i=1,2,3,4$ координатный столбец векторов $f_i$ в базисе $e_i$.</p>";
            algorithm += "<p>Вычисляем квадрат длины вектора ${|a_i|}^2$ в базисе $e_i$ :<br>$|a_i|^2=(a_1,a_1)=\\sum\\limits_{j=1}^4\{(A_{1j})}^2$</p>";
            algorithm += "<p>Тогда $F_1=\\frac{1}{|a_i|^2}(A_{11},A_{12},A_{13},A_{14})^T$</p>";
            algorithm += "<p>Вычисляем скалярное произведение $(a_2,f_1)=\\sum\\limits_{j=1}^4\{A_{2j}F_{1j}}$</p>";
            algorithm += "<p>Тогда координаты вектора $g_2$ имеют вид:<br>$G_{2j}=A_{2j}-(a_2,f_1)F_{1j}$, $j=\\overline{1,4}$</p>";
            algorithm += "<p>Находим квадрат длины вектора ${|g_2|}^2$ :<br>$|g_2|^2=(g_2,g_2)=\\sum\\limits_{j=1}^4\{(G_{2j})}^2$</p>";
            algorithm += "<p>Тогда $F_{2j}=\\frac{1}{|g_2|^2}G_{2j}$, $j=\\overline{1,4}$</p>";
            algorithm += "<p>Вычисляем скалярное произведение:<br>$(a_3,f_2)=\\sum\\limits_{j=1}^4\{A_{3j}F_{2j}}$<br>$(a_3,f_1)=\\sum\\limits_{j=1}^4\{A_{3j}F_{1j}}$</p>";
            algorithm += "<p>Тогда координаты вектора $g_3$ имеют вид:<br>$G_{3j}=A_{3j}-(a_3,f_2)F_{2j}-(a_3,f_1)F_{1j} $, $ j=\\overline{1,4}$</p>";
            algorithm += "<p>Находим квадрат длины вектора ${|g_3|}^2$ :<br>$|g_3|^2=\\sum\\limits_{j=1}^4\{(G_{3j})}^2$</p>";
            algorithm += "<p>Тогда $F_{3j}=\\frac{1}{|g_3|^2}G_{3j}$, $j=\\overline{1,4}$</p>";
            algorithm += "<p>Вычисляем скалярное произведение:<br>$(a_4,f_3)=\\sum\\limits_{j=1}^4\{A_{4j}F_{3j}}$<br>$(a_4,f_2)=\\sum\\limits_{j=1}^4\{A_{4j}F_{2j}}$<br>$(a_4,f_1)=\\sum\\limits_{j=1}^4\{A_{4j}F_{1j}}$</p>";
            algorithm += "<p>Тогда координаты вектора $g_4$ имеют вид:<br>$G_{4j}=A_{4j}-(a_4,f_3)F_{3j}-(a_4,f_2)F_{2j}-(a_4,f_1)F_{1j} $, $ j=\\overline{1,4}$</p>";
            algorithm += "<p>Находим квадрат длины вектора ${|g_4|}^2$ :<br>$|g_4|^2=\\sum\\limits_{j=1}^4\{(G_{4j})}^2$</p>";
            algorithm += "<p>Тогда $F_{4j}=\\frac{1}{|g_4|^2}G_{4j}$, $j=\\overline{1,4}$</p>";
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

    values[0].push([4,1,2,2, 6,-1,3,-2, 5,3,5,-4, -2,-2,4,1]);
    values[0].push([2,-2,1,-4, 2,3,1,6, -7,5,-1,0, -3,2,6,-1]);
    values[1].push([1,2,-1,0, 3,4,-1,2, 3,7,-1,5, 1,6,1,2]);
    values[1].push([1,0,1,2, 3,2,1,4, -4,-1,0,-1, -1,-4,3,-4]);
    values[1].push([3,-1,-1,1, -5,5,3,-1, 7,7,5,3, 1,1,-1,-3]);
    values[1].push([1,3,1,1, 5,5,1,3, 9,1,-5,5, 1,1,-1,-3]); 
    values[1].push([2,3,2,1, 3,1,5,-1, 4,3,-2,5, -2,-1,2,3]);
    values[1].push([1,-2,3,-2, 1,5,-1,3, -4,-3,2,-5, -4,-4,0,2]);
    values[1].push([1,1,1,1, 3,-1,3,-1, 1,-1,3,1, 1,-1,-1,1]);
    values[1].push([1,-1,1,-1, -1,3,-1,3, 5,1,3,3, -1,-1,1,1]);
    values[1].push([2,2,1,0, 4,8,3,-1, -1,4,3,1, 3,1,1,5]);
    values[1].push([2,-2,0,1, 4,0,1,1, 3,10,1,-4, 0,1,-2,2]);
    values[1].push([3,5,1,1, 11,7,3,1, 15,11,1,7, -1,-1,5,3]);
    values[1].push([5,-3,1,-1, 13,-1,3,-1, -7,-11,3,1, 1,-1,-3,5]);
    values[1].push([1,4,4,4, 5,3,0,8, 9,-1,4,7, 4,4,-1,-4]);
    values[1].push([4,-1,-4,4, -3,5,8,0, 1,9,7,-4, 4,-4,4,-1]);
    values[2].push([5,4,2,2, -3,-6,-7,2, 1,-11,-5,0, -2,-2,4,5]);
    values[2].push([2,-2,-5,4, 7,2,-3,6, 5,0,1,11, 4,-5,2,-2]);
    values[2].push([8,4,1,0, 8,3,5,8, 7,3,13,4, -4,8,0,1]);
    values[2].push([0,-1,4,8, 8,5,-3,-8, 4,13,-3,-7, 1,0,-8,4]);
    values[2].push([7,4,4,0, 7,8,0,7, 11,8,-7,3, 4,-7,0,4]);
    values[2].push([0,4,-4,7, 7,0,8,-7, 3,7,8,-11, 4,0,-7,-4]);
    values[2].push([5,6,4,2, 9,4,-1,8, 15,-1,1,4, -2,-4,6,5]);
    values[2].push([4,-2,-5,6, 9,4,-1,8, 19,-3,-4,10, 2,4,-6,-5]);
    values[2].push([7,7,1,1, 15,13,9,-5, 7,21,3,1, -1,-1,7,7]);
    values[2].push([1,-1,7,-7, 5,9,-13,15, 9,7,1,-13, 7,-7,-1,1]);
    values[2].push([5,5,7,1, 3,9,19,7, -1,-3,17,1, 5,-5,-1,7]);
    values[2].push([7,1,-5,-5, -9,3,17,11, 3,-1,11,13, 1,-7,5,-5]);
    values[2].push([-3,0,4,0, 7,0,-1,0, -7,5,1,0, 1,-5,7,5]);
    values[2].push([4,0,3,0, 1,0,7,0, -1,5,-7,0, 1,5,7,5]);

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
    variants += '$\\vec a_4$: (<span id="veca4"></span>)<br>';
     $("#variants").html(variants);

    var answer = '';
    answer += '$\\vec b_1$: <input type="text" id="ans11" size=3>;<input type="text" id="ans12" size=3>;<input type="text" id="ans13" size=3>;<input type="text" id="ans14" size=3><br>';
    answer += '$\\vec b_2$: <input type="text" id="ans21" size=3>;<input type="text" id="ans22" size=3>;<input type="text" id="ans23" size=3>;<input type="text" id="ans24" size=3><br>';
    answer += '$\\vec b_3$: <input type="text" id="ans31" size=3>;<input type="text" id="ans32" size=3>;<input type="text" id="ans33" size=3>;<input type="text" id="ans34" size=3><br>';
    answer += '$\\vec b_4$: <input type="text" id="ans41" size=3>;<input type="text" id="ans42" size=3>;<input type="text" id="ans43" size=3>;<input type="text" id="ans44" size=3><br>';
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
    var ansText = parseFloat($("#ans11").val()).toFixed(2)+","+parseFloat($("#ans12").val()).toFixed(2)+","+parseFloat($("#ans13").val()).toFixed(2)+","+parseFloat($("#ans14").val()).toFixed(2)+
    ","+parseFloat($("#ans21").val()).toFixed(2)+","+parseFloat($("#ans22").val()).toFixed(2)+","+parseFloat($("#ans23").val()).toFixed(2)+","+parseFloat($("#ans24").val()).toFixed(2)+
    ","+parseFloat($("#ans31").val()).toFixed(2)+","+parseFloat($("#ans32").val()).toFixed(2)+","+parseFloat($("#ans33").val()).toFixed(2)+","+parseFloat($("#ans34").val()).toFixed(2)+
    ","+parseFloat($("#ans41").val()).toFixed(2)+","+parseFloat($("#ans42").val()).toFixed(2)+","+parseFloat($("#ans43").val()).toFixed(2)+","+parseFloat($("#ans44").val()).toFixed(2);
            $("#filetext").append(ansText); 
        }
    }
}
function handOver() {
    if (!example_id) {alert("Ошибка! Не получен идентификатор задачи.");return;}
    var ansText = parseFloat($("#ans11").val()).toFixed(2)+","+parseFloat($("#ans12").val()).toFixed(2)+","+parseFloat($("#ans13").val()).toFixed(2)+","+parseFloat($("#ans14").val()).toFixed(2)+
    ","+parseFloat($("#ans21").val()).toFixed(2)+","+parseFloat($("#ans22").val()).toFixed(2)+","+parseFloat($("#ans23").val()).toFixed(2)+","+parseFloat($("#ans24").val()).toFixed(2)+
    ","+parseFloat($("#ans31").val()).toFixed(2)+","+parseFloat($("#ans32").val()).toFixed(2)+","+parseFloat($("#ans33").val()).toFixed(2)+","+parseFloat($("#ans34").val()).toFixed(2)+
    ","+parseFloat($("#ans41").val()).toFixed(2)+","+parseFloat($("#ans42").val()).toFixed(2)+","+parseFloat($("#ans43").val()).toFixed(2)+","+parseFloat($("#ans44").val()).toFixed(2);
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
var veca = [];
function changeVariant(newVar) {
    var newVarSplit = newVar.split(',');
    chosenVariant = parseInt(newVarSplit[1],10);
    var cval = values[parseInt(newVarSplit[0],10)][chosenVariant];

    veca[0] = [cval[0],cval[1],cval[2],cval[3]];
    veca[1] = [cval[4],cval[5],cval[6],cval[7]];
    veca[2] = [cval[8],cval[9],cval[10],cval[11]];
    veca[3] = [cval[12],cval[13],cval[14],cval[15]];
    $("#veca1").html(veca[0].join('; '));
    $("#veca2").html(veca[1].join('; '));
    $("#veca3").html(veca[2].join('; '));
    $("#veca4").html(veca[3].join('; '));
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    initBuffers();
}
var ans = [];
function initData() {
    var arrRad = 2;
    var arrRad1 = 1;
    var lineRad = 1;
    var chosenPointRad = 5;

    primitives.push({class:"text", text: katex.renderToString("x_1"), arr0:[5,0,0]});
    primitives.push({class:"text", text: katex.renderToString("x_2"), arr0:[0,5,0]});
    primitives.push({class:"text", text: katex.renderToString("x_3"), arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    var vec4d = vec3.create([1,1,1]);
    vec3.normalize(vec4d);
    var vec5d = vec3.create([-2,1,1]);
    vec3.normalize(vec5d);

    if (veca[0].length>3) {
        var arr4d1 = [];
        var arr4d2 = [];
        vec3.scale(vec4d, -5, arr4d1);
        vec3.scale(vec4d, 5, arr4d2);
        var arr5d1 = [];
        var arr5d2 = [];
        vec3.scale(vec5d, -5, arr5d1);
        vec3.scale(vec5d, 5, arr5d2);

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
    }

    vec3.set(veca[0],points[1].coord1);
    vec3.set(veca[1],points[2].coord1);
    vec3.set(veca[2],points[3].coord1);
    vec3.set(veca[3],points[4].coord1);
    var tempvec;
    for (var i = 0; i < 4; i++) {
        tempvec = [];
        vec3.scale(vec4d, veca[i][3], tempvec);
        vec3.set(tempvec,points[5+i].coord1);
        vec3.add(points[5+i].coord1, points[1+i].coord1);
    }

    primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:points[2].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:points[3].coord1, rad:2, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:points[4].coord1, rad:2, color:[0.8, 0.8, 0.0, 1.0]});

    primitives.push({class:"arrow", text: katex.renderToString("\\vec a_1"), arr0:points[1].coord1, arr1:points[5].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a_2"), arr0:points[2].coord1, arr1:points[6].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a_3"), arr0:points[3].coord1, arr1:points[7].coord1, rad:2, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a_4"), arr0:points[4].coord1, arr1:points[8].coord1, rad:2, color:[0.8, 0.8, 0.0, 1.0]});

    if (showSolution) {
        var vecb = [[],[],[],[]];
        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                vecb[i][j] = veca[i][j];
            }
            for (var k = 0; k < i; k++) {
                var scal = veca[i][0]*vecb[k][0]+veca[i][1]*vecb[k][1]+veca[i][2]*vecb[k][2]+veca[i][3]*vecb[k][3];
                for (var j = 0; j < 4; j++) {
                    vecb[i][j] -= scal*vecb[k][j];
                }
            }

            var len = Math.sqrt(vecb[i][0]*vecb[i][0]+vecb[i][1]*vecb[i][1]+vecb[i][2]*vecb[i][2]+vecb[i][3]*vecb[i][3]);
            for (var j = 0; j < 4; j++) {
                vecb[i][j] /= len;
            }
        }
        var coordb = [[],[],[],[]];
        var coordb4d = [[],[],[],[]];
        for (var i = 0; i < 4; i++) {
            vec3.set(vecb[i],coordb[i]);
        }
        var tempvec;
        for (var i = 0; i < 4; i++) {
            tempvec = [];
            vec3.scale(vec4d, vecb[i][3], tempvec);
            vec3.set(tempvec,coordb4d[i]);
            vec3.add(coordb4d[i], coordb[i]);
        }

        for (var i = 0; i < 4; i++) {
            for (var j = 0; j < 4; j++) {
                $("#ans"+(i+1)+(j+1)).val(vecb[i][j].toFixed(2));
            }
        }


        primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:coordb[0], rad:3, color:[0.8, 0.0, 0.0, 1.0]});
        primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:coordb[1], rad:3, color:[0.0, 0.8, 0.0, 1.0]});
        primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:coordb[2], rad:3, color:[0.0, 0.0, 0.8, 1.0]});
        primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:coordb[3], rad:3, color:[0.6, 0.6, 0.0, 1.0]});

        primitives.push({class:"arrow", text: katex.renderToString("\\vec b_1"), arr0:coordb[0], arr1:coordb4d[0], rad:3, color:[0.8, 0.0, 0.0, 1.0]});
        primitives.push({class:"arrow", text: katex.renderToString("\\vec b_2"), arr0:coordb[1], arr1:coordb4d[1], rad:3, color:[0.0, 0.8, 0.0, 1.0]});
        primitives.push({class:"arrow", text: katex.renderToString("\\vec b_3"), arr0:coordb[2], arr1:coordb4d[2], rad:3, color:[0.0, 0.0, 0.8, 1.0]});
        primitives.push({class:"arrow", text: katex.renderToString("\\vec b_4"), arr0:coordb[3], arr1:coordb4d[3], rad:3, color:[0.6, 0.6, 0.0, 1.0]});
    }

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
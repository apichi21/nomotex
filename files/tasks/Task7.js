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

    $("Title").html("Задача 7");

    var conditions = "Компланарны ли векторы $\\vec{a},\\vec{b}$ и $\\vec{c}$, заданные координатами в базисе $\\vec{i},\\vec{j},\\vec{k}$ ?<br>$\\vec{a}=${$a_1,a_2,a_3$}<br>$\\vec{b}=${$b_1,b_2,b_3$}<br>$\\vec{c}=${$c_1,c_2,c_3$}";
    $("#conditions").html('<h3>Условия задачи:</h3>'+conditions);

    if (showAlgorithm) {
      var algorithm = "<p>Используем критерий компланарности трех векторов:<br>$<\\vec{a},\\vec{b},\\vec{c}>=0$</p>";
      algorithm += "<p>Применим теорему о выражении смешанного произведения трех векторов в базисе $\\vec{i},\\vec{j},\\vec{k}$ через определитель матрицы их кооординат:<br>$<\\vec{a},\\vec{b},\\vec{c}>=\\begin{vmatrix} a_1 & b_1 & c_1 \\\\ a_2 & b_2 & c_2 \\\\ a_3 & b_3 & c_3 \\end{vmatrix}$</p>";
      algorithm += "<p>Вычисляем этот определитель.Если он равен нулю, то векторы $\\vec{a},\\vec{b}$ и $\\vec{c}$ - компланарны, в противном случае - не компланарны.</p>";
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

    values[0].push([3,2,1, 2,3,4, 3,1,-1]);
    values[0].push([1,-1,-3, 3,2,1, 2,3,4]);
    values[1].push([3,1,-1, -2,-1,0, 5,2,-1]);
    values[1].push([4,3,1, 6,7,4, 2,0,-1]);
    values[1].push([3,7,2, -2,0,-1, 2,2,1]);
    values[1].push([6,3,4, -1,-2,-1, 2,1,2]);
    values[1].push([2,3,2, 4,7,5, 2,0,-1]);
    values[1].push([3,10,5, -2,-2,-3, 2,4,3]);
    values[1].push([3,1,-1, 0,1,-1, 8,3,-2]);
    values[1].push([4,1,2, 9,2,5, 1,1,-1]);
    values[1].push([3,4,2, 1,1,0, 8,11,6]);
    values[1].push([3,1,0, -5,-4,-5, 4,2,4]);
    values[1].push([1,-1,4, 1,0,3, 1,-3,8]);
    values[1].push([4,1,1, -9,-4,-9, 6,2,6]);
    values[1].push([-7,10,-5, 0,-2,-1, -2,4,-1]);
    values[1].push([2,1,2, 1,5,3, 3,4,5]);
    values[2].push([4,0,6, 1,-3,1, -5,2,-3]);
    values[2].push([2,5,8, -3,-6,-9, 1,4,7]);
    values[2].push([0,1,1, 1,0,1, 1,1,0]);
    values[2].push([2,-1,-1, -1,-1,2, -1,2,-1]);
    values[2].push([1,-3,0, -2,5,7, -3,7,14]);
    values[2].push([-3,5,1, 1,1,1, 0,4,2]);
    values[2].push([1,5,2, 0,3,-1, 2,1,-1]);
    values[2].push([1,2,2, 2,1,-2, 2,-2,1]);
    values[2].push([-3,0,1, 1,3,1, 4,3,0]);
    values[2].push([1,1,1, 1,2,1, 4,11,4]);
    values[2].push([-4,-3,9, 2,3,-5, 2,5,-8]);
    values[2].push([2,-5,8, 1,-2,3, 1,-3,4]);
    values[2].push([1,2,1, 3,2,-1, 0,2,1]);
    values[2].push([1,-5,1, 1,4,1, 1,1,1]);

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
    variants += '</select><br>';
    variants += '$\\vec a$: (<span id="veca"></span>)<br>';
    variants += '$\\vec b$: (<span id="vecb"></span>)<br>';
    variants += '$\\vec c$: (<span id="vecc"></span>)<br>';
    $("#variants").html(variants);

    var answer = 'Векторы компланарны? <select id="ans"><option value="0">...</option><option value="1">Да</option><option value="2">Нет</option></select>';
    if (showSolution) answer+= ' det = <span id="det"></span>';
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
function changeVariant(newVar) {
    var newVarSplit = newVar.split(',');
    chosenVariant = parseInt(newVarSplit[1],10);
    var cval = values[parseInt(newVarSplit[0],10)][chosenVariant];
    $("#veca").html([cval[0],cval[1],cval[2]].join(';'));
    $("#vecb").html([cval[3],cval[4],cval[5]].join(';'));
    $("#vecc").html([cval[6],cval[7],cval[8]].join(';'));
    for (var i = 0; i <= 2; i++) {
        vec3.set([cval[i*3],cval[i*3+1],cval[i*3+2]], points[i+1].coord1);
    }
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    initBuffers();
}
var ans;
function initData() {
    
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:points[0].coord1});
    if (showSolution) {
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec b"), arr0:points[0].coord1, arr1:points[2].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec c"), arr0:points[0].coord1, arr1:points[3].coord1, rad:2, color:[0.0, 0.0, 1.0, 1.0]});

        var vec_a = [];
        vec3.subtract(points[1].coord1,points[0].coord1,vec_a);
        var vec_b = [];
        vec3.subtract(points[2].coord1,points[0].coord1,vec_b);
        var vec_c = [];
        vec3.subtract(points[3].coord1,points[0].coord1,vec_c);
        var crossab = [];
        vec3.cross(vec_a,vec_b,crossab);

        var C = vec3.dot(crossab,vec_c);

        var sum_ab = [];
        vec3.add(vec_a,vec_b,sum_ab);
        vec3.add(sum_ab,points[0].coord1);

        var sum_ac = [];
        vec3.add(vec_a,vec_c,sum_ac);
        vec3.add(sum_ac,points[0].coord1);

        var sum_bc = [];
        var sum_abc = [];
        vec3.add(vec_b,vec_c,sum_bc);
        vec3.add(vec_a,sum_bc,sum_abc);
        vec3.add(sum_bc,points[0].coord1);
        vec3.add(sum_abc,points[0].coord1);

        primitives.push({class:"plane", text: "", arr0:points[0].coord1, arr1:points[1].coord1, arr2:sum_ab, arr3:points[2].coord1, color:[0.5, 0.5, 1.0, 1.0]});
        primitives.push({class:"plane", text: "", arr0:points[0].coord1, arr1:points[1].coord1, arr2:sum_ac, arr3:points[3].coord1, color:[0.5, 0.5, 1.0, 1.0]});
        primitives.push({class:"plane", text: "", arr0:points[0].coord1, arr1:points[2].coord1, arr2:sum_bc, arr3:points[3].coord1, color:[0.5, 0.5, 1.0, 1.0]});

        primitives.push({class:"plane", text: "", arr0:sum_abc, arr1:points[1].coord1, arr2:sum_ab, arr3:points[2].coord1, color:[0.5, 0.5, 1.0, 1.0]});
        primitives.push({class:"plane", text: "", arr0:sum_abc, arr1:points[1].coord1, arr2:sum_ac, arr3:points[3].coord1, color:[0.5, 0.5, 1.0, 1.0]});
        primitives.push({class:"plane", text: "", arr0:sum_abc, arr1:points[2].coord1, arr2:sum_bc, arr3:points[3].coord1, color:[0.5, 0.5, 1.0, 1.0]});

        primitives.push({class:"line", text: "", arr0:points[1].coord1, arr1:sum_ab, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:points[1].coord1, arr1:sum_ac, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:points[2].coord1, arr1:sum_ab, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:points[2].coord1, arr1:sum_bc, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:points[3].coord1, arr1:sum_ac, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:points[3].coord1, arr1:sum_bc, rad:1, color:[0.0, 0.0, 0.0, 1.0]});

        primitives.push({class:"line", text: "", arr0:sum_abc, arr1:sum_ab, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:sum_abc, arr1:sum_ac, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:sum_abc, arr1:sum_bc, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
        var ans = C.toFixed(1)=="0.0";
        if (ans) {
            $("#ans [value='1']").prop("selected", true);
        } else {
            $("#ans [value='2']").prop("selected", true);
        }
        $("#det").text(C.toFixed(1));
    }

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
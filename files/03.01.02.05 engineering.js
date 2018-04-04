var dimention="3d";
function initPoints() {
    points = [];
}
var ci = [];
function initDescr() {
    $("#conditions").html("<b>Инженерная задача.</b>Моделирование диаграммы деформирования композита с помощью полиномов");
    var algorithm = "";
    algorithm += "Рассматривается композиционный материал со сложной микроструктурой, состоящий из волокон и окружающей их матрицы.<br>Выделяем элементарный представляемый объем КМ - ячейку периодичности (ЯП).<br>Механические свойства КМ характеризуются диаграммой деформирования КМ - функцией $\\sigma(\\varepsilon)$, где<br>$\\sigma=F/S$ - напряжение, $\\varepsilon=\\frac{l-l_0}{l_0}$ - относительная деформация в ЯП при растяжениив направлении $x_1$, $F$ - сила, действующая на ЯП в направлении $x_1$, $S$ - площадь поперечного сечения ЯП, $l_0$ - начальное значение $l$, $\\Delta l=l-l_0$<br>C увеличением деформации $\\varepsilon$ от 0 до $\\varepsilon$ максимальное значение $\\varepsilon_{max}$, изменяется и значение силы $F$, которая вызывает эту деформацию и, соответствующее ей напряжение $\\sigma$.<br>В результате получаем зависимость - функция $\\sigma(\\varepsilon)$, удовлетворяющая условию $\\sigma(0)=0$.<br>Эта функция может быть получена либо экспериментально на разрывных машинах, на которых испытывают КМ, либо с помощью компьютерного моделирования.<br>Далее возникает математическая задача обработки результатов экспериментов, т.е. по имеющемуся набору точек<br>\\begin{equation}(\\sigma_n,\\varepsilon_n) ,  n=1..N \\end{equation}<br>полученному в ходе эксперимента, найти аналитическую аппроксимацию этой зависимости $\\sigma(\\varepsilon)$ с помощью некоторых стандартных функций, например, полином $P_m(\\varepsilon)=\\varepsilon^m$<br>Одно из возможных решений этой задачи таково: составляем <b>систему линейно-зависимых функций</b>:<br>\\begin{equation}\\sigma(\\varepsilon)-\\sum\\limits_{m=1}^M\{c_m\\varepsilon^m}=0\\end{equation} <br>Для того, чтобы найти $M$ коэффициентов $c_m$, которые не все нулевые, используем $M$ экспериментальных точек (1) из $N$ имеющихся точек. Должно выполняться условие:<br>\\begin{equation}\\label{equation}  N \\geq M \\end{equation} <br>Тогда из (2), получаем<br> \\begin{equation}\\sigma_n(\\varepsilon_n)- \\sum\\limits_{m=1}^M\{c_m{\\varepsilon^m}_n}=0   ,  n=1..M\\end{equation} <br>Систему линейных алгебраических уравнений относительно коэффициентов $c_m$ ,   $m=1..M$,<br>Записываем (4) в матричном виде:<br>\\begin{equation}A = \\begin{pmatrix}{\\varepsilon^1}_1 & {\\varepsilon^2}_1 & \\cdots & {\\varepsilon^m}_1 \\\\{\\varepsilon^1}_2 & {\\varepsilon^2}_2 & \\cdots & {\\varepsilon^m}_2 \\\\\\vdots & \\vdots & \\ddots & \\vdots \\\\{\\varepsilon^1}_m & {\\varepsilon^2}_m & \\cdots & {\\varepsilon^m}_m\\end{pmatrix} \\begin{pmatrix}{c}_1\\\\{c}_2\\\\\\vdots \\\\{c}_m\\end{pmatrix} = \\begin{pmatrix}{\\sigma}_1\\\\{\\sigma}_2\\\\\\vdots \\\\{\\sigma}_m\\end{pmatrix} \\end{equation}<br>Проверим матрицу на вырожденность<br> $det({\\varepsilon^m}_m)\\ne 0$<br>решаем эту СЛАУ каким-либо методом, находим коэффициенты $c_1...c_m$ ";

    algorithm += "<label style='display: block; padding-top: 5px;'><input type='radio' name='group1' checked onchange='changeOXYZ(false)'> Ячейка периодичности </label>";
    algorithm += "<label style='display: block; padding-top: 5px;'><input type='radio' name='group1' onchange='changeOXYZ(true)'> Диаграмма деформирования </label>";

    algorithm += '<table style="text-align: center">';
    algorithm += '<tr>';
    for (var i = 0; i < 5; i++) {
        algorithm += '<td>$c_'+(i+1)+'$</td>';
    }
    algorithm += '</tr>';
    algorithm += '<tr>';
    for (var i = 0; i < 5; i++) {
        algorithm += '<td><input type="text" id="ans'+(i+1)+'" size=5 onchange="ci['+i+'] = parseFloat(this.value);initBuffers();"></td>';
    }
    algorithm += '</tr>';
    algorithm += '</table>';

    $("#algorithm").html(algorithm);

    ci = [-100,1422,-952,240,-21.22];
    // ci = [0,0,3,-3];
    for (var i = 0; i < 5; i++) {
        $("#ans"+(i+1)).val(ci[i].toFixed(2));
    }

    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Инженерная задача");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function changeOXYZ(isDiagram) {
    is2d = isDiagram;

    if (!is2d) {
        rotAngY = -10;
        rotAngX = 10;
    } else {
        rotAngY = 0;
        rotAngX = 0;
    }

    initBuffers();
}
function initData() {
    // isShowAxes = false;
    if (is2d) {
        var strain = [0.900106,1.70011,2.50011,3.30011,4.10011];
        var stress = [512.675,964.599,1061.26,1090.71,1092.24];
        scaleFactor = 0.35;
        isShowAxes = true;
        centerTranslate = [-5,-2,0];
        var xscale = 2;
        var yscale = 1/200;
        for (var i = 0; i < strain.length; i++) {
            if (i==0) {
                var x1 = 0;
                var y1 = 0;
            } else {
                var x1 = strain[i-1];
                var y1 = stress[i-1];
            }
            var x2 = strain[i];
            var y2 = stress[i];
            primitives.push({class:"line", text: "", arr0:[x1*xscale,y1*yscale,0], arr1:[x2*xscale,y2*yscale,0], rad:1.5, color:[0.0, 0.0, 1.0, 1.0]});
        }
        primitives.push({class:"dashline", text: "", arr0:[strain[strain.length-1]*xscale,0,0], arr1:[strain[strain.length-1]*xscale,stress[stress.length-1]*yscale,0], rad:1, color:[0.0, 0.0, 0.0, 1.0]});

        primitives.push({class:"dashline", text: "", arr0:[0,stress[stress.length-1]*yscale,0], arr1:[strain[strain.length-1]*xscale,stress[stress.length-1]*yscale,0], rad:1, color:[0.0, 0.0, 0.0, 1.0]});

        primitives.push({class:"text", text: "0", arr0:[0,0,0]});
        primitives.push({class:"text", text: strain[strain.length-1].toFixed(0), arr0:[strain[strain.length-1]*xscale,0,0]});
        primitives.push({class:"text", text: stress[stress.length-1].toFixed(2), arr0:[0,stress[stress.length-1]*yscale,0]});
        var gnum = 100;
        var x1 = 0;
        var y1 = 0;
        for (var i = 0; i < gnum; i++) {
            var x2 = i/gnum*strain[strain.length-1];
            var y2 = 0;
            for (var j = 0; j < ci.length; j++) {
                y2 += Math.pow(x2,j+1)*ci[j];
            }
            primitives.push({class:"line", text: "", arr0:[x1*xscale,y1*yscale,0], arr1:[x2*xscale,y2*yscale,0], rad:1.5, color:[1.0, 0.0, 0.0, 1.0]});
            x1 = x2;
            y1 = y2;
        }
        // primitives.push({class:"dashline", text: "", arr0:[-0.5/10,3,0], arr1:[100/10,3,0], rad:1.6, color:[0.0, 1.0, 0.0, 1.0]});
        // primitives.push({class:"text", text: "-0.5", arr0:[-0.5/10,0,0]});
        // primitives.push({class:"text", text: "100", arr0:[100/10,0,0]});
        // primitives.push({class:"text", text: "3", arr0:[0,3,0]});
    } else {
        // isShowAxes = false;
        scaleFactor = 0.5;
        var lineLength = 3;
        centerTranslate = [-lineLength/2,-lineLength/2,-lineLength/2];
        var fiberRad = 1;

        primitives.push({class:"text", text: "O", arr0:[0,0,0]});
        primitives.push({class:"text", text: katex.renderToString("x_1"), arr0:[5,0,0]});
        primitives.push({class:"text", text: katex.renderToString("x_2"), arr0:[0,5,0]});
        primitives.push({class:"text", text: katex.renderToString("x_3"), arr0:[0,0,5]});

        primitives.push({class:"line", text: "", arr0:[0,0,0], arr1:[lineLength,0,0], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[0,0,0], arr1:[0,lineLength,0], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[0,0,0], arr1:[0,0,lineLength], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});

        primitives.push({class:"line", text: "", arr0:[lineLength,0,0], arr1:[lineLength,lineLength,0], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[0,lineLength,0], arr1:[0,lineLength,lineLength], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[0,0,lineLength], arr1:[lineLength,0,lineLength], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});

        primitives.push({class:"line", text: "", arr0:[lineLength,0,0], arr1:[lineLength,0,lineLength], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[0,lineLength,0], arr1:[lineLength,lineLength,0], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[0,0,lineLength], arr1:[0,lineLength,lineLength], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});

        primitives.push({class:"line", text: "", arr0:[lineLength,lineLength,lineLength], arr1:[lineLength,0,lineLength], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[lineLength,lineLength,lineLength], arr1:[lineLength,lineLength,0], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[lineLength,lineLength,lineLength], arr1:[0,lineLength,lineLength], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});

        primitives.push({class:"line", text: "", arr0:[fiberRad*Math.sqrt(3)/2,fiberRad/2,0], arr1:[fiberRad*Math.sqrt(3)/2,fiberRad/2,lineLength], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[fiberRad/2,fiberRad*Math.sqrt(3)/2,0], arr1:[fiberRad/2,fiberRad*Math.sqrt(3)/2,lineLength], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});

        // primitives.push({class:"line", text: "", arr0:[fiberRad*Math.SQRT1_2,fiberRad*Math.SQRT1_2,0], arr1:[fiberRad*Math.SQRT1_2,fiberRad*Math.SQRT1_2,lineLength], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[fiberRad,0,0], arr1:[fiberRad,0,lineLength], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[0,fiberRad,0], arr1:[0,fiberRad,lineLength], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arc", text: "", arr0:[0,0,0], arr1:[lineLength,0,0], arr2:[0,lineLength,0], Rad:fiberRad, rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arc", text: "", arr0:[0,0,lineLength], arr1:[lineLength,0,lineLength], arr2:[0,lineLength,lineLength], Rad:fiberRad, rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});

        primitives.push({class:"line", text: "", arr0:[0,lineLength-fiberRad*Math.sqrt(3)/2,fiberRad/2], arr1:[lineLength,lineLength-fiberRad*Math.sqrt(3)/2,fiberRad/2], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[0,lineLength-fiberRad/2,fiberRad*Math.sqrt(3)/2], arr1:[lineLength,lineLength-fiberRad/2,fiberRad*Math.sqrt(3)/2], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        // primitives.push({class:"line", text: "", arr0:[0,lineLength-fiberRad*Math.SQRT1_2,fiberRad*Math.SQRT1_2], arr1:[lineLength,lineLength-fiberRad*Math.SQRT1_2,fiberRad*Math.SQRT1_2], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[0,lineLength-fiberRad,0], arr1:[lineLength,lineLength-fiberRad,0], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[0,lineLength,fiberRad], arr1:[lineLength,lineLength,fiberRad], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arc", text: "", arr0:[0,lineLength,0], arr1:[0,0,0], arr2:[0,lineLength,lineLength], Rad:fiberRad, rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arc", text: "", arr0:[lineLength,lineLength,0], arr1:[lineLength,0,0], arr2:[lineLength,lineLength,lineLength], Rad:fiberRad, rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});

        primitives.push({class:"line", text: "", arr0:[lineLength-fiberRad*Math.sqrt(3)/2,0,lineLength-fiberRad/2], arr1:[lineLength-fiberRad*Math.sqrt(3)/2,lineLength,lineLength-fiberRad/2], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[lineLength-fiberRad/2,0,lineLength-fiberRad*Math.sqrt(3)/2], arr1:[lineLength-fiberRad/2,lineLength,lineLength-fiberRad*Math.sqrt(3)/2], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        // primitives.push({class:"line", text: "", arr0:[lineLength-fiberRad*Math.SQRT1_2,0,lineLength-fiberRad*Math.SQRT1_2], arr1:[lineLength-fiberRad*Math.SQRT1_2,lineLength,lineLength-fiberRad*Math.SQRT1_2], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[lineLength-fiberRad,0,lineLength], arr1:[lineLength-fiberRad,lineLength,lineLength], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[lineLength,0,lineLength-fiberRad], arr1:[lineLength,lineLength,lineLength-fiberRad], rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arc", text: "", arr0:[lineLength,0,lineLength], arr1:[lineLength,0,0], arr2:[0,0,lineLength], Rad:fiberRad, rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arc", text: "", arr0:[lineLength,lineLength,lineLength], arr1:[lineLength,lineLength,0], arr2:[0,lineLength,lineLength], Rad:fiberRad, rad:1.5, color:[0.0, 0.0, 0.0, 1.0]});

        primitives.push({class:"arrow", text: "", arr0:[lineLength,lineLength/4,lineLength/4], arr1:[lineLength+2,lineLength/4,lineLength/4], rad:2, color:[0.0, 0.0, 1.0, 1.0]});
        primitives.push({class:"arrow", text: "", arr0:[lineLength,lineLength/4*3,lineLength/4], arr1:[lineLength+2,lineLength/4*3,lineLength/4], rad:2, color:[0.0, 0.0, 1.0, 1.0]});
        primitives.push({class:"arrow", text: "", arr0:[lineLength,lineLength/4,lineLength/4*3], arr1:[lineLength+2,lineLength/4,lineLength/4*3], rad:2, color:[0.0, 0.0, 1.0, 1.0]});
        primitives.push({class:"arrow", text: "", arr0:[lineLength,lineLength/4*3,lineLength/4*3], arr1:[lineLength+2,lineLength/4*3,lineLength/4*3], rad:2, color:[0.0, 0.0, 1.0, 1.0]});

        primitives.push({class:"arrow", text: "", arr0:[0,lineLength/4,lineLength/4], arr1:[-2,lineLength/4,lineLength/4], rad:2, color:[0.0, 0.0, 1.0, 1.0]});
        primitives.push({class:"arrow", text: "", arr0:[0,lineLength/4*3,lineLength/4], arr1:[-2,lineLength/4*3,lineLength/4], rad:2, color:[0.0, 0.0, 1.0, 1.0]});
        primitives.push({class:"arrow", text: "", arr0:[0,lineLength/4,lineLength/4*3], arr1:[-2,lineLength/4,lineLength/4*3], rad:2, color:[0.0, 0.0, 1.0, 1.0]});
        primitives.push({class:"arrow", text: "", arr0:[0,lineLength/4*3,lineLength/4*3], arr1:[-2,lineLength/4*3,lineLength/4*3], rad:2, color:[0.0, 0.0, 1.0, 1.0]});

        primitives.push({class:"text", text: katex.renderToString("F"), arr0:[lineLength+2,lineLength/4,lineLength/4]});
        primitives.push({class:"text", text: katex.renderToString("\\sigma=\\frac F S"), arr0:[lineLength+1,lineLength/2,lineLength/2]});

        primitives.push({class:"line", text: "", arr0:[0,0,lineLength], arr1:[0,-1,lineLength], rad:1, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[lineLength,0,lineLength], arr1:[lineLength,-1,lineLength], rad:1, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[lineLength+1,0,lineLength], arr1:[lineLength+1,-1,lineLength], rad:1, color:[0.0, 0.0, 0.0, 1.0]});

        primitives.push({class:"text", text: katex.renderToString("l_0"), arr0:[lineLength/2,-0.8,lineLength]});
        primitives.push({class:"arrow", text: "", arr0:[lineLength/2,-0.8,lineLength], arr1:[0,-0.8,lineLength], rad:1, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arrow", text: "", arr0:[lineLength/2,-0.8,lineLength], arr1:[lineLength,-0.8,lineLength], rad:1, color:[0.0, 0.0, 0.0, 1.0]});

        primitives.push({class:"text", text: katex.renderToString("\\Delta l"), arr0:[lineLength+0.5,-0.8,lineLength]});
        primitives.push({class:"arrow", text: "", arr0:[lineLength+0.5,-0.8,lineLength], arr1:[lineLength,-0.8,lineLength], rad:1, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arrow", text: "", arr0:[lineLength+0.5,-0.8,lineLength], arr1:[lineLength+1,-0.8,lineLength], rad:1, color:[0.0, 0.0, 0.0, 1.0]});

        primitives.push({class:"text", text: katex.renderToString("\\varepsilon=\\frac {\\Delta l} {l_0}"), arr0:[lineLength/2,-2,lineLength]});
        var dashcolor = [0.4, 0.4, 0.4, 1.0];
        primitives.push({class:"dashline", text: "", arr0:[lineLength,0,0], arr1:[lineLength+1,0,0], rad:1.5, color:dashcolor});
        primitives.push({class:"dashline", text: "", arr0:[lineLength,lineLength,0], arr1:[lineLength+1,lineLength,0], rad:1.5, color:dashcolor});
        primitives.push({class:"dashline", text: "", arr0:[lineLength,0,lineLength], arr1:[lineLength+1,0,lineLength], rad:1.5, color:dashcolor});
        primitives.push({class:"dashline", text: "", arr0:[lineLength,lineLength,lineLength], arr1:[lineLength+1,lineLength,lineLength], rad:1.5, color:dashcolor});

        primitives.push({class:"dashline", text: "", arr0:[lineLength+1,0,0], arr1:[lineLength+1,lineLength,0], rad:1.5, color:dashcolor});
        primitives.push({class:"dashline", text: "", arr0:[lineLength+1,lineLength,0], arr1:[lineLength+1,lineLength,lineLength], rad:1.5, color:dashcolor});
        primitives.push({class:"dashline", text: "", arr0:[lineLength+1,lineLength,lineLength], arr1:[lineLength+1,0,lineLength], rad:1.5, color:dashcolor});
        primitives.push({class:"dashline", text: "", arr0:[lineLength+1,0,lineLength], arr1:[lineLength+1,0,0], rad:1.5, color:dashcolor});

        primitives.push({class:"plane", text: "", arr0:[lineLength,0,0], arr1:[lineLength,lineLength,0], arr2:[lineLength,lineLength,lineLength], arr3:[lineLength,0,lineLength], color:[0.0, 1.0, 0.0, 0.25]});
   }

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]});
    }
}
var dimention="2d";
function initPoints() {
    points = [];
}
var ci = [];
function initDescr() {
    $("#conditions").html("<b>Пример 1.7</b><br>Множество $C[a,b]$ - определенных и непрерывных на отрезке $[a,b]$ функций образует бесконечномерное линейное пространство<br>Рассмотрим функцию $f(t) \\in C[0,1]$.В силу бесконечномерности этого пространства $f(t)$ представима в виде линейной комбинации счетного числа базисных функций, в качестве которых можно выбрать тригонометрические функции<br>$f(t)=a_0+\\sum\\limits_{n=1}^\\infty{a_n cos \\frac{2\\pi nt}{t}}$ $    $(1)<br> где $a_0,a_1,...,a_n$ - коэффициенты.<br>В результате не конечная сумма, а бесконечный ряд функций, который на каждом $t \\in [0,T]$  должен быть конечным числом<br>$|f(t)|<+\\infty$ для любого $t\\in [0,T]$ (2)<br>Коэффициенты $a_0,a_1,...,a_n$ определяются самой функцией $f$ подобно координатам вектора при разложении вектора по базису.<br>С другой стороны, меняя $a_0,a_1,...,a_n$, можно получить различные функции $f(t)$. Коэффициент $a_n$ называют амплитудой колебаний, число $\\nu=\\frac{n}{T}$ - частотой колебаний, $T$ - периодом колебаний, а $2\\pi \\nu =\\omega$ - круговой частотой.<br>В силу (2) амплитуда $a_n$ должна удовлетворять условию:<br> $|a_0+\\sum\\limits_{n=1}^{\\infty}a_n|<+\\infty$ (3) <br> Выбирая различные значения $|a_n|<1$,получаем функции, образованные суммой различных <b>гармонических колебаний</b>.<br>Зададим некоторую выборку амплитуды и выберем для простоты $T=1c$.<br>Зависимость $a_n$ от $\\nu=\\frac{n}{T}$ называют <b>амплитудно-частотной характеристикой</b>(АЧХ) колебательной системы, которая описывается уравнением (1).<br>В силу (3) функция $a_n(\\nu)\\to 0$ при $\\nu \\to +\\infty$<br>График выбранной АЧХ показан на втором рисунке.");
    var algorithm = "";

    algorithm += "<label style='display: block; padding-top: 5px;'><input type='radio' name='group1' checked onchange='changeOXYZ(false)'> Функция </label>";
    algorithm += "<label style='display: block; padding-top: 5px;'><input type='radio' name='group1' onchange='changeOXYZ(true)'> АЧХ </label>";

    algorithm += '<table style="text-align: center">';
    algorithm += '<tr>';
    for (var i = 0; i < 5; i++) {
        algorithm += '<td>$a_'+i+'$</td>';
    }
    algorithm += '</tr>';
    algorithm += '<tr>';
    for (var i = 0; i < 5; i++) {
        algorithm += '<td><input type="text" id="ans'+(i+1)+'" size=5 onchange="ci['+i+'] = parseFloat(this.value);initBuffers();"></td>';
    }
    algorithm += '</tr>';
    algorithm += '</table>';

    $("#algorithm").html(algorithm);

    ci = [2.8,-1,0.82,0.5,-0.05];
    for (var i = 0; i < 5; i++) {
        $("#ans"+(i+1)).val(ci[i].toFixed(2));
    }

    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 1.7");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
var isACHH = false;
function changeOXYZ(isTrue) {
    isACHH = isTrue;
    initBuffers();
}
function initData() {
    var strain = [0.900106,1.70011,2.50011,3.30011,4.10011];
    var stress = [512.675,964.599,1061.26,1090.71,1092.24];
    scaleFactor = 0.35;
    centerTranslate = [-5,-2,0];
    var xscale = 10;
    var yscale = 1;

    var ci1 = [2.8,-1,0.82,0.535714286,-0.05,-0.381818182,0.007692308,-0.186666667,0.205882353,0.242105263,-0.197619048,0.123913043,0.132,0.164814815,-0.117241379,0.111290323,-0.086363636,0.041428571,-0.112162162,0.094871795,0.108536585];
    if (!isACHH) {
        var gnum = 100;
        var x1;
        var y1;
        for (var i = 0; i < gnum; i++) {
            var x2 = i/(gnum-1);
            var y2 = 0;
            for (var j = 0; j < ci1.length; j++) {
                y2 += Math.cos(2*Math.PI*j*x2)*ci1[j];
            }
            if (i>0) {
                primitives.push({class:"line", text: "", arr0:[x1*xscale,y1,0], arr1:[x2*xscale,y2,0], rad:1.5, color:[0.0, 0.0, 1.0, 1.0]});
            }
            x1 = x2;
            y1 = y2;
        }
        var gnum = 100;
        var x1;
        var y1;
        for (var i = 0; i < gnum; i++) {
            var x2 = i/(gnum-1);
            var y2 = 0;
            for (var j = 0; j < ci.length; j++) {
                y2 += Math.cos(2*Math.PI*j*x2)*ci[j];
            }
            if (i>0) {
                primitives.push({class:"line", text: "", arr0:[x1*xscale,y1,0], arr1:[x2*xscale,y2,0], rad:1.5, color:[1.0, 0.0, 0.0, 1.0]});
            }
            x1 = x2;
            y1 = y2;
        }
        primitives.push({class:"text", text: "0", arr0:[0,0,0]});
        primitives.push({class:"text", text: "1", arr0:[xscale,0,0]});
        primitives.push({class:"text", text: ci1[0].toFixed(1), arr0:[0,ci1[0]*yscale,0]});
    } else {
        scaleFactor = 0.7;
        centerTranslate = [-2.5,0,0];
        for (var j = 0; j < ci.length; j++) {
            primitives.push({class:"line", text: "", arr0:[j,0,0], arr1:[j,ci[j],0], rad:1.5, color:[1.0, 0.0, 0.0, 1.0]});
            primitives.push({class:"point", text: "", arr0:[j,ci[j],0], rad:3, color:[1.0, 0.0, 0.0, 1.0]});
            primitives.push({class:"text", text: j.toFixed(0), arr0:[j,0,0]});
        }
    }

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
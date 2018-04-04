var dimention="2d";
function initPoints() {
    points = [];
}
var ci = [];
function initDescr() {
    var conditions = "<h5>Пример 1.6.</h5> Выяснить, является ли линейно зависимой система векторов\\[\\left\\{ {3,\\ln \\left( {x + 1} \\right),\\ln 2{{\\left( {x + 1} \\right)}^2},\\left( {x + 1} \\right),x} \\right\\}\\] линейного пространства $C(-1,\\infty)$."
    $("#conditions").html(conditions);
    var algorithm = "<h5>Решение.</h5> Составим линейную комбинацию данных векторов и приравняем ее нулю:<br>\\[{{c_1} \\cdot 3 + {c_2}\\ln \\left( {x + 1} \\right) + {c_3}\\ln 2{{\\left( {x + 1} \\right)}^2} + {c_4}\\left( {x + 1} \\right) + {c_5}x = 0}\\]<br>Вопрос заключается в том, можно ли подобрать такие коэффициенты \\[{c_1},{c_2},...,{c_5}\\], не все равные нулю, чтобы это равенство было тождественно верным. Используя свойства логарифмов, преобразуем равенство следующим образом.<br>\\[{{c_1} \\cdot 3 + {c_2}\\ln \\left( {x + 1} \\right) + {c_3}\\left( {\\ln 2 + 2\\ln \\left( {x + 1} \\right)} \\right) +\\\\+ {c_4}\\left( {x + 1} \\right) + {c_5}x = 0}\\]  или \\(\\left( {3{c_1} + {c_3}\\ln 2 + {c_4}} \\right) + \\left( {{c_2} + 2{c_3}} \\right)\ln \\left( {x + 1} \\right) + \\left( {{c_4} + {c_5}} \\right)x = 0\\)<br> Очевидно, что равенство выполняется, если \\(\\left( {3{c_1} + {c_3}\ln 2 + {c_4}} \\right) = 0,\\;\\left( {{c_2} + 2{c_3}} \\right) = 0,\\;\\left( {{c_4} + {c_5}} \\right) = 0\\).<br>Отсюда следует, что можно подобрать коэффициенты, не все равные нулю, например, \\[{{c_3} = 0,{c_4} = 3 \\Rightarrow {c_1} =  - 1,{c_2} = 0,{c_5} =  - 3}\\], при которых линейная комбинация тождественно обратится в ноль. По определению данная система векторов является линейно зависимой. Построить графики двух функций $$y=3$$ $$y=c_2 \\ln(x+1)+c_3 \\ln\\left(2(x+1)^2\\right)+c_4 (x+1) + c_5 x$$ выбирая различные $c_2, c_3, c_4, c_5$<br>При $c_2=0,c_3=0,c_4=3,c_5=-3$ эти функции должны совпадать &mdash; сравнить их.";
    algorithm += '<table style="text-align: center">';
    algorithm += '<tr>';
    algorithm += '<td>$c_2$</td>';
    algorithm += '<td>$c_3$</td>';
    algorithm += '<td>$c_4$</td>';
    algorithm += '<td>$c_5$</td>';
    algorithm += '</tr>';
    algorithm += '<tr>';
    algorithm += '<td><input type="text" id="ans1" size=3 onchange="ci[0] = parseFloat(this.value);initBuffers();"></td>';
    algorithm += '<td><input type="text" id="ans2" size=3 onchange="ci[1] = parseFloat(this.value);initBuffers();"></td>';
    algorithm += '<td><input type="text" id="ans3" size=3 onchange="ci[2] = parseFloat(this.value);initBuffers();"></td>';
    algorithm += '<td><input type="text" id="ans4" size=3 onchange="ci[3] = parseFloat(this.value);initBuffers();"></td>';
    algorithm += '</tr>';
    algorithm += '</table>';

    $("#algorithm").html(algorithm);

    ci = [-1,1,1,-1];
    // ci = [0,0,3,-3];
    for (var i = 0; i < 4; i++) {
        $("#ans"+(i+1)).val(ci[i].toFixed(0));
    }

    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 1.6");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
function initData() {
    // isShowAxes = false;
    centerTranslate = [-5,0,0];
    var gnum = 100;
    for (var i = 0; i < gnum; i++) {
        var x1 = i/gnum*(100+0.5)-0.5;
        var y1 = ci[0]*Math.log(x1+1)+ci[1]*Math.log(2*(x1+1)*(x1+1))+ci[2]*(x1+1)+ci[3]*x1;
        var x2 = (i+1)/gnum*(100+0.5)-0.5;
        var y2 = ci[0]*Math.log(x2+1)+ci[1]*Math.log(2*(x2+1)*(x2+1))+ci[2]*(x2+1)+ci[3]*x2;
        primitives.push({class:"line", text: "", arr0:[x1/10,y1,0], arr1:[x2/10,y2,0], rad:1.5, color:[0.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"dashline", text: "", arr0:[-0.5/10,3,0], arr1:[100/10,3,0], rad:1.6, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"text", text: "-0.5", arr0:[-0.5/10,0,0]});
    primitives.push({class:"text", text: "100", arr0:[100/10,0,0]});
    primitives.push({class:"text", text: "3", arr0:[0,3,0]});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create(), movable: "free"});
    points.push({coord1: vec3.create([0,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create([1,3,0]), movable: "free"});
}
function initDescr() {
    $("#containerYellow").css({"min-width": "350px"});
    var descr = '';
    descr += '<h4>Траектория движения тела, брошенного под углом к горизонту</h4>';
    descr += '<p>Пусть имеется тело (мяч, пуля, снаряд, ракета и т.п.), которое бросают с начальной скоростью $v_0$ под углом $\\alpha_0$ к горизонту.\
              Силу сопротивления воздуха не учитываем. Вращением тела пренебрегаем (снаряд не вращается). Управления движением точки нет (неуправляемый снаряд, ракета).\
              Тогда на тело действует только сила тяжести $\\vec G$. Движение тела будет плоским и равноускоренным.</p>';
    descr += '<p>Согласно 2-му закону Ньютона уравнение движения тела имеет вид \\begin{equation}m \\vec a=\\vec G\\end{equation}\
              где $m$ - масса тела, $\\vec a$ - вектор ускорения.</p>';
    descr += '<p>В проекциях на оси Ox (горизонтальная ось) и Oy (вертикальная ось) уравнение движения имеет вид \
              \\begin{equation}\\begin{aligned} m \\frac{d^2x}{dt^2}&=0  \\\\ m \\frac{d^2y}{dt^2}&=-mg \\end{aligned}\\end{equation}\
              где $(x,y)$ - переменные координаты тела, $t$ - время.</p>';
    descr += '<p>Решение уравнения (2) имеет вид \
              \\begin{equation}\\begin{aligned} x &= C_1 t + C_2  \\\\ y &= -\\frac{g\\,t^2}{2}+C_3 t + C_4 \\end{aligned}\\end{equation}\
              где $C_1$, $C_2$, $C_3$ и $C_4$ - произвольные константы.</p>';
    descr += '<p>Учитывая начальные условия: \\begin{equation}\\begin{aligned}t=0:&\\quad x=0,\\;y=0, \\\\ &\\quad\\frac{dx}{dt}=v_0 \\cos \\alpha_0,\\;\\frac{dy}{dt}=v_0 \\sin \\alpha_0.\\end{aligned}\\end{equation} \
              После подстановки (3) в (4), находим \
              \\begin{align} x &= t\\,v_0\\,\\cos \\alpha_0 \\\\ y &= -\\frac{g\\,t^2}{2}+t\\,v_0\\,\\sin \\alpha_0 \\end{align}\
              Если из (5) выразить $t$ и подставить в (6), то получим уравнение <i>траектории движения тела</i>, брошенного с начальной скоростью $v_0$ под углом к горизонту $\\alpha_0$\
              \\begin{equation} y = a_{11}x^2+2b_1x\\end{equation}\
              где \\begin{equation}a_{11}=-\\frac{g}{2v_0^2\\cos^2 \\alpha_0},\\quad b_1=\\frac{1}{2}\\operatorname{tg}\\alpha_0\\end{equation}</p>';
    descr += '<p>Уравнение (7) представляет собой <i>параболу</i>, линия симметрии которой имеет вид \\begin{equation}x=\\frac{L}{2}\\end{equation}\
              где $L$ - максимальная дальность полёта тела.</p>';
    descr += '<p>Найдём $L$, приравнив в уравнении (7) $y=0,$ т.е. \\begin{equation}(a_{11}x+2b_1) x = 0\\end{equation}</p>';
    descr += '<p>В результате находим два значения \\begin{equation}x_1=0,\\quad x_2=-\\frac{2b_1}{a_{11}}\\end{equation}\
              первое - это начальное положение тела, а второе определяет искомую дальность полёта тела\
              \\begin{equation}L=x_2=\\frac{v_0^2 \\sin 2\\alpha_0}{g}\\end{equation}</p>';
    descr += '<p>Поскольку $\\sin 2\\alpha_0$ имеет на отрезке $0\\leqslant\\alpha_0\\leqslant\\frac{\\pi}{2}$ максимум при $\\alpha_0=\\frac{\\pi}{4}$, \
              то при именно таком угле бросания будет достигнута максимальная дальность \\begin{equation}L_{max}=\\frac{v_0^2}{g}\\end{equation}</p>';
    descr += '<p>При бросании реальных тел с небольшими начальными скоростями $v_0$, сопротивление воздуха мало и траектории близки к параболическим траекториям.</p>';
    descr += 'Свойства параболических траекторий:<ul style="margin-top: 0">\
                <li>восходящая ветвь траектории с точностью до отражения равна нисходящей,</li>\
                <li>угол падения по абсолютной величине равен углу бросания $\\alpha_0$,</li>\
                <li>конечная скорость тела равна начальной скорости $v_0$.</li></ul><br>';

    var tIS = 5;
    descr += '<p><label><input type="checkbox" onchange="changeAnimate(this.checked);"> Анимация премещения</label></p>';
    descr += "<p>$|\\vec v_0|=$ <input type='text' id='v0' size='"+tIS+"'> $\\frac{м}{с}$ <br>$\\alpha_0=$ <input type='text' id='alpha' size='"+tIS+"'> $град$</p>";

    descr += '<p><label><input type="checkbox" checked onchange="changeShow(0, this.checked);"> Координаты $v_{0x}$, $v_{0y}$ вектора начальной скорости $\\vec v_0$</label>';
    descr += '<label><input type="checkbox" checked onchange="changeShow(1, this.checked);"> Координаты $v_x$, $v_y$ вектора скорости $\\vec v$</label>';
    descr += '<label><input type="checkbox" checked onchange="changeShow(2, this.checked);"> Координаты $x$, $y$ брошенного тела</label></p>';

    descr += "<p>$L=$ <input type='text' id='L' size='"+tIS+"' readonly> $м$ <br>$H=$ <input type='text' id='H' size='"+tIS+"' readonly> $м$</p>";

    $("#description").html(descr);
    $("#v0").change(function(event){
        vec3.normalize(points[2].coord1);
        vec3.scale(points[2].coord1, Math.abs(parseFloat(this.value))/40);
        initBuffers();
    });
    $("#alpha").change(function(event){
        var alpha = parseFloat(this.value);
        var vlen = vec3.length(points[2].coord1);
        if (Math.abs(alpha) == 90) alpha += 0.001;
        points[2].coord1[0] = vlen*Math.cos(alpha/180*Math.PI);
        points[2].coord1[1] = vlen*Math.sin(alpha/180*Math.PI);
        initBuffers();
    });
    $("Title").html("Парабола");
    dispX = -5;
    dispY = -4;
}
var planeTimer;
var paramOfPoint = 0.5;
function changeAnimate(anim) {
    if (anim) {
        planeTimer = setInterval(function () {
            paramOfPoint += 0.03;
            if (paramOfPoint > maxT) paramOfPoint = minT;
            initBuffers();
        }, 40);
    } else {
        clearInterval(planeTimer);
        initBuffers();
    }
}
var isShow = [true, true, true];
function changeShow(what, checked) {
    isShow[what] = checked;
    initBuffers();
}
var minT;
var maxT;
function initData() {
    var arrRad = 2;
    var lineRad = 1.2;
    var pointRad = 4;
    var chosenPointRad = 5;

    var vscale = 4;

    var g = 9.81;
    var vx0 = (points[2].coord1[0]-points[1].coord1[0])*vscale;
    var vy0 = (points[2].coord1[1]-points[1].coord1[1])*vscale;
    var x0 = points[1].coord1[0];
    var y0 = points[1].coord1[1];

    primitives.push({class:"text", text: "O", pos: 'rt', arr0:[0,0,0]});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[0].coord1) {
            paramOfPoint = (points[0].coord1[0]-x0) / vx0;
        }
    }
    primitives.push({class:"arrow", text: katex.renderToString('\\vec v_0'), ratio: 1, arr0:points[1].coord1, arr1:points[2].coord1, rad:arrRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arc", text: katex.renderToString('\\alpha_0'), ratio: 1, arr0:points[1].coord1, arr1:points[2].coord1, arr2:[1,0,0], Rad:1, rad:arrRad, color:[0.5, 0.0, 1.0, 1.0]});

    var point4vec = vec3.create(points[2].coord1);
    vec3.normalize(point4vec);
    var angle = Math.acos(point4vec[0]);
    if (point4vec[1]<0) angle *= -1;
    $("#v0").val(parseFloat(vec3.length(points[2].coord1)*40).toFixed(0));
    $("#alpha").val(parseFloat(angle/Math.PI*180).toFixed(0));
    let slices = 40;
    let vertices = [];
    minT = 0;
    maxT = (vy0 + Math.sqrt(vy0*vy0 + 2*g*y0)) / g;

    var pointL = [x0 + maxT*vx0, y0 + maxT*vy0 - maxT*maxT*g/2.0, 0.0];
    var pointHalfL = [x0 + maxT/2.0*vx0, y0 + maxT/2.0*vy0 - maxT*maxT/4.0*g/2.0, 0.0];

    $("#L").val(parseFloat( Math.abs((pointL[0]*100).toFixed(0)) ));
    $("#H").val(parseFloat( Math.abs((pointHalfL[1]*100).toFixed(0)) ));

    if (paramOfPoint < minT) minT = paramOfPoint;
    if (paramOfPoint > maxT) maxT = paramOfPoint;

    for (var i = 0; i <= slices; i++) {
        var t = (i/slices)*(maxT-minT) + minT;
        var px = x0 + t*vx0;
        var py = y0 + t*vy0 - t*t*g/2.0;
        vertices.push( [px,py,0.0] );
    }

    vec3.set([x0 + paramOfPoint*vx0, y0 + paramOfPoint*vy0 - paramOfPoint*paramOfPoint*g/2.0, 0.0], points[0].coord1);
    var pointM = points[0].coord1;
    var pointV0 = [vx0, vy0 - g * paramOfPoint, 0.0];
    var pointV = [];
    vec3.scale(pointV0, 1.0/vscale);
    vec3.add(pointV0, pointM, pointV);
    for (var i = 0; i < vertices.length-1; i++) {
        primitives.push({class:"line", text: "", arr0:vertices[i], arr1:vertices[i+1], rad:lineRad, color:[0.4, 0.4, 0.8, 1.0]});
    }
    primitives.push({class:"point", text: "", arr0:pointHalfL, rad:pointRad, color:[0.0, 0.0, 0.7, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:pointHalfL, arr1:[pointHalfL[0],0,0], rad:1.2, color:[0.4, 0.6, 0.8, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:pointHalfL, arr1:[0,pointHalfL[1],0], rad:1.2, color:[0.4, 0.6, 0.8, 1.0]});
    primitives.push({class:"text", text: katex.renderToString('\\frac{L}{2}'), pos: 'ct', arr0:[pointHalfL[0],0,0]});
    primitives.push({class:"text", text: katex.renderToString('H'), pos: 'rc', arr0:[0,pointHalfL[1],0]});
    primitives.push({class:"point", text: katex.renderToString('L'), pos: 'ct', arr0:pointL, rad:pointRad, color:[0.0, 0.0, 0.7, 1.0]});
    primitives.push({class:"point", text: "", arr0:pointM, rad:pointRad, color:[0.0, 0.0, 0.7, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString('\\vec v'), ratio: 1, arr0:pointM, arr1:pointV, rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString('\\vec G'), ratio: 1, arr0:pointM, arr1:[pointM[0],pointM[1]-2,0.0], rad:arrRad, color:[0.8, 0.8, 0.0, 1.0]});

    function pushCoordLines(point, color, labelx, labely) {
        primitives.push({class:"dashline", text: "", arr0:point, arr1:[point[0],0,0], rad:1.2, color:color});
        primitives.push({class:"dashline", text: "", arr0:point, arr1:[0,point[1],0], rad:1.2, color:color});
        primitives.push({class:"text", text: labelx, arr0:[point[0],0,0]});
        primitives.push({class:"text", text: labely, arr0:[0,point[1],0]});
    }
    function pushVectorCoordLines(point1, point2, color, labelx, labely) {
        primitives.push({class:"dashline", text: labely, pos: "lc", arr0:point2, arr1:[point2[0],point1[1],0], rad:1.2, color:color});
        primitives.push({class:"dashline", text: labelx, pos: "cb", arr0:point2, arr1:[point1[0],point2[1],0], rad:1.2, color:color});
        primitives.push({class:"dashline", text: "", arr0:point1, arr1:[point2[0],point1[1],0], rad:1.2, color:color});
        primitives.push({class:"dashline", text: "", arr0:point1, arr1:[point1[0],point2[1],0], rad:1.2, color:color});
    }
    if (isShow[0])
        pushVectorCoordLines(points[1].coord1, points[2].coord1, [0.8, 0.0, 0.0, 1.0], katex.renderToString("v_{0x}"), katex.renderToString("v_{0y}"));

    if (isShow[1])
        pushVectorCoordLines(pointM, pointV, [0.0, 0.6, 0.0, 1.0], katex.renderToString("v_x"), katex.renderToString("v_y"));

    if (isShow[2])
        pushCoordLines(pointM, [0.0, 0.8, 0.8, 1.0], katex.renderToString("x"), katex.renderToString("y"));
}
var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([3,0,0]), movable: "line", vector: vec3.create([1,0,0])});
    points.push({coord1: vec3.create([2,0,0]), movable: "line", vector: vec3.create([1,0,0])});
    points.push({coord1: vec3.create([-3,0,0]), movable: "line", vector: vec3.create([1,0,0])});
    points.push({coord1: vec3.create([-2,0,0]), movable: "line", vector: vec3.create([1,0,0])});
    points.push({coord1: vec3.create(), movable: "free"});
    a = Math.abs(points[0].coord1[0]);
    c = Math.abs(points[1].coord1[0]);
}
function initDescr() {
    var descr = '';
    descr += '<p>Каноническое уравнение эллипса:$$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=1$$</p>';
    descr += '<label><input type="checkbox" checked onchange="isShowC = this.checked; initBuffers();"> $2c$ - фокальное расстояние.</label>';
    descr += '<p>$a$ - большая полуось эллипса,<br>';
    descr += '$b=\\sqrt{a^2-c^2}$ - малая полуось эллипса,<br>';
    descr += '$F_1$, $F_2$ - фокусы эллипса.</p>';
    descr += '$\\varepsilon=\\frac c a$ - эксцентриситет. $0 \\leqslant \\varepsilon < 1$</p>';
    descr += '<label><input type="checkbox" checked onchange="isShowd = this.checked; initBuffers();"> $\\frac a \\varepsilon$ - расстояние до директрисы $d$ (и $d\'$).</label>';
    descr += '<label><input type="checkbox" checked onchange="isShowMB = this.checked; initBuffers();"> $|MB|$ - расстояние от точки $M$ до директрисы $d$.</label>';
    descr += '$\\frac{|MF_2|}{|MB|}=const$</p>';
    var tIS = 5;
    descr += "<p>$a$<input type='text' id='a' size='"+tIS+"'> $c$<input type='text' id='c' size='"+tIS+"'></p>";
    $("#description").html(descr);
    $("#a").change(function(event){
        points[0].coord1[0] = Math.abs(parseFloat(this.value));
    a = Math.abs(points[0].coord1[0]);
    c = Math.abs(points[1].coord1[0]);
        if (a<=c) points[0].coord1[0] = points[1].coord1[0];
        points[2].coord1[0] = -points[0].coord1[0];
        initBuffers();
    });
    $("#c").change(function(event){
        points[1].coord1[0] = Math.abs(parseFloat(this.value));
    a = Math.abs(points[0].coord1[0]);
    c = Math.abs(points[1].coord1[0]);
        if (c>=a) points[1].coord1[0] = points[0].coord1[0];
        points[3].coord1[0] = -points[1].coord1[0];
        initBuffers();
    });
    $("Title").html("Свойства эллипса");
}
var a;
var c;
var isShowC = true;
var isShowd = true;
var isShowMB = true;
var paramOfPoint = Math.PI/4;
function initData() {
    var arrRad = 2;
    var lineRad = 1.3;
    var pointRad = 4;
    var chosenPointRad = 5;

    a = Math.abs(points[0].coord1[0]);
    c = Math.abs(points[1].coord1[0]);
    var b = Math.sqrt(a*a-c*c);

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad+2, color:[1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[0].coord1) {
            if (a<=c) points[0].coord1[0] = points[1].coord1[0];
            points[2].coord1[0] = -points[0].coord1[0];
        }
        if (arrPoint == points[2].coord1) {
            if (Math.abs(points[2].coord1[0])<=c) points[2].coord1[0] = points[3].coord1[0];
            points[0].coord1[0] = -points[2].coord1[0];
        }
        if (arrPoint == points[1].coord1) {
            if (c>=a) points[1].coord1[0] = points[0].coord1[0];
            points[3].coord1[0] = -points[1].coord1[0];
        }
        if (arrPoint == points[3].coord1) {
            if (Math.abs(points[3].coord1[0])>=a) points[3].coord1[0] = points[2].coord1[0];
            points[1].coord1[0] = -points[3].coord1[0];
        }
        if (arrPoint == points[4].coord1) {
            var point4vec = vec3.create(points[4].coord1);
            point4vec[0] /= a;
            point4vec[1] /= b;
            vec3.normalize(point4vec);
            paramOfPoint = Math.acos(point4vec[0]);
            if (point4vec[1]<0) paramOfPoint *= -1;
        }
    }

    a = Math.abs(points[0].coord1[0]);
    c = Math.abs(points[1].coord1[0]);

    $("#a").val(parseFloat(a.toPrecision(3)));
    $("#c").val(parseFloat(c.toPrecision(3)));

    b = Math.sqrt(a*a-c*c);

    var epsilon = c/a;
    var d = a/epsilon;

    let slices = 160;
    let vertices = [];
    for (var i = 0; i <= slices; i++) {
        var psi = i*2*Math.PI/slices;
        vertices.push( [a*Math.cos(psi),b*Math.sin(psi),0.0] );
    }
    for (var i = 0; i < vertices.length-1; i++) {
        primitives.push({class:"line", text: "", arr0:vertices[i], arr1:vertices[i+1], rad:arrRad, color:[0.0, 0.0, 1.0, 1.0]});
    }
    vec3.set([a*Math.cos(paramOfPoint),b*Math.sin(paramOfPoint),0.0],points[4].coord1);
    var pointM = points[4].coord1;

    var focus1 = [-c,0,0];
    var focus2 = [c,0,0];

    var pointB = [d,pointM[1],0];
    var pointd11 = [d,-b*2-1,0];
    var pointd12 = [d,b*2+1,0];
    var pointd21 = [-d,-b*2-1,0];
    var pointd22 = [-d,b*2+1,0];

    primitives.push({class:"line", text: "a", arr0:[0,0,0], arr1:[a,0,0], rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"line", text: "b", arr0:[0,0,0], arr1:[0,b,0], rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
    if (isShowC) {
        primitives.push({class:"dashline", text: "c", pos: 'lt', arr0:[0,0,0], arr1:focus2, rad:arrRad*1.2, color:[0.0, 0.6, 1.0, 1.0]});
    }
    if (isShowd) {
        primitives.push({class:"line", text: "d", pos: 'lt', ratio:0.8,  arr0:pointd11, arr1:pointd12, rad:arrRad, color:[0.0, 0.8, 0.0, 1.0]});
        primitives.push({class:"line", text: "d'", pos: 'lt', ratio:0.8, arr0:pointd21, arr1:pointd22, rad:arrRad, color:[0.0, 0.8, 0.0, 1.0]});
    }
    if (isShowMB) {
        primitives.push({class:"point", text: katex.renderToString('B'), arr0:pointB, rad:pointRad, color:[0.0, 0.6, 0.0, 1.0]});
        primitives.push({class:"dashline", text: "", arr0:pointB, arr1:pointM, rad:lineRad, color:[1.0, 0.7, 0.0, 1.0]});
    }
    primitives.push({class:"point", text: katex.renderToString("A_1"), arr0:[-a,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("A_2"), arr0:[a,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    // primitives.push({class:"point", text: katex.renderToString("B_1"), arr0:[0,-b,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    // primitives.push({class:"point", text: katex.renderToString("B_2"), arr0:[0,b,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("F_1"), arr0:focus1, rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("F_2"), arr0:focus2, rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString('M'), arr0:pointM, rad:pointRad, color:[0.0, 0.0, 0.7, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:focus1, arr1:pointM, rad:lineRad, color:[0.7, 0.7, 0.0, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:focus2, arr1:pointM, rad:lineRad, color:[0.7, 0.7, 0.0, 1.0]});
}
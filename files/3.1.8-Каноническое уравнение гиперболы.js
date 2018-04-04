var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([3,0,0]), movable: "line", vector: vec3.create([1,0,0])});
    points.push({coord1: vec3.create([0,2,0]), movable: "line", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([-3,0,0]), movable: "line", vector: vec3.create([1,0,0])});
    points.push({coord1: vec3.create([0,-2,0]), movable: "line", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create(), movable: "free"});
    a = Math.abs(points[0].coord1[0]);
    b = Math.abs(points[1].coord1[1]);
}
function initDescr() {
    var descr = '';
    descr += '<p>Каноническое уравнение гиперболы:$$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=1$$</p>';
    descr += '<p>$a$ - действительная полуось гиперболы,<br>';
    descr += '$b$ - мнимая полуось гиперболы,<br>';
    descr += '$F_1$, $F_2$ - фокусы гиперболы.</p>';
    descr += '<label><input type="checkbox" checked onchange="isShowC = this.checked; initBuffers();"> $2c$ - фокальное расстояние.</label>';
    var tIS = 5;
    descr += "<p>$a$<input type='text' id='a' size='"+tIS+"'> $b$<input type='text' id='b' size='"+tIS+"'></p>";
    $("#description").html(descr);
    $("#a").change(function(event){points[0].coord1[0] = Math.abs(parseFloat(this.value));points[2].coord1[0] = -points[0].coord1[0];initBuffers();});
    $("#b").change(function(event){points[1].coord1[1] = Math.abs(parseFloat(this.value));points[3].coord1[1] = -points[1].coord1[1];initBuffers();});
    $("Title").html("Каноническое уравнение гиперболы");
}
var a;
var b;
var isShowC = true;

var paramOfPoint1 = Math.PI/4;
var paramOfPoint2 = 1;
function initData() {
    var arrRad = 2;
    var lineRad = 1;
    var pointRad = 4;
    var chosenPointRad = 5;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad+2, color:[1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[0].coord1) {points[2].coord1[0] = -points[0].coord1[0];}
        if (arrPoint == points[2].coord1) {points[0].coord1[0] = -points[2].coord1[0];}
        if (arrPoint == points[1].coord1) {points[3].coord1[1] = -points[1].coord1[1];}
        if (arrPoint == points[3].coord1) {points[1].coord1[1] = -points[3].coord1[1];}
        if (arrPoint == points[4].coord1) {
            var point4vec = vec3.create(points[4].coord1);
            point4vec[0] /= a;
            point4vec[1] /= b;
            paramOfPoint1 = Math.asinh(point4vec[1]);
            if (point4vec[0]>=0) paramOfPoint2 = 1;
            else paramOfPoint2 = -1;
        }
    }
    a = Math.abs(points[0].coord1[0]);
    b = Math.abs(points[1].coord1[1]);

    $("#a").val(parseFloat(a.toPrecision(3)));
    $("#b").val(parseFloat(b.toPrecision(3)));

    var c = Math.sqrt(a*a+b*b);

    let slices = 160/2;
    let vertices = [];
    for (var i = 0; i <= slices; i++) {
        var psi = (i/slices-0.5)*5;
        vertices.push( [a*Math.cosh(psi),b*Math.sinh(psi),0.0] );
    }
    for (var i = 0; i <= slices; i++) {
        var psi = (i/slices-0.5)*5;
        vertices.push( [-a*Math.cosh(psi),b*Math.sinh(psi),0.0] );
    }
    for (var i = 0; i < vertices.length/2-1; i++) {
        primitives.push({class:"line", text: "", arr0:vertices[i], arr1:vertices[i+1], rad:arrRad, color:[0.0, 0.0, 1.0, 1.0]});
    }
    for (var i = vertices.length/2; i < vertices.length-1; i++) {
        primitives.push({class:"line", text: "", arr0:vertices[i], arr1:vertices[i+1], rad:arrRad, color:[0.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"line", text: "", arr0:[-a,b,0], arr1:[a,b,0], rad:lineRad, color:[0.0, 0.7, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:[-a,-b,0], arr1:[a,-b,0], rad:lineRad, color:[0.0, 0.7, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:[a,-b,0], arr1:[a,b,0], rad:lineRad, color:[0.0, 0.7, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:[-a,-b,0], arr1:[-a,b,0], rad:lineRad, color:[0.0, 0.7, 0.0, 1.0]});

    var mult = Math.cosh(0.5*5);
    primitives.push({class:"dashline", text: "", arr0:[-a*mult,-b*mult,0], arr1:[a*mult,b*mult,0], rad:lineRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:[a*mult,-b*mult,0], arr1:[-a*mult,b*mult,0], rad:lineRad, color:[0.0, 0.0, 1.0, 1.0]});

    vec3.set([paramOfPoint2*a*Math.cosh(paramOfPoint1),b*Math.sinh(paramOfPoint1),0.0],points[4].coord1);
    var pointM = points[4].coord1;

    primitives.push({class:"line", text: "a", arr0:[0,0,0], arr1:[a,0,0], rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"line", text: "b", arr0:[0,0,0], arr1:[0,b,0], rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});

    if (isShowC) {
        primitives.push({class:"dashline", text: "", arr0:[0,0,0], arr1:[a,0,0], rad:arrRad*1.2, color:[0.0, 0.6, 1.0, 1.0]});
        primitives.push({class:"line", text: "", arr0:[a,0,0], arr1:[c,0,0], rad:arrRad*1.2, color:[0.0, 0.6, 1.0, 1.0]});
        primitives.push({class:"text", text: "c", pos: 'lt', arr0:[c/2,0,0]});
    }
    primitives.push({class:"point", text: katex.renderToString("A_1"), arr0:[-a,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("A_2"), arr0:[a,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("B_1"), arr0:[0,-b,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("B_2"), arr0:[0,b,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("F_1"), arr0:[-c,0,0], rad:pointRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("F_2"), arr0:[c,0,0], rad:pointRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString('M'), arr0:pointM, rad:pointRad, color:[0.0, 0.0, 0.7, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:[-c,0,0], arr1:pointM, rad:lineRad, color:[0.7, 0.7, 0.0, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:[c,0,0], arr1:pointM, rad:lineRad, color:[0.7, 0.7, 0.0, 1.0]});
}
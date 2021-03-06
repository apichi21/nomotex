var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([3,0,0]), movable: "line", vector: vec3.create([1,0,0])});
    points.push({coord1: vec3.create([0,2,0]), movable: "line", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([-3,0,0]), movable: "line", vector: vec3.create([1,0,0])});
    points.push({coord1: vec3.create([0,-2,0]), movable: "line", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create(), movable: "free"});
    points.push({coord1: vec3.create(), movable: "free"});
    a = Math.abs(points[0].coord1[0]);
    b = Math.abs(points[1].coord1[1]);
}
function initDescr() {
    var descr = '';
    descr += '<label><input type="checkbox" checked onchange="isShowM0 = this.checked; initBuffers();"> Касательная $l$ к эллипсу в точке $(x_0,y_0)$</label>';
    descr += '<label><input type="checkbox" checked onchange="isShowM1 = this.checked; initBuffers();"> Секущая $l\'$ эллипса, проходящая через точки $(x_0,y_0)$ и $M(x,y)$</label>';
    $("#description").html(descr);
    $("Title").html("Кривые и поверхности второго порядка");
}
var a;
var b;
var isShowM0 = true;
var isShowM1 = true;
var paramOfPoint1 = Math.PI/3;
var paramOfPoint2 = -Math.PI/4;
function initData() {
    var arrRad = 2;
    var lineRad = 1;
    var pointRad = 4;
    var chosenPointRad = 5;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad+2, color:[1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[0].coord1) points[2].coord1[0] = -points[0].coord1[0];
        if (arrPoint == points[2].coord1) points[0].coord1[0] = -points[2].coord1[0];
        if (arrPoint == points[1].coord1) points[3].coord1[1] = -points[1].coord1[1];
        if (arrPoint == points[3].coord1) points[1].coord1[1] = -points[3].coord1[1];
        if (arrPoint == points[4].coord1) {
            var point4vec = vec3.create(points[4].coord1);
            point4vec[0] /= a;
            point4vec[1] /= b;
            vec3.normalize(point4vec);
            paramOfPoint1 = Math.acos(point4vec[0]);
            if (point4vec[1]<0) paramOfPoint1 *= -1;
        }
        if (arrPoint == points[5].coord1) {
            var point4vec = vec3.create(points[5].coord1);
            point4vec[0] /= a;
            point4vec[1] /= b;
            vec3.normalize(point4vec);
            paramOfPoint2 = Math.acos(point4vec[0]);
            if (point4vec[1]<0) paramOfPoint2 *= -1;
        }
    }
    a = Math.abs(points[0].coord1[0]);
    b = Math.abs(points[1].coord1[1]);

    // $("#a").val(parseFloat(a.toPrecision(3)));
    // $("#b").val(parseFloat(b.toPrecision(3)));

    var c = a>=b?Math.sqrt(a*a-b*b):Math.sqrt(b*b-a*a);

    let slices = 160;
    let vertices = [];
    for (var i = 0; i <= slices; i++) {
        var psi = i*2*Math.PI/slices;
        vertices.push( [a*Math.cos(psi), b*Math.sin(psi), 0.0] );
    }
    for (var i = 0; i < vertices.length-1; i++) {
        primitives.push({class:"line", text: "", arr0:vertices[i], arr1:vertices[i+1], rad:arrRad, color:[0.0, 0.0, 1.0, 1.0]});
    }
    vec3.set([a*Math.cos(paramOfPoint1), b*Math.sin(paramOfPoint1), 0.0], points[4].coord1);
    vec3.set([a*Math.cos(paramOfPoint2), b*Math.sin(paramOfPoint2), 0.0], points[5].coord1);

    var focus1 = a>=b?[-c,0,0]:[0,-c,0];
    var focus2 = a>=b?[c,0,0]:[0,c,0];

    function pushCoordLines(point, color, labelx, labely) {
        primitives.push({class:"dashline", text: "", arr0:point, arr1:[point[0],0,0], rad:1.2, color:color});
        primitives.push({class:"dashline", text: "", arr0:point, arr1:[0,point[1],0], rad:1.2, color:color});
        primitives.push({class:"text", text: labelx, arr0:[point[0],0,0]});
        primitives.push({class:"text", text: labely, arr0:[0,point[1],0]});
    }
    pushCoordLines(points[4].coord1, [0.8, 0.0, 0.0, 1.0], katex.renderToString("x_0"), katex.renderToString("y_0"));
    pushCoordLines(points[5].coord1, [0.8, 0.0, 0.0, 1.0], katex.renderToString("x"), katex.renderToString("y"));

    var p1 = [];
    var p2 = [];
    createLine(points[4].coord1, points[5].coord1, p1, p2, 15);


    var v1 = [];
    vec3.subtract(focus1, points[4].coord1, v1);
    vec3.normalize(v1);
    var v2 = [];
    vec3.subtract(focus2, points[4].coord1, v2);
    vec3.normalize(v2);

    var vsum12 = [];
    vec3.add(v1, v2, vsum12);

    var vsum12 = [];
    vec3.add(v1, v2, vsum12);
    var pTangent1 = [];
    var pTangent2 = [];
    createLine(points[4].coord1, [points[4].coord1[0]-vsum12[1], points[4].coord1[1]+vsum12[0], 0], pTangent1, pTangent2, 15);

    if (isShowM1) {
        primitives.push({class:"dashline", text: katex.renderToString("l'"), ratio: 0.65, arr0:p1, arr1:p2, rad:lineRad*1.5, color:[0.0, 0.6, 1.0, 1.0]});
    }

    if (isShowM0) {
        primitives.push({class:"line", text: katex.renderToString("l"), ratio: 0.65, arr0:pTangent1, arr1:pTangent2, rad:lineRad*1.2, color:[0.0, 0.8, 0.0, 1.0]});
    }
    primitives.push({class:"point", text: "", arr0:[-a,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:[a,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:[0,-b,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:[0,b,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    // primitives.push({class:"point", text: katex.renderToString("F_1"), arr0:focus1, rad:pointRad, color:[0.0, 0.0, 1.0, 1.0]});
    // primitives.push({class:"point", text: katex.renderToString("F_2"), arr0:focus2, rad:pointRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[4].coord1, rad:pointRad, color:[0.0, 0.8, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString('M'), arr0:points[5].coord1, rad:pointRad, color:[0.0, 0.5, 0.8, 1.0]});
    // primitives.push({class:"dashline", text: "", arr0:focus1, arr1:points[4].coord1, rad:lineRad, color:[0.7, 0.7, 0.0, 1.0]});
    // primitives.push({class:"dashline", text: "", arr0:focus2, arr1:points[4].coord1, rad:lineRad, color:[0.7, 0.7, 0.0, 1.0]});
}
var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([1,0,0]), movable: "line", vector: vec3.create([1,0,0])});
    points.push({coord1: vec3.create(), movable: "free"});
    points.push({coord1: vec3.create(), movable: "free"});
}
function initDescr() {
    var descr = '';
    descr += '<label><input type="checkbox" checked onchange="isShowM0 = this.checked; initBuffers();"> Касательная $l$ к параболе в точке $(x_0,y_0)$</label>';
    descr += '<label><input type="checkbox" checked onchange="isShowM1 = this.checked; initBuffers();"> Секущая $l\'$ параболы, проходящая через точки $(x_0,y_0)$ и $M(x,y)$</label>';
    $("#description").html(descr);
    $("Title").html("Кривые и поверхности второго порядка");
}
var isShowM0 = true;
var isShowM1 = true;
var paramOfPoint1 = 2.5;
var paramOfPoint2 = -2;
function initData() {
    var arrRad = 2;
    var lineRad = 1;
    var pointRad = 4;
    var chosenPointRad = 5;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad+2, color:[1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[1].coord1) {
            paramOfPoint1 = points[1].coord1[1];
        }
        if (arrPoint == points[2].coord1) {
            paramOfPoint2 = points[2].coord1[1];
        }
    }
    var p = points[0].coord1[0]*2;
    // $("#p").val(parseFloat(p.toPrecision(3)));

    let slices = 160;
    let vertices = [];
    var maxLen0 = 10;
    var maxLen = maxLen0;
    if (maxLen*maxLen/2/Math.abs(p) > maxLen) {
        maxLen = Math.sqrt(maxLen*2*Math.abs(p));
    }
    for (var i = 0; i <= slices; i++) {
        var psi = (i/slices-0.5)*maxLen*2;
        vertices.push( [psi*psi/2/p,psi,0.0] );
    }

    vec3.set([paramOfPoint1*paramOfPoint1/2/p,paramOfPoint1,0.0],points[1].coord1);
    vec3.set([paramOfPoint2*paramOfPoint2/2/p,paramOfPoint2,0.0],points[2].coord1);

    function pushCoordLines(point, color, labelx, labely) {
        primitives.push({class:"dashline", text: "", arr0:point, arr1:[point[0],0,0], rad:1.2, color:color});
        primitives.push({class:"dashline", text: "", arr0:point, arr1:[0,point[1],0], rad:1.2, color:color});
        primitives.push({class:"text", text: labelx, arr0:[point[0],0,0]});
        primitives.push({class:"text", text: labely, arr0:[0,point[1],0]});
    }
    pushCoordLines(points[1].coord1, [0.8, 0.0, 0.0, 1.0], katex.renderToString("x_0"), katex.renderToString("y_0"));
    pushCoordLines(points[2].coord1, [0.8, 0.0, 0.0, 1.0], katex.renderToString("x"), katex.renderToString("y"));

    var p1 = [];
    var p2 = [];
    createLine(points[1].coord1, points[2].coord1, p1, p2, 25);

    var v1 = [];
    vec3.subtract([p/2,0,0], points[1].coord1, v1);
    vec3.normalize(v1);
    var v2 = [1, 0, 0];

    var vsum12 = [];
    vec3.add(v1, v2, vsum12);

    var vsum12 = [];
    vec3.add(v1, v2, vsum12);
    var pTangent1 = [];
    var pTangent2 = [];
    createLine(points[1].coord1, [points[1].coord1[0]-vsum12[1], points[1].coord1[1]+vsum12[0], 0], pTangent1, pTangent2, 25);

    for (var i = 0; i < vertices.length-1; i++) {
        primitives.push({class:"line", text: "", arr0:vertices[i], arr1:vertices[i+1], rad:arrRad, color:[0.0, 0.0, 1.0, 1.0]});
    }

    if (isShowM1) {
        primitives.push({class:"dashline", text: katex.renderToString("l'"), ratio: 0.6, arr0:p1, arr1:p2, rad:lineRad*1.5, color:[0.0, 0.6, 1.0, 1.0]});
    }

    if (isShowM0) {
        primitives.push({class:"line", text: katex.renderToString("l"), ratio: 0.55, arr0:pTangent1, arr1:pTangent2, rad:lineRad*1.2, color:[0.0, 0.8, 0.0, 1.0]});
    }
    primitives.push({class:"point", text: "", arr0:[p/2,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});

    // primitives.push({class:"point", text: "", arr0:[-a,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    // primitives.push({class:"point", text: "", arr0:[a,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    // primitives.push({class:"point", text: "", arr0:[0,-b,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    // primitives.push({class:"point", text: "", arr0:[0,b,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    // primitives.push({class:"point", text: katex.renderToString("F_1"), arr0:focus1, rad:pointRad, color:[0.0, 0.0, 1.0, 1.0]});
    // primitives.push({class:"point", text: katex.renderToString("F_2"), arr0:focus2, rad:pointRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[1].coord1, rad:pointRad, color:[0.0, 0.8, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString('M'), arr0:points[2].coord1, rad:pointRad, color:[0.0, 0.5, 0.8, 1.0]});
    // primitives.push({class:"dashline", text: "", arr0:focus1, arr1:points[1].coord1, rad:lineRad, color:[0.7, 0.7, 0.0, 1.0]});
    // primitives.push({class:"dashline", text: "", arr0:focus2, arr1:points[1].coord1, rad:lineRad, color:[0.7, 0.7, 0.0, 1.0]});
}
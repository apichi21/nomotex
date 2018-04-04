var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([1,0,0]), movable: "line", vector: vec3.create([1,0,0])});
    points.push({coord1: vec3.create(), movable: "free"});
}
function initDescr() {
    $("Title").html("Кривые и поверхности второго порядка");
}
var paramOfPoint1 = 2.5;
function initData() {
    var arrRad = 2;
    var lineRad = 1.5;
    var pointRad = 4;
    var chosenPointRad = 5;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad+2, color:[1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[1].coord1) {
            paramOfPoint1 = points[1].coord1[1];
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
    for (var i = 0; i < vertices.length-1; i++) {
        primitives.push({class:"line", text: "", arr0:vertices[i], arr1:vertices[i+1], rad:arrRad, color:[0.0, 0.0, 1.0, 1.0]});
    }

    vec3.set([paramOfPoint1*paramOfPoint1/2/p,paramOfPoint1,0.0],points[1].coord1);

    var v1 = [];
    vec3.subtract([p/2,0,0], points[1].coord1, v1);
    vec3.normalize(v1);
    var v2 = [1, 0, 0];

    var vsum12 = [];
    vec3.add(v1, v2, vsum12);
    vec3.normalize(vsum12);

    var vTangent1 = [-vsum12[1]*20, vsum12[0]*20, 0];
    var vTangent2 = [vsum12[1]*20, -vsum12[0]*20, 0];
    var pTangent1 = [];
    var pTangent2 = [];
    vec3.add(points[1].coord1, vTangent1, pTangent1);
    vec3.add(points[1].coord1, vTangent2, pTangent2);

    primitives.push({class:"line", text: katex.renderToString("l"), ratio: 0.65, arr0:pTangent1, arr1:pTangent2, rad:lineRad*1.2, color:[0.0, 0.8, 0.0, 1.0]});

    var arrowColor = [0.9, 0.5, 0.0, 1.0];
    var arcColor = [0.8, 0.4, 0.0, 1.0];
    primitives.push({class:"line", text: katex.renderToString('r'), arr0:[p/2,0,0], arr1:points[1].coord1, rad:lineRad, color:arrowColor});
    primitives.push({class:"line", text: katex.renderToString('l\''), arr0:points[1].coord1, arr1:[maxLen*maxLen/2/p, points[1].coord1[1], 0], rad:lineRad, color:arrowColor});
    primitives.push({class:"point", text: katex.renderToString('A'), pos: points[1].coord1[1]>0?'rb':'rt', arr0:[-points[1].coord1[0], 0, 0], rad:pointRad, color:[0.0, 0.6, 0.0, 1.0]});
    primitives.push({class:"text", pos: 'ct', text: katex.renderToString("-x_0"), arr0:[-points[1].coord1[0], 0, 0]});

    function pushCoordLines(point, color, labelx, labely) {
        primitives.push({class:"dashline", text: "", arr0:point, arr1:[point[0],0,0], rad:1.2, color:color});
        primitives.push({class:"dashline", text: "", arr0:point, arr1:[0,point[1],0], rad:1.2, color:color});
        primitives.push({class:"text", pos: 'ct', text: labelx, arr0:[point[0],0,0]});
        primitives.push({class:"text", pos: 'rc', text: labely, arr0:[0,point[1],0]});
    }
    pushCoordLines(points[1].coord1, [0.8, 0.0, 0.0, 1.0], katex.renderToString("x_0"), katex.renderToString("y_0"));

    if (vec3.dot(vTangent1, v1) >= 0) {
        primitives.push({class:"arc", text: katex.renderToString('\\alpha'), ratio: 1.5, arr0:points[1].coord1, arr1:[p/2,0,0], arr2:pTangent1, rad:lineRad, Rad:0.45, color:arcColor});
        primitives.push({class:"arc", text: katex.renderToString('\\alpha'), ratio: 1.5, arr0:points[1].coord1, arr1:[points[1].coord1[0]+1, points[1].coord1[1], 0], arr2:pTangent2, rad:lineRad, Rad:0.52, color:arcColor});

        primitives.push({class:"arc", text: katex.renderToString('\\alpha'), ratio: 1.5, arr0:[-points[1].coord1[0], 0, 0], arr1:[0, 0, 0], arr2:pTangent2, rad:lineRad, Rad:0.45, color:arcColor});

    } else {
        primitives.push({class:"arc", text: katex.renderToString('\\alpha'), ratio: 1.5, arr0:points[1].coord1, arr1:[p/2,0,0], arr2:pTangent2, rad:lineRad, Rad:0.45, color:arcColor});
        primitives.push({class:"arc", text: katex.renderToString('\\alpha'), ratio: 1.5, arr0:points[1].coord1, arr1:[points[1].coord1[0]+1, points[1].coord1[1], 0], arr2:pTangent1, rad:lineRad, Rad:0.52, color:arcColor});

        primitives.push({class:"arc", text: katex.renderToString('\\alpha'), ratio: 1.5, arr0:[-points[1].coord1[0], 0, 0], arr1:[0, 0, 0], arr2:pTangent1, rad:lineRad, Rad:0.45, color:arcColor});
    }

    primitives.push({class:"point", text: katex.renderToString('F'), arr0:[p/2,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});

    primitives.push({class:"point", text: katex.renderToString('M_0'), pos: points[1].coord1[1]>0?'rb':'rt', arr0:points[1].coord1, rad:pointRad, color:[0.0, 0.6, 0.0, 1.0]});
}
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
    var descr = 'Все лучи, выходящие из первого фокуса $F_1$ (или $F_2$), отражаясь от поверхности правой (или левой) ветви гиперболы, движутся по лучу, выходящему из второго фокуса гиперболы $F_2$ (или $F_1$).';
    descr += '<label><input type="checkbox" checked onchange="isShowM[0] = this.checked; initBuffers();"> т. $M_1$</label>';
    descr += '<label><input type="checkbox" checked onchange="isShowM[1] = this.checked; initBuffers();"> т. $M_2$</label>';
    $("#description").html(descr);
    $("Title").html("Кривые и поверхности второго порядка");
}
var a;
var b;
var isShowM = [true, true];
// var paramOfPoint = [3*Math.PI/4, Math.PI/3, -2*Math.PI/3, -Math.PI/4];
var param1OfPoint = [1.5, -0.5];
var param2OfPoint = [1, 1];
function showM(pnum, checked) {
    isShowM[pnum] = checked;
    if (checked) {
        points[4+i].movable = "free";
    } else {
        points[4+i].movable = "fixed";
    }
    initBuffers();
}
function initData() {
    var arrRad = 1.5;
    var lineRad = 1.5;
    var pointRad = 4;
    var chosenPointRad = 5;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad+2, color:[1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[0].coord1) points[2].coord1[0] = -points[0].coord1[0];
        if (arrPoint == points[2].coord1) points[0].coord1[0] = -points[2].coord1[0];
        if (arrPoint == points[1].coord1) points[3].coord1[1] = -points[1].coord1[1];
        if (arrPoint == points[3].coord1) points[1].coord1[1] = -points[3].coord1[1];
        for (var i = 0; i < 2; i++) {
            if (arrPoint == points[4+i].coord1) {
                var point4vec = vec3.create(points[4+i].coord1);
                point4vec[0] /= a;
                point4vec[1] /= b;
                param1OfPoint[i] = Math.asinh(point4vec[1]);
                if (point4vec[0]>=0) param2OfPoint[i] = 1;
                else param2OfPoint[i] = -1;
            }
        }
    }
    a = Math.abs(points[0].coord1[0]);
    b = Math.abs(points[1].coord1[1]);

    // $("#a").val(parseFloat(a.toPrecision(3)));
    // $("#b").val(parseFloat(b.toPrecision(3)));

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

    var focus1 = [-c,0,0];
    var focus2 = [c,0,0];

    for (var i = 0; i < 2; i++) {
        if (isShowM[i]) {
            var pointM = points[4+i].coord1;
            vec3.set([param2OfPoint[i]*a*Math.cosh(param1OfPoint[i]),b*Math.sinh(param1OfPoint[i]),0.0],pointM);

            var v1 = [];
            vec3.subtract(focus1, pointM, v1);
            vec3.normalize(v1);
            var v2 = [];
            vec3.subtract(focus2, pointM, v2);
            vec3.normalize(v2);

            var vsum12 = [];
            vec3.add(v1, v2, vsum12);

            vec3.normalize(vsum12);
            var vTangent1 = [vsum12[0]*5, vsum12[1]*5, 0];
            var vTangent2 = [-vsum12[0]*5, -vsum12[1]*5, 0];
            var pTangent1 = [];
            var pTangent2 = [];
            vec3.add(pointM, vTangent1, pTangent1);
            vec3.add(pointM, vTangent2, pTangent2);

            primitives.push({class:"line", text: "", ratio: 0.65, arr0:pTangent1, arr1:pTangent2, rad:lineRad, color:[0.0, 0.6, 1.0, 1.0]});
            var mTextPos;
            if (pointM[0] >= 0 && pointM[1] >= 0) {
                mTextPos = "lb"
            } else if (pointM[0] >= 0 && pointM[1] < 0) {
                mTextPos = "lt"
            } else if (pointM[0] < 0 && pointM[1] >= 0) {
                mTextPos = "rb"
            } else {
                mTextPos = "rt"
            }
            primitives.push({class:"point", text: katex.renderToString('M_'+(i+1)), pos: mTextPos, arr0:pointM, rad:pointRad, color:[0.0, 0.0, 0.8, 1.0]});
            var arrowColor, arcColor;
            switch (i) {
              case 0:
                arrowColor = [0.9, 0.5, 0.0, 1.0];
                arcColor = [0.8, 0.4, 0.0, 1.0];
                break;
              case 1:
                arrowColor = [0.5, 0.9, 0.0, 1.0];
                arcColor = [0.4, 0.8, 0.0, 1.0];
                break;
            }
            if (param2OfPoint[i] > 0) {
                primitives.push({class:"arrow", text: "", arr0:focus1, arr1:pointM, rad:arrRad, color:arrowColor});
                var arrowOut = [];
                vec3.subtract(pointM, focus2, arrowOut);
                vec3.normalize(arrowOut);
                vec3.scale(arrowOut, a*2);
                vec3.add(arrowOut, pointM);
                primitives.push({class:"arrow", text: "", arr0:pointM, arr1:arrowOut, rad:arrRad, color:arrowColor});
                primitives.push({class:"dashline", text: "", arr0:pointM, arr1:focus2, rad:arrRad, color:arrowColor});
            } else {
                primitives.push({class:"arrow", text: "", arr0:focus2, arr1:pointM, rad:arrRad, color:arrowColor});
                var arrowOut = [];
                vec3.subtract(pointM, focus1, arrowOut);
                vec3.normalize(arrowOut);
                vec3.scale(arrowOut, a*2);
                vec3.add(arrowOut, pointM);
                primitives.push({class:"arrow", text: "", arr0:pointM, arr1:arrowOut, rad:arrRad, color:arrowColor});
                primitives.push({class:"dashline", text: "", arr0:pointM, arr1:focus1, rad:arrRad, color:arrowColor});
            }
            if (vec3.dot(vTangent1, v1) >= 0) {
                primitives.push({class:"arc", text: katex.renderToString('\\alpha'), ratio: 1.5, arr0:pointM, arr1:focus1, arr2:pTangent1, rad:lineRad, Rad:0.45, color:arcColor});
                primitives.push({class:"arc", text: katex.renderToString('\\alpha'), ratio: 1.5, arr0:pointM, arr1:focus2, arr2:pTangent1, rad:lineRad, Rad:0.52, color:arcColor});
            } else {
                primitives.push({class:"arc", text: katex.renderToString('\\alpha'), ratio: 1.5, arr0:pointM, arr1:focus1, arr2:pTangent2, rad:lineRad, Rad:0.45, color:arcColor});
                primitives.push({class:"arc", text: katex.renderToString('\\alpha'), ratio: 1.5, arr0:pointM, arr1:focus2, arr2:pTangent2, rad:lineRad, Rad:0.52, color:arcColor});
            }
        }
    }

    primitives.push({class:"point", text: "", arr0:[-a,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:[a,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:[0,-b,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:[0,b,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("F_1"), pos: "rb", arr0:focus1, rad:pointRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("F_2"), arr0:focus2, rad:pointRad, color:[0.0, 0.0, 1.0, 1.0]});
}
var dimention="3d";
function initPoints() {
    points = [];
    var y0 = cylLength/2;
    points.push({coord1: vec3.create([0,y0,4]), movable: "plane", vector: vec3.create([0,1,0])});

    points.push({coord1: vec3.create([2,y0,0]), movable: "plane", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([2,y0,4]), movable: "plane", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([0,y0,4]), movable: "fixed", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([-4,y0,4]), movable: "plane", vector: vec3.create([0,1,0])});

    points.push({coord1: vec3.create([-4,y0,0]), movable: "fixed", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([-2,y0,-2]), movable: "plane", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([0,y0,-4]), movable: "fixed", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([4,y0,-4]), movable: "plane", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([4,y0,0]), movable: "plane", vector: vec3.create([0,1,0])});
}
var cylLength = 10;;
function initDescr() {
    var descr = "";
    descr += '<p>Цилиндрическая поверхность образована прямыми, параллельными фиксированной прямой $l$, \
              и проходящие через все точки некоторой кривой $L$</p>';
    descr += '<label><input type="checkbox" onchange="changeAnimate(this.checked);"> Анимация</label>';
    $("#description").html(descr);
    $("Title").html("Цилиндр");
}
var isAnimate = false;
var paramTimer;
var animStep = 0.01;
function changeAnimate(anim) {
    isAnimate = anim;

    if (anim) {
        points[0].movable = "fixed";
        parameter = 0;
        paramTimer = setInterval(function () {
            if (parameter + animStep < 4) {
                parameter += animStep;
            } else {
                parameter = 0;
            }
            initBuffers();
        }, 20);
    } else {
        points[0].movable = "plane";
        clearInterval(paramTimer);
        initBuffers();
    }
}
var parameter = 0;
function compRationalBezierCurve(t, point1, point2, point3) {
    var b1 = (1-t)*(1-t);
    var b2 = Math.SQRT2 * t * (1-t);
    var b3 = t * t;
    var w = b1 + b2 + b3;

    var x = point1[0] * b1 + point2[0] * b2 + point3[0] * b3;
    var y = point1[1] * b1 + point2[1] * b2 + point3[1] * b3;
    var z = point1[2] * b1 + point2[2] * b2 + point3[2] * b3;

    return [x/w, y/w, z/w];
}
function compRationalBezierCurveDerivative(t, point1, point2, point3) {
    var b1 = (1-t)*(1-t);
    var b2 = Math.SQRT2 * t * (1-t);
    var b3 = t * t;
    var w = b1 + b2 + b3;

    var b1d = -Math.SQRT2*(b1+b2);
    var b2d = Math.SQRT2*(b1-b3);
    var b3d = Math.SQRT2*(b2+b3);

    var x = point1[0] * b1d + point2[0] * b2d + point3[0] * b3d;
    var y = point1[1] * b1d + point2[1] * b2d + point3[1] * b3d;
    var z = point1[2] * b1d + point2[2] * b2d + point3[2] * b3d;

    return [x/w/w, y/w/w, z/w/w];
}
function initData() {
    isShowAxes = false;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }

    var prop = 0.5;

    for (var i = 1; i < points.length-1; i++) {
        // if (arrPoint == points[i].coord1) {
            if (i%2 == 0) {
                if (i>2) {
                    for (var j = 0; j < 3; j++) {
                        points[i-1].coord1[j] = points[i-2].coord1[j]*prop +  points[i].coord1[j]*(1-prop);
                    }
                }
                if (i<points.length-2) {
                    for (var j = 0; j < 3; j++) {
                        points[i+1].coord1[j] = points[i+2].coord1[j]*(1-prop) +  points[i].coord1[j]*prop;
                    }
                }
            }
        // }
    }


    for (var i = 1; i < points.length; i++) {
        if (points[i].movable == "fixed") {
            primitives.push({class:"point", text: "", arr0:points[i].coord1, rad:4, color:[1.0, 0.5, 0.0, 1.0]});
        } else {
            primitives.push({class:"point", text: "", arr0:points[i].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
        }
    }

    primitives.push({class:"text", text: katex.renderToString("L"), arr0:points[5].coord1});

    primitives.push({class:"line", text: "&nbsp;"+katex.renderToString("l"), arr0:[-5,-cylLength/2-1,0], arr1:[-5,cylLength/2+1,0], rad:2.5, color:[0.0, 0.0, 1.0, 1.0]});

    for (var i = 1; i < points.length-1; i++) {
        primitives.push({class:"dashline", text: "", arr0:points[i].coord1, arr1:points[i+1].coord1, rad:1, color:[1.0, 0.5, 0.0, 1.0]});
    }

    // primitives.push({class:"text", text: "x", arr0:[0,0,5]});
    // primitives.push({class:"text", text: "y", arr0:[5,0,0]});
    // primitives.push({class:"text", text: "z", arr0:[0,5,0]});

    var vertices = [];
    var normals = [];
    var indices = [];
    var slices1 = 16;
    var slices = 2;

    var colorp = [0.0, 0.8, 0.0, 1.0];
    var colorl = [0.0, 0.0, 0.0, 1.0];

    var fullCurveVertices = [];
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i <= slices1*2; i++) {
            var psi = i/slices1/2;
            fullCurveVertices.push( compRationalBezierCurve(psi, points[j*2+1].coord1, points[j*2+2].coord1, points[j*2+3].coord1) );
        }
    }
    for (var i = 0; i < fullCurveVertices.length-1; i++) {
        primitives.push({class:"line", text: "", arr0:fullCurveVertices[i], arr1:fullCurveVertices[i+1], rad:2, color:colorl});
    }

    var lineVertices = [];
    var lineDerivatives = [];

    var param1OfPoint;
    var param2OfPoint;
    var pointM = points[0].coord1;

    if (isAnimate) {
        for (var j = 0; j < 4; j++) {
            if (Math.trunc(parameter) < j) break;
            lineVertices[j] = [];
            lineDerivatives[j] = [];
            for (var i = 0; i <= slices1; i++) {
                var psi = i/slices1;
                if (Math.trunc(parameter) == j) {
                    psi *= parameter-Math.trunc(parameter);
                }
                lineVertices[j].push( compRationalBezierCurve(psi, points[j*2+1].coord1, points[j*2+2].coord1, points[j*2+3].coord1) );
                lineDerivatives[j].push( compRationalBezierCurveDerivative(psi, points[j*2+1].coord1, points[j*2+2].coord1, points[j*2+3].coord1) );
            }
        }
        param1OfPoint = parameter-Math.trunc(parameter);
        param2OfPoint = Math.trunc(parameter);
    } else {
        for (var j = 0; j < 4; j++) {
            lineVertices[j] = [];
            lineDerivatives[j] = [];
            for (var i = 0; i <= slices1; i++) {
                var psi = i/slices1;
                lineVertices[j].push( compRationalBezierCurve(psi, points[j*2+1].coord1, points[j*2+2].coord1, points[j*2+3].coord1) );
                lineDerivatives[j].push( compRationalBezierCurveDerivative(psi, points[j*2+1].coord1, points[j*2+2].coord1, points[j*2+3].coord1) );
            }
        }

        param1OfPoint = 0.5;
        param2OfPoint = 1;

        var minLen;
        for (var i = 0; i < lineVertices.length; i++) {
            for (var j = 0; j < lineVertices[i].length; j++) {
                var vectorM0 = [];
                vec3.subtract(pointM, lineVertices[i][j], vectorM0);
                var len = vec3.length(vectorM0);
                if (minLen > len || (i==0 && j==0)) {
                    minLen = len;
                    param1OfPoint = j/(lineVertices[i].length-1);
                    param2OfPoint = i;
                }

            }
        }
    }

    vec3.set(compRationalBezierCurve(param1OfPoint, points[param2OfPoint*2+1].coord1, points[param2OfPoint*2+2].coord1, points[param2OfPoint*2+3].coord1), pointM);

    primitives.push({class:"point", text: "M", arr0:pointM, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"line", text: "&nbsp;"+katex.renderToString("l'"),
                     arr0:[pointM[0],pointM[1]-cylLength-1,pointM[2]],
                     arr1:[pointM[0],pointM[1]+1,pointM[2]], rad:2, color:[0.0, 0.0, 1.0, 1.0]});

    for (var k = 0; k < lineVertices.length; k++) {
        vertices[k] = [];
        normals[k] = [];
        for (var i = 0; i <= slices1; i++) {
            for (var j = 0; j <= slices; j++) {
                var phi = j/slices;
                var px = lineVertices[k][i][0];
                var py = phi*cylLength-cylLength + lineVertices[k][i][1];
                var pz = lineVertices[k][i][2];
                vertices[k].push( px, py, pz );
                normals[k].push( -lineDerivatives[k][i][2], 0, lineDerivatives[k][i][0] );
            }
        }
    }
    for (var k = 0; k < vertices.length; k++) {
        indices[k] = [];
        for (var i=0; i < slices1; i++) {
            for (var j=0; j < slices; j++) {
                var aa = [i*(slices+1)+j, i*(slices+1)+j+1, (i+1)*(slices+1)+j+1, (i+1)*(slices+1)+j];
                indices[k].push(aa[0],aa[1],aa[2],aa[0],aa[2],aa[3]);
            }
        }
        if (!normals[k] || normals[k].length==0) {
            normals[k] = [];
            for (var i = 0; i <= slices1; i++) {
                for (var j = 0; j <= slices; j++) {
                    normals[k].push( 0.0, 0.0, 0.0 );
                }
            }
        }
        meshes.push({
            vertices:vertices[k],
            normals:normals[k],
            indices:indices[k],
            color:colorp,
            reinit:true
        });
        for (var i=0; i < slices1; i++) {
            for (var j=0; j < slices; j++) {
                var aa = [i*(slices+1)+j, i*(slices+1)+j+1, (i+1)*(slices+1)+j+1, (i+1)*(slices+1)+j];
                if (i==0) {
                    primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                }
                if (i==slices1-1) {
                    primitives.push({class:"line", text: "", arr0:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
                }

                // if (j==slices-1) {
                //     primitives.push({class:"line", text: "", arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], rad:2, color:colorl});
                // }
                primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
            }
        }
    }
}
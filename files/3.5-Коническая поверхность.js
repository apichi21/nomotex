var dimention="3d";
function initPoints() {
    points = [];
    var y0 = -coneHeight;
    // points.push({coord1: vec3.create([0,y0,4]), movable: "plane", vector: vec3.create([0,1,0])});

    // points.push({coord1: vec3.create([2,y0,0]), movable: "plane", vector: vec3.create([0,1,0])});
    // points.push({coord1: vec3.create([2,y0,4]), movable: "plane", vector: vec3.create([0,1,0])});
    // points.push({coord1: vec3.create([0,y0,4]), movable: "fixed", vector: vec3.create([0,1,0])});
    // points.push({coord1: vec3.create([-4,y0,4]), movable: "plane", vector: vec3.create([0,1,0])});
    // points.push({coord1: vec3.create([-4,y0,0]), movable: "fixed", vector: vec3.create([0,1,0])});
    // points.push({coord1: vec3.create([-2,y0,-2]), movable: "plane", vector: vec3.create([0,1,0])});
    // points.push({coord1: vec3.create([0,y0,-4]), movable: "fixed", vector: vec3.create([0,1,0])});
    // points.push({coord1: vec3.create([4,y0,-4]), movable: "plane", vector: vec3.create([0,1,0])});
    // points.push({coord1: vec3.create([4,y0,0]), movable: "plane", vector: vec3.create([0,1,0])});

    points.push({coord1: vec3.create([ 4.40, y0,-1.23]), movable: "plane", vector: vec3.create([0,1,0])});

    points.push({coord1: vec3.create([ 1.47, y0,-6.58]), movable: "plane", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([ 9.93, y0,-0.23]), movable: "plane", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([ 3.89, y0,-1.31]), movable: "fixed", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([-2.13, y0,-2.38]), movable: "plane", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([ 0.19, y0, 0.68]), movable: "fixed", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([ 2.53, y0, 3.76]), movable: "plane", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([-0.69, y0, 3.81]), movable: "fixed", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([-3.92, y0, 3.86]), movable: "plane", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([-5.02, y0,-3.83]), movable: "plane", vector: vec3.create([0,1,0])});

    dispY = coneHeight/2;
}

var curvesCount = 4;
var coneHeight = 10;
function initDescr() {
    var descr = "";
    descr += '<p>Коническая поверхность</p>';
    descr += '<label><input type="checkbox" checked onchange="isShowR=this.checked; initBuffers();"> $\\vec r_0(u)$ - радиус-вектор точки $M$ на образующей $L$</label>';
    descr += '<label><input type="radio" name="g1" checked onchange="animType = 0; initBuffers();"> Изменять параметры $u$ и $v$</label>';
    descr += '<label><input type="radio" name="g1" onchange="animType = 1; initBuffers();"> Изменять параметр $u$</label>';
    descr += '<label><input type="radio" name="g1" onchange="animType = 2; initBuffers();"> Изменять параметр $v$</label>';
    descr += '<label><input type="checkbox" onchange="changeAnimate(this.checked);"> Анимация</label>';
    $("#description").html(descr);
    $("Title").html("Коническая поверхность");
}
var isShowR = true;
var isAnimate = false;
var animType = 0;
var paramTimer;
var animStep = 0.01;
function changeAnimate(anim) {
    isAnimate = anim;

    if (anim) {
        points[0].movable = "fixed";
        parameter = 0;
        paramTimer = setInterval(function () {
            if (parameter + animStep < curvesCount) {
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
var parameter = 1.5;
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

    primitives.push({class:"text", text: katex.renderToString("L"), arr0:points[7].coord1});

    for (var i = 1; i < points.length-1; i++) {
        primitives.push({class:"dashline", text: "", arr0:points[i].coord1, arr1:points[i+1].coord1, rad:1, color:[1.0, 0.5, 0.0, 1.0]});
    }

    var pointO = [0,0,0];
    primitives.push({class:"point", text: "O", arr0:pointO, rad:3, color:[0.0, 0.0, 1.0, 1.0]});

    // primitives.push({class:"text", text: "x", arr0:[0,0,5]});
    // primitives.push({class:"text", text: "y", arr0:[5,0,0]});
    // primitives.push({class:"text", text: "z", arr0:[0,5,0]});

    var colorp = [0.0, 0.8, 0.0, 1.0];
    var colorl = [0.0, 0.0, 0.0, 1.0];
    var vertices = [];
    var normals = [];
    var indices = [];
    var slicesU = 60;
    var slicesV = 1;

    var fullCurveVertices = [];
    for (var i = 0; i <= slicesU*2; i++) {
        var u = i/slicesU/2*curvesCount;

        var u2;
        var u1;

        if (i != slicesU*2) {
            u2 = Math.trunc(u);
            u1 = u-u2;
        } else {
            u2 = curvesCount-1;
            u1 = 1;
        }
        fullCurveVertices.push( compRationalBezierCurve(u1, points[u2*2+1].coord1, points[u2*2+2].coord1, points[u2*2+3].coord1) );
    }
    for (var i = 0; i < fullCurveVertices.length-1; i++) {
        primitives.push({class:"line", text: "", arr0:fullCurveVertices[i], arr1:fullCurveVertices[i+1], rad:2, color:colorl});
    }

    var lineVertices = [];
    var lineDerivatives = [];

    var pointM = points[0].coord1;

    if (isAnimate) {
        var endU = false;
        for (var i = 0; i <= slicesU; i++) {
            var u = i/slicesU*curvesCount;

            if (u >= parameter) {
                u = parameter;
                endU = true;
                slicesU = i;
            }

            var u2 = Math.trunc(u);
            var u1 = u-u2;

            if (u2 >= curvesCount) {
                u2 = curvesCount-1;
                u1 = 1;
            }

            lineVertices.push( compRationalBezierCurve(u1, points[u2*2+1].coord1, points[u2*2+2].coord1, points[u2*2+3].coord1) );
            lineDerivatives.push( compRationalBezierCurveDerivative(u1, points[u2*2+1].coord1, points[u2*2+2].coord1, points[u2*2+3].coord1) );

            if (endU) break;
        }
    } else {
        for (var i = 0; i <= slicesU; i++) {
            var u = i/slicesU*curvesCount;

            var u2;
            var u1;

            if (i != slicesU) {
                u2 = Math.trunc(u);
                u1 = u-u2;
            } else {
                u2 = curvesCount-1;
                u1 = 1;
            }

            lineVertices.push( compRationalBezierCurve(u1, points[u2*2+1].coord1, points[u2*2+2].coord1, points[u2*2+3].coord1) );
            lineDerivatives.push( compRationalBezierCurveDerivative(u1, points[u2*2+1].coord1, points[u2*2+2].coord1, points[u2*2+3].coord1) );
        }

        var minLen;
        for (var j = 0; j < fullCurveVertices.length; j++) {
            var vectorM0 = [];
            vec3.subtract(pointM, fullCurveVertices[j], vectorM0);
            var len = vec3.length(vectorM0);
            if (minLen > len || j==0) {
                minLen = len;
                parameter = j/(fullCurveVertices.length-1)*curvesCount;
            }
        }
    }

    if (animType==0) {
        var mult = 0.5
        for (var i = 0; i < lineVertices.length-1; i++) {
            primitives.push({class:"line", text: "",
                             arr0:[lineVertices[i][0]*mult, lineVertices[i][1]*mult, lineVertices[i][2]*mult],
                             arr1:[lineVertices[i+1][0]*mult, lineVertices[i+1][1]*mult, lineVertices[i+1][2]*mult],
                             rad:1, color:colorl});
        }
    } else if (animType==1) {
        for (var k = 1; k < 5; k++) {
            var mult = 0.2*k
            for (var i = 0; i < lineVertices.length-1; i++) {
                primitives.push({class:"line", text: "",
                                 arr0:[lineVertices[i][0]*mult, lineVertices[i][1]*mult, lineVertices[i][2]*mult],
                                 arr1:[lineVertices[i+1][0]*mult, lineVertices[i+1][1]*mult, lineVertices[i+1][2]*mult],
                                 rad:1, color:colorl});
            }
        }
    }

    var param1OfPoint = parameter-Math.trunc(parameter);
    var param2OfPoint = Math.trunc(parameter);
    if (param2OfPoint >= curvesCount) {
        param1OfPoint = 1;
        param2OfPoint = curvesCount-1;
    }
    vec3.set(compRationalBezierCurve(param1OfPoint, points[param2OfPoint*2+1].coord1, points[param2OfPoint*2+2].coord1, points[param2OfPoint*2+3].coord1), pointM);

    primitives.push({class:"point", text: "M", arr0:pointM, rad:4, color:[0.0, 0.0, 1.0, 1.0]});

    var vecOM = [];
    vec3.subtract(pointM, pointO, vecOM);
    var lenOM = vec3.length(vecOM);
    vec3.scale(vecOM, (lenOM+2)/lenOM);
    vec3.add(vecOM, pointO);
    primitives.push({class:"line", text: "&nbsp;"+katex.renderToString("l'"), ratio: 1,
                     arr0:pointO,
                     arr1:vecOM, rad:1.2, color:[0.0, 0.0, 0.0, 1.0]});

    if (isShowR) {
        primitives.push({class:"arrow", text: katex.renderToString("\\vec r_0(u)"),
                         arr0:pointO,
                         arr1:pointM, rad:3, color:[0.0, 0.0, 1.0, 1.0]});
    }

    vertices[0] = [];
    normals[0] = [];

    for (var i = 0; i <= slicesU; i++) {
        for (var j = 0; j <= slicesV; j++) {
            var v = j/slicesV;
            var px = v*lineVertices[i][0];
            var py = -v*coneHeight;
            var pz = v*lineVertices[i][2];
            vertices[0].push( px, py, pz );
            normals[0].push( -coneHeight*v*lineDerivatives[i][2],
                             -v*(lineVertices[i][0]*lineDerivatives[i][2]-lineDerivatives[i][0]*lineVertices[i][2]),
                             coneHeight*v*lineDerivatives[i][0] );
        }
    }

    for (var k = 0; k < vertices.length; k++) {
        indices[k] = [];
        for (var i=0; i < slicesU; i++) {
            for (var j=0; j < slicesV; j++) {
                var aa = [i*(slicesV+1)+j, i*(slicesV+1)+j+1, (i+1)*(slicesV+1)+j+1, (i+1)*(slicesV+1)+j];
                indices[k].push(aa[0],aa[1],aa[2],aa[0],aa[2],aa[3]);
            }
        }
        if (!normals[k] || normals[k].length==0) {
            normals[k] = [];
            for (var i = 0; i <= slicesU; i++) {
                for (var j = 0; j <= slicesV; j++) {
                    normals[k].push( 0.0, 0.0, 0.0 );
                }
            }
        }

        if (animType==0) {
            meshes.push({
                vertices:vertices[k],
                normals:normals[k],
                indices:indices[k],
                color:colorp,
                reinit:true
            });
        }
        for (var i=0; i < slicesU; i++) {
            for (var j=0; j < slicesV; j++) {
                var aa = [i*(slicesV+1)+j, i*(slicesV+1)+j+1, (i+1)*(slicesV+1)+j+1, (i+1)*(slicesV+1)+j];
                if (animType!=1) {
                    if (i==0) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                    }
                    if (animType==2) {
                        if (i%5==4) {
                            primitives.push({class:"line", text: "", arr0:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
                        }
                    } else {
                        if (i%15==14) {
                            primitives.push({class:"line", text: "", arr0:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
                        }
                    }
                }
                if (animType!=2) {
                    if (j==slicesV-1) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], rad:1, color:colorl});
                    }
                }
                // primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
            }
        }
    }
}
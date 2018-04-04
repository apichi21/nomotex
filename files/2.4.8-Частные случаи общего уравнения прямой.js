var dimention="2d";
function initPoints() {
    points = [];
    // points.push({coord1: vec3.create([0,0,4]), movable: "free"});
    // points.push({coord1: vec3.create([0,1,-4]), movable: "free"});
    // points.push({coord1: vec3.create([2,-2,1]), movable: "free"});
    // points.push({coord1: vec3.create(), movable: "fixed"});
    // lines = [];
    // lines.push({coord1: 2, coord2: 3, measure: true});
}
function initDescr() {
    var descr = "";
    descr += "<p>Частные случаи общего уравнения прямой на плоскости.<br>$Ax+By+C=0$</p>";
    var textInputSize = 5;
    // descr += "A<input type='text' id='A' size='"+textInputSize+"'> B<input type='text' id='B' size='"+textInputSize+"'> C<input type='text' id='C' size='"+textInputSize+"'> <br/>";
    
    descr += '<label><input type="radio" name="group1" checked onchange="changeOXYZ(1)">1. $A=0$ - прямая, параллельная оси абсцисс;</label>';
    descr += '<label><input type="radio" name="group1" onchange="changeOXYZ(2)">2. $B=0$ - прямая, параллельная оси ординат;</label>';
    descr += '<label><input type="radio" name="group1" onchange="changeOXYZ(3)">3. $C=0$ - прямая, проходящая через начало координат;</label>';
    descr += '<label><input type="radio" name="group1" onchange="changeOXYZ(4)">4. $A=C=0$ - ось абсцисс;</label>';
    descr += '<label><input type="radio" name="group1" onchange="changeOXYZ(5)">5. $B=C=0$ - ось ординат.</label>';
    $("#description").html(descr);

    changeOXYZ(1);
    $("Title").html("Частные случаи общего уравнения прямой");

}
function changeOXYZ(n) {
    showOXYZ = n;
    A = 1;
    B = 2;
    C = 2;
    switch (n) {
      case 1:
        A = 0;
        break;
      case 2:
        B = 0;
        break;
      case 3:
        C = 0;
        break;
      case 4:
        A = 0;
        C = 0;
        break;
      case 5:
        B = 0;
        C = 0;
        break;
    }
    initBuffers();
}
// function createLine(point1, point2, respoint1, respoint2)
// {
//     var centerPoint = [];
//     vec3.add(point1,point2,centerPoint);
//     vec3.scale(centerPoint,0.5);
//     var vecAB = [];
//     vec3.subtract(point2,point1,vecAB);
//     vec3.scale(vecAB,2);
//     vec3.subtract(centerPoint,vecAB,respoint1);
//     vec3.add(centerPoint,vecAB,respoint2);
// }
function createPlane(point1, point2, point3, respoint1, respoint2, respoint3, respoint4) {
    var vecA1B1 = [];
    vec3.subtract(point2,point1,vecA1B1);
    vec3.normalize(vecA1B1);
    var vecA2B2 = [];
    vec3.subtract(point3,point1,vecA2B2);
    vec3.normalize(vecA2B2);
    var normal = [];
    vec3.cross(vecA1B1,vecA2B2,normal);
    vec3.normalize(normal);

    var pVec1 = [];
    vec3.add(vecA1B1,vecA2B2,pVec1);
    vec3.normalize(pVec1);

    var pVec2 = [];
    vec3.cross(pVec1,normal,pVec2);
    vec3.normalize(pVec2);

    var pPoint = [];
    // intersect([0,0,0],normal,point1,normal,pPoint);
    vec3.scale(normal,vec3.dot(normal,point1),pPoint);
    // vec3.set(pPoint,points[3]);

    vec3.scale(pVec1,5);
    vec3.scale(pVec2,5);
    vec3.add(pPoint,pVec1,respoint1);
    vec3.subtract(respoint1,pVec2,respoint2);
    vec3.add(respoint1,pVec2);
    vec3.subtract(pPoint,pVec1,respoint3);
    vec3.add(respoint3,pVec2,respoint4);
    vec3.subtract(respoint3,pVec2);
}
function distToPlane(V0, P0, P1, P2, delta) {
    var a = [];
    vec3.subtract(P0,V0,a);
    var N = [];
    var v1 = [];
    var v2 = [];
    vec3.subtract(P1,P0,v1);
    vec3.subtract(P2,P0,v2);
    vec3.cross(v1,v2,N);
    vec3.normalize(N);
    if (!delta) delta = [];
    vec3.scale(N,vec3.dot(N,a),delta);
    return vec3.length(delta);
}
function distToLine(V0, P0, P1, delta) {
    var a = [];
    var v = [];
    vec3.subtract(V0,P0,a);
    vec3.subtract(P1,P0,v);
    vec3.normalize(v);    
    if (!delta) delta = [];
    vec3.scale(v,vec3.dot(a,v),delta);
    vec3.add(delta,P0);
    vec3.subtract(delta,V0);
    return vec3.length(delta);
}
function createLine(pointA, pointB, respoint1, respoint2) {
    var vecAB = [];
    vec3.subtract(pointB,pointA,vecAB);
    vec3.normalize(vecAB);
    var proj = vec3.dot(pointA,vecAB);
    var vecAC = [];
    vec3.scale(vecAB,-proj,vecAC);
    var centerPoint = [];
    vec3.add(pointA,vecAC,centerPoint);
    // vec3.set(centerPoint,points[3]);
    var vecBC = [];
    vec3.subtract(centerPoint,pointB,vecBC);
    var lenAC = Math.abs(proj);
    var lenBC = vec3.length(vecBC);
    var lineHalfLength = 5;
    if (lineHalfLength<lenAC) {lineHalfLength=lenAC;}
    if (lineHalfLength<lenBC) {lineHalfLength=lenBC;}
    vec3.scale(vecAB,lineHalfLength);
    vec3.subtract(centerPoint,vecAB,respoint1);
    vec3.add(centerPoint,vecAB,respoint2);
}
var A = 1;
var B = 2;
var C = 2;
function initData() {
    // isShowAxes = false;
    var pointRad = 4;
    var chosenPointRad = 6;
    var lineRad = 2;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }

    // $("#A").val(parseFloat(A.toPrecision(3)));
    // $("#B").val(parseFloat(B.toPrecision(3)));
    // $("#C").val(parseFloat(C.toPrecision(3)));

    var pointM0 = [0,0,0];

    if (Math.abs(A) > Math.abs(B)) {
        pointM0[0] = -C/A;
    } else {
        pointM0[1] = -C/B;
    }

    var vecN0 = [A,B,0];
    var pointM1 = [];
    var vecN = [];
    vec3.add(pointM0,[-vecN0[1],vecN0[0],vecN0[2]],pointM1);
    vec3.add(vecN0,pointM0,vecN);
    var p11 = [];
    var p12 = [];
    createLine(pointM0, pointM1, p11, p12);

    primitives.push({class:"line", text: "", arr0:p11, arr1:p12, rad:lineRad, color:[0.0, 0.6, 1.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:pointM0, rad:pointRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec N"), arr0:pointM0, arr1:vecN, rad:lineRad, color:[0.0, 1.0, 0.0, 1.0]});

}
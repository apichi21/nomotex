var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
}
var vecx = [];
function initDescr() {
      $("#conditions").html("Линейная независимость векторов.");
      var algorithm = "<h4>Пример 2</h4>Пространство $V_3$<br>$$c_1\\vec{x}_1+c_2\\vec{x}_2+c_3\\vec{x}_3 \\ne 0, c_1^2+c_2^2+c_3^2 \\ne 0$$<br>Линейно независимые векторы в $V_3$ не принадлежат одной плоскости.<br>";

    algorithm += '$\\vec x_1$: <input type="text" id="ans11" size=3 onchange="vecx[0][0] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans12" size=3 onchange="vecx[0][1] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans13" size=3 onchange="vecx[0][2] = parseFloat(this.value);initBuffers();"><br>';
    algorithm += '$\\vec x_2$: <input type="text" id="ans21" size=3 onchange="vecx[1][0] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans22" size=3 onchange="vecx[1][1] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans23" size=3 onchange="vecx[1][2] = parseFloat(this.value);initBuffers();"><br>';
    algorithm += '$\\vec x_3$: <input type="text" id="ans31" size=3 onchange="vecx[2][0] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans32" size=3 onchange="vecx[2][1] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans33" size=3 onchange="vecx[2][2] = parseFloat(this.value);initBuffers();"><br>';
    $("#algorithm").html(algorithm);
    vecx[0] = [3,1,0];
    vecx[1] = [1,4,-2];
    vecx[2] = [2,2,3];
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            $("#ans"+(i+1)+(j+1)).val(vecx[i][j].toFixed(0));
        }
    }

    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Линейная независимость векторов");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

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
function initData() {
    isShowAxes = false;

    var axeColor = [0.3, 0.3, 0.3, 1.0];

    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            points[i+1].coord1[j] = vecx[i][j];
        }
    }

    primitives.push({class:"arrow", text: katex.renderToString("\\vec e_1"), arr0:points[0].coord1, arr1:[1,0,0], rad:1.5, color:axeColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec e_2"), arr0:points[0].coord1, arr1:[0,1,0], rad:1.5, color:axeColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec e_3"), arr0:points[0].coord1, arr1:[0,0,1], rad:1.5, color:axeColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec x_1"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec x_2"), arr0:points[0].coord1, arr1:points[2].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec x_3"), arr0:points[0].coord1, arr1:points[3].coord1, rad:2, color:[0.0, 0.0, 1.0, 1.0]});

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(points[0].coord1,points[1].coord1,points[2].coord1,planepoint1,planepoint2,planepoint3,planepoint4);
    primitives.push({class:"plane", text: "", arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 0.0, 0.0, 0.15]});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]});
    }
}
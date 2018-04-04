var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "free"});
    points.push({coord1: vec3.create([1,3,-1]), movable: "plane"});
    points.push({coord1: vec3.create([-2,0.5,1]), movable: "free"});
    points.push({coord1: vec3.create([3,-2,0]), movable: "free"});
    points.push({coord1: vec3.create([0,1.5,-0.23077]), movable: "plane"});
    points.push({coord1: vec3.create([-1,-1,2]), movable: "plane"});
}
function initDescr() {
    $("#description").html("Векторы называются компланарными, если существует плоскость, которой они параллельны.<br><br>"
        +"Векторы $\\vec a$, $\\vec b$ и $\\vec c$ компланарные.");
    $("Title").html("Основные определения");
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
var vec_a = [];
var vec_b = [];
var vec_c = [];
function initData() {
    isShowAxes = false;
    var boxRad = 1;
    var boxColor = [0.7, 0.7, 0.7, 1.0];

    primitives.push({class:"line", text: "", arr0:[-5,-5,-5], arr1:[5,-5,-5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[-5,5,-5], arr1:[5,5,-5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[-5,-5,5], arr1:[5,-5,5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[-5,5,5], arr1:[5,5,5], rad:boxRad, color:boxColor});

    primitives.push({class:"line", text: "", arr0:[-5,-5,-5], arr1:[-5,5,-5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[5,-5,-5], arr1:[5,5,-5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[-5,-5,5], arr1:[-5,5,5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[5,-5,5], arr1:[5,5,5], rad:boxRad, color:boxColor});

    primitives.push({class:"line", text: "", arr0:[-5,-5,-5], arr1:[-5,-5,5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[5,-5,-5], arr1:[5,-5,5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[-5,5,-5], arr1:[-5,5,5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[5,5,-5], arr1:[5,5,5], rad:boxRad, color:boxColor});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }

    var planevec1 = [1,3,-1];
    var planevec2 = [-2,0.5,1];
    var pnorm = [];
    vec3.cross(planevec1,planevec2,pnorm);

    points[0].vector = pnorm;
    points[1].vector = pnorm;
    points[2].vector = pnorm;
    points[3].vector = pnorm;
    points[4].vector = pnorm;
    points[5].vector = pnorm;

    if (arrPoint==points[0].coord1) {
        vec3.add(points[0].coord1,vec_a,points[1].coord1);
    } else if (arrPoint==points[2].coord1) {
        vec3.add(points[2].coord1,vec_b,points[4].coord1);
    } else if (arrPoint==points[3].coord1) {
        vec3.add(points[3].coord1,vec_c,points[5].coord1);
    }

    vec_a = [];
    vec3.subtract(points[1].coord1,points[0].coord1,vec_a);
    vec_b = [];
    vec3.subtract(points[4].coord1,points[2].coord1,vec_b);
    vec_c = [];
    vec3.subtract(points[5].coord1,points[3].coord1,vec_c);

    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "B", arr0:points[2].coord1, rad:2, color:[0.7, 0.7, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec b"), arr0:points[2].coord1, arr1:points[4].coord1, rad:2, color:[0.7, 0.7, 0.0, 1.0]});
    primitives.push({class:"point", text: "A", arr0:points[0].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec c"), arr0:points[3].coord1, arr1:points[5].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "С", arr0:points[3].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane([0,0,0],planevec1,planevec2,planepoint1,planepoint2,planepoint3,planepoint4);
    primitives.push({class:"plane", text: "", arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 0.0, 0.0, 0.15]});
}
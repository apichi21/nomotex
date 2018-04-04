var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "free"});
    points.push({coord1: vec3.create([1,3,-1]), movable: "free"});
    points.push({coord1: vec3.create([-2,0.5,1]), movable: "free"});
    points.push({coord1: vec3.create([2,0.5,1]), movable: "free"});
    points.push({coord1: vec3.create([-2,0.5,1]), movable: "free"});
    points.push({coord1: vec3.create([2,0.5,1]), movable: "free"});
}
function initDescr() {
    $("#conditions").html("<b>Пример 1.10.</b>");
    var algorithm = "";
    algorithm += "Векторные пространства свободных  векторов<br>";
    algorithm += "<label style='display: block; padding-top: 5px;'><input type='radio' name='group1' checked onchange='changeOXYZ(0)'> $\V_1$ (множество коллинеарных векторов),</label>";
    algorithm += "<label style='display: block; padding-top: 5px;'><input type='radio' name='group1' onchange='changeOXYZ(1)'> $\V_2$ (множество векторов, компланарных некоторой плоскости),</label>";
    algorithm += "<label style='display: block; padding-top: 5px;'><input type='radio' name='group1' onchange='changeOXYZ(2)'> $\V_3$ имеют соответственно размерности.</label>";
    algorithm += " \\(\\dim {V_n} = n,\\;n = 1,2,3\\;\\)";
    $("#algorithm").html(algorithm);
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Пример 1.10");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    changeOXYZ(0);
}
var showOXYZ = 0;
function changeOXYZ(n) {
    showOXYZ = n;
    switch (n) {
      case 0:
        vec3.set([0,0,0],points[0].coord1);
        vec3.set([1,3,-1],points[1].coord1);
        vec3.set([-2,0.5,1],points[2].coord1);
        vec3.set([2,0.5,1],points[3].coord1);
        vec3.set([-0.75,4.25,-0.25],points[4].coord1);
        vec3.set([1,-2.5,2],points[5].coord1);
        break;
      case 1:
        vec3.set([0,0,0],points[0].coord1);
        vec3.set([1,3,-1],points[1].coord1);
        vec3.set([-2,0.5,1],points[2].coord1);
        vec3.set([3,-2,0],points[3].coord1);
        vec3.set([0,1.5,-0.23077],points[4].coord1);
        vec3.set([-1,-1,2],points[5].coord1);
        break;
      case 2:
        vec3.set([0,0,0],points[0].coord1);
        vec3.set([1,3,1],points[1].coord1);
        vec3.set([-2,0.5,1],points[2].coord1);
        vec3.set([3,-2,0],points[3].coord1);
        vec3.set([0,1.5,-3],points[4].coord1);
        vec3.set([-1,-1,-2],points[5].coord1);
        break;
    }
    initBuffers();
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
    if (lineHalfLength<lenAC+1) {lineHalfLength=lenAC+1;}
    if (lineHalfLength<lenBC+1) {lineHalfLength=lenBC+1;}
    vec3.scale(vecAB,lineHalfLength);
    vec3.subtract(centerPoint,vecAB,respoint1);
    vec3.add(centerPoint,vecAB,respoint2);
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
    if (showOXYZ==0) {
        points[0].movable = "free";
        points[1].movable = "line";
        points[2].movable = "free";
        points[3].movable = "free";
        points[4].movable = "line";
        points[5].movable = "line";
        // var vec_a1 = [];
        // vec3.subtract(points[1].coord1,points[0].coord1,vec_a1);

        // vec3.normalize(vec_a1,points[4].coord1);
        // vec3.scale(points[4].coord1, 3);

        // vec3.normalize(vec_a1,points[5].coord1);
        // vec3.scale(points[5].coord1, -4);

        // var len_a = vec3.length(vec_a1);
        // var len_b = vec3.length(points[4].coord1);
        // vec3.add(points[4].coord1,points[2].coord1);
        // vec3.add(points[5].coord1,points[3].coord1);


        var planevec1 = [1,3,-1];

        points[0].vector = planevec1;
        points[1].vector = planevec1;
        points[2].vector = planevec1;
        points[3].vector = planevec1;
        points[4].vector = planevec1;
        points[5].vector = planevec1;

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

        var leftPoint = [];
        var rightPoint = [];
        createLine([0,0,0],planevec1,leftPoint,rightPoint);
        lineColor = [0.0, 0.6, 1.0, 1.0];
        primitives.push({class:"dashline", text: "", arr0:leftPoint, arr1:rightPoint, rad:1, color:[0,0,0,1]});
    }
    if (showOXYZ==1) {
        points[0].movable = "free";
        points[1].movable = "plane";
        points[2].movable = "free";
        points[3].movable = "free";
        points[4].movable = "plane";
        points[5].movable = "plane";

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

        // var vec_a = [];
        // vec3.subtract(points[1].coord1,points[0].coord1,vec_a);

        // vec3.normalize(vec_a,points[4].coord1);
        // vec3.scale(points[4].coord1, 3);

        // vec3.normalize(vec_a,points[5].coord1);
        // vec3.scale(points[5].coord1, -4);

        // var len_a = vec3.length(vec_a);
        // var len_b = vec3.length(points[4].coord1);
        // vec3.add(points[4].coord1,points[2].coord1);
        // vec3.add(points[5].coord1,points[3].coord1);

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
    if (showOXYZ==2) {
        points[0].movable = "free";
        points[1].movable = "free";
        points[2].movable = "free";
        points[3].movable = "free";
        points[4].movable = "free";
        points[5].movable = "free";

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
    }
}
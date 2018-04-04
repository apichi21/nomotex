var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([1.4,-1,1.2]), movable: "free"});
    points.push({coord1: vec3.create([-0.5,0,1]), movable: "free"});
    points.push({coord1: vec3.create([1.8,0.7,-0.5]), movable: "free"});
    points.push({coord1: vec3.create([1,2.5,0.5]), movable: "free"});
    points.push({coord1: vec3.create([-0.7,1,1]), movable: "free"});
    points.push({coord1: vec3.create([-1.5,2.5,-2.7]), movable: "free"});
    lines = [];
    lines.push([0,1]);
    lines.push([0,2]);
    lines.push([3,4]);
}
var C;
function initDescr() {
    var descr = "";
    descr += 'Пространство элементарной геометрии $E_3$';
    descr += '<label style="display: block; padding-top: 5px;"><input type="radio" name="group1" checked onchange="changeOXYZ(0)"> Точки A, B, C, D, E и F.</label>';
    descr += '<label style="display: block; padding-top: 5px;"><input type="radio" name="group1" onchange="changeOXYZ(1)"> Линии a, b и c.</label>';
    descr += '<label style="display: block; padding-top: 5px;"><input type="radio" name="group1" onchange="changeOXYZ(2)"> Плоскости $\\alpha$ и $\\beta$.</label>';

    $("#description").html(descr);
    $("Title").html("Пространство элементарной геометрии");
}
var showOXYZ = 0;
function changeOXYZ(n) {
    showOXYZ = n;
    initBuffers();
}
function initData() {
    isShowAxes = false;

    var pointRad = 4;
    var chosenPointRad = 6;
    var lineRad = 2;
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

    var pointColor;
    if (showOXYZ==0) {
        pointColor = [1.0, 0.3, 0.0, 1.0];
    } else if (showOXYZ==1){
        pointColor = [0.0, 0.0, 1.0, 1.0];
    } else {
        pointColor = [0.0, 0.7, 0.0, 1.0];
    }

    primitives.push({class:"point", text: showOXYZ==0?"A":"", arr0:points[0].coord1, rad:pointRad, color:pointColor});
    primitives.push({class:"point", text: showOXYZ==0?"B":"", arr0:points[1].coord1, rad:pointRad, color:pointColor});
    primitives.push({class:"point", text: showOXYZ==0?"C":"", arr0:points[2].coord1, rad:pointRad, color:pointColor});
    if (showOXYZ==2)  pointColor = [0.7, 0.7, 0.0, 1.0];
    primitives.push({class:"point", text: showOXYZ==0?"D":"", arr0:points[3].coord1, rad:pointRad, color:pointColor});
    primitives.push({class:"point", text: showOXYZ==0?"E":"", arr0:points[4].coord1, rad:pointRad, color:pointColor});
    primitives.push({class:"point", text: showOXYZ==0?"F":"", arr0:points[5].coord1, rad:pointRad, color:pointColor});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]});
    }

    if (showOXYZ == 0) {return;}

    var leftPoint1 = [];
    var rightPoint1 = [];
    createLine(points[lines[0][0]].coord1,points[lines[0][1]].coord1,leftPoint1,rightPoint1);
    var leftPoint2 = [];
    var rightPoint2 = [];
    createLine(points[lines[1][0]].coord1,points[lines[1][1]].coord1,leftPoint2,rightPoint2);
    var leftPoint3 = [];
    var rightPoint3 = [];
    createLine(points[lines[2][0]].coord1,points[lines[2][1]].coord1,leftPoint3,rightPoint3);
    var leftPoint4 = [];
    var rightPoint4 = [];
    createLine(points[1].coord1,points[5].coord1,leftPoint4,rightPoint4);

    var lineColor;
    if (showOXYZ==1) {
        lineColor = [0.0, 0.6, 1.0, 1.0];
        primitives.push({class:"line", text: showOXYZ==1?"a":"", arr0:leftPoint2, arr1:rightPoint2, rad:lineRad, color:lineColor});
        primitives.push({class:"line", text: showOXYZ==1?"b":"", arr0:leftPoint3, arr1:rightPoint3, rad:lineRad, color:lineColor});
        primitives.push({class:"line", text: showOXYZ==1?"c":"", arr0:leftPoint4, arr1:rightPoint4, rad:lineRad, color:lineColor});
    }
    if (showOXYZ == 1) {return;}

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];

    createPlane(points[0].coord1,points[1].coord1,points[2].coord1,planepoint1,planepoint2,planepoint3,planepoint4);
    primitives.push({class:"plane", text: katex.renderToString("\\alpha"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 1.0, 0.0, 0.25]});

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];

    createPlane(points[3].coord1,points[4].coord1,points[5].coord1,planepoint1,planepoint2,planepoint3,planepoint4);
    primitives.push({class:"plane", text: katex.renderToString("\\beta"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[1.0, 1.0, 0.0, 0.25]});
}
var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-2, -1, 1]), movable: "free"});
    points.push({coord1: vec3.create([2, 1, -1]), movable: "free"});
    points.push({coord1: vec3.create([0, 0, 0]), movable: "free"});
    points.push({coord1: vec3.create([2.74, -0.48, 1]), movable: "free"});
    points.push({coord1: vec3.create([0.07, -1.04, 1.35]), movable: "free"});
}
var C;
function initDescr() {
    var descr = "";
    descr += 'Пространство элементарной геометрии $E_3$';
    descr += '<label><input type="radio" name="group1" checked onchange="changeOXYZ(1)"> Точка $O$ на отрезке $AB$</label>';
    descr += '<label><input type="radio" name="group1" onchange="changeOXYZ(2)"> Луч $OA$</label>';
    descr += '<label><input type="radio" name="group1" onchange="changeOXYZ(3)"> Угол $\\angle AOB$</label>';
    descr += '<label><input type="radio" name="group1" onchange="changeOXYZ(4)"> Пересечение прямой $a$ отрезком $AB$</label>';

    $("#description").html(descr);
    $("Title").html("Пространство элементарной геометрии");
}
var alpha = katex.renderToString("\\alpha");
var beta = katex.renderToString("\\beta");
var inSymb = katex.renderToString("\\in");
var notinSymb = katex.renderToString("\\notin");
var showOXYZ = 1;
function changeOXYZ(n) {
    showOXYZ = n;
    switch (n) {
      case 1:
      case 2:
        vec3.set([-2, -1, 1],points[0].coord1);
        vec3.set([2, 1, -1],points[1].coord1);
        vec3.set([0, 0, 0],points[2].coord1);
        break;
      case 3:
        vec3.set([-2, -1, 1],points[0].coord1);
        vec3.set([2, 1, -1],points[1].coord1);
        vec3.set([0, -3, 0],points[2].coord1);
        break;
      case 4:
        vec3.set([-2, -1, 1],points[0].coord1);
        vec3.set([2, 1, -1],points[1].coord1);
        vec3.set([3, -2, 3],points[2].coord1);
        break;
    }
    initBuffers();
}
function initData() {
    // console.log("initData()");
    isShowAxes = false;
    // for (var i = 0; i < points.length; i++) {
    //     console.log(i,points[i].coord1);
    // }
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

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]});
    }

    var deltaDist = 0.01;
    var isIn;
    var dist;
    var addText;
    var pointColor;
    if (showOXYZ==1){
        points[0].movable = "line";
        points[1].movable = "line";
        points[2].movable = "line";
        points[3].movable = "fixed";
        points[4].movable = "fixed";
        var AB = [];
        vec3.subtract(points[1].coord1,points[0].coord1,AB);
        points[0].vector = [];
        points[1].vector = [];
        points[2].vector = [];
        vec3.set(AB,points[0].vector);
        vec3.set(AB,points[1].vector);
        vec3.set(AB,points[2].vector);
        var lineColor;
        var leftPoint = [];
        var rightPoint = [];
        createLine(points[0].coord1,points[1].coord1,leftPoint,rightPoint);
        lineColor = [0.0, 0.6, 1.0, 1.0];
        primitives.push({class:"line", text: "", arr0:leftPoint, arr1:rightPoint, rad:lineRad, color:lineColor});
        lineColor = [0.0, 1.0, 0.6, 1.0];
        primitives.push({class:"line", text: "", arr0:points[0].coord1, arr1:points[1].coord1, rad:lineRad*1.1, color:lineColor});
        pointColor = [1.0, 0.3, 0.0, 1.0];
        primitives.push({class:"point", text: "A", arr0:points[0].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "B", arr0:points[1].coord1, rad:pointRad, color:pointColor});

        var OA = [];
        var OB = [];
        vec3.subtract(points[0].coord1,points[2].coord1,OA);
        vec3.subtract(points[1].coord1,points[2].coord1,OB);
        if (vec3.length(AB)>=vec3.length(OA)+vec3.length(OB)-0.01) {
            pointColor = [0.0, 0.7, 0.0, 1.0];
        }
        else
        {
            pointColor = [0.0, 0.0, 1.0, 1.0];
        }
        primitives.push({class:"point", text: "O", arr0:points[2].coord1, rad:pointRad, color:pointColor});
    } else if (showOXYZ==2){
        points[0].movable = "fixed";
        points[1].movable = "free";
        points[2].movable = "free";
        points[3].movable = "fixed";
        points[4].movable = "fixed";

        var lineColor;
        var leftPoint = [];
        var rightPoint = [];
        createLine(points[2].coord1,points[1].coord1,leftPoint,rightPoint);
        lineColor = [0.0, 0.6, 1.0, 1.0];
        primitives.push({class:"line", text: "", arr0:points[2].coord1, arr1:rightPoint, rad:lineRad, color:lineColor});
        pointColor = [1.0, 0.3, 0.0, 1.0];
        primitives.push({class:"point", text: "A", arr0:points[1].coord1, rad:pointRad, color:pointColor});

        primitives.push({class:"point", text: "O", arr0:points[2].coord1, rad:pointRad, color:pointColor});
    } else if (showOXYZ==3){
        points[0].movable = "free";
        points[1].movable = "free";
        points[2].movable = "free";
        points[3].movable = "fixed";
        points[4].movable = "fixed";

        var AB = [];
        vec3.subtract(points[1].coord1,points[0].coord1,AB);
        points[0].vector = [];
        points[1].vector = [];
        points[2].vector = [];
        vec3.set(AB,points[0].vector);
        vec3.set(AB,points[1].vector);
        vec3.set(AB,points[2].vector);
        var lineColor;
        lineColor = [0.0, 0.6, 1.0, 1.0];
        pointColor = [1.0, 0.3, 0.0, 1.0];
        var leftPoint = [];
        var rightPoint = [];
        createLine(points[2].coord1,points[0].coord1,leftPoint,rightPoint);
        primitives.push({class:"line", text: "", arr0:points[2].coord1, arr1:rightPoint, rad:lineRad, color:lineColor});
        var leftPoint = [];
        var rightPoint = [];
        createLine(points[2].coord1,points[1].coord1,leftPoint,rightPoint);
        primitives.push({class:"line", text: "", arr0:points[2].coord1, arr1:rightPoint, rad:lineRad, color:lineColor});
        primitives.push({class:"point", text: "A", arr0:points[0].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "B", arr0:points[1].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "O", arr0:points[2].coord1, rad:pointRad, color:pointColor});
    } else if (showOXYZ==4){
        points[0].movable = "fixed";
        points[1].movable = "fixed";
        points[2].movable = "fixed";
        points[3].movable = "plane";
        points[4].movable = "plane";

        var v1 = [];
        var v2 = [];
        vec3.subtract(points[1].coord1,points[0].coord1,v1);
        vec3.subtract(points[2].coord1,points[0].coord1,v2);
        var norm = [];
        vec3.cross(v1,v2,norm);
        points[3].vector = [];
        points[4].vector = [];
        vec3.set(norm,points[3].vector);
        vec3.set(norm,points[4].vector);
        var lineColor;
        lineColor = [0.0, 0.0, 1.0, 1.0];
        pointColor = [1.0, 0.3, 0.0, 1.0];
        var leftPoint = [];
        var rightPoint = [];
        createLine(points[0].coord1,points[1].coord1,leftPoint,rightPoint);
        primitives.push({class:"line", text: "a", arr0:leftPoint, arr1:rightPoint, rad:lineRad, color:lineColor});

        primitives.push({class:"point", text: "A", arr0:points[3].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "B", arr0:points[4].coord1, rad:pointRad, color:pointColor});

        var plusminus = 0;

        var vA = [];
        var vB = [];
        vec3.subtract(points[3].coord1,points[0].coord1,vA);
        vec3.subtract(points[4].coord1,points[0].coord1,vB);
        vec3.cross(vA,v1);
        if (vec3.dot(vA,norm) >= 0) plusminus++;
        else plusminus--;
        vec3.cross(vB,v1);
        if (vec3.dot(vB,norm) >= 0) plusminus++;
        else plusminus--;

        if (plusminus == 2) lineColor = [0.5, 0.0, 1.0, 1.0];
        else if (plusminus == -2) lineColor = [0.0, 0.5, 1.0, 1.0];
        else lineColor = [1.0, 0.0, 0.0, 1.0];

        primitives.push({class:"line", text: "", arr0:points[3].coord1, arr1:points[4].coord1, rad:lineRad*1.1, color:lineColor});

        var planepoint1 = [];
        var planepoint2 = [];
        var planepoint3 = [];
        var planepoint4 = [];
        createPlane(points[0].coord1,points[1].coord1,points[2].coord1,planepoint1,planepoint2,planepoint3,planepoint4);
        primitives.push({class:"plane", text: alpha, arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 1.0, 0.0, 0.25]});
    }
}
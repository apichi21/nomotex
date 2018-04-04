var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([3.6, 0.32, 1.11]), movable: "free"});
    points.push({coord1: vec3.create([-2.5, 0.64, 3.13]), movable: "free"});
    points.push({coord1: vec3.create([-2.76, 1.42, -1.33]), movable: "free"});
    points.push({coord1: vec3.create([1.14, 0.75, 0.17]), movable: "free"});
    points.push({coord1: vec3.create([-1.1,-0.5,0.6]), movable: "free"});
    points.push({coord1: vec3.create([-0.89, 3.3, -2]), movable: "free"});
    points.push({coord1: vec3.create([-1.98, 1.91, 0.39]), movable: "free"});
    points.push({coord1: vec3.create([1.7, 2.37, -2.22]), movable: "free"});
    lines = [];
    lines.push([0,1]);
    lines.push([0,2]);
    lines.push([3,4]);
}
var C;
function initDescr() {
    var descr = "";
    descr += 'Пространство элементарной геометрии $E_3$';
    descr += '<label><input type="radio" name="group1" checked onchange="changeOXYZ(1)"> Точки, принадлежащие прямой</label>';
    descr += '<label><input type="radio" name="group1" onchange="changeOXYZ(2)"> Точки, принадлежащие плоскости</label>';
    descr += '<label><input type="radio" name="group1" onchange="changeOXYZ(3)"> Прямая, принадлежащая плоскости</label>';
    descr += '<label><input type="radio" name="group1" onchange="changeOXYZ(4)"> Точки и прямая, принадлежащие двум плоскостям</label>';

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
    initBuffers();
}
function initData() {
    isShowAxes = false;
    var pointRad = 4;
    var pointRad1 = 5.9;
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
        points[1].movable = "fixed";
        points[5].movable = "free";
        points[6].movable = "fixed";
        points[7].movable = "fixed";

        pointColor = [0.0, 0.0, 1.0, 1.0];
        primitives.push({class:"point", text: "", arr0:points[0].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "", arr0:points[2].coord1, rad:pointRad, color:pointColor});

        addText = "a";
        pointColor = [1.0, 0.3, 0.0, 1.0];

        dist = distToLine(points[3].coord1,points[0].coord1,points[2].coord1);
        isIn = dist<deltaDist;
        primitives.push({class:"point", text: "A"+(isIn?inSymb+addText:notinSymb+addText), arr0:points[3].coord1, rad:pointRad1, color:pointColor});

        dist = distToLine(points[4].coord1,points[0].coord1,points[2].coord1);
        isIn = dist<deltaDist;
        primitives.push({class:"point", text: "B"+(isIn?inSymb+addText:notinSymb+addText), arr0:points[4].coord1, rad:pointRad1, color:pointColor});

        dist = distToLine(points[5].coord1,points[0].coord1,points[2].coord1);
        isIn = dist<deltaDist;
        primitives.push({class:"point", text: "C"+(isIn?inSymb+addText:notinSymb+addText), arr0:points[5].coord1, rad:pointRad1, color:pointColor});

        var leftPoint = [];
        var rightPoint = [];
        createLine(points[lines[1][0]].coord1,points[lines[1][1]].coord1,leftPoint,rightPoint);

        var lineColor;
        lineColor = [0.0, 0.6, 1.0, 1.0];
        primitives.push({class:"line", text: "a", arr0:leftPoint, arr1:rightPoint, rad:lineRad, color:lineColor});
    } else if (showOXYZ==2){
        points[1].movable = "free";
        points[5].movable = "free";
        points[6].movable = "free";
        points[7].movable = "fixed";

        pointColor = [0.0, 0.7, 0.0, 1.0];
        primitives.push({class:"point", text: "", arr0:points[0].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "", arr0:points[1].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "", arr0:points[2].coord1, rad:pointRad, color:pointColor});

        addText = alpha;
        pointColor = [1.0, 0.3, 0.0, 1.0];

        dist = distToPlane(points[3].coord1,points[0].coord1,points[1].coord1,points[2].coord1);
        isIn = dist<deltaDist;
        primitives.push({class:"point", text: "A"+(isIn?inSymb+addText:notinSymb+addText), arr0:points[3].coord1, rad:pointRad1, color:pointColor});

        dist = distToPlane(points[4].coord1,points[0].coord1,points[1].coord1,points[2].coord1);
        isIn = dist<deltaDist;
        primitives.push({class:"point", text: "B"+(isIn?inSymb+addText:notinSymb+addText), arr0:points[4].coord1, rad:pointRad1, color:pointColor});

        dist = distToPlane(points[5].coord1,points[0].coord1,points[1].coord1,points[2].coord1);
        isIn = dist<deltaDist;
        primitives.push({class:"point", text: "C"+(isIn?inSymb+addText:notinSymb+addText), arr0:points[5].coord1, rad:pointRad1, color:pointColor});

        dist = distToPlane(points[5].coord1,points[0].coord1,points[1].coord1,points[2].coord1);
        isIn = dist<deltaDist;
        primitives.push({class:"point", text: "D"+(isIn?inSymb+addText:notinSymb+addText), arr0:points[6].coord1, rad:pointRad1, color:pointColor});

        var planepoint1 = [];
        var planepoint2 = [];
        var planepoint3 = [];
        var planepoint4 = [];

        createPlane(points[lines[0][0]].coord1,points[lines[0][1]].coord1,points[lines[1][1]].coord1,planepoint1,planepoint2,planepoint3,planepoint4);
        primitives.push({class:"plane", text: alpha, arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 1.0, 0.0, 0.25]});
    } else if (showOXYZ==3){
        pointColor = [0.0, 0.7, 0.0, 1.0];
        points[1].movable = "free";
        points[5].movable = "fixed";

        primitives.push({class:"point", text: "", arr0:points[0].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "", arr0:points[1].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "", arr0:points[2].coord1, rad:pointRad, color:pointColor});

        addText = alpha;
        pointColor = [1.0, 0.3, 0.0, 1.0];

        var pointsIn = 0;
        dist = distToPlane(points[3].coord1,points[0].coord1,points[1].coord1,points[2].coord1);
        isIn = dist<deltaDist;
        if (isIn) pointsIn++;
        primitives.push({class:"point", text: "A"+(isIn?inSymb+addText:notinSymb+addText), arr0:points[3].coord1, rad:pointRad1, color:pointColor});

        dist = distToPlane(points[4].coord1,points[0].coord1,points[1].coord1,points[2].coord1);
        isIn = dist<deltaDist;
        if (isIn) pointsIn++;
        primitives.push({class:"point", text: "B"+(isIn?inSymb+addText:notinSymb+addText), arr0:points[4].coord1, rad:pointRad1, color:pointColor});

        var lineColor;
        lineColor = [0.0, 0.6, 1.0, 1.0];

        var leftPoint = [];
        var rightPoint = [];
        createLine(points[3].coord1,points[4].coord1,leftPoint,rightPoint);
        primitives.push({class:"line", text: "a"+(pointsIn==2?inSymb+addText:notinSymb+addText), arr0:leftPoint, arr1:rightPoint, rad:lineRad, color:lineColor});

        var planepoint1 = [];
        var planepoint2 = [];
        var planepoint3 = [];
        var planepoint4 = [];

        createPlane(points[lines[0][0]].coord1,points[lines[0][1]].coord1,points[lines[1][1]].coord1,planepoint1,planepoint2,planepoint3,planepoint4);
        primitives.push({class:"plane", text: alpha, arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 1.0, 0.0, 0.25]});
    } else if (showOXYZ==4){
        pointColor = [0.0, 0.7, 0.0, 1.0];
        points[1].movable = "free";
        points[5].movable = "free";
        points[6].movable = "free";
        points[7].movable = "free";

        primitives.push({class:"point", text: "", arr0:points[0].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "", arr0:points[1].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "", arr0:points[2].coord1, rad:pointRad, color:pointColor});

        pointColor = [0.7, 0.7, 0.0, 1.0];
        primitives.push({class:"point", text: "", arr0:points[5].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "", arr0:points[6].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "", arr0:points[7].coord1, rad:pointRad, color:pointColor});

        pointColor = [1.0, 0.3, 0.0, 1.0];

        var primitiveText;
        var pointsIn1 = 0;
        var pointsIn2 = 0;
        dist = distToPlane(points[3].coord1,points[0].coord1,points[1].coord1,points[2].coord1);
        isIn = dist<deltaDist;
        if (isIn) pointsIn1++;
        primitiveText = "A"+(isIn?inSymb+alpha:notinSymb+alpha)+"<br>";

        dist = distToPlane(points[3].coord1,points[5].coord1,points[6].coord1,points[7].coord1);
        isIn = dist<deltaDist;
        if (isIn) pointsIn2++;
        primitiveText += "A"+(isIn?inSymb+beta:notinSymb+beta);

        primitives.push({class:"point", text: primitiveText, arr0:points[3].coord1, rad:pointRad1, color:pointColor});

        dist = distToPlane(points[4].coord1,points[0].coord1,points[1].coord1,points[2].coord1);
        isIn = dist<deltaDist;
        if (isIn) pointsIn1++;
        primitiveText = "B"+(isIn?inSymb+alpha:notinSymb+alpha)+"<br>";

        dist = distToPlane(points[4].coord1,points[5].coord1,points[6].coord1,points[7].coord1);
        isIn = dist<deltaDist;
        if (isIn) pointsIn2++;
        primitiveText += "B"+(isIn?inSymb+beta:notinSymb+beta);
        primitives.push({class:"point", text: primitiveText, arr0:points[4].coord1, rad:pointRad1, color:pointColor});

        var lineColor;
        lineColor = [0.0, 0.6, 1.0, 1.0];

        var leftPoint = [];
        var rightPoint = [];
        createLine(points[3].coord1,points[4].coord1,leftPoint,rightPoint);
        primitiveText = "a"+(pointsIn1==2?inSymb+alpha:notinSymb+alpha)+"<br>";
        primitiveText += "a"+(pointsIn2==2?inSymb+beta:notinSymb+beta);
        primitives.push({class:"line", text: primitiveText, arr0:leftPoint, arr1:rightPoint, rad:lineRad, color:lineColor});

        var planepoint1 = [];
        var planepoint2 = [];
        var planepoint3 = [];
        var planepoint4 = [];
        createPlane(points[lines[0][0]].coord1,points[lines[0][1]].coord1,points[lines[1][1]].coord1,planepoint1,planepoint2,planepoint3,planepoint4);
        primitives.push({class:"plane", text: alpha, arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 1.0, 0.0, 0.25]});

        var planepoint1 = [];
        var planepoint2 = [];
        var planepoint3 = [];
        var planepoint4 = [];
        createPlane(points[5].coord1,points[6].coord1,points[7].coord1,planepoint1,planepoint2,planepoint3,planepoint4);
        primitives.push({class:"plane", text: beta, arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[1.0, 1.0, 0.0, 0.25]});
    }
}
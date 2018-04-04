var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0, 0, 0]), movable: "free"});
    points.push({coord1: vec3.create([-3.201562, -1, 1]), movable: "free"});
    points.push({coord1: vec3.create([3.201562, 1, -1]), movable: "free"});
    points.push({coord1: vec3.create([2.74, -0.48, 1]), movable: "free"});
    lines = [];
    lines.push({coord1: 1, coord2: 2});
    lines.push({coord1: 0, coord2: 1});
    lines.push({coord1: 2, coord2: 0});
}
var ratio;
var lengthC = 5;
function initDescr() {
    var descr = "";
    descr += 'Пространство элементарной геометрии $E_3$';
    descr += '<label><input type="radio" name="group1" checked onchange="changeOXYZ(1)"> Длина отрезка AB.<br>$|AB| = |AO|+|OB|$</label>';
    descr += '<label><input type="radio" name="group1" onchange="changeOXYZ(2)"> Градусная мера угла $\\angle AOB$.<br>$\\angle AOB=\\angle AOC+\\angle COB$</label>';
    $("#description").html(descr); 
    $("Title").html("Пространство элементарной геометрии");
    changeOXYZ(1);
}
var showOXYZ = 1;
function changeOXYZ(n) {
    showOXYZ = n;
    switch (n) {
      case 1:
        vec3.set([0, 0, 0],points[0].coord1);
        vec3.set([-3.201562, -1, 1],points[1].coord1);
        vec3.set([3.201562, 1, -1],points[2].coord1);
        ratio = 3.0/7.0;
        break;
      case 2:
        vec3.set([0, -4.0599, 0],points[0].coord1);
        vec3.set([-2, -1, 1],points[1].coord1);
        vec3.set([2, 1, -1],points[2].coord1);
        vec3.set([0, 3, 0],points[3].coord1);
        ratio = 2.0/6.0;
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
    var pointColor;
    if (showOXYZ==1){
        points[0].movable = "line";
        points[1].movable = "free";
        points[2].movable = "free";
        points[3].movable = "fixed";

        lines[0].measure = true;
        lines[1].measure = true;
        lines[2].measure = true;

        var AB = [];
        vec3.subtract(points[2].coord1,points[1].coord1,AB);
        points[0].vector = [];
        vec3.set(AB,points[0].vector);

        var AO = [];
        if (arrPoint == points[0].coord1) {
            vec3.subtract(points[0].coord1,points[1].coord1,AO);
            // ratio = vec3.length(AO)/vec3.length(AB);
            let lenAB = vec3.length(AB);
            ratio = vec3.dot(AO,AB)/lenAB/lenAB;
            if (ratio < 0) {
                ratio = 0;
                vec3.scale(AB, ratio, AO);
                vec3.add(AO,points[1].coord1);
                vec3.set(AO,points[0].coord1);
            }
            else if (ratio > 1) {
                ratio = 1;
                vec3.scale(AB, ratio, AO);
                vec3.add(AO,points[1].coord1);
                vec3.set(AO,points[0].coord1);
            } 
        } else {
            vec3.scale(AB, ratio, AO);
            vec3.add(AO,points[1].coord1);
            vec3.set(AO,points[0].coord1);
        }

        var lineColor;
        lineColor = [0.0, 0.6, 1.0, 1.0];
        primitives.push({class:"line", text: "", arr0:points[1].coord1, arr1:points[2].coord1, rad:lineRad, color:lineColor});
        pointColor = [1.0, 0.3, 0.0, 1.0];
        primitives.push({class:"point", text: "O", arr0:points[0].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "A", arr0:points[1].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "B", arr0:points[2].coord1, rad:pointRad, color:pointColor});
    } else if (showOXYZ==2){
        points[0].movable = "free";
        points[1].movable = "free";
        points[2].movable = "free";
        points[3].movable = "plane";

        lines[0].measure = false;
        lines[1].measure = false;
        lines[2].measure = false;

        var v1 = [];
        var v2 = [];
        vec3.subtract(points[1].coord1,points[0].coord1,v1);
        vec3.subtract(points[2].coord1,points[0].coord1,v2);
        var norm = [];
        vec3.cross(v1,v2,norm);
        points[3].vector = [];
        vec3.set(norm,points[3].vector);

        var vec_a = [];
        vec3.subtract(points[1].coord1,points[0].coord1,vec_a);
        vec3.normalize(vec_a);
        var vec_b = [];
        vec3.subtract(points[2].coord1,points[0].coord1,vec_b);
        vec3.normalize(vec_b);
        var cosTheta = vec3.dot(vec_a,vec_b);
        var angleab = Math.acos(cosTheta)/Math.PI*180.0;

        var vec_c = [];
        var angleac, anglecb;
        if (arrPoint == points[3].coord1) {
            vec3.subtract(points[3].coord1,points[0].coord1,vec_c);
            lengthC = vec3.length(vec_c);
            vec3.scale(vec_c,1.0/lengthC);
            cosTheta = vec3.dot(vec_a,vec_c);
            angleac = Math.acos(cosTheta)/Math.PI*180.0;
            cosTheta = vec3.dot(vec_c,vec_b);
            anglecb = Math.acos(cosTheta)/Math.PI*180.0;

            ratio = angleac/angleab;
            if (angleac > angleab-0.1 || anglecb > angleab-0.1) {
                if (anglecb > angleac) {
                    // ratio = 0;
                    ratio = 0.1/angleab;
                    angleac = angleab*ratio;
                    anglecb = angleab*(1-ratio);
                    var rot = mat4.create();
                    mat4.identity(rot);
                    mat4.rotate(rot, angleab*ratio/180.0*Math.PI, norm);
                    mat4.multiplyVec3(rot,vec_a,vec_c);
                    vec3.scale(vec_c, lengthC);
                    vec3.add(vec_c, points[0].coord1, points[3].coord1);
                }
                else {
                    // ratio = 1;
                    ratio = (angleab-0.1)/angleab;;
                    angleac = angleab*ratio;
                    anglecb = angleab*(1-ratio);
                    var rot = mat4.create();
                    mat4.identity(rot);
                    mat4.rotate(rot, angleab*ratio/180.0*Math.PI, norm);
                    mat4.multiplyVec3(rot,vec_a,vec_c);
                    vec3.scale(vec_c, lengthC);
                    vec3.add(vec_c, points[0].coord1, points[3].coord1);
                } 
            }
        } else {
            var rot = mat4.create();
            mat4.identity(rot);
            angleac = angleab*ratio;
            anglecb = angleab*(1-ratio);
            mat4.rotate(rot, angleac/180.0*Math.PI, norm);
            mat4.multiplyVec3(rot,vec_a,vec_c);
            vec3.scale(vec_c, lengthC);
            vec3.add(vec_c, points[0].coord1, points[3].coord1);
        }

        var lineColor;
        lineColor = [0.0, 0.6, 1.0, 1.0];
        pointColor = [1.0, 0.3, 0.0, 1.0];
        var leftPoint = [];
        var rightPoint = [];
        createLine(points[0].coord1,points[1].coord1,leftPoint,rightPoint);
        primitives.push({class:"line", text: "", arr0:points[0].coord1, arr1:rightPoint, rad:lineRad, color:lineColor});
        var leftPoint = [];
        var rightPoint = [];
        createLine(points[0].coord1,points[2].coord1,leftPoint,rightPoint);
        primitives.push({class:"line", text: "", arr0:points[0].coord1, arr1:rightPoint, rad:lineRad, color:lineColor});

        primitives.push({class:"point", text: "O", arr0:points[0].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "A", arr0:points[1].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"point", text: "B", arr0:points[2].coord1, rad:pointRad, color:pointColor});

        primitives.push({class:"arc", text: angleab.toFixed(0)+"\u00B0", arr0:points[0].coord1, arr1:points[1].coord1, arr2:points[2].coord1, Rad:1.5, rad:2, color:[0.0, 0.0, 0.0, 1.0]});

        var leftPoint = [];
        var rightPoint = [];
        createLine(points[0].coord1,points[3].coord1,leftPoint,rightPoint);
        primitives.push({class:"line", text: "", arr0:points[0].coord1, arr1:rightPoint, rad:lineRad, color:lineColor});
        primitives.push({class:"point", text: "C", arr0:points[3].coord1, rad:pointRad, color:pointColor});
        primitives.push({class:"arc", text: angleac.toFixed(0)+"\u00B0", arr0:points[0].coord1, arr1:points[1].coord1, arr2:points[3].coord1, Rad:2.9, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arc", text: anglecb.toFixed(0)+"\u00B0", arr0:points[0].coord1, arr1:points[3].coord1, arr2:points[2].coord1, Rad:3.1, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
    }
}
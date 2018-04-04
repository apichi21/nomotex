var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    var descr = "";
    descr += '<label style="display: block; padding-top: 5px;"><input type="radio" name="group1" checked onchange="changeOXYZ(0)">\
     Аффинная (декартова) система координат<br>\
     т.O - начало координат<br>\
     $\\vec e_1,\\vec e_2,\\vec e_3$ - векторы базиса<br>\
     </label>';
    descr += '<label style="display: block; padding-top: 5px;"><input type="radio" name="group1" onchange="changeOXYZ(1)">\
     Прямоугольная декартова система координат<br>\
     т.O - начало координат<br>\
     $\\vec i,\\vec j,\\vec k$ - векторы базиса<br>\
     Ox - ось абсцисс<br>\
     Oy - ось ординат<br>\
     Oz - ось аппликат<br>\
     </label>';

    $("#description").html(descr); 
    $("Title").html("Аффинная система координат");
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
    var lineRad = 1;
    var arrowRad = 2.5;

    var lineColor = [0.3, 0.3, 0.3, 1.0];
    var point0 = [0,0,0];
    var point1;
    var point2;
    var point3;
    var names1;
    var names2;

    if (showOXYZ==0) {
        point1 = [1.5,0,-0.5];
        point2 = [0.8,0.8,0];
        point3 = [1,-1,1];
        names1 = [katex.renderToString('\\vec e_1'),katex.renderToString('\\vec e_2'),katex.renderToString('\\vec e_3')];
        names2 = ['','',''];
    } else {
        point1 = [2,0,0];
        point2 = [0,2,0];
        point3 = [0,0,2];
        names1 = [katex.renderToString('\\vec i'),katex.renderToString('\\vec j'),katex.renderToString('\\vec k')];
        names2 = ['x','y','z'];
    }
    primitives.push({class:"text", text: "O", arr0:point0});

    primitives.push({class:"arrow", text: "", arr0:point0, arr1:point1, rad:arrowRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:point0, arr1:point2, rad:arrowRad, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:point0, arr1:point3, rad:arrowRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"text", text: names1[0], arr0:point1});
    primitives.push({class:"text", text: names1[1], arr0:point2});
    primitives.push({class:"text", text: names1[2], arr0:point3});

    var p1 = [];
    var p2 = [];
    createLine(point0,point1,p1,p2);
    primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:lineRad, color:lineColor});
    primitives.push({class:"text", text: names2[0], arr0:p2});
    var p1 = [];
    var p2 = [];
    createLine(point0,point2,p1,p2);
    primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:lineRad, color:lineColor});
    primitives.push({class:"text", text: names2[1], arr0:p2});
    var p1 = [];
    var p2 = [];
    createLine(point0,point3,p1,p2);
    primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:lineRad, color:lineColor});
    primitives.push({class:"text", text: names2[2], arr0:p2});
}
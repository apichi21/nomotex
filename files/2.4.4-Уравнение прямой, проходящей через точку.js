var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([3,2,0]), movable: "free"});
    points.push({coord1: vec3.create(), movable: "free"});
    points.push({coord1: vec3.create(), movable: "line", vector: vec3.create()});
    pointM0 = points[0].coord1;
    vecN0 = [-2,4,0];
}
function initDescr() {
    var descr = "";
    descr += "<p>Уравнение вида $A(x-x_0)+B(y-y_0)=0$ называется уравнением прямой, проходящей через точку $M_0(x_0,y_0)$ c нормальным вектором $\\vec N(A,B)$.</p>";
    var tIS = 5;
    
    descr += "<p>";
    descr += '<label><input type="checkbox" checked onchange="checkChanged(0,this.checked);">Координаты $x_0,y_0$ точки $M_0$</label>';
    descr += '<label><input type="checkbox" checked onchange="checkChanged(1,this.checked);">Координаты $A,B$ вектора $\\vec N$</label>';
    descr += '<label><input type="checkbox" checked onchange="checkChanged(2,this.checked);">Координаты $x,y$ точки $M$</label>';
    descr += "</p>";
    descr += "<p><table>";
    descr += "<tr><td>$x_0$</td><td><input type='text' id='x0' size='"+tIS+"'></td>\
                  <td>$y_0$</td><td><input type='text' id='y0' size='"+tIS+"'></td></tr>";
    descr += "<tr><td>A</td><td><input type='text' id='A' size='"+tIS+"'></td>\
                  <td>B</td><td><input type='text' id='B' size='"+tIS+"'></td></tr>";
    descr += "</table></p>";
    // descr += "<p><span id='sp'></span></p>";
    $("#description").html(descr);

    $("#x0").change(function(event){pointM0[0] = parseFloat(this.value);initBuffers();});
    $("#y0").change(function(event){pointM0[1] = parseFloat(this.value);initBuffers();});
    $("#A").change(function(event){vecN0[0] = parseFloat(this.value);initBuffers();});
    $("#B").change(function(event){vecN0[1] = parseFloat(this.value);initBuffers();});
    $("Title").html("Уравнение прямой, проходящей через точку");
}
var pointM0;
var vecN0;
var pointMAlpha = 0.8;
var isShow = [true,true,true];
function checkChanged(num, ch) {
    isShow[num] = ch;
    initBuffers();
}
function initData() {
    var pointRad = 4;
    var chosenPointRad = 6;
    var lineRad = 2;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[1].coord1) {
            vec3.subtract(points[1].coord1,pointM0,vecN0);
        }
    }

    $("#A").val(parseFloat(vecN0[0].toPrecision(3)));
    $("#B").val(parseFloat(vecN0[1].toPrecision(3)));
    $("#x0").val(parseFloat(pointM0[0].toPrecision(3)));
    $("#y0").val(parseFloat(pointM0[1].toPrecision(3)));
    // function minus(txt) {
    //     return txt<0?"+"+(-txt):"-"+txt;
    // }
    // function plus(txt) {
    //     return txt<0?txt:"+"+txt;
    // }
    // $("#sp").html(katex.renderToString(        
    //     parseFloat(vecN0[0].toPrecision(3))+"(x"+minus(parseFloat(pointM0[0].toPrecision(3)))+")"+
    //     plus(parseFloat(vecN0[1].toPrecision(3)))+"(y"+minus(parseFloat(pointM0[1].toPrecision(3)))+")=0"
    //     ));
    
    var pointM1 = [];
    var vecN = points[1].coord1;
    vec3.add(pointM0,[-vecN0[1],vecN0[0],vecN0[2]],pointM1);
    vec3.add(vecN0,pointM0,vecN);

    var C = -vecN0[0]*pointM0[0]-vecN0[1]*pointM0[1];
    var p11 = [];
    var p12 = [];
    createLine(pointM0, pointM1, p11, p12,10);
    if (arrPoint == points[2].coord1) {
        var tempVecP1M = [];
        var tempVecP1P2 = [];
        vec3.subtract(points[2].coord1,p11,tempVecP1M);
        vec3.subtract(p12,p11,tempVecP1P2);
        pointMAlpha = vec3.length(tempVecP1M) / vec3.length(tempVecP1P2);

    } else {
        vec3.set([-vecN0[1],vecN0[0],vecN0[2]], points[2].vector);
    }
   
    var pointM = points[2].coord1;
    vec3.subtract(p12,p11,pointM);
    vec3.scale(pointM,pointMAlpha);
    vec3.add(pointM,p11);

    function pushCoordLines(point, color, labelx, labely) {
        primitives.push({class:"dashline", text: "", arr0:point, arr1:[point[0],0,0], rad:1.2, color:color});
        primitives.push({class:"dashline", text: "", arr0:point, arr1:[0,point[1],0], rad:1.2, color:color});
        primitives.push({class:"text", text: labelx, arr0:[point[0],0,0]});
        primitives.push({class:"text", text: labely, arr0:[0,point[1],0]});
    }
    function pushVectorCoordLines(point1, point2, color, labelx, labely) {
        primitives.push({class:"dashline", text: labely, pos: "lc", arr0:point2, arr1:[point2[0],point1[1],0], rad:1.2, color:color});
        primitives.push({class:"dashline", text: labelx, pos: "cb", arr0:point2, arr1:[point1[0],point2[1],0], rad:1.2, color:color});
        primitives.push({class:"dashline", text: "", arr0:point1, arr1:[point2[0],point1[1],0], rad:1.2, color:color});
        primitives.push({class:"dashline", text: "", arr0:point1, arr1:[point1[0],point2[1],0], rad:1.2, color:color});
    }
    if (isShow[0]) {
        pushCoordLines(pointM0, [0.8, 0.0, 0.0, 1.0], katex.renderToString("x_0"), katex.renderToString("y_0"));
    }
    if (isShow[1]) {
        pushVectorCoordLines(pointM0, vecN, [0.0, 0.6, 0.0, 1.0], "A", "B");
    }
    if (isShow[2]) {
        pushCoordLines(pointM, [0.8, 0.0, 0.0, 1.0], katex.renderToString("x"), katex.renderToString("y"));
    }

    primitives.push({class:"line", text: "", arr0:p11, arr1:p12, rad:lineRad, color:[0.0, 0.6, 1.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("M_0"), arr0:pointM0, rad:pointRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("M"), arr0:pointM, rad:pointRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec N"), arr0:pointM0, arr1:vecN, rad:lineRad, color:[0.0, 1.0, 0.0, 1.0]});
    // primitives.push({class:"arrow", text: katex.renderToString("\\vec N"), arr0:[0,0,0], arr1:vecN0, rad:lineRad, color:[0.0, 1.0, 0.0, 1.0]});
}
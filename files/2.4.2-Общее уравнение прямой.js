var dimention="2d";
function initPoints() {
    points = [];
}
function initDescr() {
    var descr = "";
    descr += "<p>Уравнение вида $Ax+By+C=0$ называется общим уравнением прямой.</p>";
    var textInputSize = 5;
    descr += "<p>";
    descr += '<label><input type="checkbox" checked onchange="checkChanged(0,this.checked);">Координаты $A,B$ вектора $\\vec N$</label>';
    descr += "</p>";
    descr += "A<input type='text' id='A' size='"+textInputSize+"'> B<input type='text' id='B' size='"+textInputSize+"'> C<input type='text' id='C' size='"+textInputSize+"'> <br/>";
    $("#description").html(descr);

    $("#A").change(function(event){A = parseFloat(this.value);initBuffers();});
    $("#B").change(function(event){B = parseFloat(this.value);initBuffers();});
    $("#C").change(function(event){C = parseFloat(this.value);initBuffers();});
    $("Title").html("Общее уравнение прямой");
}
var A = 2;
var B = 4;
var C = 2;
var isShow = [true];
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
    }

    $("#A").val(parseFloat(A.toPrecision(3)));
    $("#B").val(parseFloat(B.toPrecision(3)));
    $("#C").val(parseFloat(C.toPrecision(3)));

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

    function pushVectorCoordLines(point1, point2, color, labelx, labely) {
        primitives.push({class:"dashline", text: labely, pos: "lc", arr0:point2, arr1:[point2[0],point1[1],0], rad:1.2, color:color});
        primitives.push({class:"dashline", text: labelx, pos: "cb", arr0:point2, arr1:[point1[0],point2[1],0], rad:1.2, color:color});
        primitives.push({class:"dashline", text: "", arr0:point1, arr1:[point2[0],point1[1],0], rad:1.2, color:color});
        primitives.push({class:"dashline", text: "", arr0:point1, arr1:[point1[0],point2[1],0], rad:1.2, color:color});
    }
    if (isShow[0]) {
        pushVectorCoordLines(pointM0, vecN, [0.0, 0.6, 0.0, 1.0], "A", "B");
    }

    var p11 = [];
    var p12 = [];
    createLine(pointM0, pointM1, p11, p12,10);

    primitives.push({class:"line", text: "", arr0:p11, arr1:p12, rad:lineRad, color:[0.0, 0.6, 1.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:pointM0, rad:pointRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec N"), arr0:pointM0, arr1:vecN, rad:lineRad, color:[0.0, 1.0, 0.0, 1.0]});
}
var dimention="2d";
function initPoints() {
    points = [];
}
function initDescr() {
    var descr = "";
    descr += "<p>Уравнение вида $y=kx+b$ называется уравнением прямой с угловым коэффициентом.</p>";
    descr += "<p>$k=\\operatorname{tg}\\alpha$</p>";
    var textInputSize = 5;
    descr += "$k$ <input type='text' id='k' size='"+textInputSize+"'> $b$ <input type='text' id='b' size='"+textInputSize+"'> <br>";
    $("#description").html(descr);

    $("#k").change(function(event){k = parseFloat(this.value);initBuffers();});
    $("#b").change(function(event){b = parseFloat(this.value);initBuffers();});
    $("Title").html("Уравнение прямой с угловым коэффициентом");

}
var k = -0.5;
var b = -1;
function initData() {
    var pointRad = 4;
    var chosenPointRad = 6;
    var lineRad = 2;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }

    $("#k").val(parseFloat(k.toPrecision(3)));
    $("#b").val(parseFloat(b.toPrecision(3)));
    primitives.push({class:"line", text: "b", arr0:[0,0,0], arr1:[0,b,0], rad:lineRad, color:[1.0, 0.6, 0.0, 1.0]});

    var A = -k;
    var B = 1;
    var C = -b;

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
    var p11 = [];
    var p12 = [];
    createLine(pointM0, pointM1, p11, p12,10);
    primitives.push({class:"line", text: "", arr0:p11, arr1:p12, rad:lineRad, color:[0.0, 0.6, 1.0, 1.0]});

    var point0 = vec3.create([0,0,0]);
    var point1 = vec3.create([0,0,0]);
    vec3.subtract(pointM1, pointM0, point1);
    if (point1[0]<0) {vec3.scale(point1,-1);}

    primitives.push({class:"arc", text: katex.renderToString("\\alpha"), arr0:point0, arr1:point1, arr2:[1.0,0.0,0.0], Rad:1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
 
    var p11 = [];
    var p12 = [];
    createLine(point0, point1, p11, p12);
    primitives.push({class:"dashline", text: "", arr0:p11, arr1:p12, rad:1, color:[0.0, 0.6, 1.0, 1.0]});
}
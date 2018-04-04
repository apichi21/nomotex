var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create([1,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create([0,1,0]), movable: "fixed"});
    points.push({coord1: vec3.create([0,0,1]), movable: "fixed"});
    points.push({coord1: vec3.create([3,3,3]), movable: "free"});
}
function initDescr() {
    var descr = "";
    descr += "<p>Прямоугольные декартовы координаты точки M.</p>";
    var tIS = 5;
    descr += "M: $x$ <input type='text' id='a1' size='"+tIS+"'> $y$ <input type='text' id='a2' size='"+tIS+"'> $z$ <input type='text' id='a3' size='"+tIS+"'><br>";

    $("#description").html(descr);

    $("#a1").change(function(event){points[4].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#a2").change(function(event){points[4].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#a3").change(function(event){points[4].coord1[2] = parseFloat(this.value);initBuffers();});

    $("Title").html("Координаты радиус-вектора");
}
function changeA(i,value) {
    a[i]=parseFloat(value);
    initBuffers();
}
var a = [2,0.5,-1];
var showOXYZ = 1;
var katveca1 = katex.renderToString("\\vec i");
var katveca2 = katex.renderToString("\\vec j");
var katveca3 = katex.renderToString("\\vec k");
var katveca1al = katex.renderToString("x\\vec i");
var katveca2al = katex.renderToString("y\\vec j");
var katveca3al = katex.renderToString("z\\vec k");
var katveca = katex.renderToString("\\vec r");

function initData() {
    var arrRad = 2;
    var arrRad1 = 1.5;
    var lineRad = 1;
    var chosenPointRad = 5;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]});
    }

    var v = [[],[],[]];
    for (var i = 0; i < 3; i++) {
        vec3.subtract(points[i+1].coord1,points[0].coord1,v[i]);
    }
    var matrInv = mat3.create([v[0][0],v[0][1],v[0][2],v[1][0],v[1][1],v[1][2],v[2][0],v[2][1],v[2][2]]);
    var matrInv4 = mat3.toMat4(matrInv);
    var det = mat4.determinant(matrInv4);
    var vecsum = [0,0,0,0];
    if (Math.abs(det) < 0.1) {
        $("#err").text("Ошибка. Базис линейно зависимый.");
        vec3.set([0,0,0],a);
    } else {
        $("#err").text("");
        mat4.inverse(matrInv4);
        vec3.subtract(points[4].coord1,points[0].coord1,vecsum);
        var vecAlpha = [];
        mat4.multiplyVec4(matrInv4,vecsum,vecAlpha);
        vec3.set(vecAlpha,a);
    }

    $("#a1").val(parseFloat(a[0].toFixed(2)));
    $("#a2").val(parseFloat(a[1].toFixed(2)));
    $("#a3").val(parseFloat(a[2].toFixed(2)));

    for (var i = 0; i < 3; i++) {
        vec3.scale(v[i],a[i]);
    }

    var vecAE1 = [];
    var vecAE2 = [];
    var vecAE3 = [];
    vec3.add(v[0],points[0].coord1,vecAE1);
    vec3.add(v[1],points[0].coord1,vecAE2);
    vec3.add(v[2],points[0].coord1,vecAE3);

    var vecAE12 = [];
    var vecAE13 = [];
    var vecAE23 = [];
    vec3.add(v[0],v[1],vecAE12);
    vec3.add(v[0],v[2],vecAE13);
    vec3.add(v[1],v[2],vecAE23);

    vec3.add(vecAE12, points[0].coord1);
    vec3.add(vecAE13, points[0].coord1);
    vec3.add(vecAE23, points[0].coord1);

    primitives.push({class:"arrow", text: katveca1, arr0:points[0].coord1, arr1:points[1].coord1, rad:arrRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katveca2, arr0:points[0].coord1, arr1:points[2].coord1, rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katveca3, arr0:points[0].coord1, arr1:points[3].coord1, rad:arrRad, color:[0.0, 0.0, 1.0, 1.0]});

    var colorE1 = [0.8, 0.0, 0.0, 1.0];
    var colorE2 = [0.0, 0.8, 0.0, 1.0];
    var colorE3 = [0.0, 0.0, 0.8, 1.0];

    primitives.push({class:"arrow", text: katveca1al, arr0:points[0].coord1, arr1:vecAE1, rad:arrRad1, color:colorE1});
    primitives.push({class:"arrow", text: katveca2al, arr0:points[0].coord1, arr1:vecAE2, rad:arrRad1, color:colorE2});
    primitives.push({class:"arrow", text: katveca3al, arr0:points[0].coord1, arr1:vecAE3, rad:arrRad1, color:colorE3});

    primitives.push({class:"dashline", text: "", arr0:vecAE1, arr1:vecAE12, rad:arrRad1, color:colorE2});
    primitives.push({class:"dashline", text: "", arr0:vecAE1, arr1:vecAE13, rad:arrRad1, color:colorE3});

    primitives.push({class:"dashline", text: "", arr0:vecAE2, arr1:vecAE23, rad:arrRad1, color:colorE3});
    primitives.push({class:"dashline", text: "", arr0:vecAE2, arr1:vecAE12, rad:arrRad1, color:colorE1});

    primitives.push({class:"dashline", text: "", arr0:vecAE3, arr1:vecAE13, rad:arrRad1, color:colorE1});
    primitives.push({class:"dashline", text: "", arr0:vecAE3, arr1:vecAE23, rad:arrRad1, color:colorE2});

    primitives.push({class:"dashline", text: "", arr0:vecAE12, arr1:points[4].coord1, rad:arrRad1, color:colorE3});
    primitives.push({class:"dashline", text: "", arr0:vecAE13, arr1:points[4].coord1, rad:arrRad1, color:colorE2});
    primitives.push({class:"dashline", text: "", arr0:vecAE23, arr1:points[4].coord1, rad:arrRad1, color:colorE1});

    primitives.push({class:"arrow", text: katveca, arr0:points[0].coord1, arr1:points[4].coord1, rad:arrRad, color:[0.7, 0.7, 0.0, 1.0]});
    primitives.push({class:"point", text: "O", pos:"rt", arr0:points[0].coord1, rad:4, color:[0.3, 0.3, 0.3, 1.0]});
    primitives.push({class:"point", text: "M", arr0:points[4].coord1, rad:4, color:[0.3, 0.3, 0.3, 1.0]});
}
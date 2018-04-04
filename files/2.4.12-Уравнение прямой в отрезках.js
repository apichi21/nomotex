var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-2,0,0]), movable: "line", vector: [1,0,0]});
    points.push({coord1: vec3.create([0,-1,0]), movable: "line", vector: [0,1,0]});
}
function initDescr() {
    var descr = "";
    descr += "<p>Уравнение вида $\\frac x a+\\frac y b=1$ называется уравнением прямой в отрезках.</p>";
    var textInputSize = 5;
    descr += "a<input type='text' id='a' size='"+textInputSize+"'> b<input type='text' id='b' size='"+textInputSize+"'> <br/>";
    $("#description").html(descr);
    $("#a").change(function(event){points[0].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#b").change(function(event){points[1].coord1[1] = parseFloat(this.value);initBuffers();});
    $("Title").html("Уравнение прямой в отрезках");
}
function initData() {
    var pointRad = 4;
    var chosenPointRad = 6;
    var lineRad = 2;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }

    $("#a").val(parseFloat(points[0].coord1[0].toPrecision(3)));
    $("#b").val(parseFloat(points[1].coord1[1].toPrecision(3)));

    var p11 = [];
    var p12 = [];
    createLine(points[0].coord1, points[1].coord1, p11, p12,10);
    primitives.push({class:"line", text: "", arr0:p11, arr1:p12, rad:lineRad, color:[0.0, 0.6, 1.0, 1.0]});
    primitives.push({class:"line", text: "a", arr0:[0,0,0], arr1:points[0].coord1, rad:1.5, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"line", text: "b", arr0:[0,0,0], arr1:points[1].coord1, rad:1.5, color:[0.0, 1.0, 0.0, 1.0]});
}
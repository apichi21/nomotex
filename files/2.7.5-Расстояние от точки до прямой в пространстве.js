var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([3,1,0]), movable: "free"});
    points.push({coord1: vec3.create([-1,-1,2]), movable: "free"});
    points.push({coord1: vec3.create([-2,2,1]), movable: "free"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    lines = [];
    lines.push({coord1: 2, coord2: 3, measure: true});
}
function initDescr() {
    var descr = "";
    descr += "<p>Прямая $l$ имеет направляющий вектор $\\vec s(m,n,p)$ и проходит через точку $M_0(x_0,y_0,z_0)$. Расстояние $d$ от точки $M_1(x_1, y_1, z_1)$ до прямой $l$ равно высоте параллелограмма, построенного на векторах $\\vec s$ и $\\overrightarrow {M_0M_1}$.</p>";
    descr += "<p>$d=\\frac{\\left|\\vec s,\\overrightarrow {M_0M_1}\\right|}{\\left|\\vec s\\right|}$</p>";
        var tIS = 5;
    descr += "<p>m<input type='text' id='m' size='"+tIS+"'> n<input type='text' id='n' size='"+tIS+"'> p<input type='text' id='p' size='"+tIS+"'><br>";
    descr += "$x_0$<input type='text' id='x0' size='"+tIS+"'> $y_0$<input type='text' id='y0' size='"+tIS+"'> $z_0$<input type='text' id='z0' size='"+tIS+"'></p>";
    descr += "<p>$x_1$<input type='text' id='x1' size='"+tIS+"'> $y_1$<input type='text' id='y1' size='"+tIS+"'> $z_1$<input type='text' id='z1' size='"+tIS+"'></p>";

    $("#description").html(descr); 
    $("#m").change(function(event){points[1].coord1[0] = parseFloat(this.value)+points[0].coord1[0];initBuffers();});
    $("#n").change(function(event){points[1].coord1[1] = parseFloat(this.value)+points[0].coord1[1];initBuffers();});
    $("#p").change(function(event){points[1].coord1[2] = parseFloat(this.value)+points[0].coord1[2];initBuffers();});
    $("#x0").change(function(event){points[0].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#y0").change(function(event){points[0].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#z0").change(function(event){points[0].coord1[2] = parseFloat(this.value);initBuffers();});
    $("#x1").change(function(event){points[2].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#y1").change(function(event){points[2].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#z1").change(function(event){points[2].coord1[2] = parseFloat(this.value);initBuffers();});
    $("Title").html("Расстояние от точки до прямой в пространстве");

}
function initData() {
    // isShowAxes = false;
    var pointRad = 4;
    var chosenPointRad = 6;
    var lineRad = 2;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }

    var vecs = [];
    vec3.subtract(points[1].coord1,points[0].coord1,vecs);

    $("#m").val(parseFloat(vecs[0].toPrecision(3)));
    $("#n").val(parseFloat(vecs[1].toPrecision(3)));
    $("#p").val(parseFloat(vecs[2].toPrecision(3)));
    $("#x0").val(parseFloat(points[0].coord1[0].toPrecision(3)));
    $("#y0").val(parseFloat(points[0].coord1[1].toPrecision(3)));
    $("#z0").val(parseFloat(points[0].coord1[2].toPrecision(3)));
    $("#x1").val(parseFloat(points[2].coord1[0].toPrecision(3)));
    $("#y1").val(parseFloat(points[2].coord1[1].toPrecision(3)));
    $("#z1").val(parseFloat(points[2].coord1[2].toPrecision(3)));

    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    var leftPoint = [];
    var rightPoint = [];
    createLine(points[0].coord1,points[1].coord1,leftPoint,rightPoint,10);
    primitives.push({class:"line", text: "", arr0:leftPoint, arr1:rightPoint, rad:lineRad, color:[0.0, 0.6, 1.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("M_0"), arr0:points[0].coord1, rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[1].coord1, rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("M_1"), arr0:points[2].coord1, rad:6, color:[1.0, 0.6, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:points[2].coord1, rad:lineRad, color:[0.6, 1.0, 0.0, 1.0]});

    var dist = distToLine(points[2].coord1, points[0].coord1, points[1].coord1, points[3].coord1);
    vec3.add(points[3].coord1,points[2].coord1);

    var sumPoint = [];
    vec3.add(points[1].coord1, points[2].coord1, sumPoint);
    vec3.subtract(sumPoint, points[0].coord1);

    primitives.push({class:"arrow", text: katex.renderToString("\\vec s"), arr0:points[0].coord1, arr1:points[1].coord1, rad:lineRad+0.5, color:[1.0, 0.6, 0.0, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:points[1].coord1, arr1:sumPoint, rad:2, color:[0.6, 1.0, 0.0, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:points[2].coord1, arr1:sumPoint, rad:2, color:[1.0, 0.6, 0.0, 1.0]});
    primitives.push({class:"dashline", text: "d", arr0:points[2].coord1, arr1:points[3].coord1, rad:lineRad, color:[0.0, 0.8, 0.0, 1.0]});
}
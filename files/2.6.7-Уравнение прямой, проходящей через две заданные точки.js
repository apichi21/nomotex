var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-3,1,2]), movable: "free"});
    points.push({coord1: vec3.create([2,2,1]), movable: "free"});
}
function initDescr() {
    var descr = "";
    descr += "<p>Прямая $l$ проходит через две точки $M_1\\left(x_1,y_1,z_1\\right)$ и $M_2\\left(x_2,y_2,z_2\\right)$.</p>";
    descr += "<p>Канонические уравнения прямой $l$ имеют вид:$$\\frac{x-x_1}{x_2-x_1}=\\frac{y-y_1}{y_2-y_1}=\\frac{z-z_1}{z_2-z_1}$$</p>";
    var tIS = 5;
    descr += "<p>$x_1$<input type='text' id='x1' size='"+tIS+"'> $y_1$<input type='text' id='y1' size='"+tIS+"'> $z_1$<input type='text' id='z1' size='"+tIS+"'><br>";
       descr += "$x_2$<input type='text' id='x2' size='"+tIS+"'> $y_2$<input type='text' id='y2' size='"+tIS+"'> $z_2$<input type='text' id='z2' size='"+tIS+"'></p>";
    $("#description").html(descr);
    $("#x1").change(function(event){points[0].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#y1").change(function(event){points[0].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#z1").change(function(event){points[0].coord1[2] = parseFloat(this.value);initBuffers();});
    $("#x2").change(function(event){points[1].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#y2").change(function(event){points[1].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#z2").change(function(event){points[1].coord1[2] = parseFloat(this.value);initBuffers();});

    $("Title").html("Уравнение прямой, проходящей через две заданные точки");
}
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }

    $("#x1").val(parseFloat(points[0].coord1[0].toPrecision(3)));
    $("#y1").val(parseFloat(points[0].coord1[1].toPrecision(3)));
    $("#z1").val(parseFloat(points[0].coord1[2].toPrecision(3)));
    $("#x2").val(parseFloat(points[1].coord1[0].toPrecision(3)));
    $("#y2").val(parseFloat(points[1].coord1[1].toPrecision(3)));
    $("#z2").val(parseFloat(points[1].coord1[2].toPrecision(3)));

    var leftPoint = [];
    var rightPoint = [];
    createLine(points[0].coord1,points[1].coord1,leftPoint,rightPoint);


    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    primitives.push({class:"line", text: katex.renderToString("l"), arr0:leftPoint, arr1:rightPoint, rad:1.5, color:[0.0, 0.0, 1.0, 1.0]}); 
    primitives.push({class:"point", text: katex.renderToString("M_1"), arr0:points[0].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("M_2"), arr0:points[1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
}
var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([3,1,-1]), movable: "free"});
    points.push({coord1: vec3.create([0,1,1]), movable: "free"});
    points.push({coord1: vec3.create([-1,2,0]), movable: "free"});
}
function initDescr() {
    var descr = "";
    descr += "<p>Уравнение вида $$\\begin{vmatrix} \
  x-x_1 & y-y_1 & z-z_1 \\\\ \
  x_2-x_1 & y_2-y_1 & z_2-z_1 \\\\ \
  x_3-x_1 & y_3-y_1 & z_3-z_1 \
\\end{vmatrix}=0$$ называется уравнением плоскости, проходящей через три данные точки $M_1(x_1,y_1,z_1)$, $M_2(x_2,y_2,z_2)$ и $M_3(x_3,y_3,z_3)$.</p>";
    var tIS = 5; //textInputSize
    descr += "<table>";
    descr += "<tr><td>$x_1$</td><td><input type='text' id='x1' size='"+tIS+"'></td><td>$y_1$</td><td><input type='text' id='y1' size='"+tIS+"'></td><td>$z_1$</td><td><input type='text' id='z1' size='"+tIS+"'></td></tr>";
    descr += "<tr><td>$x_2$</td><td><input type='text' id='x2' size='"+tIS+"'></td><td>$y_2$</td><td><input type='text' id='y2' size='"+tIS+"'></td><td>$z_2$</td><td><input type='text' id='z2' size='"+tIS+"'></td></tr>";
    descr += "<tr><td>$x_3$</td><td><input type='text' id='x3' size='"+tIS+"'></td><td>$y_3$</td><td><input type='text' id='y3' size='"+tIS+"'></td><td>$z_3$</td><td><input type='text' id='z3' size='"+tIS+"'></td></tr>";
    descr += "</table>";
    $("#description").html(descr);

    $("#x1").change(function(event){points[0].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#y1").change(function(event){points[0].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#z1").change(function(event){points[0].coord1[2] = parseFloat(this.value);initBuffers();});
    $("#x2").change(function(event){points[1].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#y2").change(function(event){points[1].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#z2").change(function(event){points[1].coord1[2] = parseFloat(this.value);initBuffers();});
    $("#x3").change(function(event){points[2].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#y3").change(function(event){points[2].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#z3").change(function(event){points[2].coord1[2] = parseFloat(this.value);initBuffers();});
    $("Title").html("Уравнение плоскости, проходящей через три заданные точки");
}
function initData() {
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    $("#x1").val(parseFloat(points[0].coord1[0].toPrecision(3)));
    $("#y1").val(parseFloat(points[0].coord1[1].toPrecision(3)));
    $("#z1").val(parseFloat(points[0].coord1[2].toPrecision(3)));
    $("#x2").val(parseFloat(points[1].coord1[0].toPrecision(3)));
    $("#y2").val(parseFloat(points[1].coord1[1].toPrecision(3)));
    $("#z2").val(parseFloat(points[1].coord1[2].toPrecision(3)));
    $("#x3").val(parseFloat(points[2].coord1[0].toPrecision(3)));
    $("#y3").val(parseFloat(points[2].coord1[1].toPrecision(3)));
    $("#z3").val(parseFloat(points[2].coord1[2].toPrecision(3)));

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(points[0].coord1,points[1].coord1,points[2].coord1,planepoint1,planepoint2,planepoint3,planepoint4);

    primitives.push({class:"point", text: katex.renderToString("M_1"), arr0:points[0].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("M_2"), arr0:points[1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("M_3"), arr0:points[2].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"plane", text: "", arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.5, 0.5, 1.0, 0.4]});
}
var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([2,1,1]), movable: "free"});
    points.push({coord1: vec3.create([-2,2,1]), movable: "free"});
    points.push({coord1: vec3.create([0,1,2]), movable: "free"});
    points.push({coord1: vec3.create([1,3,0]), movable: "free"});
}
function initDescr() {
    var descr = "";
    descr += "<p>Угол между прямыми $l_1$ и $l_2$ равен углу между их направляющими векторами $\\vec s_1\\left(m_1,n_1,p_1\\right)$ и $\\vec s_2\\left(m_2,n_2,p_2\\right)$.</p>";
    var tIS = 5;
    descr += "<p>$x_1$<input type='text' id='x1' size='"+tIS+"'> $y_1$<input type='text' id='y1' size='"+tIS+"'> $z_1$<input type='text' id='z1' size='"+tIS+"'><br>";
       descr += "$m_1$<input type='text' id='m1' size='"+tIS+"'> $n_1$<input type='text' id='n1' size='"+tIS+"'> $p_1$<input type='text' id='p1' size='"+tIS+"'></p>";
    descr += "<p>$x_2$<input type='text' id='x2' size='"+tIS+"'> $y_2$<input type='text' id='y2' size='"+tIS+"'> $z_2$<input type='text' id='z2' size='"+tIS+"'><br>";
       descr += "$m_2$<input type='text' id='m2' size='"+tIS+"'> $n_2$<input type='text' id='n2' size='"+tIS+"'> $p_2$<input type='text' id='p2' size='"+tIS+"'></p>";
    descr += "<p>$\\varphi=$<input type='text' id='phi' size='"+tIS+"' readonly></p>";
    $("#description").html(descr);
    $("#x1").change(function(event){points[0].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#y1").change(function(event){points[0].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#z1").change(function(event){points[0].coord1[2] = parseFloat(this.value);initBuffers();});
    $("#m1").change(function(event){points[1].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#n1").change(function(event){points[1].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#p1").change(function(event){points[1].coord1[2] = parseFloat(this.value);initBuffers();});
    $("#x2").change(function(event){points[2].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#y2").change(function(event){points[2].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#z2").change(function(event){points[2].coord1[2] = parseFloat(this.value);initBuffers();});
    $("#m2").change(function(event){points[3].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#n2").change(function(event){points[3].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#p2").change(function(event){points[3].coord1[2] = parseFloat(this.value);initBuffers();});
    $("Title").html("Угол между прямыми");
}
function initData() {
    $("#x1").val(parseFloat(points[0].coord1[0].toPrecision(3)));
    $("#y1").val(parseFloat(points[0].coord1[1].toPrecision(3)));
    $("#z1").val(parseFloat(points[0].coord1[2].toPrecision(3)));
    $("#m1").val(parseFloat(points[1].coord1[0].toPrecision(3)));
    $("#n1").val(parseFloat(points[1].coord1[1].toPrecision(3)));
    $("#p1").val(parseFloat(points[1].coord1[2].toPrecision(3)));
    $("#x2").val(parseFloat(points[2].coord1[0].toPrecision(3)));
    $("#y2").val(parseFloat(points[2].coord1[1].toPrecision(3)));
    $("#z2").val(parseFloat(points[2].coord1[2].toPrecision(3)));
    $("#m2").val(parseFloat(points[3].coord1[0].toPrecision(3)));
    $("#n2").val(parseFloat(points[3].coord1[1].toPrecision(3)));
    $("#p2").val(parseFloat(points[3].coord1[2].toPrecision(3)));

    var a1 = points[1].coord1[0];
    var b1 = points[1].coord1[1];
    var c1 = points[1].coord1[2];
    var a2 = points[3].coord1[0];
    var b2 = points[3].coord1[1];
    var c2 = points[3].coord1[2];
    var cosphi = (a1*a2+b1*b2+c1*c2)/Math.sqrt(a1*a1+b1*b1+c1*c1)/Math.sqrt(a2*a2+b2*b2+c2*c2);
    var phi = Math.acos(cosphi)/Math.PI*180;

    $("#phi").val(parseFloat(phi.toPrecision(3)));
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    var p2 = [];
    vec3.normalize(points[1].coord1, p2);
    vec3.add(p2,points[0].coord1);
    var leftPoint = [];
    var rightPoint = [];
    createLine(points[0].coord1,p2,leftPoint,rightPoint);
    primitives.push({class:"line", text: katex.renderToString("l_1"), arr0:leftPoint, arr1:rightPoint, rad:2, color:[0.2, 0.2, 1.0, 1.0]}); 
    primitives.push({class:"arrow", text: katex.renderToString("\\vec s_1"), arr0:[0,0,0], arr1:points[1].coord1, rad:3, color:[0.2, 1.0, 0.2, 1.0]}); 
    primitives.push({class:"point", text: "", arr0:points[0].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});

    vec3.normalize(points[3].coord1, p2);
    vec3.add(p2,points[2].coord1);
    var leftPoint = [];
    var rightPoint = [];
    createLine(points[2].coord1,p2,leftPoint,rightPoint);
    primitives.push({class:"line", text: katex.renderToString("l_2"), arr0:leftPoint, arr1:rightPoint, rad:2, color:[0.7, 0.2, 1.0, 1.0]}); 
    primitives.push({class:"arrow", text: katex.renderToString("\\vec s_2"), arr0:[0,0,0], arr1:points[3].coord1, rad:3, color:[0.7, 1.0, 0.2, 1.0]}); 
    primitives.push({class:"point", text: "", arr0:points[2].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[3].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});

    primitives.push({class:"arc", text: katex.renderToString("\\varphi"), arr0:[0,0,0], arr1:points[1].coord1, arr2:points[3].coord1, Rad:1.5, rad:2, color:[1.0, 0.2, 0.0, 1.0]}); 

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
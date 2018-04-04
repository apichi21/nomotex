var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-1,-2,1]), movable: "free"});
    points.push({coord1: vec3.create([2,-1,0]), movable: "free"});
    points.push({coord1: vec3.create([1,2,2]), movable: "free"});
    points.push({coord1: vec3.create([-1,2,-2]), movable: "free"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    lines = [];
    lines.push({coord1: 4, coord2: 5, measure: true});
}
function initDescr() {
    var descr = "";
    descr += "<p>Расстояние между скрещивающимися прямыми $l_1$ и $l_2$ равно высоте параллелепипеда, построеного на векторах $\\vec s_1(m_1,n_1,p_1)$, $\\vec s_2(m_2,n_2,p_2)$ и $\\overrightarrow {M_0M_1}$.</p>";
    descr += "<p>$$\\rho=\\frac{\\left|\\left<\\vec s_1,\\vec s_2,\\overrightarrow {M_0M_1}\\right>\\right|}{\\left|\\left[\\vec s_1,\\vec s_2\\right]\\right|}$$</p>";
    var tIS = 5;
    for (var i = 1; i <= 2; i++) {
        descr += "<p>$m_"+i+"$<input type='text' id='m"+i+"' size='"+tIS+"'> $n_"+i+"$<input type='text' id='n"+i+"' size='"+tIS+"'> $p_"+i+"$<input type='text' id='p"+i+"' size='"+tIS+"'><br>";
        descr += "$x_"+i+"$<input type='text' id='x"+i+"' size='"+tIS+"'> $y_"+i+"$<input type='text' id='y"+i+"' size='"+tIS+"'> $z_"+i+"$<input type='text' id='z"+i+"' size='"+tIS+"'></p>";
    }
    $("#description").html(descr); 
    $("#m1").change(function(event){points[1].coord1[0] = parseFloat(this.value)+points[0].coord1[0];initBuffers();});
    $("#n1").change(function(event){points[1].coord1[1] = parseFloat(this.value)+points[0].coord1[1];initBuffers();});
    $("#p1").change(function(event){points[1].coord1[2] = parseFloat(this.value)+points[0].coord1[2];initBuffers();});
    $("#m2").change(function(event){points[3].coord1[0] = parseFloat(this.value)+points[2].coord1[0];initBuffers();});
    $("#n2").change(function(event){points[3].coord1[1] = parseFloat(this.value)+points[2].coord1[1];initBuffers();});
    $("#p2").change(function(event){points[3].coord1[2] = parseFloat(this.value)+points[2].coord1[2];initBuffers();});
    $("#x1").change(function(event){points[0].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#y1").change(function(event){points[0].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#z1").change(function(event){points[0].coord1[2] = parseFloat(this.value);initBuffers();});
    $("#x2").change(function(event){points[2].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#y2").change(function(event){points[2].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#z2").change(function(event){points[2].coord1[2] = parseFloat(this.value);initBuffers();});
    $("Title").html("Расстояние между прямыми");
}
function initData() {
    var pointRad = 4;
    var chosenPointRad = 6;
    var lineRad = 2;
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    // primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }

    var p11 = points[0].coord1;
    var p12 = points[1].coord1;
    var p21 = points[2].coord1;
    var p22 = points[3].coord1;
    primitives.push({class:"arrow", text: katex.renderToString("\\vec s_1"), arr0:p11, arr1:p12, rad:3, color:[0.0, 0.2, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec s_2"), arr0:p21, arr1:p22, rad:3, color:[1.0, 0.2, 0.0, 1.0]});

    var leftPoint = [];
    var rightPoint = [];
    createLine(p11,p12,leftPoint,rightPoint,10);
    primitives.push({class:"line", text: "", arr0:leftPoint, arr1:rightPoint, rad:lineRad, color:[0.0, 0.6, 1.0, 1.0]});

    var leftPoint = [];
    var rightPoint = [];
    createLine(p21,p22,leftPoint,rightPoint,10);
    primitives.push({class:"line", text: "", arr0:leftPoint, arr1:rightPoint, rad:lineRad, color:[1.0, 0.6, 0.0, 1.0]});

    var v1 = [];
    var v2 = [];
    var norm = [];
    vec3.subtract(p12,p11,v1);
    vec3.subtract(p22,p21,v2);

    $("#m1").val(parseFloat(v1[0].toPrecision(3)));
    $("#n1").val(parseFloat(v1[1].toPrecision(3)));
    $("#p1").val(parseFloat(v1[2].toPrecision(3)));
    $("#m2").val(parseFloat(v2[0].toPrecision(3)));
    $("#n2").val(parseFloat(v2[1].toPrecision(3)));
    $("#p2").val(parseFloat(v2[2].toPrecision(3)));
    $("#x1").val(parseFloat(points[0].coord1[0].toPrecision(3)));
    $("#y1").val(parseFloat(points[0].coord1[1].toPrecision(3)));
    $("#z1").val(parseFloat(points[0].coord1[2].toPrecision(3)));
    $("#x2").val(parseFloat(points[2].coord1[0].toPrecision(3)));
    $("#y2").val(parseFloat(points[2].coord1[1].toPrecision(3)));
    $("#z2").val(parseFloat(points[2].coord1[2].toPrecision(3)));

    vec3.cross(v1,v2,norm);
    vec3.normalize(norm);
    var a = [];
    var d = [];
    vec3.subtract(p21,p11,a);
    vec3.scale(norm,vec3.dot(norm,a),d);

    var pd1 = points[4].coord1;
    var pd2 = points[5].coord1;

    var det = -v1[1]*v2[2]+v1[2]*v2[1];
    var det1, coord = [1,2];
    det1 = -v1[0]*v2[2]+v1[2]*v2[0];
    if (Math.abs(det)<Math.abs(det1)) {det = det1; coord = [0,2];}
    det1 = -v1[0]*v2[1]+v1[1]*v2[0];
    if (Math.abs(det)<Math.abs(det1)) {det = det1; coord = [0,1];}

    var d1 = p21[coord[0]]-d[coord[0]]-p11[coord[0]];
    var d2 = p21[coord[1]]-d[coord[1]]-p11[coord[1]];

    var t = (-d1*v2[coord[1]]+d2*v2[coord[0]])/det;
    var s = (d2*v1[coord[0]]-d1*v1[coord[1]])/det;

    vec3.scale(v1,t,pd1);
    vec3.add(pd1,p11);

    vec3.scale(v2,s,pd2);

    var p11_ = [];
    var p12_ = [];
    vec3.add(p11,d,p11_);
    vec3.add(p12,d,p12_);
    vec3.add(pd2,p21);

    var bonusp1 = [];
    vec3.add(p11,v2,bonusp1);
    var bonusp2 = [];
    vec3.add(p12,v2,bonusp2);
    var bonusp3 = [];
    vec3.add(p21,v1,bonusp3);
    var bonusp4 = [];
    vec3.add(p22,v1,bonusp4);
    var thinlinerad = 1.5;
    var thinlinecolor = [0.4, 0.7, 0.0, 1.0];
    primitives.push({class:"line", text: "", arr0:p11, arr1:bonusp1, rad:thinlinerad, color:thinlinecolor});
    primitives.push({class:"line", text: "", arr0:p12, arr1:bonusp2, rad:thinlinerad, color:thinlinecolor});
    primitives.push({class:"line", text: "", arr0:bonusp1, arr1:bonusp2, rad:thinlinerad, color:thinlinecolor});

    primitives.push({class:"line", text: "", arr0:p21, arr1:bonusp3, rad:thinlinerad, color:thinlinecolor});
    primitives.push({class:"line", text: "", arr0:p22, arr1:bonusp4, rad:thinlinerad, color:thinlinecolor});
    primitives.push({class:"line", text: "", arr0:bonusp3, arr1:bonusp4, rad:thinlinerad, color:thinlinecolor});

    primitives.push({class:"line", text: "", arr0:p11, arr1:p21, rad:thinlinerad, color:thinlinecolor});
    primitives.push({class:"line", text: "", arr0:p12, arr1:bonusp3, rad:thinlinerad, color:thinlinecolor});
    primitives.push({class:"line", text: "", arr0:bonusp2, arr1:bonusp4, rad:thinlinerad, color:thinlinecolor});
    primitives.push({class:"line", text: "", arr0:bonusp1, arr1:p22, rad:thinlinerad, color:thinlinecolor});

    primitives.push({class:"dashline", text: katex.renderToString("\\rho"), arr0:pd1, arr1:pd2, rad:lineRad, color:[0.6, 1.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("M_1"), arr0:p11, rad:pointRad, color:[0.0, 0.2, 1.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("M_2"), arr0:p21, rad:pointRad, color:[1.0, 0.2, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:p11, arr1:p21, rad:3, color:[0.0, 1.0, 0.0, 1.0]});
}
var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-1,2,1]), movable: "free"});
    points.push({coord1: vec3.create([1,2,1]), movable: "free"});
    vecN10 = points[0].coord1;
    vecN20 = points[1].coord1;
}
function initDescr() {
    var descr = "";
    descr += "<p>Синус угла между прямой и плоскостью (т.е. угол между прямой и ее проекцией на плоскость) равен \
    $$\\begin{split}\\sin\\varphi  = \\frac{\\left|\\left( \\vec a,\\vec N \\right)\\right|}{\\left| \\vec a \\right| \\cdot \\left| \\vec N \\right|} =\\\\ \
    = \\frac{\\left|Am+Bn+Cp\\right|}{\\sqrt{A^2+B^2+C^2} \\cdot \\sqrt{m^2+n^2+p^2}}\\end{split}$$</p>";
    var textInputSize = 4;
    descr += "<p>$A$<input type='text' id='A1' size='"+textInputSize+"'> $B$<input type='text' id='B1' size='"+textInputSize+"'> $C$<input type='text' id='C1' size='"+textInputSize+"'><br/>";
    descr += "$m$<input type='text' id='A2' size='"+textInputSize+"'> $n$<input type='text' id='B2' size='"+textInputSize+"'> $p$<input type='text' id='C2' size='"+textInputSize+"'></p>";
    descr += "$\\varphi$ = <input type='text' id='phi' size='"+textInputSize+"' readonly><br/>";

    $("#description").html(descr);

    $("#A1").change(function(event){vecN10[0] = parseFloat(this.value);initBuffers();});
    $("#B1").change(function(event){vecN10[1] = parseFloat(this.value);initBuffers();});
    $("#C1").change(function(event){vecN10[2] = parseFloat(this.value);initBuffers();});
    // $("#D1").change(function(event){D1 = parseFloat(this.value);initBuffers();});
    $("#A2").change(function(event){vecN20[0] = parseFloat(this.value);initBuffers();});
    $("#B2").change(function(event){vecN20[1] = parseFloat(this.value);initBuffers();});
    $("#C2").change(function(event){vecN20[2] = parseFloat(this.value);initBuffers();});
    $("Title").html("Угол между прямой и плоскостью");
}
var vecN10;
var D1=0;
var vecN20;
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    $("#A1").val(parseFloat(vecN10[0].toPrecision(3)));
    $("#B1").val(parseFloat(vecN10[1].toPrecision(3)));
    $("#C1").val(parseFloat(vecN10[2].toPrecision(3)));
    // $("#D1").val(parseFloat(D1.toPrecision(3)));
    $("#A2").val(parseFloat(vecN20[0].toPrecision(3)));
    $("#B2").val(parseFloat(vecN20[1].toPrecision(3)));
    $("#C2").val(parseFloat(vecN20[2].toPrecision(3)));
    var sinphi = Math.abs(vecN10[0]*vecN20[0]+vecN10[1]*vecN20[1]+vecN10[2]*vecN20[2]) / Math.sqrt(vecN10[0]*vecN10[0]+vecN10[1]*vecN10[1]+vecN10[2]*vecN10[2]) / Math.sqrt(vecN20[0]*vecN20[0]+vecN20[1]*vecN20[1]+vecN20[2]*vecN20[2]);
    var phi = Math.asin(sinphi)/Math.PI*180;
    $("#phi").val(parseFloat(phi.toPrecision(3)));

    var vecN0 = vecN10;
    var D=D1;

    var pointM0 = [0,0,0];

    var vecM0M1 = [];
    var pointM1 = [];
    var pointM2 = [];
    if (Math.abs(vecN0[0])>=Math.abs(vecN0[1]) && Math.abs(vecN0[0])>=Math.abs(vecN0[2])) {
        pointM0[0] = -D/vecN0[0];
        vec3.set([pointM0[0]-(vecN0[1]+vecN0[2])/vecN0[0], pointM0[1]+1, pointM0[2]+1],pointM1);
    } else if (Math.abs(vecN0[1])>=Math.abs(vecN0[0]) && Math.abs(vecN0[1])>=Math.abs(vecN0[2])) {
        pointM0[1] = -D/vecN0[1];
        vec3.set([pointM0[0]+1, pointM0[1]-(vecN0[0]+vecN0[2])/vecN0[1], pointM0[2]+1],pointM1);
    } else {
        pointM0[2] = -D/vecN0[2];
        vec3.set([pointM0[0]+1, pointM0[1]+1, pointM0[2]-(vecN0[0]+vecN0[1])/vecN0[2]],pointM1);
    }
    vec3.subtract(pointM1,pointM0,vecM0M1);
    vec3.cross(vecN0,vecM0M1,pointM2);
    vec3.add(pointM2,pointM0);

    var planepoint11 = [];
    var planepoint21 = [];
    var planepoint31 = [];
    var planepoint41 = [];
    createPlane(pointM0,pointM1,pointM2,planepoint11,planepoint21,planepoint31,planepoint41);

    var center = [];
    vec3.add(planepoint11,planepoint31,center);
    vec3.scale(center,0.5);
    var vecN1 = [];
    vec3.add(vecN0,center,vecN1);
    primitives.push({class:"point", text: "", arr0:center, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec N"), arr0:center, arr1:vecN1, rad:2, color:[0.0, 0.0, 1.0, 1.0]});

    var leftPoint = [];
    var rightPoint = [];
    createLine([0,0,0],vecN20,leftPoint,rightPoint);
    primitives.push({class:"line", text: "", arr0:leftPoint, arr1:rightPoint, rad:1.5, color:[0.8, 0.0, 0.0, 1.0]});
    primitives.push({class:"text", text: katex.renderToString("l"), arr0:rightPoint});

    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:[0,0,0], arr1:vecN20, rad:2, color:[1.0, 0.0, 0.0, 1.0]});

    var v1 = [];
    var v2 = [];

    vec3.cross(vecN10,vecN20,v1);
    vec3.cross(v1,vecN10,v2);
    vec3.normalize(v2);
    vec3.scale(v2,2);

    primitives.push({class:"dashline", text: "", arr0:[0,0,0], arr1:v2, rad:2, color:[1.0, 0.0, 0.0, 1.0]});

    primitives.push({class:"arc", text: katex.renderToString("\\varphi"), arr0:[0,0,0], arr1:v2, arr2:vecN20, Rad:2, rad:3, color:[0.0, 1.0, 0.0, 1.0]});

    // primitives.push({class:"arc", text: "", arr0:[0,0,0], arr1:vecN1, arr2:vecN20, Rad:2, rad:3, color:[0.0, 1.0, 0.0, 1.0]});

    primitives.push({class:"plane", text: katex.renderToString("\\pi"), arr0:planepoint11, arr1:planepoint21, arr2:planepoint31, arr3:planepoint41, color:[0.5, 0.5, 1.0, 0.35]});
}
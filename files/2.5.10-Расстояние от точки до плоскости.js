var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-1,3,2]), movable: "free"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    lines = [];
    lines.push({coord1: 0, coord2: 1, measure: true});
}
function initDescr() {
    var descr = "";
    descr += "<p>Плоскость $\\pi$ задана уравнением $Ax+By+Cz+D=0$. $M_0(x_0,y_0,z_0)$ - произвольная точка пространства. Для любой точки $M_1(x_1,y_1,z_1)$, лежащей на плоскости, расстояние $d$ от точки $M_0$ до плоскости $\\pi$ равно абсолютной величине проекции вектора $\\overrightarrow{M_1M_0}$ на нормальный вектор $\\vec N(A,B,C)$.</p>";
    var textInputSize = 4;
    descr += "<p>A<input type='text' id='A' size='"+textInputSize+"'> B<input type='text' id='B' size='"+textInputSize+"'> C<input type='text' id='C' size='"+textInputSize+"'> D<input type='text' id='D' size='"+textInputSize+"'></p>";
    descr += "<p>$x_0$<input type='text' id='x' size='"+textInputSize+"'> $y_0$<input type='text' id='y' size='"+textInputSize+"'> $z_0$<input type='text' id='z' size='"+textInputSize+"'></p>";

    $("#description").html(descr);

    $("#A").change(function(event){vecN0[0] = parseFloat(this.value);initBuffers();});
    $("#B").change(function(event){vecN0[1] = parseFloat(this.value);initBuffers();});
    $("#C").change(function(event){vecN0[2] = parseFloat(this.value);initBuffers();});
    $("#D").change(function(event){D = parseFloat(this.value);initBuffers();});
    $("#x").change(function(event){points[0].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#y").change(function(event){points[0].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#z").change(function(event){points[0].coord1[2] = parseFloat(this.value);initBuffers();});
    $("Title").html("Расстояние от точки до плоскости");
}

var vecN0 = [1,3,0];
var D=-2;
function initData() {
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5.1, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    $("#A").val(parseFloat(vecN0[0].toPrecision(3)));
    $("#B").val(parseFloat(vecN0[1].toPrecision(3)));
    $("#C").val(parseFloat(vecN0[2].toPrecision(3)));
    $("#D").val(parseFloat(D.toPrecision(3)));
    $("#x").val(parseFloat(points[0].coord1[0].toPrecision(3)));
    $("#y").val(parseFloat(points[0].coord1[1].toPrecision(3)));
    $("#z").val(parseFloat(points[0].coord1[2].toPrecision(3)));

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

    primitives.push({class:"point", text: katex.renderToString("M_0"), arr0:points[0].coord1, rad:5, color:[0.7, 0.0, 0.0, 1.0]});
    var delta = [];
    var dist = distToPlane(points[0].coord1, pointM0,pointM1,pointM2, delta);
    vec3.add(delta,points[0].coord1,points[1].coord1);
    primitives.push({class:"line", text: "d", arr0:points[0].coord1, arr1:points[1].coord1, rad:1.5, color:[1.0, 0.0, 0.0, 1.0]});

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pointM0,pointM1,pointM2,planepoint1,planepoint2,planepoint3,planepoint4);


    var center = [];
    vec3.add(planepoint1,planepoint3,center);
    vec3.scale(center,0.5);
    var vecN = [];
    vec3.add(vecN0,center,vecN);
    primitives.push({class:"point", text: katex.renderToString("M_1"), arr0:center, rad:4, color:[0.0, 0.0, 1.0, 1.0]});

    primitives.push({class:"arrow", text: "", arr0:center, arr1:points[0].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    var p1 = [];
    vec3.subtract(center,delta,p1);
    primitives.push({class:"dashline", text: "", arr0:p1, arr1:points[0].coord1, rad:1, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:p1, arr1:center, rad:1, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec N"), arr0:center, arr1:vecN, rad:2, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"plane", text: katex.renderToString("\\pi"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.5, 0.5, 1.0, 0.4]});
}
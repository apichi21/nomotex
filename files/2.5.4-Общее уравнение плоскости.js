var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    var descr = "";
    descr += "<p>Уравнение вида $Ax+By+Cz+D=0$ называется общим уравнением плоскости имеющей нормальный вектор $\\vec N(A,B,C)$.</p>";
    var textInputSize = 5;
    descr += "A<input type='text' id='A' size='"+textInputSize+"'> B<input type='text' id='B' size='"+textInputSize+"'> C<input type='text' id='C' size='"+textInputSize+"'> D<input type='text' id='D' size='"+textInputSize+"'><br/>";
    $("#description").html(descr);

    $("#A").change(function(event){abcd[0] = parseFloat(this.value);initBuffers();});
    $("#B").change(function(event){abcd[1] = parseFloat(this.value);initBuffers();});
    $("#C").change(function(event){abcd[2] = parseFloat(this.value);initBuffers();});
    $("#D").change(function(event){abcd[3] = parseFloat(this.value);initBuffers();});
    $("Title").html("Общее уравнение плоскости");
}
var abcd = [1,2,2,-2];
function pointsFromABCD(abcd, p1, p2, p3) {
    vec3.set([0,0,0], p1);
    var vecM0M1 = [];
    if (Math.abs(abcd[0])>=Math.abs(abcd[1]) && Math.abs(abcd[0])>=Math.abs(abcd[2])) {
        p1[0] = -abcd[3]/abcd[0];
        vec3.set([p1[0]-(abcd[1]+abcd[2])/abcd[0], p1[1]+1, p1[2]+1],p2);
    } else if (Math.abs(abcd[1])>=Math.abs(abcd[0]) && Math.abs(abcd[1])>=Math.abs(abcd[2])) {
        p1[1] = -abcd[3]/abcd[1];
        vec3.set([p1[0]+1, p1[1]-(abcd[0]+abcd[2])/abcd[1], p1[2]+1],p2);
    } else {
        p1[2] = -abcd[3]/abcd[2];
        vec3.set([p1[0]+1, p1[1]+1, p1[2]-(abcd[0]+abcd[1])/abcd[2]],p2);
    }
    vec3.subtract(p2,p1,vecM0M1);
    vec3.cross(abcd,vecM0M1,p3);
    vec3.add(p3,p1);
}
function initData() {
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    $("#A").val(parseFloat(abcd[0].toPrecision(3)));
    $("#B").val(parseFloat(abcd[1].toPrecision(3)));
    $("#C").val(parseFloat(abcd[2].toPrecision(3)));
    $("#D").val(parseFloat(abcd[3].toPrecision(3)));

    var pointM0 = [];
    var pointM1 = [];
    var pointM2 = [];
    pointsFromABCD(abcd, pointM0,pointM1,pointM2);

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pointM0,pointM1,pointM2,planepoint1,planepoint2,planepoint3,planepoint4);

    var center = [];
    vec3.add(planepoint1,planepoint3,center);
    vec3.scale(center,0.5);
    var vecN = [];
    vec3.add(abcd,center,vecN);
    primitives.push({class:"point", text: "", arr0:center, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec N"), arr0:center, arr1:vecN, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"plane", text: "", arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.5, 0.5, 1.0, 0.4]});
}
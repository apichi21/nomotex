var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,1,1]), movable: "free"});
    points.push({coord1: vec3.create(), movable: "free"});
    pointM0 = points[0].coord1;
    vecN0 = [1,2,2];
}
function initDescr() {
    var descr = "";
    descr += "<p>Уравнение вида $A(x-x_0)+B(y-y_0)+C(z-z_0)=0$ называется уравнением плоскости, проходящей через точку $M_0(x_0,y_0,z_0)$ и имеющей нормальный вектор $\\vec N(A,B,C)$.</p>";
    var tIS = 5; //textInputSize
    descr += "<table>";
    descr += "<tr><td>$x_0$</td><td><input type='text' id='x0' size='"+tIS+"'></td><td>$y_0$</td><td><input type='text' id='y0' size='"+tIS+"'></td><td>$z_0$</td><td><input type='text' id='z0' size='"+tIS+"'></td></tr>";
    descr += "<tr><td>A</td><td><input type='text' id='A' size='"+tIS+"'></td><td>B</td><td><input type='text' id='B' size='"+tIS+"'></td><td>C</td><td><input type='text' id='C' size='"+tIS+"'></td></tr>";
    descr += "</table>";
    $("#description").html(descr);

    $("#x0").change(function(event){pointM0[0] = parseFloat(this.value);initBuffers();});
    $("#y0").change(function(event){pointM0[1] = parseFloat(this.value);initBuffers();});
    $("#z0").change(function(event){pointM0[2] = parseFloat(this.value);initBuffers();});
    $("#A").change(function(event){vecN0[0] = parseFloat(this.value);initBuffers();});
    $("#B").change(function(event){vecN0[1] = parseFloat(this.value);initBuffers();});
    $("#C").change(function(event){vecN0[2] = parseFloat(this.value);initBuffers();});
    $("Title").html("Уравнение плоскости, проходящей через точку");
}

var pointM0;
var vecN0;
function initData() {
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[1].coord1) {
            vec3.subtract(points[1].coord1,pointM0,vecN0);
        }
    }
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    $("#A").val(parseFloat(vecN0[0].toPrecision(3)));
    $("#B").val(parseFloat(vecN0[1].toPrecision(3)));
    $("#C").val(parseFloat(vecN0[2].toPrecision(3)));
    $("#x0").val(parseFloat(pointM0[0].toPrecision(3)));
    $("#y0").val(parseFloat(pointM0[1].toPrecision(3)));
    $("#z0").val(parseFloat(pointM0[2].toPrecision(3)));

    var vecM0M1 = [];
    var pointM1 = [];
    var pointM2 = [];
    if (Math.abs(vecN0[0])>=Math.abs(vecN0[1]) && Math.abs(vecN0[0])>=Math.abs(vecN0[2])) {
        vec3.set([pointM0[0]-(vecN0[1]+vecN0[2])/vecN0[0], pointM0[1]+1, pointM0[2]+1],pointM1);
    } else if (Math.abs(vecN0[1])>=Math.abs(vecN0[0]) && Math.abs(vecN0[1])>=Math.abs(vecN0[2])) {
        vec3.set([pointM0[0]+1, pointM0[1]-(vecN0[0]+vecN0[2])/vecN0[1], pointM0[2]+1],pointM1);
    } else {
        vec3.set([pointM0[0]+1, pointM0[1]+1, pointM0[2]-(vecN0[0]+vecN0[1])/vecN0[2]],pointM1);
    }
    vec3.subtract(pointM1,pointM0,vecM0M1);
    vec3.cross(vecN0,vecM0M1,pointM2);
    vec3.add(pointM2,pointM0);

    // primitives.push({class:"point", text: "0", arr0:pointM0, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    // primitives.push({class:"point", text: "1", arr0:pointM1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    // primitives.push({class:"point", text: "2", arr0:pointM2, rad:4, color:[1.0, 0.0, 0.0, 1.0]});

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pointM0,pointM1,pointM2,planepoint1,planepoint2,planepoint3,planepoint4);

    var vecN = points[1].coord1;
    vec3.add(vecN0,pointM0,vecN);

    primitives.push({class:"point", text: katex.renderToString("M_0"), arr0:pointM0, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec N"), arr0:pointM0, arr1:vecN, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"plane", text: "", arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.5, 0.5, 1.0, 0.4]});
}
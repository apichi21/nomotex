var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    var descr = "";
    descr += "<p>Уравнение $A(x-x_0)+B(y-y_0)+C(z-z_0)=0$ при произвольных (не равных нулю одновременно) коэффициентах А, В, С есть уравнение связки плоскостей, проходящих через точку $M_0(x_0,y_0,z_0)$.</p>";
    var tIS = 5; //textInputSize
    descr += "<table>";
    descr += "<tr><td>$x_0$</td><td><input type='text' id='x0' size='"+tIS+"'></td><td>$y_0$</td><td><input type='text' id='y0' size='"+tIS+"'></td><td>$z_0$</td><td><input type='text' id='z0' size='"+tIS+"'></td></tr>";
    descr += "<tr><td>$A_1$</td><td><input type='text' id='A1' size='"+tIS+"'></td><td>$B_1$</td><td><input type='text' id='B1' size='"+tIS+"'></td><td>$C_1$</td><td><input type='text' id='C1' size='"+tIS+"'></td></tr>";
    descr += "<tr><td>$A_2$</td><td><input type='text' id='A2' size='"+tIS+"'></td><td>$B_2$</td><td><input type='text' id='B2' size='"+tIS+"'></td><td>$C_2$</td><td><input type='text' id='C2' size='"+tIS+"'></td></tr>";
    descr += "<tr><td>$A_3$</td><td><input type='text' id='A3' size='"+tIS+"'></td><td>$B_3$</td><td><input type='text' id='B3' size='"+tIS+"'></td><td>$C_3$</td><td><input type='text' id='C3' size='"+tIS+"'></td></tr>";
    descr += "</table>";
    $("#description").html(descr);

    $("#x0").change(function(event){pointM0[0] = parseFloat(this.value);initBuffers();});
    $("#y0").change(function(event){pointM0[1] = parseFloat(this.value);initBuffers();});
    $("#z0").change(function(event){pointM0[2] = parseFloat(this.value);initBuffers();});
    $("#A1").change(function(event){vecN10[0] = parseFloat(this.value);initBuffers();});
    $("#B1").change(function(event){vecN10[1] = parseFloat(this.value);initBuffers();});
    $("#C1").change(function(event){vecN10[2] = parseFloat(this.value);initBuffers();});
    $("#A2").change(function(event){vecN20[0] = parseFloat(this.value);initBuffers();});
    $("#B2").change(function(event){vecN20[1] = parseFloat(this.value);initBuffers();});
    $("#C2").change(function(event){vecN20[2] = parseFloat(this.value);initBuffers();});
    $("#A3").change(function(event){vecN30[0] = parseFloat(this.value);initBuffers();});
    $("#B3").change(function(event){vecN30[1] = parseFloat(this.value);initBuffers();});
    $("#C3").change(function(event){vecN30[2] = parseFloat(this.value);initBuffers();});
    $("Title").html("Связка плоскостей");
}

var pointM0 = [0,1,1];
var vecN10 = [1,2,0];
var vecN20 = [-1,2,2];
var vecN30 = [-1,-2,2];
function initData() {
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    $("#A1").val(parseFloat(vecN10[0].toPrecision(3)));
    $("#B1").val(parseFloat(vecN10[1].toPrecision(3)));
    $("#C1").val(parseFloat(vecN10[2].toPrecision(3)));
    $("#A2").val(parseFloat(vecN20[0].toPrecision(3)));
    $("#B2").val(parseFloat(vecN20[1].toPrecision(3)));
    $("#C2").val(parseFloat(vecN20[2].toPrecision(3)));
    $("#A3").val(parseFloat(vecN30[0].toPrecision(3)));
    $("#B3").val(parseFloat(vecN30[1].toPrecision(3)));
    $("#C3").val(parseFloat(vecN30[2].toPrecision(3)));
    $("#x0").val(parseFloat(pointM0[0].toPrecision(3)));
    $("#y0").val(parseFloat(pointM0[1].toPrecision(3)));
    $("#z0").val(parseFloat(pointM0[2].toPrecision(3)));

    var pointColor = [0.0, 0.0, 0.0, 1.0];
    primitives.push({class:"point", text: katex.renderToString("M_0"), arr0:pointM0, rad:6, color:pointColor});

    var vecN0 = vecN10;
    var planeColor = [0.5, 0.5, 1.0, 0.8];
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
    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pointM0,pointM1,pointM2,planepoint1,planepoint2,planepoint3,planepoint4);
    primitives.push({class:"plane", text: "", arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:planeColor});

    var vecN0 = vecN20;
    var planeColor = [1.0, 0.5, 1.0, 0.8];
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
    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pointM0,pointM1,pointM2,planepoint1,planepoint2,planepoint3,planepoint4);
    primitives.push({class:"plane", text: "", arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:planeColor});

    var vecN0 = vecN30;
    var planeColor = [0.5, 1.0, 1.0, 0.8];
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
    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pointM0,pointM1,pointM2,planepoint1,planepoint2,planepoint3,planepoint4);
    primitives.push({class:"plane", text: "", arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:planeColor});
}
var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    var descr = "";
    descr += "<p>Косинус угла между плоскостями, заданными уравнениями $A_1x+B_1y+C_1z+D_1=0$ и $A_2x+B_2y+C_2z+D_2=0$ равен косинусу угла между нормальными векторами $\\vec N_1(A_1,B_1,C_1)$ и $\\vec N_2(A_2,B_2,C_2)$, поэтому $$\\begin{split}\\cos\\varphi  = \\frac{{\\left( {{{\\vec N}_1},{{\\vec N}_2}} \\right)}}{{\\left| {{{\\vec N}_1}} \\right| \\cdot \\left| {{{\\vec N}_2}} \\right|}} =\\\\= \\frac{{{A_1}{A_2} + {B_1}{B_2} + {C_1}{C_2}}}{{\\sqrt {A_1^2 + B_1^2 + C_1^2}  \\cdot \\sqrt {A_2^2 + B_2^2 + C_2^2} }}\\end{split}$$</p>";
    var textInputSize = 4;

    descr += "<p><table>";
    descr += "<tr><td>$A_1$</td><td>$B_1$</td><td>$C_1$</td><td>$D_1$</td></tr>";
    descr += "<tr>";
    descr += "<td><input type='text' id='A1' size='"+textInputSize+"'></td>";
    descr += "<td><input type='text' id='B1' size='"+textInputSize+"'></td>";
    descr += "<td><input type='text' id='C1' size='"+textInputSize+"'></td>";
    descr += "<td><input type='text' id='D1' size='"+textInputSize+"'></td>";
    descr += "</tr>";
    descr += "</table>";

    descr += "<table>";
    descr += "<tr><td>$A_2$</td><td>$B_2$</td><td>$C_2$</td><td>$D_2$</td></tr>";
    descr += "<tr>";
    descr += "<td><input type='text' id='A2' size='"+textInputSize+"'></td>";
    descr += "<td><input type='text' id='B2' size='"+textInputSize+"'></td>";
    descr += "<td><input type='text' id='C2' size='"+textInputSize+"'></td>";
    descr += "<td><input type='text' id='D2' size='"+textInputSize+"'></td>";
    descr += "</tr>";
    descr += "</table></p>";

    descr += "<p>$\\varphi$ = <input type='text' id='phi' size='"+textInputSize+"' readonly></p>";

    $("#description").html(descr);

    $("#A1").change(function(event){vecN10[0] = parseFloat(this.value);initBuffers();});
    $("#B1").change(function(event){vecN10[1] = parseFloat(this.value);initBuffers();});
    $("#C1").change(function(event){vecN10[2] = parseFloat(this.value);initBuffers();});
    $("#D1").change(function(event){D1 = parseFloat(this.value);initBuffers();});
    $("#A2").change(function(event){vecN20[0] = parseFloat(this.value);initBuffers();});
    $("#B2").change(function(event){vecN20[1] = parseFloat(this.value);initBuffers();});
    $("#C2").change(function(event){vecN20[2] = parseFloat(this.value);initBuffers();});
    $("#D2").change(function(event){D2 = parseFloat(this.value);initBuffers();});
    $("Title").html("Угол между плоскостями");
}
var vecN10 = [1,1,2];
var D1=-2;
var vecN20 = [0,2,1];
var D2=-1;
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
    $("#D1").val(parseFloat(D1.toPrecision(3)));
    $("#A2").val(parseFloat(vecN20[0].toPrecision(3)));
    $("#B2").val(parseFloat(vecN20[1].toPrecision(3)));
    $("#C2").val(parseFloat(vecN20[2].toPrecision(3)));
    $("#D2").val(parseFloat(D2.toPrecision(3)));
    var cosphi = (vecN10[0]*vecN20[0]+vecN10[1]*vecN20[1]+vecN10[2]*vecN20[2]) / Math.sqrt(vecN10[0]*vecN10[0]+vecN10[1]*vecN10[1]+vecN10[2]*vecN10[2]) / Math.sqrt(vecN20[0]*vecN20[0]+vecN20[1]*vecN20[1]+vecN20[2]*vecN20[2]);
    var phi = Math.acos(cosphi)/Math.PI*180;
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
    primitives.push({class:"arrow", text: katex.renderToString("\\vec N_1"), arr0:center, arr1:vecN1, rad:2, color:[0.0, 0.0, 1.0, 1.0]});

    var leftPoint = [];
    var rightPoint = [];
    createLine(center,vecN1,leftPoint,rightPoint);
    primitives.push({class:"line", text: "", arr0:leftPoint, arr1:rightPoint, rad:1, color:[0.0, 0.0, 0.8, 1.0]});

    var vecN0 = vecN20;
    var D=D2;
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

    var planepoint12 = [];
    var planepoint22 = [];
    var planepoint32 = [];
    var planepoint42 = [];
    createPlane(pointM0,pointM1,pointM2,planepoint12,planepoint22,planepoint32,planepoint42);

    var center = [];
    vec3.add(planepoint12,planepoint32,center);
    vec3.scale(center,0.5);
    var vecN2 = [];
    vec3.add(vecN0,center,vecN2);
    primitives.push({class:"point", text: "", arr0:center, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec N_2"), arr0:center, arr1:vecN2, rad:2, color:[1.0, 0.0, 0.0, 1.0]});

    var leftPoint = [];
    var rightPoint = [];
    createLine(center,vecN2,leftPoint,rightPoint);
    primitives.push({class:"line", text: "", arr0:leftPoint, arr1:rightPoint, rad:1, color:[0.8, 0.0, 0.0, 1.0]});

    primitives.push({class:"arc", text: "", arr0:[0,0,0], arr1:vecN1, arr2:vecN2, Rad:2, rad:3, color:[0.0, 1.0, 0.0, 1.0]});

    primitives.push({class:"plane", text: "", arr0:planepoint12, arr1:planepoint22, arr2:planepoint32, arr3:planepoint42, color:[1.0, 0.5, 0.5, 0.35]});
    primitives.push({class:"plane", text: "", arr0:planepoint11, arr1:planepoint21, arr2:planepoint31, arr3:planepoint41, color:[0.5, 0.5, 1.0, 0.35]});
}
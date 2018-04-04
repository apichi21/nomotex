var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    var descr = "";
    descr += '<h4>Гиперболический параболоид (гипар) в архитектуре.</h4>';
    descr += '<p>Гиперболический параболоид широко применяют в архитектуре для строительства различных сооружений \
              благодаря следующим преимуществам:</p> \
              <ul> \
              <li> наличие прямолинейных образующих позволяет упростить технологию \
              изготовления сооружения за счёт применения однотипных элементов (балок, пластин);</li> \
              <li> обеспечивается высокая прочность сооружения при минимальной его массе;</li> \
              <li> достаточно высокая степень эстетического совершенства и разнообразия форм.</li></ul>';
    var tIS = 5;
    descr += '<p>Высота крыши в центре:<br> \
              <input type="button" value="-" onclick="changeA(-1);"> \
              <input type="text" id="a" readonly size="'+tIS+'"> м \
              <input type="button" value="+" onclick="changeA(1);"> <br>\
              Минимальная высота крыши с краю:<br> \
              <input type="button" value="-" onclick="changeB(-1);"> \
              <input type="text" id="b" readonly size="'+tIS+'"> м \
              <input type="button" value="+" onclick="changeB(1);"> <br>\
              Параметр гипара $p$:<br> \
              <input type="button" value="-" onclick="changeP(-1);"> \
              <input type="text" id="p" readonly size="'+tIS+'"> \
              <input type="button" value="+" onclick="changeP(1);"> </p>';

    descr += '<p><label><input type="checkbox" onchange="isShow[1] = this.checked; initBuffers();"> Семейство прямолинейных образующих 1</label>';
    descr += '<label><input type="checkbox" onchange="isShow[2] = this.checked; initBuffers();"> Семейство прямолинейных образующих 2</label></p>';

    $("#description").html(descr);
    // $("#a").change(function(event){a = parseFloat(this.value);initBuffers();$("#a").val(parseFloat(a.toPrecision(3)));});
    // $("#b").change(function(event){b = parseFloat(this.value);initBuffers();$("#b").val(parseFloat(b.toPrecision(3)));});
    // $("#p").change(function(event){p = parseFloat(this.value);initBuffers();$("#p").val(parseFloat(p.toPrecision(3)));});
    $("#a").val(parseFloat(a.toPrecision(3)));
    $("#b").val(parseFloat(b.toPrecision(3)));
    $("#p").val(parseFloat(p.toPrecision(3)));
    $("Title").html("Гиперболический параболоид");

    dispY = -9;
    scaleFactor = 0.07;
}
function changeA(dir) {
    a += dir*2;
    if (a + dir*2 > 40) {
        a = 40;
    } else if (a + dir*2 < 0) {
        a = 0;
    }
    $("#a").val(parseFloat(a.toPrecision(3)));
    if (b > a) {
        b = a;
    }
    $("#b").val(parseFloat(b.toPrecision(3)));
    initBuffers();
}
function changeB(dir) {
    b += dir*2;
    if (b + dir*2 > 30) {
        b = 30;
    } else if (b + dir*2 < 0) {
        b = 0;
    }
    $("#b").val(parseFloat(b.toPrecision(3)));
    if (b > a) {
        a = b;
    }
    $("#a").val(parseFloat(a.toPrecision(3)));
    initBuffers();
}
function changeP(dir) {
    p += dir*2;
    if (p + dir*2 > 30) {
        p = 30;
    } else if (p + dir*2 < 6) {
        p = 6;
    }
    // var newP = 1/(1/p-dir*0.01);
    // if (newP > 60) {
    //     p = 60;
    // } else if (newP < 6) {
    //     p = 6;
    // } else {
    //     p = newP;
    // }
    $("#p").val(parseFloat(p.toPrecision(3)));
    initBuffers();
}
var isShow = [true, false, false];

var a = 20;
var b = 0;
var p = 15;
function initData() {
    isShowAxes = false;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    // primitives.push({class:"text", text: "x", arr0:[0,0,5]});
    // primitives.push({class:"text", text: "y", arr0:[5,0,0]});
    // primitives.push({class:"text", text: "z", arr0:[0,5,0]});
    // axisLen = 35;
    // primitives.push({class:"text", text: "z", arr0:[0,0,axisLen]});
    // primitives.push({class:"text", text: "x", arr0:[axisLen,0,0]});
    // primitives.push({class:"text", text: "y", arr0:[0,axisLen,0]});
    var geo = [];
    var Rad = 30;
    var colorp = [0.98, 0.98, 0.98, 1.0];
    var geoID = 0;
    geo[geoID+0] = {vertices: [], normals: [], color: colorp, slicesU: 32, slicesV: 32};
    geo[geoID+1] = {vertices: [], normals: [], color: colorp, slicesU: 32, slicesV: 32};
    geo[geoID+2] = {vertices: [], normals: [], color: colorp, slicesU: 32, slicesV: 32};
    geo[geoID+3] = {vertices: [], normals: [], color: colorp, slicesU: 32, slicesV: 32};

    var c = 1/p/2;
    // for (var i = 0; i <= slicesU; i++) {
    //     var u = (i/slicesU*2-1)*Rad;
    //     for (var j = 0; j <= slicesV; j++) {
    //         var v = (j/slicesV*2-1)*Rad;
    //         var px = u;
    //         var py = (v*v-u*u)*c;
    //         var pz = v;
    //         vertices[0].push( px, py, pz );
    //         normals[0].push( -2*c*u );
    //         normals[0].push( -1 );
    //         normals[0].push( 2*c*v );
    //     }
    // }

    var roofHeight = b;
    var centerOnZ = (a-roofHeight)/Math.SQRT2/Rad/c;
    var roofThickness = 1.3;
    var roofOverhangMult = 0.9;
    var roofDispY = (Math.SQRT2*Rad-centerOnZ)*c*centerOnZ+roofHeight;
    for (var i = 0; i <= geo[geoID+0].slicesU; i++) {
        var psi = i/geo[geoID+0].slicesU*Math.PI/2+Math.PI/4;
        for (var j = 0; j <= geo[geoID+0].slicesV; j++) {
            var phi = j/geo[geoID+0].slicesV*Rad;
            var px = phi*Math.cos(psi);
            var pz = phi*Math.sin(psi)-centerOnZ;
            var py = (pz*pz-px*px)*c;
            geo[geoID+0].vertices.push( px, py+roofDispY, pz+centerOnZ );
            geo[geoID+0].normals.push( -2*px, -1/c, 2*pz );
            geo[geoID+1].vertices.push( px, py+roofDispY, -pz-centerOnZ );
            geo[geoID+1].normals.push( -2*px, -1/c, -2*pz );
            geo[geoID+2].vertices.push( pz+centerOnZ, py+roofDispY, px );
            geo[geoID+2].normals.push( 2*pz, -1/c, -2*px );
            geo[geoID+3].vertices.push( -pz-centerOnZ, py+roofDispY, px );
            geo[geoID+3].normals.push( -2*pz, -1/c, -2*px );
        }
    }
    geoID += 4;


    geo[geoID+0] = {vertices: [], normals: [], color: colorp, slicesU: 32, slicesV: 32};
    geo[geoID+1] = {vertices: [], normals: [], color: colorp, slicesU: 32, slicesV: 32};
    geo[geoID+2] = {vertices: [], normals: [], color: colorp, slicesU: 32, slicesV: 32};
    geo[geoID+3] = {vertices: [], normals: [], color: colorp, slicesU: 32, slicesV: 32};

    for (var i = 0; i <= geo[geoID+0].slicesU; i++) {
        var psi = i/geo[geoID+0].slicesU*Math.PI/2+Math.PI/4;
        for (var j = 0; j <= geo[geoID+0].slicesV; j++) {
            var phi = j/geo[geoID+0].slicesV*Rad;
            var px = phi*Math.cos(psi);
            var pz = phi*Math.sin(psi)-centerOnZ;
            var py = (pz*pz-px*px)*c;
            geo[geoID+0].vertices.push( px, py+roofDispY+roofThickness, pz+centerOnZ );
            geo[geoID+0].normals.push( -2*px, -1/c, 2*pz );
            geo[geoID+1].vertices.push( px, py+roofDispY+roofThickness, -pz-centerOnZ );
            geo[geoID+1].normals.push( -2*px, -1/c, -2*pz );
            geo[geoID+2].vertices.push( pz+centerOnZ, py+roofDispY+roofThickness, px );
            geo[geoID+2].normals.push( 2*pz, -1/c, -2*px );
            geo[geoID+3].vertices.push( -pz-centerOnZ, py+roofDispY+roofThickness, px );
            geo[geoID+3].normals.push( -2*pz, -1/c, -2*px );
        }
    }
    geoID += 4;

    geo[geoID+0] = {vertices: [], normals: [], color: [0.26+0.2, 0.5+0.2, 0.64+0.2, 1], slicesU: 32, slicesV: 1};
    geo[geoID+1] = {vertices: [], normals: [], color: [0.26+0.2, 0.5+0.2, 0.64+0.2, 1], slicesU: 32, slicesV: 1};
    geo[geoID+2] = {vertices: [], normals: [], color: [0.26+0.2, 0.5+0.2, 0.64+0.2, 1], slicesU: 32, slicesV: 1};
    geo[geoID+3] = {vertices: [], normals: [], color: [0.26+0.2, 0.5+0.2, 0.64+0.2, 1], slicesU: 32, slicesV: 1};
    for (var i = 0; i <= geo[geoID+0].slicesU; i++) {
        var psi = i/geo[geoID+0].slicesU*Math.PI/2+Math.PI/4;
        for (var j = 0; j <= geo[geoID+0].slicesV; j++) {
            var phi = j/geo[geoID+0].slicesV;
            var px = Rad*roofOverhangMult*Math.cos(psi);
            var pz = Rad*roofOverhangMult*Math.sin(psi)-centerOnZ;
            var py = phi*(pz*pz-px*px)*c + (1-phi)*(-roofDispY);
            geo[geoID+0].vertices.push( px, py+roofDispY, pz+centerOnZ );
            geo[geoID+0].normals.push( Math.cos(psi), 0, Math.sin(psi) );
            geo[geoID+1].vertices.push( px, py+roofDispY, -pz-centerOnZ );
            geo[geoID+1].normals.push( Math.cos(psi), 0, -Math.sin(psi) );
            geo[geoID+2].vertices.push( pz+centerOnZ, py+roofDispY, px );
            geo[geoID+2].normals.push( Math.sin(psi), 0, Math.cos(psi) );
            geo[geoID+3].vertices.push( -pz-centerOnZ, py+roofDispY, px );
            geo[geoID+3].normals.push( -Math.sin(psi), 0, Math.cos(psi) );
        }
    }
    geoID += 4;

    geo[geoID+0] = {vertices: [], normals: [], color: colorp, slicesU: 32, slicesV: 1};
    geo[geoID+1] = {vertices: [], normals: [], color: colorp, slicesU: 32, slicesV: 1};
    geo[geoID+2] = {vertices: [], normals: [], color: colorp, slicesU: 32, slicesV: 1};
    geo[geoID+3] = {vertices: [], normals: [], color: colorp, slicesU: 32, slicesV: 1};
    for (var i = 0; i <= geo[geoID+0].slicesU; i++) {
        var psi = i/geo[geoID+0].slicesU*Math.PI/2+Math.PI/4;
        for (var j = 0; j <= geo[geoID+0].slicesV; j++) {
            var phi = j/geo[geoID+0].slicesV;
            var px = Rad*Math.cos(psi);
            var pz = Rad*Math.sin(psi)-centerOnZ;
            var py = phi*(pz*pz-px*px)*c + (1-phi)*((pz*pz-px*px)*c+roofThickness);
            geo[geoID+0].vertices.push( px, py+roofDispY, pz+centerOnZ );
            geo[geoID+0].normals.push( Math.cos(psi), 0, Math.sin(psi) );
            geo[geoID+1].vertices.push( px, py+roofDispY, -pz-centerOnZ );
            geo[geoID+1].normals.push( Math.cos(psi), 0, -Math.sin(psi) );
            geo[geoID+2].vertices.push( pz+centerOnZ, py+roofDispY, px );
            geo[geoID+2].normals.push( Math.sin(psi), 0, Math.cos(psi) );
            geo[geoID+3].vertices.push( -pz-centerOnZ, py+roofDispY, px );
            geo[geoID+3].normals.push( -Math.sin(psi), 0, Math.cos(psi) );
        }
    }
    geoID += 4;

    geo[geoID] = {vertices: [], normals: [], color: [0.8,0.8,0.8,1], slicesU: 1, slicesV: 1};
    geo[geoID].vertices.push( -Rad*1.5, 0, -Rad*1.5);
    geo[geoID].normals.push( 0, 1, 0 );
    geo[geoID].vertices.push( Rad*1.5, 0, -Rad*1.5);
    geo[geoID].normals.push( 0, 1, 0 );
    geo[geoID].vertices.push( -Rad*1.5, 0, Rad*1.5);
    geo[geoID].normals.push( 0, 1, 0 );
    geo[geoID].vertices.push( Rad*1.5, 0, Rad*1.5);
    geo[geoID].normals.push( 0, 1, 0 );
    // vertices[1] = [];
    // normals[1] = [];
    // vertices[2] = [];
    // normals[2] = [];
    // vertices[3] = [];
    // normals[3] = [];

    // var c = 1/p/2;

    // var point11 = [0, -Rad*Rad*c, -a*Rad]; // u==0, v==-Rad
    // var point12 = [ b*Rad, Rad*Rad*c, 0]; // u==Rad, v==0

    // var point21 = [-b*Rad, Rad*Rad*c, 0]; // u==-Rad, v==0
    // var point22 = [0, -Rad*Rad*c,  a*Rad]; // u==0, v==Rad


    // var roofHeight = b;
    // var centerOnZ = (a-roofHeight)/Math.SQRT2/Rad/c;
    // var roofThickness = 1.3;
    // var roofOverhangMult = 0.9;
    // var roofDispY = (Math.SQRT2*Rad-centerOnZ)*c*centerOnZ+roofHeight;
    // for (var i = 0; i <= geo[geoID+0].slicesU; i++) {
    //     var psi = i/geo[geoID+0].slicesU*Math.PI/2+Math.PI/4;
    //     for (var j = 0; j <= geo[geoID+0].slicesV; j++) {
    //         var phi = j/geo[geoID+0].slicesV*Rad;
    //         var px = phi*Math.cos(psi);
    //         var pz = phi*Math.sin(psi)-centerOnZ;
    //         var py = (pz*pz-px*px)*c;
    //         geo[geoID+0].vertices.push( px, py+roofDispY, pz+centerOnZ );
    //         geo[geoID+0].normals.push( -2*px, -1/c, 2*pz );
    //         geo[geoID+1].vertices.push( px, py+roofDispY, -pz-centerOnZ );
    //         geo[geoID+1].normals.push( -2*px, -1/c, -2*pz );
    //         geo[geoID+2].vertices.push( pz+centerOnZ, py+roofDispY, px );
    //         geo[geoID+2].normals.push( 2*pz, -1/c, -2*px );
    //         geo[geoID+3].vertices.push( -pz-centerOnZ, py+roofDispY, px );
    //         geo[geoID+3].normals.push( -2*pz, -1/c, -2*px );
    //     }
    // }


            var py = (pz*pz-px*px)*c;
    // var point11 = [0, Rad*Rad*c+roofDispY+roofThickness, -Rad+centerOnZ]; // u==0, v==-Rad
    // var point12 = [ Rad, -Rad*Rad*c+roofDispY+roofThickness, centerOnZ]; // u==Rad, v==0

    // var point21 = [-Rad, -Rad*Rad*c+roofDispY+roofThickness, centerOnZ]; // u==-Rad, v==0
    // var point22 = [0, Rad*Rad*c+roofDispY+roofThickness,  Rad+centerOnZ]; // u==0, v==Rad

    var u=0, v=-Rad-centerOnZ;
    var point11 = [u, (v*v-u*u)*c+roofDispY+roofThickness, v+centerOnZ];
    var u=Rad, v=-centerOnZ;
    var point12 = [u, (v*v-u*u)*c+roofDispY+roofThickness, v+centerOnZ];
    var u=-Rad, v=-centerOnZ;
    var point21 = [u, (v*v-u*u)*c+roofDispY+roofThickness, v+centerOnZ];
    var u=0, v=Rad-centerOnZ;
    var point22 = [u, (v*v-u*u)*c+roofDispY+roofThickness, v+centerOnZ];

    if (isShow[1] || isShow[2]) {
        var linesCount = 10;
        for (var i = 1; i < linesCount; i++) {
            var u = i/linesCount/2*Math.SQRT2+0.5;

            var pointV1 = [];
            var pointV2 = [];
            var pointU1 = [];
            var pointU2 = [];

            for (var j = 0; j < 3; j++) {
                pointV1[j] = point11[j]*(1-u) + point12[j]*(u);
                pointV2[j] = point21[j]*(1-u) + point22[j]*(u);
                pointU1[j] = point11[j]*(1-u) + point21[j]*(u);
                pointU2[j] = point12[j]*(1-u) + point22[j]*(u);
            }

            vec3.add(pointV1, pointV2);
            vec3.scale(pointV1, 0.5);
            vec3.subtract(pointV2, pointV1);
            vec3.scale(pointV2, 1/(pointV2[2]*Math.SQRT2) * Rad*Math.sqrt(1-i/linesCount*i/linesCount));
            vec3.add(pointV2, pointV1);

            if (isShow[1]) {
                primitives.push({class:"line", text: "", arr0:pointV1, arr1:pointV2, rad:1, color:[0,0,0,1]});

                primitives.push({class:"line", text: "", arr0:[-pointV1[0], pointV1[1], -pointV1[2]],
                                                         arr1:[-pointV2[0], pointV2[1], -pointV2[2]], rad:1, color:[0,0,0,1]});

                primitives.push({class:"line", text: "", arr0:[pointV1[2], pointV1[1], -pointV1[0]],
                                                         arr1:[pointV2[2], pointV2[1], -pointV2[0]], rad:1, color:[0,0,0,1]});

                primitives.push({class:"line", text: "", arr0:[-pointV1[2], pointV1[1], pointV1[0]],
                                                         arr1:[-pointV2[2], pointV2[1], pointV2[0]], rad:1, color:[0,0,0,1]});
            }
            if (isShow[2]) {
                primitives.push({class:"line", text: "", arr0:[-pointV1[0], pointV1[1], pointV1[2]],
                                                         arr1:[-pointV2[0], pointV2[1], pointV2[2]], rad:1, color:[0,0,0,1]});

                primitives.push({class:"line", text: "", arr0:[pointV1[0], pointV1[1], -pointV1[2]],
                                                         arr1:[pointV2[0], pointV2[1], -pointV2[2]], rad:1, color:[0,0,0,1]});

                primitives.push({class:"line", text: "", arr0:[-pointV1[2], pointV1[1], -pointV1[0]],
                                                         arr1:[-pointV2[2], pointV2[1], -pointV2[0]], rad:1, color:[0,0,0,1]});

                primitives.push({class:"line", text: "", arr0:[pointV1[2], pointV1[1], pointV1[0]],
                                                         arr1:[pointV2[2], pointV2[1], pointV2[0]], rad:1, color:[0,0,0,1]});
            }

            // if (isShow[1]) {
            //     primitives.push({class:"line", text: "", arr0:pointV1, arr1:pointV2, rad:1, color:[0,0,0,1]});

            //     primitives.push({class:"line", text: "", arr0:[-pointV1[0], pointV1[1], -pointV1[2]],
            //                                              arr1:[-pointV2[0], pointV2[1], -pointV2[2]], rad:1, color:[0,0,0,1]});

            //     primitives.push({class:"line", text: "", arr0:[pointV1[2], pointV1[1], pointV1[0]],
            //                                              arr1:[pointV2[2], pointV2[1], pointV2[0]], rad:1, color:[0,0,0,1]});

            //     primitives.push({class:"line", text: "", arr0:[-pointV1[2], pointV1[1], -pointV1[0]],
            //                                              arr1:[-pointV2[2], pointV2[1], -pointV2[0]], rad:1, color:[0,0,0,1]});
            // }
            // if (isShow[2]) {
            //     primitives.push({class:"line", text: "", arr0:[-pointV1[0], pointV1[1], pointV1[2]],
            //                                              arr1:[-pointV2[0], pointV2[1], pointV2[2]], rad:1, color:[0,0,0,1]});

            //     primitives.push({class:"line", text: "", arr0:[pointV1[0], pointV1[1], -pointV1[2]],
            //                                              arr1:[pointV2[0], pointV2[1], -pointV2[2]], rad:1, color:[0,0,0,1]});

            //     primitives.push({class:"line", text: "", arr0:[-pointV1[2], pointV1[1], pointV1[0]],
            //                                              arr1:[-pointV2[2], pointV2[1], pointV2[0]], rad:1, color:[0,0,0,1]});

            //     primitives.push({class:"line", text: "", arr0:[pointV1[2], pointV1[1], -pointV1[0]],
            //                                              arr1:[pointV2[2], pointV2[1], -pointV2[0]], rad:1, color:[0,0,0,1]});
            // }
        }
    }

    var colorl = [0.0, 0.0, 0.0, 1.0];
    for (var k = 0; k < geo.length; k++) {
    // for (var k = 0; k < 1; k++) {
        geo[k].indices = [];
        for (var i=0; i < geo[k].slicesU; i++) {
            for (var j=0; j < geo[k].slicesV; j++) {
                var aa = [i*(geo[k].slicesV+1)+j,
                          i*(geo[k].slicesV+1)+j+1,
                          (i+1)*(geo[k].slicesV+1)+j+1,
                          (i+1)*(geo[k].slicesV+1)+j];
                geo[k].indices.push(aa[0],aa[1],aa[2],aa[0],aa[2],aa[3]);
            }
        }
        if (isShow[0]) {
            meshes.push({
                vertices: geo[k].vertices,
                normals: geo[k].normals,
                indices: geo[k].indices,
                color: geo[k].color,
                reinit:true
            });
        }
        for (var i=0; i < geo[k].slicesU; i++) {
            for (var j=0; j < geo[k].slicesV; j++) {
                var aa = [i*(geo[k].slicesV+1)+j,
                          i*(geo[k].slicesV+1)+j+1,
                          (i+1)*(geo[k].slicesV+1)+j+1,
                          (i+1)*(geo[k].slicesV+1)+j];

                // if (isShow[1]) {
                //     if (i%4==0) {
                //         primitives.push({class:"line", text: "",
                //                         arr0:[geo[k].vertices[aa[0]*3],geo[k].vertices[aa[0]*3+1],geo[k].vertices[aa[0]*3+2]],
                //                         arr1:[geo[k].vertices[aa[1]*3],geo[k].vertices[aa[1]*3+1],geo[k].vertices[aa[1]*3+2]],
                //                         rad:1, color:colorl});
                //     }
                // } else {
                    if (i==0) {
                        primitives.push({class:"line", text: "",
                                         arr0:[geo[k].vertices[aa[0]*3],geo[k].vertices[aa[0]*3+1],geo[k].vertices[aa[0]*3+2]],
                                         arr1:[geo[k].vertices[aa[1]*3],geo[k].vertices[aa[1]*3+1],geo[k].vertices[aa[1]*3+2]],
                                         rad:1, color:colorl});
                    }
                // }

                if (i==geo[k].slicesU-1) {
                    primitives.push({class:"line", text: "",
                                    arr0:[geo[k].vertices[aa[2]*3],geo[k].vertices[aa[2]*3+1],geo[k].vertices[aa[2]*3+2]],
                                    arr1:[geo[k].vertices[aa[3]*3],geo[k].vertices[aa[3]*3+1],geo[k].vertices[aa[3]*3+2]],
                                    rad:1, color:colorl});
                }
                if (j==geo[k].slicesV-1) {
                    primitives.push({class:"line", text: "",
                                    arr0:[geo[k].vertices[aa[1]*3],geo[k].vertices[aa[1]*3+1],geo[k].vertices[aa[1]*3+2]],
                                    arr1:[geo[k].vertices[aa[2]*3],geo[k].vertices[aa[2]*3+1],geo[k].vertices[aa[2]*3+2]],
                                    rad:1,color:colorl});
                }
                // if (isShow[2]) {
                //     if (j%4==0) {
                //         primitives.push({class:"line", text: "",
                //                         arr0:[geo[k].vertices[aa[0]*3],geo[k].vertices[aa[0]*3+1],geo[k].vertices[aa[0]*3+2]],
                //                         arr1:[geo[k].vertices[aa[3]*3],geo[k].vertices[aa[3]*3+1],geo[k].vertices[aa[3]*3+2]],
                //                         rad:1,color:colorl});
                //     }
                // } else {
                    if (j==0) {
                        primitives.push({class:"line", text: "",
                                        arr0:[geo[k].vertices[aa[0]*3],geo[k].vertices[aa[0]*3+1],geo[k].vertices[aa[0]*3+2]],
                                        arr1:[geo[k].vertices[aa[3]*3],geo[k].vertices[aa[3]*3+1],geo[k].vertices[aa[3]*3+2]],
                                        rad:1,color:colorl});
                    }
                // }

            }
        }
    }
    // for (var j = 0; j < lineVertices.length; j++) {
    //     for (var i = 0; i < lineVertices[j].length-1; i++) {
    //         primitives.push({class:"line", text: "", arr0:lineVertices[j][i], arr1:lineVertices[j][i+1], rad:1, color:colorl});
    //     }
    // }
}
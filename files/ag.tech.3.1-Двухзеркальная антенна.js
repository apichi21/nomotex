var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    $("#containerYellow").css({"min-width": "350px"});
    var descr = '';
    descr += '<h4>Двухзеркальная антенна Кассегрена</h4>';
    descr += '<p>Используется в радиолокаторах и радиотелескопах, как правило работающих в миллиметровом диапазоне.</p>';
    descr += 'Основное (параболическое) зеркало (1).';
    // descr += '<label><input type="checkbox" checked onchange="isShow[0]=this.checked; initBuffers();">Основное (параболическое) зеркало (1).</label>';
    descr += '<label><input type="checkbox" checked onchange="isShow[1]=this.checked; initBuffers();">Вспомогательное (гиперболическое) зеркало (2).</label>';
    descr += '<label><input type="checkbox" checked onchange="isShow[2]=this.checked; initBuffers();">Источник излучения (3) располагается в фокусе $F_1$ гиперболического зеркала.</label>';
    descr += '<p>Второй фокус гиперболического зеркала $F_2$ располагается таким образом, что он совпадает с фокусом основного (параболического) зеркала.</p>';
    descr += '<p>Лучи, выходящие из фокуса $F_1$, отражаясь от вспомогательного (гиперболического) зеркала приходят на основное зеркало таким образом, как если \
              бы они выходили из фокуса $F_2$ основного зеркала.</p>';
    descr += '<p>Этот эффект гиперболы позволяет сделать конструкцию радиолокатора более компактной, расположив источник излучения близко к основному зеркалу, и более надёжной.</p>';
    descr += '<label><input type="checkbox" onchange="changeCrossSection(this.checked);"> Сечение</label>';
    $("#description").html(descr);

    rotAngZ = -45;
    rotAngY = -20;
    $("#containerGreen").append('<div id="controls">\
                                 <b>Угол наклона</br> антенны:</b></br>\
                                 <input type="button" value="-" onclick="rotatePlane(-1);">\
                                 <input id="angle" type="text" size=2 readonly">\
                                 <input type="button" value="+" onclick="rotatePlane(1);">\
                                 </div>');
    $("#angle").val(90+rotAngZ);

    $("Title").html("Кривые и поверхности второго порядка");
}
function rotatePlane(dir) {
    rotAngZ += dir*15;
    if (rotAngZ > 0) rotAngZ = 0;
    if (rotAngZ < -90) rotAngZ = -90;
    $("#angle").val(90+rotAngZ);
    initBuffers();
}
function changeCrossSection(checked) {
    isCrossSection = checked;
    initBuffers();
}
var isShow = [true, true, true];
var isCrossSection = false;
function initData() {
    isShowAxes = false;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    var parp = 10;
    var par2y0 = -0.5;
    var hypF1 = 1.5;
    var hypc = (parp/2-hypF1) / 2;
    var hypY0 = hypF1+hypc;

    var hypa = hypc/1.2;
    var hypb = Math.sqrt(hypc*hypc-hypa*hypa);

    class Mesh {
      constructor(slicesPsi, slicesPhi, crossSectionType) {
        if (crossSectionType === undefined) {
            this.crossSectionType = 0;
        } else {
            this.crossSectionType = crossSectionType;
        }
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.slicesPsi = slicesPsi;
        this.slicesPhi = slicesPhi;
      }
    }
    var meshArray = [];
    var lineVertices = [];
    var angle;

    if (isCrossSection) {
        angle = Math.PI;
    } else {
        angle = 2*Math.PI;
    }

    if (isShow[1]) {
        meshArray.push(new Mesh(32, 16));

        var mesh = meshArray[meshArray.length-1];
        var hypRad = 1;
        var maxPhi = Math.asinh(hypRad/hypa);
        var hypTop = hypY0+hypb*Math.cosh(maxPhi)

        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = 2*Math.PI-i*angle/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = (j/mesh.slicesPhi)*maxPhi;
                var px = hypa*Math.sinh(phi)*Math.cos(psi);
                var py = hypY0+hypb*Math.cosh(phi);
                var pz = hypa*Math.sinh(phi)*Math.sin(psi);
                mesh.vertices.push( px, py, pz );
                mesh.normals.push( 2*px/hypa/hypa );
                mesh.normals.push( -2*py/hypb/hypb );
                mesh.normals.push( 2*pz/hypa/hypa );
            }
        }

        if (isCrossSection) {
            let slices2d = mesh.slicesPhi;
            let vertices2d = [];
            for (var i = 0; i <= slices2d; i++) {
                var psi = (i/slices2d*2-1)*maxPhi;
                vertices2d.push( [hypa*Math.sinh(psi), hypY0-hypb*Math.cosh(psi),0.0] );
            }
            for (var i = 0; i < vertices2d.length-1; i++) {
                primitives.push({class:"line", text: "", arr0:vertices2d[i], arr1:vertices2d[i+1], rad:1.5, color:[0.5, 0.5, 1.0, 1.0]});
            }

            meshArray.push(new Mesh(1, 32, 1));
            var mesh = meshArray[meshArray.length-1];
            for (var i = 0; i <= mesh.slicesPsi; i++) {
                for (var j = 0; j <= mesh.slicesPhi; j++) {
                    var phi = (j/mesh.slicesPhi*2-1)*maxPhi;
                    var px = hypa*Math.sinh(phi);
                    var py = i==0 ? hypY0+hypb*Math.cosh(phi) : hypTop;
                    var pz = 0;
                    mesh.vertices.push( px, py, pz );
                    mesh.normals.push( 0 );
                    mesh.normals.push( 0 );
                    mesh.normals.push( 1 );
                }
            }
        }
        meshArray.push(new Mesh(32, 1, -1));
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = 2*Math.PI-i*angle/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var rad = phi*hypRad;
                var px = rad*Math.cos(psi);
                var py = hypTop;
                var pz = rad*Math.sin(psi);
                mesh.vertices.push( px, py, pz );
                mesh.normals.push( 0 );
                mesh.normals.push( 1 );
                mesh.normals.push( 0 );
            }
        }

        primitives.push({class:"line", text: "", arr0:[-hypRad,hypTop,0], arr1:[-hypRad-0.5,hypTop+0.1,0], rad:1, color:[0.0,0.0,0.0,1.0]});
        primitives.push({class:"text", text: "2", pos: "cb", arr0:[-hypRad-0.5,hypTop+0.1,0]});
    }

    if (isShow[0]) {

        meshArray.push(new Mesh(64, 32));
        var mesh = meshArray[meshArray.length-1];
        var maxPhi = 5;

        primitives.push({class:"line", text: "", arr0:[-maxPhi,maxPhi*maxPhi/2/parp,0], arr1:[-maxPhi-0.5,maxPhi*maxPhi/2/parp+0.1,0], rad:1, color:[0.0,0.0,0.0,1.0]});
        primitives.push({class:"text", text: "1", pos: "cb", arr0:[-maxPhi-0.5,maxPhi*maxPhi/2/parp+0.1,0]});
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = 2*Math.PI-i*angle/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi*maxPhi;
                var px = phi *Math.cos(psi);
                var py = phi*phi/2/parp;
                var pz = phi *Math.sin(psi);
                mesh.vertices.push( px, py, pz );
                mesh.normals.push( 2*px );
                mesh.normals.push( -2*parp );
                mesh.normals.push( 2*pz );
            }
        }

        meshArray.push(new Mesh(64, 32, -1));
        var mesh = meshArray[meshArray.length-1];
        var par2p = maxPhi*maxPhi*parp/(maxPhi*maxPhi-2*parp*par2y0);
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = 2*Math.PI-i*angle/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi*maxPhi;
                var px = phi *Math.cos(psi);
                var py = phi*phi/2/par2p+par2y0;
                var pz = phi *Math.sin(psi);
                mesh.vertices.push( px, py, pz );
                mesh.normals.push( 2*px );
                mesh.normals.push( -2*par2p );
                mesh.normals.push( 2*pz );
            }
        }

        if (isCrossSection) {
            meshArray.push(new Mesh(1, 64, 1));
            var mesh = meshArray[meshArray.length-1];
            for (var i = 0; i <= mesh.slicesPsi; i++) {
                for (var j = 0; j <= mesh.slicesPhi; j++) {
                    var phi = (j/mesh.slicesPhi*2-1)*maxPhi;
                    var px = phi;
                    var py = i==0 ? phi*phi/2/par2p+par2y0 : phi*phi/2/parp;
                    var pz = 0;
                    mesh.vertices.push( px, py, pz );
                    mesh.normals.push( 0 );
                    mesh.normals.push( 0 );
                    mesh.normals.push( 1 );
                }
            }
        }
    }

    if (isShow[2]) {
        var cylrad1 = 0.2;
        var cylrad2 = -cylrad1/parp*2*hypF1 + cylrad1;
        var cylVec = [hypF1, cylrad1 - cylrad2, 0];
        vec3.normalize(cylVec);

        primitives.push({class:"line", text: "", arr0:[-cylrad2,hypF1,0], arr1:[-cylrad2-0.6,hypF1+0.1,0], rad:1, color:[0.0,0.0,0.0,1.0]});
        primitives.push({class:"text", text: "3", pos: "cb", arr0:[-cylrad2-0.6,hypF1+0.1,0]});

        meshArray.push(new Mesh(16, 1, -1));
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = 2*Math.PI-i*angle/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var rad = phi*cylrad2+(1-phi)*cylrad1;
                var px = rad*Math.cos(psi);
                var py = phi*hypF1;
                var pz = rad*Math.sin(psi);
                mesh.vertices.push( px, py, pz );
                mesh.normals.push( cylVec[0]*Math.cos(psi) );
                mesh.normals.push( cylVec[1] );
                mesh.normals.push( cylVec[0]*Math.sin(psi) );
            }
        }

        meshArray.push(new Mesh(16, 1, -1));
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = 2*Math.PI-i*angle/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var rad = phi*cylrad2;
                var px = rad*Math.cos(psi);
                var py = hypF1;
                var pz = rad*Math.sin(psi);
                mesh.vertices.push( px, py, pz );
                mesh.normals.push( 0 );
                mesh.normals.push( 1 );
                mesh.normals.push( 0 );
            }
        }

        if (isCrossSection) {
            meshArray.push(new Mesh(1, 1, 1));
            var mesh = meshArray[meshArray.length-1];
            for (var i = 0; i <= mesh.slicesPsi; i++) {
                for (var j = 0; j <= mesh.slicesPhi; j++) {
                    var phi = j/mesh.slicesPhi;
                    var rad = phi*cylrad2+(1-phi)*cylrad1;
                    var px = i==0 ? -rad : rad;
                    var py = phi*hypF1;
                    var pz = 0;
                    mesh.vertices.push( px, py, pz );
                    mesh.normals.push( 0 );
                    mesh.normals.push( 0 );
                    mesh.normals.push( 1 );
                }
            }
        }
    }

    if (isShow[1]) {
        var beamRad = 0.07;
        var beamPos1 = 3*Math.SQRT1_2;
        var beamPos2 = (1-beamRad)*Math.SQRT1_2;

        var beamPosY1 = 3*3/2/parp;
        var beamPosY2 = hypY0+hypb*Math.cosh(Math.asinh(1/hypa))

        meshArray.push(new Mesh(8, 1, 2));
        var beamVec1 = [beamPos1, beamPosY1, beamPos1];
        var beamVec2 = [beamPos2, beamPosY2, beamPos2];
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*2*Math.PI/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = (beamPos1*(1-phi)+beamPos2*phi)+beamRad*Math.cos(psi);
                var py = beamPosY1*(1-phi)+beamPosY2*phi;
                var pz = (beamPos1*(1-phi)+beamPos2*phi)+beamRad*Math.sin(psi);
                mesh.vertices.push( px, py, pz );

                var normal = [];
                var normLen = distToLine([px, py, pz], beamVec1, beamVec2, normal);
                vec3.scale(normal, -1/normLen);
                mesh.normals.push( normal[0] );
                mesh.normals.push( normal[1] );
                mesh.normals.push( normal[2] );
            }
        }
        meshArray.push(new Mesh(8, 1, 2));
        var beamVec1 = [-beamPos1, beamPosY1, beamPos1];
        var beamVec2 = [-beamPos2, beamPosY2, beamPos2];
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*2*Math.PI/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = -(beamPos1*(1-phi)+beamPos2*phi)+beamRad*Math.cos(psi);
                var py = beamPosY1*(1-phi)+beamPosY2*phi;
                var pz = (beamPos1*(1-phi)+beamPos2*phi)+beamRad*Math.sin(psi);
                mesh.vertices.push( px, py, pz );

                var normal = [];
                var normLen = distToLine([px, py, pz], beamVec1, beamVec2, normal);
                vec3.scale(normal, -1/normLen);
                mesh.normals.push( normal[0] );
                mesh.normals.push( normal[1] );
                mesh.normals.push( normal[2] );
            }
        }
        meshArray.push(new Mesh(8, 1, 1));
        var beamVec1 = [beamPos1, beamPosY1, -beamPos1];
        var beamVec2 = [beamPos2, beamPosY2, -beamPos2];
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*2*Math.PI/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = (beamPos1*(1-phi)+beamPos2*phi)+beamRad*Math.cos(psi);
                var py = beamPosY1*(1-phi)+beamPosY2*phi;
                var pz = -(beamPos1*(1-phi)+beamPos2*phi)+beamRad*Math.sin(psi);
                mesh.vertices.push( px, py, pz );

                var normal = [];
                var normLen = distToLine([px, py, pz], beamVec1, beamVec2, normal);
                vec3.scale(normal, -1/normLen);
                mesh.normals.push( normal[0] );
                mesh.normals.push( normal[1] );
                mesh.normals.push( normal[2] );
            }
        }
        meshArray.push(new Mesh(8, 1, 1));
        var beamVec1 = [-beamPos1, beamPosY1, -beamPos1];
        var beamVec2 = [-beamPos2, beamPosY2, -beamPos2];
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*2*Math.PI/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = -(beamPos1*(1-phi)+beamPos2*phi)+beamRad*Math.cos(psi);
                var py = beamPosY1*(1-phi)+beamPosY2*phi;
                var pz = -(beamPos1*(1-phi)+beamPos2*phi)+beamRad*Math.sin(psi);
                mesh.vertices.push( px, py, pz );

                var normal = [];
                var normLen = distToLine([px, py, pz], beamVec1, beamVec2, normal);
                vec3.scale(normal, -1/normLen);
                mesh.normals.push( normal[0] );
                mesh.normals.push( normal[1] );
                mesh.normals.push( normal[2] );
            }
        }
    }

    if (isCrossSection) {
        // var paramOfPoint1 = [0.4, -0.5];
        var paramOfPoint1 = [0.4, 0.1, -0.3];
        for (var i = 0; i < paramOfPoint1.length; i++) {
            var pointM1 = [hypa*Math.sinh(paramOfPoint1[i]),hypY0+hypb*Math.cosh(paramOfPoint1[i]),0.0];
            var pointM2 = [];
            var pointF1 = [0,hypF1,0];
            var pointF2 = [0,hypF1+hypc*2,0];

            var vecFM = [];
            vec3.subtract(pointM1, pointF2, vecFM);
            var t = (parp*vecFM[1] + Math.sqrt(parp*parp*vecFM[1]*vecFM[1] + 2*vecFM[0]*vecFM[0]*parp*pointF2[1])) / vecFM[0]/vecFM[0];
            vec3.scale(vecFM, t);
            vec3.add(vecFM, pointF2, pointM2);

            var arrowColor, arcColor;
            switch (i) {
              case 0:
                arrowColor = [0.0, 0.9, 0.5, 1.0];
                arcColor = [0.0, 0.8, 0.4, 1.0];
                break;
              case 1:
                arrowColor = [0.9, 0.5, 0.0, 1.0];
                arcColor = [0.8, 0.4, 0.0, 1.0];
                break;
              case 3:
                arrowColor = [0.5, 0.9, 0.0, 1.0];
                arcColor = [0.4, 0.8, 0.0, 1.0];
                break;
              case 2:
                arrowColor = [0.9, 0.0, 0.5, 1.0];
                arcColor = [0.8, 0.0, 0.4, 1.0];
                break;
            }
            primitives.push({class:"point", text: "", arr0:pointM1, rad:3, color:arcColor});
            primitives.push({class:"arrow", text: "", arr0:pointF1, arr1:pointM1, rad:2, color:arrowColor});
            primitives.push({class:"point", text: "", arr0:pointM2, rad:3, color:arcColor});
            primitives.push({class:"dashline", text: "", arr0:pointF2, arr1:pointM1, rad:1.5, color:arrowColor});
            primitives.push({class:"arrow", text: "", arr0:pointM1, arr1:pointM2, rad:2, color:arrowColor});
            primitives.push({class:"arrow", text: "", arr0:pointM2, arr1:[pointM2[0],pointM2[1]+hypF1+hypc,0], rad:2, color:arrowColor});
        }
        primitives.push({class:"point", text: katex.renderToString('F_1'), arr0:pointF1, rad:5, color:[1.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"point", text: katex.renderToString('F_2'), arr0:pointF2, rad:5, color:[1.0, 0.0, 0.0, 1.0]});
    }

    var colorp = [0.9, 0.9, 0.9, 1.0];
    var colorl = [0.0, 0.0, 0.0, 1.0];
    var colorl2 = [0.0, 0.0, 1.0, 1.0];
    for (var k = 0; k < meshArray.length; k++) {
        var mesh = meshArray[k];
        if (isCrossSection && mesh.crossSectionType==2) continue;

        for (var i=0; i < mesh.slicesPsi; i++) {
            for (var j=0; j < mesh.slicesPhi; j++) {
                var aa = [i*(mesh.slicesPhi+1)+j, i*(mesh.slicesPhi+1)+j+1, (i+1)*(mesh.slicesPhi+1)+j+1, (i+1)*(mesh.slicesPhi+1)+j];
                mesh.indices.push(aa[0],aa[1],aa[2],aa[0],aa[2],aa[3]);
            }
        }
        if (!mesh.normals.length) {
            for (var i = 0; i <= mesh.slicesPsi; i++) {
                for (var j = 0; j <= mesh.slicesPhi; j++) {
                    mesh.normals.push( 0.0, 0.0, 1.0 );
                }
            }
        }
        meshes.push({
            vertices:mesh.vertices,
            normals:mesh.normals,
            indices:mesh.indices,
            color:colorp,
            reinit:true
        });
        for (var i=0; i < mesh.slicesPsi; i++) {
            for (var j=0; j < mesh.slicesPhi; j++) {
                var aa = [i*(mesh.slicesPhi+1)+j, i*(mesh.slicesPhi+1)+j+1, (i+1)*(mesh.slicesPhi+1)+j+1, (i+1)*(mesh.slicesPhi+1)+j];

                if (mesh.crossSectionType<=0) {
                    if (j==mesh.slicesPhi-1) {
                        primitives.push({class:"line", text: "", arr0:[mesh.vertices[aa[1]*3],mesh.vertices[aa[1]*3+1],mesh.vertices[aa[1]*3+2]], arr1:[mesh.vertices[aa[2]*3],mesh.vertices[aa[2]*3+1],mesh.vertices[aa[2]*3+2]], rad:1, color:colorl});
                    }
                    if (isCrossSection) {
                        var lineRad, lineColor;
                        if (mesh.crossSectionType==0) {
                            lineRad = 2;
                            lineColor = colorl2;
                        } else {
                            lineRad = 1;
                            lineColor = colorl;
                        }
                        if (i==0) {
                            primitives.push({class:"line", text: "", arr0:[mesh.vertices[aa[0]*3],mesh.vertices[aa[0]*3+1],mesh.vertices[aa[0]*3+2]], arr1:[mesh.vertices[aa[1]*3],mesh.vertices[aa[1]*3+1],mesh.vertices[aa[1]*3+2]], rad:lineRad, color:lineColor});
                        }
                        if (i==mesh.slicesPsi-1) {
                            primitives.push({class:"line", text: "", arr0:[mesh.vertices[aa[2]*3],mesh.vertices[aa[2]*3+1],mesh.vertices[aa[2]*3+2]], arr1:[mesh.vertices[aa[3]*3],mesh.vertices[aa[3]*3+1],mesh.vertices[aa[3]*3+2]], rad:lineRad, color:lineColor});
                        }
                    } else {
                        if (i%(mesh.slicesPsi/4)==0) {
                            primitives.push({class:"line", text: "", arr0:[mesh.vertices[aa[0]*3],mesh.vertices[aa[0]*3+1],mesh.vertices[aa[0]*3+2]], arr1:[mesh.vertices[aa[1]*3],mesh.vertices[aa[1]*3+1],mesh.vertices[aa[1]*3+2]], rad:1, color:colorl});
                        }
                    }
                }
            }
        }
    }
}
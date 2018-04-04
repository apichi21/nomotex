var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    var descr = "";
    descr += '<h4>Шуховская башня</h4>';
    descr += '<p>Шуховская радиобашня (построенная в Москве и другие проекты) представляет собой однополостный гиперболоид вращения</p>';
    descr += '<label><input type="checkbox" onchange="isShowHyp=this.checked; initBuffers();"> Поверхности гиперболоидов</label>';
    $("#description").html(descr);
    // $("#a").change(function(event){a = Math.abs(parseFloat(this.value));initBuffers();});
    // $("#b").change(function(event){b = Math.abs(parseFloat(this.value));initBuffers();});
    // $("#c").change(function(event){c = Math.abs(parseFloat(this.value));initBuffers();});
    $("Title").html("Однополостный гиперболоид");
    scaleFactor = 0.22;
    dispY = -5.25;
}
var isShowHyp = false;
function initData() {
    // isOrtho = false;
    isShowAxes = false;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    // primitives.push({class:"text", text: "x", arr0:[0,0,5]});
    // primitives.push({class:"text", text: "y", arr0:[5,0,0]});
    // primitives.push({class:"text", text: "z", arr0:[0,5,0]});

    var vertices = [];
    var indices = [];
    var normals = [];
    var colors = [];
    var slices1 = 64;
    var slices = 32;
    var angle = 2*Math.PI;

    var paramBottom = -1;
    var paramTop = 0.4;
    var c = 3;
    var bottom = c*Math.sinh(paramBottom);
    var top = c*Math.sinh(paramTop);
    var hypRad = 2;

    var vector1 = [];

    var colorl = [0.0, 0.0, 0.0, 1.0];
    var colorp = [0.0, 0.8, 0.0, 1.0];
    var colorp1 = [0.82, 0.82, 0.8, 1.0];

    var geoID = 0;
    for (var k = 0; k < 4; k++) {
        var bottomRad = hypRad*Math.cosh(paramBottom);
        var centerRad = hypRad;
        var topRad = hypRad*Math.cosh(paramTop);

        if (isShowHyp) {
            vertices[geoID] = [];
            normals[geoID] = [];
            colors[geoID] = colorp;
            for (var i = 0; i <= slices1; i++) {
                var psi = i*angle/slices1;
                for (var j = 0; j <= slices; j++) {
                    var phi = (1-j/slices)*paramBottom + j/slices*paramTop;
                    var px = hypRad*Math.cosh(phi)*Math.cos(psi);
                    var py = c*Math.sinh(phi);
                    var pz = hypRad*Math.cosh(phi)*Math.sin(psi);
                    vertices[geoID].push( px, py+k*(top-bottom), pz );
                    normals[geoID].push( 2*px/hypRad/hypRad );
                    normals[geoID].push( -2*py/c/c );
                    normals[geoID].push( 2*pz/hypRad/hypRad );
                }
            }
            geoID++;
        } else {
            if (k==0) {
                vertices[geoID] = [];
                normals[geoID] = [];
                colors[geoID] = colorp1;
                var torus_R = hypRad*Math.cosh(paramBottom);
                var torus_r = 0.1;
                for (var i = 0; i <= slices1; i++) {
                    var psi = i*angle/slices1;
                    for (var j = 0; j <= slices; j++) {
                        var phi = j*angle/slices;
                        var px = (torus_R+torus_r*Math.cos(phi))*Math.cos(psi);
                        var py = c*Math.sinh(paramBottom)+torus_r*Math.sin(phi);
                        var pz = (torus_R+torus_r*Math.cos(phi))*Math.sin(psi);
                        vertices[geoID].push( px, py+k*(top-bottom), pz );

                        normals[geoID].push( torus_r*Math.cos(phi)*(torus_R+torus_r*Math.cos(phi))*Math.cos(psi) );
                        normals[geoID].push( torus_r*Math.sin(phi)*(torus_R+torus_r*Math.cos(phi)) );
                        normals[geoID].push( torus_r*Math.cos(phi)*(torus_R+torus_r*Math.cos(phi))*Math.sin(psi) );
                    }
                }
                geoID++;
            }
            vertices[geoID] = [];
            normals[geoID] = [];
            colors[geoID] = colorp1;
            var torus_R = hypRad*Math.cosh(paramTop);
            var torus_r = 0.1;
            for (var i = 0; i <= slices1; i++) {
                var psi = i*angle/slices1;
                for (var j = 0; j <= slices; j++) {
                    var phi = j*angle/slices;
                    var px = (torus_R+torus_r*Math.cos(phi))*Math.cos(psi);
                    var py = c*Math.sinh(paramTop)+torus_r*Math.sin(phi);
                    var pz = (torus_R+torus_r*Math.cos(phi))*Math.sin(psi);
                    vertices[geoID].push( px, py+k*(top-bottom), pz );

                    normals[geoID].push( torus_r*Math.cos(phi)*(torus_R+torus_r*Math.cos(phi))*Math.cos(psi) );
                    normals[geoID].push( torus_r*Math.sin(phi)*(torus_R+torus_r*Math.cos(phi)) );
                    normals[geoID].push( torus_r*Math.cos(phi)*(torus_R+torus_r*Math.cos(phi))*Math.sin(psi) );
                }
            }
            geoID++;
        }

        var lineCount = 8;
        for (var i = 0; i < lineCount; i++) {
            var Rad = 0.1;

            var phi = 2*Math.PI*i/lineCount+2*Math.PI/lineCount/4;
            var deltaPhi = 2*Math.acos(hypRad/bottomRad);
            var yScale = (top-bottom)/(c*Math.sinh(-paramBottom)-bottom);

            var point1 = [hypRad*Math.cosh(paramBottom)*Math.cos(phi), bottom+k*(top-bottom), hypRad*Math.cosh(paramBottom)*Math.sin(phi)];
            var point2 = [hypRad*Math.cosh(-paramBottom)*Math.cos(phi+deltaPhi), c*Math.sinh(-paramBottom)+k*(top-bottom), hypRad*Math.cosh(-paramBottom)*Math.sin(phi+deltaPhi)];
            vec3.subtract(point2, point1);
            vec3.scale(point2, yScale);
            vec3.add(point2, point1);
            if (isShowHyp) {
                primitives.push({class:"line", text: "",
                                arr0:point1,
                                arr1:point2,
                                rad:1, color:colorl});
            } else {
                var matRot = lookAt(point1, point2, [0,1,0]);

                vertices[geoID] = [];
                normals[geoID] = [];
                colors[geoID] = colorp1;
                for (var ii = 0; ii <= slices1; ii++) {
                    var psi = ii/slices1*2*Math.PI;
                    for (var j = 0; j <= slices; j++) {
                        var phi = j/slices;
                        var pointCoords = [];
                        pointCoords[0] = Rad*Math.cos(psi);
                        pointCoords[1] = Rad*Math.sin(psi);
                        pointCoords[2] = 0;

                        mat4.multiplyVec3(matRot, pointCoords);


                        vertices[geoID].push(
                                          pointCoords[0]+phi*(point2[0]-point1[0]),
                                          pointCoords[1]+phi*(point2[1]-point1[1]),
                                          pointCoords[2]+phi*(point2[2]-point1[2])
                                        );
                        normals[geoID].push( pointCoords[0]-point1[0],
                                         pointCoords[1]-point1[1],
                                         pointCoords[2]-point1[2],
                                       );
                    }
                }
                geoID++;
            }


            var phi = 2*Math.PI*i/lineCount-2*Math.PI/lineCount/4;
            var point1 = [hypRad*Math.cosh(paramBottom)*Math.cos(phi), bottom+k*(top-bottom), hypRad*Math.cosh(paramBottom)*Math.sin(phi)];
            var point2 = [hypRad*Math.cosh(-paramBottom)*Math.cos(phi-deltaPhi), c*Math.sinh(-paramBottom)+k*(top-bottom), hypRad*Math.cosh(-paramBottom)*Math.sin(phi-deltaPhi)];
            vec3.subtract(point2, point1);
            vec3.scale(point2, yScale);
            vec3.add(point2, point1);


            if (isShowHyp) {
                primitives.push({class:"line", text: "",
                                arr0:point1,
                                arr1:point2,
                                rad:1, color:colorl});
            } else {
                var matRot = lookAt(point1, point2, [0,1,0]);

                vertices[geoID] = [];
                normals[geoID] = [];
                colors[geoID] = colorp1;
                for (var ii = 0; ii <= slices1; ii++) {
                    var psi = ii/slices1*2*Math.PI;
                    for (var j = 0; j <= slices; j++) {
                        var phi = j/slices;
                        var pointCoords = [];
                        pointCoords[0] = Rad*Math.cos(psi);
                        pointCoords[1] = Rad*Math.sin(psi);
                        pointCoords[2] = 0;

                        mat4.multiplyVec3(matRot, pointCoords);


                        vertices[geoID].push(
                                          pointCoords[0]+phi*(point2[0]-point1[0]),
                                          pointCoords[1]+phi*(point2[1]-point1[1]),
                                          pointCoords[2]+phi*(point2[2]-point1[2])
                                        );
                        normals[geoID].push( pointCoords[0]-point1[0],
                                         pointCoords[1]-point1[1],
                                         pointCoords[2]-point1[2],
                                       );
                    }
                }
                geoID++;
            }
        }
        hypRad *= topRad/bottomRad;
    }


    for (var k = 0; k < vertices.length; k++) {
        indices[k] = [];
        for (var i=0; i < slices1; i++) {
            for (var j=0; j < slices; j++) {
                var aa = [i*(slices+1)+j, i*(slices+1)+j+1, (i+1)*(slices+1)+j+1, (i+1)*(slices+1)+j];
                indices[k].push(aa[0],aa[1],aa[2],aa[0],aa[2],aa[3]);
            }
        }
        if (!normals[k]) {
            normals[k] = [];
            for (var i = 0; i <= slices1; i++) {
                for (var j = 0; j <= slices; j++) {
                    normals[k].push( 0.0, 0.0, 1.0 );
                }
            }
        }
        meshes.push({
            vertices:vertices[k],
            normals:normals[k],
            indices:indices[k],
            color:colors[k],
            reinit:true
        });


        if (isShowHyp) {
            for (var i=0; i < slices1; i++) {
                for (var j=0; j < slices; j++) {
                    var aa = [i*(slices+1)+j, i*(slices+1)+j+1, (i+1)*(slices+1)+j+1, (i+1)*(slices+1)+j];
                    // if (i%16==0) {
                    //     primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                    // }
                    // if (j%8==7) {
                    //     primitives.push({class:"line", text: "",
                    //                     arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]],
                    //                     arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]],
                    //                     rad:1,color:colorl});
                    // }
                    if (j==slices-1) {
                        primitives.push({class:"line", text: "",
                                        arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]],
                                        arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]],
                                        rad:1,color:colorl});
                    }
                    if (j==0 && k==0) {
                        primitives.push({class:"line", text: "",
                                        arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]],
                                        arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]],
                                        rad:1,color:colorl});
                    }
                }
            }
        }
    }
}
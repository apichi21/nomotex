var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: [0,0,0], movable: "free"});
}
function initDescr() {
    var descr = "";
    descr += '<h4>Векторное уравнение геликоида</h4>';
    descr += '<p>Уравнение поверхности геликоида (винтовой поверхности)\
              $$\\begin{cases} x = v \\cos{u} \\\\ y = v \\sin{u}, \\\\ z = h u.  \\end{cases}$$\
              можно представить в виде $$\\vec r = \\vec r_0(u)+v\\vec m(u)$$ \
              где $$\\begin{aligned} \\vec r_0(u) &= \\{0,0,hu\\} \\\\ \\vec m(u) &= \\{\\cos u, \\sin u, 0\\} \\end{aligned}$$</p>\
              <p>Измененяя только параметр $u$, получаем винтовые линии, принадлежащие геликоиду.</p>\
              <p>Измененяя только параметр $v$, получаем прямые, принадлежащие геликоиду.</p>';
    descr += '<label><input type="checkbox" checked onchange="isShowVectors = this.checked; initBuffers();"> Показывать $\\vec r$, $\\vec r_0$ и $\\vec m$</label>';
    var tIS = 5;
    descr += "<p>$h$ <input type='text' id='h' size='"+tIS+"'><br>";
    descr += "$u\\in$ [<input type='text' id='u1' size='"+tIS+"'>, <input type='text' id='u2' size='"+tIS+"'>]<br>";
    descr += "$v\\in$ [<input type='text' id='v1' size='"+tIS+"'>, <input type='text' id='v2' size='"+tIS+"'>]</p>";

    descr += '<label><input type="radio" name="g1" checked onchange="animType = 0; initBuffers();"> Изменять параметры $u$ и $v$</label>';
    descr += '<label><input type="radio" name="g1" onchange="animType = 1; initBuffers();"> Изменять параметр $u$</label>';
    descr += '<label><input type="radio" name="g1" onchange="animType = 2; initBuffers();"> Изменять параметр $v$</label>';
    descr += '<label><input type="checkbox" onchange="changeAnimate(this.checked);"> Анимация</label>';
    $("#description").html(descr);

    $("#h").change(function(event){
        h = parseFloat(this.value);
        initBuffers();
    });
    $("#u1").change(function(event){
        u1 = parseFloat(this.value);
        parameter = u1;
        initBuffers();
    });
    $("#u2").change(function(event){
        u2 = parseFloat(this.value);
        parameter = u1;
        initBuffers();
    });
    $("#v1").change(function(event){
        v1 = parseFloat(this.value);
        initBuffers();
    });
    $("#v2").change(function(event){
        v2 = parseFloat(this.value);
        initBuffers();
    });

    $("#h").val(parseFloat(h.toPrecision(3)));
    $("#u1").val(parseFloat(u1.toPrecision(3)));
    $("#u2").val(parseFloat(u2.toPrecision(3)));
    $("#v1").val(parseFloat(v1.toPrecision(3)));
    $("#v2").val(parseFloat(v2.toPrecision(3)));
    $("Title").html("Геликоид");
    scaleFactor = 0.55;
    dispY = -2.3;
}
var isAnimate = false;
var paramTimer;
var animStep = 0.005;
var animType = 0;
function changeAnimate(anim) {
    isAnimate = anim;

    if (anim) {
        points[0].movable = "fixed";
        parameter = u1;
        paramTimer = setInterval(function () {
            var tInterval = u2-u1;
            if (tInterval >= 0) {
                if (parameter + animStep*tInterval < u2) {
                    parameter += animStep*tInterval;
                } else {
                    parameter = u1;
                }
            } else {
                if (parameter + animStep*tInterval > u2) {
                    parameter += animStep*tInterval;
                } else {
                    parameter = u1;
                }
            }
            initBuffers();
        }, 20);
    } else {
        points[0].movable = "free";
        clearInterval(paramTimer);
        initBuffers();
    }
}
var parameter = 1;
var h = 0.4;
var u1= 0;
var u2= 12;
var v1= 0;
var v2= 2;
var isShowVectors = true;
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    isShowAxes = false;
    primitives.push({class:"point", text: "O", pos: "rt", arr0:[0,0,0], rad:4, color:[0.0, 0.0, 0.0, 1.0]});
    // primitives.push({class:"text", text: "x", arr0:[0,0,5]});
    // primitives.push({class:"text", text: "y", arr0:[5,0,0]});
    // primitives.push({class:"text", text: "z", arr0:[0,5,0]});

    var uMin, uMax;
    if (u1<u2) {
        uMin = u1;
        uMax = u2;
    } else {
        uMin = u2;
        uMax = u1;
    }
    var vMin, vMax;
    if (v1<v2) {
        vMin = v1;
        vMax = v2;
    } else {
        vMin = v2;
        vMax = v1;
    }
    if (vMin > 0) {
        vMin = 0;
    }
    if (vMin < 0) {
        vMin -= 1;
    }
    if (vMax > 0) {
        vMax += 1;
    }
    primitives.push({class:"text", text: "z", arr0:[0,h*uMax+1,0]});
    var vertices = [];
    var normals = [];
    var indices = [];
    var slicesU;
    var slicesV = 20;

    var colorp = [0.0, 0.8, 0.0, 1.0];
    var colorl = [0.0, 0.0, 0.0, 1.0];
    vertices[0] = [];
    normals[0] = [];

    if (isAnimate) {
        // var slicesU = Math.abs(Math.trunc((parameter-u1)*20))+1;
        slicesU = Math.abs(Math.trunc((u2-u1)*10))+1;
        var endU = false;
        for (var i = 0; i <= slicesU; i++) {
            var u = i/slicesU*(u2-u1) + u1;
            if (u >= parameter) {
                u = parameter;
                endU = true;
                slicesU = i;
            }
            for (var j = 0; j <= slicesV; j++) {
                var v = j/slicesV*(v2-v1) + v1;
                var px = v*Math.sin(u);
                var py = h*u;
                var pz = v*Math.cos(u);
                vertices[0].push( px, py, pz );
                normals[0].push( -h*Math.cos(u) );
                normals[0].push( v );
                normals[0].push( h*Math.sin(u) );
            }
            if (endU) break;
        }
    } else {
        slicesU = Math.abs(Math.trunc((u2-u1)*10))+1;
        for (var i = 0; i <= slicesU; i++) {
            var u = i/slicesU*(u2-u1) + u1;
            for (var j = 0; j <= slicesV; j++) {
                var v = j/slicesV*(v2-v1) + v1;
                var px = v*Math.sin(u);
                var py = h*u;
                var pz = v*Math.cos(u);
                vertices[0].push( px, py, pz );
                normals[0].push( -h*Math.cos(u) );
                normals[0].push( v );
                normals[0].push( h*Math.sin(u) );
            }
        }
        if (animType != 1) {
            primitives.push({class:"line", text: "", arr0:[v1*Math.sin(u2),h*u2,v1*Math.cos(u2)], arr1:[v2*Math.sin(u2),h*u2,v2*Math.cos(u2)], rad:1, color:colorl});
        }
    }

    if (animType != 1) {
        primitives.push({class:"line", text: "", arr0:[v1*Math.sin(u1),h*u1,v1*Math.cos(u1)], arr1:[v2*Math.sin(u1),h*u1,v2*Math.cos(u1)], rad:1, color:colorl});
    }
    primitives.push({class:"line", text: "", arr0:[0,h*uMin-1,0], arr1:[0,h*uMax+1,0], rad:1.5, color:colorl});
    primitives.push({class:"text", text: katex.renderToString("L"), arr0:[0,h*uMax,0]});


    var pointM = points[0].coord1;
    if (!isAnimate && arrPoint == pointM) {

        var slicesLineU = Math.abs(Math.trunc((u2-u1)*20))+1;
        var lineVertices = [];
        for (var i = 0; i <= slicesLineU; i++) {
            var u = i/slicesLineU*(u2-u1) + u1;
            var px = v2*Math.sin(u);
            var py = h*u;
            var pz = v2*Math.cos(u);
            lineVertices.push( [px, py, pz] );
        }
        var minLen;
        for (var i = 0; i < lineVertices.length; i++) {
            var vectorM0 = [];
            vec3.subtract(pointM, lineVertices[i], vectorM0);
            var len = vec3.length(vectorM0);
            if (minLen > len || (i==0)) {
                minLen = len;
                parameter = lineVertices[i][1]/h;
            }
        }
    }
    primitives.push({class:"line", text: katex.renderToString("l"), ratio: 1,
                     arr0:[vMin*Math.sin(parameter),h*parameter,vMin*Math.cos(parameter)],
                     arr1:[vMax*Math.sin(parameter),h*parameter,vMax*Math.cos(parameter)],
                     rad:1.6, color:colorl});
    vec3.set([v2*Math.sin(parameter),h*parameter,v2*Math.cos(parameter)], pointM);

    if (isShowVectors) {
        primitives.push({class:"arrow", text: katex.renderToString("\\vec r"), arr0:[0,0,0], arr1:pointM, rad:2, color:[0,1,0,1]});
        primitives.push({class:"arrow", text: katex.renderToString("\\vec r_0"), arr0:[0,0,0], arr1:[0,pointM[1],0], rad:2, color:[0,0,1,1]});
        var vectorM = [pointM[0], 0, pointM[2]];
        vec3.normalize(vectorM);
        vectorM[1] = pointM[1];
        primitives.push({class:"arrow", text: katex.renderToString("\\vec m"), arr0:[0,pointM[1],0], arr1:vectorM, rad:2, color:[1,0,0,1]});
    }
    primitives.push({class:"point", text: "M", arr0:pointM, rad:4, color:[1,0,0,1]});

    for (var k = 0; k < vertices.length; k++) {
        indices[k] = [];
        for (var i=0; i < slicesU; i++) {
            for (var j=0; j < slicesV; j++) {
                var aa = [i*(slicesV+1)+j, i*(slicesV+1)+j+1, (i+1)*(slicesV+1)+j+1, (i+1)*(slicesV+1)+j];
                indices[k].push(aa[0],aa[1],aa[2],aa[0],aa[2],aa[3]);
            }
        }
        if (!normals[k] || normals[k].length==0) {
            normals[k] = [];
            for (var i = 0; i <= slicesU; i++) {
                for (var j = 0; j <= slicesV; j++) {
                    normals[k].push( 0.0, 0.0, 0.0 );
                }
            }
        }
        if (animType == 0) {
            meshes.push({
                vertices:vertices[k],
                normals:normals[k],
                indices:indices[k],
                color:colorp,
                reinit:true
            });
        }
        for (var i=0; i < slicesU; i++) {
            for (var j=0; j < slicesV; j++) {
                var aa = [i*(slicesV+1)+j, i*(slicesV+1)+j+1, (i+1)*(slicesV+1)+j+1, (i+1)*(slicesV+1)+j];
                // if (animType != 1) {
                //     if (i==0) {
                //         primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                //     }
                //     if (i==slicesU-1) {
                //         primitives.push({class:"line", text: "", arr0:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
                //     }
                // }

                if (animType != 2) {
                    if (j==slicesV-1) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], rad:1, color:colorl});
                    }
                    if (j==0) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
                    }
                }

                if (animType == 1) {
                    if (j%4==3 && j<=slicesV-1) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], rad:1, color:colorl});
                    }
                }
                if (animType == 2) {
                    if (i%4==3) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
                    }
                }
            }
        }
        // for (var i=0; i < slicesU; i++) {
        //     for (var j=0; j < slicesV; j++) {
        //         var aa = [i*(slicesV+1)+j, i*(slicesV+1)+j+1, (i+1)*(slicesV+1)+j+1, (i+1)*(slicesV+1)+j];
        //         primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
        //         primitives.push({class:"line", text: "", arr0:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
        //         primitives.push({class:"line", text: "", arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], rad:1, color:colorl});
        //         primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
        //     }
        // }
    }
}
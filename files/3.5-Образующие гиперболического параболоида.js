var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    var descr = "";
    descr += '<p>Уравнение гиперболического параболоида:$$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=2pz$$</p>';
    var tIS = 5;
    descr += "<p>$a$<input type='text' id='a' size='"+tIS+"'> $b$<input type='text' id='b' size='"+tIS+"'> $p$<input type='text' id='p' size='"+tIS+"'></p>";

    descr += '<p>Гиперболический параболоид содержит два семейства прямолинейных образующих. </p><p>Он может быть образован движением прямых из первого \
              семейства вдоль прямых из второго. Аналогично эта поверхность может быть образована движением прямых второго семейства.</p><p> \
              Следовательно, гиперболический параболоид является <i>линейчатой поверхностью</i>.</p>';

    descr += '<p><label><input type="checkbox" checked onchange="isShow[0] = this.checked; initBuffers();"> Поверхность</label></p>';

    // descr += '<label><input type="radio" name="g2" onchange="changeAnimate(true, 1);"> Анимация - движение образующей</label>';
    // descr += '<label><input type="checkbox" onchange="isShow[0] = this.checked; initBuffers();"> Семейство параболических образующих 1</label></p>';
    // descr += '<label><input type="checkbox" onchange="isShow[1] = this.checked; initBuffers();"> Семейство параболических образующих 2</label></p>';
    descr += '<p><label><input type="checkbox" checked onchange="isShow[1] = this.checked; initBuffers();"> Семейство прямолинейных образующих 1</label>';
    descr += '<label><input type="checkbox" checked onchange="isShow[2] = this.checked; initBuffers();"> Семейство прямолинейных образующих 2</label></p>';

    descr += '<p><label><input type="radio" name="g1" checked onchange="changeAnimate(false, 0);"> Без анимации</label>';
    descr += '<label><input type="radio" name="g1" onchange="changeAnimate(true, 1);"> Анимация - движение образующей</label>';
    descr += '<label><input type="radio" name="g1" onchange="changeAnimate(true, 2);"> Анимация - поворот образующих</label></p>';

    $("#description").html(descr);
    $("#a").change(function(event){a = Math.abs(parseFloat(this.value));initBuffers();$("#a").val(parseFloat(a.toPrecision(3)));});
    $("#b").change(function(event){b = Math.abs(parseFloat(this.value));initBuffers();$("#b").val(parseFloat(b.toPrecision(3)));});
    $("#p").change(function(event){p0 = parseFloat(this.value);initBuffers();$("#p").val(parseFloat(p0.toPrecision(3)));});
    $("#a").val(parseFloat(a.toPrecision(3)));
    $("#b").val(parseFloat(b.toPrecision(3)));
    $("#p").val(parseFloat(p0.toPrecision(3)));
    $("Title").html("Гиперболический параболоид");
}
var isAnimate = false;
var paramTimer;
var animStep = 0.02;
var animType = 0;
var parameter = 0;
var isShow = [true, true, true];
function changeAnimate(anim, type) {
    isAnimate = anim;
    animType = type;
    if (animType == 1) {
        animStep = 0.004;
    } else {
        animStep = 0.002;
    }

    clearInterval(paramTimer);

    if (anim) {
        parameter = 0;
        paramTimer = setInterval(function () {
            if (parameter + animStep < 1) {
                parameter += animStep;
            } else {
                parameter = 0;
            }
            initBuffers();
        }, 20);
    } else {
        clearInterval(paramTimer);
        initBuffers();
    }
}
var a = 2;
var b = 2;
var p0 = 1;
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "x", arr0:[0,0,5]});
    primitives.push({class:"text", text: "y", arr0:[5,0,0]});
    primitives.push({class:"text", text: "z", arr0:[0,5,0]});
    var vertices = [];
    var indices = [];
    var normals = [];
    var lineVertices = [];
    var slicesU = 32;
    var slicesV = 32;
    var Rad = 2;

    vertices[0] = [];
    normals[0] = [];
// if (!isAnimate) {
//     for (var i = 0; i <= slicesU; i++) {
//         var u = (i/slicesU*2-1)*Rad;
//         for (var j = 0; j <= slicesV; j++) {
//             var v = (j/slicesV*2-1)*Rad;
//             var px = b*u;
//             var py = (v*v-u*u)/2/p;
//             var pz = a*v;
//             vertices[0].push( px, py, pz );
//             normals[0].push( -2*px/b/b );
//             normals[0].push( -2*p );
//             normals[0].push( 2*pz/a/a );
//         }
//     }
// }
    var c0 = 1/p0/2;
    var c;
    if (isAnimate && animType==2) {
        c = c0*Math.sin(parameter*2*Math.PI);
    } else {
        c = c0;
    }

    var point11 = [0, Rad*Rad*c, -a*Rad]; // u==0, v==-Rad
    var point12 = [ b*Rad, -Rad*Rad*c, 0]; // u==Rad, v==0

    var point21 = [-b*Rad, -Rad*Rad*c, 0]; // u==-Rad, v==0
    var point22 = [0, Rad*Rad*c,  a*Rad]; // u==0, v==Rad

    var point11 = [0, Rad*Rad*c, -a*Rad]; // u==0, v==-Rad
    var point12 = [ b*Rad, -Rad*Rad*c, 0]; // u==Rad, v==0

    var point21 = [-b*Rad, -Rad*Rad*c, 0]; // u==-Rad, v==0
    var point22 = [0, Rad*Rad*c,  a*Rad]; // u==0, v==Rad

    if (isAnimate && animType==1) {
        primitives.push({class:"line", text: "",
                        arr0:point11,
                        arr1:point12,
                        rad:2, color:[0,0,0,1]});

        primitives.push({class:"line", text: "",
                        arr0:point21,
                        arr1:point22,
                        rad:2, color:[0,0,0,1]});
    }
    var endU = false;
    for (var i = 0; i <= slicesU; i++) {
        var u = i/slicesU;

        if (isAnimate && animType==1) {
            if (u >= parameter) {
                u = parameter;
                endU = true;
                slicesU = i;
            }
        }

        var pointV1 = [];
        var pointV2 = [];
        for (var j = 0; j < 3; j++) {
            pointV1[j] = point11[j]*(1-u) + point12[j]*u;
            pointV2[j] = point21[j]*(1-u) + point22[j]*u;
        }

        for (var j = 0; j <= slicesV; j++) {
            var t = j/slicesV;
            var px = pointV1[0]*(1-t) + pointV2[0]*t;
            var py = pointV1[1]*(1-t) + pointV2[1]*t;
            var pz = pointV1[2]*(1-t) + pointV2[2]*t;
            vertices[0].push( px, py, pz );
            if (c!=0) {
                normals[0].push( -2*px/b/b );
                normals[0].push( -1/c );
                normals[0].push( 2*pz/a/a );
            } else {
                normals[0].push( 0 );
                normals[0].push( 1 );
                normals[0].push( 0 );
            }
        }
        if (endU) break;
    }

    var colorp = [0.0, 0.8, 0.0, 1.0];
    var colorl = [0.0, 0.0, 0.0, 1.0];
    for (var k = 0; k < vertices.length; k++) {
        indices[k] = [];
        for (var i=0; i < slicesU; i++) {
            for (var j=0; j < slicesV; j++) {
                var aa = [i*(slicesV+1)+j, i*(slicesV+1)+j+1, (i+1)*(slicesV+1)+j+1, (i+1)*(slicesV+1)+j];
                indices[k].push(aa[0],aa[1],aa[2],aa[0],aa[2],aa[3]);
            }
        }
        if (!normals[k]) {
            normals[k] = [];
            for (var i = 0; i <= slicesU; i++) {
                for (var j = 0; j <= slicesV; j++) {
                    normals[k].push( 0.0, 0.0, 1.0 );
                }
            }
        }
        if (isShow[0]) {
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
                // if (isAnimate) {
                    if (isShow[1]) {
                        if (i%4==0) {
                            primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                        }
                    } else {
                        if (i==0) {
                            primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                        }
                    }
                    if (animType==1) {
                        if (i==slicesU-1) {
                            primitives.push({class:"line", text: "", arr0:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:2, color:[0,0,1,1]});
                        }
                    } else {
                        if (i==slicesU-1) {
                            primitives.push({class:"line", text: "", arr0:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
                        }
                    }
                // }
                if (j==slicesV-1) {
                    primitives.push({class:"line", text: "",
                                    arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]],
                                    arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]],
                                    rad:1,color:colorl});
                }
                if (isShow[2]) {
                    if (j%4==0) {
                        primitives.push({class:"line", text: "",
                                        arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]],
                                        arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]],
                                        rad:1,color:colorl});
                    }
                } else {
                    if (j==0) {
                        primitives.push({class:"line", text: "",
                                        arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]],
                                        arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]],
                                        rad:1,color:colorl});
                    }
                }

            }
        }
    }
    // for (var j = 0; j < lineVertices.length; j++) {
    //     for (var i = 0; i < lineVertices[j].length-1; i++) {
    //         primitives.push({class:"line", text: "", arr0:lineVertices[j][i], arr1:lineVertices[j][i+1], rad:1, color:colorl});
    //     }
    // }
}
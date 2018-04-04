var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    var descr = "";
    descr += '<p>Уравнение гиперболического параболоида:$$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=2pz$$</p>';
    var tIS = 5;
    descr += "<p>$a$<input type='text' id='a' size='"+tIS+"'> $b$<input type='text' id='b' size='"+tIS+"'> $p$<input type='text' id='p' size='"+tIS+"'></p>";

    descr += '<p>Гиперболический параболоид может быть построен как след от скольжения одной параболы по другой.</p>';
    descr += '<p>Параболы находятся во взаимно перпендикулярных плоскостях, имеют одну точку касания (поэтому говорят - скольжение) \
              и одна из плоскостей перемещается параллельно самой себе.</p>';
    descr += '<p><label><input type="checkbox" checked onchange="isShow[0] = this.checked; initBuffers();"> Поверхность</label></p>';

    // descr += '<label><input type="radio" name="g2" onchange="changeAnimate(true, 1);"> Анимация - движение образующей</label>';
    // descr += '<label><input type="checkbox" onchange="isShow[0] = this.checked; initBuffers();"> Семейство параболических образующих 1</label></p>';
    // descr += '<label><input type="checkbox" onchange="isShow[1] = this.checked; initBuffers();"> Семейство параболических образующих 2</label></p>';
    descr += '<p><label><input type="checkbox" checked onchange="isShow[1] = this.checked; initBuffers();"> Семейство парабол 1</label>';
    descr += '<label><input type="checkbox" checked onchange="isShow[2] = this.checked; initBuffers();"> Семейство парабол 2</label></p>';

    descr += '<p><label><input type="radio" name="g1" checked onchange="changeAnimate(false, 0);"> Без анимации</label>';
    descr += '<label><input type="radio" name="g1" onchange="changeAnimate(true, 1);"> Анимация - движение образующей</label>';

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
    var slicesU = 32;
    var slicesV = 32;
    var Rad = 2;

    var c = 1/p0/2;

    if (isAnimate && animType==1) {
        var lineVertices = [];
        for (var i = 0; i <= slicesU; i++) {
            var u = (i/slicesU*2-1)*Rad;
            var px = b*u;
            var py = -u*u*c;
            var pz = 0;
            lineVertices.push( [px, py, pz] );
        }
        for (var i = 0; i < lineVertices.length-1; i++) {
            primitives.push({class:"line", text: "", arr0:lineVertices[i], arr1:lineVertices[i+1], rad:2, color:[0,0,0,1]});
        }
    }

    vertices[0] = [];
    normals[0] = [];

    var endU = false;
    for (var i = 0; i <= slicesU; i++) {
        var u = (i/slicesU*2-1)*Rad;

        if (isAnimate && animType==1) {
            if (u >= (parameter*2-1)*Rad) {
                u = (parameter*2-1)*Rad;
                endU = true;
                slicesU = i;
            }
        }

        for (var j = 0; j <= slicesV; j++) {
            var v = (j/slicesV*2-1)*Rad;
            var px = b*u;
            var py = (v*v-u*u)*c;
            var pz = a*v;
            vertices[0].push( px, py, pz );
            normals[0].push( -2*px/b/b );
            normals[0].push( -1/c );
            normals[0].push( 2*pz/a/a );
        }
        if (endU) break;
    }
    if (isAnimate && animType==1) {
        var planeCenter = [b*(parameter*2-1)*Rad, 0, 0];
        var planeSize = Rad*Math.sqrt(a*a+4*c*c);
        primitives.push({class:"plane", text: "",
                        arr0:[planeCenter[0], planeCenter[1]+planeSize, planeCenter[2]+planeSize],
                        arr1:[planeCenter[0], planeCenter[1]-planeSize, planeCenter[2]+planeSize],
                        arr2:[planeCenter[0], planeCenter[1]-planeSize, planeCenter[2]-planeSize],
                        arr3:[planeCenter[0], planeCenter[1]+planeSize, planeCenter[2]-planeSize],
                        color:[0,0,1,0.2]});
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
}
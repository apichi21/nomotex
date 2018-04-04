var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    var descr = "";

    descr += '<p>Уравнение конуса второго порядка:$$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}-\\frac{z^2}{c^2}=0$$</p>';
    var tIS = 5;
    descr += '<p>$a$<input type="text" id="a" size="'+tIS+'"> \
                 $b$<input type="text" id="b" size="'+tIS+'"> \
                 $c$<input type="text" id="c" size="'+tIS+'"></p>';
    descr += '<p>Конус второго порядка может быть образован вращением прямой, пересекающей его ось симметрии, вокруг этой оси.\
              Следовательно, конус второго порядка является <i>линейчатой поверхностью</i>.</p>';

    descr += '<p><label><input type="checkbox" checked onchange="isShow[0] = this.checked; initBuffers();"> Поверхность</label></p>';
    descr += '<p><label><input type="checkbox" checked onchange="isShow[1] = this.checked;initBuffers();"> Прямолинейные образующие</label></p>';
    descr += '<p><label><input type="radio" name="g1" checked onchange="changeAnimate(false, 0);"> Без анимации</label>';
    descr += '<label><input type="radio" name="g1" onchange="changeAnimate(true, 1);"> Анимация - вращение образующей</label></p>';
    $("#description").html(descr);
    $("#a").change(function(event){a0 = Math.abs(parseFloat(this.value));initBuffers();$("#a").val(parseFloat(a0.toPrecision(3)));});
    $("#b").change(function(event){b0 = Math.abs(parseFloat(this.value));initBuffers();$("#b").val(parseFloat(b0.toPrecision(3)));});
    $("#c").change(function(event){c0 = Math.abs(parseFloat(this.value));initBuffers();$("#c").val(parseFloat(c0.toPrecision(3)));});
    $("Title").html("Конус");

    $("#a").val(parseFloat(a0.toPrecision(3)));
    $("#b").val(parseFloat(b0.toPrecision(3)));
    $("#c").val(parseFloat(c0.toPrecision(3)));
}

var isAnimate = false;
var paramTimer;
var animStep = 0.02;
var animType = 0;
var parameter = 0;
var isShow = [true, true];
function changeAnimate(anim, type) {
    isAnimate = anim;
    animType = type;
    if (animType == 1) {
        animStep = 0.02;
    } else {
        animStep = 0.01;
    }

    clearInterval(paramTimer);

    if (anim) {
        parameter = 0;
        paramTimer = setInterval(function () {
            if (parameter + animStep < 2*Math.PI) {
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
var isShowHyp = false;

var a0 = 2;
var b0 = 2;
var c0 = 2;
function initData() {
    // isOrtho = false;
    // isShowAxes = false;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "x", arr0:[0,0,5]});
    primitives.push({class:"text", text: "y", arr0:[5,0,0]});
    primitives.push({class:"text", text: "z", arr0:[0,5,0]});

    var vertices = [];
    var indices = [];
    var normals = [];
    var colors = [];
    var slicesU = 64;
    var slices = 32;

    var paramBottom = -1.5;
    var paramTop = 1.5;
    var bottom = c0*Math.sinh(paramBottom);
    var top = c0*Math.sinh(paramTop);
    var divba = b0/a0;

    var vector1 = [];

    var colorl = [0.0, 0.0, 0.0, 1.0];
    var colorp = [0.0, 0.8, 0.0, 1.0];
    var colorp1 = [0.82, 0.82, 0.8, 1.0];

    var bottomRad = a0*Math.cosh(paramBottom);
    var centerRad = a0;
    var topRad = a0*Math.cosh(paramTop);

    var geoID = 0;
    vertices[geoID] = [];
    normals[geoID] = [];
    colors[geoID] = colorp;
    var endU = false;
    var deltau;
    if (isAnimate && animType==2) {
        deltau = (Math.sin(parameter)+1) * Math.PI - Math.PI;
        // deltau = parameter/2;
        a = bottomRad * Math.cos(deltau/2);
        b = a * divba;
        paramBottom = Math.acosh(bottomRad/a);
        c = bottom / Math.sinh(paramBottom);
    } else {
        a = a0;
        b = b0;
        c = c0;

        deltau = 2*Math.acos(a/bottomRad);
    }

    for (var i = 0; i <= slicesU; i++) {
        var psi = i/slicesU*2*Math.PI;
        if (isAnimate) {
            if (psi >= parameter) {
                psi = parameter;
                endU = true;
                slicesU = i;
            }
        }
        for (var j = 0; j <= slices; j++) {
            var phi = j/slices*(paramTop-paramBottom)+paramBottom;
            var py = b*phi*Math.cos(psi);
            var pz = c*phi;
            var px = a*phi*Math.sin(psi);
            vertices[0].push( py, pz, px );
            normals[0].push( 2*py/b/b );
            normals[0].push( -2*pz/c/c );
            normals[0].push( 2*px/a/a );
        }
        if (endU) break;
    }

    for (var k = 0; k < vertices.length; k++) {
        indices[k] = [];
        for (var i=0; i < slicesU; i++) {
            for (var j=0; j < slices; j++) {
                var aa = [i*(slices+1)+j, i*(slices+1)+j+1, (i+1)*(slices+1)+j+1, (i+1)*(slices+1)+j];
                indices[k].push(aa[0],aa[1],aa[2],aa[0],aa[2],aa[3]);
            }
        }
        if (!normals[k]) {
            normals[k] = [];
            for (var i = 0; i <= slicesU; i++) {
                for (var j = 0; j <= slices; j++) {
                    normals[k].push( 0.0, 0.0, 1.0 );
                }
            }
        }
        if (isShow[0]) {
            meshes.push({
                vertices:vertices[k],
                normals:normals[k],
                indices:indices[k],
                color:colors[k],
                reinit:true
            });
        }

        for (var i=0; i < slicesU; i++) {
            for (var j=0; j < slices; j++) {
                var aa = [i*(slices+1)+j, i*(slices+1)+j+1, (i+1)*(slices+1)+j+1, (i+1)*(slices+1)+j];
                // if (j%8==7) {
                //     primitives.push({class:"line", text: "",
                //                     arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]],
                //                     arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]],
                //                     rad:1,color:colorl});
                // }

                if (isAnimate) {
                    if (isShow[1]) {
                        if (i%4==0) {
                            primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                        }
                    } else {
                        if (i==0) {
                            primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                        }
                    }
                    if (i==slicesU-1) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:2, color:[0,0,1,1]});
                    }
                } else {
                    if (isShow[1]) {
                        if (i%4==0) {
                            primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                        }
                        if (i==slicesU-1) {
                            primitives.push({class:"line", text: "", arr0:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
                        }
                    }
                }
                if (j==slices-1) {
                    primitives.push({class:"line", text: "",
                                    arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]],
                                    arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]],
                                    rad:1,color:colorl});
                }
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
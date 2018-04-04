var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: [0,0,0], movable: "free"});
}
function initDescr() {
    var descr = "";
    descr += '<p>Геликоид - винтовая поверхность, образованная вращением прямой $l$ вокруг перпендикулярной к ней оси $Oz=L$ и \
              одновременно поступательно движущейся в направлении этой оси $Oz,$ причём скорости вращения и поступательного движения \
              пропорциональны.</p>';
    descr += '<p>Уравнение геликоида: $$x \\operatorname{tg} \\left ( \\frac{z}{h} \\right ) = y, \\quad h=const$$</p>';
    descr += '<p>Это уравнение можно представить в параметрическом виде. \
              $$\\begin{cases} x = v \\cos{u} \\\\ y = v \\sin{u}, \\\\ z = h u. \\end{cases}$$\
              где $u$ и $v$ - параметры поверхности (переменные величины)</p>';

    var tIS = 5;
    descr += "<p>$h$ <input type='text' id='h' size='"+tIS+"'><br>";
    descr += "$u\\in$ [<input type='text' id='u1' size='"+tIS+"'>, <input type='text' id='u2' size='"+tIS+"'>]<br>";
    descr += "$v\\in$ [<input type='text' id='v1' size='"+tIS+"'>, <input type='text' id='v2' size='"+tIS+"'>]</p>";
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
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    isShowAxes = false;
    primitives.push({class:"text", text: "O", pos: "rt", arr0:[0,0,0]});
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
    primitives.push({class:"text", text: "z", arr0:[0,h*uMax+1,0]});
    var vertices = [];
    var normals = [];
    var indices = [];
    // var slicesU = 320;
    var slicesV = 32;

    var colorp = [0.0, 0.8, 0.0, 1.0];
    var colorl = [0.0, 0.0, 0.0, 1.0];
    vertices[0] = [];
    normals[0] = [];

    if (isAnimate) {
        var slicesU = Math.abs(Math.trunc((parameter-u1)*20))+1;

        for (var i = 0; i <= slicesU; i++) {
            var u = i/slicesU*(parameter-u1) + u1;
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
        primitives.push({class:"line", text: katex.renderToString("l"), ratio: 0.8,
                         arr0:[vMin*Math.sin(parameter),h*parameter,vMin*Math.cos(parameter)],
                         arr1:[vMax*Math.sin(parameter),h*parameter,vMax*Math.cos(parameter)],
                         rad:2, color:colorl});
    } else {
        var slicesU = Math.abs(Math.trunc((u2-u1)*20))+1;
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
        primitives.push({class:"line", text: "", arr0:[v1*Math.sin(u2),h*u2,v1*Math.cos(u2)], arr1:[v2*Math.sin(u2),h*u2,v2*Math.cos(u2)], rad:1, color:colorl});
    }
    primitives.push({class:"line", text: "", arr0:[v1*Math.sin(u1),h*u1,v1*Math.cos(u1)], arr1:[v2*Math.sin(u1),h*u1,v2*Math.cos(u1)], rad:1, color:colorl});

    primitives.push({class:"line", text: "", arr0:[0,h*uMin-1,0], arr1:[0,h*uMax+1,0], rad:2, color:colorl});
    primitives.push({class:"text", text: katex.renderToString("L"), arr0:[0,h*uMax,0]});

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
        meshes.push({
            vertices:vertices[k],
            normals:normals[k],
            indices:indices[k],
            color:colorp,
            reinit:true
        });
        for (var i=0; i < slicesU; i++) {
            for (var j=0; j < slicesV; j++) {
                var aa = [i*(slicesV+1)+j, i*(slicesV+1)+j+1, (i+1)*(slicesV+1)+j+1, (i+1)*(slicesV+1)+j];
                if (i==0) {
                    primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                }
                if (i==slicesU-1) {
                    primitives.push({class:"line", text: "", arr0:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
                }

                if (j==slicesV-1) {
                    primitives.push({class:"line", text: "", arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], rad:1, color:colorl});
                }
                if (j==0) {
                    primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
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
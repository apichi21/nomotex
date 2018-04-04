var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: [0,0,0], movable: "free"});
}
function initDescr() {
    var descr = "";
    descr += '<h4>Цилиндрическая поверхность</h4>';
    descr += '<p>$$\\begin{cases} x = a \\cos{u} \\\\ y = a \\sin{u}, \\\\ z = b v. \\end{cases}$$</p>';

    var tIS = 5;
    descr += "<p>$a$ <input type='text' id='a' size='"+tIS+"'><br>";
    descr += "$b$ <input type='text' id='b' size='"+tIS+"'><br>";
    descr += "$v\\in$ [<input type='text' id='v1' size='"+tIS+"'>, <input type='text' id='v2' size='"+tIS+"'>]</p>";
    $("#description").html(descr);

    $("#a").change(function(event){
        a = parseFloat(this.value);
        initBuffers();
    });
    $("#b").change(function(event){
        b = parseFloat(this.value);
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

    $("#a").val(parseFloat(a.toPrecision(3)));
    $("#b").val(parseFloat(b.toPrecision(3)));
    $("#v1").val(parseFloat(v1.toPrecision(3)));
    $("#v2").val(parseFloat(v2.toPrecision(3)));
    $("Title").html("Параметрические уравнения поверхности");
}

var a = 2;
var b = 3;
var v1= -1;
var v2= 1;
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    // isShowAxes = false;
    // primitives.push({class:"text", text: "O", pos: "rt", arr0:[0,0,0]});
    primitives.push({class:"text", text: "x", arr0:[0,0,5]});
    primitives.push({class:"text", text: "y", arr0:[5,0,0]});
    primitives.push({class:"text", text: "z", arr0:[0,5,0]});

    var vMin, vMax;
    if (v1<v2) {
        vMin = v1;
        vMax = v2;
    } else {
        vMin = v2;
        vMax = v1;
    }

    var vertices = [];
    var normals = [];
    var indices = [];
    var slicesU = 64;
    var slicesV = 1;

    var colorp = [0.0, 0.8, 0.0, 1.0];
    var colorl = [0.0, 0.0, 0.0, 1.0];
    vertices[0] = [];
    normals[0] = [];

    for (var i = 0; i <= slicesU; i++) {
        var u = i/slicesU*2*Math.PI;
        for (var j = 0; j <= slicesV; j++) {
            var v = j/slicesV*(v2-v1) + v1;
            var px = a*Math.sin(u);
            var py = b*v;
            var pz = a*Math.cos(u);
            vertices[0].push( px, py, pz );
            normals[0].push( Math.sin(u) );
            normals[0].push( 0 );
            normals[0].push( Math.cos(u) );
        }
    }

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
                if (i%16==0) {
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
    }
}
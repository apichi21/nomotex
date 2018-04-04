var dimention="3d";
function initPoints() {
    points = [];
}
var C;
function initDescr() {
    var descr = "";
    descr += '<label><input type="radio" name="group1" checked onchange="changeOXYZ(1)"> Эллиптический цилиндр</label>';
    descr += '<label><input type="radio" name="group1" onchange="changeOXYZ(2)"> Гиперболический цилиндр</label>';
    descr += '<label><input type="radio" name="group1" onchange="changeOXYZ(3)"> Параболический цилиндр</label>';
    $("#description").html(descr);
    $("Title").html("Цилиндр");
}
var showOXYZ = 1;
function changeOXYZ(n) {
    showOXYZ = n;
    initBuffers();
}
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "x", arr0:[0,0,5]});
    primitives.push({class:"text", text: "y", arr0:[5,0,0]});
    primitives.push({class:"text", text: "z", arr0:[0,5,0]});
    var pi2 = 2.0*Math.PI;
    var vertices = [];
    var normals = [];
    var indices = [];
    var slices1 = 32;
    var slices = 2;
    var Rad = 1;
    if (showOXYZ==1) {
        slices1 = 32;
        var a = 2*Rad;
        var b = 3*Rad;

        vertices[0] = [];
        normals[0] = [];
        for (var i = 0; i <= slices1; i++) {
            var psi = i*pi2/slices1;
            for (var j = 0; j <= slices; j++) {
                var phi = j/slices;
                var px = b*Math.cos(psi);
                var py = (phi-0.5)*6;
                var pz = a*Math.sin(psi);
                vertices[0].push( px, py, pz );
                normals[0].push( 2*px/b/b );
                normals[0].push( 0 );
                normals[0].push( 2*pz/a/a );
            }
        }
    } else if (showOXYZ==2) {
        slices1 = 16;
        var a = 2*Rad;
        var b = 3*Rad;

        vertices[0] = [];
        normals[0] = [];
        vertices[1] = [];
        normals[1] = [];
        for (var i = 0; i <= slices1; i++) {
            var psi = (i/slices1-0.5)*3;
            for (var j = 0; j <= slices; j++) {
                var phi = j/slices;
                var px = b*Math.cosh(psi);
                var py = (phi-0.5)*6;
                var pz = a*Math.sinh(psi);
                vertices[0].push( px, py, pz );
                normals[0].push( -2*px/b/b );
                normals[0].push( 0 );
                normals[0].push( 2*pz/a/a );

                vertices[1].push( -px, py, pz );
                normals[1].push( 2*px/b/b );
                normals[1].push( 0 );
                normals[1].push( 2*pz/a/a );
            }
        }
    } else if (showOXYZ==3) {
        slices1 = 16;
        var p = 0.5;

        vertices[0] = [];
        normals[0] = [];
        for (var i = 0; i <= slices1; i++) {
            var psi = (i/slices1-0.5)*4;
            for (var j = 0; j <= slices; j++) {
                var phi = j/slices;
                var px = psi*psi/2/p;
                var py = (phi-0.5)*6;
                var pz = psi;
                vertices[0].push( px, py, pz );
                normals[0].push( -1 );
                normals[0].push( 0 );
                normals[0].push( pz/p );
            }
        }
    }

    var colorp = [0.0, 0.8, 0.0, 1.0];
    var colorl = [0.0, 0.0, 0.0, 1.0];
    for (var k = 0; k < vertices.length; k++) {
        indices[k] = [];
        for (var i=0; i < slices1; i++) {
            for (var j=0; j < slices; j++) {
                var aa = [i*(slices+1)+j, i*(slices+1)+j+1, (i+1)*(slices+1)+j+1, (i+1)*(slices+1)+j];
                indices[k].push(aa[0],aa[1],aa[2],aa[0],aa[2],aa[3]);
            }
        }
        if (!normals[k] || normals[k].length==0) {
            normals[k] = [];
            for (var i = 0; i <= slices1; i++) {
                for (var j = 0; j <= slices; j++) {
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
        for (var i=0; i < slices1; i++) {
            for (var j=0; j < slices; j++) {
                var aa = [i*(slices+1)+j, i*(slices+1)+j+1, (i+1)*(slices+1)+j+1, (i+1)*(slices+1)+j];
                if (i%4==0) {
                    primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                }
                if (i==slices1-1) {
                    primitives.push({class:"line", text: "", arr0:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
                }

                if (j==slices-1) {
                    primitives.push({class:"line", text: "", arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], rad:1, color:colorl});
                }
                primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
            }
        }
        // for (var i=0; i < slices1; i++) {
        //     for (var j=0; j < slices; j++) {
        //         var aa = [i*(slices+1)+j, i*(slices+1)+j+1, (i+1)*(slices+1)+j+1, (i+1)*(slices+1)+j];
        //         primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
        //         primitives.push({class:"line", text: "", arr0:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
        //         primitives.push({class:"line", text: "", arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], rad:1, color:colorl});
        //         primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
        //     }
        // }
    }
}
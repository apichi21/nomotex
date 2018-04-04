var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    var descr = "Поверхность, полученная в результате вращения вокруг оси Oz кривой $z=a\\sqrt{x}$, определенной при $x \\geqslant 0$";

    var tIS = 5;
    descr += "<p>$a =$ <input type='text' id='a' size='"+tIS+"'></p>";

    $("#description").html(descr);
    $("#a").change(function(event){a = Math.abs(parseFloat(this.value));initBuffers();});
    $("Title").html("Поверхность вращения");
    // f(x,y,z) = x^2-y^4+z^2
}
var a = 1;
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "x", arr0:[0,0,5]});
    primitives.push({class:"text", text: "y", arr0:[5,0,0]});
    primitives.push({class:"text", text: "z", arr0:[0,5,0]});
    var pi2 = 2.0*Math.PI;
    $("#a").val(parseFloat(a.toPrecision(3)));

    var slices1 = 32;
    var slices = 16;
    var vertices = [];
    var normals = [];
    var indices = [];

    vertices[0] = [];
    normals[0] = [];
    for (var i = 0; i <= slices1; i++) {
        var psi = i*pi2/slices1;
        for (var j = 0; j <= slices; j++) {
            var phi = j/slices*1.5;
            var px = -phi*phi*Math.cos(psi);
            var py = a*phi;
            var pz = -phi*phi*Math.sin(psi);
            vertices[0].push( px, py, pz );
            normals[0].push( -a*Math.cos(psi), -2*phi, -a*Math.sin(psi) );
            // normals[0].push( -lineDerivatives[k][i][1]*Math.cos(psi), lineDerivatives[k][i][0], -lineDerivatives[k][i][1]*Math.sin(psi) );
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
            color:colorp,
            reinit:true
        });
        for (var i=0; i < slices1; i++) {
            for (var j=0; j < slices; j++) {
                var aa = [i*(slices+1)+j, i*(slices+1)+j+1, (i+1)*(slices+1)+j+1, (i+1)*(slices+1)+j];
                if (i%8==0) {
                    primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                }
                if (j%8==7) {
                    primitives.push({class:"line", text: "", arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], rad:1, color:colorl});
                }
                // if (j==0) {
                //     primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
                // }
            }
        }
    }
}
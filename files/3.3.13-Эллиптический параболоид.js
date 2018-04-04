var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    var descr = "";
    descr += '<p>Уравнение эллиптического параболоида:$$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}=2pz$$</p>';
    var tIS = 5;
    descr += "<p>$a$<input type='text' id='a' size='"+tIS+"'> $b$<input type='text' id='b' size='"+tIS+"'> $p$<input type='text' id='p' size='"+tIS+"'></p>";
    $("#description").html(descr);
    $("#a").change(function(event){a = Math.abs(parseFloat(this.value));initBuffers();});
    $("#b").change(function(event){b = Math.abs(parseFloat(this.value));initBuffers();});
    $("#p").change(function(event){p = Math.abs(parseFloat(this.value));initBuffers();});
    $("Title").html("Эллиптический параболоид");
}
var a = 1.5;
var b = 2;
var p = 0.5;
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
    primitives.push({class:"text", text: "x", arr0:[0,0,5]}); 
    primitives.push({class:"text", text: "y", arr0:[5,0,0]}); 
    primitives.push({class:"text", text: "z", arr0:[0,5,0]}); 
    $("#a").val(parseFloat(a.toPrecision(3)));
    $("#b").val(parseFloat(b.toPrecision(3)));
    $("#p").val(parseFloat(p.toPrecision(3)));

    var Rad = 2;
    var vertices = [];
    var indices = [];
    var normals = [];
    var lineVertices = [];
    var slices1 = 32*2;
    var slices = 16*2;
    var angle = 2*Math.PI;

    vertices[0] = [];
    normals[0] = [];
    for (var i = 0; i <= slices1; i++) {
        var psi = i*angle/slices1;
        for (var j = 0; j <= slices; j++) {
            var phi = j/slices*Rad;
            var px = b*phi *Math.cos(psi);
            var py = phi*phi/2/p;
            var pz = a*phi *Math.sin(psi);
            vertices[0].push( px, py, pz );
            normals[0].push( 2*px/b/b );
            normals[0].push( -2*p );
            normals[0].push( 2*pz/a/a );
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
                if (i%16==0) {
                    primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                }
                if (j%16==15) {
                    primitives.push({class:"line", text: "", arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], rad:1, color:colorl});
                }
                // if (j==0) {
                //     primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
                // }
            }
        }
    }
}
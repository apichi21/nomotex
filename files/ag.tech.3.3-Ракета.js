var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    var descr = '';
    descr += '<h4>Обтекатель</h4>';
    descr += '<p>Большинство ракет-носителей имеют переднюю часть (обтекатель) в форме конуса (составного конуса), \
              заканчивающегося сферической частью</p>';
    descr += '<label><input type="radio" name="g1" checked onchange="isShow=0; isShowAxes=!this.checked;initBuffers();"> Ракета</label>';
    descr += '<label><input type="radio" name="g1" onchange="isShow=1; isShowAxes=this.checked;initBuffers();"> Головной конический обтекатель</label>';
    descr += '<label><input type="radio" name="g1" onchange="isShow=2; isShowAxes=this.checked;initBuffers();"> Носовая сфера</label>';
    $("#description").html(descr);
    $("Title").html("Ракета");
}
var isShow = 0;
function initData() {
    isShowAxes = false;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    // primitives.push({class:"text", text: "x", arr0:[0,0,5]});
    // primitives.push({class:"text", text: "y", arr0:[5,0,0]});
    // primitives.push({class:"text", text: "z", arr0:[0,5,0]});

    var colorp = [0.9, 0.9, 0.9, 1.0];
    var colorp1 = [0.3, 0.6, 1.0, 1.0];
    var colorl = [0.0, 0.0, 0.0, 1.0];

    var vertices = [];
    var indices = [];
    var normals = [];
    var slices = [];
    var colors = [];
    var angle = 2*Math.PI;
    var a = 1;
    var b = 6;

    var mnum = 0;

    // if (isShow==0) {
        vertices[mnum] = []; //тело цилиндр
        normals[mnum] = [];
        slices[mnum] = [64, 1];
        colors[mnum] = colorp;
        for (var i = 0; i <= slices[mnum][0]; i++) {
            var psi = i*angle/slices[mnum][0];
            for (var j = 0; j <= slices[mnum][1]; j++) {
                var phi = j/slices[mnum][1]*2-1;
                var px = b*phi;
                var py = a*Math.cos(psi);
                var pz = a*Math.sin(psi);
                vertices[mnum].push( px, py, pz );
                normals[mnum].push( 0 );
                normals[mnum].push( py );
                normals[mnum].push( pz );
            }
        }
        mnum++;

        vertices[mnum] = []; //тело круг
        normals[mnum] = [];
        slices[mnum] = [64, 1];
        colors[mnum] = colorp;
        for (var i = 0; i <= slices[mnum][0]; i++) {
            var psi = i*angle/slices[mnum][0];
            for (var j = 0; j <= slices[mnum][1]; j++) {
                var phi = j/slices[mnum][1];
                var px = -b;
                var py = phi*a*Math.cos(psi);
                var pz = phi*a*Math.sin(psi);
                vertices[mnum].push( px, py, pz );
                normals[mnum].push( 1 );
                normals[mnum].push( 0 );
                normals[mnum].push( 0 );
            }
        }
        mnum++;

        vertices[mnum] = []; //сопло параболоид
        normals[mnum] = [];
        slices[mnum] = [64, 32];
        colors[mnum] = colorp;
        var parA = 1.4;
        var parB = 0.7;
        for (var i = 0; i <= slices[mnum][0]; i++) {
            var psi = i*angle/slices[mnum][0];
            for (var j = 0; j <= slices[mnum][1]; j++) {
                var phi = j/slices[mnum][1];
                var px = -phi*phi*parA;
                var py = parB*phi*Math.cos(psi);
                var pz = parB*phi*Math.sin(psi);
                vertices[mnum].push( px-b+0.3, py, pz );
                normals[mnum].push( 1/parA  );
                normals[mnum].push( 2*py/parB/parB );
                normals[mnum].push( 2*pz/parB/parB );
            }
        }
        mnum++;
    // }

    if (isShow==1) {
        colors[mnum] = colorp1;
    } else {
        colors[mnum] = colorp;
    }

    vertices[mnum] = []; //нос конус
    normals[mnum] = [];
    slices[mnum] = [64, 1];
    for (var i = 0; i <= slices[mnum][0]; i++) {
        var psi = i*angle/slices[mnum][0];
        for (var j = 0; j <= slices[mnum][1]; j++) {
            var phi = j/slices[mnum][1]*0.8;
            var px = 2*a*phi;
            var py = (1-phi)*a*Math.cos(psi);
            var pz = (1-phi)*a*Math.sin(psi);
            vertices[mnum].push( px+b, py, pz );
            normals[mnum].push( 1 );
            normals[mnum].push( 2*Math.cos(psi) );
            normals[mnum].push( 2*Math.sin(psi) );
        }
    }
    mnum++;

    // if (isShow==0) {
    //     vertices[mnum] = [];
    //     normals[mnum] = [];
    //     slices[mnum] = [64, 1];
    //     colors[mnum] = colorp;
    //     for (var i = 0; i <= slices[mnum][0]; i++) {
    //         var psi = i*angle/slices[mnum][0];
    //         for (var j = 0; j <= slices[mnum][1]; j++) {
    //             var phi = j/slices[mnum][1]*0.8;
    //             var px = 2*a*phi;
    //             var py = (1-phi)*a*Math.cos(psi);
    //             var pz = (1-phi)*a*Math.sin(psi);
    //             vertices[mnum].push( px+b, py, pz );
    //             normals[mnum].push( 1 );
    //             normals[mnum].push( 2*Math.cos(psi) );
    //             normals[mnum].push( 2*Math.sin(psi) );
    //         }
    //     }
    //     mnum++;
    // } else if (isShow==1) {
    //     vertices[mnum] = [];
    //     normals[mnum] = [];
    //     slices[mnum] = [64, 1];
    //     colors[mnum] = colorp1;
    //     for (var i = 0; i <= slices[mnum][0]; i++) {
    //         var psi = i*angle/slices[mnum][0];
    //         for (var j = 0; j <= slices[mnum][1]; j++) {
    //             var phi = j/slices[mnum][1];
    //             var px = 2*a*phi;
    //             var py = (1-phi)*a*Math.cos(psi);
    //             var pz = (1-phi)*a*Math.sin(psi);
    //             vertices[mnum].push( px+b, py, pz );
    //             normals[mnum].push( 1 );
    //             normals[mnum].push( 2*Math.cos(psi) );
    //             normals[mnum].push( 2*Math.sin(psi) );
    //         }
    //     }
    //     mnum++;
    // }

    if (isShow==2) {
        colors[mnum] = colorp1;
    } else {
        colors[mnum] = colorp;
    }
    vertices[mnum] = []; //нос сфера
    normals[mnum] = [];
    slices[mnum] = [64, 32];
    for (var i = 0; i <= slices[mnum][0]; i++) {
        var psi = i*angle/slices[mnum][0];
        for (var j = 0; j <= slices[mnum][1]; j++) {
            var phi = j/slices[mnum][1]*Math.atan(2/1);
            var rad = 0.2*a*Math.sqrt(1*1+1/2*1/2);
            var px = rad*Math.cos(phi);
            var py = rad*Math.sin(phi)*Math.cos(psi);
            var pz = rad*Math.sin(phi)*Math.sin(psi);
            vertices[mnum].push( px+b+2*a*0.8-0.2*a/2, py, pz );
            normals[mnum].push( px );
            normals[mnum].push( py );
            normals[mnum].push( pz );
        }
    }
    mnum++;

    // if (isShow==0) {
    //     vertices[mnum] = [];
    //     normals[mnum] = [];
    //     slices[mnum] = [64, 32];
    //     colors[mnum] = colorp;
    //     for (var i = 0; i <= slices[mnum][0]; i++) {
    //         var psi = i*angle/slices[mnum][0];
    //         for (var j = 0; j <= slices[mnum][1]; j++) {
    //             var phi = j/slices[mnum][1]*Math.atan(2/1);
    //             var rad = 0.2*a*Math.sqrt(1*1+1/2*1/2);
    //             var px = rad*Math.cos(phi);
    //             var py = rad*Math.sin(phi)*Math.cos(psi);
    //             var pz = rad*Math.sin(phi)*Math.sin(psi);
    //             vertices[mnum].push( px+b+2*a*0.8-0.2*a/2, py, pz );
    //             normals[mnum].push( px );
    //             normals[mnum].push( py );
    //             normals[mnum].push( pz );
    //         }
    //     }
    //     mnum++;
    // } else if (isShow==2) {
    //     vertices[mnum] = [];
    //     normals[mnum] = [];
    //     slices[mnum] = [64, 32];
    //     colors[mnum] = colorp1;
    //     for (var i = 0; i <= slices[mnum][0]; i++) {
    //         var psi = i*angle/slices[mnum][0];
    //         for (var j = 0; j <= slices[mnum][1]; j++) {
    //             var phi = j/slices[mnum][1]*Math.PI;
    //             var rad = 0.2*a*Math.sqrt(1*1+1/2*1/2);
    //             var px = rad*Math.cos(phi);
    //             var py = rad*Math.sin(phi)*Math.cos(psi);
    //             var pz = rad*Math.sin(phi)*Math.sin(psi);
    //             vertices[mnum].push( px+b+2*a*0.8-0.2*a/2, py, pz );
    //             normals[mnum].push( px );
    //             normals[mnum].push( py );
    //             normals[mnum].push( pz );
    //         }
    //     }
    //     mnum++;
    // }

    for (var k = 0; k < vertices.length; k++) {
        indices[k] = [];
        for (var i=0; i < slices[k][0]; i++) {
            for (var j=0; j < slices[k][1]; j++) {
                var aa = [i*(slices[k][1]+1)+j, i*(slices[k][1]+1)+j+1, (i+1)*(slices[k][1]+1)+j+1, (i+1)*(slices[k][1]+1)+j];
                indices[k].push(aa[0],aa[1],aa[2],aa[0],aa[2],aa[3]);
            }
        }
        if (!normals[k]) {
            normals[k] = [];
            for (var i = 0; i <= slices[k][0]; i++) {
                for (var j = 0; j <= slices[k][1]; j++) {
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
        // if (isShow != 0) {
            for (var i=0; i < slices[k][0]; i++) {
                for (var j=0; j < slices[k][1]; j++) {
                    var aa = [i*(slices[k][1]+1)+j, i*(slices[k][1]+1)+j+1, (i+1)*(slices[k][1]+1)+j+1, (i+1)*(slices[k][1]+1)+j];
                    if (i%16==0) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                    }
                    // if (j%16==15) {
                    //     primitives.push({class:"line", text: "", arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], rad:1, color:colorl});
                    // }
                    if (j==slices[k][1]-1) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], rad:1, color:colorl});
                    }
                    if (j==0) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
                    }
                }
            }
        // }
    }
}
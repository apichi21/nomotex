var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    var descr = '';
    descr += '<h4>Дирижабль</h4>';
    descr += '<p>Некоторые типы дирижаблей имеют эллипсоидальную форму</p>';
    descr += '<label><input type="radio" name="g1" checked onchange="isShowEll=!this.checked; isShowAxes=!this.checked;initBuffers();"> Дирижабль</label>';
    descr += '<label><input type="radio" name="g1" onchange="isShowEll=this.checked; isShowAxes=this.checked;initBuffers();"> Эллипсоидальный корпус</label>';

    $("#description").html(descr);
    $("Title").html("Дирижабль");
    isShowAxes = false;
    axisLen = 7;
    axisDashStep = 1;
    rotAngY = -75;
}
var isShowEll = false;
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    if (isShowAxes) {
        primitives.push({class:"text", text: "x", arr0:[0,0,axisLen]});
        primitives.push({class:"text", text: "y", arr0:[axisLen,0,0]});
        primitives.push({class:"text", text: "z", arr0:[0,axisLen,0]});
    }

    var vertices = [];
    var indices = [];
    var normals = [];
    var lineVertices = [];
    var slices1 = 64;
    var slices = 32;
    var angle = 2*Math.PI;

    var mnum = 0;

    var a = 6;
    var b = 2;
    var c = 2;

    vertices[mnum] = [];
    normals[mnum] = [];
    for (var i = 0; i <= slices1; i++) {
        var psi = i*angle/slices1;
        for (var j = 0; j <= slices; j++) {
            var phi = j*Math.PI/slices;
            var px = b*Math.sin(phi)*Math.cos(psi);
            var py = c*Math.cos(phi);
            var pz = a*Math.sin(phi)*Math.sin(psi);
            vertices[mnum].push( px, py, pz );
            normals[mnum].push( 2*px/b/b );
            normals[mnum].push( 2*py/c/c );
            normals[mnum].push( 2*pz/a/a );
        }
    }
    mnum++;

    if (!isShowEll) {
        vertices[mnum] = [];
        normals[mnum] = [];
        for (var i = 0; i <= slices1; i++) {
            var psi = i/slices1;
            for (var j = 0; j <= slices; j++) {
                var phi = j/slices*2-1;
                var px = 0.5;
                var py = psi;
                var pz = phi*(1+psi*0.5);
                vertices[mnum].push( px, py-c-0.5, pz );
                normals[mnum].push( 1 );
                normals[mnum].push( 0 );
                normals[mnum].push( 0 );
            }
        }
        mnum++;

        vertices[mnum] = [];
        normals[mnum] = [];
        for (var i = 0; i <= slices1; i++) {
            var psi = i/slices1;
            for (var j = 0; j <= slices; j++) {
                var phi = j/slices*2-1;
                var px = -0.5;
                var py = psi;
                var pz = phi*(1+psi*0.5);
                vertices[mnum].push( px, py-c-0.5, pz );
                normals[mnum].push( 1 );
                normals[mnum].push( 0 );
                normals[mnum].push( 0 );
            }
        }
        mnum++;

        vertices[mnum] = [];
        normals[mnum] = [];
        for (var i = 0; i <= slices1; i++) {
            var psi = i/slices1-0.5;
            for (var j = 0; j <= slices; j++) {
                var phi = j/slices*2-1;
                var px = psi;
                var py = 0;
                var pz = phi;
                vertices[mnum].push( px, py-c-0.5, pz );
                normals[mnum].push( 0 );
                normals[mnum].push( 1 );
                normals[mnum].push( 0 );
            }
        }
        mnum++;

        vertices[mnum] = [];
        normals[mnum] = [];
        for (var i = 0; i <= slices1; i++) {
            var psi = i/slices1;
            for (var j = 0; j <= slices; j++) {
                var phi = j/slices-0.5;
                var px = phi;
                var py = psi;
                var pz = 1+psi*0.5;
                vertices[mnum].push( px, py-c-0.5, pz );
                normals[mnum].push( 0 );
                normals[mnum].push( -1 );
                normals[mnum].push( 2 );
            }
        }
        mnum++;

        vertices[mnum] = [];
        normals[mnum] = [];
        for (var i = 0; i <= slices1; i++) {
            var psi = i/slices1;
            for (var j = 0; j <= slices; j++) {
                var phi = j/slices-0.5;
                var px = phi;
                var py = psi;
                var pz = -1-psi*0.5;
                vertices[mnum].push( px, py-c-0.5, pz );
                normals[mnum].push( 0 );
                normals[mnum].push( -1 );
                normals[mnum].push( -2 );
            }
        }
        mnum++;

        vertices[mnum] = [];
        normals[mnum] = [];
        for (var i = 0; i <= slices1; i++) {
            var psi = i/slices1;
            for (var j = 0; j <= slices; j++) {
                var phi = (j/slices-1)*2;
                var px = 0;
                var py = psi*2+c+1;
                var pz = -phi*(1-psi*0.5)-a+0.2;
                vertices[mnum].push( px, py-c-0.5, pz );
                normals[mnum].push( 1 );
                normals[mnum].push( 0 );
                normals[mnum].push( 0 );
            }
        }
        mnum++;

        vertices[mnum] = [];
        normals[mnum] = [];
        for (var i = 0; i <= slices1; i++) {
            var psi = i/slices1;
            for (var j = 0; j <= slices; j++) {
                var phi = (j/slices-1)*2;
                var px = 0;
                var py = -psi*2+c;
                var pz = -phi*(1-psi*0.5)-a+0.2;
                vertices[mnum].push( px, py-c-0.5, pz );
                normals[mnum].push( 1 );
                normals[mnum].push( 0 );
                normals[mnum].push( 0 );
            }
        }
        mnum++;

        vertices[mnum] = [];
        normals[mnum] = [];
        for (var i = 0; i <= slices1; i++) {
            var psi = i/slices1;
            for (var j = 0; j <= slices; j++) {
                var phi = (j/slices-1)*2;
                var px = psi*2+0.5;
                var py = c+0.5;
                var pz = -phi*(1-psi*0.5)-a+0.2;
                vertices[mnum].push( px, py-c-0.5, pz );
                normals[mnum].push( 0 );
                normals[mnum].push( 1 );
                normals[mnum].push( 0 );
            }
        }
        mnum++;

        vertices[mnum] = [];
        normals[mnum] = [];
        for (var i = 0; i <= slices1; i++) {
            var psi = i/slices1;
            for (var j = 0; j <= slices; j++) {
                var phi = (j/slices-1)*2;
                var px = -psi*2-0.5;
                var py = c+0.5;
                var pz = -phi*(1-psi*0.5)-a+0.2;
                vertices[mnum].push( px, py-c-0.5, pz );
                normals[mnum].push( 0 );
                normals[mnum].push( 1 );
                normals[mnum].push( 0 );
            }
        }
        mnum++;
    }

    let colorp = [0.9, 0.9, 0.9, 1.0];
    let colorl = [0.0, 0.0, 0.0, 1.0];
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
        if (isShowEll) {
            for (var i=0; i < slices1; i++) {
                for (var j=0; j < slices; j++) {
                    var aa = [i*(slices+1)+j, i*(slices+1)+j+1, (i+1)*(slices+1)+j+1, (i+1)*(slices+1)+j];
                    if (i%16==0) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                    }
                    if (j%16==15) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], rad:1, color:colorl});
                    }
                    if (j==0) {
                        primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
                    }
                }
            }
        }
    }
}
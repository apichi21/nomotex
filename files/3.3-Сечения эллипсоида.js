var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([b+1, 0, 0]), movable: "fixed", vector:[1,0,0]});
    points.push({coord1: vec3.create([0, 0, a+1]), movable: "fixed", vector:[0,0,1]});
    // points.push({coord1: vec3.create([b+1, 0, a+1]), movable: "line", vector:[0,1,0]});
    points.push({coord1: vec3.create([b*0.5, 0, a+2]), movable: "plane", vector:[0,0,1]});
    points.push({coord1: vec3.create([0, c+2, 0]), movable: "fixed", vector:[0,1,0]});
    points.push({coord1: [], movable: "plane", vector:vectorU});
    points.push({coord1: [], movable: "fixed", vector:vectorV});

    vec3.add(points[2].coord1, vectorV, points[4].coord1);
    vec3.add(points[2].coord1, vectorU, points[5].coord1);
}
function initDescr() {
    var descr = "";
    descr += '<p>Уравнение эллипсоида:$$\\frac{x^2}{a^2}+\\frac{y^2}{b^2}+\\frac{z^2}{c^2}=1$$</p>';
    var tIS = 5;
    descr += '<p>$a$<input type="text" id="a" size="'+tIS+'"> \
                 $b$<input type="text" id="b" size="'+tIS+'"> \
                 $c$<input type="text" id="c" size="'+tIS+'"></p>';
    descr += '<label><input type="checkbox" checked onchange="isShowHyp=this.checked; initBuffers();"> Показать поверхность</label>';

    descr += '<p>Секущая плоскость параллельна оси $Ox$ и проходит через прямую, задаваемую вектором $\\vec v=\\overrightarrow{M_0M}$.</p>';

    descr += '<p>$M_0$: $y_0$<input type="text" id="y0" size="'+tIS+'"> \
                 $z_0$<input type="text" id="z0" size="'+tIS+'"></p>';
    descr += '<p>$v_y$<input type="text" id="vy" size="'+tIS+'"> \
                 $v_z$<input type="text" id="vz" size="'+tIS+'"></p>';
    descr += 'Кривая в сечении: <span id="curve" style="font-weight: 600;"></span>';
    descr += '<label><input type="checkbox" checked onchange="isShowСross=this.checked; initBuffers();"> Показать сечение</label>';
    descr += '<p>Примеры кривых в сечении:<br>';
    descr += '<button onclick="changeToEll();">Эллипс</button><br>';
    descr += '<button onclick="changeToPoint();">Точка</button><br>';
    descr += '<button onclick="changeToEllIm();">Мнимый эллипс</button><br>';
    descr += '</p>';

    $("#description").html(descr);
    $("#a").change(function(event){
                                       points[1].coord1[2] = 1+Math.abs(parseFloat(this.value));
                                       initBuffers();
                                  });
    $("#b").change(function(event){
                                       points[0].coord1[0] = 1+Math.abs(parseFloat(this.value));
                                       initBuffers();
                                  });
    $("#c").change(function(event){
                                       points[3].coord1[1] = 2+Math.abs(parseFloat(this.value));
                                       initBuffers();
                                  });

    $("#s0").change(function(event){
                                       points[2].coord1[2] = parseFloat(this.value);
                                       updatePointO();
                                       initBuffers();});
    $("#y0").change(function(event){
                                       points[2].coord1[0] = parseFloat(this.value);
                                       updatePointO();
                                       initBuffers();
                                   });
    $("#z0").change(function(event){
                                       points[2].coord1[1] = parseFloat(this.value);
                                       updatePointO();
                                       initBuffers();
                                   });
    $("#ux").change(function(event){
                                       vectorU[2] = parseFloat(this.value);
                                       updateVectorU();
                                       initBuffers();});
    $("#uy").change(function(event){
                                       vectorU[0] = parseFloat(this.value);
                                       updateVectorU();
                                       initBuffers();
                                   });
    $("#uz").change(function(event){
                                       vectorU[1] = parseFloat(this.value);
                                       updateVectorU();
                                       initBuffers();
                                   });
    $("#vx").change(function(event){
                                       vectorV[2] = parseFloat(this.value);
                                       updateVectorV();
                                       initBuffers();
                                   });
    $("#vy").change(function(event){
                                       vectorV[0] = parseFloat(this.value);
                                       updateVectorV();
                                       initBuffers();
                                   });
    $("#vz").change(function(event){
                                       vectorV[1] = parseFloat(this.value);
                                       updateVectorV();
                                       initBuffers();
                                   });
    $("Title").html("Эллипсоид");
}
var a = 2;
var b = 3;
var c = 1.5;
var isShowHyp = true;
var isShowСross = true;
var vectorU = [0,0,2];
var vectorV = [0,2,0];
var nuberEpsilon = 0.00001;
function changeToEll() {
    points[2].coord1[0] = b/2;
    points[2].coord1[1] = 0;
    points[2].coord1[2] = a+2;
    vectorV[0] = 0;
    vectorV[1] = 2;
    vectorV[2] = 0;
    vectorU[0] = 0;
    vectorU[1] = 0;
    vectorU[2] = 2;
    updatePointO();
    updateVectorV();
    updateVectorU();
    initBuffers();
}
function changeToPoint() {
    points[2].coord1[0] = b;
    points[2].coord1[1] = 0;
    points[2].coord1[2] = a+2;
    vectorV[0] = 0;
    vectorV[1] = 2;
    vectorV[2] = 0;
    vectorU[0] = 0;
    vectorU[1] = 0;
    vectorU[2] = 2;
    updatePointO();
    updateVectorV();
    updateVectorU();
    initBuffers();
}
function changeToEllIm() {
    points[2].coord1[0] = b+b/2;
    points[2].coord1[1] = 0;
    points[2].coord1[2] = a+2;
    vectorV[0] = 0;
    vectorV[1] = 2;
    vectorV[2] = 0;
    vectorU[0] = 0;
    vectorU[1] = 0;
    vectorU[2] = 2;
    updatePointO();
    updateVectorV();
    updateVectorU();
    initBuffers();
}
function updatePointO() {
    vec3.add(points[2].coord1, vectorV, points[4].coord1);
    vec3.add(points[2].coord1, vectorU, points[5].coord1);
}
function updateVectorV() {
    // vec3.normalize(vectorV);
    vec3.add(points[2].coord1, vectorV, points[4].coord1);
    vec3.set(vectorV, points[5].vector);
}
function updateVectorU() {
    // vec3.normalize(vectorU);
    vec3.add(points[2].coord1, vectorU, points[5].coord1);
    vec3.set(vectorU, points[4].vector);
}
function initData() {
    // isOrtho = false;
    var arrcol1 = [0.0, 0.0, 1.0, 1.0];
    var arrcol2 = [0.0, 0.0, 1.0, 1.0];
    var arrcol3 = [0.0, 0.0, 1.0, 1.0];
    var arrcol4 = [1.0, 0.0, 0.0, 1.0];
    var arrcol5 = [0.0, 0.0, 1.0, 1.0];
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[0].coord1) {
            arrcol1 = [1.0, 0.0, 1.0, 1.0];
        }
        if (arrPoint == points[1].coord1) {
            arrcol2 = [1.0, 0.0, 1.0, 1.0];
        }
        if (arrPoint == points[3].coord1) {
            arrcol5 = [1.0, 0.0, 1.0, 1.0];
        }
        if (arrPoint == points[2].coord1) {
            // arrcol4 = [1.0, 0.0, 1.0, 1.0];
            updatePointO();
        }
        if (arrPoint == points[4].coord1) {
            vec3.subtract(points[4].coord1, points[2].coord1, vectorV);
            updateVectorV();
        }
        if (arrPoint == points[5].coord1) {
            vec3.subtract(points[5].coord1, points[2].coord1, vectorU);
            updateVectorU();
        }
    }

    primitives.push({class:"text", text: "x", arr0:[0,0,5]});
    primitives.push({class:"text", text: "y", arr0:[5,0,0]});
    primitives.push({class:"text", text: "z", arr0:[0,5,0]});
    a = Math.abs(points[1].coord1[2])-1;
    b = Math.abs(points[0].coord1[0])-1;
    c = Math.abs(points[3].coord1[1])-2;
    $("#a").val(parseFloat(a.toPrecision(3)));
    $("#b").val(parseFloat(b.toPrecision(3)));
    $("#c").val(parseFloat(c.toPrecision(3)));

    var vertices = [];
    var indices = [];
    var normals = [];
    var lineVertices = [];
    var slices1 = 64;
    var slices = 32;
    var angle = 2*Math.PI;

    var maxZ = Math.abs(points[3].coord1[1]);

    // var phiM = Math.asinh(maxZ/c);
    // vertices[0] = [];
    // normals[0] = [];
    // for (var i = 0; i <= slices1; i++) {
    //     var psi = i*angle/slices1;
    //     for (var j = 0; j <= slices; j++) {
    //         var phi = (j/slices-0.5)*2*phiM;
    //         var py = b*Math.cosh(phi)*Math.cos(psi);
    //         var pz = c*Math.sinh(phi);
    //         var px = a*Math.cosh(phi)*Math.sin(psi);
    //         vertices[0].push( py, pz, px );
    //         normals[0].push( 2*py/b/b );
    //         normals[0].push( -2*pz/c/c );
    //         normals[0].push( 2*px/a/a );
    //     }
    // }
    // var poly3rd2 = [[[-1,0, 1.0/a/a],[0,0],[1.0/b/b]], [[0,0],[0]], [[-1.0/c/c]]];

    // var phiM = maxZ/c;
    // vertices[0] = [];
    // normals[0] = [];
    // for (var i = 0; i <= slices1; i++) {
    //     var psi = i*angle/slices1;
    //     for (var j = 0; j <= slices; j++) {
    //         var phi = (j/slices-0.5)*2*phiM;
    //         var py = b*phi*Math.cos(psi);
    //         var pz = c*phi;
    //         var px = a*phi*Math.sin(psi);
    //         vertices[0].push( py, pz, px );
    //         normals[0].push( 2*py/b/b );
    //         normals[0].push( -2*pz/c/c );
    //         normals[0].push( 2*px/a/a );
    //     }
    // }
    // var poly3rd2 = [[[0,0, 1.0/a/a],[0,0],[1.0/b/b]], [[0,0],[0]], [[-1.0/c/c]]];

    vertices[0] = [];
    normals[0] = [];
    for (var i = 0; i <= slices1; i++) {
        var psi = i*Math.PI/slices1;
        for (var j = 0; j <= slices; j++) {
            var phi = j*angle/slices;
            var py = b*Math.cos(phi)*Math.cos(psi);
            var pz = c*Math.sin(phi);
            var px = a*Math.cos(phi)*Math.sin(psi);
            vertices[0].push( py, pz, px );
            normals[0].push( 2*py/b/b );
            normals[0].push( 2*pz/c/c );
            normals[0].push( 2*px/a/a );
        }
    }
    var poly3rd2 = [[[-1,0, 1.0/a/a],[0,0],[1.0/b/b]], [[0,0],[0]], [[1.0/c/c]]];

    // var phiM = Math.acosh(maxZ/c);
    // vertices[0] = [];
    // normals[0] = [];
    // for (var i = 0; i <= slices1; i++) {
    //     var psi = i*angle/slices1;
    //     for (var j = 0; j <= slices; j++) {
    //         var phi = (j/slices-0.5)*2*phiM;
    //         var py = b*Math.sinh(phi)*Math.cos(psi);
    //         var pz = c*Math.cosh(phi);
    //         var px = a*Math.sinh(phi)*Math.sin(psi);
    //         vertices[0].push( py, pz, px );
    //         normals[0].push( 2*py/b/b );
    //         normals[0].push( -2*pz/c/c );
    //         normals[0].push( 2*px/a/a );
    //     }
    // }
    // vertices[1] = [];
    // normals[1] = [];
    // for (var i = 0; i <= slices1; i++) {
    //     var psi = i*angle/slices1;
    //     for (var j = 0; j <= slices; j++) {
    //         var phi = (j/slices-0.5)*2*phiM;
    //         var py = b*Math.sinh(phi)*Math.cos(psi);
    //         var pz = -c*Math.cosh(phi);
    //         var px = a*Math.sinh(phi)*Math.sin(psi);
    //         vertices[1].push( py, pz, px );
    //         normals[1].push( 2*py/b/b );
    //         normals[1].push( -2*pz/c/c );
    //         normals[1].push( 2*px/a/a );
    //     }
    // }
    // var poly3rd2 = [[[-1,0, -1.0/a/a],[0,0],[-1.0/b/b]], [[0,0],[0]], [[1.0/c/c]]];

    // var phiM = Math.sqrt(maxZ/c);
    // vertices[0] = [];
    // normals[0] = [];
    // // for (var i = 0; i <= slices1; i++) {
    // //     var psi = i/slices1*angle;
    // //     for (var j = 0; j <= slices; j++) {
    // //         var phi = j/slices*phiM;
    // //         var px = b*phi*Math.cos(psi);
    // //         var py = -phi*phi*c*(1-2*Math.pow(Math.sin(psi),2));
    // //         var pz = a*phi*Math.sin(psi);
    // //         vertices[0].push( px, py, pz );
    // //         normals[0].push( -2*px/b/b );
    // //         normals[0].push( -1/c );
    // //         normals[0].push( 2*pz/a/a );
    // //     }
    // // }
    // for (var i = 0; i <= slices1; i++) {
    //     var psi = (i/slices1*2-1)*phiM;
    //     for (var j = 0; j <= slices; j++) {
    //         var phi = (j/slices*2-1)*phiM;

    //         var px = b*psi;
    //         var py = c*(phi*phi-psi*psi);
    //         var pz = a*phi;
    //         vertices[0].push( px, py, pz );
    //         normals[0].push( -2*px/b/b );
    //         normals[0].push( -1/c );
    //         normals[0].push( 2*pz/a/a );
    //     }
    // }
    // var poly3rd2 = [[[0,0, 1.0/a/a],[0,0],[-1.0/b/b]], [[-1.0/c,0],[0]], [[0]]];


    // for (var i = 0; i <= slices1; i++) {
    //     var psi = (i/slices1*2-1)*phiM;
    //     for (var j = 0; j <= slices; j++) {
    //         var phi = (j/slices*2-1)*phiM;

    //         var px = b*psi;
    //         var py = c*phi;
    //         var pz = a*(phi*phi-psi*psi);
    //         vertices[0].push( px, py, pz );
    //         normals[0].push( -2*px/b/b );
    //         normals[0].push( 2*py/c/c );
    //         normals[0].push( -1/a );
    //     }
    // }
    // var poly3rd2 = [[[0,-1.0/a, ],[0,0],[-1.0/b/b]], [[0,0],[0]], [[1.0/c/c]]];


    // var phiM = Math.sqrt(maxZ/c);
    // vertices[0] = [];
    // normals[0] = [];
    // for (var i = 0; i <= slices1; i++) {
    //     var psi = i*angle/slices1;
    //     for (var j = 0; j <= slices; j++) {
    //         var phi = j/slices*phiM;
    //         var px = b*phi *Math.cos(psi);
    //         var py = phi*phi*c;
    //         var pz = a*phi *Math.sin(psi);
    //         vertices[0].push( px, py, pz );
    //         normals[0].push( 2*px/b/b );
    //         normals[0].push( -1/c );
    //         normals[0].push( 2*pz/a/a );
    //     }
    // }
    // var poly3rd2 = [[[0,0, 1.0/a/a],[0,0],[1.0/b/b]], [[-1.0/c,0],[0]], [[0]]];

     // var poly3rd2 = [[[-1,0, 1.0/a/a],[0,0],[-1.0/b/b]], [[-1.0/c/c,0],[0]], [[0.0]]];

    // var poly3rd11 = [[[0,1],[0]], [[0]]];
    // var poly3rd12 = [[[oy, 0],[0]], [[yz]]];
    // var poly3rd13 = [[[0,0],[0]], [[1]]];

    // var poly3rd11 = [[[0,1],[0]], [[0]]];
    // var poly3rd12 = [[[oy, 0],[0]], [[vy]]];
    // var poly3rd13 = [[[oz, 0],[0]], [[vz]]];



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
        if (isShowHyp) {
            meshes.push({
                vertices:vertices[k],
                normals:normals[k],
                indices:indices[k],
                color:colorp,
                reinit:true
            });
        }
        for (var i=0; i < slices1; i++) {
            for (var j=0; j < slices; j++) {
                var aa = [i*(slices+1)+j, i*(slices+1)+j+1, (i+1)*(slices+1)+j+1, (i+1)*(slices+1)+j];
                if (i%32==0) {
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
    if (!isShowСross) return;



    var ux = vectorU[2];
    var uy = vectorU[0];
    var uz = vectorU[1];

    var vx = vectorV[2];
    var vy = vectorV[0];
    var vz = vectorV[1];

    var ox = points[2].coord1[2];
    var oy = points[2].coord1[0];
    var oz = points[2].coord1[1];

    // $("#ux").val(parseFloat(vectorU[2].toPrecision(3)));
    // $("#uy").val(parseFloat(vectorU[0].toPrecision(3)));
    // $("#uz").val(parseFloat(vectorU[1].toPrecision(3)));
    $("#vx").val(parseFloat(vectorV[2].toPrecision(3)));
    $("#vy").val(parseFloat(vectorV[0].toPrecision(3)));
    $("#vz").val(parseFloat(vectorV[1].toPrecision(3)));

    if (vz < 0) {
        vx *= -1;
        vy *= -1;
        vz *= -1;
    }
    if (ux < 0) {
        ux *= -1;
        uy *= -1;
        uz *= -1;
    }

    primitives.push({class:"point", text: katex.renderToString("M"), arr0:points[4].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec v"), arr0:points[2].coord1, arr1:points[4].coord1, rad:2, color:[0.8, 0.8, 0.8, 1.0]});
    // primitives.push({class:"point", text: "", arr0:points[5].coord1, rad:4, color:[0.0, 1.0, 0.0, 1.0]});
    // primitives.push({class:"arrow", text: "u", arr0:points[2].coord1, arr1:points[5].coord1, rad:2, color:[0.5, 0.5, 0.5, 1.0]});


    // primitives.push({class:"cone", text: "", arr0:points[0].coord1, arr1:[points[0].coord1[0]*1.1,0,0], rad:3, color:arrcol1});
    // primitives.push({class:"cone", text: "", arr0:points[1].coord1, arr1:[0,0,points[1].coord1[2]*1.1], rad:3, color:arrcol2});
    // primitives.push({class:"cone", text: "", arr0:points[3].coord1, arr1:[0,points[3].coord1[1]*1.1,0], rad:3, color:arrcol5});

    primitives.push({class:"point", text: katex.renderToString("M_0"), arr0:points[2].coord1, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    // primitives.push({class:"cone", text: "",
    //                 arr0:points[2].coord1,
    //                 arr1:[points[2].coord1[0]+points[2].vector[0], points[2].coord1[1]+points[2].vector[1], points[2].coord1[2]],
    //                 rad:2.5, color:arrcol4});

    // primitives.push({class:"cone", text: "",
    //                 arr0:points[2].coord1,
    //                 arr1:[points[2].coord1[0]-points[2].vector[0], points[2].coord1[1]-points[2].vector[1], points[2].coord1[2]],
    //                 rad:2.5, color:arrcol4});

    $("#s0").val(parseFloat(ox.toPrecision(3)));
    $("#y0").val(parseFloat(oy.toPrecision(3)));
    $("#z0").val(parseFloat(oz.toPrecision(3)));


    var poly3rd11 = [[[ox, ux],[0]], [[vx]]];
    var poly3rd12 = [[[oy, uy],[0]], [[vy]]];
    var poly3rd13 = [[[oz, uz],[0]], [[vz]]];
// ox-(a+2)
    var polyEll1 = polyCreate23d();
    var poly3rd = polyCreate23d();
    // var poly3rd1 = [[[1,2],[4]], [[3]]];
    // console.clear();
    // polyMult3d(poly3rd1, poly3rd1, poly3rd);
    // descr += '<p>$('+toString3d1st(poly3rd1)+')*('+toString3d1st(poly3rd1)+') = $</p>';
    // descr += '<p>$ = '+toString3d2nd(poly3rd)+'$</p><br>';

    changeP3dAll(poly3rd11, poly3rd12, poly3rd13, poly3rd2, polyEll1);

    var tgphi;
    var sinphi;
    var cosphi;

    // if (polyEll1[0][1][1] != 0) { // избавление от YZ
    //     var eqvb = (polyEll1[0][0][2]-polyEll1[0][2][0]) / polyEll1[0][1][1] * 2.0;
    // // console.log("eqvb = ", toFloat(eqvb));
    //     tgphi = (-eqvb+Math.sqrt(eqvb*eqvb+4.0)) / 2.0;

    //     sinphi = tgphi/Math.sqrt(1.0+tgphi*tgphi);
    //     cosphi = 1.0/Math.sqrt(1.0+tgphi*tgphi);
    // } else {
    //     tgphi = 0.0;
    //     sinphi = 0.0;
    //     cosphi = 1.0;
    // }
    // // console.log("tg = ", toFloat(tgphi));
    // // console.log("sin = ", toFloat(sinphi));
    // // console.log("cos = ", toFloat(cosphi));

    // var poly3rd11 = [[[0,cosphi],[-sinphi]], [[0]]];
    // var poly3rd12 = [[[0,sinphi],[cosphi]], [[0]]];
    // var poly3rd13 = [[[0,0],[0]], [[1]]];
    // changeP3dAll(poly3rd11, poly3rd12, poly3rd13, polyEll1, poly3rd);


    if (Math.abs(polyEll1[1][0][1]) > nuberEpsilon) { // избавление от XZ
        var eqvb = (polyEll1[0][0][2]-polyEll1[2][0][0]) / polyEll1[1][0][1] * 2.0;
    // console.log("eqvb = ", toFloat(eqvb));
        tgphi = (-eqvb+Math.sqrt(eqvb*eqvb+4.0)) / 2.0;

        sinphi = tgphi/Math.sqrt(1.0+tgphi*tgphi);
        cosphi = 1.0/Math.sqrt(1.0+tgphi*tgphi);
    } else {
        tgphi = 0.0;
        sinphi = 0.0;
        cosphi = 1.0;
    }
    // console.log("tg = ", toFloat(tgphi));
    // console.log("sin = ", toFloat(sinphi));
    // console.log("cos = ", toFloat(cosphi));

    var poly3rd11 = [[[0,cosphi],[0]], [[-sinphi]]];
    var poly3rd12 = [[[0,0],[1]], [[0]]];
    var poly3rd13 = [[[0,sinphi],[0]], [[cosphi]]];
    changeP3dAll(poly3rd11, poly3rd12, poly3rd13, polyEll1, poly3rd);



    var s0 = Math.abs(poly3rd[0][0][2]) > nuberEpsilon ? -poly3rd[0][0][1]/2.0/poly3rd[0][0][2] : 0;
    var y0 = Math.abs(poly3rd[0][2][0]) > nuberEpsilon ? -poly3rd[0][1][0]/2.0/poly3rd[0][2][0] : 0;
    var t0 = Math.abs(poly3rd[2][0][0]) > nuberEpsilon ? -poly3rd[1][0][0]/2.0/poly3rd[2][0][0] : 0;


    console.log(toFloat(s0), toFloat(y0), toFloat(t0), toFloat(cosphi), toFloat(sinphi));

    // var t0 = -poly3rd[1][0][0]/2.0/poly3rd[2][0][0];
    var poly3rd11 = [[[s0,1],[0]], [[0]]];
    var poly3rd12 = [[[y0,0],[1]], [[0]]];
    var poly3rd13 = [[[t0,0],[0]], [[1]]];
    changeP3dAll(poly3rd11, poly3rd12, poly3rd13, poly3rd, polyEll1);

    var rightZero = Math.abs(polyEll1[0][0][0]) < nuberEpsilon;
    if (!rightZero) {
        polyMultNumberto23d(polyEll1, -1.0/polyEll1[0][0][0]);
    }


    {
        var sqrainv = polyEll1[0][0][2];
        var sqrcinv = polyEll1[2][0][0];
        console.log(toFloat(sqrainv), toFloat(sqrcinv), rightZero, toFloat(polyEll1[0][0][1]), toFloat(polyEll1[1][0][0]));
        if (sqrcinv == 0) {
            var by = polyEll1[1][0][0];

            if (by != 0) {
                if ($("#curve").text() != "Парабола") {
                    $("#curve").text("Парабола");
                }
                // console.log("Парабола");
                var p = -by/sqrainv/2.0;
                if (!rightZero) {
                    t0 = 1.0/by;
                }

                var psimult11, psimult12;
                var psimult21, psimult22;

                var sqr1 = ((-maxZ-oz)/vz-t0) * 2*p;
                var sqr2 = ( (maxZ-oz)/vz-t0) * 2*p;

                if (p<0) {
                    psimult11 = -Math.sqrt( sqr1 );
                    if (sqr2 <= 0) {
                        psimult12 = 0;
                        psimult21 = 0;
                    } else {
                        psimult12 = -Math.sqrt( sqr2 );
                        psimult21 = Math.sqrt( sqr2 );
                    }
                    psimult22 = Math.sqrt( sqr1 );
                } else {
                    psimult11 = -Math.sqrt( sqr2 );
                    if (sqr1 <= 0) {
                        psimult12 = 0;
                        psimult21 = 0;
                    } else {
                        psimult12 = -Math.sqrt( sqr1 );
                        psimult21 = Math.sqrt( sqr1 );
                    }
                    psimult22 = Math.sqrt( sqr2 );
                }

                lineVertices[0] = [];
                for (var i = 0; i <= slices; i++) {
                    var psi = i/slices*(psimult12-psimult11) + psimult11;

                    var pt0 = psi*psi/2/p+t0;
                    var ps0 = psi+s0;

                    var pt = pt0*cosphi+ps0*sinphi;
                    var ps = -pt0*sinphi+ps0*cosphi;

                    var px = ox+ps*ux+pt*vx;
                    var py = oy+ps*uy+pt*vy;
                    var pz = oz+ps*uz+pt*vz;

                    lineVertices[0].push( [py, pz, px] );
                }

                lineVertices[1] = [];
                for (var i = 0; i <= slices; i++) {
                    var psi = i/slices*(psimult22-psimult21) + psimult21;

                    var pt0 = psi*psi/2/p+t0;
                    var ps0 = psi+s0;

                    var pt = pt0*cosphi+ps0*sinphi;
                    var ps = -pt0*sinphi+ps0*cosphi;

                    var px = ox+ps*ux+pt*vx;
                    var py = oy+ps*uy+pt*vy;
                    var pz = oz+ps*uz+pt*vz;

                    lineVertices[1].push( [py, pz, px] );
                }
            } else {
                if (!rightZero) {
                    if (sqrainv < 0) {
                        // console.log("Пара мнимых параллельных прямых");
                        if ($("#curve").text() != "Пара мнимых параллельных прямых") {
                            $("#curve").text("Пара мнимых параллельных прямых");
                        }
                    } else {
                        // console.log("Пара параллельных прямых");
                        if ($("#curve").text() != "Пара параллельных прямых") {
                            $("#curve").text("Пара параллельных прямых");
                        }

                        var a1 = Math.sqrt(1.0/Math.abs(sqrainv));

                        var phimult = maxZ/vz;

                        lineVertices[0] = [];
                        var pt0 = phimult+t0;
                        var ps0 = a1+s0;
                        var pt = pt0*cosphi+ps0*sinphi;
                        var ps = -pt0*sinphi+ps0*cosphi;

                        var px = ox+ps*ux+pt*vx;
                        var py = oy+ps*uy+pt*vy;
                        var pz = oz+ps*uz+pt*vz;
                        lineVertices[0].push( [py, pz, px] );

                        var pt0 = -phimult+t0;
                        var ps0 = a1+s0;
                        var pt = pt0*cosphi+ps0*sinphi;
                        var ps = -pt0*sinphi+ps0*cosphi;

                        var px = ox+ps*ux+pt*vx;
                        var py = oy+ps*uy+pt*vy;
                        var pz = oz+ps*uz+pt*vz;
                        lineVertices[0].push( [py, pz, px] );

                        lineVertices[1] = [];

                        var pt0 = -phimult+t0;
                        var ps0 = -a1+s0;
                        var pt = pt0*cosphi+ps0*sinphi;
                        var ps = -pt0*sinphi+ps0*cosphi;

                        var px = ox+ps*ux+pt*vx;
                        var py = oy+ps*uy+pt*vy;
                        var pz = oz+ps*uz+pt*vz;
                        lineVertices[1].push( [py, pz, px] );
                        var pt0 = phimult+t0;
                        var ps0 = -a1+s0;
                        var pt = pt0*cosphi+ps0*sinphi;
                        var ps = -pt0*sinphi+ps0*cosphi;

                        var px = ox+ps*ux+pt*vx;
                        var py = oy+ps*uy+pt*vy;
                        var pz = oz+ps*uz+pt*vz;
                        lineVertices[1].push( [py, pz, px] );
                    }
                } else {
                    if ($("#curve").text() != "Прямая") {
                        $("#curve").text("Прямая");
                    }
                    var phimult = maxZ/vz;

                    lineVertices[0] = [];
                    var pt0 = phimult+t0;
                    var ps0 = s0;
                    var pt = pt0*cosphi+ps0*sinphi;
                    var ps = -pt0*sinphi+ps0*cosphi;

                    var px = ox+ps*ux+pt*vx;
                    var py = oy+ps*uy+pt*vy;
                    var pz = oz+ps*uz+pt*vz;
                    lineVertices[0].push( [py, pz, px] );

                    var pt0 = -phimult+t0;
                    var ps0 = s0;
                    var pt = pt0*cosphi+ps0*sinphi;
                    var ps = -pt0*sinphi+ps0*cosphi;

                    var px = ox+ps*ux+pt*vx;
                    var py = oy+ps*uy+pt*vy;
                    var pz = oz+ps*uz+pt*vz;
                    lineVertices[0].push( [py, pz, px] );
                }

            }
        } else if (rightZero) {
            if ((sqrainv > 0 && sqrcinv > 0) || (sqrainv < 0 && sqrcinv < 0)) {
                // console.log("Точка");
                if ($("#curve").text() != "Точка") {
                    $("#curve").text("Точка");
                }
                var pt0 = t0;
                var ps0 = s0;
                var pt = pt0*cosphi+ps0*sinphi;
                var ps = -pt0*sinphi+ps0*cosphi;

                var px = ox+ps*ux+pt*vx;
                var py = oy+ps*uy+pt*vy;
                var pz = oz+ps*uz+pt*vz;
                primitives.push({class:"point", text: "", arr0:[py, pz, px], rad:5, color:arrcol4});
            } else {
                // console.log("Пара пересекающихся прямых");
                if ($("#curve").text() != "Пара пересекающихся прямых") {
                    $("#curve").text("Пара пересекающихся прямых");
                }
                // var phimult = maxZ/c*vz;

                // var pt = maxZ/vz;


                // var c1 = Math.sqrt(1.0/Math.abs(sqrcinv));
                // var a1 = Math.sqrt(1.0/Math.abs(sqrainv));

                // lineVertices[0] = [];
                // var py = oy+y0+pt*vy;
                // var pz = oz+pt*vz;
                // lineVertices[0].push( [py, pz, a1*phimult] );
                // var py = oy+y0-pt*vy;
                // var pz = oz-pt*vz;
                // lineVertices[0].push( [py, pz, -a1*phimult] );
                // lineVertices[1] = [];
                // var py = oy+y0+pt*vy;
                // var pz = oz+pt*vz;
                // lineVertices[1].push( [py, pz, a1*phimult] );
                // var py = oy+y0-pt*vy;
                // var pz = oz-pt*vz;
                // lineVertices[1].push( [py, pz, -a1*phimult] );


                // var phimult = maxZ/c;

                // var pt = t0;
                // var py = oy+y0+pt*vy;

                var c1 = Math.sqrt(1.0/Math.abs(sqrcinv));
                var a1 = Math.sqrt(1.0/Math.abs(sqrainv));

                // lineVertices[0] = [];
                // lineVertices[0].push( [py, c1*phimult+oz, a1*phimult] );
                // lineVertices[0].push( [py, -c1*phimult+oz, -a1*phimult] );
                // lineVertices[1] = [];
                // lineVertices[1].push( [py, -c1*phimult+oz, a1*phimult] );
                // lineVertices[1].push( [py, c1*phimult+oz, -a1*phimult] );

                var phimult = maxZ/c1/vz;

                lineVertices[0] = [];
                var pt0 = c1*phimult+t0;
                var ps0 = a1*phimult+s0;
                var pt = pt0*cosphi+ps0*sinphi;
                var ps = -pt0*sinphi+ps0*cosphi;

                var px = ox+ps*ux+pt*vx;
                var py = oy+ps*uy+pt*vy;
                var pz = oz+ps*uz+pt*vz;
                lineVertices[0].push( [py, pz, px] );
                var pt0 = -c1*phimult+t0;
                var ps0 = -a1*phimult+s0;
                var pt = pt0*cosphi+ps0*sinphi;
                var ps = -pt0*sinphi+ps0*cosphi;

                var px = ox+ps*ux+pt*vx;
                var py = oy+ps*uy+pt*vy;
                var pz = oz+ps*uz+pt*vz;
                lineVertices[0].push( [py, pz, px] );

                lineVertices[1] = [];
                var pt0 = -c1*phimult+t0;
                var ps0 = a1*phimult+s0;
                var pt = pt0*cosphi+ps0*sinphi;
                var ps = -pt0*sinphi+ps0*cosphi;

                var px = ox+ps*ux+pt*vx;
                var py = oy+ps*uy+pt*vy;
                var pz = oz+ps*uz+pt*vz;
                lineVertices[1].push( [py, pz, px] );
                var pt0 = c1*phimult+t0;
                var ps0 = -a1*phimult+s0;
                var pt = pt0*cosphi+ps0*sinphi;
                var ps = -pt0*sinphi+ps0*cosphi;

                var px = ox+ps*ux+pt*vx;
                var py = oy+ps*uy+pt*vy;
                var pz = oz+ps*uz+pt*vz;
                lineVertices[1].push( [py, pz, px] );
            }

        } else if (sqrainv > 0 && sqrcinv < 0) {
            // console.log("Гипербола 1");
            if ($("#curve").text() != "Гипербола") {
                $("#curve").text("Гипербола");
            }
            var c1 = Math.sqrt(-1.0/sqrcinv);
            var a1 = Math.sqrt(1.0/sqrainv);

            var phimult1 = -Math.asinh( ( (maxZ+oz) /vz+t0) / c1);
            var phimult2 =  Math.asinh( ( (maxZ-oz) /vz-t0) / c1);
            var phimult11;
            var phimult12;
            var phimult21;
            var phimult22;
            // if (vz>0) {
                phimult11 = -Math.asinh( ( (maxZ+oz) /vz+t0) / c1);
                phimult12 = Math.asinh( ( (maxZ-oz) /vz-t0) / c1);
                phimult21 = -Math.asinh( ( (maxZ+oz) /vz+t0) / c1);
                phimult22 = Math.asinh( ( (maxZ-oz) /vz-t0) / c1);

                var aaa = cosphi*vz - sinphi*uz;
                var bbb = cosphi*uz + sinphi*vz;
                var bb = aaa*c1;
                var aa = bbb*a1;
                var aa1 = -bbb*a1;
                var cc = oz+t0*aaa+s0*bbb;
                var minZ = -maxZ;
                var phi1 = Math.log((minZ-cc + Math.sqrt(-aa*aa+bb*bb+cc*cc-2*cc*minZ+minZ*minZ) ) / (aa+bb));
                var phi2 = Math.log((maxZ-cc + Math.sqrt(-aa*aa+bb*bb+cc*cc-2*cc*maxZ+maxZ*maxZ) ) / (aa+bb));
                var phi3 = Math.log((minZ-cc + Math.sqrt(-aa1*aa1+bb*bb+cc*cc-2*cc*minZ+minZ*minZ) ) / (aa1+bb));
                var phi4 = Math.log((maxZ-cc + Math.sqrt(-aa1*aa1+bb*bb+cc*cc-2*cc*maxZ+maxZ*maxZ) ) / (aa1+bb));

                console.log(">",phimult11.toFixed(3),phimult12.toFixed(3), phimult21.toFixed(3), phimult22.toFixed(3),
                                phi1.toFixed(3), phi2.toFixed(3), phi3.toFixed(3), phi4.toFixed(3));
                phimult11 = phi1;
                phimult12 = phi2;
                phimult21 = phi3;
                phimult22 = phi4;
            // } else {
            //     phimult11 = -Math.acosh( ( -(maxZ-oz) /vz+t0) / c1 );
            //     phimult12 = Math.acosh( ( -(maxZ-oz) /vz+t0) / c1 );
            //     phimult21 = Math.acosh( ( -(maxZ+oz) /vz-t0) / c1 );
            //     phimult22 = -Math.acosh( ( -(maxZ+oz) /vz-t0) / c1 );

            //     var aaa = cosphi*vz - sinphi*uz;
            //     var bbb = cosphi*uz + sinphi*vz;
            //     var aa = aaa*c1;
            //     var aa1 = -aaa*c1;
            //     var bb = bbb*a1;
            //     var cc = oz+t0*aaa+s0*bbb;
            //     var phi1 = Math.log((maxZ-cc + Math.sqrt(-aa1*aa1+bb*bb+cc*cc-2*cc*maxZ+maxZ*maxZ) ) / (aa1+bb));
            //     var phi2 = Math.log((maxZ-cc - Math.sqrt(-aa1*aa1+bb*bb+cc*cc-2*cc*maxZ+maxZ*maxZ) ) / (aa1+bb));
            //     var minZ = -maxZ;
            //     var phi3 = Math.log((minZ-cc + Math.sqrt(-aa*aa+bb*bb+cc*cc-2*cc*minZ+minZ*minZ) ) / (aa+bb));
            //     var phi4 = Math.log((minZ-cc - Math.sqrt(-aa*aa+bb*bb+cc*cc-2*cc*minZ+minZ*minZ) ) / (aa+bb));

            //     console.log(">",phimult11.toFixed(3),phimult12.toFixed(3), phimult21.toFixed(3), phimult22.toFixed(3),
            //                     phi1.toFixed(3), phi2.toFixed(3), phi3.toFixed(3), phi4.toFixed(3));
            //     phimult21 = phi3;
            //     phimult22 = phi4;
            //     phimult11 = phi1;
            //     phimult12 = phi2;
            // }

            lineVertices[0] = [];
            for (var j = 0; j <= slices; j++) {
                var phi = j/slices*(phimult12-phimult11) + phimult11;

                var pt0 = c1*Math.sinh(phi)+t0;
                var ps0 = a1*Math.cosh(phi)+s0;

                var pt = pt0*cosphi+ps0*sinphi;
                var ps = -pt0*sinphi+ps0*cosphi;

                var px = ox+ps*ux+pt*vx;
                var py = oy+ps*uy+pt*vy;
                var pz = oz+ps*uz+pt*vz;
                lineVertices[0].push( [py, pz, px] );
            }
            lineVertices[1] = [];
            for (var j = 0; j <= slices; j++) {
                var phi = j/slices*(phimult22-phimult21) + phimult21;

                var pt0 = c1*Math.sinh(phi)+t0;
                var ps0 = -a1*Math.cosh(phi)+s0;

                var pt = pt0*cosphi+ps0*sinphi;
                var ps = -pt0*sinphi+ps0*cosphi;

                var px = ox+ps*ux+pt*vx;
                var py = oy+ps*uy+pt*vy;
                var pz = oz+ps*uz+pt*vz;
                lineVertices[1].push( [py, pz, px] );
            }
        } else if (sqrainv < 0 && sqrcinv > 0) {
            // console.log("Гипербола 2");
            // if ($("#curve").text() != "Сопряжённая гипербола") {
            //     $("#curve").text("Сопряжённая гипербола");
            // }
            if ($("#curve").text() != "Гипербола") {
                $("#curve").text("Гипербола");
            }
            var c1 = Math.sqrt(1.0/sqrcinv);
            var a1 = Math.sqrt(-1.0/sqrainv);

            // var phimult = Math.acosh(c/c1*Math.sinh(phiM));
            var phimult11;
            var phimult12;
            var phimult21;
            var phimult22;
            if (vz>0) {
                phimult11 = -Math.acosh( ( (maxZ+oz) /vz+t0) / c1 );
                phimult12 = Math.acosh( ( (maxZ+oz) /vz+t0) / c1 );
                phimult21 = Math.acosh( ( (maxZ-oz) /vz-t0) / c1 );
                phimult22 = -Math.acosh( ( (maxZ-oz) /vz-t0) / c1 );

                var aaa = cosphi*vz - sinphi*uz;
                var bbb = cosphi*uz + sinphi*vz;
                var aa = aaa*c1;
                var aa1 = -aaa*c1;
                var bb = bbb*a1;
                var cc = oz+t0*aaa+s0*bbb;
                var phi1 = Math.log((maxZ-cc + Math.sqrt(-aa*aa+bb*bb+cc*cc-2*cc*maxZ+maxZ*maxZ) ) / (aa+bb));
                var phi2 = Math.log((maxZ-cc - Math.sqrt(-aa*aa+bb*bb+cc*cc-2*cc*maxZ+maxZ*maxZ) ) / (aa+bb));
                var minZ = -maxZ;
                var phi3 = Math.log((minZ-cc + Math.sqrt(-aa1*aa1+bb*bb+cc*cc-2*cc*minZ+minZ*minZ) ) / (aa1+bb));
                var phi4 = Math.log((minZ-cc - Math.sqrt(-aa1*aa1+bb*bb+cc*cc-2*cc*minZ+minZ*minZ) ) / (aa1+bb));

                console.log(">",phimult11.toFixed(3),phimult12.toFixed(3), phimult21.toFixed(3), phimult22.toFixed(3),
                                phi1.toFixed(3), phi2.toFixed(3), phi3.toFixed(3), phi4.toFixed(3));
                phimult11 = phi3;
                phimult12 = phi4;
                phimult21 = phi1;
                phimult22 = phi2;
            } else {
                phimult11 = -Math.acosh( ( -(maxZ-oz) /vz+t0) / c1 );
                phimult12 = Math.acosh( ( -(maxZ-oz) /vz+t0) / c1 );
                phimult21 = Math.acosh( ( -(maxZ+oz) /vz-t0) / c1 );
                phimult22 = -Math.acosh( ( -(maxZ+oz) /vz-t0) / c1 );

                var aaa = cosphi*vz - sinphi*uz;
                var bbb = cosphi*uz + sinphi*vz;
                var aa = aaa*c1;
                var aa1 = -aaa*c1;
                var bb = bbb*a1;
                var cc = oz+t0*aaa+s0*bbb;
                var phi1 = Math.log((maxZ-cc + Math.sqrt(-aa1*aa1+bb*bb+cc*cc-2*cc*maxZ+maxZ*maxZ) ) / (aa1+bb));
                var phi2 = Math.log((maxZ-cc - Math.sqrt(-aa1*aa1+bb*bb+cc*cc-2*cc*maxZ+maxZ*maxZ) ) / (aa1+bb));
                var minZ = -maxZ;
                var phi3 = Math.log((minZ-cc + Math.sqrt(-aa*aa+bb*bb+cc*cc-2*cc*minZ+minZ*minZ) ) / (aa+bb));
                var phi4 = Math.log((minZ-cc - Math.sqrt(-aa*aa+bb*bb+cc*cc-2*cc*minZ+minZ*minZ) ) / (aa+bb));

                console.log(">",phimult11.toFixed(3),phimult12.toFixed(3), phimult21.toFixed(3), phimult22.toFixed(3),
                                phi1.toFixed(3), phi2.toFixed(3), phi3.toFixed(3), phi4.toFixed(3));
                phimult11 = phi1;
                phimult12 = phi2;
                phimult21 = phi3;
                phimult22 = phi4;
            }

            lineVertices[0] = [];
            for (var j = 0; j <= slices; j++) {
                // var phi = (j/slices*2-1)*phimult1;
                var phi = j/slices*(phimult12-phimult11) + phimult11;

                var pt0 = -c1*Math.cosh(phi)+t0;
                var ps0 = a1*Math.sinh(phi)+s0;

                var pt = pt0*cosphi+ps0*sinphi;
                var ps = -pt0*sinphi+ps0*cosphi;

                var px = ox+ps*ux+pt*vx;
                var py = oy+ps*uy+pt*vy;
                var pz = oz+ps*uz+pt*vz;
                lineVertices[0].push( [py, pz, px] );
            }
            lineVertices[1] = [];
            for (var j = 0; j <= slices; j++) {
                // var phi = (j/slices*2-1)*phimult2;
                var phi = j/slices*(phimult22-phimult21) + phimult21;

                var pt0 = c1*Math.cosh(phi)+t0;
                var ps0 = a1*Math.sinh(phi)+s0;

                var pt = pt0*cosphi+ps0*sinphi;
                var ps = -pt0*sinphi+ps0*cosphi;

                var px = ox+ps*ux+pt*vx;
                var py = oy+ps*uy+pt*vy;
                var pz = oz+ps*uz+pt*vz;
                lineVertices[1].push( [py, pz, px] );
            }
        } else if (sqrainv > 0 && sqrcinv > 0) {
            // console.log("Эллипс");
            if ($("#curve").text() != "Эллипс") {
                $("#curve").text("Эллипс");
            }
            var c1 = Math.sqrt(1.0/sqrcinv);
            var a1 = Math.sqrt(1.0/sqrainv);

            var psimult11, psimult12;
            var psimult21, psimult22;
            var acos1 = ((maxZ-oz) /vz-t0) / c1;
            var acos2 = ((maxZ+oz) /vz+t0) / c1;
            var visibleEll = true;
            if ( Math.abs( acos1 ) >= 1 && Math.abs( acos2 ) >= 1) {
                psimult11 = 0;
                psimult12 = Math.PI;
                psimult21 = Math.PI;
                psimult22 = Math.PI*2;
                if (acos1*acos2 < 0) {
                    visibleEll = false;
                }
            } else if ( Math.abs( acos1 ) < 1 && Math.abs( acos2 ) < 1) {
                psimult11 = Math.acos( ( (maxZ-oz) /vz-t0) / c1);
                psimult12 = Math.PI-Math.acos( ( (maxZ+oz) /vz+t0) / c1);
                psimult21 = Math.PI+Math.acos( ( (maxZ+oz) /vz+t0) / c1);
                psimult22 = Math.PI*2-Math.acos( ( (maxZ-oz) /vz-t0) / c1);
            } else if (Math.abs( acos1 ) < 1) {
                psimult11 = Math.acos( ( (maxZ-oz) /vz-t0) / c1);
                psimult12 = Math.PI;
                psimult21 = Math.PI;
                psimult22 = Math.PI*2-Math.acos( ( (maxZ-oz) /vz-t0) / c1);
            } else {
                psimult11 = -Math.PI+Math.acos( ( (maxZ+oz) /vz+t0) / c1);
                psimult12 = 0;
                psimult21 = 0;
                psimult22 = Math.PI-Math.acos( ( (maxZ+oz) /vz+t0) / c1);
            }
            // console.log(": ", acos1.toFixed(2), acos2.toFixed(2), psimult11.toFixed(2), psimult12.toFixed(2), psimult21.toFixed(2), psimult22.toFixed(2));

            if (visibleEll) {
                lineVertices[0] = [];
                for (var i = 0; i <= slices1; i++) {
                    var psi = i/slices1*(psimult12-psimult11) + psimult11;
                    var pt0 = c1*Math.cos(psi)+t0;
                    var ps0 = a1*Math.sin(psi)+s0;
                    var pt = pt0*cosphi+ps0*sinphi;
                    var ps = -pt0*sinphi+ps0*cosphi;

                    var px = ox+ps*ux+pt*vx;
                    var py = oy+ps*uy+pt*vy;
                    var pz = oz+ps*uz+pt*vz;

                    lineVertices[0].push( [py, pz, px] );
                }
                lineVertices[1] = [];
                for (var i = 0; i <= slices1; i++) {
                    var psi = i/slices1*(psimult22-psimult21) + psimult21;
                    var pt0 = c1*Math.cos(psi)+t0;
                    var ps0 = a1*Math.sin(psi)+s0;
                    var pt = pt0*cosphi+ps0*sinphi;
                    var ps = -pt0*sinphi+ps0*cosphi;

                    var px = ox+ps*ux+pt*vx;
                    var py = oy+ps*uy+pt*vy;
                    var pz = oz+ps*uz+pt*vz;

                    lineVertices[1].push( [py, pz, px] );
                }
            }
        } else if (sqrainv < 0 && sqrcinv < 0) {
            // console.log("Мнимый эллипс");
            if ($("#curve").text() != "Мнимый эллипс") {
                $("#curve").text("Мнимый эллипс");
            }
        } else {

            // console.log("Что-то");
            // if ($("#curve").text() != "Что-то") {
            //     $("#curve").text("Что-то");
            // }
            if ($("#curve").text() != "-") {
                $("#curve").text("-");
            }
        }

    }

    for (var j = 0; j < lineVertices.length; j++) {
        for (var i = 0; i < lineVertices[j].length-1; i++) {
            primitives.push({class:"line", text: "", arr0:lineVertices[j][i], arr1:lineVertices[j][i+1], rad:2, color:arrcol4});
        }
    }

    // var p1 = [points[2].coord1[0]+c*2.2*vy, points[2].coord1[1]+c*2.2*vz, a*2.5];
    // var p2 = [points[2].coord1[0]+c*2.2*vy, points[2].coord1[1]+c*2.2*vz, -a*2.5];
    // var p3 = [points[2].coord1[0]-c*2.2*vy, points[2].coord1[1]-c*2.2*vz, -a*2.5];
    // var p4 = [points[2].coord1[0]-c*2.2*vy, points[2].coord1[1]-c*2.2*vz, a*2.5];
    var p1 = [];
    var p2 = [];
    var p3 = [];
    var p4 = [];
    createPlane([points[2].coord1[0], points[2].coord1[1], points[2].coord1[2]],
                [points[2].coord1[0]+vectorU[0]+vectorV[0], points[2].coord1[1]+vectorU[1]+vectorV[1], points[2].coord1[2]+vectorU[2]+vectorV[2]],
                [points[2].coord1[0]+vectorU[0]-vectorV[0], points[2].coord1[1]+vectorU[1]-vectorV[1], points[2].coord1[2]+vectorU[2]-vectorV[2]],
                p1,p2,p3,p4,
                Math.sqrt(a*a+b*b+c*c)*2);
    primitives.push({class:"plane", text: "", arr0: p1, arr1: p2, arr2: p3, arr3: p4, color:[0.0,0.0,1.0,0.2]});

}

    function polySet13d(p1st, p1stOut) {
        var n = 1;
        for(var i = 0; i <= n; i++) {
            for(var j = 0; j <= n-i; j++) {
                for(var k = 0; k <= n-i-j; k++) {
                    p1stOut[i][j][k] = p1st[i][j][k];
                }
            }
        }
    }
    function polyCreate23d(p2nd) {
        var p2ndOut = [[[],[],[]], [[],[]], [[]]];
        var n = 2;
        for(var i = 0; i <= n; i++) {
            for(var j = 0; j <= n-i; j++) {
                for(var k = 0; k <= n-i-j; k++) {
                    if (!p2nd) {
                        p2ndOut[i][j][k] = 0;
                    } else {
                        p2ndOut[i][j][k] = p2nd[i][j][k];
                    }
                }
            }
        }
        return p2ndOut;
    }
    function polyAdd2to23d(p2nd1, p2nd2) {
        var n = 2;
        for(var i = 0; i <= n; i++) {
            for(var j = 0; j <= n-i; j++) {
                for(var k = 0; k <= n-i-j; k++) {
                    p2nd1[i][j][k] += p2nd2[i][j][k];
                }
            }
        }
    }
    function polyMultNumberto13d(p1st, val) {
        var n = 1;
        for(var i = 0; i <= n; i++) {
            for(var j = 0; j <= n-i; j++) {
                for(var k = 0; k <= n-i-j; k++) {
                    p1st[i][j][k] *= val;
                }
            }
        }
    }
    function polyMultNumberto23d(p2nd, val) {
        var n = 2;
        for(var i = 0; i <= n; i++) {
            for(var j = 0; j <= n-i; j++) {
                for(var k = 0; k <= n-i-j; k++) {
                    p2nd[i][j][k] *= val;
                }
            }
        }
    }
    function polyAdd1to23d(p2nd, p1st) {
        var n = 1;
        for(var i = 0; i <= n; i++) {
            for(var j = 0; j <= n-i; j++) {
                for(var k = 0; k <= n-i-j; k++) {
                    p2nd[i][j][k] += p1st[i][j][k];
                }
            }
        }
    }
    function polyMult3d(p1, p2, pOut) {
        if (!pOut) {
            pOut = [];
        }
        var n = 1;
        for(var i = 0; i <= 2*n; i++) {
            if (!pOut[i]) {
                pOut[i] = [];
            }
            for(var j = 0; j <= 2*n-i; j++) {
                if (!pOut[i][j]) {
                    pOut[i][j] = [];
                }
                for(var k = 0; k <= 2*n-j-i; k++) {
                    pOut[i][j][k] = 0;
                }
            }
        }
        for(var i = 0; i <= n; i++) {
            for(var j = 0; j <= n-i; j++) {
                for(var p = 0; p <= n-i-j; p++) {
                    for(var k = 0; k <= n; k++) {
                        for(var l = 0; l <= n-k; l++) {
                            for(var q = 0; q <= n-k-l; q++) {
                                pOut[i+k][j+l][p+q]+=p1[i][j][p]*p2[k][l][q];
                            }
                        }
                    }
                }
            }
        }
    }
function changeP3dAll(poly1, poly2, poly3, p1, pOut) {
    if (!pOut) {
        pOut = [];
    }
    var n = 2;
    for(var i = 0; i <= n; i++) {
        if (!pOut[i]) {
            pOut[i] = [];
        }
        for(var j = 0; j <= n-i; j++) {
            if (!pOut[i][j]) {
                pOut[i][j] = [];
            }
            for(var k = 0; k <= n-j-i; k++) {
                pOut[i][j][k] = 0;
            }
        }
    }

    pOut[0][0][0] = p1[0][0][0];

    var temp2nd = [[[],[],[]], [[],[]], [[]]];
    var temp1st = [[[],[]], [[]]];
    polySet13d(poly1, temp1st);
    polyMultNumberto13d(temp1st, p1[0][0][1]);
    polyAdd1to23d(pOut, temp1st);

    polySet13d(poly2, temp1st);
    polyMultNumberto13d(temp1st, p1[0][1][0]);
    polyAdd1to23d(pOut, temp1st);

    polySet13d(poly3, temp1st);
    polyMultNumberto13d(temp1st, p1[1][0][0]);
    polyAdd1to23d(pOut, temp1st);

    polyMult3d(poly1, poly2, temp2nd);
    polyMultNumberto23d(temp2nd, p1[0][1][1]);
    polyAdd2to23d(pOut, temp2nd);

    polyMult3d(poly1, poly3, temp2nd);
    polyMultNumberto23d(temp2nd, p1[1][0][1]);
    polyAdd2to23d(pOut, temp2nd);

    polyMult3d(poly2, poly3, temp2nd);
    polyMultNumberto23d(temp2nd, p1[1][1][0]);
    polyAdd2to23d(pOut, temp2nd);

    polyMult3d(poly1, poly1, temp2nd);
    polyMultNumberto23d(temp2nd, p1[0][0][2]);
    polyAdd2to23d(pOut, temp2nd);

    polyMult3d(poly2, poly2, temp2nd);
    polyMultNumberto23d(temp2nd, p1[0][2][0]);
    polyAdd2to23d(pOut, temp2nd);

    polyMult3d(poly3, poly3, temp2nd);
    polyMultNumberto23d(temp2nd, p1[2][0][0]);
    polyAdd2to23d(pOut, temp2nd);
}

function toFloat(x, n) {
    if (n == undefined) {
        n = 10;
    }
    return parseFloat(x.toFixed(n));
}
var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([b+1, 0, 0]), movable: "fixed", vector:[1,0,0]});
    points.push({coord1: vec3.create([0, 0, a+1]), movable: "fixed", vector:[0,0,1]});
    // points.push({coord1: vec3.create([b+1, 0, a+1]), movable: "line", vector:[0,1,0]});

    points.push({coord1: vec3.create([b*0.5, 0, a+2]), movable: "free", vector:[0,0,1]});
    // points.push({coord1: vec3.create([0.6546592712402344, 1.0456407070159912, 2.023681163787842]), movable: "free", vector:[0,0,1]});
    // points.push({coord1: vec3.create([3.487440586090088, -2.6769325733184814, 0.32039400935173035]), movable: "free", vector:[0,0,1]});
    // points.push({coord1: vec3.create([3.131138801574707, 4.393884658813477, 3.729395866394043]), movable: "free", vector:[0,0,1]});
    // points.push({coord1: vec3.create([1.2262409925460815, -0.28106650710105896, 3.614309787750244]), movable: "free", vector:[0,0,1]});

    points.push({coord1: vec3.create([0, c+2, 0]), movable: "fixed", vector:[0,1,0]});
    points.push({coord1: [], movable: "free", vector:vectorU});
    points.push({coord1: [], movable: "free", vector:vectorV});

    vec3.add(points[2].coord1, vectorV, points[4].coord1);
    vec3.add(points[2].coord1, vectorU, points[5].coord1);
}
function initDescr() {
    var descr = "";
    descr += '<p>Уравнение гиперболического параболоида:$$\\frac{x^2}{a^2}-\\frac{y^2}{b^2}=2pz$$</p>';
    var tIS = 5;
    descr += '<p>$a$<input type="text" id="a" size="'+tIS+'"> \
                 $b$<input type="text" id="b" size="'+tIS+'"> \
                 $p$<input type="text" id="p" size="'+tIS+'"></p>';
    descr += '<label><input type="checkbox" checked onchange="isShowHyp=this.checked; initBuffers();"> Показать поверхность</label>';

    descr += '<p>Секущая плоскость проходит через прямые, задаваемые векторами $\\vec u=\\overrightarrow{M_0M_1}$ и $\\vec v=\\overrightarrow{M_0M_2}$.</p>';

    descr += '<p>$M_0$:<br>$x_0$<input type="text" id="x0" size="'+tIS+'"> \
                 $y_0$<input type="text" id="y0" size="'+tIS+'"> \
                 $z_0$<input type="text" id="z0" size="'+tIS+'"></p>';
    descr += '<p>$u_x$<input type="text" id="ux" size="'+tIS+'"> \
                 $u_y$<input type="text" id="uy" size="'+tIS+'"> \
                 $u_z$<input type="text" id="uz" size="'+tIS+'"></p>';
    descr += '<p>$v_x$<input type="text" id="vx" size="'+tIS+'"> \
                 $v_y$<input type="text" id="vy" size="'+tIS+'"> \
                 $v_z$<input type="text" id="vz" size="'+tIS+'"></p>';
    descr += 'Кривая в сечении: <span id="curve" style="font-weight: 600;"></span>';
    descr += '<label><input type="checkbox" checked onchange="isShowСross=this.checked; initBuffers();"> Показать сечение</label>';
    descr += '<p>Примеры кривых в сечении:<br>';
    descr += '<button onclick="changeToPar1();">Парабола 1</button><br>';
    descr += '<button onclick="changeToPar2();">Парабола 2</button><br>';
    descr += '<button onclick="changeToCross();">Пара пересекающихся прямых</button><br>';
    descr += '<button onclick="changeToHyp();">Гипербола</button><br>';
    descr += '<button onclick="changeToLine();">Прямая</button><br>';
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
    $("#p").change(function(event){
                                       points[3].coord1[1] = 2+1/2/Math.abs(parseFloat(this.value));
                                       initBuffers();
                                  });

    $("#x0").change(function(event){
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
    $("Title").html("Гиперболический параболоид");
}
var a = 1.5;
var b = 2;
var c = 1;
var isShowHyp = true;
var isShowСross = true;
var vectorU = [0,0,2];
var vectorV = [0,2,0];
// var vectorV = [0.002781660867729574, 6.116952419722421, -1.5415244092908456];

// var vectorU = [-0.06642866600304842, 0.6045357694451914, 0.20368038304150105];
// var vectorV = [ 0.6114843389950693, 0.44166749762569335, 0.11238349112868296];

// var vectorU = [-0.31630602199584246, 0.9021811073248491, 0.2090941872447729];
// var vectorV = [ -0.09874232718721032, -0.3510625692995939, -1.6928281572163106];

// var vectorU = [ 0.4320801571011543, 0.39329246431589127, 0.222793310880661];
// var vectorV = [-1.7521779984235764, 0.642383337020874, -0.31184259057044983];


var nuberEpsilon = 1e-100;

function changeToPar1() {
    points[2].coord1[0] = b*0.5;
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
function changeToPar2() {
    points[2].coord1[0] = b+2;
    points[2].coord1[1] = 0;
    points[2].coord1[2] = -a;
    vectorV[0] = 0;
    vectorV[1] = 2;
    vectorV[2] = 0;
    vectorU[0] = -2;
    vectorU[1] = 0;
    vectorU[2] = 0;
    updatePointO();
    updateVectorV();
    updateVectorU();
    initBuffers();
}
function changeToCross() {
    points[2].coord1[0] = 0;
    points[2].coord1[1] = 0;
    points[2].coord1[2] = a+2;
    vectorV[0] = -2;
    vectorV[1] = 0;
    vectorV[2] = 0;
    vectorU[0] = 0;
    vectorU[1] = 0;
    vectorU[2] = 2;
    updatePointO();
    updateVectorV();
    updateVectorU();
    initBuffers();
}
function changeToHyp() {
    points[2].coord1[0] = b/2;
    points[2].coord1[1] = c;
    points[2].coord1[2] = a+2;
    vectorV[0] = -2;
    vectorV[1] = 0;
    vectorV[2] = 0;
    vectorU[0] = 0;
    vectorU[1] = 0;
    vectorU[2] = 2;
    updatePointO();
    updateVectorV();
    updateVectorU();
    initBuffers();
}
function changeToHyp2() {
    points[2].coord1[0] = b/2;
    points[2].coord1[1] = -c;
    points[2].coord1[2] = a+2;
    vectorV[0] = -2;
    vectorV[1] = 0;
    vectorV[2] = 0;
    vectorU[0] = 0;
    vectorU[1] = 0;
    vectorU[2] = 2;
    updatePointO();
    updateVectorV();
    updateVectorU();
    initBuffers();
}
function changeToLine() {
    points[2].coord1[0] = b/2;
    points[2].coord1[1] = c;
    points[2].coord1[2] = a+2;
    vectorV[0] = 0;
    vectorV[1] = 2;
    vectorV[2] = 0;
    vectorU[0] = b;
    vectorU[1] = 0;
    vectorU[2] = a;
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
    $("#p").val(parseFloat((1/2/c).toPrecision(3)));

    var vertices = [];
    var indices = [];
    var normals = [];
    var lineVertices = [];
    var slices1 = 32;
    var slices = 32;
    var angle = 2*Math.PI;

    var maxX = Math.abs(points[1].coord1[2]);
    var maxY = Math.abs(points[0].coord1[0]);

    var psiM = maxY/b;
    var phiM = maxX/a;

    var maxZ = Math.max(Math.abs(c*(psiM*psiM)), Math.abs(c*(phiM*phiM)));
    // console.log(maxX, maxY, maxZ);

    vertices[0] = [];
    normals[0] = [];
    for (var i = 0; i <= slices1; i++) {
        var psi = (i/slices1*2-1)*psiM;
        for (var j = 0; j <= slices; j++) {
            var phi = (j/slices*2-1)*phiM;

            var py = b*psi;
            var pz = c*(phi*phi-psi*psi);
            var px = a*phi;
            vertices[0].push( py, pz, px );
            normals[0].push( -2*py/b/b );
            normals[0].push( -1/c );
            normals[0].push( 2*px/a/a );
        }
    }
    var poly3rd2 = [[[0,0, 1.0/a/a],[0,0],[-1.0/b/b]], [[-1.0/c,0],[0]], [[0]]];

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
                if (i==0) {
                    primitives.push({class:"line", text: "", arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]], arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]], rad:1, color:colorl});
                }
                if (i%16==15) {
                    primitives.push({class:"line", text: "", arr0:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]], arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]], rad:1, color:colorl});
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
    // var crossUV = [];
    // var ortnormalU = [];
    // var ortnormalV = [];
    // vec3.cross(vectorU, vectorV, crossUV);
    // vec3.cross(vectorV, crossUV, ortnormalU);
    // vec3.normalize(ortnormalU);
    // vec3.normalize(vectorV, ortnormalV);
    // var ux = ortnormalU[2];
    // var uy = ortnormalU[0];
    // var uz = ortnormalU[1];
    // var vx = ortnormalV[2];
    // var vy = ortnormalV[0];
    // var vz = ortnormalV[1];

    var ox = points[2].coord1[2];
    var oy = points[2].coord1[0];
    var oz = points[2].coord1[1];

    $("#ux").val(parseFloat(vectorU[2].toPrecision(3)));
    $("#uy").val(parseFloat(vectorU[0].toPrecision(3)));
    $("#uz").val(parseFloat(vectorU[1].toPrecision(3)));
    $("#vx").val(parseFloat(vectorV[2].toPrecision(3)));
    $("#vy").val(parseFloat(vectorV[0].toPrecision(3)));
    $("#vz").val(parseFloat(vectorV[1].toPrecision(3)));

    // if (vz < 0) {
    //     vx *= -1;
    //     vy *= -1;
    //     vz *= -1;
    // }
    // if (ux < 0) {
    //     ux *= -1;
    //     uy *= -1;
    //     uz *= -1;
    // }

    primitives.push({class:"point", text: katex.renderToString("M_2"), arr0:points[4].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec v"), arr0:points[2].coord1, arr1:points[4].coord1, rad:2, color:[0.8, 0.8, 0.8, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("M_1"), arr0:points[5].coord1, rad:4, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec u"), arr0:points[2].coord1, arr1:points[5].coord1, rad:2, color:[0.8, 0.8, 0.8, 1.0]});

    primitives.push({class:"point", text: katex.renderToString("M_0"), arr0:points[2].coord1, rad:4, color:[0.0, 0.0, 1.0, 1.0]});

    $("#x0").val(parseFloat(ox.toPrecision(3)));
    $("#y0").val(parseFloat(oy.toPrecision(3)));
    $("#z0").val(parseFloat(oz.toPrecision(3)));


    var poly3rd11 = [[[ox, ux],[0]], [[vx]]];
    var poly3rd12 = [[[oy, uy],[0]], [[vy]]];
    var poly3rd13 = [[[oz, uz],[0]], [[vz]]];
    var polyEll1 = polyCreate23d();
    var poly3rd = polyCreate23d();

    changeP3dAll(poly3rd11, poly3rd12, poly3rd13, poly3rd2, polyEll1);

    var tgphi;
    var sinphi;
    var cosphi;

    console.log(polyEll1[2][0][0], "t^2", polyEll1[0][0][2], "s^2", polyEll1[1][0][1], "ts", polyEll1[1][0][0], "t", polyEll1[0][0][1], "s", polyEll1[0][0][0], "");
    if (Math.abs(polyEll1[1][0][1]) > nuberEpsilon) { // избавление от XZ
        var eqvb = (polyEll1[0][0][2]-polyEll1[2][0][0]) / polyEll1[1][0][1] * 2.0;
        tgphi = (-eqvb+Math.sqrt(eqvb*eqvb+4.0)) / 2.0;

        sinphi = tgphi/Math.sqrt(1.0+tgphi*tgphi);
        cosphi = 1.0/Math.sqrt(1.0+tgphi*tgphi);
    } else {
        tgphi = 0.0;
        sinphi = 0.0;
        cosphi = 1.0;
    }

    var poly3rd11 = [[[0,cosphi],[0]], [[-sinphi]]];
    var poly3rd12 = [[[0,0],[1]], [[0]]];
    var poly3rd13 = [[[0,sinphi],[0]], [[cosphi]]];
    changeP3dAll(poly3rd11, poly3rd12, poly3rd13, polyEll1, poly3rd);
    console.log(poly3rd[2][0][0], "t^2", poly3rd[0][0][2], "s^2", poly3rd[1][0][1], "ts", poly3rd[1][0][0], "t", poly3rd[0][0][1], "s", poly3rd[0][0][0], "");
    // poly3rd[1][0][1] = 0;


    var s0 = Math.abs(poly3rd[0][0][2]) > nuberEpsilon ? -poly3rd[0][0][1]/2.0/poly3rd[0][0][2] : 0;
    var y0 = Math.abs(poly3rd[0][2][0]) > nuberEpsilon ? -poly3rd[0][1][0]/2.0/poly3rd[0][2][0] : 0;
    var t0 = Math.abs(poly3rd[2][0][0]) > nuberEpsilon ? -poly3rd[1][0][0]/2.0/poly3rd[2][0][0] : 0;

    // console.log(toFloat(s0), toFloat(y0), toFloat(t0), toFloat(cosphi), toFloat(sinphi));

    console.log(s0, y0, t0, cosphi, sinphi);

    var poly3rd11 = [[[s0,1],[0]], [[0]]];
    var poly3rd12 = [[[y0,0],[1]], [[0]]];
    var poly3rd13 = [[[t0,0],[0]], [[1]]];
    changeP3dAll(poly3rd11, poly3rd12, poly3rd13, poly3rd, polyEll1);
    console.log(polyEll1[2][0][0], "t^2", polyEll1[0][0][2], "s^2", polyEll1[1][0][1], "ts", polyEll1[1][0][0], "t", polyEll1[0][0][1], "s", polyEll1[0][0][0], "");

    var rightZero = Math.abs(polyEll1[0][0][0]) < nuberEpsilon;
    if (!rightZero) {
        polyMultNumberto23d(polyEll1, -1.0/polyEll1[0][0][0]);
    }

    {
        var sqrainv = polyEll1[0][0][2];
        var sqrcinv = polyEll1[2][0][0];
        console.log(toFloat(sqrainv), toFloat(sqrcinv), rightZero, toFloat(polyEll1[0][0][1]), toFloat(polyEll1[1][0][0]));
/*        if (Math.abs(sqrainv) < nuberEpsilon) {
            var bx = polyEll1[0][0][1];

            if (bx != 0 && sqrcinv != 0) {
                if ($("#curve").text() != "Парабола2") {
                    $("#curve").text("Парабола2");
                }
                // console.log("Парабола");
                var p = -bx/sqrcinv/2.0;
                if (!rightZero) {
                    s0 = 1.0/bx;
                }

                function F(u,v,coordO,coordLimit,cT,cS) {
                    var aaa = cosphi*v - sinphi*u;
                    var bbb = cosphi*u + sinphi*v;
                    var aa = aaa*cT;
                    var bb = bbb*cS;
                    var cc = coordO+t0*aaa+s0*bbb;

                    if (bb == 0) {
                        console.log("bb == 0",bb);
                        return {isRes: [true, false], res: [(coordLimit-cc)/aa]};
                    }

                    var sqr = aa*aa-4*bb*(cc-coordLimit);
                    if (sqr < 0 || bb == 0) {
                        console.log("sqr < 0 || bb == 0",sqr,bb);
                        return {isRes: [false, false], res: []};
                    }

                    var sqrt = Math.sqrt(sqr);

                    var res = [];
                    res[0] = (aa - sqrt)/2/bb;
                    res[1] = (aa + sqrt)/2/bb;

                    return {isRes: [true, true], res: res};;
                }

                var phi12y1 = F(uy, vy, oy, -maxY, 1, 1/2/p);
                var phi12y2 = F(uy, vy, oy, maxY, 1, 1/2/p);
                var phi12x1 = F(ux, vx, ox, -maxX, 1, 1/2/p);
                var phi12x2 = F(ux, vx, ox, maxX, 1, 1/2/p);

                // console.log("-y(+a)", phi12y1.isRes[0], phi12y1.isRes[1], phi12y1.res[0], phi12y1.res[1]);
                // console.log("+y(+a)", phi12y2.isRes[0], phi12y2.isRes[1], phi12y2.res[0], phi12y2.res[1]);
                // console.log("-x(+a)", phi12x1.isRes[0], phi12x1.isRes[1], phi12x1.res[0], phi12x1.res[1]);
                // console.log("+x(+a)", phi12x2.isRes[0], phi12x2.isRes[1], phi12x2.res[0], phi12x2.res[1]);

                // console.log("-y(-a)", phi34y1.isRes[0], phi34y1.isRes[1], phi34y1.res[0], phi34y1.res[1]);
                // console.log("+y(-a)", phi34y2.isRes[0], phi34y2.isRes[1], phi34y2.res[0], phi34y2.res[1]);
                // console.log("-x(-a)", phi34x1.isRes[0], phi34x1.isRes[1], phi34x1.res[0], phi34x1.res[1]);
                // console.log("+x(-a)", phi34x2.isRes[0], phi34x2.isRes[1], phi34x2.res[0], phi34x2.res[1]);

                var phiArrX0 = [];
                if (phi12x1.isRes[0]) phiArrX0.push(phi12x1.res[0]);
                if (phi12x1.isRes[1]) phiArrX0.push(phi12x1.res[1]);
                if (phi12x2.isRes[0]) phiArrX0.push(phi12x2.res[0]);
                if (phi12x2.isRes[1]) phiArrX0.push(phi12x2.res[1]);
                phiArrX0.sort(compareNumeric);
                console.log("phiArrX0", phiArrX0);

                var phiArrX = [];
                if (phiArrX0.length > 2) {
                    phiArrX[0] = phiArrX0.slice(0, 2);
                    phiArrX[1] = phiArrX0.slice(2, phiArrX0.length);
                } else if (phiArrX0.length != 0) {
                    phiArrX[0] = phiArrX0;
                }

                var phiArrY0 = [];
                if (phi12y1.isRes[0]) phiArrY0.push(phi12y1.res[0]);
                if (phi12y1.isRes[1]) phiArrY0.push(phi12y1.res[1]);
                if (phi12y2.isRes[0]) phiArrY0.push(phi12y2.res[0]);
                if (phi12y2.isRes[1]) phiArrY0.push(phi12y2.res[1]);
                phiArrY0.sort(compareNumeric);
                console.log("phiArrY0", phiArrY0);

                var phiArrY = [];
                if (phiArrY0.length > 2) {
                    phiArrY[0] = phiArrY0.slice(0, 2);
                    phiArrY[1] = phiArrY0.slice(2, phiArrY0.length);
                } else if (phiArrY0.length != 0) {
                    phiArrY[0] = phiArrY0;
                }

                var phiArr = [];
                for (var i = 0; i < phiArrX.length; i++) {
                    for (var j = 0; j < phiArrY.length; j++) {
                        var newInterval = intersectIntervals(phiArrX[i], phiArrY[j]);
                        if (newInterval) {
                            phiArr.push(newInterval);
                        }
                    }
                }
                console.log("phiArr", phiArr);

                var linesCount = 0;

                for (var i = 0; i < phiArr.length; i++) {
                    lineVertices[linesCount] = [];
                    for (var j = 0; j <= slices; j++) {
                        var phi = j/slices*(phiArr[i][1]-phiArr[i][0]) + phiArr[i][0];

                        var pt0 = phi+t0;
                        var ps0 = phi*phi/2/p+s0;

                        var pt = pt0*cosphi+ps0*sinphi;
                        var ps = -pt0*sinphi+ps0*cosphi;

                        var px = ox+ps*ux+pt*vx;
                        var py = oy+ps*uy+pt*vy;
                        var pz = oz+ps*uz+pt*vz;
                        lineVertices[linesCount].push( [py, pz, px] );
                    }
                    linesCount++;
                }
            } else {
                if (!rightZero && sqrcinv != 0) {
                    if (sqrcinv < 0) {
                        // console.log("Пара мнимых параллельных прямых");
                        if ($("#curve").text() != "Пара мнимых параллельных прямых") {
                            $("#curve").text("Пара мнимых параллельных прямых");
                        }
                    } else {
                        // console.log("Пара параллельных прямых");
                        if ($("#curve").text() != "Пара параллельных прямых") {
                            $("#curve").text("Пара параллельных прямых");
                        }

                        var a1 = Math.sqrt(1.0/Math.abs(sqrcinv));

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
                    if (!rightZero) {
                        if (polyEll1[1][0][0] != 0) {
                            t0 = 1.0/polyEll1[1][0][0];
                        } else if (polyEll1[0][0][1] != 0) {
                            s0 = 1.0/polyEll1[0][0][1];
                        }
                    }

                    function F(u,v,coordO,coordLimit,cT,cS) {
                        var aaa = cosphi*v - sinphi*u;
                        var bbb = cosphi*u + sinphi*v;
                        var aa = aaa*cT;
                        var bb = bbb*cS;
                        var cc = coordO+t0*aaa+s0*bbb;

                        return {isRes: [true, false], res: [(coordLimit-cc)/(aa+bb)]};
                    }

                    // var phi12y1 = F(uy, vy, oy, -maxY, -polyEll1[1][0][0], -polyEll1[0][0][1]);
                    // var phi12y2 = F(uy, vy, oy, maxY, -polyEll1[1][0][0], -polyEll1[0][0][1]);
                    // var phi12x1 = F(ux, vx, ox, -maxX, -polyEll1[1][0][0], -polyEll1[0][0][1]);
                    // var phi12x2 = F(ux, vx, ox, maxX, -polyEll1[1][0][0], -polyEll1[0][0][1]);

                    var phi12y1 = F(uy, vy, oy, -maxY, polyEll1[0][0][1], polyEll1[1][0][0]);
                    var phi12y2 = F(uy, vy, oy, maxY, polyEll1[0][0][1], polyEll1[1][0][0]);
                    var phi12x1 = F(ux, vx, ox, -maxX, polyEll1[0][0][1], polyEll1[1][0][0]);
                    var phi12x2 = F(ux, vx, ox, maxX, polyEll1[0][0][1], polyEll1[1][0][0]);

                    // console.log("-y(+a)", phi12y1.isRes[0], phi12y1.isRes[1], phi12y1.res[0], phi12y1.res[1]);
                    // console.log("+y(+a)", phi12y2.isRes[0], phi12y2.isRes[1], phi12y2.res[0], phi12y2.res[1]);
                    // console.log("-x(+a)", phi12x1.isRes[0], phi12x1.isRes[1], phi12x1.res[0], phi12x1.res[1]);
                    // console.log("+x(+a)", phi12x2.isRes[0], phi12x2.isRes[1], phi12x2.res[0], phi12x2.res[1]);

                    // console.log("-y(-a)", phi34y1.isRes[0], phi34y1.isRes[1], phi34y1.res[0], phi34y1.res[1]);
                    // console.log("+y(-a)", phi34y2.isRes[0], phi34y2.isRes[1], phi34y2.res[0], phi34y2.res[1]);
                    // console.log("-x(-a)", phi34x1.isRes[0], phi34x1.isRes[1], phi34x1.res[0], phi34x1.res[1]);
                    // console.log("+x(-a)", phi34x2.isRes[0], phi34x2.isRes[1], phi34x2.res[0], phi34x2.res[1]);

                    var phiArrX0 = [];
                    if (phi12x1.isRes[0]) phiArrX0.push(phi12x1.res[0]);
                    if (phi12x1.isRes[1]) phiArrX0.push(phi12x1.res[1]);
                    if (phi12x2.isRes[0]) phiArrX0.push(phi12x2.res[0]);
                    if (phi12x2.isRes[1]) phiArrX0.push(phi12x2.res[1]);
                    phiArrX0.sort(compareNumeric);
                    console.log("phiArrX0", phiArrX0);

                    var phiArrX = [];
                    if (phiArrX0.length > 2) {
                        phiArrX[0] = phiArrX0.slice(0, 2);
                        phiArrX[1] = phiArrX0.slice(2, phiArrX0.length);
                    } else if (phiArrX0.length != 0) {
                        phiArrX[0] = phiArrX0;
                    }

                    var phiArrY0 = [];
                    if (phi12y1.isRes[0]) phiArrY0.push(phi12y1.res[0]);
                    if (phi12y1.isRes[1]) phiArrY0.push(phi12y1.res[1]);
                    if (phi12y2.isRes[0]) phiArrY0.push(phi12y2.res[0]);
                    if (phi12y2.isRes[1]) phiArrY0.push(phi12y2.res[1]);
                    phiArrY0.sort(compareNumeric);
                    console.log("phiArrY0", phiArrY0);

                    var phiArrY = [];
                    if (phiArrY0.length > 2) {
                        phiArrY[0] = phiArrY0.slice(0, 2);
                        phiArrY[1] = phiArrY0.slice(2, phiArrY0.length);
                    } else if (phiArrY0.length != 0) {
                        phiArrY[0] = phiArrY0;
                    }

                    var phiArr = [];
                    for (var i = 0; i < phiArrX.length; i++) {
                        for (var j = 0; j < phiArrY.length; j++) {
                            var newInterval = intersectIntervals(phiArrX[i], phiArrY[j]);
                            if (newInterval) {
                                phiArr.push(newInterval);
                            }
                        }
                    }
                    console.log("phiArr", phiArr);


                    // var phiArr = [[-phimult,phimult]];
                    var linesCount = 0;
                    for (var i = 0; i < phiArr.length; i++) {
                        lineVertices[linesCount] = [];
                        for (var j = 0; j <= 1; j++) {
                            var phi = j*(phiArr[i][1]-phiArr[i][0]) + phiArr[i][0];

                            // var pt0 = phi+t0;
                            // var ps0 = s0;
                            var pt0 = -polyEll1[0][0][1]*phi+t0;
                            var ps0 = polyEll1[1][0][0]*phi+s0;
                            console.log([pt0, ps0]);

                            var pt = pt0*cosphi+ps0*sinphi;
                            var ps = -pt0*sinphi+ps0*cosphi;
                            console.log([pt, ps]);

                            var px = ox+ps*ux+pt*vx;
                            var py = oy+ps*uy+pt*vy;
                            var pz = oz+ps*uz+pt*vz;
                            console.log([py, pz, px]);
                            lineVertices[linesCount].push( [py, pz, px] );
                        }
                        linesCount++;
                    }
                }
            }
        } else */if (Math.abs(sqrcinv) < nuberEpsilon) {
            var by = polyEll1[1][0][0];

            if (by != 0 && sqrainv != 0) {
                if ($("#curve").text() != "Парабола") {
                    $("#curve").text("Парабола");
                }
                // console.log("Парабола");
                var p = -by/sqrainv/2.0;
                if (!rightZero) {
                    t0 = 1.0/by;
                }

                function F(u,v,coordO,coordLimit,cT,cS) {
                    var aaa = cosphi*v - sinphi*u;
                    var bbb = cosphi*u + sinphi*v;
                    var aa = aaa*cT;
                    var bb = bbb*cS;
                    var cc = coordO+t0*aaa+s0*bbb;

                    if (aa == 0) {
                        return {isRes: [true, false], res: [(coordLimit-cc)/bb]};
                    }

                    var sqr = bb*bb-4*aa*(cc-coordLimit);
                    if (sqr < 0 || aa == 0) {
                        return {isRes: [false, false], res: []};
                    }

                    var sqrt = Math.sqrt(sqr);

                    var res = [];
                    res[0] = (bb - sqrt)/2/aa;
                    res[1] = (bb + sqrt)/2/aa;

                    return {isRes: [true, true], res: res};;
                }

                var phi12y1 = F(uy, vy, oy, -maxY, 1/2/p, 1);
                var phi12y2 = F(uy, vy, oy, maxY, 1/2/p, 1);
                var phi12x1 = F(ux, vx, ox, -maxX, 1/2/p, 1);
                var phi12x2 = F(ux, vx, ox, maxX, 1/2/p, 1);

                // console.log("-y(+a)", phi12y1.isRes[0], phi12y1.isRes[1], phi12y1.res[0], phi12y1.res[1]);
                // console.log("+y(+a)", phi12y2.isRes[0], phi12y2.isRes[1], phi12y2.res[0], phi12y2.res[1]);
                // console.log("-x(+a)", phi12x1.isRes[0], phi12x1.isRes[1], phi12x1.res[0], phi12x1.res[1]);
                // console.log("+x(+a)", phi12x2.isRes[0], phi12x2.isRes[1], phi12x2.res[0], phi12x2.res[1]);

                // console.log("-y(-a)", phi34y1.isRes[0], phi34y1.isRes[1], phi34y1.res[0], phi34y1.res[1]);
                // console.log("+y(-a)", phi34y2.isRes[0], phi34y2.isRes[1], phi34y2.res[0], phi34y2.res[1]);
                // console.log("-x(-a)", phi34x1.isRes[0], phi34x1.isRes[1], phi34x1.res[0], phi34x1.res[1]);
                // console.log("+x(-a)", phi34x2.isRes[0], phi34x2.isRes[1], phi34x2.res[0], phi34x2.res[1]);

                var phiArrX0 = [];
                if (phi12x1.isRes[0]) phiArrX0.push(phi12x1.res[0]);
                if (phi12x1.isRes[1]) phiArrX0.push(phi12x1.res[1]);
                if (phi12x2.isRes[0]) phiArrX0.push(phi12x2.res[0]);
                if (phi12x2.isRes[1]) phiArrX0.push(phi12x2.res[1]);
                phiArrX0.sort(compareNumeric);
                // console.log("phiArrX0", phiArrX0);

                var phiArrX = [];
                if (phiArrX0.length > 2) {
                    phiArrX[0] = phiArrX0.slice(0, 2);
                    phiArrX[1] = phiArrX0.slice(2, phiArrX0.length);
                } else if (phiArrX0.length != 0) {
                    phiArrX[0] = phiArrX0;
                }

                var phiArrY0 = [];
                if (phi12y1.isRes[0]) phiArrY0.push(phi12y1.res[0]);
                if (phi12y1.isRes[1]) phiArrY0.push(phi12y1.res[1]);
                if (phi12y2.isRes[0]) phiArrY0.push(phi12y2.res[0]);
                if (phi12y2.isRes[1]) phiArrY0.push(phi12y2.res[1]);
                phiArrY0.sort(compareNumeric);
                // console.log("phiArrX0", phiArrY0);

                var phiArrY = [];
                if (phiArrY0.length > 2) {
                    phiArrY[0] = phiArrY0.slice(0, 2);
                    phiArrY[1] = phiArrY0.slice(2, phiArrY0.length);
                } else if (phiArrY0.length != 0) {
                    phiArrY[0] = phiArrY0;
                }

                var phiArr = [];
                for (var i = 0; i < phiArrX.length; i++) {
                    for (var j = 0; j < phiArrY.length; j++) {
                        var newInterval = intersectIntervals(phiArrX[i], phiArrY[j]);
                        if (newInterval) {
                            phiArr.push(newInterval);
                        }
                    }
                }

                var linesCount = 0;

                for (var i = 0; i < phiArr.length; i++) {
                    lineVertices[linesCount] = [];
                    for (var j = 0; j <= slices; j++) {
                        var phi = j/slices*(phiArr[i][1]-phiArr[i][0]) + phiArr[i][0];

                        var pt0 = phi*phi/2/p+t0;
                        var ps0 = phi+s0;

                        var pt = pt0*cosphi+ps0*sinphi;
                        var ps = -pt0*sinphi+ps0*cosphi;

                        var px = ox+ps*ux+pt*vx;
                        var py = oy+ps*uy+pt*vy;
                        var pz = oz+ps*uz+pt*vz;
                        lineVertices[linesCount].push( [py, pz, px] );
                    }
                    linesCount++;
                }
            } else {
                if (!rightZero && sqrainv != 0) {
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
                    if (!rightZero) {
                        if (polyEll1[1][0][0] != 0) {
                            t0 = 1.0/polyEll1[1][0][0];
                        } else if (polyEll1[0][0][1] != 0) {
                            s0 = 1.0/polyEll1[0][0][1];
                        }
                    }

                    function F(u,v,coordO,coordLimit,cT,cS) {
                        var aaa = cosphi*v - sinphi*u;
                        var bbb = cosphi*u + sinphi*v;
                        var aa = aaa*cT;
                        var bb = bbb*cS;
                        var cc = coordO+t0*aaa+s0*bbb;

                        return {isRes: [true, false], res: [(coordLimit-cc)/(aa+bb)]};
                    }

                    // var phi12y1 = F(uy, vy, oy, -maxY, -polyEll1[1][0][0], -polyEll1[0][0][1]);
                    // var phi12y2 = F(uy, vy, oy, maxY, -polyEll1[1][0][0], -polyEll1[0][0][1]);
                    // var phi12x1 = F(ux, vx, ox, -maxX, -polyEll1[1][0][0], -polyEll1[0][0][1]);
                    // var phi12x2 = F(ux, vx, ox, maxX, -polyEll1[1][0][0], -polyEll1[0][0][1]);

                    var phi12y1 = F(uy, vy, oy, -maxY, polyEll1[0][0][1], polyEll1[1][0][0]);
                    var phi12y2 = F(uy, vy, oy, maxY, polyEll1[0][0][1], polyEll1[1][0][0]);
                    var phi12x1 = F(ux, vx, ox, -maxX, polyEll1[0][0][1], polyEll1[1][0][0]);
                    var phi12x2 = F(ux, vx, ox, maxX, polyEll1[0][0][1], polyEll1[1][0][0]);

                    // console.log("-y(+a)", phi12y1.isRes[0], phi12y1.isRes[1], phi12y1.res[0], phi12y1.res[1]);
                    // console.log("+y(+a)", phi12y2.isRes[0], phi12y2.isRes[1], phi12y2.res[0], phi12y2.res[1]);
                    // console.log("-x(+a)", phi12x1.isRes[0], phi12x1.isRes[1], phi12x1.res[0], phi12x1.res[1]);
                    // console.log("+x(+a)", phi12x2.isRes[0], phi12x2.isRes[1], phi12x2.res[0], phi12x2.res[1]);

                    // console.log("-y(-a)", phi34y1.isRes[0], phi34y1.isRes[1], phi34y1.res[0], phi34y1.res[1]);
                    // console.log("+y(-a)", phi34y2.isRes[0], phi34y2.isRes[1], phi34y2.res[0], phi34y2.res[1]);
                    // console.log("-x(-a)", phi34x1.isRes[0], phi34x1.isRes[1], phi34x1.res[0], phi34x1.res[1]);
                    // console.log("+x(-a)", phi34x2.isRes[0], phi34x2.isRes[1], phi34x2.res[0], phi34x2.res[1]);

                    var phiArrX0 = [];
                    if (phi12x1.isRes[0]) phiArrX0.push(phi12x1.res[0]);
                    if (phi12x1.isRes[1]) phiArrX0.push(phi12x1.res[1]);
                    if (phi12x2.isRes[0]) phiArrX0.push(phi12x2.res[0]);
                    if (phi12x2.isRes[1]) phiArrX0.push(phi12x2.res[1]);
                    phiArrX0.sort(compareNumeric);
                    console.log("phiArrX0", phiArrX0);

                    var phiArrX = [];
                    if (phiArrX0.length > 2) {
                        phiArrX[0] = phiArrX0.slice(0, 2);
                        phiArrX[1] = phiArrX0.slice(2, phiArrX0.length);
                    } else if (phiArrX0.length != 0) {
                        phiArrX[0] = phiArrX0;
                    }

                    var phiArrY0 = [];
                    if (phi12y1.isRes[0]) phiArrY0.push(phi12y1.res[0]);
                    if (phi12y1.isRes[1]) phiArrY0.push(phi12y1.res[1]);
                    if (phi12y2.isRes[0]) phiArrY0.push(phi12y2.res[0]);
                    if (phi12y2.isRes[1]) phiArrY0.push(phi12y2.res[1]);
                    phiArrY0.sort(compareNumeric);
                    console.log("phiArrY0", phiArrY0);

                    var phiArrY = [];
                    if (phiArrY0.length > 2) {
                        phiArrY[0] = phiArrY0.slice(0, 2);
                        phiArrY[1] = phiArrY0.slice(2, phiArrY0.length);
                    } else if (phiArrY0.length != 0) {
                        phiArrY[0] = phiArrY0;
                    }

                    var phiArr = [];
                    for (var i = 0; i < phiArrX.length; i++) {
                        for (var j = 0; j < phiArrY.length; j++) {
                            var newInterval = intersectIntervals(phiArrX[i], phiArrY[j]);
                            if (newInterval) {
                                phiArr.push(newInterval);
                            }
                        }
                    }
                    console.log("phiArr", phiArr);


                    // var phiArr = [[-phimult,phimult]];
                    var linesCount = 0;
                    for (var i = 0; i < phiArr.length; i++) {
                        lineVertices[linesCount] = [];
                        for (var j = 0; j <= 1; j++) {
                            var phi = j*(phiArr[i][1]-phiArr[i][0]) + phiArr[i][0];

                            // var pt0 = phi+t0;
                            // var ps0 = s0;
                            var pt0 = -polyEll1[0][0][1]*phi+t0;
                            var ps0 = polyEll1[1][0][0]*phi+s0;
                            console.log([pt0, ps0]);

                            var pt = pt0*cosphi+ps0*sinphi;
                            var ps = -pt0*sinphi+ps0*cosphi;
                            console.log([pt, ps]);

                            var px = ox+ps*ux+pt*vx;
                            var py = oy+ps*uy+pt*vy;
                            var pz = oz+ps*uz+pt*vz;
                            console.log([py, pz, px]);
                            lineVertices[linesCount].push( [py, pz, px] );
                        }
                        linesCount++;
                    }
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

                function F(u,v,coordO,coordLimit,cT,cS) {
                    var aaa = cosphi*v - sinphi*u;
                    var bbb = cosphi*u + sinphi*v;
                    var aa = aaa*cT;
                    var bb = bbb*cS;
                    var cc = coordO+t0*aaa+s0*bbb;

                    return {isRes: [true, false], res: [(coordLimit-cc)/(aa+bb)]};
                }

                var phi12y1 = F(uy, vy, oy, -maxY, c1, -a1);
                var phi12y2 = F(uy, vy, oy, maxY, c1, -a1);
                var phi12x1 = F(ux, vx, ox, -maxX, c1, -a1);
                var phi12x2 = F(ux, vx, ox, maxX, c1, -a1);

                var phiArrX0 = [];
                if (phi12x1.isRes[0]) phiArrX0.push(phi12x1.res[0]);
                if (phi12x1.isRes[1]) phiArrX0.push(phi12x1.res[1]);
                if (phi12x2.isRes[0]) phiArrX0.push(phi12x2.res[0]);
                if (phi12x2.isRes[1]) phiArrX0.push(phi12x2.res[1]);
                phiArrX0.sort(compareNumeric);

                var phiArrX = [];
                if (phiArrX0.length > 2) {
                    phiArrX[0] = phiArrX0.slice(0, 2);
                    phiArrX[1] = phiArrX0.slice(2, phiArrX0.length);
                } else if (phiArrX0.length != 0) {
                    phiArrX[0] = phiArrX0;
                }

                var phiArrY0 = [];
                if (phi12y1.isRes[0]) phiArrY0.push(phi12y1.res[0]);
                if (phi12y1.isRes[1]) phiArrY0.push(phi12y1.res[1]);
                if (phi12y2.isRes[0]) phiArrY0.push(phi12y2.res[0]);
                if (phi12y2.isRes[1]) phiArrY0.push(phi12y2.res[1]);
                phiArrY0.sort(compareNumeric);

                var phiArrY = [];
                if (phiArrY0.length > 2) {
                    phiArrY[0] = phiArrY0.slice(0, 2);
                    phiArrY[1] = phiArrY0.slice(2, phiArrY0.length);
                } else if (phiArrY0.length != 0) {
                    phiArrY[0] = phiArrY0;
                }

                var phiArr = [];
                for (var i = 0; i < phiArrX.length; i++) {
                    for (var j = 0; j < phiArrY.length; j++) {
                        var newInterval = intersectIntervals(phiArrX[i], phiArrY[j]);
                        if (newInterval) {
                            phiArr.push(newInterval);
                        }
                    }
                }

                var linesCount = 0;
                for (var i = 0; i < phiArr.length; i++) {
                    lineVertices[linesCount] = [];
                    for (var j = 0; j <= 1; j++) {
                        var phi = j*(phiArr[i][1]-phiArr[i][0]) + phiArr[i][0];

                        var pt0 = c1*phi+t0;
                        var ps0 = -a1*phi+s0;
                        console.log([pt0, ps0]);

                        var pt = pt0*cosphi+ps0*sinphi;
                        var ps = -pt0*sinphi+ps0*cosphi;
                        console.log([pt, ps]);

                        var px = ox+ps*ux+pt*vx;
                        var py = oy+ps*uy+pt*vy;
                        var pz = oz+ps*uz+pt*vz;
                        console.log([py, pz, px]);
                        lineVertices[linesCount].push( [py, pz, px] );
                    }
                    linesCount++;
                }

                var phi12y1 = F(uy, vy, oy, -maxY, c1, a1);
                var phi12y2 = F(uy, vy, oy, maxY, c1, a1);
                var phi12x1 = F(ux, vx, ox, -maxX, c1, a1);
                var phi12x2 = F(ux, vx, ox, maxX, c1, a1);

                var phiArrX0 = [];
                if (phi12x1.isRes[0]) phiArrX0.push(phi12x1.res[0]);
                if (phi12x1.isRes[1]) phiArrX0.push(phi12x1.res[1]);
                if (phi12x2.isRes[0]) phiArrX0.push(phi12x2.res[0]);
                if (phi12x2.isRes[1]) phiArrX0.push(phi12x2.res[1]);
                phiArrX0.sort(compareNumeric);

                var phiArrX = [];
                if (phiArrX0.length > 2) {
                    phiArrX[0] = phiArrX0.slice(0, 2);
                    phiArrX[1] = phiArrX0.slice(2, phiArrX0.length);
                } else if (phiArrX0.length != 0) {
                    phiArrX[0] = phiArrX0;
                }

                var phiArrY0 = [];
                if (phi12y1.isRes[0]) phiArrY0.push(phi12y1.res[0]);
                if (phi12y1.isRes[1]) phiArrY0.push(phi12y1.res[1]);
                if (phi12y2.isRes[0]) phiArrY0.push(phi12y2.res[0]);
                if (phi12y2.isRes[1]) phiArrY0.push(phi12y2.res[1]);
                phiArrY0.sort(compareNumeric);

                var phiArrY = [];
                if (phiArrY0.length > 2) {
                    phiArrY[0] = phiArrY0.slice(0, 2);
                    phiArrY[1] = phiArrY0.slice(2, phiArrY0.length);
                } else if (phiArrY0.length != 0) {
                    phiArrY[0] = phiArrY0;
                }

                var phiArr = [];
                for (var i = 0; i < phiArrX.length; i++) {
                    for (var j = 0; j < phiArrY.length; j++) {
                        var newInterval = intersectIntervals(phiArrX[i], phiArrY[j]);
                        if (newInterval) {
                            phiArr.push(newInterval);
                        }
                    }
                }

                for (var i = 0; i < phiArr.length; i++) {
                    lineVertices[linesCount] = [];
                    for (var j = 0; j <= 1; j++) {
                        var phi = j*(phiArr[i][1]-phiArr[i][0]) + phiArr[i][0];

                        var pt0 = c1*phi+t0;
                        var ps0 = a1*phi+s0;
                        console.log([pt0, ps0]);

                        var pt = pt0*cosphi+ps0*sinphi;
                        var ps = -pt0*sinphi+ps0*cosphi;
                        console.log([pt, ps]);

                        var px = ox+ps*ux+pt*vx;
                        var py = oy+ps*uy+pt*vy;
                        var pz = oz+ps*uz+pt*vz;
                        console.log([py, pz, px]);
                        lineVertices[linesCount].push( [py, pz, px] );
                    }
                    linesCount++;
                }
            }

        } else if (sqrainv > 0 && sqrcinv < 0) {
            // console.log("Гипербола 1");
            if ($("#curve").text() != "Гипербола1") {
                $("#curve").text("Гипербола1");
            }
            var c1 = Math.sqrt(-1.0/sqrcinv);
            var a1 = Math.sqrt(1.0/sqrainv);

            function F(u,v,coordO,coordLimit,cT,cS) {
                var aaa = cosphi*v - sinphi*u;
                var bbb = cosphi*u + sinphi*v;
                var aa = aaa*cT;
                var bb = bbb*cS;
                var cc = coordO+t0*aaa+s0*bbb;

                var sqr = aa*aa-bb*bb+cc*cc-2*cc*coordLimit+coordLimit*coordLimit;
                if (sqr < 0) {
                    return {isRes: [false, false], res: []};
                }

                var sqrt = Math.sqrt(sqr);
                var isRes = [];
                var res = [];
                var log1 = (coordLimit-cc - sqrt ) / (aa+bb);
                var log2 = (coordLimit-cc + sqrt ) / (aa+bb);
                isRes[0] = log1 > 0;
                isRes[1] = log2 > 0;
                if (isRes[0]) {
                    res[0] = Math.log(log1);
                }
                if (isRes[1]) {
                    res[1] = Math.log(log2);
                }
                return {isRes: isRes, res: res};;
            }

            var phi12y1 = F(uy, vy, oy, -maxY, c1, a1);
            var phi12y2 = F(uy, vy, oy, maxY, c1, a1);
            var phi12x1 = F(ux, vx, ox, -maxX, c1, a1);
            var phi12x2 = F(ux, vx, ox, maxX, c1, a1);

            var phi34y1 = F(uy, vy, oy, -maxY, c1, -a1);
            var phi34y2 = F(uy, vy, oy, maxY, c1, -a1);
            var phi34x1 = F(ux, vx, ox, -maxX, c1, -a1);
            var phi34x2 = F(ux, vx, ox, maxX, c1, -a1);

            // console.log("-y(+a)", phi12y1.isRes[0], phi12y1.isRes[1], phi12y1.res[0], phi12y1.res[1]);
            // console.log("+y(+a)", phi12y2.isRes[0], phi12y2.isRes[1], phi12y2.res[0], phi12y2.res[1]);
            // console.log("-x(+a)", phi12x1.isRes[0], phi12x1.isRes[1], phi12x1.res[0], phi12x1.res[1]);
            // console.log("+x(+a)", phi12x2.isRes[0], phi12x2.isRes[1], phi12x2.res[0], phi12x2.res[1]);

            // console.log("-y(-a)", phi34y1.isRes[0], phi34y1.isRes[1], phi34y1.res[0], phi34y1.res[1]);
            // console.log("+y(-a)", phi34y2.isRes[0], phi34y2.isRes[1], phi34y2.res[0], phi34y2.res[1]);
            // console.log("-x(-a)", phi34x1.isRes[0], phi34x1.isRes[1], phi34x1.res[0], phi34x1.res[1]);
            // console.log("+x(-a)", phi34x2.isRes[0], phi34x2.isRes[1], phi34x2.res[0], phi34x2.res[1]);

            var phiArrX0 = [];
            if (phi12x1.isRes[0]) phiArrX0.push(phi12x1.res[0]);
            if (phi12x1.isRes[1]) phiArrX0.push(phi12x1.res[1]);
            if (phi12x2.isRes[0]) phiArrX0.push(phi12x2.res[0]);
            if (phi12x2.isRes[1]) phiArrX0.push(phi12x2.res[1]);
            phiArrX0.sort(compareNumeric);

            var phiArrX = [];
            if (phiArrX0.length > 2) {
                phiArrX[0] = phiArrX0.slice(0, 2);
                phiArrX[1] = phiArrX0.slice(2, phiArrX0.length);
            } else if (phiArrX0.length != 0) {
                phiArrX[0] = phiArrX0;
            }

            var phiArrY0 = [];
            if (phi12y1.isRes[0]) phiArrY0.push(phi12y1.res[0]);
            if (phi12y1.isRes[1]) phiArrY0.push(phi12y1.res[1]);
            if (phi12y2.isRes[0]) phiArrY0.push(phi12y2.res[0]);
            if (phi12y2.isRes[1]) phiArrY0.push(phi12y2.res[1]);
            phiArrY0.sort(compareNumeric);

            var phiArrY = [];
            if (phiArrY0.length > 2) {
                phiArrY[0] = phiArrY0.slice(0, 2);
                phiArrY[1] = phiArrY0.slice(2, phiArrY0.length);
            } else if (phiArrY0.length != 0) {
                phiArrY[0] = phiArrY0;
            }

            var phiArr = [];
            for (var i = 0; i < phiArrX.length; i++) {
                for (var j = 0; j < phiArrY.length; j++) {
                    var newInterval = intersectIntervals(phiArrX[i], phiArrY[j]);
                    if (newInterval) {
                        phiArr.push(newInterval);
                    }
                }
            }

            var linesCount = 0;

            for (var i = 0; i < phiArr.length; i++) {
                lineVertices[linesCount] = [];
                for (var j = 0; j <= slices; j++) {
                    var phi = j/slices*(phiArr[i][1]-phiArr[i][0]) + phiArr[i][0];

                    var pt0 = c1*Math.sinh(phi)+t0;
                    var ps0 = a1*Math.cosh(phi)+s0;

                    var pt = pt0*cosphi+ps0*sinphi;
                    var ps = -pt0*sinphi+ps0*cosphi;

                    var px = ox+ps*ux+pt*vx;
                    var py = oy+ps*uy+pt*vy;
                    var pz = oz+ps*uz+pt*vz;
                    lineVertices[linesCount].push( [py, pz, px] );
                }
                linesCount++;
            }



            var phiArrX0 = [];
            if (phi34x1.isRes[0]) phiArrX0.push(phi34x1.res[0]);
            if (phi34x1.isRes[1]) phiArrX0.push(phi34x1.res[1]);
            if (phi34x2.isRes[0]) phiArrX0.push(phi34x2.res[0]);
            if (phi34x2.isRes[1]) phiArrX0.push(phi34x2.res[1]);
            phiArrX0.sort(compareNumeric);

            var phiArrX = [];
            if (phiArrX0.length > 2) {
                phiArrX[0] = phiArrX0.slice(0, 2);
                phiArrX[1] = phiArrX0.slice(2, phiArrX0.length);
            } else if (phiArrX0.length != 0) {
                phiArrX[0] = phiArrX0;
            }

            var phiArrY0 = [];
            if (phi34y1.isRes[0]) phiArrY0.push(phi34y1.res[0]);
            if (phi34y1.isRes[1]) phiArrY0.push(phi34y1.res[1]);
            if (phi34y2.isRes[0]) phiArrY0.push(phi34y2.res[0]);
            if (phi34y2.isRes[1]) phiArrY0.push(phi34y2.res[1]);
            phiArrY0.sort(compareNumeric);

            var phiArrY = [];
            if (phiArrY0.length > 2) {
                phiArrY[0] = phiArrY0.slice(0, 2);
                phiArrY[1] = phiArrY0.slice(2, phiArrY0.length);
            } else if (phiArrY0.length != 0) {
                phiArrY[0] = phiArrY0;
            }

            var phiArr = [];
            for (var i = 0; i < phiArrX.length; i++) {
                for (var j = 0; j < phiArrY.length; j++) {
                    var newInterval = intersectIntervals(phiArrX[i], phiArrY[j]);
                    if (newInterval) {
                        phiArr.push(newInterval);
                    }
                }
            }

            for (var i = 0; i < phiArr.length; i++) {
                lineVertices[linesCount] = [];
                for (var j = 0; j <= slices; j++) {
                    var phi = j/slices*(phiArr[i][1]-phiArr[i][0]) + phiArr[i][0];

                    var pt0 = c1*Math.sinh(phi)+t0;
                    var ps0 = -a1*Math.cosh(phi)+s0;

                    var pt = pt0*cosphi+ps0*sinphi;
                    var ps = -pt0*sinphi+ps0*cosphi;

                    var px = ox+ps*ux+pt*vx;
                    var py = oy+ps*uy+pt*vy;
                    var pz = oz+ps*uz+pt*vz;
                    lineVertices[linesCount].push( [py, pz, px] );
                }
                linesCount++;
            }
        } else if (sqrainv < 0 && sqrcinv > 0) {
            // console.log("Гипербола 2");
            // if ($("#curve").text() != "Сопряжённая гипербола") {
            //     $("#curve").text("Сопряжённая гипербола");
            // }
            if ($("#curve").text() != "Гипербола2") {
                $("#curve").text("Гипербола2");
            }
            var c1 = Math.sqrt(1.0/sqrcinv);
            var a1 = Math.sqrt(-1.0/sqrainv);

            var phimult111;
            var phimult112;

            var phimult121;
            var phimult122;

            var phimult211;
            var phimult212;

            var phimult221;
            var phimult222;

            function F(u,v,coordO,coordLimit,cT,cS) {
                var aaa = cosphi*v - sinphi*u;
                var bbb = cosphi*u + sinphi*v;
                var aa = aaa*cT;
                var bb = bbb*cS;
                var cc = coordO+t0*aaa+s0*bbb;

                var sqr = -aa*aa+bb*bb+cc*cc-2*cc*coordLimit+coordLimit*coordLimit;
                if (sqr < 0) {
                    return {isRes: [false, false], res: []};
                }

                var sqrt = Math.sqrt(sqr);
                var isRes = [];
                var res = [];
                var log1 = (coordLimit-cc - sqrt ) / (aa+bb);
                var log2 = (coordLimit-cc + sqrt ) / (aa+bb);
                isRes[0] = log1 > 0;
                isRes[1] = log2 > 0;
                if (isRes[0]) {
                    res[0] = Math.log(log1);
                }
                if (isRes[1]) {
                    res[1] = Math.log(log2);
                }
                return {isRes: isRes, res: res};;
            }

            var phi12y1 = F(uy, vy, oy, -maxY, -c1, a1);
            var phi12y2 = F(uy, vy, oy, maxY, -c1, a1);
            var phi12x1 = F(ux, vx, ox, -maxX, -c1, a1);
            var phi12x2 = F(ux, vx, ox, maxX, -c1, a1);

            var phi34y1 = F(uy, vy, oy, -maxY, c1, a1);
            var phi34y2 = F(uy, vy, oy, maxY, c1, a1);
            var phi34x1 = F(ux, vx, ox, -maxX, c1, a1);
            var phi34x2 = F(ux, vx, ox, maxX, c1, a1);

            // console.log("-y(+a)", phi12y1.isRes[0], phi12y1.isRes[1], phi12y1.res[0], phi12y1.res[1]);
            // console.log("+y(+a)", phi12y2.isRes[0], phi12y2.isRes[1], phi12y2.res[0], phi12y2.res[1]);
            // console.log("-x(+a)", phi12x1.isRes[0], phi12x1.isRes[1], phi12x1.res[0], phi12x1.res[1]);
            // console.log("+x(+a)", phi12x2.isRes[0], phi12x2.isRes[1], phi12x2.res[0], phi12x2.res[1]);

            // console.log("-y(-a)", phi34y1.isRes[0], phi34y1.isRes[1], phi34y1.res[0], phi34y1.res[1]);
            // console.log("+y(-a)", phi34y2.isRes[0], phi34y2.isRes[1], phi34y2.res[0], phi34y2.res[1]);
            // console.log("-x(-a)", phi34x1.isRes[0], phi34x1.isRes[1], phi34x1.res[0], phi34x1.res[1]);
            // console.log("+x(-a)", phi34x2.isRes[0], phi34x2.isRes[1], phi34x2.res[0], phi34x2.res[1]);

            var phiArrX0 = [];
            if (phi12x1.isRes[0]) phiArrX0.push(phi12x1.res[0]);
            if (phi12x1.isRes[1]) phiArrX0.push(phi12x1.res[1]);
            if (phi12x2.isRes[0]) phiArrX0.push(phi12x2.res[0]);
            if (phi12x2.isRes[1]) phiArrX0.push(phi12x2.res[1]);
            phiArrX0.sort(compareNumeric);

            var phiArrX = [];
            if (phiArrX0.length > 2) {
                phiArrX[0] = phiArrX0.slice(0, 2);
                phiArrX[1] = phiArrX0.slice(2, phiArrX0.length);
            } else if (phiArrX0.length != 0) {
                phiArrX[0] = phiArrX0;
            }

            var phiArrY0 = [];
            if (phi12y1.isRes[0]) phiArrY0.push(phi12y1.res[0]);
            if (phi12y1.isRes[1]) phiArrY0.push(phi12y1.res[1]);
            if (phi12y2.isRes[0]) phiArrY0.push(phi12y2.res[0]);
            if (phi12y2.isRes[1]) phiArrY0.push(phi12y2.res[1]);
            phiArrY0.sort(compareNumeric);

            var phiArrY = [];
            if (phiArrY0.length > 2) {
                phiArrY[0] = phiArrY0.slice(0, 2);
                phiArrY[1] = phiArrY0.slice(2, phiArrY0.length);
            } else if (phiArrY0.length != 0) {
                phiArrY[0] = phiArrY0;
            }

            var phiArr = [];
            for (var i = 0; i < phiArrX.length; i++) {
                for (var j = 0; j < phiArrY.length; j++) {
                    var newInterval = intersectIntervals(phiArrX[i], phiArrY[j]);
                    if (newInterval) {
                        phiArr.push(newInterval);
                    }
                }
            }

            var linesCount = 0;

            for (var i = 0; i < phiArr.length; i++) {
                lineVertices[linesCount] = [];
                for (var j = 0; j <= slices; j++) {
                    var phi = j/slices*(phiArr[i][1]-phiArr[i][0]) + phiArr[i][0];

                    var pt0 = -c1*Math.cosh(phi)+t0;
                    var ps0 = a1*Math.sinh(phi)+s0;

                    var pt = pt0*cosphi+ps0*sinphi;
                    var ps = -pt0*sinphi+ps0*cosphi;

                    var px = ox+ps*ux+pt*vx;
                    var py = oy+ps*uy+pt*vy;
                    var pz = oz+ps*uz+pt*vz;
                    lineVertices[linesCount].push( [py, pz, px] );
                }
                linesCount++;
            }



            var phiArrX0 = [];
            if (phi34x1.isRes[0]) phiArrX0.push(phi34x1.res[0]);
            if (phi34x1.isRes[1]) phiArrX0.push(phi34x1.res[1]);
            if (phi34x2.isRes[0]) phiArrX0.push(phi34x2.res[0]);
            if (phi34x2.isRes[1]) phiArrX0.push(phi34x2.res[1]);
            phiArrX0.sort(compareNumeric);

            var phiArrX = [];
            if (phiArrX0.length > 2) {
                phiArrX[0] = phiArrX0.slice(0, 2);
                phiArrX[1] = phiArrX0.slice(2, phiArrX0.length);
            } else if (phiArrX0.length != 0) {
                phiArrX[0] = phiArrX0;
            }

            var phiArrY0 = [];
            if (phi34y1.isRes[0]) phiArrY0.push(phi34y1.res[0]);
            if (phi34y1.isRes[1]) phiArrY0.push(phi34y1.res[1]);
            if (phi34y2.isRes[0]) phiArrY0.push(phi34y2.res[0]);
            if (phi34y2.isRes[1]) phiArrY0.push(phi34y2.res[1]);
            phiArrY0.sort(compareNumeric);

            var phiArrY = [];
            if (phiArrY0.length > 2) {
                phiArrY[0] = phiArrY0.slice(0, 2);
                phiArrY[1] = phiArrY0.slice(2, phiArrY0.length);
            } else if (phiArrY0.length != 0) {
                phiArrY[0] = phiArrY0;
            }

            var phiArr = [];
            for (var i = 0; i < phiArrX.length; i++) {
                for (var j = 0; j < phiArrY.length; j++) {
                    var newInterval = intersectIntervals(phiArrX[i], phiArrY[j]);
                    if (newInterval) {
                        phiArr.push(newInterval);
                    }
                }
            }

            for (var i = 0; i < phiArr.length; i++) {
                lineVertices[linesCount] = [];
                for (var j = 0; j <= slices; j++) {
                    var phi = j/slices*(phiArr[i][1]-phiArr[i][0]) + phiArr[i][0];

                    var pt0 = c1*Math.cosh(phi)+t0;
                    var ps0 = a1*Math.sinh(phi)+s0;

                    var pt = pt0*cosphi+ps0*sinphi;
                    var ps = -pt0*sinphi+ps0*cosphi;

                    var px = ox+ps*ux+pt*vx;
                    var py = oy+ps*uy+pt*vy;
                    var pz = oz+ps*uz+pt*vz;
                    lineVertices[linesCount].push( [py, pz, px] );
                }
                linesCount++;
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
                Math.sqrt(maxX*maxX+maxY*maxY+maxZ*maxZ)+0.5);
    primitives.push({class:"plane", text: "", arr0: p1, arr1: p2, arr2: p3, arr3: p4, color:[0.0,0.0,1.0,0.2]});

}
    var compareNumeric = function(a, b) {
      if (a > b) return 1;
      if (a < b) return -1;
    }
    var intersectIntervals = function(int1, int2) {
        if (int1[0] >= int2[1] || int1[1] <= int2[0]) return null;

        if (int1[0] < int2[0]) {
            if (int1[1] < int2[1]) {
                return [int2[0], int1[1]];
            } else {
                return [int2[0], int2[1]];
            }
        } else {
            if (int1[1] < int2[1]) {
                return [int1[0], int1[1]];
            } else {
                return [int1[0], int2[1]];
            }
        }
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
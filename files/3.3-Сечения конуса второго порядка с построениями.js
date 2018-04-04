var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([b+1, 0, 0]), movable: "fixed", vector:[1,0,0]});
    points.push({coord1: vec3.create([0, 0, a+1]), movable: "fixed", vector:[0,0,1]});
    // points.push({coord1: vec3.create([b+1, 0, a+1]), movable: "line", vector:[0,1,0]});
    points.push({coord1: vec3.create([0, 0, a]), movable: "line", vector:[0,0,1]});//
    points.push({coord1: vec3.create([0, c+2, 0]), movable: "fixed", vector:[0,1,0]});

	// points[2].coord1[2] = -bl/kl;
	// vectorV[2] = bl/kl;
	// vectorV[0] = 0;
	// vectorV[1] = bl;
	var x0 = 1;
	points[2].coord1[2] = x0;
	vectorV[2] = 0;
	vectorV[0] = 0;
	vectorV[1] = 1;

    points.push({coord1: [], movable: "fixed", vector:vectorV});//
    points.push({coord1: [], movable: "fixed", vector:vectorV});
    points.push({coord1: [paramsM[1], paramsM[0], x0], movable: "free"});

    vec3.add(points[2].coord1, vectorV, points[4].coord1);
    vec3.add(points[2].coord1, vectorU, points[5].coord1);
}
function initDescr() {
	rotAngY = 70;

    var descr = "";
    descr += '<p>Уравнение кругового конуса:$$\\frac{x^2}{a^2}+\\frac{y^2}{a^2}-\\frac{z^2}{c^2}=0$$</p>';
    var tIS = 5;
    descr += '<p>$a$<input type="text" id="a" size="'+tIS+'"> \
                 $c$<input type="text" id="c" size="'+tIS+'"></p>';

    descr += '<label><input type="radio" name="planes" id="rad1" checked> Cекущая плоскость $\\pi$ $$x=x_0$$</label>';
    descr += '<p>$x_0$<input type="text" id="x0" size="'+tIS+'" value="1"></p>';

    descr += '<label><input type="radio" name="planes" id="rad2"> Наклонная секущая плоскость $\\pi$ $$z=kx+b$$</label>';
    descr += '<p>$k$<input type="text" id="kl" size="'+tIS+'" value="'+kl+'"> \
                 $b$<input type="text" id="bl" size="'+tIS+'" value="'+bl+'"></p>';
    descr += '<p>$k = \\operatorname{tg}\\varphi$, $x_0=-\\frac b k$</p>';

    descr += '<p><label><input type="checkbox" checked onchange="isShowHyp=this.checked; initBuffers();"> Показать поверхность</label>';
    descr += '<label><input type="checkbox" checked onchange="isShowPlane=this.checked; initBuffers();"> Показать плоскость $\\pi$</label>';
    descr += '<label><input type="checkbox" checked onchange="isShowСross=this.checked; initBuffers();"> Показать сечение</label>';
    descr += '<label><input type="checkbox" checked onchange="isShowPoint=this.checked; initBuffers();"> Kоординаты $M(0,y\',z\')\\in\\pi$</label>';
    descr += '<label><input type="checkbox" checked onchange="isShowСoords=this.checked; initBuffers();"> Kоординаты $M(x,y,z)\\in\\pi$</label>';
    descr += '</p>';

    // descr += '<p>$M_0$: $y_0$<input type="text" id="y0" size="'+tIS+'"> \
    //              $z_0$<input type="text" id="z0" size="'+tIS+'"></p>';
    // descr += '<p>$v_y$<input type="text" id="vy" size="'+tIS+'"> \
    //              $v_z$<input type="text" id="vz" size="'+tIS+'"></p>';
    descr += 'Кривая в сечении: <span id="curve" style="font-weight: 600;"></span>';
    // descr += '<p>Примеры кривых в сечении:<br>';
    // descr += '<button onclick="changeToHyp();">Гипербола</button><br>';
    // descr += '<button onclick="changeToPar();">Парабола</button><br>';
    // descr += '<button onclick="changeToEll();">Эллипс</button><br>';
    // descr += '<button onclick="changeToPoint();">Точка</button><br>';
    // descr += '<button onclick="changeToLine();">Прямая</button><br>';
    // descr += '<button onclick="changeToCross();">Пара пересекающихся прямых</button><br>';
    // descr += '</p>';

    $("#description").html(descr);
    $("#rad1").change(function(event){
                                       isPlaneX=true;
                                       points[2].coord1[2] = parseFloat($("#x0").val());
								       vectorV[2] = 0;
								       vectorV[1] = 1;
                                       updateVectorV();
                                       initBuffers();
                                  });
    $("#rad2").change(function(event){
                                       kl = parseFloat($("#kl").val());
                                       bl = parseFloat($("#bl").val());
                                       isPlaneX=false;
    								   if (kl == 0) {
	                                       points[2].coord1[2] = 0;
									       vectorV[2] = 1;
									       vectorV[1] = 0;
    								   } else if (bl == 0) {
	                                       points[2].coord1[2] = 0;
									       vectorV[2] = 1/kl;
									       vectorV[1] = 1;
    								   } else {
	                                       points[2].coord1[2] = -bl/kl;
									       vectorV[2] = Math.abs(bl)/kl;
									       vectorV[1] = Math.abs(bl);
    								   }
                                       updateVectorV();
                                       initBuffers();
                                  });
    $("#a").change(function(event){
                                       points[1].coord1[2] = 1+Math.abs(parseFloat(this.value));
                                       points[0].coord1[0] = 1+Math.abs(parseFloat(this.value));
                                       initBuffers();
                                  });
    $("#c").change(function(event){
                                       points[3].coord1[1] = 2+Math.abs(parseFloat(this.value));
                                       initBuffers();
                                  });

    $("#x0").change(function(event){
	    							   if (isPlaneX) {
	                                       points[2].coord1[2] = parseFloat(this.value);
									       vectorV[2] = 0;
									       vectorV[1] = 1;
	                                       updateVectorV();
	                                       initBuffers();
    								   }
                                  });

    $("#kl").change(function(event){
    								   kl = parseFloat(this.value);
	    							   if (!isPlaneX) {
	    								   if (kl == 0) {
		                                       points[2].coord1[2] = 0;
										       vectorV[2] = 1;
										       vectorV[1] = 0;
	    								   } else if (bl == 0) {
		                                       points[2].coord1[2] = 0;
										       vectorV[2] = 1/kl;
										       vectorV[1] = 1;
	    								   } else {
		                                       points[2].coord1[2] = -bl/kl;
										       vectorV[2] = Math.abs(bl)/kl;
										       vectorV[1] = Math.abs(bl);
	    								   }
	                                       updateVectorV();
	                                       initBuffers();
    								   }
                                  });
    $("#bl").change(function(event){
    								   bl = parseFloat(this.value);
	    							   if (!isPlaneX) {
	    								   if (kl == 0) {
		                                       points[2].coord1[2] = 0;
										       vectorV[2] = 1;
										       vectorV[1] = 0;
	    								   } else if (bl == 0) {
		                                       points[2].coord1[2] = 0;
										       vectorV[2] = 1/kl;
										       vectorV[1] = 1;
	    								   } else {
		                                       points[2].coord1[2] = -bl/kl;
										       vectorV[2] = Math.abs(bl)/kl;
										       vectorV[1] = Math.abs(bl);
	    								   }
	                                       updateVectorV();
	                                       initBuffers();
    								   }
                                  });

    $("Title").html("Конус");
}
var a = 2;
var b = a;
var c = 2;
var bl = 2;
var kl = 1.7;
var isShowPlane = true;
var isShowHyp = true;
var isShowСross = true;
var isShowPoint = true;
var isShowСoords = true;
var vectorU = [2,0,0];
var vectorV = [0,2,0];
var nuberEpsilon = 0.00001;
var isPlaneX = true;

var paramsM = [3, 3];

// function changeToHyp() {
//     points[2].coord1[0] = 0;
//     points[2].coord1[1] = 0;
//     points[2].coord1[2] = a;
//     vectorV[0] = 0;
//     vectorV[1] = 2;
//     vectorV[2] = 0;
//     updatePointO();
//     updateVectorV();
//     initBuffers();
// }
// function changeToPar() {
//     points[2].coord1[0] = 0;
//     points[2].coord1[1] = 0;
//     points[2].coord1[2] = a/2;
//     vectorV[0] = 0;
//     vectorV[1] = c;
//     vectorV[2] = -a;
//     updatePointO();
//     updateVectorV();
//     initBuffers();
// }
// function changeToEll() {
//     points[2].coord1[0] = 0;
//     points[2].coord1[1] = 0;
//     points[2].coord1[2] = a;
//     vectorV[0] = 0;
//     vectorV[1] = c/2;
//     vectorV[2] = -a;
//     updatePointO();
//     updateVectorV();
//     initBuffers();
// }
// function changeToPoint() {
//     points[2].coord1[0] = 0;
//     points[2].coord1[1] = 0;
//     points[2].coord1[2] = a/2;
//     vectorV[0] = 0;
//     vectorV[1] = 0;
//     vectorV[2] = -2;
//     updatePointO();
//     updateVectorV();
//     initBuffers();
// }
// function changeToLine() {
//     points[2].coord1[0] = 0;
//     points[2].coord1[1] = 0;
//     points[2].coord1[2] = 0;
//     vectorV[0] = 0;
//     vectorV[1] = -c;
//     vectorV[2] = a;
//     updatePointO();
//     updateVectorV();
//     initBuffers();
// }
// function changeToCross() {
//     points[2].coord1[0] = 0;
//     points[2].coord1[1] = 0;
//     points[2].coord1[2] = 0;
//     vectorV[0] = 0;
//     vectorV[1] = 2;
//     vectorV[2] = 0;
//     updatePointO();
//     updateVectorV();
//     initBuffers();
// }
function updatePointO() {
    vec3.add(points[2].coord1, vectorV, points[4].coord1);
    vec3.add(points[2].coord1, vectorU, points[5].coord1);
    kl = vectorV[1]/vectorV[2];
    bl = -points[2].coord1[2] * kl;
	// if (kl == 0) {
	// 	points[2].coord1[2] = 0;
	// 	vectorV[2] = 1;
	// 	vectorV[1] = 0;
	// } else if (bl == 0) {
	// 	points[2].coord1[2] = 0;
	// 	vectorV[2] = 1/kl;
	// 	vectorV[1] = 1;
	// } else {
	// 	points[2].coord1[2] = -bl/kl;
	// 	vectorV[2] = Math.abs(bl)/kl;
	// 	vectorV[1] = Math.abs(bl);
	// }
}
function updateVectorV() {
    // vec3.normalize(vectorV);
    vec3.add(points[2].coord1, vectorV, points[4].coord1);
    vec3.set(vectorV, points[5].vector);
    kl = vectorV[1]/vectorV[2];
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
        // if (arrPoint == points[4].coord1) {
        //     vec3.subtract(points[4].coord1, points[2].coord1, vectorV);
        //     updateVectorV();
        // }
        // if (arrPoint == points[5].coord1) {
        //     vec3.subtract(points[5].coord1, points[2].coord1, vectorU);
        //     updateVectorU();
        // }
    }

    primitives.push({class:"text", text: "x", arr0:[0,0,5]});
    primitives.push({class:"text", text: "y", arr0:[5,0,0]});
    primitives.push({class:"text", text: "z", arr0:[0,5,0]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});
    a = Math.abs(points[1].coord1[2])-1;
    b = Math.abs(points[0].coord1[0])-1;
    c = Math.abs(points[3].coord1[1])-2;
    $("#a").val(parseFloat(a.toPrecision(3)));
    // $("#b").val(parseFloat(b.toPrecision(3)));
    $("#c").val(parseFloat(c.toPrecision(3)));

    var vertices = [];
    var indices = [];
    var normals = [];
    var lineVertices = [];
    var slices1 = 64;
    var slices = 32;
    var angle = 2*Math.PI;

    var maxZ = Math.abs(points[3].coord1[1]);

    var phiM = maxZ/c;
    vertices[0] = [];
    normals[0] = [];
    for (var i = 0; i <= slices1; i++) {
        var psi = i*angle/slices1;
        for (var j = 0; j <= slices; j++) {
            var phi = (j/slices-0.5)*2*phiM;
            var py = b*phi*Math.cos(psi);
            var pz = c*phi;
            var px = a*phi*Math.sin(psi);
            vertices[0].push( py, pz, px );
            normals[0].push( 2*py/b/b );
            normals[0].push( -2*pz/c/c );
            normals[0].push( 2*px/a/a );
        }
    }
    var poly3rd2 = [[[0,0, 1.0/a/a],[0,0],[1.0/b/b]], [[0,0],[0]], [[-1.0/c/c]]];

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


    var ox = points[2].coord1[2];
    var oy = points[2].coord1[0];
    var oz = points[2].coord1[1];

    var ux = vectorU[2];
    var uy = vectorU[0];
    var uz = vectorU[1];

    var vx = vectorV[2];
    var vy = vectorV[0];
    var vz = vectorV[1];


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

    // primitives.push({class:"arrow", text: katex.renderToString("\\vec v"), arr0:points[2].coord1, arr1:points[4].coord1, rad:2, color:[0.8, 0.8, 0.8, 1.0]});
    // primitives.push({class:"point", text: "", arr0:points[5].coord1, rad:4, color:[0.0, 1.0, 0.0, 1.0]});
    // primitives.push({class:"arrow", text: "u", arr0:points[2].coord1, arr1:points[5].coord1, rad:2, color:[0.5, 0.5, 0.5, 1.0]});


    // primitives.push({class:"cone", text: "", arr0:points[0].coord1, arr1:[points[0].coord1[0]*1.1,0,0], rad:3, color:arrcol1});
    // primitives.push({class:"cone", text: "", arr0:points[1].coord1, arr1:[0,0,points[1].coord1[2]*1.1], rad:3, color:arrcol2});
    // primitives.push({class:"cone", text: "", arr0:points[3].coord1, arr1:[0,points[3].coord1[1]*1.1,0], rad:3, color:arrcol5});

    primitives.push({class:"point", text: "O'", arr0:points[2].coord1, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    // primitives.push({class:"cone", text: "",
    //                 arr0:points[2].coord1,
    //                 arr1:[points[2].coord1[0]+points[2].vector[0], points[2].coord1[1]+points[2].vector[1], points[2].coord1[2]],
    //                 rad:2.5, color:arrcol4});

    // primitives.push({class:"cone", text: "",
    //                 arr0:points[2].coord1,
    //                 arr1:[points[2].coord1[0]-points[2].vector[0], points[2].coord1[1]-points[2].vector[1], points[2].coord1[2]],
    //                 rad:2.5, color:arrcol4});

    if (isPlaneX) {
    	$("#x0").val(parseFloat(ox.toPrecision(3)));
    } else {
	    $("#bl").val(parseFloat(bl.toPrecision(3)));
	    $("#kl").val(parseFloat(kl.toPrecision(3)));
    }



    if (isShowСross) {
	    var poly3rd11 = [[[ox, ux],[0]], [[vx]]];
	    var poly3rd12 = [[[oy, uy],[0]], [[vy]]];
	    var poly3rd13 = [[[oz, uz],[0]], [[vz]]];
	    var polyEll1 = polyCreate23d();
	    var poly3rd = polyCreate23d();

	    changeP3dAll(poly3rd11, poly3rd12, poly3rd13, poly3rd2, polyEll1);

	    var tgphi;
	    var sinphi;
	    var cosphi;

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

	    var s0 = Math.abs(poly3rd[0][0][2]) > nuberEpsilon ? -poly3rd[0][0][1]/2.0/poly3rd[0][0][2] : 0;
	    var y0 = Math.abs(poly3rd[0][2][0]) > nuberEpsilon ? -poly3rd[0][1][0]/2.0/poly3rd[0][2][0] : 0;
	    var t0 = Math.abs(poly3rd[2][0][0]) > nuberEpsilon ? -poly3rd[1][0][0]/2.0/poly3rd[2][0][0] : 0;

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
	        if (sqrcinv == 0) {
	            var by = polyEll1[1][0][0];

	            if (by != 0) {
	                if ($("#curve").text() != "Парабола") {
	                    $("#curve").text("Парабола");
	                }
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
	                        if ($("#curve").text() != "Пара мнимых параллельных прямых") {
	                            $("#curve").text("Пара мнимых параллельных прямых");
	                        }
	                    } else {
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
	                if ($("#curve").text() != "Пара пересекающихся прямых") {
	                    $("#curve").text("Пара пересекающихся прямых");
	                }
	                var c1 = Math.sqrt(1.0/Math.abs(sqrcinv));
	                var a1 = Math.sqrt(1.0/Math.abs(sqrainv));

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

                phimult11 = phi1;
                phimult12 = phi2;
                phimult21 = phi3;
                phimult22 = phi4;

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
	            if ($("#curve").text() != "Гипербола") {
	                $("#curve").text("Гипербола");
	            }
	            var c1 = Math.sqrt(1.0/sqrcinv);
	            var a1 = Math.sqrt(-1.0/sqrainv);

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

	                phimult11 = phi1;
	                phimult12 = phi2;
	                phimult21 = phi3;
	                phimult22 = phi4;
	            }

	            lineVertices[0] = [];
	            for (var j = 0; j <= slices; j++) {
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
	            if ($("#curve").text() != "Мнимый эллипс") {
	                $("#curve").text("Мнимый эллипс");
	            }
	        } else {
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
    }


    var pz1 = [];
    var pz2 = [];
    createLine([points[2].coord1[0], points[2].coord1[1], points[2].coord1[2]],
                [points[2].coord1[0]+vectorV[0], points[2].coord1[1]+vectorV[1], points[2].coord1[2]+vectorV[2]],
                pz1,pz2,
                Math.sqrt(a*a+b*b+c*c)*2);

    var pcenter = [];
    var pvectorZ = [];
    vec3.add(pz1, pz2, pcenter);
    vec3.scale(pcenter, 0.5);
    vec3.subtract(pz2, pcenter, pvectorZ);
    var pvectorX = [pvectorZ[0], -pvectorZ[2], pvectorZ[1]];
    var p3 = [];
    vec3.add(points[2].coord1, pvectorX, p3);

    var py1 = [points[2].coord1[0]-Math.sqrt(a*a+b*b+c*c)*2, points[2].coord1[1], points[2].coord1[2]];
    var py2 = [points[2].coord1[0]+Math.sqrt(a*a+b*b+c*c)*2, points[2].coord1[1], points[2].coord1[2]];

    primitives.push({class:"arrow", text: "y'", ratio: 1,
    	             arr0: py1,
    	             arr1: py2,
    	             rad: 1, color:[0.0,0.0,0.8,1]});

    primitives.push({class:"arrow", text: "z'", ratio: 1, arr0: pz1, arr1: pz2, rad: 1, color:[0.0,0.0,0.8,1]});

    primitives.push({class:"arrow", text: "x'", ratio: 1, arr0: points[2].coord1, arr1: p3, rad: 1, color:[0.0,0.0,0.8,1]});

    if (!isPlaneX) {
	    primitives.push({class:"arc", text: katex.renderToString("\\varphi"),
	                     arr0: points[2].coord1,
	                     arr1: [points[2].coord1[0], points[2].coord1[1], points[2].coord1[2]+1],
	                     arr2: pz2,
	                     rad: 2, Rad: 2, color:[0.0,1.0,0.0,1]});
    }


    var p1 = [];
    var p2 = [];
    var p3 = [];
    var p4 = [];
    createPlane([points[2].coord1[0], points[2].coord1[1], points[2].coord1[2]],
                [points[2].coord1[0]+vectorU[0]+vectorV[0], points[2].coord1[1]+vectorU[1]+vectorV[1], points[2].coord1[2]+vectorU[2]+vectorV[2]],
                [points[2].coord1[0]+vectorU[0]-vectorV[0], points[2].coord1[1]+vectorU[1]-vectorV[1], points[2].coord1[2]+vectorU[2]-vectorV[2]],
                p1,p2,p3,p4,
                Math.sqrt(a*a+b*b+c*c)*2);
    if (isShowPlane) {
	    primitives.push({class:"plane", text: katex.renderToString("\\pi"), arr0: p3, arr1: p4, arr2: p1, arr3: p2, color:[0.0,0.0,1.0,0.2]});
    }

	function pushCoordLines(point, color) {
	    primitives.push({class:"dashline", text: "", arr0:point, arr1:[0,point[1],point[2]], rad:1.2, color:color});
	    primitives.push({class:"dashline", text: "", arr0:point, arr1:[point[0],0,point[2]], rad:1.2, color:color});
	    primitives.push({class:"dashline", text: "", arr0:point, arr1:[point[0],point[1],0], rad:1.2, color:color});

	    primitives.push({class:"dashline", text: "", arr0:[0,point[1],point[2]], arr1:[0,0,point[2]], rad:1.2, color:color});
	    primitives.push({class:"dashline", text: "", arr0:[point[0],0,point[2]], arr1:[0,0,point[2]], rad:1.2, color:color});
	    primitives.push({class:"dashline", text: "", arr0:[point[0],point[1],0], arr1:[0,point[1],0], rad:1.2, color:color});

	    primitives.push({class:"dashline", text: "", arr0:[0,point[1],point[2]], arr1:[0,point[1],0], rad:1.2, color:color});
	    primitives.push({class:"dashline", text: "", arr0:[point[0],0,point[2]], arr1:[point[0],0,0], rad:1.2, color:color});
	    primitives.push({class:"dashline", text: "", arr0:[point[0],point[1],0], arr1:[point[0],0,0], rad:1.2, color:color});

	    primitives.push({class:"text", text: katex.renderToString("x"), arr0:[0,0,point[2]]});
	    primitives.push({class:"text", text: katex.renderToString("y"), arr0:[point[0],0,0]});
	    primitives.push({class:"text", text: katex.renderToString("z"), arr0:[0,point[1],0]});
	}

	var planeCenter = [];
	vec3.add(p1, p3, planeCenter);
	vec3.scale(planeCenter, 0.5);

	var planeY = [];
	vec3.add(p1, p2, planeY);
	vec3.scale(planeY, 0.5);

	var planeZ = [];
	vec3.add(p1, p4, planeZ);
	vec3.scale(planeZ, 0.5);

	var vecY = [];
	vec3.subtract(planeY, planeCenter, vecY);
	vec3.normalize(vecY);

	var vecZ = [];
	vec3.subtract(planeZ, planeCenter, vecZ);
	vec3.normalize(vecZ);

    if (arrPoint == points[6].coord1) {
    	var toPlane = [];

		distToPlane(points[6].coord1, planeCenter, planeY, planeZ, toPlane);
		vec3.add(toPlane, points[6].coord1);

    	var cY = [];
    	paramsM[1] = distToLine(toPlane, planeCenter, planeY, cY);


    	var cZ = [];
    	paramsM[0] = distToLine(toPlane, planeCenter, planeZ, cZ);


    	var cY1 = [];
    	vec3.subtract(planeY, planeCenter, cY1);
    	var cY2 = [];
    	vec3.subtract(toPlane, planeCenter, cY2);
    	if (vec3.dot(cY1, cY2) < 0) {
    		paramsM[0] *= -1;
    	}
    	var cZ1 = [];
    	vec3.subtract(planeZ, planeCenter, cZ1);
    	var cZ2 = [];
    	vec3.subtract(toPlane, planeCenter, cZ2);
    	if (vec3.dot(cZ1, cZ2) < 0) {
    		paramsM[1] *= -1;
    	}
    }

	vec3.scale(vecY, paramsM[0]);
	vec3.scale(vecZ, paramsM[1]);

	vec3.add(vecY, vecZ, points[6].coord1);
	vec3.add(points[6].coord1, planeCenter);

    if (isShowPoint) {
    	var cY = [];
    	distToLine(points[6].coord1, py1, py2, cY);
    	vec3.add(cY, points[6].coord1);
		primitives.push({class:"dashline", text: "", arr0:points[6].coord1, arr1:cY, rad:1.2, color:[0.0, 0.8, 0.0, 1.0]});

    	var cZ = [];
    	distToLine(points[6].coord1, pz1, pz2, cZ);
    	vec3.add(cZ, points[6].coord1);
		primitives.push({class:"dashline", text: "", arr0:points[6].coord1, arr1:cZ, rad:1.2, color:[0.0, 0.8, 0.0, 1.0]});

	    primitives.push({class:"text", text: katex.renderToString("y'"), arr0:cY});
	    primitives.push({class:"text", text: katex.renderToString("z'"), arr0:cZ});
	}

	// function distToPlane(V0, P0, P1, P2, delta) {
	//     var a = [];
	//     vec3.subtract(P0,V0,a);
	//     var N = [];
	//     var v1 = [];
	//     var v2 = [];
	//     vec3.subtract(P1,P0,v1);
	//     vec3.subtract(P2,P0,v2);
	//     vec3.cross(v1,v2,N);
	//     vec3.normalize(N);
	//     if (!delta) delta = [];
	//     vec3.scale(N,vec3.dot(N,a),delta);
	//     return vec3.length(delta);
// 		// }
// function distToLine(V0, P0, P1, delta) {
//     var a = [];
//     var v = [];
//     vec3.subtract(V0,P0,a);
//     vec3.subtract(P1,P0,v);
//     vec3.normalize(v);
//     if (!delta) delta = [];
//     vec3.scale(v,vec3.dot(a,v),delta);
//     vec3.add(delta,P0);
//     vec3.subtract(delta,V0);
//     return vec3.length(delta);
// }

    	// primitives.push({class:"line", text: "Y",
    	//                  arr0:planeCenter,
    	//                  arr1:planeY,
    	//                  rad:1.5, color:[0.8, 0.5, 1.0, 1.0]});
    	// primitives.push({class:"line", text: "Z",
    	//                  arr0:planeCenter,
    	//                  arr1:planeZ,
    	//                  rad:1.5, color:[0.8, 0.5, 1.0, 1.0]});

    primitives.push({class:"point", text: katex.renderToString("M"), arr0:points[6].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    // pushCoordLines1(points[6].coord1, [0.0, 0.5, 0.5, 1.0]);
    if (isShowСoords) {
    	pushCoordLines(points[6].coord1, [0.8, 0.5, 0.0, 1.0]);
    	// primitives.push({class:"dashline", text: katex.renderToString("x_M"),
    	// 				 ratio: 1,
    	//                  arr0:points[6].coord1,
    	//                  arr1:[points[6].coord1[0], 0, points[6].coord1[2]],
    	//                  rad:1.5, color:[0.8, 0.5, 0.0, 1.0]});
    	// primitives.push({class:"dashline", text: katex.renderToString("z_M"),
    	// 				 ratio: 1,
    	//                  arr0:points[6].coord1,
    	//                  arr1:[points[6].coord1[0], points[6].coord1[1], 0],
    	//                  rad:1.5, color:[0.8, 0.5, 0.0, 1.0]});
    	// primitives.push({class:"dashline", text: katex.renderToString("y_M"),
    	// 				 ratio: 1,
    	//                  arr0:points[6].coord1,
    	//                  arr1:[0, points[6].coord1[1], points[6].coord1[2]],
    	//                  rad:1.5, color:[0.8, 0.5, 0.0, 1.0]});
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
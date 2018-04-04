var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-5, 0, 0]), movable: "plane", vector: [0,0,1]});
}
var meshPlane = {};
var isAnimate = false;
var planeTimer;
function initDescr() {
    $("#containerYellow").css({"min-width": "350px"});
    var descr = "";
    descr += '<h4>Полёт самолёта по параболической траектории</h4>';
    descr += '<p>Для проведения научных экспериментов и подготовки к полётам в космосе используют полёт самолёта по специальной <i>параболической</i> траектории, \
              при которой создаются условия близкие к невесомости (свободному падению).</p>';
    descr += '<p>Вначале самолёт летит по горизонтальной траектории <b>(1)</b> на высоте примерно 6 км.</p>\
              <p>Затем он резко набирает высоту до 7.6 км <b>(2)</b>, в это время пассажиры испытывают перегрузки до 2g (увеличение веса вдвое). \
              В конце этого участка траектории угол наклона самолёта к горизонту составляет около 45\u00B0.</p>\
              <p>Далее пилот уменьшает тягу двигателя $P$ почти до нуля (остаётся только небольшая тяга для компенсации силы $X_a$ сопротивления воздуха), и самолёт \
              начинает совершать полёт под действием только силы тяжести $\\vec G$ и начальной скорости $v_0$ на этом участке <b>(3)</b> ($v_0\\approx 600 \\frac{м}{с}$)</p>\
              <p>Из решения <i>задачи о траектории тела, брошенного под углом к горизонту</i> известно, что при таких условиях траектория на этом участке <b>(3)</b> будет \
              близка к <i>параболической</i> траектории.</p>\
              <p>Полёт самолёта и пассажиров будет происходить одинаково - в условиях, близких к свободному падению (невесомости). Незакреплённые пассажиры при этом \
              свободно "парят" в самолёте, как в невесомости.</p>\
              <p>Свободный полёт прекращается после того как самолёт наклонится под углом -45\u00B0 к горизонту. После этого пилот включает тягу, самолёт выравнивает угол \
              наклона к горизонту <b>(4)</b>, пассажиры при этом снова испытывают перегрузки до 2g.</p>\
              <p>Далее самолёт ложится на горизонтальную траекторию <b>(5)</b> и может повторить манёвр повторно.</p>';

    descr += '<label><input type="checkbox" onchange="changeAnimate(this.checked);"> Анимация премещения самолёта</label>';

    $("#description").html(descr);
    $("Title").html("Технические примеры");
    var preScaleTranslate = function(dx,dy,dz,sc) {
        for (var i = 0; i < this.vertexCoords.length/3; i++) {
            this.vertexCoords[i*3] = (this.vertexCoords[i*3]+dx)*sc;
            this.vertexCoords[i*3+1] = (this.vertexCoords[i*3+1]+dy)*sc;
            this.vertexCoords[i*3+2] = (this.vertexCoords[i*3+2]+dz)*sc;
        }
    }
    loadSTL("boying.stl", meshPlane, preScaleTranslate,[-6, -35.7716, -19.4469, 0.011]);
    // dispX = -1;
    // dispY = 1.5;
    // scaleFactor = 0.5;
    // rotAngY = -50;
    // rotAngX = 25;
}
var animStep = 0.1;
function changeAnimate(anim) {
    isAnimate = anim;

    if (anim) {
        planeTimer = setInterval(function () {
            if (points[0].coord1[0] + animStep < 7) {
                points[0].coord1[0] += animStep;
            } else {
                points[0].coord1[0] = -7;
            }
            initBuffers();
        }, 20);
    } else {
        clearInterval(planeTimer);
        initBuffers();
    }
}
function initData() {
    isOrtho = false;
    isShowAxes = false;

    if (!isAnimate) {
        if (arrPoint != 0) {
            primitives.push({class:"point", text: "", arr0:arrPoint, offset:true, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
        }
        primitives.push({class:"point", text: "", arr0:points[0].coord1, offset:true, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    }

    // var x1 = -7;
    // var x2 = -3;
    // var r1 = 1;
    // var x3 = 3;
    // var x4 = 7;

    // var x2 = -(2.4+1.6*Math.SQRT2);
    // var x1 = x2*1.8;
    // var r1 = 3.2+1.6*Math.SQRT2;
    // var x3 = -x2;
    // var x4 = x3*1.8;

    var x2 = -(3+Math.SQRT2);
    var x1 = x2*1.8;
    var r1 = 2+Math.SQRT2;
    var x3 = -x2;
    var x4 = x3*1.8;

    // var x2 = -4.516619608;
    // var x1 = x2*1.8;
    // var r1 = 4.258309804;
    // var x3 = -x2;
    // var x4 = x3*1.8;

    // var animStepMax = 0.1;
    // var animStepMin = animStepMax/1.65625;

    var trajectoryColor = [0.4, 0.4, 1.0, 1.0];
    var parabolaColor = [0.7, 0.7, 1.0, 1.0];
    var dashlineColor = [0.3, 0.3, 0.3, 1.0];
    // var dashlineColor = [0.0, 0.8, 0.0, 1.0];

    var linerad = 1.5;
    primitives.push({class:"line", text: "", arr0:[x1,0,0], arr1:[x2,0,0], rad:linerad, color:trajectoryColor});
    primitives.push({class:"arc", text: "", arr0:[x2,r1,0], arr1:[x2,0,0], arr2:[x2+r1,0,0], Rad:r1, rad:linerad, color:trajectoryColor});

    var parx1 = x2+Math.SQRT1_2*r1;
    var parx2 = x3-Math.SQRT1_2*r1;
    var pary = r1-Math.SQRT1_2*r1;
    var para = -1.0/(parx2-parx1);
    var parb = (parx2+parx1)/(parx2-parx1);
    var parc = pary - parx1*parx2/(parx2-parx1);

    var parCenterX = (parx1+parx2)/2;
    var parCenterY = parCenterX*parCenterX*para - (parb*parb-4*para*parc)/4/para;

    var slices = 64;

    var vertices = [];
    for (var i = 0; i <= slices; i++) {
        var psi = (i/slices-0.5)*(parx2-parx1)*2;
        vertices.push( [psi - parb/2/para,
                        psi*psi*para - (parb*parb-4*para*parc)/4/para,
                        0.0] );
    }

    for (var i = 0; i < vertices.length-1; i++) {
        if (i>=16 && i<48) {
            primitives.push({class:"line", text: "", arr0:vertices[i], arr1:vertices[i+1], rad:linerad, color:trajectoryColor});
        } else {
            primitives.push({class:"line", text: "", arr0:vertices[i], arr1:vertices[i+1], rad:1, color:parabolaColor});
        }
    }

    primitives.push({class:"arc", text: "", arr0:[x3,r1,0], arr1:[x3,0,0], arr2:[x3-r1,0,0], Rad:r1, rad:linerad, color:trajectoryColor});
    primitives.push({class:"line", text: "", arr0:[x3,0,0], arr1:[x4,0,0], rad:linerad, color:trajectoryColor});

    var surfaceSize = 8;
    var surfaceZ = -6;
    primitives.push({class:"dashline", text: "", arr0:[x1,0,0], arr1:[x3,0,0], rad:1, color:dashlineColor});
    primitives.push({class:"dashline", text: "", arr0:[x1,pary,0], arr1:[parx2,pary,0], rad:1, color:dashlineColor});
    primitives.push({class:"dashline", text: "", arr0:[x1,parCenterY,0], arr1:[parCenterX,parCenterY,0], rad:1, color:dashlineColor});

    primitives.push({class:"text", text: "6 км&nbsp;", pos: 'rc', arr0:[x1,0,0]});
    primitives.push({class:"text", text: "7 км&nbsp;", pos: 'rc', arr0:[x1,pary,0]});
    primitives.push({class:"text", text: "8 км&nbsp;", pos: 'rc', arr0:[x1,parCenterY,0]});
    // console.log(0+6,pary+6,parCenterY+6);


    primitives.push({class:"dashline", text: "", arr0:[x2,0,0], arr1:[x2,surfaceZ,0], rad:1, color:dashlineColor});
    primitives.push({class:"dashline", text: "", arr0:[parx1,pary,0], arr1:[parx1,surfaceZ,0], rad:1, color:dashlineColor});
    primitives.push({class:"dashline", text: "", arr0:[parx2,pary,0], arr1:[parx2,surfaceZ,0], rad:1, color:dashlineColor});
    primitives.push({class:"dashline", text: "", arr0:[x3,0,0], arr1:[x3,surfaceZ,0], rad:1, color:dashlineColor});

    var arrOffset = 0.5;
    primitives.push({class:"darrow", text: "20 с", pos: 'cb', arr0:[x2,surfaceZ+arrOffset,0], arr1:[parx1,surfaceZ+arrOffset,0], rad:linerad, color:dashlineColor});
    primitives.push({class:"darrow", text: "20 с", pos: 'cb', arr0:[parx1,surfaceZ+arrOffset,0], arr1:[parx2,surfaceZ+arrOffset,0], rad:linerad, color:dashlineColor});
    primitives.push({class:"darrow", text: "20 с", pos: 'cb', arr0:[parx2,surfaceZ+arrOffset,0], arr1:[x3,surfaceZ+arrOffset,0], rad:linerad, color:dashlineColor});

    primitives.push({class:"line", text: "", arr0:[x1,surfaceZ,0], arr1:[x1,parCenterY+1,0], rad:linerad, color:dashlineColor});
    primitives.push({class:"line", text: "", arr0:[x1,surfaceZ,0], arr1:[x4+1,surfaceZ,0], rad:linerad, color:dashlineColor});


    primitives.push({class:"point", text: "", arr0:[x2,0,0], rad:3, color:trajectoryColor});
    primitives.push({class:"point", text: "", arr0:[parx1,pary,0], rad:3, color:trajectoryColor});
    // primitives.push({class:"point", text: "", arr0:[parCenterX,parCenterY,0], rad:3, color:trajectoryColor});
    primitives.push({class:"point", text: "", arr0:[parx2,pary,0], rad:3, color:trajectoryColor});
    primitives.push({class:"point", text: "", arr0:[x3,0,0], rad:3, color:trajectoryColor});

    // primitives.push({class:"point", text: "1", arr0:[x2,0,0], rad:3, color:trajectoryColor});
    // primitives.push({class:"point", text: "2", arr0:[parx1,pary,0], rad:3, color:trajectoryColor});
    // primitives.push({class:"point", text: "3", arr0:[parCenterX,parCenterY,0], rad:3, color:trajectoryColor});
    // primitives.push({class:"point", text: "4", arr0:[parx2,pary,0], rad:3, color:trajectoryColor});
    // primitives.push({class:"point", text: "5", arr0:[x3,0,0], rad:3, color:trajectoryColor});

    primitives.push({class:"text", text: "1", arr0:[(x1+x2)/2,0,0], rad:3, color:trajectoryColor});
    primitives.push({class:"text", text: "2", arr0:[(x2+parx1)/2,pary/2,0], rad:3, color:trajectoryColor});
    primitives.push({class:"text", text: "3", arr0:[parCenterX,parCenterY,0], rad:3, color:trajectoryColor});
    primitives.push({class:"text", text: "4", arr0:[(parx2+x3)/2,pary/2,0], rad:3, color:trajectoryColor});
    primitives.push({class:"text", text: "5", arr0:[(x3+x4)/2,0,0], rad:3, color:trajectoryColor});

    function coordComp(cx) {
        if (cx <= x2 || cx >= x3) {
            return 0;
        } else if (cx >= parx1 && cx <= parx2) {
            return para*cx*cx + parb*cx + parc;
        } else if (cx > x2 && cx < parx1) {
            return r1 - Math.sqrt( r1*r1 - (cx-x2)*(cx-x2) );
        } else {
            return r1 - Math.sqrt( r1*r1 - (cx-x3)*(cx-x3) );
        }
    }
    // function stepComp(cx) {
    //     if (cx <= x2 || cx >= x3) {
    //         return 0;
    //     } else if (cx >= parx1 && cx <= parx2) {
    //         return para*cx*cx + parb*cx + parc;
    //     } else if (cx > x2 && cx < parx1) {
    //         return r1 - Math.sqrt( r1*r1 - (cx-x2)*(cx-x2) );
    //     } else {
    //         return r1 - Math.sqrt( r1*r1 - (cx-x3)*(cx-x3) );
    //     }
    // }

    function findRotateZ(p1,p2) {
        let vec_a = vec3.create();
        vec3.subtract(p2,p1,vec_a);
        vec_a[2] = 0;
        vec3.normalize(vec_a);
        let cosa = vec_a[0];
        let cosb = vec_a[1];
        let alpha = Math.acos(cosa)/Math.PI*180;
        if (cosb<0) {alpha *= -1;}
        return alpha;
    }
    // animStep = stepComp(points[0].coord1[0]);
    points[0].coord1[1] = coordComp(points[0].coord1[0]);
    var ptail = vec3.create(points[0].coord1);
    ptail[0] -= 0.1;
    ptail[1] = coordComp(ptail[0]);

    var planeAngleDeg = findRotateZ(ptail,points[0].coord1);
    var planeAngleRad = planeAngleDeg/180*Math.PI;

    // var lenG = 1;
    // var lenP = 1;
    // var lenX = 1;
    // var lenY = 1;
    // function vecComp(cx) {
    //     if (cx <= x2 || cx >= x3) {
    //     lenG = 1;
    //     lenP = 1;
    //     lenX = 1;
    //     lenY = 1;
    //         // return 0;
    //     } else if (cx >= parx1 && cx <= parx2) {

    //     lenG = 1;
    //     lenP = 1;
    //     lenX = 1;
    //     lenY = 0;
    //         // return para*cx*cx + parb*cx + parc;
    //     } else if (cx > x2 && cx < parx1) {
    //     lenG = 1;
    //     lenP = 1;
    //     lenX = 1;
    //     lenY = 1-(cx-x2)/(parx1-x2);
    //         // return r1 - Math.sqrt( r1*r1 - (cx-x2)*(cx-x2) );
    //     } else {
    //         // return r1 - Math.sqrt( r1*r1 - (cx-x3)*(cx-x3) );
    //     }
    // }
    // vecComp(points[0].coord1[0]);
    // primitives.push({class:"arrow", text: katex.renderToString('\\vec G'), ratio: 1, arr0:points[0].coord1, arr1:[points[0].coord1[0],points[0].coord1[1]-lenG,0.0], rad:1.5, color:[0.8, 0.8, 0.0, 1.0]});
    // primitives.push({class:"arrow", text: katex.renderToString('\\vec X_a'), ratio: 1, arr0:points[0].coord1, arr1:[points[0].coord1[0]-lenX*Math.cos(planeAngleRad),points[0].coord1[1]-lenX*Math.sin(planeAngleRad),0.0], rad:1.5, color:[0.8, 0.8, 0.0, 1.0]});
    // primitives.push({class:"arrow", text: katex.renderToString('\\vec P'), ratio: 1, arr0:points[0].coord1, arr1:[points[0].coord1[0]+lenP*Math.cos(planeAngleRad),points[0].coord1[1]+lenP*Math.sin(planeAngleRad),0.0], rad:1.5, color:[0.8, 0.8, 0.0, 1.0]});
    // primitives.push({class:"arrow", text: katex.renderToString('\\vec Y_a'), ratio: 1, arr0:points[0].coord1, arr1:[points[0].coord1[0]-lenY*Math.sin(planeAngleRad),points[0].coord1[1]+lenY*Math.cos(planeAngleRad),0.0], rad:1.5, color:[0.8, 0.8, 0.0, 1.0]});

    if (meshPlane.isready)
    {
        let vertexCoords = meshPlane.vertexCoords;
        let normalCoords = meshPlane.normalCoords;
        let vertexIndices = meshPlane.vertexIndices;
        meshes.push({
            vertices:vertexCoords,
            normals:normalCoords,
            indices:vertexIndices,
            translate:points[0].coord1,
            rotateZ:planeAngleDeg,
            centerTranslate:[0,0,0],
            color:[0.75,0.5,0.0,1.0]
        });
    }

    primitives.push({class:"plane", text: "",
                     arr0:[-surfaceSize,surfaceZ,-surfaceSize],
                     arr1:[surfaceSize,surfaceZ,-surfaceSize],
                     arr2:[surfaceSize,surfaceZ,surfaceSize],
                     arr3:[-surfaceSize,surfaceZ,surfaceSize],
                     color:[0.5, 0.5, 0.5, 0.4]});
}
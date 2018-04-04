var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-(6000+earthRadius) / ellscale,0,0]), movable: "line", vector: vec3.create([1,0,0])});
    points.push({coord1: vec3.create([(20000+earthRadius) / ellscale,0,0]), movable: "line", vector: vec3.create([1,0,0])});
    points.push({coord1: vec3.create(), movable: "plane", vector: vec3.create([0,1,0])});
}
var earthRadius = 6371;
var atmosphereHeight = 100; // Линия Кармана
var ellscale = 6371;
var mesh1 = {};
var mesh2 = {};
var texImage;
function initDescr() {
    var descr = '';
    descr += '<p>Искусственные спутники Земли (например "Меридиан") летают по эллиптическим орбитам, в одном из фокусов которых находится Земля (центр Земли).</p>';
    descr += '<p>Высокие эллиптические орбиты (ВЭО) представляют собой сильно вытянутый эллипс.</p>';
    descr += '<p>Минимальное расстояние от эллипса до центра Земли $|AF_1|$ называют <i>перигеем</i>, а максимальное расстояние $|F_1B|$ - <i>апогеем</i>.</p>';
    descr += '<p>Обычно для ВЭО - <br>';
    descr += 'Высота в перигее $\\approx 500 км.$<br>';
    descr += 'Высота в апогее $\\geqslant 40000 км.$<br>';
    descr += 'Прибавив средний радиус Земли $R_e=6371 км$ получаем:<br>';
    descr += '$|AF_1|\\approx 6871 км.$<br>';
    descr += '$|F_1B|\\geqslant 46371 км.$</p>';
    descr += '<p>ВЭО позволяет обеспечивать связь в высокоширотных областях Земли около полюсов, "зависая" вблизи апогея над нужной областью (Арктика и т.п.).</p>';

    descr += '<p><label><input type="checkbox" onchange="changeAnimate(this.checked);"> Анимация премещения спутника</label></p>';

    var tIS = 8;
    descr += "<p>$|AF_1|-R_e=$ <input type='text' id='x1' size='"+tIS+"'> км<br>$|F_1B|-R_e=$ <input type='text' id='x2' size='"+tIS+"'> км</p>";
    $("#description").html(descr);
    $("#x1").change(function(event){
        points[0].coord1[0] = -(Math.abs(parseFloat(this.value)) + earthRadius) / ellscale;
        if (-points[0].coord1[0] > points[1].coord1[0]) points[1].coord1[0] = -points[0].coord1[0];
        initBuffers();
    });
    $("#x2").change(function(event){
        points[1].coord1[0] = (Math.abs(parseFloat(this.value)) + earthRadius) / ellscale;
        if (-points[0].coord1[0] > points[1].coord1[0]) points[0].coord1[0] = -points[1].coord1[0];
        initBuffers();
    });
    $("Title").html("Эллипс");

    texImage=new Image();
    texImage.onload=function() {
        texImageReady = true;
        initBuffers();
    };
    texImage.src='meshes/Earth3.jpg';
    loadOBJ("Earth.obj", mesh1);
    loadOBJ("Satellite.obj", mesh2);

    rotAngX = 45;
}
var texImageReady = false;

var isAnimate = false;
var orbit = 2;
var planeTimer;
var earthRotation = 0;
function changeAnimate(anim) {
    isAnimate = anim;

    if (anim) {
        planeTimer = setInterval(function () {
            var mu = 1;
            var rE = (36000+earthRadius)/ellscale;
            var vE = Math.sqrt(mu/rE);
            earthRotation -= 0.5*vE/rE;

            var r = semiLatusRectum/(1.0 - eccentricity*Math.cos(paramOfPoint));
            var x1 = points[0].coord1[0];
            var x2 = points[1].coord1[0];
            var a = Math.abs((x1-x2)/2.0);
            var c = Math.abs((x1+x2)/2.0);
            var b = Math.sqrt(a*a-c*c);
            var hypa = 1;
            var r0 = semiLatusRectum/(1.0 + eccentricity);
            var v0 = Math.sqrt(mu*(2/r0-1/a));
            var numerator = 0.5*v0*r0;
            var denominator = r*r;
            paramOfPointStep = numerator/denominator;
            if (paramOfPointStep > 0.1) {
                numerator /= 100;
                var paramOfPointStep1 = 0;
                for (var i = 0; i < 100; i++) {
                    var r = semiLatusRectum/(1.0 - eccentricity*Math.cos(paramOfPoint-paramOfPointStep1));
                    var denominator = r*r;
                    paramOfPointStep1 += numerator/denominator;
                }
                paramOfPointStep = paramOfPointStep1;
            } else if (paramOfPointStep > 0.01) {
                numerator /= 10;
                var paramOfPointStep1 = 0;
                for (var i = 0; i < 10; i++) {
                    var r = semiLatusRectum/(1.0 - eccentricity*Math.cos(paramOfPoint-paramOfPointStep1));
                    var denominator = r*r;
                    paramOfPointStep1 += numerator/denominator;
                }
                paramOfPointStep = paramOfPointStep1;
            }

            paramOfPoint -= paramOfPointStep;
            initBuffers();
        }, 40);
    } else {
        clearInterval(planeTimer);
    }
}
var paramOfPoint = Math.PI/4;
var paramOfPointStep = 0.03;
var timeStep = 0.03;
var eccentricity;
var semiLatusRectum;
var maximumAngle;
function initData() {
    isOrtho = false;
    isShowAxes = false;
    var arrRad = 2;
    var lineRad = 1.3;
    var pointRad = 4;
    var chosenPointRad = 5;

    if (points[0].coord1[0] > -(earthRadius+atmosphereHeight)/ellscale) points[0].coord1[0] = -(earthRadius+atmosphereHeight)/ellscale;
    if (points[1].coord1[0] < (earthRadius+atmosphereHeight)/ellscale) points[1].coord1[0] = (earthRadius+atmosphereHeight)/ellscale;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", offset: true, arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[0].coord1) {
            if (-points[0].coord1[0] > points[1].coord1[0]) points[1].coord1[0] = -points[0].coord1[0];
        }
        if (arrPoint == points[1].coord1) {
            if (-points[0].coord1[0] > points[1].coord1[0]) points[0].coord1[0] = -points[1].coord1[0];
        }
    }

    var x1 = points[0].coord1[0];
    var x2 = points[1].coord1[0];

    var a = Math.abs((x1-x2)/2.0);
    var c = Math.abs((x1+x2)/2.0);
    var x0 = c;
    var b = Math.sqrt(a*a-c*c);


    $("#x1").val(parseFloat(-x1*ellscale-earthRadius).toFixed(0));
    $("#x2").val(parseFloat(x2*ellscale-earthRadius).toFixed(0));

    let slices = 160;
    let vertices = [];

    var epsilon = c/a;
    var ellp = b*b/a;

    eccentricity = epsilon;
    semiLatusRectum = ellp;

    if (arrPoint == points[2].coord1) {
        var point4vec = vec3.create(points[2].coord1);
        vec3.normalize(point4vec);
        paramOfPoint = Math.acos(point4vec[0]);
        if (point4vec[2]<0) paramOfPoint = 2*Math.PI-paramOfPoint;
    }

    vertices[0] = [];
    for (var i = 0; i <= slices; i++) {
        var psi = i*2*Math.PI/slices;
        vertices[0].push( [a*Math.cos(psi) + x0, 0.0, b*Math.sin(psi)] );
    }

    var pointM = points[2].coord1;

    if (paramOfPoint < 0) {
        paramOfPoint += Math.PI*2;
    }

    var r = semiLatusRectum/(1.0 - eccentricity*Math.cos(paramOfPoint));
    vec3.set([r*Math.cos(paramOfPoint), 0.0, r*Math.sin(paramOfPoint)], pointM);

    var focus1 = [0,0,0];
    var focus2 = [2*c,0,0];

    for (var j = 0; j < vertices.length; j++) {
        curveLineRad = 2;
        curveLineColor = [0.5, 0.5, 1.0, 1.0];
        for (var i = 0; i < vertices[j].length-1; i++) {
            primitives.push({class:"line", text: "", arr0:vertices[j][i], arr1:vertices[j][i+1], rad:curveLineRad, color:curveLineColor});
        }
    }

    if (mesh1.isready && texImageReady && mesh2.isready)
    {
        let vertexCoords = mesh1.vertexCoords;
        let normalCoords = mesh1.normalCoords;
        let textureCoords = mesh1.textureCoords;
        let vertexIndices = mesh1.vertexIndices;

        meshes.push({
            vertices:vertexCoords,
            normals:normalCoords,
            indices:vertexIndices,
            rotateY:90+earthRotation/Math.PI*180,
            rotateX:180,
            scale:0.4065,
            translate:focus1,
            texcoords:textureCoords,
            texture:texImage,
            color:[0.0,0.5,1.0,1]
        });
        vertexCoords = mesh2.vertexCoords;
        normalCoords = mesh2.normalCoords;
        vertexIndices = mesh2.vertexIndices;

        meshes.push({
            vertices:vertexCoords,
            normals:normalCoords,
            indices:vertexIndices,
            translate:pointM,
            color:[0.7,0.7,0.7,1.0]
        });
    }

    primitives.push({class:"point", text: katex.renderToString("A"), arr0:[x1,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("B"), arr0:[x2,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("F_1"), offset:true, arr0:focus1, rad:pointRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("F_2"), offset:true, arr0:focus2, rad:pointRad, color:[0.0, 0.0, 1.0, 1.0]});

    primitives.push({class:"point", text: "", offset:true, arr0:pointM, rad:pointRad, color:[0.0, 0.0, 0.7, 1.0]});
}
var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    $("#containerYellow").css({"min-width": "350px"});
    var descr = '';
    descr += '<h4>Зеркало в форме параболического цилиндра для радиолокатора</h4>';
    descr += '<label><input type="checkbox" checked onchange="isShow[0]=this.checked; initBuffers();"> 1) Облучатель с линейной фазированной антенной решёткой (ФАР)</label>';
    descr += '<label><input type="checkbox" checked onchange="isShow[1]=this.checked; initBuffers();"> 2) Зеркало в форме сектора параболического цилиндра</label>';
    descr += '<p>Линейная ФАР генерирует волны со сдвигом фазы (задержкой времени импульса сигнала) для разных участков облучателя. \
              В результате от линейного (цилиндрического) облучателя расходится головная волна в форме близкой к конусу. \
              Лучи падающей от облучателя головной волны направлены по нормали к боковой поверхности конуса.</p>';
    descr += '<p>Вследствие оптического свойства параболы, зеркало в форме параболического цилиндра преобразует падающую коническую \
              волну в <i>плоскую</i> отражённую волну.</p>';
    descr += '<p>Плоскость головной отражённой волны ориентирована по нормали к отражённым лучам, которые наклонены под углом \
              $\\Theta$ к оси $Ox$ параболы.</p>';

    descr += '<p><label><input type="checkbox" checked onchange="isShow[2]=this.checked; initBuffers();"> Лучи</label>';
    descr += '<label><input type="checkbox" checked onchange="isShow[3]=this.checked; initBuffers();"> Конус головной волны</label></p>';
    descr += '<label><input type="checkbox" onchange="changeAnimate(this.checked);"> Анимация</label>';
    descr += '<input type="button" value="Сбросить анимацию" onclick="timeParam = timeParam1; initBuffers();">';
    $("#description").html(descr);

    $("#containerGreen").append('<div id="controls">\
                                 <b>Угол наклона</br> волны:</b></br>\
                                 <input type="button" value="-" onclick="changeRayAngle(-1);">\
                                 <input id="angle" type="text" size=2 readonly">\
                                 <input type="button" value="+" onclick="changeRayAngle(1);">\
                                 </div>');
    $("#angle").val(rayAngleGrad);

    rotAngX = 45;
    rotAngY = 10;

    $("Title").html("Кривые и поверхности второго порядка");
}
var rayAngleGrad = 30;
var rayAngle = rayAngleGrad/180*Math.PI;
function changeRayAngle(dir) {
    rayAngleGrad += dir*5;
    if (rayAngleGrad < 0) rayAngleGrad = 0;
    if (rayAngleGrad > 45) rayAngleGrad = 45;
    $("#angle").val(rayAngleGrad);
    rayAngle = rayAngleGrad/180*Math.PI;

    initBuffers();
}
var planeTimer;
var animStep = 0.05;
var arrowLength = 2;
var timeParam1 = -arrowLength;
var timeParam2 = 12;
var timeParam = timeParam1;
function changeAnimate(anim) {
    isAnimate = anim;

    if (anim) {
        planeTimer = setInterval(function () {
            if (timeParam + animStep < timeParam2) {
                timeParam += animStep;
            } else {
                timeParam = timeParam1;
            }
            initBuffers();
        }, 20);
    } else {
        clearInterval(planeTimer);
        initBuffers();
    }
}
var isShow = [true, true, true, true];
function initData() {
    isShowAxes = false;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    var parp = 7;
    var par2y0 = -0.5;

    // var mirrLen1 = -1;
    // var mirrLen2 = 2;
    var mirrLen1 = -4;
    var mirrLen2 = 6;


    var paramOfPoint1;
    var layersCount;
    // var paramOfPoint1 = [10, 5, 0, -5, -10];
    // var paramOfPoint1 = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];
    // if (true) {
    //     paramOfPoint1 = [0];
    //     layersCount = 4;
    // } else {
        paramOfPoint1 = [4.5, 3, 1.5, 0, -1.5, -3, -4.5];
        layersCount = 3;
    // }

    // var paramOfPoint1 = [4, 1, -2, -4.5];
    // var paramOfPoint1 = [Math.PI/4, Math.PI/6, 0, -Math.PI/6, -Math.PI/4];

    class Mesh {
      constructor(slicesPsi, slicesPhi, crossSectionType) {
        if (crossSectionType === undefined) {
            this.crossSectionType = 0;
        } else {
            this.crossSectionType = crossSectionType;
        }
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.slicesPsi = slicesPsi;
        this.slicesPhi = slicesPhi;
      }
    }
    var meshArray = [];

    var mirrorThickness = 0.2;

    if (isShow[1]) {
        meshArray.push(new Mesh(1, 32));
        var mesh = meshArray[meshArray.length-1];
        var maxPhi = 5;
        primitives.push({class:"line", text: "", arr0:[-maxPhi,1,maxPhi*maxPhi/2/parp-mirrorThickness/2], arr1:[-maxPhi-0.5,1.5,maxPhi*maxPhi/2/parp+0.1], rad:1, color:[0.0,0.0,0.0,1.0]});
        primitives.push({class:"text", text: "2", pos: "cb", arr0:[-maxPhi-0.5,1.5,maxPhi*maxPhi/2/parp+0.1]});
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i/mesh.slicesPsi*(mirrLen2-mirrLen1)+mirrLen1;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = (j/mesh.slicesPhi*2-1)*maxPhi;
                var px = phi;
                var py = phi*phi/2/parp;
                var pz = psi;
                mesh.vertices.push( px, py, pz );
                mesh.normals.push( 2*px );
                mesh.normals.push( -2*parp );
                mesh.normals.push( 0 );
            }
        }

        meshArray.push(new Mesh(1, 32));
        var mesh = meshArray[meshArray.length-1];
        var maxPhi = 5;
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i/mesh.slicesPsi*(mirrLen2-mirrLen1)+mirrLen1;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = (j/mesh.slicesPhi*2-1)*maxPhi;
                var px = phi;
                var py = phi*phi/2/parp;
                var pz = psi;
                mesh.vertices.push( px, py-mirrorThickness, pz );
                mesh.normals.push( 2*px );
                mesh.normals.push( -2*parp );
                mesh.normals.push( 0 );
            }
        }
        meshArray.push(new Mesh(1, 32));
        var mesh = meshArray[meshArray.length-1];
        var maxPhi = 5;
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = (j/mesh.slicesPhi*2-1)*maxPhi;
                var px = phi;
                var py = -psi*mirrorThickness+phi*phi/2/parp;
                var pz = mirrLen2;
                mesh.vertices.push( px, py, pz );
                mesh.normals.push( 0 );
                mesh.normals.push( 0 );
                mesh.normals.push( 1 );
            }
        }
        meshArray.push(new Mesh(1, 32));
        var mesh = meshArray[meshArray.length-1];
        var maxPhi = 5;
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = (j/mesh.slicesPhi*2-1)*maxPhi;
                var px = phi;
                var py = -psi*mirrorThickness+phi*phi/2/parp;
                var pz = mirrLen1;
                mesh.vertices.push( px, py, pz );
                mesh.normals.push( 0 );
                mesh.normals.push( 0 );
                mesh.normals.push( 1 );
            }
        }
        meshArray.push(new Mesh(1, 1));
        var mesh = meshArray[meshArray.length-1];
        var maxPhi = 5;
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i/mesh.slicesPsi*(mirrLen2-mirrLen1)+mirrLen1;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = -maxPhi;
                var py = -phi*mirrorThickness+maxPhi*maxPhi/2/parp;
                var pz = psi;
                mesh.vertices.push( px, py, pz );
                mesh.normals.push( 1 );
                mesh.normals.push( 0 );
                mesh.normals.push( 0 );
            }
        }
        meshArray.push(new Mesh(1, 1));
        var mesh = meshArray[meshArray.length-1];
        var maxPhi = 5;
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i/mesh.slicesPsi*(mirrLen2-mirrLen1)+mirrLen1;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = maxPhi;
                var py = -phi*mirrorThickness+maxPhi*maxPhi/2/parp;
                var pz = psi;
                mesh.vertices.push( px, py, pz );
                mesh.normals.push( 1 );
                mesh.normals.push( 0 );
                mesh.normals.push( 0 );
            }
        }
    } else {
        paramOfPoint1 = [0];
        for (var i = 0; i < paramOfPoint1.length; i++) {
            primitives.push({class:"line", text: "", arr0:[paramOfPoint1[i],-mirrLen1,paramOfPoint1[i]*paramOfPoint1[i]/parp/2], arr1:[paramOfPoint1[i],-mirrLen2,paramOfPoint1[i]*paramOfPoint1[i]/parp/2], rad:2, color:[0.0, 0.0, 0.0, 1.0]});
        }
    }
    //  else {
    //     var slices = 64;
    //     var lineVertices = [];

    //     var maxPhi = 5;
    //     for (var j = 0; j <= slices; j++) {
    //         var phi = (j/slices*2-1)*maxPhi;
    //         var px = phi;
    //         var py = 0;
    //         var pz = phi*phi/2/parp;
    //         lineVertices.push( [px, py, pz] );
    //     }
    //     for (var i = 0; i < lineVertices.length-1; i++) {
    //         primitives.push({class:"line", text: "", arr0:lineVertices[i], arr1:lineVertices[i+1], rad:2, color:[0.0, 0.0, 1.0, 1.0]});
    //     }
    // }

    if (isShow[0]) {
        meshArray.push(new Mesh(16, 1, -1));
        var mesh = meshArray[meshArray.length-1];
        var cylrad = 0.2;
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*2*Math.PI/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi*(mirrLen2-mirrLen1)+mirrLen1;
                var px = cylrad*Math.sin(psi);
                var py = cylrad*Math.cos(psi)+parp/2;
                var pz = phi;
                mesh.vertices.push( px, py, pz );
                mesh.normals.push( 2*px/cylrad/cylrad );
                mesh.normals.push( 2*(py-parp/2)/cylrad/cylrad );
                mesh.normals.push( 0 );
            }
        }
        primitives.push({class:"line", text: "", arr0:[-cylrad,1,parp/2], arr1:[-cylrad-0.5,1.5,parp/2+0.1], rad:1, color:[0.0,0.0,0.0,1.0]});
        primitives.push({class:"text", text: "1", pos: "cb", arr0:[-cylrad-0.5,1.5,parp/2+0.1]});

        meshArray.push(new Mesh(16, 1, 1));
        var mesh = meshArray[meshArray.length-1];
        var cylrad = 0.2;
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*2*Math.PI/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = phi*cylrad*Math.sin(psi);
                var py = phi*cylrad*Math.cos(psi)+parp/2;
                var pz = mirrLen1;
                mesh.vertices.push( px, py, pz );
                mesh.normals.push( 0 );
                mesh.normals.push( 0 );
                mesh.normals.push( 1 );
            }
        }
        meshArray.push(new Mesh(16, 1, 1));
        var mesh = meshArray[meshArray.length-1];
        var cylrad = 0.2;
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*2*Math.PI/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = phi*cylrad*Math.sin(psi);
                var py = phi*cylrad*Math.cos(psi)+parp/2;
                var pz = mirrLen2;
                mesh.vertices.push( px, py, pz );
                mesh.normals.push( 0 );
                mesh.normals.push( 0 );
                mesh.normals.push( 1 );
            }
        }

        var beamRad = 0.07;

        var beamPos1 = 4.5;
        var beamPos2 = 0;
        var beamPosY1 = beamPos1*beamPos1/2/parp;
        var beamPosY2 = parp/2;
        meshArray.push(new Mesh(8, 1, 1));
        var beamVec1 = [beamPos1, beamPosY1, 0];
        var beamVec2 = [beamPos2, beamPosY2, 0];
        var beamVec = [beamPos1-beamPos2, beamPosY1-beamPosY2, 0];
        var beamVecLen = vec3.length(beamVec);

        vec3.scale(beamVec, 1.0/beamVecLen);
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*2*Math.PI/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = beamRad*Math.cos(psi);
                var py = phi*(beamVecLen+mirrorThickness/2);
                var pz = beamRad*Math.sin(psi);
                mesh.vertices.push( px*beamVec[1]-py*beamVec[0], px*beamVec[0]+py*beamVec[1]+parp/2, pz+mirrLen2-beamRad );

                var normal = [Math.cos(psi), 0, Math.sin(psi)];
                mesh.normals.push( normal[0]*beamVec[1]-normal[1]*beamVec[0] );
                mesh.normals.push( normal[0]*beamVec[0]+normal[1]*beamVec[1] );
                mesh.normals.push( normal[2] );
            }
        }

        var beamPos1 = 0;
        var beamPos2 = 0;
        var beamPosY1 = beamPos1*beamPos1/2/parp;
        var beamPosY2 = parp/2;
        meshArray.push(new Mesh(8, 1, 1));
        var beamVec1 = [beamPos1, beamPosY1, 0];
        var beamVec2 = [beamPos2, beamPosY2, 0];
        var beamVec = [beamPos1-beamPos2, beamPosY1-beamPosY2, 0];
        var beamVecLen = vec3.length(beamVec);

        vec3.scale(beamVec, 1.0/beamVecLen);
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*2*Math.PI/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = beamRad*Math.cos(psi);
                var py = phi*(beamVecLen+mirrorThickness/2);
                var pz = beamRad*Math.sin(psi);
                mesh.vertices.push( px*beamVec[1]-py*beamVec[0], px*beamVec[0]+py*beamVec[1]+parp/2, pz+mirrLen2-beamRad );

                var normal = [Math.cos(psi), 0, Math.sin(psi)];
                mesh.normals.push( normal[0]*beamVec[1]-normal[1]*beamVec[0] );
                mesh.normals.push( normal[0]*beamVec[0]+normal[1]*beamVec[1] );
                mesh.normals.push( normal[2] );
            }
        }

        var beamPos1 = -4.5;
        var beamPos2 = 0;
        var beamPosY1 = beamPos1*beamPos1/2/parp;
        var beamPosY2 = parp/2;
        meshArray.push(new Mesh(8, 1, 1));
        var beamVec1 = [beamPos1, beamPosY1, 0];
        var beamVec2 = [beamPos2, beamPosY2, 0];
        var beamVec = [beamPos1-beamPos2, beamPosY1-beamPosY2, 0];
        var beamVecLen = vec3.length(beamVec);

        vec3.scale(beamVec, 1.0/beamVecLen);
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*2*Math.PI/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = beamRad*Math.cos(psi);
                var py = phi*(beamVecLen+mirrorThickness/2);
                var pz = beamRad*Math.sin(psi);
                mesh.vertices.push( px*beamVec[1]-py*beamVec[0], px*beamVec[0]+py*beamVec[1]+parp/2, pz+mirrLen2-beamRad );

                var normal = [Math.cos(psi), 0, Math.sin(psi)];
                mesh.normals.push( normal[0]*beamVec[1]-normal[1]*beamVec[0] );
                mesh.normals.push( normal[0]*beamVec[0]+normal[1]*beamVec[1] );
                mesh.normals.push( normal[2] );
            }
        }
    } else {
        primitives.push({class:"line", text: "", arr0:[0,-mirrLen1,parp/2], arr1:[0,-mirrLen2,parp/2], rad:2.5, color:[1.0, 0.0, 0.0, 1.0]});
    }


    var rayAngleTan = Math.tan(rayAngle);
    var rayAngleCos = Math.cos(rayAngle);
    var rayAngleSin = Math.sin(rayAngle);

    var pointFY1 = -mirrLen1-parp/2*rayAngleTan-1.5;
    var pointFY2 = -mirrLen2+0.2;
    var vectorNLen0 = parp/2+3;

    // var layersCount = 3;
    for (var j = 0; j < layersCount; j++) {
        var pointFY = j/(layersCount-1)*(pointFY2-pointFY1)+pointFY1;
        var vectorNLen = vectorNLen0-j/(layersCount-1)*(pointFY2-pointFY1)*rayAngleSin;
        for (var i = 0; i < paramOfPoint1.length; i++) {

            var pointF = [0,pointFY,parp/2];
            var pointMX = paramOfPoint1[i];
            var pointMZ = paramOfPoint1[i]*paramOfPoint1[i]/2/parp;

            // var ray2Tan;
            // if (paramOfPoint1[i] == 0) {
            //     ray2Tan = 0;
            // } else {
            //     ray2Tan = Math.abs(paramOfPoint1[i])/(pointF[2]-pointMZ);
            // }
            // console.log(paramOfPoint1[i],ray2Tan);

            // var ray2Sin= Math.sqrt( ray2Tan / (1 + ray2Tan*ray2Tan) );
            // console.log(i, ray2Sin, (1 + paramOfPoint1[i]*paramOfPoint1[i]/pointMZ/pointMZ));
            // var rayAngle = Math.PI/6 + (Math.PI/2-Math.PI/6)*ray2Sin;
            // var rayAngleTan1 = Math.tan(rayAngle);

            var pointMY = Math.sqrt((parp/2-pointMZ)*(parp/2-pointMZ) + pointMX*pointMX)*rayAngleTan+pointFY;
            var pointM = [pointMX, pointMY, pointMZ];


            var normal = [-paramOfPoint1[i], 0, parp];
            vec3.normalize(normal);

            var vectorM = [];
            vec3.subtract(pointM, pointF, vectorM);
            vec3.scale(normal, -vec3.dot(vectorM,normal)*2);

            vec3.add(vectorM, normal);

            var pointN = [];
            vec3.add(vectorM, pointM, pointN);

            // vec3.add(normal,pointM);
            // primitives.push({class:"arrow", text: "", arr0:pointM, arr1:normal, rad:2, color:[0.5,0,0,1]});

            // var pointNZ = vectorNLen*rayAngleCos+pointMZ;
            // var pointNY = vectorNLen*rayAngleSin+pointMY;
            // var pointN = [pointM[0],pointNY,pointNZ];

            var arrowColor, arcColor;
            switch (j) {
              case 0:
                arrowColor = [0.0, 0.9, 0.5, 1.0];
                arcColor = [0.0, 0.8, 0.4, 1.0];
                break;
              case 1:
                arrowColor = [0.9, 0.5, 0.0, 1.0];
                arcColor = [0.8, 0.4, 0.0, 1.0];
                break;
              case 3:
                arrowColor = [0.5, 0.9, 0.0, 1.0];
                arcColor = [0.4, 0.8, 0.0, 1.0];
                break;
              case 2:
                arrowColor = [0.9, 0.0, 0.5, 1.0];
                arcColor = [0.8, 0.0, 0.4, 1.0];
                break;
              default:
                arrowColor = [0.9, 0.0, 0.5, 1.0];
                arcColor = [0.8, 0.0, 0.4, 1.0];
                break;
            }


            var currentTimeShift = (j/(layersCount-1)-1)*(pointFY2-pointFY1)*rayAngleSin;


            var firstArrVec = [];
            var dynamicArr1 = [];
            var isArr;
            var arr1Mode;
            var secondArrVec = [];
            var dynamicArr2 = [];
            var arr2Mode;
            vec3.subtract(pointM, pointF, firstArrVec);
            var firstArrLen = vec3.length(firstArrVec);

            vec3.subtract(pointN, pointM, secondArrVec);
            vec3.normalize(secondArrVec);

            vec3.scale(secondArrVec, timeParam2-currentTimeShift+arrowLength-firstArrLen, pointN);
            vec3.add(pointN, pointM);

            if (isShow[2]) {
                primitives.push({class:"arrow", text: "", arr0:pointF, arr1:pointM, rad:2, color:arrowColor});
                primitives.push({class:"arrow", text: "", arr0:pointM, arr1:pointN, rad:2, color:arrowColor});
            }

            var currentTimeParam = timeParam-currentTimeShift;

            isArr = currentTimeParam > -arrowLength;
            if (isArr) {
                arr1Mode = currentTimeParam < firstArrLen;
                if (currentTimeParam < 0) {
                    vec3.set(pointF, dynamicArr1);
                } else if (arr1Mode) {
                    vec3.scale(firstArrVec, currentTimeParam/firstArrLen, dynamicArr1);
                    vec3.add(dynamicArr1, pointF);
                } else {
                    vec3.scale(secondArrVec, currentTimeParam-firstArrLen, dynamicArr1);
                    vec3.add(dynamicArr1, pointM);
                }
                arr2Mode = currentTimeParam+arrowLength < firstArrLen;
                if (arr2Mode) {
                    vec3.scale(firstArrVec, (currentTimeParam+arrowLength)/firstArrLen, dynamicArr2);
                    vec3.add(dynamicArr2, pointF);
                } else {
                    vec3.scale(secondArrVec, currentTimeParam+arrowLength-firstArrLen, dynamicArr2);
                    vec3.add(dynamicArr2, pointM);
                }
                if (arr1Mode == arr2Mode) {
                    primitives.push({class:"line", text: "", arr0:dynamicArr1, arr1:dynamicArr2, rad:3, color:[0,0,1,1]});
                } else {
                    primitives.push({class:"line", text: "", arr0:dynamicArr1, arr1:pointM, rad:3, color:[0,0,1,1]});
                    primitives.push({class:"line", text: "", arr0:pointM, arr1:dynamicArr2, rad:3, color:[0,0,1,1]});
                }
            }
        }
    }

    // meshArray.push(new Mesh(32, 32));
    // var mesh = meshArray[meshArray.length-1];
    // // var maxPhi = 5;
    // // primitives.push({class:"line", text: "", arr0:[-maxPhi,1,maxPhi*maxPhi/2/parp-mirrorThickness/2], arr1:[-maxPhi-0.5,1.5,maxPhi*maxPhi/2/parp+0.1], rad:1, color:[0.0,0.0,0.0,1.0]});
    // // primitives.push({class:"text", text: "2", pos: "cb", arr0:[-maxPhi-0.5,1.5,maxPhi*maxPhi/2/parp+0.1]});
    // var coneHeight1 = mirrLen1;
    // var coneHeight2 = mirrLen2;
    // for (var i = 0; i <= mesh.slicesPsi; i++) {
    //     var psi = i/mesh.slicesPsi*Math.PI*2;
    //     for (var j = 0; j <= mesh.slicesPhi; j++) {
    //         var phi = j/mesh.slicesPhi;
    //         var px = phi*Math.cos(psi);
    //         var py = phi*Math.sin(psi);
    //         var pz = 2*phi;
    //         mesh.vertices.push( px, py, pz );
    //         mesh.normals.push( 2*Math.cos(psi) );
    //         mesh.normals.push( 2*Math.sin(psi) );
    //         mesh.normals.push( -1 );
    //     }
    // }

    if (isShow[3] && rayAngleTan!=0) {
        var coneRadius = parp/2+2;
        var coneHeight = coneRadius/rayAngleTan;
        var coneVerticesTop = [];
        var coneVerticesBottom = [];


        // j/(layersCount-1)*(pointFY2-pointFY1)+pointFY1;
        // var currentTimeShift = (j/(layersCount-1)-1)*(pointFY2-pointFY1)*rayAngleSin;


        // var currentTimeShift = 0;
        // var currentTimeShift = (pointFY2-pointFY1)*rayAngleSin;
        // var conePosY = pointFY1+timeParam+(pointFY2-pointFY1)*rayAngleSin;

        var conePosY = pointFY2 + (timeParam - timeParam1) / rayAngleSin;

        var conePhi1 = 0;
        var conePhi2 = 1;
        var coneBottom = -mirrLen2-0;
        var coneTop = -mirrLen1+0;

        if (-coneHeight*conePhi2+conePosY < coneBottom) {
            conePhi2 = -(coneBottom-conePosY)/coneHeight;
        }
        if (-coneHeight*conePhi1+conePosY > coneTop) {
            conePhi1 = -(coneTop-conePosY)/coneHeight;
        }

        if (-coneHeight*conePhi2+conePosY < coneTop) {
            for (var i = 0; i <= 16; i++) {
                var psi = i/16*Math.PI*2;
                var px = coneRadius*Math.cos(psi);
                var py = -coneHeight;
                var pz = coneRadius*Math.sin(psi);
                coneVerticesTop.push( [px*conePhi1, py*conePhi1+conePosY, pz*conePhi1+parp/2] );
                coneVerticesBottom.push( [px*conePhi2, py*conePhi2+conePosY, pz*conePhi2+parp/2] );
            }
            for (var i = 0; i < coneVerticesTop.length; i+=2) {
                primitives.push({class:"line", text: "", arr0:coneVerticesTop[i], arr1:coneVerticesBottom[i], rad:1, color:[0.5,0.5,0,1]});
            }
            for (var i = 0; i < coneVerticesTop.length-1; i++) {
                primitives.push({class:"plane", text: "", arr0:coneVerticesTop[i], arr1:coneVerticesBottom[i], arr2:coneVerticesBottom[i+1], arr3:coneVerticesTop[i+1], color:[0.8,0.8,0,0.3]});
            }
        }
    }
    var colorp = [0.9, 0.9, 0.9, 1.0];
    var colorl = [0.0, 0.0, 0.0, 1.0];
    var colorl2 = [0.0, 0.0, 1.0, 1.0];
    for (var k = 0; k < meshArray.length; k++) {
        var mesh = meshArray[k];

        for (var i=0; i < mesh.slicesPsi; i++) {
            for (var j=0; j < mesh.slicesPhi; j++) {
                var aa = [i*(mesh.slicesPhi+1)+j, i*(mesh.slicesPhi+1)+j+1, (i+1)*(mesh.slicesPhi+1)+j+1, (i+1)*(mesh.slicesPhi+1)+j];
                mesh.indices.push(aa[0],aa[1],aa[2],aa[0],aa[2],aa[3]);
            }
        }
        if (!mesh.normals.length) {
            for (var i = 0; i <= mesh.slicesPsi; i++) {
                for (var j = 0; j <= mesh.slicesPhi; j++) {
                    mesh.normals.push( 0.0, 0.0, 1.0 );
                }
            }
        }
        meshes.push({
            vertices:mesh.vertices,
            normals:mesh.normals,
            indices:mesh.indices,
            rotateX:90,
            color:colorp,
            reinit:true
        });
        // for (var i=0; i < mesh.slicesPsi; i++) {
        //     for (var j=0; j < mesh.slicesPhi; j++) {
        //         var aa = [i*(mesh.slicesPhi+1)+j, i*(mesh.slicesPhi+1)+j+1, (i+1)*(mesh.slicesPhi+1)+j+1, (i+1)*(mesh.slicesPhi+1)+j];

        //         if (mesh.crossSectionType<=0) {
        //             if (j==mesh.slicesPhi-1) {
        //                 primitives.push({class:"line", text: "", arr0:[mesh.vertices[aa[1]*3],mesh.vertices[aa[1]*3+1],mesh.vertices[aa[1]*3+2]], arr1:[mesh.vertices[aa[2]*3],mesh.vertices[aa[2]*3+1],mesh.vertices[aa[2]*3+2]], rad:1, color:colorl});
        //             }
        //             var lineRad, lineColor;
        //             if (mesh.crossSectionType==0) {
        //                 lineRad = 2;
        //                 lineColor = colorl2;
        //             } else {
        //                 lineRad = 1;
        //                 lineColor = colorl;
        //             }
        //             if (i==0) {
        //                 primitives.push({class:"line", text: "", arr0:[mesh.vertices[aa[0]*3],mesh.vertices[aa[0]*3+1],mesh.vertices[aa[0]*3+2]], arr1:[mesh.vertices[aa[1]*3],mesh.vertices[aa[1]*3+1],mesh.vertices[aa[1]*3+2]], rad:lineRad, color:lineColor});
        //             }
        //             if (i==mesh.slicesPsi-1) {
        //                 primitives.push({class:"line", text: "", arr0:[mesh.vertices[aa[2]*3],mesh.vertices[aa[2]*3+1],mesh.vertices[aa[2]*3+2]], arr1:[mesh.vertices[aa[3]*3],mesh.vertices[aa[3]*3+1],mesh.vertices[aa[3]*3+2]], rad:lineRad, color:lineColor});
        //             }
        //         }
        //     }
        // }
    }
}
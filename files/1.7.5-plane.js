var dimention="3d";
function initPoints() {
    points = [];
}
var meshPlane = {};
function initDescr() {
    rotAngY = -5.0;
    rotAngX = 15.0;
    rotAngZ = 0.0;
    scaleFactor = 0.06;
    var descr = '';
    descr += '<p>Продольное равновесие салолёта.</p>';
    descr += '<p>Для компенсации пикирующего момента самолёта горизонтальное (хвостовое) оперение устанавливают таким образом, чтобы оно создавало подъёмную силу $\\vec Y_{ГО}$ направленную вниз.</br>';
    descr += 'Момент этой силы $$\\vec M_{z,ГО}=\\left[\\vec r_{ГО},\\vec Y_{ГО}\\right],$$ уравновешивает пикирующий момент $$\\vec M_{z}=\\left[\\vec r_a,\\vec Y_a\\right]$$ т.е. выполняет условие  $$\\vec M_{z}+\\vec M_{z,ГО}=0$$</br>';
    descr += 'Используя формулу для векторного произведения, получаем условие продольного равновесия самолёта $$Y_ax_a=Y_{ГО}x_{ГО}$$</p>';

    $("#description").html(descr);
    $("Title").html("Технические примеры");
    $("#containerGreen").append('<div id="controls">\
                                 <b>Угол атаки:</b></br>\
                                 <input type="button" value="-" onclick="rotatePlane(-1);">\
                                 <input id="angle" type="text" size=2 readonly">\
                                 <input type="button" value="+" onclick="rotatePlane(1);">\
                                 </div>');

    loadSTL("boying.stl", meshPlane);
}
var minRotAng = -30;
var maxRotAng = 30;
function rotatePlane(c) {
    var newrotAngZ = rotAngZ+c*5.0;
    if (newrotAngZ>=minRotAng && newrotAngZ<=maxRotAng) {
        rotAngZ = newrotAngZ;
    }
    initBuffers();
}
function pushAxesPrimitives(center,arrowX1,arrowX2,arrowY1,arrowY2,arrowZ1,arrowZ2)
{
    var AxesColor = [0.2, 0.2, 0.2, 1.0];
    var axesRad = 1;
    primitives.push({class:"text", text: "O", arr0:center});
    primitives.push({class:"text", text: "X", arr0:arrowX2});
    primitives.push({class:"arrow", text: "", offset: true, arr0:arrowX1, arr1:arrowX2, rad:axesRad, color:AxesColor});
    for (var i = -5; i <= 4; i++) {
        if (i!=0) {
            var dash1 = [center[0]+i*10.0,center[1]-axesRad*5,center[2]];
            var dash2 = [center[0]+i*10.0,center[1]+axesRad*5,center[2]];
            primitives.push({class:"dash", text: "", offset: true, arr0:dash1, arr1:dash2, rad:axesRad, color:AxesColor});
        }
    }
    primitives.push({class:"text", text: "Y", arr0:arrowY2});
    primitives.push({class:"arrow", text: "", offset: true, arr0:arrowY1, arr1:arrowY2, rad:axesRad, color:AxesColor});
    for (var i = -4; i <= 3; i++) {
        if (i!=0) {
            var dash1 = [center[0]-axesRad*5,center[1]+i*10.0,center[2]];
            var dash2 = [center[0]+axesRad*5,center[1]+i*10.0,center[2]];
            primitives.push({class:"dash", text: "", offset: true, arr0:dash1, arr1:dash2, rad:axesRad, color:AxesColor});
        }
    }
    primitives.push({class:"text", text: "Z", arr0:arrowZ2});
    primitives.push({class:"arrow", text: "", offset: true, arr0:arrowZ1, arr1:arrowZ2, rad:axesRad, color:AxesColor});
    for (var i = -5; i <= 4; i++) {
        if (i!=0) {
            var dash1 = [center[0]-axesRad*5,center[1],center[2]+i*10.0];
            var dash2 = [center[0]+axesRad*5,center[1],center[2]+i*10.0];
            primitives.push({class:"dash", text: "", offset: true, arr0:dash1, arr1:dash2, rad:axesRad, color:AxesColor});
        }
    }
}
var lenP = 250;
var VX = 150;
var VY = -50;
var VZ = 0;
var power = 0;
function initData() {
    isOrtho = false;
    isShowAxes = false;

    $("#angle").val(rotAngZ);
    var center = [6,35.7716,19.4469];
    vec3.set(vec3.scale(center,-1,[]), centerTranslate);
    var arrowX0 = [50.0,0.0,0.0];
    var arrowY0 = [0.0,40.0,0.0];
    var arrowZ0 = [0.0,0.0,50.0];
    var arrowX1 = [];
    var arrowY1 = [];
    var arrowZ1 = [];
    var arrowX2 = [];
    var arrowY2 = [];
    var arrowZ2 = [];

    vec3.subtract(center,arrowX0,arrowX1);
    vec3.subtract(center,arrowY0,arrowY1);
    vec3.subtract(center,arrowZ0,arrowZ1);
    vec3.add(center,arrowX0,arrowX2);
    vec3.add(center,arrowY0,arrowY2);
    vec3.add(center,arrowZ0,arrowZ2);

    var vectorR0 = [0.0, 20.0, 0.0];
    var vectorR = [];
    var centerPressure = [];
    vec3.add(center,[-8,-2,0],centerPressure);
    vec3.add(vectorR0,centerPressure,vectorR);

    var centerTail = [];
    vec3.add(center,[-50,6,0],centerTail);
    var vectorYTail0 = [0.0, -4.0, 0.0];
    var vectorYTail = [];
    vec3.add(vectorYTail0,centerTail,vectorYTail);

    var vectorG0 = [0.0, -20.0, 0.0];
    var vectorAngG0 = [];
    var angle = rotAngZ/180.0*Math.PI;
    vectorAngG0[0] = vectorG0[1]*Math.sin(angle);
    vectorAngG0[1] = vectorG0[1]*Math.cos(angle);
    vectorAngG0[2] = vectorG0[2];
    var vectorG = [];
    vec3.add(vectorAngG0,center,vectorG);

    var RRad = 2;
    var projRad = 2;

    pushAxesPrimitives(center,arrowX1,arrowX2,arrowY1,arrowY2,arrowZ1,arrowZ2);

    var RColor = [0.8, 0.2, 0.8, 1.0];
    var RXColor = [1.0, 0.2, 0.2, 1.0];
    var RYColor = [0.2, 1.0, 0.2, 1.0];
    var RZColor = [0.2, 0.2, 1.0, 1.0];
    var GColor = [0.8, 0.8, 0.2, 1.0];
    primitives.push({class:"point", text: "", offset: true, arr0:centerTail, rad:RRad*2, color:RColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec r_\\text{ГО}"), offset: true, arr0:center, arr1:centerTail, rad:RRad, color:RZColor});

    primitives.push({class:"arrow", text: katex.renderToString("\\vec Y_\\text{ГО}"), offset: true, arr0:centerTail, arr1:vectorYTail, rad:RRad, color:RColor});

    primitives.push({class:"point", text: "", offset: true, arr0:centerPressure, rad:RRad*2, color:RColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec Y_a"), offset: true, arr0:centerPressure, arr1:vectorR, rad:RRad, color:RColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec G"), offset: true, arr0:center, arr1:vectorG, rad:RRad, color:GColor});

    primitives.push({class:"arrow", text: katex.renderToString("\\vec r_a"), offset: true, arr0:center, arr1:centerPressure, rad:RRad, color:RZColor});

    var arcArrow1 = [0.0,10.0,0.0];
    var arcArrow2 = [0.0,-10.0,0.0];
    vec3.add(arcArrow1,arrowX2);
    vec3.add(arcArrow2,arrowX2);
    var arcRad = 60;
    primitives.push({class:"arc", text: "", offset: true, arr0:center, arr1:arcArrow1, arr2:arcArrow2, Rad:arcRad, rad:RRad, color:RXColor});
    var arcArrow10 = [];
    var arcArrow20 = [];
    vec3.subtract(arcArrow1,center,arcArrow10);
    vec3.subtract(arcArrow2,center,arcArrow20);
    vec3.normalize(arcArrow10);
    vec3.normalize(arcArrow20);
    vec3.scale(arcArrow10,arcRad);
    vec3.scale(arcArrow20,arcRad);
    var norm = [];
    vec3.cross(arcArrow10,arcArrow20,norm);
    var vecarr20 = [];
    vec3.cross(norm,arcArrow20,vecarr20);
    vec3.normalize(vecarr20);
    vec3.scale(vecarr20,0.2);
    vec3.add(arcArrow10,center);
    vec3.add(arcArrow20,center);
    vec3.add(vecarr20,arcArrow20);
    primitives.push({class:"cone", text: "", offset: true, arr0:arcArrow20, arr1:vecarr20, rad:RRad, color:RXColor});
    primitives.push({class:"text", text: katex.renderToString("\\vec M_z"), arr0:arcArrow20});

    var arcArrow1 = [0.0,10.0,0.0];
    var arcArrow2 = [0.0,-10.0,0.0];
    vec3.add(arcArrow1,arrowX1);
    vec3.add(arcArrow2,arrowX1);
    var arcRad = 60;
    primitives.push({class:"arc", text: "", offset: true, arr0:center, arr1:arcArrow1, arr2:arcArrow2, Rad:arcRad, rad:RRad, color:RYColor});
    var arcArrow10 = [];
    var arcArrow20 = [];
    vec3.subtract(arcArrow1,center,arcArrow10);
    vec3.subtract(arcArrow2,center,arcArrow20);
    vec3.normalize(arcArrow10);
    vec3.normalize(arcArrow20);
    vec3.scale(arcArrow10,arcRad);
    vec3.scale(arcArrow20,arcRad);
    var norm = [];
    vec3.cross(arcArrow10,arcArrow20,norm);
    var vecarr20 = [];
    vec3.cross(norm,arcArrow20,vecarr20);
    vec3.normalize(vecarr20);
    vec3.scale(vecarr20,0.2);
    vec3.add(arcArrow10,center);
    vec3.add(arcArrow20,center);
    vec3.add(vecarr20,arcArrow20);
    primitives.push({class:"cone", text: "", offset: true, arr0:arcArrow20, arr1:vecarr20, rad:RRad, color:RYColor});
    primitives.push({class:"text", text: katex.renderToString("\\vec M_{z,\\text{ГО}}"), arr0:arcArrow20});

    if (meshPlane.isready)
    {
        let vertexCoords = meshPlane.vertexCoords;
        let normalCoords = meshPlane.normalCoords;
        let vertexIndices = meshPlane.vertexIndices;

        meshes.push({
            vertices:vertexCoords,
            normals:normalCoords,
            indices:vertexIndices,
            color:[0.8,0.8,0.8,1.0]
        });
    }
}
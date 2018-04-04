var dimention="3d";
function initPoints() {
    points = [];
}
var meshPlane = {};
function initDescr() {
    var descr = '$\\vec R$ - вектор <i>полной аэродинамической силы</i> (силы сопротивления), действующей со стороны воздуха на ЛА.</br>';
    descr += 'т $O\'$ - центр давления, точка начала вектора $\\vec R$</br>';
    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(0,this.checked)"> \
               $\\alpha\\vec R$ - произведение вектора $\\vec R$ на число $\\alpha$.</label>';

    $("#description").html(descr);
    $("Title").html("Технические примеры");

    loadSTL("boying.stl", meshPlane);
    rotAngY = 325.0;
    rotAngX = 15.0;
    scaleFactor = 0.06;
}
var showOXYZ = [true,true,true];
function changeOXYZ(n,checked) {
    showOXYZ[n] = checked;
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
function initData() {
    isOrtho = false;
    isShowAxes = false;

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

    var vectorR0 = [-10.0, 10.0, 5.0];
    var vectorR = [];
    var vectorAR0 = [];
    var vectorAR = [];
    var centerPressure = [];
    vec3.add(center,[-10,5,3],centerPressure);

    vec3.add(vectorR0,centerPressure,vectorR);

    var A = 3;
    vec3.scale(vectorR0, A, vectorAR0);

    vec3.add(vectorR0,centerPressure,vectorR);
    vec3.add(vectorAR0,centerPressure,vectorAR);

    pushAxesPrimitives(center,arrowX1,arrowX2,arrowY1,arrowY2,arrowZ1,arrowZ2);
    var RRad = 2;
    var projRad = 2;
    var RColor = [0.8, 0.2, 0.8, 1.0];
    var RYColor = [0.2, 1.0, 0.2, 1.0];
    var ARColor = [0.6, 0.0, 1.0, 1.0];
    var ARYColor = [0.0, 0.8, 0.8, 1.0];
    primitives.push({class:"point", text: "O\u02B9", offset: true, arr0:centerPressure, rad:RRad*2, color:RColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec R"), offset: true, arr0:centerPressure, arr1:vectorR, rad:RRad*1.1, color:RColor});

    if (showOXYZ[0]) {
        primitives.push({class:"arrow", text: katex.renderToString("\\alpha\\vec R"), offset: true, arr0:centerPressure, arr1:vectorAR, rad:RRad, color:ARColor});
        primitives.push({class:"dashline", text: "", offset: true, arr0:vectorAR, arr1:[center[0],vectorAR[1],center[2]], rad:1, color:ARYColor});
        primitives.push({class:"arrow", text: katex.renderToString("\\alpha\\vec Y"), offset: true, arr0:[center[0],centerPressure[1],center[2]], arr1:[center[0],vectorAR[1],center[2]], rad:projRad, color:ARYColor});
    }
    primitives.push({class:"arrow", text: katex.renderToString("\\vec Y"), offset: true, arr0:[center[0],centerPressure[1],center[2]], arr1:[center[0],vectorR[1],center[2]], rad:projRad*1.1, color:RYColor});
    primitives.push({class:"dashline", text: "", offset: true, arr0:centerPressure, arr1:[center[0],centerPressure[1],center[2]], rad:1, color:RYColor});
    primitives.push({class:"dashline", text: "", offset: true, arr0:vectorR, arr1:[center[0],vectorR[1],center[2]], rad:1, color:RYColor});

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
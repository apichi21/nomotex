var dimention="3d";
function initPoints() {
    points = [];
}
var meshPlane = {};
function initDescr() {
    var descr = '$\\vec R$ - вектор <i>полной аэродинамической силы</i> (силы сопротивления), действующей со стороны воздуха на ЛА.</br>';
    descr += 'т $O\'$ - центр давления, точка начала вектора $\\vec R$</br>';
    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(1,this.checked)"> $\\vec Y = \\vec{O_2A_2}$ - проекция вектора $\\vec R$ на ось OY - это <i>подъёмная сила</i>.</label>';
    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(0,this.checked)"> $\\vec X = \\vec{O_1A_1}$ - проекция вектора $\\vec R$ на ось OX - это <i>сила лобового сопротивления</i>.</label>';
    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(2,this.checked)"> $\\vec Z = \\vec{O_3A_3}$ - проекция вектора $\\vec R$ на ось OZ - это <i>сила бокового сопротивления</i>.</label>';

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

    var vectorR0 = [-20.0, 20.0, 10.0];
    var vectorR = [];
    var centerPressure = [];
    vec3.add(center,[-10,5,3],centerPressure);

    vec3.add(vectorR0,centerPressure,vectorR);

    var RRad = 2;
    var projRad = 2;

    pushAxesPrimitives(center,arrowX1,arrowX2,arrowY1,arrowY2,arrowZ1,arrowZ2);
    var RColor = [0.8, 0.2, 0.8, 1.0];
    var RXColor = [1.0, 0.2, 0.2, 1.0];
    var RYColor = [0.2, 1.0, 0.2, 1.0];
    var RZColor = [0.2, 0.2, 1.0, 1.0];
    primitives.push({class:"point", text: "O\u02B9", offset: true, arr0:centerPressure, rad:RRad*2, color:RColor});
    primitives.push({class:"text", text: "A", arr0:vectorR});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec R"), offset: true, arr0:centerPressure, arr1:vectorR, rad:RRad, color:RColor});

    if (showOXYZ[0]) {
        primitives.push({class:"point", text: "O\u2081", offset: true, arr0:[centerPressure[0],center[1],center[2]], rad:projRad, color:RXColor});
        primitives.push({class:"arrow", text: katex.renderToString("\\vec X"), offset: true, arr0:[centerPressure[0],center[1],center[2]], arr1:[vectorR[0],center[1],center[2]], rad:projRad, color:RXColor});
        primitives.push({class:"text", text: "A\u2081", arr0:[vectorR[0],center[1],center[2]]});
        primitives.push({class:"dashline", text: "", offset: true, arr0:vectorR, arr1:[vectorR[0],center[1],center[2]], rad:1, color:RXColor});
        primitives.push({class:"dashline", text: "", offset: true, arr0:centerPressure, arr1:[centerPressure[0],center[1],center[2]], rad:1, color:RXColor});
    }
    if (showOXYZ[1]) {
        primitives.push({class:"point", text: "O\u2082", offset: true, arr0:[center[0],centerPressure[1],center[2]], rad:projRad, color:RYColor});
        primitives.push({class:"arrow", text: katex.renderToString("\\vec Y"), offset: true, arr0:[center[0],centerPressure[1],center[2]], arr1:[center[0],vectorR[1],center[2]], rad:projRad, color:RYColor});
        primitives.push({class:"text", text: "A\u2082", arr0:[center[0],vectorR[1],center[2]]});
        primitives.push({class:"dashline", text: "", offset: true, arr0:vectorR, arr1:[center[0],vectorR[1],center[2]], rad:1, color:RYColor});
        primitives.push({class:"dashline", text: "", offset: true, arr0:centerPressure, arr1:[center[0],centerPressure[1],center[2]], rad:1, color:RYColor});
    }
    if (showOXYZ[2]) {
        primitives.push({class:"point", text: "O\u2083", offset: true, arr0:[center[0],center[1],centerPressure[2]], rad:projRad, color:RZColor});
        primitives.push({class:"arrow", text: katex.renderToString("\\vec Z"), offset: true, arr0:[center[0],center[1],centerPressure[2]], arr1:[center[0],center[1],vectorR[2]], rad:projRad, color:RZColor});
        primitives.push({class:"text", text: "A\u2083", arr0:[center[0],center[1],vectorR[2]]});
        primitives.push({class:"dashline", text: "", offset: true, arr0:vectorR, arr1:[center[0],center[1],vectorR[2]], rad:1, color:RZColor});
        primitives.push({class:"dashline", text: "", offset: true, arr0:centerPressure, arr1:[center[0],center[1],centerPressure[2]], rad:1, color:RZColor});
    }

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
var dimention="3d";
function initPoints() {
    points = [];
}
var meshPlane = {};
function initDescr() {
    var descr = '$\\vec R$ - вектор полной аэродинамической силы (силы сопротивления), действующей со стороны воздуха на ЛА.</br>';
    descr += 'т $O\'$ - центр давления, точка начала вектора $\\vec R$</br>';
    descr += '$\\vec G = -m\\vec g$ - вектор силы тяжести (направлена по вертикали к поверхности земли).</br>';
    descr += '$|\\vec{G}|\\cos\\alpha$ - проекция вектора $\\vec G$ на ось OY. $|\\vec{G}| = mg$</br>';
    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(1,this.checked)"> $|\\vec Y|-mg\\cos\\alpha$ - результирующая проекция сил $\\vec R$ и $\\vec G$ на ось OY.</label>';
    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(0,this.checked)"> $|\\vec X|+mg\\sin\\alpha$ - результирующая проекция сил $\\vec R$ и $\\vec G$ на ось OX.</label>';

    $("#description").html(descr);
    $("Title").html("Технические примеры");

    loadSTL("boying.stl", meshPlane);
    rotAngY = 325.0;
    rotAngX = 15.0;
    rotAngZ = 15.0;
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

    var vectorR0 = [-20.0, 25.0, 0.0];
    var vectorR = [];
    var vectorR1 = [];
    var centerPressure = [];
    vec3.add(center,[-10,5,0],centerPressure);

    vec3.add(vectorR0,centerPressure,vectorR);
    vec3.add(vectorR0,center,vectorR1);

    var vectorG0 = [0.0, -20.0, 0.0];
    var vectorAngG0 = [];
    var vectorG = [];
    var angle = rotAngZ/180.0*Math.PI;
    vectorAngG0[0] = vectorG0[1]*Math.sin(angle);
    vectorAngG0[1] = vectorG0[1]*Math.cos(angle);
    vectorAngG0[2] = vectorG0[2];
    vec3.add(vectorAngG0,center,vectorG);

    var sumRG0 = [];
    var sumRG = [];
    vec3.add(vectorR0,vectorAngG0,sumRG0);
    vec3.add(sumRG0,center,sumRG);

    var RRad = 3;
    var projRad = 2;
    var angRad = 1.5;
    var GRad = 3;

    pushAxesPrimitives(center,arrowX1,arrowX2,arrowY1,arrowY2,arrowZ1,arrowZ2);

    var RColor = [0.8, 0.2, 0.8, 1.0];
    primitives.push({class:"point", text: "O\u02B9", offset: true, arr0:centerPressure, rad:RRad*2, color:RColor});
    primitives.push({class:"text", text: "A", arr0:vectorR});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec R"), offset: true, arr0:centerPressure, arr1:vectorR, rad:RRad, color:RColor});

    var GColor = [0.8, 0.8, 0.2, 1.0];
    var GYColor = [0.6, 1.0, 0.0, 1.0];
    var GXColor =  [1.0, 0.6, 0.0, 1.0];
    var angColor = [0.0, 1.0, 0.0, 1.0];
    var RXColor = [1.0, 0.2, 0.2, 1.0];
    var RYColor = [0.2, 1.0, 0.2, 1.0];
    var RZColor = [0.2, 0.2, 1.0, 1.0];

    primitives.push({class:"arrow", text: katex.renderToString("\\vec G"), ratio: 1, offset: true, arr0:center, arr1:vectorG, rad:GRad, color:GColor});
    primitives.push({class:"arc", text: katex.renderToString("\\alpha"), offset: true, arr0:center, arr1:vectorG, arr2:arrowY1, Rad:15, rad:angRad, color:angColor});

    if (showOXYZ[0]) {
        primitives.push({class:"dashline", text: "", offset: true, arr0:vectorG, arr1:[vectorG[0],arrowX1[1],arrowX1[2]], rad:1, color:GXColor});
        primitives.push({class:"arrow", text: katex.renderToString("|\\vec{G}|\\sin\\alpha"), ratio: 1, offset: true, arr0:center, arr1:[vectorG[0],arrowX1[1],arrowX1[2]], rad:projRad, color:GXColor});
        primitives.push({class:"arrow", text: katex.renderToString("\\vec X"), offset: true, arr0:[centerPressure[0],center[1],center[2]], arr1:[vectorR[0],center[1],center[2]], rad:projRad, color:RXColor});
        primitives.push({class:"dashline", text: "", offset: true, arr0:vectorR, arr1:[vectorR[0],center[1],center[2]], rad:1, color:RXColor});
        primitives.push({class:"dashline", text: "", offset: true, arr0:centerPressure, arr1:[centerPressure[0],center[1],center[2]], rad:1, color:RXColor});
    }
    if (showOXYZ[1]) {
        primitives.push({class:"arrow", text: katex.renderToString("|\\vec{G}|\\cos\\alpha"), ratio: 1, offset: true, arr0:center, arr1:[arrowY1[0],vectorG[1],arrowY1[2]], rad:projRad, color:GYColor});
        primitives.push({class:"dashline", text: "", offset: true, arr0:vectorG, arr1:[arrowY1[0],vectorG[1],arrowY1[2]], rad:1, color:GYColor});
        primitives.push({class:"arrow", text: katex.renderToString("\\vec Y"), offset: true, arr0:[center[0],centerPressure[1],center[2]], arr1:[center[0],vectorR[1],center[2]], rad:projRad, color:RYColor});
        primitives.push({class:"dashline", text: "", offset: true, arr0:vectorR, arr1:[center[0],vectorR[1],center[2]], rad:1, color:RYColor});
        primitives.push({class:"dashline", text: "", offset: true, arr0:centerPressure, arr1:[center[0],centerPressure[1],center[2]], rad:1, color:RYColor});
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
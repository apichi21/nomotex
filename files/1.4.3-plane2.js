var dimention="3d";
function initPoints() {
    points = [];
}
var meshPlane = {};
function initDescr() {
    var descr = 'Горизонтальный полёт ЛА в одной плоскости с постоянной скоростью.</br>';
    descr += 'Система векторов $\\vec P$, $\\vec X$ - линейно зависимая, $\\vec P+\\vec X=0$,</br>';
    descr += 'cистема векторов $\\vec Y$, $\\vec G$ - линейно зависимая, $\\vec Y+\\vec G=0$,</br>';
    // descr += 'тогда '+katex.renderToString("\\left \\{ \\begin{array}{l}item11\\\\item21\\\\\\end{array}")+'</br>';
    descr += 'тогда $\\left \\{ \\begin{array}{l}\\vec P=c_xqS \\\\c_yqS=mg\\end{array} \\right.$</br>';
    descr += 'Отсюда, исключая $qS$, получаем $P=\\frac{c_xmg}{c_y}$, или</br>';
    descr += '$P=\\frac{G}{K}$ - <i>потребная тяга</i>, для обеспечения горизонтального полёта, где</br>';
    descr += '$G=mg$</br>';
    descr += '$K=\\frac{c_y}{c_x}$ - аэродинамическое качество ЛА.</br>';

    $("#description").html(descr);
    $("Title").html("Технические примеры");

    loadSTL("boying.stl", meshPlane);
    rotAngY = 325.0;
    rotAngX = 15.0;
    scaleFactor = 0.06;
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

    var vectorR0 = [-30.0, 30.0, 10.0];
    var vectorP0 = [30.0, 0.0, 0.0];
    var vectorG0 = [0.0, -30.0, 0.0];
    var vectorR = [];
    var vectorP = [];
    var vectorG = [];

    vec3.add(vectorR0,center,vectorR);
    vec3.add(vectorP0,center,vectorP);
    vec3.add(vectorG0,center,vectorG);

    var RRad = 2;
    var projRad = 2;

    pushAxesPrimitives(center,arrowX1,arrowX2,arrowY1,arrowY2,arrowZ1,arrowZ2);

    var RColor = [0.8, 0.2, 0.8, 1.0];
    var RXColor = [1.0, 0.2, 0.2, 1.0];
    var RYColor = [0.2, 1.0, 0.2, 1.0];
    var RZColor = [0.2, 0.2, 1.0, 1.0];
    var GColor = [0.8, 0.8, 0.2, 1.0];
    primitives.push({class:"arrow", text: katex.renderToString("\\vec P"), offset: true, arr0:center, arr1:vectorP, rad:RRad, color:[1.0, 0.6, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec G"), offset: true, arr0:center, arr1:vectorG, rad:RRad, color:GColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec X"), offset: true, arr0:center, arr1:[vectorR[0],center[1],center[2]], rad:projRad, color:RXColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec Y"), offset: true, arr0:center, arr1:[center[0],vectorR[1],center[2]], rad:projRad, color:RYColor});

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
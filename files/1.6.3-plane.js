var dimention="3d";
function initPoints() {
    points = [];
}
var meshPlane = {};
function initDescr() {
    rotAngY = 325.0;
    rotAngX = 15.0;
    rotAngZ = 15.0;
    scaleFactor = 0.06;
    var descr = '<p>Вычисление мощности $W$ ЛА через компоненты векторов тяги $\\vec P$ и скорости $\\vec v$ в связанной СК $\\vec x,\\vec y,\\vec z$</p>';
    descr += '$|\\vec P|$ = <input type="text" size=3 value='+lenP+' onchange="{lenP=parseFloat(this.value);initBuffers();}">, кН</br>';
    descr += '$|\\vec v|$ = <input type="text" size=3 value='+VX+' onchange="{VX=parseFloat(this.value);initBuffers();}"><input type="text" size=3 value='+VY+' onchange="{VY=parseFloat(this.value);initBuffers();}"><input type="text" size=3 value='+VZ+' onchange="{VZ=parseFloat(this.value);initBuffers();}">, м/с</br>';
    descr += '$W$ = <input type="text" size=5 value='+power+' readonly id="power">, МВт</br>';

    $("#description").html(descr);
    $("Title").html("Технические примеры");

    loadSTL("boying.stl", meshPlane);
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

    var vectorP0 = [lenP/10, 0.0, 0.0];
    var vectorV0 = [VX/10, VY/10, VZ/10];

    power = vec3.dot(vectorP0,vectorV0)/10;
    $("#power").val(power.toFixed(0));

    var lineW = [];
    var lenV = vec3.length(vectorV0)*10;
    vec3.scale(vectorV0,10/lenV*power/5,lineW);

    var vectorP = [];
    var vectorV = [];

    vec3.add(vectorP0,center,vectorP);
    vec3.add(vectorV0,center,vectorV);
    vec3.add(lineW,center);

    var RRad = 2;
    var RRad1 = 2;
    if (power < lenV/2) RRad1 = 2.1;
    else RRad1 = 1.9;

    pushAxesPrimitives(center,arrowX1,arrowX2,arrowY1,arrowY2,arrowZ1,arrowZ2);
    var vecX = [center[0]+10,center[1],center[2]];
    var vecY = [center[0],center[1]+10,center[2]];
    var vecZ = [center[0],center[1],center[2]+10];

    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecX, rad:RRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecY, rad:RRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecZ, rad:RRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"text", text: katex.renderToString("\\vec x"), arr0:vecX});
    primitives.push({class:"text", text: katex.renderToString("\\vec y"), arr0:vecY});
    primitives.push({class:"text", text: katex.renderToString("\\vec z"), arr0:vecZ});
    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vectorP, rad:RRad, color:[1.0, 0.6, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vectorV, rad:RRad, color:[0.0, 0.5, 1.0, 1.0]});
    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:[vectorV[0],center[1],center[2]], rad:RRad, color:[0.0, 0.5, 1.0, 1.0]});
    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:[center[0],vectorV[1],center[2]], rad:RRad, color:[0.0, 0.5, 1.0, 1.0]});
    primitives.push({class:"text", text: katex.renderToString("v_x"), arr0:[vectorV[0],center[1],center[2]]});
    primitives.push({class:"text", text: katex.renderToString("v_y"), arr0:[center[0],vectorV[1],center[2]]});
    primitives.push({class:"text", text: katex.renderToString("\\vec P"), arr0:vectorP});
    primitives.push({class:"text", text: katex.renderToString("\\vec v"), arr0:vectorV});
    primitives.push({class:"line", text: "", offset: true, arr0:center, arr1:lineW, rad:RRad1, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("W"), offset: true, arr0:lineW, rad:RRad*3, color:[1.0, 0.0, 0.0, 1.0]});

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
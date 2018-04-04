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
    var descr = 'Скалярное произведение вектора тяги $\\vec P$ на вектор скорости $\\vec v$ ЛА образует <i>мощность</i> $W$ ЛА</br>';
    descr += '$W=|\\vec P||\\vec v|\\cos\\alpha$, где $\\alpha$ - угол атаки</br></br>';
    descr += '$|\\vec P|$ = <input type="text" size=3 value='+lenP+' onchange="{lenP=parseFloat(this.value);initBuffers();}">, кН</br>';
    descr += '$|\\vec v|$ = <input type="text" size=3 value='+lenV+' onchange="{lenV=parseFloat(this.value);initBuffers();}">, м/с</br>';
    descr += '$\\alpha$ = <input type="text" size=3 value='+rotAngZ+' onchange="{rotAngZ=parseFloat(this.value);initBuffers();}"></br></br>';
    descr += '$W$ = <input type="text" size=5 value='+power+' readonly id="power">, МВт</br>';
    descr += '$1\\ \\text{лошадиная сила} \\approx 736\\ \\text{Вт}$</br></br>';
    descr += 'Примеры:</br>';
    descr += '<table border="1" style="text-align: center">';
    descr += '<tr>';
    descr += '<td>'+''+'</td>';
    descr += '<td>$|\\vec P|$, кН</td>';
    descr += '<td>$|\\vec v_{max}|$, м/с</td>';
    descr += '<td>$W$, МВт</td>';
    descr += '</tr>';
    descr += '<tr>';
    descr += '<td>Boeing 747-400</td>';
    descr += '<td>$4 \\cdot 280$</td>';
    descr += '<td>$275$</td>';
    descr += '<td>$308$</td>';
    descr += '</tr>';
    descr += '<tr>';
    descr += '<td>МиГ-29</td>';
    descr += '<td>$2 \\cdot 50$</td>';
    descr += '<td>$700$</td>';
    descr += '<td>$70$</td>';
    descr += '</tr>';
    descr += '<tr>';
    descr += '<td>A320</td>';
    descr += '<td>$2 \\cdot 120$</td>';
    descr += '<td>$240$</td>';
    descr += '<td>$58$</td>';
    descr += '</tr>';
    descr += '</table>';
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
var lenV = 300;
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
    var vectorV0 = [lenV/10, 0.0, 0.0];

    var rotmat = mat4.create();
    mat4.identity(rotmat);
    mat4.rotateZ(rotmat,-degToRad(rotAngZ));
    mat4.multiplyVec3(rotmat,vectorV0,vectorV0);

    power = vec3.dot(vectorP0,vectorV0)/10;
    $("#power").val(power.toFixed(0));

    var lineW = [];
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

    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vectorP, rad:RRad, color:[1.0, 0.6, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vectorV, rad:RRad, color:[0.0, 0.5, 1.0, 1.0]});
    primitives.push({class:"text", text: katex.renderToString("\\vec P"), arr0:vectorP});
    primitives.push({class:"text", text: katex.renderToString("\\vec v"), arr0:vectorV});
    primitives.push({class:"line", text: "", offset: true, arr0:center, arr1:lineW, rad:RRad1, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("W"), offset: true, arr0:lineW, rad:RRad*3, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arc", text: katex.renderToString("\\alpha"), offset: true, arr0:center, arr1:vectorP, arr2:vectorV, Rad:10, rad:RRad, color:[0.0, 1.0, 0.0, 1.0]});

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
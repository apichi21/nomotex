var dimention="3d";
function initPoints() {
    points = [];
}
var meshPlane = {};
function initDescr() {
    var descr = 'Силы, действующие на ЛА:</br>';
    descr += ' - $\\vec P$ - сила тяги</br>';
    descr += ' - $\\vec G$ - сила тяжести</br>';
    descr += ' - $\\vec R_\\text{а}$ - сила аэродинамического сопротивления</br>';
    descr += ' - $\\vec F_\\text{упр}$ - управляющая сила.</br>';
    descr += 'Вектор суммарных сил, действующих на ЛА $\\vec F$ есть линейная комбинация сил.</br></br>';
    descr += '$\\vec F=a_1\\vec P+a_2\\vec G+a_3\\vec R_\\text{а}+a_4\\vec F_\\text{упр}$</br>';
    descr += '$a_1, a_2, a_3, a_4$ - масштабные коэффициенты</br></br>';
    descr += '<table style="text-align: center">';
    descr += '<tr>';
    descr += '<td>$a_1$</td>';
    descr += '<td>$a_2$</td>';
    descr += '<td>$a_3$</td>';
    descr += '<td>$a_4$</td>';
    descr += '</tr>';
    descr += '<tr>';
    descr += '<td><input type="text" size=3 value='+a[0]+' onchange="{a[0]=parseFloat(this.value);initBuffers();}"></td>';
    descr += '<td><input type="text" size=3 value='+a[1]+' onchange="{a[1]=parseFloat(this.value);initBuffers();}"></td>';
    descr += '<td><input type="text" size=3 value='+a[2]+' onchange="{a[2]=parseFloat(this.value);initBuffers();}"></td>';
    descr += '<td><input type="text" size=3 value='+a[3]+' onchange="{a[3]=parseFloat(this.value);initBuffers();}"></td>';
    descr += '</tr>';
    descr += '</table>';

    $("#description").html(descr);
    $("Title").html("Технические примеры");

    loadSTL("boying.stl", meshPlane);
    rotAngY = 325.0;
    rotAngX = 15.0;
    rotAngZ = 15.0;
    scaleFactor = 0.06;
}
var showOXYZ = [true,true,true];
var a = [1,1,1,1];
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

    var vectorP0 = [40.0, 0.0, 0.0];
    var vectorG0 = [0.0, -40.0, 0.0];
    var vectorAngG0 = [];
    var angle = rotAngZ/180.0*Math.PI;
    vectorAngG0[0] = vectorG0[1]*Math.sin(angle);
    vectorAngG0[1] = vectorG0[1]*Math.cos(angle);
    vectorAngG0[2] = vectorG0[2];
    var vectorR0 = [-20.0, 25.0, 5.0];
    var vectorFupr0 = [0.0, 10.0, -10.0];
    var vectorA1P0 = [];
    var vectorA2AngG0 = [];
    var vectorA3R0 = [];
    var vectorA4Fupr0 = [];
    var vectorP = [];
    var vectorG = [];
    var vectorR = [];
    var vectorFupr = [];

    vec3.add(vectorP0,center,vectorP);
    vec3.add(vectorAngG0,center,vectorG);
    vec3.add(vectorR0,center,vectorR);
    vec3.add(vectorFupr0,center,vectorFupr);

    vec3.scale(vectorP0,a[0],vectorA1P0);
    vec3.scale(vectorAngG0,a[1],vectorA2AngG0);
    vec3.scale(vectorR0,a[2],vectorA3R0);
    vec3.scale(vectorFupr0,a[3],vectorA4Fupr0);

    var sumPG0 = [];
    var sumPG = [];
    vec3.add(vectorA1P0,vectorA2AngG0,sumPG0);
    vec3.add(sumPG0,center,sumPG);

    var sumPGR0 = [];
    var sumPGR = [];
    vec3.add(sumPG0,vectorA3R0,sumPGR0);
    vec3.add(sumPGR0,center,sumPGR);

    var sumPGRF0 = [];
    var sumPGRF = [];
    vec3.add(sumPGR0,vectorA4Fupr0,sumPGRF0);
    vec3.add(sumPGRF0,center,sumPGRF);

    var RRad = 3;
    var projRad = 2;
    var angRad = 1.5;
    var GRad = 3;

    pushAxesPrimitives(center,arrowX1,arrowX2,arrowY1,arrowY2,arrowZ1,arrowZ2);
    var RColor = [0.8, 0.2, 0.8, 1.0];
    var GColor = [0.8, 0.8, 0.2, 1.0];
    var GYColor = [0.6, 1.0, 0.0, 1.0];
    var GXColor =  [1.0, 0.6, 0.0, 1.0];
    var angColor = [0.0, 1.0, 0.0, 1.0];
    var RXColor = [1.0, 0.2, 0.2, 1.0];
    var RYColor = [0.2, 1.0, 0.2, 1.0];
    var RZColor = [0.2, 0.2, 1.0, 1.0];

    primitives.push({class:"arrow", text: katex.renderToString("\\vec P"), offset: true, arr0:center, arr1:vectorP, rad:GRad, color:RXColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec G"), offset: true, arr0:center, arr1:vectorG, rad:GRad, color:GColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec R_\\text{а}"), offset: true, arr0:center, arr1:vectorR, rad:RRad, color:RColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec F_\\text{упр}"), offset: true, arr0:center, arr1:vectorFupr, rad:GRad, color:RYColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec F"), offset: true, arr0:center, arr1:sumPGRF, rad:GRad, color:RZColor});

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
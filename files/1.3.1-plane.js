var dimention="3d";
function initPoints() {
    points = [];
}
var meshPlane = {};
function initDescr() {
    var descr = "";
    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(0,this.checked)"> Ось OX:</br>\
    - начало отсчёта - т. O центр масс (центр тяжести) - ЦТ</br>\
    - масштаб обозначен штрихами</br>\
    - положительное направление - от т. О к носу ЛА</label>';
    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(1,this.checked)"> Ось OY:</br>\
    - начало отсчёта - т. O центр масс (центр тяжести) - ЦТ</br>\
    - масштаб обозначен штрихами</br>\
    - положительное направление - от т. О к верхней части ЛА</label>';
    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(2,this.checked)"> Ось OZ:</br>\
    - начало отсчёта - т. O центр масс (центр тяжести) - ЦТ</br>\
    - масштаб обозначен штрихами</br>\
    - положительное направление - от т. О в сторону правой части ЛА, если смотреть у т. O на нос ЛА</label>';
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

    var AxesColor = [0.2, 0.2, 0.2, 1.0];
    var axesRad = 1;

    primitives.push({class:"point", offset:true, text: "O", arr0:center, rad:axesRad*2, color:AxesColor});

    if (showOXYZ[0]) {
        primitives.push({class:"text", text: "X", arr0:arrowX2});
        primitives.push({class:"arrow", offset:true, text: "", arr0:arrowX1, arr1:arrowX2, rad:axesRad, color:AxesColor});
        for (var i = -5; i <= 4; i++) {
            if (i!=0) {
                var dash1 = [center[0]+i*10.0,center[1]-axesRad*5,center[2]];
                var dash2 = [center[0]+i*10.0,center[1]+axesRad*5,center[2]];
                primitives.push({class:"dash", offset:true, text: "", arr0:dash1, arr1:dash2, rad:axesRad, color:AxesColor});
            }
        }
    }
    if (showOXYZ[1]) {
        primitives.push({class:"text", text: "Y", arr0:arrowY2});
        primitives.push({class:"arrow", offset:true, text: "", arr0:arrowY1, arr1:arrowY2, rad:axesRad, color:AxesColor});
        for (var i = -4; i <= 3; i++) {
            if (i!=0) {
                var dash1 = [center[0]-axesRad*5,center[1]+i*10.0,center[2]];
                var dash2 = [center[0]+axesRad*5,center[1]+i*10.0,center[2]];
                primitives.push({class:"dash", offset:true, text: "", arr0:dash1, arr1:dash2, rad:axesRad, color:AxesColor});
            }
        }
    }

    if (showOXYZ[2]) {
        primitives.push({class:"text", text: "Z", arr0:arrowZ2});
        primitives.push({class:"arrow", offset:true, text: "", arr0:arrowZ1, arr1:arrowZ2, rad:axesRad, color:AxesColor});
        for (var i = -5; i <= 4; i++) {
            if (i!=0) {
                var dash1 = [center[0]-axesRad*5,center[1],center[2]+i*10.0];
                var dash2 = [center[0]+axesRad*5,center[1],center[2]+i*10.0];
                primitives.push({class:"dash", offset:true, text: "", arr0:dash1, arr1:dash2, rad:axesRad, color:AxesColor});
            }
        }
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
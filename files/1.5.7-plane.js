var dimention="3d";
function initPoints() {
    points = [];
}
var meshPlane = {};
function initDescr() {
    var descr = 'Различные ортонормированные базисы:</br>';
    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(0,this.checked)"> $\\vec x$, $\\vec y$, $\\vec z$ - базис связанной системы координат. Векторы ориентированы по главным осям инерции ЛА.</label>';
    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(1,this.checked)"> $\\vec x_1$, $\\vec y_1$, $\\vec z_1$ - базис скоростной системы координат. Ось $O\\vec x_1$ направлена по вектору скорости $\\vec v$ ЛА.</label>';
    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(2,this.checked)"> $\\vec x_0$, $\\vec y_0$, $\\vec z_0$ - базис неподвижной системы координат, связанный с поверхностью земли. Ось $O\\vec y_0$ направлена перпендикулярно поверхности земли.</label>';

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

    var center = [0,0,0];
    var arrowX0 = [50.0,0.0,0.0];
    var arrowY0 = [0.0,40.0,0.0];
    var arrowZ0 = [0.0,0.0,50.0];

    var RRad = 1.5;
    var projRad = 2;
    var angRad = 1.5;
    var GRad = 3;
    var axesRad = 1;

    var angZ = degToRad(15.0);
    var angX = degToRad(10.0);
    var mvMatrixAdditional = mat4.create();
    mat4.identity(mvMatrixAdditional);
    mat4.rotateX(mvMatrixAdditional, angX);
    mat4.rotateZ(mvMatrixAdditional, angZ);

    mat4.multiplyVec3(mvMatrixAdditional,arrowX0);
    mat4.multiplyVec3(mvMatrixAdditional,arrowY0);
    mat4.multiplyVec3(mvMatrixAdditional,arrowZ0);
    primitives.push({class:"point", text: "O", offset: true, arr0:center, rad:5, color:[0.0, 0.0, 0.0, 1.0]});
    if (showOXYZ[0]) {
        var AxesColor = [0.5, 0.0, 0.0, 1.0];
        var vecColor = [1.0, 0.0, 0.0, 1.0];
        var arrowX = [];
        var arrowY = [];
        var arrowZ = [];
        vec3.add(center,arrowX0,arrowX);
        vec3.add(center,arrowY0,arrowY);
        vec3.add(center,arrowZ0,arrowZ);
        var arrowXs = [];
        var arrowYs = [];
        var arrowZs = [];
        vec3.subtract(center,arrowX0,arrowXs);
        vec3.subtract(center,arrowY0,arrowYs);
        vec3.subtract(center,arrowZ0,arrowZs);
        var vecX = vec3.create(arrowX0);
        var vecY = vec3.create(arrowY0);
        var vecZ = vec3.create(arrowZ0);
        vec3.normalize(vecX);
        vec3.normalize(vecY);
        vec3.normalize(vecZ);
        vec3.scale(vecX,20);
        vec3.scale(vecY,20);
        vec3.scale(vecZ,20);
        vec3.add(vecX,center);
        vec3.add(vecY,center);
        vec3.add(vecZ,center);
        primitives.push({class:"text", text: "X", arr0:arrowX});
        primitives.push({class:"text", text: "Y", arr0:arrowY});
        primitives.push({class:"text", text: "Z", arr0:arrowZ});
        primitives.push({class:"arrow", text: "", offset: true, arr0:arrowXs, arr1:arrowX, rad:axesRad, color:AxesColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:arrowYs, arr1:arrowY, rad:axesRad, color:AxesColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:arrowZs, arr1:arrowZ, rad:axesRad, color:AxesColor});
        primitives.push({class:"text", text: katex.renderToString("\\vec x"), arr0:vecX});
        primitives.push({class:"text", text: katex.renderToString("\\vec y"), arr0:vecY});
        primitives.push({class:"text", text: katex.renderToString("\\vec z"), arr0:vecZ});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecX, rad:projRad, color:vecColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecY, rad:projRad, color:vecColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecZ, rad:projRad, color:vecColor});
    }
    if (showOXYZ[1]) {
        var angle1 = angZ/5*3;
        var angleZ2 = angZ/5*2;
        var arrowX02 = [];
        var arrowY02 = [];
        var arrowZ02 = [];

        var rotmat = mat4.create();
        mat4.identity(rotmat);
        mat4.rotateZ(rotmat,-angle1);
        // mat4.multiply(rotmat,mvMatrixAdditional);
        mat4.multiplyVec3(rotmat,arrowX0,arrowX02);
        mat4.multiplyVec3(rotmat,arrowY0,arrowY02);
        mat4.multiplyVec3(rotmat,arrowZ0,arrowZ02);
        mat4.identity(rotmat);
        mat4.rotate(rotmat,angleZ2,arrowY02);
        // mat4.multiply(rotmat,mvMatrixAdditional);
        mat4.multiplyVec3(rotmat,arrowX02);
        mat4.multiplyVec3(rotmat,arrowY02);
        mat4.multiplyVec3(rotmat,arrowZ02);

        var AxesColor = [0.0, 0.0, 0.5, 1.0];
        var vecColor = [0.0, 0.0, 1.0, 1.0];
        var arrowX = [];
        var arrowY = [];
        var arrowZ = [];
        vec3.add(center,arrowX02,arrowX);
        vec3.add(center,arrowY02,arrowY);
        vec3.add(center,arrowZ02,arrowZ);
        var arrowXs = [];
        var arrowYs = [];
        var arrowZs = [];
        vec3.subtract(center,arrowX02,arrowXs);
        vec3.subtract(center,arrowY02,arrowYs);
        vec3.subtract(center,arrowZ02,arrowZs);
        var vecX = vec3.create(arrowX02);
        var vecY = vec3.create(arrowY02);
        var vecZ = vec3.create(arrowZ02);
        vec3.normalize(vecX);
        vec3.normalize(vecY);
        vec3.normalize(vecZ);

        var vecV = vec3.create(vecX);
        vec3.scale(vecV,30);
        vec3.add(vecV,center);

        vec3.scale(vecX,20);
        vec3.scale(vecY,20);
        vec3.scale(vecZ,20);
        vec3.add(vecX,center);
        vec3.add(vecY,center);
        vec3.add(vecZ,center);
        primitives.push({class:"arrow", text: "", offset: true, arr0:arrowXs, arr1:arrowX, rad:axesRad, color:AxesColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:arrowYs, arr1:arrowY, rad:axesRad, color:AxesColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:arrowZs, arr1:arrowZ, rad:axesRad, color:AxesColor});
        primitives.push({class:"text", text: katex.renderToString("\\vec x_1"), arr0:vecX});
        primitives.push({class:"text", text: katex.renderToString("\\vec y_1"), arr0:vecY});
        primitives.push({class:"text", text: katex.renderToString("\\vec z_1"), arr0:vecZ});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecX, rad:projRad, color:vecColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecY, rad:projRad, color:vecColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecZ, rad:projRad, color:vecColor});
        primitives.push({class:"text", text: katex.renderToString("\\vec v"), arr0:vecV});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecV, rad:RRad, color:[0.0, 0.5, 1.0, 1.0]});
    }
    if (showOXYZ[2]) {
        var rotmat = mat4.create();
        mat4.identity(rotmat);
        var mvMatrixAdditionalInv = mat4.create();
        mat4.inverse(mvMatrixAdditional,mvMatrixAdditionalInv);
        mat4.multiply(rotmat,mvMatrixAdditionalInv);
        var arrowX01 = [];
        var arrowY01 = [];
        var arrowZ01 = [];
        mat4.multiplyVec3(rotmat,arrowX0,arrowX01);
        mat4.multiplyVec3(rotmat,arrowY0,arrowY01);
        mat4.multiplyVec3(rotmat,arrowZ0,arrowZ01);
        mat4.identity(rotmat);
        mat4.rotate(rotmat,degToRad(-20),arrowY01);
        mat4.multiplyVec3(rotmat,arrowX01);
        mat4.multiplyVec3(rotmat,arrowY01);
        mat4.multiplyVec3(rotmat,arrowZ01);

        var AxesColor = [0.0, 0.5, 0.0, 1.0];
        var vecColor = [0.0, 1.0, 0.0, 1.0];
        var arrowX = [];
        var arrowY = [];
        var arrowZ = [];
        vec3.add(center,arrowX01,arrowX);
        vec3.add(center,arrowY01,arrowY);
        vec3.add(center,arrowZ01,arrowZ);
        var arrowXs = [];
        var arrowYs = [];
        var arrowZs = [];
        vec3.subtract(center,arrowX01,arrowXs);
        vec3.subtract(center,arrowY01,arrowYs);
        vec3.subtract(center,arrowZ01,arrowZs);
        var vecX = vec3.create(arrowX01);
        var vecY = vec3.create(arrowY01);
        var vecZ = vec3.create(arrowZ01);
        vec3.normalize(vecX);
        vec3.normalize(vecY);
        vec3.normalize(vecZ);

        vec3.scale(vecX,20);
        vec3.scale(vecY,20);
        vec3.scale(vecZ,20);
        vec3.add(vecX,center);
        vec3.add(vecY,center);
        vec3.add(vecZ,center);
        primitives.push({class:"arrow", text: "", offset: true, arr0:arrowXs, arr1:arrowX, rad:axesRad, color:AxesColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:arrowYs, arr1:arrowY, rad:axesRad, color:AxesColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:arrowZs, arr1:arrowZ, rad:axesRad, color:AxesColor});

        primitives.push({class:"text", text: katex.renderToString("\\vec x_0"), arr0:vecX});
        primitives.push({class:"text", text: katex.renderToString("\\vec y_0"), arr0:vecY});
        primitives.push({class:"text", text: katex.renderToString("\\vec z_0"), arr0:vecZ});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecX, rad:projRad, color:vecColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecY, rad:projRad, color:vecColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecZ, rad:projRad, color:vecColor});
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
            rotateZ:15.0,
            rotateX:10.0,
            centerTranslate:[-6, -35.7716, -19.4469],
            color:[0.8,0.8,0.8,1.0]
        });
    }
}
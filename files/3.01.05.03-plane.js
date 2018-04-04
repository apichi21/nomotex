var dimention="3d";
function initPoints() {
    points = [];
}
var meshPlane = {};
function initDescr() {
    var descr = "Разложение вектора полной аэродинамической силы $\\vec{R}$ в базисе связанной $\\vec{x}$, $\\vec{y}$, $\\vec{z}$ системы координат и в базисе $\\vec{x_1}$, $\\vec{y_1}$, $\\vec{z_1}$ скоростной системы координат.";
    descr += "\\begin{equation} \\vec{R}=|\\vec{X}|\\vec{x}+ |\\vec{Y}|\\vec{y}+|\\vec{Z}|\\vec{z} \\end{equation}\\begin{equation} \\vec{R}=|\\vec{X_1}|\\vec{x_1}+ |\\vec{Y_1}|\\vec{y_1}+|\\vec{Z_1}|\\vec{z_1} \\end{equation} <br>где $\\vec{x}$, $\\vec{y}$, $\\vec{z}$ и $\\vec{x_1}$, $\\vec{y_1}$, $\\vec{z_1}$ имеют единичную длину: <br>$$\\vec{x}=\\frac{\\vec{X}}{|\\vec{X}|}, \\vec{y}=\\frac{\\vec{Y}}{|\\vec{Y}|}, \\vec{z}=\\frac{\\vec{Z}}{|\\vec{Z}|}$$";

    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(0,this.checked)"> Разложение вектора $\\vec{R}$ по базису связанной системы координат $\\vec{x}$, $\\vec{y}$, $\\vec{z}$</label>';
    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(1,this.checked)"> Разложение вектора $\\vec{R}$ по базису скоростной системы координат $\\vec{x_1}$, $\\vec{y_1}$, $\\vec{z_1}$</label>';

    $("#description").html(descr);
    $("Title").html("Технические примеры");
    $("#containerYellow").css({"min-width": "520px"});

    loadSTL("boying.stl", meshPlane);
    rotAngY = 325.0;
    rotAngX = 15.0;
    // rotAngZ = 15.0;
    scaleFactor = 0.06;
}
var showOXYZ = [true,true];
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

    var angZ = degToRad(25.0);
    var angX = degToRad(20.0);
    var mvMatrixAdditional = mat4.create();
    mat4.identity(mvMatrixAdditional);
    mat4.rotateX(mvMatrixAdditional, angX);
    mat4.rotateZ(mvMatrixAdditional, angZ);

    mat4.multiplyVec3(mvMatrixAdditional,arrowX0);
    mat4.multiplyVec3(mvMatrixAdditional,arrowY0);
    mat4.multiplyVec3(mvMatrixAdditional,arrowZ0);

    var vectorR0 = [-20.0, 25.0, 5.0];
    mat4.multiplyVec3(mvMatrixAdditional,vectorR0);
    var vectorR = [];
    vec3.add(vectorR0,center,vectorR);
    var RColor = [0.8, 0.2, 0.8, 1.0];
    primitives.push({class:"arrow", text: katex.renderToString("\\vec R_\\text{а}"), offset: true, arr0:center, arr1:vectorR, rad:RRad, color:RColor});

    primitives.push({class:"point", text: "O", offset: true, arr0:center, rad:5, color:[0.0, 0.0, 0.0, 1.0]});

    function proju(what0,what,where10,text1,col){
        var u12 = [];
        vec3.scale(where10,vec3.dot(what0,where10)/900,u12);
        vec3.add(u12,center);
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:u12, rad:projRad, color:col});
        primitives.push({class:"dashline", text: "", offset: true, arr0:what, arr1:u12, rad:1, color:col});
        primitives.push({class:"text", text: text1, arr0:u12});
    }

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
        var vecX0 = vec3.create(arrowX0);
        var vecY0 = vec3.create(arrowY0);
        var vecZ0 = vec3.create(arrowZ0);
        var vecX = vec3.create();
        var vecY = vec3.create();
        var vecZ = vec3.create();
        vec3.normalize(vecX0);
        vec3.normalize(vecY0);
        vec3.normalize(vecZ0);
        vec3.scale(vecX0,30);
        vec3.scale(vecY0,30);
        vec3.scale(vecZ0,30);
        vec3.add(vecX0,center,vecX);
        vec3.add(vecY0,center,vecY);
        vec3.add(vecZ0,center,vecZ);
        primitives.push({class:"text", text: "X", arr0:arrowX});
        primitives.push({class:"text", text: "Y", arr0:arrowY});
        primitives.push({class:"text", text: "Z", arr0:arrowZ});
        primitives.push({class:"arrow", text: "", offset: true, arr0:arrowXs, arr1:arrowX, rad:axesRad, color:AxesColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:arrowYs, arr1:arrowY, rad:axesRad, color:AxesColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:arrowZs, arr1:arrowZ, rad:axesRad, color:AxesColor});
        primitives.push({class:"text", text: katex.renderToString("\\vec x"), arr0:vecX});
        primitives.push({class:"text", text: katex.renderToString("\\vec y"), arr0:vecY});
        primitives.push({class:"text", text: katex.renderToString("\\vec z"), arr0:vecZ});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecX, rad:RRad, color:vecColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecY, rad:RRad, color:vecColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecZ, rad:RRad, color:vecColor});
        proju(vectorR0,vectorR,vecX0,katex.renderToString("\\vec X"),[0.6,0,0,1]);
        proju(vectorR0,vectorR,vecY0,katex.renderToString("\\vec Y"),[0.6,0,0,1]);
        proju(vectorR0,vectorR,vecZ0,katex.renderToString("\\vec Z"),[0.6,0,0,1]);
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
        mat4.multiplyVec3(rotmat,arrowX0,arrowX02);
        mat4.multiplyVec3(rotmat,arrowY0,arrowY02);
        mat4.multiplyVec3(rotmat,arrowZ0,arrowZ02);

        mat4.identity(rotmat);
        mat4.rotateY(rotmat,angleZ2);
        mat4.multiplyVec3(rotmat,arrowX02);
        mat4.multiplyVec3(rotmat,arrowY02);
        mat4.multiplyVec3(rotmat,arrowZ02);

        var AxesColor = [0.0, 0.0, 0.5, 1.0];
        var vecColor = [0.0, 0.0, 1.0, 1.0];
        var arrowX2 = [];
        var arrowY2 = [];
        var arrowZ2 = [];
        vec3.add(center,arrowX02,arrowX2);
        vec3.add(center,arrowY02,arrowY2);
        vec3.add(center,arrowZ02,arrowZ2);
        var arrowXs2 = [];
        var arrowYs2 = [];
        var arrowZs2 = [];
        vec3.subtract(center,arrowX02,arrowXs2);
        vec3.subtract(center,arrowY02,arrowYs2);
        vec3.subtract(center,arrowZ02,arrowZs2);
        var vecX20 = vec3.create(arrowX02);
        var vecY20 = vec3.create(arrowY02);
        var vecZ20 = vec3.create(arrowZ02);
        var vecX2 = vec3.create();
        var vecY2 = vec3.create();
        var vecZ2 = vec3.create();
        vec3.normalize(vecX20);
        vec3.normalize(vecY20);
        vec3.normalize(vecZ20);

        var vecV = vec3.create(vecX20);
        vec3.scale(vecV,40);
        vec3.add(vecV,center);

        vec3.scale(vecX20,30);
        vec3.scale(vecY20,30);
        vec3.scale(vecZ20,30);

        vec3.add(vecX20,center,vecX2);
        vec3.add(vecY20,center,vecY2);
        vec3.add(vecZ20,center,vecZ2);
        primitives.push({class:"arrow", text: "", offset: true, arr0:arrowXs2, arr1:arrowX2, rad:axesRad, color:AxesColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:arrowYs2, arr1:arrowY2, rad:axesRad, color:AxesColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:arrowZs2, arr1:arrowZ2, rad:axesRad, color:AxesColor});
        primitives.push({class:"text", text: katex.renderToString("\\vec x_1"), arr0:vecX2});
        primitives.push({class:"text", text: katex.renderToString("\\vec y_1"), arr0:vecY2});
        primitives.push({class:"text", text: katex.renderToString("\\vec z_1"), arr0:vecZ2});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecX2, rad:RRad, color:vecColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecY2, rad:RRad, color:vecColor});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecZ2, rad:RRad, color:vecColor});
        primitives.push({class:"text", text: katex.renderToString("\\vec v"), arr0:vecV});
        primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecV, rad:RRad, color:[0.0, 0.5, 1.0, 1.0]});
        proju(vectorR0,vectorR,vecX20,katex.renderToString("\\vec X_1"),[0,0,0.6,1]);
        proju(vectorR0,vectorR,vecY20,katex.renderToString("\\vec Y_1"),[0,0,0.6,1]);
        proju(vectorR0,vectorR,vecZ20,katex.renderToString("\\vec Z_1"),[0,0,0.6,1]);
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
            rotateZ:25.0,
            rotateX:20.0,
            centerTranslate:[-6, -35.7716, -19.4469],
            color:[0.8,0.8,0.8,1.0]
        });
    }
}
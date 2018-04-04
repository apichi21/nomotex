var dimention="3d";
function initPoints() {
    points = [];
}
var meshPlane = {};
function initDescr() {
    var descr = "Переход к базису связанной системы координат $\\vec{x}$, $\\vec{y}$, $\\vec{z}$ от базиса скоростной системы координат $\\vec{x_1}$, $\\vec{y_1}$, $\\vec{z_1}$\\begin{equation} \\vec{y}=u_{12}\\vec{x_1}+u_{22}\\vec{y_1} \\end{equation}\\begin{equation} \\tilde{\\vec{x}}=a_{1}\\vec{x_1}+a_{2}\\vec{y_1} \\end{equation}\\begin{equation} \\vec{x}=a_{11}\\tilde{\\vec{x_1}}+u_{31}\\vec{z_1} \\end{equation}\\begin{equation} \\vec{z}=a_{13}\\tilde{\\vec{x_1}}+u_{33}\\vec{z_1} \\end{equation}Подставляя (2) в (3) и (4), получаем: $$\\vec{x}=u_{11}\\vec{x_1}+u_{21}\\vec{y_1}+u_{31}\\vec{z_1}$$$$\\vec{y}=u_{12}\\vec{x_1}+u_{22}\\vec{y_1}$$$$\\vec{z}=u_{13}\\vec{x_1}+u_{23}\\vec{y_1}+u_{33}\\vec{z_1}$$ <br>где $u_{11}=a_{11}a_1$; $u_{21}=a_{11}a_2$; $u_{13}=a_{13}a_1$; $u_{23}=a_{13}a_2$ <br><br> Все векторы $\\vec{x}$, $\\vec{y}$, $\\vec{z}$, $\\vec{x_1}$, $\\vec{y_1}$, $\\vec{z_1}$ и $\\tilde{\\vec{x}}$ имеют единичную длину.<br><br>$\\vec{x}$, $\\vec{y}$, $\\vec{z}$ &mdash; базис связанной системы координат. Векторы ориентированы по главным осям инерции летательного аппарата.<br>$\\vec{x_1}$, $\\vec{y_1}$, $\\vec{z_1}$ &mdash; базис скоростной системы координат.<br>";
    descr += "Разложение базиса $\\vec{x}$, $\\vec{y}$, $\\vec{z}$ по базису $\\vec{x_1}$, $\\vec{y_1}$, $\\vec{z_1}$ <br>$$(\\vec{x}, \\vec{y}, \\vec{z})=(\\vec{x_1}, \\vec{y_1}, \\vec{z_1})\\begin{pmatrix} u_{11} & u_{12}& u_{13}\\\\u_{21}& u_{22}& u_{23} \\\\ u_{31}&u_{32} & u_{33} \\end{pmatrix}$$";

    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(0,this.checked)"> Плоскость $\\pi_1$, которой принадлежат векторы $\\vec{x}$, $\\vec{z}$, $\\vec{z_1}$</label>';
    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(1,this.checked)"> Плоскость $\\pi_2$, которой принадлежат векторы $\\vec{y}$, $\\vec{x_1}$, $\\vec{y_1}$</label>';

    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(2,this.checked)"> Проекция вектора $\\vec{x}$ на $\\vec{x_1}$, $\\vec{y_1}$, $\\vec{z_1}$</label>';
    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(3,this.checked)"> Проекция вектора $\\vec{y}$ на $\\vec{x_1}$, $\\vec{y_1}$, $\\vec{z_1}$</label>';
    descr += '<label style="display: block"><input type="checkbox" checked onchange="changeOXYZ(4,this.checked)"> Проекция вектора $\\vec{z}$ на $\\vec{x_1}$, $\\vec{y_1}$, $\\vec{z_1}$</label>';

    $("#description").html(descr);
    $("Title").html("Технические примеры");
    $("#containerYellow").css({"min-width": "520px"});

    loadSTL("boying.stl", meshPlane);
    rotAngY = 325.0;
    rotAngX = 15.0;
    // rotAngZ = 15.0;
    scaleFactor = 0.06;
}
var showOXYZ = [true,true,true,true,true];
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

    primitives.push({class:"point", text: "O", offset: true, arr0:center, rad:5, color:[0.0, 0.0, 0.0, 1.0]});
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
    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecX, rad:projRad, color:vecColor});
    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecY, rad:projRad, color:vecColor});
    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecZ, rad:projRad, color:vecColor});

    var angle1 = angZ/5*4;
    var angleZ2 = -angZ/5*3;
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

    var vecX20t = vec3.create(arrowX0);
    mat4.multiplyVec3(rotmat,vecX20t);
    var vecX2t = vec3.create();
    vec3.normalize(vecX20t);
    vec3.scale(vecX20t,30);
    vec3.add(vecX20t,center,vecX2t);

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
    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecX2, rad:projRad, color:vecColor});
    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecY2, rad:projRad, color:vecColor});
    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecZ2, rad:projRad, color:vecColor});
    primitives.push({class:"text", text: katex.renderToString("\\vec v"), arr0:vecV});
    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecV, rad:RRad, color:[0.0, 0.5, 1.0, 1.0]});

    primitives.push({class:"text", text: katex.renderToString("\\tilde{\\vec{x}}"), arr0:vecX2t});
    primitives.push({class:"arrow", text: "", offset: true, arr0:center, arr1:vecX2t, rad:projRad, color:vecColor});

    function proju(what0,what,where10,text1){
        var u12 = [];
        vec3.scale(where10,vec3.dot(what0,where10)/900,u12);
        vec3.add(u12,center);
        primitives.push({class:"dashline", text: text1, offset: true, arr0:what, arr1:u12, rad:1, color:[0,0,0,1]});
    }

    if (showOXYZ[2]) {
        proju(vecX20t,vecX2t,vecX20,katex.renderToString("a_{1}"));
        proju(vecX20t,vecX2t,vecY20,katex.renderToString("a_{2}"));
        proju(vecX0,vecX,vecX20t,katex.renderToString("a_{11}"));
        proju(vecX0,vecX,vecZ20,katex.renderToString("u_{31}"));
        proju(vecX0,vecX,vecY20,katex.renderToString("u_{21}"));
        proju(vecX0,vecX,vecX20,katex.renderToString("u_{11}"));
    }
    if (showOXYZ[3]) {
        proju(vecY0,vecY,vecX20,katex.renderToString("u_{12}"));
        proju(vecY0,vecY,vecY20,katex.renderToString("u_{22}"));
    }
    if (showOXYZ[4]) {
        proju(vecZ0,vecZ,vecX20t,katex.renderToString("a_{13}"));
        proju(vecZ0,vecZ,vecZ20,katex.renderToString("u_{33}"));
        proju(vecZ0,vecZ,vecX20,katex.renderToString("u_{13}"));
        proju(vecZ0,vecZ,vecY20,katex.renderToString("u_{23}"));
    }

    if (showOXYZ[0]) {
        var vecXZ1 = [];
        var vecXZ2 = [];
        var vecXZ3 = [];
        var vecXZ4 = [];
        vec3.add(arrowX,arrowZ,vecXZ1);
        vec3.subtract(vecXZ1,center);
        vec3.add(arrowX,arrowZs,vecXZ2);
        vec3.subtract(vecXZ2,center);
        vec3.add(arrowXs,arrowZs,vecXZ3);
        vec3.subtract(vecXZ3,center);
        vec3.add(arrowXs,arrowZ,vecXZ4);
        vec3.subtract(vecXZ4,center);

        primitives.push({class:"plane", text: katex.renderToString("\\pi_1"), arr0:vecXZ1, arr1:vecXZ2, arr2:vecXZ3, arr3:vecXZ4, color:[0.0, 1.0, 0.0, 0.15]});
    }
    if (showOXYZ[1]) {
        var vecXY1 = [];
        var vecXY2 = [];
        var vecXY3 = [];
        var vecXY4 = [];
        vec3.add(arrowX2,arrowY2,vecXY1);
        vec3.subtract(vecXY1,center);
        vec3.add(arrowX2,arrowYs2,vecXY2);
        vec3.subtract(vecXY2,center);
        vec3.add(arrowXs2,arrowYs2,vecXY3);
        vec3.subtract(vecXY3,center);
        vec3.add(arrowXs2,arrowY2,vecXY4);
        vec3.subtract(vecXY4,center);
        primitives.push({class:"plane", text: katex.renderToString("\\pi_2"), arr0:vecXY1, arr1:vecXY2, arr2:vecXY3, arr3:vecXY4, color:[1.0, 1.0, 0.0, 0.15]});
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
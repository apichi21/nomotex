var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([5, -1, 0]), movable: "plane", vector:[0,0,1]});
    // points.push({coord1: vec3.create([-2, -1.8, 0]), movable: "line", vector:[1,0,0]});
    // points.push({coord1: vec3.create([3, -1.8, 0]), movable: "line", vector:[1,0,0]});
}
var meshPlane = {}, meshRadar = {};
function initDescr() {
    var descr = "";
    descr += "<p>Рассматривается вертикальная к поверхности Земли плоскость $\\pi$, проходящая через точку $M$, связанную с положением самолёта в некоторый момент времени $t$.</p>";
    descr += "<p>В плоскости $\\pi$ введём прямоугольную декартову систему координат $Oxyz$.</p>";
    descr += "<p>Построим прямую $l$, связанную с осью $Ox_1$ - скоростной системы координат самолёта $Ox_1y_1z_1$.</p>";
    descr += "<p>Параллельным переносом перенесём ось $Ox$ в плоскости $\\pi$ таким образом, чтобы точка $M$ стала принадлежать новой оси $Mx'$.</p>";
    descr += "<p>Вращением оси $Mx'$ вокруг точки $M$ до совмещения в осью $Mx_1$ - скоростной системы координат, находим угол $\\alpha$ наклона прямой $l$ с осью $Ox$.</p>";

    $("#description").html(descr);
    $("Title").html("Технические примеры");
    var preScaleTranslate = function(dx,dy,dz,sc) {
        for (var i = 0; i < this.vertexCoords.length/3; i++) {
            this.vertexCoords[i*3] = (this.vertexCoords[i*3]+dx)*sc;
            this.vertexCoords[i*3+1] = (this.vertexCoords[i*3+1]+dy)*sc;
            this.vertexCoords[i*3+2] = (this.vertexCoords[i*3+2]+dz)*sc;
        }
    }
    loadSTL("boying.stl", meshPlane, preScaleTranslate,[-6, -35.7716, -19.3785, 0.05]);
    // loadSTL("boying.stl", meshPlane, preScaleTranslate,[-6, -35.7716, -19.4469, 0.08]);
    centerTranslate[1] = 1;
}
var texM = katex.renderToString("M");
var texX = katex.renderToString("x_1");
var texXS = katex.renderToString("x'");
var texPi = katex.renderToString("\\pi");
var texAlpha = katex.renderToString("\\alpha");

function findRotateZ(p1,p2) {
    let vec_a = vec3.create();
    vec3.subtract(p2,p1,vec_a);
    vec_a[2] = 0;
    vec3.normalize(vec_a);
    let cosa = vec_a[0];
    let cosb = vec_a[1];
    let alpha = Math.acos(cosa)/Math.PI*180;
    if (cosb<0) {alpha *= -1;}
    return alpha;
}
function initData() {
    isOrtho = false;
    isShowAxes = false;

    var surfaceSize = 7;
    var surfaceZ = -5;

    // isOffsetAxes = true;
    var pointO = vec3.create([-surfaceSize+1, surfaceZ, 0]);
    var pointX = [pointO[0]+surfaceSize*2-1,pointO[1],pointO[2]];
    var pointY = [pointO[0],pointO[1],pointO[2]-5];
    var pointZ = [pointO[0],pointO[1]+8,pointO[2]];

    primitives.push({class:"arrow", text: "", arr0:pointO, arr1:pointX, offset:true, rad:1.5, color:[0.3, 0.3, 0.3, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:pointO, arr1:pointY, offset:true, rad:1.5, color:[0.3, 0.3, 0.3, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:pointO, arr1:pointZ, offset:true, rad:1.5, color:[0.3, 0.3, 0.3, 1.0]});

    primitives.push({class:"text", text: "x", arr0:pointX});
    primitives.push({class:"text", text: "y", arr0:pointY});
    primitives.push({class:"text", text: "z", arr0:pointZ});
    primitives.push({class:"text", text: "O", arr0:pointO});

    let ang = findRotateZ([0,0,0], points[0].coord1);
    if (ang>30) {
        ang = 30;
    } else if (ang<-30) {
        ang = -30;
    }

    points[0].coord1[0] = Math.cos(ang/180.0*Math.PI);
    points[0].coord1[1] = Math.sin(ang/180.0*Math.PI);
    points[0].coord1[2] = 0.0;

    vec3.scale(points[0].coord1,4.0);

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, offset:true, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
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
            rotateZ:ang,
            color:[0.8,0.8,0.8,1.0]
        });
    }
    var p1 = [], p2 = [];
    createLine([0,0,0], [1,0,0],p1,p2);
    primitives.push({class:"line", text: "", arr0:p1, arr1:p2, offset:true, rad:1.5, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"text", text: texXS, arr0:p2, pos: 'lb'});
    var p1 = [], p2 = [];
    createLine([0,0,0], points[0].coord1,p1,p2,4);
    primitives.push({class:"dashline", text: "", arr0:p1, arr1:p2, offset:true, rad:1.5, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: texM, arr0:[0,0,0], offset:true, rad:4, color:[0.0, 0.0, 0.8, 1.0]});
    primitives.push({class:"point", text: texX, arr0:points[0].coord1, offset:true, rad:4, color:[1.0, 0.0, 0.0, 1.0]});

    primitives.push({class:"arc", text: texAlpha, arr0:[0,0,0], arr1:[1,0,0], arr2:points[0].coord1, offset:true, Rad:2, rad:1.5, color:[0.0, 1.0, 0.0, 1.0]});

    // var vectorN = [points[0].coord1[1]/5.0*2.0, -points[0].coord1[0]/5.0*2.0, 0.0];

    // primitives.push({class:"arrow", text: texVecN, arr0:[0,0,0], arr1:vectorN, offset:true, rad:2, color:[0.0, 1.0, 0.0, 1.0]});


    // var nintercept = [];
    // vec3.scale(vectorN,surfaceZ/vectorN[1],nintercept);

    // primitives.push({class:"line", text: "", arr0:[0,0,0], arr1:[-3.2,0,0], offset:true, rad:1.2, color:[0.3, 0.3, 0.3, 1.0]});
    // primitives.push({class:"line", text: "", arr0:nintercept, arr1:[-3.2,surfaceZ,0], offset:true, rad:1.2, color:[0.3, 0.3, 0.3, 1.0]});
    // primitives.push({class:"darrow", text: texH, arr0:[-3,0,0], arr1:[-3,surfaceZ,0], offset:true, rad:1.5, color:[0.3, 0.3, 0.3, 1.0]});
    // primitives.push({class:"line", text: "", arr0:[0,0,0], arr1:nintercept, offset:true, rad:1.2, color:[0.0, 0.8, 0.0, 1.0]});
    // primitives.push({class:"point", text: "", arr0:nintercept, offset:true, rad:3, color:[0.0, 0.8, 0.0, 1.0]});

    primitives.push({class:"plane", text: "",
                     arr0:[-surfaceSize,surfaceZ,-surfaceSize],
                     arr1:[surfaceSize,surfaceZ,-surfaceSize],
                     arr2:[surfaceSize,surfaceZ,surfaceSize],
                     arr3:[-surfaceSize,surfaceZ,surfaceSize],
                     color:[0.5, 0.5, 0.5, 0.4]});

    primitives.push({class:"plane", text: texPi,
                     arr0:[-surfaceSize,surfaceZ,0],
                     arr1:[surfaceSize,surfaceZ,0],
                     arr2:[surfaceSize,3,0],
                     arr3:[-surfaceSize,3,0],
                     color:[0.0, 0.2, 0.8, 0.4]});

}
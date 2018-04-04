var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([5, 0, 0]), movable: "plane", vector:[0,0,1]});
    // points.push({coord1: vec3.create([-2, -1.8, 0]), movable: "line", vector:[1,0,0]});
    // points.push({coord1: vec3.create([3, -1.8, 0]), movable: "line", vector:[1,0,0]});
}
var meshPlane = {}, meshRadar = {};
function initDescr() {
    var descr = "";
    descr += "Бортовой радиовысотометр самолёта установлен по нормали $\\vec N$ к продольной оси $OX$ в связанной системе координат самолёта.<br>";
    // descr += "Если нет угла атаки самолёта и движение самолёта прямолинейное, то линия $OX$ совпадает с линией $l$ - траекторией самолёта.<br>";
    descr += "Если радиовысота показывает одно и то же значение, то самолёт летит на одной и той же высоте $H$.<br>";
    descr += "Если разные значения, то самолёт изменяет высоту полёта $H$.<br>";
    descr += "В случае, если угол атаки или угол тангажа ненулевые, радиовысотометр показывает не истинную высоту.<br>";
    $("#description").html(descr);
    $("Title").html("Технические примеры");
    var preScaleTranslate = function(dx,dy,dz,sc) {
        for (var i = 0; i < this.vertexCoords.length/3; i++) {
            this.vertexCoords[i*3] = (this.vertexCoords[i*3]+dx)*sc;
            this.vertexCoords[i*3+1] = (this.vertexCoords[i*3+1]+dy)*sc;
            this.vertexCoords[i*3+2] = (this.vertexCoords[i*3+2]+dz)*sc;
        }
    }
    loadSTL("boying.stl", meshPlane, preScaleTranslate,[-6, -35.7716, -19.4469, 0.08]);
    centerTranslate[1] = 1;
}
var te1 = katex.renderToString("O");
var te2 = katex.renderToString("X");
var te3 = katex.renderToString("\\vec N");
var te4 = katex.renderToString("H");

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
    // isOffsetAxes = true;

    let ang = findRotateZ([0,0,0], points[0].coord1);
    if (ang>30) {
        ang = 30;
    } else if (ang<-30) {
        ang = -30;
    }

    points[0].coord1[0] = Math.cos(ang/180.0*Math.PI);
    points[0].coord1[1] = Math.sin(ang/180.0*Math.PI);
    points[0].coord1[2] = 0.0;

    vec3.scale(points[0].coord1,5.0);

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
    createLine([0,0,0], points[0].coord1,p1,p2);
    primitives.push({class:"line", text: "", arr0:p1, arr1:p2, offset:true, rad:1.5, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: te1, arr0:[0,0,0], offset:true, rad:4, color:[0.0, 0.0, 0.8, 1.0]});
    primitives.push({class:"point", text: te2, arr0:points[0].coord1, offset:true, rad:4, color:[1.0, 0.0, 0.0, 1.0]});

    var vectorN = [points[0].coord1[1]/5.0*2.0, -points[0].coord1[0]/5.0*2.0, 0.0];

    primitives.push({class:"arrow", text: te3, arr0:[0,0,0], arr1:vectorN, offset:true, rad:2, color:[0.0, 1.0, 0.0, 1.0]});

    var plen = 7;
    var pz = -5;

    var nintercept = [];
    vec3.scale(vectorN,pz/vectorN[1],nintercept);

    primitives.push({class:"line", text: "", arr0:[0,0,0], arr1:[-3.2,0,0], offset:true, rad:1.2, color:[0.3, 0.3, 0.3, 1.0]});
    primitives.push({class:"line", text: "", arr0:nintercept, arr1:[-3.2,pz,0], offset:true, rad:1.2, color:[0.3, 0.3, 0.3, 1.0]});
    primitives.push({class:"darrow", text: te4, arr0:[-3,0,0], arr1:[-3,pz,0], offset:true, rad:1.5, color:[0.3, 0.3, 0.3, 1.0]});
    primitives.push({class:"line", text: "", arr0:[0,0,0], arr1:nintercept, offset:true, rad:1.2, color:[0.0, 0.8, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:nintercept, offset:true, rad:3, color:[0.0, 0.8, 0.0, 1.0]});

    primitives.push({class:"plane", text: "", arr0:[-plen,pz,-plen], arr1:[plen,pz,-plen], arr2:[plen,pz,plen], arr3:[-plen,pz,plen], color:[0.5, 0.5, 0.5, 0.4]});
}
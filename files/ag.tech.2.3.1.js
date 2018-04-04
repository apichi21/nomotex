var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0, 1.5, -1]), movable: "free"});
    points.push({coord1: vec3.create([4, 1, 1]), movable: "free"});
    points.push({coord1: vec3.create([-3, -1.8, 0]), movable: "plane", vector:[0,1,0]});
}
var meshPlane = {}, meshRadar = {};
function initDescr() {
    var descr = "Определение расстояния между 2-я самолётами с помощью одной РЛС";
    $("#description").html(descr);
    $("Title").html("Технические примеры");

    var preScaleTranslate = function(dx,dy,dz,sc) {
        for (var i = 0; i < this.vertexCoords.length/3; i++) {
            this.vertexCoords[i*3] = (this.vertexCoords[i*3]+dx)*sc;
            this.vertexCoords[i*3+1] = (this.vertexCoords[i*3+1]+dy)*sc;
            this.vertexCoords[i*3+2] = (this.vertexCoords[i*3+2]+dz)*sc;
        }
    }
    loadSTL("boying.stl", meshPlane, preScaleTranslate,[-6, -35.7716, -19.4469, 0.03]);
    loadSTL("radar.stl", meshRadar, preScaleTranslate, [0, 0.5188, 0.1749, 0.15]);
}

var te1 = katex.renderToString("O");
var te2 = katex.renderToString("y");
var te3 = katex.renderToString("z");
var te4 = katex.renderToString("x");
var te5 = katex.renderToString("M_1");
var te6 = katex.renderToString("M_2");

function findRotateY(p1,p2) {
    let vec_a = vec3.create();
    vec3.subtract(p2,p1,vec_a);
    vec_a[1] = 0;
    vec3.normalize(vec_a);
    let cosa = vec_a[0];
    let cosb = vec_a[2];
    let alpha = Math.acos(cosa)/Math.PI*180;
    if (cosb>0) {alpha *= -1;}
    return alpha;
}
function initData() {
    isOrtho = false;
    isShowAxes = false;

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
            translate:points[0].coord1,
            rotateY:10,
            scale:0.6,
            centerTranslate:[0,0,0],
            color:[0.8,0.5,0.0,1.0]
        });
        meshes.push({
            vertices:vertexCoords,
            normals:normalCoords,
            indices:vertexIndices,
            translate:points[1].coord1,
            rotateY:80,
            scale:0.6,
            centerTranslate:[0,0,0],
            color:[0.5,0.8,0.0,1.0]
        });
    }

    if (meshRadar.isready)
    {
        let vertexCoords = meshRadar.vertexCoords;
        let normalCoords = meshRadar.normalCoords;
        let vertexIndices = meshRadar.vertexIndices;
        let center = vec3.create(points[0].coord1);
        vec3.add(center,points[1].coord1);
        vec3.scale(center,0.5);
        meshes.push({
            vertices:vertexCoords,
            normals:normalCoords,
            indices:vertexIndices,
            rotateY:findRotateY(points[2].coord1, center),
            translate:points[2].coord1,
            centerTranslate:[0,-1.2*1.001,0],
            color:[0.0,1.0,0.0,1.0]
        });
    }

    primitives.push({class:"point", text: te5, pos: "lt", arr0:points[0].coord1, offset:true, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: te6, pos: "lt", arr0:points[1].coord1, offset:true, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[2].coord1, offset:true, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    var arrlen = 1;
    var center = points[2].coord1;
    primitives.push({class:"arrow", text: "", arr0:center, arr1:[center[0]+arrlen,center[1],center[2]], offset:true, rad:1.5, color:[0.3, 0.3, 0.3, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:center, arr1:[center[0],center[1]+arrlen,center[2]], offset:true, rad:1.5, color:[0.3, 0.3, 0.3, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:center, arr1:[center[0],center[1],center[2]+arrlen], offset:true, rad:1.5, color:[0.3, 0.3, 0.3, 1.0]});
    primitives.push({class:"text", text: te1, arr0:center, pos:'rt'});
    primitives.push({class:"text", text: te2, arr0:[center[0]+arrlen,center[1],center[2]]});
    primitives.push({class:"text", text: te3, arr0:[center[0],center[1]+arrlen,center[2]]});
    primitives.push({class:"text", text: te4, arr0:[center[0],center[1],center[2]+arrlen]});

    primitives.push({class:"arrow", text: "", arr0:points[2].coord1, arr1:points[0].coord1, offset:true, rad:2, color:[0.0, 1.0, 0.5, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:points[2].coord1, arr1:points[1].coord1, offset:true, rad:2, color:[0.0, 0.5, 1.0, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:points[0].coord1, arr1:points[1].coord1, offset:true, rad:1.5, color:[1.0, 0.0, 0.0, 1.0]});
    var plen = 5;
    var pz = -3;
    primitives.push({class:"plane", text: "", arr0:[-plen,pz,-plen], arr1:[plen,pz,-plen], arr2:[plen,pz,plen], arr3:[-plen,pz,plen], color:[0.5, 0.5, 0.5, 0.4]});
}
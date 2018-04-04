var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([1.5, 1, 0]), movable: "plane", vector:[0,0,1]});
    points.push({coord1: vec3.create([-2, 0, 0]), movable: "line", vector:[1,0,0]});
    points.push({coord1: vec3.create([3, 0, 0]), movable: "line", vector:[1,0,0]});
}
var meshPlane = {}, meshRadar = {};
function initDescr() {
    var descr = "Плоскость $\\pi$, образованная двумя лучами $MK$ и $NK$ радиолокаторов, одновременно сопровождающих один воздушный объект.\
    Если ввести на плоскости прямоугольный декартов базис $\\vec i, \\vec j, \\vec k$, так что векторы $\\vec i, \\vec j$ принадлежат плоскости $\\pi$,\
    то всякая точка $K$ на плоскости $\\pi$ будет иметь координаты $K(x,y)$ и уравнение всякой прямой на плоскости $\\pi$ будет иметь вид $Ax+By+C=0$.";
    var textInputSize = 4;
    descr += "<p>$MK$: A<input type='text' id='A1' size='"+textInputSize+"'> B<input type='text' id='B1' size='"+textInputSize+"'> C<input type='text' id='C1' size='"+textInputSize+"'></p>";
    descr += "<p>$NK$: A<input type='text' id='A2' size='"+textInputSize+"'> B<input type='text' id='B2' size='"+textInputSize+"'> C<input type='text' id='C2' size='"+textInputSize+"'></p>";
    $("#description").html(descr);
    $("#A1").change(function(event){A1 = parseFloat(this.value);initBuffers();});
    $("#B1").change(function(event){B1 = parseFloat(this.value);initBuffers();});
    $("#C1").change(function(event){C1 = parseFloat(this.value);initBuffers();});
    $("#A2").change(function(event){A2 = parseFloat(this.value);initBuffers();});
    $("#B2").change(function(event){B2 = parseFloat(this.value);initBuffers();});
    $("#C2").change(function(event){C2 = parseFloat(this.value);initBuffers();});
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

    centerTranslate[1] = -1.8;
}
var te1 = katex.renderToString("\\vec i");
var te2 = katex.renderToString("\\vec j");
var te3 = katex.renderToString("\\vec k");
var te4 = katex.renderToString("\\pi");
var te5 = katex.renderToString("M");
var te6 = katex.renderToString("N");
var te7 = katex.renderToString("K");

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
var A1 = 1, B1 = -1, C1 = 2;
var A2 = 1, B2 = 0.5, C2 = -5;
function initData() {
    isOrtho = false;
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, offset:true, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[0].coord1) {
            var normlen1 = Math.sqrt(A1*A1+B1*B1);
            var v1 = [];
            vec3.subtract(points[0].coord1,points[1].coord1,v1);
            vec3.normalize(v1);
            vec3.scale(v1,normlen1);
            A1 = v1[1];
            B1 = -v1[0];
            C1 = -points[1].coord1[0]*A1;

            var normlen2 = Math.sqrt(A2*A2+B2*B2);
            var v2 = [];
            vec3.subtract(points[0].coord1,points[2].coord1,v2);
            vec3.normalize(v2);
            vec3.scale(v2,normlen2);
            A2 = v2[1];
            B2 = -v2[0];
            C2 = -points[2].coord1[0]*A2;
        }
        if (arrPoint == points[1].coord1) {
            var normlen1 = Math.sqrt(A1*A1+B1*B1);
            var v1 = [];
            vec3.subtract(points[0].coord1,points[1].coord1,v1);
            vec3.normalize(v1);
            vec3.scale(v1,normlen1);
            A1 = v1[1];
            B1 = -v1[0];
            C1 = -points[1].coord1[0]*A1;
        }
        if (arrPoint == points[2].coord1) {
            var normlen2 = Math.sqrt(A2*A2+B2*B2);
            var v2 = [];
            vec3.subtract(points[0].coord1,points[2].coord1,v2);
            vec3.normalize(v2);
            vec3.scale(v2,normlen2);
            A2 = v2[1];
            B2 = -v2[0];
            C2 = -points[2].coord1[0]*A2;
        }
    }
    $("#A1").val(parseFloat(A1.toPrecision(3)));
    $("#B1").val(parseFloat(B1.toPrecision(3)));
    $("#C1").val(parseFloat(C1.toPrecision(3)));
    $("#A2").val(parseFloat(A2.toPrecision(3)));
    $("#B2").val(parseFloat(B2.toPrecision(3)));
    $("#C2").val(parseFloat(C2.toPrecision(3)));

    points[1].coord1[0] = -C1/A1;
    points[1].coord1[1] = 0;
    points[1].coord1[2] = 0;

    points[2].coord1[0] = -C2/A2;
    points[2].coord1[1] = 0;
    points[2].coord1[2] = 0;

    var det = A1*B2-A2*B1;
    var det1 = C1*B2-C2*B1;
    var det2 = A1*C2-A2*C1;

    points[0].coord1[0] = -det1/det;
    points[0].coord1[1] = -det2/det;
    points[0].coord1[2] = 0;


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
            scale:0.6,
            centerTranslate:[0,0,0],
            color:[0.8,0.5,0.0,1.0]
        });
    }
    // var initAngle = 90;
    var initAngle = 0;
    if (meshRadar.isready)
    {
        let vertexCoords = meshRadar.vertexCoords;
        let normalCoords = meshRadar.normalCoords;
        let vertexIndices = meshRadar.vertexIndices;

        meshes.push({
            vertices:vertexCoords,
            normals:normalCoords,
            indices:vertexIndices,
            rotateY:findRotateY(points[1].coord1, points[0].coord1)+initAngle,
            translate:points[1].coord1,
            centerTranslate:[0,-1.2*1.001,0],
            color:[0.0,1.0,0.0,1.0]
        });
        meshes.push({
            vertices:vertexCoords,
            normals:normalCoords,
            indices:vertexIndices,
            rotateY:findRotateY(points[2].coord1, points[0].coord1)+initAngle,
            translate:points[2].coord1,
            centerTranslate:[0,-1.2*1.001,0],
            color:[0.3,0.3,1.0,1.0]
        });
    }

    primitives.push({class:"point", text: te7, arr0:points[0].coord1, offset:true, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: te5, arr0:points[1].coord1, offset:true, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: te6, arr0:points[2].coord1, offset:true, rad:4, color:[1.0, 0.0, 0.0, 1.0]});

    var arrlen = 1;
    // var center = vec3.create(points[1].coord1);
    // vec3.add(center,points[2].coord1);
    // vec3.scale(center,0.5);
    var center = vec3.create([0,0,0]);
    primitives.push({class:"arrow", text: "", arr0:center, arr1:[center[0]+arrlen,center[1],center[2]], offset:true, rad:1.5, color:[0.3, 0.3, 0.3, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:center, arr1:[center[0],center[1]+arrlen,center[2]], offset:true, rad:1.5, color:[0.3, 0.3, 0.3, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:center, arr1:[center[0],center[1],center[2]+arrlen], offset:true, rad:1.5, color:[0.3, 0.3, 0.3, 1.0]});
    primitives.push({class:"text", text: te1, arr0:[center[0]+arrlen,center[1],center[2]]});
    primitives.push({class:"text", text: te2, arr0:[center[0],center[1]+arrlen,center[2]]});
    primitives.push({class:"text", text: te3, arr0:[center[0],center[1],center[2]+arrlen]});

    // primitives.push({class:"arrow", text: "", arr0:points[1].coord1, arr1:points[2].coord1, rad:2, color:[0.8, 0.0, 0.0, 1.0]});
    var p1 = [], p2 = [];
    createLine(points[1].coord1,points[0].coord1,p1,p2)
    primitives.push({class:"line", text: "", arr0:points[1].coord1, arr1:p2, rad:1.5, offset:true, color:[0.0, 1.0, 0.5, 1.0]});
    var p1 = [], p2 = [];
    createLine(points[2].coord1,points[0].coord1,p1,p2)
    primitives.push({class:"line", text: "", arr0:points[2].coord1, arr1:p2, rad:1.5, offset:true, color:[0.0, 0.5, 1.0, 1.0]});
    var pz = -1.2;
    var plen = 7;
    primitives.push({class:"plane", text: "", arr0:[-plen,pz,-plen], arr1:[plen,pz,-plen], arr2:[plen,pz,plen], arr3:[-plen,pz,plen], color:[0.5, 0.5, 0.5, 0.4]});
    // primitives.push({class:"plane", text: te4, arr0:points[2].coord1, arr1:points[0].coord1, arr2:points[0].coord1, arr3:points[1].coord1, color:[0.5, 0.5, 0.0, 0.6]});
    primitives.push({class:"triangle", text: te4, arr0:points[0].coord1, arr1:points[1].coord1, arr2:points[2].coord1, color:[0.7, 0.7, 0.0, 0.3]});
}
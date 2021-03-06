var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-2, 1.2, -1]), movable: "free"});
    points.push({coord1: vec3.create([0.5, 1, 1]), movable: "free"});
    points.push({coord1: vec3.create([5, 1, 1]), movable: "fixed"});
    points.push({coord1: vec3.create([-3, -1.8, 0]), movable: "plane", vector:[0,1,0]});
}
var meshPlane = {}, meshRadar = {};
function initDescr() {
    var descr = "<p>Прогнозирование координат самолёта по 2-м точкам.</p>\
     <p>РЛС определяет координаты самолёта в т.$M_1$ и т.$M_2$ в моменты времени $t_1$ и $t_2$. Предпологается, что самолёт летит прямолинейно с постоянной скоростью.\
     Необходимо спрогнозировать координаты самолёта в т.$M$ в момент времени $t>t_2>t_1$.<br>\
     т.$M_2$ делит отрезок $M_1M$ в соотношении $$\\alpha=\\frac{|M_1M_2|}{|M_2M|},$$ следовательно $$\\overrightarrow{M_2M}=\\frac{1}{\\alpha}\\overrightarrow{M_1M_2}$$\
     Записав это соотношение в проекциях на оси координат, получаем $$\\begin{matrix} x-x_2=\\frac{1}{\\alpha}(x_1-x_2) \\\\ y-y_2=\\frac{1}{\\alpha}(y_1-y_2) \\\\ z-z_2=\\frac{1}{\\alpha}(z_1-z_2) \\end{matrix}$$\
     Зная координаты $(x_1,y_1,z_1)$ самолёта в момент времени $t_1$ и $(x_2,y_2,z_2)$ самолёта в момент времени $t_2$\
     по этим формулам находим координаты $(x,y,z)$ в момент времени $t$.</p>\
     <p>$\\alpha$ = <input type='text' value='0.5' size='3' onchange='alpha=this.value; initBuffers();'></p>";
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
var te7 = katex.renderToString("M");
var te8 = katex.renderToString("t_1");
var te9 = katex.renderToString("t_2");
var te10 = katex.renderToString("t");

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

function findRotateYZ(p1,p2) {
    let vec_a0 = vec3.create();
    vec3.subtract(p2,p1,vec_a0);
    vec3.normalize(vec_a0);

    let vec_aY = vec3.create(vec_a0);
    vec_aY[1] = 0;
    vec3.normalize(vec_aY);
    let cosa = vec_aY[0];
    let cosb = vec_aY[2];
    let alpha = Math.acos(cosa)/Math.PI*180;
    if (cosb>0) {alpha *= -1;}

    cosa = vec_aY[0]*vec_a0[0]+vec_aY[2]*vec_a0[2];
    cosb = vec_a0[1];
    let beta = Math.acos(cosa)/Math.PI*180;
    if (cosb<0) {beta *= -1;}
    return [alpha,beta];
}
var alpha = 0.5;
function initData() {
    isOrtho = false;
    isShowAxes = false;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, offset:true, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }

    let vec_a = vec3.create(points[1].coord1);
    vec3.subtract(vec_a,points[0].coord1);
    vec3.scale(vec_a, 1.0/alpha);
    vec3.add(vec_a, points[1].coord1, points[2].coord1);

    if (meshPlane.isready)
    {
        let vertexCoords = meshPlane.vertexCoords;
        let normalCoords = meshPlane.normalCoords;
        let vertexIndices = meshPlane.vertexIndices;
        let ang = findRotateYZ(points[0].coord1, points[1].coord1);
        meshes.push({
            vertices:vertexCoords,
            normals:normalCoords,
            indices:vertexIndices,
            translate:points[0].coord1,
            rotateY:ang[0],
            rotateZ:ang[1],
            scale:0.6,
            centerTranslate:[0,0,0],
            color:[0.8,0.5,0.0,1.0]
        });
        meshes.push({
            vertices:vertexCoords,
            normals:normalCoords,
            indices:vertexIndices,
            translate:points[1].coord1,
            rotateY:ang[0],
            rotateZ:ang[1],
            scale:0.6,
            centerTranslate:[0,0,0],
            color:[0.8,0.5,0.0,1.0]
        });
        meshes.push({
            vertices:vertexCoords,
            normals:normalCoords,
            indices:vertexIndices,
            translate:points[2].coord1,
            rotateY:ang[0],
            rotateZ:ang[1],
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

        meshes.push({
            vertices:vertexCoords,
            normals:normalCoords,
            indices:vertexIndices,
            rotateY:findRotateY(points[3].coord1, points[1].coord1),
            translate:points[3].coord1,
            centerTranslate:[0,-1.2*1.001,0],
            color:[0.0,1.0,0.0,1.0]
        });
    }

    primitives.push({class:"point", text: te5, pos: "lt", arr0:points[0].coord1, offset:true, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: te6, pos: "lt", arr0:points[1].coord1, offset:true, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: te7, pos: "lt", arr0:points[2].coord1, offset:true, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"text", text: te8, pos: "rb", arr0:points[0].coord1});
    primitives.push({class:"text", text: te9, pos: "rb", arr0:points[1].coord1});
    primitives.push({class:"text", text: te10, pos: "rb", arr0:points[2].coord1});

    primitives.push({class:"point", text: "", arr0:points[3].coord1, offset:true, offset:true, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    var arrlen = 1;
    var center = points[3].coord1;
    primitives.push({class:"arrow", text: "", arr0:center, arr1:[center[0]+arrlen,center[1],center[2]], offset:true, rad:1.5, color:[0.3, 0.3, 0.3, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:center, arr1:[center[0],center[1]+arrlen,center[2]], offset:true, rad:1.5, color:[0.3, 0.3, 0.3, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:center, arr1:[center[0],center[1],center[2]+arrlen], offset:true, rad:1.5, color:[0.3, 0.3, 0.3, 1.0]});
    primitives.push({class:"text", text: te1, arr0:center, pos:'rt'});
    primitives.push({class:"text", text: te2, arr0:[center[0]+arrlen,center[1],center[2]]});
    primitives.push({class:"text", text: te3, arr0:[center[0],center[1]+arrlen,center[2]]});
    primitives.push({class:"text", text: te4, arr0:[center[0],center[1],center[2]+arrlen]});

    primitives.push({class:"arrow", text: "", arr0:points[3].coord1, arr1:points[0].coord1, offset:true, rad:2, color:[0.0, 1.0, 0.5, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:points[3].coord1, arr1:points[1].coord1, offset:true, rad:2, color:[0.0, 1.0, 0.5, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:points[3].coord1, arr1:points[2].coord1, offset:true, rad:2, color:[0.0, 0.5, 1.0, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:points[0].coord1, arr1:points[1].coord1, offset:true, rad:1.5, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:points[1].coord1, arr1:points[2].coord1, offset:true, rad:1.5, color:[1.0, 0.0, 0.0, 1.0]});
    var plen = 5;
    var pz = -3;
    primitives.push({class:"plane", text: "", arr0:[-plen,pz,-plen], arr1:[plen,pz,-plen], arr2:[plen,pz,plen], arr3:[-plen,pz,plen], color:[0.5, 0.5, 0.5, 0.4]});
}
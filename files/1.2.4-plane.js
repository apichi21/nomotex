var dimention="3d";
function initPoints() {
    points = [];
}
var meshPlane = {};
function initDescr() {
    var descr = "";
    descr += 'Силы, действующие на ЛА:</br>';
    descr += ' - $\\vec P$ - сила тяги</br>';
    descr += ' - $\\vec G$ - сила тяжести</br>';
    descr += ' - $\\vec R_\\text{а}$ - сила аэродинамического сопротивления</br>';
    descr += 'Вектор суммарных сил, действующих на ЛА:';
    descr += '$$\\begin{split}\\vec F=\\left(\\vec P+\\vec G\\right)+\\vec R_\\text{а}=\\\\=\\vec P+\\left(\\vec G+\\vec R_\\text{а}\\right)\\end{split}$$</br>';
    $("#description").html(descr);
    $("Title").html("Технические примеры");

    loadSTL("boying.stl", meshPlane);
    rotAngY = 325.0;
    rotAngX = 15.0;
    rotAngZ = 15.0;
    scaleFactor = 0.06;
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
    var vectorG0 = [0.0, -20.0, 0.0];
    var vectorAngG0 = [];
    var angle = rotAngZ/180.0*Math.PI;
    vectorAngG0[0] = vectorG0[1]*Math.sin(angle);
    vectorAngG0[1] = vectorG0[1]*Math.cos(angle);
    vectorAngG0[2] = vectorG0[2];
    var vectorR0 = [-20.0, 25.0, 5.0];
    var vectorP = [];
    var vectorG = [];
    var vectorR = [];

    vec3.add(vectorP0,center,vectorP);
    vec3.add(vectorAngG0,center,vectorG);
    vec3.add(vectorR0,center,vectorR);

    var sumPG0 = [];
    var sumPG = [];
    vec3.add(vectorP0,vectorAngG0,sumPG0);
    vec3.add(sumPG0,center,sumPG);

    var sumGR0 = [];
    var sumGR= [];
    vec3.add(vectorAngG0,vectorR0,sumGR0);
    vec3.add(sumGR0,center,sumGR);

    var sumPGR0 = [];
    var sumPGR = [];
    vec3.add(sumPG0,vectorR0,sumPGR0);
    vec3.add(sumPGR0,center,sumPGR);

    var RRad = 3;
    var projRad = 2;
    var angRad = 1.5;
    var GRad = 3;

    var RColor = [0.8, 0.2, 0.8, 1.0];
    var GColor = [0.8, 0.8, 0.2, 1.0];
    var GYColor = [0.6, 1.0, 0.0, 1.0];
    var GXColor =  [1.0, 0.6, 0.0, 1.0];
    var angColor = [0.0, 1.0, 0.0, 1.0];
    var RXColor = [1.0, 0.2, 0.2, 1.0];
    var RYColor = [0.2, 1.0, 0.2, 1.0];
    var RZColor = [0.2, 0.2, 1.0, 1.0];

    primitives.push({class:"arrow", offset:true, text: katex.renderToString("\\vec P"), arr0:center, arr1:vectorP, rad:GRad, color:RXColor});
    primitives.push({class:"arrow", offset:true, text: katex.renderToString("\\vec G"), arr0:center, arr1:vectorG, rad:GRad, color:GColor});
    primitives.push({class:"arrow", offset:true, text: katex.renderToString("\\vec R_\\text{а}"), arr0:center, arr1:vectorR, rad:RRad, color:RColor});

    primitives.push({class:"dashline", offset:true, text: "", arr0:vectorG, arr1:sumPG, rad:projRad, color:GColor});
    primitives.push({class:"dashline", offset:true, text: "", arr0:vectorP, arr1:sumPG, rad:projRad, color:RXColor});
    primitives.push({class:"arrow", offset:true, text: katex.renderToString("\\vec P+\\vec G"), arr0:center, arr1:sumPG, rad:GRad, color:RYColor});
    primitives.push({class:"dashline", offset:true, text: "", arr0:sumPG, arr1:sumPGR, rad:projRad, color:RColor});
    primitives.push({class:"dashline", offset:true, text: "", arr0:vectorR, arr1:sumPGR, rad:projRad, color:RYColor});
    primitives.push({class:"arrow", offset:true, text: katex.renderToString("\\vec F"), arr0:center, arr1:sumPGR, rad:GRad, color:RZColor});


    primitives.push({class:"dashline", offset:true, text: "", arr0:vectorR, arr1:sumGR, rad:projRad, color:GColor});
    primitives.push({class:"dashline", offset:true, text: "", arr0:vectorG, arr1:sumGR, rad:projRad, color:RColor});
    primitives.push({class:"arrow", offset:true, text: katex.renderToString("\\vec G+\\vec R_\\text{а}"), arr0:center, arr1:sumGR, rad:GRad, color:GXColor});
    primitives.push({class:"dashline", offset:true, text: "", arr0:sumGR, arr1:sumPGR, rad:projRad, color:RXColor});
    primitives.push({class:"dashline", offset:true, text: "", arr0:vectorP, arr1:sumPGR, rad:projRad, color:GXColor});
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
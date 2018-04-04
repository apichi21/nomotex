var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([1,0,0]), movable: "line", vector: vec3.create([1,0,0])});
    points.push({coord1: vec3.create(), movable: "free"});
    points.push({coord1: vec3.create(), movable: "free"});
    points.push({coord1: vec3.create(), movable: "free"});
    points.push({coord1: vec3.create(), movable: "free"});
}
function initDescr() {
    var descr = '<p>Все лучи, выходящие из фокуса $F$, отражаясь от внутренней поверхности параболы, распространяются параллельно одной и той же прямой - оси параболы Ox.</p>';
    descr += '<label><input type="checkbox" checked onchange="isShowM[0] = this.checked; initBuffers();"> т. $M_1$</label>';
    descr += '<label><input type="checkbox" checked onchange="isShowM[1] = this.checked; initBuffers();"> т. $M_2$</label>';
    descr += '<label><input type="checkbox" checked onchange="isShowM[2] = this.checked; initBuffers();"> т. $M_3$</label>';
    descr += '<label><input type="checkbox" checked onchange="isShowM[3] = this.checked; initBuffers();"> т. $M_4$</label>';
    descr += '<p>Передний фронт всех отражённых лучей представляет собой прямую $l\'$ (в пространстве - плоскость), ортогональную к оси параболы $Ox\'$</p>';
    descr += '<label><input type="checkbox" checked onchange="isShowL = this.checked; initBuffers();"> Прямая $l\'$</label>';
    descr += '<label><input type="checkbox" checked onchange="isShowD = this.checked; initBuffers();"> Директриса</label>';
    descr += '<p>Действительно, в силу директориального свойства параболы, для каждого луча $FM_1$, $FM_2$ и др. расстояние \
              от фокуса $F$ до параболы равно соответствующему расстоянию от директрисы до параболы, т.е.\
              $$|B_1M_1|=|FM_1|,\\quad|B_2M_2|=|FM_2|$$ \
              Поскольку расстояния $S$ от директрисы до прямой $l\'$ равны для всех точек $M$, распространяющихся левее $l\'$, \
              то $$|FM_1|+|M_1N_1|=|B_1M_1|+|M_1N_1|=S\\\\|FM_2|+|M_2N_2|=|B_2M_2|+|M_2N_2|=S$$ \
              т.е. длины всех составных лучей (прямых и отражённых), выходящих из фокуса, равны. Следовательно в один и тот же \
              момент времени, все отражённые лучи собираются на одной прямой $l\'.$</p>';


    descr += '<label><input type="checkbox" onchange="changeAnimate(this.checked);"> Анимация</label>';
    $("#description").html(descr);
    $("Title").html("Кривые и поверхности второго порядка");
}
var planeTimer;
var animStep = 0.1;
var arrowLength = 2;
var timeParam = -arrowLength;
var maxTimeParam = 9;
function changeAnimate(anim) {
    isAnimate = anim;

    if (anim) {
        planeTimer = setInterval(function () {
            if (timeParam + animStep < maxTimeParam) {
                timeParam += animStep;
            } else {
                timeParam = -arrowLength;
            }
            initBuffers();
        }, 20);
    } else {
        clearInterval(planeTimer);
        initBuffers();
    }
}
var isShowL = true;
var isShowD = true;
var isShowM = [true, true, true, true];
var paramOfPoint = [4, 1.5, -1, -3];
function initData() {
    var arrRad = 2;
    var lineRad = 1;
    var pointRad = 4;
    var chosenPointRad = 5;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad+2, color:[1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[0].coord1) {
            if (points[0].coord1[0] < 0.001) {
                points[0].coord1[0] = 0.001;
            }
        }
        for (var i = 0; i < 4; i++) {
            if (arrPoint == points[1+i].coord1) {
                paramOfPoint[i] = points[1+i].coord1[1];
            }
        }
    }
    var p = points[0].coord1[0]*2;
    // $("#p").val(parseFloat(p.toPrecision(3)));

    let slices = 160;
    let vertices = [];
    var maxLen0 = 9;
    var maxLen = maxLen0;
    if (maxLen*maxLen/2/Math.abs(p) > maxLen) {
        maxLen = Math.sqrt(maxLen*2*Math.abs(p));
    }
    maxTimeParam = maxLen*maxLen/2/p + p/2 - arrowLength;
    for (var i = 0; i <= slices; i++) {
        var psi = (i/slices-0.5)*maxLen*2;
        vertices.push( [psi*psi/2/p,psi,0.0] );
    }
    for (var i = 0; i < vertices.length-1; i++) {
        primitives.push({class:"line", text: "", arr0:vertices[i], arr1:vertices[i+1], rad:arrRad, color:[0.0, 0.0, 1.0, 1.0]});
    }

    var focus = [p/2,0,0];

    for (var i = 0; i < 4; i++) {
        if (isShowM[i]) {
            var arrowColor, arcColor;
            switch (i) {
              case 0:
                arrowColor = [0.0, 0.9, 0.5, 1.0];
                arcColor = [0.0, 0.8, 0.4, 1.0];
                break;
              case 1:
                arrowColor = [0.9, 0.5, 0.0, 1.0];
                arcColor = [0.8, 0.4, 0.0, 1.0];
                break;
              case 2:
                arrowColor = [0.5, 0.9, 0.0, 1.0];
                arcColor = [0.4, 0.8, 0.0, 1.0];
                break;
              case 3:
                arrowColor = [0.9, 0.0, 0.5, 1.0];
                arcColor = [0.8, 0.0, 0.4, 1.0];
                break;
            }
            vec3.set([paramOfPoint[i]*paramOfPoint[i]/2/p,paramOfPoint[i],0.0],points[1+i].coord1);

            var v1 = [];
            vec3.subtract([p/2,0,0], points[1+i].coord1, v1);
            vec3.normalize(v1);
            var v2 = [1, 0, 0];

            primitives.push({class:"point", text: katex.renderToString('M_'+(i+1)), pos: points[1+i].coord1[1]>0?'rb':'rt', arr0:points[1+i].coord1, rad:pointRad, color:[0.0, 0.5, 0.8, 1.0]});
            if (isShowD) {
                primitives.push({class:"point", text: katex.renderToString('B_'+(i+1)), pos: 'rb', arr0:[-p/2,points[1+i].coord1[1],0], rad:pointRad, color:[0.0, 0.6, 0.0, 1.0]});
                primitives.push({class:"dashline", text: "", arr0:points[1+i].coord1, arr1:[-p/2,points[1+i].coord1[1],0], rad:lineRad, color:arrowColor});
            }
            if (isShowL) {
                if (timeParam+arrowLength > p/2) {
                    var coordLx = timeParam+arrowLength-p/2;
                    var coordLy = Math.sqrt(coordLx*2*p);
                    if (Math.abs(points[1+i].coord1[1]) < coordLy) {
                        primitives.push({class:"point", text: katex.renderToString('N_'+(i+1)), arr0:[coordLx,points[1+i].coord1[1],0], rad:pointRad, color:arcColor});
                    }
                    if (i==0) {
                        primitives.push({class:"line", text: katex.renderToString("l'"), ratio: 0.5, arr0:[coordLx,-coordLy,0], arr1:[coordLx,coordLy,0], rad:1.5, color:[1,0,0,1]});
                    }
                }
            }
            var vsum12 = [];
            vec3.add(v1, v2, vsum12);
            vec3.normalize(vsum12);

            var vTangent1 = [-vsum12[1]*2, vsum12[0]*2, 0];
            var vTangent2 = [vsum12[1]*2, -vsum12[0]*2, 0];
            var pTangent1 = [];
            var pTangent2 = [];
            vec3.add(points[1+i].coord1, vTangent1, pTangent1);
            vec3.add(points[1+i].coord1, vTangent2, pTangent2);

            primitives.push({class:"line", text: "", arr0:pTangent1, arr1:pTangent2, rad:lineRad*1.2, color:[0.0, 0.8, 0.0, 1.0]});

            var arrEnd = maxLen*maxLen/2/p;
            if (arrEnd < points[1+i].coord1[0]+2) arrEnd = points[1+i].coord1[0]+2;
            var arrEndPoint = [arrEnd, points[1+i].coord1[1], 0];
            primitives.push({class:"arrow", text: "", arr0:focus, arr1:points[1+i].coord1, rad:arrRad, color:arrowColor});
            primitives.push({class:"arrow", text: "", arr0:points[1+i].coord1, arr1:arrEndPoint, rad:arrRad, color:arrowColor});

            var firstArrVec = [];
            var dynamicArr1 = [];
            var arr1Mode;
            var dynamicArr2 = [];
            var arr2Mode;
            vec3.subtract(points[1+i].coord1, focus, firstArrVec);
            var firstArrLen = vec3.length(firstArrVec);
            arr1Mode = timeParam < firstArrLen;
            if (timeParam < 0) {
                vec3.set(focus, dynamicArr1);
            } else if (arr1Mode) {
                vec3.scale(firstArrVec, timeParam/firstArrLen, dynamicArr1);
                vec3.add(dynamicArr1, focus);
            } else {
                vec3.set([points[1+i].coord1[0] + timeParam-firstArrLen, points[1+i].coord1[1], 0], dynamicArr1);
            }
            arr2Mode = timeParam+arrowLength < firstArrLen;
            if (arr2Mode) {
                vec3.scale(firstArrVec, (timeParam+arrowLength)/firstArrLen, dynamicArr2);
                vec3.add(dynamicArr2, focus);
            } else {
                vec3.set([points[1+i].coord1[0] + timeParam+arrowLength-firstArrLen, points[1+i].coord1[1], 0], dynamicArr2);
            }
            var beamColor = [0.2,0.5,1,1];
            if (arr1Mode == arr2Mode) {
                primitives.push({class:"line", text: "", arr0:dynamicArr1, arr1:dynamicArr2, rad:3, color:beamColor});
            } else {
                primitives.push({class:"line", text: "", arr0:dynamicArr1, arr1:points[1+i].coord1, rad:3, color:beamColor});
                primitives.push({class:"line", text: "", arr0:points[1+i].coord1, arr1:dynamicArr2, rad:3, color:beamColor});
            }
            // primitives.push({class:"point", text: "", arr0:dynamicArr1, rad:4, color:[0,0,0,1]});
            // primitives.push({class:"point", text: "", arr0:dynamicArr2, rad:4, color:[0,0,0,1]});
            if (vec3.dot(vTangent1, v1) >= 0) {
                primitives.push({class:"arc", text: "", arr0:points[1+i].coord1, arr1:focus, arr2:pTangent1, rad:lineRad, Rad:0.48, color:arcColor});
                primitives.push({class:"arc", text: "", arr0:points[1+i].coord1, arr1:arrEndPoint, arr2:pTangent2, rad:lineRad, Rad:0.52, color:arcColor});
            } else {
                primitives.push({class:"arc", text: "", arr0:points[1+i].coord1, arr1:focus, arr2:pTangent2, rad:lineRad, Rad:0.48, color:arcColor});
                primitives.push({class:"arc", text: "", arr0:points[1+i].coord1, arr1:arrEndPoint, arr2:pTangent1, rad:lineRad, Rad:0.52, color:arcColor});
            }
        }
    }
    if (isShowD) {
        primitives.push({class:"line", text: "", ratio: 0.65, arr0:[-p/2,-maxLen0,0], arr1:[-p/2,maxLen0,0], rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
    }
    primitives.push({class:"point", text: katex.renderToString("F"), arr0:[p/2,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
}
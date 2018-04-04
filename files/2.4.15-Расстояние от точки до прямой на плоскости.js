var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([4,1,0]), movable: "free"});
    points.push({coord1: vec3.create([-2,-2,0]), movable: "free"});
    points.push({coord1: vec3.create([-3,3,0]), movable: "free"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    lines = [];
    lines.push({coord1: 2, coord2: 3, measure: true});
}
function initDescr() {
    var descr = "";
    descr += "<p>Прямая $l$ задана общим уравнением $Ax+By+C=0$, $M_0(x_0,y_0)$ – произвольная точка плоскости. Для любой точки $М_1(x_1, y_1)$, лежащей на прямой, расстояние $d$ от точки $M_0$ до прямой $l$ равно абсолютной величине проекции вектора $\\overrightarrow {M_1M_0}$ на нормальный вектор $\\vec N(A,B)$.</p>";
    descr += "<p>$d=\\left|\\frac{Ax_0+By_0+C}{\\sqrt{A^2+B^2}}\\right|$</p>";
    $("#description").html(descr); 
    $("Title").html("Расстояние от точки до прямой на плоскости");

}
function initData() {
    var pointRad = 4;
    var chosenPointRad = 6;
    var lineRad = 2;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }

    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    var p11 = points[0].coord1;
    var p12 = points[1].coord1;
    var leftPoint = [];
    var rightPoint = [];
    createLine(points[0].coord1,points[1].coord1,leftPoint,rightPoint,10);
    primitives.push({class:"line", text: katex.renderToString("l"), arr0:leftPoint, arr1:rightPoint, rad:lineRad, color:[0.0, 0.6, 1.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("M_1"), arr0:p11, rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:p12, rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("M_0"), arr0:points[2].coord1, rad:6, color:[1.0, 0.6, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:p11, arr1:points[2].coord1, rad:lineRad, color:[0.6, 1.0, 0.0, 1.0]});

    var dist = distToLine(points[2].coord1, points[0].coord1, points[1].coord1, points[3].coord1);
    vec3.add(points[3].coord1,points[2].coord1);

    var N = [];
    var N1 = [];
    vec3.subtract(points[2].coord1, points[3].coord1, N);
    vec3.set([points[1].coord1[1]-points[0].coord1[1], -points[1].coord1[0]+points[0].coord1[0], 0], N1);
    vec3.normalize(N1);
    vec3.scale(N1,5.5);
    vec3.add(N1, p11);
    vec3.add(N, p11);
    primitives.push({class:"line", text: "d", arr0:p11, arr1:N, rad:1.5, color:[0.0, 0.8, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:p11, arr1:N1, rad:lineRad, color:[0.6, 1.0, 0.0, 1.0]});
    primitives.push({class:"text", text: katex.renderToString("\\vec N"), arr0:N1});
    primitives.push({class:"dashline", text: "", arr0:points[2].coord1, arr1:N, rad:1, color:[0.0, 0.8, 0.0, 1.0]});
    primitives.push({class:"dashline", text: "d", arr0:points[2].coord1, arr1:points[3].coord1, rad:lineRad, color:[0.0, 0.8, 0.0, 1.0]});
}
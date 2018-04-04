var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-2,-2,0]), movable: "free"});
    points.push({coord1: vec3.create([1,3,0]), movable: "free"});
}
function initDescr() {
    $("#description").html("Углом наклона прямой называется любой направленный угол $\\alpha$, на который надо повернуть ось Ох, чтобы получить одно из направлений прямой.");
    $("Title").html("Угол наклона прямой");
}
var C1 = 0;
var C2 = 0;
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    var point0 = vec3.create([0,0,0]);

    primitives.push({class:"point", text: "", arr0:points[0].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});

    var point1 = vec3.create([0,0,0]);
    vec3.subtract(points[1].coord1, points[0].coord1, point1);

    if (point1[0]<0) {vec3.scale(point1,-1);}
    primitives.push({class:"arc", text: katex.renderToString("\\alpha"), arr0:point0, arr1:point1, arr2:[1.0,0.0,0.0], Rad:1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});

    var p11 = [];
    var p12 = [];
    createLine(points[0].coord1, points[1].coord1, p11, p12,10);
    primitives.push({class:"line", text: katex.renderToString("l"), arr0:p11, arr1:p12, rad:2, color:[0.0, 0.0, 1.0, 1.0]});

    var p11 = [];
    var p12 = [];
    createLine(point0, point1, p11, p12);
    primitives.push({class:"dashline", text: "", arr0:p11, arr1:p12, rad:1, color:[0.0, 0.0, 1.0, 1.0]});

    var vec_a = [];
    vec3.subtract(points[0].coord1,point0,vec_a);
    vec3.normalize(vec_a);

    C1 = vec_a[0];
    C2 = vec_a[1];
}
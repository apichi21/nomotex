var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "free"});
    points.push({coord1: vec3.create([1,3,0]), movable: "free"});
    points.push({coord1: vec3.create([5,1,0]), movable: "free"});
    C = 0;
}
function initDescr() {
    $("#description").html("Угол между векторами $\\vec a$ и $\\vec b$");
    $("Title").html("Основные определения");
}
var C = 0;
function initData() {
    isShowAxes = false;
    var arrRad = 2;
    var lineRad = 1;
    var chosenPointRad = 5;

    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[1].coord1, rad:arrRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec b"), arr0:points[0].coord1, arr1:points[2].coord1, rad:arrRad, color:[0.0, 0.0, 1.0, 1.0]});
    var vec_a = [];
    vec3.subtract(points[1].coord1,points[0].coord1,vec_a);
    var vec_b = [];
    vec3.subtract(points[2].coord1,points[0].coord1,vec_b);

    vec3.normalize(vec_a);
    vec3.normalize(vec_b);
    var cosTheta = vec3.dot(vec_a,vec_b);

    C = Math.acos(cosTheta)/Math.PI*180.0;
    primitives.push({class:"arc", text: C.toFixed(0)+"\u00B0", arr0:points[0].coord1, arr1:points[1].coord1, arr2:points[2].coord1, Rad:1, rad:arrRad, color:[0.7, 0.7, 0.0, 1.0]});
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
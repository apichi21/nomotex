var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "free"});
    points.push({coord1: vec3.create([1,3,0]), movable: "free"});
    points.push({coord1: vec3.create([4,1,0]), movable: "free"});
}
function initDescr() {
    var descr = '';
    descr += 'Разностью $\\vec b-\\vec a$ двух векторов $\\vec a$ и $\\vec b$ назовем вектор $\\vec c$, для которого $\\vec a+\\vec c=\\vec b.$';
    $("#description").html(descr);
    $("Title").html("Линейные операции над векторами");
}
var v1 = [];
var v2 = [];
var katveca = katex.renderToString("\\vec a");
var katvecb = katex.renderToString("\\vec b");
var katveccbmina = katex.renderToString("\\vec c=\\vec b-\\vec a");
function initData() {
    isShowAxes = false;
    var arrdiff21 = [];

    var arrRad = 2;
    var lineRad = 1;
    var chosenPointRad = 5;

    primitives.push({class:"arrow", text: katveca, arr0:points[0].coord1, arr1:points[1].coord1, rad:arrRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katvecb, arr0:points[0].coord1, arr1:points[2].coord1, rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katveccbmina, arr0:points[1].coord1, arr1:points[2].coord1, rad:arrRad, color:[0.7, 0.7, 0.0, 1.0]});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
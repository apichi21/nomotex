var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "free"});
    points.push({coord1: vec3.create([1,3,0]), movable: "free"});
    points.push({coord1: vec3.create([-2,0.5,0]), movable: "free"});
}
function initDescr() {
    $("#description").html("Векторы, лежащие на перпендикулярных прямых, называются ортогональными.");
    $("Title").html("Основные определения");
}
function initData() {
    isShowAxes = false;
    var vec_a = [];
    vec3.subtract(points[1].coord1,points[0].coord1,vec_a);

    var vec_b = [-vec_a[1],vec_a[0],0];
    vec3.normalize(vec_b);
    vec3.scale(vec_b, 3);

    vec3.add(vec_b,points[2].coord1);

    var leftPoint = [];
    var rightPoint = [];
    createLine(points[0].coord1,points[1].coord1,leftPoint,rightPoint,10);
    primitives.push({class:"line", text: "", arr0:leftPoint, arr1:rightPoint, rad:1, color:[0.0, 0.5, 0.5, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    var leftPoint = [];
    var rightPoint = [];
    createLine(points[2].coord1,vec_b,leftPoint,rightPoint,10);
    primitives.push({class:"line", text: "", arr0:leftPoint, arr1:rightPoint, rad:1, color:[0.0, 0.0, 0.5, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec b"), arr0:points[2].coord1, arr1:vec_b, rad:2, color:[0.7, 0.8, 0.5, 1.0]});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
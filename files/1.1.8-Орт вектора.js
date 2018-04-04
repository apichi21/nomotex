var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "free"});
    points.push({coord1: vec3.create([4,1,0]), movable: "free"});
    points.push({coord1: vec3.create([-2,1,0]), movable: "free"});
    points.push({coord1: vec3.create([-2,1,0]), movable: "fixed"});
    lines = [];
    lines.push({coord1: 0, coord2: 1, measure: true});
    lines.push({coord1: 2, coord2: 3, measure: true});
}
function initDescr() {
    $("#description").html("Ортом вектора $\\vec a$ называется единичный вектор $\\vec a_0$, сонаправленный с вектором $\\vec a$");
    $("Title").html("Основные определения");
}
function initData() {
    isShowAxes = false;
    var vec_a = [];
    vec3.subtract(points[1].coord1,points[0].coord1,vec_a);
    vec3.normalize(vec_a);

    vec3.add(vec_a,points[2].coord1, points[3].coord1);

    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[2].coord1, rad:2, color:[0.7, 0.7, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a_0"), arr0:points[2].coord1, arr1:points[3].coord1, rad:2, color:[0.7, 0.7, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[0].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
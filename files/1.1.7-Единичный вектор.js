var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "free"});
    points.push({coord1: vec3.create([1/Math.sqrt(10),3/Math.sqrt(10),0]), movable: "free"});
    lines = [];
    lines.push({coord1: 0, coord2: 1, measure: true});
}
function initDescr() {
    $("#description").html("Ортом, или единичным вектором, называется вектор, длина которого равна единице.<br><br>$|\\vec a|=1$");
    $("Title").html("Основные определения");
}
function initData() {
    isShowAxes = false;
    var vec_a = [];
    vec3.subtract(points[1].coord1,points[0].coord1,vec_a);
    vec3.normalize(vec_a);
    if (arrPoint == points[1].coord1) {
        vec3.add(points[0].coord1,vec_a,points[1].coord1);
    } else if (arrPoint == points[0].coord1) {
        vec3.subtract(points[1].coord1,vec_a,points[0].coord1);        
    }
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
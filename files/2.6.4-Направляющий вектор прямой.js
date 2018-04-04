var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([2,1,1]), movable: "free"});
    points.push({coord1: vec3.create([-2,4,3]), movable: "free"});
}
function initDescr() {
    $("#description").html("Ненулевой вектор $\\vec s$, параллельный прямой $l$, называется направляющим вектором прямой $l$.");
    $("Title").html("Направляющий вектор прямой");
}
function initData() {
    var leftPoint = [];
    var rightPoint = [];
    createLine(points[0].coord1,points[1].coord1,leftPoint,rightPoint);

    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    primitives.push({class:"line", text: katex.renderToString("l"), arr0:leftPoint, arr1:rightPoint, rad:2, color:[0.0, 0.0, 1.0, 1.0]}); 

    var vecs = [];
    vec3.subtract(points[1].coord1,points[0].coord1,vecs);
    vec3.normalize(vecs);
    vec3.scale(vecs,3);
    primitives.push({class:"arrow", text: katex.renderToString("\\vec s"), arr0:[0,0,0], arr1:vecs, rad:3, color:[0.0, 1.0, 0.0, 1.0]}); 
    primitives.push({class:"point", text: "", arr0:points[0].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
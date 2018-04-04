var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-2,1,1]), movable: "free"});
    points.push({coord1: vec3.create([2,-2,2]), movable: "free"});
    points.push({coord1: vec3.create([2,2,-2]), movable: "free"});
}
function initDescr() {
    $("#description").html("Вектор, перпендикулярный к плоскости, называется ее <i>нормальным вектором</i>.");
    $("Title").html("Нормальный вектор плоскости");
}
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }

    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    primitives.push({class:"point", text: "", arr0:points[0].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[2].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(points[0].coord1,points[1].coord1,points[2].coord1,planepoint1,planepoint2,planepoint3,planepoint4);

    var vec_a = [];
    vec3.subtract(points[1].coord1,points[0].coord1,vec_a);
    var vec_b = [];
    vec3.subtract(points[2].coord1,points[0].coord1,vec_b);
    var crossab = [];
    vec3.cross(vec_a,vec_b,crossab);
    vec3.scale(crossab,3.0/vec3.length(crossab));
    var center = [];
    vec3.add(planepoint1,planepoint3,center);
    vec3.scale(center,0.5);
    vec3.add(crossab,center);
    primitives.push({class:"arrow", text: katex.renderToString("\\vec N"), arr0:center, arr1:crossab, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"plane", text: "", arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.5, 0.5, 1.0, 0.4]});

}
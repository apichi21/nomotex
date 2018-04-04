var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([2,2,2]), movable: "free"});
}

function initDescr() {
    var descr = "";
    descr += "Вектор $\\vec a$ соединяет начало координат $O$ с точкой $A$ и называется <i>радиус-вектором</i> этой точки.";
    $("#description").html(descr); 

    $("Title").html("Радиус-вектор");
}
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});

    primitives.push({class:"arrow", text: "", arr0:[0,0,0], arr1:[1,0,0], rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:[0,0,0], arr1:[0,1,0], rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:[0,0,0], arr1:[0,0,1], rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"text", text: katex.renderToString("\\vec i"), arr0:[1,0,0]});
    primitives.push({class:"text", text: katex.renderToString("\\vec j"), arr0:[0,1,0]});
    primitives.push({class:"text", text: katex.renderToString("\\vec k"), arr0:[0,0,1]});

    primitives.push({class:"point", text: "A", arr0:points[0].coord1, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:[0,0,0], arr1:points[0].coord1, rad:2, color:[0, 1, 0, 1.0]});
}
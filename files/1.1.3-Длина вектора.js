var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-2, -2, 1]), movable: "free"});
    points.push({coord1: vec3.create([2, 2, -1]), movable: "free"});
    lines = [];
    lines.push({coord1: 0, coord2: 1, measure: true});
}
function initDescr() {
    var descr = "";
    descr += 'Длиной (модулем, абсолютной величиной) вектора называется расстояние между его началом и его концом.';
    $("#description").html(descr); 
    $("Title").html("Основные определения");
}
var veca = katex.renderToString("\\vec a");

function initData() {
    isShowAxes = false;

    var chosenPointRad = 6;
    var lineRad = 2;
    var boxRad = 1;
    var boxColor = [0.7, 0.7, 0.7, 1.0];

    primitives.push({class:"line", text: "", arr0:[-5,-5,-5], arr1:[5,-5,-5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[-5,5,-5], arr1:[5,5,-5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[-5,-5,5], arr1:[5,-5,5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[-5,5,5], arr1:[5,5,5], rad:boxRad, color:boxColor});

    primitives.push({class:"line", text: "", arr0:[-5,-5,-5], arr1:[-5,5,-5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[5,-5,-5], arr1:[5,5,-5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[-5,-5,5], arr1:[-5,5,5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[5,-5,5], arr1:[5,5,5], rad:boxRad, color:boxColor});

    primitives.push({class:"line", text: "", arr0:[-5,-5,-5], arr1:[-5,-5,5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[5,-5,-5], arr1:[5,-5,5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[-5,5,-5], arr1:[-5,5,5], rad:boxRad, color:boxColor});
    primitives.push({class:"line", text: "", arr0:[5,5,-5], arr1:[5,5,5], rad:boxRad, color:boxColor});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }

    var lineColor;
    lineColor = [0.0, 0.6, 1.0, 1.0];
    primitives.push({class:"arrow", text: veca, arr0:points[0].coord1, arr1:points[1].coord1, rad:lineRad, color:lineColor});
}
var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
}
var vecx = [];
function initDescr() {
      $("#conditions").html("Линейная независимость векторов.");
      var algorithm = "<h4>Пример 1</h4>Пространство $V_2$<br>Векторы $\\vec{x}_i$ задаются координатами $(x_{i1},x_{i2})$ в ортонормированном базисе.<br>$$c_1\\vec{x}_1+c_2\\vec{x}_2 \\ne 0, c_1^2+c_2^2 \\ne 0$$<br>Линейно независимые векторы в $V_2$ не коллинеарны.<br>";

    algorithm += '$\\vec x_1$: <input type="text" id="ans11" size=3 onchange="vecx[0][0] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans12" size=3 onchange="vecx[0][1] = parseFloat(this.value);initBuffers();"><br>';
    algorithm += '$\\vec x_2$: <input type="text" id="ans21" size=3 onchange="vecx[1][0] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans22" size=3 onchange="vecx[1][1] = parseFloat(this.value);initBuffers();"><br>';
    // algorithm += '$\\vec x_1$: <input type="text" id="ans1" size=3>;<input type="text" id="ans2" size=3>;<input type="text" id="ans3" size=3><br>';
    $("#algorithm").html(algorithm);
    vecx[0] = [3,1];
    vecx[1] = [1,4];
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
            $("#ans"+(i+1)+(j+1)).val(vecx[i][j].toFixed(0));
        }
    }    

    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Линейная независимость векторов");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

function initData() {
    isShowAxes = false;

    var axeColor = [0.3, 0.3, 0.3, 1.0];
    
    for (var i = 0; i < 2; i++) {
        for (var j = 0; j < 2; j++) {
            points[i+1].coord1[j] = vecx[i][j];
        }
    }

    primitives.push({class:"arrow", text: katex.renderToString("\\vec e_1"), arr0:points[0].coord1, arr1:[1,0,0], rad:1.5, color:axeColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec e_2"), arr0:points[0].coord1, arr1:[0,1,0], rad:1.5, color:axeColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec x_1"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec x_2"), arr0:points[0].coord1, arr1:points[2].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
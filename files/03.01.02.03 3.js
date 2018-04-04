var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
}
var vecx = [];
function initDescr() {
      $("#conditions").html("Линейная независимость векторов.");
      var algorithm = "<h4>Пример 3</h4>Пространство $V_{3L}$ $$\\sum\\limits_{i=1}^{4}{c_i \\vec{x}_i}\\ne 0,\\quad \\sum\\limits_{i=1}^{4}{c_i^2}\\ne 0$$<br>Линейно независимые векторы в $V_{3L}$ могут иметь звенья $\\tilde{\\vec{x}}_i$, лежащие в одной плоскости $\\pi$, но вторые звенья $\\tilde{\\tilde{\\vec{x}}}_i$ образуют линейные комбинации с другими $\\tilde{\\tilde{c}}_i \\ne c_i$ $$ \\sum\\limits_{i=1}^4{c_i \\tilde{\\tilde{\\vec{x}}}_i} = 0 $$";

    algorithm += '$\\vec x_1$: <input type="text" id="ans11" size=3 onchange="vecx[0][0] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans12" size=3 onchange="vecx[0][1] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans13" size=3 onchange="vecx[0][2] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans14" size=3 onchange="vecx[0][3] = parseFloat(this.value);initBuffers();"><br>';
    algorithm += '$\\vec x_2$: <input type="text" id="ans21" size=3 onchange="vecx[1][0] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans22" size=3 onchange="vecx[1][1] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans23" size=3 onchange="vecx[1][2] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans24" size=3 onchange="vecx[1][3] = parseFloat(this.value);initBuffers();"><br>';
    algorithm += '$\\vec x_3$: <input type="text" id="ans31" size=3 onchange="vecx[2][0] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans32" size=3 onchange="vecx[2][1] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans33" size=3 onchange="vecx[2][2] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans34" size=3 onchange="vecx[2][3] = parseFloat(this.value);initBuffers();"><br>';
    algorithm += '$\\vec x_4$: <input type="text" id="ans41" size=3 onchange="vecx[3][0] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans42" size=3 onchange="vecx[3][1] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans43" size=3 onchange="vecx[3][2] = parseFloat(this.value);initBuffers();">;<input type="text" id="ans44" size=3 onchange="vecx[3][3] = parseFloat(this.value);initBuffers();"><br>';
    $("#algorithm").html(algorithm);
    vecx[0] = [3,1,0,-1];
    vecx[1] = [1,4,-2,3];
    vecx[2] = [0,2,3,2];
    vecx[3] = [-1,-2,0,1];
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
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
    
    var vec4d = vec3.create([1,1,1]);
    vec3.normalize(vec4d);

    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            points[i+1].coord1[j] = vecx[i][j];
        }
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 3; j++) {
            points[i+1+4].coord1[j] = vecx[i][j]+vecx[i][3]*vec4d[j];
        }
    }

    primitives.push({class:"arrow", text: katex.renderToString("\\vec e_1"), arr0:points[0].coord1, arr1:[1,0,0], rad:1.5, color:axeColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec e_2"), arr0:points[0].coord1, arr1:[0,1,0], rad:1.5, color:axeColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec e_3"), arr0:points[0].coord1, arr1:[0,0,1], rad:1.5, color:axeColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec e_4"), arr0:points[0].coord1, arr1:vec4d, rad:1.5, color:axeColor});
    primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:points[2].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:points[3].coord1, rad:2, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:points[4].coord1, rad:2, color:[0.8, 0.8, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec x_1"), arr0:points[1].coord1, arr1:points[5].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec x_2"), arr0:points[2].coord1, arr1:points[6].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec x_3"), arr0:points[3].coord1, arr1:points[7].coord1, rad:2, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec x_4"), arr0:points[4].coord1, arr1:points[8].coord1, rad:2, color:[0.8, 0.8, 0.0, 1.0]});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
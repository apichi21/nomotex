var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "free"});
    points.push({coord1: vec3.create([1,3,0]), movable: "free"});
    points.push({coord1: vec3.create([2,1,0]), movable: "free"});
    lines = [];
    lines.push({coord1: 1, coord2: 0, measure: true});
    lines.push({coord1: 0, coord2: 2, measure: true});
    C = 0;
}
function initDescr() {
    var parametershtml = "";
    var textInputSize = 5;
    parametershtml += "$\\vec a \\cdot\\vec b=|\\vec a||\\vec b|\\cos (\\varphi) = $<input type='text' id='C' size='"+textInputSize+"' readonly> <br/>";

    $("#parameters").html(parametershtml);

    $("#C").change(function(event){C = parseFloat($("#C").val());initBuffers();});
    $("#description").html("Скалярным произведением векторов $\\vec a$ и $\\vec b$ называется действительное число, равное произведению длин векторов на косинус угла между ними.");
    $("Title").html("Скалярное произведение двух векторов");
}
var C = 123;
function initData() {
    isShowAxes = false;
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec b"), arr0:points[0].coord1, arr1:points[2].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});

    var vec_a = [];
    vec3.subtract(points[1].coord1,points[0].coord1,vec_a);
    var vec_b = [];
    vec3.subtract(points[2].coord1,points[0].coord1,vec_b);
    C = vec3.dot(vec_a,vec_b);
    var lena = vec3.length(vec_a);
    var lenb = vec3.length(vec_b);
    var angle = Math.acos(C/lena/lenb)/Math.PI*180.0;

    var rad1 = C>lenb ? 0.9 : 1.1;

    var vec_dot = [];
    vec3.scale(vec_b,1/lenb,vec_dot);
    vec3.scale(vec_dot,C);
    vec3.add(vec_dot,points[0].coord1);

    primitives.push({class:"line", text: katex.renderToString("\\vec a \\cdot\\vec b"), arr0:points[0].coord1, arr1:vec_dot, rad:2*rad1, color:[0.7, 0.7, 0.0, 1.0]});

    primitives.push({class:"arc", text: angle.toFixed(0)+"\u00B0", arr0:points[0].coord1, arr1:points[1].coord1, arr2:points[2].coord1, Rad:1.5, rad:1, color:[0.0, 0.0, 1.0, 1.0]});
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
    $("#C").val(C.toPrecision(3));
}
var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([2,0,0]), movable: "line", vector: vec3.create([1,0,0])});
    points.push({coord1: vec3.create([0,2,0]), movable: "fixed", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create([-2,0,0]), movable: "line", vector: vec3.create([1,0,0])});
    points.push({coord1: vec3.create([0,-2,0]), movable: "fixed", vector: vec3.create([0,1,0])});
    points.push({coord1: vec3.create(), movable: "free"});
    // a = Math.abs(points[0].coord1[0]);
    // b = Math.abs(points[1].coord1[1]);
}
function initDescr() {
    var descr = '';
    descr += '<p>$F_1$, $F_2$ - фокусы эллипса.</p>';
    descr += '<p>$|F_1M|+|F_2M|=const$</p>';
    // var tIS = 5;
    // descr += "<p>$a$<input type='text' id='a' size='"+tIS+"'> $b$<input type='text' id='b' size='"+tIS+"'></p>";
    $("#description").html(descr);
    // $("#a").change(function(event){points[0].coord1[0] = Math.abs(parseFloat(this.value));points[2].coord1[0] = -points[0].coord1[0];initBuffers();});
    // $("#b").change(function(event){points[1].coord1[1] = Math.abs(parseFloat(this.value));points[3].coord1[1] = -points[1].coord1[1];initBuffers();});
    $("Title").html("Эллипс");
}
var a;
var b;
var paramOfPoint = Math.PI/4;
function initData() {
    var arrRad = 2;
    var lineRad = 1;
    var pointRad = 4;
    var chosenPointRad = 5;

    var c = Math.abs(points[0].coord1[0]);
    b = Math.abs(points[1].coord1[1]);

    // $("#a").val(parseFloat(a.toPrecision(3)));
    // $("#b").val(parseFloat(b.toPrecision(3)));

    // var c = a>=b?Math.sqrt(a*a-b*b):Math.sqrt(b*b-a*a);
    // var c = a>=b?Math.sqrt(a*a-b*b):Math.sqrt(b*b-a*a);
    a = Math.sqrt(c*c+b*b);
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad+2, color:[1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[0].coord1) points[2].coord1[0] = -points[0].coord1[0];
        if (arrPoint == points[2].coord1) points[0].coord1[0] = -points[2].coord1[0];
        // if (arrPoint == points[1].coord1) points[3].coord1[1] = -points[1].coord1[1];
        // if (arrPoint == points[3].coord1) points[1].coord1[1] = -points[3].coord1[1];
        if (arrPoint == points[4].coord1) {
            var point4vec = vec3.create(points[4].coord1);
            point4vec[0] /= a;
            point4vec[1] /= b;
            vec3.normalize(point4vec);
            paramOfPoint = Math.acos(point4vec[0]);
            if (point4vec[1]<0) paramOfPoint *= -1;
        }
    }

    let slices = 160;
    let vertices = [];
    for (var i = 0; i <= slices; i++) {
        var psi = i*2*Math.PI/slices;
        vertices.push( [a*Math.cos(psi),b*Math.sin(psi),0.0] );
    }
    for (var i = 0; i < vertices.length-1; i++) {
        primitives.push({class:"line", text: "", arr0:vertices[i], arr1:vertices[i+1], rad:arrRad, color:[0.0, 0.0, 1.0, 1.0]});
    }
    vec3.set([a*Math.cos(paramOfPoint),b*Math.sin(paramOfPoint),0.0],points[4].coord1);
    var pointM = points[4].coord1;

    var focus1 = a>=b?[-c,0,0]:[0,-c,0];
    var focus2 = a>=b?[c,0,0]:[0,c,0];

    // primitives.push({class:"line", text: "a", arr0:[0,0,0], arr1:[a,0,0], rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
    // primitives.push({class:"line", text: "b", arr0:[0,0,0], arr1:[0,b,0], rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
    // primitives.push({class:"point", text: katex.renderToString("A_1"), arr0:[-a,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    // primitives.push({class:"point", text: katex.renderToString("A_2"), arr0:[a,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    // primitives.push({class:"point", text: katex.renderToString("B_1"), arr0:[0,-b,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    // primitives.push({class:"point", text: katex.renderToString("B_2"), arr0:[0,b,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("F_1"), arr0:focus1, rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("F_2"), arr0:focus2, rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString('M'), arr0:pointM, rad:pointRad, color:[0.0, 0.0, 0.7, 1.0]});
    primitives.push({class:"line", text: "", arr0:focus1, arr1:pointM, rad:lineRad, color:[0.7, 0.7, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:focus2, arr1:pointM, rad:lineRad, color:[0.7, 0.7, 0.0, 1.0]});
}
var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-2.5,-1,0]), movable: "free"});
    points.push({coord1: vec3.create([-1.5,1,0]), movable: "free"});
    points.push({coord1: vec3.create([-2,-2,0]), movable: "free"});
    points.push({coord1: vec3.create([3,1,0]), movable: "free"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create([2,4,0]), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    // lines = [];
    // lines.push({coord1: 1, coord2: 0, measure: true});
    // lines.push({coord1: 4, coord2: 5, measure: true});
}
function initDescr() {
    var descr = "";
    descr += "Проекция произведения вектора $\\vec a$ на число на направление $l$ равна произведению\
     этого числа на проекцию вектора $\\vec a$ на это направление:<br><br>";
    descr += "$\\text{Пр}_{l}(\\alpha\\vec a)=\\alpha\\text{Пр}_{l}(\\vec a)$<br><br>";
    descr += "$\\alpha$ = <input type='text' id='C' size='5'> <br/>";
    $("#description").html(descr);
    $("#C").val(C.toPrecision(3));
    $("#C").change(function(event){C = parseFloat($("#C").val());initBuffers();});
    $("Title").html("Ортогональная проекция вектора на направление");
}
var C = 3;
function initData() {
    isShowAxes = false;
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    var veca = [];
    vec3.subtract(points[1].coord1,points[0].coord1,veca);
    vec3.scale(veca, C);
    vec3.add(points[0].coord1,veca,points[6].coord1);
    var rad1;
    if (Math.abs(C)>=1) rad1 = 0.9;
    else  rad1 = 1.1;
    primitives.push({class:"arrow", text: katex.renderToString("\\alpha\\vec a"), arr0:points[0].coord1, arr1:points[6].coord1, rad:2*rad1, color:[0.0, 0.0, 1.0, 1.0]});
    var leftPoint = [];
    var rightPoint = [];
    createLine(points[2].coord1,points[3].coord1,leftPoint,rightPoint);
    primitives.push({class:"arrow", text: "", arr0:leftPoint, arr1:rightPoint, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[2].coord1, rad:4, color:[0.0, 0.6, 0.0, 1.0]}); 
    primitives.push({class:"point", text: "", arr0:points[3].coord1, rad:4, color:[0.0, 0.6, 0.0, 1.0]}); 

    var arrtempa1 = [];
    var arrtempa2 = [];
    var arrtempb2 = [];
    var arrtempl = [];
    vec3.subtract(points[0].coord1,points[2].coord1,arrtempa1);
    vec3.subtract(points[1].coord1,points[2].coord1,arrtempa2);
    vec3.subtract(points[6].coord1,points[2].coord1,arrtempb2);
    vec3.subtract(points[3].coord1,points[2].coord1,arrtempl);
    vec3.normalize(arrtempl);
    var dot1 = vec3.dot(arrtempa1,arrtempl);
    var dot2 = vec3.dot(arrtempa2,arrtempl);
    var dot3 = vec3.dot(arrtempb2,arrtempl);
    vec3.scale(arrtempl, dot1, points[4].coord1); 
    vec3.add(points[4].coord1,points[2].coord1);
    vec3.scale(arrtempl, dot2, points[5].coord1);
    vec3.add(points[5].coord1,points[2].coord1);
    vec3.scale(arrtempl, dot3, points[7].coord1); 
    vec3.add(points[7].coord1,points[2].coord1);
    primitives.push({class:"line", text: katex.renderToString("\\text{Пр}_{l}(\\vec a)"), arr0:points[4].coord1, arr1:points[5].coord1, rad:3, color:[0.7, 0.7, 0.0, 1.0]});
    primitives.push({class:"line", text: katex.renderToString("\\alpha\\text{Пр}_{l}(\\vec a)"), arr0:points[4].coord1, arr1:points[7].coord1, rad:3*rad1, color:[0.0, 0.7, 0.7, 1.0]});
    // primitives.push({class:"line", text: "Пр(a)="+(dot/len).toPrecision(3), arr0:points[0], arr1:arrProj, rad:3, color:[0.7, 0.7, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:points[0].coord1, arr1:points[4].coord1, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:points[1].coord1, arr1:points[5].coord1, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:points[6].coord1, arr1:points[7].coord1, rad:1, color:[0.0, 0.0, 0.0, 1.0]});

    primitives.push({class:"point", text: katex.renderToString("l"), arr0:rightPoint, rad:0, color:[1.0, 0.0, 1.0, 1.0]});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
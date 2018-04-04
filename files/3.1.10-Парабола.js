var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([1,0,0]), movable: "line", vector: vec3.create([1,0,0])});
    points.push({coord1: vec3.create(), movable: "free"});
}
function initDescr() {
    var descr = '';
    descr += '<p>$F$ - фокус параболы.<br>';
    descr += 'Прямая $l$ - директриса.</p>';
    descr += '<p>$|NM|=|MF|$</p>';
    // var tIS = 5;
    // descr += "<p>$p$<input type='text' id='p' size='"+tIS+"'></p>";
    $("#description").html(descr);
    // $("#p").change(function(event){points[0].coord1[0] = parseFloat(this.value)/2.0;initBuffers();});
    $("Title").html("Парабола");
}
var paramOfPoint = 2.5;
function initData() {
    var arrRad = 2;
    var lineRad = 1;
    var pointRad = 4;
    var chosenPointRad = 5;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[1].coord1) {
            paramOfPoint = points[1].coord1[1];
        }
    }

    var p = points[0].coord1[0]*2;
    // $("#p").val(parseFloat(p.toPrecision(3)));

    let slices = 40;
    let vertices = [];
    var maxLen0 = 10;
    var maxLen = maxLen0;
    if (maxLen*maxLen/2/Math.abs(p) > maxLen) {
        maxLen = Math.sqrt(maxLen*2*Math.abs(p));
    }
    for (var i = 0; i <= slices; i++) {
        var psi = (i/slices-0.5)*maxLen*2;
        vertices.push( [psi*psi/2/p,psi,0.0] );
    }

    vec3.set([paramOfPoint*paramOfPoint/2/p,paramOfPoint,0.0],points[1].coord1);
    var pointM = points[1].coord1;
    for (var i = 0; i < vertices.length-1; i++) {
        primitives.push({class:"line", text: "", arr0:vertices[i], arr1:vertices[i+1], rad:arrRad, color:[0.0, 0.0, 1.0, 1.0]});
    }
    // primitives.push({class:"line", text: "", arr0:[-p/2,0,0], arr1:[p/2,0,0], rad:arrRad, color:[0.0, 0.7, 0.0, 1.0]});
    primitives.push({class:"line", text: katex.renderToString('l'), ratio: 0.7, arr0:[-p/2,-maxLen0,0], arr1:[-p/2,maxLen0,0], rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString('F'), arr0:[p/2,0,0], rad:pointRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString('M'), arr0:pointM, rad:pointRad, color:[0.0, 0.0, 0.7, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:[p/2,0,0], arr1:pointM, rad:lineRad, color:[0.7, 0.7, 0.0, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:[-p/2,pointM[1],0], arr1:pointM, rad:lineRad, color:[0.7, 0.7, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString('N'), arr0:[-p/2,pointM[1],0], rad:pointRad, color:[0.0, 0.6, 0.0, 1.0]});

}
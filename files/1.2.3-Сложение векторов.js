var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "free"});
    points.push({coord1: vec3.create([1,3,0]), movable: "free"});
    points.push({coord1: vec3.create([4,1,0]), movable: "free"});
    points.push({coord1: vec3.create([6,2,0]), movable: "free"});
    points.push({coord1: vec3.create([5,-1,0]), movable: "free"});
    points.push({coord1: vec3.create([3,-2,0]), movable: "free"});
    vec3.set([1,3,0],v1);
    vec3.set([4,1,0],v2);
}
function initDescr() {
    var descr = '';
    descr += 'Правила сложения векторов.';
    descr += '<label><input type="radio" name="group1" checked onchange="changeOXYZ(1)">Правило треугольника</label>';
    descr += '<label><input type="radio" name="group1" onchange="changeOXYZ(2)">Правило параллелограмма</label>';
    descr += '<label><input type="radio" name="group1" onchange="changeOXYZ(3)">Правило многоугольника</label>';
    $("#description").html(descr);
    changeOXYZ(1)
    $("Title").html("Линейные операции над векторами");
}
var showOXYZ = 1;
var katsum = katex.renderToString("\\sum\\limits^{5}_{i=1} {\\vec a_i}");
var katveca1 = katex.renderToString("\\vec a_1");
var katveca2 = katex.renderToString("\\vec a_2");
var katveca3 = katex.renderToString("\\vec a_3");
var katveca4 = katex.renderToString("\\vec a_4");
var katveca5 = katex.renderToString("\\vec a_5");
var katveca = katex.renderToString("\\vec a");
var katvecb = katex.renderToString("\\vec b");
var katvecab = katex.renderToString("\\vec a+\\vec b");
function changeOXYZ(n) {
    showOXYZ = n;
    switch (n) {
      case 1:
      case 3:
        vec3.add(points[0].coord1,v1,points[1].coord1);
        vec3.add(points[1].coord1,v2,points[2].coord1);
        break;
      case 2:
        vec3.add(points[0].coord1,v1,points[1].coord1);
        vec3.add(points[0].coord1,v2,points[2].coord1);
        break;
    }
    initBuffers();
}
var v1 = [];
var v2 = [];
function initData() {
    isShowAxes = false;
    var arrsum12 = [];

    var arrRad = 2;
    var lineRad = 1;
    var chosenPointRad = 5;

    if (showOXYZ == 1) {
        points[3].movable = "fixed";
        points[4].movable = "fixed";
        points[5].movable = "fixed";
        vec3.subtract(points[1].coord1,points[0].coord1,v1);
        vec3.subtract(points[2].coord1,points[1].coord1,v2);
        vec3.add(v1,v2,arrsum12);
        vec3.add(arrsum12,points[0].coord1);    
        primitives.push({class:"arrow", text: katveca, arr0:points[0].coord1, arr1:points[1].coord1, rad:arrRad, color:[1.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arrow", text: katvecb, arr0:points[1].coord1, arr1:points[2].coord1, rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
        primitives.push({class:"arrow", text: katvecab, arr0:points[0].coord1, arr1:arrsum12, rad:arrRad, color:[0.7, 0.7, 0.0, 1.0]});
    } else if (showOXYZ == 2) {
        points[3].movable = "fixed";
        points[4].movable = "fixed";
        points[5].movable = "fixed";
        vec3.subtract(points[1].coord1,points[0].coord1,v1);
        vec3.subtract(points[2].coord1,points[0].coord1,v2);
        vec3.add(v1,v2,arrsum12);
        vec3.add(arrsum12,points[0].coord1);    
        primitives.push({class:"arrow", text: katveca, arr0:points[0].coord1, arr1:points[1].coord1, rad:arrRad, color:[1.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arrow", text: katvecb, arr0:points[0].coord1, arr1:points[2].coord1, rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
        primitives.push({class:"arrow", text: katvecab, arr0:points[0].coord1, arr1:arrsum12, rad:arrRad, color:[0.7, 0.7, 0.0, 1.0]});
        primitives.push({class:"dashline", text: "", arr0:points[2].coord1, arr1:arrsum12, rad:lineRad, color:[1.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"dashline", text: "", arr0:points[1].coord1, arr1:arrsum12, rad:lineRad, color:[0.0, 1.0, 0.0, 1.0]});
    } else if (showOXYZ == 3) {
        points[3].movable = "free";
        points[4].movable = "free";
        points[5].movable = "free";   
        primitives.push({class:"arrow", text: katveca1, arr0:points[0].coord1, arr1:points[1].coord1, rad:arrRad, color:[1.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arrow", text: katveca2, arr0:points[1].coord1, arr1:points[2].coord1, rad:arrRad, color:[1.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arrow", text: katveca3, arr0:points[2].coord1, arr1:points[3].coord1, rad:arrRad, color:[1.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arrow", text: katveca4, arr0:points[3].coord1, arr1:points[4].coord1, rad:arrRad, color:[1.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arrow", text: katveca5, arr0:points[4].coord1, arr1:points[5].coord1, rad:arrRad, color:[1.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arrow", text: katsum, arr0:points[0].coord1, arr1:points[5].coord1, rad:arrRad, color:[0.7, 0.7, 0.0, 1.0]});
    }
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "free"});
    points.push({coord1: vec3.create([1,3,0]), movable: "free"});
    points.push({coord1: vec3.create([3,-2,0]), movable: "free"});
    points.push({coord1: vec3.create([-1,-2,0]), movable: "free"});
}
function initDescr() {
    var descr = '';
    descr += '$\\vec a=\\alpha_1\\vec a_1+\\alpha_2\\vec a_2+\\alpha_3\\vec a_3$';
    descr += ' - линейная комбинация.';
    descr += '<table style="text-align: center">';
    descr += '<tr>';    
    descr += '<td>$\\alpha_1$</td>';
    descr += '<td>$\\alpha_2$</td>';
    descr += '<td>$\\alpha_3$</td>';
    descr += '</tr>';
    descr += '<tr>';
    descr += '<td><input type="text" size=3 value='+a[0]+' onchange="{a[0]=parseFloat(this.value);initBuffers();}"></td>';
    descr += '<td><input type="text" size=3 value='+a[1]+' onchange="{a[1]=parseFloat(this.value);initBuffers();}"></td>';
    descr += '<td><input type="text" size=3 value='+a[2]+' onchange="{a[2]=parseFloat(this.value);initBuffers();}"></td>';
    descr += '</tr>';
    descr += '</table>';
    $("#description").html(descr);
    $("Title").html("Линейная зависимость и линейная независимость системы векторов");
}
var a = [2,1,4];
var showOXYZ = 1;
var katveca1 = katex.renderToString("\\vec a_1");
var katveca2 = katex.renderToString("\\vec a_2");
var katveca3 = katex.renderToString("\\vec a_3");
var katveca1al = katex.renderToString("\\alpha_1\\vec a_1");
var katveca2al = katex.renderToString("\\alpha_2\\vec a_2");
var katveca3al = katex.renderToString("\\alpha_3\\vec a_3");
var katveca = katex.renderToString("\\vec a");

function initData() {
    isShowAxes = false;
    var arrsum12 = [];

    var arrRad = 2;
    var arrRad1 = 1;
    var lineRad = 1;
    var chosenPointRad = 5;

    var v = [[],[],[]];
    for (var i = 0; i < 3; i++) {
        vec3.subtract(points[i+1].coord1,points[0].coord1,v[i]);
    }
    var vecsum = vec3.create(points[0].coord1);
    for (var i = 0; i < 3; i++) {
        vec3.scale(v[i],a[i]);
        vec3.add(vecsum,v[i]);
    }
    vec3.add(v[0],points[0].coord1);
    vec3.add(v[1],v[0]);
    vec3.add(v[2],v[1]);
  
    primitives.push({class:"arrow", text: katveca1, arr0:points[0].coord1, arr1:points[1].coord1, rad:arrRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katveca2, arr0:points[0].coord1, arr1:points[2].coord1, rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katveca3, arr0:points[0].coord1, arr1:points[3].coord1, rad:arrRad, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: katveca1al, arr0:points[0].coord1, arr1:v[0], rad:arrRad1, color:[0.8, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katveca2al, arr0:v[0], arr1:v[1], rad:arrRad1, color:[0.0, 0.8, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katveca3al, arr0:v[1], arr1:v[2], rad:arrRad1, color:[0.0, 0.0, 0.8, 1.0]});
    primitives.push({class:"arrow", text: katveca, arr0:points[0].coord1, arr1:vecsum, rad:arrRad, color:[0.7, 0.7, 0.0, 1.0]});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "free"});
    points.push({coord1: vec3.create([5,2,0]), movable: "free"});
    C = 3;
}
function initDescr() {
    var descr = "";
    descr += "Делением вектора $\\vec a$ на действительное число $\\alpha\\ne 0$ называется его умножение на число $\\alpha^{-1}$<br><br>";
    descr += "$\\vec b=\\vec a/\\alpha$;<br/>";
    descr += "$\\alpha$ = <input type='text' id='C' size='5'> <br/>";
    $("#description").html(descr); 
    $("#C").val(C.toPrecision(3));
    $("#C").change(function(event){
        C = parseFloat($("#C").val());
        if (C==0) {
            C=1;
            $("#C").val(C.toPrecision(3));
        }
        initBuffers();
    });
    $("Title").html("Линейные операции над векторами");
}
var C;
function initData() {
    isShowAxes = false;
    var arrscale = [];
    vec3.subtract(points[1].coord1,points[0].coord1,arrscale);
    vec3.scale(arrscale,1/C,arrscale);
    vec3.add(arrscale,points[0].coord1,arrscale);

    var radb;
    if (Math.abs(C) >= 1) radb = 2.1;
    else radb = 1.9;


    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec b=\\vec a/\\alpha"), arr0:points[0].coord1, arr1:arrscale, rad:radb, color:[0.7, 0.7, 0.0, 1.0]});
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }

    
}
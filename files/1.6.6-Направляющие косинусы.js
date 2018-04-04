var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([1,3,0]), movable: "free"});
}
function initDescr() {
    var parametershtml = "";
    var textInputSize = 5;
    var textInputId;
    textInputId = 0;
    parametershtml += "$\\vec a$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> <br/>";
    parametershtml += "$\\cos\\alpha = $<input type='text' id='C1' size='"+textInputSize+"' readonly> <br/>";
    parametershtml += "$\\cos\\beta = $<input type='text' id='C2' size='"+textInputSize+"' readonly> <br/>";

    $("#parameters").html(parametershtml);
    var displayVals = function(i) {
        points[i].coord1[0] = parseFloat($("#x"+i).val());
        points[i].coord1[1] = parseFloat($("#y"+i).val());
        initBuffers();
    }
    for (var i = 0; i < 2; i++) {
        $("#x"+i).change({msg: i},  function(event) {displayVals(event.data.msg);});
        $("#y"+i).change({msg: i},  function(event) {displayVals(event.data.msg);});
    }
    $("#description").html("Направляющие косинусы вектора $\\vec a.$");
    $("Title").html("Направляющие косинусы");
}
var C1 = 0;
var C2 = 0;
function initData() {
    var point0 = vec3.create([0,0,0]);
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:point0, arr1:points[0].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arc", text: katex.renderToString("\\alpha"), arr0:point0, arr1:points[0].coord1, arr2:[1.0,0.0,0.0], Rad:1, rad:2, color:[0.7, 0.7, 0.0, 1.0]});
    primitives.push({class:"arc", text: katex.renderToString("\\beta"), arr0:point0, arr1:points[0].coord1, arr2:[0.0,1.0,0.0], Rad:1.5, rad:2, color:[0.0, 1.0, 0.0, 1.0]});

    var vec_a = [];
    vec3.subtract(points[0].coord1,point0,vec_a);
    vec3.normalize(vec_a);

    C1 = vec_a[0];
    C2 = vec_a[1];

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }

    for (var i = 0; i < 1; i++) {

            $("#x"+i).val(parseFloat((primitives[i].arr1[0]-primitives[i].arr0[0]).toPrecision(3)));
            $("#y"+i).val(parseFloat((primitives[i].arr1[1]-primitives[i].arr0[1]).toPrecision(3)));
    }
    $("#C1").val(C1.toPrecision(3));
    $("#C2").val(C2.toPrecision(3));
}
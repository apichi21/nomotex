var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "free"});
    points.push({coord1: vec3.create([1,3,0]), movable: "free"});
    points.push({coord1: vec3.create([-2,0.5,0]), movable: "free"});
    C = 0;
}
function initDescr() {
    var parametershtml = "";
    var textInputSize = 5;
    var textInputId = 0;
    parametershtml += "$A$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> <br/>";
    textInputId = 1;
    parametershtml += "$\\vec a$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> <br/>";
    textInputId = 2;
    parametershtml += "$B$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> <br/>";
    textInputId = 3;
    parametershtml += "$\\vec b$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'readonly> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'readonly> <br/>";
    textInputId = 4;
    parametershtml += "$\\vec b=\\alpha\\vec a$, $\\alpha$ = <input type='text' id='C' size='"+textInputSize+"'readonly> <br/>";

    $("#parameters").html(parametershtml);
    var displayVals = function(i) {
        if (i==0 || i== 2) {
            points[i].coord1[0] = parseFloat($("#x"+i).val());
            points[i].coord1[1] = parseFloat($("#y"+i).val());
        } else if (i==1) {
            points[i].coord1[0] = parseFloat($("#x"+i).val()) + parseFloat($("#x"+0).val());
            points[i].coord1[1] = parseFloat($("#y"+i).val()) + parseFloat($("#y"+0).val());
        } else {
            points[i].coord1[0] = parseFloat($("#x"+i).val()) + parseFloat($("#x"+2).val());
            points[i].coord1[1] = parseFloat($("#y"+i).val()) + parseFloat($("#y"+2).val());
        }
        initBuffers();
    }
    for (var i = 0; i < 3; i++) {
        $("#x"+i).change({msg: i},  function(event) {displayVals(event.data.msg);});
        $("#y"+i).change({msg: i},  function(event) {displayVals(event.data.msg);});
    }
    $("#description").html("Вектор $\\vec b$ коллинеарен вектору $\\vec a$.<br/>Cоответствующие координаты векторов пропорциональные");
    $("Title").html("Векторное пространство. Базис.");
}
var C = 123;
function initData() {
    var vec_a = [];
    vec3.subtract(points[1].coord1,points[0].coord1,vec_a);

    var vec_b = [];
    vec3.normalize(vec_a,vec_b);
    vec3.scale(vec_b, 3);

    var len_a = vec3.length(vec_a);
    var len_b = vec3.length(vec_b);
    vec3.add(vec_b,points[2].coord1);

    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "B", arr0:points[2].coord1, rad:2, color:[0.7, 0.7, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec b"), arr0:points[2].coord1, arr1:vec_b, rad:2, color:[0.7, 0.7, 0.0, 1.0]});
    primitives.push({class:"point", text: "A", arr0:points[0].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});

    C = len_b/len_a;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }


    // $("#x12").val(parseFloat(arrsum12[0].toPrecision(3)));
    // $("#y12").val(parseFloat(arrsum12[1].toPrecision(3)));

    for (var i = 0; i < 5; i++) {
        if (i==0 || i==2) {
            $("#x"+i).val(parseFloat(points[i].coord1[0].toPrecision(3)));
            $("#y"+i).val(parseFloat(points[i].coord1[1].toPrecision(3)));
        } else if (i==4) {                
            $("#C").val(C.toPrecision(3));
        } else {
            $("#x"+i).val(parseFloat((primitives[i-1].arr1[0]-primitives[i-1].arr0[0]).toPrecision(3)));
            $("#y"+i).val(parseFloat((primitives[i-1].arr1[1]-primitives[i-1].arr0[1]).toPrecision(3)));
        }          
    }
}
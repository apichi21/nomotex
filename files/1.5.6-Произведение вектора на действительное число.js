var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create([2,1,0]), movable: "free"});
    C = 2;
}
function initDescr() {
    var parametershtml = "";
    var textInputSize = 5;
    var textInputId = 0;
    // parametershtml += "O: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> <br/>";
    textInputId = 1;
    parametershtml += "$\\vec a$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> <br/>";
    parametershtml += "$\\gamma$ = <input type='text' id='C' size='"+textInputSize+"'> <br/>";
    textInputId = 2;
    parametershtml += "$\\gamma\\vec a$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"' readonly> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"' readonly> <br/>";

    $("#parameters").html(parametershtml);
    var displayVals = function(i) {
        if (i==0) {
            points[i].coord1[0] = parseFloat($("#x"+i).val());
            points[i].coord1[1] = parseFloat($("#y"+i).val());
        } else if (i==1){                
            points[i].coord1[0] = parseFloat($("#x"+i).val()) + parseFloat($("#x"+0).val());
            points[i].coord1[1] = parseFloat($("#y"+i).val()) + parseFloat($("#y"+0).val());
        }
        else
        {
            C = parseFloat($("#C").val());
        }
        initBuffers();
    }
    for (var i = 0; i < 3; i++) {
        $("#x"+i).change({msg: i},  function(event) {displayVals(event.data.msg);});
        $("#y"+i).change({msg: i},  function(event) {displayVals(event.data.msg);});
    }
    $("#C").change(function(event){C = parseFloat($("#C").val());initBuffers();});
    $("#description").html("При умножении вектора $\\vec a$ на число $\\gamma$ все его координаты умножаются на это же число"); 
    $("Title").html("Векторное пространство. Базис.");
}
var C;
function initData() {
    var arrscale = [];
    vec3.subtract(points[1].coord1,points[0].coord1,arrscale);
    vec3.scale(arrscale,C,arrscale);
    vec3.add(arrscale,points[0].coord1,arrscale);


    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\gamma\\vec a"), arr0:points[0].coord1, arr1:arrscale, rad:2, color:[0.7, 0.7, 0.0, 1.0]});

    primitives.push({class:"point", text: "O", arr0:points[0].coord1, rad:0, color:[1.0, 0.0, 1.0, 1.0]}); 
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
    for (var i = 0; i < 4; i++) {
        if (i==0) {
            $("#x"+i).val(parseFloat(points[i].coord1[0].toPrecision(3)));
            $("#y"+i).val(parseFloat(points[i].coord1[1].toPrecision(3)));
        } else if (i==3) {
            $("#C").val(C.toPrecision(3));
        } else {
            $("#x"+i).val(parseFloat((primitives[i-1].arr1[0]-primitives[i-1].arr0[0]).toPrecision(3)));
            $("#y"+i).val(parseFloat((primitives[i-1].arr1[1]-primitives[i-1].arr0[1]).toPrecision(3)));
        }          
    }
}
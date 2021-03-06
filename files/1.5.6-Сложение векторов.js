var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create([1,3,0]), movable: "free"});
    points.push({coord1: vec3.create([4,1,0]), movable: "free"});
}
function initDescr() {
    var parametershtml = "";
    var textInputSize = 5;
    var textInputId = 0;
    // parametershtml += "O: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> <br/>";
    textInputId = 1;
    parametershtml += "$\\vec a$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> <br/>";
    textInputId = 2;
    parametershtml += "$\\vec b$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> <br/>";
    textInputId = 12;
    parametershtml += "$\\vec a+\\vec b$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"' readonly> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"' readonly> <br/>";

    $("#parameters").html(parametershtml);
    var displayVals = function(i) {
        if (i==0) {
            points[i].coord1[0] = parseFloat($("#x"+i).val());
            points[i].coord1[1] = parseFloat($("#y"+i).val());
        } else {                
            points[i].coord1[0] = parseFloat($("#x"+i).val()) + parseFloat($("#x"+0).val());
            points[i].coord1[1] = parseFloat($("#y"+i).val()) + parseFloat($("#y"+0).val());
        }
        initBuffers();
    }
    for (var i = 0; i < 3; i++) {
        $("#x"+i).change({msg: i},  function(event) {displayVals(event.data.msg);});
        $("#y"+i).change({msg: i},  function(event) {displayVals(event.data.msg);});
    }
    $("#description").html("При сложении векторов $\\vec a$ и $\\vec b$ их соответствующие координаты складываются.");
    $("Title").html("Векторное пространство. Базис.");
}
function initData() {
    var arrsum12 = [];
    vec3.add(points[1].coord1,points[2].coord1,arrsum12);
    vec3.subtract(arrsum12,points[0].coord1);

    var arrRad = 2;
    var lineRad = 1;
    var chosenPointRad = 5;

    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[1].coord1, rad:arrRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec b"), arr0:points[0].coord1, arr1:points[2].coord1, rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a+\\vec b"), arr0:points[0].coord1, arr1:arrsum12, rad:arrRad, color:[0.7, 0.7, 0.0, 1.0]});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }

    primitives.push({class:"point", text: "O", arr0:points[0].coord1, rad:0, color:[1.0, 0.0, 1.0, 1.0]}); 
    primitives.push({class:"dashline", text: "", arr0:points[2].coord1, arr1:arrsum12, rad:lineRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:points[1].coord1, arr1:arrsum12, rad:lineRad, color:[0.0, 1.0, 0.0, 1.0]});

    for (var i = 0; i < 4; i++) {
        if (i==0) {
            $("#x"+i).val(parseFloat(points[i].coord1[0].toPrecision(3)));
            $("#y"+i).val(parseFloat(points[i].coord1[1].toPrecision(3)));
        } else if (i==3) {
            $("#x"+12).val(parseFloat((primitives[i-1].arr1[0]-primitives[i-1].arr0[0]).toPrecision(3)));
            $("#y"+12).val(parseFloat((primitives[i-1].arr1[1]-primitives[i-1].arr0[1]).toPrecision(3)));
        } else {
            $("#x"+i).val(parseFloat((primitives[i-1].arr1[0]-primitives[i-1].arr0[0]).toPrecision(3)));
            $("#y"+i).val(parseFloat((primitives[i-1].arr1[1]-primitives[i-1].arr0[1]).toPrecision(3)));
        }        
    }
}
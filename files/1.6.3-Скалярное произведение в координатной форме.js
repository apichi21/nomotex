var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create([1,3,0]), movable: "free"});
    points.push({coord1: vec3.create([2,1,0]), movable: "free"});
    C = 0;
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
    parametershtml += "$\\vec a \\cdot\\vec b=a_xb_x+a_yb_y = $<input type='text' id='C' size='"+textInputSize+"' readonly> <br/>";

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
    $("#C").change(function(event){C = parseFloat($("#C").val());initBuffers();});
    $("#description").html("В ортонормированном базисе скалярное произведение векторов $\\vec a$ и $\\vec b$ равно сумме попарных произведений их соответствующих координат.");
    $("Title").html("Скалярное произведение двух векторов");
}
var C = 123;
function initData() {
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec b"), arr0:points[0].coord1, arr1:points[2].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});


    var vec_a = [];
    vec3.subtract(points[1].coord1,points[0].coord1,vec_a);
    var vec_b = [];
    vec3.subtract(points[2].coord1,points[0].coord1,vec_b);
    C = vec3.dot(vec_a,vec_b);

    var lenb = vec3.length(vec_b);

    var vec_dot = [];
    vec3.scale(vec_b,1/lenb,vec_dot);
    vec3.scale(vec_dot,C);
    vec3.add(vec_dot,points[0].coord1);

    var rad1 = C>lenb ? 0.9 : 1.1;
    primitives.push({class:"point", text: "O", arr0:points[0].coord1, rad:0, color:[1.0, 0.0, 1.0, 1.0]});

    primitives.push({class:"line", text: katex.renderToString("\\vec a \\cdot\\vec b"), arr0:points[0].coord1, arr1:vec_dot, rad:2*rad1, color:[0.7, 0.7, 0.0, 1.0]});

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
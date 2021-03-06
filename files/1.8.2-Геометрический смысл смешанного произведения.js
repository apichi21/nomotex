var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create([1,3,1]), movable: "free"});
    points.push({coord1: vec3.create([2,1,-2]), movable: "free"});
    points.push({coord1: vec3.create([0,2,0]), movable: "free"});
    C = 0;
}
var C;
function initDescr() {
    var parametershtml = "";
    var textInputSize = 4;
    var textInputId = 0;
    // parametershtml += "O: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> z<input type='text' id='z"+textInputId+"' size='"+textInputSize+"'> <br/>";
    textInputId = 1;
    parametershtml += "$\\vec a$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> z<input type='text' id='z"+textInputId+"' size='"+textInputSize+"'> <br/>";
    textInputId = 2;
    parametershtml += "$\\vec b$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> z<input type='text' id='z"+textInputId+"' size='"+textInputSize+"'> <br/>";
    textInputId = 3;
    parametershtml += "$\\vec c$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> z<input type='text' id='z"+textInputId+"' size='"+textInputSize+"'> <br/>";
    parametershtml += "$V = |(\\vec a\\times\\vec b)\\cdot\\vec c| = $<input type='text' id='C' size='"+textInputSize+"' readonly> <br/>";

    $("#parameters").html(parametershtml);
    var displayVals = function(i) {
        if (i==0) {
            points[i].coord1[0] = parseFloat($("#x"+i).val());
            points[i].coord1[1] = parseFloat($("#y"+i).val());
            points[i].coord1[2] = parseFloat($("#z"+i).val());
        } else {
            points[i].coord1[0] = parseFloat($("#x"+i).val()) + parseFloat($("#x"+0).val());
            points[i].coord1[1] = parseFloat($("#y"+i).val()) + parseFloat($("#y"+0).val());
            points[i].coord1[2] = parseFloat($("#z"+i).val()) + parseFloat($("#z"+0).val());
        }
        initBuffers();
    }
    for (var i = 0; i < 4; i++) {
        $("#x"+i).change({msg: i},  function(event) {displayVals(event.data.msg);});
        $("#y"+i).change({msg: i},  function(event) {displayVals(event.data.msg);});
        $("#z"+i).change({msg: i},  function(event) {displayVals(event.data.msg);});
    }
    $("#C").change(function(event){C = parseFloat($("#C").val());initBuffers();});
    $("#description").html("Модуль смешанного произведения векторов $\\vec a$, $\\vec b$ и $\\vec c$ равен объему $V$ параллелепипеда, построенного на этих векторах.");
    $("Title").html("Смешанное произведение трех векторов");
}
function initData() {
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec b"), arr0:points[0].coord1, arr1:points[2].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec c"), arr0:points[0].coord1, arr1:points[3].coord1, rad:2, color:[0.0, 0.0, 1.0, 1.0]});

    var vec_a = [];
    vec3.subtract(points[1].coord1,points[0].coord1,vec_a);
    var vec_b = [];
    vec3.subtract(points[2].coord1,points[0].coord1,vec_b);
    var vec_c = [];
    vec3.subtract(points[3].coord1,points[0].coord1,vec_c);
    var crossab = [];
    vec3.cross(vec_a,vec_b,crossab);

    C = Math.abs(vec3.dot(crossab,vec_c));

    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:points[0].coord1});
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }

    var sum_ab = [];
    vec3.add(vec_a,vec_b,sum_ab);
    vec3.add(sum_ab,points[0].coord1);

    var sum_ac = [];
    vec3.add(vec_a,vec_c,sum_ac);
    vec3.add(sum_ac,points[0].coord1);

    var sum_bc = [];
    var sum_abc = [];
    vec3.add(vec_b,vec_c,sum_bc);
    vec3.add(vec_a,sum_bc,sum_abc);
    vec3.add(sum_bc,points[0].coord1);
    vec3.add(sum_abc,points[0].coord1);

    primitives.push({class:"plane", text: "", arr0:points[0].coord1, arr1:points[1].coord1, arr2:sum_ab, arr3:points[2].coord1, color:[0.5, 0.5, 1.0, 0.6]});
    primitives.push({class:"plane", text: "", arr0:points[0].coord1, arr1:points[1].coord1, arr2:sum_ac, arr3:points[3].coord1, color:[0.5, 0.5, 1.0, 0.6]});
    primitives.push({class:"plane", text: "", arr0:points[0].coord1, arr1:points[2].coord1, arr2:sum_bc, arr3:points[3].coord1, color:[0.5, 0.5, 1.0, 0.6]});

    primitives.push({class:"plane", text: "", arr0:sum_abc, arr1:points[1].coord1, arr2:sum_ab, arr3:points[2].coord1, color:[0.5, 0.5, 1.0, 0.6]});
    primitives.push({class:"plane", text: "", arr0:sum_abc, arr1:points[1].coord1, arr2:sum_ac, arr3:points[3].coord1, color:[0.5, 0.5, 1.0, 0.6]});
    primitives.push({class:"plane", text: "", arr0:sum_abc, arr1:points[2].coord1, arr2:sum_bc, arr3:points[3].coord1, color:[0.5, 0.5, 1.0, 0.6]});

    primitives.push({class:"line", text: "", arr0:points[1].coord1, arr1:sum_ab, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:points[1].coord1, arr1:sum_ac, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:points[2].coord1, arr1:sum_ab, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:points[2].coord1, arr1:sum_bc, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:points[3].coord1, arr1:sum_ac, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:points[3].coord1, arr1:sum_bc, rad:1, color:[0.0, 0.0, 0.0, 1.0]});

    primitives.push({class:"line", text: "", arr0:sum_abc, arr1:sum_ab, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:sum_abc, arr1:sum_ac, rad:1, color:[0.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:sum_abc, arr1:sum_bc, rad:1, color:[0.0, 0.0, 0.0, 1.0]});

    for (var i = 0; i < 6; i++) {
        if (i==0) {
            $("#x"+i).val(parseFloat(points[i].coord1[0].toPrecision(3)));
            $("#y"+i).val(parseFloat(points[i].coord1[1].toPrecision(3)));
            $("#z"+i).val(parseFloat(points[i].coord1[2].toPrecision(3)));
        } else if (i==4) {
            // $("#x"+12).val(parseFloat((primitives[i-1].arr1[0]-primitives[i-1].arr0[0]).toPrecision(3)));
            // $("#y"+12).val(parseFloat((primitives[i-1].arr1[1]-primitives[i-1].arr0[1]).toPrecision(3)));
            // $("#z"+12).val(parseFloat((primitives[i-1].arr1[2]-primitives[i-1].arr0[2]).toPrecision(3)));
        } else if (i==5) {
            $("#C").val(C.toPrecision(3));
        } else {
            $("#x"+i).val(parseFloat((primitives[i-1].arr1[0]-primitives[i-1].arr0[0]).toPrecision(3)));
            $("#y"+i).val(parseFloat((primitives[i-1].arr1[1]-primitives[i-1].arr0[1]).toPrecision(3)));
            $("#z"+i).val(parseFloat((primitives[i-1].arr1[2]-primitives[i-1].arr0[2]).toPrecision(3)));
        }
    }
}
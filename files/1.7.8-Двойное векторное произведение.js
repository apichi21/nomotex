var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create([-1,3,0.5]), movable: "free"});
    points.push({coord1: vec3.create([2,1,2]), movable: "free"});
    points.push({coord1: vec3.create([-1,0.5,-1.5]), movable: "free"});
}
function initDescr() {
    var parametershtml = "";
    var textInputSize = 3;
    var textInputId = 0;
    // parametershtml += "O: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> z<input type='text' id='z"+textInputId+"' size='"+textInputSize+"'> <br/>";
    textInputId = 1;
    parametershtml += "$\\vec a$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> z<input type='text' id='z"+textInputId+"' size='"+textInputSize+"'> <br/>";
    textInputId = 2;
    parametershtml += "$\\vec b$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> z<input type='text' id='z"+textInputId+"' size='"+textInputSize+"'> <br/>";
    textInputId = 3;
    parametershtml += "$\\vec c$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'> z<input type='text' id='z"+textInputId+"' size='"+textInputSize+"'> <br/>";
    textInputId = 12;
    parametershtml += "$\\vec b\\times\\vec c$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'readonly> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'readonly> z<input type='text' id='z"+textInputId+"' size='"+textInputSize+"'readonly> <br/>";
    textInputId = 123;
    parametershtml += "$\\vec a\\times(\\vec b\\times\\vec c)$: x<input type='text' id='x"+textInputId+"' size='"+textInputSize+"'readonly> y<input type='text' id='y"+textInputId+"' size='"+textInputSize+"'readonly> z<input type='text' id='z"+textInputId+"' size='"+textInputSize+"'readonly> <br/>";

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
    $("#description").html("Для двойного векторного произведения существует формула, облегчающая вычисление:$$\\vec a\\times(\\vec b\\times\\vec c) = \\vec b(\\vec a\\cdot\\vec c)-\\vec c(\\vec a\\cdot\\vec b)$$");
    $("Title").html("Двойное векторное произведение");
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
    var crossbc = [];
    vec3.cross(vec_b,vec_c,crossbc);

    var crossabc = [];
    vec3.cross(vec_a,crossbc,crossabc);

    vec3.add(crossbc,points[0].coord1);
    primitives.push({class:"arrow", text: katex.renderToString("\\vec b\\times\\vec c"), arr0:points[0].coord1, arr1:crossbc, rad:2, color:[0.7, 0.7, 0.0, 1.0]});
    vec3.add(crossabc,points[0].coord1);
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a\\times(\\vec b\\times\\vec c)"), arr0:points[0].coord1, arr1:crossabc, rad:2, color:[0.0, 0.7, 0.7, 1.0]});

    var ac = vec3.dot(vec_a,vec_c);
    var ab = vec3.dot(vec_a,vec_b);

    var vec_b_ac = [];
    vec3.scale(vec_b,ac,vec_b_ac);
    var vec_c_ab = [];
    vec3.scale(vec_c,-ab,vec_c_ab);

    var sub_bac_cab = [];
    vec3.add(vec_b_ac,vec_c_ab,sub_bac_cab);

    var len_b = vec3.length(vec_b);
    var len_b_ac = vec3.length(vec_b_ac);
    var rad_b_ac = 2;
    if (len_b_ac>len_b) rad_b_ac/=1.1;
    else rad_b_ac*=1.1;

    var len_c = vec3.length(vec_c);
    var len_c_ab = vec3.length(vec_c_ab);
    var rad_c_ab = 2;
    if (len_c_ab>len_c) rad_c_ab/=1.1;
    else rad_c_ab*=1.1;

    vec3.add(vec_b_ac,points[0].coord1);
    vec3.add(vec_c_ab,points[0].coord1);
    vec3.add(sub_bac_cab,points[0].coord1);

    primitives.push({class:"arrow", text: katex.renderToString("\\vec b(\\vec a\\cdot\\vec c)"), arr0:points[0].coord1, arr1:vec_b_ac, rad:rad_b_ac, color:[0.0, 0.5, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("-\\vec c(\\vec a\\cdot\\vec b)"), arr0:points[0].coord1, arr1:vec_c_ab, rad:rad_c_ab, color:[0.0, 0.0, 0.5, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:vec_b_ac, arr1:sub_bac_cab, rad:1, color:[0.0, 0.0, 0.5, 1.0]});
    primitives.push({class:"dashline", text: "", arr0:vec_c_ab, arr1:sub_bac_cab, rad:1, color:[0.0, 0.5, 0.0, 1.0]});

    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:points[0].coord1});
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    for (var i = 0; i < 6; i++) {
        if (i==0) {
            $("#x"+i).val(parseFloat(points[i].coord1[0].toPrecision(3)));
            $("#y"+i).val(parseFloat(points[i].coord1[1].toPrecision(3)));
            $("#z"+i).val(parseFloat(points[i].coord1[2].toPrecision(3)));
        } else if (i==4) {
            $("#x"+12).val(parseFloat((crossbc[0]-points[0].coord1[0]).toPrecision(3)));
            $("#y"+12).val(parseFloat((crossbc[1]-points[0].coord1[1]).toPrecision(3)));
            $("#z"+12).val(parseFloat((crossbc[2]-points[0].coord1[2]).toPrecision(3)));
        } else if (i==5) {
            $("#x"+123).val(parseFloat((crossabc[0]-points[0].coord1[0]).toPrecision(3)));
            $("#y"+123).val(parseFloat((crossabc[1]-points[0].coord1[1]).toPrecision(3)));
            $("#z"+123).val(parseFloat((crossabc[2]-points[0].coord1[2]).toPrecision(3)));
        } else {
            $("#x"+i).val(parseFloat((primitives[i-1].arr1[0]-primitives[i-1].arr0[0]).toPrecision(3)));
            $("#y"+i).val(parseFloat((primitives[i-1].arr1[1]-primitives[i-1].arr0[1]).toPrecision(3)));
            $("#z"+i).val(parseFloat((primitives[i-1].arr1[2]-primitives[i-1].arr0[2]).toPrecision(3)));
        }
    }
}
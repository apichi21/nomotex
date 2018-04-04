var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create([1,3,0]), movable: "free"});
    points.push({coord1: vec3.create([5,4,0]), movable: "free"});
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
    parametershtml += "$\\text{Пр}_{\\vec b}(\\vec a)=$<input type='text' id='C' size='"+textInputSize+"' readonly> <br/>";

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
    $("#description").html("Проекция вектора $\\vec a$ на направление $\\vec b.$ $$\\text{Пр}_{\\vec b}(\\vec a)=\\frac{a_xb_x+a_yb_y}{\\sqrt{b_x^2+b_y^2}}$$");
    $("Title").html("Скалярное произведение двух векторов");
}
function initData() {
    primitives.push({class:"arrow", text: katex.renderToString("\\vec a"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec b"), arr0:points[0].coord1, arr1:points[2].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    var arrProj = [];
    var arrtemp1 = [];
    var arrtemp2 = [];
    vec3.subtract(points[1].coord1,points[0].coord1,arrtemp1);
    vec3.subtract(points[2].coord1,points[0].coord1,arrtemp2);
    var dot = vec3.dot(arrtemp1,arrtemp2);
    var len = vec3.length(arrtemp2); 
    vec3.scale(arrtemp2, dot/len/len, arrProj); 
    vec3.add(arrProj,points[0].coord1);
    primitives.push({class:"line", text: katex.renderToString("\\text{Пр}_{\\vec b}(\\vec a)"), arr0:points[0].coord1, arr1:arrProj, rad:3, color:[0.7, 0.7, 0.0, 1.0]});
    // primitives.push({class:"line", text: "Пр(a)="+(dot/len).toPrecision(3), arr0:points[0], arr1:arrProj, rad:3, color:[0.7, 0.7, 0.0, 1.0]});
    primitives.push({class:"line", text: "", arr0:points[1].coord1, arr1:arrProj, rad:0.5, color:[0.0, 0.0, 0.0, 1.0]});

    primitives.push({class:"point", text: "O", arr0:points[0].coord1, rad:0, color:[1.0, 0.0, 1.0, 1.0]}); 
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
    for (var i = 0; i < 4; i++) {
        if (i==0) {
            $("#x"+i).val(parseFloat(points[i].coord1[0].toPrecision(3)));
            $("#y"+i).val(parseFloat(points[i].coord1[1].toPrecision(3)));
        } else if (i==3) {
            $("#C").val(parseFloat(dot/len).toPrecision(3));
        } else {
            $("#x"+i).val(parseFloat((primitives[i-1].arr1[0]-primitives[i-1].arr0[0]).toPrecision(3)));
            $("#y"+i).val(parseFloat((primitives[i-1].arr1[1]-primitives[i-1].arr0[1]).toPrecision(3)));
        }
    }
}
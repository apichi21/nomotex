var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0,0,0]), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "fixed"});
}
var ci = [];
function initDescr() {
    $("#conditions").html("Базис линейного пространства.");
    var algorithm = "<label style='display: block; padding-top: 5px;'><input type='radio' name='group1' checked onchange='changeOXYZ(2)'> а) Базис в пространстве $V_2$ $$\\vec x=x_1\\vec{e}_1+x_2\\vec{e}_2$$</label>";
    algorithm += "<label style='display: block; padding-top: 5px;'><input type='radio' name='group1' onchange='changeOXYZ(3)'> б) Базис в пространстве $V_3$ $$\\vec x=x_1\\vec{e}_1+x_2\\vec{e}_2+x_3\\vec{e}_3$$</label>";
    algorithm += "<label style='display: block; padding-top: 5px;'><input type='radio' name='group1' onchange='changeOXYZ(4)'> в) Базис в пространстве $V_{3L}$ (образ 4-мерного пространства $V_4$) $$\\vec x=\\sum\\limits_{i=1}^4{x_i\\vec{e}_i}$$</label>";
    algorithm += "<label style='display: block; padding-top: 5px;'><input type='radio' name='group1' onchange='changeOXYZ(5)'> г) Базис в пространстве $V_{3\\pi}$ (образ 5-мерного пространства $V_5$) $$\\vec x=\\sum\\limits_{i=1}^5{x_i\\vec{e}_i}$$</label>";
    algorithm += "<label style='display: block; padding-top: 5px;'><input type='radio' name='group1' onchange='changeOXYZ(6)'> д) Базис в пространстве $V_{3D}$ (образ 6-мерного пространства $V_6$) $$\\vec x=\\sum\\limits_{i=1}^6{x_i\\vec{e}_i}$$</label>";
    algorithm += "Общее правило: если $\\vec x = 0$ (то есть строим только обазис $\\vec{e}_i$), то векторы $\\vec{e}_i,\\quad i>3$ строим от точки $O$. Если же $\\vec x \\ne 0$, то эти векторы $\\vec{e}_i,\\quad i>3$ строим параллельным переносом от конца вектора $\\tilde{\\vec{x}}$ как и $\\tilde{\\tilde{\\vec{x}}}.$";
    algorithm += '<table style="text-align: center">';
    algorithm += '<tr>';
    algorithm += '<td class="d1">$x_1$</td>';
    algorithm += '<td class="d2">$x_2$</td>';
    algorithm += '<td class="d3">$x_3$</td>';
    algorithm += '<td class="d4">$x_4$</td>';
    algorithm += '<td class="d5">$x_5$</td>';
    algorithm += '<td class="d6">$x_6$</td>';
    algorithm += '</tr>';
    algorithm += '<tr>';
    algorithm += '<td class="d1"><input type="text" id="ans1" size=3 onchange="ci[0] = parseFloat(this.value);initBuffers();"></td>';
    algorithm += '<td class="d2"><input type="text" id="ans2" size=3 onchange="ci[1] = parseFloat(this.value);initBuffers();"></td>';
    algorithm += '<td class="d3"><input type="text" id="ans3" size=3 onchange="ci[2] = parseFloat(this.value);initBuffers();"></td>';
    algorithm += '<td class="d4"><input type="text" id="ans4" size=3 onchange="ci[3] = parseFloat(this.value);initBuffers();"></td>';
    algorithm += '<td class="d5"><input type="text" id="ans5" size=3 onchange="ci[4] = parseFloat(this.value);initBuffers();"></td>';
    algorithm += '<td class="d6"><input type="text" id="ans6" size=3 onchange="ci[5] = parseFloat(this.value);initBuffers();"></td>';
    algorithm += '</tr>';
    algorithm += '</table>';
    $("#algorithm").html(algorithm);
    ci = [1,2,3,2,3,-1];
    for (var i = 0; i < 6; i++) {
        $("#ans"+(i+1)).val(ci[i].toFixed(0));
    }
    $("#containerYellow").css({"min-width": "520px"});
    $("Title").html("Базис линейного пространства");
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}
var dim = 2;
function changeOXYZ(OXYZ) {
    dim = OXYZ;
    for (var i = 3; i <= 6; i++) {
        if (dim < i) {
            $(".d"+i).hide();
        }
        else {
            $(".d"+i).show();
        }
    }
    initBuffers();
}
function initData() {
    isShowAxes = false;

    var axeColor = [0.3, 0.3, 0.3, 1.0];
    var lineColor = [0.0, 0.0, 0.0, 1.0];
    
    var vec1d = vec3.create([1,0,0]);
    var vec2d = vec3.create([0,1,0]);
    var vec3d = vec3.create([0,0,1]);
    var vec4d = vec3.create([1,1,1]);
    vec3.normalize(vec4d);
    var vec5d = vec3.create([-2,1,1]);
    vec3.normalize(vec5d);
    var vec6d = vec3.create([0,-1,1]);
    vec3.normalize(vec6d);

    var ci1 = [];
    for (var j = 0; j < 6; j++) {
        if (dim>j) {
            ci1[j] = ci[j];

        } else {
            ci1[j] = 0;
        }
    }

    for (var j = 0; j < 3; j++) {
        points[1].coord1[j] = ci1[j];
    }
    if (dim==2) {points[1].coord1[2] = 0;}
    for (var j = 0; j < 3; j++) {
        points[2].coord1[j] = ci1[j];
    }
    switch (dim) {
      case 6:
        for (var j = 0; j < 3; j++) {
            points[2].coord1[j] += ci1[5]*vec6d[j];
        }
      case 5:
        for (var j = 0; j < 3; j++) {
            points[2].coord1[j] += ci1[4]*vec5d[j];
        }
      case 4:
        for (var j = 0; j < 3; j++) {
            points[2].coord1[j] += ci1[3]*vec4d[j];
        }
      case 3:
        break;
      default:
        break;
    }

    primitives.push({class:"arrow", text: katex.renderToString("\\vec e_1"), arr0:points[0].coord1, arr1:vec1d, rad:1.5, color:axeColor});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec e_2"), arr0:points[0].coord1, arr1:vec2d, rad:1.5, color:axeColor});
    switch (dim) {
      case 6:
        primitives.push({class:"arrow", text: katex.renderToString("\\vec e_6"), arr0:points[0].coord1, arr1:vec6d, rad:1.5, color:axeColor});
      case 5:
        primitives.push({class:"arrow", text: katex.renderToString("\\vec e_5"), arr0:points[0].coord1, arr1:vec5d, rad:1.5, color:axeColor});
      case 4:
        primitives.push({class:"arrow", text: katex.renderToString("\\vec e_4"), arr0:points[0].coord1, arr1:vec4d, rad:1.5, color:axeColor});
      case 3:
        primitives.push({class:"arrow", text: katex.renderToString("\\vec e_3"), arr0:points[0].coord1, arr1:vec3d, rad:1.5, color:axeColor});
        break;
      default:
        break;
    }
    var L01 = [];
    vec3.scale(vec1d,ci1[0],L01);
    var L02 = [];
    vec3.scale(vec2d,ci1[1],L02);
    var L03 = [];
    vec3.scale(vec3d,ci1[2],L03);
    var L12 = [];
    vec3.add(L01,L02,L12);
    var L13 = [];
    vec3.add(L01,L03,L13);
    var L23 = [];
    vec3.add(L02,L03,L23);

    var L01_ = [];
    vec3.scale(vec4d,ci1[3],L01_);
    var L02_ = [];
    vec3.scale(vec5d,ci1[4],L02_);
    var L03_ = [];
    vec3.scale(vec6d,ci1[5],L03_);
    var L12_ = [];
    vec3.add(L01_,L02_,L12_);
    var L13_ = [];
    vec3.add(L01_,L03_,L13_);
    var L23_ = [];
    vec3.add(L02_,L03_,L23_);

    vec3.add(L01_,points[1].coord1);
    vec3.add(L02_,points[1].coord1);
    vec3.add(L03_,points[1].coord1);
    vec3.add(L12_,points[1].coord1);
    vec3.add(L13_,points[1].coord1);
    vec3.add(L23_,points[1].coord1);

    primitives.push({class:"dashline", text: "", arr0:points[0].coord1, arr1:L01, rad:1, color:lineColor});
    primitives.push({class:"dashline", text: "", arr0:points[0].coord1, arr1:L02, rad:1, color:lineColor});
    primitives.push({class:"dashline", text: "", arr0:points[0].coord1, arr1:L03, rad:1, color:lineColor});
    primitives.push({class:"dashline", text: "", arr0:L01, arr1:L12, rad:1, color:lineColor});
    primitives.push({class:"dashline", text: "", arr0:L01, arr1:L13, rad:1, color:lineColor});
    primitives.push({class:"dashline", text: "", arr0:L02, arr1:L12, rad:1, color:lineColor});
    primitives.push({class:"dashline", text: "", arr0:L02, arr1:L23, rad:1, color:lineColor});
    primitives.push({class:"dashline", text: "", arr0:L03, arr1:L13, rad:1, color:lineColor});
    primitives.push({class:"dashline", text: "", arr0:L03, arr1:L23, rad:1, color:lineColor});
    primitives.push({class:"dashline", text: "", arr0:L12, arr1:points[1].coord1, rad:1, color:lineColor});
    primitives.push({class:"dashline", text: "", arr0:L13, arr1:points[1].coord1, rad:1, color:lineColor});
    primitives.push({class:"dashline", text: "", arr0:L23, arr1:points[1].coord1, rad:1, color:lineColor});
    if (dim<=3) {
        primitives.push({class:"arrow", text: katex.renderToString("\\vec x"), arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
    } else {  
        primitives.push({class:"arrow", text: "", arr0:points[0].coord1, arr1:points[1].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
        primitives.push({class:"arrow", text: katex.renderToString("\\vec x"), arr0:points[1].coord1, arr1:points[2].coord1, rad:2, color:[1.0, 0.0, 0.0, 1.0]});
        if (dim==4) {
            var p1 = [];
            var p2 = [];
            for (var i = 0; i < 3; i++) {
                p1[i] = (points[1].coord1[i]+points[2].coord1[i])/2+points[1].coord1[i]-points[2].coord1[i];
                p2[i] = (points[1].coord1[i]+points[2].coord1[i])/2-points[1].coord1[i]+points[2].coord1[i];
            }
            primitives.push({class:"dashline", text: "", arr0:p1, arr1:p2, rad:1, color:lineColor});
        } else {
            primitives.push({class:"dashline", text: "", arr0:points[1].coord1, arr1:L01_, rad:1, color:lineColor});
            primitives.push({class:"dashline", text: "", arr0:points[1].coord1, arr1:L02_, rad:1, color:lineColor});
            primitives.push({class:"dashline", text: "", arr0:points[1].coord1, arr1:L03_, rad:1, color:lineColor});
            primitives.push({class:"dashline", text: "", arr0:L01_, arr1:L12_, rad:1, color:lineColor});
            primitives.push({class:"dashline", text: "", arr0:L01_, arr1:L13_, rad:1, color:lineColor});
            primitives.push({class:"dashline", text: "", arr0:L02_, arr1:L12_, rad:1, color:lineColor});
            primitives.push({class:"dashline", text: "", arr0:L02_, arr1:L23_, rad:1, color:lineColor});
            primitives.push({class:"dashline", text: "", arr0:L03_, arr1:L13_, rad:1, color:lineColor});
            primitives.push({class:"dashline", text: "", arr0:L03_, arr1:L23_, rad:1, color:lineColor});
            primitives.push({class:"dashline", text: "", arr0:L12_, arr1:points[2].coord1, rad:1, color:lineColor});
            primitives.push({class:"dashline", text: "", arr0:L13_, arr1:points[2].coord1, rad:1, color:lineColor});
            primitives.push({class:"dashline", text: "", arr0:L23_, arr1:points[2].coord1, rad:1, color:lineColor});            
        }
    }

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
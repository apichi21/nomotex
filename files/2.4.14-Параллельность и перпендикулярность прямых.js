var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([1,-2,0]), movable: "free"});
    points.push({coord1: vec3.create([-2,3,0]), movable: "free"});
    points.push({coord1: vec3.create([-1,-2,0]), movable: "free"});
    points.push({coord1: vec3.create([3,4,0]), movable: "free"});
}
function initDescr() {
    var descr = "";
    descr += "<p>В случае параллельности прямых $l_1$ и $l_2$ выполняется условие $\\frac{A_1}{A_2}=\\frac{B_1}{B_2}$.</p>";
    descr += "<p>В случае перпендикулярности прямых $l_1$ и $l_2$ выполняется условие $A_1A_2+B_1B_2=0$.</p>";
    var textInputSize = 3;
    descr += "<p>$\\frac{A_1}{A_2}=$ <input type='text' id='Aa1' size='"+textInputSize+"' readonly> <br/>";
    descr += "$\\frac{B_1}{B_2}=$ <input type='text' id='Bb1' size='"+textInputSize+"' readonly> </p>";
    descr += "<p>$A_1A_2=$ <input type='text' id='Aa2' size='"+textInputSize+"' readonly> <br/>";
    descr += "$B_1B_2=$ <input type='text' id='Bb2' size='"+textInputSize+"' readonly> </p>";
    descr += "Прямые $l_1$ и $l_2$ <b><span id='N'></span></b>";
    $("#description").html(descr);
    $("Title").html("Условия параллельности и перпендикулярности прямых");
}
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
    var vec_a = [];
    vec3.subtract(points[1].coord1,points[0].coord1,vec_a);
    var vec_b = [vec_a[1],-vec_a[0],0];
    vec3.normalize(vec_b);
    vec3.scale(vec_b, 2);

    var vec_a2 = [];
    vec3.subtract(points[3].coord1,points[2].coord1,vec_a2);
    var vec_b2 = [vec_a2[1],-vec_a2[0],0];
    vec3.normalize(vec_b2);
    vec3.scale(vec_b2, 2);

    var precision = 2;
    var Aa1=parseFloat((vec_b[0]/vec_b2[0]).toPrecision(precision));
    var Bb1=parseFloat((vec_b[1]/vec_b2[1]).toPrecision(precision));
    var Aa2=parseFloat((vec_b[0]*vec_b2[0]).toPrecision(precision));
    var Bb2=parseFloat((vec_b[1]*vec_b2[1]).toPrecision(precision));
    $("#Aa1").val(Aa1);
    $("#Bb1").val(Bb1);
    $("#Aa2").val(Aa2);
    $("#Bb2").val(Bb2);
    var isParallel = Aa1 == Bb1;
    var isNormal = Aa2+Bb2 == 0;
    if (isNormal) $("#N").text("перпендикулярны");
    else if (isParallel) $("#N").text("параллельны");
    else $("#N").text("не перпендикулярны и не параллельны");
    var leftPoint = [];
    var rightPoint = [];
    createLine(points[0].coord1,points[1].coord1,leftPoint,rightPoint,10);

    var vec_b0 = [];
    vec3.add(leftPoint,rightPoint,vec_b0);
    vec3.scale(vec_b0,0.5);
    vec3.add(vec_b,vec_b0);
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    primitives.push({class:"line", text: "", arr0:leftPoint, arr1:rightPoint, rad:2, color:[0.0, 0.0, 1.0, 1.0]}); 
    primitives.push({class:"point", text: "", arr0:points[0].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});

    primitives.push({class:"arrow", text: katex.renderToString("\\vec N_1(A_1,B_1)"), arr0:vec_b0, arr1:vec_b, rad:2, color:[0.7, 0.7, 0.0, 1.0]});

    var vec_b20 = [];

    var leftPoint2 = [];
    var rightPoint2 = [];
    createLine(points[2].coord1,points[3].coord1,leftPoint2,rightPoint2,10);

    vec3.add(leftPoint2,rightPoint2,vec_b20);
    vec3.scale(vec_b20,0.5);
    vec3.add(vec_b2,vec_b20);
    primitives.push({class:"line", text: "", arr0:leftPoint2, arr1:rightPoint2, rad:2, color:[0.0, 1.0, 1.0, 1.0]});    
    primitives.push({class:"point", text: "", arr0:points[2].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[3].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});

    primitives.push({class:"arrow", text: katex.renderToString("\\vec N_2(A_2,B_2)"), arr0:vec_b20, arr1:vec_b2, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
}
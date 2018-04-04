var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([1,-2,0]), movable: "free"});
    points.push({coord1: vec3.create([-2,3,0]), movable: "free"});
    points.push({coord1: vec3.create([-2,0.5,0]), movable: "fixed"});
    points.push({coord1: vec3.create([2,4,0]), movable: "free"});
}
function initDescr() {
    var descr = "";
    descr += "<p>Для того, чтобы прямая $l$, заданная общим уравнением $Ax+By+C=0$, была перпендикулярна вектору $\\vec m(a,b)$ на плоскости, необходимо и достаточно, чтобы выполнялось условие $\\frac A a=\\frac B b$</p>";
    var textInputSize = 3;
    descr += "<p>$\\frac A a=$ <input type='text' id='Aa' size='"+textInputSize+"' readonly> <br/>";
    descr += "$\\frac B b=$ <input type='text' id='Bb' size='"+textInputSize+"' readonly> </p>";
    descr += "Прямая $l$ <b><span id='N'></span></b> вектору $\\vec m$";
    $("#description").html(descr);
    $("Title").html("Перпендикулярность прямой и вектора");
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
    var precision = 2;
    var Aa=parseFloat((vec_b[0]/points[3].coord1[0]).toPrecision(precision));
    var Bb=parseFloat((vec_b[1]/points[3].coord1[1]).toPrecision(precision));
    $("#Aa").val(Aa);
    $("#Bb").val(Bb);
    var isNormal = Aa == Bb;
    if (isNormal) $("#N").text("перпендикулярна");
    else $("#N").text("не перпендикулярна");
    var leftPoint = [];
    var rightPoint = [];
    createLine(points[0].coord1,points[1].coord1,leftPoint,rightPoint,10);

    vec3.add(leftPoint,rightPoint,points[2].coord1);
    vec3.scale(points[2].coord1,0.5);
    vec3.add(vec_b,points[2].coord1);
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    primitives.push({class:"line", text: "", arr0:leftPoint, arr1:rightPoint, rad:2, color:[0.0, 0.0, 1.0, 1.0]}); 
    primitives.push({class:"point", text: katex.renderToString("M_0(x_0,y_0)"), arr0:points[0].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("M(x,y)"), arr0:points[1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    var leftPoint = [];
    var rightPoint = [];
    createLine(points[2].coord1,vec_b,leftPoint,rightPoint,10);
    primitives.push({class:"arrow", text: katex.renderToString("\\vec N"), arr0:points[2].coord1, arr1:vec_b, rad:2, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: katex.renderToString("\\vec m"), arr0:[0,0,0], arr1:points[3].coord1, rad:2, color:[0.0, 1.0, 1.0, 1.0]});
}
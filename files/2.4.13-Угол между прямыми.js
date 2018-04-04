var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([1,-3,0]), movable: "free"});
    points.push({coord1: vec3.create([6,2,0]), movable: "free"});
    points.push({coord1: vec3.create([-4,-3,0]), movable: "free"});
    points.push({coord1: vec3.create([-1,4,0]), movable: "free"});
}
function initDescr() {
    var descr = "<p>Угол между прямыми $l_1$ и $l_2$.</p>";
    var tIS = 5;
    descr += "<p>$\\alpha_1=$<input type='text' id='alpha1' size='"+tIS+"' readonly><br>";
    descr += "$\\alpha_2=$<input type='text' id='alpha2' size='"+tIS+"' readonly></p>";
    descr += "<p>$\\varphi=$<input type='text' id='phi' size='"+tIS+"' readonly></p>";

    $("#description").html(descr);
    $("Title").html("Угол между прямыми");
}
function initData() {
    var arrRad = 2;
    var lineRad = 1;
    var chosenPointRad = 5;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }

    primitives.push({class:"point", text: "", arr0:points[0].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]}); 
    primitives.push({class:"point", text: "", arr0:points[1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]}); 
    primitives.push({class:"point", text: "", arr0:points[2].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]}); 
    primitives.push({class:"point", text: "", arr0:points[3].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]}); 

    var p11 = [];
    var p12 = [];
    createLine(points[0].coord1, points[1].coord1, p11, p12,10);
    primitives.push({class:"line", text: katex.renderToString("l_1"), arr0:p11, arr1:p12, rad:arrRad, color:[0.0, 1.0, 0.0, 1.0]});
    var p21 = [];
    var p22 = [];
    createLine(points[2].coord1, points[3].coord1, p21, p22,10);
    primitives.push({class:"line", text: katex.renderToString("l_2"), arr0:p21, arr1:p22, rad:arrRad, color:[0.0, 0.6, 1.0, 1.0]});

    var vec_a = [];
    vec3.subtract(points[1].coord1,points[0].coord1,vec_a);
    var vec_b = [];
    vec3.subtract(points[3].coord1,points[2].coord1,vec_b);

    vec3.normalize(vec_a);
    vec3.normalize(vec_b);

    if (vec_a[0]<0) {
        vec3.scale(vec_a,-1);
    }
    if (vec_b[0]<0) {
        vec3.scale(vec_b,-1);
    }
    var cosThetaAB = vec3.dot(vec_a,vec_b);

    var point1 = vec3.create(vec_a);
    var point2 = vec3.create(vec_b);
    if (cosThetaAB<0) {
        if (point1[1]<0) {
            vec3.scale(point1,-1);
        } else {
            vec3.scale(point2,-1);            
        }
    }
    var p110 = [];
    var p120 = [];
    createLine([0,0,0], point1, p110, p120);
    primitives.push({class:"dashline", text: "", arr0:p110, arr1:p120, rad:1, color:[0.0, 0.9, 0.0, 1.0]});
    var p110 = [];
    var p120 = [];
    createLine([0,0,0], point2, p110, p120);
    primitives.push({class:"dashline", text: "", arr0:p110, arr1:p120, rad:1, color:[0.0, 0.6, 1.0, 1.0]});
    var A1 = vec_a[1];
    var B1 = -vec_a[0];
    var A2 = vec_b[1];
    var B2 = -vec_b[0];
    var thetaAB1 =  /*Math.abs*/(Math.atan((A1*B2-A2*B1)/(A1*A2+B1*B2))/Math.PI*180.0);
    var thetaAX1 = (Math.atan(-A1/B1)/Math.PI*180.0);
    var thetaBX1 = (Math.atan(-A2/B2)/Math.PI*180.0);

    $("#phi").val(parseFloat(thetaAB1.toPrecision(3)));
    $("#alpha1").val(parseFloat(thetaAX1.toPrecision(3)));
    $("#alpha2").val(parseFloat(thetaBX1.toPrecision(3)));

    primitives.push({class:"arc", text: katex.renderToString("\\alpha_1"), arr0:[0,0,0], arr1:[1,0,0], arr2:vec_a, Rad:1.2, rad:arrRad, color:[0.5, 0.9, 0.0, 1.0]});
    primitives.push({class:"arc", text: katex.renderToString("\\alpha_2"), arr0:[0,0,0], arr1:[1,0,0], arr2:vec_b, Rad:2.4, rad:arrRad, color:[0.5, 0.0, 0.9, 1.0]});
    primitives.push({class:"arc", text: katex.renderToString("\\varphi"), arr0:[0,0,0], arr1:point1, arr2:point2, Rad:3.8, rad:arrRad, color:[0.9, 0.5, 0.0, 1.0]});
}
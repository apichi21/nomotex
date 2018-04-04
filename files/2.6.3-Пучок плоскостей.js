var dimention="3d";
function initPoints() {
    points = [];
}
function initDescr() {
    var descr = "";
        descr += "<p>Уравнение пучка плоскостей имеет вид $\\begin{split}\\alpha\\left(A_1x+B_1y+C_1z+D_1\\right)+\\\\+\\beta\\left(A_2x+B_2y+C_2z+D_2\\right)=0\\end{split}$</p>";
    var tIS = 3; //textInputSize
    descr += "<p>$A_1$<input type='text' id='A1' size='"+tIS+"'> $B_1$<input type='text' id='B1' size='"+tIS+"'> $C_1$<input type='text' id='C1' size='"+tIS+"'> $D_1$<input type='text' id='D1' size='"+tIS+"'><br/>";
    descr += "$A_2$<input type='text' id='A2' size='"+tIS+"'> $B_2$<input type='text' id='B2' size='"+tIS+"'> $C_2$<input type='text' id='C2' size='"+tIS+"'> $D_2$<input type='text' id='D2' size='"+tIS+"'></p>";
    descr += "<p>$\\alpha_1$<input type='text' id='alpha1' size='"+tIS+"'> $\\beta_1$<input type='text' id='beta1' size='"+tIS+"'><br/>";
       descr += "$\\alpha_2$<input type='text' id='alpha2' size='"+tIS+"'> $\\beta_2$<input type='text' id='beta2' size='"+tIS+"'><br/>";
       descr += "$\\alpha_3$<input type='text' id='alpha3' size='"+tIS+"'> $\\beta_3$<input type='text' id='beta3' size='"+tIS+"'></p>";

    $("#description").html(descr);
    $("#A1").change(function(event){abcd1[0] = parseFloat(this.value);initBuffers();});
    $("#B1").change(function(event){abcd1[1] = parseFloat(this.value);initBuffers();});
    $("#C1").change(function(event){abcd1[2] = parseFloat(this.value);initBuffers();});
    $("#D1").change(function(event){abcd1[3] = parseFloat(this.value);initBuffers();});
    $("#A2").change(function(event){abcd2[0] = parseFloat(this.value);initBuffers();});
    $("#B2").change(function(event){abcd2[1] = parseFloat(this.value);initBuffers();});
    $("#C2").change(function(event){abcd2[2] = parseFloat(this.value);initBuffers();});
    $("#D2").change(function(event){abcd2[3] = parseFloat(this.value);initBuffers();});
    $("#alpha1").change(function(event){alpha[0] = parseFloat(this.value);initBuffers();});
    $("#alpha2").change(function(event){alpha[1] = parseFloat(this.value);initBuffers();});
    $("#alpha3").change(function(event){alpha[2] = parseFloat(this.value);initBuffers();});
    $("#beta1").change(function(event){beta[0] = parseFloat(this.value);initBuffers();});
    $("#beta2").change(function(event){beta[1] = parseFloat(this.value);initBuffers();});
    $("#beta3").change(function(event){beta[2] = parseFloat(this.value);initBuffers();});
    $("Title").html("Уравнение пучка плоскостей");
}
var abcd1 = [2,1,2,2];
var abcd2 = [0,2,1,-1];
var alpha = [-1,1,2];
var beta = [4,1,-1];
function pointsFromABCD(abcd, p1, p2, p3) {
    vec3.set([0,0,0], p1);
    var vecM0M1 = [];
    if (Math.abs(abcd[0])>=Math.abs(abcd[1]) && Math.abs(abcd[0])>=Math.abs(abcd[2])) {
        p1[0] = -abcd[3]/abcd[0];
        vec3.set([p1[0]-(abcd[1]+abcd[2])/abcd[0], p1[1]+1, p1[2]+1],p2);
    } else if (Math.abs(abcd[1])>=Math.abs(abcd[0]) && Math.abs(abcd[1])>=Math.abs(abcd[2])) {
        p1[1] = -abcd[3]/abcd[1];
        vec3.set([p1[0]+1, p1[1]-(abcd[0]+abcd[2])/abcd[1], p1[2]+1],p2);
    } else {
        p1[2] = -abcd[3]/abcd[2];
        vec3.set([p1[0]+1, p1[1]+1, p1[2]-(abcd[0]+abcd[1])/abcd[2]],p2);
    }
    vec3.subtract(p2,p1,vecM0M1);
    vec3.cross(abcd,vecM0M1,p3);
    vec3.add(p3,p1);
}
function initData() {
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    $("#A1").val(parseFloat(abcd1[0].toPrecision(3)));
    $("#B1").val(parseFloat(abcd1[1].toPrecision(3)));
    $("#C1").val(parseFloat(abcd1[2].toPrecision(3)));
    $("#D1").val(parseFloat(abcd1[3].toPrecision(3)));
    $("#A2").val(parseFloat(abcd2[0].toPrecision(3)));
    $("#B2").val(parseFloat(abcd2[1].toPrecision(3)));
    $("#C2").val(parseFloat(abcd2[2].toPrecision(3)));
    $("#D2").val(parseFloat(abcd2[3].toPrecision(3)));
    $("#alpha1").val(parseFloat(alpha[0].toPrecision(3)));
    $("#alpha2").val(parseFloat(alpha[1].toPrecision(3)));
    $("#alpha3").val(parseFloat(alpha[2].toPrecision(3)));
    $("#beta1").val(parseFloat(beta[0].toPrecision(3)));
    $("#beta2").val(parseFloat(beta[1].toPrecision(3)));
    $("#beta3").val(parseFloat(beta[2].toPrecision(3)));

    var pointM10 = [];
    var pointM11 = [];
    var pointM12 = [];
    pointsFromABCD(abcd1, pointM10,pointM11,pointM12);
    var pointM20 = [];
    var pointM21 = [];
    var pointM22 = [];
    pointsFromABCD(abcd2, pointM20,pointM21,pointM22);

    var n1 = abcd1;
    var n2 = abcd2;
    var v = [];
    vec3.cross(n1,n2,v);
    var p0 = [];
    if (vec3.length(v) == 0) {p0 = [0.0,0.0,0.0];}
    else {
        var det = n1[1]*n2[2]-n1[2]*n2[1];
        var det1, coord = [0,1,2];
        det1 = n1[0]*n2[2]-n1[2]*n2[0];
        if (Math.abs(det)<Math.abs(det1)) {det = det1; coord = [1,0,2];}
        det1 = n1[0]*n2[1]-n1[1]*n2[0];
        if (Math.abs(det)<Math.abs(det1)) {det = det1; coord = [2,0,1];}

        var d1 = vec3.dot(n1,pointM10);
        var d2 = vec3.dot(n2,pointM20);
        p0[coord[0]] = 0;
        p0[coord[1]] = (d1*n2[coord[2]]-d2*n1[coord[2]])/det;
        p0[coord[2]] = (d2*n1[coord[1]]-d1*n2[coord[1]])/det;
    }

    vec3.normalize(v);

    vec3.add(v,p0);

    var leftPoint = [];
    var rightPoint = [];
    createLine(p0,v,leftPoint,rightPoint);
    primitives.push({class:"line", text: katex.renderToString("l"), arr0:leftPoint, arr1:rightPoint, rad:2, color:[0.5, 0.0, 1.0, 1.0]});


    var abcdAlphaBeta = [];
    var j;

    var pAlphaBeta0 = [];
    var pAlphaBeta1 = [];
    var pAlphaBeta2 = [];
    j = 0;
    for (var i = 0; i < 4; i++) {
        abcdAlphaBeta[i] = alpha[j]*abcd1[i]+beta[j]*abcd2[i];
    }
    pointsFromABCD(abcdAlphaBeta, pAlphaBeta0,pAlphaBeta1,pAlphaBeta2);
    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pAlphaBeta0,pAlphaBeta1,pAlphaBeta2,planepoint1,planepoint2,planepoint3,planepoint4);
    primitives.push({class:"plane", text: katex.renderToString("\\pi_1"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.0, 1.0, 0.0, 0.25]});

    var pAlphaBeta0 = [];
    var pAlphaBeta1 = [];
    var pAlphaBeta2 = [];
    j = 1;
    for (var i = 0; i < 4; i++) {
        abcdAlphaBeta[i] = alpha[j]*abcd1[i]+beta[j]*abcd2[i];
    }
    pointsFromABCD(abcdAlphaBeta, pAlphaBeta0,pAlphaBeta1,pAlphaBeta2);
    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pAlphaBeta0,pAlphaBeta1,pAlphaBeta2,planepoint1,planepoint2,planepoint3,planepoint4);
    primitives.push({class:"plane", text: katex.renderToString("\\pi_2"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[1.0, 1.0, 0.0, 0.25]});
    var pAlphaBeta0 = [];
    var pAlphaBeta1 = [];
    var pAlphaBeta2 = [];

    j = 2;
    for (var i = 0; i < 4; i++) {
        abcdAlphaBeta[i] = alpha[j]*abcd1[i]+beta[j]*abcd2[i];
    }
    pointsFromABCD(abcdAlphaBeta, pAlphaBeta0,pAlphaBeta1,pAlphaBeta2);
    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(pAlphaBeta0,pAlphaBeta1,pAlphaBeta2,planepoint1,planepoint2,planepoint3,planepoint4);
    primitives.push({class:"plane", text: katex.renderToString("\\pi_3"), arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[1.0, 0.0, 0.0, 0.25]});
}
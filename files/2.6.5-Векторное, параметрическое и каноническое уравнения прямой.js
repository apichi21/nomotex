var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-3,1,2]), movable: "free"});
    points.push({coord1: vec3.create([-1,2,1]), movable: "free"});
}
function initDescr() {
    var descr = "";
    descr += "<p>Проведем прямую через точку $M_0\\left(x_0,y_0,z_0\\right)$ в направлении вектора $\\vec s\\left(m,n,p\\right)$.</p>";
    descr += "<p>$\\vec r_M=\\vec r_{M_0}+\\vec s\\cdot t$ - векторное уравнение прямой в пространстве.</p>";
    descr += "<p>$\\left\\{\\begin{matrix} \
  x=x_0+m\\cdot t \\\\ \
  y=y_0+n\\cdot t \\\\ \
  z=z_0+p\\cdot t \
\\end{matrix}\\right.$ - параметрические уравнения прямой в пространстве.</p>";
    descr += "<p>$\\frac{x-x_0}{m}=\\frac{y-y_0}{n}=\\frac{z-z_0}{p}$ - канонические уравнения прямой в пространстве.</p>";
    var tIS = 5;
    descr += "<p>m<input type='text' id='m' size='"+tIS+"'> n<input type='text' id='n' size='"+tIS+"'> p<input type='text' id='p' size='"+tIS+"'><br>";
    descr += "$x_0$<input type='text' id='x0' size='"+tIS+"'> $y_0$<input type='text' id='y0' size='"+tIS+"'> $z_0$<input type='text' id='z0' size='"+tIS+"'></p>";
    $("#description").html(descr);
    $("#m").change(function(event){points[1].coord1[0] = parseFloat(this.value)+points[0].coord1[0];initBuffers();});
    $("#n").change(function(event){points[1].coord1[1] = parseFloat(this.value)+points[0].coord1[1];initBuffers();});
    $("#p").change(function(event){points[1].coord1[2] = parseFloat(this.value)+points[0].coord1[2];initBuffers();});
    $("#x0").change(function(event){points[0].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#y0").change(function(event){points[0].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#z0").change(function(event){points[0].coord1[2] = parseFloat(this.value);initBuffers();});

    $("Title").html("Векторное, параметрическое и каноническое уравнения прямой");
}
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }

    var vecs = [];
    vec3.subtract(points[1].coord1,points[0].coord1,vecs);

    $("#m").val(parseFloat(vecs[0].toPrecision(3)));
    $("#n").val(parseFloat(vecs[1].toPrecision(3)));
    $("#p").val(parseFloat(vecs[2].toPrecision(3)));
    $("#x0").val(parseFloat(points[0].coord1[0].toPrecision(3)));
    $("#y0").val(parseFloat(points[0].coord1[1].toPrecision(3)));
    $("#z0").val(parseFloat(points[0].coord1[2].toPrecision(3)));


    var leftPoint = [];
    var rightPoint = [];
    createLine(points[0].coord1,points[1].coord1,leftPoint,rightPoint);

    // vec3.normalize(vecs);
    vec3.scale(vecs,2);
    vec3.add(vecs,points[0].coord1);

    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    primitives.push({class:"line", text: katex.renderToString("l"), arr0:leftPoint, arr1:rightPoint, rad:1.5, color:[0.0, 0.0, 1.0, 1.0]}); 

    primitives.push({class:"arrow", text: katex.renderToString("\\vec s"), arr0:points[0].coord1, arr1:points[1].coord1, rad:3, color:[1.0, 0.0, 0.0, 1.0]}); 
    primitives.push({class:"arrow", text: katex.renderToString("\\vec r_{M_0}"), arr0:[0,0,0], arr1:points[0].coord1, rad:2, color:[0.0, 1.0, 0.0, 1.0]}); 
    primitives.push({class:"arrow", text: katex.renderToString("\\vec r_M"), arr0:[0,0,0], arr1:vecs, rad:2, color:[0.0, 1.0, 0.0, 1.0]}); 
    primitives.push({class:"point", text: katex.renderToString("M_0"), arr0:points[0].coord1, rad:4, color:[0.0, 0.0, 0.6, 1.0]});
    primitives.push({class:"point", text: katex.renderToString("M"), arr0:vecs, rad:4, color:[0.0, 0.0, 0.6, 1.0]});
}
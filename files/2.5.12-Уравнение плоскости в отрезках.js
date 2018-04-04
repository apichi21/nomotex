var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-3,0,0]), movable: "line", vector: [1,0,0]});
    points.push({coord1: vec3.create([0,-1,0]), movable: "line", vector: [0,1,0]});
    points.push({coord1: vec3.create([0,0,-2]), movable: "line", vector: [0,0,1]});
}
function initDescr() {
    var descr = "";
    descr += "<p>Уравнение вида $\\frac{x}{a}+\\frac{y}{b}+\\frac{z}{c}=1$ называется уравнением плоскости в отрезках.</p>";
    var tIS = 5; //textInputSize
    descr += "<p>a<input type='text' id='a' size='"+tIS+"'> b<input type='text' id='b' size='"+tIS+"'> c<input type='text' id='c' size='"+tIS+"'></p>";
    $("#description").html(descr);

    $("#a").change(function(event){points[0].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#b").change(function(event){points[1].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#c").change(function(event){points[2].coord1[2] = parseFloat(this.value);initBuffers();});
    $("Title").html("Уравнение плоскости в отрезках");
}
function initData() {
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});

    $("#a").val(parseFloat(points[0].coord1[0].toPrecision(3)));
    $("#b").val(parseFloat(points[1].coord1[1].toPrecision(3)));
    $("#c").val(parseFloat(points[2].coord1[2].toPrecision(3)));

    var m1 = points[0].coord1;
    var m2 = points[1].coord1;
    var m3 = points[2].coord1;

    var planepoint1 = [];
    var planepoint2 = [];
    var planepoint3 = [];
    var planepoint4 = [];
    createPlane(m1,m2,m3,planepoint1,planepoint2,planepoint3,planepoint4);

    primitives.push({class:"line", text: "a", arr0:[0,0,0], arr1:m1, rad:1.5, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"line", text: "b", arr0:[0,0,0], arr1:m2, rad:1.5, color:[0.0, 1.0, 0.0, 1.0]});
    primitives.push({class:"line", text: "c", arr0:[0,0,0], arr1:m3, rad:1.5, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"plane", text: "", arr0:planepoint1, arr1:planepoint2, arr2:planepoint3, arr3:planepoint4, color:[0.5, 0.5, 1.0, 0.4]});
}
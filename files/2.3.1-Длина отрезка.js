var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-1, -2, 3]), movable: "free"});
    points.push({coord1: vec3.create([3, 2, 1]), movable: "free"});
    lines = [];
    lines.push({coord1: 0, coord2: 1, measure: true});
}
function initDescr() {
    var descr = "";
    var tIS = 5; //textInputSize

    for (var i = 1; i <= 2; i++) {
        descr += "$x_"+i+"$<input type='text' id='x"+i+"' size='"+tIS+"'> \
                  $y_"+i+"$<input type='text' id='y"+i+"' size='"+tIS+"'> \
                  $z_"+i+"$<input type='text' id='z"+i+"' size='"+tIS+"'><br/>";
    }
    descr += 'Длина отрезка<br>$|M_1M_2|=$<br>';
    descr += '$\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2+(z_2-z_1)^2}$';
    $("#description").html(descr);
    for (var i = 0; i < 2; i++) {
        $("#x"+(i+1)).change({msg: i},  function(event){points[event.data.msg].coord1[0] = parseFloat(this.value);initBuffers();});
        $("#y"+(i+1)).change({msg: i},  function(event){points[event.data.msg].coord1[1] = parseFloat(this.value);initBuffers();});
        $("#z"+(i+1)).change({msg: i},  function(event){points[event.data.msg].coord1[2] = parseFloat(this.value);initBuffers();});
    }
    $("Title").html("Нахождение длины отрезка");
}

function initData() {
    for (var i = 0; i < 2; i++) {
        $("#x"+(i+1)).val(parseFloat(points[i].coord1[0].toPrecision(3)));
        $("#y"+(i+1)).val(parseFloat(points[i].coord1[1].toPrecision(3)));
        $("#z"+(i+1)).val(parseFloat(points[i].coord1[2].toPrecision(3)));
    }

    var chosenPointRad = 6;
    var lineRad = 2;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }

    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});
    var lineColor;
    lineColor = [0.0, 0.6, 1.0, 1.0];
    primitives.push({class:"line", text: "", arr0:points[0].coord1, arr1:points[1].coord1, rad:lineRad, color:lineColor});
    primitives.push({class:"text", text: katex.renderToString("M_1"), arr0:points[0].coord1});
    primitives.push({class:"text", text: katex.renderToString("M_2"), arr0:points[1].coord1});
    primitives.push({class:"arrow", text: "", arr0:[0,0,0], arr1:points[0].coord1, rad:lineRad, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:[0,0,0], arr1:points[1].coord1, rad:lineRad, color:[0.0, 1.0, 0.0, 1.0]});
}
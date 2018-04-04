var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([2,2,2]), movable: "free"});
    points.push({coord1: vec3.create([-1,4,3]), movable: "free"});
}
function initDescr() {
    var descr = "";
    var tIS = 5; //textInputSize
    var textInputId = 0;
    descr += "<p>Новая система координат $\\left(O',x',y',z'\\right)$ получена из старой $\\left(O,x,y,z\\right)$ сдвигом на вектор $\\overrightarrow{OO'}\\left(x_0,y_0,z_0\\right)$.</p>";
    descr += "<table>";
    descr += "<tr><td>M:</td><td>x</td><td><input type='text' id='x"+textInputId+"' size='"+tIS+"'></td><td>y</td><td><input type='text' id='y"+textInputId+"' size='"+tIS+"'></td><td>z</td><td><input type='text' id='z"+textInputId+"' size='"+tIS+"'></td></tr>";
    descr += "<tr><td>O':</td><td>x</td><td><input type='text' id='Ox' size='"+tIS+"'></td><td>y</td><td><input type='text' id='Oy' size='"+tIS+"'></td><td>z</td><td><input type='text' id='Oz' size='"+tIS+"'></td></tr>";
    textInputId = 1;
    descr += "<tr><td>M:</td><td>x'</td><td><input type='text' id='x"+textInputId+"' size='"+tIS+"'></td><td>y'</td><td><input type='text' id='y"+textInputId+"' size='"+tIS+"'></td><td>z'</td><td><input type='text' id='z"+textInputId+"' size='"+tIS+"'></td></tr>";
    descr += "</table>";
    $("#description").html(descr); 

    $("#x0").change(function(event){points[1].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#y0").change(function(event){points[1].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#z0").change(function(event){points[1].coord1[2] = parseFloat(this.value);initBuffers();});
    $("#Ox").change(function(event){points[0].coord1[0] = parseFloat(this.value);initBuffers();});
    $("#Oy").change(function(event){points[0].coord1[1] = parseFloat(this.value);initBuffers();});
    $("#Oz").change(function(event){points[0].coord1[2] = parseFloat(this.value);initBuffers();});
    $("#x1").change(function(event){points[1].coord1[0] = parseFloat(this.value)+points[0].coord1[0];initBuffers();});
    $("#y1").change(function(event){points[1].coord1[1] = parseFloat(this.value)+points[0].coord1[1];initBuffers();});
    $("#z1").change(function(event){points[1].coord1[2] = parseFloat(this.value)+points[0].coord1[2];initBuffers();});

    $("Title").html("Параллельный перенос осей");
}
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    var xLeft = -4;
    var xRight = 4;
    var xCount = xRight-xLeft+1;
    var yDown = -4;
    var yUp = 4;
    var yCount = yUp-yDown+1;
    var zFar = -4;
    var zNear = 4;
    var zCount = zNear-zFar+1;
    var rad=1;

    var center = points[0].coord1;

    primitives.push({class:"arrow", text: "", arr0:[xLeft+center[0],center[1],center[2]], arr1:[xCount-1+xLeft+1+center[0],center[1],center[2]], rad:rad, color:[0.5, 0.3, 0.3, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:[center[0],yDown+center[1],center[2]], arr1:[center[0],(yCount-1+yDown+1)+center[1],center[2]], rad:rad, color:[0.5, 0.3, 0.3, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:[center[0],center[1],zFar+center[2]], arr1:[center[0],center[1],(zCount-1+zFar+1)+center[2]], rad:rad, color:[0.5, 0.3, 0.3, 1.0]});
    var len = 5;
    for (var i = 0; i < xCount; i++) {
        primitives.push({class:"dash", text: "", arr0:[(i+xLeft)+center[0],-len+center[1],center[2]], arr1:[(i+xLeft)+center[0],len+center[1],center[2]], rad:rad, color:[0.5, 0.3, 0.3, 1.0]});
    }
    for (var i = 0; i < yCount; i++) {
        primitives.push({class:"dash", text: "", arr0:[-len+center[0],(i+yDown)+center[1],center[2]], arr1:[len+center[0],(i+yDown)+center[1],center[2]], rad:rad, color:[0.5, 0.3, 0.3, 1.0]});
    }
    for (var i = 0; i < zCount; i++) {
        primitives.push({class:"dash", text: "", arr0:[-len+center[0],center[1],(i+zFar)+center[2]], arr1:[len+center[0],center[1],(i+zFar)+center[2]], rad:rad, color:[0.5, 0.3, 0.3, 1.0]});
    }
    primitives.push({class:"text", text: "O'", arr0:center});
    primitives.push({class:"text", text: "x'", arr0:[xCount-1+xLeft+1+center[0],center[1],center[2]]});
    primitives.push({class:"text", text: "y'", arr0:[center[0],(yCount-1+yDown+1)+center[1],center[2]]});
    primitives.push({class:"text", text: "z'", arr0:[center[0],center[1],(zCount-1+zFar+1)+center[2]]});

    primitives.push({class:"text", text: "O", arr0:[0,0,0]});
    primitives.push({class:"text", text: "x", arr0:[xCount-1+xLeft+1,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,(yCount-1+yDown+1),0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,(zCount-1+zFar+1)]});

    primitives.push({class:"arrow", text: "", arr0:center, arr1:[center[0]+1,center[1],center[2]], rad:2, color:[0.8, 0.8, 0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:center, arr1:[center[0],center[1]+1,center[2]], rad:2, color:[0.8, 0.8, 0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:center, arr1:[center[0],center[1],center[2]+1], rad:2, color:[0.8, 0.8, 0, 1.0]});
    primitives.push({class:"text", text: katex.renderToString("\\vec i"), arr0:[center[0]+1,center[1],center[2]]});
    primitives.push({class:"text", text: katex.renderToString("\\vec j"), arr0:[center[0],center[1]+1,center[2]]});
    primitives.push({class:"text", text: katex.renderToString("\\vec k"), arr0:[center[0],center[1],center[2]+1]});
    primitives.push({class:"arrow", text: "", arr0:[0,0,0], arr1:[1,0,0], rad:2, color:[0.8, 0.8, 0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:[0,0,0], arr1:[0,1,0], rad:2, color:[0.8, 0.8, 0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:[0,0,0], arr1:[0,0,1], rad:2, color:[0.8, 0.8, 0, 1.0]});
    primitives.push({class:"text", text: katex.renderToString("\\vec i"), arr0:[1,0,0]});
    primitives.push({class:"text", text: katex.renderToString("\\vec j"), arr0:[0,1,0]});
    primitives.push({class:"text", text: katex.renderToString("\\vec k"), arr0:[0,0,1]});

    primitives.push({class:"point", text: "M", arr0:points[1].coord1, rad:4, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:[0,0,0], arr1:points[1].coord1, rad:2, color:[0, 1, 0, 1.0]});
    primitives.push({class:"arrow", text: "", arr0:center, arr1:points[1].coord1, rad:2, color:[1, 0, 0, 1.0]});

    $("#x0").val(parseFloat(points[1].coord1[0].toPrecision(3)));
    $("#y0").val(parseFloat(points[1].coord1[1].toPrecision(3)));
    $("#z0").val(parseFloat(points[1].coord1[2].toPrecision(3)));
    $("#Ox").val(parseFloat(center[0].toPrecision(3)));
    $("#Oy").val(parseFloat(center[1].toPrecision(3)));
    $("#Oz").val(parseFloat(center[2].toPrecision(3)));
    $("#x1").val(parseFloat((points[1].coord1[0]-points[0].coord1[0]).toPrecision(3)));
    $("#y1").val(parseFloat((points[1].coord1[1]-points[0].coord1[1]).toPrecision(3)));
    $("#z1").val(parseFloat((points[1].coord1[2]-points[0].coord1[2]).toPrecision(3)));
}
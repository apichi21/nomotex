var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-3, -1, 4]), movable: "free"});
    points.push({coord1: vec3.create([3, 2, 1]), movable: "free"});
    points.push({coord1: vec3.create([0, 0, 0]), movable: "line"});
}
var ratio = 2.0/3.0;
var lengthC = 5;
function initDescr() {
    var descr = "";
    descr += '<p><label><input type="checkbox" checked onchange="checkChanged(0,this.checked);">$\\overrightarrow{OM_1}$</label>';
    descr += '<label><input type="checkbox" checked onchange="checkChanged(3,this.checked);">Координаты $x_1,y_1,z_1$ точки $M_1$</label>';
    descr += '<label><input type="checkbox" checked onchange="checkChanged(1,this.checked);">$\\overrightarrow{OM_2}$</label>';
    descr += '<label><input type="checkbox" checked onchange="checkChanged(4,this.checked);">Координаты $x_2,y_2,z_2$ точки $M_2$</label>';
    descr += '<label><input type="checkbox" checked onchange="checkChanged(2,this.checked);">$\\overrightarrow{OM}$</label>';
    descr += '<label><input type="checkbox" checked onchange="checkChanged(5,this.checked);">Координаты $x,y,z$ точки $M$</label></p>';

    var alpha = ratio/(1.0-ratio);
    var tIS = 5;

    descr += "<p>Точка $M$ делит отрезок $M_1M_2$ в отношении</p>";
    descr += '<p>$\\alpha=\\frac{|M_1M|}{|MM_2|}=$ <input type="text" id="ratio" size='+tIS+'></p>';

    descr += "<p><table>";
    var names = ["$M_1$", "$M_2$", "$M$"];
    for (var i = 0; i < 3; i++) {
        descr += "<tr id='tr"+i+"'><td>"+names[i]+":</td><td>x</td><td><input type='text' id='x"+i+"' size='"+tIS+"'></td>\
                                            <td>y</td><td><input type='text' id='y"+i+"' size='"+tIS+"'></td>\
                                            <td>z</td><td><input type='text' id='z"+i+"' size='"+tIS+"'></td></tr>";
    }
    descr += "</table></p>";
    $("#description").html(descr);

    for (var i = 0; i <= 1; i++) {
        $("#x"+i).change({msg: i},  function(event){points[event.data.msg].coord1[0] = parseFloat(this.value);initBuffers();});
        $("#y"+i).change({msg: i},  function(event){points[event.data.msg].coord1[1] = parseFloat(this.value);initBuffers();});
        $("#z"+i).change({msg: i},  function(event){points[event.data.msg].coord1[2] = parseFloat(this.value);initBuffers();});
    }
    $("#ratio").change(function(event){alpha = parseFloat(this.value); ratio = alpha/(1.0+alpha);initBuffers();});
    $("Title").html("Деление отрезка в заданном соотношении");
}
var isShow = [true,true,true,true,true,true];
function checkChanged(num, ch) {
    isShow[num] = ch;
    // for (var i = 0; i < 3; i++) {
    //     if (isShow[i+3]) {
    //         $("#tr"+i).show();
    //     } else {            
    //         $("#tr"+i).hide();
    //     }
    // }
    initBuffers();
}
function initData() {
    var pointRad = 4;
    var chosenPointRad = 6;
    var lineRad = 2;
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});
    primitives.push({class:"text", text: "x", arr0:[5,0,0]});
    primitives.push({class:"text", text: "y", arr0:[0,5,0]});
    primitives.push({class:"text", text: "z", arr0:[0,0,5]});

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:chosenPointRad, color:[1.0, 0.0, 1.0, 1.0]}); 
    }

    var pointColor;
    pointColor = [1.0, 0.3, 0.0, 1.0];
    var lineColor;
    lineColor = [0.0, 0.6, 1.0, 1.0];

    var AB = [];
    vec3.subtract(points[1].coord1,points[0].coord1,AB);
    points[2].vector = [];
    vec3.set(AB,points[2].vector);

    var AO = [];
    if (arrPoint == points[2].coord1) {
        vec3.subtract(points[2].coord1,points[0].coord1,AO);
        let lenAB = vec3.length(AB);
        ratio = vec3.dot(AO,AB)/lenAB/lenAB;
        if (ratio < 0) {
            ratio = 0;
            vec3.scale(AB, ratio, AO);
            vec3.add(AO,points[0].coord1);
            vec3.set(AO,points[2].coord1);
        }
        else if (ratio > 1) {
            ratio = 1;
            vec3.scale(AB, ratio, AO);
            vec3.add(AO,points[0].coord1);
            vec3.set(AO,points[2].coord1);
        } 
    } else {
        vec3.scale(AB, ratio, AO);
        vec3.add(AO,points[0].coord1);
        vec3.set(AO,points[2].coord1);
    }
    var alpha = ratio/(1.0-ratio);
    for (var i = 0; i < 3; i++) {
        $("#x"+i).val(parseFloat(points[i].coord1[0].toPrecision(3)));
        $("#y"+i).val(parseFloat(points[i].coord1[1].toPrecision(3)));
        $("#z"+i).val(parseFloat(points[i].coord1[2].toPrecision(3)));
    }
    $("#ratio").val(alpha.toFixed(2));
    for (var i = 0; i < 3; i++) {
        if (isShow[i]) {
            primitives.push({class:"arrow", text: "", arr0:[0,0,0], arr1:points[i].coord1, rad:lineRad, color:[0.0, 0.8, 0.0, 1.0]});
        }
    }
    function pushCoordLines(pointNum, color) {
        primitives.push({class:"dashline", text: "", arr0:points[pointNum].coord1, arr1:[0,points[pointNum].coord1[1],points[pointNum].coord1[2]], rad:1.2, color:color}); 
        primitives.push({class:"dashline", text: "", arr0:points[pointNum].coord1, arr1:[points[pointNum].coord1[0],0,points[pointNum].coord1[2]], rad:1.2, color:color});
        primitives.push({class:"dashline", text: "", arr0:points[pointNum].coord1, arr1:[points[pointNum].coord1[0],points[pointNum].coord1[1],0], rad:1.2, color:color}); 

        primitives.push({class:"dashline", text: "", arr0:[0,points[pointNum].coord1[1],points[pointNum].coord1[2]], arr1:[0,0,points[pointNum].coord1[2]], rad:1.2, color:color}); 
        primitives.push({class:"dashline", text: "", arr0:[points[pointNum].coord1[0],0,points[pointNum].coord1[2]], arr1:[0,0,points[pointNum].coord1[2]], rad:1.2, color:color});
        primitives.push({class:"dashline", text: "", arr0:[points[pointNum].coord1[0],points[pointNum].coord1[1],0], arr1:[0,points[pointNum].coord1[1],0], rad:1.2, color:color}); 

        primitives.push({class:"dashline", text: "", arr0:[0,points[pointNum].coord1[1],points[pointNum].coord1[2]], arr1:[0,points[pointNum].coord1[1],0], rad:1.2, color:color}); 
        primitives.push({class:"dashline", text: "", arr0:[points[pointNum].coord1[0],0,points[pointNum].coord1[2]], arr1:[points[pointNum].coord1[0],0,0], rad:1.2, color:color});
        primitives.push({class:"dashline", text: "", arr0:[points[pointNum].coord1[0],points[pointNum].coord1[1],0], arr1:[points[pointNum].coord1[0],0,0], rad:1.2, color:color}); 

        // primitives.push({class:"dashline", text: "", arr0:points[pointNum].coord1, arr1:[points[pointNum].coord1[0],0,0], rad:1.2, color:color});
        // primitives.push({class:"dashline", text: "", arr0:points[pointNum].coord1, arr1:[0,points[pointNum].coord1[1],0], rad:1.2, color:color});
        // primitives.push({class:"dashline", text: "", arr0:points[pointNum].coord1, arr1:[0,0,points[pointNum].coord1[2]], rad:1.2, color:color});
    }

    for (var i = 0; i < 3; i++) {
        if (isShow[i+3]) {
            pushCoordLines(i,[0.0, 0.0, 0.8, 1.0]);
        }
    }
    primitives.push({class:"line", text: "", arr0:points[0].coord1, arr1:points[1].coord1, rad:lineRad, color:lineColor});
    primitives.push({class:"point", text: katex.renderToString("M_1"), arr0:points[0].coord1, rad:pointRad, color:pointColor});
    primitives.push({class:"point", text: katex.renderToString("M_2"), arr0:points[1].coord1, rad:pointRad, color:pointColor});
    primitives.push({class:"point", text: katex.renderToString("M"), arr0:points[2].coord1, rad:pointRad, color:pointColor});
}
var dimention="3d";
function initPoints() {
    points = [];
}
var C;
function initDescr() {
    $("#containerYellow").css({"min-width": "350px"});
    var descr = "";
    descr += '<h4>Эллиптический отражатель в твердотельных лазерах</h4>';

    descr += '<p>Оптическое свойство эллипса используется в некоторых типах твердотельных лазеров, которые состоят из:</p>';
    descr += '<label><input type="checkbox" checked onchange="isShow[0]=this.checked; initBuffers();">Электрического конденсатора (1)</label>';
    descr += '<label><input type="checkbox" checked onchange="isShow[1]=this.checked; initBuffers();">Импульсной газоразрядной лампы (2), \
              которая под действием электрического переменного тока создаёт световые импульсы (кванты света - фотоны)</label>';
    descr += '<label><input type="checkbox" id="lightRays" checked onchange="isShow[2]=this.checked; initBuffers();">Лучи света от импульсной лампы (3), которые отражаются \
              от эллиптического отражателя</label>';
    descr += '<label><input type="checkbox" checked onchange="isShow[3]=this.checked; initBuffers();">Эллиптический отражатель (4).</label>';
    descr += '<p>Импульсная лампа цилиндрической формы располагается в одном из фокусов $F_1$ отражателя, который в сечении имеет форму эллипса.</p>';
    descr += '<p>Согласно оптическому свойству эллипса отражённые лучи собираются во втором фокусе $F_2$. Поскольку сумма фокусных радиусов $r_1+r_2$, \
              представляющих собой длины прямого и отражённого луча, в эллипсе будет одинакова для всех лучей, расходящихся в разных напряалениях от \
              импульсной лампы, то все эти лучи будут собираться в один и тот же момент времени.</p>';
    descr += '<p>Во втором фокусе $F_2$ располагается стержень (цилиндр) - активный элемент.</p>';
    descr += '<label><input type="checkbox" checked onchange="isShow[4]=this.checked; initBuffers();">Активный элемент (5), например, из рубина \
              (керамика на основе $\\ce{Al_2O_3}$ с примесями $\\ce{Cr}$)</label>';
    descr += '<p>Сфокусированные лучи света генерируют в активном элементе лазерное (монохроматическое, однонаправленное) излучение, которое многократно \
              отражается и усиливается от <i>оптического резонатора</i>, состоящего из:</p>';
    descr += '<label><input type="checkbox" checked onchange="isShow[5]=this.checked; initBuffers();">Непрозрачного зеркала (6).</label>';
    descr += '<label><input type="checkbox" checked onchange="isShow[6]=this.checked; initBuffers();">Полупрозрачного зеркала (7).</label>';
    descr += '<p>Многократно усилившись в оптическом резонаторе, излучение через полупрозрачное зеркало выпускается наружу - образуется тонкий <i>лазерный луч</i> (8) \
              с очень малым углом расходимости, когерентный (колебание в одной фазе), монохроматический (колебание на одной частоте).</p>';
    descr += '<label><input type="checkbox" id="laserRay" checked onchange="isShow[7]=this.checked; initBuffers();">Лазерный луч (8).</label>';

    descr += '<p><input type="button" onclick="toggleLaser(true);" value="Включить лазер"> <input type="button" onclick="toggleLaser(false);" value="Выключить лазер"></p>';

    $("#description").html(descr);
    $("Title").html("Кривые и поверхности второго порядка");

    scaleFactor = 0.18;
}
var isShow = [true, true, true, true, true, true, true, true];
function toggleLaser(on) {
    isShow[2] = on;
    isShow[7] = on;
    $("#lightRays").prop("checked", on);
    $("#laserRay").prop("checked", on);
    initBuffers();
}
function initData() {
    isShowAxes = false;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }

    var arrRad = 1.5;

    var pi2 = 2.0*Math.PI;

    class Mesh {
      constructor(slicesPsi, slicesPhi, color) {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.color = [];
        this.slicesPsi = slicesPsi;
        this.slicesPhi = slicesPhi;
      }
    }
    var meshArray = [];

    var a = 5;
    var b = 4;
    var cylHalfLen = 8;
    var tubeHalfLen = 11;

    var c = Math.sqrt(a*a-b*b);

    if (isShow[3]) {
        meshArray.push(new Mesh(64, 1));
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*pi2/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = a*Math.cos(psi);
                var py = (phi*2-1)*cylHalfLen;
                var pz = b*Math.sin(psi);
                mesh.vertices.push( px, pz, py );
                mesh.normals.push( 2*px/a/a );
                mesh.normals.push( 2*pz/b/b );
                mesh.normals.push( 0 );
            }
        }
        mesh.color.push( 0.9, 0.9, 0.9, 1.0 );

        var pointM0 = [a*Math.cos(2), b*Math.sin(2), cylHalfLen];
        var pointN0 = [a*Math.cos(2)-0.3, b*Math.sin(2)+1, cylHalfLen+0.3];
        primitives.push({class:"line", text: "", arr0:pointM0, arr1:pointN0, rad:1, color:[0.0,0.0,0.0,1.0]});
        primitives.push({class:"text", text: "4", pos: "cb", arr0:pointN0});
    }

    if (isShow[6]) {
        var mirrorRad = 1;
        var mirrorThickness = 1;
        meshArray.push(new Mesh(32, 1));
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*pi2/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = mirrorRad*Math.cos(psi)-c;
                var py = tubeHalfLen+phi*mirrorThickness;
                var pz = mirrorRad*Math.sin(psi);
                mesh.vertices.push( px, pz, py );
                mesh.normals.push( px+c, pz, 0 );
            }
        }
        mesh.color.push( 0.9, 0.9, 0.9, 1.0 );

        meshArray.push(new Mesh(32, 1));
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*pi2/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = phi*mirrorRad*Math.cos(psi)-c;
                var py = tubeHalfLen;
                var pz = phi*mirrorRad*Math.sin(psi);
                mesh.vertices.push( px, pz, py );
                mesh.normals.push( 0, 0, 1 );
            }
        }
        mesh.color.push( 0.9, 0.9, 0.9, 1.0 );

        meshArray.push(new Mesh(32, 1));
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*pi2/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = phi*mirrorRad*Math.cos(psi)-c;
                var py = tubeHalfLen+mirrorThickness;
                var pz = phi*mirrorRad*Math.sin(psi);
                mesh.vertices.push( px, pz, py );
                mesh.normals.push( 0, 0, 1 );
            }
        }
        mesh.color.push( 0.9, 0.9, 0.9, 1.0 );

        var pointM0 = [mirrorRad*Math.cos(2.5)-c, mirrorRad*Math.sin(2.5), tubeHalfLen+mirrorThickness];
        var pointN0 = [mirrorRad*Math.cos(2.5)-c-0.5, mirrorRad*Math.sin(2.5)+0.9, tubeHalfLen+mirrorThickness+0.3];
        primitives.push({class:"line", text: "", arr0:pointM0, arr1:pointN0, rad:1, color:[0.0,0.0,0.0,1.0]});
        primitives.push({class:"text", text: "7", pos: "cb", arr0:pointN0});
    }

    if (isShow[5]) {
        var mirrorRad = 1;
        var mirrorThickness = 1;
        meshArray.push(new Mesh(32, 1));
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*pi2/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = mirrorRad*Math.cos(psi)-c;
                var py = -tubeHalfLen-phi*mirrorThickness;
                var pz = mirrorRad*Math.sin(psi);
                mesh.vertices.push( px, pz, py );
                mesh.normals.push( px+c, pz, 0 );
            }
        }
        mesh.color.push( 0.9, 0.9, 0.9, 1.0 );

        meshArray.push(new Mesh(32, 1));
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*pi2/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = phi*mirrorRad*Math.cos(psi)-c;
                var py = -tubeHalfLen;
                var pz = phi*mirrorRad*Math.sin(psi);
                mesh.vertices.push( px, pz, py );
                mesh.normals.push( 0, 0, 1 );
            }
        }
        mesh.color.push( 0.9, 0.9, 0.9, 1.0 );

        meshArray.push(new Mesh(32, 1));
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*pi2/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = phi*mirrorRad*Math.cos(psi)-c;
                var py = -tubeHalfLen-mirrorThickness;
                var pz = phi*mirrorRad*Math.sin(psi);
                mesh.vertices.push( px, pz, py );
                mesh.normals.push( 0, 0, 1 );
            }
        }
        mesh.color.push( 0.9, 0.9, 0.9, 1.0 );

        var pointM0 = [mirrorRad*Math.cos(1)-c, mirrorRad*Math.sin(1), -tubeHalfLen-mirrorThickness];
        var pointN0 = [mirrorRad*Math.cos(1)-c+0.3, mirrorRad*Math.sin(1)+1, -tubeHalfLen-mirrorThickness-0.3];
        primitives.push({class:"line", text: "", arr0:pointM0, arr1:pointN0, rad:1, color:[0.0,0.0,0.0,1.0]});
        primitives.push({class:"text", text: "6", pos: "cb", arr0:pointN0});
    }

    var focus1 = [-c,0,cylHalfLen];
    var focus2 = [c,0,cylHalfLen];

    if (isShow[4]) {
        meshArray.push(new Mesh(32, 1));
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*pi2/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = 0.3*Math.cos(psi)-c;
                var py = (phi*2-1)*tubeHalfLen;
                var pz = 0.3*Math.sin(psi);
                mesh.vertices.push( px, pz, py );
                mesh.normals.push( px+c, pz, 0 );
            }
        }
        mesh.color.push( 0.8, 0.0, 0.0, 1.0 );

        meshArray.push(new Mesh(32, 1));
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*pi2/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = phi*0.3*Math.cos(psi)-c;
                var py = tubeHalfLen;
                var pz = phi*0.3*Math.sin(psi);
                mesh.vertices.push( px, pz, py );
                mesh.normals.push( 0, 0, 1 );
            }
        }
        mesh.color.push( 0.8, 0.0, 0.0, 1.0 );

        meshArray.push(new Mesh(32, 1));
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*pi2/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = phi*0.3*Math.cos(psi)-c;
                var py = -tubeHalfLen;
                var pz = phi*0.3*Math.sin(psi);
                mesh.vertices.push( px, pz, py );
                mesh.normals.push( 0, 0, 1 );
            }
        }
        mesh.color.push( 0.8, 0.0, 0.0, 1.0 );

        var pointM0 = [-c, 0, cylHalfLen*0.5+tubeHalfLen*0.5];
        var pointN0 = [-c-0.3, 1.3, cylHalfLen*0.5+tubeHalfLen*0.5+0.3];
        primitives.push({class:"line", text: "", arr0:pointM0, arr1:pointN0, rad:1, color:[0.0,0.0,0.0,1.0]});
        primitives.push({class:"text", text: "5", pos: "cb", arr0:pointN0});
    }

    if (isShow[1]) {
        meshArray.push(new Mesh(32, 1));
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*pi2/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = 0.3*Math.cos(psi)+c;
                var py = (phi*2-1)*tubeHalfLen;
                var pz = 0.3*Math.sin(psi);
                mesh.vertices.push( px, pz, py );
                mesh.normals.push( px-c, pz, 0 );
            }
        }
        mesh.color.push( 0.7, 0.7, 1.0, 1.0 );

        meshArray.push(new Mesh(32, 1));
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*pi2/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = phi*0.3*Math.cos(psi)+c;
                var py = tubeHalfLen;
                var pz = phi*0.3*Math.sin(psi);
                mesh.vertices.push( px, pz, py );
                mesh.normals.push( 0, 0, 1 );
            }
        }
        mesh.color.push( 0.7, 0.7, 1.0, 1.0 );

        meshArray.push(new Mesh(32, 1));
        var mesh = meshArray[meshArray.length-1];
        for (var i = 0; i <= mesh.slicesPsi; i++) {
            var psi = i*pi2/mesh.slicesPsi;
            for (var j = 0; j <= mesh.slicesPhi; j++) {
                var phi = j/mesh.slicesPhi;
                var px = phi*0.3*Math.cos(psi)+c;
                var py = -tubeHalfLen;
                var pz = phi*0.3*Math.sin(psi);
                mesh.vertices.push( px, pz, py );
                mesh.normals.push( 0, 0, 1 );
            }
        }
        mesh.color.push( 0.7, 0.7, 1.0, 1.0 );

        var pointM0 = [c, 0, cylHalfLen*0.5+tubeHalfLen*0.5];
        var pointN0 = [c-0.3, 1, cylHalfLen*0.5+tubeHalfLen*0.5+0.3];
        primitives.push({class:"line", text: "", arr0:pointM0, arr1:pointN0, rad:1, color:[0.0,0.0,0.0,1.0]});
        primitives.push({class:"text", text: "2", pos: "cb", arr0:pointN0});
    }

    if (isShow[7]) {
        var pointM0 = [-c,0,tubeHalfLen+tubeHalfLen/2];
        var pointN0 = [-c-0.6, 0.8, tubeHalfLen+tubeHalfLen/2+0.3];
        primitives.push({class:"line", text: "", arr0:pointM0, arr1:pointN0, rad:1, color:[0.0,0.0,0.0,1.0]});
        primitives.push({class:"text", text: "8", pos: "cb", arr0:pointN0});

        primitives.push({class:"line", text: "", arr0:[-c,0,-tubeHalfLen+0.01], arr1:[-c,0,tubeHalfLen+tubeHalfLen], rad:0.2, scaling: false, color:[1.0,0.0,0.0,1.0]});
    }
    if (isShow[0]) {
        var vireColor = [0.1,0.6,0.1,1.0];
        var condColor = [0.1,0.7,0.1,1.0];
        var condX = a+2;
        var condZ1 = tubeHalfLen+1;
        var condZ2 = 0.5;
        var condPlaneX = 0.7;
        var condPlaneY = 0.5;

        var pointM0 = [condX, 0, -condZ1*0.3-condZ2*0.6];
        var pointN0 = [condX+0.3, 1, -condZ1*0.3-condZ2*0.6-0.3];
        primitives.push({class:"line", text: "", arr0:pointM0, arr1:pointN0, rad:1, color:[0.0,0.0,0.0,1.0]});
        primitives.push({class:"text", text: "1", pos: "cb", arr0:pointN0});

        primitives.push({class:"line", text: "", arr0:[c,0,tubeHalfLen], arr1:[c,0,condZ1], rad:2, color:vireColor});
        primitives.push({class:"line", text: "", arr0:[c,0,condZ1], arr1:[condX,0,condZ1], rad:2, color:vireColor});
        primitives.push({class:"line", text: "", arr0:[condX,0,condZ1], arr1:[condX,0,condZ2], rad:2, color:vireColor});

        var planePoint1 = [condX+condPlaneX, condPlaneY, condZ2-0.01];
        var planePoint2 = [condX+condPlaneX, -condPlaneY, condZ2-0.01];
        var planePoint3 = [condX-condPlaneX, -condPlaneY, condZ2-0.01];
        var planePoint4 = [condX-condPlaneX, condPlaneY, condZ2-0.01];

        primitives.push({class:"line", text: "", arr0:planePoint1, arr1:planePoint2, rad:1.5, color:vireColor});
        primitives.push({class:"line", text: "", arr0:planePoint2, arr1:planePoint3, rad:1.5, color:vireColor});
        primitives.push({class:"line", text: "", arr0:planePoint3, arr1:planePoint4, rad:1.5, color:vireColor});
        primitives.push({class:"line", text: "+", pos:"cb", arr0:planePoint4, arr1:planePoint1, rad:1.5, color:vireColor});
        primitives.push({class:"plane", text: "", arr0:planePoint1, arr1:planePoint2, arr2:planePoint3, arr3:planePoint4, color:condColor});

        primitives.push({class:"line", text: "", arr0:[c,0,-tubeHalfLen], arr1:[c,0,-condZ1], rad:2, color:vireColor});
        primitives.push({class:"line", text: "", arr0:[c,0,-condZ1], arr1:[condX,0,-condZ1], rad:2, color:vireColor});
        primitives.push({class:"line", text: "", arr0:[condX,0,-condZ1], arr1:[condX,0,-condZ2], rad:2, color:vireColor});

        var planePoint1 = [condX+condPlaneX, condPlaneY, -condZ2+0.01];
        var planePoint2 = [condX+condPlaneX, -condPlaneY, -condZ2+0.01];
        var planePoint3 = [condX-condPlaneX, -condPlaneY, -condZ2+0.01];
        var planePoint4 = [condX-condPlaneX, condPlaneY, -condZ2+0.01];

        primitives.push({class:"line", text: "", arr0:planePoint1, arr1:planePoint2, rad:1.5, color:vireColor});
        primitives.push({class:"line", text: "", arr0:planePoint2, arr1:planePoint3, rad:1.5, color:vireColor});
        primitives.push({class:"line", text: "", arr0:planePoint3, arr1:planePoint4, rad:1.5, color:vireColor});
        primitives.push({class:"line", text: "-", pos:"cb", arr0:planePoint4, arr1:planePoint1, rad:1.5, color:vireColor});

        primitives.push({class:"plane", text: "", arr0:planePoint1, arr1:planePoint2, arr2:planePoint3, arr3:planePoint4, color:condColor});
    }

    if (isShow[2]) {
        var paramOfPoint = [2.5, 1, 4, 5.5];

        var textPoint = [0, -b*0.7, cylHalfLen+0.5];

        for (var i = 0; i < paramOfPoint.length; i++) {
            var arrowColor = [0.3,0.3,1.0,1.0];

            var pointM = [a*Math.cos(paramOfPoint[i]), b*Math.sin(paramOfPoint[i]), cylHalfLen];

            var centerPoint1 = [];
            var centerPoint2 = [];
            vec3.add(pointM, focus1, centerPoint1);
            vec3.add(pointM, focus2, centerPoint2);
            vec3.scale(centerPoint1, 0.5);
            vec3.scale(centerPoint2, 0.5);

            primitives.push({class:"arrow", text: "", arr0:focus2, arr1:centerPoint2, rad:arrRad, color:arrowColor});
            primitives.push({class:"arrow", text: "", arr0:centerPoint2, arr1:pointM, rad:arrRad, color:arrowColor});
            primitives.push({class:"arrow", text: "", arr0:pointM, arr1:centerPoint1, rad:arrRad, color:arrowColor});
            primitives.push({class:"arrow", text: "", arr0:centerPoint1, arr1:focus1, rad:arrRad, color:arrowColor});

            if (i==2) {
                var pointM0 = [];
                vec3.add(centerPoint2, pointM, pointM0);
                vec3.scale(pointM0, 0.5);
                primitives.push({class:"line", text: "", arr0:pointM0, arr1:textPoint, rad:1, color:[0.0,0.0,0.0,1.0]});
            } else if (i==3) {
                var pointM0 = [];
                vec3.add(centerPoint1, pointM, pointM0);
                vec3.scale(pointM0, 0.5);
                primitives.push({class:"line", text: "", arr0:pointM0, arr1:textPoint, rad:1, color:[0.0,0.0,0.0,1.0]});
            }

            var centerPoint11 = [];
            var centerPoint21 = [];
            var focus11 = [];
            var focus21 = [];
            var pointM1 = [];
            vec3.add(centerPoint1, [0,0,-2*cylHalfLen], centerPoint11);
            vec3.add(centerPoint2, [0,0,-2*cylHalfLen], centerPoint21);
            vec3.add(focus1, [0,0,-2*cylHalfLen], focus11);
            vec3.add(focus2, [0,0,-2*cylHalfLen], focus21);
            vec3.add(pointM, [0,0,-2*cylHalfLen], pointM1);
            primitives.push({class:"arrow", text: "", arr0:focus21, arr1:centerPoint21, rad:arrRad, color:arrowColor});
            primitives.push({class:"arrow", text: "", arr0:centerPoint21, arr1:pointM1, rad:arrRad, color:arrowColor});
            primitives.push({class:"arrow", text: "", arr0:pointM1, arr1:centerPoint11, rad:arrRad, color:arrowColor});
            primitives.push({class:"arrow", text: "", arr0:centerPoint11, arr1:focus11, rad:arrRad, color:arrowColor});
        }

        primitives.push({class:"text", text: "3", pos: "ct", arr0:textPoint});
    }

    var colorp = [0.9, 0.9, 0.9, 1.0];
    var colorl = [0.0, 0.0, 0.0, 1.0];
    for (var k = 0; k < meshArray.length; k++) {
        var mesh = meshArray[k];

        for (var i=0; i < mesh.slicesPsi; i++) {
            for (var j=0; j < mesh.slicesPhi; j++) {
                var aa = [i*(mesh.slicesPhi+1)+j, i*(mesh.slicesPhi+1)+j+1, (i+1)*(mesh.slicesPhi+1)+j+1, (i+1)*(mesh.slicesPhi+1)+j];
                mesh.indices.push(aa[0],aa[1],aa[2],aa[0],aa[2],aa[3]);
            }
        }
        if (!mesh.normals.length) {
            for (var i = 0; i <= mesh.slicesPsi; i++) {
                for (var j = 0; j <= mesh.slicesPhi; j++) {
                    mesh.normals.push( 0.0, 0.0, 1.0 );
                }
            }
        }
        meshes.push({
            vertices:mesh.vertices,
            normals:mesh.normals,
            indices:mesh.indices,
            color:mesh.color,
            reinit:true
        });
        for (var i=0; i < mesh.slicesPsi; i++) {
            for (var j=0; j < mesh.slicesPhi; j++) {
                var aa = [i*(mesh.slicesPhi+1)+j, i*(mesh.slicesPhi+1)+j+1, (i+1)*(mesh.slicesPhi+1)+j+1, (i+1)*(mesh.slicesPhi+1)+j];

                if (j==mesh.slicesPhi-1) {
                    primitives.push({class:"line", text: "", arr0:[mesh.vertices[aa[1]*3],mesh.vertices[aa[1]*3+1],mesh.vertices[aa[1]*3+2]], arr1:[mesh.vertices[aa[2]*3],mesh.vertices[aa[2]*3+1],mesh.vertices[aa[2]*3+2]], rad:1, color:colorl});
                }
                if (j==0) {
                    primitives.push({class:"line", text: "", arr0:[mesh.vertices[aa[0]*3],mesh.vertices[aa[0]*3+1],mesh.vertices[aa[0]*3+2]], arr1:[mesh.vertices[aa[3]*3],mesh.vertices[aa[3]*3+1],mesh.vertices[aa[3]*3+2]], rad:1, color:colorl});
                }
            }
        }
    }
}
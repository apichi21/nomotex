var dimention="3d";
function initPoints() {
    points = [];

    curves[0] = {pointsArr: [], color: [0.8, 0.85, 0.8, 1.0], angle:1.4};

    curves[0].pointsArr.push([28.06, 4.74, 0]);
    curves[0].pointsArr.push([27.69, 5.99, 0]);
    curves[0].pointsArr.push([27.2, 6.59, 0]);
    curves[0].pointsArr.push([26.06, 7.98, 0]);
    curves[0].pointsArr.push([24.6, 7.98, 0]);
    curves[0].pointsArr.push([12.4, 8, 0]);
    curves[0].pointsArr.push([0, 8, 0]);
    curves[0].pointsArr.push([-2.63, 8, 0]);
    curves[0].pointsArr.push([-4.45, 6.17, 0]);
    curves[0].pointsArr.push([-5.9, 4.7, 0]);
    curves[0].pointsArr.push([-6.13, 3, 0]);
    curves[0].pointsArr.push([-6.13, 3, 0]);
    curves[0].pointsArr.push([-6.5, 3, 0]);
    curves[0].pointsArr.push([-5.65, 8.3, 0]);
    curves[0].pointsArr.push([0, 8.3, 0]);
    curves[0].pointsArr.push([15, 8.3, 0]);
    curves[0].pointsArr.push([24.6, 8.3, 0]);
    curves[0].pointsArr.push([27.61, 8.3, 0]);
    curves[0].pointsArr.push([28.38, 4.75, 0]);
    curves[0].pointsArr.push([28.06, 4.74, 0]);
    curves[0].pointsArr.push([28.06, 4.74, 0]);

    curves[1] = {pointsArr: [], color: [0.5, 0.5, 0.5, 1.0], angle:1.45};

    curves[1].pointsArr.push([28.06, 4.74, 0]);
    curves[1].pointsArr.push([27.69, 5.99, 0]);
    curves[1].pointsArr.push([27.2, 6.59, 0]);
    curves[1].pointsArr.push([27.84, 4.96, 0]);
    curves[1].pointsArr.push([27.81, 3.49, 0]);
    curves[1].pointsArr.push([27.8, 3.15, 0]);
    curves[1].pointsArr.push([27.54, 3.03, 0]);
    curves[1].pointsArr.push([27.03, 2.8, 0]);
    curves[1].pointsArr.push([26.08, 2.8, 0]);
    curves[1].pointsArr.push([24.08, 2.8, 0]);
    curves[1].pointsArr.push([25.22, 2.02, 0]);
    curves[1].pointsArr.push([26.36, 1.24, 0]);
    curves[1].pointsArr.push([28.95, 2.72, 0]);
    curves[1].pointsArr.push([33.8, 5.5, 0]);
    curves[1].pointsArr.push([41, 6.25, 0]);
    curves[1].pointsArr.push([41, 6.25, 0]);
    curves[1].pointsArr.push([41, 6.7, 0]);
    curves[1].pointsArr.push([33.8, 5.95, 0]);
    curves[1].pointsArr.push([28.93, 3.2, 0]);
    curves[1].pointsArr.push([28.53, 2.97, 0]);
    curves[1].pointsArr.push([28.36, 3.51, 0]);
    curves[1].pointsArr.push([28.14, 4.24, 0]);
    curves[1].pointsArr.push([28.38, 4.75, 0]);
    curves[1].pointsArr.push([28.06, 4.74, 0]);
    curves[1].pointsArr.push([28.06, 4.74, 0]);

    curves[2] = {pointsArr: [], color: [0.6, 0.6, 0.8, 1.0], angle:1.45};

    curves[2].pointsArr.push([-4.45, 6.17, 0]);
    curves[2].pointsArr.push([-5.9, 4.7, 0]);
    curves[2].pointsArr.push([-6.13, 3, 0]);
    curves[2].pointsArr.push([-6.13, 3, 0]);
    curves[2].pointsArr.push([-6.5, 3, 0]);
    curves[2].pointsArr.push([-6.2, 2.49, 0]);
    curves[2].pointsArr.push([-6.2, 0, 0]);
    curves[2].pointsArr.push([-5.7, 0, 0]);
    curves[2].pointsArr.push([-5.7, 0, 0]);
    curves[2].pointsArr.push([-5.7, 1, 0]);
    curves[2].pointsArr.push([-5.7, 1, 0]);
    curves[2].pointsArr.push([-5.7, 4.16, 0]);
    curves[2].pointsArr.push([-4.45, 6.17, 0]);

    curves[3] = {pointsArr: [], color: [0.8, 0.3, 0.3, 1.0], angle:2};

    curves[3].pointsArr.push([-5.7, 0, 0]);
    curves[3].pointsArr.push([-5.7, 1, 0]);
    curves[3].pointsArr.push([-5.7, 1, 0]);
    curves[3].pointsArr.push([-5.43, 1, 0]);
    curves[3].pointsArr.push([-5.43, 1, 0]);
    curves[3].pointsArr.push([-1, 1, 0]);
    curves[3].pointsArr.push([-1, 1, 0]);
    curves[3].pointsArr.push([0, 1, 0]);
    curves[3].pointsArr.push([0, 0, 0]);
    curves[3].pointsArr.push([0, 0, 0]);
    curves[3].pointsArr.push([-5.7, 0, 0]);

    curves[4] = {pointsArr: [], color: [0.3, 0.6, 0.6, 1.0], angle:1.5};

    curves[4].pointsArr.push([27.2, 6.59, 0]);
    curves[4].pointsArr.push([27.84, 4.96, 0]);
    curves[4].pointsArr.push([27.81, 3.49, 0]);
    curves[4].pointsArr.push([27.8, 3.15, 0]);
    curves[4].pointsArr.push([27.54, 3.03, 0]);
    curves[4].pointsArr.push([27.6, 3.43, 0]);
    curves[4].pointsArr.push([27.6, 3.74, 0]);
    curves[4].pointsArr.push([27.6, 4.17, 0]);
    curves[4].pointsArr.push([27.35, 5.36, 0]);
    curves[4].pointsArr.push([26.87, 7.7, 0]);
    curves[4].pointsArr.push([24.6, 7.7, 0]);
    curves[4].pointsArr.push([9.66, 7.7, 0]);
    curves[4].pointsArr.push([0, 7.7, 0]);
    curves[4].pointsArr.push([-2.14, 7.7, 0]);
    curves[4].pointsArr.push([-3.94, 6.28, 0]);
    curves[4].pointsArr.push([-5.02, 5.43, 0]);
    curves[4].pointsArr.push([-5.43, 1.35, 0]);
    curves[4].pointsArr.push([-5.43, 1.35, 0]);
    curves[4].pointsArr.push([-5.43, 1, 0]);
    curves[4].pointsArr.push([-5.43, 1, 0]);
    curves[4].pointsArr.push([-5.7, 1, 0]);
    curves[4].pointsArr.push([-5.7, 4.16, 0]);
    curves[4].pointsArr.push([-4.45, 6.17, 0]);
    curves[4].pointsArr.push([-2.63, 8, 0]);
    curves[4].pointsArr.push([0, 8, 0]);
    curves[4].pointsArr.push([12.4, 8, 0]);
    curves[4].pointsArr.push([24.6, 7.98, 0]);
    curves[4].pointsArr.push([26.06, 7.98, 0]);
    curves[4].pointsArr.push([27.2, 6.59, 0]);

    // curves[5] = {pointsArr: [], color: [0.6, 0.6, 0.0, 1.0], angle:1.55};
    curves[5] = {pointsArr: [], color: [0.7, 0.7, 0.5, 1.0], angle:1.55};

    curves[5].pointsArr.push([-5.43, 1.35, 0]);
    curves[5].pointsArr.push([-5.02, 5.43, 0]);
    curves[5].pointsArr.push([-3.94, 6.28, 0]);
    curves[5].pointsArr.push([-2.14, 7.7, 0]);
    curves[5].pointsArr.push([0, 7.7, 0]);
    curves[5].pointsArr.push([9.66, 7.7, 0]);
    curves[5].pointsArr.push([24.6, 7.7, 0]);
    curves[5].pointsArr.push([26.87, 7.7, 0]);
    curves[5].pointsArr.push([27.35, 5.36, 0]);
    curves[5].pointsArr.push([27.6, 4.17, 0]);
    curves[5].pointsArr.push([27.6, 3.74, 0]);
    curves[5].pointsArr.push([24.52, 3.74, 0]);
    curves[5].pointsArr.push([23.09, 2.73, 0]);
    curves[5].pointsArr.push([22.35, 2.2, 0]);
    curves[5].pointsArr.push([11.89, 2.2, 0]);
    curves[5].pointsArr.push([1.2, 2.2, 0]);
    curves[5].pointsArr.push([0.27, 1.74, 0]);
    curves[5].pointsArr.push([-0.5, 1.35, 0]);
    curves[5].pointsArr.push([-5.43, 1.35, 0]);


    // curves[0] = {pointsArr: [], color: [0.0, 0.8, 0.8, 1.0]};

    // curves[0].pointsArr.push([38.04, 7.99, 0]);
    // curves[0].pointsArr.push([32.85, 6.8, 0 ]);
    // curves[0].pointsArr.push([28.95, 5, 0   ]);
    // curves[0].pointsArr.push([28.48, 4.78, 0]);
    // curves[0].pointsArr.push([28.31, 5.5, 0 ]);
    // curves[0].pointsArr.push([28.14, 6.24, 0]);
    // curves[0].pointsArr.push([28.38, 6.75, 0]);
    // curves[0].pointsArr.push([28.06, 6.74, 0]);
    // curves[0].pointsArr.push([28.06, 6.74, 0]);
    // curves[0].pointsArr.push([27.69, 7.99, 0]);
    // curves[0].pointsArr.push([27.2, 8.59, 0 ]);
    // curves[0].pointsArr.push([27.84, 6.96, 0]);
    // curves[0].pointsArr.push([27.81, 5.49, 0]);
    // curves[0].pointsArr.push([27.8, 5.15, 0 ]);
    // curves[0].pointsArr.push([27.54, 5.03, 0]);
    // curves[0].pointsArr.push([27.03, 4.8, 0 ]);
    // curves[0].pointsArr.push([26.08, 4.8, 0 ]);
    // curves[0].pointsArr.push([24.08, 4.8, 0 ]);
    // curves[0].pointsArr.push([25.09, 3.98, 0]);
    // curves[0].pointsArr.push([26.17, 3.11, 0]);
    // curves[0].pointsArr.push([28.07, 4.03, 0]);
    // curves[0].pointsArr.push([32.71, 6.27, 0]);
    // curves[0].pointsArr.push([38.04, 7.49, 0]);
    // curves[0].pointsArr.push([38.04, 7.49, 0]);
    // curves[0].pointsArr.push([38.04, 7.99, 0]);

    // curves[1] = {pointsArr: [], color: [0.0, 0.8, 0.0, 1.0]};

    // curves[1].pointsArr.push([28.06, 6.74, 0]);
    // curves[1].pointsArr.push([27.69, 7.99, 0]);
    // curves[1].pointsArr.push([27.2, 8.59, 0 ]);
    // curves[1].pointsArr.push([26.06, 9.98, 0]);
    // curves[1].pointsArr.push([24.6, 9.98, 0 ]);
    // curves[1].pointsArr.push([12.4, 10, 0   ]);
    // curves[1].pointsArr.push([0, 10, 0      ]);
    // curves[1].pointsArr.push([-2.63, 10, 0  ]);
    // curves[1].pointsArr.push([-4.45, 8.17, 0]);
    // curves[1].pointsArr.push([-5.9, 6.7, 0  ]);
    // curves[1].pointsArr.push([-6.13, 5, 0   ]);
    // curves[1].pointsArr.push([-6.13, 5, 0   ]);
    // curves[1].pointsArr.push([-6.5, 5, 0    ]);
    // curves[1].pointsArr.push([-5.65, 10.3, 0]);
    // curves[1].pointsArr.push([0, 10.3, 0    ]);
    // curves[1].pointsArr.push([15, 10.3, 0   ]);
    // curves[1].pointsArr.push([24.6, 10.3, 0 ]);
    // curves[1].pointsArr.push([27.61, 10.3, 0]);
    // curves[1].pointsArr.push([28.38, 6.75, 0]);
    // curves[1].pointsArr.push([28.06, 6.74, 0]);
    // curves[1].pointsArr.push([28.06, 6.74, 0]);

    // curves[2] = {pointsArr: [], color: [0.5, 0.8, 0.6, 1.0]};

    // curves[2].pointsArr.push([27.2, 8.59, 0 ]);
    // curves[2].pointsArr.push([27.84, 6.96, 0]);
    // curves[2].pointsArr.push([27.81, 5.49, 0]);
    // curves[2].pointsArr.push([27.8, 5.15, 0 ]);
    // curves[2].pointsArr.push([27.54, 5.03, 0]);
    // curves[2].pointsArr.push([27.61, 5.72, 0]);
    // curves[2].pointsArr.push([27.31, 7.35, 0]);
    // curves[2].pointsArr.push([26.87, 9.7, 0 ]);
    // curves[2].pointsArr.push([24.6, 9.7, 0  ]);
    // curves[2].pointsArr.push([9.66, 9.7, 0  ]);
    // curves[2].pointsArr.push([0, 9.7, 0     ]);
    // curves[2].pointsArr.push([-1.64, 9.7, 0 ]);
    // curves[2].pointsArr.push([-3.88, 8.2, 0 ]);
    // curves[2].pointsArr.push([-5.02, 7.43, 0]);
    // curves[2].pointsArr.push([-5.4, 2.13, 0 ]);
    // curves[2].pointsArr.push([-5.4, 2.13, 0 ]);
    // curves[2].pointsArr.push([-5.4, 1.43, 0 ]);
    // curves[2].pointsArr.push([-5.4, 1.43, 0 ]);
    // curves[2].pointsArr.push([-5.7, 1.43, 0 ]);
    // curves[2].pointsArr.push([-5.7, 6.16, 0 ]);
    // curves[2].pointsArr.push([-4.45, 8.17, 0]);
    // curves[2].pointsArr.push([-2.63, 10, 0  ]);
    // curves[2].pointsArr.push([0, 10, 0      ]);
    // curves[2].pointsArr.push([12.4, 10, 0   ]);
    // curves[2].pointsArr.push([24.6, 9.98, 0 ]);
    // curves[2].pointsArr.push([26.06, 9.98, 0]);
    // curves[2].pointsArr.push([27.2, 8.59, 0 ]);

    // curves[3] = {pointsArr: [], color: [0.4, 0.4, 0.8, 1.0]};

    // curves[3].pointsArr.push([-4.45, 8.17, 0]);
    // curves[3].pointsArr.push([-5.9, 6.7, 0  ]);
    // curves[3].pointsArr.push([-6.13, 5, 0   ]);
    // curves[3].pointsArr.push([-6.13, 5, 0   ]);
    // curves[3].pointsArr.push([-6.5, 5, 0    ]);
    // curves[3].pointsArr.push([-6.2, 2.49, 0 ]);
    // curves[3].pointsArr.push([-6.2, 0, 0    ]);
    // curves[3].pointsArr.push([-5.7, 0, 0    ]);
    // curves[3].pointsArr.push([-5.7, 0, 0    ]);
    // curves[3].pointsArr.push([-5.7, 1.43, 0 ]);
    // curves[3].pointsArr.push([-5.7, 1.43, 0 ]);
    // curves[3].pointsArr.push([-5.7, 6.16, 0 ]);
    // curves[3].pointsArr.push([-4.45, 8.17, 0]);

    // curves[4] = {pointsArr: [], color: [0.8, 0.3, 0.3, 1.0]};

    // curves[4].pointsArr.push([-5.7, 0, 0   ]);
    // curves[4].pointsArr.push([-5.7, 1.43, 0]);
    // curves[4].pointsArr.push([-5.7, 1.43, 0]);
    // curves[4].pointsArr.push([-5.4, 1.43, 0]);
    // curves[4].pointsArr.push([-5.4, 1.43, 0]);
    // curves[4].pointsArr.push([-1.4, 1.41, 0]);
    // curves[4].pointsArr.push([-1.4, 1.41, 0]);
    // curves[4].pointsArr.push([0, 1.4, 0    ]);
    // curves[4].pointsArr.push([0, 0, 0      ]);
    // curves[4].pointsArr.push([-5.7, 0, 0   ]);
    // curves[4].pointsArr.push([-5.7, 0, 0   ]);


    for (var k = 0; k < curves.length; k++) {
        for (var i = 0; i < curves[k].pointsArr.length; i++) {
            if (i==0 && k==0) {
                minX = curves[k].pointsArr[i][0];
                maxX = curves[k].pointsArr[i][0];
            } else {
                if ( minX > curves[k].pointsArr[i][0] ) {
                    minX = curves[k].pointsArr[i][0];
                }
                if ( maxX < curves[k].pointsArr[i][0] ) {
                    maxX = curves[k].pointsArr[i][0];
                }
            }
        }
    }

    for (var k = 0; k < curves.length; k++) {
        for (var i = 0; i < curves[k].pointsArr.length; i++) {
            curves[k].pointsArr[i][0] -= (minX+maxX)/2;
        }
    }
    // curves[2].pointsArr.push(curves[0].pointsArr[6]);
    maxX -= (minX+maxX)/2;
    minX = -maxX;

    scaleFactor = 0.14;
// 0,0,0
// 0,10,0
// 6,10.009031295776367,0
// 15,10,0
// 24,10,0
// 27.234638214111328,10.023682594299316,0
// 27.852975845336914,5.5,0
// 27.97351837158203,4.800000190734863,0
// 26.236560821533203,4.800000190734863,0
// 24.07567024230957,4.800000190734863,0
// 24.992534637451172,3.8742337226867676,0
// 26.164167404174805,2.5861198902130127,0
// 28.179901123046875,3.869259834289551,0
// 32.05936813354492,6.937507629394531,0
// 38.04325866699219,7.487760543823242,0

// -0.5,0,0
// -0.5,10.5,0
// 6,10.5,0
// 15,10.5,0
// 24.01240348815918,10.5,0
// 27.700000762939453,10.5,0
// 28.41794204711914,5.527860641479492,0
// 28.56587791442871,4.612793445587158,0
// 29.004711151123047,4.962087154388428,0
// 32.759178161621094,7.461479663848877,0
// 38.044185638427734,7.990290641784668,0

// 0.1711024045944214,2.200523853302002,0
// 6.7043609619140625,2.2035021781921387,0
// 7.491305351257324,3.322158098220825,0
// 7.973336219787598,3.984053134918213,0
// 13.345552444458008,4,0
// 23.053375244140625,4,0
// 23.379764556884766,4.667966842651367,0
// 23.882699966430664,5.5,0
// 27.899999618530273,5.5,0
}
var curves = [];
function initDescr() {
    var descr = "";
    descr += '<h4>Корпус ракетного двигателя на твёрдом топливе (РДТТ)</h4>';
    descr += '<p>Корпус РДТТ состоит в основном из элементов конструкций, форма которых образована поверхностями вращения.</p>';

    descr += '<p>';
    descr += '<label><input type="checkbox" checked onchange="isShow[0]=this.checked; initBuffers();"> \
              1) Силовой корпус, изготовленный намоткой высокопрочных композитных материалов.</label>';
    descr += '<label><input type="checkbox" checked onchange="isShow[1]=this.checked; initBuffers();"> \
              2) Сопловой блок, изготовленный из высокотемпературных композитов.</label>';
    descr += '<label><input type="checkbox" checked onchange="isShow[2]=this.checked; initBuffers();"> \
              3) Задний вкладыш.</label>';
    descr += '<label><input type="checkbox" checked onchange="isShow[3]=this.checked; initBuffers();"> \
              4) Воспламенительное устройство.</label>';
    descr += '<label><input type="checkbox" checked onchange="isShow[4]=this.checked; initBuffers();"> \
              5) Теплозащитное покрытие корпуса.</label>';
    descr += '<label><input type="checkbox" checked onchange="isShow[5]=this.checked; initBuffers();"> \
              6) Само твёрдое топливо - как правило, имеет только часть поверхности в форме поверхности вращения.</label>';
    descr += '</p>';
    descr += '<p>';
    descr += '<label><input type="radio" name="a" onchange="anglePi=1; initBuffers();"> Половина РДТТ</label>';
    descr += '<label><input type="radio" name="a" checked onchange="anglePi=1.5; initBuffers();"> Три четверти РДТТ</label>';
    descr += '<label><input type="radio" name="a" onchange="anglePi=2; initBuffers();"> Полный РДТТ</label>';
    descr += '</p>';
    descr += '<label><input type="checkbox" checked onchange="isShow[6]=this.checked; initBuffers();"> \
              Ось вращения.</label>';
    // descr += '<label><input type="checkbox" onchange="changeAnimate(this.checked);"> Анимация вращения</label>';

    $("#description").html(descr);
    $("Title").html("Поверхность вращения");

    scaleFactor = 0.12;
    rotAngX = 25.5;
}
var isShow = [true,true,true,true,true,true,true];
var isAnimate = false;
var paramTimer;
var animStep = 0.005;
function changeAnimate(anim) {
    isAnimate = anim;

    if (anim) {
        paramTimer = setInterval(function () {
            if (parameter + animStep < anglePi*Math.PI) {
                parameter += animStep;
            } else {
                parameter = 0;
            }
            initBuffers();
        }, 20);
    } else {
        clearInterval(paramTimer);
        initBuffers();
    }
}
var parameter = 0;
var anglePi = 1.5;
var maxX = 0;
var minX = 0;
function compRationalBezierCurve(t, point1, point2, point3) {
    var b1 = (1-t)*(1-t);
    var b2 = Math.SQRT2 * t * (1-t);
    var b3 = t * t;
    var w = b1 + b2 + b3;

    var x = point1[0] * b1 + point2[0] * b2 + point3[0] * b3;
    var y = point1[1] * b1 + point2[1] * b2 + point3[1] * b3;
    var z = point1[2] * b1 + point2[2] * b2 + point3[2] * b3;

    return [x/w, y/w, z/w];
}
function compRationalBezierCurveDerivative(t, point1, point2, point3) {
    var b1 = (1-t)*(1-t);
    var b2 = Math.SQRT2 * t * (1-t);
    var b3 = t * t;
    var w = b1 + b2 + b3;

    var b1d = -Math.SQRT2*(b1+b2);
    var b2d = Math.SQRT2*(b1-b3);
    var b3d = Math.SQRT2*(b2+b3);

    var x = point1[0] * b1d + point2[0] * b2d + point3[0] * b3d;
    var y = point1[1] * b1d + point2[1] * b2d + point3[1] * b3d;
    var z = point1[2] * b1d + point2[2] * b2d + point3[2] * b3d;

    return [x/w/w, y/w/w, z/w/w];
}
function initData() {
    isShowAxes = false;
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }

    var vertices = [];
    var normals = [];
    var indices = [];
    var slices1 = 16;
    var slices = 64;

    var lineNum = 0;

    var lineVertices = [];
    var lineDerivatives = [];
    var lineCurves = [];

    for (var k = 0; k < curves.length; k++) {
        var curvesNum = (curves[k].pointsArr.length-1)/2;

        for (var j = 0; j < curvesNum; j++) {
            lineVertices[lineNum] = [];
            lineDerivatives[lineNum] = [];
            for (var i = 0; i <= slices1; i++) {
                var t = i/slices1;
                lineVertices[lineNum].push( compRationalBezierCurve(t, curves[k].pointsArr[j*2], curves[k].pointsArr[j*2+1], curves[k].pointsArr[j*2+2]) );
                lineDerivatives[lineNum].push( compRationalBezierCurveDerivative(t, curves[k].pointsArr[j*2], curves[k].pointsArr[j*2+1], curves[k].pointsArr[j*2+2]) );
            }
            lineCurves[lineNum] = k;
            lineNum++;
        }
    }
    if (isShow[6]) {
        primitives.push({class:"line", text: katex.renderToString("l"), ratio:0, arr0:[minX-4,0,0], arr1:[maxX+4,0,0], rad:2, color:[0.0, 0.0, 1.0, 1.0]});
    }

    var polygonVertices = [];
    var polygonNormals = [];
    var polygonIndices = [];
    var polygonColors = [];
    for (var k = 0; k < curves.length; k++) {
        polygonVertices[k] = [];
        polygonNormals[k] = [];
        polygonIndices[k] = [];
        polygonColors[k] = [curves[k].color[0], curves[k].color[1], curves[k].color[2], curves[k].color[3]];
        // polygonColors[k] = [curves[k].color[0]*0.5+0.5, curves[k].color[1]*0.5+0.5, curves[k].color[2]*0.5+0.5, curves[k].color[3]];
        var curvesNum = (curves[k].pointsArr.length-1)/2;
        for (var j = 0; j < curvesNum; j++) {
            for (var i = 0; i <= slices1; i++) {
                var t = i/slices1;
                var vert = compRationalBezierCurve(t, curves[k].pointsArr[j*2], curves[k].pointsArr[j*2+1], curves[k].pointsArr[j*2+2]);
                polygonVertices[k].push(vert[0],vert[1],vert[2]);
            }
        }

        for (var i = 0; i < polygonVertices[k].length/3; i++) {
            polygonNormals[k].push(0, 0, 1);
        }
        polygonIndices[k] = earcut(polygonVertices[k], null, 3);
    }

    for (var k = 0; k < lineVertices.length; k++) {
        vertices[k] = [];
        normals[k] = [];
        for (var i = 0; i <= slices1; i++) {
            for (var j = 0; j <= slices; j++) {
                var ang;
                if (anglePi == 1.5) {
                    ang = curves[lineCurves[k]].angle;
                } else {
                    ang = anglePi;
                }
                var psi = Math.PI*2-j*Math.PI*ang/slices;
                var px = lineVertices[k][i][0];
                var py = lineVertices[k][i][1]*Math.cos(psi);
                var pz = lineVertices[k][i][1]*Math.sin(psi);
                vertices[k].push( px, py, pz );
                normals[k].push( lineDerivatives[k][i][1], -lineDerivatives[k][i][0]*Math.cos(psi), -lineDerivatives[k][i][0]*Math.sin(psi) );
            }
        }
    }
    if (anglePi < 2) {
        if (isShow[0]) {
            var p1 = [0,8.2,0];
            var p2 = [0,8.2+1.5,0];
            primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:1, color:[0.0,0.0,0.0,1.0]});
            primitives.push({class:"text", text: "1", pos: "cb", arr0:p2});
        }
        if (isShow[1]) {
            var p1 = [18.25,5.4,0];
            var p2 = [18.25,5.4+1,0];
            primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:1, color:[0.0,0.0,0.0,1.0]});
            primitives.push({class:"text", text: "2", pos: "cb", arr0:p2});
        }
        if (isShow[2]) {
            var p1 = [-23.25,2.3,0];
            var p2 = [-23.25-1.5,2.3+2,0];
            primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:1, color:[0.0,0.0,0.0,1.0]});
            primitives.push({class:"text", text: "3", pos: "cb", arr0:p2});
        }
        if (isShow[3]) {
            var p1 = [-22.25,0.4,0];
            var p2 = [-22.25-3,0.4+1,0];
            primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:1, color:[0.0,0.0,0.0,1.0]});
            primitives.push({class:"text", text: "4", pos: "cb", arr0:p2});
        }
        if (isShow[4]) {
            var p1 = [-10,7.8,0];
            var p2 = [-10,7.8+1.5,0];
            primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:1, color:[0.0,0.0,0.0,1.0]});
            primitives.push({class:"text", text: "5", pos: "cb", arr0:p2});
        }
        if (isShow[5]) {
            var p1 = [-15,5,0];
            var p2 = [-15-2,5+4.5,0];
            primitives.push({class:"line", text: "", arr0:p1, arr1:p2, rad:1, color:[0.0,0.0,0.0,1.0]});
            primitives.push({class:"text", text: "6", pos: "cb", arr0:p2});
        }
    }

    var colorp1 = [0.8,0.8,0,1];

    var colorp = [0.0, 0.8, 0.0, 1.0];
    var colorl = [0.0, 0.0, 0.0, 1.0];
    for (var k = 0; k < vertices.length; k++) {
        if (!isShow[lineCurves[k]]) continue;
        indices[k] = [];
        for (var i=0; i < slices1; i++) {
            for (var j=0; j < slices; j++) {
                var aa = [i*(slices+1)+j, i*(slices+1)+j+1, (i+1)*(slices+1)+j+1, (i+1)*(slices+1)+j];
                indices[k].push(aa[0],aa[1],aa[2],aa[0],aa[2],aa[3]);
            }
        }
        if (!normals[k] || normals[k].length==0) {
            normals[k] = [];
            for (var i = 0; i <= slices1; i++) {
                for (var j = 0; j <= slices; j++) {
                    normals[k].push( 0.0, 0.0, 0.0 );
                }
            }
        }
        meshes.push({
            vertices:vertices[k],
            normals:normals[k],
            indices:indices[k],
            color:curves[lineCurves[k]].color,
            // centerTranslate:[-(minX+maxX)/2, 0, 0],
            reinit:true
        });
        for (var i=0; i < slices1; i++) {
            for (var j=0; j < slices; j++) {
                var aa = [i*(slices+1)+j, i*(slices+1)+j+1, (i+1)*(slices+1)+j+1, (i+1)*(slices+1)+j];
                if (i==0) {
                    primitives.push({class:"line", text: "",
                                arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]],
                                arr1:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]],
                                rad:1, color:colorl});
                }
                if (i==slices1-1) {
                    primitives.push({class:"line", text: "",
                                arr0:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]],
                                arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]],
                                rad:1, color:colorl});
                }

                if (anglePi<2 && !(lineCurves[k]==3 && anglePi==1.5)) {
                    if (j==slices-1) {
                        primitives.push({class:"line", text: "",
                                    arr0:[vertices[k][aa[1]*3],vertices[k][aa[1]*3+1],vertices[k][aa[1]*3+2]],
                                    arr1:[vertices[k][aa[2]*3],vertices[k][aa[2]*3+1],vertices[k][aa[2]*3+2]],
                                    rad:1, color:colorl});
                    }
                    if (j==0) {
                        primitives.push({class:"line", text: "",
                                        arr0:[vertices[k][aa[0]*3],vertices[k][aa[0]*3+1],vertices[k][aa[0]*3+2]],
                                        arr1:[vertices[k][aa[3]*3],vertices[k][aa[3]*3+1],vertices[k][aa[3]*3+2]],
                                        rad:1, color:colorl});
                    }
                }
            }
        }
    }
    if (anglePi<2) {
        for (var i = 0; i < polygonVertices.length; i++) {
            if (!isShow[i]) continue;
            meshes.push({
                vertices:polygonVertices[i],
                normals:polygonNormals[i],
                indices:polygonIndices[i],
                color:polygonColors[i],
                reinit:true
            });

            var ang;
            if (anglePi == 1.5) {
                ang = curves[i].angle;
            } else {
                ang = anglePi;
            }
            meshes.push({
                vertices:polygonVertices[i],
                normals:polygonNormals[i],
                indices:polygonIndices[i],
                rotateX:-ang*180,
                color:polygonColors[i],
                reinit:true
            });
        }
    }
}
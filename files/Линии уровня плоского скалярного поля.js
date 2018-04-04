let dimention = "2d";
let uxyStr = '(x * y) / (x ^ 2 + y ^ 2 + 1)';
let uxy = math.compile(uxyStr);
//Параметры для построения линий уровня
let xMinC = -5, xMaxC = 5, xCount = 40, stepX = (xMaxC - xMinC) / xCount;
let yMinC = -3, yMaxC = 3, yCount = 24, stepY = (yMaxC - yMinC) / yCount;

let cMax = 0.47, cMin = -0.47, cCount = 10,
    stepC = (cMax - cMin) / (cCount-1);

let flag = 0;

function initPoints() {
    points = [];
    points.push({coord1: vec3.create([xMinC, yMinC, 0]), movable: "free"});
    points.push({coord1: vec3.create([xMaxC, yMaxC, 0]), movable: "free"});
}

function initDescr() {
    let textInputSize = 5;
    let descriptionFontSize = 18;

    $("#description").html(`<p style="font-size: ${descriptionFontSize}px">Построение линий уровня скалярного поля<br/>
    $u(M) = u(x, y)$<br></p>`);

    let parametershtml = `
    $u(x, y)$: <input type='text' style='width: 70%;' id='uxy' size='${textInputSize}' value='${uxyStr}'/><br/>
    $c_{min}$: <input type='text' style='width: 70%;' id='cMin' size='${textInputSize}' value='0'/><br/>
    $c_{max}$: <input type='text' style='width: 70%;' id='cMax' size='${textInputSize}' value='0'/><br/>
    $N_{c}$: <input type='text' style='width: 70%;' id='cCount' size='${textInputSize}' value='${cCount}'/><br/>
    <p>Сетка для построения линий уровня: </p>
    $x_{min}$: <input type='text' style='width: 70%;' id='xMinC' size='${textInputSize}' value='${xMinC}'/><br/>
    $x_{max}$: <input type='text' style='width: 70%;' id='xMaxC' size='${textInputSize}' value='${xMaxC}'/><br/>
    $y_{min}$: <input type='text' style='width: 70%;' id='yMinC' size='${textInputSize}' value='${yMinC}'/><br/>
    $y_{max}$: <input type='text' style='width: 70%;' id='yMaxC' size='${textInputSize}' value='${yMaxC}'/><br/>
    $N_{x}$: <input type='text' style='width: 70%;' id='xCount' size='${textInputSize}' value='${xCount}'/><br/>
    $N_{y}$: <input type='text' style='width: 70%;' id='yCount' size='${textInputSize}' value='${yCount}'/><br/>   
    <button id="buildchart" style="margin: 15px auto;display: block;">Построить линии уровня</button><br/>
    `;

    $("#parameters").html(parametershtml);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]); // Обновление формул

    let displayVals = function () {
        uxyStr = $('#uxy').val();
        uxy = math.compile(uxyStr);

        let newcMin = parseFloat($('#cMin').val());
        let newcMax = parseFloat($('#cMax').val());
        if (newcMin!=cMin){
            cMin = newcMin;
            flag = 1;
        }
        if (newcMax!=cMax){
            cMax = newcMax;
            flag = 1;
        }

        cCount = parseFloat($('#cCount').val());
        if (cCount < 1){
            cCount = 1;
        }
        stepC = (cMax - cMin) / (cCount-1);

        xMinC = parseFloat($('#xMinC').val());
        xMaxC = parseFloat($('#xMaxC').val());

        yMinC = parseFloat($('#yMinC').val());
        yMaxC = parseFloat($('#yMaxC').val());

        xCount = parseFloat($('#xCount').val());
        stepX = (xMaxC - xMinC) / xCount;
        yCount = parseFloat($('#yCount').val());
        stepY = (yMaxC - yMinC) / yCount;

        points[0].coord1[0] = xMinC;
        points[0].coord1[1] = yMinC;
        points[1].coord1[0] = xMaxC;
        points[1].coord1[1] = yMaxC;

        initBuffers();
    };


    $("#buildchart").click(function (event) {
        displayVals();
    });


    $("Title").html('Линии уровня плоского скалярного поля');
}

function initData() {
    let pointRad = 4;
    let chosenPointRad = 5;
    if (arrPoint != 0) {
        primitives.push({class: "point", text: "", arr0: arrPoint, rad: chosenPointRad, color: [1.0, 0.0, 1.0, 1.0]});
    }

    if (points[0].coord1[0] > points[1].coord1[0] - stepX) points[0].coord1[0] = points[1].coord1[0] - stepX;
    if (points[0].coord1[1] > points[1].coord1[1] - stepY) points[0].coord1[1] = points[1].coord1[1] - stepY;

    xMinC = points[0].coord1[0];
    yMinC = points[0].coord1[1];
    xMaxC = points[1].coord1[0];
    yMaxC = points[1].coord1[1];

    $('#xMinC').val(parseFloat(xMinC).toFixed(2));
    $('#xMaxC').val(parseFloat(xMaxC).toFixed(2));
    $('#yMinC').val(parseFloat(yMinC).toFixed(2));
    $('#yMaxC').val(parseFloat(yMaxC).toFixed(2));
    $('#cMin').val(cMin);
    $('#cMax').val(cMax);
    $('#cCount').val(cCount);
    // Находим размер сетки
    let sizeXC = parseInt(((xMaxC - xMinC) / stepX + 1));
    let sizeYC = parseInt(((yMaxC - yMinC) / stepY + 1));

    primitives.push({
        class: "point",
        text: katex.renderToString('(x_{min},y_{min})'),
        pos: "rt",
        arr0: points[0].coord1,
        rad: pointRad,
        color: [0.0, 0.0, 1.0, 1.0]
    });
    primitives.push({
        class: "point",
        text: katex.renderToString('(x_{max},y_{max})'),
        arr0: points[1].coord1,
        rad: pointRad,
        color: [0.0, 0.0, 1.0, 1.0]
    });
    // Вычисляем значение функции на сетке
    uxyValues = [], uxyValuesWithoutNaN = [];
    for (let x = xMinC; x <= xMaxC; x += stepX) {
        for (let y = yMinC; y <= yMaxC; y += stepY) {
            let t = uxy.eval({x: x, y: y});
            uxyValues.push(t);
            if (!isNaN(t)) {
                uxyValuesWithoutNaN.push(t);
            }
        }
    }
    //Находим минимум и максимум, чтобы задать границы С
    if (!flag) {
        cMin = parseFloat(Math.min(...uxyValuesWithoutNaN).toFixed(2));
        cMax = parseFloat(Math.max(...uxyValuesWithoutNaN).toFixed(2));
    }

    if ((cMax - cMin) / stepC > 50) {
        stepC = parseFloat(((cMax - cMin) / 50).toFixed(2));
    }

    $('#cMin').val(cMin);
    $('#cMax').val(cMax);
    $('#cCount').val(cCount);

    let lineRad = 1.5;

    for (let c = cMin; c <= cMax; c += stepC) {
        let textFlag = true;
        let textC = `c = ${c.toFixed(2)}`;
        let lineColor = [1.0 / math.abs(c + cMin + Math.random()), 0.0, 0.0, 1.0];

        let iterX = 0, iterY = 0;
        for (let x = xMinC; x <= xMaxC - stepX; x += stepX) {
            iterY = 0;
            for (let y = yMinC; y <= yMaxC - stepY; y += stepY) {
                // Метод маркированных квадратов
                let points = [];

                let x0 = x;
                let y0 = y;
                let f0 = uxyValues[iterX * sizeYC + iterY];

                let x1 = x + stepX;
                let y1 = y;
                let f1 = uxyValues[(iterX + 1) * sizeYC + iterY];

                let x2 = x + stepX;
                let y2 = y + stepY;
                let f2 = uxyValues[(iterX + 1) * sizeYC + iterY + 1];

                let x3 = x;
                let y3 = y + stepY;
                let f3 = uxyValues[iterX * sizeYC + iterY + 1];

                if ((f0 >= c && f1 < c) || (f1 > c && f0 <= c)) {
                    let t = (c - f1) / (f0 - f1);
                    let x = x0 * t + x1 * (1 - t);
                    let y = y0 * t + y1 * (1 - t);
                    points.push(vec3.create([x, y, 0]));
                }

                if ((f1 >= c && f2 < c) || (f2 > c && f1 <= c)) {
                    let t = (c - f2) / (f1 - f2);
                    let x = x1 * t + x2 * (1 - t);
                    let y = y1 * t + y2 * (1 - t);
                    points.push(vec3.create([x, y, 0]));
                }

                if ((f2 >= c && f3 < c) || (f3 > c && f2 <= c)) {
                    let t = (c - f3) / (f2 - f3);
                    let x = x2 * t + x3 * (1 - t);
                    let y = y2 * t + y3 * (1 - t);
                    points.push(vec3.create([x, y, 0]));
                }

                if ((f3 >= c && f0 < c) || (f0 > c && f3 <= c)) {
                    let t = (c - f0) / (f3 - f0);
                    let x = x3 * t + x0 * (1 - t);
                    let y = y3 * t + y0 * (1 - t);
                    points.push(vec3.create([x, y, 0]));
                }

                if (points.length === 2) {
                    if (textFlag === true) {
                        primitives.push({
                            class: "point",
                            text: `<span style="font-size: 0.8em">${katex.renderToString(textC)}</span>`,
                            arr0: vec3.create([points[0][0] - 1.5, points[0][1], 0]),
                            // arr0: points[0],
                            pos: "cc",
                            rad: 0,
                            color: [1.0, 1.0, 1.0, 0.0],
                        });
                        textFlag = false;
                    }

                    primitives.push({
                        class: "line",
                        text: '',
                        arr0: points[0],
                        arr1: points[1],
                        rad: lineRad,
                        color: lineColor,
                        pos: "lt",
                    });
                }
                iterY += 1;
            }
            iterX += 1;
        }
    }
}
let dimention = "3d";

let uxyStr = "x * y / (x ^ 2 + y ^ 2 + 1)";
let uxy = math.compile(uxyStr);

let xCount = 24;
let yCount = 24;

let xMin = -5,
    xMax = 5,
    stepX = (xMax - xMin) / xCount;
let yMin = -5,
    yMax = 5,
    stepY = (yMax - yMin) / yCount;

let xCcount = 24;
let yCcount = 24;

let xMinC = -3,
    xMaxC = 3,
    stepXC = (xMaxC - xMinC) / xCcount;
let yMinC = -3,
    yMaxC = 3,
    stepYC = (yMaxC - yMinC) / yCcount;

let cCount = 40;
let cMin = -2;
let cMax = 2;
let stepC = (cMax - cMin) / cCount;

function initPoints() {
    points = [];

    /*
      В массиве points следует задавать только те точки, для которых нужна возможность перемещения мышью.
      Не стоит в него добавлять посторонние элементы с отличающимися свойствами (как vecBegin).
      Можно задамать только:
       coord1 - координаты точки,
       movable - как именно можно её перемещать мышью,
       vector - координаты вектора, задающего ограничение на перемещение для movable:"line" и movable:"plane".
    */
    // Задание точек сетки перенёс в initData()

    //В массив points можно было добавить точки, c помощью которых можно мышью менять xMin, xMax, yMin, yMax:
    points.push({
        coord1: vec3.create([xMin, yMin, uxy.eval({ x: xMin, y: yMin })]),
        movable: "free"
    });
    points.push({
        coord1: vec3.create([xMax, yMax, uxy.eval({ x: xMax, y: yMax })]),
        movable: "free"
    });
    points.push({
        coord1: vec3.create([xMinC, yMinC, uxy.eval({ x: xMinC, y: yMinC })]),
        movable: "free"
    });
    points.push({
        coord1: vec3.create([xMaxC, yMaxC, uxy.eval({ x: xMaxC, y: yMaxC })]),
        movable: "free"
    });
}

function initDescr() {
    let textInputSize = 5;
    let descriptionFontSize = 18;

    /*
      Для формул в тексте теперь используется MathJax.
      KaTex используется для подписей у примитивов, т.к. намного быстрее но для простого текста менее удобен
      (а ещё не знает \\overrightarrow используемую для вывода длинной стрелки над вектором, заданным двумя точками, например \\overrightarrow{AB} ).
    */
    $("#description").html(
        `<p style="font-size: ${descriptionFontSize}px">Линии уровня плоского скалярного поля на поверхности.<br/></p>`
    );

    let parametershtml = `
    $u(x, y)$: <input type='text' style='width: 70%;' id='uxyStr' size='${textInputSize}' value='${uxyStr}'/><br/>
    <p>Сетка для построения поверхности: </p>
    $x_{min}$: <input type='text' style='width: 70%;' id='xMin' size='${textInputSize}' value='${xMin}'/><br/>
    $x_{max}$: <input type='text' style='width: 70%;' id='xMax' size='${textInputSize}' value='${xMax}'/><br/>
    $y_{min}$: <input type='text' style='width: 70%;' id='yMin' size='${textInputSize}' value='${yMin}'/><br/>
    $y_{max}$: <input type='text' style='width: 70%;' id='yMax' size='${textInputSize}' value='${yMax}'/><br/>
    <p style="font-size: 0.95em">Размер сетки: </p>    
    $N_x$: <input type='text' style='width: 70%;' id='xCount' size='${textInputSize}' value='${xCount}'/><br/>
    $N_y$: <input type='text' style='width: 70%;' id='yCount' size='${textInputSize}' value='${yCount}'/><br/>
    <p>Сетка для построения линий уровня: </p>
    $x_{min}$: <input type='text' style='width: 70%;' id='xMinC' size='${textInputSize}' value='${xMinC}'/><br/>
    $x_{max}$: <input type='text' style='width: 70%;' id='xMaxC' size='${textInputSize}' value='${xMaxC}'/><br/>
    $y_{min}$: <input type='text' style='width: 70%;' id='yMinC' size='${textInputSize}' value='${yMinC}'/><br/>
    $y_{max}$: <input type='text' style='width: 70%;' id='yMaxC' size='${textInputSize}' value='${yMaxC}'/><br/>
    <p style="font-size: 0.95em">Размер сетки: </p>       
    $N_x$: <input type='text' style='width: 70%;' id='xCcount' size='${textInputSize}' value='${xCcount}'/><br/>
    $N_y$: <input type='text' style='width: 70%;' id='yCcount' size='${textInputSize}' value='${yCcount}'/><br/>
    <p>Значения $c$ для линий уровня <br/>($u(x, y) = c$): </p>    
    $c_{min}$: <input type='text' style='width: 70%;' id='cMin' size='${textInputSize}' value='${cMin}'/><br/>
    $c_{max}$: <input type='text' style='width: 70%;' id='cMax' size='${textInputSize}' value='${cMax}'/><br/>
    $N_c$: <input type='text' style='width: 70%;' id='cCount' size='${textInputSize}' value='${cCount}'/><br/>
`;

    $("#parameters").html(parametershtml);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]); // Обновление формул

    let displayVals = function() {
        uxyStr = $("#uxyStr").val();
        uxy = math.compile(uxyStr);

        xMin = parseFloat($("#xMin").val());
        xMax = parseFloat($("#xMax").val());

        yMin = parseFloat($("#yMin").val());
        yMax = parseFloat($("#yMax").val());

        xCount = parseFloat($("#xCount").val());
        yCount = parseFloat($("#yCount").val());
        stepX = (xMax - xMin) / xCount;
        stepY = (yMax - yMin) / yCount;

        points[0].coord1[0] = xMin;
        points[0].coord1[1] = yMin;
        points[0].coord1[2] = uxy.eval({ x: xMin, y: yMin });

        points[1].coord1[0] = xMax;
        points[1].coord1[1] = yMax;
        points[1].coord1[2] = uxy.eval({ x: xMax, y: yMax });

        cMin = parseFloat($("#cMin").val());
        cMax = parseFloat($("#cMax").val());
        cCount = parseFloat($("#cCount").val());
        stepC = (cMax - cMin) / cCount;

        xMinC = parseFloat($("#xMinC").val());
        xMaxC = parseFloat($("#xMaxC").val());

        yMinC = parseFloat($("#yMinC").val());
        yMaxC = parseFloat($("#yMaxC").val());

        xCcount = parseFloat($("#xCcount").val());
        yCcount = parseFloat($("#yCcount").val());

        stepXC = (xMaxC - xMinC) / xCcount;
        stepYC = (yMaxC - yMinC) / yCcount;

        points[2].coord1[0] = xMinC;
        points[2].coord1[1] = yMinC;
        points[2].coord1[2] = uxy.eval({ x: xMinC, y: yMinC });

        points[3].coord1[0] = xMaxC;
        points[3].coord1[1] = yMaxC;
        points[3].coord1[2] = uxy.eval({ x: xMaxC, y: yMaxC });

        initBuffers();
    };

    $(document.body).click(function(event) {
        displayVals();
    });

    $("Title").html("Векторное поле");
}

function initData() {
    let pointRad = 4;
    let chosenPointRad = 5;
    let lineRad = 1.5;

    if (arrPoint != 0) {
        primitives.push({
            class: "point",
            text: "",
            arr0: arrPoint,
            rad: chosenPointRad,
            color: [1.0, 0.0, 1.0, 1.0]
        });
    }

    primitives.push({ class: "text", text: "x", arr0: [5, 0, 0] });
    primitives.push({ class: "text", text: "y", arr0: [0, 5, 0] });
    primitives.push({ class: "text", text: "z", arr0: [0, 0, 5] });

    if (points[0].coord1[0] > points[1].coord1[0] - stepX) {
        points[0].coord1[0] = points[1].coord1[0] - stepX;
        points[0].coord1[2] = uxy.eval({
            x: points[0].coord1[0],
            y: points[0].coord1[1]
        });
    }

    if (points[0].coord1[1] > points[1].coord1[1] - stepY) {
        points[0].coord1[1] = points[1].coord1[1] - stepY;
        points[0].coord1[2] = uxy.eval({
            x: points[0].coord1[0],
            y: points[0].coord1[1]
        });
    }

    if (points[2].coord1[0] > points[3].coord1[0] - stepXC) {
        points[2].coord1[0] = points[3].coord1[0] - stepXC;
        points[2].coord1[2] = uxy.eval({
            x: points[2].coord1[0],
            y: points[2].coord1[1]
        });
    }

    if (points[2].coord1[1] > points[3].coord1[1] - stepYC) {
        points[2].coord1[1] = points[3].coord1[1] - stepYC;
        points[2].coord1[2] = uxy.eval({
            x: points[2].coord1[0],
            y: points[2].coord1[1]
        });
    }

    xMin = points[0].coord1[0];
    yMin = points[0].coord1[1];
    xMax = points[1].coord1[0];
    yMax = points[1].coord1[1];

    xMinC = points[2].coord1[0];
    yMinC = points[2].coord1[1];
    xMaxC = points[3].coord1[0];
    yMaxC = points[3].coord1[1];

    $("#xMin").val(parseFloat(xMin).toFixed(2));
    $("#xMax").val(parseFloat(xMax).toFixed(2));
    $("#yMin").val(parseFloat(yMin).toFixed(2));
    $("#yMax").val(parseFloat(yMax).toFixed(2));

    $("#xMinC").val(parseFloat(xMinC).toFixed(2));
    $("#xMaxC").val(parseFloat(xMaxC).toFixed(2));
    $("#yMinC").val(parseFloat(yMinC).toFixed(2));
    $("#yMaxC").val(parseFloat(yMaxC).toFixed(2));

    /*
      Свойство pos задаёт выравнивание текста относительно коордират точки. Всегда задаётся двумя буквами.
      Первая определяет горизонтальное выравнивание:
       l - по левому краю,
       c - по центру,
       r - по правому краю.
      Вторая определяет вертикальное выравнивание:
       b - по нижнему краю,
       c - по центру,
       t - по верхнему краю.
      Если pos не задано, то по умолчанию используется pos:"lb".
    */
    primitives.push({
        class: "point",
        text: `<span style="font-size: 0.75em">П: ${katex.renderToString(
            "(x_{min},y_{min})"
        )}</span> `,
        pos: "rt",
        arr0: points[0].coord1,
        rad: pointRad,
        color: [0.0, 0.0, 1.0, 1.0]
    });
    primitives.push({
        class: "point",
        text: `<span style="font-size: 0.75em">П: ${katex.renderToString(
            "(x_{max},y_{max})"
        )}</span> `,
        arr0: points[1].coord1,
        rad: pointRad,
        color: [0.0, 0.0, 1.0, 1.0]
    });

    primitives.push({
        class: "point",
        text: `<span style="font-size: 0.75em">ЛУ: ${katex.renderToString(
            "(x_{min},y_{min})"
        )}</span> `,
        pos: "rt",
        arr0: points[2].coord1,
        rad: pointRad,
        color: [0.0, 0.0, 1.0, 1.0]
    });
    primitives.push({
        class: "point",
        text: `<span style="font-size: 0.75em">ЛУ: ${katex.renderToString(
            "(x_{max},y_{max})"
        )}</span> `,
        arr0: points[3].coord1,
        rad: pointRad,
        color: [0.0, 0.0, 1.0, 1.0]
    });

    for (let x = xMin; x <= xMax - stepX; x += stepX) {
        for (let y = yMin; y <= yMax - stepY; y += stepY) {
            primitives.push({
                class: "plane",
                text: "",
                arr0: [x, y, uxy.eval({ x: x, y: y })],
                arr1: [x + stepX, y, uxy.eval({ x: x + stepX, y: y })],
                arr2: [
                    x + stepX,
                    y + stepY,
                    uxy.eval({ x: x + stepX, y: y + stepY })
                ],
                arr3: [x, y + stepY, uxy.eval({ x: x, y: y + stepY })],
                color: [
                    1.0 / (math.abs(x) + math.abs(y) + 0.1),
                    1.0 / (math.abs(x) + math.abs(y) + 0.1),
                    0.0,
                    0.5
                ]
            });
        }
    }

    for (let c = cMin; c <= cMax; c += stepC) {
        let textFlag = true;
        let textC = `c = ${c.toFixed(2)}`;
        let lineColor = [
            1.0 / math.abs(c + cMin + Math.random()),
            0.0,
            0.0,
            1.0
        ];
        for (let x = xMinC; x <= xMaxC - stepXC; x += stepXC) {
            for (let y = yMinC; y <= yMaxC - stepYC; y += stepYC) {
                let points = [];
                let x0 = x;
                let y0 = y;
                let f0 = uxy.eval({ x: x0, y: y0 });

                let x1 = x + stepXC;
                let y1 = y;
                let f1 = uxy.eval({ x: x1, y: y1 });

                let x2 = x + stepXC;
                let y2 = y + stepYC;
                let f2 = uxy.eval({ x: x2, y: y2 });

                let x3 = x;
                let y3 = y + stepYC;
                let f3 = uxy.eval({ x: x3, y: y3 });

                if ((f0 >= c && f1 < c) || (f1 > c && f0 <= c)) {
                    let t = (c - f1) / (f0 - f1);
                    let x = x0 * t + x1 * (1 - t);
                    let y = y0 * t + y1 * (1 - t);
                    let z = f0 * t + f1 * (1 - t);
                    points.push(vec3.create([x, y, z]));
                }

                if ((f1 >= c && f2 < c) || (f2 > c && f1 <= c)) {
                    let t = (c - f2) / (f1 - f2);
                    let x = x1 * t + x2 * (1 - t);
                    let y = y1 * t + y2 * (1 - t);
                    let z = f1 * t + f2 * (1 - t);
                    points.push(vec3.create([x, y, z]));
                }

                if ((f2 >= c && f3 < c) || (f3 > c && f2 <= c)) {
                    let t = (c - f3) / (f2 - f3);
                    let x = x2 * t + x3 * (1 - t);
                    let y = y2 * t + y3 * (1 - t);
                    let z = f2 * t + f3 * (1 - t);
                    points.push(vec3.create([x, y, z]));
                }

                if ((f3 >= c && f0 < c) || (f0 > c && f3 <= c)) {
                    let t = (c - f0) / (f3 - f0);
                    let x = x3 * t + x0 * (1 - t);
                    let y = y3 * t + y0 * (1 - t);
                    let z = f3 * t + f0 * (1 - t);
                    points.push(vec3.create([x, y, z]));
                }

                if (points.length === 2) {
                    if (textFlag === true) {
                        primitives.push({
                            class: "point",
                            text: `<span style="font-size: 0.75em">${katex.renderToString(
                                textC
                            )}</span>`,
                            arr0: vec3.create([
                                points[0][0] - 1.5,
                                points[0][1],
                                0
                            ]),
                            // arr0: points[0],
                            pos: "cc",
                            rad: 0,
                            color: [1.0, 1.0, 1.0, 0.0]
                        });
                        textFlag = false;
                    }

                    primitives.push({
                        class: "line",
                        text: "",
                        arr0: points[0],
                        arr1: points[1],
                        rad: lineRad,
                        color: lineColor,
                        pos: "lt"
                    });
                }
            }
        }
    }
}

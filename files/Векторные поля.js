let dimention = "2d";
let f1xStr = 'sin(x+y)';
let f2xStr = 'sin(x-y)';
let f1xParsingStr = math.parse(f1xStr);
let f2xParsingStr = math.parse(f2xStr);
let f1x = math.compile(f1xStr);
let f2x = math.compile(f2xStr);

let xMin = -3, xMax = 3, stepX = 0.2;
let yMin = -2, yMax = 2, stepY = 0.2;

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
    points.push({coord1: vec3.create([xMin, yMin, 0]), movable: "free"});
    points.push({coord1: vec3.create([xMax, yMax, 0]), movable: "free"});
}


function initDescr() {
    let textInputSize = 5;
    let descriptionFontSize = 18;

    /*
      Для формул в тексте теперь используется MathJax.
      KaTex используется для подписей у примитивов, т.к. намного быстрее но для простого текста менее удобен
      (а ещё не знает \\overrightarrow используемую для вывода длинной стрелки над вектором, заданным двумя точками, например \\overrightarrow{AB} ).
    */
    $("#description").html(`<p style="font-size: ${descriptionFontSize}px">Построение плоского векторного поля.<br/>
    $u(x, y) = f_{1}(x, y) \\vec{e}_{x} + f_{2}(x, y) \\vec{e}_{y}$<br></p>`);

    let parametershtml = `
    $f_{1}(x, y)$: <input type='text' style='width: 70%;' id='fx1' size='${textInputSize}' value='${f1xStr}'/><br/>
    $f_{2}(x, y)$: <input type='text' style='width: 70%;' id='fx2' size='${textInputSize}' value='${f2xStr}'/><br/>
    $x_{min}$: <input type='text' style='width: 70%;' id='xMin' size='${textInputSize}' value='${xMin}'/><br/>
    $x_{max}$: <input type='text' style='width: 70%;' id='xMax' size='${textInputSize}' value='${xMax}'/><br/>
    $y_{min}$: <input type='text' style='width: 70%;' id='yMin' size='${textInputSize}' value='${yMin}'/><br/>
    $y_{max}$: <input type='text' style='width: 70%;' id='yMax' size='${textInputSize}' value='${yMax}'/><br/>
    $step_{x}$: <input type='text' style='width: 70%;' id='stepx' size='${textInputSize}' value='${stepX}'/><br/>
    $step_{y}$: <input type='text' style='width: 70%;' id='stepy' size='${textInputSize}' value='${stepY}'/><br/>
    <button id="buildchart" style="margin: 15px auto;display: block;">Построить векторное поле</button><br/>
    <div style="text-align: center">Построенное вектроное поле:<br/>
    <span id="uxy">$u(x, y) = ${f1xParsingStr.toTex()} \\vec{e}_{x} + ${f2xParsingStr.toTex()} \\vec{e}_{y}$</span></div>
    `;

    $("#parameters").html(parametershtml);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]); // Обновление формул

    let displayVals = function () {
        f1xStr = $('#fx1').val();
        f1x = math.compile(f1xStr);
        f1xParsingStr = math.parse(f1xStr);

        f2xStr = $('#fx2').val();
        f2x = math.compile(f2xStr);
        f2xParsingStr = math.parse(f2xStr);

        xMin = parseFloat($('#xMin').val());
        xMax = parseFloat($('#xMax').val());

        yMin = parseFloat($('#yMin').val());
        yMax = parseFloat($('#yMax').val());

        points[0].coord1[0] = xMin;
        points[0].coord1[1] = yMin;
        points[1].coord1[0] = xMax;
        points[1].coord1[1] = yMax;

        stepX = parseFloat($('#stepx').val());
        stepY = parseFloat($('#stepy').val());

        initBuffers();
        $('#uxy').html('$u(x, y) = ' + f1xParsingStr.toTex()
            + ' \\vec{e}_{x} + ' + f2xParsingStr.toTex() + '\\vec{e}_{y}$');
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]); // Обновление формул
    };


    $("#buildchart").click(function (event) {
        displayVals();
    });


    $("Title").html('Векторное поле');
}

function initData() {
    let arrRadMin = 0.5;
    let arrRadMax = 1.5;
    let pointRad = 4;
    let chosenPointRad = 5;
    if (arrPoint != 0) {
        primitives.push({class: "point", text: "", arr0: arrPoint, rad: chosenPointRad, color: [1.0, 0.0, 1.0, 1.0]});
    }

    if (points[0].coord1[0] > points[1].coord1[0] - stepX) points[0].coord1[0] = points[1].coord1[0] - stepX;
    if (points[0].coord1[1] > points[1].coord1[1] - stepY) points[0].coord1[1] = points[1].coord1[1] - stepY;

    xMin = points[0].coord1[0];
    yMin = points[0].coord1[1];
    xMax = points[1].coord1[0];
    yMax = points[1].coord1[1];

    $('#xMin').val(parseFloat(xMin).toFixed(2));
    $('#xMax').val(parseFloat(xMax).toFixed(2));
    $('#yMin').val(parseFloat(yMin).toFixed(2));
    $('#yMax').val(parseFloat(yMax).toFixed(2));

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

    let gridPoints = [];
    for (let x = xMin; x <= xMax; x += stepX) {
        for (let y = yMin; y <= yMax; y += stepY) {
            gridPoints.push([x, y, 0]);
        }
    }

    let coordEnd = [
        vec3.create([f1x.eval({x: gridPoints[0][0], y: gridPoints[0][1]}), f2x.eval({
            x: gridPoints[0][0],
            y: gridPoints[0][1]
        }), 0]),
    ];

    /*
      С вычислением длины вектора допущена ошибка. coordEnd - это уже координаты вектора и вычитать координаты точки не нужно.
      Можно было не расписывать вычисление длины, а написать:
      let maxLen = vec3.length(coordEnd[0]);
      Это, конечно, ошибкой не является. Просто использование vec3.length более наглядно.
    */
    let maxLen = math.sqrt(math.pow(coordEnd[0][0], 2) + math.pow(coordEnd[0][1], 2));

    for (let i = 1; i < gridPoints.length; i++) {
        coordEnd.push(vec3.create([f1x.eval({
            x: gridPoints[i][0],
            y: gridPoints[i][1]
        }), f2x.eval({x: gridPoints[i][0], y: gridPoints[i][1]}), 0]));

        let len = math.sqrt(math.pow(coordEnd[i][0], 2) + math.pow(coordEnd[i][1], 2));
        if (len > maxLen)
            maxLen = len;
    }

    let arrScale = Math.min(stepX, stepY) / maxLen;
    for (let i = 0; i < gridPoints.length; i++) {
        let len = vec3.length(coordEnd[i]);
        primitives.push({
            class: "arrow",
            text: '',
            arr0: gridPoints[i],
            arr1: vec3.create([gridPoints[i][0] + coordEnd[i][0] * arrScale, gridPoints[i][1] + coordEnd[i][1] * arrScale, 0]),
            /*
              Юрий Иванович сделал замечание, что почти все стрелки выглядят как треугольники
              (стрелки очень короткие, а размеры треугольника стрелки не зависят от длины, а только от радиуса).
              Это не так то просто изменить. Надо переделывать способ вывода стрелок.
              Обойти можно задавая разный радиус стрелки в зависимости от её длины. Тогда у более коротких стрелок и треугольник меньше будет.
            */
            rad: (arrRadMax - arrRadMin) * len / maxLen + arrRadMin,
            color: [1.0, 0.0, 0.0, 1.0]
        });
    }
}
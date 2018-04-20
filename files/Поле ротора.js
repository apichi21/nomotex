let dimention = "3d";
let f1Str = "x / sqrt(x ^ 2 + 5 * y^2 + z^2 + 1)",
    f2Str = "-2 * y / sqrt(x ^ 2 + 5 * y^2 + z^2 + 1)",
    f3Str = "(x * y * z) / sqrt(x ^ 2 + 5 * y^2 + z^2 + 1)";

let f1ParsingStr = math.parse(f1Str),
    f2ParsingStr = math.parse(f2Str),
    f3ParsingStr = math.parse(f3Str);

let f1 = math.compile(
    `${math.derivative(f3Str, "y")}-${math.derivative(f2Str, "z")}`
);
let f2 = math.compile(
    `${math.derivative(f1Str, "z")}-${math.derivative(f3Str, "x")}`
);
let f3 = math.compile(
    `${math.derivative(f2Str, "x")}-${math.derivative(f1Str, "y")}`
);

let Nx = 10,
    Ny = 10,
    Nz = 10;

let xMin = -5,
    xMax = 5,
    stepX = (xMax - xMin) / Nx,
    yMin = -5,
    yMax = 5,
    stepY = (yMax - yMin) / Ny,
    zMin = -5,
    zMax = 5,
    stepZ = (zMax - zMin) / Nz;

function initPoints() {
    points = [];
    points.push({ coord1: vec3.create([xMin, yMin, zMin]), movable: "free" });
    points.push({ coord1: vec3.create([xMax, yMax, zMax]), movable: "free" });
}

function initDescr() {
    let textInputSize = 5;
    let descriptionFontSize = 16;

    $("#description")
        .html(`<p style="font-size: ${descriptionFontSize}px">Построение поля ротора.<br/>
    $rot(\\mathbf a(\\mathbf M)) = (\\frac{\\partial \\mathbf R}{\\partial y} - \\frac{\\partial \\mathbf Q}{\\partial z}) \\cdot \\mathbf i$ + <br/>
     $(\\frac{\\partial \\mathbf P}{\\partial z} - \\frac{\\partial \\mathbf R}{\\partial x}) \\cdot \\mathbf j +
     (\\frac{\\partial \\mathbf Q}{\\partial x} - \\frac{\\partial \\mathbf P}{\\partial y}) \\cdot \\mathbf k$<br></p>`);

    let parametershtml = `
    $\\mathbf P(x, y, z)$: <input type='text' style='width: 65%;' id='f1' size='${textInputSize}' value='${f1Str}'/><br/>
    $\\mathbf Q(x, y, z)$: <input type='text' style='width: 65%;' id='f2' size='${textInputSize}' value='${f2Str}'/><br/>
    $\\mathbf R(x, y, z)$: <input type='text' style='width: 65%;' id='f3' size='${textInputSize}' value='${f3Str}'/><br/>
    <p>Параметры для сетки:</p><br/>
    $x_{min}$: <input type='text' style='width: 65%;' id='xMin' size='${textInputSize}' value='${xMin}'/><br/>
    $x_{max}$: <input type='text' style='width: 65%;' id='xMax' size='${textInputSize}' value='${xMax}'/><br/>
    $y_{min}$: <input type='text' style='width: 65%;' id='yMin' size='${textInputSize}' value='${yMin}'/><br/>
    $y_{max}$: <input type='text' style='width: 65%;' id='yMax' size='${textInputSize}' value='${yMax}'/><br/>
    $z_{min}$: <input type='text' style='width: 65%;' id='zMin' size='${textInputSize}' value='${zMin}'/><br/>
    $z_{max}$: <input type='text' style='width: 65%;' id='zMax' size='${textInputSize}' value='${zMax}'/><br/>
    $N_{x}$: <input type='text' style='width: 65%;' id='Nx' size='${textInputSize}' value='${Nx}'/><br/>
    $N_{y}$: <input type='text' style='width: 65%;' id='Ny' size='${textInputSize}' value='${Ny}'/><br/>
    $N_{z}$: <input type='text' style='width: 65%;' id='Nz' size='${textInputSize}' value='${Nz}'/><br/>
    `;

    $("#parameters").html(parametershtml);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub]); // Обновление формул

    let displayVals = function() {
        f1Str = $("#f1").val();
        f1ParsingStr = math.parse(f1Str);

        f2Str = $("#f2").val();
        f2ParsingStr = math.parse(f2Str);

        f3Str = $("#f3").val();
        f3ParsingStr = math.parse(f3Str);

        f1 = math.compile(
            `${math.derivative(f3Str, "y")}-${math.derivative(f2Str, "z")}`
        );
        f2 = math.compile(
            `${math.derivative(f1Str, "z")}-${math.derivative(f3Str, "x")}`
        );
        f3 = math.compile(
            `${math.derivative(f2Str, "x")}-${math.derivative(f1Str, "y")}`
        );

        xMin = parseFloat($("#xMin").val());
        xMax = parseFloat($("#xMax").val());

        yMin = parseFloat($("#yMin").val());
        yMax = parseFloat($("#yMax").val());

        zMin = parseFloat($("#zMin").val());
        zMax = parseFloat($("#zMax").val());

        points[0].coord1[0] = xMin;
        points[0].coord1[1] = yMin;
        points[0].coord1[2] = zMin;

        points[1].coord1[0] = xMax;
        points[1].coord1[1] = yMax;
        points[1].coord1[2] = zMax;

        Nx = parseFloat($("#Nx").val());
        Ny = parseFloat($("#Ny").val());
        Nz = parseFloat($("#Nz").val());

        stepX = (xMax - xMin) / Nx;
        stepY = (yMax - yMin) / Ny;
        stepZ = (zMax - zMin) / Nz;

        initBuffers();
        // $('#axyz').html(`$u(x, y, z) = (${f1ParsingStr.toTex()}) \\cdot  \\vec{i} +$<br/>
        // $+ (${f2ParsingStr.toTex()}) \\cdot  \\vec{j} + (${f3ParsingStr.toTex()}) \\cdot  \\vec{k}$`);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]); // Обновление формул
    };

    $(document.body).click(function(event) {
        displayVals();
    });

    $("Title").html("Построение поля ротора.");
}

function initData() {
    let arrRadMin = 0.5;
    let arrRadMax = 1.5;
    let pointRad = 4;
    let chosenPointRad = 5;
    if (arrPoint != 0) {
        primitives.push({
            class: "point",
            text: "",
            arr0: arrPoint,
            rad: chosenPointRad,
            color: [1.0, 0.0, 1.0, 1.0]
        });
    }

    if (points[0].coord1[0] > points[1].coord1[0] - stepX)
        points[0].coord1[0] = points[1].coord1[0] - stepX;
    if (points[0].coord1[1] > points[1].coord1[1] - stepY)
        points[0].coord1[1] = points[1].coord1[1] - stepY;
    if (points[0].coord1[2] > points[1].coord1[2] - stepZ)
        points[0].coord1[2] = points[1].coord1[2] - stepZ;

    xMin = points[0].coord1[0];
    yMin = points[0].coord1[1];
    zMin = points[0].coord1[2];
    xMax = points[1].coord1[0];
    yMax = points[1].coord1[1];
    zMax = points[1].coord1[2];

    $("#xMin").val(parseFloat(xMin).toFixed(2));
    $("#xMax").val(parseFloat(xMax).toFixed(2));

    $("#yMin").val(parseFloat(yMin).toFixed(2));
    $("#yMax").val(parseFloat(yMax).toFixed(2));

    $("#zMin").val(parseFloat(zMin).toFixed(2));
    $("#zMax").val(parseFloat(zMax).toFixed(2));

    axisLen = Math.max(xMax - xMin, yMax - yMin);
    axisLen -= axisLen / 3;

    primitives.push({
        class: "text",
        text: "x",
        arr0: [axisLen - axisLen / 10, 0, 0]
    });
    primitives.push({
        class: "text",
        text: "y",
        arr0: [0, axisLen - axisLen / 10, 0]
    });
    primitives.push({
        class: "text",
        text: "z",
        arr0: [0, 0, axisLen - axisLen / 10]
    });

    primitives.push({
        class: "point",
        text: katex.renderToString("(x_{min},y_{min})"),
        pos: "rt",
        arr0: points[0].coord1,
        rad: pointRad,
        color: [0.0, 0.0, 1.0, 1.0]
    });
    primitives.push({
        class: "point",
        text: katex.renderToString("(x_{max},y_{max})"),
        arr0: points[1].coord1,
        rad: pointRad,
        color: [0.0, 0.0, 1.0, 1.0]
    });

    let gridPoints = [];
    for (let x = xMin; x <= xMax; x += stepX) {
        for (let y = yMin; y <= yMax; y += stepY) {
            for (let z = zMin; z <= zMax; z += stepZ)
                gridPoints.push([x, y, z]);
        }
    }

    let coordEnd = [
        vec3.create([
            f1.eval({
                x: gridPoints[0][0],
                y: gridPoints[0][1],
                z: gridPoints[0][2]
            }),
            f2.eval({
                x: gridPoints[0][0],
                y: gridPoints[0][1],
                z: gridPoints[0][2]
            }),
            f3.eval({
                x: gridPoints[0][0],
                y: gridPoints[0][1],
                z: gridPoints[0][2]
            })
        ])
    ];

    let maxLen = vec3.length(coordEnd[0]);

    for (let i = 1; i < gridPoints.length; i++) {
        coordEnd.push(
            vec3.create([
                f1.eval({
                    x: gridPoints[i][0],
                    y: gridPoints[i][1],
                    z: gridPoints[i][2]
                }),
                f2.eval({
                    x: gridPoints[i][0],
                    y: gridPoints[i][1],
                    z: gridPoints[i][2]
                }),
                f3.eval({
                    x: gridPoints[i][0],
                    y: gridPoints[i][1],
                    z: gridPoints[i][2]
                })
            ])
        );

        let len = vec3.length(coordEnd[i]);

        if (len > maxLen) maxLen = len;
    }

    let arrScale = Math.min(stepX, stepY, stepZ) / maxLen;

    for (let i = 0; i < gridPoints.length; i++) {
        let len = vec3.length(coordEnd[i]);
        primitives.push({
            class: "arrow",
            text: "",
            arr0: gridPoints[i],
            arr1: vec3.create([
                gridPoints[i][0] + coordEnd[i][0] * arrScale,
                gridPoints[i][1] + coordEnd[i][1] * arrScale,
                gridPoints[i][2] + coordEnd[i][2] * arrScale
            ]),
            rad: (arrRadMax - arrRadMin) * len / maxLen + arrRadMin,
            color: [1.0, 0.0, 0.0, 1.0]
        });
    }
}

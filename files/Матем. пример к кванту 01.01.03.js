//Размерность пространства в примере (2d или 3d)
let dimention = "2d";

let quarterType = "quarter-1";

let x = 3.0,
    y = 5.0;
let z = [x, y, 0.0];

function initPoints() {
    points = [];
    points.push({ coord1: vec3.create([x, 0.0, 0.0]), movable: "fixed" });
    points.push({ coord1: vec3.create([0, y, 0.0]), movable: "fixed" });
    points.push({ coord1: vec3.create([x, y, 0.0]), movable: "free" });
}

function applyCssStyles() {
    $(".header").css({
        "text-align": "center",
        "font-weight": "bold"
    });

    $(".flex-align-items").css({
        display: "flex",
        "align-items": "center",
        "justify-content": "space-between",
        margin: "20px"
    });

    $(".sequence").css({
        border: "1px solid black",
        "border-radius": "10px",
        padding: "15px",
        margin: "0 10px"
    });

    $("form[name=quarter-order]").each(function(idx, form) {
        $(form)
            .find(".form-group")
            .each(function(idx, elem) {
                elem.style.display = "flex";
                elem.style.justifyContent = "space-between";
                elem.style.alignItems = "center";
            });
    });

    $("input[name=quarter]").each(function(idx, div) {
        $(div).change(function(elem) {
            quarterType = $(this).attr("id");

            switch (quarterType) {
                case "quarter-1":
                    points[2].coord1 = [3.0, 5.0, 0.0];
                    break;

                case "quarter-2":
                    points[2].coord1 = [-3.0, 5.0, 0.0];
                    break;

                case "quarter-3":
                    points[2].coord1 = [-3.0, -5.0, 0.0];
                    break;

                case "quarter-4":
                    points[2].coord1 = [3.0, -5.0, 0.0];
                    break;
            }

            initBuffers();
        });
    });
}

function initDescr() {
    $("#description").html(
        '<div class="header">Выражение главного значения аргумента через арктангенс.</div>'
    );

    let parametershtml = `<div style="font-size: 16px">
<div class="header">Выберите ряд:</div>
<form name="quarter-order">
	<div class="form-group">
		<input id="quarter-1" type="radio" name="quarter" checked>
		<label for="quarter-1">Первая четверть: <br>$\\arg z = \\arctan \\frac{y}{x}$</label>
	</div>
	<div class="form-group">
		<input id="quarter-2" type="radio" name="quarter" >
		<label for="quarter-2">Вторая четверть: <br>$\\arg z = \\arctan \\frac{y}{x} + \\pi$</label>
	</div>
	<div class="form-group">
		<input id="quarter-3"  type="radio" name="quarter">
		<label for="quarter-3">Третья четверть: <br>$\\arg z = \\arctan \\frac{y}{x}-\\pi$</label>
	</div>
	<div class="form-group">
		<input id="quarter-4"  type="radio" name="quarter">
		<label for="quarter-4">Четвертая четверть: <br>$\\arg z = \\arctan \\frac{y}{x}$</label>
	</div>
</form>
</div>
`;

    $("#parameters").html(parametershtml);
    $(document.body).click(function(e) {
        sequenceType = $("form[name=sequence] :checked").attr("id");
        displayType = $("form[name=form-display-type] :checked").attr("id");
        n = +$("#n-input").val();

        initBuffers();
    });

    applyCssStyles();

    $("Title").html("Пример бесконечно малых последовательностей");
}

function initData() {
    let pointRad = 4.0;
    let chosenPointRad = 5.0;
    let lineRad = 2.0;

    let colorMainLine = [0.7, 0.7, 0.0, 1.0],
        colorDashline = [0.3, 0.3, 0.3, 1.0],
        colorArgz = [1.0, 0.0, 0.0, 1.0],
        colorArctan = [0.0, 1.0, 0.0, 1.0];

    let minStep = 0.5;

    if (arrPoint != 0) {
        primitives.push({
            class: "point",
            text: "",
            arr0: arrPoint,
            rad: chosenPointRad,
            color: [1.0, 0.0, 1.0, 1.0]
        });
    }

    switch (quarterType) {
        case "quarter-1":
            if (points[2].coord1[0] < minStep) {
                points[2].coord1[0] = minStep;
            }

            if (points[2].coord1[1] < minStep) {
                points[2].coord1[1] = minStep;
            }
            break;

        case "quarter-2":
            if (points[2].coord1[0] > -minStep) {
                points[2].coord1[0] = -minStep;
            }

            if (points[2].coord1[1] < minStep) {
                points[2].coord1[1] = minStep;
            }
            break;
        case "quarter-3":
            if (points[2].coord1[0] > -minStep) {
                points[2].coord1[0] = -minStep;
            }

            if (points[2].coord1[1] > -minStep) {
                points[2].coord1[1] = -minStep;
            }
            break;
        case "quarter-4":
            if (points[2].coord1[0] < minStep) {
                points[2].coord1[0] = minStep;
            }

            if (points[2].coord1[1] > -minStep) {
                points[2].coord1[1] = -minStep;
            }
            break;
    }

    z = points[2].coord1;
    x = z[0];
    y = z[1];

    primitives.push({
        class: "arrow",
        arr0: [0.0, 0.0, 0.0],
        arr1: z,
        rad: lineRad,
        color: colorMainLine
    });

    primitives.push({
        class: "dashline",
        arr0: [x, 0.0, 0.0],
        arr1: z,
        rad: lineRad,
        color: colorDashline
    });

    primitives.push({
        class: "dashline",
        arr0: [0.0, y, 0.0],
        arr1: z,
        rad: lineRad,
        color: colorDashline
    });

    primitives.push({
        class: "point",
        text: katex.renderToString("x"),
        pos: "rt",
        arr0: [x, 0.0, 0.0],
        rad: pointRad,
        color: [0.0, 0.0, 1.0, 1.0]
    });

    primitives.push({
        class: "point",
        text: katex.renderToString("y"),
        arr0: [0.0, y, 0.0],
        rad: pointRad,
        pos: "rt",
        color: [0.0, 0.0, 1.0, 1.0]
    });

    primitives.push({
        class: "point",
        text: katex.renderToString("z"),
        arr0: z,
        rad: pointRad,
        color: [0.0, 0.0, 1.0, 1.0]
    });

    let dashLen = 0.25,
        baseLen = 0.1;

    switch (quarterType) {
        case "quarter-1":
            primitives.push({
                class: "arc",
                text: katex.renderToString("\\arg z"),
                arr0: [0.0, 0.0, 0.0],
                arr1: [x / 3, 0.0, 0.0],
                arr2: [x / 3, y / 3, 0.0],
                Rad: x / 2,
                rad: lineRad,
                color: colorArgz
            });

            primitives.push({
                class: "arc",
                text: katex.renderToString("\\arctan \\frac{y}{x}"),
                arr0: [0.0, 0.0, 0.0],
                arr1: [x / 2, 0.0, 0.0],
                arr2: [x / 2, y / 2, 0.0],
                Rad: x,
                rad: lineRad,
                color: colorArctan
            });

            let coneX1 = x / 2 / Math.sqrt(Math.pow(y / x, 2) + 1),
                coneY1 = y * coneX1 / x;

            let angleB = 2 * Math.PI - Math.atan(-coneX1 / coneY1);

            let coneX0 = coneX1 + dashLen * Math.cos(angleB),
                coneY0 = coneY1 - dashLen * Math.sin(angleB);

            let anglePer = Math.atan(coneY1 / coneX1);

            let pa = [
                    coneX0 - baseLen * Math.cos(anglePer),
                    coneY0 - baseLen * Math.sin(anglePer),
                    0.0
                ],
                pb = [
                    coneX0 + baseLen * Math.cos(anglePer),
                    coneY0 + baseLen * Math.sin(anglePer),
                    0.0
                ];

            primitives.push({
                class: "triangle",
                arr0: pa,
                arr1: pb,
                arr2: [coneX1, coneY1, 0.0],
                color: [1.0, 0.0, 0.0, 1.0]
            });
            break;

        case "quarter-2":
            primitives.push({
                class: "arc",
                text: katex.renderToString("\\arg z"),
                arr0: [0.0, 0.0, 0.0],
                arr1: [-x / 3, 0.0, 0.0],
                arr2: [x / 3, y / 3, 0.0],
                Rad: -x / 2,
                rad: lineRad,
                color: colorArgz
            });

            primitives.push({
                class: "arc",
                text: katex.renderToString("\\arctan \\frac{y}{x}"),
                arr0: [0.0, 0.0, 0.0],
                arr1: [-x / 2, 0.0, 0.0],
                arr2: [-x / 2, -y / 2, 0.0],
                Rad: -x,
                rad: lineRad,
                color: colorArctan
            });

            primitives.push({
                class: "dashline",
                arr0: [-z[0], -z[1], 0.0],
                arr1: [0.0, 0.0, 0.0],
                rad: lineRad,
                color: colorMainLine
            });
            break;

        case "quarter-3":
            primitives.push({
                class: "arc",
                text: katex.renderToString("\\arg z"),
                arr0: [0.0, 0.0, 0.0],
                arr1: [-x / 3, 0.0, 0.0],
                arr2: [x / 3, y / 3, 0.0],
                Rad: -x / 2,
                rad: lineRad,
                color: colorArgz
            });

            primitives.push({
                class: "arc",
                text: katex.renderToString("\\arctan \\frac{y}{x}"),
                arr0: [0.0, 0.0, 0.0],
                arr1: [-x / 2, 0.0, 0.0],
                arr2: [-x / 2, -y / 2, 0.0],
                Rad: -x,
                rad: lineRad,
                color: colorArctan
            });

            primitives.push({
                class: "dashline",
                arr0: [-z[0], -z[1], 0.0],
                arr1: [0.0, 0.0, 0.0],
                rad: lineRad,
                color: colorMainLine
            });
            break;

        case "quarter-4":
            primitives.push({
                class: "arc",
                text: katex.renderToString("\\arg z"),
                arr0: [0.0, 0.0, 0.0],
                arr1: [x / 3, 0.0, 0.0],
                arr2: [x / 3, y / 3, 0.0],
                Rad: x / 2,
                rad: lineRad,
                color: colorArgz
            });

            primitives.push({
                class: "arc",
                text: katex.renderToString("\\arctan \\frac{y}{x}"),
                arr0: [0.0, 0.0, 0.0],
                arr1: [x / 2, 0.0, 0.0],
                arr2: [x / 2, y / 2, 0.0],
                Rad: x,
                rad: lineRad,
                color: colorArctan
            });
            break;
    }
}

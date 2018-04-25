//Размерность пространства в примере (2d или 3d)
let dimention = "2d";

const NUMBER_OF_LINES = 80;

let figureType = "ellipse-inside";

let a = 4;
let x1 = -3,
    y1 = 1;
let x2 = 3,
    y2 = 2;
let center = [(x1 + x2) / 2, (y1 + y2) / 2, 0.0];
let c = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) / 2;
let b = Math.sqrt(a * a - c * c);
let k = Math.atan((y2 - y1) / (x2 - x1));

// rotate and translate figure
function move(a) {
    var r = [],
        out = vec3.create();

    r[0] = a[0] * Math.cos(k) - a[1] * Math.sin(k);
    r[1] = a[0] * Math.sin(k) + a[1] * Math.cos(k);
    r[2] = a[2];

    out[0] = r[0] + center[0];
    out[1] = r[1] + center[1];
    out[2] = r[2] + center[2];

    return out;
}

function unmove(a) {
    var p = [],
        out = vec3.create();

    p[0] = a[0] - center[0];
    p[1] = a[1] - center[1];
    p[2] = a[2] - center[2];

    out[0] = p[0] * Math.cos(-k) - p[1] * Math.sin(-k);
    out[1] = p[0] * Math.sin(-k) + p[1] * Math.cos(-k);
    out[2] = p[2];

    return out;
}

function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0.0, 0.0, 0.0]), movable: "fixed"});
    points.push({coord1: vec3.create([x1, y1, 0.0]), movable: "fixed"});
    points.push({coord1: vec3.create([x2, y2, 0.0]), movable: "fixed"});
    points.push({coord1: center, movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "free"}); // z
    points.push({coord1: move([a, 0.0, 0.0]), movable: "line", vector: [x2 - x1, y2 - y1, 0.0]}); // A
    points.push({coord1: move([0.0, b, 0.0]), movable: "line", vector: [(y1 - y2) / (x2 - x1), 1, 0.0]}); // B
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

    $(".figure").css({
        border: "1px solid black",
        "border-radius": "10px",
        padding: "15px",
        margin: "0 10px"
    });

    $("form[name=figure]").each(function (idx, form) {
        $(form)
            .find(".form-group")
            .each(function (idx, elem) {
                elem.style.display = "flex";
                elem.style.justifyContent = "space-between";
                elem.style.alignItems = "center";
            });
    });
}

function getParams() {
}

function initDescr() {
    $("#description").html(
        '<div class="header">Изображение внутренности и внешности эллипса на комплексной плоскости</div>'
    );

    let parametershtml = `<div style="font-size: 16px">
<div class="header">Выберите:</div>
<form name="figure">
	<div class="form-group">
		<input id="ellipse-inside" type="radio" name="fig" checked>
		<label for="ellipse-inside">$ |z - z_1| + |z - z_2| < 2 \\cdot a $</label>
	</div>
	<div class="form-group">
		<input id="ellipse-outside-border" type="radio" name="fig" >
		<label for="ellipse-outside-border">$ |z - z_1| + |z - z_2| \\geq 2 \\cdot a $</label>
	</div>
	<div class="form-group">
		<input id="ellipse-inside-border" type="radio" name="fig" >
		<label for="ellipse-inside-border">$ |z - z_1| + |z - z_2| \\leq 2 \\cdot a $</label>
	</div>
	<div class="form-group">
		<input id="ellipse-outside" type="radio" name="fig" >
		<label for="ellipse-outside">$ |z - z_1| + |z - z_2| > 2 \\cdot a $</label>
	</div>
</div>
</form>

</div>
<br><br>

<div class="figure" id="fig">
	где $ z = x + i \\cdot y $,<br>$ z_1 = x_1 + i \\cdot y_1 $,<br>$ z_2 = x_2 + i \\cdot y_2 $,<br>
	$ 2 \\cdot c = | z_1 - z_2 | < 2 \\cdot a $
</div>

<div class="flex-align-items">
	<label for="x1-input" >$x_1:$</label>
	<input type="text" id="x1-input" value="${x1}">
</div>

<div class="flex-align-items">
	<label for="y1-input" >$y_1:$</label>
	<input type="text" id="y1-input" value="${y1}">
</div>

<div class="flex-align-items">
	<label for="x2-input" >$x_2:$</label>
	<input type="text" id="x2-input" value="${x2}">
</div>

<div class="flex-align-items">
	<label for="y2-input" >$y_2:$</label>
	<input type="text" id="y2-input" value="${y2}">
</div>

<div class="flex-align-items">
	<label for="a-input" >$a:$</label>
	<input type="text" id="a-input" value="${a}">
</div>
	`;

    $("#parameters").html(parametershtml);
    $(document.body).click(function (e) {
        figureType = $("form[name=figure] :checked").attr("id");
        x1 = +$("#x1-input").val();
        y1 = +$("#y1-input").val();
        x2 = +$("#x2-input").val();
        y2 = +$("#y2-input").val();
        a = +$("#a-input").val();

        c = Math.sign(a) * Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) / 2;
        if (b > 0) b = Math.sqrt(a * a - c * c); else b = -Math.sqrt(a * a - c * c);
        if (Math.abs(c) >= Math.abs(a)) a = c;
        $("#a-input").val(a.toPrecision(2).toString());

        k = Math.atan((y2 - y1) / (x2 - x1));
        center = points[3].coord1 = vec3.create([(x1 + x2) / 2, (y1 + y2) / 2, 0.0]);

        points[5].coord1 = move([a, 0.0, 0.0]);
        points[5].vector = vec3.create([x2 - x1, y2 - y1, 0.0]);
        points[6].coord1 = move([0.0, b, 0.0]);
        points[6].vector = vec3.create([(y1 - y2) / (x2 - x1), 1, 0.0]);
        initBuffers();
    });

    applyCssStyles();

    $("Title").html("Изображение внутренности и внешности эллипса на комплексной плоскости");
}

let psiz = Math.PI / 4;

function initData() {
    const pointRad = 4, dashRad = 1.2, lineRad = 2, chosenPointRad = 5;
    const pointColor = [1.0, 0.0, 0.0, 1.0];
    const figureColor = [0.0, 0.0, 1.0, 1.0];
    const dashColor = [0.7, 0.7, 0.0, 1.0];
    const arrowColor = [0.0, 1.0, 0.0, 1.0];
    const fillingcolor = [0.5, 0.5, 1.0, 0.35];

    let canvas_width = canvas.width;
    let canvas_height = canvas.height;

    points[1].coord1 = vec3.create([x1, y1, 0]);
    points[2].coord1 = vec3.create([x2, y2, 0]);

    if (arrPoint != 0) {
        primitives.push({class: "point", text: "", arr0: arrPoint, rad: chosenPointRad, color: [1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[4].coord1) {
            let pointz = unmove(points[4].coord1);
            pointz[0] = pointz[0] / a;
            pointz[1] = pointz[1] / b;
            vec3.normalize(pointz);
            psiz = Math.sign(pointz[1]) * Math.acos(pointz[0]);
        } // z
        if (arrPoint == points[5].coord1) {
            if (points[5].coord1[0] < x2 && points[5].coord1[0] > center[0]) vec3.set([x2, y2, 0.0], points[5].coord1);
            if (points[5].coord1[0] > x1 && points[5].coord1[0] < center[0]) vec3.set([x1, y1, 0.0], points[5].coord1);// запрет на движение точки A
            a = unmove(points[5].coord1)[0];
            if (b >= 0) b = Math.sqrt(a * a - c * c); else b = -Math.sqrt(a * a - c * c);
            if (isNaN(b)) b = 0;
            $("#a-input").val(a.toPrecision(2).toString());
            points[6].coord1 = move([0.0, b, 0.0]);
        } // A
        if (arrPoint == points[6].coord1) {
            b = unmove(points[6].coord1)[1];
            a = Math.sign(a) * Math.sqrt(c * c + b * b);
            $("#a-input").val(a.toPrecision(2).toString());
            points[5].coord1 = move([a, 0.0, 0.0]);
        } // B
    }

    if (x2 == x1) vec3.set([1, (x1 - x2) / (y2 - y1), 0.0], points[6].vector);
    vec3.set(move([a * Math.cos(psiz), b * Math.sin(psiz), 0.0]), points[4].coord1);
    primitives.push({
        class: "point",
        text: katex.renderToString("z_1"),
        pos: "ct",
        arr0: points[1].coord1,
        rad: pointRad,
        color: figureColor
    });
    primitives.push({
        class: "point",
        text: katex.renderToString("z_2"),
        pos: "ct",
        arr0: points[2].coord1,
        rad: pointRad,
        color: figureColor
    });
    // Line 2a
    primitives.push({
        class: "line",
        arr0: move([a, 0.0, 0.0]),
        arr1: move([-a, 0.0, 0.0]),
        rad: lineRad,
        color: arrowColor
    });
    // Line 2b
    primitives.push({
        class: "line",
        arr0: move([0, b, 0.0]),
        arr1: move([0, -b, 0.0]),
        rad: lineRad,
        color: arrowColor
    });
    // z
    primitives.push({
        class: "point",
        text: katex.renderToString("z"),
        pos: "lt",
        arr0: points[4].coord1,
        rad: pointRad,
        color: [0.0, 0.0, 0.7, 1.0]
    });
    primitives.push({
        class: "dashline",
        text: "",
        arr0: points[1].coord1,
        arr1: points[4].coord1,
        rad: lineRad,
        color: dashColor
    });
    primitives.push({
        class: "dashline",
        text: "",
        arr0: points[2].coord1,
        arr1: points[4].coord1,
        rad: lineRad,
        color: dashColor
    });
    // A
    primitives.push({
        class: "point",
        text: katex.renderToString("A"),
        pos: "rt",
        arr0: points[5].coord1,
        rad: pointRad,
        color: pointColor
    });
    // B
    primitives.push({
        class: "point",
        text: katex.renderToString("B"),
        pos: "rt",
        arr0: points[6].coord1,
        rad: pointRad,
        color: pointColor
    });

    let vertices = [];
    for (let i = 0; i <= NUMBER_OF_LINES; i++) {
        let psi = 2 * i * Math.PI / NUMBER_OF_LINES;
        let x = a * Math.cos(psi);
        let y = b * Math.sin(psi);
        vertices.push(move([x, y, 0.0]));
    }
    let centralPoint = (vertices.length / 2) >> 0;

    function fillingInside() {
        for (let i = 0; i < centralPoint; i++) {
            primitives.push({
                class: "plane",
                arr0: vertices[centralPoint + i + 1],
                arr1: vertices[centralPoint + i],
                arr2: vertices[centralPoint - i],
                arr3: vertices[centralPoint - i - 1],
                color: fillingcolor
            });
        }
    }

    function fillingOutside() {
        primitives.push({
            class: "plane",
            arr0: [-canvas_width, -canvas_height, 0.0],
            arr1: [-canvas_width, canvas_height, 0.0],
            arr2: [canvas_width, canvas_height, 0.0],
            arr3: [canvas_width, -canvas_height, 0.0],
            color: fillingcolor
        });
        for (let i = 0; i < centralPoint; i++) {
            primitives.push({
                class: "plane",
                arr0: vertices[centralPoint + i + 1],
                arr1: vertices[centralPoint + i],
                arr2: vertices[centralPoint - i],
                arr3: vertices[centralPoint - i - 1],
                color: [1.0, 1.0, 1.0, 1.0]
            });
        }
    }

    switch (figureType) {
        case "ellipse-inside":
            for (var i = 0; i < vertices.length - 1; i += 2) {
                primitives.push({
                    class: "line",
                    arr0: vertices[i],
                    arr1: vertices[i + 1],
                    rad: lineRad,
                    color: figureColor
                });
            }
            fillingInside();
            break;
        case "ellipse-outside":
            for (var i = 0; i < vertices.length - 1; i += 2) {
                primitives.push({
                    class: "line",
                    arr0: vertices[i],
                    arr1: vertices[i + 1],
                    rad: lineRad,
                    color: figureColor
                });
            }
            fillingOutside();
            break;
        case "ellipse-inside-border":
            for (var i = 0; i < vertices.length - 1; i++) {
                primitives.push({
                    class: "line",
                    arr0: vertices[i],
                    arr1: vertices[i + 1],
                    rad: lineRad,
                    color: figureColor
                });
            }
            fillingInside();
            break;
        case "ellipse-outside-border":
            for (var i = 0; i < vertices.length - 1; i++) {
                primitives.push({
                    class: "line",
                    arr0: vertices[i],
                    arr1: vertices[i + 1],
                    rad: lineRad,
                    color: figureColor
                });
            }
            fillingOutside();
            break;
    }
}

//Размерность пространства в примере (2d или 3d)
let dimention = "2d";

const FIGURE_SIZE = 12;
const NUMBER_OF_LINES = 80;

let figureType = "hyperbola-inside";

let a = 2.5;
let x1 = -3,
    y1 = 1;
let x2 = 3,
    y2 = 2;
let center = [(x1 + x2) / 2, (y1 + y2) / 2, 0.0];
let c = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) / 2;
let b = Math.sqrt(c * c - a * a);
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
        '<div class="header">Изображение области, ограниченной ветвью гиперболы на комплексной плоскости</div>'
    );

    let parametershtml = `<div style="font-size: 16px">
<div class="header">Выберите:</div>
<form name="figure">
	<div class="form-group">
		<input id="hyperbola-inside" type="radio" name="fig" checked>
		<label for="hyperbola-inside">$ |z - z_1| - |z - z_2| \\geq 2 \\cdot a $</label>
	</div>
	<div class="form-group">
		<input id="hyperbola-outside" type="radio" name="fig" >
		<label for="hyperbola-outside">$ |z - z_1| - |z - z_2| < 2 \\cdot a $</label>
	</div>
</div>
</form>

</div>
<br><br>

<div class="figure" id="fig">
	где $ z = x + i \\cdot y $,<br>$ z_1 = x_1 + i \\cdot y_1 $,<br>$ z_2 = x_2 + i \\cdot y_2 $,<br>
	$ 2 \\cdot c = | z_1 - z_2 | > 2 \\cdot a $
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
        c = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) / 2;
        if (b > 0) b = Math.sqrt(c * c - a * a); else b = -Math.sqrt(c * c - a * a);
        k = Math.atan((y2 - y1) / (x2 - x1));
        if (a >= c) {
            a = c - 0.01;
            $("#a-input").val(a.toPrecision(2).toString());
        }
        center = points[3].coord1 = vec3.create([(x1 + x2) / 2, (y1 + y2) / 2, 0.0]);
        points[5].coord1 = move([a, 0.0, 0.0]);
        points[5].vector = vec3.create([x2 - x1, y2 - y1, 0.0]);
        points[6].coord1 = move([0.0, b, 0.0]);
        points[6].vector = vec3.create([(y1 - y2) / (x2 - x1), 1, 0.0]);
        initBuffers();
    });

    applyCssStyles();

    $("Title").html(
        "Изображение области, ограниченной ветвью гиперболы на комплексной области"
    );
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
            psiz = Math.asinh(pointz[1]);
        } // z
        if (arrPoint == points[5].coord1) {
            if (points[5].coord1[0] > x2) vec3.set([x2, y2, 0.0], points[5].coord1);
            if (points[5].coord1[0] < x1) vec3.set([x1, y1, 0.0], points[5].coord1); // запрет на движение точки A
            a = unmove(points[5].coord1)[0];
            if (b > 0) b = Math.sqrt(c * c - a * a); else b = -Math.sqrt(c * c - a * a);
            $("#a-input").val(a.toPrecision(2).toString());
            points[6].coord1 = move([0.0, b, 0.0]);
        } // A
        if (arrPoint == points[6].coord1) {
            b = unmove(points[6].coord1)[1];
            if (a > 0) a = Math.sqrt(c * c - b * b); else a = -Math.sqrt(c * c - b * b);
            if (isNaN(a)) {
                a = 0;
                if (b < 0) b = -c; else b = c;
                vec3.set(move([0.0, b, 0.0]), points[6].coord1);
            } // запрет на движение точки B
            $("#a-input").val(a.toPrecision(2).toString());
            points[5].coord1 = move([a, 0.0, 0.0]);
        } // B
    }

    vec3.set(move([a * Math.cosh(psiz), b * Math.sinh(psiz), 0.0]), points[4].coord1);
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
    // Line between focus
    primitives.push({
        class: "line",
        arr0: points[1].coord1,
        arr1: points[2].coord1,
        rad: lineRad,
        color: arrowColor
    });
    // Line perpendicular focus line
    primitives.push({
        class: "line",
        arr0: move([0, b, 0.0]),
        arr1: move([0, -b, 0.0]),
        rad: lineRad,
        color: arrowColor
    });
    // Green rectangle
    primitives.push({
        class: "line",
        text: "",
        arr0: move([-a, b, 0]),
        arr1: move([a, b, 0]),
        rad: dashRad,
        color: [0.0, 0.7, 0.0, 1.0]
    });
    primitives.push({
        class: "line",
        text: "",
        arr0: move([-a, -b, 0]),
        arr1: move([a, -b, 0]),
        rad: dashRad,
        color: [0.0, 0.7, 0.0, 1.0]
    });
    primitives.push({
        class: "line",
        text: "",
        arr0: move([a, -b, 0]),
        arr1: move([a, b, 0]),
        rad: dashRad,
        color: [0.0, 0.7, 0.0, 1.0]
    });
    primitives.push({
        class: "line",
        text: "",
        arr0: move([-a, -b, 0]),
        arr1: move([-a, b, 0]),
        rad: dashRad,
        color: [0.0, 0.7, 0.0, 1.0]
    });
    // Asymptotes
    let mult = Math.cosh(0.5 * FIGURE_SIZE);
    primitives.push({
        class: "dashline",
        text: "",
        arr0: move([-a * mult, -b * mult, 0]),
        arr1: center,
        rad: dashRad,
        color: figureColor
    });
    primitives.push({
        class: "dashline",
        text: "",
        arr0: center,
        arr1: move([a * mult, b * mult, 0]),
        rad: dashRad,
        color: figureColor
    });
    primitives.push({
        class: "dashline",
        text: "",
        arr0: move([a * mult, -b * mult, 0]),
        arr1: center,
        rad: dashRad,
        color: figureColor
    });
    primitives.push({
        class: "dashline",
        text: "",
        arr0: center,
        arr1: move([-a * mult, b * mult, 0]),
        rad: dashRad,
        color: figureColor
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
        let psi = (i / NUMBER_OF_LINES - 0.5) * FIGURE_SIZE;
        let x = a * Math.cosh(psi);
        let y = b * Math.sinh(psi);
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
        case "hyperbola-inside":
            for (var i = 0; i < vertices.length - 1; i++) {
                primitives.push({
                    class: "line",
                    arr0: vertices[i],
                    arr1: vertices[i + 1],
                    rad: lineRad,
                    color: figureColor
                });
            }
            if (a > 0) fillingInside();
            else fillingOutside();
            break;
        case "hyperbola-outside":
            for (var i = 0; i < vertices.length - 1; i += 2) {
                primitives.push({
                    class: "line",
                    arr0: vertices[i],
                    arr1: vertices[i + 1],
                    rad: lineRad,
                    color: figureColor
                });
            }
            if (a > 0) fillingOutside();
            else fillingInside();
            break;
    }
}

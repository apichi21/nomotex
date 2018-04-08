//Размерность пространства в примере (2d или 3d)
let dimention = "2d";

const FIGURE_SIZE = 6.5;
const NUMBER_OF_LINES = 80;

let figureType = 'hyperbola-inside';

let a = 2.5;
let x1 = -3, y1 = 1;
let x2 = 3, y2 = 2;
let center = [(x1 + x2) / 2, (y1 + y2) / 2, 0.0];
let c = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) / 2;
let k = Math.atan((y2 - y1) / (x2 - x1));

// rotate and translate figure
function move(a) {
    var p = [],
        r = [],
        out = vec3.create();

    a[0] = a[0] + center[0];
    a[1] = a[1] + center[1];
    a[2] = a[2] + center[2];


    p[0] = a[0] - center[0];
    p[1] = a[1] - center[1];
    p[2] = a[2] - center[2];

    r[0] = p[0] * Math.cos(k) - p[1] * Math.sin(k);
    r[1] = p[0] * Math.sin(k) + p[1] * Math.cos(k);
    r[2] = p[2];

    out[0] = r[0] + center[0];
    out[1] = r[1] + center[1];
    out[2] = r[2] + center[2];

    return out;
}

function unmove(a) {
    var p = [],
        r = [],
        out = vec3.create();

    p[0] = a[0] - 2 * center[0];
    p[1] = a[1] - 2 * center[1];
    p[2] = a[2] - 2 * center[2];

    r[0] = p[0] * Math.cos(-k) - p[1] * Math.sin(-k);
    r[1] = p[0] * Math.sin(-k) + p[1] * Math.cos(-k);
    r[2] = p[2];

    out[0] = r[0] + center[0];
    out[1] = r[1] + center[1];
    out[2] = r[2] + center[2];

    return out;
}

function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0.0, 0.0, 0.0]), movable: "fixed"});
    points.push({coord1: vec3.create([x1, y1, 0.0]), movable: "fixed"});
    points.push({coord1: vec3.create([x2, y2, 0.0]), movable: "fixed"});
    points.push({coord1: center, movable: "fixed"});
    points.push({coord1: vec3.create(), movable: "free"}); // z
    points.push({coord1: move([a, 0.0, 0.0]), movable: "line", vector: [a, k * a, 0.0]}); // a
}

function applyCssStyles() {

    $('.header').css({
        'text-align': 'center',
        'font-weight': 'bold',
    });

    $('.flex-align-items').css({
        'display': 'flex',
        'align-items': 'center',
        'justify-content': 'space-between',
        'margin': '20px',
    });

    $('.figure').css({
        'border': '1px solid black',
        'border-radius': '10px',
        'padding': '15px',
        'margin': '0 10px',
    });

    $('form[name=figure]').each(function (idx, form) {
        $(form).find('.form-group').each(function (idx, elem) {
            elem.style.display = 'flex';
            elem.style.justifyContent = 'space-between';
            elem.style.alignItems = 'center';
        });
    });
}

function initDescr() {
    $("#description").html('<div class="header">Изображение области, ограниченной ветвью гиперболы на комплексной плоскости</div>');

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

<br><br>
<div style="display: flex; margin-top: 30px">
	<button id="execute-builds" style="margin: auto">Выполнить построения</button>
</div>
	`;

    $('#parameters').html(parametershtml);
    $('#execute-builds').click(function (e) {
        figureType = $('form[name=figure] :checked').attr('id');
        x1 = +$('#x1-input').val();
        y1 = +$('#y1-input').val();
        x2 = +$('#x2-input').val();
        y2 = +$('#y2-input').val();
        a = +$('#a-input').val();
        c = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) / 2;
        if (a >= c) {
            a = c - 0.01;
            $('#a-input').val(a.toPrecision(2).toString());
        }
        center = points[3].coord1 = vec3.create([(x1 + x2) / 2, (y1 + y2) / 2, 0.0]);
        k = Math.atan((y2 - y1) / (x2 - x1));
        points[5].coord1 = move([a, 0.0, 0.0]);
        initBuffers();
    });

    applyCssStyles();

    $("Title").html('Изображение области, ограниченной ветвью гиперболы на комплексной области');
}

let psiz = Math.PI / 4;

function initData() {
    const pointRad = 4, dashRad = 1.2, lineRad = 2, chosenPointRad = 5;
    const pointColor = [1.0, 0.0, 0.0, 1.0];
    const figureColor = [0.0, 0.0, 1.0, 1.0];
    const dashColor = [0.7, 0.7, 0.0, 1.0];
    const arrowColor = [0.0, 1.0, 0.0, 1.0];
    const fillingcolor = [0.5, 0.5, 1.0, 0.35];

    let b = Math.sqrt(c * c - a * a);

    points[1].coord1 = vec3.create([x1, y1, 0]);
    points[2].coord1 = vec3.create([x2, y2, 0]);
    points[5].vector = [a, a * k, 0.0];

    if (arrPoint != 0) {
        primitives.push({class: "point", text: "", arr0: arrPoint, rad: chosenPointRad, color: [1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[4].coord1) {
            let pointz = unmove(points[4].coord1);
            pointz[0] = pointz[0] / a;
            pointz[1] = pointz[1] / b;
            psiz = Math.asinh(pointz[1]);
        }
    }

    vec3.set(move([a * Math.cosh(psiz), b * Math.sinh(psiz), 0.0]), points[4].coord1);
    primitives.push({
        class: 'point',
        text: katex.renderToString('z_1'),
        pos: 'ct',
        arr0: points[1].coord1,
        rad: pointRad,
        color: figureColor
    });
    primitives.push({
        class: 'point',
        text: katex.renderToString('z_2'),
        pos: 'ct',
        arr0: points[2].coord1,
        rad: pointRad,
        color: figureColor
    });
    primitives.push({
        class: 'line',
        arr0: points[1].coord1,
        arr1: points[2].coord1,
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
        arr1: move([a * mult, b * mult, 0]),
        rad: dashRad,
        color: figureColor
    });
    primitives.push({
        class: "dashline",
        text: "",
        arr0: move([a * mult, -b * mult, 0]),
        arr1: move([-a * mult, b * mult, 0]),
        rad: dashRad,
        color: figureColor
    });
    // z
    primitives.push({
        class: "point",
        text: katex.renderToString('z'),
        pos: 'lt',
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
    // a
    primitives.push({
        class: "point",
        text: katex.renderToString('A'),
        pos: 'rt',
        arr0: points[5].coord1,
        rad: pointRad,
        color: pointColor
    });


    let vertices = [];
    let bigHyperbola = [];
    for (let i = 0; i <= NUMBER_OF_LINES; i++) {
        let psi = (i / NUMBER_OF_LINES - 0.5) * FIGURE_SIZE;
        let x = a * Math.cosh(psi);
        let y = b * Math.sinh(psi);
        let bigx = a * Math.cosh(psi * FIGURE_SIZE) - FIGURE_SIZE ** 3;
        let bigy = b * Math.sinh(psi * FIGURE_SIZE) * FIGURE_SIZE;
        bigHyperbola.push(move([bigx, bigy, 0.0]));
        vertices.push(move([x, y, 0.0]));
    }
    let centralPoint = vertices.length / 2 >> 0;

    switch (figureType) {
        case 'hyperbola-inside':
            for (var i = 0; i < vertices.length - 1; i++) {
                primitives.push({
                    class: "line",
                    arr0: vertices[i],
                    arr1: vertices[i + 1],
                    rad: lineRad,
                    color: figureColor
                });
            }
            // filling inside
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
            break;

        case 'hyperbola-outside':
            for (var i = 0; i < vertices.length - 1; i += 2) {
                primitives.push({
                    class: "line",
                    arr0: vertices[i],
                    arr1: vertices[i + 1],
                    rad: lineRad,
                    color: figureColor
                });
            }
            // filling outside
            for (let i = 0; i < centralPoint; i++) {
                primitives.push({
                    class: "plane",
                    arr0: vertices[centralPoint + i + 1],
                    arr1: vertices[centralPoint + i],
                    arr2: bigHyperbola[centralPoint + i],
                    arr3: bigHyperbola[centralPoint + i + 1],
                    color: fillingcolor
                });
                primitives.push({
                    class: "plane",
                    arr0: vertices[centralPoint - i - 1],
                    arr1: vertices[centralPoint - i],
                    arr2: bigHyperbola[centralPoint - i],
                    arr3: bigHyperbola[centralPoint - i - 1],
                    color: fillingcolor
                });
            }
            break;
    }
}
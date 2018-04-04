//Размерность пространства в примере (2d или 3d)
let dimention = "2d";

let figureType = 'circle';

let R = 3;
let x0 = 1, y0 = 1;
let numberOfHatch = 21;
let numberOfTriangles = 10;
let rangeOfFilling = 100;

function initPoints() {
    points = [];
    points.push({coord1: vec3.create([x0, 0.0, 0.0]), movable: "fixed"});
    points.push({coord1: vec3.create([0.0, y0, 0.0]), movable: "fixed"});
    points.push({coord1: vec3.create([0.0, 0.0, 0.0]), movable: "fixed"});
    points.push({coord1: vec3.create([x0, y0, 0.0]), movable: "free"});
    points.push({coord1: vec3.create([x0, y0 + R, 0.0]), movable: "line", vector: vec3.create([0, 1, 0])});
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
    $("#description").html('<div class="header">Изображение окружности, внутренности и внешности круга на комплексной плоскости</div>');

    let parametershtml = `<div style="font-size: 16px">
<div class="header">Выберите:</div>
<form name="figure">
	<div class="form-group">
		<input id="circle" type="radio" name="fig" checked>
		<label for="circle">Окружность: <br>$ |z - z_0| = R $</label>
	</div>
	<div class="form-group">
		<input id="circle-inside" type="radio" name="fig" >
		<label for="circle-inside">Внутренность круга:  <br>$ |z - z_0| < R $</label>
	</div>
	<div class="form-group">
		<input id="circle-outside"  type="radio" name="fig">
		<label for="circle-outside">Внешность круга: <br>$ |z - z_0| > R $</label>
	</div>
	<div class="form-group">
		<input id="circle-inside-border"  type="radio" name="fig">
		<label for="circle-inside-border">Внутренность круга с границей: $ |z - z_0| \\leq R $</label>
	</div>
	<div class="form-group">
		<input id="circle-outside-border"  type="radio" name="fig">
		<label for="circle-outside-border">Внешность круга с границей: $ |z - z_0| \\geq R $</label>
	</div>
</div>
</form>

</div>
<br><br>

<div class="figure" id="fig">
	где $ R \\in \\mathbb{{R}} $,<br>$ z = x + i \\cdot y $,<br>$ z_0 = x_0 + i \\cdot y_0 $
</div>

<div class="flex-align-items">
	<label for="x0-input" >$x_0:$</label>
	<input type="text" id="x0-input" value="1">
</div>

<div class="flex-align-items">
	<label for="y0-input" >$y_0:$</label>
	<input type="text" id="y0-input" value="1">
</div>

<div class="flex-align-items">
	<label for="r-input" >$R:$</label>
	<input type="text" id="r-input" value="3">
</div>

<br><br>
<div style="display: flex; margin-top: 30px">
	<button id="execute-builds" style="margin: auto">Выполнить построения!</button>
</div>
	`;

    $('#parameters').html(parametershtml);
    $('#execute-builds').click(function (e) {
        figureType = $('form[name=figure] :checked').attr('id');
        x0 = points[3].coord1[0] = +$('#x0-input').val();
        y0 = points[3].coord1[1] = +$('#y0-input').val();
        R = +$('#r-input').val();
        points[4].coord1[1] = R + y0;
        points[4].coord1[0] = x0;
        initBuffers();
    });

    applyCssStyles();

    $("Title").html('Изображение окружности, внутренности и внешности круга на комплексной области');
}


function initData() {
    let pointRad = 4;
    let chosenPointRad = 5;
    let lineRad = 2;
    let pointColor = [1.0, 0.0, 0.0, 1.0];
    let circleColor = [0.0, 0.0, 1.0, 1.0];
    let dashColor = [0.7, 0.7, 0.0, 1.0];
    let arrowColor = [0.0, 1.0, 0.0, 1.0];
    let fillingcolor = [0.5, 0.5, 1.0, 0.35];

    let center = points[3].coord1;


    if (arrPoint != 0) {
        primitives.push({class: "point", text: "", arr0: arrPoint, rad: chosenPointRad, color: [1.0, 0.0, 1.0, 1.0]});
        if (arrPoint == points[3].coord1) {
            x0 = points[3].coord1[0];
            y0 = points[3].coord1[1];
            points[4].coord1 = vec3.create([x0, y0 + R, 0.0]);
            $('#x0-input').val(center[0].toPrecision(2).toString());
            $('#y0-input').val(center[1].toPrecision(2).toString());
        }
        if (arrPoint == points[4].coord1) {
            R = Math.abs(points[4].coord1[1] - y0);
            $('#r-input').val(R.toPrecision(2).toString());
        }
    }

    primitives.push({
        class: 'point',
        text: katex.renderToString(`x_{0}=${x0.toPrecision(2)}`),
        pos: 'ct',
        arr0: vec3.create([x0, 0.0, 0.0]),
        rad: pointRad,
        color: pointColor
    });
    primitives.push({
        class: 'point',
        text: katex.renderToString(`y_{0}=${y0.toPrecision(2)}`),
        pos: 'rt',
        arr0: vec3.create([0.0, y0, 0.0]),
        rad: pointRad,
        color: pointColor
    });
    primitives.push({
        class: 'point',
        text: katex.renderToString('0'),
        pos: 'rt',
        arr0: vec3.create([points[2].coord1[0], 0.0, 0.0]),
        rad: pointRad,
        color: pointColor
    });
    primitives.push({
        class: 'point',
        text: katex.renderToString(`x=${(R + x0).toPrecision(2)}`),
        pos: 'lt',
        arr0: vec3.create([x0 + R, 0.0, 0.0]),
        rad: pointRad,
        color: pointColor
    });
    primitives.push({
        class: 'point',
        text: katex.renderToString(`y=${(R + y0).toPrecision(2)}`),
        pos: 'rt',
        arr0: vec3.create([0.0, y0 + R, 0.0]),
        rad: pointRad,
        color: pointColor
    });
    // Point increases R
    primitives.push({
        class: 'point',
        text: '',
        pos: 'rt',
        arr0: points[4].coord1,
        rad: pointRad,
        color: pointColor
    });
    primitives.push({
        class: 'point',
        text: '',
        pos: 'rt',
        arr0: vec3.create([x0 + R, y0, 0.0]),
        rad: pointRad,
        color: pointColor
    });
    // Center
    primitives.push({
        class: 'point',
        text: katex.renderToString(`(${x0.toPrecision(2)}, ${y0.toPrecision(2)})`),
        pos: 'lt',
        arr0: center,
        rad: pointRad,
        color: pointColor
    });
    primitives.push({
        class: 'dashline',
        text: '',
        pos: 'rt',
        arr0: vec3.create([x0, 0.0, 0.0]),
        arr1: center,
        rad: 1.2,
        color: dashColor
    });
    primitives.push({
        class: 'dashline',
        text: '',
        pos: 'rt',
        arr0: vec3.create([0.0, y0, 0.0]),
        arr1: center,
        rad: 1.2,
        color: dashColor
    });
    primitives.push({
        class: 'dashline',
        text: '',
        pos: 'rt',
        arr0: vec3.create([x0 + R, 0.0, 0.0]),
        arr1: vec3.create([x0 + R, y0, 0.0]),
        rad: 1.2,
        color: dashColor
    });
    primitives.push({
        class: 'dashline',
        text: '',
        pos: 'rt',
        arr0: vec3.create([0.0, y0 + R, 0.0]),
        arr1: vec3.create([x0, y0 + R, 0.0]),
        rad: 1.2,
        color: dashColor
    });
    primitives.push({
        class: 'arrow',
        text: katex.renderToString(`R=${R.toPrecision(2)}`),
        pos: 'lt',
        arr0: center,
        arr1: vec3.create([x0 + 0.5 * R, Math.sqrt(R ** 2 - (0.5 * R) ** 2) + y0, 0.0]),
        rad: lineRad,
        color: arrowColor
    });

    let beginx, beginy, endx, endy;

    function fillingInside() {
        for (let i = 0; i < 2 * numberOfTriangles; i++) {
            beginx = x0 + R * Math.cos(Math.PI * i / numberOfTriangles);
            beginy = y0 + R * Math.sin(Math.PI * i / numberOfTriangles);
            endx = x0 + R * Math.cos(Math.PI * (i + 1) / numberOfTriangles);
            endy = y0 + R * Math.sin(Math.PI * (i + 1) / numberOfTriangles);
            primitives.push({
                class: "plane",
                text: "",
                arr0: vec3.create([beginx, beginy, 0.0]),
                arr1: vec3.create([endx, endy, 0.0]),
                arr2: points[3].coord1,
                arr3: points[3].coord1,
                color: fillingcolor
            });
        }
    }

    function fillingOutside() {
        for (let i = 0; i < 2 * numberOfTriangles; i++) {
            beginx = x0 + R * Math.cos(Math.PI * i / numberOfTriangles);
            beginy = y0 + R * Math.sin(Math.PI * i / numberOfTriangles);
            endx = x0 + R * Math.cos(Math.PI * (i + 1) / numberOfTriangles);
            endy = y0 + R * Math.sin(Math.PI * (i + 1) / numberOfTriangles);
            let beginxBig = x0 + (rangeOfFilling * R + rangeOfFilling) * Math.cos(Math.PI * i / numberOfTriangles);
            let beginyBig = y0 + (rangeOfFilling * R + rangeOfFilling) * Math.sin(Math.PI * i / numberOfTriangles);
            let endxBig = x0 + (rangeOfFilling * R + rangeOfFilling) * Math.cos(Math.PI * (i + 1) / numberOfTriangles);
            let endyBig = y0 + (rangeOfFilling * R + rangeOfFilling) * Math.sin(Math.PI * (i + 1) / numberOfTriangles);
            primitives.push({
                class: "plane",
                text: "",
                arr0: vec3.create([beginx, beginy, 0.0]),
                arr1: vec3.create([endx, endy, 0.0]),
                arr3: vec3.create([beginxBig, beginyBig, 0.0]),
                arr2: vec3.create([endxBig, endyBig, 0.0]),
                color: fillingcolor
            });
        }
    }

    function hatchingBorder() {
        for (let i = 0; i < 2 * numberOfHatch; i += 2) {
            beginx = x0 + R * Math.cos(Math.PI * i / numberOfHatch);
            beginy = y0 + R * Math.sin(Math.PI * i / numberOfHatch);
            endx = x0 + R * Math.cos(Math.PI * (i + 1) / numberOfHatch);
            endy = y0 + R * Math.sin(Math.PI * (i + 1) / numberOfHatch);
            primitives.push({
                class: 'arc',
                pos: 'rt',
                arr0: center,
                arr1: vec3.create([beginx, beginy, 0.0]),
                arr2: vec3.create([endx, endy, 0.0]),
                Rad: R,
                rad: lineRad,
                color: circleColor,
            });
        }
    }

    switch (figureType) {
        case 'circle':
            primitives.push({
                class: 'circle',
                pos: 'rt',
                arr0: center,
                arr1: vec3.create([x0 + R, y0, 0.0]),
                arr2: vec3.create([x0, y0 + R, 0.0]),
                Rad: R,
                rad: lineRad,
                color: circleColor,
            });
            break;
        case 'circle-inside':
            hatchingBorder();
            fillingInside();
            break;
        case 'circle-outside':
            hatchingBorder();
            fillingOutside();
            break;
        case 'circle-inside-border':
            primitives.push({
                class: 'circle',
                pos: 'rt',
                arr0: center,
                arr1: vec3.create([x0 + R, y0, 0.0]),
                arr2: vec3.create([x0, y0 + R, 0.0]),
                Rad: R,
                rad: lineRad,
                color: circleColor,
            });
            fillingInside();
            break;
        case 'circle-outside-border':
            primitives.push({
                class: 'circle',
                pos: 'rt',
                arr0: center,
                arr1: vec3.create([x0 + R, y0, 0.0]),
                arr2: vec3.create([x0, y0 + R, 0.0]),
                Rad: R,
                rad: lineRad,
                color: circleColor,
            });
            fillingOutside();
            break;
    }
}
//Размерность пространства в примере (2d или 3d)
let dimention = "2d";

let figureType = 'hyperbola-inside';

let a = 1;
let x1 = -1, y1 = 1;
let x2 = 1, y2 = 2;
let c = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2) / 2;
let b = Math.sqrt(c ** 2 - a ** 2);

let y0 = (y2 * x1 - y1 * x2) / (x1 - x2);

const numberOfHatch = 21;
const numberOfTriangles = 10;
const rangeOfFilling = 100;
const NUMBER_OF_LINES = 80;

let x0 = 0;

function initPoints() {
    points = [];
    points.push({coord1: vec3.create([0.0, 0.0, 0.0]), movable: "fixed"});
    points.push({coord1: vec3.create([x1, y1, 0.0]), movable: "free"});
    points.push({coord1: vec3.create([x2, y2, 0.0]), movable: "free"});
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
		<label for="hyperbola-inside">$ |z - z_1| - |z - z_2| \\geq 2a $</label>
	</div>
	<div class="form-group">
		<input id="hyperbola-outside" type="radio" name="fig" >
		<label for="hyperbola-outside">$ |z - z_1| - |z - z_2| < 2a $</label>
	</div>
</div>
</form>

</div>
<br><br>

<div class="figure" id="fig">
	где $ z = x + i \\cdot y $,<br>$ z_1 = x_1 + i \\cdot y_1 $,<br>$ z_2 = x_2 + i \\cdot y_2 $
</div>

<div class="flex-align-items">
	<label for="x1-input" >$x_1:$</label>
	<input type="text" id="x1-input" value="-1">
</div>

<div class="flex-align-items">
	<label for="y1-input" >$y_1:$</label>
	<input type="text" id="y1-input" value="1">
</div>

<div class="flex-align-items">
	<label for="x2-input" >$x_2:$</label>
	<input type="text" id="x2-input" value="2">
</div>

<div class="flex-align-items">
	<label for="y2-input" >$y_2:$</label>
	<input type="text" id="y2-input" value="2">
</div>

<div class="flex-align-items">
	<label for="a-input" >$a:$</label>
	<input type="text" id="a-input" value="3">
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
        y0 = (y2 * x1 - y1 * x2) / (x1 - x2);
        points[1].coord1 = vec3.create([x1, y1, 0]);
        points[2].coord1 = vec3.create([x2, y2, 0]);
        initBuffers();
    });

    applyCssStyles();

    $("Title").html('Изображение области, ограниченной ветвью гиперболы на комплексной области');
}


function initData() {
    let pointRad = 4;
    let chosenPointRad = 5;
    let lineRad = 2;
    let pointColor = [1.0, 0.0, 0.0, 1.0];
    let figureColor = [0.0, 0.0, 1.0, 1.0];
    let dashColor = [0.7, 0.7, 0.0, 1.0];
    let arrowColor = [0.0, 1.0, 0.0, 1.0];
    let fillingcolor = [0.5, 0.5, 1.0, 0.35];

    let beginx, beginy, endx, endy;

    primitives.push({
        class: 'point',
        text: '',
        pos: 'ct',
        arr0: points[1].coord1,
        rad: pointRad,
        color: pointColor
    });
    primitives.push({
        class: 'point',
        text: '',
        pos: 'ct',
        arr0: points[2].coord1,
        rad: pointRad,
        color: pointColor
    });
    primitives.push({
        class: 'line',
        text: '',
        pos: 'ct',
        arr0: points[1].coord1,
        arr1: points[2].coord1,
        rad: lineRad,
        color: arrowColor
    });

    let vertices = [];
    for (var i = 0; i <= NUMBER_OF_LINES; i++) {
        var psi = (i / NUMBER_OF_LINES - 0.5) * 5;
        let newx = a * Math.cosh(psi);
        let newy = b * Math.sinh(psi);
        vertices.push([newx, newy, 0.0]);
    }
    for (var i = 0; i < vertices.length - 1; i++) {
        primitives.push({
            class: "line",
            text: "",
            arr0: vertices[i],
            arr1: vertices[i + 1],
            rad: lineRad,
            color: [0.0, 0.0, 1.0, 1.0]
        });
    }


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
//Размерность пространства в примере (2d или 3d)
let dimention = "2d";

let sequenceType = 'unit-series',
	displayType = 'numercal-axis';

let w = 1.0, b = 0.5;
let xMin = -4, xMax = 4;
let n = 10;

function initPoints() {
	points = [];
	points.push({coord1: vec3.create([xMin, 0.0, 0.0]), movable: "free"});
	points.push({coord1: vec3.create([xMax, 0.0, 0.0]), movable: "free"});
	points.push({coord1: vec3.create([0.0, 0.0, 0.0]), movable: "fixed"});
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

	$('.sequence').css({
		'border': '1px solid black',
		'border-radius': '10px',
		'padding': '15px',
		'margin': '0 10px',
	});


	$('form[name=form-display-type]').each(function (idx, form) {
		$(form).find('.form-group').each(function (idx, elem) {
			elem.style.display = 'flex';
			elem.style.justifyContent = 'space-between';
			elem.style.alignItems = 'center';
		});
	});

	$('select[name=sequence]').change(function (e) {
		$('body').find('.sequence').hide();
		$(`#${e.target.value}`).show()
	});
}

function initDescr() {
	$("#description").html('<div class="header">Примеры числовых последовательностей</div>');

	let parametershtml = `<div style="font-size: 16px">
<div class="header">Выберите ряд:</div>
<select name="sequence">
	<option value="unit-series">Натуральный ряд</option>
	<option value="harmonic">Гармонический ряд</option>
	<option value="sin">Синусоидальная последовательность</option>
	<option value="exp">Экспотенциальная последовательность</option>	
</select>
<br><br>

<div class="sequence" id="harmonic">
	$a_n=\\frac{1}{n}$, $n\\in N$<br>
	$1, \\frac{1}{2}, \\frac{1}{3}, \\frac{1}{4}, ..., \\frac{1}{n}, ...$
</div>
<div class="sequence" id="unit-series" hidden>
	$a_n=n$, $n\\in N$
</div>
<div class="sequence" id="sin" hidden>
	$a_n = \\sin(\\omega n)$, $n \\in N, \\omega \\in \\mathbb{R}$
	<div class="flex-align-items">
		<label for="omega-input">$\\omega$</label>
		<input type="text" id="omega-input" value="1.0">
	</div>
</div>
<div class="sequence" id="exp" hidden>
	$a_n = \\exp(-b n)$, $n \\in N, b \\in \\mathbb{R}$
	<div class="flex-align-items">
		<label for="b-input" >$b$</label>
		<input type="text" id="b-input" value="0.5">
	</div>
</div>

<div class="flex-align-items">
	<label for="n-input" >$n$</label>
	<input type="number" id="n-input" value="10">
</div>

<br><br>
<div class="header">Выберите тип отображения:</div> 
<form name="form-display-type">
	<div class="form-group">
		<input id="numercal-axis"  type="radio" name="display-type" checked>
		<label for="numercal-axis">Изображение на числовой оси Ox</label>
	</div>
	<div class="form-group">
		<input id="func-form"  type="radio" name="display-type" >
		<label for="func-form">Изображение в виде функции</label>
	</div>
	<div class="form-group">
		<input id="animation"  type="radio" name="display-type">
		<label for="animation">Анимация</label>
	</div>
</form>
</div>

<div style="display: flex; margin-top: 50px">
	<button id="execute-builds" style="margin: auto">Выполнить построения!</button>
</div>
	`;

	$('#parameters').html(parametershtml);
	$('#execute-builds').click(function (e) {
		sequenceType = $('select[name=sequence] :selected').val();
		displayType = $('form[name=form-display-type] :checked').attr('id');
		w = +$('#omega-input').val();
		b = +$('#b-input').val();
		n = +$('#n-input').val();

		initBuffers();
	});

	applyCssStyles();

	$("Title").html('Квант "Последовательность"');
}


function initData() {
	let pointRad = 5;

	if (points[0].coord1[0] > points[1].coord1[0] - 0.5) points[0].coord1[0] = points[1].coord1[0] - 0.5;

	xMin = points[0].coord1[0];
	xMax = points[1].coord1[0];

	primitives.push({
		class: 'point',
		text: katex.renderToString(`x_{min}=${points[0].coord1[0].toPrecision(2)}`),
		pos: 'ct',
		arr0: vec3.create([points[0].coord1[0], 0.0, 0.0]),
		rad: pointRad,
		color: [0.0, 0.0, 1.0, 1.0]
	});
	primitives.push({
		class: 'point',
		text: katex.renderToString(`x_{max}=${points[1].coord1[0].toPrecision(2)}`),
		pos: 'ct',
		arr0: vec3.create([points[1].coord1[0], 0.0, 0.0]),
		rad: pointRad,
		color: [0.0, 0.0, 1.0, 1.0]
	});
	primitives.push({
		class: 'point',
		text: katex.renderToString('0'),
		pos: 'rt',
		arr0: vec3.create([points[2].coord1[0], 0.0, 0.0]),
		rad: pointRad,
		color: [0.0, 0.0, 1.0, 1.0]
	});

	let pointColor = [1.0, 0.647, 0.0, 1.0];

	for (let i = 1; i <= n; i++) {
		let x = 0.0;
		switch (sequenceType) {
			case 'harmonic':
				x = 1.0 / i;
				break;
			case 'sin':
				x = Math.sin(w * i);
				break;
			case 'exp':
				x = Math.exp(-b * i);
				break;
			case 'unit-series':
				x = 1.0;
				break;
		}
		if (displayType === 'numercal-axis') {
			if (x >= xMin && x <= xMax) {
				primitives.push({
					class: 'point',
					text: katex.renderToString(x.toPrecision(2).toString()),
					pos: 'rt',
					arr0: vec3.create([x, 0.0, 0.0]),
					rad: pointRad,
					color: pointColor,
				});
			}
		} else if (displayType === 'func-form') {
			if (i >= xMin && i <= xMax) {
				primitives.push({
					class: 'point',
					text: katex.renderToString(x.toPrecision(2).toString()),
					pos: 'rt',
					arr0: vec3.create([i, x, 0.0]),
					rad: pointRad,
					color: pointColor,
				});
			}
		}
	}
}
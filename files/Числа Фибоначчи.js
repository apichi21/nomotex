//Размерность пространства в примере (2d или 3d)
let dimention = "2d";

let aMax = 10;
let n = 7;
let displayType = 'fib-spiral';

function initPoints() {
	points = [];
	// points.push({coord1: vec3.create([aMax, 0.0, 0.0]), movable: "free"});
	// points.push({coord1: vec3.create([0.0, 0.0, 0.0]), movable: "fixed"});
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

	$('form[name=form-display-type]').each(function (idx, form) {
		$(form).find('.form-group').each(function (idx, elem) {
			elem.style.display = 'flex';
			elem.style.justifyContent = 'space-between';
			elem.style.alignItems = 'center';
			elem.style.margin = '20px';
		});
	});

	$('form[name=bound]').each(function (idx, form) {
		$(form).find('.form-group').each(function (idx, elem) {
			elem.style.display = 'flex';
			elem.style.justifyContent = 'space-between';
			elem.style.alignItems = 'center';
			elem.style.margin = '20px';
		});
	});
}

function initDescr() {
	$("#description").html('<div class="header">Последовательности чисел Фибоначчи</div>');

	let parametershtml = `<div style="font-size: 16px">
<div style="text-align: center">
	$0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ...$<br>
	Общий член этой последовательности образуется как сумма двух предыдущих членов<br>
	$a_0=0, a_1=1, a_n=a_{n-1}+a_{n-2}$, $n \\geqslant 2, n \\in N$
</div>
<br><br>
<div class="header">Выберите тип отображения:</div> 
<form name="form-display-type">
	<div class="form-group">
		<input id="fib-spiral"  type="radio" name="display-type" checked>
		<label for="fib-spiral">Изображение с помощью спирали Фибоначчи</label>
	</div>
	<div class="form-group">
		<input id="ulam-spiral"  type="radio" name="display-type" >
		<label for="ulam-spiral">Изображение с помощью спирали Улама</label>
	</div>
	<div class="form-group">
		<input id="animation"  type="radio" name="display-type">
		<label for="animation">Анимация</label>
	</div>
</form>
</div>

<form name="bound">
	<div class="form-group">
		<label for="n-input" >$n$</label>
		<input type="number" id="n-input" value="${n}">
	</div>	
	<div class="form-group">
		<label for="aMax-input" >$a_{max}$</label>
		<input id="aMax-input" type="range" min="1" max="100" value="${aMax}" step="1">
	</div>
	<div class="form-group">
		<div>$a_{max}=$ <span id="aMax-output">${aMax}</span></div>
	</div>
</form>

<div style="display: flex; margin-top: 50px">
	<button id="execute-builds" style="margin: auto">Выполнить построения!</button>
</div>
	`;

	$('#parameters').html(parametershtml);

	applyCssStyles();
	$("Title").html('Квант "Последовательность"');

	$('#aMax-input').change(function (e) {
		aMax = +e.target.value;
		$('#aMax-output').html(aMax.toString());
		initBuffers();
	});

	$('#execute-builds').click(function (e) {
		displayType = $('form[name=form-display-type] :checked').attr('id');
		n = +$('#n-input').val();
		aMax = +$('#aMax-input').val();
		// points[0].coord1[0] = aMax;

		initBuffers();
	});
}

function initData() {
	let pointRad = 5;
	isShowAxes = false;

	let colors = [
		[0.957, 0.682, 0.678, 1.0],
		[0.965, 0.855, 0.635, 1.0],
		[0.722, 1.000, 0.690, 1.0],
		[0.518, 1.000, 0.902, 1.0],
		[0.690, 0.655, 0.847, 1.0],
	];

	let arcColor = [1.0, 0.0, 0.0, 1.0],
		lineHeight = 3.0;

	let colorsJ = -1;

	const addPlaneAndArc = (text, arrs, fibNnubmer) => {
		primitives.push({
			class: "plane",
			text: text,
			arr0: arrs[0],
			arr1: arrs[1],
			arr2: arrs[2],
			arr3: arrs[3],
			color: colors[(++colorsJ) % 5]
		});

		primitives.push({
			class: "arc",
			arr0: arrs[0],
			arr1: arrs[1],
			arr2: arrs[3],
			Rad: fibNnubmer,
			rad: lineHeight,
			color: arcColor
		});
	};

	if (displayType === 'fib-spiral') {

		let numbers = [];
		let prev = 0, next = 1;

		if (next === aMax) {
			n = 2;
			$('#n-input').val(n);
		} else {
			numbers.push(prev);
			let i = 1;
			while (next < aMax) {
				numbers.push(next);
				i++;
				let tmp = prev;
				prev = next;
				next = next + tmp;
			}

			n = i;
			$('#n-input').val(n);
		}

		let colorsJ = -1;

		// addPlaneAndArc('1', [[0.0, 0.0, 0.0], [-1.0, 0.0, 0.0], [-1.0, -1.0, 0.0], [0.0, -1.0, 0.0]], 1);


		primitives.push({
			class: "plane",
			text: '1',
			arr0: [0.0, 0.0, 0.0],
			arr1: [-1.0, 0.0, 0.0],
			arr2: [-1.0, -1.0, 0.0],
			arr3: [0.0, -1.0, 0.0],
			color: colors[(++colorsJ) % 5]
		});

		primitives.push({
			class: "arc",
			arr0: [0.0, 0.0, 0.0],
			arr1: [-1.0, 0.0, 0.0],
			arr2: [0.0, -1.0, 0.0],
			Rad: 1.0,
			rad: lineHeight,
			color: arcColor
		});


		// addPlaneAndArc('1', [0.0, 0.0, 0.0], [0.0, -1.0, 0.0], [1.0, -1.0, 0.0], [1.0, 0.0, 0.0], 1);

		primitives.push({
			class: "plane",
			text: '1',
			arr0: [0.0, 0.0, 0.0],
			arr1: [0.0, -1.0, 0.0],
			arr2: [1.0, -1.0, 0.0],
			arr3: [1.0, 0.0, 0.0],
			color: colors[(++colorsJ) % 5],
		});


		primitives.push({
			class: "arc",
			arr0: [0.0, 0.0, 0.0],
			arr1: [0.0, -1.0, 0.0],
			arr2: [1.0, 0.0, 0.0],
			Rad: 1.0,
			rad: lineHeight,
			color: arcColor
		});


		let x = 1.0, y = 0.0;

		for (let i = 3; i < numbers.length; i += 4) {

			primitives.push({
				class: "plane",
				text: `${numbers[i]}`,
				arr0: [x - numbers[i], y, 0.0],
				arr1: [x, y, 0.0],
				arr2: [x, y + numbers[i], 0.0],
				arr3: [x - numbers[i], y + numbers[i], 0.0],
				color: colors[(++colorsJ) % 5],
				pos: 'cc'
			});

			primitives.push({
				class: "arc",
				arr0: [x - numbers[i], y, 0.0],
				arr1: [x, y, 0.0],
				arr2: [x - numbers[i], y + numbers[i], 0.0],
				Rad: numbers[i],
				rad: lineHeight,
				color: arcColor
			});

			x = x - numbers[i];
			y = y + numbers[i];
			primitives.push({
				class: "plane",
				text: `${numbers[i + 1]}`,
				arr0: [x, y - numbers[i + 1], 0.0],
				arr1: [x, y, 0.0],
				arr2: [x - numbers[i + 1], y, 0.0],
				arr3: [x - numbers[i + 1], y - numbers[i + 1], 0.0],
				color: colors[(++colorsJ) % 5],
				pos: 'cc'
			});

			primitives.push({
				class: "arc",
				arr0: [x, y - numbers[i + 1], 0.0],
				arr1: [x, y, 0.0],
				arr2: [x - numbers[i + 1], y - numbers[i + 1], 0.0],
				Rad: numbers[i + 1],
				rad: lineHeight,
				color: arcColor
			});

			x = x - numbers[i + 1];
			y = y - numbers[i + 1];
			primitives.push({
				class: "plane",
				text: `${numbers[i + 2]}`,
				arr0: [x + numbers[i + 2], y, 0.0],
				arr1: [x, y, 0.0],
				arr2: [x, y - numbers[i + 2], 0.0],
				arr3: [x + numbers[i + 2], y - numbers[i + 2], 0.0],
				color: colors[(++colorsJ) % 5]
			});


			primitives.push({
				class: "arc",
				arr0: [x + numbers[i + 2], y, 0.0],
				arr1: [x, y, 0.0],
				arr2: [x + numbers[i + 2], y - numbers[i + 2], 0.0],
				Rad: numbers[i + 2],
				rad: lineHeight,
				color: arcColor
			});

			x = x + numbers[i + 2];
			y = y - numbers[i + 2];

			primitives.push({
				class: "plane",
				text: `${numbers[i + 3]}`,
				arr0: [x, y + numbers[i + 3], 0.0],
				arr1: [x, y, 0.0],
				arr2: [x + numbers[i + 3], y, 0.0],
				arr3: [x + numbers[i + 3], y + numbers[i + 3], 0.0],
				color: colors[(++colorsJ) % 5]
			});

			primitives.push({
				class: "arc",
				arr0: [x, y + numbers[i + 3], 0.0],
				arr1: [x, y, 0.0],
				arr2: [x + numbers[i + 3], y + numbers[i + 3], 0.0],
				Rad: numbers[i + 3],
				rad: lineHeight,
				color: arcColor
			});

			x = x + numbers[i + 3];
			y = y + numbers[i + 3];
		}
	} else {
		let numbers = {};
		let prev = 0, next = 1;

		if (next === aMax) {
			n = 2;
			$('#n-input').val(n);
		} else {
			numbers[prev] = true;
			let i = 1;
			while (next < aMax) {
				numbers[next] = true;
				i++;
				let tmp = prev;
				prev = next;
				next = next + tmp;
			}

			n = i;
			$('#n-input').val(n);
		}

		let X = 10, Y = 10;
		let x, y, dx, dy;
		let fibPlaneColor = [1.0, 0.647, 0.0, 1.0];

		x = y = dx = 0;
		dy = -1;

		let t = Math.max(X, Y);
		let maxI = t * t;
		let colorsJ = -1;
		for (let i = 1; i < maxI && i <= aMax; i++) {
			if ((-X / 2 <= x) && (x <= X / 2) && (-Y / 2 <= y) && (y <= Y / 2)) {
				primitives.push({
					class: 'text',
					text: `${i}`,
					arr0: [x - 0.5, y - 0.5, 0.0],
					pos: 'cc',
				});

				if (numbers[i] === true) {
					primitives.push({
						class: "plane",
						text: '',
						arr0: [x, y, 0.0],
						arr1: [x - 1.0, y, 0.0],
						arr2: [x - 1.0, y - 1.0, 0.0],
						arr3: [x, y - 1.0, 0.0],
						color: fibPlaneColor,
					});
				}
			}

			if ((x === y) || ((x < 0) && (x === -y)) || ((x > 0) && (x === 1 - y))) {
				t = dx;
				dx = -dy;
				dy = t;
			}
			x += dx;
			y += dy;
		}
	}
}
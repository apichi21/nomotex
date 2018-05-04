//Размерность пространства в примере (2d или 3d)
let dimention = "2d";

let displayType = "numercal-axis";

const a = 2;
let n = 10,
    // epsilon = 3,
    epsilon = Math.abs(Math.pow(-1, n) / n),
    epsMin = a - epsilon,
    epsMax = a + epsilon;

let displayNumbers = false;

let animate = false,
    currentDraw = 0,
    intervalCanacelId,
    computedObjects = [];

const pointRad = 5,
    pointColor = [1.0, 0.647, 0.0, 1.0];

function initPoints() {
    points = [];
    points.push({coord1: vec3.create([epsMin, 0.0, 0.0]), movable: "free"});
    points.push({coord1: vec3.create([epsMax, 0.0, 0.0]), movable: "free"});
    points.push({coord1: vec3.create([0.0, 0.0, 0.0]), movable: "fixed"});
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

    $("form[name=form-display-type]").each(function (idx, form) {
        $(form)
            .find(".form-group")
            .each(function (idx, elem) {
                elem.style.display = "flex";
                elem.style.justifyContent = "space-between";
                elem.style.alignItems = "center";
                elem.style.margin = "20px";
            });
    });

    $("form[name=bound]").each(function (idx, form) {
        $(form)
            .find(".form-group")
            .each(function (idx, elem) {
                elem.style.display = "flex";
                elem.style.justifyContent = "space-between";
                elem.style.alignItems = "center";
                elem.style.margin = "20px";
            });
    });
}

function initDescr() {
    $("#description").html(
        '<div class="header">Пример сходящейся последовательности</div>'
    );

    let parametershtml = `<div style="font-size: 16px">
<div style="text-align: left">
	Докажем, что последовательность $$a_n = 2 + \\frac{(-1)^n}{n}$$ имеет предел $a=2.$<br>
	Доказательство:<br>
	Выберем произвольное число $\\varepsilon > 0$. Требуется доказать, что существует такое $N(\\varepsilon)$, 
	что при $n>N$ выполняется неравенство
	$$|a_n-a|<\\varepsilon$$
	Составим это число:
	$$|a_n-a| = |2 + \\frac{1^n}{n} - 2| = |\\frac{(-1)^n}{n}| = \\frac{|(-1)^n|}{n} = \\frac{1}{n}$$
	Пусть $0 < \\varepsilon < 1$.
	Тогда если взять в качестве $N(\\varepsilon) = E(\\frac{1}{\\varepsilon})+1$, где $E(x)$ - целая часть числа $x$, 
	то при $n>N(\\epsilon)$ выполняется неравенство
	$$|a_n - a| = \\frac{1}{n} < \\frac{1}{N(\\varepsilon)} = \\frac{1}{E(\\frac{1}{\\varepsilon})+1} 
	\\leq \\frac{1}{\\frac{1}{\\varepsilon}} = \\varepsilon,$$
	т.к. $E(\\frac{1}{\\varepsilon})+1 \\geq \\frac{1}{\\varepsilon}$. Если же $\\varepsilon \\geq 1$, то в качестве 
	$N$ можно выбрать $N=1$, тогда при $n>N=1$ получим
	$$|a_n - a| < \\frac{1}{n} < \\frac{1}{N} = 1 \\leq \\varepsilon.$$ 
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
		<input id="animation"  type="checkbox" name="animation-turn">
		<label for="animation">Анимация</label>
	</div>
	<div class="form-group">
		<input id="display-numbers"  type="checkbox" name="numbers-turn">
		<label for="display-numbers">Подписывать точки</label>
	</div>
</form>
</div>

<form name="bound">
	<div class="form-group">
		<label for="n-input" >$n$</label>
		<input type="number" id="n-input" value="${n}">
	</div>	
	<div class="form-group">
		<label for="epsilon-input" >$\\epsilon$</label>
        <input id="epsilon-input" type="text" value="${epsilon}" disabled>
	</div>
</form>
	`;

    $("#parameters").html(parametershtml);

    applyCssStyles();
    $("Title").html("Пример сходящейся последовательности");

    $(document.body).click(function (e) {
        displayType = $("form[name=form-display-type] :checked").attr("id");
        n = parseInt($("#n-input").val());
        // epsilon = +$("#epsilon-input").val();
        epsilon = Math.abs(Math.pow(-1, n) / n);
        points[0].coord1[0] = a - epsilon;
        points[1].coord1[0] = a + epsilon;

        animate = $("input[name=animation-turn]").is(":checked");
        displayNumbers = $("input[name=numbers-turn]").is(":checked");
        clearInterval(intervalCanacelId);
        currentDraw = 0;
        intervalCanacelId = -1;
        computedObjects = [];
        currentPlaneDrawStep = 1;
        initBuffers();
    });
}

function initData() {
    if (arrPoint != 0.0) {
        if (points[0].coord1[0] >= a - 0.01) {
            points[0].coord1[0] = a - 0.1;
        }

        if (points[1].coord1[0] <= a + 0.01) {
            points[1].coord1[0] = a + 0.1;
        }

        if (displayType === "numercal-axis") {
            points[0].coord1[1] = 0;
            points[0].coord1[2] = 0;

            points[1].coord1[1] = 0;
            points[1].coord1[2] = 0;

            primitives.push({
                class: "point",
                text: "",
                arr0: [arrPoint[0], 0.0, 0.0],
                rad: pointRad,
                color: [1.0, 0.0, 1.0, 1.0]
            });
        } else {
            points[0].coord1[0] = 0;
            points[0].coord1[2] = 0;

            points[1].coord1[0] = 0;
            points[1].coord1[2] = 0;

            primitives.push({
                class: "point",
                text: "",
                arr0: [0.0, arrPoint[1], 0.0],
                rad: pointRad,
                color: [1.0, 0.0, 1.0, 1.0]
            });
        }
    }

    if (epsMin !== points[0].coord1[0]) {
        epsMin = points[0].coord1[0];
        epsilon = a - epsMin;
        epsMax = a + epsilon;
        points[1].coord1[0] = epsMax;
    } else if (epsMax !== points[1].coord1[0]) {
        epsMax = points[1].coord1[0];
        epsilon = epsMax - a;
        epsMin = a - epsilon;
        points[0].coord1[0] = epsMin;
    }

    $("#epsilon-input").val(epsilon.toPrecision(2).toString());

    if (displayType == "numercal-axis") {
        primitives.push({
            class: "point",
            text: katex.renderToString(
                `\\epsilon_{min}=${points[0].coord1[0].toPrecision(2)}`
            ),
            pos: "ct",
            arr0: vec3.create([points[0].coord1[0], 0.0, 0.0]),
            rad: pointRad,
            color: [1.0, 0.0, 0.0, 1.0]
        });

        primitives.push({
            class: "point",
            text: katex.renderToString(
                `\\epsilon_{max}=${points[1].coord1[0].toPrecision(2)}`
            ),
            pos: "ct",
            arr0: [points[1].coord1[0], 0.0, 0.0],
            rad: pointRad,
            color: [1.0, 0.0, 0.0, 1.0]
        });
    } else {
        primitives.push({
            class: "point",
            text: katex.renderToString(
                `\\epsilon_{min}=${points[0].coord1[0].toPrecision(2)}`
            ),
            pos: "ct",
            arr0: [0.0, points[0].coord1[0], 0.0],
            rad: pointRad,
            color: [1.0, 0.0, 0.0, 1.0]
        });

        primitives.push({
            class: "point",
            text: katex.renderToString(
                `\\epsilon_{max}=${points[1].coord1[0].toPrecision(2)}`
            ),
            pos: "ct",
            arr0: [0.0, points[1].coord1[0], 0.0],
            rad: pointRad,
            color: [1.0, 0.0, 0.0, 1.0]
        });
    }

    if (displayType === "func-form") {
        primitives.push({
            class: "dashline",
            text: "",
            pos: "lt",
            arr0: vec3.create([0, a, 0.0]),
            arr1: vec3.create([n, a, 0.0]),
            rad: 2,
            color: [1.0, 0.0, 0.0, 1.0]
        });

        primitives.push({
            class: "text",
            text: katex.renderToString(`a = 2`),
            pos: "rt",
            arr0: vec3.create([0, a, 0.0])
        });
    }

    if (animate === true) {
        if (computedObjects.length == 0) {
            computePoints(computedObjects);
        }

        if (intervalCanacelId === -1) {
            intervalCanacelId = setInterval(function () {
                initBuffers();
            }, 500);
        }

        for (let i = 0; i < currentDraw; i += 1) {
            if (i < computedObjects.length) {
                primitives.push(computedObjects[i]);
            }
        }

        if (currentDraw >= computedObjects.length) {
            clearInterval(intervalCanacelId);
            intervalCanacelId = -1;
        }
        currentDraw += 1;
    } else {
        computePoints(primitives);
    }
}

function computePoints(data) {
    let computedN = 0;
    let x = 2.0 + (-1) ** 1 / 1;

    for (let i = 1; x < epsMin || (x > epsMax && i <= 100); i++, computedN++) {
        x = 2.0 + (-1) ** i / i;
        text = katex.renderToString(x.toPrecision(2).toString());

        if (!displayNumbers) {
            text = "";
        }

        if (displayType === "numercal-axis") {
            data.push({
                class: "point",
                text: text,
                pos: "rt",
                arr0: vec3.create([x, 0.0, 0.0]),
                rad: pointRad,
                color: pointColor
            });
        } else if (displayType === "func-form") {
            data.push({
                class: "point",
                text: text,
                pos: "rt",
                arr0: vec3.create([i, x, 0.0]),
                rad: pointRad,
                color: pointColor
            });
        }
    }

    if (n != computedN) {
        n = computedN;
    }

    $("#n-input").val(n);
}

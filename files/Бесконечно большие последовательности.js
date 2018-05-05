//Размерность пространства в примере (2d или 3d)
let dimention = "2d";
let xLabel = "x", yLabel = "";

let sequenceType = "1",
    displayType = "numercal-axis",
    drawNumbers = true;

let xMin = -4,
    xMax = 4;
let n = 10;

let animate = false,
    currentDraw = 0,
    intervalCanacelId,
    computedObjects = [];

function initPoints() {
    points = [];
    points.push({coord1: vec3.create([xMin, 0.0, 0.0]), movable: "free"});
    points.push({coord1: vec3.create([xMax, 0.0, 0.0]), movable: "free"});
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
        margin: "10px"
    });

    $(".sequence").css({
        border: "1px solid black",
        "border-radius": "10px",
        padding: "15px",
        margin: "0 5px",
        "text-align": "left"
    });

    $("form[name=form-display-type]").each(function (idx, form) {
        $(form)
            .find(".form-group")
            .each(function (idx, elem) {
                elem.style.display = "flex";
                elem.style.justifyContent = "space-between";
                elem.style.alignItems = "center";
            });
    });

    $("form[name=sequence]").each(function (idx, form) {
        $(form)
            .find(".form-group")
            .each(function (idx, elem) {
                elem.style.display = "flex";
                elem.style.justifyContent = "space-between";
                elem.style.alignItems = "center";
            });
    });

    $("form[name=sequence]").change(function (e) {
        $("body")
            .find(".sequence")
            .hide();
        $(`#${e.target.name + e.target.id}`).show();
    });
}

function initDescr() {
    $("#description").html(
        '<div class="header">Примеры бесконечно малых последовательностей</div>'
    );

    let parametershtml = `<div style="font-size: 16px">
<div class="header">Выберите последовательность:</div>
<form name="sequence">
	<div class="form-group">
		<input id="1" type="radio" name="seq" checked>
		<label for="1">$ a_n = (-1)^n \\cdot 2^n $</label>
	</div>
	<div class="form-group">
		<input id="2" type="radio" name="seq" >
		<label for="2">$ a_n = n $</label>
	</div>
	<div class="form-group">
		<input id="3"  type="radio" name="seq">
		<label for="3">$ a_n = -\\ln(n) $</label>
	</div>
	<div class="form-group">
		<input id="4"  type="radio" name="seq">
		<label for="4">$ a_n = (1+(-1)^n) \\cdot 2^n $</label>
	</div>
</form>
</div>
<br><br>

<div class="sequence" id="seq1">
	Последовательность $$a_n = (-1)^n \\cdot 2^n$$ - бесконечно большая, т.к. неравенство $$|(-1)^n \\cdot 2^n| > M$$
	выполняется при $n>N(\\varepsilon)=E(\\log_2 M).$
</div>
<div class="sequence" id="seq2" hidden>
	Последовательность $$ a_n = n $$ - положительная бесконечно большая.
</div>
<div class="sequence" id="seq3" hidden>
	Последовательность $$ a_n = -\\ln(n) $$ - отрицательная бесконечно большая.
</div>
<div class="sequence" id="seq4" hidden>
	Последовательность $$ a_n = (1+(-1)^n) \\cdot 2^n $$ не является бесконечно большой, поскольку ее члены с нечетными 
	номерами равны нулю, что не позволяет добиться выполнения неравенства $|a_n|>M.$
</div>

<div class="flex-align-items">
	<label for="n-input" >$n:$</label>
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
		<input id="animation"  type="checkbox" name="animation-turn">
		<label for="animation">Анимация</label>
	</div>
	<div class="form-group">
		<input id="draw-numbers"  type="checkbox" name="numbers-turn" checked>
		<label for="animation">Подписывать числа</label>
	</div>
</form>
</div>
`;

    $("#parameters").html(parametershtml);

    $(document.body).click(function (e) {
        sequenceType = $("form[name=sequence] :checked").attr("id");
        displayType = $("form[name=form-display-type] :checked").attr("id");
        n = +$("#n-input").val();

        animate = $("input[name=animation-turn]").is(":checked");
        drawNumbers = $("input[name=numbers-turn]").is(":checked");
        clearInterval(intervalCanacelId);
        currentDraw = 0;
        intervalCanacelId = -1;
        computedObjects = [];

        initBuffers();
    });

    applyCssStyles();

    $("Title").html("Пример бесконечно малых последовательностей");
}

const POINT_RAD = 5,
    POINT_COLOR = [0.0, 0.0, 1.0, 1.0];

function initData() {
    if (arrPoint != 0.0) {
        if (points[0].coord1[0] > points[1].coord1[0] - 0.5) {
            points[0].coord1[0] = points[1].coord1[0] - 0.5;
        }

        points[0].coord1[1] = 0;
        points[0].coord1[2] = 0;

        points[1].coord1[1] = 0;
        points[1].coord1[2] = 0;

        primitives.push({
            class: "point",
            text: "",
            arr0: [arrPoint[0], 0.0, 0.0],
            rad: POINT_RAD,
            color: [1.0, 0.0, 1.0, 1.0]
        });
    }

    xMin = points[0].coord1[0];
    xMax = points[1].coord1[0];

    primitives.push({
        class: "point",
        text: katex.renderToString(
            `x_{min}=${points[0].coord1[0].toPrecision(2)}`
        ),
        pos: "ct",
        arr0: vec3.create([points[0].coord1[0], 0.0, 0.0]),
        rad: POINT_RAD,
        color: [1.0, 0.0, 0.0, 1.0]
    });
    primitives.push({
        class: "point",
        text: katex.renderToString(
            `x_{max}=${points[1].coord1[0].toPrecision(2)}`
        ),
        pos: "ct",
        arr0: vec3.create([points[1].coord1[0], 0.0, 0.0]),
        rad: POINT_RAD,
        color: [1.0, 0.0, 0.0, 1.0]
    });

    if (animate === true) {
        if (computedObjects.length === 0) {
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
    for (let i = 1; i <= n; i++) {
        let x = 0.0;
        switch (sequenceType) {
            case "1":
                x = (-1) ** i * 2 ** i;
                break;
            case "2":
                x = i;
                break;
            case "3":
                x = -Math.log(i);
                break;
            case "4":
                x = (1 + (-1) ** i) * 2 ** i;
                break;
        }
        let text = katex.renderToString(x.toFixed(1));
        if (!drawNumbers) {
            text = "";
        }
        if (displayType === "numercal-axis") {
            xLabel = "x";
            yLabel = "";
            if (x >= xMin && x <= xMax) {
                data.push({
                    class: "point",
                    text: text,
                    pos: "rt",
                    arr0: vec3.create([x, 0.0, 0.0]),
                    rad: POINT_RAD,
                    color: POINT_COLOR
                });
            }
        } else if (displayType === "func-form") {
            xLabel = "n";
            yLabel = "a_n";
            if (i >= xMin && i <= xMax) {
                data.push({
                    class: "point",
                    text: text,
                    pos: "rt",
                    arr0: vec3.create([i, x, 0.0]),
                    rad: POINT_RAD,
                    color: POINT_COLOR
                });
            }
        }
    }
}

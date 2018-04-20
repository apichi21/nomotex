let dimention = "2d";

let sequenceType = "unit-series",
    displayType = "numercal-axis",
    drawNumbres = true;

let w = 1.0,
    b = 0.5;
let xMin = -4,
    xMax = 4;
let n = 10;

let animate = false,
    currentDraw = 0,
    intervalCanacelId,
    computedObjects = [];

function initPoints() {
    points = [];
    points.push({ coord1: vec3.create([xMin, 0.0, 0.0]), movable: "free" });
    points.push({ coord1: vec3.create([xMax, 0.0, 0.0]), movable: "free" });
    points.push({ coord1: vec3.create([0.0, 0.0, 0.0]), movable: "fixed" });
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

    $("form[name=form-display-type]").each(function(idx, form) {
        $(form)
            .find(".form-group")
            .each(function(idx, elem) {
                elem.style.display = "flex";
                elem.style.justifyContent = "space-between";
                elem.style.alignItems = "center";
            });
    });

    $("form[name=sequence]").each(function(idx, form) {
        $(form)
            .find(".form-group")
            .each(function(idx, elem) {
                elem.style.display = "flex";
                elem.style.justifyContent = "space-between";
                elem.style.alignItems = "center";
                elem.style.margin = "20px";
            });
    });

    $("select[name=sequence]").change(function(e) {
        $("body")
            .find(".sequence")
            .hide();
        $(`#${e.target.value}`).show();
    });
}

function initDescr() {
    $("#description").html(
        '<div class="header">Примеры числовых последовательностей</div>'
    );

    let parametershtml = `<div style="font-size: 16px">
<div class="header">Выберите ряд:</div>    
<form name="sequence">
	<div class="form-group">
		<input id="unit-series"  type="radio" name="sequence-type" checked>
        <label for="unit-series">Натуральный ряд</label>
    </div>
    <div class="sequence" data-sequence-type="unit-series">
	        $a_n=n$, $n\\in N$
    </div>
	<div class="form-group">
		<input id="harmonic" type="radio" name="sequence-type" >
		<label for="harmonic">Гармонический ряд</label>
    </div>
    <div class="sequence" data-sequence-type="harmonic">
	    $a_n=\\frac{1}{n}$, $n\\in N$<br>
	    $1, \\frac{1}{2}, \\frac{1}{3}, \\frac{1}{4}, ..., \\frac{1}{n}, ...$
    </div>
	<div class="form-group">
		<input id="sin"  type="radio" name="sequence-type">
		<label for="sin">Синусоидальная последовательность</label>
    </div>
    <div class="sequence" data-sequence-type="sin">
	    $a_n = \\sin(\\omega n)$, $n \\in N, \\omega \\in \\mathbb{R}$
	    <div class="flex-align-items">
		    <label for="omega-input">$\\omega$</label>
		    <input type="text" id="omega-input" value="1.0">
	    </div>
    </div>
	<div class="form-group">
		<input id="exp"  type="radio" name="sequence-type">
		<label for="exp">Экспотенциальная последовательность</label>
    </div>
    
    <div class="sequence" data-sequence-type="exp">
        $a_n = \\exp(-b n)$, $n \\in N, b \\in \\mathbb{R}$
        <div class="flex-align-items">
        <label for="b-input" >$b$</label>
        <input type="text" id="b-input" value="0.5">
    </div>
</form>

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

    $(document.body).click(function(e) {
        sequenceType = $("input[name=sequence-type]:checked").attr("id");
        displayType = $("form[name=form-display-type] :checked").attr("id");
        w = +$("#omega-input").val();
        b = +$("#b-input").val();
        n = parseInt($("#n-input").val());

        animate = $("input[name=animation-turn]").is(":checked");
        drawNumbres = $("input[name=numbers-turn]").is(":checked");
        clearInterval(intervalCanacelId);
        currentDraw = 0;
        intervalCanacelId = -1;
        computedObjects = [];
        initBuffers();
    });

    applyCssStyles();

    $("Title").html('Квант "Последовательность"');
}

const pointColor = [0.0, 0.0, 1.0, 1.0],
    pointRad = 5,
    chosenPointRad = 6;

function initData() {
    if (arrPoint != 0) {
        if (points[0].coord1[0] > points[1].coord1[0] - 0.5)
            points[0].coord1[0] = points[1].coord1[0] - 0.5;

        points[0].coord1[1] = 0;
        points[0].coord1[2] = 0;

        points[1].coord1[1] = 0;
        points[1].coord1[2] = 0;

        primitives.push({
            class: "point",
            text: "",
            arr0: arrPoint,
            rad: chosenPointRad,
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
        rad: pointRad,
        color: [1.0, 0.0, 0.0, 1.0]
    });
    primitives.push({
        class: "point",
        text: katex.renderToString(
            `x_{max}=${points[1].coord1[0].toPrecision(2)}`
        ),
        pos: "ct",
        arr0: vec3.create([points[1].coord1[0], 0.0, 0.0]),
        rad: pointRad,
        color: [1.0, 0.0, 0.0, 1.0]
    });

    if (animate === true) {
        if (computedObjects.length === 0) {
            computePoints(computedObjects);
        }

        if (intervalCanacelId === -1) {
            intervalCanacelId = setInterval(function() {
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
            case "harmonic":
                x = 1.0 / i;
                break;
            case "sin":
                x = Math.sin(w * i);
                break;
            case "exp":
                x = Math.exp(-b * i);
                break;
            case "unit-series":
                x = i;
                break;
        }
        let text = katex.renderToString(x.toPrecision(2).toString());
        if (!drawNumbres) {
            text = "";
        }

        if (displayType === "numercal-axis") {
            if (x >= xMin && x <= xMax) {
                data.push({
                    class: "point",
                    text: text,
                    pos: "rt",
                    arr0: vec3.create([x, 0.0, 0.0]),
                    rad: pointRad,
                    color: pointColor
                });
            }
        } else if (displayType === "func-form") {
            if (i >= xMin && i <= xMax) {
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
    }
}

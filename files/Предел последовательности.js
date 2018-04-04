//Размерность пространства в примере (2d или 3d)
let dimention = "2d";

let displayType = "numercal-axis";

const a = 2;
let n = 10,
    epsilon = 3,
    // epsilon = Math.abs(Math.pow(-1, n) / n),
    epsMin = a - epsilon,
    epsMax = a + epsilon;

let animate = false,
    currentDraw = 0,
    intervalCanacelId,
    computedObjects = [];

const pointRad = 5,
    pointColor = [1.0, 0.647, 0.0, 1.0];

function initPoints() {
    points = [];
    points.push({ coord1: vec3.create([epsMin, 0.0, 0.0]), movable: "free" });
    points.push({ coord1: vec3.create([epsMax, 0.0, 0.0]), movable: "free" });
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

    $("form[name=form-display-type]").each(function(idx, form) {
        $(form)
            .find(".form-group")
            .each(function(idx, elem) {
                elem.style.display = "flex";
                elem.style.justifyContent = "space-between";
                elem.style.alignItems = "center";
                elem.style.margin = "20px";
            });
    });

    $("form[name=bound]").each(function(idx, form) {
        $(form)
            .find(".form-group")
            .each(function(idx, elem) {
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
<div style="text-align: center">
	Докажем, что... $a_n = 2 + \\frac{(-1)^n}{n}$
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

<div style="display: flex; margin-top: 50px">
	<button id="execute-builds" style="margin: auto">Выполнить построения!</button>
</div>
	`;

    $("#parameters").html(parametershtml);

    applyCssStyles();
    $("Title").html("Пример сходящейся последовательности");

    $("#execute-builds").click(function(e) {
        displayType = $("form[name=form-display-type] :checked").attr("id");
        n = parseInt($("#n-input").val());
        // epsilon = +$("#epsilon-input").val();
        points[0].coord1[0] = a - epsilon;          
        points[1].coord1[0] = a + epsilon;

        animate = $("input[name=animation-turn]").is(":checked");
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
        if (points[0].coord1[0] >= a - 0.1) {
            points[0].coord1[0] = a - 0.1;
        }

        if (points[1].coord1[0] <= a + 0.1) {
            points[1].coord1[0] = a + 0.1;
        }

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

    primitives.push({
        class: "point",
        text: katex.renderToString(
            `\\epsilon_{min}=${points[0].coord1[0].toPrecision(2)}`
        ),
        pos: "ct",
        arr0: vec3.create([points[0].coord1[0], 0.0, 0.0]),
        rad: pointRad,
        color: [0.0, 0.0, 1.0, 1.0]
    });

    primitives.push({
        class: "point",
        text: katex.renderToString(
            `\\epsilon_{max}=${points[1].coord1[0].toPrecision(2)}`
        ),
        pos: "ct",
        arr0: [points[1].coord1[0], 0.0, 0.0],
        rad: pointRad,
        color: [0.0, 0.0, 1.0, 1.0]
    });

    primitives.push({
        class: "point",
        text: katex.renderToString("0"),
        pos: "rt",
        arr0: [points[2].coord1[0], 0.0, 0.0],
        rad: pointRad,
        color: [0.0, 0.0, 1.0, 1.0]
    });

    if (displayType === "func-form") {
        primitives.push({
            class: "dashline",
            text: "",
            pos: "lt",
            arr0: vec3.create([0, a, 0.0]),
            arr1: vec3.create([epsMax, a, 0.0]),
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
        let x = 2.0 + (-1) ** i / i;
        if (displayType === "numercal-axis") {
            if (x >= epsMin && x <= epsMax) {
                data.push({
                    class: "point",
                    text: katex.renderToString(x.toPrecision(2).toString()),
                    pos: "rt",
                    arr0: vec3.create([x, 0.0, 0.0]),
                    rad: pointRad,
                    color: pointColor
                });
            }
        } else if (displayType === "func-form") {
            if (i >= epsMin && i <= epsMax) {
                data.push({
                    class: "point",
                    text: katex.renderToString(x.toPrecision(2).toString()),
                    pos: "rt",
                    arr0: vec3.create([i, x, 0.0]),
                    rad: pointRad,
                    color: pointColor
                });
            }
        }
    }
}

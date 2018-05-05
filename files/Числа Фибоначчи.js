let dimention = "2d";
let xLabel = "", yLabel = "";

let n = 7;
let displayType = "fib-spiral",
    animate = false,
    currentDraw = 0,
    intervalCanacelId,
    computedObjects = [];

let currentPlaneDrawStep = 0;

function initPoints() {
    points = [];
}

$(document).keypress(e => {
    if (e.keyCode === 13) {
        e.preventDefault();
        displayType = $("input[name=display-type]:checked").attr("id");
        animate = $("input[name=animation-turn]").is(":checked");
        n = parseInt($("#n-input").val());
        clearInterval(intervalCanacelId);
        currentDraw = 0;
        intervalCanacelId = -1;
        computedObjects = [];
        currentPlaneDrawStep = 1;
        initBuffers();
    }
});

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
        '<div class="header">Последовательность чисел Фибоначчи</div>'
    );

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
		<input id="animation"  type="checkbox" name="animation-turn">
		<label for="animation">Анимация</label>
	</div>
</form>
</div>

<form name="bound">
	<div class="form-group">
		<label for="n-input" >$n:$</label>
		<input type="number" id="n-input" value="${n}">
	</div>	
</form>
	`;

    $("#parameters").html(parametershtml);

    applyCssStyles();
    $("Title").html('Последовательность чисел Фибоначчи');

    $(document.body).click(function(e) {
        displayType = $("input[name=display-type]:checked").attr("id");
        animate = $("input[name=animation-turn]").is(":checked");
        n = parseInt($("#n-input").val());
        clearInterval(intervalCanacelId);
        currentDraw = 0;
        intervalCanacelId = -1;
        computedObjects = [];
        currentPlaneDrawStep = 1;
        initBuffers();
    });
}

let colors = [
    [0.957, 0.682, 0.678, 1.0],
    [0.965, 0.855, 0.635, 1.0],
    [0.722, 1.0, 0.69, 1.0],
    [0.518, 1.0, 0.902, 1.0],
    [0.69, 0.655, 0.847, 1.0]
];

const POINT_RAD = 5;
IS_SHOW_AXES = false;

const ARC_COLOR = [1.0, 0.0, 0.0, 1.0],
    LINE_HEIGHT = 3.0;

const MAX_NUMBERS_DISPLAYS = 100;

function initData() {
    if (animate === true) {
        if (computedObjects.length < n) {
            if (displayType === "fib-spiral") {
                computeSpiralArc(computedObjects);
            } else {
                computeSpiralPlane(computedObjects);
            }
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

        if (displayType === "fib-spiral") {
            currentDraw += 2;
        } else {
            currentPlaneDrawStep += 1;
            currentDraw += currentPlaneDrawStep;
        }
    } else {
        if (displayType === "fib-spiral") {
            computeSpiralArc(primitives);
        } else {
            computeSpiralPlane(primitives);
        }
    }
}

function computeSpiralPlane(data) {
    let numbers = {};
    let prev = 0,
        next = 1;

    if (n < 1) {
        n = 1;
    }

    numbers[prev] = true;
    for (let i = 1; i < n; i++) {
        numbers[next] = true;
        let tmp = prev;
        prev = next;
        next = next + tmp;
    }

    $("#n-input").val(n);

    let X = n,
        Y = n;
    let x, y, dx, dy;
    let fibPlaneColor = [1.0, 0.647, 0.0, 1.0];

    x = y = dx = 0;
    dy = -1;

    let t = Math.max(X, Y);
    let maxI = t * t;
    let colorsJ = -1;
    for (let i = 0; i < maxI; i++) {
        if (-X / 2 <= x && x <= X / 2 && -Y / 2 <= y && y <= Y / 2) {
            if (maxI <= MAX_NUMBERS_DISPLAYS) {
                data.push({
                    class: "text",
                    text: `${i}`,
                    arr0: [x - 0.5, y - 0.5, 0.0],
                    pos: "cc"
                });
            }

            if (numbers[i] === true) {
                data.push({
                    class: "plane",
                    text: "",
                    arr0: [x, y, 0.0],
                    arr1: [x - 1.0, y, 0.0],
                    arr2: [x - 1.0, y - 1.0, 0.0],
                    arr3: [x, y - 1.0, 0.0],
                    color: fibPlaneColor
                });
            }
        }

        if (x === y || (x < 0 && x === -y) || (x > 0 && x === 1 - y)) {
            t = dx;
            dx = -dy;
            dy = t;
        }
        x += dx;
        y += dy;
    }
}

function computeSpiralArc(data) {
    let colorsJ = -1;
    let numbers = [];
    let prev = 0,
        next = 1;

    if (n < 1) {
        n = 1;
    }

    numbers.push(prev);
    for (let i = 1; i < n; i++) {
        numbers.push(next);
        let tmp = prev;
        prev = next;
        next = next + tmp;
    }

    $("#n-input").val(n);

    if (n >= 2) {
        data.push({
            class: "plane",
            text: "1",
            arr0: [0.0, 0.0, 0.0],
            arr1: [-1.0, 0.0, 0.0],
            arr2: [-1.0, -1.0, 0.0],
            arr3: [0.0, -1.0, 0.0],
            color: colors[++colorsJ % 5]
        });

        data.push({
            class: "arc",
            arr0: [0.0, 0.0, 0.0],
            arr1: [-1.0, 0.0, 0.0],
            arr2: [0.0, -1.0, 0.0],
            Rad: 1.0,
            rad: LINE_HEIGHT,
            color: ARC_COLOR
        });
    }

    if (n >= 3) {
        data.push({
            class: "plane",
            text: "1",
            arr0: [0.0, 0.0, 0.0],
            arr1: [0.0, -1.0, 0.0],
            arr2: [1.0, -1.0, 0.0],
            arr3: [1.0, 0.0, 0.0],
            color: colors[++colorsJ % 5]
        });

        data.push({
            class: "arc",
            arr0: [0.0, 0.0, 0.0],
            arr1: [0.0, -1.0, 0.0],
            arr2: [1.0, 0.0, 0.0],
            Rad: 1.0,
            rad: LINE_HEIGHT,
            color: ARC_COLOR
        });
    }

    let x = 1.0,
        y = 0.0;

    for (let i = 3; i < numbers.length; i += 4) {
        data.push({
            class: "plane",
            text: `${numbers[i]}`,
            arr0: [x - numbers[i], y, 0.0],
            arr1: [x, y, 0.0],
            arr2: [x, y + numbers[i], 0.0],
            arr3: [x - numbers[i], y + numbers[i], 0.0],
            color: colors[++colorsJ % 5],
            pos: "cc"
        });

        data.push({
            class: "arc",
            arr0: [x - numbers[i], y, 0.0],
            arr1: [x, y, 0.0],
            arr2: [x - numbers[i], y + numbers[i], 0.0],
            Rad: numbers[i],
            rad: LINE_HEIGHT,
            color: ARC_COLOR
        });

        x = x - numbers[i];
        y = y + numbers[i];
        data.push({
            class: "plane",
            text: `${numbers[i + 1]}`,
            arr0: [x, y - numbers[i + 1], 0.0],
            arr1: [x, y, 0.0],
            arr2: [x - numbers[i + 1], y, 0.0],
            arr3: [x - numbers[i + 1], y - numbers[i + 1], 0.0],
            color: colors[++colorsJ % 5],
            pos: "cc"
        });

        data.push({
            class: "arc",
            arr0: [x, y - numbers[i + 1], 0.0],
            arr1: [x, y, 0.0],
            arr2: [x - numbers[i + 1], y - numbers[i + 1], 0.0],
            Rad: numbers[i + 1],
            rad: LINE_HEIGHT,
            color: ARC_COLOR
        });

        x = x - numbers[i + 1];
        y = y - numbers[i + 1];
        data.push({
            class: "plane",
            text: `${numbers[i + 2]}`,
            arr0: [x + numbers[i + 2], y, 0.0],
            arr1: [x, y, 0.0],
            arr2: [x, y - numbers[i + 2], 0.0],
            arr3: [x + numbers[i + 2], y - numbers[i + 2], 0.0],
            color: colors[++colorsJ % 5]
        });

        data.push({
            class: "arc",
            arr0: [x + numbers[i + 2], y, 0.0],
            arr1: [x, y, 0.0],
            arr2: [x + numbers[i + 2], y - numbers[i + 2], 0.0],
            Rad: numbers[i + 2],
            rad: LINE_HEIGHT,
            color: ARC_COLOR
        });

        x = x + numbers[i + 2];
        y = y - numbers[i + 2];

        data.push({
            class: "plane",
            text: `${numbers[i + 3]}`,
            arr0: [x, y + numbers[i + 3], 0.0],
            arr1: [x, y, 0.0],
            arr2: [x + numbers[i + 3], y, 0.0],
            arr3: [x + numbers[i + 3], y + numbers[i + 3], 0.0],
            color: colors[++colorsJ % 5]
        });

        data.push({
            class: "arc",
            arr0: [x, y + numbers[i + 3], 0.0],
            arr1: [x, y, 0.0],
            arr2: [x + numbers[i + 3], y + numbers[i + 3], 0.0],
            Rad: numbers[i + 3],
            rad: LINE_HEIGHT,
            color: ARC_COLOR
        });

        x = x + numbers[i + 3];
        y = y + numbers[i + 3];
    }
}

//Размерность пространства в примере (2d или 3d)
let dimention = "2d";

let x = -1, y = 0, n = 3;
let R = (x ** 2 + y ** 2) ** (1 / 2 / n);


function initPoints() {
    points = [];
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

    $(".figure").css({
        border: "1px solid black",
        "border-radius": "10px",
        padding: "15px",
        margin: "0 10px",
        "text-align": "left"
    });

    $("form[name=figure]").each(function (idx, form) {
        $(form)
            .find(".form-group")
            .each(function (idx, elem) {
                elem.style.display = "flex";
                elem.style.justifyContent = "space-between";
                elem.style.alignItems = "center";
            });
    });
}

function getParams() {
}

function initDescr() {
    $("#description").html(
        '<div class="header">Извлечение корня из комплексного числа</div>'
    );

    let parametershtml = `<div style="font-size: 16px">

<div class="figure" id="fig">
	Нужно найти все значения корня $$w_k = \\sqrt[n]{x+i\\cdot y},$$ $$k = 0, 1, 2, ..., n-1.$$
</div>

<div class="flex-align-items">
	<label for="x-input" >$x:$</label>
	<input type="text" id="x-input" value="${x}">
</div>

<div class="flex-align-items">
	<label for="y-input" >$y:$</label>
	<input type="text" id="y-input" value="${y}">
</div>

<div class="flex-align-items">
	<label for="n-input" >$n:$</label>
	<input type="text" id="n-input" value="${n}">
</div>
	`;

    $("#parameters").html(parametershtml);
    $(document.body).click(function (e) {
        x = +$("#x-input").val();
        y = +$("#y-input").val();
        n = +$("#n-input").val();
        R = (x ** 2 + y ** 2) ** (1 / 2 / n);
        initBuffers();
    });

    applyCssStyles();

    $("Title").html("Извлечение корня из комплексного числа");
}

let psiz = Math.PI / 4;

function initData() {
    const pointRad = 4, lineRad = 2;
    const pointColor = [1.0, 0.0, 0.0, 1.0];
    const figureColor = [0.0, 0.0, 1.0, 1.0];
    const arrowColor = [0.0, 1.0, 0.0, 1.0];

    let argz = 0;
    if (x > 0) argz = Math.atan(y / x);
    else if (x < 0 && y >= 0) argz = Math.atan(y / x) + Math.PI;
    else if (x < 0 && y < 0) argz = Math.atan(y / x) - Math.PI;
    else if (x = 0) {
        if (y > 0) argz = Math.PI / 2; else if (y < 0) argz = -Math.PI / 2;
    }

    primitives.push({
        class: "circle",
        pos: "rt",
        arr0: points[0].coord1,
        arr1: vec3.create([R, 0.0, 0.0]),
        arr2: vec3.create([0.0, R, 0.0]),
        Rad: R,
        rad: lineRad,
        color: figureColor
    });

    let w, phi;
    for (let i = 0; i < n; i++) {
        phi = (argz + 2 * i * Math.PI) / n;
        w = vec3.create([R * Math.cos(phi), R * Math.sin(phi), 0.0]);
        primitives.push({
            class: "point",
            text: katex.renderToString("w_" + i.toString()),
            pos: "rt",
            arr0: w,
            rad: pointRad,
            color: pointColor
        });
        primitives.push({
            class: "arrow",
            text: "",
            arr0: points[0].coord1,
            arr1: w,
            rad: lineRad,
            color: arrowColor
        });
    }
}

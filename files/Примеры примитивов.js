var dimention="2d";
function initPoints() {
    points = [];
    points.push({coord1: vec3.create([-4,3,0]), movable: "free"});

    points.push({coord1: vec3.create([0,3,0]), movable: "free"});

    points.push({coord1: vec3.create([4,3,0]), movable: "free"});
    points.push({coord1: vec3.create([5,3,0]), movable: "free"});

    points.push({coord1: vec3.create([-6-30,3+15,0]), movable: "free"});
    points.push({coord1: vec3.create([-6+30,3-15,0]), movable: "free"});

    points.push({coord1: vec3.create([-7,2,0]), movable: "free"});
    points.push({coord1: vec3.create([-5,1,0]), movable: "free"});

    points.push({coord1: vec3.create([-3,2,0]), movable: "free"});
    points.push({coord1: vec3.create([-1,1,0]), movable: "free"});

    points.push({coord1: vec3.create([1,2,0]), movable: "free"});
    points.push({coord1: vec3.create([3,1,0]), movable: "free"});

    points.push({coord1: vec3.create([5,2,0]), movable: "free"});
    points.push({coord1: vec3.create([7,1,0]), movable: "free"});

    points.push({coord1: vec3.create([-6,-2,0]), movable: "free"});
    points.push({coord1: vec3.create([-5,-2,0]), movable: "free"});
    points.push({coord1: vec3.create([-6,-1,0]), movable: "free"});

    points.push({coord1: vec3.create([-2,-2,0]), movable: "free"});
    points.push({coord1: vec3.create([-1,-2,0]), movable: "free"});
    points.push({coord1: vec3.create([-2,-1,0]), movable: "free"});

    points.push({coord1: vec3.create([2,-2,0]), movable: "free"});
    points.push({coord1: vec3.create([3,-2,0]), movable: "free"});
    points.push({coord1: vec3.create([2,-1,0]), movable: "free"});

    points.push({coord1: vec3.create([4,-3,0]), movable: "free"});
    points.push({coord1: vec3.create([6,-3,0]), movable: "free"});
    points.push({coord1: vec3.create([6,-1,0]), movable: "free"});
    points.push({coord1: vec3.create([4,-1,0]), movable: "free"});
}
function initDescr() {
    $("Title").html("Примеры");
}
function initData() {
    isShowAxes = false;
    var i = 0;
    //Просто текст.
    //Задаются только координаты расположения
    primitives.push({class:"text", text: "text", arr0:points[i].coord1});
    i+= 1;

    //Точка (сфера)
    //Задаются координаты центра, радиус в пикселях и цвет
    primitives.push({class:"point", text: "point", arr0:points[i].coord1, rad:3, color:[0.0, 0.0, 1.0, 1.0]});
    i+= 1;

    //Конус
    //Задаются координаты центра основания, координаты точки по направлению вершины, радиус в пикселях и цвет
    primitives.push({class:"cone", text: "", arr0:points[i].coord1, arr1:points[i+1].coord1, rad:3, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"text", text: "cone", arr0:points[i].coord1});
    primitives.push({class:"point", text: "", arr0:points[i].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i+1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    i+= 2;

    //Штрих. Длина не масштабируется. Используется как деления в осях координат.
    //Задаются координаты начала и конца, радиус в пикселях и цвет
    primitives.push({class:"dash", text: "dash", arr0:points[i].coord1, arr1:points[i+1].coord1, rad:3, color:[0.0, 0.0, 1.0, 1.0]});
    i+= 2;

    //Линия (цилиндр).
    //Задаются координаты начала и конца, радиус в пикселях и цвет
    primitives.push({class:"line", text: "line", arr0:points[i].coord1, arr1:points[i+1].coord1, rad:3, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i+1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    i+= 2;

    //Штрихованная линия.
    //Задаются координаты начала и конца, радиус в пикселях и цвет
    primitives.push({class:"dashline", text: "dashline", arr0:points[i].coord1, arr1:points[i+1].coord1, rad:3, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i+1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    i+= 2;

    //Стрелка.
    //Задаются координаты начала и конца, радиус в пикселях и цвет
    primitives.push({class:"arrow", text: "arrow", arr0:points[i].coord1, arr1:points[i+1].coord1, rad:3, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i+1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    i+= 2;

    //Двусторонняя стрелка.
    //Задаются координаты начала и конца, радиус в пикселях и цвет
    primitives.push({class:"darrow", text: "darrow", arr0:points[i].coord1, arr1:points[i+1].coord1, rad:3, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i+1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    i+= 2;

    //Дуга окружности (тора) с углом < 180.
    //Задаются координаты центра окружности, координаты двух точек по направлению на начало и конец дуги, радиус окружности (не в пикселях), малый радиус в пикселях и цвет
    primitives.push({class:"arc", text: "arc", arr0:points[i].coord1, arr1:points[i+1].coord1, arr2:points[i+2].coord1, Rad:1.5, rad:3, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i+1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i+2].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    i+= 3;

    //Дуга окружности (тора) с углом > 180.
    //Задаются координаты центра окружности, координаты двух точек по направлению на начало и конец дуги, радиус окружности (не в пикселях), малый радиус в пикселях и цвет
    primitives.push({class:"arcout", text: "arcout", arr0:points[i].coord1, arr1:points[i+1].coord1, arr2:points[i+2].coord1, Rad:1.5, rad:3, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i+1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i+2].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    i+= 3;

    //Окружность (тор).
    //Задаются координаты центра окружности, двух точек для задания плоскости расположения, радиус окружности (не в пикселях), малый радиус в пикселях и цвет
    primitives.push({class:"circle", text: "circle", arr0:points[i].coord1, arr1:points[i+1].coord1, arr2:points[i+2].coord1, Rad:1.5, rad:3, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i+1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i+2].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    i+= 3;

    //Плоскость.
    //Задаются координаты четырёх точек и цвет
    primitives.push({class:"plane", text: "plane", arr0:points[i].coord1, arr1:points[i+1].coord1, arr2:points[i+2].coord1, arr3:points[i+3].coord1, color:[0.0, 0.0, 1.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i+1].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i+2].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    primitives.push({class:"point", text: "", arr0:points[i+3].coord1, rad:4, color:[1.0, 0.0, 0.0, 1.0]});
    i+= 4;

    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]}); 
    }
}
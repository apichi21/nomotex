var dimention="3d";
function initPoints() {
    points = [];
    points.push({coord1: [0,0,0], movable: "free"});
}
function initDescr() {
    var descr = "";
    descr += '<h4>Винтовая линия</h4>';
    descr += '<p>Уравнение <i>винтовой линии</i> в параметрическом виде задаётся следующим образом \
              $$\\begin{aligned} x(t) &= a \\cos{t} \\\\ y(t) &= a \\sin{t}, \\\\ z(t) &= b t.  \\end{aligned}$$\
              где $a$ и $b$ - ненулевые вещественные числа</p>';
    var tIS = 5;
    descr += "<p>$a$ <input type='text' id='a' size='"+tIS+"'> $b$ <input type='text' id='b' size='"+tIS+"'><br>";
    descr += "$t\\in$ [<input type='text' id='t1' size='"+tIS+"'>, <input type='text' id='t2' size='"+tIS+"'>]</p>";
    descr += '<label><input type="checkbox" onchange="changeAnimate(this.checked);"> Анимация</label>';
    $("#description").html(descr);

    $("#a").change(function(event){
        a = parseFloat(this.value);
        initBuffers();
    });
    $("#b").change(function(event){
        b = parseFloat(this.value);
        initBuffers();
    });
    $("#t1").change(function(event){
        t1 = parseFloat(this.value);
        parameter = t1;
        initBuffers();
    });
    $("#t2").change(function(event){
        t2 = parseFloat(this.value);
        parameter = t1;
        initBuffers();
    });

    $("#a").val(parseFloat(a.toPrecision(3)));
    $("#b").val(parseFloat(b.toPrecision(3)));
    $("#t1").val(parseFloat(t1.toPrecision(3)));
    $("#t2").val(parseFloat(t2.toPrecision(3)));
    $("Title").html("Винтовая линия");
}
var isAnimate = false;
var paramTimer;
var animStep = 0.005;
function changeAnimate(anim) {
    isAnimate = anim;

    if (anim) {
        points[0].movable = "fixed";
        parameter = t1;
        paramTimer = setInterval(function () {
            var tInterval = t2-t1;
            if (tInterval >= 0) {
                if (parameter + animStep*tInterval < t2) {
                    parameter += animStep*tInterval;
                } else {
                    parameter = t1;
                }
            } else {
                if (parameter + animStep*tInterval > t2) {
                    parameter += animStep*tInterval;
                } else {
                    parameter = t1;
                }
            }
            initBuffers();
        }, 20);
    } else {
        points[0].movable = "free";
        clearInterval(paramTimer);
        initBuffers();
    }
}
var parameter = 1;
var a = 2;
var b = 0.4;
var t1= 0;
var t2= 12;
function initData() {
    if (arrPoint != 0) {
        primitives.push({class:"point", text: "", arr0:arrPoint, rad:5, color:[1.0, 0.0, 1.0, 1.0]});
    }
    primitives.push({class:"text", text: "O", arr0:[0,0,0]});
    primitives.push({class:"text", text: "x", arr0:[0,0,5]});
    primitives.push({class:"text", text: "y", arr0:[5,0,0]});
    primitives.push({class:"text", text: "z", arr0:[0,5,0]});
    var vertices = [];

    if (isAnimate) {
        var slicesT = Math.abs(Math.trunc((parameter-t1)*20))+1;
        for (var i = 0; i <= slicesT; i++) {
            var t = i/slicesT*(parameter-t1) + t1;
            var px = a*Math.sin(t);
            var py = b*t;
            var pz = a*Math.cos(t);
            vertices.push( [px, py, pz] );
        }
    } else {
        var slicesT = Math.abs(Math.trunc((t2-t1)*20))+1;
        for (var i = 0; i <= slicesT; i++) {
            var t = i/slicesT*(t2-t1) + t1;
            var px = a*Math.sin(t);
            var py = b*t;
            var pz = a*Math.cos(t);
            vertices.push( [px, py, pz] );
        }
    }

    var pointM = points[0].coord1;
    if (arrPoint == pointM) {
        var minLen;
        for (var i = 0; i < vertices.length; i++) {
            var vectorM0 = [];
            vec3.subtract(pointM, vertices[i], vectorM0);
            var len = vec3.length(vectorM0);
            if (minLen > len || (i==0)) {
                minLen = len;
                parameter = vertices[i][1]/b;
            }
        }
    }
    vec3.set([a*Math.sin(parameter),b*parameter,a*Math.cos(parameter)], pointM);

    primitives.push({class:"arrow", text: katex.renderToString("\\vec x"), arr0:[0,0,0], arr1:pointM, rad:2, color:[0,1,0,1]});

    primitives.push({class:"point", text: "M", arr0:pointM, rad:4, color:[1,0,0,1]});

    for (var i = 0; i < vertices.length-1; i++) {
        primitives.push({class:"line", text: "", arr0:vertices[i], arr1:vertices[i+1], rad:2, color:[0,0,1,1]});
    }
}
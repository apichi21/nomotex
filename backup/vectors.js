var gl;

function initGL(canvas) {
    gl = null;
    try {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    } catch (e) {}
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
        gl = null;
    }
}

function getShader(gl, id) {
    this._standardDerivatives = gl.getExtension('OES_standard_derivatives');
    this._elementIndexUint = gl.getExtension('OES_element_index_uint');
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

var shaderProgram;
var shaderProgram0;
var shaderProgram1;
var shaderProgram2;
var shaderProgramD0;
var shaderProgramD1;
var shaderProgramD2;
var shaderProgramC1;
var shaderProgramC2;
var shaderProgramMerge;
var shaderProgramMergeN;
function initShaders() {
    initShadersColor();
    initShadersTexture();
    initShadersColorLight();
    initShadersPeelDepth0();
    initShadersPeelDepth1();
    initShadersPeelDepth2();
    initShadersPeelColor1();
    initShadersPeelColor2();
    initShadersMerge();
    initShadersMergeN();
}
function initShadersColor() {
    var fragmentShader = getShader(gl, "shader-stripe-fs");
    var vertexShader = getShader(gl, "shader-stripe-vs");

    var newShaderProgram = gl.createProgram();
    gl.attachShader(newShaderProgram, vertexShader);
    gl.attachShader(newShaderProgram, fragmentShader);
    gl.linkProgram(newShaderProgram);

    if (!gl.getProgramParameter(newShaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(newShaderProgram);

    newShaderProgram.vertexPositionAttribute = gl.getAttribLocation(newShaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(newShaderProgram.vertexPositionAttribute);

    newShaderProgram.vertexColorAttribute = gl.getAttribLocation(newShaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(newShaderProgram.vertexColorAttribute);

    newShaderProgram.zoomVectorAttribute = gl.getAttribLocation(newShaderProgram, "aZoomVector");
    gl.enableVertexAttribArray(newShaderProgram.zoomVectorAttribute);

    newShaderProgram.LCoordAttribute = gl.getAttribLocation(newShaderProgram, "aLCoord");
    gl.enableVertexAttribArray(newShaderProgram.LCoordAttribute);

    newShaderProgram.pMatrixUniform = gl.getUniformLocation(newShaderProgram, "uPMatrix");
    newShaderProgram.mvMatrixUniform = gl.getUniformLocation(newShaderProgram, "uMVMatrix");
    newShaderProgram.zoomFactorUniform = gl.getUniformLocation(newShaderProgram, "uZoomFactor");
    newShaderProgram.uOffset = gl.getUniformLocation(newShaderProgram, "uOffset");

    gl.uniform1i(newShaderProgram.uOffset, false);

    newShaderProgram.bindBuffers = function(buffers) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexPosition);
        gl.vertexAttribPointer(this.vertexPositionAttribute, buffers.vertexPosition.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexColor);
        gl.vertexAttribPointer(this.vertexColorAttribute, buffers.vertexColor.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexZoomVector);
        gl.vertexAttribPointer(this.zoomVectorAttribute, buffers.vertexZoomVector.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexLCoord);
        gl.vertexAttribPointer(this.LCoordAttribute, buffers.vertexLCoord.itemSize, gl.FLOAT, false, 0, 0);
    }
    shaderProgram0=newShaderProgram;
}
function initShadersTexture() {
    var fragmentShader = getShader(gl, "shader-texture-fs");
    var vertexShader = getShader(gl, "shader-texture-vs");

    shaderProgram1 = gl.createProgram();
    gl.attachShader(shaderProgram1, vertexShader);
    gl.attachShader(shaderProgram1, fragmentShader);
    gl.linkProgram(shaderProgram1);

    if (!gl.getProgramParameter(shaderProgram1, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram1);

    shaderProgram1.vertexPositionAttribute = gl.getAttribLocation(shaderProgram1, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram1.vertexPositionAttribute);

    shaderProgram1.textureCoordAttribute = gl.getAttribLocation(shaderProgram1, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram1.textureCoordAttribute);

    shaderProgram1.pMatrixUniform = gl.getUniformLocation(shaderProgram1, "uPMatrix");
    shaderProgram1.mvMatrixUniform = gl.getUniformLocation(shaderProgram1, "uMVMatrix");
    shaderProgram1.samplerUniform = gl.getUniformLocation(shaderProgram1, "uSampler");
}
function initShadersColorLight() {
    var fragmentShader = getShader(gl, "shader-light-fs");
    var vertexShader = getShader(gl, "shader-light-vs");

    var newShaderProgram = gl.createProgram();
    gl.attachShader(newShaderProgram, vertexShader);
    gl.attachShader(newShaderProgram, fragmentShader);
    gl.linkProgram(newShaderProgram);

    if (!gl.getProgramParameter(newShaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(newShaderProgram);

    newShaderProgram.vertexPositionAttribute = gl.getAttribLocation(newShaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(newShaderProgram.vertexPositionAttribute);

    newShaderProgram.vertexNormalAttribute = gl.getAttribLocation(newShaderProgram, "aNormal");
    gl.enableVertexAttribArray(newShaderProgram.vertexNormalAttribute);

    newShaderProgram.pMatrixUniform = gl.getUniformLocation(newShaderProgram, "uPMatrix");
    newShaderProgram.mvMatrixUniform = gl.getUniformLocation(newShaderProgram, "uMVMatrix");
    newShaderProgram.uWorldInverseTranspose = gl.getUniformLocation(newShaderProgram, "uWorldInverseTranspose");
    newShaderProgram.uReverseLightDirection = gl.getUniformLocation(newShaderProgram, "uReverseLightDirection");
    newShaderProgram.uColor = gl.getUniformLocation(newShaderProgram, "uColor");
    newShaderProgram.bindBuffers = function(buffers) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexPosition);
        gl.vertexAttribPointer(this.vertexPositionAttribute, buffers.vertexPosition.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexNormal);
        gl.vertexAttribPointer(this.vertexNormalAttribute, buffers.vertexNormal.itemSize, gl.FLOAT, false, 0, 0);
    }
    shaderProgram2=newShaderProgram;
}

function initShadersPeelDepth0() {
    var fragmentShader = getShader(gl, "shader-light-peeldepth0-fs");
    var vertexShader = getShader(gl, "shader-light-peeldepth-vs");

    var newShaderProgram = gl.createProgram();
    gl.attachShader(newShaderProgram, vertexShader);
    gl.attachShader(newShaderProgram, fragmentShader);
    gl.linkProgram(newShaderProgram);

    if (!gl.getProgramParameter(newShaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(newShaderProgram);

    newShaderProgram.vertexPositionAttribute = gl.getAttribLocation(newShaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(newShaderProgram.vertexPositionAttribute);

    // newShaderProgram.vertexNormalAttribute = gl.getAttribLocation(newShaderProgram, "aNormal");
    // gl.enableVertexAttribArray(newShaderProgram.vertexNormalAttribute);

    newShaderProgram.pMatrixUniform = gl.getUniformLocation(newShaderProgram, "uPMatrix");
    newShaderProgram.mvMatrixUniform = gl.getUniformLocation(newShaderProgram, "uMVMatrix");
    // newShaderProgram.uWorldInverseTranspose = gl.getUniformLocation(newShaderProgram, "uWorldInverseTranspose");
    // newShaderProgram.uReverseLightDirection = gl.getUniformLocation(newShaderProgram, "uReverseLightDirection");
    // newShaderProgram.uColor = gl.getUniformLocation(newShaderProgram, "uColor");
    newShaderProgram.bindBuffers = function(buffers) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexPosition);
        gl.vertexAttribPointer(this.vertexPositionAttribute, buffers.vertexPosition.itemSize, gl.FLOAT, false, 0, 0);
        // gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexNormal);
        // gl.vertexAttribPointer(this.vertexNormalAttribute, buffers.vertexNormal.itemSize, gl.FLOAT, false, 0, 0);
    }
    shaderProgramD0=newShaderProgram;
}
function initShadersPeelDepth1() {
    var fragmentShader = getShader(gl, "shader-light-peeldepth1-fs");
    var vertexShader = getShader(gl, "shader-light-peeldepth-vs");

    var newShaderProgram = gl.createProgram();
    gl.attachShader(newShaderProgram, vertexShader);
    gl.attachShader(newShaderProgram, fragmentShader);
    gl.linkProgram(newShaderProgram);

    if (!gl.getProgramParameter(newShaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(newShaderProgram);

    newShaderProgram.vertexPositionAttribute = gl.getAttribLocation(newShaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(newShaderProgram.vertexPositionAttribute);

    // newShaderProgram.vertexNormalAttribute = gl.getAttribLocation(newShaderProgram, "aNormal");
    // gl.enableVertexAttribArray(newShaderProgram.vertexNormalAttribute);

    newShaderProgram.pMatrixUniform = gl.getUniformLocation(newShaderProgram, "uPMatrix");
    newShaderProgram.mvMatrixUniform = gl.getUniformLocation(newShaderProgram, "uMVMatrix");
    // newShaderProgram.uWorldInverseTranspose = gl.getUniformLocation(newShaderProgram, "uWorldInverseTranspose");
    // newShaderProgram.uReverseLightDirection = gl.getUniformLocation(newShaderProgram, "uReverseLightDirection");
    // newShaderProgram.uColor = gl.getUniformLocation(newShaderProgram, "uColor");
    newShaderProgram.canvas_size = gl.getUniformLocation(newShaderProgram, "canvas_size");
    newShaderProgram.D0 = gl.getUniformLocation(newShaderProgram, "D0");
    newShaderProgram.bindBuffers = function(buffers) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexPosition);
        gl.vertexAttribPointer(this.vertexPositionAttribute, buffers.vertexPosition.itemSize, gl.FLOAT, false, 0, 0);
        // gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexNormal);
        // gl.vertexAttribPointer(this.vertexNormalAttribute, buffers.vertexNormal.itemSize, gl.FLOAT, false, 0, 0);
    }
    shaderProgramD1=newShaderProgram;
}
function initShadersPeelDepth2() {
    var fragmentShader = getShader(gl, "shader-light-peeldepth2-fs");
    var vertexShader = getShader(gl, "shader-light-peeldepth-vs");

    var newShaderProgram = gl.createProgram();
    gl.attachShader(newShaderProgram, vertexShader);
    gl.attachShader(newShaderProgram, fragmentShader);
    gl.linkProgram(newShaderProgram);

    if (!gl.getProgramParameter(newShaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(newShaderProgram);

    newShaderProgram.vertexPositionAttribute = gl.getAttribLocation(newShaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(newShaderProgram.vertexPositionAttribute);

    // newShaderProgram.vertexNormalAttribute = gl.getAttribLocation(newShaderProgram, "aNormal");
    // gl.enableVertexAttribArray(newShaderProgram.vertexNormalAttribute);

    newShaderProgram.pMatrixUniform = gl.getUniformLocation(newShaderProgram, "uPMatrix");
    newShaderProgram.mvMatrixUniform = gl.getUniformLocation(newShaderProgram, "uMVMatrix");
    // newShaderProgram.uWorldInverseTranspose = gl.getUniformLocation(newShaderProgram, "uWorldInverseTranspose");
    // newShaderProgram.uReverseLightDirection = gl.getUniformLocation(newShaderProgram, "uReverseLightDirection");
    // newShaderProgram.uColor = gl.getUniformLocation(newShaderProgram, "uColor");
    newShaderProgram.canvas_size = gl.getUniformLocation(newShaderProgram, "canvas_size");
    newShaderProgram.D0 = gl.getUniformLocation(newShaderProgram, "D0");
    newShaderProgram.D1 = gl.getUniformLocation(newShaderProgram, "D1");
    newShaderProgram.bindBuffers = function(buffers) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexPosition);
        gl.vertexAttribPointer(this.vertexPositionAttribute, buffers.vertexPosition.itemSize, gl.FLOAT, false, 0, 0);
        // gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexNormal);
        // gl.vertexAttribPointer(this.vertexNormalAttribute, buffers.vertexNormal.itemSize, gl.FLOAT, false, 0, 0);
    }
    shaderProgramD2=newShaderProgram;
}
function initShadersPeelColor1() {
    var fragmentShader = getShader(gl, "shader-light-peelcolor1-fs");
    var vertexShader = getShader(gl, "shader-light-vs");

    var newShaderProgram = gl.createProgram();
    gl.attachShader(newShaderProgram, vertexShader);
    gl.attachShader(newShaderProgram, fragmentShader);
    gl.linkProgram(newShaderProgram);

    if (!gl.getProgramParameter(newShaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(newShaderProgram);

    newShaderProgram.vertexPositionAttribute = gl.getAttribLocation(newShaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(newShaderProgram.vertexPositionAttribute);

    newShaderProgram.vertexNormalAttribute = gl.getAttribLocation(newShaderProgram, "aNormal");
    gl.enableVertexAttribArray(newShaderProgram.vertexNormalAttribute);

    newShaderProgram.pMatrixUniform = gl.getUniformLocation(newShaderProgram, "uPMatrix");
    newShaderProgram.mvMatrixUniform = gl.getUniformLocation(newShaderProgram, "uMVMatrix");
    newShaderProgram.uWorldInverseTranspose = gl.getUniformLocation(newShaderProgram, "uWorldInverseTranspose");
    newShaderProgram.uReverseLightDirection = gl.getUniformLocation(newShaderProgram, "uReverseLightDirection");
    newShaderProgram.uColor = gl.getUniformLocation(newShaderProgram, "uColor");
    newShaderProgram.canvas_size = gl.getUniformLocation(newShaderProgram, "canvas_size");
    newShaderProgram.D0 = gl.getUniformLocation(newShaderProgram, "D0");
    newShaderProgram.bindBuffers = function(buffers) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexPosition);
        gl.vertexAttribPointer(this.vertexPositionAttribute, buffers.vertexPosition.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexNormal);
        gl.vertexAttribPointer(this.vertexNormalAttribute, buffers.vertexNormal.itemSize, gl.FLOAT, false, 0, 0);
    }
    shaderProgramC1=newShaderProgram;
}

function initShadersPeelColor2() {
    var fragmentShader = getShader(gl, "shader-light-peelcolor2-fs");
    var vertexShader = getShader(gl, "shader-light-vs");

    var newShaderProgram = gl.createProgram();
    gl.attachShader(newShaderProgram, vertexShader);
    gl.attachShader(newShaderProgram, fragmentShader);
    gl.linkProgram(newShaderProgram);

    if (!gl.getProgramParameter(newShaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(newShaderProgram);

    newShaderProgram.vertexPositionAttribute = gl.getAttribLocation(newShaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(newShaderProgram.vertexPositionAttribute);

    newShaderProgram.vertexNormalAttribute = gl.getAttribLocation(newShaderProgram, "aNormal");
    gl.enableVertexAttribArray(newShaderProgram.vertexNormalAttribute);

    newShaderProgram.pMatrixUniform = gl.getUniformLocation(newShaderProgram, "uPMatrix");
    newShaderProgram.mvMatrixUniform = gl.getUniformLocation(newShaderProgram, "uMVMatrix");
    newShaderProgram.uWorldInverseTranspose = gl.getUniformLocation(newShaderProgram, "uWorldInverseTranspose");
    newShaderProgram.uReverseLightDirection = gl.getUniformLocation(newShaderProgram, "uReverseLightDirection");
    newShaderProgram.uColor = gl.getUniformLocation(newShaderProgram, "uColor");
    newShaderProgram.canvas_size = gl.getUniformLocation(newShaderProgram, "canvas_size");
    newShaderProgram.D0 = gl.getUniformLocation(newShaderProgram, "D0");
    newShaderProgram.D1 = gl.getUniformLocation(newShaderProgram, "D1");
    newShaderProgram.bindBuffers = function(buffers) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexPosition);
        gl.vertexAttribPointer(this.vertexPositionAttribute, buffers.vertexPosition.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexNormal);
        gl.vertexAttribPointer(this.vertexNormalAttribute, buffers.vertexNormal.itemSize, gl.FLOAT, false, 0, 0);
    }
    shaderProgramC2=newShaderProgram;
}

function initShadersMerge() {
    var fragmentShader = getShader(gl, "shader-light-merge-fs");
    var vertexShader = getShader(gl, "shader-light-merge-vs");

    var newShaderProgram = gl.createProgram();
    gl.attachShader(newShaderProgram, vertexShader);
    gl.attachShader(newShaderProgram, fragmentShader);
    gl.linkProgram(newShaderProgram);

    if (!gl.getProgramParameter(newShaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(newShaderProgram);

    newShaderProgram.vertexPositionAttribute = gl.getAttribLocation(newShaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(newShaderProgram.vertexPositionAttribute);

    newShaderProgram.canvas_size = gl.getUniformLocation(newShaderProgram, "canvas_size");

    for (var i = 0; i <= peelLayersCount; i++) {
        newShaderProgram['C'+i] = gl.getUniformLocation(newShaderProgram, "C"+i);
    }

    newShaderProgram.bindBuffers = function(buffers) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexPosition);
        gl.vertexAttribPointer(this.vertexPositionAttribute, buffers.vertexPosition.itemSize, gl.FLOAT, false, 0, 0);
    }
    shaderProgramMerge=newShaderProgram;
}
function initShadersMergeN() {
    var fragmentShader = getShader(gl, "shader-light-mergeN-fs");
    var vertexShader = getShader(gl, "shader-light-mergeN-vs");

    var newShaderProgram = gl.createProgram();
    gl.attachShader(newShaderProgram, vertexShader);
    gl.attachShader(newShaderProgram, fragmentShader);
    gl.linkProgram(newShaderProgram);

    if (!gl.getProgramParameter(newShaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(newShaderProgram);

    newShaderProgram.vertexPositionAttribute = gl.getAttribLocation(newShaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(newShaderProgram.vertexPositionAttribute);

    newShaderProgram.canvas_size = gl.getUniformLocation(newShaderProgram, "canvas_size");

    newShaderProgram['C0'] = gl.getUniformLocation(newShaderProgram, "C0");

    newShaderProgram.bindBuffers = function(buffers) {
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexPosition);
        gl.vertexAttribPointer(this.vertexPositionAttribute, buffers.vertexPosition.itemSize, gl.FLOAT, false, 0, 0);
    }
    shaderProgramMergeN=newShaderProgram;
}

var mvMatrix = mat4.create();
var mvMatrixStack = [];
var pMatrix = mat4.create();

function mvPushMatrix() {
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
}

function mvPopMatrix() {
    if (mvMatrixStack.length == 0) {
        throw "Invalid popMatrix!";
    }
    mvMatrix = mvMatrixStack.pop();
}


function setMatrixUniforms() {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
}


function degToRad(degrees) {
    return degrees * Math.PI / 180;
}

var mouseDownOrTouchActive = false;
var lastMouseX = null;
var lastMouseY = null;
var lastMouseX2 = null;
var lastMouseY2 = null;
var touchId = null;
var touchId2 = null;

function handleMouseDown(event) {
    event.preventDefault();
    mouseDownOrTouchActive = true;
    lastMouseX = event.pageX - canvas.offsetLeft;
    lastMouseY = event.pageY - canvas.offsetTop;
    processClick();

}
function handleTouchStart(event) {
  event.preventDefault();
  var touches = event.targetTouches;

  if (touches.length == 1 && !mouseDownOrTouchActive ) {
    touchId = touches[0].identifier;
    lastMouseX = touches[0].pageX - canvas.offsetLeft,
    lastMouseY = touches[0].pageY - canvas.offsetTop;
    checkToSelect();
    processClick();
  }
  else if ( !mouseDownOrTouchActive ) {
    touchId = touches[0].identifier;
    lastMouseX = touches[0].pageX - canvas.offsetLeft,
    lastMouseY = touches[0].pageY - canvas.offsetTop;
    touchId2 = touches[1].identifier;
    lastMouseX2 = touches[1].pageX - canvas.offsetLeft,
    lastMouseY2 = touches[1].pageY - canvas.offsetTop;
  }
}
function project(objectCoordinate, modelview, projection, viewport, windowCoordinate) {
    var proj1 = [objectCoordinate[0],objectCoordinate[1],objectCoordinate[2],1.0];
    mat4.multiplyVec4(modelview, proj1);
    mat4.multiplyVec4(projection, proj1);
    proj1[3] = 1.0 / proj1[3];
    proj1[0] *= proj1[3];
    proj1[1] *= proj1[3];
    proj1[2] *= proj1[3];
    windowCoordinate[0]=(0.5+proj1[0]*0.5)*viewport[2]+viewport[0];
    windowCoordinate[1]=(0.5-proj1[1]*0.5)*viewport[3]+viewport[1];
    windowCoordinate[2]=(1.0+proj1[2])*0.5; //Between 0 and 1
}
function unProject(windowCoordinate, modelview, projection, viewport, objectCoordinate) {
    var proj1 = [(windowCoordinate[0]+1-viewport[0])/viewport[2]*2.0-1.0,
                 -(windowCoordinate[1]-viewport[1])/viewport[3]*2.0+1.0,
                 2.0*windowCoordinate[2]-1.0,
                 1.0];
    var pmvMatrixInv = mat4.create();
    mat4.multiply(projection, modelview, pmvMatrixInv);
    mat4.inverse(pmvMatrixInv);
    mat4.multiplyVec4(pmvMatrixInv, proj1);
    proj1[3] = 1.0 / proj1[3];
    objectCoordinate[0] = proj1[0]*proj1[3];
    objectCoordinate[1] = proj1[1]*proj1[3];
    objectCoordinate[2] = proj1[2]*proj1[3];
}
function unProjectSimp(windowCoordinate, InvercedMVPMatrix, viewport, objectCoordinate) {
    var proj1 = [(windowCoordinate[0]-viewport[0])/viewport[2]*2.0-1.0,
                 -(windowCoordinate[1]-viewport[1])/viewport[3]*2.0+1.0,
                 2.0*windowCoordinate[2]-1.0,
                 1.0];
    mat4.multiplyVec4(InvercedMVPMatrix, proj1);
    proj1[3] = 1.0 / proj1[3];
    objectCoordinate[0] = proj1[0]*proj1[3];
    objectCoordinate[1] = proj1[1]*proj1[3];
    objectCoordinate[2] = proj1[2]*proj1[3];
}
// var vecX = [0.01,0.0,0.0]; // вектор смещения на 1 пиклель по экранной оси X
// var vecY = [0.0,-0.01,0.0]; // вектор смещения на 1 пиклель по экранной оси Y
function mouseXPlane(outPoint) {
    function lineXPlane(outPoint,pp,pnorm,lp,lvec) {
        var a = [];
        vec3.subtract(pp,lp,a);
        var Nv = vec3.dot(pnorm,lvec);
        var t;
        if (Nv != 0) t = vec3.dot(pnorm,a)/Nv;
        else t = 0;
        vec3.scale(lvec,t,outPoint);
        vec3.add(outPoint,lp);
    }
    function lineXLine(outPoint,pp,pvec,lp,lvec) {
        var norm = [];
        vec3.cross(lvec,pvec,norm);
        vec3.normalize(norm);
        var a = [];
        vec3.subtract(pp,lp,a);
        var d = [];
        vec3.scale(norm,vec3.dot(norm,a),d);

        var det = -lvec[1]*pvec[2]+lvec[2]*pvec[1];
        var det1, coord = [1,2];
        det1 = -lvec[0]*pvec[2]+lvec[2]*pvec[0];
        if (Math.abs(det)<Math.abs(det1)) {det = det1; coord = [0,2];}
        det1 = -lvec[0]*pvec[1]+lvec[1]*pvec[0];
        if (Math.abs(det)<Math.abs(det1)) {det = det1; coord = [0,1];}

        var d1 = pp[coord[0]]-d[coord[0]]-lp[coord[0]];
        var d2 = pp[coord[1]]-d[coord[1]]-lp[coord[1]];

        var s = (d2*lvec[coord[0]]-d1*lvec[coord[1]])/det;
        vec3.scale(pvec,s,outPoint);
        vec3.add(outPoint,pp);
    }
    var pmvMatrixInv = mat4.create();
    mat4.multiply(pMatrix, mvMatrix, pmvMatrixInv);
    mat4.inverse(pmvMatrixInv);
    var nearMouse = [],farMouse = [];
    var viewport = gl.getParameter(gl.VIEWPORT);
    unProjectSimp([lastMouseX,lastMouseY,0], pmvMatrixInv, viewport, nearMouse);
    unProjectSimp([lastMouseX,lastMouseY,1], pmvMatrixInv, viewport, farMouse);
    var mouseRay = vec3.create();
    vec3.subtract(farMouse,nearMouse,mouseRay);
    vec3.normalize(mouseRay);

    var normOrVec;
    if (points[minDistArrow].movable=="plane") {
        normOrVec = points[minDistArrow].vector;
        lineXPlane(outPoint,points[minDistArrow].coord1,normOrVec,nearMouse,mouseRay);
    } else if (points[minDistArrow].movable=="line") {
        normOrVec = points[minDistArrow].vector;
        lineXLine(outPoint,points[minDistArrow].coord1,normOrVec,nearMouse,mouseRay);
    } else { // Ограничения не заданы. Перемещение параллельно плоскости экрана
        normOrVec = [];
        var cnear=[], cfar=[], cray=[];
        unProjectSimp([viewport[2]/2,viewport[3]/2,0], pmvMatrixInv, viewport, cnear);
        unProjectSimp([viewport[2]/2,viewport[3]/2,1], pmvMatrixInv, viewport, cfar);
        vec3.subtract(cfar,cnear,cray);
        vec3.set(cray, normOrVec);
        lineXPlane(outPoint,points[minDistArrow].coord1,normOrVec,nearMouse,mouseRay);
    }
}
var point0 = [];
var lastMinDistArrow = -1;
function processClick() {
    if (minDistArrow!=-1) {
        mouseXPlane(point0);
        vec3.set(points[minDistArrow].coord1, arrPoint0);
    }
}
function handleMouseUpOrTouchEnd(event) {
    event.preventDefault();
    mouseDownOrTouchActive = false;
    checkToSelect();
}
var rotAngY = 0;
var rotAngX = 0;
var scaleFactor = 0.35;
var dispX = 0;
var dispY = 0;
function checkToSelect() {
    var dist = 0.0;
    var viewport = gl.getParameter(gl.VIEWPORT);

    var proj = [];
    minDistArrow = -1;
    points.some(function (iPoint, i, array) {
        if (iPoint.movable == "fixed") return false;

        project(iPoint.coord1, mvMatrix, pMatrix, viewport, proj);

        dist = Math.sqrt((proj[0]-lastMouseX)*(proj[0]-lastMouseX)+(proj[1]-lastMouseY)*(proj[1]-lastMouseY));
        if (dist <= 20.0) {
            minDistArrow = i;
            return true;
        }
        return false;
    });
    // var Arr;
    // for (var i=0; i < points.length; i++){
    //     if (points[i].movable == "fixed") continue;
    //     Arr=points[i].coord1;

    //     project(Arr, mvMatrix, pMatrix, viewport, proj);

    //     dist = Math.sqrt((proj[0]-lastMouseX)*(proj[0]-lastMouseX)+(proj[1]-lastMouseY)*(proj[1]-lastMouseY));
    //     if (dist <= 20.0) {
    //         minDistArrow = i;
    //         break;
    //     }
    // }

    if (minDistArrow!=-1) {
        if (minDistArrow!=lastMinDistArrow) {
            arrPoint = points[minDistArrow].coord1;
            initBuffers();
            lastMinDistArrow = minDistArrow;
        }
    }
    else if (arrPoint != 0) {
        arrPoint = 0;
        initBuffers();
        lastMinDistArrow = -1;
    }
}
function handleMouseMove(event) {
    event.preventDefault();
    if (!mouseDownOrTouchActive) {
        lastMouseX = event.pageX - canvas.offsetLeft;
        lastMouseY = event.pageY - canvas.offsetTop;
        checkToSelect();
    }
    var newX = event.pageX - canvas.offsetLeft;
    var newY = event.pageY - canvas.offsetTop;
    // console.log(event.button,event.buttons,event.which);
    if(event.buttons === 1){
        if(is2d) {
            processDrag(newX-lastMouseX, newY-lastMouseY);
        } else {
            if(minDistArrow!=-1) processDrag(newX-lastMouseX, newY-lastMouseY);
            else processRotate(newX-lastMouseX, newY-lastMouseY);
        }
    }
    if(event.buttons === 4){
        if(!is2d) processDrag(newX-lastMouseX, newY-lastMouseY);
    }
    lastMouseX = newX;
    lastMouseY = newY;

    // processDrag(newX, newY);
}
function handleTouchMove(evt) {
  evt.preventDefault();
  var touches = evt.targetTouches;

    if (touches.length == 1 && touchId == touches[0].identifier) {
        var newX = touches[0].pageX - canvas.offsetLeft;
        var newY = touches[0].pageY - canvas.offsetTop;
        if(is2d) {
            processDrag(newX-lastMouseX, newY-lastMouseY);
        } else {
            if(minDistArrow!=-1) processDrag(newX-lastMouseX, newY-lastMouseY);
            else processRotate(newX-lastMouseX, newY-lastMouseY);
        }
        lastMouseX = newX;
        lastMouseY = newY;
    } else if (touchId == touches[0].identifier && touchId2 == touches[1].identifier) {
        var newX = touches[0].pageX - canvas.offsetLeft;
        var newY = touches[0].pageY - canvas.offsetTop;
        var newX2 = touches[1].pageX - canvas.offsetLeft;
        var newY2 = touches[1].pageY - canvas.offsetTop;

        // var delta = (Math.abs(newX-newX2) - Math.abs(lastMouseX-lastMouseX2))*0.01;
        var delta0 =  Math.sqrt((lastMouseX-lastMouseX2)*(lastMouseX-lastMouseX2)+(lastMouseY-lastMouseY2)*(lastMouseY-lastMouseY2))*0.01;
        var delta1 =  Math.sqrt((newX-newX2)*(newX-newX2)+(newY-newY2)*(newY-newY2))*0.01;
        var delta = delta1-delta0;

        var deltaX = (newX+newX2)/2-(lastMouseX+lastMouseX2)/2;
        var deltaY = (newY+newY2)/2-(lastMouseY+lastMouseY2)/2;

        lastMouseX = newX;
        lastMouseY = newY;
        lastMouseX2 = newX2;
        lastMouseY2 = newY2;

        handleScroll(delta);
        processDrag(deltaX, deltaY);
    }
}
var minDistArrow=-1;
function processDrag(deltaX, deltaY) {
    if (minDistArrow != -1) {
        var point1 = [];
        mouseXPlane(point1);
        var deltaVec = vec3.create();
        vec3.subtract(point1,point0,deltaVec);
        vec3.add(arrPoint0,deltaVec,points[minDistArrow].coord1);
        initBuffers();
    } else {
        dispX += deltaX*0.01/scaleFactor;
        dispY -= deltaY*0.01/scaleFactor;
    }
}
function processRotate(deltaX, deltaY) {
    if (scaleFactor>1) {
        rotAngY += deltaX*0.5/scaleFactor;
        rotAngX += deltaY*0.5/scaleFactor;
    }
    else {
        rotAngY += deltaX*0.5;
        rotAngX += deltaY*0.5;
    }
}
function handleMouseWheel(event){
    var delta = 0;
    if (!event) /* For IE. */
        event = window.event;
    if (event.wheelDelta) { /* IE/Opera. */
        delta = event.wheelDelta/120;
    } else if (event.detail) { /** Mozilla case. */
    /** In Mozilla, sign of delta is different than in IE.
    * Also, delta is multiple of 3.
    */
        delta = -event.detail/3;
    }
    /** If delta is nonzero, handle it.
    * Basically, delta is now positive if wheel was scrolled up,
    * and negative, if wheel was scrolled down.
    */
    if (delta)
        handleScroll(delta);
    /** Prevent default actions caused by mouse wheel.
    * That might be ugly, but we handle scrolls somehow
    * anyway, so don’t bother here..
    */
    if (event.preventDefault)
        event.preventDefault();
    event.returnValue = false;
}

function handleScroll(delta) {
    var scalestep = 0.5;
    if (delta > 0)
    {
        scaleFactor *= 1 + Math.abs(delta) * scalestep/3.;
    }
    else if (delta < 0)
    {
        scaleFactor /= 1 + Math.abs(delta) * scalestep/3.;
    }
}
var arrowBuffers = {};
var arrowBuffersTransluent = {};
var arrowOffsetBuffers = {};
var gridBuffers = {};
var axesBuffers = {};
var meshBuffers = [];

var isMaintainArrowRadius = true;

var slices = 8;
var points = [];
var lines = [];
var planes;

var arrPoint = 0;
var arrPoint0 = [];
var textLabels;

var objX0Y0;
var objWH;
function unProjectWindowRect() {
    var winX0Y0 = [0,0,0];
    var winWH = [gl.drawingBufferWidth,gl.drawingBufferHeight,0];
    objX0Y0 = [];
    objWH = [];

    var viewport = [0,0,gl.drawingBufferWidth,gl.drawingBufferHeight];
    var pmvMatrixInv = mat4.create();
    mat4.multiply(pMatrix, mvMatrix, pmvMatrixInv);
    mat4.inverse(pmvMatrixInv);

    unProjectSimp(winX0Y0, pmvMatrixInv, viewport, objX0Y0);
    unProjectSimp(winWH, pmvMatrixInv, viewport, objWH);
}
var gridStep = 10;

function initAddAxes() {
    var vertices = [];
    var colors = [];
    var indices = [];
    var zoomvectors = [];
    var LCoords = [];

    var xLeft = -4;
    var xRight = 4;
    var xCount = xRight-xLeft+1;

    var yDown = -4;
    var yUp = 4;
    var yCount = yUp-yDown+1;

    var zFar = -4;
    var zNear = 4;
    var zCount = zNear-zFar+1;

    var indiceBase = 0;
    var mass = [];
    // var pixelSize = (objWH[0]-objX0Y0[0])/gl.drawingBufferWidth;

    var rad=1;
    mass=initArrow([xLeft,0,0], [xCount-1+xLeft+1,0,0], rad, [0.3, 0.3, 0.3, 1.0],indiceBase,false,true);
    Array.prototype.push.apply(vertices, mass[0]);
    Array.prototype.push.apply(colors, mass[1]);
    Array.prototype.push.apply(indices, mass[2]);
    Array.prototype.push.apply(zoomvectors, mass[3]);
    Array.prototype.push.apply(LCoords, mass[4]);
    indiceBase += mass[0].length/3;


    mass=initArrow([0,yDown,0], [0,(yCount-1+yDown+1),0], rad, [0.3, 0.3, 0.3, 1.0],indiceBase,false,true);
    Array.prototype.push.apply(vertices, mass[0]);
    Array.prototype.push.apply(colors, mass[1]);
    Array.prototype.push.apply(indices, mass[2]);
    Array.prototype.push.apply(zoomvectors, mass[3]);
    Array.prototype.push.apply(LCoords, mass[4]);
    indiceBase += mass[0].length/3;

    mass=initArrow([0,0,zFar], [0,0,(zCount-1+zFar+1)], rad, [0.3, 0.3, 0.3, 1.0],indiceBase,false,true);
    Array.prototype.push.apply(vertices, mass[0]);
    Array.prototype.push.apply(colors, mass[1]);
    Array.prototype.push.apply(indices, mass[2]);
    Array.prototype.push.apply(zoomvectors, mass[3]);
    Array.prototype.push.apply(LCoords, mass[4]);
    indiceBase += mass[0].length/3;

    var len = 5;
    for (var i = 0; i < xCount; i++) {
        mass=initDash([(i+xLeft),-len,0], [(i+xLeft),len,0], rad, [0.3, 0.3, 0.3, 1.0],indiceBase);
        Array.prototype.push.apply(vertices, mass[0]);
        Array.prototype.push.apply(colors, mass[1]);
        Array.prototype.push.apply(indices, mass[2]);
        Array.prototype.push.apply(zoomvectors, mass[3]);
        Array.prototype.push.apply(LCoords, mass[4]);
        indiceBase += mass[0].length/3;
    }
    for (var i = 0; i < yCount; i++) {
        mass=initDash([-len,(i+yDown),0], [len,(i+yDown),0], rad, [0.3, 0.3, 0.3, 1.0],indiceBase);
        Array.prototype.push.apply(vertices, mass[0]);
        Array.prototype.push.apply(colors, mass[1]);
        Array.prototype.push.apply(indices, mass[2]);
        Array.prototype.push.apply(zoomvectors, mass[3]);
        Array.prototype.push.apply(LCoords, mass[4]);
        indiceBase += mass[0].length/3;
    }
    for (var i = 0; i < zCount; i++) {
        mass=initDash([-len,0,(i+zFar)], [len,0,(i+zFar)], rad, [0.3, 0.3, 0.3, 1.0],indiceBase);
        Array.prototype.push.apply(vertices, mass[0]);
        Array.prototype.push.apply(colors, mass[1]);
        Array.prototype.push.apply(indices, mass[2]);
        Array.prototype.push.apply(zoomvectors, mass[3]);
        Array.prototype.push.apply(LCoords, mass[4]);
        indiceBase += mass[0].length/3;
    }
}
var axisLen = 5;
var axisDashStep = 1;
function initAxes() {
    var vertices = [];
    var colors = [];
    var indices = [];
    var zoomvectors = [];
    var LCoords = [];
    if(is2d) {
        var xLeft = Math.ceil(objX0Y0[0]/gridStep);
        var xRight = Math.floor(objWH[0]/gridStep);
        var xCount = xRight-xLeft+1;

        var yDown = Math.ceil(objWH[1]/gridStep);
        var yUp = Math.floor(objX0Y0[1]/gridStep);
        var yCount = yUp-yDown+1;

        var indiceBase = 0;
        var mass = [];

        var rad=1;
        mass=initArrow([objX0Y0[0],0,0], [objWH[0],0,0], rad, [0.3, 0.3, 0.3, 1.0],indiceBase,false,true);
        Array.prototype.push.apply(vertices, mass[0]);
        Array.prototype.push.apply(colors, mass[1]);
        Array.prototype.push.apply(indices, mass[2]);
        Array.prototype.push.apply(zoomvectors, mass[3]);
        Array.prototype.push.apply(LCoords, mass[4]);
        indiceBase += mass[0].length/3;

        mass=initArrow([0,objWH[1],0], [0,objX0Y0[1],0], rad, [0.3, 0.3, 0.3, 1.0],indiceBase,false,true);
        Array.prototype.push.apply(vertices, mass[0]);
        Array.prototype.push.apply(colors, mass[1]);
        Array.prototype.push.apply(indices, mass[2]);
        Array.prototype.push.apply(zoomvectors, mass[3]);
        Array.prototype.push.apply(LCoords, mass[4]);
        indiceBase += mass[0].length/3;

        if (isShowAxes) {
            vec3.set([objWH[0],0,0], textLabels[0].objCoords);
            textLabels[0].text.html("x");
            textLabels[0].align = "rb";
            vec3.set([0,objX0Y0[1],0], textLabels[1].objCoords);
            textLabels[1].text.html("y");
            textLabels[1].align = "lt";
        }

        var len = 5;
        for (var i = 0; i < xCount; i++) {
            mass=initDash([(i+xLeft)*gridStep,-len,0], [(i+xLeft)*gridStep,len,0], rad, [0.3, 0.3, 0.3, 1.0],indiceBase);
            Array.prototype.push.apply(vertices, mass[0]);
            Array.prototype.push.apply(colors, mass[1]);
            Array.prototype.push.apply(indices, mass[2]);
            Array.prototype.push.apply(zoomvectors, mass[3]);
            Array.prototype.push.apply(LCoords, mass[4]);
            indiceBase += mass[0].length/3;
        }
        for (var i = 0; i < yCount; i++) {
            mass=initDash([-len,(i+yDown)*gridStep,0], [len,(i+yDown)*gridStep,0], rad, [0.3, 0.3, 0.3, 1.0],indiceBase);
            Array.prototype.push.apply(vertices, mass[0]);
            Array.prototype.push.apply(colors, mass[1]);
            Array.prototype.push.apply(indices, mass[2]);
            Array.prototype.push.apply(zoomvectors, mass[3]);
            Array.prototype.push.apply(LCoords, mass[4]);
            indiceBase += mass[0].length/3;
        }
    } else {
        var xLeft = -axisLen;
        var xRight = axisLen;
        var xCount = (xRight-xLeft)/axisDashStep-1;

        var yDown = -axisLen;
        var yUp = axisLen;
        var yCount = (yUp-yDown)/axisDashStep-1;

        var zFar = -axisLen;
        var zNear = axisLen;
        var zCount = (zNear-zFar)/axisDashStep-1;

        var indiceBase = 0;
        var mass = [];
        // var pixelSize = (objWH[0]-objX0Y0[0])/gl.drawingBufferWidth;

        var rad=1;
        mass=initArrow([xLeft,0,0], [xRight,0,0], rad, [0.3, 0.3, 0.3, 1.0],indiceBase,false,true);
        Array.prototype.push.apply(vertices, mass[0]);
        Array.prototype.push.apply(colors, mass[1]);
        Array.prototype.push.apply(indices, mass[2]);
        Array.prototype.push.apply(zoomvectors, mass[3]);
        Array.prototype.push.apply(LCoords, mass[4]);
        indiceBase += mass[0].length/3;

        mass=initArrow([0,yDown,0], [0,yUp,0], rad, [0.3, 0.3, 0.3, 1.0],indiceBase,false,true);
        Array.prototype.push.apply(vertices, mass[0]);
        Array.prototype.push.apply(colors, mass[1]);
        Array.prototype.push.apply(indices, mass[2]);
        Array.prototype.push.apply(zoomvectors, mass[3]);
        Array.prototype.push.apply(LCoords, mass[4]);
        indiceBase += mass[0].length/3;

        mass=initArrow([0,0,zFar], [0,0,zNear], rad, [0.3, 0.3, 0.3, 1.0],indiceBase,false,true);
        Array.prototype.push.apply(vertices, mass[0]);
        Array.prototype.push.apply(colors, mass[1]);
        Array.prototype.push.apply(indices, mass[2]);
        Array.prototype.push.apply(zoomvectors, mass[3]);
        Array.prototype.push.apply(LCoords, mass[4]);
        indiceBase += mass[0].length/3;

        var len = 5;
        for (var i = 0; i < xCount; i++) {
            mass=initDash([(i*axisDashStep+xLeft+axisDashStep),-len,0], [(i*axisDashStep+xLeft+axisDashStep),len,0], rad, [0.3, 0.3, 0.3, 1.0],indiceBase);
            Array.prototype.push.apply(vertices, mass[0]);
            Array.prototype.push.apply(colors, mass[1]);
            Array.prototype.push.apply(indices, mass[2]);
            Array.prototype.push.apply(zoomvectors, mass[3]);
            Array.prototype.push.apply(LCoords, mass[4]);
            indiceBase += mass[0].length/3;
        }
        for (var i = 0; i < yCount; i++) {
            mass=initDash([-len,(i*axisDashStep+yDown+axisDashStep),0], [len,(i*axisDashStep+yDown+axisDashStep),0], rad, [0.3, 0.3, 0.3, 1.0],indiceBase);
            Array.prototype.push.apply(vertices, mass[0]);
            Array.prototype.push.apply(colors, mass[1]);
            Array.prototype.push.apply(indices, mass[2]);
            Array.prototype.push.apply(zoomvectors, mass[3]);
            Array.prototype.push.apply(LCoords, mass[4]);
            indiceBase += mass[0].length/3;
        }
        for (var i = 0; i < zCount; i++) {
            mass=initDash([-len,0,(i*axisDashStep+zFar+axisDashStep)], [len,0,(i*axisDashStep+zFar+axisDashStep)], rad, [0.3, 0.3, 0.3, 1.0],indiceBase);
            Array.prototype.push.apply(vertices, mass[0]);
            Array.prototype.push.apply(colors, mass[1]);
            Array.prototype.push.apply(indices, mass[2]);
            Array.prototype.push.apply(zoomvectors, mass[3]);
            Array.prototype.push.apply(LCoords, mass[4]);
            indiceBase += mass[0].length/3;
        }
    }
    axesBuffers.vertexPosition = gl.createBuffer();
    axesBuffers.vertexColor = gl.createBuffer();
    axesBuffers.vertexIndex = gl.createBuffer();
    axesBuffers.vertexZoomVector = gl.createBuffer();
    axesBuffers.vertexLCoord = gl.createBuffer();
    axesBuffers.vertexPosition.itemSize = 3;
    axesBuffers.vertexColor.itemSize = 4;
    axesBuffers.vertexIndex.itemSize = 1;
    axesBuffers.vertexZoomVector.itemSize = 3;
    axesBuffers.vertexLCoord.itemSize = 1;
    gl.bindBuffer(gl.ARRAY_BUFFER, axesBuffers.vertexPosition);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, axesBuffers.vertexColor);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, axesBuffers.vertexIndex);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, axesBuffers.vertexZoomVector);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(zoomvectors), gl.STATIC_DRAW);

    gl.bindBuffer(gl.ARRAY_BUFFER, axesBuffers.vertexLCoord);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(LCoords), gl.STATIC_DRAW);
    axesBuffers.vertexIndex.numItems = indices.length;
}
function initGrid() {
    var xLeft = Math.ceil(objX0Y0[0]/gridStep);
    var xRight = Math.floor(objWH[0]/gridStep);
    var xCount = xRight-xLeft+1;

    var yDown = Math.ceil(objWH[1]/gridStep);
    var yUp = Math.floor(objX0Y0[1]/gridStep);
    var yCount = yUp-yDown+1;

    var vertices = [];
    var colors = [];
    var zoomvectors = [];
    var LCoords = [];
    for (var i = 0; i < xCount; i++) {
        vertices.push((i+xLeft)*gridStep,objX0Y0[1], 0, (i+xLeft)*gridStep,objWH[1],0);
        colors.push(0.7,0.7,1,1,0.7,0.7,1,1);
        zoomvectors.push(0,0,0, 0,0,0);
        LCoords.push(0,0);
    }
    for (var i = 0; i < yCount; i++) {
        vertices.push(objX0Y0[0],(i+yDown)*gridStep,0, objWH[0],(i+yDown)*gridStep,0);
        colors.push(0.7,0.7,1,1,0.7,0.7,1,1);
        zoomvectors.push(0,0,0, 0,0,0);
        LCoords.push(0,0);
    }


    gridBuffers.vertexPosition = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, gridBuffers.vertexPosition);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gridBuffers.vertexPosition.itemSize = 3;
    gridBuffers.vertexPosition.numItems = vertices.length/3;

    gridBuffers.vertexColor = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, gridBuffers.vertexColor);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    gridBuffers.vertexColor.itemSize = 4;
    gridBuffers.vertexColor.numItems = colors.length/4;

    gridBuffers.vertexZoomVector = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, gridBuffers.vertexZoomVector);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(zoomvectors), gl.STATIC_DRAW);
    gridBuffers.vertexZoomVector.itemSize = 3;
    gridBuffers.vertexZoomVector.numItems = vertices.length/3;

    gridBuffers.vertexLCoord = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, gridBuffers.vertexLCoord);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(LCoords), gl.STATIC_DRAW);
    gridBuffers.vertexLCoord.itemSize = 1;
    gridBuffers.vertexLCoord.numItems = vertices.length/3;
}
var primitives = [];
var meshes = [];

var bufdatatransluent = {vertices: [], colors: [], indices: [], zoomvectors: [], LCoords: [], indiceBase: 0};
function initArrowBuffers() {
    // var indiceBase = 0;
    // var vertices = [];
    // var colors = [];
    // var indices = [];
    // var zoomvectors = [];
    var bufdata = {vertices: [], colors: [], indices: [], zoomvectors: [], LCoords: [], indiceBase: 0};
    var bufdataoffset = {vertices: [], colors: [], indices: [], zoomvectors: [], LCoords: [], indiceBase: 0};
    bufdatatransluent = {vertices: [], colors: [], indices: [], zoomvectors: [], LCoords: [], indiceBase: 0};
    var bufarray;
    var mass = [];
    for (var i = 0; i < primitives.length; i++) {
        if (!primitives[i].offset) {
            // if (primitives[i].color)
            // {
            //     if (primitives[i].color[3] == 1) {
            //         bufarray = bufdata;
            //     } else {
            //         bufarray = bufdatatransluent;
            //     }
            // } else {
                bufarray = bufdata;
            // }
        } else {
            bufarray = bufdataoffset;
        }

        if (primitives[i].class==="arrow") {
            mass=initArrow(primitives[i].arr0, primitives[i].arr1, primitives[i].rad, primitives[i].color, bufarray.indiceBase,false,true);
        } else if (primitives[i].class==="darrow") {
            mass=initArrow(primitives[i].arr0, primitives[i].arr1, primitives[i].rad, primitives[i].color, bufarray.indiceBase,true,true);
        } else if (primitives[i].class==="line") {
            mass=initArrow(primitives[i].arr0, primitives[i].arr1, primitives[i].rad, primitives[i].color, bufarray.indiceBase,false,false);
        } else if (primitives[i].class==="dashline") {
            mass=initDashedLine(primitives[i].arr0, primitives[i].arr1, primitives[i].rad, primitives[i].color, bufarray.indiceBase);
        } else if (primitives[i].class==="dash") {
            mass=initDash(primitives[i].arr0, primitives[i].arr1, primitives[i].rad, primitives[i].color, bufarray.indiceBase);
        } else if (primitives[i].class==="point") {
            mass=initSphere(primitives[i].arr0, primitives[i].rad, primitives[i].color, bufarray.indiceBase);
        } else if (primitives[i].class==="arc") {
            mass=initTorusArc(primitives[i].arr0, primitives[i].arr1, primitives[i].arr2, primitives[i].Rad, primitives[i].rad, primitives[i].color, bufarray.indiceBase);
        } else if (primitives[i].class==="arcout") {
            mass=initTorusOuterArc(primitives[i].arr0, primitives[i].arr1, primitives[i].arr2, primitives[i].Rad, primitives[i].rad, primitives[i].color, bufarray.indiceBase);
        } else if (primitives[i].class==="circle") {
            mass=initTorus(primitives[i].arr0, primitives[i].arr1, primitives[i].arr2, primitives[i].Rad, primitives[i].rad, primitives[i].color, bufarray.indiceBase);
        } else if (primitives[i].class==="cone") {
            mass=initCone(primitives[i].arr0, primitives[i].arr1, primitives[i].rad, primitives[i].color, bufarray.indiceBase);
        } else if (primitives[i].class==="plane") {
            mass=initPlane(primitives[i].arr0, primitives[i].arr1, primitives[i].arr2, primitives[i].arr3, primitives[i].color, bufarray.indiceBase);
        } else if (primitives[i].class==="triangle") {
            mass=initTriangle(primitives[i].arr0, primitives[i].arr1, primitives[i].arr2, primitives[i].color, bufarray.indiceBase);
        } else if (primitives[i].class==="surface") {
            let zoomvectors = [];
            let lCoords = [];
            for (var j = 0; j < primitives[i].vertices.length/3; j++) {
                zoomvectors.push(0.0,0.0,0.0);
                lCoords.push(0.0);
            }
            mass=[primitives[i].vertices, primitives[i].colors, primitives[i].indices,zoomvectors,lCoords];
            for (var j = 0; j < mass[2].length; j++) {
                mass[2][j] += bufarray.indiceBase;
            }
        } else {continue;}
        Array.prototype.push.apply(bufarray.vertices, mass[0]);
        Array.prototype.push.apply(bufarray.colors, mass[1]);
        Array.prototype.push.apply(bufarray.indices, mass[2]);
        Array.prototype.push.apply(bufarray.zoomvectors, mass[3]);
        Array.prototype.push.apply(bufarray.LCoords, mass[4]);
        bufarray.indiceBase += mass[0].length/3;
    }
    bindBufData(arrowBuffers, bufdata);
    bindBufData(arrowOffsetBuffers, bufdataoffset);

    treeBSP = {root: null};
    var baseNodesNum = bufdatatransluent.indices.length / 3;
    for (var i = 0; i < baseNodesNum; i++) {
        var c0 = [];
        var c1 = [];
        var c2 = [];
        for (var j = 0; j < 3; j++) {
            c0[j] = bufdatatransluent.vertices[bufdatatransluent.indices[i*3+0]*3+j];
            c1[j] = bufdatatransluent.vertices[bufdatatransluent.indices[i*3+1]*3+j];
            c2[j] = bufdatatransluent.vertices[bufdatatransluent.indices[i*3+2]*3+j];
        }
        var v1 = [];
        var v2 = [];
        vec3.subtract(c1, c0, v1);
        vec3.subtract(c2, c0, v2);
        var norm = [];
        vec3.cross(v1, v2, norm);
        vec3.normalize(norm);

        newNode = {parent:null, childB:null, childF:null, neighbours:[], normal:norm, coords:[c0,c1,c2],
                         indices:[bufdatatransluent.indices[i*3+0],bufdatatransluent.indices[i*3+1],bufdatatransluent.indices[i*3+2]]};
        if (i == 0) {
            treeBSP.root = newNode;
        } else  {
            addNode(newNode, treeBSP.root);
        }
    }
    bindBufData(arrowBuffersTransluent, bufdatatransluent);

    function addNode(newNode, parentNode)
    {
        var cnode;
        var dot = [];
        for (var i = 0; i < 3; i++) {
            cnode = newNode.coords[i];

            var nodeVec = [];
            vec3.subtract(cnode, parentNode.coords[0], nodeVec);
            dot[i] = vec3.dot(nodeVec, parentNode.normal);
        }
        var infront = (dot[0] > 0) + (dot[1] > 0) + (dot[2] > 0);
        var behind = (dot[0] < 0) + (dot[1] < 0) + (dot[2] < 0);
        if (infront > 0 && behind > 0) {
            if ((dot[0] > 0 && dot[1] < 0 && dot[2] < 0) ||
                (dot[0] < 0 && dot[1] > 0 && dot[2] > 0)) {
                var v01 = [];
                vec3.subtract(c1, c0, v01);
                var dotSum = Math.abs(dot[0])+Math.abs(dot[1]);
                vec3.scale(v01, Math.abs(dot[0])/dotSum);
                vec3.add(v01, c0);
                var newIndex1 = bufdatatransluent.vertices.length / 3;
                bufdatatransluent.indices.push(0,0,0,0,0,0);
                bufdatatransluent.vertices.push(v01[0], v01[1], v01[2]);

                bufdatatransluent.colors.push(bufdatatransluent.colors[newNode.indices[0]*4],
                                              bufdatatransluent.colors[newNode.indices[0]*4+1],
                                              bufdatatransluent.colors[newNode.indices[0]*4+2],
                                              bufdatatransluent.colors[newNode.indices[0]*4+3]);
                bufdatatransluent.zoomvectors.push(0.0,0.0,0.0);
                bufdatatransluent.LCoords.push(0.0);

                var v02 = [];
                vec3.subtract(c2, c0, v02);
                var dotSum = Math.abs(dot[0])+Math.abs(dot[2]);
                vec3.scale(v02, Math.abs(dot[0])/dotSum);
                vec3.add(v02, c0);
                var newIndex2 = bufdatatransluent.vertices.length / 3;
                // bufdatatransluent.indices.push(newIndex2);
                bufdatatransluent.vertices.push(v02[0], v02[1], v02[2]);
                bufdatatransluent.colors.push(bufdatatransluent.colors[newNode.indices[0]*4],
                                              bufdatatransluent.colors[newNode.indices[0]*4+1],
                                              bufdatatransluent.colors[newNode.indices[0]*4+2],
                                              bufdatatransluent.colors[newNode.indices[0]*4+3]);
                bufdatatransluent.zoomvectors.push(0.0,0.0,0.0);
                bufdatatransluent.LCoords.push(0.0);

                var newHalfNode = {parent:null, childB:null, childF:null, neighbours:[], normal:newNode.normal, coords:[c0,v01,v02],
                                 indices:[newNode.indices[0], newIndex1, newIndex2]};
                if (dot[0] > 0) {
                    if (!parentNode.childF) {
                        parentNode.childF = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childF)
                    }
                } else {
                    if (!parentNode.childB) {
                        parentNode.childB = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childB)
                    }
                }

                var newHalfNode = {parent:null, childB:null, childF:null, neighbours:[], normal:newNode.normal, coords:[v01,c1,c2],
                                 indices:[newIndex1, newNode.indices[1], newNode.indices[2]]};
                if (dot[0] > 0) {
                    if (!parentNode.childB) {
                        parentNode.childB = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childB)
                    }
                } else {
                    if (!parentNode.childF) {
                        parentNode.childF = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childF)
                    }
                }

                var newHalfNode = {parent:null, childB:null, childF:null, neighbours:[], normal:newNode.normal, coords:[v01,c2,v02],
                                 indices:[newIndex1, newNode.indices[2], newIndex2]};
                if (dot[0] > 0) {
                    if (!parentNode.childB) {
                        parentNode.childB = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childB)
                    }
                } else {
                    if (!parentNode.childF) {
                        parentNode.childF = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childF)
                    }
                }
            } else if ((dot[0] < 0 && dot[1] > 0 && dot[2] < 0) ||
                (dot[0] > 0 && dot[1] < 0 && dot[2] > 0)) {
                var v10 = [];
                vec3.subtract(c0, c1, v10);
                var dotSum = Math.abs(dot[1])+Math.abs(dot[0]);
                vec3.scale(v10, Math.abs(dot[1])/dotSum);
                vec3.add(v10, c1);
                var newIndex1 = bufdatatransluent.vertices.length / 3;
                bufdatatransluent.indices.push(0,0,0,0,0,0);
                bufdatatransluent.vertices.push(v10[0], v10[1], v10[2]);
                bufdatatransluent.colors.push(bufdatatransluent.colors[newNode.indices[0]*4],
                                              bufdatatransluent.colors[newNode.indices[0]*4+1],
                                              bufdatatransluent.colors[newNode.indices[0]*4+2],
                                              bufdatatransluent.colors[newNode.indices[0]*4+3]);
                bufdatatransluent.zoomvectors.push(0.0,0.0,0.0);
                bufdatatransluent.LCoords.push(0.0);

                var v12 = [];
                vec3.subtract(c2, c1, v12);
                var dotSum = Math.abs(dot[1])+Math.abs(dot[2]);
                vec3.scale(v12, Math.abs(dot[1])/dotSum);
                vec3.add(v12, c1);
                var newIndex2 = bufdatatransluent.vertices.length / 3;
                // bufdatatransluent.indices.push(newIndex2);
                bufdatatransluent.vertices.push(v12[0], v12[1], v12[2]);
                bufdatatransluent.colors.push(bufdatatransluent.colors[newNode.indices[0]*4],
                                              bufdatatransluent.colors[newNode.indices[0]*4+1],
                                              bufdatatransluent.colors[newNode.indices[0]*4+2],
                                              bufdatatransluent.colors[newNode.indices[0]*4+3]);
                bufdatatransluent.zoomvectors.push(0.0,0.0,0.0);
                bufdatatransluent.LCoords.push(0.0);

                var newHalfNode = {parent:null, childB:null, childF:null, neighbours:[], normal:newNode.normal, coords:[v10,c1,v12],
                                 indices:[newIndex1, newNode.indices[1], newIndex2]};
                if (dot[1] > 0) {
                    if (!parentNode.childF) {
                        parentNode.childF = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childF)
                    }
                } else {
                    if (!parentNode.childB) {
                        parentNode.childB = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childB)
                    }
                }

                var newHalfNode = {parent:null, childB:null, childF:null, neighbours:[], normal:newNode.normal, coords:[c0,v10,c2],
                                 indices:[newNode.indices[0], newIndex1, newNode.indices[2]]};
                if (dot[1] > 0) {
                    if (!parentNode.childB) {
                        parentNode.childB = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childB)
                    }
                } else {
                    if (!parentNode.childF) {
                        parentNode.childF = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childF)
                    }
                }

                var newHalfNode = {parent:null, childB:null, childF:null, neighbours:[], normal:newNode.normal, coords:[c2,v10,v12],
                                 indices:[newNode.indices[2], newIndex1, newIndex2]};
                if (dot[1] > 0) {
                    if (!parentNode.childB) {
                        parentNode.childB = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childB)
                    }
                } else {
                    if (!parentNode.childF) {
                        parentNode.childF = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childF)
                    }
                }
            } else if ((dot[0] < 0 && dot[1] < 0 && dot[2] > 0) ||
                (dot[0] > 0 && dot[1] > 0 && dot[2] < 0)) {
                var v20 = [];
                vec3.subtract(c0, c2, v20);
                var dotSum = Math.abs(dot[2])+Math.abs(dot[0]);
                vec3.scale(v20, Math.abs(dot[2])/dotSum);
                vec3.add(v20, c2);
                var newIndex1 = bufdatatransluent.vertices.length / 3;
                bufdatatransluent.indices.push(0,0,0,0,0,0);
                bufdatatransluent.vertices.push(v20[0], v20[1], v20[2]);
                bufdatatransluent.colors.push(bufdatatransluent.colors[newNode.indices[0]*4],
                                              bufdatatransluent.colors[newNode.indices[0]*4+1],
                                              bufdatatransluent.colors[newNode.indices[0]*4+2],
                                              bufdatatransluent.colors[newNode.indices[0]*4+3]);
                bufdatatransluent.zoomvectors.push(0.0,0.0,0.0);
                bufdatatransluent.LCoords.push(0.0);

                var v21 = [];
                vec3.subtract(c1, c2, v21);
                var dotSum = Math.abs(dot[2])+Math.abs(dot[1]);
                vec3.scale(v21, Math.abs(dot[2])/dotSum);
                vec3.add(v21, c2);
                var newIndex2 = bufdatatransluent.vertices.length / 3;
                // bufdatatransluent.indices.push(newIndex2);
                bufdatatransluent.vertices.push(v21[0], v21[1], v21[2]);
                bufdatatransluent.colors.push(bufdatatransluent.colors[newNode.indices[0]*4],
                                              bufdatatransluent.colors[newNode.indices[0]*4+1],
                                              bufdatatransluent.colors[newNode.indices[0]*4+2],
                                              bufdatatransluent.colors[newNode.indices[0]*4+3]);
                bufdatatransluent.zoomvectors.push(0.0,0.0,0.0);
                bufdatatransluent.LCoords.push(0.0);

                var newHalfNode = {parent:null, childB:null, childF:null, neighbours:[], normal:newNode.normal, coords:[v20,v21,c2],
                                 indices:[newIndex1, newIndex2, newNode.indices[2]]};
                if (dot[2] > 0) {
                    if (!parentNode.childF) {
                        parentNode.childF = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childF)
                    }
                } else {
                    if (!parentNode.childB) {
                        parentNode.childB = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childB)
                    }
                }

                var newHalfNode = {parent:null, childB:null, childF:null, neighbours:[], normal:newNode.normal, coords:[c0,c1,v20],
                                 indices:[newNode.indices[0], newNode.indices[1], newIndex1]};
                if (dot[2] > 0) {
                    if (!parentNode.childB) {
                        parentNode.childB = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childB)
                    }
                } else {
                    if (!parentNode.childF) {
                        parentNode.childF = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childF)
                    }
                }

                var newHalfNode = {parent:null, childB:null, childF:null, neighbours:[], normal:newNode.normal, coords:[c1,v21,v20],
                                 indices:[newNode.indices[1], newIndex2, newIndex1]};
                if (dot[2] > 0) {
                    if (!parentNode.childB) {
                        parentNode.childB = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childB)
                    }
                } else {
                    if (!parentNode.childF) {
                        parentNode.childF = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childF)
                    }
                }

            } else if (dot[0] == 0) {
                var v12 = [];
                vec3.subtract(c2, c1, v12);
                var dotSum = Math.abs(dot[1])+Math.abs(dot[2]);
                vec3.scale(v12, Math.abs(dot[1])/dotSum);
                vec3.add(v12, c1);
                var newIndex2 = bufdatatransluent.vertices.length / 3;
                bufdatatransluent.indices.push(0,0,0);
                bufdatatransluent.vertices.push(v12[0], v12[1], v12[2]);
                bufdatatransluent.colors.push(bufdatatransluent.colors[newNode.indices[0]*4],
                                              bufdatatransluent.colors[newNode.indices[0]*4+1],
                                              bufdatatransluent.colors[newNode.indices[0]*4+2],
                                              bufdatatransluent.colors[newNode.indices[0]*4+3]);
                bufdatatransluent.zoomvectors.push(0.0,0.0,0.0);
                bufdatatransluent.LCoords.push(0.0);

                var newHalfNode = {parent:null, childB:null, childF:null, neighbours:[], normal:newNode.normal, coords:[c0,c1,v12],
                                 indices:[newNode.indices[0], newNode.indices[1], newIndex2]};
                if (dot[1] > 0) {
                    if (!parentNode.childF) {
                        parentNode.childF = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childF)
                    }
                } else {
                    if (!parentNode.childB) {
                        parentNode.childB = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childB)
                    }
                }

                var newHalfNode = {parent:null, childB:null, childF:null, neighbours:[], normal:newNode.normal, coords:[c0,c2,v12],
                                 indices:[newNode.indices[0], newNode.indices[2], newIndex2]};
                if (dot[1] > 0) {
                    if (!parentNode.childB) {
                        parentNode.childB = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childB)
                    }
                } else {
                    if (!parentNode.childF) {
                        parentNode.childF = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childF)
                    }
                }
            } else if (dot[1] == 0) {
                var v02 = [];
                vec3.subtract(c2, c0, v02);
                var dotSum = Math.abs(dot[0])+Math.abs(dot[2]);
                vec3.scale(v02, Math.abs(dot[0])/dotSum);
                vec3.add(v02, c0);
                var newIndex2 = bufdatatransluent.vertices.length / 3;
                bufdatatransluent.indices.push(0,0,0);
                bufdatatransluent.vertices.push(v02[0], v02[1], v02[2]);
                bufdatatransluent.colors.push(bufdatatransluent.colors[newNode.indices[0]*4],
                                              bufdatatransluent.colors[newNode.indices[0]*4+1],
                                              bufdatatransluent.colors[newNode.indices[0]*4+2],
                                              bufdatatransluent.colors[newNode.indices[0]*4+3]);
                bufdatatransluent.zoomvectors.push(0.0,0.0,0.0);
                bufdatatransluent.LCoords.push(0.0);

                var newHalfNode = {parent:null, childB:null, childF:null, neighbours:[], normal:newNode.normal, coords:[c0,c1,v02],
                                 indices:[newNode.indices[0], newNode.indices[1], newIndex2]};
                if (dot[0] > 0) {
                    if (!parentNode.childF) {
                        parentNode.childF = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childF)
                    }
                } else {
                    if (!parentNode.childB) {
                        parentNode.childB = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childB)
                    }
                }

                var newHalfNode = {parent:null, childB:null, childF:null, neighbours:[], normal:newNode.normal, coords:[c2,c1,v02],
                                 indices:[newNode.indices[2], newNode.indices[1], newIndex2]};
                if (dot[0] > 0) {
                    if (!parentNode.childB) {
                        parentNode.childB = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childB)
                    }
                } else {
                    if (!parentNode.childF) {
                        parentNode.childF = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childF)
                    }
                }
            } else if (dot[2] == 0) {
                var v01 = [];
                vec3.subtract(c1, c0, v01);
                var dotSum = Math.abs(dot[0])+Math.abs(dot[1]);
                vec3.scale(v01, Math.abs(dot[0])/dotSum);
                vec3.add(v01, c0);
                var newIndex1 = bufdatatransluent.vertices.length / 3;

                bufdatatransluent.indices.push(0,0,0);
                bufdatatransluent.vertices.push(v01[0], v01[1], v01[2]);

                bufdatatransluent.colors.push(bufdatatransluent.colors[newNode.indices[0]*4],
                                              bufdatatransluent.colors[newNode.indices[0]*4+1],
                                              bufdatatransluent.colors[newNode.indices[0]*4+2],
                                              bufdatatransluent.colors[newNode.indices[0]*4+3]);
                bufdatatransluent.zoomvectors.push(0.0,0.0,0.0);
                bufdatatransluent.LCoords.push(0.0);


                var newHalfNode = {parent:null, childB:null, childF:null, neighbours:[], normal:newNode.normal, coords:[c0,v01,c2],
                                 indices:[newNode.indices[0], newIndex1, newNode.indices[2]]};
                if (dot[0] > 0) {
                    if (!parentNode.childF) {
                        parentNode.childF = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childF)
                    }
                } else {
                    if (!parentNode.childB) {
                        parentNode.childB = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childB)
                    }
                }

                var newHalfNode = {parent:null, childB:null, childF:null, neighbours:[], normal:newNode.normal, coords:[c1,v01,c2],
                                 indices:[newNode.indices[1], newIndex1, newNode.indices[2]]};
                if (dot[0] > 0) {
                    if (!parentNode.childB) {
                        parentNode.childB = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childB)
                    }
                } else {
                    if (!parentNode.childF) {
                        parentNode.childF = newHalfNode;
                        newHalfNode.parent = parentNode;
                    } else {
                        addNode(newHalfNode, parentNode.childF)
                    }
                }
            } else {
                console.log(444);
            }
        } else if (infront > 0) {
            if (!parentNode.childF) {
                parentNode.childF = newNode;
                newNode.parent = parentNode;
            } else {
                addNode(newNode, parentNode.childF)
            }
        } else if (behind > 0) {
            if (!parentNode.childB) {
                parentNode.childB = newNode;
                newNode.parent = parentNode;
            } else {
                addNode(newNode, parentNode.childB)
            }
        } else {
            parentNode.neighbours.push(newNode);
        }
    }
    function bindBufData(buffer, data)
    {
        buffer.vertexPosition = gl.createBuffer();
        buffer.vertexColor = gl.createBuffer();
        buffer.vertexIndex = gl.createBuffer();
        buffer.vertexZoomVector = gl.createBuffer();
        buffer.vertexLCoord = gl.createBuffer();
        buffer.vertexPosition.itemSize = 3;
        buffer.vertexColor.itemSize = 4;
        buffer.vertexIndex.itemSize = 1;
        buffer.vertexZoomVector.itemSize = 3;
        buffer.vertexLCoord.itemSize = 1;

        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertexPosition);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.vertices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertexColor);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.colors), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer.vertexIndex);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(data.indices), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertexZoomVector);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.zoomvectors), gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer.vertexLCoord);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data.LCoords), gl.STATIC_DRAW);
        buffer.vertexIndex.numItems = data.indices.length;
    }
}
function initMeshBuffers() {
    for (var i = 0; i < meshes.length; i++) {
        var needToInit = false;
        if (!meshBuffers[i]) needToInit = true;
        if (meshes[i].reinit) {
            needToInit = true;
            meshes[i].reinit = false;
        }
        if (needToInit) {
            meshBuffers[i] = {};
            meshBuffers[i].vertexPosition = gl.createBuffer();
            meshBuffers[i].vertexNormal = gl.createBuffer();
            meshBuffers[i].vertexIndex = gl.createBuffer();
            meshBuffers[i].vertexPosition.itemSize = 3;
            meshBuffers[i].vertexNormal.itemSize = 3;
            meshBuffers[i].vertexIndex.itemSize = 1;

            gl.bindBuffer(gl.ARRAY_BUFFER, meshBuffers[i].vertexPosition);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshes[i].vertices), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, meshBuffers[i].vertexNormal);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshes[i].normals), gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshBuffers[i].vertexIndex);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(meshes[i].indices), gl.STATIC_DRAW);
            meshBuffers[i].vertexIndex.numItems = meshes[i].indices.length;
        }
        if (meshes[i].translate) {
            meshBuffers[i].translate = meshes[i].translate;
        } else {
            meshBuffers[i].translate = [0,0,0];
        }
        if (meshes[i].centerTranslate) {
            meshBuffers[i].centerTranslate = meshes[i].centerTranslate;
        } else {
            meshBuffers[i].centerTranslate = [0,0,0];
        }
        if (meshes[i].rotateX) {
            meshBuffers[i].rotateX = meshes[i].rotateX;
        } else {
            meshBuffers[i].rotateX = 0;
        }
        if (meshes[i].rotateY) {
            meshBuffers[i].rotateY = meshes[i].rotateY;
        } else {
            meshBuffers[i].rotateY = 0;
        }
        if (meshes[i].rotateZ) {
            meshBuffers[i].rotateZ = meshes[i].rotateZ;
        } else {
            meshBuffers[i].rotateZ = 0;
        }
        if (meshes[i].scale) {
            meshBuffers[i].scale = meshes[i].scale;
        } else {
            meshBuffers[i].scale = 1;
        }
        if (meshes[i].color) {
            meshBuffers[i].color = meshes[i].color;
        } else {
            meshBuffers[i].color = [0.5,0.5,0.5,1.0];
        }
    }

    if (meshBuffers.length > meshes.length) {
        for (var i = meshes.length; i < meshBuffers.length; i++) {
            gl.deleteBuffer(meshBuffers[i].vertexPosition);
            gl.deleteBuffer(meshBuffers[i].vertexNormal);
            gl.deleteBuffer(meshBuffers[i].vertexIndex);
        }
        meshBuffers.splice(meshes.length, meshBuffers.length-meshes.length);
    }
}
function initLabels() {
    function midPoint(arr0, arr1, ratio)
    {
        var ppp = [];
        vec3.subtract(arr1,arr0,ppp);
        vec3.scale(ppp, ratio);
        vec3.add(ppp,arr0);
        return ppp;
    }
    // function midPoint(arr0, arr1)
    // {
    //     var ppp = [];
    //     vec3.add(arr0,arr1,ppp);
    //     vec3.scale(ppp, 0.5);
    //     return ppp;
    // }
    function midPoint3(arr0, arr1, arr2)
    {
        var ppp = [];
        vec3.add(arr0,arr1,ppp);
        vec3.add(ppp,arr2);
        vec3.scale(ppp, 1.0/3.0);
        return ppp;
    }
    function midPointAngle(arr0, arr1, arr2, rad)
    {
        var ppp1 = [];
        var ppp2 = [];
        var ppp = [];

        vec3.subtract(arr1,arr0,ppp1);
        vec3.subtract(arr2,arr0,ppp2);
        vec3.normalize(ppp1);
        vec3.normalize(ppp2);
        vec3.add(ppp1,ppp2,ppp);
        vec3.normalize(ppp);
        vec3.scale(ppp, rad*3.0/4.0);
        vec3.add(ppp,arr0);

        return ppp;
    }
    function midPointAngleOut(arr0, arr1, arr2, rad)
    {
        var ppp1 = [];
        var ppp2 = [];
        var ppp = [];

        vec3.subtract(arr1,arr0,ppp1);
        vec3.subtract(arr2,arr0,ppp2);
        vec3.normalize(ppp1);
        vec3.normalize(ppp2);
        vec3.add(ppp1,ppp2,ppp);
        vec3.normalize(ppp);
        vec3.scale(ppp, -rad*1.0/2.0);
        vec3.add(ppp,arr0);

        return ppp;
    }
    function appendLabels(text, coords, textAlign) {
        var span   = $("<span></span>").html(text);
        span.css('position', 'absolute');
        signText.append(span);
        textLabels.push({text:span, objCoords:coords, align:textAlign});
    }
    textLabels = [];
    var signText = $("#signText");
    signText.empty();
    appendLabels('', [0,0,0], 'rc');
    appendLabels('', [0,0,0], 'ct');
    for (var i = 0; i < primitives.length; i++) {
        if (primitives[i].text != ''){
            if (primitives[i].class==="arrow") {
                if (!primitives[i].hasOwnProperty('pos')) primitives[i].pos = 'lb';
                if (!primitives[i].hasOwnProperty('ratio')) primitives[i].ratio = 0.5;
                appendLabels(primitives[i].text, midPoint(primitives[i].arr0, primitives[i].arr1, primitives[i].ratio), primitives[i].pos);
            } else if (primitives[i].class==="darrow") {
                if (!primitives[i].hasOwnProperty('pos')) primitives[i].pos = 'lb';
                if (!primitives[i].hasOwnProperty('ratio')) primitives[i].ratio = 0.5;
                appendLabels(primitives[i].text, midPoint(primitives[i].arr0, primitives[i].arr1, primitives[i].ratio), primitives[i].pos);
            } else if (primitives[i].class==="line") {
                if (!primitives[i].hasOwnProperty('pos')) primitives[i].pos = 'lb';
                if (!primitives[i].hasOwnProperty('ratio')) primitives[i].ratio = 0.5;
                appendLabels(primitives[i].text, midPoint(primitives[i].arr0, primitives[i].arr1, primitives[i].ratio), primitives[i].pos);
            } else if (primitives[i].class==="dashline") {
                if (!primitives[i].hasOwnProperty('pos')) primitives[i].pos = 'lb';
                if (!primitives[i].hasOwnProperty('ratio')) primitives[i].ratio = 0.5;
                appendLabels(primitives[i].text, midPoint(primitives[i].arr0, primitives[i].arr1, primitives[i].ratio), primitives[i].pos);
            } else if (primitives[i].class==="dash") {
                // appendLabels(primitives[i].text, primitives[i].arr0, 'lb');
                if (!primitives[i].hasOwnProperty('pos')) primitives[i].pos = 'lb';
                if (!primitives[i].hasOwnProperty('ratio')) primitives[i].ratio = 0.5;
                appendLabels(primitives[i].text, midPoint(primitives[i].arr0, primitives[i].arr1, primitives[i].ratio), primitives[i].pos);
            } else if (primitives[i].class==="point") {
                if (!primitives[i].pos) { primitives[i].pos = 'lb'; }
                appendLabels(primitives[i].text, primitives[i].arr0, primitives[i].pos);
            } else if (primitives[i].class==="text") {
                if (!primitives[i].pos) { primitives[i].pos = 'lb'; }
                appendLabels(primitives[i].text, primitives[i].arr0, primitives[i].pos);
            } else if (primitives[i].class==="arc") {
                appendLabels(primitives[i].text, midPointAngle(primitives[i].arr0, primitives[i].arr1, primitives[i].arr2, primitives[i].Rad), 'cc');
            } else if (primitives[i].class==="arcout") {
                appendLabels(primitives[i].text, midPointAngleOut(primitives[i].arr0, primitives[i].arr1, primitives[i].arr2, primitives[i].Rad), 'cc');
            } else if (primitives[i].class==="circle") {
                appendLabels(primitives[i].text, primitives[i].arr0, 'cc');
            } else if (primitives[i].class==="plane") {
                appendLabels(primitives[i].text, midPointAngle(primitives[i].arr0, primitives[i].arr1, primitives[i].arr3, 1), 'cc');
            } else if (primitives[i].class==="triangle") {
                appendLabels(primitives[i].text, midPoint3(primitives[i].arr0, primitives[i].arr1, primitives[i].arr2), 'cc');
            }
        }
    }
}
var needToReinitBuffers = true;
function initBuffers() {
    needToReinitBuffers = true;
}
function initBuffers1() {
    primitives = [];
    meshes = [];
    var time1 = performance.now();
    initData();
    var time2 = performance.now();
    initLabels();
    var time3 = performance.now();
    initArrowBuffers();
    var time4 = performance.now();
    initMeshBuffers();
    var time5 = performance.now();
    // console.log("init",time2-time1,time3-time2,time4-time3,time5-time4);
    // console.log(time5-time4);
}

var isShowAxes = true;
var isOffsetAxes = false;
var isShowGrid = true;
var FOV = 45;
var centerTranslate = [0,0,0];
var zTranslation = -7.0;
var tcount = 0;
function lookAt(cameraPosition, target, up) {
    var zAxis = normalize(
        subtractVectors(cameraPosition, target));
    var xAxis = cross(up, zAxis);
    var yAxis = cross(zAxis, xAxis);

    return [
        xAxis[0], xAxis[1], xAxis[2], 0,
        yAxis[0], yAxis[1], yAxis[2], 0,
        zAxis[0], zAxis[1], zAxis[2], 0,
        cameraPosition[0],
        cameraPosition[1],
        cameraPosition[2],
        1,
    ];
}
// console.log = function(){}
function drawMeasure(a1,a2) {
    var dispWin = 30;
    var pointWin1 = [];
    var pointWin2 = [];
    project(a1, mvMatrix, pMatrix, [0,0,gl.drawingBufferWidth,gl.drawingBufferHeight], pointWin1);
    project(a2, mvMatrix, pMatrix, [0,0,gl.drawingBufferWidth,gl.drawingBufferHeight], pointWin2);
    var vecWin = [(pointWin2[0]-pointWin1[0]),(pointWin2[1]-pointWin1[1])];
    var lenWin = Math.sqrt(vecWin[0]*vecWin[0]+vecWin[1]*vecWin[1]);
    vecWin[0] /= lenWin; vecWin[1] /= lenWin;
    // if (vecWin[0]>0) {dispWin = -dispWin;}
    // if (vecWin[1]<0) {vecWin[1]=-vecWin[1];}
    textCanvasContext.beginPath();
    textCanvasContext.lineWidth=1;
    textCanvasContext.moveTo(pointWin1[0],pointWin1[1]);
    textCanvasContext.lineTo(pointWin1[0]-dispWin*1.1*vecWin[1],pointWin1[1]+dispWin*1.1*vecWin[0]);
    textCanvasContext.moveTo(pointWin2[0],pointWin2[1]);
    textCanvasContext.lineTo(pointWin2[0]-dispWin*1.1*vecWin[1],pointWin2[1]+dispWin*1.1*vecWin[0]);
    textCanvasContext.stroke();
    textCanvasContext.closePath();
    textCanvasContext.lineWidth=2;
    textCanvasContext.beginPath();
    textCanvasContext.moveTo(pointWin1[0]-dispWin*vecWin[1],pointWin1[1]+dispWin*vecWin[0]);
    textCanvasContext.lineTo(pointWin2[0]-dispWin*vecWin[1],pointWin2[1]+dispWin*vecWin[0]);
    textCanvasContext.moveTo(pointWin1[0]-dispWin*vecWin[1]-5*vecWin[1]+10*vecWin[0],pointWin1[1]+dispWin*vecWin[0]+5*vecWin[0]+10*vecWin[1]);
    textCanvasContext.lineTo(pointWin1[0]-dispWin*vecWin[1],pointWin1[1]+dispWin*vecWin[0]);
    textCanvasContext.lineTo(pointWin1[0]-dispWin*vecWin[1]+5*vecWin[1]+10*vecWin[0],pointWin1[1]+dispWin*vecWin[0]-5*vecWin[0]+10*vecWin[1]);
    textCanvasContext.moveTo(pointWin2[0]-dispWin*vecWin[1]-5*vecWin[1]-10*vecWin[0],pointWin2[1]+dispWin*vecWin[0]+5*vecWin[0]-10*vecWin[1]);
    textCanvasContext.lineTo(pointWin2[0]-dispWin*vecWin[1],pointWin2[1]+dispWin*vecWin[0]);
    textCanvasContext.lineTo(pointWin2[0]-dispWin*vecWin[1]+5*vecWin[1]-10*vecWin[0],pointWin2[1]+dispWin*vecWin[0]-5*vecWin[0]-10*vecWin[1]);
    textCanvasContext.stroke();
    textCanvasContext.closePath();
    textCanvasContext.save();
    textCanvasContext.translate((pointWin1[0]+pointWin2[0])/2-dispWin*vecWin[1],(pointWin1[1]+pointWin2[1])/2+dispWin*vecWin[0]);
    var angWin = Math.acos(vecWin[0])-Math.PI;
    if (vecWin[0]>0) {angWin += Math.PI}
    if (vecWin[1]<0) {angWin = -angWin}
    textCanvasContext.rotate(angWin);
    textCanvasContext.fillText(Math.sqrt((a2[0]-a1[0])*(a2[0]-a1[0])+(a2[1]-a1[1])*(a2[1]-a1[1])+(a2[2]-a1[2])*(a2[2]-a1[2])).toPrecision(3), 0,0);
    textCanvasContext.restore();
}
var treeBSP = {root: null, nodes:[]};
function drawScene() {
    if (needToReinitBuffers) {
        initBuffers1();
        needToReinitBuffers = false;
    }
    var time1 = performance.now();
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if (isOrtho){
        var wincoef = 2.0/(gl.drawingBufferWidth+gl.drawingBufferHeight) * 3;
        mat4.ortho(-gl.drawingBufferWidth*wincoef, gl.drawingBufferWidth*wincoef, -gl.drawingBufferHeight*wincoef, gl.drawingBufferHeight*wincoef, 0.1, 100.0, pMatrix);
    } else {
        mat4.perspective(FOV, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 100.0, pMatrix);
    }
    mat4.identity(mvMatrix);

    mat4.translate(mvMatrix, [dispX*scaleFactor, dispY*scaleFactor, 0]);
    mat4.translate(mvMatrix, [0.0, 0.0, zTranslation]);
    mat4.scale(mvMatrix, [scaleFactor, scaleFactor, scaleFactor]);

    mat4.rotateX(mvMatrix, degToRad(rotAngX));
    mat4.rotateY(mvMatrix, degToRad(rotAngY));

    mat4.translate(mvMatrix, centerTranslate);

    var time2 = performance.now();

    var RENDER = 3  // color map for opaque objects
    var PEEL_C0 = 4  // color map for opaque objects
    var PEEL_D0 = 5  // create depth buffer D0 for opaque objects
    var PEEL_C1 = 6  // 1st transparency color map
    var PEEL_D1 = 7  // create depth buffer D1 for 1st transparent peel based on D0
    var PEEL_C2 = 8  // 2nd transparency color map
    var PEEL_D2 = 9  // create depth buffer D2 for 2nd transparent peel based on D0 and D1
    function drawLayer(minormode, T, Trefs) {
        switch (minormode) {
          case RENDER:
          case PEEL_C0:
            shaderProgram = shaderProgram2;
            break;
          case PEEL_D0:
            shaderProgram = shaderProgramD0;
            break;
          case PEEL_C1:
            shaderProgram = shaderProgramC1;
            break;
          case PEEL_D1:
            shaderProgram = shaderProgramD1;
            break;
          case PEEL_C2:
            shaderProgram = shaderProgramC2;
            break;
          case PEEL_D2:
            shaderProgram = shaderProgramD2;
            break;
        }

        gl.useProgram(shaderProgram);

        if (minormode == RENDER) {
            canvas_size[0] = gl.drawingBufferWidth;
            canvas_size[1] = gl.drawingBufferHeight;
        } else {
            canvas_size[0] = ktexture*gl.drawingBufferWidth;
            canvas_size[1] = ktexture*gl.drawingBufferHeight;
        }
        gl.viewport(0, 0, canvas_size[0], canvas_size[1]);
        for (var i=0; i<Trefs.length; i++) {
            var a = Trefs[i]
            // if (a == T) continue
            gl.activeTexture( textureN[a] )
            gl.bindTexture(gl.TEXTURE_2D, peels[a])
            switch (i) {
              case 0:
                gl.uniform1i(shaderProgram.D0, textureU[Trefs[0]])
              case 1:
                gl.uniform1i(shaderProgram.D1, textureU[Trefs[1]])
                break;
            }
        }

        if (T === null) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        } else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, peelFramebuffer)
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, peels[T], 0)
        }

        if (minormode > PEEL_C0) gl.clearColor(0, 0, 0, 0);
        else gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);

        // gl.depthFunc(gl.LEQUAL);
        // gl.clearDepth(1); // set to 1 if using gl.LEQUAL
        if (minormode!=RENDER)
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)

        if (minormode > PEEL_D0) {
            gl.uniform2fv(shaderProgram.canvas_size, canvas_size);
        }

        // Попробовать BSP tree сортировку для прозрачности
        // rotAngX = rotAngX%360;
        // rotAngY = rotAngY%360;
        // if (rotAngX < 0) rotAngX = 360+rotAngX;
        // if (rotAngY < 0) rotAngY = 360+rotAngY;
        // if (rotAngX > 180) rotAngX = -360+rotAngX;
        // if (rotAngY > 180) rotAngY = -360+rotAngY;
        // if (minormode==RENDER && ((Math.abs(rotAngX) < 90 || Math.abs(rotAngY) > 90) && !(Math.abs(rotAngX) < 90 && Math.abs(rotAngY) > 90)))
        // {
        //     for (var i = meshBuffers.length-1; i >= 0; i--) {
        //         if ((minormode==RENDER) || (meshBuffers[i].color[3]==1.0 && minormode<=PEEL_D0) || (meshBuffers[i].color[3]<1.0 && minormode>PEEL_D0)) {
        //             mvPushMatrix();
        //             mat4.translate(mvMatrix, meshBuffers[i].translate);
        //             mat4.scale(mvMatrix, [meshBuffers[i].scale, meshBuffers[i].scale, meshBuffers[i].scale]);
        //             mat4.rotateX(mvMatrix, degToRad(meshBuffers[i].rotateX));
        //             mat4.rotateY(mvMatrix, degToRad(meshBuffers[i].rotateY));
        //             mat4.rotateZ(mvMatrix, degToRad(meshBuffers[i].rotateZ));
        //             mat4.translate(mvMatrix, meshBuffers[i].centerTranslate);
        //             setMatrixUniforms();

        //             if (minormode == RENDER || minormode == PEEL_C0 || minormode == PEEL_C1 || minormode == PEEL_C2) {
        //                 gl.uniform3fv(shaderProgram.uReverseLightDirection, [0.0,0.0,1.0]);
        //                 var worldInverseMatrix = [];
        //                 mat4.inverse(mvMatrix, worldInverseMatrix);
        //                 var worldInverseTransposeMatrix = [];
        //                 mat4.transpose(worldInverseMatrix, worldInverseTransposeMatrix);
        //                 gl.uniformMatrix4fv(shaderProgram.uWorldInverseTranspose, false, worldInverseTransposeMatrix);
        //                 gl.uniform4fv(shaderProgram.uColor, meshBuffers[i].color);
        //             }

        //             shaderProgram.bindBuffers(meshBuffers[i]);
        //             gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshBuffers[i].vertexIndex);
        //             gl.drawElements(gl.TRIANGLES, meshBuffers[i].vertexIndex.numItems, gl.UNSIGNED_INT, 0);
        //             mvPopMatrix();
        //         }
        //     }
        // }
        // else
        {
        for (var i = 0; i < meshBuffers.length; i++) {
            if ((minormode==RENDER) || (meshBuffers[i].color[3]==1.0 && minormode<=PEEL_D0) || (meshBuffers[i].color[3]<1.0 && minormode>PEEL_D0)) {
                mvPushMatrix();
                mat4.translate(mvMatrix, meshBuffers[i].translate);
                mat4.scale(mvMatrix, [meshBuffers[i].scale, meshBuffers[i].scale, meshBuffers[i].scale]);
                mat4.rotateX(mvMatrix, degToRad(meshBuffers[i].rotateX));
                mat4.rotateY(mvMatrix, degToRad(meshBuffers[i].rotateY));
                mat4.rotateZ(mvMatrix, degToRad(meshBuffers[i].rotateZ));
                mat4.translate(mvMatrix, meshBuffers[i].centerTranslate);
                setMatrixUniforms();

                if (minormode == RENDER || minormode == PEEL_C0 || minormode == PEEL_C1 || minormode == PEEL_C2) {
                    gl.uniform3fv(shaderProgram.uReverseLightDirection, [0.0,0.0,1.0]);
                    var worldInverseMatrix = [];
                    mat4.inverse(mvMatrix, worldInverseMatrix);
                    var worldInverseTransposeMatrix = [];
                    mat4.transpose(worldInverseMatrix, worldInverseTransposeMatrix);
                    gl.uniformMatrix4fv(shaderProgram.uWorldInverseTranspose, false, worldInverseTransposeMatrix);
                    gl.uniform4fv(shaderProgram.uColor, meshBuffers[i].color);
                }

                shaderProgram.bindBuffers(meshBuffers[i]);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, meshBuffers[i].vertexIndex);
                gl.drawElements(gl.TRIANGLES, meshBuffers[i].vertexIndex.numItems, gl.UNSIGNED_INT, 0);
                mvPopMatrix();
            }
        }

        }
    }
    function mergeLayers(kCount) {
        shaderProgram = shaderProgramMerge
        gl.useProgram(shaderProgram);
        for (var i = 0; i <= kCount; i++) {
            gl.activeTexture( textureN['C'+i] );
            gl.bindTexture(gl.TEXTURE_2D, peels['C'+i]);
            gl.uniform1i(shaderProgram['C'+i], textureU['C'+i]);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null)

        canvas_size[0] = gl.drawingBufferWidth;
        canvas_size[1] = gl.drawingBufferHeight;
        gl.viewport(0, 0, canvas_size[0], canvas_size[1]);

        gl.uniform2fv(shaderProgram.canvas_size, canvas_size)

        gl.bindBuffer(gl.ARRAY_BUFFER, qvertexPosition);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    function mergeLayersN(kCount) {
        gl.enable(gl.BLEND);
        gl.disable(gl.DEPTH_TEST);
        shaderProgram = shaderProgramMergeN
        gl.useProgram(shaderProgram);

        gl.bindFramebuffer(gl.FRAMEBUFFER, null)

        canvas_size[0] = gl.drawingBufferWidth;
        canvas_size[1] = gl.drawingBufferHeight;
        gl.viewport(0, 0, canvas_size[0], canvas_size[1]);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        gl.uniform2fv(shaderProgram.canvas_size, canvas_size)

        gl.bindBuffer(gl.ARRAY_BUFFER, qvertexPosition);
        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        for (var i = 0; i <= kCount; i++) {
            gl.activeTexture( textureN['C'+i] );
            gl.bindTexture(gl.TEXTURE_2D, peels['C'+i]);
        }
        var i = 0;
            gl.uniform1i(shaderProgram.C0, textureU['C'+i]);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        for (var i = kCount; i >= 1; i--) {
            gl.uniform1i(shaderProgram.C0, textureU['C'+i]);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        }
        gl.enable(gl.DEPTH_TEST);
    }
    if (isDepthPeel) {
        gl.disable(gl.BLEND);
        // drawLayer(PEEL_D0, 'D0', []);
        // drawLayer(PEEL_D1, null, ['D0']);
        drawLayer(PEEL_C0, 'C0', []);
        if (peelLayersCount>0) {
            drawLayer(PEEL_D0, 'D0', []);
            drawLayer(PEEL_C1, 'C1', ['D0']);
            if (peelLayersCount>1) {
                drawLayer(PEEL_D1, 'D1', ['D0']);
                drawLayer(PEEL_C2, 'C2', ['D0','D1']);
                for (var i = 3; i <= peelLayersCount; i++) {
                    drawLayer(PEEL_D2, 'D'+(1+i%2), ['D0','D'+(1+(i+1)%2)]);
                    drawLayer(PEEL_C2, 'C'+i, ['D0','D'+(1+i%2)]);
                }
            }
        }
        mergeLayersN(peelLayersCount);
    } else {
        gl.enable(gl.BLEND);
        drawLayer(RENDER, null, []);
    }

    var time3 = performance.now();

    shaderProgram = shaderProgram0;
    gl.useProgram(shaderProgram);
    var lineWidthScale = 1;
    if (isOrtho){
        lineWidthScale = 2*wincoef/scaleFactor;
    } else {
        lineWidthScale = Math.tan(FOV/180.0/2.0*Math.PI)*(-zTranslation)/scaleFactor/gl.drawingBufferHeight*2;
    }
    gl.uniform1f(shaderProgram.zoomFactorUniform, lineWidthScale);

    if (is2d) {
        if (isShowAxes || isShowGrid) {
            unProjectWindowRect();
            var pixelSize = (objWH[0]-objX0Y0[0])/gl.drawingBufferWidth;
            gridStep = pixelSize * 100; // Средняя длина шага
            var base = 5; // Значение шага ограничено степенью этого числа
            var slog = Math.floor( (Math.log(gridStep)+0.5) / Math.log(base) );
            gridStep = 1.0/Math.pow(base, -slog);
        }
    }
    if (isShowAxes || isShowGrid) {
        initAxes();
    }
    if (is2d && isShowGrid) {
        initGrid();
    }

    setMatrixUniforms();
    var time4 = performance.now();
    if (isShowAxes) {
        gl.uniform1i(shaderProgram.uOffset, isOffsetAxes);
        shaderProgram.bindBuffers(axesBuffers);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, axesBuffers.vertexIndex);
        gl.drawElements(gl.TRIANGLES, axesBuffers.vertexIndex.numItems, gl.UNSIGNED_INT, 0);

    }
    if (is2d && isShowGrid) {
        gl.uniform1i(shaderProgram.uOffset, false);
        shaderProgram.bindBuffers(gridBuffers);
        gl.drawArrays(gl.LINES, 0, gridBuffers.vertexPosition.numItems);
    }
    gl.uniform1i(shaderProgram.uOffset, false);
    shaderProgram.bindBuffers(arrowBuffers);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, arrowBuffers.vertexIndex);
    gl.drawElements(gl.TRIANGLES, arrowBuffers.vertexIndex.numItems, gl.UNSIGNED_INT, 0);

    if (arrowBuffersTransluent.vertexIndex.numItems) {
        var cameraWin1 = [0,0,0];
        var cameraWin2 = [0,0,1];
        var cameraObj1 = [];
        var cameraObj2 = [];
        unProject(cameraWin1, mvMatrix, pMatrix, [0,0,gl.drawingBufferWidth,gl.drawingBufferHeight], cameraObj1);
        unProject(cameraWin2, mvMatrix, pMatrix, [0,0,gl.drawingBufferWidth,gl.drawingBufferHeight], cameraObj2);

        function testSide(normal, point, cameraPoint1, cameraPoint2) {
            var camVec = [];
            if (isOrtho) {
                vec3.subtract(cameraPoint1, cameraPoint2, camVec);
            } else {
                vec3.subtract(cameraPoint1, point, camVec);
            }
            return vec3.dot(camVec, normal) >= 0;
        }

        var ii = 0;
        var newIndices = [];
        traverse(treeBSP.root);

        function traverse(node) {
            if (testSide(node.normal, node.coords[0], cameraObj1, cameraObj2)) {
                if (node.childB) {
                    traverse(node.childB);
                }
                newIndices.push(node.indices[0], node.indices[1], node.indices[2]);
                ii++;
                for (var i = 0; i < node.neighbours.length; i++) {
                    newIndices.push(node.neighbours[i].indices[0], node.neighbours[i].indices[1], node.neighbours[i].indices[2]);
                    ii++;
                }
                if (node.childF) {
                    traverse(node.childF);
                }
            } else {
                if (node.childF) {
                    traverse(node.childF);
                }
                newIndices.push(node.indices[0], node.indices[1], node.indices[2]);
                ii++;
                for (var i = 0; i < node.neighbours.length; i++) {
                    newIndices.push(node.neighbours[i].indices[0], node.neighbours[i].indices[1], node.neighbours[i].indices[2]);
                    ii++;
                }
                if (node.childB) {
                    traverse(node.childB);
                }
            }
        }

        shaderProgram.bindBuffers(arrowBuffersTransluent);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, arrowBuffersTransluent.vertexIndex);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(newIndices), gl.STATIC_DRAW);
        gl.drawElements(gl.TRIANGLES, newIndices.length, gl.UNSIGNED_INT, 0);
    }

    gl.uniform1i(shaderProgram.uOffset, true);
    shaderProgram.bindBuffers(arrowOffsetBuffers);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, arrowOffsetBuffers.vertexIndex);
    gl.drawElements(gl.TRIANGLES, arrowOffsetBuffers.vertexIndex.numItems, gl.UNSIGNED_INT, 0);

    var time5 = performance.now();

    showLabels(textLabels);

    var time6 = performance.now();
    if (lines.length>0) {
        textCanvasContext.clearRect(0, 0, textCanvasContext.canvas.width, textCanvasContext.canvas.height);
        textCanvasContext.font = "20px Trebuchet MS,Tahoma,Arial,Helvetica,sans-serif";
        textCanvasContext.textAlign = 'center';
        textCanvasContext.textBaseline = 'bottom';
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].measure) {
                drawMeasure(points[lines[i].coord1].coord1, points[lines[i].coord2].coord1);
            }
        }
    }
    var time7 = performance.now();
    // console.log(time2-time1,time3-time2,time4-time3,time5-time4,time6-time5,time7-time6);
}
function showLabels(labels) {
    for (var i = 0; i < labels.length; i++) {
        var lineWidth = labels[i].text.width();
        var lineHeight = labels[i].text.height();
        var textPointWin = [];
        project(labels[i].objCoords, mvMatrix, pMatrix, [0,0,gl.drawingBufferWidth,gl.drawingBufferHeight], textPointWin);
        if (labels[i].align[0]=='l') {
            labels[i].text.css("left", textPointWin[0]);
        } else if (labels[i].align[0]=='c') {
            labels[i].text.css("left", textPointWin[0]-lineWidth/2);
        } else if (labels[i].align[0]=='r') {
            labels[i].text.css("left", textPointWin[0]-lineWidth);
        }
        if (labels[i].align[1]=='t') {
            labels[i].text.css("top", textPointWin[1]);
        } else if (labels[i].align[1]=='c') {
            labels[i].text.css("top", textPointWin[1]-lineHeight/2);
        } else if (labels[i].align[1]=='b') {
            labels[i].text.css("top", textPointWin[1]-lineHeight);
        }
    }
}

function resize(canvas) {
  // Lookup the size the browser is displaying the canvas.
  var displayWidth  = canvas.clientWidth;
  var displayHeight = canvas.clientHeight;
  // Check if the canvas is not the same size.
  if (canvas.width  != displayWidth ||
      canvas.height != displayHeight) {
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
}

var canvas_size = new Float32Array( 2 );

var peelFramebuffer;
var peelRenderbuffer;

var peels;

var textureN;
var textureU;
var ktexture = 1;
function resizePage() {
    resize(gl.canvas);
    resize(textCanvas);

    if (isDepthPeel) {
        function makeTexture(T) {
            gl.activeTexture(textureN[T])
            gl.bindTexture(gl.TEXTURE_2D, peels[T])

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, canvas_size[0], canvas_size[1], 0, gl.RGBA, gl.UNSIGNED_BYTE, null)
            gl.bindTexture(gl.TEXTURE_2D, null)
        }
        canvas_size[0] = ktexture*gl.drawingBufferWidth;
        canvas_size[1] = ktexture*gl.drawingBufferHeight;
        for (var T in peels) {
            makeTexture(T);
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, peelFramebuffer);
        gl.bindRenderbuffer(gl.RENDERBUFFER, peelRenderbuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, canvas_size[0], canvas_size[1]);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, peelRenderbuffer);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
}

var firstDrawFrame = true;
var resizeTime;

var meshVertices;
var qvertexPosition;
var peelLayersCount = 15;
function tick() {
    if (firstDrawFrame) {

        if (isDepthPeel) {
            peels = {};
            textureN = {};
            textureU = {};

            for (var i = 0; i <= 2; i++) {
                peels['D'+i] = null;
                textureN['D'+i] = gl.TEXTURE0+i;
                textureU['D'+i] = i;
            }
            for (var i = 0; i <= peelLayersCount; i++) {
                peels['C'+i] = null;
                textureN['C'+i] = gl.TEXTURE0+3+i;
                textureU['C'+i] = 3+i;
            }
            for (var T in peels) {
                peels[T] = gl.createTexture();
            }
            peelFramebuffer = gl.createFramebuffer();
            peelRenderbuffer = gl.createRenderbuffer();

            meshVertices = [
                     1.0,  1.0,  0.0,
                    -1.0,  1.0,  0.0,
                     1.0, -1.0,  0.0,
                    -1.0, -1.0,  0.0
            ];
            qvertexPosition = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, qvertexPosition);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshVertices), gl.STATIC_DRAW);
        }

        firstDrawFrame = false;

        resizePage();
        resizeTime = performance.now();
    }
    else
    {
        let currTime = performance.now();
        if (currTime-resizeTime > 300) {
            resizePage();
            resizeTime = currTime;
        }
    }
    drawScene();
    requestAnimationFrame(tick);
}
var canvas;
var textCanvas;
var textCanvasContext;
var is2d = dimention=="2d"?true:false;
var isOrtho = true;
var isDepthPeel = false;
var clearColor = [1.0, 1.0, 1.0, 1.0];
function webGLStart() {
    if (!is2d) {
        rotAngY = -10;
        rotAngX = 10;
    }
    canvas = document.getElementById("Vectors3D-canvas");
    textCanvas = document.getElementById("text-canvas");
    initGL(canvas);
    initShaders();
    initPoints();
    initDescr();
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
    initBuffers();
    gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
    gl.enable(gl.DEPTH_TEST);
    //gl.disable(gl.DEPTH_TEST);

    gl.enable(gl.BLEND);
    // Устаревшая функция, приводящая к неверным результатам
    // gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Функция для правильного смешивания цветов при учёте прозрачности
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    textCanvasContext = textCanvas.getContext("2d");

    $( "#text-canvas" ).mousedown(handleMouseDown);
    $( document  ).mouseup(handleMouseUpOrTouchEnd).mousemove(handleMouseMove);

    textCanvas.addEventListener("touchstart", handleTouchStart, false);
    textCanvas.addEventListener("touchend", handleMouseUpOrTouchEnd, false);
    textCanvas.addEventListener("touchcancel", handleMouseUpOrTouchEnd, false);
    textCanvas.addEventListener("touchleave", handleMouseUpOrTouchEnd, false);
    textCanvas.addEventListener("touchmove", handleTouchMove, false);
    // IE9, Chrome, Safari, Opera
    textCanvas.addEventListener("mousewheel", handleMouseWheel, false);
    // Firefox
    textCanvas.addEventListener("DOMMouseScroll", handleMouseWheel, false);

    $("#text-canvas").on("contextmenu", false);

    tick();
}
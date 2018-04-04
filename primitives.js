function createPlane(point1, point2, point3, respoint1, respoint2, respoint3, respoint4, planeHalfLength) {
    var vecA1B1 = [];
    vec3.subtract(point2,point1,vecA1B1);
    vec3.normalize(vecA1B1);
    var vecA2B2 = [];
    vec3.subtract(point3,point1,vecA2B2);
    vec3.normalize(vecA2B2);
    var normal = [];
    vec3.cross(vecA1B1,vecA2B2,normal);
    vec3.normalize(normal);

    var pVec1 = [];
    vec3.add(vecA1B1,vecA2B2,pVec1);
    vec3.normalize(pVec1);

    var pVec2 = [];
    vec3.cross(pVec1,normal,pVec2);
    vec3.normalize(pVec2);

    var pPoint = [];
    // intersect([0,0,0],normal,point1,normal,pPoint);
    vec3.scale(normal,vec3.dot(normal,point1),pPoint);
    // vec3.set(pPoint,points[3]);

    if (!planeHalfLength) planeHalfLength = 5;;
    vec3.scale(pVec1,planeHalfLength);
    vec3.scale(pVec2,planeHalfLength);
    vec3.add(pPoint,pVec1,respoint1);
    vec3.subtract(respoint1,pVec2,respoint2);
    vec3.add(respoint1,pVec2);
    vec3.subtract(pPoint,pVec1,respoint3);
    vec3.add(respoint3,pVec2,respoint4);
    vec3.subtract(respoint3,pVec2);
}
function distToPlane(V0, P0, P1, P2, delta) {
    var a = [];
    vec3.subtract(P0,V0,a);
    var N = [];
    var v1 = [];
    var v2 = [];
    vec3.subtract(P1,P0,v1);
    vec3.subtract(P2,P0,v2);
    vec3.cross(v1,v2,N);
    vec3.normalize(N);
    if (!delta) delta = [];
    vec3.scale(N,vec3.dot(N,a),delta);
    return vec3.length(delta);
}
function distToLine(V0, P0, P1, delta) {
    var a = [];
    var v = [];
    vec3.subtract(V0,P0,a);
    vec3.subtract(P1,P0,v);
    vec3.normalize(v);
    if (!delta) delta = [];
    vec3.scale(v,vec3.dot(a,v),delta);
    vec3.add(delta,P0);
    vec3.subtract(delta,V0);
    return vec3.length(delta);
}
function intersectLine(l0, l1, P0, P1, P2, intersect) {
    var v1 = [];
    var v2 = [];
    vec3.subtract(P1,P0,v1);
    vec3.subtract(P2,P0,v2);
    var N = [];
    vec3.cross(v1,v2,N);
    var a = [];
    vec3.subtract(P0,l0,a);
    var v = [];
    vec3.subtract(l1,l0,v);
    var Nv = vec3.dot(N,v);
    var t;
    if (Nv != 0) t = vec3.dot(N,a)/Nv;
    else t = 0;
    vec3.scale(v,t,intersect);
    vec3.add(intersect,l0);
}
function createLine(pointA, pointB, respoint1, respoint2, lineHalfLength) {
    var vecAB = [];
    vec3.subtract(pointB,pointA,vecAB);
    vec3.normalize(vecAB);
    var proj = vec3.dot(pointA,vecAB);
    var vecAC = [];
    vec3.scale(vecAB,-proj,vecAC);
    var centerPoint = [];
    vec3.add(pointA,vecAC,centerPoint);
    // vec3.set(centerPoint,points[3]);
    var vecBC = [];
    vec3.subtract(centerPoint,pointB,vecBC);
    var lenAC = Math.abs(proj);
    var lenBC = vec3.length(vecBC);
    if (!lineHalfLength) lineHalfLength = 5;;
    if (lineHalfLength<lenAC+1) {lineHalfLength=lenAC+1;}
    if (lineHalfLength<lenBC+1) {lineHalfLength=lenBC+1;}
    vec3.scale(vecAB,lineHalfLength);
    vec3.subtract(centerPoint,vecAB,respoint1);
    vec3.add(centerPoint,vecAB,respoint2);
}
var pathToMeshes = "meshes/";
function loadSTL(filename, mesh, onreadyfunc, parameters) {
    mesh.isready = false;
    var request = new XMLHttpRequest();
    request.open("GET", pathToMeshes+filename, true);
    request.responseType = "arraybuffer";
    request.send();

    function ensureBinary( buf ) {
        if ( typeof buf === "string" ) {
            var array_buffer = new Uint8Array( buf.length );
            for ( var i = 0; i < buf.length; i ++ ) {
                array_buffer[ i ] = buf.charCodeAt( i ) & 0xff; // implicitly assumes little-endian
            }
            return array_buffer.buffer || array_buffer;
        } else {
            return buf;
        }
    }
   function parseBinary(arrayBuffer) {
        var reader = new DataView(arrayBuffer);
        var faces = reader.getUint32( 80, true );
        var r, g, b, hasColors = false, colors;
        var defaultR, defaultG, defaultB, alpha;

        // process STL header
        // check for default color in header ("COLOR=rgba" sequence).

        for ( var index = 0; index < 80 - 10; index ++ ) {
            if ( ( reader.getUint32( index, false ) == 0x434F4C4F /*COLO*/ ) &&
                ( reader.getUint8( index + 4 ) == 0x52 /*'R'*/ ) &&
                ( reader.getUint8( index + 5 ) == 0x3D /*'='*/ ) ) {

                hasColors = true;
                colors = [];

                defaultR = reader.getUint8( index + 6 ) / 255;
                defaultG = reader.getUint8( index + 7 ) / 255;
                defaultB = reader.getUint8( index + 8 ) / 255;
                alpha = reader.getUint8( index + 9 ) / 255;
            }
        }

        mesh.vertexCoords = [];
        mesh.normalCoords = [];
        mesh.vertexIndices = [];

        var dataOffset = 84;
        var faceLength = 12 * 4 + 2;

        var elementNormals = [];

        for ( var face = 0; face < faces; face ++ ) {

            var start = dataOffset + face * faceLength;
            var normalX = reader.getFloat32( start, true );
            var normalY = reader.getFloat32( start + 4, true );
            var normalZ = reader.getFloat32( start + 8, true );

            if ( hasColors ) {
                var packedColor = reader.getUint16( start + 48, true );

                if ( ( packedColor & 0x8000 ) === 0 ) {
                    // facet has its own unique color

                    r = ( packedColor & 0x1F ) / 31;
                    g = ( ( packedColor >> 5 ) & 0x1F ) / 31;
                    b = ( ( packedColor >> 10 ) & 0x1F ) / 31;
                } else {
                    r = defaultR;
                    g = defaultG;
                    b = defaultB;
                }
            }

            for ( var i = 1; i <= 3; i ++ ) {

                var vertexstart = start + i * 12;

                var vertexX = reader.getFloat32( vertexstart, true );
                var vertexY = reader.getFloat32( vertexstart + 4, true );
                var vertexZ = reader.getFloat32( vertexstart + 8, true );
                mesh.vertexCoords.push( vertexX, vertexY, vertexZ );

                if ( hasColors ) {
                    colors.push( r, g, b );
                }
            }
            var v1 = vec3.create();
            var v2 = vec3.create();
            var normal = vec3.create();
            v1[0] = mesh.vertexCoords[face*9+3]-mesh.vertexCoords[face*9];
            v1[1] = mesh.vertexCoords[face*9+4]-mesh.vertexCoords[face*9+1];
            v1[2] = mesh.vertexCoords[face*9+5]-mesh.vertexCoords[face*9+2];
            v2[0] = mesh.vertexCoords[face*9+6]-mesh.vertexCoords[face*9];
            v2[1] = mesh.vertexCoords[face*9+7]-mesh.vertexCoords[face*9+1];
            v2[2] = mesh.vertexCoords[face*9+8]-mesh.vertexCoords[face*9+2];
            vec3.cross(v1,v2,normal);
            vec3.normalize(normal);
            elementNormals.push( normalX, normalY, normalZ );
            for ( var i = 1; i <= 3; i ++ ) {
                mesh.normalCoords.push( normal[0], normal[1], normal[2] );
            }
        }
    }
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            var response = request.response;
            if (response.byteLength!=0) {
                var binData = ensureBinary( response );
                parseBinary(binData);
                for (var i = 0; i < mesh.vertexCoords.length/3; i++) {
                    mesh.vertexIndices.push(i);
                }
                if (onreadyfunc) {
                    onreadyfunc.apply(mesh, parameters);
                }
                mesh.isready = true;
                initBuffers();
            }
        }
    }
}
function loadOBJ(filename, mesh, onreadyfunc, parameters) {
    mesh.isready = false;
    var request = new XMLHttpRequest();
    request.open("GET", pathToMeshes+filename, true);
    request.responseType = "arraybuffer";
    request.send();


        var state = {
            objects  : [],
            object   : {},

            vertices : [],
            normals  : [],
            uvs  : [],

            parseVertexIndex: function ( value, len ) {

                var index = parseInt( value, 10 );
                return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;

            },

            parseNormalIndex: function ( value, len ) {

                var index = parseInt( value, 10 );
                return ( index >= 0 ? index - 1 : index + len / 3 ) * 3;

            },

            parseUVIndex: function ( value, len ) {

                var index = parseInt( value, 10 );
                return ( index >= 0 ? index - 1 : index + len / 2 ) * 2;

            },

            addVertex: function ( a, b, c ) {

                var src = this.vertices;
                var dst = mesh.vertexCoords;

                dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );
                dst.push( src[ b + 0 ], src[ b + 1 ], src[ b + 2 ] );
                dst.push( src[ c + 0 ], src[ c + 1 ], src[ c + 2 ] );

            },

            // addVertexLine: function ( a ) {

            //     var src = this.vertices;
            //     var dst = this.object.geometry.vertices;

            //     dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );

            // },

            addNormal: function ( a, b, c ) {

                var src = this.normals;
                var dst = mesh.normalCoords;
                dst.push( src[ a + 0 ], src[ a + 1 ], src[ a + 2 ] );
                dst.push( src[ b + 0 ], src[ b + 1 ], src[ b + 2 ] );
                dst.push( src[ c + 0 ], src[ c + 1 ], src[ c + 2 ] );

            },

            computeNormal: function ( a, b, c ) {

                var src = this.vertices;
                var dst = mesh.normalCoords;
                var v1 = vec3.create();
                var v2 = vec3.create();
                var normal = vec3.create();
                v1[0] = src[b+0]-src[a+0];
                v1[1] = src[b+1]-src[a+1];
                v1[2] = src[b+2]-src[a+2];
                v2[0] = src[c+0]-src[a+0];
                v2[1] = src[c+1]-src[a+1];
                v2[2] = src[c+2]-src[a+2];
                vec3.cross(v1,v2,normal);
                vec3.normalize(normal);
                dst.push( normal[0], normal[1], normal[2] );
                dst.push( normal[0], normal[1], normal[2] );
                dst.push( normal[0], normal[1], normal[2] );
            },

            addUV: function ( a, b, c ) {

                var src = this.uvs;
                var dst = mesh.textureCoords;

                dst.push( src[ a + 0 ], src[ a + 1 ] );
                dst.push( src[ b + 0 ], src[ b + 1 ] );
                dst.push( src[ c + 0 ], src[ c + 1 ] );

            },


            addFace: function ( a, b, c, ua, ub, uc, na, nb, nc ) {

                var vLen = this.vertices.length;

                var ia = this.parseVertexIndex( a, vLen );
                var ib = this.parseVertexIndex( b, vLen );
                var ic = this.parseVertexIndex( c, vLen );

                this.addVertex( ia, ib, ic );

                if ( ua !== undefined ) {

                    var uvLen = this.uvs.length;

                    ia = this.parseUVIndex( ua, uvLen );
                    ib = this.parseUVIndex( ub, uvLen );
                    ic = this.parseUVIndex( uc, uvLen );

                    this.addUV( ia, ib, ic );

                }

                if ( na !== undefined ) {

                    // Normals are many times the same. If so, skip function call and parseInt.
                    var nLen = this.normals.length;
                    ia = this.parseNormalIndex( na, nLen );

                    ib = na === nb ? ia : this.parseNormalIndex( nb, nLen );
                    ic = na === nc ? ia : this.parseNormalIndex( nc, nLen );

                    this.addNormal( ia, ib, ic );

                }
                else {
                    this.computeNormal( ia, ib, ic );
                }
            },
        }
        function parsefile ( text ) {

            mesh.vertexCoords = [];
            mesh.normalCoords = [];
            mesh.textureCoords = [];
            mesh.vertexIndices = [];
            if ( text.indexOf( '\r\n' ) !== - 1 ) {

                // This is faster than String.split with regex that splits on both
                text = text.replace( /\r\n/g, '\n' );

            }

            if ( text.indexOf( '\\\n' ) !== - 1) {

                // join lines separated by a line continuation character (\)
                text = text.replace( /\\\n/g, '' );

            }

            var lines = text.split( '\n' );
            var line = '', lineFirstChar = '';
            var lineLength = 0;
            var result = [];

            // Faster to just trim left side of the line. Use if available.
            var trimLeft = ( typeof ''.trimLeft === 'function' );

            for ( var i = 0, l = lines.length; i < l; i ++ ) {

                line = lines[ i ];

                line = trimLeft ? line.trimLeft() : line.trim();

                lineLength = line.length;

                if ( lineLength === 0 ) continue;

                lineFirstChar = line.charAt( 0 );

                // @todo invoke passed in handler if any
                if ( lineFirstChar === '#' ) continue;

                if ( lineFirstChar === 'v' ) {

                    var data = line.split( /\s+/ );

                    switch ( data[ 0 ] ) {

                        case 'v':
                            // mesh.vertexCoords.push(
                            //     parseFloat( data[ 1 ] ),
                            //     parseFloat( data[ 2 ] ),
                            //     parseFloat( data[ 3 ] )
                            // );
                            // mesh.normalCoords.push(0,0,1 );
                            state.vertices.push(
                                parseFloat( data[ 1 ] ),
                                parseFloat( data[ 2 ] ),
                                parseFloat( data[ 3 ] )
                            );
                            break;
                        case 'vn':
                            // mesh.normalCoords.push(
                            //     parseFloat( data[ 1 ] ),
                            //     parseFloat( data[ 2 ] ),
                            //     parseFloat( data[ 3 ] )
                            // );
                            state.normals.push(
                                parseFloat( data[ 1 ] ),
                                parseFloat( data[ 2 ] ),
                                parseFloat( data[ 3 ] )
                            );
                            break;
                        case 'vt':
                            state.uvs.push(
                                parseFloat( data[ 1 ] ),
                                parseFloat( data[ 2 ] )
                            );
                            break;
                    }

                } else if ( lineFirstChar === 'f' ) {

                    var lineData = line.substr( 1 ).trim();
                    var vertexData = lineData.split( /\s+/ );
                    var faceVertices = [];

                    // Parse the face vertex data into an easy to work with format

                    for ( var j = 0, jl = vertexData.length; j < jl; j ++ ) {

                        var vertex = vertexData[ j ];

                        if ( vertex.length > 0 ) {

                            var vertexParts = vertex.split( '/' );
                            faceVertices.push( vertexParts );

                        }

                    }

                    // Draw an edge between the first vertex and all subsequent vertices to form an n-gon

                    var v1 = faceVertices[ 0 ];

                    for ( var j = 1, jl = faceVertices.length - 1; j < jl; j ++ ) {

                        var v2 = faceVertices[ j ];
                        var v3 = faceVertices[ j + 1 ];

                        state.addFace(
                            v1[ 0 ], v2[ 0 ], v3[ 0 ],
                            v1[ 1 ], v2[ 1 ], v3[ 1 ],
                            v1[ 2 ], v2[ 2 ], v3[ 2 ]
                        );

                    }

                }  else {

                    // Handle null terminated files without exception
                    if ( line === '\0' ) continue;

                }

            }

        }




    function ensureString( buf ) {
        if ( typeof buf !== "string" ) {
            var array_buffer = new Uint8Array( buf );
            var strArray = [];
            for ( var i = 0; i < buf.byteLength; i ++ ) {
                strArray.push(String.fromCharCode( array_buffer[ i ] )); // implicitly assumes little-endian
            }
            return strArray.join('');
        } else {
            return buf;
        }
    }
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            var response = request.response;
            if (response.byteLength!=0) {
                parsefile(ensureString(response));


                for (var i = 0; i < mesh.vertexCoords.length/3; i++) {
                    mesh.vertexIndices.push(i);
                }
                if (onreadyfunc) {
                    onreadyfunc.apply(mesh, parameters);
                }
                mesh.isready = true;
                initBuffers();
            }
        }
    }
}
function initArrow(arr0, arr1, rad, color, indiceBase, startArrow, endArrow, scaling) {
    var vecBegin = vec3.create();
    vec3.subtract(arr1,arr0,vecBegin);
    var vecLen = vec3.length(vecBegin);

    var lenArr = rad*10;
    var radArr = rad*2.5;
    if (!startArrow) startArrow = false;
    if (!endArrow) endArrow = false;
    var slices1 = 1;
    var vertices = [];
    var zoomvectors = [];
    var lCoords = [];

    var u;

    if (startArrow)
    {
        slices1++;
        for (var j = 0; j <= slices; j++) {
            var phi = j*2.0*Math.PI/slices;
            vertices.push( lenArr );
            vertices.push( radArr*Math.cos(phi) );
            vertices.push( radArr*Math.sin(phi) );
            if (!scaling) {
                zoomvectors.push( 0, 0, 0 );
            } else {
                zoomvectors.push( lenArr );
                zoomvectors.push( radArr*Math.cos(phi) );
                zoomvectors.push( radArr*Math.sin(phi) );
            }
            lCoords.push( 0.0 );
        }
        for (var j = 0; j <= slices; j++) {
            var phi = j*2.0*Math.PI/slices;
            vertices.push( lenArr );
            vertices.push( rad*Math.cos(phi) );
            vertices.push( rad*Math.sin(phi) );
            if (!scaling) {
                zoomvectors.push( 0, 0, 0 );
            } else {
                zoomvectors.push( lenArr );
                zoomvectors.push( rad*Math.cos(phi) );
                zoomvectors.push( rad*Math.sin(phi) );
            }
            lCoords.push( 0.0 );
        }
    }
    else
    {
        for (var j = 0; j <= slices; j++) {
            var phi = j*2.0*Math.PI/slices;
            vertices.push( 0.0 );
            vertices.push( rad*Math.cos(phi) );
            vertices.push( rad*Math.sin(phi) );
            if (!scaling) {
                zoomvectors.push( 0, 0, 0 );
            } else {
                zoomvectors.push( 0.0 );
                zoomvectors.push( rad*Math.cos(phi) );
                zoomvectors.push( rad*Math.sin(phi) );
            }
            lCoords.push( 0.0 );
        }
    }

    if (endArrow)
    {
        slices1++;
        for (var j = 0; j <= slices; j++) {
            var phi = j*2.0*Math.PI/slices;
            vertices.push( vecLen-lenArr );
            vertices.push( rad*Math.cos(phi) );
            vertices.push( rad*Math.sin(phi) );
            if (!scaling) {
                zoomvectors.push( 0, 0, 0 );
            } else {
                zoomvectors.push( -lenArr );
                zoomvectors.push( rad*Math.cos(phi) );
                zoomvectors.push( rad*Math.sin(phi) );
            }
            lCoords.push( 0.0 );
        }
        for (var j = 0; j <= slices; j++) {
            var phi = j*2.0*Math.PI/slices;
            vertices.push( vecLen-lenArr );
            vertices.push( radArr*Math.cos(phi) );
            vertices.push( radArr*Math.sin(phi) );
            if (!scaling) {
                zoomvectors.push( 0, 0, 0 );
            } else {
                zoomvectors.push( -lenArr );
                zoomvectors.push( radArr*Math.cos(phi) );
                zoomvectors.push( radArr*Math.sin(phi) );
            }
            lCoords.push( 0.0 );
        }
    }
    else
    {
        for (var j = 0; j <= slices; j++) {
            var phi = j*2.0*Math.PI/slices;
            vertices.push( vecLen );
            vertices.push( rad*Math.cos(phi) );
            vertices.push( rad*Math.sin(phi) );
            if (!scaling) {
                zoomvectors.push( 0, 0, 0 );
            } else {
                zoomvectors.push( 0.0 );
                zoomvectors.push( rad*Math.cos(phi) );
                zoomvectors.push( rad*Math.sin(phi) );
            }
            lCoords.push( 0.0 );
        }
    }

    vertices.push( 0.0 );
    vertices.push( 0.0 );
    vertices.push( 0.0 );
    vertices.push( vecLen );
    vertices.push( 0.0 );
    vertices.push( 0.0 );

    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );

    lCoords.push( 0.0 );
    lCoords.push( 0.0 );

    vec3.scale(vecBegin, 1.0/vecLen);
    var newX = vec3.create(vecBegin);

    var vecEnd = vec3.create([0,0,0]);
    var minAxis = 0;
    for (var i = 1; i < 3; i++) {
        if (Math.abs(newX[minAxis])>Math.abs(newX[i])) {minAxis=i;}
    }
    vecEnd[minAxis] = 1;
    var newZ = vec3.create();
    vec3.cross(newX,vecEnd,newZ);
    vec3.normalize(newZ);
    var newY = vec3.create();
    vec3.cross(newZ,newX,newY);
    vec3.normalize(newY);

    var rot1 = [newX[0],newX[1],newX[2],newY[0],newY[1],newY[2],newZ[0],newZ[1],newZ[2]];

    var v1 = vec3.create();
    for (var i = 0; i < vertices.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = vertices[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        vec3.add(v1,arr0);
        for (var j = 0; j < 3; j++) {
           vertices[i*3+j] = v1[j];
        }
    }
    for (var i = 0; i < zoomvectors.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = zoomvectors[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        for (var j = 0; j < 3; j++) {
           zoomvectors[i*3+j] = v1[j];
        }
    }

    var colors = [];
    for (var i=0; i < vertices.length/3; i++) {
        colors.push(color[0],color[1],color[2],color[3]);
    }

    var indices = [];
    for (var i=0; i < slices1; i++) {
        for (var j=0; j < slices; j++) {
           indices.push(indiceBase+i*(slices+1)+j,       indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
           indices.push(indiceBase+(i+1)*(slices+1)+j+1, indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
        }
    }
    for (var j=0; j < slices; j++) {
       indices.push(indiceBase+j,       indiceBase+j+1, indiceBase+(slices1+1)*(slices+1));
       indices.push(indiceBase+slices1*(slices+1)+j,       indiceBase+slices1*(slices+1)+j+1, indiceBase+(slices1+1)*(slices+1)+1);
    }
    return [vertices,colors,indices,zoomvectors,lCoords];
}


function initCone2(arr0, arr1, rad, color, indiceBase) {
    var vecBegin = vec3.create();
    vec3.subtract(arr1,arr0,vecBegin);
    var vecLen = vec3.length(vecBegin);

    var lenArr = rad*10;
    var radArr = rad*2.5;

    var slices1 = 0;
    var vertices = [];
    var zoomvectors = [];
    var lCoords = [];

    var u;

    for (var j = 0; j <= slices; j++) {
        var phi = j*2.0*Math.PI/slices;
        vertices.push( -lenArr/2 );
        vertices.push( radArr*Math.cos(phi) );
        vertices.push( radArr*Math.sin(phi) );
        zoomvectors.push( -lenArr/2 );
        zoomvectors.push( radArr*Math.cos(phi) );
        zoomvectors.push( radArr*Math.sin(phi) );
        lCoords.push( 0.0 );
    }

    vertices.push( -lenArr/2 );
    vertices.push( 0.0 );
    vertices.push( 0.0 );
    vertices.push( lenArr/2 );
    vertices.push( 0.0 );
    vertices.push( 0.0 );

    zoomvectors.push( -lenArr/2 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( lenArr/2 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );

    lCoords.push( 0.0 );
    lCoords.push( 0.0 );

    vec3.scale(vecBegin, 1.0/vecLen);
    var newX = vec3.create(vecBegin);

    var vecEnd = vec3.create([0,0,0]);
    var minAxis = 0;
    for (var i = 1; i < 3; i++) {
        if (Math.abs(newX[minAxis])>Math.abs(newX[i])) {minAxis=i;}
    }
    vecEnd[minAxis] = 1;
    var newZ = vec3.create();
    vec3.cross(newX,vecEnd,newZ);
    vec3.normalize(newZ);
    var newY = vec3.create();
    vec3.cross(newZ,newX,newY);
    vec3.normalize(newY);

    var rot1 = [newX[0],newX[1],newX[2],newY[0],newY[1],newY[2],newZ[0],newZ[1],newZ[2]];

    var v1 = vec3.create();
    for (var i = 0; i < vertices.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = vertices[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        vec3.add(v1,arr0);
        for (var j = 0; j < 3; j++) {
           vertices[i*3+j] = v1[j];
        }
    }
    for (var i = 0; i < zoomvectors.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = zoomvectors[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        for (var j = 0; j < 3; j++) {
           zoomvectors[i*3+j] = v1[j];
        }
    }

    var colors = [];
    for (var i=0; i < vertices.length/3; i++) {
        colors.push(color[0],color[1],color[2],color[3]);
    }

    var indices = [];
    // for (var i=0; i < slices1; i++) {
    //     for (var j=0; j < slices; j++) {
    //        indices.push(indiceBase+i*(slices+1)+j,       indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
    //        indices.push(indiceBase+(i+1)*(slices+1)+j+1, indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
    //     }
    // }
    for (var j=0; j < slices; j++) {
       indices.push(indiceBase+j,       indiceBase+j+1, indiceBase+slices+1);
       indices.push(indiceBase+j,       indiceBase+j+1, indiceBase+slices+1+1);
    }
    return [vertices,colors,indices,zoomvectors,lCoords];
}
function initCone1(arr0, arr1, rad, color, indiceBase) {
    var vecBegin = vec3.create();
    vec3.subtract(arr1,arr0,vecBegin);
    var vecLen = vec3.length(vecBegin);

    var lenArr = rad*10;
    var radArr = rad*2.5;

    var slices1 = 0;
    var vertices = [];
    var zoomvectors = [];
    var lCoords = [];

    var u;

    for (var j = 0; j <= slices; j++) {
        var phi = j*2.0*Math.PI/slices;
        vertices.push( lenArr );
        vertices.push( radArr*Math.cos(phi) );
        vertices.push( radArr*Math.sin(phi) );
        zoomvectors.push( lenArr );
        zoomvectors.push( radArr*Math.cos(phi) );
        zoomvectors.push( radArr*Math.sin(phi) );
        lCoords.push( 0.0 );
    }

    vertices.push( 0.0 );
    vertices.push( 0.0 );
    vertices.push( 0.0 );
    vertices.push( lenArr );
    vertices.push( 0.0 );
    vertices.push( 0.0 );

    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( lenArr );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );

    lCoords.push( 0.0 );
    lCoords.push( 0.0 );

    vec3.scale(vecBegin, 1.0/vecLen);
    var newX = vec3.create(vecBegin);

    var vecEnd = vec3.create([0,0,0]);
    var minAxis = 0;
    for (var i = 1; i < 3; i++) {
        if (Math.abs(newX[minAxis])>Math.abs(newX[i])) {minAxis=i;}
    }
    vecEnd[minAxis] = 1;
    var newZ = vec3.create();
    vec3.cross(newX,vecEnd,newZ);
    vec3.normalize(newZ);
    var newY = vec3.create();
    vec3.cross(newZ,newX,newY);
    vec3.normalize(newY);

    var rot1 = [newX[0],newX[1],newX[2],newY[0],newY[1],newY[2],newZ[0],newZ[1],newZ[2]];

    var v1 = vec3.create();
    for (var i = 0; i < vertices.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = vertices[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        vec3.add(v1,arr0);
        for (var j = 0; j < 3; j++) {
           vertices[i*3+j] = v1[j];
        }
    }
    for (var i = 0; i < zoomvectors.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = zoomvectors[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        for (var j = 0; j < 3; j++) {
           zoomvectors[i*3+j] = v1[j];
        }
    }

    var colors = [];
    for (var i=0; i < vertices.length/3; i++) {
        colors.push(color[0],color[1],color[2],color[3]);
    }

    var indices = [];
    // for (var i=0; i < slices1; i++) {
    //     for (var j=0; j < slices; j++) {
    //        indices.push(indiceBase+i*(slices+1)+j,       indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
    //        indices.push(indiceBase+(i+1)*(slices+1)+j+1, indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
    //     }
    // }
    for (var j=0; j < slices; j++) {
       indices.push(indiceBase+j,       indiceBase+j+1, indiceBase+slices+1);
       indices.push(indiceBase+j,       indiceBase+j+1, indiceBase+slices+1+1);
    }
    return [vertices,colors,indices,zoomvectors,lCoords];
}
function initCone(arr0, arr1, rad, color, indiceBase) {
    var vecBegin = vec3.create();
    vec3.subtract(arr1,arr0,vecBegin);
    var vecLen = vec3.length(vecBegin);

    var lenArr = rad*10;
    var radArr = rad*2.5;

    var slices1 = 0;
    var vertices = [];
    var zoomvectors = [];
    var lCoords = [];

    var u;

    for (var j = 0; j <= slices; j++) {
        var phi = j*2.0*Math.PI/slices;
        vertices.push( 0.0 );
        vertices.push( radArr*Math.cos(phi) );
        vertices.push( radArr*Math.sin(phi) );
        zoomvectors.push( 0.0 );
        zoomvectors.push( radArr*Math.cos(phi) );
        zoomvectors.push( radArr*Math.sin(phi) );
        lCoords.push( 0.0 );
    }

    vertices.push( 0.0 );
    vertices.push( 0.0 );
    vertices.push( 0.0 );
    vertices.push( lenArr );
    vertices.push( 0.0 );
    vertices.push( 0.0 );

    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( lenArr );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );

    lCoords.push( 0.0 );
    lCoords.push( 0.0 );

    vec3.scale(vecBegin, 1.0/vecLen);
    var newX = vec3.create(vecBegin);

    var vecEnd = vec3.create([0,0,0]);
    var minAxis = 0;
    for (var i = 1; i < 3; i++) {
        if (Math.abs(newX[minAxis])>Math.abs(newX[i])) {minAxis=i;}
    }
    vecEnd[minAxis] = 1;
    var newZ = vec3.create();
    vec3.cross(newX,vecEnd,newZ);
    vec3.normalize(newZ);
    var newY = vec3.create();
    vec3.cross(newZ,newX,newY);
    vec3.normalize(newY);

    var rot1 = [newX[0],newX[1],newX[2],newY[0],newY[1],newY[2],newZ[0],newZ[1],newZ[2]];

    var v1 = vec3.create();
    for (var i = 0; i < vertices.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = vertices[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        vec3.add(v1,arr0);
        for (var j = 0; j < 3; j++) {
           vertices[i*3+j] = v1[j];
        }
    }
    for (var i = 0; i < zoomvectors.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = zoomvectors[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        for (var j = 0; j < 3; j++) {
           zoomvectors[i*3+j] = v1[j];
        }
    }

    var colors = [];
    for (var i=0; i < vertices.length/3; i++) {
        colors.push(color[0],color[1],color[2],color[3]);
    }

    var indices = [];
    // for (var i=0; i < slices1; i++) {
    //     for (var j=0; j < slices; j++) {
    //        indices.push(indiceBase+i*(slices+1)+j,       indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
    //        indices.push(indiceBase+(i+1)*(slices+1)+j+1, indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
    //     }
    // }
    for (var j=0; j < slices; j++) {
       indices.push(indiceBase+j,       indiceBase+j+1, indiceBase+slices+1);
       indices.push(indiceBase+j,       indiceBase+j+1, indiceBase+slices+1+1);
    }
    return [vertices,colors,indices,zoomvectors,lCoords];
}
function initLine(arr0, arr1, rad, color, indiceBase) {
    var vecBegin = vec3.create();
    vec3.subtract(arr1,arr0,vecBegin);
    var vecLen = vec3.length(vecBegin);

    // if (isMaintainArrowRadius) {
    //     rad *= lineWidthScale;
    // }

    var slices1 = 1;
    // var slices1 = Math.ceil(slicesPerRadian*angle);
    var vertices = [];
    var zoomvectors = [];
    var lCoords = [];

    for (var i = 0; i <= slices1; i++) {
        var u = i*vecLen/slices1;
        for (var j = 0; j <= slices; j++) {
            var phi = j*2.0*Math.PI/slices;
            vertices.push( u );
            vertices.push( rad*Math.cos(phi) );
            vertices.push( rad*Math.sin(phi) );
            zoomvectors.push( 0.0 );
            zoomvectors.push( rad*Math.cos(phi) );
            zoomvectors.push( rad*Math.sin(phi) );
            lCoords.push( 0.0 );
        }
    }
    vertices.push( 0.0 );
    vertices.push( 0.0 );
    vertices.push( 0.0 );
    vertices.push( vecLen );
    vertices.push( 0.0 );
    vertices.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    lCoords.push( 0.0 );
    lCoords.push( 0.0 );

    vec3.scale(vecBegin, 1.0/vecLen);
    var newX = vec3.create(vecBegin);

    var vecEnd = vec3.create([0,0,0]);
    var minAxis = 0;
    for (var i = 1; i < 3; i++) {
        if (Math.abs(newX[minAxis])>Math.abs(newX[i])) {minAxis=i;}
    }
    vecEnd[minAxis] = 1;
    var newZ = vec3.create();
    vec3.cross(newX,vecEnd,newZ);
    vec3.normalize(newZ);
    var newY = vec3.create();
    vec3.cross(newZ,newX,newY);
    vec3.normalize(newY);

    var rot1 = [newX[0],newX[1],newX[2],newY[0],newY[1],newY[2],newZ[0],newZ[1],newZ[2]];
    var v1 = vec3.create();
    for (var i = 0; i < vertices.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = vertices[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        vec3.add(v1,arr0);
        for (var j = 0; j < 3; j++) {
           vertices[i*3+j] = v1[j];
        }
    }
    for (var i = 0; i < zoomvectors.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = zoomvectors[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        for (var j = 0; j < 3; j++) {
           zoomvectors[i*3+j] = v1[j];
        }
    }

    var colors = [];
    for (var i=0; i < vertices.length/3; i++) {
        colors.push(color[0],color[1],color[2],color[3]);
    }

    var indices = [];
    for (var i=0; i < slices1; i++) {
        for (var j=0; j < slices; j++) {
           indices.push(indiceBase+i*(slices+1)+j,       indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
           indices.push(indiceBase+(i+1)*(slices+1)+j+1, indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
        }
    }
    for (var j=0; j < slices; j++) {
       indices.push(indiceBase+j,       indiceBase+j+1, indiceBase+(slices1+1)*(slices+1));
       indices.push(indiceBase+slices1*(slices+1)+j,       indiceBase+slices1*(slices+1)+j+1, indiceBase+(slices1+1)*(slices+1)+1);
    }
    // indiceBase += vertices.length/3;
    // console.log(vertices);
    return [vertices,colors,indices,zoomvectors,lCoords];
}
function initDashedLine(arr0, arr1, rad, color, indiceBase) {
    var vecBegin = vec3.create();
    vec3.subtract(arr1,arr0,vecBegin);
    var vecLen = vec3.length(vecBegin);

    // if (isMaintainArrowRadius) {
    //     rad *= lineWidthScale;
    // }

    var slices1 = 1;
    // var slices1 = Math.ceil(slicesPerRadian*angle);
    var vertices = [];
    var zoomvectors = [];
    var lCoords = [];

    for (var i = 0; i <= slices1; i++) {
        var u = i*vecLen/slices1;
        for (var j = 0; j <= slices; j++) {
            var phi = j*2.0*Math.PI/slices;
            vertices.push( u );
            vertices.push( rad*Math.cos(phi) );
            vertices.push( rad*Math.sin(phi) );
            zoomvectors.push( 0.0 );
            zoomvectors.push( rad*Math.cos(phi) );
            zoomvectors.push( rad*Math.sin(phi) );
            lCoords.push( u-vecLen/2 );
        }
    }
    vertices.push( 0.0 );
    vertices.push( 0.0 );
    vertices.push( 0.0 );
    vertices.push( vecLen );
    vertices.push( 0.0 );
    vertices.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    lCoords.push( -vecLen/2 );
    lCoords.push( vecLen/2 );

    vec3.scale(vecBegin, 1.0/vecLen);
    var newX = vec3.create(vecBegin);

    var vecEnd = vec3.create([0,0,0]);
    var minAxis = 0;
    for (var i = 1; i < 3; i++) {
        if (Math.abs(newX[minAxis])>Math.abs(newX[i])) {minAxis=i;}
    }
    vecEnd[minAxis] = 1;
    var newZ = vec3.create();
    vec3.cross(newX,vecEnd,newZ);
    vec3.normalize(newZ);
    var newY = vec3.create();
    vec3.cross(newZ,newX,newY);
    vec3.normalize(newY);

    var rot1 = [newX[0],newX[1],newX[2],newY[0],newY[1],newY[2],newZ[0],newZ[1],newZ[2]];
    var v1 = vec3.create();
    for (var i = 0; i < vertices.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = vertices[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        vec3.add(v1,arr0);
        for (var j = 0; j < 3; j++) {
           vertices[i*3+j] = v1[j];
        }
    }
    for (var i = 0; i < zoomvectors.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = zoomvectors[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        for (var j = 0; j < 3; j++) {
           zoomvectors[i*3+j] = v1[j];
        }
    }

    var colors = [];
    for (var i=0; i < vertices.length/3; i++) {
        colors.push(color[0],color[1],color[2],color[3]);
    }

    var indices = [];
    for (var i=0; i < slices1; i++) {
        for (var j=0; j < slices; j++) {
           indices.push(indiceBase+i*(slices+1)+j,       indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
           indices.push(indiceBase+(i+1)*(slices+1)+j+1, indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
        }
    }
    for (var j=0; j < slices; j++) {
       indices.push(indiceBase+j,       indiceBase+j+1, indiceBase+(slices1+1)*(slices+1));
       indices.push(indiceBase+slices1*(slices+1)+j,       indiceBase+slices1*(slices+1)+j+1, indiceBase+(slices1+1)*(slices+1)+1);
    }
    // indiceBase += vertices.length/3;
    // console.log(vertices);
    return [vertices,colors,indices,zoomvectors,lCoords];
}
function initDash1(arr0, arr1, len, rad, color, indiceBase) {
    var mass;
    var vecUp = vec3.create();
    var vecDown = vec3.create();
    // if (isMaintainArrowRadius) {
    //     len *= lineWidthScale;
    // }
    vec3.subtract(arr1,arr0,vecUp);
    vec3.normalize(vecUp);
    vec3.scale(vecUp, len);
    vec3.scale(vecUp, -1, vecDown);
    vec3.add(vecUp, arr0);
    vec3.add(vecDown, arr0);
    mass = initLine(vecDown, vecUp, rad, color, indiceBase);
    return mass;
}
function initDash(arr0, arr1, rad, color, indiceBase) {
    var vecBegin = vec3.create();
    vec3.subtract(arr1,arr0,vecBegin);
    var vecLen = vec3.length(vecBegin);

    // if (isMaintainArrowRadius) {
    //     rad *= lineWidthScale;
    // }

    var slices1 = 1;
    // var slices1 = Math.ceil(slicesPerRadian*angle);
    var vertices = [];
    var zoomvectors = [];
    var lCoords = [];

    for (var i = 0; i <= slices1; i++) {
        var u = i*vecLen/slices1;
        for (var j = 0; j <= slices; j++) {
            var phi = j*2.0*Math.PI/slices;
            vertices.push( u );
            vertices.push( rad*Math.cos(phi) );
            vertices.push( rad*Math.sin(phi) );
            zoomvectors.push( u-vecLen/2 );
            zoomvectors.push( rad*Math.cos(phi) );
            zoomvectors.push( rad*Math.sin(phi) );
            lCoords.push( 0.0 );
        }
    }
    vertices.push( 0.0 );
    vertices.push( 0.0 );
    vertices.push( 0.0 );
    vertices.push( vecLen );
    vertices.push( 0.0 );
    vertices.push( 0.0 );
    zoomvectors.push( -vecLen/2  );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( vecLen/2  );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    lCoords.push( 0.0 );
    lCoords.push( 0.0 );

    vec3.scale(vecBegin, 1.0/vecLen);
    var newX = vec3.create(vecBegin);

    var vecEnd = vec3.create([0,0,0]);
    var minAxis = 0;
    for (var i = 1; i < 3; i++) {
        if (Math.abs(newX[minAxis])>Math.abs(newX[i])) {minAxis=i;}
    }
    vecEnd[minAxis] = 1;
    var newZ = vec3.create();
    vec3.cross(newX,vecEnd,newZ);
    vec3.normalize(newZ);
    var newY = vec3.create();
    vec3.cross(newZ,newX,newY);
    vec3.normalize(newY);

    var rot1 = [newX[0],newX[1],newX[2],newY[0],newY[1],newY[2],newZ[0],newZ[1],newZ[2]];
    var v1 = vec3.create();
    for (var i = 0; i < vertices.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = vertices[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        vec3.add(v1,arr0);
        for (var j = 0; j < 3; j++) {
           vertices[i*3+j] = v1[j];
        }
    }
    for (var i = 0; i < zoomvectors.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = zoomvectors[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        for (var j = 0; j < 3; j++) {
           zoomvectors[i*3+j] = v1[j];
        }
    }

    var colors = [];
    for (var i=0; i < vertices.length/3; i++) {
        colors.push(color[0],color[1],color[2],color[3]);
    }

    var indices = [];
    for (var i=0; i < slices1; i++) {
        for (var j=0; j < slices; j++) {
           indices.push(indiceBase+i*(slices+1)+j,       indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
           indices.push(indiceBase+(i+1)*(slices+1)+j+1, indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
        }
    }
    for (var j=0; j < slices; j++) {
       indices.push(indiceBase+j,       indiceBase+j+1, indiceBase+(slices1+1)*(slices+1));
       indices.push(indiceBase+slices1*(slices+1)+j,       indiceBase+slices1*(slices+1)+j+1, indiceBase+(slices1+1)*(slices+1)+1);
    }
    // indiceBase += vertices.length/3;
    // console.log(vertices);
    return [vertices,colors,indices,zoomvectors,lCoords];
}
function initDashedLine1(arr0, arr1, rad, color, indiceBase) {
    // rad*=10;
    var vertices = [];
    var colors = [];
    var indices = [];
    var zoomvectors = [];
    var lCoords = [];
    var mass;
    var vecBegin = vec3.create();
    vec3.subtract(arr1,arr0,vecBegin);
    var vecLen = vec3.length(vecBegin);
    vec3.scale(vecBegin, 1.0/vecLen);

    var dashLen = rad*10;
    var spaceLen = rad*7;
    // if (isMaintainArrowRadius) {
    //     dashLen *= lineWidthScale;
    //     spaceLen *= lineWidthScale;
    // }
    var st = vec3.create();
    var fn = vec3.create();
    var dashCount = Math.ceil(vecLen/(dashLen+spaceLen));
    for (var idash = 0; idash < dashCount; idash++) {
        var u1 = idash*(dashLen+spaceLen);
        vec3.scale(vecBegin,u1,st);
        vec3.add(st,arr0);
        var u2 = u1+dashLen>vecLen ? vecLen : u1+dashLen;
        vec3.scale(vecBegin,u2,fn);
        vec3.add(fn,arr0);
        mass = initLine(st, fn, rad, color, indiceBase);
        Array.prototype.push.apply(vertices, mass[0]);
        Array.prototype.push.apply(colors, mass[1]);
        Array.prototype.push.apply(indices, mass[2]);
        Array.prototype.push.apply(zoomvectors, mass[3]);
        Array.prototype.push.apply(lCoords, mass[4]);
    }

    return [vertices,colors,indices,zoomvectors,lCoords];
}
function multiplyMat3Vec3(a, b, c) {
    c || (c = b);
    var d = b[0],
        e = b[1],
        b = b[2];
    c[0] = a[0] * d + a[3] * e + a[6] * b;
    c[1] = a[1] * d + a[4] * e + a[7] * b;
    c[2] = a[2] * d + a[5] * e + a[8] * b;
    return c
};
function initTorusArrow(arr0, arr1, arr2, Rad, rad, color, indiceBase) {
    var vecBegin = vec3.create();
    var vecEnd = vec3.create();
    vec3.subtract(arr1,arr0,vecBegin);
    vec3.subtract(arr2,arr0,vecEnd);
    vec3.normalize(vecBegin);
    vec3.normalize(vecEnd);

    var cosTheta = vec3.dot(vecBegin,vecEnd);

    // if (isMaintainArrowRadius) {
    //     rad *= lineWidthScale;
    //     // Rad *= lineWidthScale;
    // }

    var lenArrAng = rad*10/Rad;
    console.log(lenArrAng);
    var radArr = rad*2.5;

    var angle = Math.acos(cosTheta);
    var slicesPerRadian = 8;

    var slices1 = Math.ceil(slicesPerRadian*angle);
    var vertices = [];
    var zoomvectors = [];
    var lCoords = [];

    for (var j = 0; j <= slices; j++) {
        var phi = j*2.0*Math.PI/slices;
        vertices.push( (Rad+radArr*Math.cos(phi))*Math.cos(lenArrAng) );
        vertices.push( (Rad+radArr*Math.cos(phi))*Math.sin(lenArrAng) );
        vertices.push( radArr*Math.sin(phi) );
        zoomvectors.push( (Rad+radArr*Math.cos(phi))*Math.cos(lenArrAng)-(Rad)*Math.cos(0) );
        zoomvectors.push( (Rad+radArr*Math.cos(phi))*Math.sin(lenArrAng)-(Rad)*Math.sin(0) );
        zoomvectors.push( radArr*Math.sin(phi) );
        lCoords.push( 0.0 );
    }
    for (var j = 0; j <= slices; j++) {
        var phi = j*2.0*Math.PI/slices;
        vertices.push( (Rad+rad*Math.cos(phi))*Math.cos(lenArrAng) );
        vertices.push( (Rad+rad*Math.cos(phi))*Math.sin(lenArrAng) );
        vertices.push( rad*Math.sin(phi) );
        zoomvectors.push( (Rad+rad*Math.cos(phi))*Math.cos(lenArrAng)-(Rad)*Math.cos(0) );
        zoomvectors.push( (Rad+rad*Math.cos(phi))*Math.sin(lenArrAng)-(Rad)*Math.sin(0) );
        zoomvectors.push( rad*Math.sin(phi) );
        lCoords.push( 0.0 );
    }
    for (var i = 1; i <= slices1; i++) {
        var psi = lenArrAng+i/slices1*(angle-lenArrAng);
        for (var j = 0; j <= slices; j++) {
            var phi = j*2.0*Math.PI/slices;
            vertices.push( (Rad+rad*Math.cos(phi))*Math.cos(psi) );
            vertices.push( (Rad+rad*Math.cos(phi))*Math.sin(psi) );
            vertices.push( rad*Math.sin(phi) );
            zoomvectors.push( (rad*Math.cos(phi))*Math.cos(psi) );
            zoomvectors.push( (rad*Math.cos(phi))*Math.sin(psi) );
            zoomvectors.push( rad*Math.sin(phi) );
            lCoords.push( 0.0 );
        }
    }
    slices1++;
    vertices.push( Rad*Math.cos(0) );
    vertices.push( Rad*Math.sin(0) );
    vertices.push( 0.0 );
    vertices.push( Rad*Math.cos(angle) );
    vertices.push( Rad*Math.sin(angle) );
    vertices.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    lCoords.push( 0.0 );
    lCoords.push( 0.0 );

    var newX = vec3.create(vecBegin);
    var newZ = vec3.create();
    vec3.cross(newX,vecEnd,newZ);
    vec3.normalize(newZ);
    var newY = vec3.create();
    vec3.cross(newZ,newX,newY);
    vec3.normalize(newY);

    var rot1 = [newX[0],newX[1],newX[2],newY[0],newY[1],newY[2],newZ[0],newZ[1],newZ[2]];

    var v1 = vec3.create();
    for (var i = 0; i < vertices.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = vertices[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        vec3.add(v1,arr0);
        for (var j = 0; j < 3; j++) {
           vertices[i*3+j] = v1[j];
        }
    }
    for (var i = 0; i < zoomvectors.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = zoomvectors[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        for (var j = 0; j < 3; j++) {
           zoomvectors[i*3+j] = v1[j];
        }
    }

    var colors = [];
    for (var i=0; i < vertices.length/3; i++) {
        colors.push(color[0],color[1],color[2],color[3]);
    }

    var indices = [];
    for (var i=0; i < slices1; i++) {
        for (var j=0; j < slices; j++) {
           indices.push(indiceBase+i*(slices+1)+j,       indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
           indices.push(indiceBase+(i+1)*(slices+1)+j+1, indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
        }
    }
    for (var j=0; j < slices; j++) {
       indices.push(indiceBase+j,       indiceBase+j+1, indiceBase+(slices1+1)*(slices+1));
       indices.push(indiceBase+slices1*(slices+1)+j,       indiceBase+slices1*(slices+1)+j+1, indiceBase+(slices1+1)*(slices+1)+1);
    }
    // indiceBase += vertices.length/3;
    // console.log(vertices);
    return [vertices,colors,indices,zoomvectors,lCoords];
}
function initTorus(arr0, arr1, arr2, Rad, rad, color, indiceBase) {
    var vecBegin = vec3.create();
    var vecEnd = vec3.create();
    vec3.subtract(arr1,arr0,vecBegin);
    vec3.subtract(arr2,arr0,vecEnd);
    vec3.normalize(vecBegin);
    vec3.normalize(vecEnd);

    // var cosTheta = vec3.dot(vecBegin,vecEnd);

    // if (isMaintainArrowRadius) {
    //     rad *= lineWidthScale;
    //     // Rad *= lineWidthScale;
    // }

    // var angle = Math.acos(cosTheta);
    var angle = 2.0*Math.PI;
    var slicesPerRadian = 8;

    var slices1 = Math.ceil(slicesPerRadian*angle);
    var vertices = [];
    var zoomvectors = [];
    var lCoords = [];

    for (var i = 0; i <= slices1; i++) {
        var psi = i*angle/slices1;
        for (var j = 0; j <= slices; j++) {
            var phi = j*2.0*Math.PI/slices;
            vertices.push( (Rad+rad*Math.cos(phi))*Math.cos(psi) );
            vertices.push( (Rad+rad*Math.cos(phi))*Math.sin(psi) );
            vertices.push( rad*Math.sin(phi) );
            zoomvectors.push( (rad*Math.cos(phi))*Math.cos(psi) );
            zoomvectors.push( (rad*Math.cos(phi))*Math.sin(psi) );
            zoomvectors.push( rad*Math.sin(phi) );
            lCoords.push( 0.0 );
        }
    }
    // vertices.push( Rad*Math.cos(0) );
    // vertices.push( Rad*Math.sin(0) );
    // vertices.push( 0.0 );
    // vertices.push( Rad*Math.cos(angle) );
    // vertices.push( Rad*Math.sin(angle) );
    // vertices.push( 0.0 );
    // zoomvectors.push( 0.0 );
    // zoomvectors.push( 0.0 );
    // zoomvectors.push( 0.0 );
    // zoomvectors.push( 0.0 );
    // zoomvectors.push( 0.0 );
    // zoomvectors.push( 0.0 );
    // lCoords.push( 0.0 );
    // lCoords.push( 0.0 );

    var newX = vec3.create(vecBegin);
    var newZ = vec3.create();
    vec3.cross(newX,vecEnd,newZ);
    vec3.normalize(newZ);
    var newY = vec3.create();
    vec3.cross(newZ,newX,newY);
    vec3.normalize(newY);

    var rot1 = [newX[0],newX[1],newX[2],newY[0],newY[1],newY[2],newZ[0],newZ[1],newZ[2]];

    var v1 = vec3.create();
    for (var i = 0; i < vertices.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = vertices[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        vec3.add(v1,arr0);
        for (var j = 0; j < 3; j++) {
           vertices[i*3+j] = v1[j];
        }
    }
    for (var i = 0; i < zoomvectors.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = zoomvectors[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        for (var j = 0; j < 3; j++) {
           zoomvectors[i*3+j] = v1[j];
        }
    }

    var colors = [];
    for (var i=0; i < vertices.length/3; i++) {
        colors.push(color[0],color[1],color[2],color[3]);
    }

    var indices = [];
    for (var i=0; i < slices1; i++) {
        for (var j=0; j < slices; j++) {
           indices.push(indiceBase+i*(slices+1)+j,       indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
           indices.push(indiceBase+(i+1)*(slices+1)+j+1, indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
        }
    }
    // for (var j=0; j < slices; j++) {
    //    indices.push(indiceBase+j,       indiceBase+j+1, indiceBase+(slices1+1)*(slices+1));
    //    indices.push(indiceBase+slices1*(slices+1)+j,       indiceBase+slices1*(slices+1)+j+1, indiceBase+(slices1+1)*(slices+1)+1);
    // }
    // indiceBase += vertices.length/3;
    // console.log(vertices);
    return [vertices,colors,indices,zoomvectors,lCoords];
}
function initTorusArc(arr0, arr1, arr2, Rad, rad, color, indiceBase) {
    var vecBegin = vec3.create();
    var vecEnd = vec3.create();
    vec3.subtract(arr1,arr0,vecBegin);
    vec3.subtract(arr2,arr0,vecEnd);
    vec3.normalize(vecBegin);
    vec3.normalize(vecEnd);

    var cosTheta = vec3.dot(vecBegin,vecEnd);

    // if (isMaintainArrowRadius) {
    //     rad *= lineWidthScale;
    //     // Rad *= lineWidthScale;
    // }

    var angle = Math.acos(cosTheta);
    var slicesPerRadian = 8;

    var slices1 = Math.ceil(slicesPerRadian*angle);
    var vertices = [];
    var zoomvectors = [];
    var lCoords = [];

    for (var i = 0; i <= slices1; i++) {
        var psi = i*angle/slices1;
        for (var j = 0; j <= slices; j++) {
            var phi = j*2.0*Math.PI/slices;
            vertices.push( (Rad+rad*Math.cos(phi))*Math.cos(psi) );
            vertices.push( (Rad+rad*Math.cos(phi))*Math.sin(psi) );
            vertices.push( rad*Math.sin(phi) );
            zoomvectors.push( (rad*Math.cos(phi))*Math.cos(psi) );
            zoomvectors.push( (rad*Math.cos(phi))*Math.sin(psi) );
            zoomvectors.push( rad*Math.sin(phi) );
            lCoords.push( 0.0 );
        }
    }
    vertices.push( Rad*Math.cos(0) );
    vertices.push( Rad*Math.sin(0) );
    vertices.push( 0.0 );
    vertices.push( Rad*Math.cos(angle) );
    vertices.push( Rad*Math.sin(angle) );
    vertices.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    lCoords.push( 0.0 );
    lCoords.push( 0.0 );

    var newX = vec3.create(vecBegin);
    var newZ = vec3.create();
    vec3.cross(newX,vecEnd,newZ);
    vec3.normalize(newZ);
    var newY = vec3.create();
    vec3.cross(newZ,newX,newY);
    vec3.normalize(newY);

    var rot1 = [newX[0],newX[1],newX[2],newY[0],newY[1],newY[2],newZ[0],newZ[1],newZ[2]];

    var v1 = vec3.create();
    for (var i = 0; i < vertices.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = vertices[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        vec3.add(v1,arr0);
        for (var j = 0; j < 3; j++) {
           vertices[i*3+j] = v1[j];
        }
    }
    for (var i = 0; i < zoomvectors.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = zoomvectors[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        for (var j = 0; j < 3; j++) {
           zoomvectors[i*3+j] = v1[j];
        }
    }

    var colors = [];
    for (var i=0; i < vertices.length/3; i++) {
        colors.push(color[0],color[1],color[2],color[3]);
    }

    var indices = [];
    for (var i=0; i < slices1; i++) {
        for (var j=0; j < slices; j++) {
           indices.push(indiceBase+i*(slices+1)+j,       indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
           indices.push(indiceBase+(i+1)*(slices+1)+j+1, indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
        }
    }
    for (var j=0; j < slices; j++) {
       indices.push(indiceBase+j,       indiceBase+j+1, indiceBase+(slices1+1)*(slices+1));
       indices.push(indiceBase+slices1*(slices+1)+j,       indiceBase+slices1*(slices+1)+j+1, indiceBase+(slices1+1)*(slices+1)+1);
    }
    // indiceBase += vertices.length/3;
    // console.log(vertices);
    return [vertices,colors,indices,zoomvectors,lCoords];
}

function initTorusOuterArc(arr0, arr1, arr2, Rad, rad, color, indiceBase) {
    var vecBegin = vec3.create();
    var vecEnd = vec3.create();
    vec3.subtract(arr1,arr0,vecBegin);
    vec3.subtract(arr2,arr0,vecEnd);
    vec3.normalize(vecBegin);
    vec3.normalize(vecEnd);

    var cosTheta = vec3.dot(vecBegin,vecEnd);

    // if (isMaintainArrowRadius) {
    //     rad *= lineWidthScale;
    //     // Rad *= lineWidthScale;
    // }

    var angle = 2.0*Math.PI-Math.acos(cosTheta);
    var slicesPerRadian = 8;

    var slices1 = Math.ceil(slicesPerRadian*angle);
    var vertices = [];
    var zoomvectors = [];
    var lCoords = [];

    for (var i = 0; i <= slices1; i++) {
        var psi = i*angle/slices1;
        for (var j = 0; j <= slices; j++) {
            var phi = j*2.0*Math.PI/slices;
            vertices.push( (Rad+rad*Math.cos(phi))*Math.cos(psi) );
            vertices.push( -(Rad+rad*Math.cos(phi))*Math.sin(psi) );
            vertices.push( rad*Math.sin(phi) );
            zoomvectors.push( (rad*Math.cos(phi))*Math.cos(psi) );
            zoomvectors.push( -(rad*Math.cos(phi))*Math.sin(psi) );
            zoomvectors.push( rad*Math.sin(phi) );
            lCoords.push( 0.0 );
        }
    }
    vertices.push( Rad*Math.cos(0) );
    vertices.push( -Rad*Math.sin(0) );
    vertices.push( 0.0 );
    vertices.push( Rad*Math.cos(angle) );
    vertices.push( -Rad*Math.sin(angle) );
    vertices.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    zoomvectors.push( 0.0 );
    lCoords.push( 0.0 );
    lCoords.push( 0.0 );

    var newX = vec3.create(vecBegin);
    var newZ = vec3.create();
    vec3.cross(newX,vecEnd,newZ);
    vec3.normalize(newZ);
    var newY = vec3.create();
    vec3.cross(newZ,newX,newY);
    vec3.normalize(newY);

    var rot1 = [newX[0],newX[1],newX[2],newY[0],newY[1],newY[2],newZ[0],newZ[1],newZ[2]];

    var v1 = vec3.create();
    for (var i = 0; i < vertices.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = vertices[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        vec3.add(v1,arr0);
        for (var j = 0; j < 3; j++) {
           vertices[i*3+j] = v1[j];
        }
    }
    for (var i = 0; i < zoomvectors.length/3; i++) {
        for (var j = 0; j < 3; j++) {
            v1[j] = zoomvectors[i*3+j];
        }
        multiplyMat3Vec3(rot1,v1);
        for (var j = 0; j < 3; j++) {
           zoomvectors[i*3+j] = v1[j];
        }
    }

    var colors = [];
    for (var i=0; i < vertices.length/3; i++) {
        colors.push(color[0],color[1],color[2],color[3]);
    }

    var indices = [];
    for (var i=0; i < slices1; i++) {
        for (var j=0; j < slices; j++) {
           indices.push(indiceBase+i*(slices+1)+j,       indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
           indices.push(indiceBase+(i+1)*(slices+1)+j+1, indiceBase+i*(slices+1)+j+1, indiceBase+(i+1)*(slices+1)+j);
        }
    }
    for (var j=0; j < slices; j++) {
       indices.push(indiceBase+j,       indiceBase+j+1, indiceBase+(slices1+1)*(slices+1));
       indices.push(indiceBase+slices1*(slices+1)+j,       indiceBase+slices1*(slices+1)+j+1, indiceBase+(slices1+1)*(slices+1)+1);
    }
    // indiceBase += vertices.length/3;
    // console.log(vertices);
    return [vertices,colors,indices,zoomvectors,lCoords];
}

function initSphere(arr0, rad, color, indiceBase, scaling) {
    // if (isMaintainArrowRadius) {
    //     rad *= lineWidthScale;
    // }
    var slicesPerRadian = 8;

    var slices1 = Math.ceil(slices/2);
    var vertices = [];
    var zoomvectors = [];
    var lCoords = [];

    for (var i = 0; i <= slices; i++) {
        var psi = i*2*Math.PI/slices;
        for (var j = 0; j <= slices1; j++) {
            var phi = j*Math.PI/slices1;
            vertices.push( rad*Math.sin(phi)*Math.cos(psi)+arr0[0] );
            vertices.push( rad*Math.cos(phi)+arr0[1] );
            vertices.push( rad*Math.sin(phi)*Math.sin(psi)+arr0[2] );
            if (scaling) {
                zoomvectors.push( rad*Math.sin(phi)*Math.cos(psi) );
                zoomvectors.push( rad*Math.cos(phi) );
                zoomvectors.push( rad*Math.sin(phi)*Math.sin(psi) );
            } else {
                zoomvectors.push( 0 );
                zoomvectors.push( 0 );
                zoomvectors.push( 0 );
            }
            lCoords.push( 0.0 );
        }
    }

    var colors = [];
    for (var i=0; i < vertices.length/3; i++) {
        colors.push(color[0],color[1],color[2],color[3]);
    }

    var indices = [];
    for (var i=0; i < slices; i++) {
        for (var j=0; j < slices1; j++) {
           indices.push(indiceBase+i*(slices1+1)+j,       indiceBase+i*(slices1+1)+j+1, indiceBase+(i+1)*(slices1+1)+j);
           indices.push(indiceBase+(i+1)*(slices1+1)+j+1, indiceBase+i*(slices1+1)+j+1, indiceBase+(i+1)*(slices1+1)+j);
        }
    }
    // indiceBase += vertices.length/3;
    return [vertices,colors,indices,zoomvectors,lCoords];
}
function initPlane(arr0, arr1, arr2, arr3, color, indiceBase) {
    var vertices = [];
    var zoomvectors = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
    var lCoords = [0.0,0.0,0.0,0.0];

    vertices.push(arr0[0],arr0[1],arr0[2],
        arr1[0],arr1[1],arr1[2],
        arr2[0],arr2[1],arr2[2],
        arr3[0],arr3[1],arr3[2]);

    var colors = [];
    for (var i=0; i < vertices.length/3; i++) {
        colors.push(color[0],color[1],color[2],color[3]);
    }
    var indices = [indiceBase, indiceBase+1, indiceBase+2, indiceBase, indiceBase+2, indiceBase+3];

    // indiceBase += vertices.length/3;
    return [vertices,colors,indices,zoomvectors,lCoords];
}
function initTriangle(arr0, arr1, arr2, color, indiceBase) {
    var vertices = [];
    var zoomvectors = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
    var lCoords = [0.0,0.0,0.0];

    vertices.push(arr0[0],arr0[1],arr0[2],
        arr1[0],arr1[1],arr1[2],
        arr2[0],arr2[1],arr2[2]);

    var colors = [];
    for (var i=0; i < vertices.length/3; i++) {
        colors.push(color[0],color[1],color[2],color[3]);
    }
    var indices = [indiceBase, indiceBase+1, indiceBase+2];

    // indiceBase += vertices.length/3;
    return [vertices,colors,indices,zoomvectors,lCoords];
}
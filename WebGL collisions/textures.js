//var neheTexture;
//var crateTextures = Array();
//var crateTexture;
var glassTexture;
var starTexture;
var moonTexture;


function initTexture() {
	/*neheTexture = gl.createTexture();
	neheTexture.image = new Image();
	neheTexture.image.onload = function() {
	  handleLoadedTexture(neheTexture)
	}

	neheTexture.image.src = "nehe.gif";*/

	/*var crateImage = new Image();

	for (var i=0; i < 3; i++) {
	  var texture = gl.createTexture();
	  texture.image = crateImage;
	  crateTextures.push(texture);
	}*/
	
	/*crateTexture = gl.createTexture();
	crateTexture.image = new Image();
	crateTexture.image.onload = function () {
		handleLoadedTexture(crateTexture)
	}*/

	/*crateImage.onload = function() {
	  handleLoadedTexture(crateTextures)
	}
	crateImage.src = "crate.gif";*/
	//crateTexture.image.src = "crate.gif";
	
	//moon texture
	moonTexture = gl.createTexture();
	moonTexture.image = new Image();
	moonTexture.image.onload = function () {
		handleLoadedTexture(moonTexture)
	}

	moonTexture.image.src = "moon.gif";
	
	//star texture
	starTexture = gl.createTexture();
	starTexture.image = new Image();
	starTexture.image.onload = function () {
		handleLoadedTexture(starTexture)
	}
	starTexture.image.src = "star.gif";
	
	//box texture
	glassTexture = gl.createTexture();
	glassTexture.image = new Image();
	glassTexture.image.onload = function () {
		handleLoadedTexture(glassTexture)
	}

	glassTexture.image.src = "grid.gif";
}
  
function handleLoadedTexture(texture) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
	gl.generateMipmap(gl.TEXTURE_2D);

	gl.bindTexture(gl.TEXTURE_2D, null);
}
  
/*function handleLoadedTexture(textures) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    gl.bindTexture(gl.TEXTURE_2D, textures[0]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[0].image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    gl.bindTexture(gl.TEXTURE_2D, textures[1]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[1].image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

    gl.bindTexture(gl.TEXTURE_2D, textures[2]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textures[2].image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.bindTexture(gl.TEXTURE_2D, null);
}*/

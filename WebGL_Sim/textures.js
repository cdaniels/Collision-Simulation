
var glassTexture;
var moonTexture;


function initTexture() {
	
	//moon texture
	moonTexture = gl.createTexture();
	moonTexture.image = new Image();
	moonTexture.image.onload = function () {
		handleLoadedTexture(moonTexture)
	}

	moonTexture.image.src = "moon.gif";
	
	
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

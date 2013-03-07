
var boxTexture;
var ballTexture;


function initTexture() {
	
	//sphere texture
	ballTexture = gl.createTexture();
	ballTexture.image = new Image();
	ballTexture.image.onload = function () {
		handleLoadedTexture(ballTexture)
	}

	//ballTexture.image.src = "textures/moon.gif";
	ballTexture.image.src = document.getElementById("moon_tex").src;
	
	
	//box texture
	boxTexture = gl.createTexture();
	boxTexture.image = new Image();
	boxTexture.image.onload = function () {
		handleLoadedTexture(boxTexture)
	}

	//boxTexture.image.src = "textures/grid.gif";
	boxTexture.image.src = document.getElementById("grid_tex").src;
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

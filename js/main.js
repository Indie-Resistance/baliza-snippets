// var KEYCODE_ENTER = 13;		//usefull keycode
// var KEYCODE_SPACE = 32;		//usefull keycode
// var KEYCODE_UP = 38;		//usefull keycode
// var KEYCODE_LEFT = 37;		//usefull keycode
// var KEYCODE_RIGHT = 39;		//usefull keycode
var KEYCODE_W = 87;			//usefull keycode
var KEYCODE_A = 65;			//usefull keycode
var KEYCODE_D = 68;			//usefull keycode
var KEYCODE_S = 83;			//usefull keycode

// Movement flags
var moveRight = false;
var moveLeft = false;
var moveUp = false;
var moveDown = false;

var advance = 3;

var stage,
	carrito;

var init = function() {
	stage = new createjs.Stage(document.getElementById("canvas"));
	carrito = new createjs.Bitmap("img/car.png");
	carrito.regX = carrito.image.width * 0.5;
	carrito.regY = carrito.image.height * 0.5;
	carrito.x = stage.canvas.width * 0.5;
	carrito.y = stage.canvas.height * 0.5;

	console.log(stage);
	console.log(carrito);
	stage.addChild(carrito);

	createjs.Ticker.setFPS(60);
	createjs.Ticker.addListener(window);
};
  
var tick = function() {
	//console.log("TICK");
	var advanceX = 0, advanceY = 0;

	if(!!moveUp){
		advanceY = -advance;
		carrito.rotation = 0;
	}

	if(!!moveDown){
		advanceY = advance;
		carrito.rotation = 180;
	}

	if(!!moveRight){
		advanceX = advance;
		carrito.rotation = 90;
	}

	if(!!moveLeft){
		advanceX = -advance;
		carrito.rotation = -90;
	}

	carrito.x += advanceX;
	carrito.y += advanceY;


	//vertical space loop
	if((carrito.y - carrito.image.height * 0.5) > stage.canvas.height){
		carrito.y = -(carrito.image.height * 0.5);
	}

	if((carrito.y + carrito.image.height * 0.5) < 0){
		carrito.y = stage.canvas.height + (carrito.image.height * 0.5);
	}

	//horizontal space loop
	if((carrito.x - carrito.image.width * 0.5) > stage.canvas.width){
		carrito.x = -(carrito.image.width * 0.5);
	}

	if((carrito.x + carrito.image.width * 0.5) < 0){
		carrito.x = stage.canvas.width + (carrito.image.width * 0.5);
	}

	stage.update();
};

var handleKeyDown = function(e){
	if(!e){var e = window.event;}

	switch(e.keyCode){
		case KEYCODE_W:
			moveUp = true;
			moveDown = false;
			moveLeft = false;
			moveRight = false;
			break;
		case KEYCODE_S:
			moveDown = true;
			moveUp = false;
			moveLeft = false;
			moveRight = false;
		break;
		case KEYCODE_A:
			moveLeft = true;
			moveUp = false;
			moveDown = false;
			moveRight = false;
			break;
		case KEYCODE_D:
			moveRight = true;
			moveUp = false;
			moveDown = false;
			moveLeft = false;
			break;
	}

	//console.log(e.keyCode);
};

var handleKeyUp = function(e){
	if (!e) {var e = window.event;}

	switch(e.keyCode){
		case KEYCODE_W: moveUp = false; break;
		case KEYCODE_S: moveDown = false; break;
		case KEYCODE_A: moveLeft = false; break;
		case KEYCODE_D: moveRight = false; break;
	}
	//console.log(e.keyCode);
};

document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;
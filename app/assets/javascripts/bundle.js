/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./javascripts/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./javascripts/game.js":
/*!*****************************!*\
  !*** ./javascripts/game.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./javascripts/player.js");


class Game {
    constructor(ctx, canvas) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.loop = this.loop.bind(this);
        this.player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"](canvas, ctx)
    }

    start() {
        // console.log('hi')
        this.player.draw();
        this.player.mountController();
    }

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw();
        window.requestAnimationFrame(this.loop);
        // this.player.move();
        // console.log(this.player)
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./javascripts/game_object.js":
/*!************************************!*\
  !*** ./javascripts/game_object.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.x_speed = 0;
        this.y_speed = 5;
        this.radius = 10;
    }

    render() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
        context.fillStyle = "#FFFFFF";
        context.fill();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (GameObject);

/***/ }),

/***/ "./javascripts/main.js":
/*!*****************************!*\
  !*** ./javascripts/main.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./javascripts/game.js");
// let canvas = document.createElement('canvas');
// let width = 1200;
// let height = 800;
// canvas.width = width;
// canvas.height = height;
// let context = canvas.getContext('2d');
// context.fillStyle = "#222";
// context.fillRect(0, 0, width, height);


window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        // ctx.fillStyle = "#222";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, canvas);
    window.game = game;
    // game.player.draw();
    // game.player.mountController();
    game.start();
    game.loop();
})



/***/ }),

/***/ "./javascripts/player.js":
/*!*******************************!*\
  !*** ./javascripts/player.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_object */ "./javascripts/game_object.js");


//     W: 87,
//     A: 65,
//     S: 83,
//     D: 68,
//     ENTER: 13,
//     UP: 38,
//     DOWN: 40,
//     SHIFT: 16,
//     SPACE: 32,
//     MOUSE_LEFT: 10000,
//     MOUSE_RIGHT: 10002,
class Player {
    constructor(canvas, ctx) {
        // this.game = game;
        this.radius = 10;
        this.pos = [canvas.width / 2, canvas.height / 2];
        this.x_speed = 0;
        this.y_speed = 0;
        this.canvas = canvas;
        this.ctx = ctx;
        this.keyDown = {
            87: false,
            65: false,
            83: false,
            68: false
        }
    }

    move(x, y) {
        this.pos[0] += x;
        this.pos[1] += y;
        this.x_speed = x;
        this.y_speed = y;
    }

    mountController() {
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 87) {
                this.move(0, -5);
            } else if (e.keyCode === 83) {
                this.move(0, 5);
            } else if (e.keyCode === 65) {
                this.move(-5, 0);
            } else if (e.keyCode === 68) {
                this.move(5, 0);
            }
        })
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.pos[0], this.pos[1], this.radius, 2 * Math.PI, false);
        // this.ctx.fillStyle = "#FFF";
        this.ctx.strokeStyle = "#FFF";
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = "white";
        this.ctx.fill();
        this.ctx.closePath();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
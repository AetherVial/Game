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

/***/ "./javascripts/enemy.js":
/*!******************************!*\
  !*** ./javascripts/enemy.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enemy_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemy_particle */ "./javascripts/enemy_particle.js");

class Boss {
    constructor(game) {
        this.hp = 1000;
        this.r = 200;
        this.pos = [game.canvas.width - 200, game.canvas.height];
        this.x = this.pos[0]
        this.y = this.pos[1]
        this.y_speed = .3;
        this.ctx = game.ctx;
        this.game = game;
        this.alive = true;
        this.up = true;
        this.loaded = true;
        this.loaded2 = true;
    }

    move(dt) {
        if (this.up) {
            this.y = this.y - this.y_speed * dt
        } else {
            this.y = this.y + this.y_speed * dt
        }
    }


    update(dt) {
        this.checkDead();
        if (this.y >= this.game.canvas.height - this.r) {
            this.up = true;
        } else if (this.y <= this.r) {
            this.up = false;
        }
        this.move(dt);
        this.fire2();
        this.fire();
    }

    checkDead() {
        if (this.hp <= 0) {
            this.alive = false;
            this.pos = [];
            this.x = null;
            this.y = null;
        }   
    }

    fire() {
        if (this.loaded) {
            let bullet = new _enemy_particle__WEBPACK_IMPORTED_MODULE_0__["default"](game, 50, [this.x, this.y], [-1, 0]);
            this.game.add(bullet);
            this.loaded = false;
            setTimeout(() => {
                this.loaded = true;
            }, 2000)
        } else {
            return;
        }
    }

    fire2() {
        if (this.loaded2) {
            // setInterval(() => {
            //     let bullet = new EnemyParticle(game, 10, [this.x, this.y], [-1, 0]);
            //     this.game.add(bullet);
            // }, 1000)
            // setTimeout(() => {
            //     this.loaded = true;
            // }, 500)
            for (let i = 0; i < 90; i+=10) {
                let bullet = new _enemy_particle__WEBPACK_IMPORTED_MODULE_0__["default"](game, 10, [this.x, this.y], [-1, Math.cos(i)]);
                this.game.add(bullet);
            }
            this.loaded2 = false;
            setTimeout(() => {
                this.loaded2 = true;
            }, 500)
        } 

    }


    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 2 * Math.PI, false);
        this.ctx.strokeStyle = "#000";
        this.ctx.fillStyle = "#000";
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = "white";
        this.ctx.fill();
        this.ctx.closePath();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Boss);

/***/ }),

/***/ "./javascripts/enemy_particle.js":
/*!***************************************!*\
  !*** ./javascripts/enemy_particle.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle */ "./javascripts/particle.js");

class EnemyParticle {
    constructor(game, r, pos, vel) {
        this.pos = pos.slice();
        this.x = this.pos[0];
        this.y = this.pos[1];
        this.r = r;
        this.ctx = game.ctx;
        this.vel = vel;
        this.damage = 50;
        this.alive = true;
        this.game = game;
    }

    dist(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
    }

    enemyCollidesWith() {
        if (this.dist([this.x, this.y], [this.game.player.pos[0], this.game.player.pos[1]]) < (this.r + this.game.player.radius)) {
            this.alive = false;
            this.game.player.hp -= 50;
        }
    }

    update(dt) {
        this.x = this.x + dt * this.vel[0];
        this.y = this.y + dt * this.vel[1];
    }


    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (EnemyParticle);

/***/ }),

/***/ "./javascripts/game.js":
/*!*****************************!*\
  !*** ./javascripts/game.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./javascripts/player.js");
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./particle */ "./javascripts/particle.js");
/* harmony import */ var _enemy_particle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enemy_particle */ "./javascripts/enemy_particle.js");
/* harmony import */ var _hud__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hud */ "./javascripts/hud.js");
/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./enemy */ "./javascripts/enemy.js");






class Game {
    constructor(ctx, canvas) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.loop = this.loop.bind(this);
        this.dt = 0;
        this.prevTime = Date.now();
        this.particles = [];
    }

    add(object) {
        if (object instanceof _particle__WEBPACK_IMPORTED_MODULE_1__["default"] || object instanceof _enemy_particle__WEBPACK_IMPORTED_MODULE_2__["default"]) {
            this.particles.push(object);
        }
    }


    checkBounds(particle) {
        if (particle.x >= this.canvas.width || particle.x <= 0 || particle.y >= this.canvas.height || particle.y <= 0) {
            particle.alive = false;
        }
    }

    start() {
        this.player = new _player__WEBPACK_IMPORTED_MODULE_0__["default"](this);
        this.player.mountController();
        this.hud = new _hud__WEBPACK_IMPORTED_MODULE_3__["default"](this);
        this.enemy = new _enemy__WEBPACK_IMPORTED_MODULE_4__["default"](this);
        this.particles.push(this.player);
        this.particles.push(this.enemy);
    }

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles = this.particles.filter(el => {
            if (el.alive) return el;
        })
        this.particles.forEach(el => {
            if (el.alive) {
                el.draw();
                el.update(this.dt);
                if (el instanceof _particle__WEBPACK_IMPORTED_MODULE_1__["default"]) {
                    this.checkBounds(el);
                    el.collidesWith();
                }
                if (el instanceof _enemy_particle__WEBPACK_IMPORTED_MODULE_2__["default"]) {
                    this.checkBounds(el);
                    el.enemyCollidesWith();
                }

            }
        })
        this.hud.draw();
        this.dt = Date.now() - this.prevTime;
        this.prevTime = Date.now();
        window.requestAnimationFrame(this.loop);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Game);

/***/ }),

/***/ "./javascripts/hud.js":
/*!****************************!*\
  !*** ./javascripts/hud.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./javascripts/game.js");


class HUD {
    constructor(game) {
        this.game = game;
        this.player = game.player;
        this.ctx = game.ctx;
        this.canvas = game.canvas;
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.rect(10,10,game.player.hp * 2, 50);
        this.ctx.fillStyle = '#32a852';
        this.ctx.fillRect(10, 10, game.player.hp * 2, 50);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.rect(10,70,game.player.charge * 3, 25);
        this.ctx.fillStyle = '#00ffee';
        this.ctx.fillRect(10, 70, game.player.charge * 3, 25);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.rect(10, this.canvas.height - 60, game.enemy.hp * 1.5, 25);
        this.ctx.fillStyle = '#702413';
        this.ctx.fillRect(10, this.canvas.height - 60, game.enemy.hp * 1.5, 25);
        this.ctx.stroke();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (HUD);

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
        ctx.fillStyle = "#222222";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    const game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx, canvas);
    document.body.style.cursor = "crosshair";

    window.game = game;
    game.start();
    game.loop();
})



/***/ }),

/***/ "./javascripts/particle.js":
/*!*********************************!*\
  !*** ./javascripts/particle.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./javascripts/game.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./javascripts/player.js");


// import Enemy from './enemy';

class Particle {
    constructor(game, pos, crosshair) {
        this.pos = pos.slice();
        this.crosshair = crosshair;
        this.x = this.pos[0];
        this.y = this.pos[1];
        this.r = 3;
        this.ctx = game.ctx;
        this.vel = [1,1];
        this.damage = 50;
        this.alive = true;
    }

    dist(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
    }

    collidesWith() {
        if (this.dist([this.x, this.y], [game.enemy.x, game.enemy.y]) < (this.r + game.enemy.r) ) {
            this.alive = false;

            if (game.player.charge < 90) {
                (game.player.charge += 10);
            } else {
                game.player.charge = 100;
            }

            if (game.enemy.hp > 0) {
                game.enemy.hp -= this.damage;
            } else if (game.enemy.hp - this.damage < 0){
                game.enemy.hp = 0;
            }
        }
    }

    update(dt) {
        let length = (Math.sqrt((Math.pow(this.crosshair[1] - this.pos[1], 2)) + Math.pow(this.crosshair[0] - this.pos[0], 2)))
        this.x = this.x + ((this.crosshair[0] - this.pos[0]) / length) * dt * this.vel[0];
        this.y = this.y + ((this.crosshair[1] - this.pos[1]) / length) * dt * this.vel[1];
    }


    draw() {
        // this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = "#00ffee";
        this.ctx.fill();
        this.ctx.closePath();
        // this.ctx.restore();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Particle);

/***/ }),

/***/ "./javascripts/player.js":
/*!*******************************!*\
  !*** ./javascripts/player.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./particle */ "./javascripts/particle.js");
/* harmony import */ var _enemy_particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy_particle */ "./javascripts/enemy_particle.js");


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
    constructor(game) {
        this.game = game;
        this.radius = 10;
        this.pos = [game.canvas.width / 2, game.canvas.height / 2];
        this.x_speed = .35;
        this.y_speed = .35;
        this.canvas = game.canvas;
        this.ctx = game.ctx;
        this.keyDown = {
            87: false,
            65: false,
            83: false,
            68: false,
            16: false,
        }
        this.crosshair = [];
        this.dashCooldown = 3000;
        this.dashDisabled = false;
        this.hp = 300;
        this.invuln = false;
        this.charge = 0;
        this.alive = true;
    }

    move(x, y) {
        this.pos[0] += x;
        this.pos[1] += y;
        if (this.pos[0] < 0 ) {
            this.pos[0] = 0;
        } else if (this.pos[1] < 0) {
            this.pos[1] = 0;
        } else if (this.pos[0] + this.radius > this.canvas.width) {
            this.pos[0] = this.canvas.width - this.radius;
        } else if (this.pos[1] + this.radius > this.canvas.height) {
            this.pos[1] = this.canvas.height - this.radius;
        }
    }

    dash() {
        if (!this.dashDisabled) {
            this.x_speed = this.x_speed * 4;
            this.y_speed = this.y_speed * 4;
            this.invuln = true;
            setTimeout(() => {
                this.x_speed = this.x_speed / 4;
                this.y_speed = this.y_speed / 4;
                this.invuln = false;
            }, 100);
            this.dashDisabled = true;
            setTimeout(() => this.dashDisabled = false, this.dashCooldown)
        } else {
            console.log('im on cooldown dude')
        }
    }

    fire(game, pos, crosshair) {
        let bullet = new _particle__WEBPACK_IMPORTED_MODULE_0__["default"](game, pos, crosshair);
        this.game.add(bullet);
    }

    checkDead() {
        if (this.hp <= 0) {
            this.alive = false;
            this.pos = [];
        }
    }

    mountController() {
        document.addEventListener('keydown', (e) => {
            this.keyDown[e.keyCode] = true;
        });

        document.addEventListener('keyup', (e) => {
            this.keyDown[e.keyCode] = false;
        })

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 49) {
                this.dash(this.x_speed, this.y_speed);
            }
        })

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 187) {
                this.charge = 100;
            }
        })

        document.addEventListener('mousemove', (e) => {
            this.setAim(e);
        })

        document.addEventListener('click', (e) => {
            this.fire(this.game, this.pos, this.crosshair);
        })

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 69) {
                if (this.charge >= 50) {
                    this.chargeAtk();
                } else {
                    console.log('you must construct additional pylons');
                }
            }
        })

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 189) {
                this.hp += 200;
            }
        })
    }

    setAim(e) {
        let temp = this.canvas.getBoundingClientRect();
        this.crosshair = [e.clientX - temp.x, e.clientY - temp.y];
    }

    draw() {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.pos[0], this.pos[1], this.radius, 2 * Math.PI, false);
        this.ctx.strokeStyle = "#FFF";
        this.ctx.fillStyle = "#FF00FF";
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = "white";
        this.ctx.fill();
        this.ctx.restore();
        this.ctx.closePath();
        
    }

    chargeAtk() {
        this.game.particles.forEach(el => {
            if (el instanceof _enemy_particle__WEBPACK_IMPORTED_MODULE_1__["default"]) {
                el.alive = false;
            }
        })
        this.charge -= 50;
    }

    update(dt) {
        if (this.keyDown[87]) {
            this.move(0, -(this.y_speed) * dt);
        }
        if (this.keyDown[83]) {
            this.move(0, (this.y_speed) * dt);
        }
        if (this.keyDown[65]) {
            this.move(-(this.x_speed) * dt, 0);
        }
        if (this.keyDown[68]) {
            this.move((this.x_speed) * dt, 0);
        }
        if (this.charge < 100) {
            this.charge += .02;
        }
        this.checkDead()
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
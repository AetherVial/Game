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

/***/ "./javascripts/cursor.js":
/*!*******************************!*\
  !*** ./javascripts/cursor.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));

class Cursor {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.crosshair = [];
        this.img = new Image();
        this.img.src = `${PATH}/app/crosshair.png`;
    }

    setAim(e) {
        let temp = this.canvas.getBoundingClientRect();
        this.crosshair = [e.clientX - temp.x, e.clientY - temp.y];
    }

    draw() {
        this.ctx.drawImage(this.img, 335, 268, 61, 64, this.canvas.width / 2, this.canvas.height / 2);
    }

    update() {

    }

}

/* harmony default export */ __webpack_exports__["default"] = (Cursor);

/***/ }),

/***/ "./javascripts/enemy.js":
/*!******************************!*\
  !*** ./javascripts/enemy.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enemy_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemy_particle */ "./javascripts/enemy_particle.js");
/* harmony import */ var _particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./particle */ "./javascripts/particle.js");



const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));
class Boss {
    constructor(game, level) {
        this.hp = 1000 * level;
        this.og_hp = 1000 * level;
        this.r = 75;
        this.pos = [game.canvas.width - 150, game.canvas.height - 150];
        this.x = this.pos[0];
        this.y = this.pos[1];
        this.y_speed = .3;
        this.ctx = game.ctx;
        this.game = game;
        this.alive = true;
        this.up = true;
        this.loaded = true;
        this.loaded2 = true;
        this.sheet = new Image();
        this.sheet.src = `${PATH}/app/wizard.png`;
        this.coords_x = 0;
        this.coords_y = 0;
        this.forward = true;
        this.frames = 0;
    }

    move(dt) {
        if (this.up) {
            this.y = this.y - (this.y_speed * .75) * dt
        } else {
            this.y = this.y + (this.y_speed * .75) * dt
        }
    }

    update(dt) {
        this.checkDead();
        if (this.y >= this.game.canvas.height - 150) {
            this.up = true;
        } else if (this.y <= 150) {
            this.up = false;
        }
        if (this.frames === 10) {
            if (this.forward) {
                this.coords_x = this.coords_x + 80;
                if (this.coords_x === 720) {
                    this.forward = !this.forward;
                }
            } else if (!this.forward) {
                this.coords_x = this.coords_x - 80;
                if (this.coords_x === 80) {
                    this.forward = true;
                }
            }
            this.frames = 0;
        }
        this.move(dt);
        this.fire2();
        this.fire();
        this.frames = this.frames + 1;
    }

    checkDead() {
        if (this.hp <= 0) {
            this.alive = false;
            this.pos = [];
            this.x = null;
            this.y = null;
            this.r = 0;
            this.game.enemies.shift();
            this.game.enemies.push(new Boss(this.game, this.game.level));
            this.game.player.hp += 100;
            setTimeout(() => {
                this.game.enemy = this.game.enemies[0];
                this.game.particles.push(this.game.enemy);
            }, 5000)
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
            for (let i = 0; i < 90; i+=10) {
                let bullet = new _enemy_particle__WEBPACK_IMPORTED_MODULE_0__["default"](game, 10, [this.x, this.y], [-1, Math.cos(i)]);
                this.game.add(bullet);
            }
            this.loaded2 = false;
            setTimeout(() => {
                this.loaded2 = true;
            }, 1500)
        } 

    }



    draw() {
        this.ctx.save();
        if (this.sheet.complete) {
            this.ctx.drawImage(this.sheet, this.coords_x, this.coords_y, 80, 80, this.x - 150, this.y - 150, 300, 300);
        } else {
            let ctx = this.ctx;
            let sheet = this.sheet;
            ctx.drawImage(
                sheet, 
                this.coords_x, 
                this.coords_y, 
                80, 80, 
                this.x - 150, 
                this.y - 150, 300, 300);
        }

        // this.ctx.stroke();
        // this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Boss);

/***/ }),

/***/ "./javascripts/enemy2.js":
/*!*******************************!*\
  !*** ./javascripts/enemy2.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enemy_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemy_particle */ "./javascripts/enemy_particle.js");
/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy */ "./javascripts/enemy.js");



const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));
class Boss2 extends _enemy__WEBPACK_IMPORTED_MODULE_1__["default"]{
    constructor(game, level) {
        super(game, level);
        this.hp = 2500 * level;
        this.og_hp = 2500 * level;
        this.r = 100;
        this.pos = [game.canvas.width / 4, game.canvas.height / 4];
        this.x = this.pos[0]
        this.y = this.pos[1]
        this.y_speed = .3;
        this.ctx = game.ctx;
        this.game = game;
        this.alive = true;
        this.up = true;
        this.loaded = true;
        this.loaded2 = true;
        
        this.sheet = new Image();
        this.sheet.src = `${PATH}/app/demon-idle.png`;
        this.coords_x = 0;
        this.coords_y = 0;
        this.forward = true;
        this.frames = 0;
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
        if (this.frames === 10) {
            if (this.forward) {
                this.coords_x = this.coords_x + 160;
                if (this.coords_x === 800) {
                    this.forward = !this.forward;
                }
            } else if (!this.forward) {
                this.coords_x = this.coords_x - 160;
                if (this.coords_x === 160) {
                    this.forward = true;
                }
            }
            this.frames = 0;
        }
        this.move(dt);
        this.fire2();
        this.fire();
        this.frames = this.frames + 1;
    }

    checkDead() {
        if (this.hp <= 0) {
            this.alive = false;
            this.pos = [];
            this.x = null;
            this.y = null;
            this.r = 0;
            this.game.enemies.shift();
            this.game.enemies.push(new Boss2(this.game, this.game.level));

            if (!this.game.player.powerUp1) {
                this.game.player.powerUp1 = true;
            }   
            
            setTimeout(() => {
                this.game.enemy = this.game.enemies[0];
                this.game.particles.push(this.game.enemy);
                console.log(this.game.enemies);
            }, 5000)
        }
    }

    fire() {
        if (this.loaded) {
            for (let i = 45; i < 405; i += 10) {
                let bullet = new _enemy_particle__WEBPACK_IMPORTED_MODULE_0__["default"](game, 10, [this.x, this.y], [.5 * Math.sin(i), .5 * Math.cos(i)]);
                // setTimeout(() => {
                    this.game.add(bullet);
                // }, 50);
                
            }
            this.loaded = false;
            setTimeout(() => {
                this.loaded = true;
            }, 1500)
        } else {
            return;
        }
    }

    fire2() {
        if (this.loaded2) {
            for (let i = 0; i < 360; i += 10) {
                let bullet = new _enemy_particle__WEBPACK_IMPORTED_MODULE_0__["default"](game, 10, [this.x, this.y], [Math.sin(i), Math.cos(i)]);
                this.game.add(bullet);
            }
            this.loaded2 = false;
            setTimeout(() => {
                this.loaded2 = true;
            }, 4000)
        }
    }

    draw() {
        this.ctx.save();
        // this.ctx.beginPath();
        // this.ctx.arc(this.x, this.y, this.r, 2 * Math.PI, false);
        // this.ctx.strokeStyle = "#000";
        // this.ctx.fillStyle = "#000";
        // this.ctx.shadowBlur = 5;
        // this.ctx.shadowColor = "white";
        this.ctx.drawImage(this.sheet, this.coords_x, this.coords_y, 160, 144, this.x - 150, this.y - 150, 300, 300);
        // this.ctx.fill();
        // this.ctx.closePath();
        this.ctx.restore();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Boss2);

/***/ }),

/***/ "./javascripts/enemy3.js":
/*!*******************************!*\
  !*** ./javascripts/enemy3.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemy */ "./javascripts/enemy.js");
/* harmony import */ var _enemy_particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy_particle */ "./javascripts/enemy_particle.js");
/* harmony import */ var _enemy_exposion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enemy_exposion */ "./javascripts/enemy_exposion.js");




const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));
class Boss3 extends _enemy__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(game, level) {
        super(game, level);
        this.hp = 8000 * level;
        this.og_hp = 8000 * level;
        this.r = 100;
        this.pos = [game.canvas.width-100, game.canvas.height / 2];
        this.x = this.pos[0]
        this.y = this.pos[1]
        this.x_speed = .3;
        this.y_speed = .3;
        this.ctx = game.ctx;
        this.game = game;
        this.alive = true;

        this.up = true;
        this.down = false;
        this.left = false;
        this.right = false;
    
        this.loaded = true;
        // this.loaded2 = true;
        this.center = [this.game.canvas.width / 2, this.game.canvas.height / 2]

        this.sheet = new Image();
        this.sheet.src = `${PATH}/app/sorcerer_villain.png`;
        this.coords_x = 0;
        this.coords_y = 0;
        this.forward = true;
        this.frames = 0;
    }

    move(dt) {
        if (this.up) {
            this.y = this.y - this.y_speed * dt
        } else if (this.down) {
            this.y = this.y + this.y_speed * dt
        } else if (this.left) {
            this.x = this.x - this.x_speed * dt
        } else if (this.right) {
            this.x = this.x + this.x_speed * dt
        }
    }

    dist(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
    }

    fire() {
        if (this.loaded) {
            
            let bullet = new _enemy_exposion__WEBPACK_IMPORTED_MODULE_2__["default"](this.game, 
                                10, 
                                [this.x, this.y], 
                                [
                                (this.game.canvas.width / 2 - this.x) / (this.dist(this.center, [this.x, this.y])), 
                                
                                (this.game.canvas.height / 2 - this.y) / (this.dist(this.center, [this.x, this.y]))
                                ],
                                25
                                );

            this.game.add(bullet)
            bullet.explode();
            this.loaded = false;

            setTimeout(() => {
                this.loaded = true;
            }, 500)
        } else {
            return;
        }
    }

    // fire2() {
    //     if (this.loaded2) {
    //         let bullet = new EnemyParticle(this.game,
    //             10,
    //             [this.x, this.y],
    //             [
    //                 (this.game.canvas.width / 2 - this.x) / (this.dist(this.center, [this.x, this.y])),

    //                 (this.game.canvas.height / 2 - this.y) / (this.dist(this.center, [this.x, this.y]))
    //             ],
    //             10
    //         );

    //         this.game.add(bullet)
    //         this.loaded2 = false;

    //         setTimeout(() => {
    //             this.loaded2 = true;
    //         }, 250)
    //     } else {
    //         return;
    //     }
    // }

    update(dt) {
        if (this.y >= (this.game.canvas.height - this.r) && this.x >= (this.game.canvas.width - this.r) ) {
            this.up = true;
            this.down = false;
        } else if (this.y <= this.r && this.x >= 100) {
            this.left = true;
            this.up = false;
        } else if (this.x <= 100 && this.y <= (this.game.canvas.height - this.r)) {
            this.left = false;
            this.down = true;
        } else if (this.down) {
            this.down = false;
            this.right = true;
        }

        if (this.frames === 10) {
            if (this.forward) {
                this.coords_x = this.coords_x + 200;
                if (this.coords_x === 1800) {
                    this.forward = !this.forward;
                }
            } else if (!this.forward) {
                this.coords_x = this.coords_x - 200;
                if (this.coords_x === 200) {
                    this.forward = true;
                }
            }
            this.frames = 0;
        }

        this.move(dt);
        this.fire();
        this.checkDead();
        this.frames += 1;
    }
    checkDead() {
        if (this.hp <= 0) {
            this.alive = false;
            this.pos = [];
            this.x = null;
            this.y = null;
            this.r = 0;
            this.game.enemies.shift();
            this.game.enemies.push(new Boss3(this.game, this.game.level));
            this.game.player.dmg = this.game.player.dmg * 1.1;
            setTimeout(() => {
                this.game.enemy = this.game.enemies[0];
                this.game.particles.push(this.game.enemy);
            }, 5000)
        }
    }

    draw() {
        this.ctx.save();
        // this.ctx.beginPath();
        // this.ctx.arc(this.x, this.y, this.r, 2 * Math.PI, false);
        // this.ctx.strokeStyle = "#000";
        // this.ctx.fillStyle = "#000";
        // this.ctx.shadowBlur = 5;
        // this.ctx.shadowColor = "white";
        // this.ctx.fill();
        // this.ctx.closePath();
        this.ctx.drawImage(this.sheet, this.coords_x, this.coords_y, 200, 200, this.x - 100, this.y - 100, 300, 300);

        this.ctx.restore();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Boss3);

/***/ }),

/***/ "./javascripts/enemy4.js":
/*!*******************************!*\
  !*** ./javascripts/enemy4.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enemy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemy */ "./javascripts/enemy.js");
/* harmony import */ var _enemy_particle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./enemy_particle */ "./javascripts/enemy_particle.js");
/* harmony import */ var _enemy_exposion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./enemy_exposion */ "./javascripts/enemy_exposion.js");




const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));
class Boss4 extends _enemy__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(game, level) {
        super(game);
        this.hp = 9001 * level;
        this.og_hp = 9001 * level;
        this.r = 100;
        this.pos = [game.canvas.width - 150, game.canvas.height -150];
        this.x = this.pos[0]
        this.y = this.pos[1]
        this.x_speed = .3;
        this.y_speed = .3;
        this.ctx = game.ctx;
        this.game = game;
        this.alive = true;
        this.level = level;
        this.up = true;
        this.down = false;
        this.left = false;
        this.right = false;

        this.loaded = true;
        this.loaded2 = true;
        this.loaded3 = true;
        this.aim = [this.game.player.x, this.game.player.y];
        this.center = [this.game.canvas.width / 2, this.game.canvas.height / 2];

        this.sheet = new Image();
        this.sheet.src = `${PATH}/app/enemy4.png`;
        this.coords_x = 0;
        this.coords_y = 0;
        this.forward = true;
        this.frames = 0;
    }

    move(dt) {
        if (this.up) {
            this.y = this.y - this.y_speed * dt
        } else if (this.down) {
            this.y = this.y + this.y_speed * dt
        } else if (this.left) {
            this.x = this.x - this.x_speed * dt
        } else if (this.right) {
            this.x = this.x + this.x_speed * dt
        }
    }

    dist(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
    }

    fire() {
        if (this.loaded) {
            let bullet = new _enemy_particle__WEBPACK_IMPORTED_MODULE_1__["default"](
                this.game,
                10,
                [this.x, this.y],
                [
                    (this.game.player.x - this.x) / (this.dist(this.aim, [this.x, this.y])) * 2,

                    ((this.game.player.y - this.y) / (this.dist(this.aim, [this.x, this.y]))) * 2
                ],
                15 * this.level)
            this.game.add(bullet);
            this.loaded = false;
            setTimeout(() => {
                this.loaded = true;
            }, 1000)
            console.log(this.level);
        }
    }

    fire2() {
        if (this.loaded2)  {
            for (let i = 0; i <= 360; i += 20) {
                let bullet = new _enemy_particle__WEBPACK_IMPORTED_MODULE_1__["default"](game, 10, [this.x, this.y], [.5 * Math.sin(i), .5 * Math.cos(i)]);
                this.game.add(bullet);
                }
            setTimeout(()=> {
                for (let i = 15; i <= 375; i += 20) {
                    let bullet = new _enemy_particle__WEBPACK_IMPORTED_MODULE_1__["default"](game, 10, [this.x, this.y], [.5 * Math.sin(i), .5 * Math.cos(i)]);
                    this.game.add(bullet);
                }
            }, 100)
            setTimeout(() => {
                for (let i = 30; i <= 390; i += 20) {
                    let bullet = new _enemy_particle__WEBPACK_IMPORTED_MODULE_1__["default"](game, 10, [this.x, this.y], [.5 * Math.sin(i), .5 * Math.cos(i)]);
                    this.game.add(bullet);
                }
            }, 200)
            setTimeout(() => {
                for (let i = 45; i <= 405; i += 20) {
                    let bullet = new _enemy_particle__WEBPACK_IMPORTED_MODULE_1__["default"](game, 10, [this.x, this.y], [.5 * Math.sin(i), .5 * Math.cos(i)]);
                    this.game.add(bullet);
                }
            }, 300)
            this.loaded2 = false
            setTimeout(() => {
                this.loaded2 = true;
            }, 2000)
            }
    }
            
    fire3() {
        if (this.loaded3) {

            let bullet = new _enemy_exposion__WEBPACK_IMPORTED_MODULE_2__["default"](this.game,
                10,
                [this.x, this.y],
                [
                    (this.game.canvas.width / 2 - this.x) / (this.dist(this.center, [this.x, this.y])),

                    (this.game.canvas.height / 2 - this.y) / (this.dist(this.center, [this.x, this.y]))
                ],
                25
            );

            this.game.add(bullet)
            bullet.explode();
            this.loaded3 = false;

            setTimeout(() => {
                this.loaded3 = true;
            }, 1500)
        } else {
            return;
        }
    }    


    update(dt) {
        if (this.y >= (this.game.canvas.height - this.r) && this.x >= (this.game.canvas.width - this.r)) {
            this.up = true;
            this.down = false;
        } else if (this.y <= this.r && this.x >= 100) {
            this.left = true;
            this.up = false;
        } else if (this.x <= 100 && this.y <= (this.game.canvas.height - this.r)) {
            this.left = false;
            this.down = true;
        } else if (this.down) {
            this.down = false;
            this.right = true;
        }

        if (this.frames === 10) {
            if (this.forward) {
                this.coords_x = this.coords_x + 80;
                if (this.coords_x === 880) {
                    this.forward = !this.forward;
                }
            } else if (!this.forward) {
                this.coords_x = this.coords_x - 80;
                if (this.coords_x === 80) {
                    this.forward = true;
                }
            }
            this.frames = 0;
        }

        this.move(dt);
        this.fire();
        this.fire2();
        this.fire3();
        this.checkDead();
        this.frames += 1;
    }
    checkDead() {
        if (this.hp <= 0) {
            this.alive = false;
            this.pos = [];
            this.x = null;
            this.y = null;
            this.r = 0;
            this.game.enemies.shift();
            this.game.level = this.game.level + 1;
            this.game.enemies.push(new Boss4(this.game, this.game.level));
            setTimeout(() => {
                this.game.enemy = this.game.enemies[0];
                this.game.particles.push(this.game.enemy);
            }, 5000)
        }
    }

    draw() {
        this.ctx.save();
        // this.ctx.beginPath();
        // this.ctx.arc(this.x, this.y, this.r, 2 * Math.PI, false);
        // this.ctx.strokeStyle = "#000";
        this.ctx.fillStyle = "#000";
        this.ctx.shadowBlur = 5;

            this.ctx.drawImage(this.sheet, this.coords_x, this.coords_y, 80, 80, this.x - 150, this.y - 150, 300, 300);

        // this.ctx.shadowColor = "white";
        // this.ctx.fill();
        // this.ctx.closePath();
        this.ctx.restore();
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Boss4);

/***/ }),

/***/ "./javascripts/enemy_exposion.js":
/*!***************************************!*\
  !*** ./javascripts/enemy_exposion.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enemy_particle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enemy_particle */ "./javascripts/enemy_particle.js");


class enemyExlodingParticle extends _enemy_particle__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(game, r, pos, vel, dmg) {
        super(game, r, pos, vel)
        this.pos = pos.slice();
        this.x = this.pos[0];
        this.y = this.pos[1];
        this.r = r * 3;
        this.ctx = game.ctx;
        this.vel = vel;
        this.damage = dmg * 1.5;
        this.alive = true;
        this.game = game;
    }

    explode() {
        setTimeout(() => {
            for (let i = 0; i < 360; i += 20) {
                let bullet = new _enemy_particle__WEBPACK_IMPORTED_MODULE_0__["default"](game, 10, [this.x, this.y], [.5 * Math.sin(i), .5 * Math.cos(i)], 20);
                // setTimeout(() => {
                this.game.add(bullet);
                // }, 50);
                this.alive = false;
            }
        }, 500)
    }
}

/* harmony default export */ __webpack_exports__["default"] = (enemyExlodingParticle);

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
    constructor(game, r, pos, vel, dmg = 50) {
        this.pos = pos.slice();
        this.x = this.pos[0];
        this.y = this.pos[1];
        this.r = r;
        this.ctx = game.ctx;
        this.vel = vel;
        this.damage = dmg;
        this.alive = true;
        this.game = game;
    }

    dist(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
    }

    enemyCollidesWith() {
        if (this.dist([this.x, this.y], [this.game.player.x, this.game.player.y]) < (this.r + this.game.player.radius)) {
            this.alive = false;
            if (!this.game.player.invuln) {
                if (this.game.player.hp - this.damage > 0) {
                    this.game.player.hp -= this.damage;
                } else {
                    this.game.player.hp = 0;
                }
            }
        }
    }

    update(dt) {
        this.x = this.x + dt * this.vel[0];
        this.y = this.y + dt * this.vel[1];
    }


    draw() {
        this.ctx.save()
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
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
/* harmony import */ var _enemy2__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./enemy2 */ "./javascripts/enemy2.js");
/* harmony import */ var _enemy3__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./enemy3 */ "./javascripts/enemy3.js");
/* harmony import */ var _enemy4__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enemy4 */ "./javascripts/enemy4.js");










const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));
class Game {
    constructor(ctx, canvas) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.loop = this.loop.bind(this);
        this.dt = 0;
        this.prevTime = Date.now();
        this.particles = [];
        this.enemies = [];
        this.level = 1;
        this.paused = false;
        this.bg = new Image();
        this.bg.src = `${PATH}/app/floor.png`;
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
        this.enemy1 = new _enemy__WEBPACK_IMPORTED_MODULE_4__["default"](this, this.level)
        this.enemies.push(this.enemy1);
        this.enemy2 = new _enemy2__WEBPACK_IMPORTED_MODULE_5__["default"](this, this.level);
        this.enemies.push(this.enemy2);
        this.enemy3= new _enemy3__WEBPACK_IMPORTED_MODULE_6__["default"](this, this.level);
        this.enemies.push(this.enemy3)
        this.enemy4 = new _enemy4__WEBPACK_IMPORTED_MODULE_7__["default"](this, this.level);
        this.enemies.push(this.enemy4)

        this.enemy = this.enemies[0];
        this.particles.push(this.player);
        this.particles.push(this.enemies[0]);
        this.paused = false;
        this.started = true;

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 80) {
                if (!this.paused) {
                    this.paused = true;
                } else if (this.paused) {
                    this.paused = false;
                }
           }
        })
        this.loop();
    }

    loop() {
        if (this.started) {
            if (!this.paused) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.bg, 0, 0, this.canvas.width, this.canvas.height);
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
            }
            this.prevTime = Date.now();
            window.requestAnimationFrame(this.loop);
        }
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
        if (this.game.started) {
            this.ctx.save();
            this.ctx.beginPath();

            this.ctx.fillStyle = '#32a852';
            this.ctx.fillRect(10, 10, this.player.hp * 2, 20);
            this.ctx.stroke();

            this.ctx.fillStyle = 'yellow';
            this.ctx.font = "15px Arial";
            this.ctx.fillText(this.player.hp + " / 300", 20, 25);

            this.ctx.beginPath();
            this.ctx.fillStyle = '#00ffee';
            this.ctx.fillRect(10, 30, this.player.charge * 3, 15);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.fillStyle = '#702413';
            this.ctx.fillRect(10, this.canvas.height - 60, ((this.canvas.width - 20) *(this.game.enemy.hp / this.game.enemy.og_hp)), 25);
            this.ctx.stroke();

            this.ctx.restore();
        }
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
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu */ "./javascripts/menu.js");
/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cursor */ "./javascripts/cursor.js");
// let canvas = document.createElement('canvas');
// let width = 1200;
// let height = 800;
// canvas.width = width;
// canvas.height = height;
// let context = canvas.getContext('2d');
// context.fillStyle = "#222";
// context.fillRect(0, 0, width, height);




const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));
window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        const menu = new _menu__WEBPACK_IMPORTED_MODULE_1__["default"](ctx, canvas);
        
        document.addEventListener('click', (e) => {
            menu.setMousePosition(e);
        })

    menu.draw();
})



/***/ }),

/***/ "./javascripts/menu.js":
/*!*****************************!*\
  !*** ./javascripts/menu.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./javascripts/game.js");

const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));

class Menu {
    constructor(ctx, canvas) {
        this.game = null;
        this.ctx = ctx;
        this.canvas = canvas;

        this.img = new Image();
        this.img.src = `${PATH}/app/logo.png`;

        this.linked_in = new Image();
        this.linked_in.src = `${PATH}/app/iconfinder_square-linkedin_317725.png`

        this.github = new Image()
        this.github.src = `${PATH}/app/GitHub-Mark-Light-120px-plus.png`;
        this.mousePos = [0,0];
    }

    gameStart(e) {
        e.preventDefault();
        if (!(this.game instanceof _game__WEBPACK_IMPORTED_MODULE_0__["default"])) {
            window.game = new _game__WEBPACK_IMPORTED_MODULE_0__["default"](this.ctx, this.canvas);
            this.game = window.game;
            this.game.start();
        } else {
            return;
        }
    }

    setMousePosition(e) {
        var canvasRect = this.canvas.getBoundingClientRect();
        this.mousePos[0] = e.clientX - canvasRect.left;
        this.mousePos[1] = e.clientY - canvasRect.top;
        if (!this.game || !this.game.started) { 
            if (
                (this.mousePos[0] > 50 && this.mousePos[0] < 100) &&
                (this.mousePos[1] > 50 && this.mousePos[1] < 100)
            ) {
                window.location = 'https://www.linkedin.com/in/stan1000/';
            } else if (
                (this.mousePos[0] > 120 && this.mousePos[0] < 170) &&
                (this.mousePos[1] > 50 && this.mousePos[1] < 100)
            ) {
                window.location = 'https://www.github.com/AetherVial/Game';
            }
        }
    }

    draw() {
        
        this.ctx.save();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = "30px Arial";
        this.ctx.textAlign = 'center';
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = "white";


      


        if (this.img.complete) {
            this.ctx.drawImage(this.img,
                                this.canvas.width / 2 - this.img.width / 2,
                                this.canvas.height / 2 - this.img.height / 2 - this.canvas.height / 4)
            } else {
                let ctx = this.ctx;
                let img = this.img;
                this.img.onload = function() {
                    ctx.drawImage(img,
                        ctx.canvas.width / 2 -img.width / 2,
                        ctx.canvas.height / 2 -img.height / 2 - ctx.canvas.height / 4)
                }
            }
        if (this.linked_in.complete) {
            this.ctx.drawImage(this.linked_in, 50, 50, 50, 50);
        } else {
            let ctx = this.ctx;
            let link = this.linked_in;
            this.linked_in.onload = function () {
                ctx.drawImage(link, 50, 50, 50, 50)
            }
        }

        if (this.github.complete) {
            this.ctx.drawImage(this.github, 120, 50, 50, 50);
        } else {
            let ctx = this.ctx;
            let github = this.github;
            this.github.onload = function () {
                ctx.drawImage(github, 120, 50, 50, 50)
            }
        }

        this.ctx.fillText("Press Space to Start",
            this.canvas.width / 2,
            this.canvas.height / 2);

        this.ctx.font = "20px Arial";
        this.ctx.textAlign = 'center';
        this.ctx.fillText("WASD - Move Character",
            this.canvas.width / 2,
            this.canvas.height - 300);
        this.ctx.fillText("Q - Dash in the direction you are moving",
            this.canvas.width / 2,
            this.canvas.height - 250);
        this.ctx.fillText("E - Clear all enemy bullets",
            this.canvas.width / 2,
            this.canvas.height - 200);
        this.ctx.fillText("MOUSE LEFT - Shoot",
            this.canvas.width / 2,
            this.canvas.height - 150);
        this.ctx.fillText("MOUSE MOVE - Aim",
            this.canvas.width / 2,
            this.canvas.height - 100);
        this.ctx.fillText("P - Pause / Unpause ",
            this.canvas.width / 2,
            this.canvas.height - 50);
        
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 32) {
                this.gameStart(e);
            }
        })

        this.ctx.restore();
    }
    
}

/* harmony default export */ __webpack_exports__["default"] = (Menu);

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
    constructor(game, pos, crosshair, speed = 1, dmg = 100) {
        this.pos = pos.slice();
        this.crosshair = crosshair.slice();
        this.x = this.pos[0];
        this.y = this.pos[1];
        this.r = 3;
        this.ctx = game.ctx;
        this.damage = dmg;
        this.alive = true;
        this.game = game;
        this.length = (Math.sqrt((Math.pow(this.crosshair[1] - this.pos[1], 2)) + Math.pow(this.crosshair[0] - this.pos[0], 2)));
        this.velDir = [((this.crosshair[0] - this.pos[0]) / this.length), ((this.crosshair[1] - this.pos[1]) / this.length)];
        this.vel = [this.velDir[0] * speed, this.velDir[1] * speed];
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
                (game.player.charge += 5);
            } else {
                game.player.charge = 100;
            }

            if (this.game.enemy.hp - this.damage > 0) {
                this.game.enemy.hp -= this.damage;
            } else if (this.game.enemy.hp - this.damage <= 0){
                game.enemy.hp = 0;
            }
        }
    }

    update(dt) {
        // let length = (Math.sqrt((Math.pow(this.crosshair[1] - this.pos[1], 2)) + Math.pow(this.crosshair[0] - this.pos[0], 2)))
        // this.x = this.x + ((this.crosshair[0] - this.pos[0]) / length) * dt
        // this.y = this.y + ((this.crosshair[1] - this.pos[1]) / length) * dt
        this.x = this.x + this.vel[0] * dt;
        this.y = this.y + this.vel[1] * dt;
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
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./menu */ "./javascripts/menu.js");



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
const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));
class Player {
    constructor(game) {
        this.game = game;
        this.radius = 10;
        this.pos = [game.canvas.width / 2, game.canvas.height / 2];
        this.x = this.pos[0];
        this.y = this.pos[1];
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
        this.powerUp1 = false;
        this.dmg = 100;

        this.sheet = new Image();
        this.sheet.src = `${PATH}/app/stitchFire.png`;
        this.coords_x = 0;
        this.coords_y = 0;
        this.forward = true;
        this.frames = 0;
    }

    move(x, y) {
        this.x += x;
        this.y += y;
        if (this.x < 0 ) {
            this.x = 0;
        } else if (this.y < 0) {
            this.y = 0;
        } else if (this.x + this.radius > this.canvas.width) {
            this.x = this.canvas.width - this.radius;
        } else if (this.y + this.radius > this.canvas.height) {
            this.y = this.canvas.height - this.radius;
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
        if (this.powerUp1) {
            if (Math.abs(crosshair[0] - pos[0]) < 100) {
                let bullet = new _particle__WEBPACK_IMPORTED_MODULE_0__["default"](game, pos, crosshair, 1, this.dmg);
                this.game.add(bullet);
                let bullet2 = new _particle__WEBPACK_IMPORTED_MODULE_0__["default"](game, pos, [crosshair[0] + 30, crosshair[1]], 1, this.dmg);
                this.game.add(bullet2);
                let bullet3 = new _particle__WEBPACK_IMPORTED_MODULE_0__["default"](game, pos, [Math.abs(30 - crosshair[0]), 1, crosshair[1]], this.dmg);
                this.game.add(bullet3); 
            } else {
                let bullet = new _particle__WEBPACK_IMPORTED_MODULE_0__["default"](game, pos, crosshair, 1, this.dmg);
                this.game.add(bullet);
                let bullet2 = new _particle__WEBPACK_IMPORTED_MODULE_0__["default"](game, pos, [crosshair[0], crosshair[1] + 30], 1, this.dmg);
                this.game.add(bullet2);
                let bullet3 = new _particle__WEBPACK_IMPORTED_MODULE_0__["default"](game, pos, [crosshair[0], Math.abs(30 - crosshair[1])], 1, this.dmg);
                this.game.add(bullet3);   
            } 
        } else {
            let bullet = new _particle__WEBPACK_IMPORTED_MODULE_0__["default"](game, pos, crosshair, 1, this.dmg);
            this.game.add(bullet);
        }
    }

    checkDead() {
        if (this.hp <= 0) {
            this.alive = false;
            this.pos = [];
            this.x = null;
            this.y = null;
            window.game.particles.forEach(el => {
                el.alive = false;
            });
            this.game.started = false;
            let menu = new _menu__WEBPACK_IMPORTED_MODULE_2__["default"](this.ctx, this.canvas);
            menu.draw();
        }
    }

    mountController() {
        document.addEventListener('keydown', (e) => {
            this.keyDown[e.keyCode] = true;
        });

        document.addEventListener('keyup', (e) => {
            this.keyDown[e.keyCode] = false;
        })

        document.addEventListener('mousemove', (e) => {
            this.setAim(e);
        })

        document.addEventListener('click', (e) => {
            if (this.alive) {
                this.fire(this.game, [this.x, this.y], this.crosshair);
            }
        })

        document.addEventListener('keydown', (e) => {
            switch (e.keyCode) {
                case 69:
                    if (this.charge >= 50) {
                        this.chargeAtk();
                    } else {
                        console.log('you must construct additional pylons');
                    }
                    return;
                case 81:
                    this.dash(this.x_speed, this.y_speed);
                    return;
                case 187: 
                    this.charge += 100;
                    return;
                case 189:
                    this.hp += 200;
                    return;
                case 8: 
                    this.hp = 0;
                    return;
                default:
                    break;
            }
          
        })
    }

    setAim(e) {
        let temp = this.canvas.getBoundingClientRect();
        this.crosshair = [e.clientX - temp.x, e.clientY - temp.y];
    }

    draw() {
        this.ctx.save();
        // this.ctx.beginPath();

        // this.ctx.arc(this.x, this.y, this.radius, 2 * Math.PI, false);

        // this.ctx.strokeStyle = "#00f7ff";
        // this.ctx.lineWidth = 5;
        // this.ctx.fillStyle = "#00f7ff";

        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = "#00f7ff";

        this.ctx.drawImage(this.sheet, this.coords_x, this.coords_y, 62, 43,
                             this.x-20, this.y-20, 62, 43);

        // this.ctx.fill();
        // this.ctx.closePath();
        this.ctx.restore();
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
        if (this.frames === 10) {
            if (this.forward) {
                this.coords_x = this.coords_x + 62;
                if (this.coords_x === 186) {
                    this.forward = !this.forward;
                }
            } else if (!this.forward) {
                this.coords_x = this.coords_x - 62;
                if (this.coords_x === 62) {
                    this.forward = true;
                }
            }
            this.frames = 0;
        }
        this.checkDead()
        this.frames += 1;
    }
}

/* harmony default export */ __webpack_exports__["default"] = (Player);

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map
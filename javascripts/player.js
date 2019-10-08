import Particle from './particle';
import EnemyParticle from './enemy_particle';
import Menu from './menu';
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
                let bullet = new Particle(game, pos, crosshair, 1, this.dmg);
                this.game.add(bullet);
                let bullet2 = new Particle(game, pos, [crosshair[0] + 30, crosshair[1]], 1, this.dmg);
                this.game.add(bullet2);
                let bullet3 = new Particle(game, pos, [Math.abs(30 - crosshair[0]), 1, crosshair[1]], this.dmg);
                this.game.add(bullet3); 
            } else {
                let bullet = new Particle(game, pos, crosshair, 1, this.dmg);
                this.game.add(bullet);
                let bullet2 = new Particle(game, pos, [crosshair[0], crosshair[1] + 30], 1, this.dmg);
                this.game.add(bullet2);
                let bullet3 = new Particle(game, pos, [crosshair[0], Math.abs(30 - crosshair[1])], 1, this.dmg);
                this.game.add(bullet3);   
            } 
        } else {
            let bullet = new Particle(game, pos, crosshair, 1, this.dmg);
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
            let menu = new Menu(this.ctx, this.canvas);
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
            if (el instanceof EnemyParticle) {
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

export default Player;
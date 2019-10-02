import Particle from './particle';

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
        let bullet = new Particle(game, pos, crosshair);
        this.game.add(bullet);
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
            console.log(this.game.enemy.alive)
            console.log(this.game.enemy.hp)
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
        this.ctx.beginPath();
        this.ctx.arc(this.pos[0], this.pos[1], this.radius, 2 * Math.PI, false);
        this.ctx.strokeStyle = "#FFF";
        this.ctx.fillStyle = "#FF00FF";
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = "white";
        this.ctx.fill();
        this.ctx.closePath();
    }

    chargeAtk() {
        this.game.particles.forEach(el => {
            if (el instanceof Particle) {
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
    }
}

export default Player;
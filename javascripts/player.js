import GameObject from './game_object';

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

export default Player;
import Game from './game';
import Player from './player';
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

export default Particle;
import Game from './game';
import Player from './player';
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
        this.damage = 100;
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

export default Particle;
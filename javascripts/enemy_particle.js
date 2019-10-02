import Particle from './particle';
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

export default EnemyParticle;
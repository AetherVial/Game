import Particle from './particle';
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

export default EnemyParticle;
import EnemyParticle from "./enemy_particle";

class enemyExlodingParticle extends EnemyParticle {
    constructor(game, r, pos, vel, dmg) {
        super(game, r, pos, vel)
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

    explode() {
        setTimeout(() => {
            for (let i = 45; i < 405; i += 10) {
                let bullet = new EnemyParticle(game, 10, [this.x, this.y], [.5 * Math.sin(i), .5 * Math.cos(i)], 10);
                // setTimeout(() => {
                this.game.add(bullet);
                // }, 50);
                this.alive = false;
            }
        }, 500)
    }
}

export default enemyExlodingParticle;
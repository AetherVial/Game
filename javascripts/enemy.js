import EnemyParticle from './enemy_particle';
import Particle from './particle';
class Boss {
    constructor(game, level) {
        this.hp = 1000 * level;
        this.og_hp = 1000 * level;
        this.r = 150;
        this.pos = [game.canvas.width - 150, game.canvas.height];
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
            this.r = 0;
            this.game.enemies.shift();
            this.game.enemies.push(new Boss(this.game, this.game.level));
            this.game.player.hp += 100;
            setTimeout(() => {
                this.game.enemy = this.game.enemies[0];
                this.game.particles.push(this.game.enemy);
            }, 10000)
        }   
    }

    fire() {
        if (this.loaded) {
            let bullet = new EnemyParticle(game, 50, [this.x, this.y], [-1, 0]);
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
                let bullet = new EnemyParticle(game, 10, [this.x, this.y], [-1, Math.cos(i)]);
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
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 2 * Math.PI, false);

        this.ctx.shadowColor = 'white';
        this.ctx.shadowBlur = 30;

        this.ctx.strokeStyle = "#FF0000";
        this.ctx.lineWidth = 5;
        this.ctx.fillStyle = "rgba(0,0,0,0)";
        // this.ctx.shadowColor = "#FF0000";

        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }
}

export default Boss;
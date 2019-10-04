import EnemyParticle from './enemy_particle';
import Boss from './enemy';
class Boss2 extends Boss{
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
            this.game.enemies.push(new Boss2(this.game, this.level));

            if (!this.game.player.powerUp1) {
                this.game.player.powerUp1 = true;
            }   
            
            setTimeout(() => {
                this.game.enemy = this.game.enemies[0];
                this.game.particles.push(this.game.enemy);
                console.log(this.game.enemies);
            }, 10000)
        }
    }

    fire() {
        if (this.loaded) {
            for (let i = 45; i < 405; i += 10) {
                let bullet = new EnemyParticle(game, 10, [this.x, this.y], [.5 * Math.sin(i), .5 * Math.cos(i)]);
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
            // setInterval(() => {
            //     let bullet = new EnemyParticle(game, 10, [this.x, this.y], [-1, 0]);
            //     this.game.add(bullet);
            // }, 1000)
            // setTimeout(() => {
            //     this.loaded = true;
            // }, 500)
            for (let i = 0; i < 360; i += 10) {
                let bullet = new EnemyParticle(game, 10, [this.x, this.y], [Math.sin(i), Math.cos(i)]);
                this.game.add(bullet);
            }
            this.loaded2 = false;
            setTimeout(() => {
                this.loaded2 = true;
            }, 4000)
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 2 * Math.PI, false);
        this.ctx.strokeStyle = "#000";
        this.ctx.fillStyle = "#000";
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = "white";
        this.ctx.fill();
        this.ctx.closePath();
    }
}

export default Boss2;
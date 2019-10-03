import Boss from './enemy';
import EnemyParticle from './enemy_particle';
import ExplodingEnemyParticle from './enemy_exposion';

class Boss3 extends Boss {
    constructor(game) {
        super(game);
        this.hp = 8000;
        this.og_hp = 8000;
        this.r = 100;
        this.pos = [game.canvas.width-100, game.canvas.height / 2];
        this.x = this.pos[0]
        this.y = this.pos[1]
        this.x_speed = .3;
        this.y_speed = .3;
        this.ctx = game.ctx;
        this.game = game;
        this.alive = true;

        this.up = true;
        this.down = false;
        this.left = false;
        this.right = false;
    
        this.loaded = true;
        this.loaded2 = true;
        this.center = [this.game.canvas.width / 2, this.game.canvas.height / 2]
    }

    move(dt) {
        if (this.up) {
            this.y = this.y - this.y_speed * dt
        } else if (this.down) {
            this.y = this.y + this.y_speed * dt
        } else if (this.left) {
            this.x = this.x - this.x_speed * dt
        } else if (this.right) {
            this.x = this.x + this.x_speed * dt
        }
    }

    dist(pos1, pos2) {
        return Math.sqrt(
            Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
        );
    }

    fire() {
        if (this.loaded) {
            
            let bullet = new ExplodingEnemyParticle(this.game, 
                                10, 
                                [this.x, this.y], 
                                [
                                (this.game.canvas.width / 2 - this.x) / (this.dist(this.center, [this.x, this.y])), 
                                
                                (this.game.canvas.height / 2 - this.y) / (this.dist(this.center, [this.x, this.y]))
                                ],
                                10
                                );

            this.game.add(bullet)
            bullet.explode();
            this.loaded = false;

            setTimeout(() => {
                this.loaded = true;
            }, 2000)
        } else {
            return;
        }
    }

    update(dt) {
        if (this.y >= (this.game.canvas.height - this.r) && this.x >= (this.game.canvas.width - this.r) ) {
            this.up = true;
            this.down = false;
        } else if (this.y <= this.r && this.x >= 100) {
            this.left = true;
            this.up = false;
        } else if (this.x <= 100 && this.y <= (this.game.canvas.height - this.r)) {
            this.left = false;
            this.down = true;
        } else if (this.down) {
            this.down = false;
            this.right = true;
        }
        this.move(dt);
        this.fire();
        this.checkDead();
    }
    checkDead() {
        if (this.hp <= 0) {
            this.alive = false;
            this.pos = [];
            this.x = null;
            this.y = null;
            this.r = 0;
            this.game.enemies.shift();
            this.game.enemies.push(new Boss3(this.game));
            this.game.player.dmg += 100;
            setTimeout(() => {
                this.game.enemy = this.game.enemies[0];
                this.game.particles.push(this.game.enemy);
            }, 10000)
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

export default Boss3;
import Boss from './enemy';
import EnemyParticle from './enemy_particle';
import ExplodingEnemyParticle from './enemy_exposion';

class Boss4 extends Boss {
    constructor(game, level) {
        super(game);
        this.hp = 9001 * level;
        this.og_hp = 9001 * level;
        this.r = 150;
        this.pos = [game.canvas.width - 150, game.canvas.height -150];
        this.x = this.pos[0]
        this.y = this.pos[1]
        this.x_speed = .3;
        this.y_speed = .3;
        this.ctx = game.ctx;
        this.game = game;
        this.alive = true;
        this.level = level;
        this.up = true;
        this.down = false;
        this.left = false;
        this.right = false;

        this.loaded = true;
        this.loaded2 = true;
        this.loaded3 = true;
        this.aim = [this.game.player.x, this.game.player.y];
        this.center = [this.game.canvas.width / 2, this.game.canvas.height / 2];
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
            let bullet = new EnemyParticle(
                this.game,
                10,
                [this.x, this.y],
                [
                    (this.game.player.x - this.x) / (this.dist(this.aim, [this.x, this.y])) * 2,

                    ((this.game.player.y - this.y) / (this.dist(this.aim, [this.x, this.y]))) * 2
                ],
                10 * this.level)
            this.game.add(bullet);
            this.loaded = false;
            setTimeout(() => {
                this.loaded = true;
            }, 1000)
            console.log(this.level);
        }
    }

    fire2() {
        if (this.loaded2)  {
            for (let i = 0; i <= 360; i += 20) {
                let bullet = new EnemyParticle(game, 10, [this.x, this.y], [.5 * Math.sin(i), .5 * Math.cos(i)]);
                this.game.add(bullet);
                }
            setTimeout(()=> {
                for (let i = 15; i <= 375; i += 20) {
                    let bullet = new EnemyParticle(game, 10, [this.x, this.y], [.5 * Math.sin(i), .5 * Math.cos(i)]);
                    this.game.add(bullet);
                }
            }, 100)
            setTimeout(() => {
                for (let i = 30; i <= 390; i += 20) {
                    let bullet = new EnemyParticle(game, 10, [this.x, this.y], [.5 * Math.sin(i), .5 * Math.cos(i)]);
                    this.game.add(bullet);
                }
            }, 200)
            setTimeout(() => {
                for (let i = 45; i <= 405; i += 20) {
                    let bullet = new EnemyParticle(game, 10, [this.x, this.y], [.5 * Math.sin(i), .5 * Math.cos(i)]);
                    this.game.add(bullet);
                }
            }, 300)
            this.loaded2 = false
            setTimeout(() => {
                this.loaded2 = true;
            }, 2000)
            }
    }
            
    fire3() {
        if (this.loaded3) {

            let bullet = new ExplodingEnemyParticle(this.game,
                10,
                [this.x, this.y],
                [
                    (this.game.canvas.width / 2 - this.x) / (this.dist(this.center, [this.x, this.y])),

                    (this.game.canvas.height / 2 - this.y) / (this.dist(this.center, [this.x, this.y]))
                ],
                25
            );

            this.game.add(bullet)
            bullet.explode();
            this.loaded3 = false;

            setTimeout(() => {
                this.loaded3 = true;
            }, 1500)
        } else {
            return;
        }
    }    


    update(dt) {
        if (this.y >= (this.game.canvas.height - this.r) && this.x >= (this.game.canvas.width - this.r)) {
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
        this.fire2();
        this.fire3();
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
            this.game.level = this.game.level + 1;
            this.game.enemies.push(new Boss4(this.game, this.game.level));
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

export default Boss4;
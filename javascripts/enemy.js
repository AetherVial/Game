import EnemyParticle from './enemy_particle';
import Particle from './particle';

const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));
class Boss {
    constructor(game, level) {
        this.hp = 1000 * level;
        this.og_hp = 1000 * level;
        this.r = 75;
        this.pos = [game.canvas.width - 150, game.canvas.height - 150];
        this.x = this.pos[0];
        this.y = this.pos[1];
        this.y_speed = .3;
        this.ctx = game.ctx;
        this.game = game;
        this.alive = true;
        this.up = true;
        this.loaded = true;
        this.loaded2 = true;
        this.sheet = new Image();
        this.sheet.src = `${PATH}/app/wizard.png`;
        this.coords_x = 0;
        this.coords_y = 0;
        this.forward = true;
        this.frames = 0;
    }

    move(dt) {
        if (this.up) {
            this.y = this.y - (this.y_speed * .75) * dt
        } else {
            this.y = this.y + (this.y_speed * .75) * dt
        }
    }

    update(dt) {
        this.checkDead();
        if (this.y >= this.game.canvas.height - 150) {
            this.up = true;
        } else if (this.y <= 150) {
            this.up = false;
        }
        if (this.frames === 10) {
            if (this.forward) {
                this.coords_x = this.coords_x + 80;
                if (this.coords_x === 720) {
                    this.forward = !this.forward;
                }
            } else if (!this.forward) {
                this.coords_x = this.coords_x - 80;
                if (this.coords_x === 80) {
                    this.forward = true;
                }
            }
            this.frames = 0;
        }
        this.move(dt);
        this.fire2();
        this.fire();
        this.frames = this.frames + 1;
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
            }, 5000)
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
        this.ctx.drawImage(this.sheet, this.coords_x, this.coords_y, 80, 80, this.x - 150, this.y - 150, 300, 300);

        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
    }
}

export default Boss;
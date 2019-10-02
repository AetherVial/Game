import EnemyParticle from './enemy_particle';
class Boss {
    constructor(game) {
        this.hp = 1000;
        this.r = 200;
        this.pos = [game.canvas.width - 200, game.canvas.height];
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
            // setInterval(() => {
            //     let bullet = new EnemyParticle(game, 10, [this.x, this.y], [-1, 0]);
            //     this.game.add(bullet);
            // }, 1000)
            // setTimeout(() => {
            //     this.loaded = true;
            // }, 500)
            for (let i = 0; i < 90; i+=10) {
                let bullet = new EnemyParticle(game, 10, [this.x, this.y], [-1, Math.cos(i)]);
                this.game.add(bullet);
            }
            this.loaded2 = false;
            setTimeout(() => {
                this.loaded2 = true;
            }, 500)
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

export default Boss;
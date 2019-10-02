import Player from './player';
import Particle from './particle';
import EnemyParticle from './enemy_particle';
import HUD from './hud';
import Enemy from './enemy';
import Enemy2 from './enemy2';

class Game {
    constructor(ctx, canvas) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.loop = this.loop.bind(this);
        this.dt = 0;
        this.prevTime = Date.now();
        this.particles = [];
        this.enemies = [];
    }

    add(object) {
        if (object instanceof Particle || object instanceof EnemyParticle) {
            this.particles.push(object);
        }
    }


    checkBounds(particle) {
        if (particle.x >= this.canvas.width || particle.x <= 0 || particle.y >= this.canvas.height || particle.y <= 0) {
            particle.alive = false;
        }
    }

    start() {
        this.player = new Player(this);
        this.player.mountController();
        this.hud = new HUD(this);
        
        this.enemy = new Enemy(this);
        this.enemies.push(this.enemy);
        this.enemy2 = new Enemy2(this);
        // this.enemy = new Enemy2(this);
        this.enemies.push(this.enemy2);

        this.particles.push(this.player);
        console.log(this.enemy)
        this.particles.push(this.enemies[0]);
        console.log(this.particles);
    }

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles = this.particles.filter(el => {
            if (el.alive) return el;
        })
        this.particles.forEach(el => {
            if (el.alive) {
                el.draw();
                el.update(this.dt);
                if (el instanceof Particle) {
                    this.checkBounds(el);
                    el.collidesWith();
                }
                if (el instanceof EnemyParticle) {
                    this.checkBounds(el);
                    el.enemyCollidesWith();
                }
            }
        })
        this.hud.draw();
        this.dt = Date.now() - this.prevTime;
        this.prevTime = Date.now();
        window.requestAnimationFrame(this.loop);
    }
}

export default Game;
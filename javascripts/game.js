import Player from './player';
import Particle from './particle';
import EnemyParticle from './enemy_particle';
import HUD from './hud';
import Enemy from './enemy';
import Enemy2 from './enemy2';
import Enemy3 from './enemy3';
import Enemy4 from './enemy4';


const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));
class Game {
    constructor(ctx, canvas) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.loop = this.loop.bind(this);
        this.dt = 0;
        this.prevTime = Date.now();
        this.particles = [];
        this.enemies = [];
        this.level = 1;
        this.paused = false;
        this.bg = new Image();
        this.bg.src = `${PATH}/app/floor.png`;
        this.bgm = new Audio();
        this.bgm.src = `${PATH}/app/GungeonUp.mp3`;
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
        this.enemy1 = new Enemy(this, this.level)
        this.enemies.push(this.enemy1);
        this.enemy2 = new Enemy2(this, this.level);
        this.enemies.push(this.enemy2);
        this.enemy3= new Enemy3(this, this.level);
        this.enemies.push(this.enemy3)
        this.enemy4 = new Enemy4(this, this.level);
        this.enemies.push(this.enemy4)

        this.enemy = this.enemies[0];
        this.particles.push(this.player);
        this.particles.push(this.enemies[0]);
        this.paused = false;
        this.started = true;

        this.bgm.load();
        this.bgm.play();
        this.bgm.loop = true;

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 80) {
                if (!this.paused) {
                    this.paused = true;
                } else if (this.paused) {
                    this.paused = false;
                }
           }
        })
        this.loop();
    }

    loop() {
        if (this.started) {
            if (!this.paused) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(this.bg, 0, 0, this.canvas.width, this.canvas.height);
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
            }
            this.prevTime = Date.now();
            window.requestAnimationFrame(this.loop);
        }
    } 
}

export default Game;
# [Enter the Blungeon](https://aethervial.github.io/Game/)

------

### Tech Stack

* Javascript
* HTML5 / CSS3

------

### [Live Link](https://aethervial.github.io/Game/)

Welcome to Enter the Blungeon, a game inspired by one of my favories, Enter the Gungeon. 

------
### How to Use
------

To play, you can go to the live link up top, which takes you to the site hosted on Github Pages or you can download this repository and run the following: 

* ```python -m SimpleHTTPServer 8000```
* ```npm install```
* ```npm start```

and go to localhost:8000 in your browser of choice (preferebly Chrome).

------
### Features
------
Enter the Blungeon is a single player bullet-hell game with rogue-like elements. Players have the ability to dash in a direction they're currently moving, shoot at enemies and clear the bullets off the screen. Players gain small powerups at the end of each level, either increasing the number of bullets fired per fire command, health or damage. The game uses a basic WASD movement setup, with Q to dash and E to use the clear button. Mouse left click and move shoot and aim, respectively.
![Dash](https://github.com/AetherVial/Game/blob/master/app/dash.gif)

------
### Code Examples
------
Below are some code snippets of this application:

* The following code snippet is part of Boss #2. Boss #2 fires bullets in a circle around it to cover as much of the screen as it can. The enemy's bullet class, EnemyParticle, takes in a game, damage value, the boss's position and the sin(i) and cos(i) to generate bullets that travel in different angles. Iterating through 360 and generating bullets at certain angles makes it seem like the bulletst are exploding from the enemy on the screen in a circle. 
![Dash](https://github.com/AetherVial/Game/blob/master/app/boss2.gif)
```js
  for (let i = 0; i < 360; i += 10) {
                let bullet = new EnemyParticle(game, 10, [this.x, this.y], [Math.sin(i), Math.cos(i)]);
                this.game.add(bullet);
            }
```
* The following code snippet updates the current position of the mouse and sets the player's aim.

```js
setAim(e) {
        let temp = this.canvas.getBoundingClientRect();
        this.crosshair = [e.clientX - temp.x, e.clientY - temp.y];
    }
  ```
  
 * The following function is my core game loop. It's responsible for clearing the canvas each frame and drawing everything else. Each canvas element (the enemies, bullets and player) has a boolean property called ```alive``` and if alive is false, the canvas no longer continues to draw that object. I've set a ```dt``` variable that makes sure everything run smoothly by standardizing the amount of movement on the screen every frame. 
 
 ```js
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
 ```
 
---
Thanks for taking a look at my game and I hope you'll try it out!

Contributors:

Stanton Huang



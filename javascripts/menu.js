import Game from './game';
const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));

class Menu {
    constructor(ctx, canvas) {
        this.game = null;
        this.ctx = ctx;
        this.canvas = canvas;

        this.img = new Image();
        this.img.src = `${PATH}/app/logo.png`;

        this.linked_in = new Image();
        this.linked_in.src = `${PATH}/app/iconfinder_square-linkedin_317725.png`

        this.github = new Image()
        this.github.src = `${PATH}/app/GitHub-Mark-Light-120px-plus.png`;
        this.mousePos = [0,0];
    }

    gameStart(e) {
        e.preventDefault();
        if (!(this.game instanceof Game)) {
            window.game = new Game(this.ctx, this.canvas);
            this.game = window.game;
            this.game.start();
        } else {
            return;
        }
    }

    setMousePosition(e) {
        var canvasRect = this.canvas.getBoundingClientRect();
        this.mousePos[0] = e.clientX - canvasRect.left;
        this.mousePos[1] = e.clientY - canvasRect.top;
        if (!this.game || !this.game.started) { 
            if (
                (this.mousePos[0] > 50 && this.mousePos[0] < 100) &&
                (this.mousePos[1] > 50 && this.mousePos[1] < 100)
            ) {
                window.location = 'https://www.linkedin.com/in/stan1000/';
            } else if (
                (this.mousePos[0] > 120 && this.mousePos[0] < 170) &&
                (this.mousePos[1] > 50 && this.mousePos[1] < 100)
            ) {
                window.location = 'https://www.github.com/AetherVial/Game';
            }
        }
    }

    draw() {
        
        this.ctx.save();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = "30px Arial";
        this.ctx.textAlign = 'center';
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = "white";


      


        if (this.img.complete) {
            this.ctx.drawImage(this.img,
                                this.canvas.width / 2 - this.img.width / 2,
                                this.canvas.height / 2 - this.img.height / 2 - this.canvas.height / 4)
            } else {
                let ctx = this.ctx;
                let img = this.img;
                this.img.onload = function() {
                    ctx.drawImage(img,
                        ctx.canvas.width / 2 -img.width / 2,
                        ctx.canvas.height / 2 -img.height / 2 - ctx.canvas.height / 4)
                }
            }
        if (this.linked_in.complete) {
            this.ctx.drawImage(this.linked_in, 50, 50, 50, 50);
        } else {
            let ctx = this.ctx;
            let link = this.linked_in;
            this.linked_in.onload = function () {
                ctx.drawImage(link, 50, 50, 50, 50)
            }
        }

        if (this.github.complete) {
            this.ctx.drawImage(this.github, 120, 50, 50, 50);
        } else {
            let ctx = this.ctx;
            let github = this.github;
            this.github.onload = function () {
                ctx.drawImage(github, 120, 50, 50, 50)
            }
        }

        this.ctx.fillText("Press Space to Start",
            this.canvas.width / 2,
            this.canvas.height / 2);

        this.ctx.font = "20px Arial";
        this.ctx.textAlign = 'center';
        this.ctx.fillText("WASD - Move Character",
            this.canvas.width / 2,
            this.canvas.height - 300);
        this.ctx.fillText("Q - Dash in the direction you are moving",
            this.canvas.width / 2,
            this.canvas.height - 250);
        this.ctx.fillText("E - Clear all enemy bullets",
            this.canvas.width / 2,
            this.canvas.height - 200);
        this.ctx.fillText("MOUSE LEFT - Shoot",
            this.canvas.width / 2,
            this.canvas.height - 150);
        this.ctx.fillText("MOUSE MOVE - Aim",
            this.canvas.width / 2,
            this.canvas.height - 100);
        this.ctx.fillText("P - Pause / Unpause ",
            this.canvas.width / 2,
            this.canvas.height - 50);
        
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 32) {
                this.gameStart(e);
            }
        })

        this.ctx.restore();
    }
    
}

export default Menu;
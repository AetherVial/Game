import Game from './game';
const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));

class Menu {
    constructor(ctx, canvas) {
        this.game = null;
        this.ctx = ctx;
        this.canvas = canvas;

        this.bg = new Image();
        this.bg.src = `${PATH}/app/title.png`;
        this.img = new Image();
        this.img.src = `${PATH}/app/logo.png`;
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

    draw() {
        
        this.ctx.save();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#222';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.bg.complete) {
            this.ctx.drawImage(this.bg, 
                            0, 
                            0, 
                            this.canvas.width, 
                            this.canvas.height)
        } else {
            let ctx = this.ctx;
            let bg = this.bg;
            this.bg.onload = function() {
                ctx.drawImage(bg,
                    0,
                    0,
                    ctx.canvas.width,
                    ctx.canvas.height)
            }
        }
        
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 32) {
                this.gameStart(e);
            }
        })

        this.ctx.restore();
    }
    
}

export default Menu;
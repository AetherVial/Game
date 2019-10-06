import Game from './game';
class Menu {
    constructor(ctx, canvas) {
        // this.game = game || new Game(ctx, canvas);
        this.game = null;
        this.ctx = ctx;
        this.canvas = canvas;
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
        
        this.game = 'aklsndasd'
        this.ctx.save();
        const img = new Image();
        img.src = "../app/logo.png";
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.fillStyle = '#222222';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // this.ctx.drawImage(img, this.canvas.width / 2 - img.width / 2,
        //                         this.canvas.height / 2 - img.height / 2,
        //                         img.width, 
        //                         img.height);
            
        // this.ctx.beginPath();
        // this.ctx.fillStyle = '#32a852';
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.stroke();
        this.ctx.fillStyle = 'yellow';
        this.ctx.font = "200px Arial";
        this.ctx.fillText('filler title', 200, 200);

        this.ctx.fillStyle = 'white';
        this.ctx.font = "200px Arial";
        this.ctx.fillText('start game', 400, 400);

        this.canvas.addEventListener('click', (e) => {this.gameStart(e)});

        this.ctx.restore();
    }
    
}

export default Menu;
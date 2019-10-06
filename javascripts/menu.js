import Game from './game';
const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));

class Menu {
    constructor(ctx, canvas) {
        // this.game = game || new Game(ctx, canvas);
        this.game = null;
        this.ctx = ctx;
        this.canvas = canvas;
        this.bg = new Image();
        this.bg.src = `${PATH}/app/floor.png`;
        this.img = new Image();
        this.img.src = `${PATH}/app/logo.png`;
        // this.bgm = new Audio();
        // this.bgm.src = `${PATH}/app/EnterTheGun.mp3`;
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

        // this.bgm.load();
        // this.bgm.play();

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        // this.ctx.fillStyle = '#222222';
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.bg, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.img, this.canvas.width / 2 - this.img.width / 2,
                                this.canvas.height / 2 - this.img.height,
                                this.img.width, 
                                this.img.height);
            
        // this.ctx.beginPath();
        // this.ctx.fillStyle = '#32a852';
        // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // this.ctx.stroke();
        // this.ctx.fillStyle = 'yellow';
        // this.ctx.font = "200px Arial";
        // this.ctx.fillText('filler title', 200, 200);

        // this.ctx.fillStyle = 'white';
        // this.ctx.font = "200px Arial";
        // this.ctx.fillText('start game', 400, 400);

        // this.canvas.addEventListener('click', (e) => {
        //     // if (e.keyCode === 32) {
        //         this.gameStart(e)
        //     }
        // );

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 32) {
                this.gameStart(e);
            }
        })

        this.ctx.restore();
    }
    
}

export default Menu;
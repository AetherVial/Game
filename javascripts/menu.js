import Game from './game';
const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));

class Menu {
    constructor(ctx, canvas) {
        this.game = null;
        this.ctx = ctx;
        this.canvas = canvas;

        this.img = new Image();
        this.img.src = `${PATH}/app/logo.png`;

        this.qwe = new Image();
        this.qwe.src = `${PATH}/app/QWEASD.png`;

        this.leftClick = new Image();
        this.leftClick.src = `${PATH}/app/leftClick.png`;
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
        this.ctx.shadowBlur = 5;
        this.ctx.shadowColor = "white";
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = "30px Arial";
        this.ctx.textAlign = 'center';
        this.ctx.fillText("Press Space to Start",
                        this.canvas.width / 2,
                        this.canvas.height / 2);

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

        if (this.qwe.complete) {
            this.ctx.drawImage(this.qwe,
                this.canvas.width / 5,
                this.canvas.height - this.qwe.height / 5 - 100,
                this.qwe.width / 5,
                this.qwe.height / 5)
        } else {
            let ctx = this.ctx;
            let qwe = this.qwe;
            this.qwe.onload = function () {
                ctx.drawImage(qwe,
                    ctx.canvas.width / 5,
                    ctx.canvas.height - qwe.height / 5 - 100,
                    qwe.width / 5,
                    qwe.height / 5)
            }
        }

        if (this.leftClick.complete) {
            this.ctx.drawImage(this.leftClick,
                this.canvas.width / 5,
                this.canvas.height - this.leftClick.height / 5 - 100,
                this.leftClick.width / 5,
                this.leftClick.height / 5)
        } else {
            let ctx = this.ctx;
            let leftClick = this.leftClick;
            this.leftClick.onload = function () {
                ctx.drawImage(leftClick,
                    ctx.canvas.width / 5,
                    ctx.canvas.height - leftClick.height / 5 - 100,
                    leftClick.width / 5,
                    leftClick.height / 5)
            }
        }

        // this.ctx.fillStyle = '#fff';
        // this.ctx.font = "30px Arial";
        // this.ctx.textAlign = 'center';
        // this.ctx.fillText("Press Space to Start",
        //     this.canvas.width / 2,
        //     this.canvas.height / 2);
        

        
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 32) {
                this.gameStart(e);
            }
        })

        this.ctx.restore();
    }
    
}

export default Menu;
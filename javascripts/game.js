import Player from './player'

class Game {
    constructor(ctx, canvas) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.loop = this.loop.bind(this);
        this.player = new Player(canvas, ctx)
    }

    start() {
        // console.log('hi')
        this.player.draw();
        this.player.mountController();
    }

    loop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.draw();
        window.requestAnimationFrame(this.loop);
        // this.player.move();
        // console.log(this.player)
    }
}

export default Game;
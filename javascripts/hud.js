import Game from './game';

class HUD {
    constructor(game) {
        this.game = game;
        this.player = game.player;
        this.ctx = game.ctx;
        this.canvas = game.canvas;
    }

    draw() {

        this.ctx.beginPath();
        // this.ctx.rect(10,10,game.player.hp * 2, 20);
        this.ctx.fillStyle = '#32a852';
        this.ctx.fillRect(10, 10, game.player.hp * 2, 20);
        this.ctx.stroke();

        this.ctx.fillStyle = 'yellow';
        this.ctx.font = "15px Arial";
        this.ctx.fillText(this.player.hp + " / 300", 20, 25);

        this.ctx.beginPath();
        // this.ctx.rect(10,30,game.player.charge * 3, 15);
        this.ctx.fillStyle = '#00ffee';
        this.ctx.fillRect(10, 30, game.player.charge * 3, 15);
        this.ctx.stroke();

        this.ctx.beginPath();
        // this.ctx.rect(10, this.canvas.height - 60, ((this.canvas.width - 20) * (this.game.enemy.hp / this.game.enemy.og_hp)), 25);
        this.ctx.fillStyle = '#702413';
        this.ctx.fillRect(10, this.canvas.height - 60, ((this.canvas.width - 20) *(this.game.enemy.hp / this.game.enemy.og_hp)), 25);
        this.ctx.stroke();

    }
}

export default HUD;
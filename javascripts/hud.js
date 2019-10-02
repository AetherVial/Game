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
        this.ctx.rect(10,10,game.player.hp * 2, 50);
        this.ctx.fillStyle = '#32a852';
        this.ctx.fillRect(10, 10, game.player.hp * 2, 50);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.rect(10,70,game.player.charge * 3, 25);
        this.ctx.fillStyle = '#00ffee';
        this.ctx.fillRect(10, 70, game.player.charge * 3, 25);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.rect(10, this.canvas.height - 60, ((this.canvas.width - 20) * (this.game.enemy.hp / this.game.enemy.og_hp)), 25);
        this.ctx.fillStyle = '#702413';
        this.ctx.fillRect(10, this.canvas.height - 60, ((this.canvas.width - 20) *(this.game.enemy.hp / this.game.enemy.og_hp)), 25);
        this.ctx.stroke();
    }
}

export default HUD;
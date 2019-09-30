// let canvas = document.createElement('canvas');
// let width = 1200;
// let height = 800;
// canvas.width = width;
// canvas.height = height;
// let context = canvas.getContext('2d');
// context.fillStyle = "#222";
// context.fillRect(0, 0, width, height);
import Game from './game';

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        // ctx.fillStyle = "#222";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    const game = new Game(ctx, canvas);
    window.game = game;
    // game.player.draw();
    // game.player.mountController();
    game.start();
    game.loop();
})


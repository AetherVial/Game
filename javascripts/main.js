// let canvas = document.createElement('canvas');
// let width = 1200;
// let height = 800;
// canvas.width = width;
// canvas.height = height;
// let context = canvas.getContext('2d');
// context.fillStyle = "#222";
// context.fillRect(0, 0, width, height);
import Game from './game';
import Menu from './menu';
import Cursor from './cursor';

const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));
window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById('game');
    const ctx = canvas.getContext('2d');
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        const menu = new Menu(ctx, canvas);
        
        document.addEventListener('click', (e) => {
            menu.setMousePosition(e);
        })

    menu.draw();
})


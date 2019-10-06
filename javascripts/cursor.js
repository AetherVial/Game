const PATH = document.URL.substr(0, document.URL.lastIndexOf('/'));

class Cursor {
    constructor(ctx, canvas) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.crosshair = [];
        this.img = new Image();
        this.img.src = `${PATH}/app/crosshair.png`;
    }

    setAim(e) {
        let temp = this.canvas.getBoundingClientRect();
        this.crosshair = [e.clientX - temp.x, e.clientY - temp.y];
    }

    draw() {
        this.ctx.drawImage(this.img, 335, 268, 61, 64, this.canvas.width / 2, this.canvas.height / 2);
    }

    update() {

    }

}

export default Cursor
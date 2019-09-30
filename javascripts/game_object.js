class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.x_speed = 0;
        this.y_speed = 5;
        this.radius = 10;
    }

    render() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
        context.fillStyle = "#FFFFFF";
        context.fill();
    }
}

export default GameObject;
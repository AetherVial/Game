class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v) {

    }

    subtract(v) {

    }

    divide(v) {
        if (v instanceof Vector) {
            if (v.x !== 0) this.x /= v.x;
            if (v.y !== 0) this.y /= v.y;
        } else {
            if (v !== 0) {
                this.x /= v;
                this.y /= v;
            }
        }
        return this;
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    length() {
        return Math.sqrt(this.dot(this));
    }

    normalize() {
        return this.divide(this.length());
    }
}

export default Vector;
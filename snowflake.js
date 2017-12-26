

function getRandomSize() {
    return max(abs(randomGaussian(40)), 20);
}

class Snowflake {

    constructor(sprite) {
        
        this.sprite = sprite;
    
        let x = random(width);
        let y = random(-height, -10);
        
    
        this.pos = createVector(x, y);
        this.vel = createVector(0, 5);
        this.acc = createVector();


        //Size of the snowflake 
        this.r = getRandomSize();

        //Let's make them rotate!
        this.angle = random(Math.PI);
        this.dir = (random(1) > 0.5) ? 1 : -1;
    }

    applyForce(force) {
        let f = force.copy();
        f.mult(this.r);
        this.acc.add(f);
    }

    update() {
        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.vel.limit(this.r * 0.05);
        this.angle += this.dir * this.vel.mag() / 200;
        if (this.isOffscreen()) {
            this.pos = createVector(random(width), -this.r);
        }
    }

    render() {
        //Let's also make them obscilate a little bit
        let offset = sin(this.angle) * this.r;        
        push();
        imageMode(CENTER);
        translate(this.pos.x + offset, this.pos.y); 
        rotate(this.angle);
        image(this.sprite, 0, 0, this.r, this.r);
        pop();
    }

    isOffscreen() {
        return this.pos.y > (height + this.r);
    }

}


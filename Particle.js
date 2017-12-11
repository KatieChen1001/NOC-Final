"use strict"

class Particle {

  constructor(x,y,z) {
    this.pos = createVector(x,y,z);
    this.vel = createVector();
    this.acc = createVector();
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(f) {
    this.acc.add(f);
  }

  flow(angle, maxDesiredVel, maxSteerForce) {
    // rewrite the fromAngle() function to form a new vector
    var desiredX = cos(angle);
    var desiredZ = sin(angle);
    var desiredVel = createVector(desiredX, 0, desiredZ)
    // var desiredVel = p5.Vector.fromAngle( angle );
    desiredVel.normalize();
    desiredVel.mult( maxDesiredVel );
    var steerForce = p5.Vector.sub(desiredVel, this.vel);
    // console.log(steerForce.y);
    steerForce.limit( maxSteerForce );
    this.applyForce( steerForce );
  }


  checkEdges(planeSize) {
    var EdgeLeft = - planeSize / 2; 
    var EdgeRight = planeSize / 2;
    if(this.pos.x < EdgeLeft || this.pos.x > EdgeRight || this.pos.z < EdgeLeft || this.pos.z > EdgeRight){
      this.pos.x = 0;
      this.pos.z = 0;
    }
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    sphere(2);
    pop();
  }
}
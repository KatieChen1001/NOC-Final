"use strict"

class ParticleSystem{
	constructor(numOfP, planeSize, planeHeight){
		this.planeSize = planeSize;
		this.planeHeight = planeHeight;
		this.edge1 = - this.planeSize / 2;
		this.edge2 = this.planeSize / 2;

		this.resolution = 30;

		this.angles = [];

		this.vector = createVector();

		this.isExploded = false;

		this.rows = ceil(this.planeSize / this.resolution);
		if (this.rows % 2 == 1){
			this.rows ++;
		} else if (this.rows % 2 == 0 ){
			this.rows = this.rows;
		}

		this.cols = this.rows;

		this.numOfP = numOfP;

		this.particles = [];
		for (var i = 0; i < this.numOfP; i++) {
			this.particles.push(new Particle(random(this.edge1, this.edge2), this.planeHeight, random(this.edge1, this.edge2)));
		}
	}

	flowField(){

		// push();
		// translate(0, this.planeHeight, 0);

		for (var c = -this.cols / 2; c < this.cols / 2; c++) {
			for (var r = -this.rows / 2; r < this.rows / 2; r++) {
				var x = r * this.resolution + this.resolution / 2;
				var z = c * this.resolution + this.resolution / 2;

		      var pos = createVector(x, 0, z);    // create vector to each grid point 

		      // find the center point of the grid
		      // create a vector to the center point
		      var center = createVector(0, 0, 0);
		      this.vector = p5.Vector.sub(center, pos);
		      // get the angle of each point pointing to the center 
		      // + PI/2 to create a spiral / swirl
		      var angle = atan2(this.vector.z, this.vector.x) + PI/2;
		      var index = r + c * this.rows;
		      this.angles[index] = angle;              // store the angle in angles array

		      // ================= debugged Mode ================= //
		      // push();
		      // translate(x, 0, z);
		      // rotateY(-angle);
		      // fill(255);
		      // box(2, 2, 2);
		      // translate(this.resolution / 4, 0, 0);
		      // box(this.resolution / 2, 1, 1);
		      // pop();
		  }
		}
		// pop();
	}

	run(maxDesiredVel, maxSteerForce){
		
		for (var i = 0; i < this.particles.length; i++) {
			var p = this.particles[i];
			var r = floor(p.pos.x / this.resolution);
			var c = floor(p.pos.z / this.resolution);
			var index = r + c * this.rows;
			if (this.isExploded == false){
				p.flow(this.angles[index],maxDesiredVel, maxSteerForce);
				p.checkEdges(this.planeSize);
			}
			p.update();
			
			p.display();
			
		}	
	}

	explode(maxDesiredVel, maxSteerForce){
		if (this.isExploded){
			for (var i = 0; i < this.particles.length; i++) {
				var p = this.particles[i];
				// var heading = p.vel.z/p.vel.x;

				
				var r = floor(p.pos.x / this.resolution);
				var c = floor(p.pos.z / this.resolution);
				var index = r + c * this.rows;

				this.angles[index] = atan2(this.vector.z, this.vector.x);
				p.flow(this.angles[index],maxDesiredVel, maxSteerForce);
				p.update();
				if (p.pos.x < this.planeSize || p.pos.z < this.planeSize){
					p.display();
				}
				
			}
		}
	}

	changeShape(shape){
		for (var i = 0; i < this.particles.length; i++) {
			var p = this.particles[i];
			p.pos.x += i * shape;
		}
	}

}
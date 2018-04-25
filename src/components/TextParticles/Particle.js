// @flow

import { degreesToRads, randomInt } from "./utils";

type Params = {
  radius: number,
  gravity: number,
  duration: number,
  speed: number
};

export default class Particle {
  constructor(x: number, y: number, ctx: Object, params: Params) {
    this.radius = params.radius;
    this.futurRadius = randomInt(this.radius, this.radius + 3);
    this.ctx = ctx;

    this.rebond = randomInt(1, 5);
    this.x = x;
    this.y = y;

    this.dying = false;

    this.base = [x, y];

    this.vx = 0;
    this.vy = 0;
    this.friction = 0.99;
    this.gravity = params.gravity;
    this.duration = params.duration;
    this.speed = params.speed;
    this.color = params.color;

    this.setSpeed(randomInt(0.1, 0.5));
    this.setHeading(randomInt(degreesToRads(0), degreesToRads(360)));
  }

  getSpeed = () => {
    return Math.sqrt(this.vx * this.vx + this.vy * this.vy);
  };

  setSpeed = speed => {
    const heading = this.getHeading();
    this.vx = Math.cos(heading) * speed;
    this.vy = Math.sin(heading) * speed;
  };

  getHeading = () => {
    return Math.atan2(this.vy, this.vx);
  };

  setHeading = heading => {
    const speed = this.getSpeed();
    this.vx = Math.cos(heading) * speed;
    this.vy = Math.sin(heading) * speed;
  };

  angleTo = p2 => {
    return Math.atan2(p2.y - this.y, p2.x - this.x);
  };

  update = heading => {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;

    this.vx *= this.friction;
    this.vy *= this.friction;

    if (this.radius < this.futurRadius && this.dying === false) {
      this.radius += this.duration;
    } else {
      this.dying = true;
    }

    if (this.dying === true) {
      this.radius -= this.duration;
    }

    this.ctx.beginPath();

    this.ctx.fillStyle = this.color;

    // this.ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    // this.ctx.fill();
    this.ctx.fillRect(this.x, this.y, this.radius, this.radius);
    this.ctx.closePath();

    if (this.y < 0 || this.radius < 1) {
      this.x = this.base[0];
      this.dying = false;
      this.y = this.base[1];
      this.radius = 1.1;
      this.setSpeed(this.speed);
      this.futurRadius = randomInt(this.radius, this.radius + 3);
      this.setHeading(randomInt(degreesToRads(0), degreesToRads(360)));
    }
  };
}

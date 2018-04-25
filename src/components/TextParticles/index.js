// @flow

import React, { Component, createRef } from "react";
import Particle from "./Particle";

type Props = {
  children: string,
  colors: string[],
  fontSize: number,
  fontFamily: string,
  gravity: number,
  duration: number,
  speed: number,
  resolution: number,
  radius: number
};

type State = {
  width: ?number
};

const fps = 60;

export default class TextParticles extends Component<Props, State> {
  static defaultProps = {
    children: "",
    colors: ["#000"],
    fontSize: 120,
    fontFamily: "Arial",
    gravity: 0,
    duration: 0.1,
    speed: 0.01,
    resolution: 3,
    radius: 0.1
  };

  state = {
    width: 180
  };

  canvasRef = createRef();
  particles = [];

  get x() {
    return 0;
  }

  get y() {
    return this.props.fontSize * 3 / 4;
  }

  componentDidMount() {
    const { current: canvas } = this.canvasRef;
    this.ctx = canvas.getContext("2d");
    const width = this.getTextWidth();
    this.setState({ width }, () => {
      this.createParticles();
      this.update();
    });
  }

  getTextWidth = () => {
    const { children: text, fontSize, fontFamily } = this.props;
    this.ctx.textAlign = "start";
    this.ctx.font = `bold ${fontSize}px ${fontFamily}`;
    const { width } = this.ctx.measureText(text);
    return Math.ceil(width);
  };

  createParticles = () => {
    const {
      children: text,
      colors,
      fontSize,
      fontFamily,
      gravity,
      duration,
      speed,
      resolution,
      radius
    } = this.props;
    const { width } = this.state;

    this.ctx.textAlign = "start";
    this.ctx.font = `bold ${fontSize}px ${fontFamily}`;
    this.ctx.fillText(text, this.x, this.y);
    const idata = this.ctx.getImageData(0, 0, width, fontSize);
    const buffer32 = new Uint32Array(idata.data.buffer);

    this.particles = [];
    for (let y = 0; y < fontSize; y += resolution) {
      for (let x = 0; x < width; x += resolution) {
        if (buffer32[Math.round(y * width + x)]) {
          const color = colors[Math.floor(Math.random() * colors.length)];
          this.particles.push(
            new Particle(x, y, this.ctx, {
              gravity,
              duration,
              speed,
              radius,
              resolution,
              color
            })
          );
        }
      }
    }
    this.ctx.clearRect(0, 0, width, fontSize);
  };

  update = () => {
    setTimeout(() => {
      this.ctx.clearRect(0, 0, this.state.width, this.props.fontSize);

      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].update();
      }

      requestAnimationFrame(this.update);
    }, 1000 / fps);
  };

  render() {
    return (
      <canvas
        style={{
          height: this.props.fontSize,
          width: this.state.width
        }}
        height={`${this.props.fontSize}`}
        width={`${this.state.width}`}
        ref={this.canvasRef}
      />
    );
  }
}

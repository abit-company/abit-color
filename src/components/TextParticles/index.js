// @flow

import React, { Component, createRef } from "react";
import Particle from "./Particle";

type Props = {
  children: string,
  className: string,
  colors: string[],
  fontFamily: string,
  gravity: number,
  duration: number,
  speed: number,
  resolution: number,
  radius: number
};

type State = {
  width: number,
  height: number,
  fontSize: number
};

type Size = {
  width: number,
  height: number
};

const fps = 60;

const devicePixelRatio = window ? window.devicePixelRatio : 1;

export default class TextParticles extends Component<Props, State> {
  static defaultProps = {
    children: "",
    colors: ["#000"],
    fontSize: 120,
    fontFamily: "Arial",
    gravity: 0,
    duration: 0.2,
    speed: 0.03,
    resolution: 4,
    radius: 3
  };

  state = {
    width: 300,
    height: 150,
    fontSize: 14
  };

  canvasRef = createRef();
  particles = [];

  get canvasFontSize() {
    return this.props.fontSize * devicePixelRatio;
  }

  get canvasWidth() {
    return this.state.width * devicePixelRatio;
  }

  componentDidMount() {
    const { current: canvas } = this.canvasRef;
    this.ctx = canvas.getContext("2d");
    // const { width, height } = canvas.getBoundingClientRect();
    const width = this.getTextWidth();
    // const fontSize = this.getFontSize({ width, height });
    // console.log("height", this.props.children, height, fontSize);
    this.setState({ width }, () => {
      this.createParticles();
      this.update();
    });
  }

  getFontSize = (size: Size): number => {
    const { children: text, fontSize: fontSize0, fontFamily } = this.props;
    this.ctx.textAlign = "start";
    this.ctx.font = `bold ${fontSize0}px ${fontFamily}`;
    this.ctx.textBaseline = "hanging";
    const { width: width0 } = this.ctx.measureText(text);
    const m = width0 / text.length / fontSize0;
    return Math.floor(size.width / (m * text.length));
  };

  getTextWidth = () => {
    const { children: text, fontFamily } = this.props;
    this.ctx.textAlign = "start";
    this.ctx.font = `bold ${this.canvasFontSize}px ${fontFamily}`;
    this.ctx.textBaseline = "hanging";
    const { width } = this.ctx.measureText(text);
    console.log("width is ", width);
    return Math.ceil(width / devicePixelRatio);
  };

  createParticles = () => {
    const {
      children: text,
      colors,
      fontFamily,
      gravity,
      duration,
      speed,
      resolution,
      radius
    } = this.props;
    this.ctx.textAlign = "start";
    this.ctx.font = `bold ${this.canvasFontSize}px ${fontFamily}`;
    this.ctx.textBaseline = "hanging";
    this.ctx.fillText(text, 0, 0);
    const idata = this.ctx.getImageData(
      0,
      0,
      this.canvasWidth,
      this.canvasFontSize
    );
    const buffer32 = new Uint32Array(idata.data.buffer);

    this.particles = [];
    for (let y = 0; y < this.canvasFontSize; y += resolution) {
      for (let x = 0; x < this.canvasWidth; x += resolution) {
        if (buffer32[Math.round(y * this.canvasWidth + x)]) {
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
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasFontSize);
  };

  update = () => {
    setTimeout(() => {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasFontSize);
      for (let i = 0; i < this.particles.length; i++) {
        this.particles[i].update();
      }
      requestAnimationFrame(this.update);
    }, 1000 / fps);
  };

  render() {
    return (
      <canvas
        className={this.props.className}
        style={{
          height: this.props.fontSize,
          width: this.state.width
        }}
        height={this.canvasFontSize}
        width={this.canvasWidth}
        ref={this.canvasRef}
      />
    );
  }
}

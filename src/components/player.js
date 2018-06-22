class Player {
  constructor(props) {
    this.id = props.id++,
    this.cx = props.cx,
    this.cy = props.cy,
    this.radius = props.radius,
    this.speed = props.speed,
    Object.defineProperty(this, "nextPosition", {
      value: Math.round(Math.random()) ? this.lineMovingX : this.lineMovingY,
      enumerable: false,
      writable: true
    })
    Object.defineProperty(this, "drawOptions", {
      value: {pulseWidth: 0, expanding: true},
      enumerable: false,
      writable: true
    })
  }

  isIntersect(point) {
    return Math.sqrt((point.x-this.cx) ** 2 + (point.y - this.cy) ** 2) < this.radius + 5;
  }

  lineMovingX(canvas) {
    if ((this.cx + this.speed < 0) || (this.cx + this.speed > canvas.width)) {
      this.speed = this.speed * -1
    }
    this.cx += this.speed 
  }

  lineMovingY(canvas) {
    if ((this.cy + this.speed < 0) || (this.cy + this.speed > canvas.height)) {
      this.speed = this.speed * -1
    }
    this.cy += this.speed 
  }
}

export default Player
const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [window.innerWidth, window.innerHeight],
  animate: true,
  duration: 3,
};

const mouse = {
  x: undefined,
  y: undefined,
};

const particlesArray = [];

const sketch = ({ context, width, height }) => {
  const init = () => {
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particlesArray.push(new Particle(x, y));
    }
  };
  init();
  // console.log(particlesArray);
  return ({ context, width, height, canvas, playhead }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // console.log(canvas);
    canvas.addEventListener("click", (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
      // drawCircle();
    });
    canvas.addEventListener("mousemove", (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
      // drawCircle();
    });

    const handleParticles = () => {
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        // context.clearRect(0, 0, width, height);
        particlesArray[i].draw();
      }
    };

    const animate = () => {
      context.clearRect(0, 0, width, height);
      // drawCircle();
      // handleParticles();
      // requestAnimationFrame(animate);
    };
    // const x = width * 0.5;
    // const y = width * 0.5;
    // const w = width * 0.3;
    // const h = height * 0.3;
    // context.save();

    // context.translate(x, y);
    // context.rotate(0.3);

    // context.fillStyle = "black";
    // context.beginPath();
    // context.rect(-w * 0.5, -h * 0.5, w, h);
    // context.fill();
    // context.restore();
    // animate();
    // init();
    const t = Math.sin(playhead * Math.PI);
    const ct = Math.cos(playhead * Math.PI);
    particlesArray.forEach((particle) => {
      particle.update(t, ct);
      particle.draw(context);
      particle.bounce(width, height);
    });
  };
};

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    // this.update();
    // this.draw();
  }
  update(t, ct) {
    this.x += this.speedX * t;
    this.y += this.speedY * ct;
  }

  bounce(width, height) {
    if (this.x > width || this.x < 0) {
      this.speedX *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.speedY *= -1;
    }
  }
  draw(context) {
    context.fillStyle = "black";
    context.strokeStyle = "red";
    context.lineWidth = 5;

    context.beginPath();
    context.arc(this.x, this.y, 10, 0, Math.PI * 2);
    context.fill();
  }
}

canvasSketch(sketch, settings);

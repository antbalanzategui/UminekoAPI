import React, { useEffect, useRef } from 'react';
import p5 from 'p5';
import debounce from 'lodash/debounce';

const MetaBalls = () => {
  const canvasRef = useRef(null);
  let blobs = [];

  const debounceResize = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let canvas;

      p.setup = () => {
        const canvasWidth = window.innerWidth * 0.5; // Get the width of the window
        const canvasHeight = window.innerHeight * 0.5; // Set the height as desired
        canvas = p.createCanvas(canvasWidth, canvasHeight);
        p.colorMode(p.HSB);
        p.frameRate(30); // Use requestAnimationFrame instead

        blobs = []; // Clear the blobs array before adding new instances

        for (let i = 0; i < 10; i++) {
          blobs.push(new Blob(p.random(0, p.width), p.random(0, p.height)));
        }

        // Debounce window resize event
        debounceResize.current = debounce(() => {
          p.windowResized();
        }, 250);
        window.addEventListener('resize', debounceResize.current);
      };

      p.draw = () => {
        p.background(50);
        p.loadPixels();

        for (let x = 0; x < p.width; x += 2) {
          for (let y = 0; y < p.height; y += 2) {
            let sum = 0;

            for (let i = 0; i < blobs.length; i++) {
              let xdif = x - blobs[i].x;
              let ydif = y - blobs[i].y;
              let d = p.sqrt(xdif * xdif + ydif * ydif);
              sum += (150 * blobs[i].r) / d;
            }

            p.set(x, y, p.color(sum, 255, 255));
          }
        }

        p.updatePixels();

        for (let i = 0; i < blobs.length; i++) {
          blobs[i].update();
        }
      };

      p.windowResized = () => {
        const canvasWidth = window.innerWidth * 0.5; // Get the updated width of the window
        const canvasHeight = window.innerHeight * 0.5; // Get the updated height of the window
        p.resizeCanvas(canvasWidth, canvasHeight);
      };

      class Blob {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.r = p.random(50, 80);
          this.xSpeed = p.random(-1, 1);
          this.ySpeed = p.random(-1, 1);
        }

        update() {
          this.x += this.xSpeed * 50;
          this.y += this.ySpeed * 50;

          if (this.x < 0 || this.x > p.width) {
            this.xSpeed *= -1;
          }

          if (this.y < 0 || this.y > p.height) {
            this.ySpeed *= -1;
          }
        }
      }
    };

    const p5Instance = new p5(sketch, canvasRef.current);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', debounceResize.current);
      p5Instance.remove();
    };
  }, []);

  return <div ref={canvasRef}></div>;
};

export default MetaBalls;

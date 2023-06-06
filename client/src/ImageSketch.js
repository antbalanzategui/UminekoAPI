import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const ImageSwapper = () => {
  const canvasRef = useRef(null);
  const p5InstanceRef = useRef(null);
  let img;
  let originalImg;
  let swapped = false;
  let frameDelay = 10; // Delay duration in frames for new swaps
  let swapBackDelay = 120; // Delay duration in frames before swapping back
  let currentFrame = 0; // Current frame count

  const preload = (p) => {
    // Load your image here
    img = p.loadImage('http://localhost:3001/api/media/thumbnail2.jpg');
    originalImg = p.loadImage('http://localhost:3001/api/media/thumbnail2.jpg');
  };

  const resizeCanvas = () => {
    const p = p5InstanceRef.current;
    const screenWidth = window.innerWidth;
    const canvasWidth = Math.floor(30 * Math.log(screenWidth) + 0.15 * screenWidth);
    let canvasHeight = Math.floor(canvasWidth * 1.5);
    p.resizeCanvas(canvasWidth, canvasHeight);
    reloadAndResizeImages(p, canvasWidth, canvasHeight);
  };

  const reloadAndResizeImages = (p, canvasWidth, canvasHeight) => {
    img = p.loadImage('http://localhost:3001/api/media/thumbnail2.jpg', () => {
      img.resize(canvasWidth, canvasHeight, p.RESIZEMODE_NEAREST);
    });

    originalImg = p.loadImage('http://localhost:3001/api/media/thumbnail2.jpg', () => {
      originalImg.resize(canvasWidth, canvasHeight, p.RESIZEMODE_NEAREST);
    });
  };

  const setup = (p) => {
    const screenWidth = window.innerWidth;
    const canvasWidth = Math.floor(30 * Math.log(screenWidth) + 0.15 * screenWidth);
    let canvasHeight = Math.floor(canvasWidth * 1.414);


    console.log(screenWidth);
    console.log(window.innerHeight);
    console.log(canvasWidth);
    console.log(canvasHeight);


    p.createCanvas(canvasWidth, canvasHeight).parent(canvasRef.current);
    reloadAndResizeImages(p, canvasWidth, canvasHeight);

    // Store the p5 instance in the ref
    p5InstanceRef.current = p;

    // Resize canvas when the window is resized
    window.addEventListener('resize', resizeCanvas);
  };

  const draw = (p) => {
    p.background(220);

    // Display the current image
    p.image(img, 0, 0);

    // Check if the image has been swapped
    if (!swapped) {
      // Swap the image back to the original state after the swap back delay
      if (p.frameCount - currentFrame >= swapBackDelay) {
        img = originalImg.get();
        swapped = true;
        currentFrame = p.frameCount; // Reset the frame count
      }
    } else if (p.frameCount - currentFrame >= frameDelay) {
      // Swap multiple random sections of the image after the delay
      const numSwaps = 25; // Number of sections to be swapped
      const sectionSize = Math.floor((30 * Math.log(window.innerWidth) + 0.15 * window.innerWidth) / 28); // Size of each section

      for (let i = 0; i < numSwaps; i++) {
        let section1X = p.random(0, img.width - sectionSize);
        let section1Y = p.random(0, img.height - sectionSize);
        let section2X = p.random(0, img.width - sectionSize);
        let section2Y = p.random(0, img.height - sectionSize);
        imgSwapRect(p, img, section1X, section1Y, sectionSize, sectionSize, section2X, section2Y);
      }

      swapped = false;
    }
  };

  const imgSwapRect = (p, img, x1, y1, w1, h1, x2, y2) => {
    // Create copies of the sections to be swapped
    let section1 = img.get(x1, y1, w1, h1);
    let section2 = img.get(x2, y2, w1, h1);

    // Swap the sections
    img.copy(section2, 0, 0, w1, h1, x1, y1, w1, h1);
    img.copy(section1, 0, 0, w1, h1, x2, y2, w1, h1);
  };

  useEffect(() => {
    const sketch = new p5((p) => {
      p.preload = () => preload(p);
      p.setup = () => setup(p);
      p.draw = () => draw(p);
    });

    return () => {
      sketch.remove();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <div className = "imageReal" ref={canvasRef}></div>;
};

export default ImageSwapper;

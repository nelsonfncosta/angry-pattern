import React, { useRef, useEffect } from 'react';
import { difference } from 'lodash';
import PatternIMG from '../../images/pattern.jpg';
import { pointInsideCircle } from '../../utils/math';
/*
P1  P2  P3
P4  P5  P6
P7  P8  P9
*/
const PATTERN_POINTS = {
  P1: { x: 95, y: 43 },
  P2: { x: 200, y: 43 },
  P3: { x: 304, y: 43 },
  P4: { x: 95, y: 144 },
  P5: { x: 200, y: 144 },
  P6: { x: 304, y: 144 },
  P7: { x: 95, y: 245 },
  P8: { x: 200, y: 245 },
  P9: { x: 304, y: 245 },
};

const RADIUS = 30;

const isMouseAt = (mx, my, point) => {
  const { x, y } = PATTERN_POINTS[`P${point}`];
  // console.log(`checking P${point} x:${x}, y:${y}`);
  return pointInsideCircle(x, y, mx, my, RADIUS);
};

function HomePage() {
  const canvas = useRef();
  let ctx = null;
  let canvasX;
  let canvasY;
  let lastMouseX;
  let lastMouseY;
  let mouseDown = false;

  let currentPath = [];

  const background = new Image(PatternIMG);
  background.src = PatternIMG;

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    console.log(`Canvas size w: ${canvasEle.width} h: ${canvasEle.height}`);

    canvasX = canvasEle.offsetLeft;
    canvasY = canvasEle.offsetTop;

    console.log(`Canvas offset left:${canvasX} top:${canvasY}`);

    // get context of the canvas
    ctx = canvasEle.getContext('2d');
  }, []);

  const drawLine = (info, style = {}) => {
    const { x, y, x1, y1 } = info;
    const { color = 'black', width = 1 } = style;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
  };

  useEffect(() => {
    // drawLine({ x: 300, y: 250, x1: 260, y1: 70 }, { color: 'black', width: 5 });
    drawPatternDots();
  }, []);

  const drawPatternDots = () => {
    const canvasEle = canvas.current;

    ctx.drawImage(background, 0, 0, canvasEle.width, canvasEle.height);
  };

  const onCanvasMouseDown = e => {
    lastMouseX = parseInt(e.clientX - canvasX, 10);
    lastMouseY = parseInt(e.clientY - canvasY, 10);
    mouseDown = true;

    console.log('onCanvasMouseDown', lastMouseX, lastMouseY);
    pointCheck(lastMouseX, lastMouseY);
  };

  const onCanvasMouseUp = () => {
    mouseDown = false;

    console.log(currentPath);
    clearCurrentPATH();
  };

  const clearCurrentPATH = () => {
    currentPath = [];
  };

  const onCanvasMouseMove = e => {
    if (!mouseDown) return;

    const xx = parseInt(e.clientX - canvasX, 10);
    const yy = parseInt(e.clientY - canvasY, 10);

    pointCheck(xx, yy);
    const canvasEle = canvas.current;

    // ctx.clearRect(0, 0, canvasEle.width, canvasEle.height); // clear canvas
    drawPatternDots();
    ctx.beginPath();

    if (!currentPath.length) {
      ctx.moveTo(lastMouseX, lastMouseY);
    } else {
      const lastP = lastPoint();
      ctx.moveTo(lastP.x, lastP.y);
    }

    // ctx.moveTo(lastMouseX, lastMouseY);
    ctx.lineTo(xx, yy);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();
  };

  const getPoint = n => PATTERN_POINTS[`P${n}`];

  const lastPoint = () => getPoint(currentPath[currentPath.length - 1]);

  const points = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const pointCheck = (x, y) => {
    const remaingPoints = difference(points, currentPath);

    remaingPoints.forEach(point => {
      if (isMouseAt(x, y, point)) {
        currentPath.push(point);
        console.log(`mouse at ${point}`);
      }
    });
  };

  return (
    <div className="HomePage">
      <h1>Angry Pattern</h1>
      <canvas
        ref={canvas}
        onMouseDown={onCanvasMouseDown}
        onMouseUp={onCanvasMouseUp}
        onMouseMove={onCanvasMouseMove}
      />
    </div>
  );
}

export default HomePage;

import React, { useRef, useEffect } from 'react';
import { difference } from 'lodash';
import { connect } from 'react-redux';
import PatternIMG from '../../images/pattern.jpg';
import { pointInsideCircle } from '../../utils/math';
import { lastPatternSet } from '../LocalStorage/actions';

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

const POINTS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const RADIUS = 30;
const LINE_WIDTH = 3;

const isMouseAt = (mx, my, point) => {
  const { x, y } = PATTERN_POINTS[`P${point}`];
  // console.log(`checking P${point} x:${x}, y:${y}`);
  return pointInsideCircle(x, y, mx, my, RADIUS);
};

function PatternCanvas(props) {
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
    const { color = 'black', width = LINE_WIDTH } = style;

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
    props.setLastPattern(currentPath);
    clearCurrentPath();
  };

  const clearCurrentPath = () => {
    currentPath = [];
  };

  const isPatternFull = () => currentPath.length === 9;

  const drawCurrentPath = () => {
    for (let index = 0; index < currentPath.length - 1; index += 1) {
      const point = getPoint(currentPath[index]);
      const nextPoint = getPoint(currentPath[index + 1]);

      drawLine({ x: point.x, y: point.y, x1: nextPoint.x, y1: nextPoint.y });
    }
  };

  const onCanvasMouseMove = e => {
    const lastP = lastPoint();

    if (!mouseDown || !lastP || isPatternFull()) return;

    const xx = parseInt(e.clientX - canvasX, 10);
    const yy = parseInt(e.clientY - canvasY, 10);

    pointCheck(xx, yy);

    // const canvasEle = canvas.current;
    // ctx.clearRect(0, 0, canvasEle.width, canvasEle.height); // clear canvas
    drawPatternDots();

    drawCurrentPath();

    ctx.beginPath();

    ctx.moveTo(lastP.x, lastP.y);
    // ctx.moveTo(lastMouseX, lastMouseY);

    ctx.lineTo(xx, yy);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = LINE_WIDTH;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.stroke();

    cleanIfFull();
  };

  const cleanIfFull = () => {
    if (!isPatternFull()) return;

    drawPatternDots();
    drawCurrentPath();
  };

  const getPoint = n => PATTERN_POINTS[`P${n}`];

  const lastPoint = () => getPoint(currentPath[currentPath.length - 1]);

  const pointCheck = (x, y) => {
    const remaingPoints = difference(POINTS, currentPath);

    remaingPoints.forEach(point => {
      if (isMouseAt(x, y, point)) {
        currentPath.push(point);
        console.log(`mouse at ${point}`);
      }
    });
  };

  return (
    <canvas
      ref={canvas}
      onMouseDown={onCanvasMouseDown}
      onMouseUp={onCanvasMouseUp}
      onMouseMove={onCanvasMouseMove}
    />
  );
}

export const mapDispatchToProps = {
  setLastPattern: lastPatternSet,
};

export default connect(
  null,
  mapDispatchToProps,
)(PatternCanvas);

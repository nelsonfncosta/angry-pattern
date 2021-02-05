import React, { useRef, useEffect, useState } from 'react';
import { difference } from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PatternIMG from '../../images/pattern.jpg';
import { pointInsideCircle } from '../../utils/math';
import { lastPatternSet } from '../LocalStorage/actions';
import {
  getLastPattern,
  patternAlreadyExists,
  patternExists,
} from '../LocalStorage/reducer';

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

  return pointInsideCircle(x, y, mx, my, RADIUS);
};

function PatternCanvas(props) {
  const canvas = useRef();
  const background = new Image(PatternIMG);
  background.src = PatternIMG;

  const [mousePos, setMousePos] = useState({
    lastMouseX: undefined,
    lastMouseY: undefined,
    mouseDown: false,
  });

  const [canvasInfo, setCanvasInfo] = useState({
    x: undefined,
    y: undefined,
  });

  const [currentPath, setCurrentPath] = useState([]);

  const [context, setContext] = useState(null);

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    console.log(`Canvas size w: ${canvasEle.width} h: ${canvasEle.height}`);

    setCanvasInfo({ x: canvasEle.offsetLeft, y: canvasEle.offsetTop });

    // get context of the canvas
    setContext(canvasEle.getContext('2d'));
  }, []);

  const drawLine = (info, style = {}) => {
    const { x, y, x1, y1 } = info;
    const { color = 'black', width = LINE_WIDTH } = style;

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = width;
    context.stroke();
  };

  useEffect(() => {
    // drawLine({ x: 300, y: 250, x1: 260, y1: 70 }, { color: 'black', width: 5 });
    drawPatternDots();
  }, []);

  const drawPatternDots = () => {
    const canvasEle = canvas.current;

    canvasEle
      .getContext('2d')
      .drawImage(background, 0, 0, canvasEle.width, canvasEle.height);
  };

  const onCanvasMouseDown = e => {
    const lastMouseX = parseInt(e.clientX - canvasInfo.x, 10);
    const lastMouseY = parseInt(e.clientY - canvasInfo.y, 10);
    const mouseDown = true;

    setMousePos({ lastMouseX, lastMouseY, mouseDown });

    console.log('onCanvasMouseDown', lastMouseX, lastMouseY);

    pointCheck(lastMouseX, lastMouseY);
  };

  const onCanvasMouseUp = () => {
    setMousePos(state => ({ ...state, mouseDown: false }));

    console.log(currentPath);
    props.setLastPattern(currentPath);
    drawPath(currentPath, getLineColor(currentPath));
    clearCurrentPath();
  };

  const clearCurrentPath = () => setCurrentPath([]);

  const isPatternFull = () => currentPath.length === 9;

  const getLineColor = p => (props.patternExists(p) ? 'red' : 'blue');

  const drawPath = (path = [], color = 'black') => {
    console.log('drawing', path);
    for (let index = 0; index < path.length - 1; index += 1) {
      const point = getPoint(path[index]);
      const nextPoint = getPoint(path[index + 1]);

      drawLine(
        { x: point.x, y: point.y, x1: nextPoint.x, y1: nextPoint.y },
        { color },
      );
    }
  };
  const onCanvasMouseMove = e => {
    const lastP = lastPoint();

    if (!mousePos.mouseDown || !lastP || isPatternFull()) return;

    const xx = parseInt(e.clientX - canvasInfo.x, 10);
    const yy = parseInt(e.clientY - canvasInfo.y, 10);

    pointCheck(xx, yy);

    // const canvasEle = canvas.current;
    // ctx.clearRect(0, 0, canvasEle.width, canvasEle.height); // clear canvas
    drawPatternDots();

    drawPath(currentPath);

    context.beginPath();

    context.moveTo(lastP.x, lastP.y);
    // context.moveTo(lastMouseX, lastMouseY);

    context.lineTo(xx, yy);
    context.strokeStyle = 'black';
    context.lineWidth = LINE_WIDTH;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.stroke();

    cleanIfFull();
  };

  const cleanIfFull = () => {
    if (!isPatternFull()) return;

    drawPatternDots();
    drawPath(currentPath);
  };

  const getPoint = n => PATTERN_POINTS[`P${n}`];

  const lastPoint = () => getPoint(currentPath[currentPath.length - 1]);

  const pointCheck = (x, y) => {
    const remaingPoints = difference(POINTS, currentPath);

    remaingPoints.forEach(point => {
      if (isMouseAt(x, y, point)) {
        setCurrentPath(state => [...state, point]);

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

PatternCanvas.propTypes = { exists: PropTypes.bool };

const mapStateToProps = state => ({
  exists: patternAlreadyExists(state),
  lastPattern: getLastPattern(state),
  patternExists: patternExists(state),
});

export const mapDispatchToProps = {
  setLastPattern: lastPatternSet,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PatternCanvas);

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }


  .HomePage {
    margin: 30px;
    display: flex;
    flex-direction: column;
  }

  canvas {
    width: 400px;
    height: 300px;
    background-color: #f5f5f5;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: crosshair;
  }

  .saveButton {
    width: 400px;
  }  

`;

export default GlobalStyle;

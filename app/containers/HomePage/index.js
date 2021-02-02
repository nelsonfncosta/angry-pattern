import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveLastPattern } from '../LocalStorage/actions';
import PatternCanvas from '../PatternCanvas/PatternCanvas';

function HomePage(props) {
  return (
    <div className="HomePage">
      <h1>Angry Pattern</h1>
      <PatternCanvas />
      <button type="button" onClick={props.save}>
        Save Pattern?
      </button>
    </div>
  );
}

HomePage.propTypes = {
  save: PropTypes.func,
};

export const mapDispatchToProps = {
  save: saveLastPattern,
};

export default connect(
  null,
  mapDispatchToProps,
)(HomePage);

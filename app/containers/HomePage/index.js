import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveLastPattern } from '../LocalStorage/actions';
import PatternCanvas from '../PatternCanvas/PatternCanvas';
import Checker from '../PatternChecker/Checker';

function HomePage(props) {
  return (
    <div className="HomePage">
      <h1>Angry Pattern</h1>
      <PatternCanvas />
      <button type="button" className="saveButton" onClick={props.save}>
        Save Pattern?
      </button>
      <Checker />
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

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { patternAlreadyExists } from '../LocalStorage/reducer';

function Checker(props) {
  return <div className="Checker">{props.exists ? 'old' : 'new'}</div>;
}

Checker.propTypes = { exists: PropTypes.bool };

const mapStateToProps = state => ({
  exists: patternAlreadyExists(state),
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Checker);

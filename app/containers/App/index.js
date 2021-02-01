/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GlobalStyle from '../../global-styles';
import { init } from '../LocalStorage/actions';
import { MAIN_KEY } from '../LocalStorage/constants';

export function App(props) {
  useEffect(() => {
    const patterns = window.localStorage.getItem(MAIN_KEY);
    props.initLocalStorage(JSON.parse(patterns));
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

App.propTypes = {
  initLocalStorage: PropTypes.func,
};

export const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      initLocalStorage: init,
    },
    dispatch,
  );

export default connect(
  null,
  mapDispatchToProps,
)(App);

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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import rootSaga from 'saga';
import GlobalStyle from 'global-styles';
import { DAEMON } from 'utils/constants';
import injectSaga from 'utils/injectSaga';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import { init } from 'containers/LocalStorage/actions';
import { MAIN_KEY } from 'containers/LocalStorage/constants';

export function App(props) {
  useEffect(() => {
    const patterns = window.localStorage.getItem(MAIN_KEY);
    const history = patterns ? JSON.parse(patterns) : [];

    props.initLocalStorage(history);
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

const withSaga = injectSaga({
  key: 'app-saga-key',
  saga: rootSaga,
  mode: DAEMON,
});

const ConnectedApp = connect(
  null,
  mapDispatchToProps,
)(App);

export default withSaga(ConnectedApp);

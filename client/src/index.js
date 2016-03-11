import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import reducers from './reducers';
import { App } from './components/app';
import IndexPage from './pages/index_page';
import RoundPage from './pages/round_page';
import RoundPlayerPage from './pages/round_player_page';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App}>
        <IndexRoute component={IndexPage}/>
        <Route path="rounds/:roundId" component={RoundPage} />
        <Route path="rounds/:roundId/players/:playerId" component={RoundPlayerPage} />
      </Route>
    </Router>

  </Provider>,
  document.getElementById('app')
);

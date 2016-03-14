import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import reducers from './reducers';
import { App } from './components/app';
import IndexPage from './pages/index_page';
import { PlayerPage } from './pages/player_page';
import { PlayersPage } from './pages/players_page';
import StartRoundPage from './pages/start_round_page';
import RoundPage from './pages/round_page';
import RoundPlayerPage from './pages/round_player_page';
import SimulatePage from './pages/simulate_page';

import {init} from './sockets';

const store = createStore(
  reducers,
  applyMiddleware(thunk)
);

init(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} >
      <Route path="/" component={App}>
        <IndexRoute component={IndexPage} />
        <Route path="rounds/:roundId" component={RoundPage} />
        <Route path="rounds/:roundId/players/:playerId" component={RoundPlayerPage} />
        <Route path="rounds/start" component={StartRoundPage} />
        <Route path="simulate" component={SimulatePage} />
      </Route>
    </Router>

  </Provider>,
  document.getElementById('app')
);

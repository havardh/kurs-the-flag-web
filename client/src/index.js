import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';


import '../styles/main.styl';
import createStore from './store';
import { fetchPlayers } from './actions/player_action_creator';
import App from './pages/app_page';
import IndexPage from './pages/index_page';
import StartRoundPage from './pages/start_round_page';
import RoundPage from './pages/round_page';
import RoundPlayerPage from './pages/round_player_page';
import SimulatePage from './pages/simulate_page';

const store = createStore(browserHistory, {
  players: [],
});

fetchPlayers()(store.dispatch)

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
      <Route path="/" component={App}>
        <IndexRoute component={IndexPage} />
        <Route path="rounds/start" component={StartRoundPage} />
        <Route path="rounds/:roundId" component={RoundPage} />
        <Route path="rounds/:roundId/players/:playerId" component={RoundPlayerPage} />
        <Route path="simulate" component={SimulatePage} />
      </Route>
    </Router>

  </Provider>,
  document.getElementById('app')
);

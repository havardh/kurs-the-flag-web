import React from "react";

import Player from "./player_component";
import Round from "./round_component";

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {store} = this.props;

    return (
      <div>
        <h1>The Flag</h1>

        <Round store={store} />

        <div style={{clear: "both"}}>
          <Player store={store} id={0} />
          <Player store={store} id={1} />
          <Player store={store} id={2} />
          <Player store={store} id={3} />
        </div>
      </div>
    );
  }
}

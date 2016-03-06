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

        <Round />
        <Player />

      </div>
    );
  }
}

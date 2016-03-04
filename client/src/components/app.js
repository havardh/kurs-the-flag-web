import React from "react";

import Player from "./player_component";
import Round from "./round_component";

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>The Flag</h1>

        <Round />

        <div style={{clear: "both"}}>
          <Player id={0} />
          <Player id={1} />
          <Player id={2} />
          <Player id={3} />
        </div>
      </div>
    );
  }
}

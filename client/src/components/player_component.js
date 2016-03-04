import React from "react";

export default class Player extends React.Component {
  render() {
    return (
      <div style={{float: "left", margin: 20 + "px"}}>
        <h2>Player {this.props.id}</h2>

        <input /><br />
        <div>
          <button>Rød</button> <button>Grønn</button> <br />
          <button>Blå</button> <button>Svart</button>
        </div>
      </div>
    );
  }
}

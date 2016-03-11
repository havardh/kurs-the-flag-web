import React from "react";
import { Link } from "react-router";

export default React.createClass({
  render() {
    return (
      <div>
        <p>
          <Link to={"/"}>Register Player</Link>
        </p>

        <p>
          <Link to={"/rounds/0"}>Start new round</Link>
        </p>

        <p>
          <Link to={"/simulate"}>Simulate</Link>
        </p>
      </div>
    );
  }
});

import React from "react";

import Round from '../components/round_component';

const RoundPage = ({params}) => (
  <div>
    <Round roundId={params.roundId}/>
  </div>
);


export default RoundPage;

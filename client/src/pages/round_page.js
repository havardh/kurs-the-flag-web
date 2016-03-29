import { connect } from 'react-redux';

import { fetchStatus, startRound as start } from '../actions/round_action_creator';
import { Round } from '../components/round_component';

export default connect(
  ({ round }, { params }) => ({
    round,
    roundId: params.roundId,
  }),
  { fetchStatus, start }
)(Round);

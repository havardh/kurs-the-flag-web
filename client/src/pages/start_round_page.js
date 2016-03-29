import { connect } from 'react-redux';

import StartRoundForm from '../components/start_round_form_component';
import { createRound } from '../actions/round_action_creator';

function mapStateToProps(state) {
  return {
    players: state.players,
  };
}

const mapDispatchToProps = {
  onStart: createRound,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartRoundForm);

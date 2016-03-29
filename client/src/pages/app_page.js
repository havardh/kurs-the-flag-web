import { connect } from 'react-redux';

import { App } from '../components/app';

function mapStateToProps(state) {
  return { errors: state.errors };
}

export default connect(mapStateToProps)(App);

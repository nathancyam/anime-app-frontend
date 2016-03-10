import { connect } from 'react-redux';
import Login from '../views/Login';
import Immutable from 'immutable';
import {
  login,
  logout
} from '../actions/Auth';

const mapStateToProps = (state) => {
  return {
    _meta: Immutable.fromJS({ title: 'Login' }),
    isLoggedIn: typeof state.user !== 'undefined',
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login(username, password) {
      dispatch(login(username, password));
    },

    logout() {
      dispatch(logout());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

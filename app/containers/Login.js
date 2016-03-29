import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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

export const mapDispatchToProps = (dispatch) => {
  return {
    login(username, password) {
      dispatch(login(username, password));
    },

    logout() {
      dispatch(logout());
    },

    onRedirectToLogin() {
      return dispatch(push('/login'));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

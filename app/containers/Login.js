import { connect } from 'react-redux';
import Login from '../views/Login';
import {
  login,
  logout
} from '../actions/Auth';

const mapStateToProps = (state) => {
  return {
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

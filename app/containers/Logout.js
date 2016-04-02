/**
 * Created by nathanyam on 29/03/2016.
 */

"use strict";

import { connect } from 'react-redux';
import { logout } from '../modules/Auth/actions';
import LogoutView from '../views/Logout';

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => {
  return {
    onLogout() {
      dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutView);


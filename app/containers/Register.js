/**
 * Created by nathanyam on 3/04/2016.
 */

"use strict";

import { connect } from 'react-redux';
import { register } from '../modules/Auth/actions';
import Register from '../views/Register';

const mapStateToProps = ({ auth }) => ({
  auth
});

const mapDispatchToProps = dispatch => {
  return {
    onRegister(email, password) {
      dispatch(register(email, password));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

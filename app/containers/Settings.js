/**
 * Created by nathanyam on 3/04/2016.
 */

"use strict";

import { connect } from 'react-redux';
import Settings from '../views/Settings';
import { enableWebPushNotifications } from '../modules/ServiceWorker/actions';

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => {
  return {
    onSaveSettings() {

    },
    handleWebPushChange() {
      dispatch(enableWebPushNotifications());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);


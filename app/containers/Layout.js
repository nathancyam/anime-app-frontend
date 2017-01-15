/**
 * Created by nathanyam on 30/03/2016.
 */

"use strict";

import { connect } from 'react-redux';
import Layout from '../views/Layout';

const mapStateToProps = ({ auth, uiMeta }) => ({
  auth,
  notifications: uiMeta.get('toastNotifications'),
});

export default connect(mapStateToProps)(Layout);

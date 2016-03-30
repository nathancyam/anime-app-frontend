/**
 * Created by nathanyam on 30/03/2016.
 */

"use strict";

import { connect } from 'react-redux';
import Layout from '../views/Layout';

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(mapStateToProps)(Layout);

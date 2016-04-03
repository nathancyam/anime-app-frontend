/**
 * Created by nathanyam on 3/04/2016.
 */

"use strict";

import { connect } from 'react-redux';
import Settings from '../views/Settings';

const mapStateToProps = (auth) => ({ auth });

const mapDispatchToProps = dispatch => {
  return {
    onSaveSettings() {

    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);


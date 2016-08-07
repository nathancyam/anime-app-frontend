/**
 * Created by nathanyam on 7/08/2016.
 */

"use strict";

import React, { PropTypes, Component } from 'react';
import { addImageToRegistry } from '../../modules/ui/actions';
import { connect } from 'react-redux';

const propTypes = {
  src: PropTypes.string,
  isVisible: PropTypes.func
};

class LazyImg extends Component {
  constructor(props) {
    super(props);
    this.img = null;
  }

  componentDidMount() {
    this.props.handleAddImageToRegistry(this.img);
  }

  renderImg() {
    return <img src={this.props.src} ref={(ref) => this.img = ref} />;
  }

  render() {
    if (this.props.isVisible(this.img)) {
      return this.renderImg();
    }

    return <img data-src={this.props.src} ref={(ref) => this.img = ref} />
  }
}

LazyImg.propTypes = propTypes;

function mapStateToProps({ uiMeta }) {
  return {
    isVisible(node) {
      if (!node) {
        return false;
      }

      const entry = uiMeta.get('imageRegistry').find(el => el.node === node);

      if (!entry) {
        return false;
      }

      return entry.isVisible;
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleAddImageToRegistry(img) {
      dispatch(addImageToRegistry(img));
    }
  };
}

const wrapper = connect(mapStateToProps, mapDispatchToProps)(LazyImg);

export default wrapper;

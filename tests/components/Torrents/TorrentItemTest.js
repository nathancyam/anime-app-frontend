/**
 * Created by nathanyam on 28/03/2016.
 */

"use strict";

import React from 'react';
import Immutable from 'immutable';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { TorrentStatus, TorrentInfo } from '../../../app/components/Torrents/TorrentItem';

describe('TorrentItem Components', () => {
  describe('<TorrentStatus />', () => {
    it('shows the right icon', () => {
      let wrapper = shallow(<TorrentStatus status="adding" />);
      expect(wrapper.contains(<i className="fa fa-circle-o-notch fa-spin" />)).to.equal(true);

      wrapper = shallow(<TorrentStatus status="added" />);
      expect(wrapper.contains(<i className="fa fa-check" />)).to.equal(true);

      wrapper = shallow(<TorrentStatus status="error" />);
      expect(wrapper.contains(<i className="fa fa-times" />)).to.equal(true);

      wrapper = shallow(<TorrentStatus status="" />);
      expect(wrapper.contains(<i className="fa fa-plus" />)).to.equal(true);
    });
  });

  describe('<TorrentInfo />', () => {
    it('show the right label', () => {
      let labelWrapper = shallow(
        <TorrentInfo
          torrent={Immutable.Map({ value: 'Current Value' })}
          label="Label"
          value="value"
        />
      );

      let wrapper = shallow(
        <TorrentInfo
          torrent={Immutable.Map({ label: 'Current Label' })}
          label="Label"
        />
      );

      expect(labelWrapper.html()).to.equal("<p>Label: Current Value</p>");
      expect(wrapper.html()).to.equal("<p>Label: Current Label</p>");
    });
  });
});
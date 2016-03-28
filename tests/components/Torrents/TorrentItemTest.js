/**
 * Created by nathanyam on 28/03/2016.
 */

"use strict";

import React from 'react';
import Immutable from 'immutable';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';
import TorrentItem, { TorrentStatus, TorrentInfo, TorrentStats } from '../../../app/components/Torrents/TorrentItem';

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

  describe('<TorrentStats />', () => {
    it('shows the right stats', () => {
      const wrapper = shallow(
        <TorrentStats
          torrent={Immutable.Map({
            leeches: 10,
            seeds: 12,
            readableSize: '100 MB',
            downloads: 14
          })}
        />
      );

      let expectedMarkup = [
        'Leeches: 10',
        'Seeds: 12',
        'File Size: 100 MB',
        'Downloads: 14'
      ];

      let html = wrapper.html();
      let expectResults = expectedMarkup.every(markup => html.indexOf(markup) !== 0);
      expect(expectResults).to.equal(true);
    });
  });

  describe('<TorrentItem />', () => {
    it('simulate a click event with torrent', () => {
      const callback = sinon.spy();
      const torrentObject = Immutable.Map({
        name: '[Commie] Nisekoi - 01 [ASDFAS].mkv',
        href: '//nyaa.se/torrent/12341',
        status: 'Downloading',
        leeches: 10,
        seeds: 12,
        readableSize: '100 MB',
        downloads: 14
      });
      
      const wrapper = mount(
        <TorrentItem torrent={torrentObject} onAddTorrent={callback} />
      );

      wrapper.find('.add-torrent').simulate('click');
      expect(callback.calledOnce).to.equal(true);
      expect(callback.calledWith(torrentObject)).to.equal(true);
    });
  });
});
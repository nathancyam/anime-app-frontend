/**
 * Created by nathanyam on 19/07/2016.
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import TorrentItem from '../../../app/components/TorrentServer/TorrentItem';
import sinon from 'sinon';
import Immutable from 'immutable';

describe('Torrent Item Component <TorrentItem />', () => {
  let onAddEpToCollectionSpy;
  let showTorrentModalSpy;
  let onPauseTorrentSpy;
  let onResumeTorrentSpy;

  function createComponent(render = shallow, status = 4) {
    return render(
      <TorrentItem
        onAddEpisodeToCollection={onAddEpToCollectionSpy}
        showTorrentModal={showTorrentModalSpy}
        onPauseTorrent={onPauseTorrentSpy}
        onResumeTorrent={onResumeTorrentSpy}
        hasEpisode={false}
        torrent={Immutable.fromJS({
          name: 'Example Torrent',
          status,
          percentDone: 0.5,
          torrentFile: 'Example_Torrent.mkv',
          peersConnected: 4,
          humanEta: "1 hour"
        })}
      />
    );
  }

  beforeEach(() => {
    onAddEpToCollectionSpy = sinon.spy();
    showTorrentModalSpy = sinon.spy();
    onPauseTorrentSpy = sinon.spy();
    onResumeTorrentSpy = sinon.spy();
  });

  afterEach(() => {
    onAddEpToCollectionSpy = {};
    showTorrentModalSpy = {};
    onPauseTorrentSpy = {};
    onResumeTorrentSpy = {};
  });

  it('should show the right status', () => {
    const stopWrapper = createComponent(shallow, 0);
    expect(stopWrapper.find('.status').text()).equal('Status: Stopped');
    const queueChkWrapper = createComponent(shallow, 1);
    expect(queueChkWrapper.find('.status').text()).equal('Status: Queued to check');
    const chkWrapper = createComponent(shallow, 2);
    expect(chkWrapper.find('.status').text()).equal('Status: Checking files');
    const queueDlWrapper = createComponent(shallow, 3);
    expect(queueDlWrapper.find('.status').text()).equal('Status: Queued for download');
    const dlWrapper = createComponent(shallow, 4);
    expect(dlWrapper.find('.status').text()).equal('Status: Downloading');
    const queueSeedWrapper = createComponent(shallow, 5);
    expect(queueSeedWrapper.find('.status').text()).equal('Status: Queued for seed');
    const seedWrapper = createComponent(shallow, 6);
    expect(seedWrapper.find('.status').text()).equal('Status: Seeding');
    const noPeerWrapper = createComponent(shallow, 7);
    expect(noPeerWrapper.find('.status').text()).equal('Status: Unable to find peers');
    const errWrapper = createComponent(shallow, 8);
    expect(errWrapper.find('.status').text()).equal('Status: Can not find error code');
  });

  it('should show the progress bar', () => {
    const wrapper = createComponent();
    expect(wrapper.find('.progress-bar').text()).equal('50%');
    expect(wrapper.find('.progress-bar').props().style).to.deep.equal({ width: '50%'});
  });

  it('should show the estimated time left', () => {
    const wrapper = createComponent();
    expect(wrapper.find('.est').text()).equal('Estimated Time: 1 hour');
  });

  it('should show the number of peers connected', () => {
    const wrapper = createComponent();
    expect(wrapper.find('.peers').text()).equal('Peers Connected: 4');
  });

  it('should show the torrent file', () => {
    const wrapper = createComponent();
    expect(wrapper.find('.torrent').text()).equal('Torrent File: Example_Torrent.mkv');
  });

  it('should show the actionable buttons', () => {
    const wrapper = createComponent(mount);
    expect(wrapper.find('button')).to.have.length(3);
  });

  it('should call the resume callback', () => {
    const wrapper = createComponent(mount);
    wrapper.find('button').at(0).simulate('click');
    expect(onResumeTorrentSpy.calledOnce).equal(false);
    expect(onPauseTorrentSpy.calledOnce).equal(true);

    const otherWrapper = createComponent(mount, 0);
    otherWrapper.find('button').at(0).simulate('click');
    expect(onResumeTorrentSpy.calledOnce).equal(true);
  });

  it('should call the add to collection callback', () => {
    const wrapper = createComponent(mount);
    wrapper.find('button').at(1).simulate('click');
    expect(onAddEpToCollectionSpy.calledOnce).equal(true);
  });

  it('should call to the add to anime callback', () => {
    const wrapper = createComponent(mount);
    wrapper.find('button').at(2).simulate('click');
    expect(showTorrentModalSpy.calledOnce).equal(true);
  });
});
